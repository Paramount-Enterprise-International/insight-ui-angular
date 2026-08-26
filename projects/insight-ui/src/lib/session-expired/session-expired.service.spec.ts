import { TestBed } from '@angular/core/testing';

import { SessionExpiredService } from './session-expired.service';

describe('SessionExpiredService', () => {
  let service: SessionExpiredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionExpiredService);
  });

  it('starts hidden with no reason, errorCode or detail', () => {
    expect(service.visible()).toBe(false);
    expect(service.reason()).toBeUndefined();
    expect(service.errorCode()).toBeNull();
    expect(service.detail()).toBeNull();
  });

  it('show stores the returnUrl, reason, raw errorCode and detail', () => {
    service.show('/admin/users', 'SESSION_REPLACED', 'AUTH_SESSION_REPLACED', 'Signed in from another device');

    expect(service.visible()).toBe(true);
    expect(service.returnUrl()).toBe('/admin/users');
    expect(service.reason()).toBe('SESSION_REPLACED');
    expect(service.errorCode()).toBe('AUTH_SESSION_REPLACED');
    expect(service.detail()).toBe('Signed in from another device');
  });

  it('show with no error info keeps errorCode/detail null and defaults the returnUrl', () => {
    service.show('');

    expect(service.visible()).toBe(true);
    expect(service.returnUrl()).toBe('/');
    expect(service.errorCode()).toBeNull();
    expect(service.detail()).toBeNull();
  });

  it('hide clears the visible flag only', () => {
    service.show('/x', 'TOKEN_EXPIRED', 'AUTH_TOKEN_EXPIRED', 'expired');
    service.hide();

    expect(service.visible()).toBe(false);
    expect(service.reason()).toBe('TOKEN_EXPIRED');
  });
});
