import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, provideRouter, Router, RouterStateSnapshot } from '@angular/router';
import { firstValueFrom, of } from 'rxjs';

import { ISessionService } from '../session/session.service';
import { IUserMenuStore } from '../store/user-menu.store';
import { UNAUTHORIZED_ACCESS_PATH } from './access.guard';
import { IRouteAccessOptions, requireRouteAccess } from './route-access.guard';

describe('requireRouteAccess', () => {
  function sessionMock(initializing = false, isAuth = true): ISessionService {
    return {
      initializing: () => initializing,
      isAuth: () => isAuth,
    } as unknown as ISessionService;
  }

  function storeMock(hasMenu: boolean): IUserMenuStore {
    return {
      initializing: () => false,
      initialized: () => true,
      menus: () => [{ id: 1, name: 'Overview', menuCode: 'atlas.overview' }],
      loadErrors: () => ({ menus: null }),
      initializing$: of(false),
      initialized$: of(true),
      load: () => of(undefined),
      hasMenu: () => hasMenu,
    } as unknown as IUserMenuStore;
  }

  async function runGuard(
    url: string,
    store: IUserMenuStore,
    options: IRouteAccessOptions = {},
    routeData: Record<string, unknown> = {},
    session: ISessionService = sessionMock(),
  ): Promise<unknown> {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: ISessionService, useValue: session },
        { provide: IUserMenuStore, useValue: store },
      ],
    });
    const route = { data: routeData } as unknown as ActivatedRouteSnapshot;
    const state = { url } as RouterStateSnapshot;
    const result = TestBed.runInInjectionContext(() => requireRouteAccess(options)(route, state));
    return firstValueFrom(result as never);
  }

  it('allows navigation while the session is restoring', async () => {
    await expectAsync(
      runGuard('/overview', storeMock(false), {}, {}, sessionMock(true, false)),
    ).toBeResolvedTo(true);
  });

  it('allows a route whose resolved menu code is granted', async () => {
    await expectAsync(
      runGuard('/overview', storeMock(true), {
        resolveMenuCode: () => 'atlas.overview',
      }),
    ).toBeResolvedTo(true);
  });

  it('reads a static menu code from route data', async () => {
    await expectAsync(
      runGuard('/overview', storeMock(true), {}, { menuCode: 'atlas.overview' }),
    ).toBeResolvedTo(true);
  });

  it('redirects when the resolved menu code is not granted', async () => {
    const value = await runGuard('/overview', storeMock(false), {
      resolveMenuCode: () => 'atlas.overview',
    });
    expect(value).toEqual(TestBed.inject(Router).createUrlTree([UNAUTHORIZED_ACCESS_PATH]));
  });

  it('allows a missing mapping by default', async () => {
    await expectAsync(runGuard('/unmapped', storeMock(false))).toBeResolvedTo(true);
  });

  it('can deny a missing mapping explicitly', async () => {
    const value = await runGuard('/unmapped', storeMock(false), { missingMenuCode: 'deny' });
    expect(value).toEqual(TestBed.inject(Router).createUrlTree([UNAUTHORIZED_ACCESS_PATH]));
  });
});
