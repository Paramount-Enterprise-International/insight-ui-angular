import { TestBed } from '@angular/core/testing';

import { SessionExpiredService } from './session-expired.service';

describe('SessionExpiredService', () => {
  let service: SessionExpiredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionExpiredService);
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
