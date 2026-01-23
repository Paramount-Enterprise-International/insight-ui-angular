/* textarea.ts */
/**
 * ITextarea
 * Version: 1.1.1
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
  Input,
  OnDestroy,
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
import { Subscription } from 'rxjs';

/* =========================================
 * ITextArea (CVA)
 * ========================================= */

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
    [value]="_value ?? ''"
    (blur)="handleBlur()"
    (input)="handleInput($event)"
  ></textarea>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ITextArea),
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

  /**
   * NOTE:
   * Keep [value] support for non-form usages.
   * But CVA should be the main source of truth.
   */
  @Input()
  get value(): string | null {
    return this._value;
  }
  set value(v: string | null) {
    this._value = v ?? '';
  }

  @ViewChild('textareaRef') textareaRef!: ElementRef<HTMLTextAreaElement>;

  protected _value: string | null = null;

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

@Component({
  selector: 'i-fc-textarea',
  standalone: true,
  imports: [ITextArea],
  template: `@if (label) {
      <label class="i-fc-textarea__label" (click)="focusInnerTextarea()">
        {{ label }} :
        @if (required) {
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
      [value]="_value"
      (focusout)="handleInnerFocusOut()"
      (input)="handleInnerInput($event)"
    />

    @if (controlInvalid && resolvedErrorText) {
      <div class="i-fc-textarea__error">
        {{ resolvedErrorText }}
      </div>
    }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ✅ NO NG_VALUE_ACCESSOR PROVIDER HERE (prevents circular dependency)
})
export class IFCTextArea implements ControlValueAccessor, OnDestroy {
  @ViewChild(ITextArea) innerTextarea!: ITextArea;

  private readonly cdr = inject(ChangeDetectorRef);

  // Optional injections (same as @Self() @Optional())
  private readonly ngControl = inject(NgControl, { self: true, optional: true });
  private readonly formDir = inject(FormGroupDirective, { optional: true });

  private submitSub?: Subscription;

  // ---------- UI inputs ----------
  @Input() label = '';
  @Input() placeholder = '';
  @Input() readonly = false;
  @Input() rows = 3;
  @Input() errorMessage?: IFormControlErrorMessage;

  @Input()
  get value(): string | null {
    return this._value;
  }
  set value(v: string | null) {
    this._value = v ?? '';
    this.cdr.markForCheck();
  }

  // ---------- internal state ----------
  protected _value: string | null = null;
  isDisabled = false;

  private onChange: (v: any) => void = () => {
    /*  */
  };
  private onTouched: () => void = () => {
    /*  */
  };

  constructor() {
    // ✅ this is the "i-fc-input" pattern
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    if (this.formDir) {
      this.submitSub = this.formDir.ngSubmit.subscribe(() => {
        this.cdr.markForCheck();
      });
    }
  }

  ngOnDestroy(): void {
    this.submitSub?.unsubscribe();
  }

  // ---------- CVA ----------
  writeValue(v: any): void {
    this._value = v ?? '';
    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.cdr.markForCheck();
  }

  // ---------- bridge from inner <i-textarea> ----------
  handleInnerInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement | null;
    const v = target?.value ?? '';
    this._value = v;
    this.onChange(this._value);
    this.cdr.markForCheck();
  }

  handleInnerFocusOut(): void {
    this.onTouched();
    this.cdr.markForCheck();
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
    if (!c) return false;

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
