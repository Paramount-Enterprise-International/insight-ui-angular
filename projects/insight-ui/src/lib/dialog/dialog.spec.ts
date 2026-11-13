import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, inject } from '@angular/core';
import {
  I_DIALOG_DATA,
  IAlertService,
  IConfirmService,
  IDialog,
  IDialogContainer,
  IDialogOutlet,
  IDialogRef,
  IDialogService,
} from './dialog';

describe('IDialogOutlet', () => {
  let fixture: ComponentFixture<IDialogOutlet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IDialogOutlet],
    }).compileComponents();

    fixture = TestBed.createComponent(IDialogOutlet);
    fixture.detectChanges();
  });

  it('renders empty outlet', () => {
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('i-dialog-container')).toBeNull();
  });
});

@Component({
  selector: 'i-test-dialog-content',
  imports: [IDialog],
  template: `<i-dialog [actions]="['ok']" [title]="data.title" (onOk)="ref.close('confirmed')" />`,
})
class ServiceContent {
  readonly data = inject<{ title: string }>(I_DIALOG_DATA);
  readonly ref = inject<IDialogRef<string>>(IDialogRef);
}

describe('Alert and Confirm description security', () => {
  const description =
    '<strong onclick="alert(1)" class="unsafe" data-test="x" aria-label="unsafe">Name</strong>' +
    '<br><b>B</b><em>E</em><i>I</i>' +
    '<script>alert(1)</script><img src="x" onerror="alert(1)">' +
    '<svg onload="alert(1)"></svg><iframe srcdoc="unsafe"></iframe>' +
    '<a href="javascript:alert(1)">Link</a><input autofocus>' +
    '&lt;b&gt;Literal&lt;/b&gt; &amp; O&#39;Brien';

  for (const kind of ['alert', 'confirm'] as const) {
    it(`sanitizes the rendered ${kind} while retaining formatting and escaped names`, () => {
      TestBed.configureTestingModule({ imports: [IDialogOutlet] });
      const fixture = TestBed.createComponent(IDialogOutlet);
      if (kind === 'alert') {
        TestBed.inject(IAlertService).warning('Notice', description).subscribe();
      } else {
        TestBed.inject(IConfirmService).warning('Notice', description).subscribe();
      }
      fixture.detectChanges();
      const body = fixture.nativeElement.querySelector('p') as HTMLElement;
      expect(body.querySelector('strong')?.textContent).toBe('Name');
      expect(body.querySelector('br')).not.toBeNull();
      expect(body.querySelectorAll('b, em, i').length).toBe(3);
      expect(body.querySelector('script, img, svg, iframe, a, input')).toBeNull();
      expect(
        Array.from(body.querySelectorAll('*')).every((node) => node.attributes.length === 0),
      ).toBeTrue();
      expect(body.textContent).toContain("<b>Literal</b> & O'Brien");
      fixture.destroy();
    });
  }

  it('retains confirm, cancel and required Reason results', () => {
    TestBed.configureTestingModule({ imports: [IDialogOutlet] });
    const fixture = TestBed.createComponent(IDialogOutlet);
    const service = TestBed.inject(IConfirmService);
    const result = jasmine.createSpy('result');
    const click = (label: string): void => {
      const button = Array.from(
        fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>,
      ).find((node) => node.textContent?.trim() === label)!;
      button.click();
      fixture.detectChanges();
    };
    service.warning('Confirm', '<b>Continue?</b>', true).subscribe(result);
    fixture.detectChanges();
    click('Confirm');
    expect(result).not.toHaveBeenCalled();
    const textarea = fixture.nativeElement.querySelector('textarea') as HTMLTextAreaElement;
    textarea.value = 'Approved reason';
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
    click('Confirm');
    expect(result).toHaveBeenCalledWith('Approved reason');
    service.warning('Confirm', 'Continue?').subscribe(result);
    fixture.detectChanges();
    click('Cancel');
    expect(result.calls.mostRecent().args[0]).toBeUndefined();
    service.warning('Confirm', 'Continue?').subscribe(result);
    fixture.detectChanges();
    click('Confirm');
    expect(result.calls.mostRecent().args[0]).toBeTrue();
    fixture.destroy();
  });
});

describe('IDialogContainer controlled content', () => {
  let fixture: ComponentFixture<IDialogContainer>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [IDialogContainer] });
    fixture = TestBed.createComponent(IDialogContainer);
    fixture.componentRef.setInput('isTopMost', true);
    fixture.detectChanges();
  });

  it('requests closure without owning visibility and respects dismissal configuration', () => {
    const close = spyOn(fixture.componentInstance.onClose, 'emit');
    const backdrop = fixture.nativeElement.querySelector('.i-dialog-backdrop') as HTMLElement;
    fixture.componentRef.setInput('config', { width: '380px' });
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('role')).toBe('dialog');
    expect(fixture.nativeElement.querySelector('.i-dialog-panel').style.width).toBe('380px');
    backdrop.click();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(close).toHaveBeenCalledTimes(2);
    fixture.componentRef.setInput('config', { disableClose: true });
    fixture.detectChanges();
    backdrop.click();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(close).toHaveBeenCalledTimes(2);
    fixture.componentRef.setInput('config', { backdropClose: false });
    fixture.detectChanges();
    backdrop.click();
    expect(close).toHaveBeenCalledTimes(2);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(close).toHaveBeenCalledTimes(3);
    fixture.componentRef.setInput('isTopMost', false);
    fixture.componentRef.setInput('config', {});
    fixture.detectChanges();
    backdrop.click();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(close).toHaveBeenCalledTimes(3);
  });
});

describe('service dialog compatibility', () => {
  it('preserves non-topmost dismissal behavior when a legacy instance omits isTopMost', () => {
    TestBed.configureTestingModule({ imports: [IDialogContainer, ServiceContent] });
    const service = TestBed.inject(IDialogService);
    service.open(ServiceContent, { data: { title: 'Legacy instance' } });
    const fixture = TestBed.createComponent(IDialogContainer);
    const subscription = service.dialogs$.subscribe((dialogs) =>
      fixture.componentRef.setInput('instance', dialogs[0]),
    );
    fixture.detectChanges();
    const ref = fixture.componentInstance.instance!.ref;
    const close = spyOn(ref, 'close').and.callThrough();
    expect(fixture.componentInstance.isTopMost).toBeFalse();
    fixture.nativeElement.querySelector('.i-dialog-backdrop').click();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(close).not.toHaveBeenCalled();
    fixture.componentRef.setInput('isTopMost', true);
    fixture.detectChanges();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(close).toHaveBeenCalledTimes(1);
    subscription.unsubscribe();
  });

  it('injects instance data and ref, then removes the closed dialog', () => {
    TestBed.configureTestingModule({ imports: [IDialogOutlet, ServiceContent] });
    const service = TestBed.inject(IDialogService);
    const fixture = TestBed.createComponent(IDialogOutlet);
    const ref = service.open<ServiceContent, { title: string }, string>(ServiceContent, {
      data: { title: 'Service dialog' },
    });
    const closed = jasmine.createSpy('closed');
    ref.afterClosed().subscribe(closed);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Service dialog');
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    expect(closed).toHaveBeenCalledWith('confirmed');
    expect(fixture.nativeElement.querySelector('i-dialog-container')).toBeNull();
  });
});
