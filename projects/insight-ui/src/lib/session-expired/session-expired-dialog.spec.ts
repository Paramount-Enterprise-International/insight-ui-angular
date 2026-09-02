import { ComponentFixture, TestBed } from '@angular/core/testing';

import { getDefaultInsightAuthConfig, INSIGHT_AUTH_CONFIG } from '../auth/auth-config';
import { ISessionExpiredDialog } from './session-expired-dialog';
import { SessionExpiredService } from './session-expired.service';

describe('ISessionExpiredDialog', () => {
  let fixture: ComponentFixture<ISessionExpiredDialog>;
  let service: SessionExpiredService;
  const catalogResolver = jasmine.createSpy('catalogResolver');

  beforeEach(async () => {
    catalogResolver.calls.reset();
    catalogResolver.and.returnValue(undefined);
    await TestBed.configureTestingModule({
      imports: [ISessionExpiredDialog],
      providers: [
        {
          provide: INSIGHT_AUTH_CONFIG,
          useValue: { ...getDefaultInsightAuthConfig(), errorCatalogResolver: catalogResolver },
        },
      ],
    }).compileComponents();

    service = TestBed.inject(SessionExpiredService);
    // The root-level service is a shared singleton across spec files — reset it
    // so each test starts from a hidden overlay.
    service.hide();
    fixture = TestBed.createComponent(ISessionExpiredDialog);
  });

  it('renders nothing while the overlay is hidden', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.session-expired-overlay')).toBeNull();
  });

  it('renders the overlay with the reason-specific title when shown', () => {
    service.show('/home', 'SESSION_REPLACED');
    fixture.detectChanges();

    const overlay = fixture.nativeElement.querySelector('.session-expired-overlay');
    expect(overlay).not.toBeNull();
    expect(overlay.textContent).toContain('Signed Out Remotely');
  });

  it('shows the generic session-expired title for TOKEN_EXPIRED', () => {
    service.show('/home', 'TOKEN_EXPIRED');
    fixture.detectChanges();

    const overlay = fixture.nativeElement.querySelector('.session-expired-overlay');
    expect(overlay.textContent).toContain('Session Expired');
  });

  it('uses backend message before the configured catalog resolver', () => {
    catalogResolver.and.returnValue('Catalog session message');
    service.show(
      '/home',
      'SESSION_REVOKED',
      'AUTH_SESSION_REVOKED',
      'Legacy detail',
      'Backend session message',
      { errorCode: 'AUTH_SESSION_REVOKED', message: 'Backend session message', revision: 3 },
    );
    fixture.detectChanges();

    const message = fixture.nativeElement.querySelector('p');
    expect(message.textContent).toContain('Backend session message');
    expect(catalogResolver).not.toHaveBeenCalled();
  });

  it('uses catalog message before legacy detail and local reason fallback', () => {
    catalogResolver.and.returnValue('Catalog session message');
    service.show(
      '/home',
      'SESSION_REVOKED',
      'AUTH_SESSION_REVOKED',
      'Legacy detail',
      undefined,
      { errorCode: 'AUTH_SESSION_REVOKED', revision: 5, detail: 'Legacy detail' },
    );
    fixture.detectChanges();

    const message = fixture.nativeElement.querySelector('p');
    expect(message.textContent).toContain('Catalog session message');
    expect(catalogResolver).toHaveBeenCalledWith('AUTH_SESSION_REVOKED', 5, jasmine.any(Object));
  });

  it('uses legacy detail when backend and catalog messages are unavailable', () => {
    service.show('/home', 'SESSION_REVOKED', 'AUTH_SESSION_REVOKED', 'Legacy detail');
    fixture.detectChanges();

    const message = fixture.nativeElement.querySelector('p');
    expect(message.textContent).toContain('Legacy detail');
  });
});
