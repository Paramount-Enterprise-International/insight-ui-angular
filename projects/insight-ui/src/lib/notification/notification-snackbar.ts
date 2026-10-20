import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { IButton } from '../button';
import { IIcon } from '../icon';

import type { INotificationSnackbarMessage } from './notification.types';

@Component({
  selector: 'i-notification-snackbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IButton, IIcon],
  template: `
    <div
      aria-live="polite"
      class="notification-snackbar flex align-center gap-md p-lg radius-md"
      role="status"
    >
      <i-icon aria-hidden="true" [icon]="message().item?.icon ?? 'fa-solid fa-bell'" />
      @if (message().item) {
        <button
          class="snackbar-content text-left border-none bg-transparent p-0 min-w-0 flex-fill"
          type="button"
          (click)="openRequested.emit()"
        >
          <span class="block font-semibold">{{ message().moduleName }}</span>
          <span>{{ message().title }}</span>
        </button>
      } @else {
        <span class="flex-fill">{{ message().title }}</span>
      }
      <i-button
        ariaLabel="Dismiss notification"
        icon="fa-solid fa-xmark"
        size="xs"
        type="button"
        (onClick)="dismissRequested.emit()"
      />
    </div>
  `,
})
export class INotificationSnackbar {
  readonly message = input.required<INotificationSnackbarMessage>();
  readonly dismissRequested = output<void>();
  readonly openRequested = output<void>();
}
