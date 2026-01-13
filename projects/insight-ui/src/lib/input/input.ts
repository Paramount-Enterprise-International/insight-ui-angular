/* input.ts */
/**
 * IInput
 * Version: 2.0.0
 *
 * - Simple CVA text input
 * - Masking is handled by IInputMaskDirective on the inner <input>
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  NgModule,
  Optional,
  Self,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import {
  IFormControlErrorMessage,
  isControlRequired,
  resolveControlErrorMessage,
} from '../interfaces';
import { IInputAddon, IInputAddonLoading, IInputAddons } from './input-addon';
import { IInputMask, IInputMaskDirective } from './input-mask';

@Component({
  selector: 'i-input',
  standalone: true,
  imports: [IInputAddon, IInputMaskDirective],
  template: `@for (i of prepends; track $index) {
      <i-input-addon [addon]="i" />
    }
    <input
      #inputRef
      [attr.aria-invalid]="invalid ? 'true' : null"
      [attr.autocomplete]="autocomplete || null"
      [disabled]="isDisabled"
      [iInputMask]="mask"
      [placeholder]="placeholder"
      [readonly]="readonly"
      [type]="type"
      [value]="value ?? ''"
      (blur)="handleBlur()"
      (input)="handleInput($event)"
    />
    @for (i of appends; track $index) {
      <i-input-addon [addon]="i" />
    } `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IInput),
      multi: true,
    },
  ],
})
export class IInput implements ControlValueAccessor {
  @Input() type = 'text';

  @Input() placeholder = '';

  @Input() autocomplete: string | undefined;

  @Input() readonly = false;

  /** invalid state (controlled by form or wrapper) */
  @Input() invalid = false;

  /** Optional mask passed through to inner input's directive */
  @Input() mask: IInputMask | undefined;

  /** value usable both by CVA and by [value] binding */
  @Input()
  get value(): string | null {
    return this._value;
  }

  set value(v: string | null) {
    this._value = v ?? '';
  }

  @Input() prepend: IInputAddons | IInputAddons[] | undefined;

  @Input() append: IInputAddons | IInputAddons[] | IInputAddonLoading | undefined;

  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

  private _value: string | null = null;

  isDisabled = false;

  @Input()
  get disabled(): boolean {
    return this.isDisabled;
  }

  set disabled(value: boolean) {
    this.isDisabled = value;
  }

  private onChange: (value: any) => void = () => {
    /*  */
  };

  private onTouched: () => void = () => {
    /*  */
  };

  // -----------------------------
  // ControlValueAccessor
  // -----------------------------
  writeValue(value: any): void {
    this._value = value ?? '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  // -----------------------------
  // View events
  // -----------------------------
  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this._value = target.value ?? '';
    this.onChange(this._value);
  }

  handleBlur(): void {
    this.onTouched();
  }

  /** Click anywhere on <i-input> focuses the inner input,
   *  EXCEPT when clicking on an addon (button/link/etc).
   */
  @HostListener('click', ['$event'])
  handleHostClick(event: MouseEvent): void {
    if (this.isDisabled || !this.inputRef) {
      return;
    }

    const target = event.target as HTMLElement | null;

    if (target && target.closest('i-input-addon')) {
      return;
    }

    this.inputRef.nativeElement.focus();
  }

  get prepends(): IInputAddons[] {
    if (!this.prepend) {
      return [];
    }
    return Array.isArray(this.prepend) ? this.prepend : [this.prepend];
  }

  get appends(): IInputAddons[] {
    if (!this.append) {
      return [];
    }
    return Array.isArray(this.append) ? this.append : [this.append];
  }
}

@Component({
  selector: 'i-fc-input',
  standalone: true,
  imports: [IInput],
  template: `@if (label) {
      <label class="i-fc-input__label" (click)="focusInnerInput()">
        {{ label }} :
        @if (required) {
          <span class="i-fc-input__required">*</span>
        }
      </label>
    }

    <i-input
      [append]="append"
      [autocomplete]="autocomplete"
      [disabled]="isDisabled"
      [invalid]="controlInvalid"
      [mask]="mask"
      [placeholder]="placeholder"
      [prepend]="prepend"
      [readonly]="readonly"
      [type]="type"
      [value]="value"
      (blur)="handleInnerBlur()"
      (input)="handleInnerInput($event)"
    />

    @if (controlInvalid && resolvedErrorText) {
      <div class="i-fc-input__error">
        {{ resolvedErrorText }}
      </div>
    }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IFCInput implements ControlValueAccessor {
  @ViewChild(IInput) innerInput!: IInput;

  // ---------- UI inputs ----------
  @Input() label = '';

  @Input() placeholder = '';

  @Input() autocomplete: string | undefined;

  @Input() readonly = false;

  @Input() type = 'text';

  @Input() mask: IInputMask | undefined;

  @Input() prepend: IInput['prepend'];

  @Input() append: IInput['append'];

  /** old-style custom error templates: { required: '{label} is cuwax' } */
  @Input() errorMessage?: IFormControlErrorMessage;

  /** non-form usage: [value] binding */
  @Input()
  get value(): string | null {
    return this._value;
  }

  set value(v: string | null) {
    this._value = v ?? '';
  }

  // ---------- internal state ----------
  private _value: string | null = null;

  isDisabled = false;

  private onChange: (v: any) => void = () => {};

  private onTouched: () => void = () => {};

  constructor(
    @Optional() @Self() public ngControl: NgControl | null,
    @Optional() private formDir: FormGroupDirective | null,
    private cdr: ChangeDetectorRef,
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    // 🔁 when the form is submitted, re-check this OnPush component
    if (this.formDir) {
      this.formDir.ngSubmit.subscribe(() => {
        this.cdr.markForCheck();
      });
    }
  }

  // ---------- CVA ----------
  writeValue(v: any): void {
    this._value = v ?? '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  // ---------- bridge from inner <i-input> ----------
  handleInnerInput(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    const v = target?.value ?? '';
    this._value = v;
    this.onChange(this._value);
  }

  handleInnerBlur(): void {
    this.onTouched();
  }

  // ---------- focus from label ----------
  focusInnerInput(): void {
    if (!this.isDisabled && this.innerInput?.inputRef) {
      this.innerInput.inputRef.nativeElement.focus();
    }
  }

  // ---------- validation helpers ----------
  get controlInvalid(): boolean {
    const c = this.ngControl?.control;
    if (!c) {
      return false;
    }

    // 🧠 mimic old IInput.isInvalid: invalid && form submitted
    if (this.formDir) {
      return c.invalid && !!this.formDir.submitted;
    }

    // fallback when not inside a FormGroupDirective
    return c.invalid && (c.dirty || c.touched);
  }

  get required(): boolean {
    return isControlRequired(this.ngControl, this.errorMessage);
  }

  get resolvedErrorText(): string | null {
    return resolveControlErrorMessage(this.ngControl, this.label, this.errorMessage);
  }
}

@NgModule({
  imports: [IInput, IFCInput, IInputAddon, IInputMaskDirective],
  exports: [IInput, IFCInput, IInputAddon, IInputMaskDirective],
})
export class IInputModule {}
