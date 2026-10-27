import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { NotificationOverlay } from './notification-overlay';
import { INotificationBell } from './notification-bell';
import { INotificationDrawer } from './notification-drawer';
import { INotificationSnackbar } from './notification-snackbar';
import type { INotificationAction, INotificationState } from './notification.types';

/** Controlled notification UI; consumers own data and navigation. */
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
          [options]="value.snackbarOptions"
          (dismissRequested)="onAction.emit({ type: 'dismiss-snackbar' })"
          (openRequested)="onAction.emit({ type: 'open-drawer' })"
        />
      }
    }
    @if (state(); as value) {
      @if (value.open || retained()) {
        <i-notification-overlay
          [open]="value.open ?? false"
          (closeRequested)="onAction.emit({ type: 'close' })"
          (exited)="retained.set(false)"
        >
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
  protected readonly retained = signal(false);

  constructor() {
    effect(() => {
      const state = this.state();
      if (state?.open) this.retained.set(true);
      else if (!state) this.retained.set(false);
    });
  }
}
