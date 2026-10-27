import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  DestroyRef,
  EnvironmentInjector,
  inject,
  Injectable,
  PLATFORM_ID,
} from '@angular/core';
import { type Observable, ReplaySubject } from 'rxjs';
import { ISnackbar } from './snackbar';
import { nextSnackbarId } from './snackbar-runtime';
import { SnackbarSettings } from './snackbar-settings';
import type {
  ISnackbarChanges,
  ISnackbarDefaults,
  ISnackbarDismissReason,
  ISnackbarOptions,
} from './snackbar.types';

export class ISnackbarRef {
  readonly id: string;
  private readonly closed = new ReplaySubject<ISnackbarDismissReason>(1);
  private readonly close: () => void;
  private finished = false;
  constructor(id: string, close: () => void) {
    this.id = id;
    this.close = close;
  }
  dismiss(): void {
    this.close();
  }
  afterDismissed(): Observable<ISnackbarDismissReason> {
    return this.closed.asObservable();
  }
  complete(reason: ISnackbarDismissReason): void {
    if (this.finished) return;
    this.finished = true;
    this.closed.next(reason);
    this.closed.complete();
  }
}

type Instance = {
  ref: ISnackbarRef;
  component: ComponentRef<ISnackbar>;
  options: ISnackbarOptions;
  revision: number;
};

@Injectable({ providedIn: 'root' })
export class ISnackbarService {
  private readonly doc = inject(DOCUMENT);
  private readonly app = inject(ApplicationRef);
  private readonly injector = inject(EnvironmentInjector);
  private readonly platform = inject(PLATFORM_ID);
  private readonly settings = inject(SnackbarSettings);
  private readonly instances = new Map<string, Instance>();

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      for (const instance of this.instances.values()) {
        if (!instance.component.hostView.destroyed) {
          this.app.detachView(instance.component.hostView);
          instance.component.destroy();
        }
        instance.ref.complete('programmatic');
      }
      this.instances.clear();
    });
  }

  configure(defaults: ISnackbarDefaults): void {
    this.settings.defaults.set({ ...defaults });
  }

  show(message: string, options: ISnackbarOptions = {}): ISnackbarRef {
    const id = options.id ?? nextSnackbarId();
    const existing = this.instances.get(id);
    if (existing) {
      this.update(id, { ...options, message });
      return existing.ref;
    }
    const ref = new ISnackbarRef(id, () => this.dismiss(id));
    if (!isPlatformBrowser(this.platform) || (!message.trim() && !options.title?.trim())) {
      ref.complete('programmatic');
      return ref;
    }
    const host = this.doc.createElement('i-snackbar');
    const component = createComponent(ISnackbar, {
      hostElement: host,
      environmentInjector: this.injector,
    });
    const instance = { ref, component, options: { ...options, id }, revision: 0 };
    this.instances.set(id, instance);
    component.instance.onAction.subscribe(() => instance.options.onAction?.());
    component.instance.afterDismissed.subscribe((reason) => {
      if (this.instances.get(id) !== instance) return;
      this.instances.delete(id);
      this.app.detachView(component.hostView);
      component.destroy();
      ref.complete(reason);
    });
    for (const [key, value] of Object.entries(instance.options))
      if (key !== 'onAction') component.setInput(key, value);
    component.setInput('message', message);
    component.setInput('resetKey', 0);
    this.app.attachView(component.hostView);
    component.changeDetectorRef.detectChanges();
    return ref;
  }

  update(id: string, changes: ISnackbarChanges): void {
    const instance = this.instances.get(id);
    if (!instance) return;
    instance.options = { ...instance.options, ...changes };
    for (const [key, value] of Object.entries(changes))
      if (key !== 'onAction') instance.component.setInput(key, value);
    instance.component.setInput('resetKey', ++instance.revision);
    instance.component.changeDetectorRef.detectChanges();
  }

  dismiss(id: string): void {
    this.instances.get(id)?.component.instance.requestClose('programmatic');
  }
  dismissAll(): void {
    for (const id of this.instances.keys()) this.dismiss(id);
  }
}
