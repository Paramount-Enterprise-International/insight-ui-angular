import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import type { INotificationEntry } from './notification.types';
import { notificationDate, truncateNotificationText } from './notification-presentation';

@Component({
  selector: 'i-notification-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      class="notification-item flex align-center gap-md w-full p-lg border-none bg-transparent text-left"
      type="button"
      [attr.aria-busy]="busy()"
      [attr.aria-label]="
        'Read notification: ' + item().title + ', ' + item().groupCount + ' notifications'
      "
      [disabled]="busy()"
      (click)="openRequested.emit(item())"
    >
      <span
        aria-hidden="true"
        class="group-count flex align-center justify-center shrink-0 bg-primary text-white
          radius-full text-sm font-semibold"
      >
        {{ item().groupCount }}
      </span>
      <span class="flex flex-fill align-start justify-between gap-md min-w-0">
        <span class="notification-copy flex flex-col gap-xs flex-fill min-w-0">
          <span class="text-md font-semibold text-gray-700" [title]="item().title">{{
            truncate(item().title)
          }}</span>
          <span class="text-sm text-gray-700" [title]="item().description">{{
            truncate(item().description)
          }}</span>
          <span class="text-sm text-subtle">{{ item().moduleName }}</span>
        </span>
        <span class="flex flex-col align-end gap-xs shrink-0 text-right">
          <span class="text-sm text-subtle" [title]="item().latestDate">{{
            date(item().latestDate)
          }}</span>
          @if (!item().isDismissable) {
            <span class="text-sm text-warning">Important</span>
          }
        </span>
      </span>
    </button>
  `,
})
export class INotificationItem {
  readonly item = input.required<INotificationEntry>();
  readonly busy = input(false);
  readonly openRequested = output<INotificationEntry>();
  readonly date = notificationDate;
  readonly truncate = truncateNotificationText;
}
