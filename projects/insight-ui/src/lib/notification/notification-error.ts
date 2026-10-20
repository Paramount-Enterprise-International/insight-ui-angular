import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IButton } from '../button';
import { IIcon } from '../icon';

/** Internal retry presentation for consumer-resolved notification errors. */
@Component({
  selector: 'i-notification-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IButton, IIcon],
  template: `
    @if (message()) {
      <div
        class="flex flex-col align-center justify-center gap-xs px-md py-lg text-center text-subtle"
        role="alert"
      >
        <i-icon aria-hidden="true" icon="fa-solid fa-circle-exclamation" size="lg" />
        @if (title()) {
          <p class="m-0">{{ title() }}</p>
        }
        <p class="m-0 text-sm text-danger">{{ message() }}</p>
        <i-button
          icon="sync"
          size="sm"
          type="button"
          variant="primary"
          [disabled]="retryDisabled()"
          [loading]="retryLoading()"
          (onClick)="!retryLoading() && !retryDisabled() && retry.emit()"
          >Retry</i-button
        >
      </div>
    }
  `,
})
export class NotificationError {
  readonly message = input<string | null>(null);
  readonly title = input('');
  readonly retryDisabled = input(false);
  readonly retryLoading = input(false);
  readonly retry = output<void>();
}
