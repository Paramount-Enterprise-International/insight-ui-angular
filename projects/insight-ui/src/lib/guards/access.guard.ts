import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { filter, map, Observable, of, take } from 'rxjs';

import { IUserMenuStore } from '../store/user-menu.store';
import { ISessionService } from '../session/session.service';

/** Route that renders the "account lacks the required access/role" (403) page. */
export const UNAUTHORIZED_ACCESS_PATH = '/unauthorized-access';

/** Sources a route access requirement can be checked against. */
export type IAccessCheckSource = 'menuCode' | 'role';

/**
 * Route access requirement — deny navigation unless the current user holds it.
 * `value` is a single code or a list of codes (ANY match).
 * - `menuCode` checks effective item/function authorizations.
 * - `role` checks access-token roles.
 */
export type IAccessCheck = {
  source: IAccessCheckSource;
  value: string | string[];
}

/**
 * Waits for the authorization load before judging a cold-start navigation.
 */
function ensureAuthorizationsLoaded(store: IUserMenuStore): Observable<void> {
  if (store.initializing()) {
    return store.initializing$.pipe(
      filter((initializing) => !initializing),
      take(1),
      map(() => undefined),
    );
  }
  return store.initialized() ? of(undefined) : store.load();
}

/**
 * Route guard factory that denies navigation to users who lack a required
 * menu code/role, redirecting them to {@link UNAUTHORIZED_ACCESS_PATH}.
 *
 * Compose AFTER `authGuard` in the `canActivate` array — this guard only
 * handles the authenticated-but-not-allowed branch and returns `true` while the
 * session is still restoring (or no valid session exists) so `authGuard` /
 * the session-expired overlay own sign-in redirects:
 *
 * ```ts
 * const routes = [{
 *   path: 'admin',
 *   canActivate: [authGuard, requireAccess({ source: 'menuCode', value: 'admin-iam' })],
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
    // Wait for effective authorizations before checking the requested code.
    return ensureAuthorizationsLoaded(store).pipe(
      map(() => {
        const granted = store.hasMenuCode(check.value);
        return granted || router.createUrlTree([UNAUTHORIZED_ACCESS_PATH]);
      }),
    );
  };
}
