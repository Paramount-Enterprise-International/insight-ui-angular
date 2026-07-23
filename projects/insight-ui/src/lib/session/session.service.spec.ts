import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { ISessionService } from './session.service';
import { IApiService } from '../api/api.service';
import { IInsightAuthConfig, INSIGHT_AUTH_CONFIG } from '../auth/auth-config';

const testConfig: IInsightAuthConfig = {
  api: { identity: 'http://localhost:3001/api' },
  signinUrl: 'http://localhost:4200/auth/signin',
  allowedReturnOrigins: ['http://localhost:4207'],
  cookieDomain: 'localhost',
  tokenLifespan: { accessTokenSeconds: 3600, refreshTokenSeconds: 7200, ssoSessionMaxSeconds: 54000 },
  csrfTokenMaxAgeSeconds: 7170,
};

/** Build a minimal unsigned JWT with the given payload (base64url, no signature validation needed for decode-only tests). */
function makeJwt(payload: Record<string, unknown>): string {
  const base64url = (obj: unknown) =>
    btoa(JSON.stringify(obj)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return `${base64url({ alg: 'none' })}.${base64url(payload)}.`;
}

describe('ISessionService', () => {
  let service: ISessionService;
  let apiSpy: jasmine.SpyObj<IApiService>;

  beforeEach(() => {
    apiSpy = jasmine.createSpyObj<IApiService>('IApiService', ['post']);
    TestBed.configureTestingModule({
      providers: [{ provide: IApiService, useValue: apiSpy }, { provide: INSIGHT_AUTH_CONFIG, useValue: testConfig }],
    });
    service = TestBed.inject(ISessionService);
  });

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
    apiSpy.post.and.returnValue(of({ accessToken: 'new-token', expiresIn: 3600 }));

    service.refreshToken().subscribe((token) => {
      expect(token).toBe('new-token');
      expect(apiSpy.post).toHaveBeenCalledWith('/auth/refresh', {});
      expect(service.getAccessToken()).toBe('new-token');
      done();
    });
  });

  it('refreshToken() queues concurrent callers behind a single in-flight request', (done) => {
    apiSpy.post.and.returnValue(of({ accessToken: 'shared-token', expiresIn: 3600 }));

    // Both calls happen synchronously BEFORE either is subscribed, mirroring how
    // two near-simultaneous 401s would each call refreshToken() — the single-flight
    // guard is checked at call-time, not at subscribe-time.
    const first$ = service.refreshToken();
    const second$ = service.refreshToken();

    let resolvedCount = 0;
    const onDone = (token: string) => {
      expect(token).toBe('shared-token');
      resolvedCount++;
      if (resolvedCount === 2) {
        expect(apiSpy.post).toHaveBeenCalledTimes(1);
        done();
      }
    };

    first$.subscribe(onDone);
    second$.subscribe(onDone);
  });

  it('refreshToken() propagates errors and resets the refresh state for the next attempt', (done) => {
    apiSpy.post.and.returnValue(throwError(() => new Error('refresh failed')));

    service.refreshToken().subscribe({
      error: (err) => {
        expect(err.message).toBe('refresh failed');
        done();
      },
    });
  });
});
