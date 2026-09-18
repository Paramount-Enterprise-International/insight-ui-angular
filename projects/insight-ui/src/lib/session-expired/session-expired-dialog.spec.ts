import { ComponentFixture, TestBed } from '@angular/core/testing';

import { getDefaultIAuthConfig, I_AUTH_CONFIG } from '../auth/auth-config';
import { ISessionExpiredDialog } from './session-expired-dialog';
import { ISessionExpiredService } from './session-expired';

describe('ISessionExpiredDialog', () => {
  let fixture: ComponentFixture<ISessionExpiredDialog>;
  let service: ISessionExpiredService;
  const catalogResolver = jasmine.createSpy('catalogResolver');

  beforeEach(async () => {
    catalogResolver.calls.reset();
    catalogResolver.and.returnValue(undefined);
    await TestBed.configureTestingModule({
      imports: [ISessionExpiredDialog],
      providers: [
        {
          provide: I_AUTH_CONFIG,
          useValue: { ...getDefaultIAuthConfig(), errorCatalogResolver: catalogResolver },
        },
      ],
    }).compileComponents();

    service = TestBed.inject(ISessionExpiredService);
    // The root-level service is a shared singleton across spec files — reset it
    // so each test starts from a hidden overlay.
    service.hide();
    fixture = TestBed.createComponent(ISessionExpiredDialog);
  });

  it('renders nothing while the overlay is hidden', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('i-dialog-container')).toBeNull();
  });

  it('renders the overlay with the reason-specific title when shown', () => {
    service.show('/home', 'SESSION_REPLACED');
    fixture.detectChanges();

    const overlay = fixture.nativeElement.querySelector('i-dialog-container');
    expect(overlay).not.toBeNull();
    expect(overlay.textContent).toContain('Signed Out Remotely');
  });

  it('shows the generic session-expired title for TOKEN_EXPIRED', () => {
    service.show('/home', 'TOKEN_EXPIRED');
    fixture.detectChanges();

    const overlay = fixture.nativeElement.querySelector('i-dialog-container');
    expect(overlay.textContent).toContain('Session Expired');
  });

  it('cannot be dismissed by backdrop or Escape, but follows service visibility', () => {
    service.show('/home', 'SESSION_REPLACED');
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('i-dialog')).not.toBeNull();
    expect(host.querySelector('[role="dialog"]')?.getAttribute('aria-label')).toBe('Signed Out Remotely');
    host.querySelector<HTMLElement>('.i-dialog-backdrop')!.click();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(service.visible()).toBeTrue();
    expect(host.querySelector('i-dialog-container')).not.toBeNull();
    service.hide();
    fixture.detectChanges();
    expect(host.querySelector('i-dialog-container')).toBeNull();
  });

  it('updates visible content and connects the standard action to the SSO handoff', () => {
    service.show('/home', 'TOKEN_EXPIRED');
    fixture.detectChanges();
    service.show('/another-page', 'SESSION_REVOKED');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Session Ended');
    const confirm = spyOn(fixture.componentInstance, 'onConfirm');
    fixture.nativeElement.querySelector('.i-dialog-actions button').click();
    expect(confirm).toHaveBeenCalledTimes(1);
    expect(service.returnUrl()).toBe('/another-page');
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
