import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { filter, map, Observable, of, take } from 'rxjs';

import { UNAUTHORIZED_ACCESS_PATH } from './access.guard';
import { IUserMenuStore } from '../store/user-menu.store';
import { ISessionService } from '../session/session.service';

/** Decides whether the current path may be opened for the given store state. */
export type IRouteCanOpen = (path: string, store: IUserMenuStore) => boolean;

/** Options for {@link requireRouteAccess}. */
export type IRouteAccessOptions = {
  /**
   * Override the open-decision. Default: the path is one of the user's granted
   * leaf menu routes (`store.hasRoute`). Apps whose menus carry host-formatted
   * routes (remotes mounted under a host prefix) supply a matcher that maps
   * the local path into the menu-route space.
   */
  canOpen?: IRouteCanOpen;
}

/** Waits until the store has settled its menu data (triggering the cold-start load if needed). */
function ensureMenusLoaded(store: IUserMenuStore): Observable<void> {
  if (store.initializing()) {
    return store.initializing$.pipe(
      filter((initializing) => !initializing),
      take(1),
      map(() => undefined),
    );
  }
  const menusSettled = store.menus().length > 0 || store.loadErrors().menus !== null;
  return menusSettled ? of(undefined) : store.load();
}

/**
 * Route-membership guard: denies navigation to pages the user has no granted
 * menu for, redirecting to {@link UNAUTHORIZED_ACCESS_PATH}. Compose AFTER
 * `authGuard` in the `canActivate` array:
 *
 * ```ts
 * const routes = [{ path: 'sales/nup', canActivate: [authGuard, requireRouteAccess()], ... }];
 * ```
 *
 * The default matcher works where menu routes live in the same path space as
 * the router (a host shell). Remotes pass `{ canOpen }` to map the local path
 * into their host-prefixed menu-route space.
 */
export function requireRouteAccess(options: IRouteAccessOptions = {}): CanActivateFn {
  const canOpen: IRouteCanOpen = options.canOpen ?? ((path, store): boolean => store.hasRoute(path));

  return (_route, state): Observable<boolean | UrlTree> => {
    const session = inject(ISessionService);
    const store = inject(IUserMenuStore);
    const router = inject(Router);

    // The auth guard (composed first) owns unauthenticated redirects and the
    // session-expired overlay UX — defer to it while the session is unresolved.
    if (session.initializing() || !session.isAuth()) {
      return of(true);
    }

    return ensureMenusLoaded(store).pipe(
      map(() => {
        const allowed = canOpen(state.url, store);
        return allowed || router.createUrlTree([UNAUTHORIZED_ACCESS_PATH]);
      }),
    );
  };
}
