import { Directive, inject, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, combineLatest, distinctUntilChanged, map, Subscription } from 'rxjs';

import { IUserMenuStore } from '../store/user-menu.store';

/** Permission source selector used by `ihHasMn` / `ihNotHasMn`. */
export type IInsightPermissionSource = 'menu' | 'role';

/** Object form: inline source + value. */
export type IInsightPermission = {
  source: IInsightPermissionSource;
  value: string | string[];
}

/**
 * Accepted input for the permission directives:
 * - a plain `string | string[]` → menu-mode check (default), or
 * - an object `{ source, value }` to select the source explicitly.
 */
export type IInsightPermissionInput = string | string[] | IInsightPermission;

/** Resolves an input into a concrete `{ source, codes }` pair (or `null`). */
export function resolvePermission(
  value: IInsightPermissionInput | null,
): { source: IInsightPermissionSource; codes: string | string[] } | null {
  if (!value) {
    return null;
  }
  if (typeof value === 'object' && !Array.isArray(value)) {
    return { source: value.source, codes: value.value };
  }
  return { source: 'menu', codes: value };
}

/**
 * Base structural permission directive shared by `IHHasMnDirective` and
 * `IHNotHasMnDirective`.
 *
 * ASYNC-AWARE: instead of a one-shot input setter, it subscribes to the
 * `IUserMenuStore`'s reactive menu/role state (`menus$` / `roles$`) and
 * re-renders the embedded view whenever the permission resolves or changes —
 * e.g. while the store cold-starts (menus not yet loaded) the view stays
 * hidden, then appears as soon as the data arrives, and disappears again if a
 * role/menu change revokes access.
 */
@Directive({ standalone: true })
export abstract class IHMenuGateDirective implements OnInit, OnDestroy {
  /** `false` for `ihHasMn` (show when allowed), `true` for `ihNotHasMn` (show when denied). */
  protected abstract readonly invert: boolean;

  protected readonly store = inject(IUserMenuStore);
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly viewContainer = inject(ViewContainerRef);

  protected readonly value$ = new BehaviorSubject<IInsightPermissionInput | null>(null);
  private viewCreated = false;
  private subscription?: Subscription;

  ngOnInit(): void {
    this.subscription = combineLatest([this.value$, this.store.menus$, this.store.roles$])
      .pipe(
        map(([value]) => this.evaluate(value)),
        distinctUntilChanged(),
      )
      .subscribe((allowed) => this.renderView(allowed));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private evaluate(value: IInsightPermissionInput | null): boolean {
    const resolved = resolvePermission(value);
    if (!resolved) {
      return false;
    }
    return resolved.source === 'role' ? this.store.hasRole(resolved.codes) : this.store.hasMenu(resolved.codes);
  }

  private renderView(allowed: boolean): void {
    const show = this.invert ? !allowed : allowed;
    if (show && !this.viewCreated) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.viewCreated = true;
    } else if (!show && this.viewCreated) {
      this.viewContainer.clear();
      this.viewCreated = false;
    }
  }
}

/**
 * Structural directive `*ihHasMn` — renders the element only while the current
 * user has the given menu code / role.
 *
 * Usage:
 * ```html
 * <button *ihHasMn="'admin'">Admin only</button>                 <!-- menu mode (default) -->
 * <div *ihHasMn="['read', 'write']">R/W</div>
 * <i *ihHasMn="{ source: 'role', value: 'iam-admin' }">Role check</i>
 * ```
 */
@Directive({ selector: '[ihHasMn]', standalone: true })
export class IHHasMnDirective extends IHMenuGateDirective {
  protected readonly invert = false;

  @Input()
  set ihHasMn(value: IInsightPermissionInput) {
    this.value$.next(value);
  }
}
