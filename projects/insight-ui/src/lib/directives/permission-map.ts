import { inject, Injectable, InjectionToken, type Provider } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';

/** Local keys mapped to menu codes (ANY match) or explicit boolean UI overrides. */
export type IPermissionMap = Readonly<Record<string, boolean | string | readonly string[]>>;
export type IPermissionMapConfig = IPermissionMap | (() => Promise<IPermissionMap>);
export type IPermissionMapState =
  | { status: 'loading' | 'error'; mapping: null }
  | { status: 'ready'; mapping: IPermissionMap };

const PERMISSION_MAP_CONFIG = new InjectionToken<IPermissionMapConfig>('I_PERMISSION_MAP_CONFIG');

/** Validate untrusted JSON and take an immutable snapshot of its own entries. */
export function validatePermissionMap(value: unknown): IPermissionMap {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('Permission mapping must be a JSON object.');
  }
  const entries = Object.entries(value).map(([key, codes]) => {
    if (!key.trim()) throw new Error('Permission mapping keys must be non-empty strings.');
    if (typeof codes === 'boolean') return [key, codes];
    if (typeof codes !== 'string' && !Array.isArray(codes)) {
      throw new Error('Permission mappings must contain booleans, strings or arrays of strings.');
    }
    const list: unknown[] = Array.isArray(codes) ? codes : [codes];
    if (list.some((code) => typeof code !== 'string' || !code.trim())) {
      throw new Error('Mapped menu codes must be non-empty strings.');
    }
    return [key, Array.isArray(codes) ? Object.freeze([...codes]) : codes];
  });
  return Object.freeze(Object.fromEntries(entries)) as IPermissionMap;
}

/** Scoped to the injector that owns the remote's route collection. Never root-provided. */
@Injectable()
export class IPermissionMapStore {
  private readonly config = inject(PERMISSION_MAP_CONFIG);
  private readonly current = new BehaviorSubject<IPermissionMapState>({
    status: 'loading',
    mapping: null,
  });
  readonly state = toSignal(this.current, { requireSync: true });
  readonly state$ = this.current.asObservable();

  constructor() {
    if (typeof this.config === 'function') {
      const load = this.config;
      void Promise.resolve()
        .then(load)
        .then((mapping) => this.apply(mapping))
        .catch(() => {
          this.current.next({ status: 'error', mapping: null });
          console.error('[@insight/ui] Unable to load permission mapping.');
        });
    } else {
      this.apply(this.config);
    }
  }

  private apply(mapping: IPermissionMap): void {
    try {
      this.current.next({ status: 'ready', mapping: validatePermissionMap(mapping) });
    } catch {
      this.current.next({ status: 'error', mapping: null });
      console.error('[@insight/ui] Invalid permission mapping.');
    }
  }
}

/** Provide on a remote route root (or standalone root), never on the shared host root. */
export function provideMenuPermissionMapping(config: IPermissionMapConfig): Provider[] {
  return [{ provide: PERMISSION_MAP_CONFIG, useValue: config }, IPermissionMapStore];
}
