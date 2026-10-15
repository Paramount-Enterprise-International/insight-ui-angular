import {
  Directive,
  inject,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { BehaviorSubject, combineLatest, distinctUntilChanged, map, Subscription } from 'rxjs';

import { IUserMenuStore } from '../store/user-menu';
import type { IAuthorizationSource } from '../user';

/** Flexible permission check against the current authorization snapshot. */
export type IPermissionPredicate = (source: IAuthorizationSource) => boolean;

/** Menu-code shorthand or a compound authorization predicate. */
export type IPermissionInput = string | readonly string[] | IPermissionPredicate;

/** Evaluates permission input without exposing mutable store state. */
export function evaluatePermission(
  value: IPermissionInput | null,
  source: IAuthorizationSource,
): boolean {
  if (!value) return false;

  if (typeof value === 'function') {
    try {
      return value(source);
    } catch {
      console.error('[@insight/ui] Permission predicate failed.');
      return false;
    }
  }

  const codes = Array.isArray(value) ? value : [value];
  return codes.some((code) => source.menuCodes.includes(code));
}

/** Shared reactive implementation for the positive and inverse permission directives. */
@Directive({ standalone: true })
export abstract class IMenuGateDirective implements OnInit, OnDestroy {
  protected abstract readonly invert: boolean;

  protected readonly store = inject(IUserMenuStore);
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly viewContainer = inject(ViewContainerRef);

  protected readonly value$ = new BehaviorSubject<IPermissionInput | null>(null);
  private viewCreated = false;
  private subscription?: Subscription;

  ngOnInit(): void {
    this.subscription = combineLatest([
      this.value$,
      this.store.authorizationSource$,
      this.store.initializing$,
      this.store.initialized$,
    ])
      .pipe(
        map(([value]) =>
          this.store.initializing() || !this.store.initialized()
            ? null
            : evaluatePermission(value, this.store.authorizationSource()),
        ),
        distinctUntilChanged(),
      )
      .subscribe((state) => this.renderView(state));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private renderView(state: boolean | null): void {
    if (state === null) {
      if (this.viewCreated) {
        this.viewContainer.clear();
        this.viewCreated = false;
      }
      return;
    }

    const show = this.invert ? !state : state;
    if (show && !this.viewCreated) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.viewCreated = true;
    } else if (!show && this.viewCreated) {
      this.viewContainer.clear();
      this.viewCreated = false;
    }
  }
}

/** Renders the template when a menu shorthand or authorization predicate allows it. */
@Directive({ selector: '[iHasMn]', standalone: true })
export class IHasMnDirective extends IMenuGateDirective {
  protected readonly invert = false;

  @Input()
  set iHasMn(value: IPermissionInput) {
    this.value$.next(value);
  }
}
