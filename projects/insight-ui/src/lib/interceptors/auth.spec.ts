import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MockPlatformLocation } from '@angular/common/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Subject, throwError } from 'rxjs';
import { IApiService } from '../api/api';
import { I_AUTH_CONFIG, type IAuthConfig } from '../auth/auth-config';
import { ICsrfService } from '../csrf/csrf';
import { ISessionExpiredService } from '../session-expired/session-expired';
import { ISessionService } from '../session/session';
import { authInterceptor } from './auth';

describe('auth refresh retry contracts', () => {
  let api: IApiService;
  let http: HttpTestingController;
  let session: jasmine.SpyObj<ISessionService>;
  let csrf: jasmine.SpyObj<ICsrfService>;
  let expired: jasmine.SpyObj<ISessionExpiredService>;
  let refreshed: Subject<string>;
  const config: IAuthConfig = {
    api: { identity: 'https://app.test/api' },
    signinUrl: 'https://app.test/signin',
    allowedReturnOrigins: [],
    tokenLifespan: {
      accessTokenSeconds: 3600,
      refreshTokenSeconds: 7200,
      ssoSessionMaxSeconds: 54000,
    },
    csrfTokenMaxAgeSeconds: 7170,
  };
  beforeEach(() => {
    config.onUnauthorized = undefined;
    config.unauthorizedHandling = undefined;
    refreshed = new Subject<string>();
    session = jasmine.createSpyObj('session', ['getAccessToken', 'refreshToken', 'clearSession']);
    session.getAccessToken.and.returnValue('old');
    session.refreshToken.and.returnValue(refreshed);
    csrf = jasmine.createSpyObj('csrf', ['getToken']);
    csrf.getToken.and.returnValue('csrf-old');
    expired = jasmine.createSpyObj('expired', ['show']);
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
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: I_AUTH_CONFIG, useValue: config },
        { provide: ISessionService, useValue: session },
        { provide: ICsrfService, useValue: csrf },
        { provide: ISessionExpiredService, useValue: expired },
      ],
    });
    api = TestBed.inject(IApiService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    refreshed.complete();
    http.verify();
  });

  it('expires invalid impersonation immediately without refresh', () => {
    api.get('/item').subscribe({ error: () => undefined });
    http
      .expectOne(config.api.identity + '/item')
      .flush(
        { errorCode: 'IMPERSONATION_SESSION_INVALID', message: 'Ended' },
        { status: 401, statusText: 'Unauthorized' },
      );
    expect(session.refreshToken).not.toHaveBeenCalled();
    expect(session.clearSession).toHaveBeenCalledTimes(1);
    expect(expired.show).toHaveBeenCalledWith(
      '/reports/42?tab=roles#details',
      'SESSION_REVOKED',
      'IMPERSONATION_SESSION_INVALID',
      undefined,
      'Ended',
      jasmine.anything(),
    );
  });
  it('does not refresh End Session and retains a retryable failure', () => {
    api.post('/auth/impersonation/end', {}).subscribe({ error: () => undefined });
    http
      .expectOne(config.api.identity + '/auth/impersonation/end')
      .flush({ message: 'Unavailable' }, { status: 503, statusText: 'Unavailable' });
    expect(session.refreshToken).not.toHaveBeenCalled();
    expect(session.clearSession).not.toHaveBeenCalled();
  });

  it('replaces Authorization and CSRF once, without treating retry business errors as refresh failure', () => {
    let status: number | undefined;
    api.get('/item').subscribe({ error: (error) => (status = error.status) });
    const first = http.expectOne(config.api.identity + '/item');
    expect(first.request.headers.get('Authorization')).toBe('Bearer old');
    first.flush({}, { status: 401, statusText: 'Unauthorized' });
    csrf.getToken.and.returnValue('csrf-new');
    refreshed.next('new');
    const retry = http.expectOne(config.api.identity + '/item');
    expect(retry.request.headers.get('Authorization')).toBe('Bearer new');
    expect(retry.request.headers.get('X-CSRF-Token')).toBe('csrf-new');
    retry.flush({ Message: 'Invalid' }, { status: 400, statusText: 'Bad Request' });
    expect(status).toBe(400);
    expect(session.clearSession).not.toHaveBeenCalled();
    expect(expired.show).not.toHaveBeenCalled();
    expect(session.refreshToken).toHaveBeenCalledTimes(1);
  });

  for (const errorCode of [
    'AUTH_TOKEN_EXPIRED',
    'AUTH_NO_SESSION',
    'AUTH_SESSION_REVOKED',
    'AUTH_SESSION_REPLACED',
  ]) {
    it(`expires when IAM refresh rejects the session with ${errorCode}`, () => {
      session.refreshToken.and.returnValue(throwError(() => ({ status: 401, errorCode })));
      api.get('/item').subscribe({ error: (error) => expect(error.errorCode).toBe(errorCode) });
      http
        .expectOne(config.api.identity + '/item')
        .flush({}, { status: 401, statusText: 'Unauthorized' });
      expect(session.clearSession).toHaveBeenCalledTimes(1);
      expect(expired.show).toHaveBeenCalledTimes(1);
      expect(session.refreshToken).toHaveBeenCalledTimes(1);
    });
  }

  for (const mode of ['dialog', 'redirect', 'handler'] as const) {
    it(`propagates retry 401 from a business API without ${mode} expiry handling`, () => {
      const onUnauthorized = jasmine.createSpy('onUnauthorized');
      if (mode === 'handler') config.onUnauthorized = onUnauthorized;
      else config.unauthorizedHandling = mode;
      const currentUrl = window.location.href;
      let received: unknown;
      const options = { apiUrl: 'https://business.test/api' };
      api.get('/item', undefined, options).subscribe({ error: (error) => (received = error) });
      http
        .expectOne(options.apiUrl + '/item')
        .flush({}, { status: 401, statusText: 'Unauthorized' });
      refreshed.next('new');
      const retry = http.expectOne(options.apiUrl + '/item');
      expect(retry.request.headers.get('Authorization')).toBe('Bearer new');
      retry.flush(
        { errorCode: 'BUSINESS_UNAUTHORIZED', message: 'Local credentials rejected' },
        { status: 401, statusText: 'Unauthorized' },
      );
      expect(received).toEqual(
        jasmine.objectContaining({ status: 401, errorCode: 'BUSINESS_UNAUTHORIZED' }),
      );
      expect(session.refreshToken).toHaveBeenCalledTimes(1);
      expect(session.clearSession).not.toHaveBeenCalled();
      expect(expired.show).not.toHaveBeenCalled();
      expect(onUnauthorized).not.toHaveBeenCalled();
      expect(window.location.href).toBe(currentUrl);
    });
  }

  for (const failure of [
    { status: 0, errorCode: 'NETWORK_ERROR' },
    { status: 0, name: 'TimeoutError', errorCode: 'REQUEST_TIMEOUT' },
    { status: 0, name: 'AbortError', errorCode: 'REQUEST_ABORTED' },
    { status: 500, errorCode: 'INTERNAL_SERVER_ERROR' },
    { status: 503, errorCode: 'AUTH_SSO_UNAVAILABLE' },
    { status: 503, errorCode: 'AUTH_SESSION_REVOKED' },
    { status: 403, errorCode: 'CSRF_INVALID' },
  ]) {
    it(`preserves the session when refresh fails with ${failure.status}/${failure.errorCode}`, () => {
      const onUnauthorized = jasmine.createSpy('onUnauthorized');
      config.onUnauthorized = onUnauthorized;
      session.refreshToken.and.returnValue(throwError(() => failure));
      let received: unknown;
      api.get('/item').subscribe({ error: (error) => (received = error) });
      http
        .expectOne(config.api.identity + '/item')
        .flush({}, { status: 401, statusText: 'Unauthorized' });
      expect(received).toEqual(jasmine.objectContaining(failure));
      expect(session.refreshToken).toHaveBeenCalledTimes(1);
      expect(session.clearSession).not.toHaveBeenCalled();
      expect(expired.show).not.toHaveBeenCalled();
      expect(onUnauthorized).not.toHaveBeenCalled();
    });
  }

  it('retains invalid impersonation expiry on the retry', () => {
    api.get('/item').subscribe({ error: () => undefined });
    http
      .expectOne(config.api.identity + '/item')
      .flush({}, { status: 401, statusText: 'Unauthorized' });
    refreshed.next('new');
    http
      .expectOne(config.api.identity + '/item')
      .flush(
        { errorCode: 'IMPERSONATION_SESSION_INVALID' },
        { status: 401, statusText: 'Unauthorized' },
      );
    expect(session.refreshToken).toHaveBeenCalledTimes(1);
    expect(session.clearSession).toHaveBeenCalledTimes(1);
    expect(expired.show).toHaveBeenCalledTimes(1);
  });

  it('retains immediate expiry for unauthorized End Impersonation', () => {
    api.post('/auth/impersonation/end', {}).subscribe({ error: () => undefined });
    http
      .expectOne(config.api.identity + '/auth/impersonation/end')
      .flush({}, { status: 401, statusText: 'Unauthorized' });
    expect(session.refreshToken).not.toHaveBeenCalled();
    expect(session.clearSession).toHaveBeenCalledTimes(1);
    expect(expired.show).toHaveBeenCalledTimes(1);
  });

  it('invokes the configured handler only for IAM session rejection', () => {
    const rejection = { status: 401, errorCode: 'AUTH_SESSION_REVOKED' };
    const onUnauthorized = jasmine.createSpy('onUnauthorized');
    config.onUnauthorized = onUnauthorized;
    session.refreshToken.and.returnValue(throwError(() => rejection));
    api.get('/item').subscribe({ error: () => undefined });
    http
      .expectOne(config.api.identity + '/item')
      .flush({}, { status: 401, statusText: 'Unauthorized' });
    expect(onUnauthorized).toHaveBeenCalledOnceWith(rejection);
    expect(session.clearSession).toHaveBeenCalledTimes(1);
    expect(expired.show).not.toHaveBeenCalled();
  });

  it('passes bearer-free and auth endpoint requests without refresh', () => {
    api
      .get('/public', undefined, { skipBearer: true })
      .subscribe({ error: (error) => expect(error.status).toBe(401) });
    const request = http.expectOne(config.api.identity + '/public');
    expect(request.request.headers.has('Authorization')).toBeFalse();
    expect(request.request.headers.has('X-IH-Skip-Bearer')).toBeFalse();
    request.flush({}, { status: 401, statusText: 'Unauthorized' });
    api.post('/auth/logout', {}).subscribe({ error: (error) => expect(error.status).toBe(401) });
    const logout = http.expectOne(config.api.identity + '/auth/logout');
    expect(logout.request.headers.has('Authorization')).toBeFalse();
    logout.flush({}, { status: 401, statusText: 'Unauthorized' });
    expect(session.refreshToken).not.toHaveBeenCalled();
  });

  it('does not reset the total deadline during refresh or expire on request timeout', fakeAsync(() => {
    let code: string | undefined;
    api.get('/slow').subscribe({ error: (error) => (code = error.errorCode) });
    const request = http.expectOne(config.api.identity + '/slow');
    tick(50_000);
    request.flush({}, { status: 401, statusText: 'Unauthorized' });
    tick(10_000);
    expect(code).toBe('REQUEST_TIMEOUT');
    refreshed.next('new');
    http.expectNone(config.api.identity + '/slow');
    expect(expired.show).not.toHaveBeenCalled();
  }));

  it('cancels one refresh waiter while another can retry', () => {
    const controller = new AbortController();
    api.get('/a', undefined, { signal: controller.signal }).subscribe({
      error: (error) => expect(error.errorCode).toBe('REQUEST_ABORTED'),
    });
    api.get('/b').subscribe((result) => expect(result).toEqual({ ok: true }));
    http
      .expectOne(config.api.identity + '/a')
      .flush({}, { status: 401, statusText: 'Unauthorized' });
    http
      .expectOne(config.api.identity + '/b')
      .flush({}, { status: 401, statusText: 'Unauthorized' });
    controller.abort();
    refreshed.next('new');
    http.expectNone(config.api.identity + '/a');
    http.expectOne(config.api.identity + '/b').flush({ ok: true });
    expect(session.clearSession).not.toHaveBeenCalled();
    expect(expired.show).not.toHaveBeenCalled();
  });
});
