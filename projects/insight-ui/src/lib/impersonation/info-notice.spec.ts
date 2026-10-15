import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IInfoNotice } from './info-notice';

describe('IInfoNotice', () => {
  let fixture: ComponentFixture<IInfoNotice>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [IInfoNotice] });
    fixture = TestBed.createComponent(IInfoNotice);
    fixture.detectChanges();
  });

  const status = (): HTMLElement | null => fixture.nativeElement.querySelector('[role="status"]');

  it('render_EmptyMessage_RendersNothingAndTakesNoSpace', () => {
    for (const message of [null, undefined, '', '   ']) {
      fixture.componentRef.setInput('message', message);
      fixture.detectChanges();

      expect(status()).toBeNull();
      expect(fixture.nativeElement.style.display).toBe('none');
    }
  });

  it('render_Message_ShowsAccessibleStatusWithTitle', () => {
    fixture.componentRef.setInput('title', 'Not available.');
    fixture.componentRef.setInput(
      'message',
      'This action cannot be performed during an impersonation session.',
    );
    fixture.detectChanges();

    expect(status()?.textContent).toContain('Not available.');
    expect(status()?.textContent).toContain(
      'This action cannot be performed during an impersonation session.',
    );
    expect(fixture.nativeElement.style.display).toBe('');
  });
});
