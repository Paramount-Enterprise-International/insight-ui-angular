import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IButton } from '../button';
import { IIcon } from '../icon';
export type ILoadErrorDensity = 'default' | 'compact' | 'inline';
@Component({
  selector: 'i-load-error',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IButton, IIcon],
  host: {
    class: 'i-load-error',
    '[attr.density]': 'density',
    '[style.display]': 'message?.trim() ? null : "none"',
  },
  template: `@if (message?.trim()) {
    <div class="i-load-error__content" role="alert">
      <i-icon
        aria-hidden="true"
        icon="fa-solid fa-circle-exclamation"
        [size]="density === 'inline' ? 'sm' : 'lg'"
      />
      @if (title) {
        <p>{{ title }}</p>
      }
      <p class="i-load-error__message">{{ message }}</p>
      <i-button
        icon="sync"
        type="button"
        variant="primary"
        [disabled]="retryDisabled"
        [loading]="retryLoading"
        [size]="density === 'inline' ? 'xs' : density === 'compact' ? 'sm' : 'md'"
        (onClick)="retry()"
        >Retry</i-button
      >
    </div>
  }`,
})
export class ILoadError {
  @Input() message: string | null | undefined = null;
  @Input() title = '';
  @Input() density: ILoadErrorDensity = 'default';
  @Input() retryDisabled = false;
  @Input() retryLoading = false;
  @Output() readonly onRetry = new EventEmitter<void>();
  retry(): void {
    if (!this.retryDisabled && !this.retryLoading) this.onRetry.emit();
  }
}
