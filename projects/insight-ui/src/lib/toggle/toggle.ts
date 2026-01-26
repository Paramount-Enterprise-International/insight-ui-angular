import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const INTERACTIVE_SELECTOR_PARTS = [
  'a',
  'button',
  'input',
  'textarea',
  'select',
  'label',
  '[role="button"]',
  '[role="link"]',
  '[role="switch"]',
  '[contenteditable="true"]',
  '[tabindex]:not([tabindex="-1"])',
];

const INTERACTIVE_SELECTOR = INTERACTIVE_SELECTOR_PARTS.join(',');

@Component({
  selector: 'i-toggle',
  standalone: true,
  template: `
    <input
      #input
      class="i-toggle__input"
      type="checkbox"
      [checked]="checked"
      [disabled]="disabled"
      (blur)="handleBlur()"
      (change)="handleNativeChange($event)"
    />

    <span class="i-toggle__thumb"></span>

    <span class="i-toggle__label">
      <ng-content />
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IToggle),
      multi: true,
    },
  ],
})
export class IToggle implements ControlValueAccessor {
  @Input() disabled = false;

  /** put label left or right */
  @Input() labelPosition: 'left' | 'right' = 'right';

  checked = false;

  @Output() readonly onChange = new EventEmitter<boolean>();
  @Output() readonly onTouched = new EventEmitter<void>();

  @ViewChild('input', { static: true }) inputRef!: ElementRef<HTMLInputElement>;

  @HostBinding('class.i-toggle') baseClass = true;

  @HostBinding('class.i-toggle__active')
  get activeClass(): boolean {
    return this.checked;
  }

  @HostBinding('class.i-toggle__disabled')
  get disabledClass(): boolean {
    return this.disabled;
  }

  @HostBinding('class.i-toggle__label-left')
  get labelLeftClass(): boolean {
    return this.labelPosition === 'left';
  }

  private cvaOnChange: (v: boolean) => void = () => {
    /*  */
  };
  private cvaOnTouched: () => void = () => {
    /*  */
  };

  writeValue(value: boolean | null): void {
    this.checked = !!value;

    // keep native input in sync if already available
    if (this.inputRef) this.inputRef.nativeElement.checked = this.checked;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.cvaOnChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.cvaOnTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (this.inputRef) this.inputRef.nativeElement.disabled = isDisabled;
  }

  handleNativeChange(e: Event): void {
    if (this.disabled) return;

    const input = e.target as HTMLInputElement;
    const next = !!input.checked;

    this.checked = next;

    this.cvaOnChange(next);
    this.onChange.emit(next);
  }

  handleBlur(): void {
    this.cvaOnTouched();
    this.onTouched.emit();
  }

  private isInteractiveElement(el: HTMLElement | null): boolean {
    if (!el) return false;

    const tag = el.tagName.toLowerCase();

    if (
      tag === 'a' ||
      tag === 'button' ||
      tag === 'input' ||
      tag === 'textarea' ||
      tag === 'select' ||
      tag === 'label'
    )
      return true;

    const role = el.getAttribute('role');
    if (role === 'button' || role === 'link' || role === 'switch') return true;

    if (el.isContentEditable) return true;

    const tabindex = el.getAttribute('tabindex');
    if (tabindex !== null && tabindex !== '-1') return true;

    return false;
  }

  @HostListener('click', ['$event'])
  onHostClick(e: MouseEvent): void {
    if (this.disabled) return;

    const target = e.target as HTMLElement | null;

    // clicking input: let native handle
    if (target?.tagName.toLowerCase() === 'input') return;

    // If user clicks an interactive element inside projected content (label),
    // do not toggle the switch.
    if (target && (this.isInteractiveElement(target) || target.closest(INTERACTIVE_SELECTOR))) {
      return;
    }

    // click anywhere else (thumb/label/host) toggles input
    this.inputRef.nativeElement.click();
  }
}
