import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { IIcon, IIconName } from '../icon';

export type IPillSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg';

export const I_PILL_ICON_SIZES = {
  '2xs': '3xs',
  xs: '2xs',
  sm: 'xs',
  md: 'sm',
  lg: 'md',
};
export type IPillIconSize = keyof typeof I_PILL_ICON_SIZES;
export type IPillVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';

@Component({
  selector: 'i-pill',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IIcon],
  template: `
    @if (icon) {
      <i-icon [icon]="icon" [size]="size" />
    }
    <span class="i-pill__content">
      <ng-content />
    </span>

    @if (closable) {
      <button
        aria-label="Close"
        class="i-pill__close"
        type="button"
        [disabled]="disabled"
        (click)="handleClose($event)"
      >
        ×
      </button>
    }
  `,
})
export class IPill {
  @Input() icon: IIconName | (string & {}) | undefined;
  @Input() size: IPillSize = 'md';
  @Input() variant: IPillVariant = 'default';

  @Input({ transform: booleanAttribute }) disabled = false;

  /** show close button */
  @Input({ transform: booleanAttribute }) closable = false;

  @Output() readonly onClose = new EventEmitter<MouseEvent>();
  @Output() readonly onClick = new EventEmitter<MouseEvent>();

  get iconSize(): any {
    return I_PILL_ICON_SIZES[this.size] || 'sm';
  }

  // base class for the "i-pill, .i-pill" selector group
  @HostBinding('class.i-pill') baseClass = true;

  // attribute hooks (like your button)
  @HostBinding('attr.size') get attrSize(): string {
    return this.size;
  }
  @HostBinding('attr.variant') get attrVariant(): string {
    return this.variant;
  }

  // disabled hook (like your button)
  @HostBinding('attr.aria-disabled') get ariaDisabled(): string | null {
    return this.disabled ? 'true' : null;
  }

  @HostListener('click', ['$event'])
  handleHostClick(e: MouseEvent): void {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    const target = e.target as HTMLElement | null;
    if (target?.closest?.('.i-pill__close')) return;

    this.onClick.emit(e);
  }

  handleClose(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    if (this.disabled) return;
    this.onClose.emit(e);
  }
}
