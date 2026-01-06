/* textarea.ts */
/**
 * ITextarea
 * Version: 1.1.0
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
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

@Component({
  selector: 'i-textarea',
  standalone: true,
  template: `<textarea
    #textareaRef
    [attr.aria-invalid]="invalid ? 'true' : null"
    [disabled]="isDisabled"
    [placeholder]="placeholder"
    [readonly]="readonly"
    [rows]="rows"
    [value]="value ?? ''"
    (blur)="handleBlur()"
    (input)="handleInput($event)"
  ></textarea>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ITextArea,
      multi: true,
    },
  ],
})
export class ITextArea implements ControlValueAccessor {
  @Input() placeholder = '';

  @Input() readonly = false;

  @Input() rows = 3;

  /** invalid state (controlled by form or wrapper) */
  @Input() invalid = false;

  /** value usable both by CVA and by [value] binding */
  @Input()
  get value(): string | null {
    return this._value;
  }

  set value(v: string | null) {
    this._value = v ?? '';
  }

  @ViewChild('textareaRef') textareaRef!: ElementRef<HTMLTextAreaElement>;

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
    const target = event.target as HTMLTextAreaElement;
    this._value = target.value;
    this.onChange(this._value);
  }

  handleBlur(): void {
    this.onTouched();
  }

  /** Click anywhere on <i-textarea> focuses the inner textarea */
  @HostListener('click')
  handleHostClick(): void {
    if (!this.isDisabled && this.textareaRef) {
      this.textareaRef.nativeElement.focus();
    }
  }
}

/**
 * IFcTextarea
 * Version: 1.0.0
 *
 * - Form control wrapper for ITextArea
 * - Provides label, required asterisk, error message
 * - Implements CVA so you can use formControlName on <i-fc-textarea>
 */

@Component({
  selector: 'i-fc-textarea',
  standalone: true,
  imports: [ITextArea],
  template: `@if (label) {
    <label class="i-fc-textarea__label" (click)="focusInnerTextarea()">
      {{ label }} : @if (required) {
      <span class="i-fc-textarea__required">*</span>
      }
    </label>
    }

    <i-textarea
      [disabled]="isDisabled"
      [invalid]="controlInvalid"
      [placeholder]="placeholder"
      [readonly]="readonly"
      [rows]="rows"
      [value]="value"
      (blur)="handleInnerBlur()"
      (input)="handleInnerInput($event)"
    />

    @if (controlInvalid && resolvedErrorText) {
    <div class="i-fc-textarea__error">
      {{ resolvedErrorText }}
    </div>
    }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IFCTextArea implements ControlValueAccessor {
  @ViewChild(ITextArea) innerTextarea!: ITextArea;

  // ---------- UI inputs ----------
  @Input() label = '';

  @Input() placeholder = '';

  @Input() readonly = false;

  @Input() rows = 3;

  /** old-style custom error templates: { required: '{label} is xxx' } */
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
    private cdr: ChangeDetectorRef
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    // when the form is submitted, re-check this OnPush component
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

  // ---------- bridge from inner <i-textarea> ----------
  handleInnerInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement | null;
    const v = target?.value ?? '';
    this._value = v;
    this.onChange(this._value);
  }

  handleInnerBlur(): void {
    this.onTouched();
  }

  // ---------- focus from label ----------
  focusInnerTextarea(): void {
    if (!this.isDisabled && this.innerTextarea?.textareaRef) {
      this.innerTextarea.textareaRef.nativeElement.focus();
    }
  }

  // ---------- validation helpers ----------
  get controlInvalid(): boolean {
    const c = this.ngControl?.control;
    if (!c) {
      return false;
    }

    // same behavior as i-fc-input:
    // invalid + form submitted, otherwise fallback to dirty/touched
    if (this.formDir) {
      return c.invalid && !!this.formDir.submitted;
    }
    return c.invalid && (c.dirty || c.touched);
  }

  get required(): boolean {
    return isControlRequired(this.ngControl, this.errorMessage);
  }

  get resolvedErrorText(): string | null {
    return resolveControlErrorMessage(this.ngControl, this.label, this.errorMessage);
  }
}
