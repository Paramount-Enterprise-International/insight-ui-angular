import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { IApiService } from '../api/api';
import { getDefaultIAuthConfig, I_AUTH_CONFIG } from '../auth/auth-config';
import { ISessionService } from '../session/session';
import { IImpersonationStateService } from './impersonation-state';
import { impersonationContextKey, readImpersonationActor } from './impersonation-utils';

describe('IImpersonationStateService', () => {
  let token: string | null;
  let api: jasmine.SpyObj<IApiService>;
  let service: IImpersonationStateService;
  const context = signal('');
  const setToken = (claims: Record<string, unknown>): void => {
    token = 'e30.' + btoa(JSON.stringify(claims)) + '.sig';
    context.set(impersonationContextKey(token));
  };
  beforeEach(() => {
    token = null;
    context.set('');
    api = jasmine.createSpyObj<IApiService>('IApiService', ['get']);
    TestBed.configureTestingModule({
      providers: [
        { provide: IApiService, useValue: api },
        {
          provide: I_AUTH_CONFIG,
          useValue: {
            ...getDefaultIAuthConfig(),
            api: { identity: 'https://bff.test/api', user: 'https://user.test/users' },
          },
        },
        {
          provide: ISessionService,
          useValue: {
            getAccessToken: (): string | null => token,
            impersonationContext: context,
            actor: (): ReturnType<typeof readImpersonationActor> => readImpersonationActor(token),
            isImpersonating: (): boolean => readImpersonationActor(token) !== null,
          },
        },
      ],
    });
    service = TestBed.inject(IImpersonationStateService);
  });
  it('detects only a valid token actor', () => {
    expect(service.isImpersonating()).toBeFalse();
    setToken({ sub: 'b', act: { sub: 'a' } });
    expect(service.actor()).toEqual({ sub: 'a' });
    expect(service.isImpersonating()).toBeTrue();
    setToken({ sub: 'a' });
    expect(service.isImpersonating()).toBeFalse();
  });
  it('uses the BFF auth host when configured', () => {
    TestBed.inject(I_AUTH_CONFIG).impersonation = { source: 'bff' };
    setToken({ sub: 'b', act: { sub: 'a' } });
    api.get.and.returnValue(
      of({
        actor: { sub: 'a', name: 'Actor' },
        user: { name: 'Subject' },
        impersonation: { grantId: 'g' },
      }),
    );
    service.loadStatus().subscribe();
    expect(api.get).toHaveBeenCalledWith('/auth/me', undefined, { apiUrl: 'https://bff.test/api' });
    expect(service.status()?.subjectName).toBe('Subject');
  });

  it('loads and normalizes IAM status, caches it, and clears it', () => {
    setToken({ sub: 'b', act: { sub: 'a' } });
    api.get.and.returnValue(
      of({ mode: 'IMPERSONATING', impersonatingUser: { fullName: 'Actor' } }),
    );
    service.loadStatus().subscribe();
    service.loadStatus().subscribe();
    expect(api.get).toHaveBeenCalledTimes(1);
    expect(service.status()?.actorName).toBe('Actor');
    service.clear();
    expect(service.status()).toBeNull();
  });
  it('ignores stale successes and failures after a context change', () => {
    const response = new Subject<unknown>();
    api.get.and.returnValue(response);
    setToken({ sub: 'b', act: { sub: 'a' }, sid: 'old' });
    const received = jasmine.createSpy('received');
    const failed = jasmine.createSpy('failed');
    service.loadStatus().subscribe({ next: received, error: failed });
    setToken({ sub: 'b', act: { sub: 'c' }, sid: 'new' });
    response.next({ mode: 'IMPERSONATING' });
    response.error(new Error('old'));
    expect(received).not.toHaveBeenCalled();
    expect(failed).not.toHaveBeenCalled();
    expect(service.status()).toBeNull();
  });
});
