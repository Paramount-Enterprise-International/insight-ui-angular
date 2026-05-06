/**
 * select.ts
 *
 * - ISelect (native <select> wrapper)
 * - IFCSelect (form control wrapper)
 */

import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  inject,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  IFormControlErrorMessage,
  isControlRequired,
  resolveControlErrorMessage,
} from '../interfaces';

/* =========================================
 * TYPES
 * ========================================= */

export type ISelectChange<T = any> = {
  value: T | null;
  label: string;
};

/* =========================================
 * ISelect (Native Wrapper)
 * ========================================= */

@Component({
  selector: 'i-select',
  standalone: true,
  template: `
    <select #selectEl class="i-select" [disabled]="disabled">
      <ng-content />
    </select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ISelect),
      multi: true,
    },
  ],
})
export class ISelect implements ControlValueAccessor, AfterViewInit, AfterViewChecked {
  /* ================= Inputs ================= */

  @Input() disabled = false;

  @Input()
  set value(v: any) {
    this._value = v;
    this.syncValueToView();
  }

  get value(): any {
    return this._value;
  }

  /* ================= Outputs ================= */

  @Output() readonly onChanged = new EventEmitter<ISelectChange<any>>();
  @Output() readonly onOptionSelected = new EventEmitter<ISelectChange<any>>();

  /* ================= View ================= */

  @ViewChild('selectEl', { static: true })
  selectRef!: ElementRef<HTMLSelectElement>;

  /* ================= Internal ================= */

  private _value: any = null;

  private onChange: (v: any) => void = () => {};
  private onTouched: () => void = () => {};

  private viewInitialized = false;

  /* ================= Lifecycle ================= */

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.syncValueToView();
  }

  ngAfterViewChecked(): void {
    this.syncValueToView();
  }

  /* ================= CVA ================= */

  writeValue(value: any): void {
    this._value = value;
    this.syncValueToView();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;

    if (this.selectRef) {
      this.selectRef.nativeElement.disabled = isDisabled;
    }
  }

  /* ================= Sync ================= */

  private syncValueToView(): void {
    if (!this.viewInitialized || !this.selectRef) return;

    const select = this.selectRef.nativeElement;

    if (select.value !== (this._value ?? '')) {
      select.value = this._value ?? '';
    }
  }

  /* ================= Events ================= */

  @HostListener('change', ['$event'])
  onHostChange(event: Event): void {
    const select = event.target as HTMLSelectElement;

    const value = select.value;

    this._value = value;

    const payload: ISelectChange = {
      value,
      label: select.options[select.selectedIndex]?.text ?? '',
    };

    this.onChange(value);
    this.onTouched();

    this.onChanged.emit(payload);
    this.onOptionSelected.emit(payload);
  }

  @HostListener('blur')
  onHostBlur(): void {
    this.onTouched();
  }

  /* ================= Public ================= */

  focus(): void {
    this.selectRef?.nativeElement.focus();
  }
}

/* =========================================
 * IFCSelect (Form Control Wrapper)
 * ========================================= */

@Component({
  selector: 'i-fc-select',
  standalone: true,
  imports: [ISelect],
  template: `
    @if (label) {
      <label class="i-fc-select__label" (click)="focusInnerSelect()">
        {{ label }}
        @if (required) {
          <span class="i-fc-select__required">*</span>
        }
      </label>
    }

    <i-select [disabled]="isDisabled" [value]="value" (onChanged)="handleChange($event)">
      <ng-content />
    </i-select>

    @if (controlInvalid && resolvedErrorText) {
      <div class="i-fc-select__error">
        {{ resolvedErrorText }}
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IFCSelect<T = any> implements ControlValueAccessor, AfterViewInit, OnDestroy {
  /* ================= View ================= */

  @ViewChild(ISelect) innerSelect!: ISelect;

  /* ================= Inputs ================= */

  @Input() label = '';
  @Input() errorMessage?: IFormControlErrorMessage;

  @Input()
  get value(): T | null {
    return this._value;
  }
  set value(v: T | null) {
    this._value = v ?? null;

    if (this.innerSelect) {
      this.innerSelect.writeValue(this._value);
    }

    this.cdr.markForCheck();
  }

  /* ================= Outputs ================= */

  @Output() readonly onChanged = new EventEmitter<ISelectChange<T>>();
  @Output() readonly onOptionSelected = new EventEmitter<ISelectChange<T>>();

  /* ================= Internal ================= */

  private _value: T | null = null;
  isDisabled = false;

  private onChange: (v: any) => void = () => {};
  private onTouched: () => void = () => {};

  readonly ngControl = inject(NgControl, {
    self: true,
    optional: true,
  });

  private readonly formDir = inject(FormGroupDirective, {
    optional: true,
  });

  private readonly cdr = inject(ChangeDetectorRef);

  private submitSub?: Subscription;

  constructor() {
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

  /* ================= Lifecycle ================= */

  ngAfterViewInit(): void {
    if (this.innerSelect) {
      this.innerSelect.writeValue(this._value);
      this.innerSelect.setDisabledState(this.isDisabled);
    }

    this.cdr.markForCheck();
  }

  /* ================= CVA ================= */

  writeValue(v: T | null): void {
    this._value = v ?? null;

    if (this.innerSelect) {
      this.innerSelect.writeValue(this._value);
    }

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

    if (this.innerSelect) {
      this.innerSelect.setDisabledState(isDisabled);
    }

    this.cdr.markForCheck();
  }

  /* ================= Events ================= */

  handleChange(change: ISelectChange<T>): void {
    this._value = change.value ?? null;

    this.onChange(this._value);
    this.onTouched();

    this.onChanged.emit(change);
    this.onOptionSelected.emit(change);
  }

  focusInnerSelect(): void {
    if (!this.isDisabled && this.innerSelect) {
      this.innerSelect.focus();
    }
  }

  /* ================= Validation ================= */

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
