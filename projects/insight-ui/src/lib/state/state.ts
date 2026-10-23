import { DestroyRef, inject, Injectable, InjectionToken, signal, Signal } from '@angular/core';
import {
  type IHSelectionApi,
  type IHStateApi,
  type IHStateError,
  type IHStateNamespaceOptions,
  IHStateOwner,
} from './state-core';

/** Only the host provides this token. Federated Angular routes inherit it. */
export const IH_STATE = new InjectionToken<IHStateApi>('IH_STATE');

@Injectable({ providedIn: 'root' })
export class IHState {
  readonly api = inject(IH_STATE, { optional: true });

  registerNamespace(namespace: string, options?: IHStateNamespaceOptions): void {
    this.requireApi().registerNamespace(namespace, options);
  }
  get selection(): IHSelectionApi {
    return this.requireApi().selection;
  }
  getError(namespace: string): IHStateError | null {
    return this.requireApi().getError(namespace);
  }
  subscribe(listener: () => void): () => void {
    return this.requireApi().subscribe(listener);
  }

  select<T>(
    namespace: string,
    key: string,
    fallback: T,
    destroyRef = inject(DestroyRef),
  ): Signal<T> {
    const api = this.requireApi();
    const value = signal(api.get(namespace, key, fallback));
    const unsubscribe = api.subscribe(() => value.set(api.get(namespace, key, fallback)));
    destroyRef.onDestroy(unsubscribe);
    return value.asReadonly();
  }

  get<T>(namespace: string, key: string, fallback: T): T {
    return this.requireApi().get(namespace, key, fallback);
  }
  set<T>(namespace: string, key: string, value: T): void {
    this.requireApi().set(namespace, key, value);
  }
  update<T>(namespace: string, key: string, fallback: T, update: (value: T) => T): void {
    this.requireApi().update(namespace, key, fallback, update);
  }
  remove(namespace: string, key: string): void {
    this.requireApi().remove(namespace, key);
  }
  clearNamespace(namespace: string): void {
    this.requireApi().clearNamespace(namespace);
  }

  private requireApi(): IHStateApi {
    if (!this.api) throw new Error('IHState requires the host IH_STATE provider.');
    return this.api;
  }
}

export { IHStateOwner };
