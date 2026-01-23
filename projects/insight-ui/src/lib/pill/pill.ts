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

export type IPillSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg';
export type IPillVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';

@Component({
  selector: 'i-pill',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
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
  @Input() size: IPillSize = 'md';
  @Input() variant: IPillVariant = 'default';

  @Input({ transform: booleanAttribute }) disabled = false;

  /** show close button */
  @Input({ transform: booleanAttribute }) closable = false;

  @Output() readonly onClose = new EventEmitter<MouseEvent>();
  @Output() readonly onClick = new EventEmitter<MouseEvent>();

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
