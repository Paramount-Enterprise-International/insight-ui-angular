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
import { IIcon } from '../icon/icon';
import { IUISize, IUIVariant } from '../interfaces';
import { ILoading } from '../loading/loading';

export type IButtonType = 'button' | 'submit' | 'reset';
export type IButtonSize = Extract<IUISize, '2xs' | 'xs' | 'sm' | 'md' | 'lg'>;
export type IButtonVariant = Extract<
  IUIVariant,
  'primary' | 'warning' | 'danger' | 'success' | 'outline'
>;

@Component({
  selector: 'i-button',
  standalone: true,
  templateUrl: './button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'button',
  },
  imports: [ILoading, IIcon],
})
export class IButton {
  // @Input({ transform: booleanAttribute }) disabled = false;
  @Input() disabled = false;
  @Input({ transform: booleanAttribute }) loading = false;

  @Input() type: IButtonType = 'button';
  @Input() loadingText: string = '';
  @Input() variant: IButtonVariant = 'primary';
  @Input() size: IButtonSize = 'md';
  @Input() icon: string | undefined;

  /** Public click output if you want to use (onClick) */
  @Output() onClick = new EventEmitter<MouseEvent>();

  /* ---------- HOST BINDINGS ---------- */

  @HostBinding('attr.tabindex')
  get tabIndex(): number {
    return this.disabled ? -1 : 0;
  }

  @HostBinding('attr.aria-disabled')
  get ariaDisabled(): string | null {
    return this.disabled ? 'true' : null;
  }

  @HostBinding('attr.aria-busy')
  get ariaBusy(): string | null {
    return this.loading ? 'true' : null;
  }

  /** Reflect variant to host: <i-button variant="primary"> */
  @HostBinding('attr.variant')
  get hostVariant(): string {
    return this.variant;
  }

  /** Reflect size to host: <i-button size="md"> */
  @HostBinding('attr.size')
  get hostSize(): string {
    return this.size;
  }

  /* ---------- EVENTS ---------- */

  // Mouse click
  @HostListener('click', ['$event'])
  handleClick(event: MouseEvent): void {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    this.onClick.emit(event);

    // Handle submit/reset behavior manually if needed
    if (this.type === 'submit' || this.type === 'reset') {
      const form = this.findClosestForm(event.target as HTMLElement | null);
      if (form) {
        if (this.type === 'submit') {
          if ((form as any).requestSubmit) {
            (form as HTMLFormElement).requestSubmit();
          } else {
            form.submit();
          }
        } else if (this.type === 'reset') {
          form.reset();
        }
      }
    }
  }

  // Keyboard activation (Space/Enter)
  @HostListener('keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (this.disabled || this.loading) return;

    const key = event.key;

    if (key === 'Enter' || key === ' ') {
      event.preventDefault();

      // Simulate click via the same logic, so form behavior stays consistent
      const mouseEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        composed: true,
      });
      // This will re-enter handleClick with proper submit/reset handling
      (event.target as HTMLElement | null)?.dispatchEvent(mouseEvent);
    }
  }

  /* ---------- UTILS ---------- */

  private findClosestForm(startEl: HTMLElement | null): HTMLFormElement | null {
    let el: HTMLElement | null = startEl;
    while (el) {
      if (el instanceof HTMLFormElement) {
        return el;
      }
      el = el.parentElement;
    }
    return null;
  }
}
