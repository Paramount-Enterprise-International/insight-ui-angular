import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NotificationOverlay } from './notification-overlay';
import { INotificationBell } from './notification-bell';
import { INotificationDrawer } from './notification-drawer';
import { INotificationSnackbar } from './notification-snackbar';
import type { INotificationAction, INotificationState } from './notification.types';

/** Controlled notification UI; consumers own data, navigation and timers. */
@Component({
  selector: 'i-notification',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NotificationOverlay, INotificationBell, INotificationDrawer, INotificationSnackbar],
  template: `
    @if (state(); as value) {
      <i-notification-bell
        [expanded]="value.open ?? false"
        [unreadCount]="value.unreadCount"
        (toggleRequested)="onAction.emit({ type: 'toggle' })"
      />
      @if (value.snackbar; as message) {
        <i-notification-snackbar
          [message]="message"
          (dismissRequested)="onAction.emit({ type: 'dismiss-snackbar' })"
          (openRequested)="message.item && onAction.emit({ type: 'open-item', item: message.item })"
        />
      }
    }
    @if (state(); as value) {
      @if (value.open) {
        <i-notification-overlay (closeRequested)="onAction.emit({ type: 'close' })">
          <i-notification-drawer
            [actionError]="value.actionError ?? null"
            [error]="value.error ?? null"
            [hasLoaded]="value.hasLoaded ?? false"
            [hasMore]="value.hasMore ?? false"
            [items]="value.items ?? []"
            [loadMoreError]="value.loadMoreError ?? null"
            [loading]="value.loading ?? false"
            [loadingMore]="value.loadingMore ?? false"
            [readingId]="value.readingId ?? null"
            [unreadCount]="value.unreadCount"
            (closeRequested)="onAction.emit({ type: 'close' })"
            (itemOpened)="onAction.emit({ type: 'open-item', item: $event })"
            (moreRequested)="onAction.emit({ type: 'load-more' })"
            (openAllRequested)="onAction.emit({ type: 'open-all' })"
            (readRetryRequested)="onAction.emit({ type: 'retry-read' })"
            (retryRequested)="onAction.emit({ type: 'retry' })"
          />
        </i-notification-overlay>
      }
    }
  `,
})
export class INotification {
  readonly state = input<INotificationState | null>();
  readonly onAction = output<INotificationAction>();
}
