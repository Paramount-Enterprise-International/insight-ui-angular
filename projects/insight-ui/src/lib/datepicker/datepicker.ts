/**
 * IDatepicker
 * Version: 1.4.1
 *
 * - Wraps <i-input>
 * - ControlValueAccessor: value is Date | null
 * - Uses IInputMaskDirective for date typing / normalization
 * - Shows calendar popup, select day to set value
 * - Month & year selection via i-select
 */

import { formatDate, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import { IButton } from '../button/button';
import { IInput } from '../input/input';
import { IInputAddonButton } from '../input/input-addon';
import { IInputMaskDirective } from '../input/input-mask';
import {
  IFormControlErrorMessage,
  isControlRequired,
  resolveControlErrorMessage,
} from '../interfaces';
import { ISelect, ISelectChange } from '../select/select';

/** Internal structure for datepicker days */
interface IDatepickerDay {
  date: Date;
  inCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
}

type IMonthOption = { value: number; label: string };

/** Position of popup panel relative to input */
export type IDatepickerPanelPosition =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right';

@Component({
  selector: 'i-datepicker',
  standalone: true,
  imports: [IInput, IButton, IInputMaskDirective, ISelect, NgClass],
  templateUrl: './datepicker.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IDatepicker),
      multi: true,
    },
  ],
})
export class IDatepicker implements ControlValueAccessor, OnInit {
  // ------------- Inputs -------------

  @Input() placeholder: string = '';
  @Input() disabled = false;

  /** visual invalid state (from i-fc-datepicker or manual) */
  @Input() invalid = false;

  /**
   * Display / parse format.
   * Supported tokens: yyyy, MM, dd
   */
  @Input() format = 'dd/MM/yyyy';

  /**
   * Dropdown / popup position relative to the input.
   *
   * Single:
   *  - 'bottom' (default)
   *  - 'top'
   *  - 'left'
   *  - 'right'
   *
   * Compound:
   *  - 'top left'
   *  - 'top right'
   *  - 'bottom left'
   *  - 'bottom right'
   */
  @Input() panelPosition: IDatepickerPanelPosition = 'bottom left';

  /**
   * Allow [value]="..." when not using reactive forms.
   * Accepts Date or string, normalizes via writeValue.
   */
  @Input('value')
  set valueInput(v: Date | string | null) {
    this.writeValue(v);
  }

  @Output() onChanged = new EventEmitter<Date | null>();

  // ------------- CVA state -------------

  /** Internal model value (Date | null) */
  private _modelValue: Date | null = null;

  /** Displayed text in the input */
  private _displayText = '';
  get displayText(): string {
    return this._displayText;
  }

  private onChange: (value: Date | null) => void = () => {};
  private onTouched: () => void = () => {};

  // ------------- Datepicker state -------------

  /** Is popup open */
  isOpen = false;

  /** Calendar view year/month (0-11) */
  viewYear = 0;
  viewMonth = 0;

  /** Calendar weeks (6 rows x 7 cols) */
  weeks: IDatepickerDay[][] = [];

  /** Month options for <i-select> */
  readonly months: IMonthOption[] = [
    { value: 0, label: 'January' },
    { value: 1, label: 'February' },
    { value: 2, label: 'March' },
    { value: 3, label: 'April' },
    { value: 4, label: 'May' },
    { value: 5, label: 'June' },
    { value: 6, label: 'July' },
    { value: 7, label: 'August' },
    { value: 8, label: 'September' },
    { value: 9, label: 'October' },
    { value: 10, label: 'November' },
    { value: 11, label: 'December' },
  ];

  /** Static weekday labels (Mon–Sun) */
  readonly weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  /** Year options for the year <i-select> */
  private _years: number[] = [];
  get years(): number[] {
    return this._years;
  }

  /** Currently selected month option object for i-select */
  get monthSelected(): IMonthOption | null {
    return this.months.find((m) => m.value === this.viewMonth) ?? null;
  }

  /** Panel position class for CSS modifier */
  get panelPositionClass(): string {
    const value = (this.panelPosition || 'bottom left').trim();
    const normalized = value.replace(/\s+/g, '-'); // "top left" -> "top-left"
    return `i-datepicker-panel--${normalized}`;
  }

  constructor(private hostEl: ElementRef<HTMLElement>) {}

  // ------------- Helpers -------------

  /** Always read the REAL inner <input> value, ignore event.target type */
  private getInnerInput(): HTMLInputElement | null {
    return this.hostEl.nativeElement.querySelector('i-input input') as HTMLInputElement | null;
  }

  private focusInput(): void {
    const input = this.getInnerInput();
    if (input) {
      input.focus();
    }
  }

  // ------------- Lifecycle -------------

  ngOnInit(): void {
    // If nothing is set from outside, default to today visually
    if (!this._modelValue && !this._displayText) {
      const today = this.startOfDay(new Date());
      this._modelValue = today;
      this._displayText = this.formatDate(today);
      this.updateView(today);
    }
  }

  // ------------- CVA implementation -------------

  writeValue(value: Date | string | null): void {
    let date: Date | null = null;

    if (value instanceof Date) {
      date = this.startOfDay(value);
    } else if (typeof value === 'string' && value.trim()) {
      date = this.parseInputDate(value.trim());
    } else {
      date = null;
    }

    this._modelValue = date;

    if (date) {
      this._displayText = this.formatDate(date);
    }

    const baseDate =
      this._modelValue ?? this.parseInputDate(this._displayText) ?? this.startOfDay(new Date());

    this.updateView(baseDate);
  }

  registerOnChange(fn: (value: Date | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // ------------- Append addon (fixed calendar button) -------------

  get appendAddon(): IInputAddonButton {
    return {
      type: 'button',
      icon: 'calendar',
      visible: true,
      variant: 'primary',
      onClick: () => {
        this.toggleOpen();
        this.focusInput(); // keep behavior same as i-select
      },
    };
  }

  // ------------- Input & typing -------------

  /**
   * Called when user types in the inner input.
   * Formatting / clamping is handled by IInputMaskDirective.
   */
  private handleInput(raw: string): void {
    this._displayText = raw;

    const parsed = this.parseInputDate(raw);
    this._modelValue = parsed;

    if (parsed) {
      this.updateView(parsed);
    }

    this.onChange(parsed);
    this.onChanged.emit(parsed);
  }

  private handleBlur(): void {
    this.onTouched();
  }

  // ------------- Datepicker UI actions -------------

  toggleOpen(): void {
    if (this.disabled) return;

    if (!this.isOpen) {
      // when opening, sync calendar from current input text if any
      const input = this.getInnerInput();
      if (input && input.value) {
        const parsed = this.parseInputDate(input.value);
        if (parsed) {
          this._modelValue = parsed;
          this._displayText = this.formatDate(parsed);
        }
      }
      this.initViewFromModel();
    }
    this.isOpen = !this.isOpen;
  }

  prevMonth(): void {
    if (this.viewMonth === 0) {
      this.viewMonth = 11;
      this.viewYear -= 1;
    } else {
      this.viewMonth -= 1;
    }
    this.ensureYearRange(this.viewYear);
    this.buildCalendar();
  }

  nextMonth(): void {
    if (this.viewMonth === 11) {
      this.viewMonth = 0;
      this.viewYear += 1;
    } else {
      this.viewMonth += 1;
    }
    this.ensureYearRange(this.viewYear);
    this.buildCalendar();
  }

  /** Month changed from <i-select> */
  onMonthChange(change: ISelectChange<any>): void {
    const row = change?.value;
    if (!row) return;

    const month = typeof row === 'object' && 'value' in row ? (row as IMonthOption).value : row;

    if (typeof month !== 'number') return;
    if (month < 0 || month > 11) return;

    this.viewMonth = month;
    this.buildCalendar();
  }

  /** Year changed from <i-select> */
  onYearChange(change: ISelectChange<number>): void {
    const year = change.value;
    if (typeof year !== 'number') return;

    this.viewYear = year;
    this.ensureYearRange(this.viewYear);
    this.buildCalendar();
  }

  selectDay(day: IDatepickerDay): void {
    if (this.disabled) return;

    const selected = this.startOfDay(day.date);
    this._modelValue = selected;
    this._displayText = this.formatDate(selected);

    this.onChange(selected);
    this.onTouched();
    this.onChanged.emit(selected);

    this.updateView(selected);
    this.isOpen = false;
  }

  // ------------- Date view helpers -------------

  /** Initialize view year/month from model or today */
  private initViewFromModel(): void {
    let base: Date;

    if (this._modelValue instanceof Date) {
      base = this.startOfDay(this._modelValue);
    } else if (this._displayText) {
      base = this.parseInputDate(this._displayText) ?? this.startOfDay(new Date());
    } else {
      base = this.startOfDay(new Date());
    }

    this.updateView(base);
  }

  private updateView(date: Date): void {
    this.viewYear = date.getFullYear();
    this.viewMonth = date.getMonth();
    this.ensureYearRange(this.viewYear);
    this.buildCalendar();
  }

  private ensureYearRange(focusYear: number): void {
    if (
      !this._years.length ||
      focusYear < this._years[0] ||
      focusYear > this._years[this._years.length - 1]
    ) {
      const start = focusYear - 50;
      const end = focusYear + 10;
      const arr: number[] = [];
      for (let y = start; y <= end; y++) {
        arr.push(y);
      }
      this._years = arr;
    }
  }

  private buildCalendar(): void {
    const year = this.viewYear;
    const month = this.viewMonth;

    const firstOfMonth = new Date(year, month, 1);
    // Make Monday = 0
    const startDay = (firstOfMonth.getDay() + 6) % 7;
    const startDate = new Date(year, month, 1 - startDay);

    const weeks: IDatepickerDay[][] = [];
    let current = new Date(startDate);

    const selected: Date | null = this._modelValue ? this.startOfDay(this._modelValue) : null;
    const today = this.startOfDay(new Date());

    for (let w = 0; w < 6; w++) {
      const row: IDatepickerDay[] = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(current);
        const inCurrentMonth = date.getMonth() === month;

        row.push({
          date,
          inCurrentMonth,
          isToday: this.isSameDate(date, today),
          isSelected: selected ? this.isSameDate(date, selected) : false,
        });

        current.setDate(current.getDate() + 1);
      }
      weeks.push(row);
    }

    this.weeks = weeks;
  }

  private startOfDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  private isSameDate(a: Date, b: Date): boolean {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  /**
   * Parse date string according to this.format (yyyy, MM, dd)
   */
  private parseInputDate(value: string): Date | null {
    if (!value) return null;

    const fmt = this.format || 'yyyy-MM-dd';

    const parts = value.match(/\d+/g);
    if (!parts || parts.length < 3) return null;

    const tokens = fmt.match(/(yyyy|MM|dd)/g) || ['yyyy', 'MM', 'dd'];

    let year: number | undefined;
    let month: number | undefined;
    let day: number | undefined;

    tokens.forEach((t, idx) => {
      const p = parts[idx];
      if (!p) return;
      const n = Number(p);

      if (t === 'yyyy') {
        year = n;
      } else if (t === 'MM') {
        month = n;
      } else if (t === 'dd') {
        day = n;
      }
    });

    if (!year || !month || !day) return null;

    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
      return null;
    }

    return this.startOfDay(date);
  }

  /**
   * Format Date → string according to this.format.
   */
  private formatDate(date: Date): string {
    const fmt = this.format || 'yyyy-MM-dd';
    return formatDate(date, fmt, 'en');
  }

  // ------------- Host listeners -------------

  /**
   * Listen to any 'input' bubbling inside <i-datepicker>
   * and always read from the inner <input>, not event.target.
   */
  @HostListener('input')
  onHostInput(): void {
    const input = this.getInnerInput();
    if (!input) return;
    this.handleInput(input.value);
  }

  /** Blur anywhere inside → mark touched */
  @HostListener('focusout', ['$event'])
  onHostFocusOut(_event: FocusEvent): void {
    this.handleBlur();
  }

  /** Close popup when clicking outside i-datepicker */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isOpen) return;
    const target = event.target as Node | null;
    if (target && !this.hostEl.nativeElement.contains(target)) {
      this.isOpen = false;
    }
  }
}

@Component({
  selector: 'i-fc-datepicker',
  standalone: true,
  imports: [IDatepicker],
  template: `@if (label) {
    <label class="i-fc-datepicker__label" (click)="focusInnerDatepicker()">
      {{ label }} : @if (required) {
      <span class="i-fc-datepicker__required">*</span>
      }
    </label>
    }

    <i-datepicker
      [placeholder]="placeholder"
      [disabled]="isDisabled"
      [invalid]="controlInvalid"
      [format]="format"
      [value]="value"
      [panelPosition]="panelPosition"
      (onChanged)="handleDateChange($event)"
    >
    </i-datepicker>

    @if (controlInvalid && resolvedErrorText) {
    <div class="i-fc-datepicker__error">
      {{ resolvedErrorText }}
    </div>
    }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IFCDatepicker),
      multi: true,
    },
  ],
})
export class IFCDatepicker implements ControlValueAccessor {
  @ViewChild(IDatepicker) innerDatepicker!: IDatepicker;

  @Input() label: string = '';
  @Input() placeholder: string = '';

  /** Passed through to IDatepicker's [format] input */
  @Input() format: string = 'dd/MM/yyyy';

  /** Passed through to IDatepicker's [panelPosition] input */
  @Input() panelPosition: IDatepickerPanelPosition = 'bottom left';

  @Input() errorMessage?: IFormControlErrorMessage;

  @Input()
  get value(): Date | null {
    return this._value;
  }
  set value(v: Date | null) {
    this._value = v ?? null;
  }

  private _value: Date | null = null;
  isDisabled = false;

  private onChange: (v: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(
    @Optional() @Self() public ngControl: NgControl | null,
    @Optional() private formDir: FormGroupDirective | null,
    private cdr: ChangeDetectorRef,
    private hostEl: ElementRef<HTMLElement>
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    if (this.formDir) {
      this.formDir.ngSubmit.subscribe(() => {
        this.cdr.markForCheck();
      });
    }
  }

  // ---- CVA ----

  writeValue(v: any): void {
    if (v instanceof Date || v === null) {
      this._value = v;
    } else if (typeof v === 'string' && v.trim()) {
      const parsed = new Date(v);
      this._value = isNaN(parsed.getTime()) ? null : parsed;
    } else {
      this._value = null;
    }
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

  // ---- Bridge IDatepicker → outer form control ----

  handleDateChange(date: Date | null): void {
    this._value = date ?? null;
    this.onChange(this._value);
    this.onTouched();
  }

  // ---- Label click → focus inner input ----

  focusInnerDatepicker(): void {
    if (this.isDisabled) return;

    const input = this.hostEl.nativeElement.querySelector(
      'i-datepicker i-input input'
    ) as HTMLInputElement | null;

    input?.focus();
  }

  // ---- Validation helpers ----

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
