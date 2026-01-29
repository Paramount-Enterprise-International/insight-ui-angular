/**
 * IDatepicker
 * Version: 1.5.3
 *
 * Fixes:
 * - ✅ IMPORTANT: prevent value from being wiped due to bubbled "input" events
 *   from inner month/year i-select inputs.
 *   -> Only handle input when event.target is the date input itself.
 * - Keep portal + positioning + flicker guard for portaled i-options.
 * - IFCDatepicker included in same file
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
import { IInput } from '../input/input';
import { IInputAddonButton } from '../input/input-addon';
import { IInputMaskDirective } from '../input/input-mask';
import { ISelect, ISelectChange } from '../select/select';
import {
  IFormControlErrorMessage,
  isControlRequired,
  resolveControlErrorMessage,
} from '../interfaces';

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
    // Default visual: today (only if consumer doesn't provide value)
    if (!this._modelValue && !this._displayText) {
      const today = this.startOfDay(new Date());
      this._modelValue = today;
      this._displayText = this.formatDate(today);
      this.updateView(today);
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

    // If parent writes null, keep display empty (don’t re-default)
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
    if (!raw) return; // ✅ never wipe current display/model

    const parsed = this.parseInputDate(raw);
    if (!parsed) return; // ✅ partial/invalid typing shouldn't wipe display/model

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
    if (this.viewMonth === 0) {
      this.viewMonth = 11;
      this.viewYear -= 1;
    } else {
      this.viewMonth -= 1;
    }
    this.ensureYearRange(this.viewYear);
    this.buildCalendar();
    if (this.isOpen) this.scheduleReposition();
    this.cdr.markForCheck();
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

    this.viewYear = year;
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
      for (let y = start; y <= end; y++) arr.push(y);
      this._years = arr;
    }
  }

  private buildCalendar(): void {
    const year = this.viewYear;
    const month = this.viewMonth;

    const firstOfMonth = new Date(year, month, 1);
    const startDay = (firstOfMonth.getDay() + 6) % 7; // Monday=0
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

  // =========================================================
  // Host listeners
  // =========================================================

  /**
   * ✅ CRITICAL:
   * "input" events bubble.
   * Month/year i-select (and other inner inputs) will trigger "input" too.
   * If we react to those, we'll read the date input at the wrong moment and wipe display.
   */
  @HostListener('input', ['$event'])
  onHostInput(event: Event): void {
    const target = event.target as HTMLElement | null;
    const dateInput = this.getInnerInput();
    if (!dateInput) return;

    // only react if THIS input event is from the date input itself
    if (target !== dateInput) return;

    this.handleInput(dateInput.value);
  }

  @HostListener('focusout')
  onHostFocusOut(): void {
    this.handleBlur();
  }

  /**
   * Flicker guard (for portaled inner i-select options)
   */
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
 * Version: 1.5.3
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
      [disabled]="isDisabled"
      [format]="format"
      [invalid]="controlInvalid"
      [panelPosition]="panelPosition"
      [placeholder]="placeholder"
      [value]="value"
      (onChanged)="handleDateChange($event)"
    />

    @if (controlInvalid && resolvedErrorText) {
      <div class="i-fc-datepicker__error">
        {{ resolvedErrorText }}
      </div>
    }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IFCDatepicker implements ControlValueAccessor, OnDestroy {
  @ViewChild(IDatepicker) innerDatepicker!: IDatepicker;

  @Input() label = '';
  @Input() placeholder = '';
  @Input() format = 'dd/MM/yyyy';
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

  private onChange: (v: any) => void = noop;
  private onTouched: () => void = noop;

  readonly ngControl = inject(NgControl, { self: true, optional: true });
  private readonly formDir = inject(FormGroupDirective, { optional: true });
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly hostEl = inject(ElementRef<HTMLElement>);

  private submitSub?: any;

  constructor() {
    if (this.ngControl) this.ngControl.valueAccessor = this;

    if (this.formDir) {
      this.submitSub = this.formDir.ngSubmit.subscribe(() => {
        this.cdr.markForCheck();
      });
    }
  }

  ngOnDestroy(): void {
    this.submitSub?.unsubscribe?.();
  }

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

  handleDateChange(date: Date | null): void {
    this._value = date ?? null;
    this.onChange(this._value);
    this.onTouched();
  }

  focusInnerDatepicker(): void {
    if (this.isDisabled) return;

    const input = this.hostEl.nativeElement.querySelector(
      'i-datepicker i-input input',
    ) as HTMLInputElement | null;

    input?.focus();
  }

  get controlInvalid(): boolean {
    const c = this.ngControl?.control;
    if (!c) return false;

    if (this.formDir) return c.invalid && !!this.formDir.submitted;
    return c.invalid && (c.dirty || c.touched);
  }

  get required(): boolean {
    return isControlRequired(this.ngControl, this.errorMessage);
  }

  get resolvedErrorText(): string | null {
    return resolveControlErrorMessage(this.ngControl, this.label, this.errorMessage);
  }
}
