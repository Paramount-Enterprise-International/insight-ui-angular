import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { firstValueFrom, of } from 'rxjs';

import { requireRouteAccess } from './route-access.guard';
import { UNAUTHORIZED_ACCESS_PATH } from './access.guard';
import { IUserMenuStore } from '../store/user-menu.store';
import { ISessionService } from '../session/session.service';

describe('requireRouteAccess', () => {
  const route = {} as ActivatedRouteSnapshot;

  function makeState(url: string): RouterStateSnapshot {
    return { url } as RouterStateSnapshot;
  }

  function sessionMock(overrides: Partial<{ initializing: boolean; isAuth: boolean }> = {}) {
    return {
      initializing: () => overrides.initializing ?? false,
      isAuth: () => overrides.isAuth ?? true,
    } as unknown as ISessionService;
  }

  function storeMock(
    overrides: Partial<{ hasRoute: boolean; initializing: boolean; menusLoaded: boolean }> = {},
  ) {
    return {
      initializing: () => overrides.initializing ?? false,
      menus: () => (overrides.menusLoaded ? [{ id: 1, name: 'Overview', route: '/overview' }] : []),
      loadErrors: () => ({ menus: null }),
      initializing$: of(false),
      load: () => of(undefined),
      hasRoute: () => overrides.hasRoute ?? false,
    } as unknown as IUserMenuStore;
  }

  async function runGuard(url: string, session: unknown, store: unknown): Promise<unknown> {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: ISessionService, useValue: session },
        { provide: IUserMenuStore, useValue: store },
      ],
    });
    return TestBed.runInInjectionContext(() => requireRouteAccess()(route, makeState(url))) as unknown;
  }

  it('allows navigation while the session is still restoring', async () => {
    const result = await runGuard('/overview', sessionMock({ initializing: true, isAuth: false }), storeMock());
    await expect(firstValueFrom(result as never)).resolves.toBe(true);
  });

  it('allows a path that is among the granted leaf menu routes', async () => {
    const result = await runGuard('/overview', sessionMock(), storeMock({ hasRoute: true, menusLoaded: true }));
    await expect(firstValueFrom(result as never)).resolves.toBe(true);
  });

  it('denies a path that is not among the granted menus, redirecting to the unauthorized-access page', async () => {
    const result = await runGuard('/nup', sessionMock(), storeMock({ hasRoute: false, menusLoaded: true }));
    const value = await firstValueFrom(result as never);
    const router = TestBed.inject(Router);
    expect(value).toEqual(router.createUrlTree([UNAUTHORIZED_ACCESS_PATH]));
  });
});
