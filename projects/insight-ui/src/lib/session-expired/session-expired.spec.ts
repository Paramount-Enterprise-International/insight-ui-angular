import { TestBed } from '@angular/core/testing';
import {
  isSessionExpiredError,
  ISessionExpiredService,
  toSessionExpiredReason,
} from './session-expired';

describe('isSessionExpiredError', () => {
  it('recognizes IAM rejection statuses and legacy session codes', () => {
    expect(isSessionExpiredError({ status: 401 })).toBeTrue();
    expect(isSessionExpiredError({ status: 498 })).toBeTrue();
    expect(isSessionExpiredError({ error: { code: 'SESSION_REVOKED' } })).toBeTrue();
    expect(isSessionExpiredError({ status: 403, errorCode: 'CSRF_INVALID' })).toBeFalse();
  });

  for (const failure of [
    { status: 0 },
    { status: 500 },
    { status: 503 },
    { name: 'AbortError' },
    { name: 'TimeoutError' },
  ]) {
    it(`does not classify ${JSON.stringify(failure)} as expiry even with a session code`, () => {
      expect(isSessionExpiredError({ ...failure, errorCode: 'AUTH_NO_SESSION' })).toBeFalse();
    });
  }

  it('does not classify missing or unrecognized errors as expiry', () => {
    expect(isSessionExpiredError(null)).toBeFalse();
    expect(isSessionExpiredError(new Error('Refresh timed out'))).toBeFalse();
  });
});

describe('ISessionExpiredService', () => {
  let service: ISessionExpiredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ISessionExpiredService);
  });

  it('starts hidden with no reason or backend error state', () => {
    expect(service.visible()).toBe(false);
    expect(service.reason()).toBeUndefined();
    expect(service.errorCode()).toBeNull();
    expect(service.detail()).toBeNull();
    expect(service.message()).toBeNull();
    expect(service.apiError()).toBeNull();
  });

  it('show stores legacy arguments plus the appended message and normalized error', () => {
    const apiError = {
      errorCode: 'AUTH_SESSION_REPLACED',
      message: 'Current backend message',
      revision: 9,
      traceId: 'trace-789',
    };
    service.show(
      '/admin/users',
      'SESSION_REPLACED',
      'AUTH_SESSION_REPLACED',
      'Signed in from another device',
      'Current backend message',
      apiError,
    );

    expect(service.visible()).toBe(true);
    expect(service.returnUrl()).toBe('/admin/users');
    expect(service.reason()).toBe('SESSION_REPLACED');
    expect(service.errorCode()).toBe('AUTH_SESSION_REPLACED');
    expect(service.detail()).toBe('Signed in from another device');
    expect(service.message()).toBe('Current backend message');
    expect(service.apiError()).toEqual(apiError);
  });

  it('show with no error info keeps errorCode/detail null and defaults the returnUrl', () => {
    service.show('');

    expect(service.visible()).toBe(true);
    expect(service.returnUrl()).toBe('/');
    expect(service.errorCode()).toBeNull();
    expect(service.detail()).toBeNull();
    expect(service.message()).toBeNull();
    expect(service.apiError()).toBeNull();
  });

  it('hide clears the visible flag only', () => {
    service.show('/x', 'TOKEN_EXPIRED', 'AUTH_TOKEN_EXPIRED', 'expired');
    service.hide();

    expect(service.visible()).toBe(false);
    expect(service.reason()).toBe('TOKEN_EXPIRED');
  });
});

describe('impersonation expiry reason', () => {
  it('maps impersonation invalid to revoked', () => {
    expect(toSessionExpiredReason('IMPERSONATION_SESSION_INVALID')).toBe('SESSION_REVOKED');
  });
});
