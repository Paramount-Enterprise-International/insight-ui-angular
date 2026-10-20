import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { IButton } from '../button';
import { IIcon } from '../icon';
import { ILoading } from '../loading';

import { NotificationError } from './notification-error';

import type { INotificationEntry } from './notification.types';
import { INotificationItem } from './notification-item';

@Component({
  selector: 'i-notification-drawer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IButton, IIcon, ILoading, NotificationError, INotificationItem],
  template: `
    <header class="border-b">
      <div class="notification-header-main flex align-center justify-between gap-sm px-lg">
        <h2 class="text-xl leading-snug font-semibold m-0 truncate">Notifications</h2>
        <div class="flex align-center gap-xs shrink-0">
          <button
            aria-label="Open all notifications in a new tab"
            class="i-clickable notification-icon-action border-none text-gray-600"
            title="Open All Notifications"
            type="button"
            (click)="openAllRequested.emit()"
          >
            <i-icon aria-hidden="true" icon="fa-solid fa-arrow-up-right-from-square" />
          </button>
          <button
            aria-label="Close notifications"
            class="i-clickable notification-icon-action border-none text-gray-600"
            title="Close notifications"
            type="button"
            (click)="closeRequested.emit()"
          >
            <i-icon aria-hidden="true" icon="fa-solid fa-xmark" />
          </button>
        </div>
      </div>
      <div class="notification-header-summary flex align-center gap-sm px-lg text-sm">
        <p aria-live="polite" class="m-0 truncate">
          You have {{ unreadCount() }} unread notifications
        </p>
        <div
          aria-atomic="true"
          aria-live="polite"
          class="notification-refresh-status flex align-center justify-center shrink-0"
          role="status"
          [attr.title]="
            loading()
              ? hasLoaded()
                ? 'Refreshing notifications...'
                : 'Loading notifications...'
              : null
          "
        >
          @if (loading()) {
            <i-loading aria-hidden="true" label="" />
            <span class="notification-refresh-label">
              {{ hasLoaded() ? 'Refreshing notifications...' : 'Loading notifications...' }}
            </span>
          }
        </div>
      </div>
    </header>
    <div class="notification-scroll" [attr.aria-busy]="loading()" (scroll)="onScroll($event)">
      @if (loading() && !hasLoaded() && items().length === 0) {
        <div aria-hidden="true" class="notification-initial-space"></div>
      } @else if (error() && items().length === 0) {
        <i-notification-error [message]="error()" (retry)="retryRequested.emit()" />
      } @else if (items().length === 0) {
        <p class="p-2xl text-center text-subtle" role="status">No new notifications</p>
      } @else {
        <ul aria-label="Unread notification groups" class="list-none m-0 p-0">
          @for (item of items(); track item.notificationId) {
            <li class="border-b border-subtle">
              <i-notification-item
                [busy]="readingId() !== null"
                [item]="item"
                (openRequested)="itemOpened.emit($event)"
              />
            </li>
          }
        </ul>
      }
      @if (error() && items().length > 0) {
        <i-notification-error
          [message]="error()"
          [retryLoading]="loading()"
          (retry)="retryRequested.emit()"
        />
      }
      @if (actionError()) {
        <i-notification-error
          title="Failed to mark notification as read."
          [message]="actionError()"
          [retryLoading]="readingId() !== null"
          (retry)="readRetryRequested.emit()"
        />
      }
      @if (loadingMore()) {
        <div class="flex justify-center p-lg" role="status">
          <i-loading label="Loading more notifications..." />
        </div>
      } @else if (loadMoreError()) {
        <i-notification-error [message]="loadMoreError()" (retry)="moreRequested.emit()" />
      } @else if (hasMore()) {
        <div class="flex justify-center p-md">
          <i-button
            size="sm"
            type="button"
            [disabled]="loading() || readingId() !== null"
            (onClick)="moreRequested.emit()"
          >
            Load more
          </i-button>
        </div>
      }
    </div>
  `,
})
export class INotificationDrawer {
  readonly items = input<readonly INotificationEntry[]>([]);
  readonly unreadCount = input(0);
  readonly loading = input(false);
  readonly hasLoaded = input(false);
  readonly loadingMore = input(false);
  readonly readingId = input<string | null>(null);
  readonly hasMore = input(false);
  readonly error = input<string | null>(null);
  readonly loadMoreError = input<string | null>(null);
  readonly actionError = input<string | null>(null);
  readonly closeRequested = output<void>();
  readonly openAllRequested = output<void>();
  readonly itemOpened = output<INotificationEntry>();
  readonly moreRequested = output<void>();
  readonly retryRequested = output<void>();
  readonly readRetryRequested = output<void>();

  onScroll(event: Event): void {
    const target = event.target as HTMLElement;
    if (
      !this.loading() &&
      !this.loadingMore() &&
      this.readingId() === null &&
      !this.loadMoreError() &&
      !this.error() &&
      this.hasMore() &&
      target.scrollTop + target.clientHeight >= target.scrollHeight * 0.8
    )
      this.moreRequested.emit();
  }
}
