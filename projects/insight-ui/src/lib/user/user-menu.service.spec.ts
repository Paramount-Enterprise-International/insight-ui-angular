import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { IApiService } from '../api/api.service';
import { I_AUTH_CONFIG, IAuthConfig } from '../auth/auth-config';
import { IUserMenuService } from './user-menu.service';

const testConfig: IAuthConfig = {
  api: {
    identity: 'http://localhost:3001/api',
    user: 'http://localhost:3002/api/users',
  },
  signinUrl: 'http://localhost:4200/auth/signin',
  allowedReturnOrigins: ['http://localhost:4207'],
  tokenLifespan: {
    accessTokenSeconds: 3600,
    refreshTokenSeconds: 7200,
    ssoSessionMaxSeconds: 54000,
  },
  csrfTokenMaxAgeSeconds: 7170,
  appId: 'cfg-app',
};

describe('IUserMenuService', () => {
  let service: IUserMenuService;
  let apiSpy: jasmine.SpyObj<IApiService>;

  beforeEach(() => {
    apiSpy = jasmine.createSpyObj<IApiService>('IApiService', ['get', 'put', 'delete']);
    TestBed.configureTestingModule({
      providers: [
        { provide: IApiService, useValue: apiSpy },
        { provide: I_AUTH_CONFIG, useValue: testConfig },
      ],
    });
    service = TestBed.inject(IUserMenuService);
  });

  it('getEffectiveMenus calls the canonical application menu endpoint and unwraps .data', (done) => {
    const envelope = {
      meta: { timestamp: '2026-08-23T00:00:00Z' },
      data: [{ id: 'm1', name: 'Dashboard' }],
    };
    apiSpy.get.and.returnValue(of(envelope));

    service.getEffectiveMenus().subscribe((res) => {
      expect(apiSpy.get).toHaveBeenCalledWith('/me/applications/cfg-app/menus', undefined, {
        apiUrl: 'http://localhost:3002/api/users',
      });
      expect(res).toEqual([{ id: 'm1', name: 'Dashboard' }] as never);
      done();
    });
  });

  it('puts an encoded applicationId in the menu path when provided', () => {
    apiSpy.get.and.returnValue(of({ meta: { timestamp: '' }, data: [] }));
    service.getEffectiveMenus('app/one').subscribe();

    const [path, params] = apiSpy.get.calls.mostRecent().args;
    expect(path).toBe('/me/applications/app%2Fone/menus');
    expect(params).toBeUndefined();
  });

  it('getFavorites calls the canonical application favorites endpoint and unwraps .data', (done) => {
    apiSpy.get.and.returnValue(of({ meta: { timestamp: '' }, data: [{ id: 'f1' }] }));

    service.getFavorites().subscribe((res) => {
      expect(apiSpy.get).toHaveBeenCalledWith(
        '/me/applications/cfg-app/menus/favorites',
        undefined,
        {
          apiUrl: 'http://localhost:3002/api/users',
        },
      );
      expect(res).toEqual([{ id: 'f1' }] as never);
      done();
    });
  });

  it('addFavorite / removeFavorite hit the per-menu favorite endpoint', () => {
    apiSpy.put.and.returnValue(of(undefined));
    apiSpy.delete.and.returnValue(of(undefined));

    service.addFavorite('m1').subscribe();
    service.removeFavorite('m1').subscribe();

    expect(apiSpy.put).toHaveBeenCalledWith(
      '/me/menus/m1/favorite',
      {},
      { apiUrl: 'http://localhost:3002/api/users' },
    );
    expect(apiSpy.delete).toHaveBeenCalledWith('/me/menus/m1/favorite', {
      apiUrl: 'http://localhost:3002/api/users',
    });
  });

  it('reorderFavorites builds the full 1..n displayOrder sequence', () => {
    apiSpy.put.and.returnValue(of(undefined));

    service.reorderFavorites(['a', 'b', 'c']).subscribe();

    expect(apiSpy.put).toHaveBeenCalledWith(
      '/me/menus/favorites',
      {
        items: [
          { menuId: 'a', displayOrder: 1 },
          { menuId: 'b', displayOrder: 2 },
          { menuId: 'c', displayOrder: 3 },
        ],
      },
      { apiUrl: 'http://localhost:3002/api/users' },
    );
  });
});

describe('IUserMenuService — getAuthorizations', () => {
  let service: IUserMenuService;
  let apiSpy: jasmine.SpyObj<IApiService>;

  const envelope = (data: unknown): { meta: { timestamp: string }; data: unknown } => ({
    meta: { timestamp: '2026-09-10T00:00:00Z' },
    data,
  });

  /** Re-configures TestBed so each case can use its own `IAuthConfig`. */
  const configure = (config: IAuthConfig): void => {
    apiSpy = jasmine.createSpyObj<IApiService>('IApiService', ['get', 'put', 'delete']);
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        { provide: IApiService, useValue: apiSpy },
        { provide: I_AUTH_CONFIG, useValue: config },
      ],
    });
    service = TestBed.inject(IUserMenuService);
  };

  beforeEach(() => configure(testConfig));

  it('calls the canonical application authorization endpoint and unwraps .data', (done) => {
    const data = [{ menuCode: 'report.export', menuId: 'm2', type: 'function', companies: [] }];
    apiSpy.get.and.returnValue(of(envelope(data)));

    service.getAuthorizations('app-1').subscribe((res) => {
      expect(apiSpy.get).toHaveBeenCalledWith('/me/applications/app-1/authorizations', undefined, {
        apiUrl: 'http://localhost:3002/api/users',
      });
      expect(res).toEqual(data as never);
      done();
    });
  });

  it('puts the given applicationId in the path', () => {
    apiSpy.get.and.returnValue(of(envelope([])));

    service.getAuthorizations('app-1').subscribe();

    const [path, params] = apiSpy.get.calls.mostRecent().args;
    expect(path).toBe('/me/applications/app-1/authorizations');
    expect(params).toBeUndefined();
  });

  it('falls back to config.appId when no applicationId is given', () => {
    configure({ ...testConfig, appId: 'cfg-app' });
    apiSpy.get.and.returnValue(of(envelope([])));

    service.getAuthorizations().subscribe();

    const [path] = apiSpy.get.calls.mostRecent().args;
    expect(path).toBe('/me/applications/cfg-app/authorizations');
  });

  it('errors without issuing a request when neither applicationId nor config.appId is set', (done) => {
    configure({ ...testConfig, appId: undefined });
    service.getAuthorizations().subscribe({
      next: () => done.fail('expected an error'),
      error: (err: Error) => {
        expect(err.message).toContain('applicationId is required');
        expect(apiSpy.get).not.toHaveBeenCalled();
        done();
      },
    });
  });

  it('requires applicationId for menus and favorites too', (done) => {
    configure({ ...testConfig, appId: undefined });
    let errors = 0;
    const assertError = (): void => {
      errors++;
      if (errors === 2) {
        expect(apiSpy.get).not.toHaveBeenCalled();
        done();
      }
    };
    service.getEffectiveMenus().subscribe({ error: assertError });
    service.getFavorites().subscribe({ error: assertError });
  });

  it('yields an empty list for an empty response', (done) => {
    apiSpy.get.and.returnValue(of(envelope([])));

    service.getAuthorizations('app-1').subscribe((res) => {
      expect(res).toEqual([] as never);
      done();
    });
  });
});
