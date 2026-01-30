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
import { IIcon, type IIconName } from '../icon';

export type IPillSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg';
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
  /**
   * ✅ Autocomplete for IIconName
   * ✅ Still allow any string (raw FA classes, custom classes, etc.)
   */
  @Input() icon: IIconName | (string & {}) | undefined;

  @Input() size: IPillSize = 'md';
  @Input() variant: IPillVariant = 'default';

  @Input({ transform: booleanAttribute }) disabled = false;

  /** show close button */
  @Input({ transform: booleanAttribute }) closable = false;

  @Output() readonly onClose = new EventEmitter<MouseEvent>();
  @Output() readonly onClick = new EventEmitter<MouseEvent>();

  // base class for the "i-pill, .i-pill" selector group
  @HostBinding('class.i-pill') baseClass = true;

  // attribute hooks
  @HostBinding('attr.size') get attrSize(): string {
    return this.size;
  }

  @HostBinding('attr.variant') get attrVariant(): string {
    return this.variant;
  }

  // disabled hook
  @HostBinding('attr.aria-disabled') get ariaDisabled(): string | null {
    return this.disabled ? 'true' : null;
  }

  private get hasOnClickHandler(): boolean {
    // avoids emitting when nobody bound (optional micro-optimization)
    return this.onClick.observed;
  }

  private get hasOnCloseHandler(): boolean {
    return this.onClose.observed;
  }

  @HostListener('click', ['$event'])
  handleHostClick(e: MouseEvent): void {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    // Ignore clicks originating from the close button
    const target = e.target as HTMLElement | null;
    if (target?.closest?.('.i-pill__close')) return;

    if (this.hasOnClickHandler) this.onClick.emit(e);
  }

  handleClose(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    if (this.disabled) return;

    if (this.hasOnCloseHandler) this.onClose.emit(e);
  }
}
