import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { IIcon } from '../icon';

@Component({
  selector: 'i-notification-bell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IIcon],
  template: `
    <a
      aria-haspopup="dialog"
      class="i-clickable"
      role="button"
      tabindex="0"
      title="Notifications"
      [attr.aria-expanded]="expanded()"
      [attr.aria-label]="'Notifications, ' + unreadCount() + ' unread'"
      (click)="toggleRequested.emit()"
      (keydown.enter)="toggleRequested.emit()"
      (keydown.space)="$event.preventDefault(); toggleRequested.emit()"
    >
      <i-icon aria-hidden="true" class="text-gray-600" icon="fa-solid fa-bell" size="lg" />
    </a>
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
