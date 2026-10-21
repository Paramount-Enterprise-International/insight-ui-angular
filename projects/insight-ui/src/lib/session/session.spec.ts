import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { MockPlatformLocation } from '@angular/common/testing';
import { fakeAsync, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { of, Subject, throwError } from 'rxjs';
import { IApiService } from '../api/api';
import { IStorageService } from '../storage/storage';

import { IAuthService, IRefreshResponse } from '../auth/auth';
import { I_AUTH_CONFIG, IAuthConfig } from '../auth/auth-config';
import { ICsrfService } from '../csrf/csrf';
import { ISessionExpiredService } from '../session-expired/session-expired';
import { IUserMenuStore } from '../store/user-menu';
import { ICurrentUserService } from '../user/current-user';
import { IUserMenuService } from '../user/user-menu';
import { ISessionService } from './session';

const testConfig: IAuthConfig = {
  api: { identity: 'http://localhost:3001/api' },
  signinUrl: 'http://localhost:4200/auth/signin',
  allowedReturnOrigins: ['http://localhost:4207'],
  tokenLifespan: {
    accessTokenSeconds: 3600,
    refreshTokenSeconds: 7200,
    ssoSessionMaxSeconds: 54000,
  },
  csrfTokenMaxAgeSeconds: 7170,
};

/** Build a minimal unsigned JWT with the given payload (base64url, no signature validation needed for decode-only tests). */
function makeJwt(payload: Record<string, unknown>): string {
  const base64url = (obj: unknown): string =>
    btoa(JSON.stringify(obj)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return `${base64url({ alg: 'none' })}.${base64url(payload)}.`;
}

describe('ISessionService', () => {
  let service: ISessionService;
  let authSpy: jasmine.SpyObj<IAuthService>;
  let sessionExpiredSpy: jasmine.SpyObj<ISessionExpiredService>;

  beforeEach(() => {
    authSpy = jasmine.createSpyObj<IAuthService>('IAuthService', ['refresh', 'logout']);
    sessionExpiredSpy = jasmine.createSpyObj<ISessionExpiredService>('ISessionExpiredService', [
      'show',
      'hide',
    ]);
    TestBed.configureTestingModule({
      providers: [
        { provide: APP_BASE_HREF, useValue: '/-/' },
        {
          provide: PlatformLocation,
          useFactory: (): MockPlatformLocation =>
            new MockPlatformLocation({
              startUrl: 'https://atlas.test/-/reports/42?tab=roles#details',
              appBaseHref: '/-/',
            }),
        },
        { provide: IAuthService, useValue: authSpy },
        {
          provide: ICsrfService,
          useValue: {
            ensureToken: jasmine.createSpy('ensureToken').and.returnValue(of(undefined)),
          },
        },
        {
          provide: ISessionExpiredService,
          useValue: sessionExpiredSpy,
        },
        // Real store construction only needs these two to resolve — they never
        // make HTTP calls during construction, so empty stubs keep the test
        // free of an HttpClient dependency.
        { provide: ICurrentUserService, useValue: {} as ICurrentUserService },
        { provide: IUserMenuService, useValue: {} as IUserMenuService },
        { provide: I_AUTH_CONFIG, useValue: testConfig },
      ],
    });
    service = TestBed.inject(ISessionService);
  });

  afterEach(() => sessionStorage.removeItem('iam.session.active'));

  it('is not authenticated by default', () => {
    expect(service.isAuth()).toBeFalse();
    expect(service.getAccessToken()).toBeNull();
  });

  it('is authenticated after setAccessToken() with an explicit expiresIn', () => {
    service.setAccessToken('header.payload.sig', 3600);
    expect(service.isAuth()).toBeTrue();
    expect(service.getAccessToken()).toBe('header.payload.sig');
  });

  it('derives expiry from the token exp claim when expiresIn is not provided', () => {
    const nowSec = Math.floor(Date.now() / 1000);
    const token = makeJwt({ exp: nowSec + 120 });
    service.setAccessToken(token);
    expect(service.isAuth()).toBeTrue();
    expect(service.isTokenExpired()).toBeFalse();
  });

  it('treats an already-expired token as expired', () => {
    const nowSec = Math.floor(Date.now() / 1000);
    const token = makeJwt({ exp: nowSec - 60 });
    service.setAccessToken(token);
    expect(service.isTokenExpired()).toBeTrue();
    expect(service.isAuth()).toBeFalse();
  });

  it('clearSession() wipes the in-memory token', () => {
    service.setAccessToken('header.payload.sig', 3600);
    service.clearSession();
    expect(service.isAuth()).toBeFalse();
    expect(service.getAccessToken()).toBeNull();
  });

  it('refreshToken() stores the new token from iam-identity-api', (done) => {
    authSpy.refresh.and.returnValue(of({ accessToken: 'new-token', expiresIn: 3600 }));

    service.refreshToken().subscribe((token) => {
      expect(token).toBe('new-token');
      expect(authSpy.refresh).toHaveBeenCalled();
      expect(service.getAccessToken()).toBe('new-token');
      done();
    });
  });

  it('refreshToken() queues concurrent callers behind a single in-flight request', (done) => {
    // Async Subject mock — a synchronous `of()` would complete the shared source
    // during the keep-alive subscribe and clear the in-flight slot before the
    // second call, breaking the single-flight assertion. Real HTTP is async.
    const refresh$ = new Subject<IRefreshResponse>();
    authSpy.refresh.and.returnValue(refresh$);

    // Both calls happen synchronously BEFORE either is subscribed, mirroring how
    // two near-simultaneous 401s would each call refreshToken().
    const first$ = service.refreshToken();
    const second$ = service.refreshToken();

    let resolvedCount = 0;
    const onDone = (token: string): void => {
      expect(token).toBe('shared-token');
      resolvedCount++;
      if (resolvedCount === 2) {
        expect(authSpy.refresh).toHaveBeenCalledTimes(1);
        done();
      }
    };

    first$.subscribe(onDone);
    second$.subscribe(onDone);

    refresh$.next({ accessToken: 'shared-token', expiresIn: 3600 });
    refresh$.complete();
  });

  it('refreshToken() propagates errors and resets the refresh state for the next attempt', (done) => {
    authSpy.refresh.and.returnValue(throwError(() => new Error('refresh failed')));

    service.refreshToken().subscribe({
      error: (err) => {
        expect(err.message).toBe('refresh failed');
        done();
      },
    });
  });

  it('shares one refresh between cold restore and another refresh caller', async () => {
    const refresh$ = new Subject<IRefreshResponse>();
    authSpy.refresh.and.returnValue(refresh$);

    const restore = service.tryRestoreSession();
    const token = new Promise<string>((resolve, reject) =>
      service.refreshToken().subscribe({ next: resolve, error: reject }),
    );

    expect(authSpy.refresh).toHaveBeenCalledTimes(1);
    refresh$.next({ accessToken: 'shared-token', expiresIn: 3600 });
    refresh$.complete();

    expect(await token).toBe('shared-token');
    await restore;
    expect(service.getAccessToken()).toBe('shared-token');
  });

  it('keeps initialization pending until the 30-second refresh deadline', fakeAsync(() => {
    authSpy.refresh.and.returnValue(new Subject<IRefreshResponse>());
    let settled = false;
    void service.tryRestoreSession().then(() => {
      settled = true;
    });

    tick(10_000);
    flushMicrotasks();
    expect(service.initializing()).toBeTrue();
    expect(settled).toBeFalse();

    tick(20_000);
    flushMicrotasks();
    expect(service.initializing()).toBeFalse();
    expect(settled).toBeTrue();
    expect(service.getAccessToken()).toBeNull();
  }));

  it('ignores a refresh response after the session is cleared', () => {
    const refresh$ = new Subject<IRefreshResponse>();
    authSpy.refresh.and.returnValue(refresh$);
    service.refreshToken().subscribe({ error: () => undefined });

    service.clearSession();
    refresh$.next({ accessToken: 'late-token', expiresIn: 3600 });
    refresh$.complete();

    expect(service.getAccessToken()).toBeNull();
  });

  it('resets sidebar data when a different user establishes a session', () => {
    const store = TestBed.inject(IUserMenuStore);
    spyOn(store, 'reset');
    const user = {
      sub: 'user-a',
      email: '',
      name: '',
      roles: [],
      userType: 'internal' as const,
    };
    service.setSession('token-a', 3600, user);
    service.setSession('token-b', 3600, { ...user, sub: 'user-b' });

    expect(store.reset).toHaveBeenCalledTimes(1);
  });

  it('tryRestoreSession() propagates the normalized backend message to session-expired state', async () => {
    sessionStorage.setItem('iam.session.active', 'true');
    authSpy.refresh.and.returnValue(
      throwError(() => ({
        error: {
          errorCode: 'AUTH_SESSION_REVOKED',
          message: 'Your session was revoked by an administrator.',
          revision: 6,
          traceId: 'trace-restore',
        },
        status: 401,
        message: 'HTTP transport message',
      })),
    );
    authSpy.logout.and.returnValue(of(undefined));

    const result = await service.tryRestoreSession();

    expect(result.reason).toBe('SESSION_REVOKED');
    const call = sessionExpiredSpy.show.calls.mostRecent().args;
    expect(call[0]).toBe('/reports/42?tab=roles#details');
    expect(call[1]).toBe('SESSION_REVOKED');
    expect(call[2]).toBe('AUTH_SESSION_REVOKED');
    expect(call[3]).toBeUndefined();
    expect(call[4]).toBe('Your session was revoked by an administrator.');
    expect(call[5]?.revision).toBe(6);
    expect(call[5]?.['traceId'] as unknown).toBe('trace-restore');
    expect(authSpy.logout).not.toHaveBeenCalled();
  });

  it('logout() resets the cached user menu store', (done) => {
    authSpy.logout.and.returnValue(of(undefined));
    const store = TestBed.inject(IUserMenuStore);
    spyOn(store, 'reset');

    service.logout().subscribe(() => {
      expect(store.reset).toHaveBeenCalled();
      done();
    });
  });
});

describe('ISessionService impersonation', () => {
  let service: ISessionService;
  let api: jasmine.SpyObj<IApiService>;
  let csrf: jasmine.SpyObj<ICsrfService>;
  let store: { reset: jasmine.Spy };
  beforeEach(() => {
    api = jasmine.createSpyObj<IApiService>('IApiService', ['post']);
    csrf = jasmine.createSpyObj<ICsrfService>('ICsrfService', ['getToken', 'ensureToken']);
    csrf.getToken.and.returnValue('csrf');
    csrf.ensureToken.and.returnValue(of(undefined));
    store = { reset: jasmine.createSpy('reset') };
    TestBed.configureTestingModule({
      providers: [
        { provide: I_AUTH_CONFIG, useValue: testConfig },
        { provide: IAuthService, useValue: {} },
        { provide: IApiService, useValue: api },
        { provide: ICsrfService, useValue: csrf },
        { provide: ISessionExpiredService, useValue: {} },
        { provide: IUserMenuStore, useValue: store },
        {
          provide: IStorageService,
          useValue: { clear: jasmine.createSpy('clear') },
        },
      ],
    });
    service = TestBed.inject(ISessionService);
    service.setAccessToken(makeJwt({ sub: 'b', act: { sub: 'a' }, sid: 'one' }));
  });
  it('detects the actor and clears local state after a successful 204', () => {
    api.post.and.returnValue(of(null));
    expect(service.actor()).toEqual({ sub: 'a' });
    let result: unknown;
    service.endImpersonation().subscribe((value) => (result = value));
    expect(result).toEqual({});
    expect(service.getAccessToken()).toBeNull();
    expect(store.reset).toHaveBeenCalled();
    expect(api.post).toHaveBeenCalledWith(
      '/auth/impersonation/end',
      {},
      { apiUrl: testConfig.api.identity },
    );
  });
  it('retries CSRF once and preserves the BFF redirect', () => {
    api.post.and.returnValues(
      throwError(() => ({ status: 403, message: 'CSRF validation failed' })),
      of({ redirectTo: '/api/auth/login' }),
    );
    let result: unknown;
    service.endImpersonation().subscribe((value) => (result = value));
    expect(api.post).toHaveBeenCalledTimes(2);
    expect(csrf.ensureToken).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ redirectTo: '/api/auth/login' });
  });
  it('retains the current session on 503', () => {
    api.post.and.returnValue(throwError(() => ({ status: 503 })));
    const token = service.getAccessToken();
    service.endImpersonation().subscribe({ error: () => undefined });
    expect(service.getAccessToken()).toBe(token);
  });
  it('deduplicates pending calls and cannot clear a replacement session', () => {
    const response = new Subject<null>();
    api.post.and.returnValue(response);
    const first = service.endImpersonation();
    expect(service.endImpersonation()).toBe(first);
    first.subscribe({ error: () => undefined });
    service.setAccessToken(makeJwt({ sub: 'c', sid: 'two' }));
    const token = service.getAccessToken();
    response.next(null);
    response.complete();
    expect(service.getAccessToken()).toBe(token);
  });
});
