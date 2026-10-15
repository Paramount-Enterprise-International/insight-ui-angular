import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IIcon } from '../icon/icon';
@Component({
  selector: 'i-info-notice',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IIcon],
  host: { '[style.display]': 'message?.trim() ? null : "none"' },
  template: `@if (message?.trim()) {
    <div
      class="i-info-notice flex align-start gap-sm p-sm px-md radius-3xs text-md font-body"
      role="status"
    >
      <i-icon aria-hidden="true" class="shrink-0" icon="info" size="lg" />
      <span class="min-w-0 leading-snug">
        @if (title) {
          <strong>{{ title }}</strong>
        }
        {{ message }}</span
      >
    </div>
  }`,
})
export class IInfoNotice {
  @Input() message: string | null | undefined = '';
  @Input() title = '';
}
