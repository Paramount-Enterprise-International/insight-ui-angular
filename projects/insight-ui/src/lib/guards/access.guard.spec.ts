import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { firstValueFrom, of } from 'rxjs';

import { IAccessCheck, requireAccess, UNAUTHORIZED_ACCESS_PATH } from './access.guard';
import { IUserMenuStore } from '../store/user-menu.store';
import { ISessionService } from '../session/session.service';

describe('requireAccess', () => {
  const route = {} as ActivatedRouteSnapshot;
  const state = {} as RouterStateSnapshot;

  function sessionMock(
    overrides: Partial<{ initializing: boolean; isAuth: boolean; hasRole: boolean }> = {},
  ): ISessionService {
    return {
      initializing: () => overrides.initializing ?? false,
      isAuth: () => overrides.isAuth ?? true,
      hasRole: () => overrides.hasRole ?? false,
    } as unknown as ISessionService;
  }

  function storeMock(
    overrides: Partial<{
      hasMenu: boolean;
      hasPermission: boolean;
      initializing: boolean;
      menusLoaded: boolean;
      menusError: boolean;
    }> = {},
  ): IUserMenuStore {
    const store = {
      hasMenu: () => overrides.hasMenu ?? false,
      hasPermission: () => overrides.hasPermission ?? false,
      hasRole: () => overrides.hasMenu ?? false,
      initializing: () => overrides.initializing ?? false,
      menus: () => (overrides.menusLoaded ? [{ id: 1, name: 'Admin', menuCode: 'admin-iam' }] : []),
      loadErrors: () => ({ menus: overrides.menusError ? { errorCode: 'USER_APPLICATION_MAPPING_NOT_FOUND' } : null }),
      initializing$: of(false),
      load: () => of(undefined),
    } as unknown as IUserMenuStore;
    return store;
  }

  async function runGuard(check: IAccessCheck, session: unknown, store: unknown): Promise<unknown> {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: ISessionService, useValue: session },
        { provide: IUserMenuStore, useValue: store },
      ],
    });
    return TestBed.runInInjectionContext(() => requireAccess(check)(route, state)) as unknown;
  }

  it('allows navigation while the session is still restoring', async () => {
    const result = await runGuard(
      { source: 'menu', value: 'admin-iam' },
      sessionMock({ initializing: true, isAuth: false }),
      storeMock(),
    );
    await expectAsync(firstValueFrom(result as never)).toBeResolvedTo(true);
  });

  it('defers to the auth guard when no valid session exists', async () => {
    const result = await runGuard(
      { source: 'menu', value: 'admin-iam' },
      sessionMock({ isAuth: false }),
      storeMock(),
    );
    await expectAsync(firstValueFrom(result as never)).toBeResolvedTo(true);
  });

  it('grants role-based access when the token has the role', async () => {
    const result = await runGuard(
      { source: 'role', value: 'backend.sys' },
      sessionMock({ hasRole: true }),
      storeMock(),
    );
    await expectAsync(firstValueFrom(result as never)).toBeResolvedTo(true);
  });

  it('denies role-based access with a redirect to the unauthorized-access page', async () => {
    const result = await runGuard({ source: 'role', value: 'backend.sys' }, sessionMock(), storeMock());
    const value = await firstValueFrom(result as never);
    const router = TestBed.inject(Router);
    expect(value).toEqual(router.createUrlTree([UNAUTHORIZED_ACCESS_PATH]));
  });

  it('denies menu-based access when the menus are loaded but lack the code', async () => {
    const result = await runGuard(
      { source: 'menu', value: 'admin-iam' },
      sessionMock(),
      storeMock({ menusLoaded: true, hasMenu: false }),
    );
    const value = await firstValueFrom(result as never);
    const router = TestBed.inject(Router);
    expect(value).toEqual(router.createUrlTree([UNAUTHORIZED_ACCESS_PATH]));
  });

  it('grants menu-based access when the loaded menus contain the code', async () => {
    const result = await runGuard(
      { source: 'menu', value: 'admin-iam' },
      sessionMock(),
      storeMock({ menusLoaded: true, hasMenu: true }),
    );
    await expectAsync(firstValueFrom(result as never)).toBeResolvedTo(true);
  });

  it('triggers the menu load when menus have not been fetched yet, then grants on success', async () => {
    const store = storeMock({ menusLoaded: false, hasMenu: true });
    const result = await runGuard({ source: 'menu', value: 'admin-iam' }, sessionMock(), store);
    await expectAsync(firstValueFrom(result as never)).toBeResolvedTo(true);
  });
});
