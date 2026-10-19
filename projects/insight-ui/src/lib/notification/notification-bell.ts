import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { IIcon } from '../icon';

@Component({
  selector: 'i-notification-bell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IIcon],
  template: `
    <button
      aria-haspopup="dialog"
      class="notification-icon-action flex align-center justify-center p-2xs border-none
        bg-transparent text-gray-700 radius-sm"
      title="Notifications"
      type="button"
      [attr.aria-expanded]="expanded()"
      [attr.aria-label]="'Notifications, ' + unreadCount() + ' unread'"
      (click)="toggleRequested.emit()"
    >
      <i-icon aria-hidden="true" icon="fa-solid fa-bell" size="lg" />
    </button>
    @if (unreadCount() > 0) {
      <span
        aria-hidden="true"
        class="notification-badge flex align-center justify-center bg-primary text-white radius-full text-xs"
      >
        {{ unreadCount() > 99 ? '99+' : unreadCount() }}
      </span>
    }
  `,
})
export class INotificationBell {
  readonly unreadCount = input(0);
  readonly expanded = input(false);
  readonly toggleRequested = output<void>();
}
