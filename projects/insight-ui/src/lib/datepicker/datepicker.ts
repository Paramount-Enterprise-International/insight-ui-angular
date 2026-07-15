/**
 * IDatepicker
 * Version: 1.5.4
 *
 * Fixes:
 * - ✅ IMPORTANT: prevent value from being wiped due to bubbled "input" events
 *   from inner month/year i-select inputs.
 *   -> Only handle input when event.target is the date input itself.
 * - Keep portal + positioning + flicker guard for portaled i-options.
 * - IFCDatepicker included in same file
 * - Add absolute minYear/maxYear and relative minYearRange/maxYearRange
 */

import { formatDate, NgClass } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  inject,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import { IButton } from '../button/button';
import { IInput, IInputAddonButton, IInputMaskDirective } from '../input/input';
import {
  IFormControlErrorMessage,
  isControlRequired,
  resolveControlErrorMessage,
} from '../interfaces';
import { ISelect, ISelectChange } from '../select/select';

type IDatepickerDay = {
  date: Date;
  inCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
};

type IMonthOption = { value: number; label: string };

export type IDatepickerPanelPosition =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right';

const noop = (): void => {
  /**/
};

@Component({
  selector: 'i-datepicker',
  standalone: true,
  imports: [IInput, IButton, IInputMaskDirective, ISelect, NgClass],
  template: `
    <i-input
      [append]="appendAddon"
      [autoDefault]="false"
      [iInputMask]="{ type: 'date', format: format }"
      [invalid]="invalid"
      [placeholder]="placeholder"
      [readonly]="disabled"
      [value]="displayText"
    />

    <span #portalHome style="display:none"></span>

    <i-datepicker-panel
      #panel
      class="i-datepicker-panel"
      [ngClass]="panelPositionClass"
      [style.display]="isOpen ? '' : 'none'"
    >
      <div class="i-datepicker-header">
        <i-button icon="prev" size="xs" (click)="prevMonth()" />

        <i-select
          class="i-date-picker-month-select"
          [options]="months"
          [value]="monthSelected"
          (onOptionSelected)="onMonthChange($event)"
        />

        <i-select
          class="i-date-picker-year-select"
          [options]="years"
          [value]="viewYear"
          (onOptionSelected)="onYearChange($event)"
        />

        <i-button icon="next" size="xs" (click)="nextMonth()" />
      </div>

      <div class="i-datepicker-weekdays">
        @for (w of weekdays; track w) {
          <small>{{ w }}</small>
        }
      </div>

      <div class="i-datepicker-weeks">
        @for (week of weeks; track $index) {
          <div class="i-datepicker-week">
            @for (d of week; track d.date.getTime()) {
              <div
                class="i-datepicker-day"
                [class.current-month]="d.inCurrentMonth"
                [class.selected]="d.isSelected"
                [class.today]="d.isToday && !d.isSelected"
                (click)="selectDay(d)"
              >
                {{ d.date.getDate() }}
              </div>
            }
          </div>
        }
      </div>
    </i-datepicker-panel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IDatepicker),
      multi: true,
    },
  ],
})
export class IDatepicker implements ControlValueAccessor, OnInit, OnDestroy {
  private readonly hostEl = inject(ElementRef<HTMLElement>);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly zone = inject(NgZone);
  private readonly renderer = inject(Renderer2);

  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() invalid = false;

  @Input() format = 'dd/MM/yyyy';
  @Input() panelPosition: IDatepickerPanelPosition = 'bottom left';

  private _minYear: number | null = null;
  private _maxYear: number | null = null;
  private _minYearRange: number | null = null;
  private _maxYearRange: number | null = null;

  @Input()
  set minYear(value: number | string | null | undefined) {
    this._minYear = this.coerceYear(value);
    this.refreshYearRange();
  }
  get minYear(): number | null {
    return this._minYear;
  }

  @Input()
  set maxYear(value: number | string | null | undefined) {
    this._maxYear = this.coerceYear(value);
    this.refreshYearRange();
  }
  get maxYear(): number | null {
    return this._maxYear;
  }

  @Input()
  set minYearRange(value: number | string | null | undefined) {
    this._minYearRange = this.coerceYear(value);
    this.refreshYearRange();
  }
  get minYearRange(): number | null {
    return this._minYearRange;
  }

  @Input()
  set maxYearRange(value: number | string | null | undefined) {
    this._maxYearRange = this.coerceYear(value);
    this.refreshYearRange();
  }
  get maxYearRange(): number | null {
    return this._maxYearRange;
  }

  @Input() portalToBody = true;
  @Input() matchTriggerWidth = true;
  @Input() panelOffset = 6;

  @Input()
  set value(v: Date | string | null) {
    this.writeValue(v);
  }
  get value(): Date | string | null {
    return this._modelValue;
  }

  @Output() readonly onChanged = new EventEmitter<Date | null>();

  @HostBinding('class.i-datepicker--disabled')
  get disabledHostClass(): boolean {
    return this.disabled;
  }

  @ViewChild('panel', { read: ElementRef }) private panelRef?: ElementRef<HTMLElement>;
  @ViewChild('portalHome', { read: ElementRef }) private portalHomeRef?: ElementRef<HTMLElement>;

  private _modelValue: Date | null = null;

  private _displayText = '';
  get displayText(): string {
    return this._displayText;
  }

  private onChange: (value: Date | null) => void = noop;
  private onTouched: () => void = noop;

  isOpen = false;
  viewYear = 0;
  viewMonth = 0;

  weeks: IDatepickerDay[][] = [];

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

  readonly weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  private _years: number[] = [];
  get years(): number[] {
    return this._years;
  }

  get monthSelected(): IMonthOption | null {
    return this.months.find((m) => m.value === this.viewMonth) ?? null;
  }

  get panelPositionClass(): string {
    const value = (this.panelPosition || 'bottom left').trim();
    const normalized = value.replace(/\s+/g, '-');
    return `i-datepicker-panel--${normalized}`;
  }

  private panelPortaled = false;
  private originalParent: Node | null = null;
  private originalNextSibling: Node | null = null;

  private repositionRaf = 0;
  private listeningGlobal = false;

  ngOnInit(): void {
    // Initialize calendar view to today WITHOUT setting a model value.
    // The input stays empty until a date is picked or written via form control.
    // Fixes: optional/null date fields no longer auto-fill with today.
    if (!this._modelValue && !this._displayText) {
      this.updateView(this.startOfDay(new Date()));
    }
  }

  ngOnDestroy(): void {
    this.closePanel(true);
  }

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
    this._displayText = date ? this.formatDate(date) : '';

    const baseDate =
      this._modelValue ?? this.parseInputDate(this._displayText) ?? this.startOfDay(new Date());

    this.updateView(baseDate);
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: Date | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  get appendAddon(): IInputAddonButton {
    return {
      type: 'button',
      icon: 'calendar',
      visible: true,
      variant: 'primary',
      onClick: (): void => {
        this.toggleOpen();
        this.getInnerInput()?.focus();
      },
    };
  }

  private getPanelEl(): HTMLElement | null {
    return this.panelRef?.nativeElement ?? null;
  }

  private getInnerInput(): HTMLInputElement | null {
    return this.hostEl.nativeElement.querySelector('i-input input') as HTMLInputElement | null;
  }

  private getAnchorRect(): DOMRect | null {
    const iInput = this.hostEl.nativeElement.querySelector('i-input') as HTMLElement | null;
    return iInput?.getBoundingClientRect?.() ?? this.hostEl.nativeElement.getBoundingClientRect();
  }

  private syncFromInnerInputSafely(): void {
    const input = this.getInnerInput();
    if (!input) return;

    const raw = (input.value ?? '').trim();
    if (!raw) return;

    const parsed = this.parseInputDate(raw);
    if (!parsed) return;

    this._modelValue = parsed;
    this._displayText = this.formatDate(parsed);
  }

  private handleInput(raw: string): void {
    this._displayText = raw;

    const parsed = this.parseInputDate(raw);
    this._modelValue = parsed;

    if (parsed) this.updateView(parsed);

    this.onChange(parsed);
    this.onChanged.emit(parsed);

    if (this.isOpen) this.scheduleReposition();
    this.cdr.markForCheck();
  }

  private handleBlur(): void {
    this.onTouched();
  }

  toggleOpen(): void {
    if (this.disabled) return;

    if (!this.isOpen) {
      this.syncFromInnerInputSafely();
      this.initViewFromModel();
      this.openPanel();
    } else {
      this.closePanel();
    }

    this.cdr.markForCheck();
  }

  private openPanel(): void {
    if (this.isOpen) return;
    this.isOpen = true;

    this.cdr.detectChanges();

    if (this.portalToBody) this.ensurePanelPortaled();

    const panel = this.getPanelEl();
    if (panel) {
      panel.style.visibility = 'hidden';
      panel.style.pointerEvents = 'none';
    }

    this.ensureGlobalListeners();

    this.zone.runOutsideAngular(() => {
      if (this.repositionRaf) cancelAnimationFrame(this.repositionRaf);
      this.repositionRaf = requestAnimationFrame(() => {
        this.repositionRaf = 0;

        this.repositionPanelNow();

        const p = this.getPanelEl();
        if (p) {
          p.style.visibility = 'visible';
          p.style.pointerEvents = '';
        }
      });
    });
  }

  private closePanel(skipMark = false): void {
    if (!this.isOpen && !this.panelPortaled) return;

    this.isOpen = false;

    this.removeGlobalListeners();
    this.restorePanelIfNeeded();

    const panel = this.getPanelEl();
    if (panel) {
      panel.style.position = '';
      panel.style.zIndex = '';
      panel.style.left = '';
      panel.style.top = '';
      panel.style.width = '';
      panel.style.maxHeight = '';
      panel.style.overflowY = '';
      panel.style.boxSizing = '';
      panel.style.visibility = '';
      panel.style.pointerEvents = '';
    }

    if (!skipMark) this.cdr.markForCheck();
  }

  private ensurePanelPortaled(): void {
    const panel = this.getPanelEl();
    if (!panel) return;

    if (panel.parentNode === document.body) {
      this.panelPortaled = true;
      return;
    }

    this.originalParent = panel.parentNode;
    this.originalNextSibling = panel.nextSibling;

    panel.classList.add('i-datepicker-panel--portaled');
    document.body.appendChild(panel);
    this.panelPortaled = true;
  }

  private restorePanelIfNeeded(): void {
    if (!this.panelPortaled) return;

    const panel = this.getPanelEl();
    if (!panel) {
      this.panelPortaled = false;
      return;
    }

    if (panel.parentNode !== document.body) {
      this.panelPortaled = false;
      return;
    }

    const home = this.portalHomeRef?.nativeElement;
    if (home?.parentNode) {
      panel.classList.remove('i-datepicker-panel--portaled');
      this.renderer.insertBefore(home.parentNode, panel, home.nextSibling);
    } else if (this.originalParent) {
      panel.classList.remove('i-datepicker-panel--portaled');
      try {
        if (this.originalNextSibling) {
          (this.originalParent as any).insertBefore(panel, this.originalNextSibling);
        } else {
          (this.originalParent as any).appendChild(panel);
        }
      } catch {
        // ignore
      }
    }

    this.panelPortaled = false;
    this.originalParent = null;
    this.originalNextSibling = null;
  }

  private scheduleReposition(): void {
    if (!this.isOpen) return;
    if (this.repositionRaf) cancelAnimationFrame(this.repositionRaf);

    this.zone.runOutsideAngular(() => {
      this.repositionRaf = requestAnimationFrame(() => {
        this.repositionRaf = 0;
        this.repositionPanelNow();
      });
    });
  }

  private repositionPanelNow(): void {
    if (!this.isOpen) return;

    const panel = this.getPanelEl();
    const rect = this.getAnchorRect();
    if (!panel || !rect) return;

    panel.style.position = 'fixed';
    panel.style.zIndex = '2000';
    panel.style.boxSizing = 'border-box';
    panel.style.overflowY = 'auto';

    if (this.matchTriggerWidth) {
      panel.style.width = `${Math.round(rect.width)}px`;
    } else {
      panel.style.width = '';
    }

    const panelRect = panel.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const gap = 8;

    const pos = (this.panelPosition || 'bottom left').trim().toLowerCase();

    const wantTop = pos.startsWith('top');
    const wantBottom =
      pos.startsWith('bottom') ||
      (!pos.startsWith('top') && !pos.startsWith('left') && !pos.startsWith('right'));

    const wantLeft = pos.includes('left') || pos === 'left';
    const wantRight = pos.includes('right') || pos === 'right';
    const alignRight = wantRight && !wantLeft;

    let left = alignRight ? rect.right - panelRect.width : rect.left;
    const maxLeft = Math.max(gap, vw - panelRect.width - gap);
    left = Math.min(Math.max(gap, left), maxLeft);

    if (pos === 'left') {
      left = rect.left - panelRect.width - this.panelOffset;
      left = Math.min(Math.max(gap, left), maxLeft);

      const top = Math.min(Math.max(gap, rect.top), Math.max(gap, vh - panelRect.height - gap));
      panel.style.left = `${Math.round(left)}px`;
      panel.style.top = `${Math.round(top)}px`;

      const maxH = Math.max(120, vh - top - gap);
      panel.style.maxHeight = `${Math.floor(maxH)}px`;
      return;
    }

    if (pos === 'right') {
      left = rect.right + this.panelOffset;
      left = Math.min(Math.max(gap, left), maxLeft);

      const top = Math.min(Math.max(gap, rect.top), Math.max(gap, vh - panelRect.height - gap));
      panel.style.left = `${Math.round(left)}px`;
      panel.style.top = `${Math.round(top)}px`;

      const maxH = Math.max(120, vh - top - gap);
      panel.style.maxHeight = `${Math.floor(maxH)}px`;
      return;
    }

    const spaceBelow = vh - rect.bottom - this.panelOffset - gap;
    const spaceAbove = rect.top - this.panelOffset - gap;

    let side: 'top' | 'bottom' = wantTop && !wantBottom ? 'top' : 'bottom';

    if (side === 'bottom' && panelRect.height > spaceBelow && spaceAbove > spaceBelow) {
      side = 'top';
    } else if (side === 'top' && panelRect.height > spaceAbove && spaceBelow > spaceAbove) {
      side = 'bottom';
    }

    const maxH = Math.max(120, side === 'bottom' ? spaceBelow : spaceAbove);
    panel.style.maxHeight = `${Math.floor(maxH)}px`;

    const top =
      side === 'bottom'
        ? rect.bottom + this.panelOffset
        : rect.top - panelRect.height - this.panelOffset;

    panel.style.left = `${Math.round(left)}px`;
    panel.style.top = `${Math.round(top)}px`;
  }

  private ensureGlobalListeners(): void {
    if (this.listeningGlobal) return;

    this.zone.runOutsideAngular(() => {
      const onAnyScroll = (): void => this.scheduleReposition();
      const onResize = (): void => this.scheduleReposition();

      window.addEventListener('scroll', onAnyScroll, true);
      document.addEventListener('scroll', onAnyScroll, true);
      window.addEventListener('resize', onResize, true);

      (this as any)._removeGlobal = (): void => {
        window.removeEventListener('scroll', onAnyScroll, true);
        document.removeEventListener('scroll', onAnyScroll, true);
        window.removeEventListener('resize', onResize, true);
      };

      this.listeningGlobal = true;
    });
  }

  private removeGlobalListeners(): void {
    if (!this.listeningGlobal) return;

    const rm = (this as any)._removeGlobal as undefined | (() => void);
    if (rm) rm();

    delete (this as any)._removeGlobal;
    this.listeningGlobal = false;

    if (this.repositionRaf) {
      cancelAnimationFrame(this.repositionRaf);
      this.repositionRaf = 0;
    }
  }

  prevMonth(): void {
    let nextYear = this.viewYear;
    let nextMonth = this.viewMonth;

    if (nextMonth === 0) {
      nextMonth = 11;
      nextYear -= 1;
    } else {
      nextMonth -= 1;
    }

    const clampedYear = this.clampYear(nextYear);
    if (clampedYear !== nextYear) return;

    this.viewYear = nextYear;
    this.viewMonth = nextMonth;
    this.ensureYearRange(this.viewYear);
    this.buildCalendar();
    if (this.isOpen) this.scheduleReposition();
    this.cdr.markForCheck();
  }

  nextMonth(): void {
    let nextYear = this.viewYear;
    let nextMonth = this.viewMonth;

    if (nextMonth === 11) {
      nextMonth = 0;
      nextYear += 1;
    } else {
      nextMonth += 1;
    }

    const clampedYear = this.clampYear(nextYear);
    if (clampedYear !== nextYear) return;

    this.viewYear = nextYear;
    this.viewMonth = nextMonth;
    this.ensureYearRange(this.viewYear);
    this.buildCalendar();
    if (this.isOpen) this.scheduleReposition();
    this.cdr.markForCheck();
  }

  onMonthChange(change: ISelectChange<any>): void {
    const row = change?.value;
    if (!row) return;

    const month = typeof row === 'object' && 'value' in row ? (row as IMonthOption).value : row;
    if (typeof month !== 'number' || month < 0 || month > 11) return;

    this.viewMonth = month;
    this.buildCalendar();
    if (this.isOpen) this.scheduleReposition();
    this.cdr.markForCheck();
  }

  onYearChange(change: ISelectChange<number>): void {
    const year = change.value;
    if (typeof year !== 'number') return;

    this.viewYear = this.clampYear(year);
    this.ensureYearRange(this.viewYear);
    this.buildCalendar();
    if (this.isOpen) this.scheduleReposition();
    this.cdr.markForCheck();
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
    this.closePanel();
    this.cdr.markForCheck();
  }

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
    this.viewYear = this.clampYear(date.getFullYear());
    this.viewMonth = date.getMonth();
    this.ensureYearRange(this.viewYear);
    this.buildCalendar();
  }

  private ensureYearRange(focusYear: number): void {
    const { min, max } = this.getNormalizedYearBounds();
    const safeFocusYear = this.clampYear(focusYear);

    const start = min ?? safeFocusYear - 50;
    const end = max ?? safeFocusYear + 10;

    if (
      this._years.length &&
      safeFocusYear >= this._years[0] &&
      safeFocusYear <= this._years[this._years.length - 1] &&
      this._years[0] === start &&
      this._years[this._years.length - 1] === end
    ) {
      return;
    }

    const arr: number[] = [];
    for (let y = start; y <= end; y++) arr.push(y);
    this._years = arr;
  }

  private coerceYear(value: number | string | null | undefined): number | null {
    if (value === null || value === undefined || value === '') return null;

    const year = Number(value);
    if (!Number.isFinite(year)) return null;

    return Math.trunc(year);
  }

  private getNormalizedYearBounds(): { min: number | null; max: number | null } {
    const currentYear = new Date().getFullYear();

    const min =
      this._minYear !== null
        ? this._minYear
        : this._minYearRange !== null
          ? currentYear + this._minYearRange
          : null;

    const max =
      this._maxYear !== null
        ? this._maxYear
        : this._maxYearRange !== null
          ? currentYear + this._maxYearRange
          : null;

    if (min !== null && max !== null && min > max) {
      return { min: max, max: min };
    }

    return { min, max };
  }

  private clampYear(year: number): number {
    const { min, max } = this.getNormalizedYearBounds();

    if (min !== null && year < min) return min;
    if (max !== null && year > max) return max;

    return year;
  }

  private refreshYearRange(): void {
    if (!this.viewYear) return;

    this.viewYear = this.clampYear(this.viewYear);
    this._years = [];
    this.ensureYearRange(this.viewYear);
    this.buildCalendar();
    this.cdr.markForCheck();
  }

  private buildCalendar(): void {
    const year = this.viewYear;
    const month = this.viewMonth;

    const firstOfMonth = new Date(year, month, 1);
    const startDay = (firstOfMonth.getDay() + 6) % 7;
    const startDate = new Date(year, month, 1 - startDay);

    const weeks: IDatepickerDay[][] = [];
    const current = new Date(startDate);

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

      if (t === 'yyyy') year = n;
      else if (t === 'MM') month = n;
      else if (t === 'dd') day = n;
    });

    if (!year || !month || !day) return null;

    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
      return null;
    }

    return this.startOfDay(date);
  }

  private formatDate(date: Date): string {
    const fmt = this.format || 'yyyy-MM-dd';
    return formatDate(date, fmt, 'en');
  }

  @HostListener('input', ['$event'])
  onHostInput(event: Event): void {
    const target = event.target as HTMLElement | null;
    const dateInput = this.getInnerInput();
    if (!dateInput) return;

    if (target !== dateInput) return;

    this.handleInput(dateInput.value);
  }

  @HostListener('focusout')
  onHostFocusOut(): void {
    this.handleBlur();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isOpen) return;

    const target = event.target as HTMLElement | null;
    if (!target) return;

    const host = this.hostEl.nativeElement;
    const panel = this.getPanelEl();

    const insideHost = host.contains(target);
    const insidePanel = !!panel && panel.contains(target);

    if (insideHost || insidePanel) return;

    const active = document.activeElement as HTMLElement | null;
    const activeInsidePanel = !!panel && !!active && panel.contains(active);

    const clickedInAnySelectOptions =
      !!target.closest('i-options') || !!target.closest('.i-options');

    if (activeInsidePanel && clickedInAnySelectOptions) return;

    this.closePanel();
    this.cdr.markForCheck();
  }
}

/**
 * IFCDatepicker
 * Version: 1.5.4 (smart wrapper)
 */

@Component({
  selector: 'i-fc-datepicker',
  standalone: true,
  imports: [IDatepicker],
  template: `@if (label) {
      <label class="i-fc-datepicker__label" (click)="focusInnerDatepicker()">
        {{ label }} :
        @if (required) {
          <span class="i-fc-datepicker__required">*</span>
        }
      </label>
    }

    <i-datepicker
      #inner
      [disabled]="isDisabled"
      [format]="format"
      [invalid]="controlInvalid"
      [maxYear]="maxYear"
      [maxYearRange]="maxYearRange"
      [minYear]="minYear"
      [minYearRange]="minYearRange"
      [panelPosition]="panelPosition"
      [placeholder]="placeholder"
      [value]="forwardedValue"
      (focusout)="onInnerFocusOut()"
      (onChanged)="handleDateChange($event)"
    />

    @if (controlInvalid && resolvedErrorText) {
      <div class="i-fc-datepicker__error">
        {{ resolvedErrorText }}
      </div>
    }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IFCDatepicker implements ControlValueAccessor, AfterViewInit, OnDestroy {
  @ViewChild('inner', { static: true }) innerDatepicker!: IDatepicker;

  @Input() label = '';
  @Input() placeholder = '';
  @Input() format = 'dd/MM/yyyy';
  @Input() panelPosition: IDatepickerPanelPosition = 'bottom left';
  @Input() minYear: number | string | null = null;
  @Input() maxYear: number | string | null = null;
  @Input() minYearRange: number | string | null = null;
  @Input() maxYearRange: number | string | null = null;
  @Input() errorMessage?: IFormControlErrorMessage;

  @Input()
  get value(): Date | null {
    return this._value;
  }
  set value(v: Date | null) {
    this.applyExternalValue(v ?? null);
  }

  private _value: Date | null = null;

  forwardedValue: Date | null = null;

  isDisabled = false;

  private onChange: (v: Date | null) => void = noop;
  private onTouched: () => void = noop;

  readonly ngControl = inject(NgControl, { optional: true });
  private readonly formDir = inject(FormGroupDirective, { optional: true });
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly hostEl = inject(ElementRef<HTMLElement>);

  private submitSub?: any;
  private lastEmittedKey: string | null = null;
  private pendingExternal: Date | null | undefined = undefined;

  constructor() {
    if (this.ngControl) this.ngControl.valueAccessor = this;

    if (this.formDir) {
      this.submitSub = this.formDir.ngSubmit.subscribe(() => {
        this.cdr.markForCheck();
      });
    }
  }

  ngAfterViewInit(): void {
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.submitSub?.unsubscribe?.();
  }

  writeValue(v: any): void {
    let next: Date | null = null;

    if (v instanceof Date) next = v;
    else if (typeof v === 'string' && v.trim()) {
      const parsed = new Date(v);
      next = isNaN(parsed.getTime()) ? null : parsed;
    } else next = null;

    this.applyExternalValue(next);
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

  handleDateChange(date: Date | null): void {
    this._value = date ?? null;
    this.lastEmittedKey = this.dateKey(this._value);

    this.onChange(this._value);
    this.onTouched();
  }

  private applyExternalValue(next: Date | null): void {
    const nextKey = this.dateKey(next);

    if (this.isInnerInputFocused()) {
      if (nextKey === this.lastEmittedKey) {
        this._value = next ?? null;
        return;
      }

      this.pendingExternal = next ?? null;
      this._value = next ?? null;
      return;
    }

    this.pendingExternal = undefined;
    this._value = next ?? null;
    this.forwardedValue = next ?? null;

    this.cdr.markForCheck();
  }

  private tryFlushPendingExternal(): void {
    if (this.pendingExternal === undefined) return;

    const v = this.pendingExternal ?? null;
    this.pendingExternal = undefined;
    this.forwardedValue = v;

    this.cdr.markForCheck();
  }

  @Input()
  set _smartFocusHook(_: any) {
    // no-op
  }

  private isInnerInputFocused(): boolean {
    const input = this.hostEl.nativeElement.querySelector(
      'i-datepicker i-input input',
    ) as HTMLInputElement | null;

    const active = document.activeElement as HTMLElement | null;
    if (!input || !active) return false;

    return active === input;
  }

  private dateKey(d: Date | null): string | null {
    if (!d) return null;
    if (!(d instanceof Date)) return null;
    const t = d.getTime();
    if (Number.isNaN(t)) return null;

    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    const day = d.getDate();

    const mm = m < 10 ? `0${m}` : `${m}`;
    const dd = day < 10 ? `0${day}` : `${day}`;
    return `${y}-${mm}-${dd}`;
  }

  focusInnerDatepicker(): void {
    if (this.isDisabled) return;

    const input = this.hostEl.nativeElement.querySelector(
      'i-datepicker i-input input',
    ) as HTMLInputElement | null;

    input?.focus();
  }

  onInnerFocusOut(): void {
    queueMicrotask(() => {
      if (!this.isInnerInputFocused()) this.tryFlushPendingExternal();
    });
  }

  get controlInvalid(): boolean {
    const c = this.ngControl?.control;
    if (!c) return false;

    // Show error when: submitted, OR user has interacted (touched/dirty).
    // Previously only checked submitted when formDir is present, so
    // markAllAsTouched() had no effect on error visibility.
    if (this.formDir) {
      return c.invalid && (this.formDir.submitted || c.touched || c.dirty);
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
