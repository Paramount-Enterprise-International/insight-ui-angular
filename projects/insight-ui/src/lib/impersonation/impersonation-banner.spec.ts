import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of, tap, throwError } from 'rxjs';
import { getDefaultIAuthConfig, I_AUTH_CONFIG } from '../auth/auth-config';
import { IAlertService, IConfirmService } from '../dialog/dialog';
import { ISessionService } from '../session/session';
import { IUserMenuStore } from '../store/user-menu';
import { IHImpersonationBanner } from './impersonation-banner';
import { IImpersonationStateService } from './impersonation-state';
import { type IImpersonationStatus, normalizeImpersonationStatus } from './impersonation-utils';
const NOW = new Date('2026-10-08T03:00:00.000Z').getTime();
const HOUR = 3_600_000;

const impersonating = (
  endAt: string,
  overrides: Record<string, unknown> = {},
): Record<string, unknown> => ({
  mode: 'IMPERSONATING',
  grantId: 'grant-1',
  impersonatingUser: { fullName: 'Sri Mulyani' },
  impersonatedUser: { fullName: 'Nina Kartika', jabatan: 'Approval Manager' },
  startDate: '2026-10-05',
  endDate: '2026-10-09',
  startAt: '2026-10-04T17:00:00.000Z',
  endAt,
  ...overrides,
});

describe('IHImpersonationBanner', () => {
  let fixture: ComponentFixture<IHImpersonationBanner>;
  let state: {
    status: ReturnType<typeof signal<IImpersonationStatus | null>>;
    loadStatus: jasmine.Spy;
  };
  let sessions: jasmine.SpyObj<ISessionService>;
  let confirm: jasmine.SpyObj<IConfirmService>;
  let alerts: jasmine.SpyObj<IAlertService>;
  let redirect: jasmine.Spy;
  const setup = (
    options: { act?: boolean; status?: Observable<unknown>; actor?: Record<string, string> } = {},
  ): void => {
    const status = signal<IImpersonationStatus | null>(null);
    state = {
      status,
      loadStatus: jasmine
        .createSpy('loadStatus')
        .and.callFake(() =>
          (options.status ?? of(impersonating('2026-10-09T16:59:59.999Z'))).pipe(
            tap((value) => status.set(normalizeImpersonationStatus(value, 'iam-user'))),
          ),
        ),
    };
    sessions = jasmine.createSpyObj<ISessionService>('ISessionService', [
      'isImpersonating',
      'getAccessToken',
      'getUser',
      'endImpersonation',
    ]);
    sessions.isImpersonating.and.returnValue(options.act ?? true);
    sessions.getAccessToken.and.returnValue(
      'e30.' + btoa(JSON.stringify({ act: options.actor ?? { sub: 'kc-a' } })) + '.sig',
    );
    sessions.getUser.and.returnValue({
      sub: 'kc-b',
      email: '',
      name: 'Nina (token)',
      roles: [],
      userType: 'internal',
    });
    sessions.endImpersonation.and.returnValue(of({}));
    Object.defineProperty(sessions, 'impersonationContext', { value: signal('context') });
    confirm = jasmine.createSpyObj<IConfirmService>('IConfirmService', ['danger']);
    confirm.danger.and.returnValue(of(true));
    alerts = jasmine.createSpyObj<IAlertService>('IAlertService', ['information']);
    alerts.information.and.returnValue(of(true));
    TestBed.configureTestingModule({
      imports: [IHImpersonationBanner],
      providers: [
        { provide: IImpersonationStateService, useValue: state },
        { provide: ISessionService, useValue: sessions },
        { provide: IUserMenuStore, useValue: { rawCurrentUser: signal(null) } },
        { provide: IConfirmService, useValue: confirm },
        { provide: IAlertService, useValue: alerts },
        {
          provide: I_AUTH_CONFIG,
          useValue: {
            ...getDefaultIAuthConfig(),
            api: { identity: 'https://identity.test/api' },
            signinUrl: '/auth/signin',
          },
        },
      ],
    });
    fixture = TestBed.createComponent(IHImpersonationBanner);
    redirect = spyOn<any>(fixture.componentInstance, 'redirect');
    fixture.detectChanges();
    fixture.detectChanges();
  };
  beforeEach(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(NOW));
  });
  afterEach(() => {
    fixture?.destroy();
    jasmine.clock().uninstall();
  });
  const banner = (): HTMLElement | null =>
    fixture.nativeElement.querySelector('[data-testid="impersonation-banner"]');
  const byTestId = (id: string): string =>
    (fixture.nativeElement.querySelector(`[data-testid="${id}"]`)?.textContent ?? '')
      .replace(/\s+/g, ' ')
      .trim();
  const endButton = (): HTMLButtonElement =>
    fixture.nativeElement.querySelector(
      '[data-testid="end-impersonation"] button',
    ) as HTMLButtonElement;

  it('render_Impersonating_ShowsDetailsAndMakesLogoutHintAvailableThroughInfo', () => {
    setup();

    expect(banner()).not.toBeNull();
    expect(byTestId('banner-actor')).toBe('Sri Mulyani');
    expect(byTestId('banner-subject')).toBe('Nina Kartika (Approval Manager)');
    expect(byTestId('banner-end-date')).toBe('09 Oct 2026');
    expect(endButton().textContent).toContain('End Impersonate Session');
    const info = fixture.nativeElement.querySelector(
      '[data-testid="impersonation-info"] button',
    ) as HTMLButtonElement;
    expect(info.getAttribute('aria-label')).toBe('About impersonation sessions');
    info.click();
    expect(alerts.information).toHaveBeenCalledWith(
      'About Impersonation Sessions',
      jasmine.stringContaining(
        'To end only this session (the grant stays active), log out normally',
      ),
    );
    expect(banner()?.getAttribute('aria-label')).toBe('Impersonation session');
  });

  it('render_MoreThan24HoursLeft_HidesCountdown', () => {
    setup({ status: of(impersonating(new Date(NOW + 30 * HOUR).toISOString())) });

    expect(fixture.nativeElement.querySelector('[data-testid="banner-countdown"]')).toBeNull();
  });

  it('countdown_LessThan24HoursLeft_ShowsAndUpdatesEverySecond', () => {
    setup({ status: of(impersonating(new Date(NOW + 2 * HOUR + 5_000).toISOString())) });
    expect(byTestId('banner-countdown')).toBe('02:00:05');

    jasmine.clock().tick(1000);
    fixture.detectChanges();

    expect(byTestId('banner-countdown')).toBe('02:00:04');
  });

  it('countdown_CrossesThe24HourMark_StartsShowingCountdown', () => {
    setup({ status: of(impersonating(new Date(NOW + 24 * HOUR + 2_000).toISOString())) });
    expect(fixture.nativeElement.querySelector('[data-testid="banner-countdown"]')).toBeNull();

    jasmine.clock().tick(3_000);
    fixture.detectChanges();

    expect(byTestId('banner-countdown')).toBe('23:59:59');
  });

  it('countdown_GrantEnded_ShowsZeroAndStops', () => {
    setup({ status: of(impersonating(new Date(NOW + 1_500).toISOString())) });

    jasmine.clock().tick(5_000);
    fixture.detectChanges();

    expect(byTestId('banner-countdown')).toBe('00:00:00');
  });

  it('render_NotImpersonatingToken_RendersNothingAndSkipsStatusCall', () => {
    setup({ act: false });

    expect(banner()).toBeNull();
    expect(state.loadStatus).not.toHaveBeenCalled();
  });

  it('render_StatusNone_RendersNothing', () => {
    setup({ status: of({ mode: 'NONE' }) });

    expect(banner()).toBeNull();
  });

  it('render_StatusHasActiveGrant_RendersNothing', () => {
    setup({
      status: of({ mode: 'HAS_ACTIVE_GRANT', impersonatedUser: { fullName: 'Nina Kartika' } }),
    });

    expect(banner()).toBeNull();
  });

  it('render_StatusUnavailable_KeepsBannerWithSessionDetails', () => {
    spyOn(console, 'warn');
    setup({ status: throwError(() => ({ status: 503 })) });

    expect(banner()).not.toBeNull();
    expect(byTestId('banner-subject')).toBe('Nina (token)');
    expect(byTestId('banner-actor')).toBe('kc-a');
  });

  it('render_StatusUnavailable_PreservesActorNameFromToken', () => {
    spyOn(console, 'warn');
    setup({
      actor: { sub: 'kc-a', name: 'Actor from token' },
      status: throwError(() => ({ status: 503 })),
    });

    expect(banner()).not.toBeNull();
    expect(byTestId('banner-actor')).toBe('Actor from token');
  });

  it('endSession_Confirmed_EndsImpersonationAndGoesToSignin', () => {
    setup();

    endButton().click();

    expect(confirm.danger).toHaveBeenCalledWith(
      'End Impersonate Session',
      jasmine.stringContaining('revoke'),
    );
    expect(sessions.endImpersonation).toHaveBeenCalledTimes(1);
    expect(redirect).toHaveBeenCalledWith({});
  });

  it('endSession_ConfirmCancelled_DoesNothing', () => {
    setup();
    confirm.danger.and.returnValue(of(false));

    endButton().click();

    expect(sessions.endImpersonation).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });

  it('endSession_Fails_ShowsResolvedErrorAndStaysOnPage', () => {
    setup();
    sessions.endImpersonation.and.returnValue(
      throwError(() => ({ status: 503, message: 'Service unavailable.' })),
    );

    endButton().click();
    fixture.detectChanges();

    expect(redirect).not.toHaveBeenCalled();
    expect(fixture.nativeElement.querySelector('[role="alert"]')?.textContent).toContain(
      'Service unavailable.',
    );
    expect(endButton().disabled).toBeFalse();
  });

  it('endButton_IsANativeButton_ReachableByKeyboard', () => {
    setup();

    expect(endButton().tagName).toBe('BUTTON');
    expect(endButton().tabIndex).toBe(0);
  });
});
