import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { filter, map, Observable, of, take } from 'rxjs';

import { ISessionService } from '../session/session';
import { IUserMenuStore } from '../store/user-menu';
import { UNAUTHORIZED_ACCESS_PATH } from './access';

/** Resolves the menu code that protects a router navigation. */
export type IRouteMenuCodeResolver = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => string | null | undefined;

export type IMissingMenuCodePolicy = 'allow' | 'deny';

/** Options for menu-code route authorization. */
export type IRouteAccessOptions = {
  resolveMenuCode?: IRouteMenuCodeResolver;
  missingMenuCode?: IMissingMenuCodePolicy;
};

function menuCodeFromRouteData(route: ActivatedRouteSnapshot): string | null {
  const menuCode = route.data['menuCode'];
  return typeof menuCode === 'string' && menuCode.trim() ? menuCode.trim() : null;
}

/** Waits until the store has settled its authorization data, triggering a cold-start load if needed. */
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

/** Authorizes a route by its resolved menu code instead of comparing backend routes. */
export function requireRouteAccess(options: IRouteAccessOptions = {}): CanActivateFn {
  const resolveMenuCode = options.resolveMenuCode ?? menuCodeFromRouteData;
  const missingMenuCode = options.missingMenuCode ?? 'allow';

  return (route, state): Observable<boolean | UrlTree> => {
    const session = inject(ISessionService);
    const store = inject(IUserMenuStore);
    const router = inject(Router);

    if (session.initializing() || !session.isAuth()) {
      return of(true);
    }

    return ensureAuthorizationsLoaded(store).pipe(
      map(() => {
        const menuCode = resolveMenuCode(route, state)?.trim();
        if (!menuCode) {
          console.warn(`[@insight/ui] No menu code mapping found for route "${state.url}".`);
          return missingMenuCode === 'allow'
            ? true
            : router.createUrlTree([UNAUTHORIZED_ACCESS_PATH]);
        }

        return store.hasMenuCode(menuCode) || router.createUrlTree([UNAUTHORIZED_ACCESS_PATH]);
      }),
    );
  };
}
