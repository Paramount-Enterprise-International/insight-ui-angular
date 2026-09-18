import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  untracked,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, type Route, RouterOutlet } from '@angular/router';

import { evaluatePermission, type IPermissionInput } from '../directives/has-mn';
import { IErrorPage } from '../error-page/error-page';
import { type IBreadcrumbItem, IHTitleBreadcrumbService, type IRoute } from '../host/host';
import { ILoading } from '../loading/loading';
import { ISessionService } from '../session/session';
import { IUserMenuStore } from '../store/user-menu';

/** Library-owned outlet boundary for declarative route permission checks. */
@Component({
  selector: 'i-has-mn-route',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, IErrorPage, ILoading],
  template: `
    @if (!ready()) {
      <i-loading aria-live="polite" label="Loading access..." />
    } @else if (!allowed()) {
      <i-error-page kind="forbidden" role="alert" />
    } @else {
      <router-outlet />
    }
  `,
})
export class IHasMnRoute {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(IUserMenuStore);
  private readonly session = inject(ISessionService);
  private readonly shell = inject(IHTitleBreadcrumbService);
  private readonly destroyRef = inject(DestroyRef);
  readonly permission = this.route.snapshot.data['hasMn'] as IPermissionInput;
  readonly ready = computed(
    () =>
      !this.session.initializing() &&
      this.session.isAuth() &&
      this.store.initialized() &&
      !this.store.initializing(),
  );
  readonly allowed = computed(() =>
    evaluatePermission(this.permission, this.store.authorizationSource()),
  );

  constructor() {
    effect(() => {
      if (
        !this.session.initializing() &&
        this.session.isAuth() &&
        !this.store.initialized() &&
        !this.store.initializing()
      ) {
        untracked(() => this.store.load().pipe(takeUntilDestroyed(this.destroyRef)).subscribe());
      }
    });

    effect((onCleanup) => {
      if (!this.ready() || this.allowed()) return;
      untracked(() => {
        const previousTitle = this.shell.titleOverride();
        const previousCrumbs = this.shell.breadcrumbsOverride();
        const deniedCrumbs: IBreadcrumbItem[] = [{ label: 'Unauthorized Access' }];
        this.shell.setTitle('Unauthorized Access');
        this.shell.setBreadcrumbs(deniedCrumbs);
        onCleanup(() => {
          if (this.shell.titleOverride() === 'Unauthorized Access')
            this.shell.setTitle(previousTitle);
          if (this.shell.breadcrumbsOverride() === deniedCrumbs)
            this.shell.setBreadcrumbs(previousCrumbs);
        });
      });
    });
  }
}

/** Preserves route recognition and resolvers while gating component activation. */
export function hasMn(value: IPermissionInput, route: IRoute): IRoute;
export function hasMn(value: IPermissionInput, route: Route): Route;
export function hasMn(value: IPermissionInput, route: Route): Route {
  const { component, loadComponent, children, loadChildren, canDeactivate, ...recognition } = route;
  return {
    ...recognition,
    children: [
      {
        path: '',
        component: IHasMnRoute,
        data: { hasMn: value },
        children: [
          {
            path: '',
            component,
            loadComponent,
            children,
            loadChildren,
            canDeactivate,
          },
        ],
      },
    ],
  };
}
