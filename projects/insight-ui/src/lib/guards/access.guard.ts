import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { filter, map, Observable, of, take } from 'rxjs';

import { IUserMenuStore } from '../store/user-menu.store';
import { ISessionService } from '../session/session.service';

/** Route that renders the "account lacks the required access/role" (403) page. */
export const UNAUTHORIZED_ACCESS_PATH = '/unauthorized-access';

/** Sources a route access requirement can be checked against. */
export type IAccessCheckSource = 'menu' | 'role' | 'permission';

/**
 * Route access requirement — deny navigation unless the current user holds it.
 * `value` is a single code or a list of codes (ANY match).
 * - `menu` → the user's effective menu tree contains a matching leaf menu code
 *   (`IUserMenuStore.hasMenu`).
 * - `role` → the access token claims a matching role (`ISessionService.hasRole`).
 * - `permission` → the store has been granted a matching feature permission
 *   (`IUserMenuStore.hasPermission`; granted out-of-band via `setPermissions`).
 */
export interface IAccessCheck {
  source: IAccessCheckSource;
  value: string | string[];
}

/**
 * Waits until the store has settled its menu data, triggering the cold-start
 * load when it has not run yet. Menu checks cannot be judged against an empty
 * tree — a deep link into a guarded route may fire before the shell's boot
 * load has populated menus, and denying then would be a false negative.
 */
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
 * Route guard factory that denies navigation to users who lack a required
 * menu/role/permission, redirecting them to {@link UNAUTHORIZED_ACCESS_PATH}.
 *
 * Compose AFTER `authGuard` in the `canActivate` array — this guard only
 * handles the authenticated-but-not-allowed branch and returns `true` while the
 * session is still restoring (or no valid session exists) so `authGuard` /
 * the session-expired overlay own sign-in redirects:
 *
 * ```ts
 * const routes = [{
 *   path: 'admin',
 *   canActivate: [authGuard, requireAccess({ source: 'menu', value: 'admin-iam' })],
 *   ...
 * }];
 * ```
 */
export function requireAccess(check: IAccessCheck): CanActivateFn {
  return (): Observable<boolean | UrlTree> => {
    const session = inject(ISessionService);
    const store = inject(IUserMenuStore);
    const router = inject(Router);

    // The auth guard (composed first) owns unauthenticated redirects and the
    // session-expired overlay UX — defer to it while the session is unresolved.
    if (session.initializing() || !session.isAuth()) {
      return of(true);
    }

    if (check.source === 'role') {
      const granted = session.hasRole(check.value);
      return of(granted || router.createUrlTree([UNAUTHORIZED_ACCESS_PATH]));
    }

    if (check.source === 'permission') {
      // Permissions are granted out-of-band (setPermissions), never by load().
      const granted = store.hasPermission(check.value);
      return of(granted || router.createUrlTree([UNAUTHORIZED_ACCESS_PATH]));
    }

    // Menu source — wait for (or trigger) the menu load before judging.
    return ensureMenusLoaded(store).pipe(
      map(() => {
        const granted = store.hasMenu(check.value);
        return granted || router.createUrlTree([UNAUTHORIZED_ACCESS_PATH]);
      }),
    );
  };
}
