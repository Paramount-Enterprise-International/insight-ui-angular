import { IDialogContainer } from '../dialog';
import { TestBed } from '@angular/core/testing';
import { INotification } from './notification';
import type { INotificationState } from './notification.types';

describe('INotification drawer lifecycle', () => {
  let bodyHeight: string;
  beforeEach(() => {
    bodyHeight = document.body.style.height;
    document.body.style.height = '200vh';
  });
  afterEach(() => {
    document.body.style.height = bodyHeight;
  });
  it('uses a modal right drawer, focuses it, closes on Escape, and restores the trigger', async () => {
    const fixture = TestBed.createComponent(INotification);
    let state: INotificationState = { unreadCount: 0 };
    fixture.componentInstance.onAction.subscribe((action) => {
      if (action.type === 'toggle' || action.type === 'close') {
        state = { ...state, open: action.type === 'toggle' ? !state.open : false };
        fixture.componentRef.setInput('state', state);
      }
    });
    fixture.componentRef.setInput('state', state);
    fixture.detectChanges();
    const trigger = (fixture.nativeElement as HTMLElement).querySelector<HTMLAnchorElement>(
      'i-notification-bell a.i-clickable',
    )!;
    trigger.focus();
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();
    const overlay = document.body;
    const drawer = overlay.querySelector<HTMLElement>('i-notification-drawer')!;
    expect(drawer).not.toBeNull();
    expect(overlay.querySelector('[role="dialog"]')?.getAttribute('aria-label')).toBe(
      'Notifications',
    );
    expect(overlay.querySelector('[aria-modal="true"]')).not.toBeNull();
    expect(drawer.contains(document.activeElement)).toBeTrue();
    expect(drawer.getBoundingClientRect().width).toBeLessThanOrEqual(
      Math.min(400, window.innerWidth),
    );
    expect(document.documentElement.style.overflow === 'hidden').toBeTrue();
    const guards = overlay.querySelectorAll<HTMLElement>('.i-notification-focus-guard');
    guards[0].focus();
    expect(document.activeElement).toBe(drawer.querySelector('[aria-label="Close notifications"]'));
    guards[guards.length - 1].focus();
    expect(document.activeElement).toBe(
      drawer.querySelector('[aria-label="Open all notifications in a new tab"]'),
    );
    document.body.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27, bubbles: true }),
    );
    fixture.detectChanges();
    await fixture.whenStable();
    expect(state.open).toBeFalse();
    fixture.detectChanges();
    expect(overlay.querySelector('i-notification-drawer')).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it('closes on backdrop click and removes the overlay when destroyed', async () => {
    const fixture = TestBed.createComponent(INotification);
    let state: INotificationState = { unreadCount: 0, open: true };
    fixture.componentInstance.onAction.subscribe((action) => {
      if (action.type === 'close') {
        state = { ...state, open: false };
        fixture.componentRef.setInput('state', state);
      }
    });
    fixture.componentRef.setInput('state', state);
    fixture.detectChanges();
    await fixture.whenStable();
    const overlay = document.body;
    overlay.querySelector<HTMLElement>('.i-notification-overlay .i-dialog-backdrop')?.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(state.open).toBeFalse();
    fixture.componentRef.setInput('state', { ...state, open: true });
    fixture.detectChanges();
    fixture.destroy();
    expect(overlay.querySelector('i-notification-drawer')).toBeNull();
  });
  it('hides absent input and cleans an open overlay without emitting a close action on input removal', async () => {
    const fixture = TestBed.createComponent(INotification);
    const action = jasmine.createSpy('action');
    fixture.componentInstance.onAction.subscribe(action);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('i-notification-bell')).toBeNull();
    fixture.componentRef.setInput('state', { unreadCount: 0, open: true });
    fixture.detectChanges();
    await fixture.whenStable();
    const overlay = document.body;
    expect(overlay.querySelector('i-notification-drawer')).not.toBeNull();
    fixture.componentRef.setInput('state', null);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(overlay.querySelector('i-notification-drawer')).toBeNull();
    expect(document.documentElement.style.overflow === 'hidden').toBeFalse();
    expect(action).not.toHaveBeenCalled();
  });
  it('yields keyboard and focus handling to a higher Insight dialog', async () => {
    const fixture = TestBed.createComponent(INotification);
    fixture.componentRef.setInput('state', { unreadCount: 1, open: true });
    const action = jasmine.createSpy('action');
    fixture.componentInstance.onAction.subscribe(action);
    fixture.detectChanges();
    await fixture.whenStable();
    const other = TestBed.createComponent(IDialogContainer);
    other.componentRef.setInput('isTopMost', true);
    const closed = jasmine.createSpy('closed');
    other.componentInstance.onClose.subscribe(closed);
    other.detectChanges();
    const button = document.createElement('button');
    button.textContent = 'Confirm';
    other.nativeElement.querySelector('.i-dialog-panel').appendChild(button);
    button.focus();
    expect(document.activeElement).toBe(button);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(closed).toHaveBeenCalledTimes(1);
    expect(action).not.toHaveBeenCalled();
    other.destroy();
    fixture.destroy();
    expect(document.body.style.overflow).not.toBe('hidden');
    expect(document.querySelector('i-notification-overlay')).toBeNull();
  });
  it('retains exit, cancels on reopen and restores focus after transition end', async () => {
    const fixture = TestBed.createComponent(INotification);
    fixture.componentRef.setInput('state', { unreadCount: 1 });
    fixture.detectChanges();
    const bell = fixture.nativeElement.querySelector(
      'i-notification-bell a.i-clickable',
    ) as HTMLAnchorElement;
    bell.focus();
    fixture.componentRef.setInput('state', { unreadCount: 1, open: true });
    fixture.detectChanges();
    const modal = document.querySelector<HTMLElement>('.i-notification-overlay')!;
    const panel = modal.querySelector<HTMLElement>('.i-dialog-panel')!;
    panel.style.transitionDuration = '240ms';
    const end = (): boolean =>
      panel.dispatchEvent(
        new TransitionEvent('transitionend', { propertyName: 'transform', bubbles: true }),
      );
    fixture.componentRef.setInput('state', { unreadCount: 1, open: false });
    fixture.detectChanges();
    expect(modal.classList.contains('i-notification-closing')).toBeTrue();
    expect(document.body.style.overflow).toBe('hidden');
    fixture.componentRef.setInput('state', { unreadCount: 1, open: true });
    fixture.detectChanges();
    end();
    fixture.detectChanges();
    expect(document.querySelector('.i-notification-overlay')).toBe(modal);
    expect(modal.classList.contains('i-notification-closing')).toBeFalse();
    fixture.componentRef.setInput('state', { unreadCount: 1, open: false });
    fixture.detectChanges();
    end();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(document.querySelector('.i-notification-overlay')).toBeNull();
    expect(document.body.style.overflow).not.toBe('hidden');
    expect(document.activeElement).toBe(bell);
    fixture.componentRef.setInput('state', { unreadCount: 1, open: true });
    fixture.detectChanges();
    document.querySelector<HTMLElement>('.i-dialog-panel')!.style.transitionDuration = '240ms';
    fixture.componentRef.setInput('state', { unreadCount: 1, open: false });
    fixture.detectChanges();
    fixture.componentRef.setInput('state', null);
    fixture.detectChanges();
    expect(document.querySelector('.i-notification-overlay')).toBeNull();
    expect(document.body.style.overflow).not.toBe('hidden');
    fixture.destroy();
  });
});
