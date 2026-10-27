import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ISnackbar } from '../snackbar';
import type { INotificationSnackbarMessage, INotificationState } from './notification.types';

@Component({
  selector: 'i-notification-snackbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ISnackbar],
  template: `
    <i-snackbar
      variant="info"
      [closable]="options()?.closable ?? true"
      [closeLabel]="options()?.closeLabel ?? 'Dismiss notification'"
      [dismissOnEscape]="options()?.dismissOnEscape ?? true"
      [durationMs]="options()?.durationMs ?? 5000"
      [id]="options()?.id ?? 'notification-summary'"
      [maxWidth]="options()?.maxWidth ?? '400px'"
      [pauseOnFocus]="options()?.pauseOnFocus ?? true"
      [pauseOnHidden]="options()?.pauseOnHidden ?? true"
      [pauseOnHover]="options()?.pauseOnHover ?? true"
      [position]="options()?.position ?? 'bottom-right'"
      [prefixIcon]="options()?.prefixIcon ?? message().item?.icon ?? 'fa-solid fa-bell'"
      [resetKey]="message().key"
      [suffixIcon]="options()?.suffixIcon ?? ''"
      (afterDismissed)="dismissRequested.emit()"
    >
      <button
        class="i-snackbar__content-action snackbar-content"
        type="button"
        (click)="openRequested.emit()"
      >
        @if (message().moduleName) {
          <span class="block font-semibold">{{ message().moduleName }}</span>
        }
        <span>{{ message().title }}</span>
        @if ((message().newCount ?? 0) > 1) {
          <span class="block"
            >and {{ message().newCount! - 1 }} other new
            {{ message().newCount === 2 ? 'notification' : 'notifications' }}</span
          >
        }
      </button>
    </i-snackbar>
  `,
})
export class INotificationSnackbar {
  readonly message = input.required<INotificationSnackbarMessage>();
  readonly options = input<INotificationState['snackbarOptions']>();
  readonly dismissRequested = output<void>();
  readonly openRequested = output<void>();
}
