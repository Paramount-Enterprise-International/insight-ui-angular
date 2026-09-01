import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ISessionExpiredDialog } from './session-expired-dialog';
import { SessionExpiredService } from './session-expired.service';

describe('ISessionExpiredDialog', () => {
  let fixture: ComponentFixture<ISessionExpiredDialog>;
  let service: SessionExpiredService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ISessionExpiredDialog],
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
});
