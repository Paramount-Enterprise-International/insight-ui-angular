import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Subject, throwError } from 'rxjs';
import { IApiService } from '../api/api';
import { I_AUTH_CONFIG, type IAuthConfig } from '../auth/auth-config';
import { ICsrfService } from '../csrf/csrf';
import { ISessionService } from '../session/session';
import { ISessionExpiredService } from '../session-expired/session-expired';
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
    refreshed = new Subject<string>();
    session = jasmine.createSpyObj('session', ['getAccessToken', 'refreshToken', 'clearSession']);
    session.getAccessToken.and.returnValue('old');
    session.refreshToken.and.returnValue(refreshed);
    csrf = jasmine.createSpyObj('csrf', ['getToken']);
    csrf.getToken.and.returnValue('csrf-old');
    expired = jasmine.createSpyObj('expired', ['show']);
    TestBed.configureTestingModule({
      providers: [
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

  it('expires when refresh fails or the only retry stays unauthorized', () => {
    session.refreshToken.and.returnValue(
      throwError(() => ({ status: 401, errorCode: 'AUTH_SESSION_REVOKED' })),
    );
    api.get('/item').subscribe({ error: (error) => expect(error.status).toBe(401) });
    http
      .expectOne(config.api.identity + '/item')
      .flush({}, { status: 401, statusText: 'Unauthorized' });
    expect(session.clearSession).toHaveBeenCalledTimes(1);
    expect(expired.show).toHaveBeenCalledTimes(1);
    session.refreshToken.and.returnValue(refreshed);
    api.get('/again').subscribe({ error: (error) => expect(error.status).toBe(401) });
    http
      .expectOne(config.api.identity + '/again')
      .flush({}, { status: 401, statusText: 'Unauthorized' });
    refreshed.next('new');
    http
      .expectOne(config.api.identity + '/again')
      .flush({}, { status: 401, statusText: 'Unauthorized' });
    expect(session.refreshToken).toHaveBeenCalledTimes(2);
    expect(expired.show).toHaveBeenCalledTimes(2);
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
    api
      .get('/a', undefined, { signal: controller.signal })
      .subscribe({ error: (error) => expect(error.errorCode).toBe('REQUEST_ABORTED') });
    api.get('/b').subscribe();
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
    expect(expired.show).not.toHaveBeenCalled();
  });
});
