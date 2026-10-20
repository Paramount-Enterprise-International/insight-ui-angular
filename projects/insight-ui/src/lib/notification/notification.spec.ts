import { TestBed } from '@angular/core/testing';

import type { INotificationEntry } from './notification.types';
import { INotificationBell } from './notification-bell';
import { INotificationDrawer } from './notification-drawer';
import { INotificationItem } from './notification-item';
import { notificationDate, truncateNotificationText } from './notification-presentation';
import { INotificationSnackbar } from './notification-snackbar';

const item: INotificationEntry = {
  notificationId: 'one',
  moduleId: 'IAM',
  moduleName: 'Account',
  title: 'A'.repeat(60),
  description: 'B'.repeat(60),
  link: null,
  isDismissable: false,
  groupCount: 8,
  latestDate: '2026-10-19T07:00:00Z',
};

describe('Notification presentation', () => {
  it('hides zero badge, shows 99 and caps 100 with accessible actual counts', () => {
    const fixture = TestBed.createComponent(INotificationBell);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('.notification-badge')).toBeNull();
    expect(host.querySelector('i-button')).toBeNull();
    expect(host.querySelector('button i-icon')).not.toBeNull();
    fixture.componentRef.setInput('unreadCount', 99);
    fixture.detectChanges();
    expect(host.querySelector('.notification-badge')?.textContent?.trim()).toBe('99');
    fixture.componentRef.setInput('unreadCount', 100);
    fixture.detectChanges();
    expect(host.querySelector('.notification-badge')?.textContent?.trim()).toBe('99+');
    expect(host.querySelector('button')?.getAttribute('aria-label')).toContain('100 unread');
    const requested = jasmine.createSpy('requested');
    fixture.componentInstance.toggleRequested.subscribe(requested);
    host.querySelector('button')?.click();
    expect(requested).toHaveBeenCalled();
  });

  it('renders Important and group count while preserving direct clicks and full title', () => {
    const fixture = TestBed.createComponent(INotificationItem);
    fixture.componentRef.setInput('item', item);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    expect(host.textContent).toContain('Important');
    expect(host.textContent).toContain('A'.repeat(50) + '...');
    expect(host.querySelector('[title="' + item.title + '"]')).not.toBeNull();
    expect(host.querySelector('.group-count')?.textContent?.trim()).toBe('8');
    expect(host.querySelector('i-icon')).toBeNull();
    const copy = host.querySelector('.notification-copy')!;
    expect(copy.children[0].textContent).toContain('A'.repeat(50) + '...');
    expect(copy.children[1].textContent).toContain('B'.repeat(50) + '...');
    expect(copy.children[2].textContent).toBe('Account');
    const opened = jasmine.createSpy('opened');
    fixture.componentInstance.openRequested.subscribe(opened);
    host.querySelector('button')?.click();
    expect(opened).toHaveBeenCalledWith(item);
    fixture.componentRef.setInput('item', { ...item, groupCount: 1, isDismissable: true });
    fixture.detectChanges();
    expect(host.querySelector('.group-count')?.textContent?.trim()).toBe('1');
    expect(host.textContent).not.toContain('Important');
  });

  it('formats local calendar dates and truncates only values longer than 50 characters', () => {
    const now = new Date(2026, 9, 19, 12);
    expect(notificationDate(new Date(2026, 9, 19).toISOString(), now)).toBe('Today');
    expect(notificationDate(new Date(2026, 9, 18).toISOString(), now)).toBe('Yesterday');
    expect(notificationDate(new Date(2026, 9, 17).toISOString(), now)).toBe('2 days ago');
    expect(notificationDate(new Date(2026, 9, 12).toISOString(), now)).toBe('Last week');
    expect(notificationDate(new Date(2026, 9, 1).toISOString(), now)).toBe('1 Oct 2026');
    expect(notificationDate('invalid', now)).toBe('-');
    expect(truncateNotificationText('A'.repeat(50))).toBe('A'.repeat(50));
  });

  it('keeps rows interactive and scroll stable while refreshing inline with the unread summary', () => {
    const fixture = TestBed.createComponent(INotificationDrawer);
    fixture.componentRef.setInput(
      'items',
      Array.from({ length: 20 }, (_, index) => ({ ...item, notificationId: String(index) })),
    );
    fixture.componentRef.setInput('hasLoaded', true);
    fixture.componentRef.setInput('hasMore', true);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    const row = host.querySelector('i-notification-item');

    const status = host.querySelector<HTMLElement>('.notification-refresh-status')!;
    expect(host.querySelector('header p')?.parentElement).toBe(status.parentElement);
    const scroll = host.querySelector<HTMLElement>('.notification-scroll')!;
    scroll.scrollTop = 120;
    const scrollTop = scroll.scrollTop;
    const opened = jasmine.createSpy('opened');
    fixture.componentInstance.itemOpened.subscribe(opened);
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    expect(host.querySelector('i-notification-item')).toBe(row);
    expect(host.querySelector('[inert]')).toBeNull();
    expect(host.querySelector('iam-loading-region')).toBeNull();
    expect(status.textContent).toContain('Refreshing notifications...');
    expect(scroll.contains(status)).toBeFalse();
    expect(scroll.scrollTop).toBe(scrollTop);
    const rowButton = row!.querySelector('button')!;
    expect(rowButton.disabled).toBeFalse();
    rowButton.click();
    expect(opened).toHaveBeenCalled();
    const more = jasmine.createSpy('more');
    fixture.componentInstance.moreRequested.subscribe(more);
    const target = { scrollTop: 60, clientHeight: 20, scrollHeight: 100 };
    fixture.componentInstance.onScroll({ target } as unknown as Event);
    expect(more).not.toHaveBeenCalled();
    fixture.componentRef.setInput('loading', false);
    fixture.detectChanges();
    expect(status.textContent?.trim()).toBe('');
    fixture.componentInstance.onScroll({ target } as unknown as Event);
    expect(more).toHaveBeenCalledTimes(1);
    fixture.componentRef.setInput('loadMoreError', 'Unavailable');
    fixture.detectChanges();
    fixture.componentInstance.onScroll({ target } as unknown as Event);
    expect(more).toHaveBeenCalledTimes(1);
    expect(host.querySelector('i-notification-item')).toBe(row);
  });

  it('keeps the title and neutral icon actions in one compact header row', () => {
    const fixture = TestBed.createComponent(INotificationDrawer);
    fixture.detectChanges();
    const header = (fixture.nativeElement as HTMLElement).querySelector('header')!;
    const title = header.querySelector('h2')!;
    expect(header.querySelector('i-button')).toBeNull();
    const openAll = header.querySelector<HTMLButtonElement>(
      '[aria-label="Open all notifications in a new tab"]',
    )!;
    const close = header.querySelector<HTMLButtonElement>('[aria-label="Close notifications"]')!;
    expect(title.parentElement?.contains(openAll)).toBeTrue();
    expect(title.parentElement?.contains(close)).toBeTrue();
    const openRequested = jasmine.createSpy('open');
    const closeRequested = jasmine.createSpy('close');
    fixture.componentInstance.openAllRequested.subscribe(openRequested);
    fixture.componentInstance.closeRequested.subscribe(closeRequested);
    openAll.click();
    close.click();
    expect(openRequested).toHaveBeenCalledTimes(1);
    expect(closeRequested).toHaveBeenCalledTimes(1);
  });

  it('distinguishes first loading from refreshing a previously empty list', () => {
    const fixture = TestBed.createComponent(INotificationDrawer);
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    expect(host.textContent).toContain('Loading notifications...');
    expect(host.textContent).not.toContain('No new notifications');
    fixture.componentRef.setInput('loading', false);
    fixture.componentRef.setInput('hasLoaded', true);
    fixture.detectChanges();
    const empty = host.querySelector('.notification-scroll p');
    expect(empty?.textContent).toContain('No new notifications');
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    expect(host.textContent).toContain('Refreshing notifications...');
    expect(host.querySelector('.notification-scroll p')).toBe(empty);
    expect(host.querySelector('.notification-initial-space')).toBeNull();
  });

  it('distinguishes load error from empty state and recovers through the rendered Retry button', () => {
    const fixture = TestBed.createComponent(INotificationDrawer);
    fixture.componentRef.setInput('error', 'Unavailable');
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    expect(host.textContent).not.toContain('No new notifications');
    const retry = jasmine.createSpy('retry');
    fixture.componentInstance.retryRequested.subscribe(retry);
    host.querySelector<HTMLButtonElement>('i-notification-error button')?.click();
    expect(retry).toHaveBeenCalled();
    fixture.componentRef.setInput('error', null);
    fixture.detectChanges();
    expect(host.textContent).toContain('No new notifications');
  });

  it('renders snackbar data as text and delegates open/dismiss actions', () => {
    const fixture = TestBed.createComponent(INotificationSnackbar);
    fixture.componentRef.setInput('message', {
      key: 1,
      title: '<b>Action</b>',
      moduleName: 'Account',
      item,
    });
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('b')).toBeNull();
    expect(host.textContent).toContain('<b>Action</b>');
    const open = jasmine.createSpy('open');
    const dismiss = jasmine.createSpy('dismiss');
    fixture.componentInstance.openRequested.subscribe(open);
    fixture.componentInstance.dismissRequested.subscribe(dismiss);
    host.querySelector<HTMLButtonElement>('.snackbar-content')?.click();
    host.querySelector<HTMLButtonElement>('i-button button')?.click();
    expect(open).toHaveBeenCalled();
    expect(dismiss).toHaveBeenCalled();
  });
});
