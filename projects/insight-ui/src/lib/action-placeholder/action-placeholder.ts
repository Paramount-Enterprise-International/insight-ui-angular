import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import type { IButtonSize } from '../button/button';
@Component({
  selector: 'i-action-placeholder',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '',
  host: {
    class: 'i-action-placeholder',
    'aria-hidden': 'true',
    '[attr.size]': 'size',
    '[style.width]': 'width',
    '[style.height]': 'height',
  },
})
export class IActionPlaceholder {
  @Input() size: IButtonSize = 'md';
  get width(): string {
    return `max(var(--i-size-${this.size}), calc(var(--i-icon-${this.size}) + 2 * var(--i-padding-${this.size})))`;
  }
  get height(): string {
    return `var(--i-size-${this.size})`;
  }
}
