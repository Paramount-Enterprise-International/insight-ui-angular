/**
 * ISelect
 * Version: 2.1.0
 */

import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Self,
  TemplateRef,
  ViewChild,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IHighlightSearchPipe } from './../highlight-search.pipe';
import { IIcon } from '../icon/icon';
import { IInput } from '../input/input';
import { IInputAddonButton, IInputAddonLoading } from '../input/input-addon';
import {
  IFormControlErrorMessage,
  isControlRequired,
  resolveControlErrorMessage,
} from '../interfaces';

export interface ISelectOptionContext<T> {
  $implicit: T;
  row: T;
}

@Directive({
  selector: '[iSelectOption]',
  standalone: true,
})
export class ISelectOptionDefDirective<T = any> {
  constructor(public template: TemplateRef<ISelectOptionContext<T>>) {}

  @Input('iSelectOption') set iSelectOption(_value: any) {
    // not used, needed for structural directive syntax
  }
}

export interface ISelectChange<T = any> {
  value: T | null;
  label: string;
}

/** Position of popup options relative to the input */
export type ISelectPanelPosition =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right';

@Component({
  selector: 'i-select',
  standalone: true,
  imports: [IIcon, NgTemplateOutlet, IHighlightSearchPipe, IInput, NgClass],
  templateUrl: './select.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ISelect),
      multi: true,
    },
  ],
})
export class ISelect<T = any> implements ControlValueAccessor, OnInit, AfterContentInit, OnDestroy {
  // ---------- Inputs ----------
  @Input() placeholder: string = '';
  @Input() disabled = false;
  @Input() invalid = false;

  /** debounce delay (ms) for filter when typing */
  @Input() filterDelay = 200;

  /**
   * Dropdown / popup position relative to the input.
   *
   * Single:
   *  - 'bottom'
   *  - 'top'
   *  - 'left'
   *  - 'right'
   *
   * Compound:
   *  - 'top left'
   *  - 'top right'
   *  - 'bottom left' (default)
   *  - 'bottom right'
   */
  @Input() panelPosition: ISelectPanelPosition = 'bottom left';

  /** Array options */
  @Input()
  set options(value: T[] | null) {
    this._rawOptions = value ?? [];
    this.applyFilter(this.isOpen);
    this.syncModelToView();
  }

  /** Observable options */
  @Input()
  set options$(value: Observable<T[]> | null) {
    this.cleanupOptionsSub();

    if (value) {
      this.isLoading = true;
      this.cdr.markForCheck();

      this.optionsSub = value.subscribe({
        next: (rows) => {
          this.zone.run(() => {
            this._rawOptions = rows ?? [];
            this.applyFilter(this.isOpen);
            this.syncModelToView();
            this.isLoading = false;
            this.cdr.markForCheck();
          });
        },
        error: () => {
          this.zone.run(() => {
            this.isLoading = false;
            this.cdr.markForCheck();
          });
        },
      });
    }
  }

  private _displayWith: ((row: T | null) => string) | string = (row) =>
    row == null ? '' : String(row as any);
  private _displayWithExplicit = false;

  @Input()
  set displayWith(value: ((row: T | null) => string) | string | undefined) {
    if (value === undefined || value === null) {
      // treat as: "no explicit displayWith"
      this._displayWithExplicit = false;
      // keep or reset to default
      this._displayWith = (row) => (row == null ? '' : String(row as any));
    } else {
      this._displayWith = value;
      this._displayWithExplicit = true;
    }
  }
  get displayWith(): ((row: T | null) => string) | string {
    return this._displayWith;
  }

  @Input() filterPredicate: (row: T, term: string) => boolean = (row, term) => {
    const haystack = JSON.stringify(row).toLowerCase();
    return haystack.includes(term);
  };

  @Input('value')
  set valueInput(val: T | null) {
    this.writeValue(val);
  }

  // ---------- Outputs ----------
  @Output() onChanged = new EventEmitter<ISelectChange<T>>();
  @Output() onOptionSelected = new EventEmitter<ISelectChange<T>>();

  // ---------- Template refs ----------
  @ContentChild(ISelectOptionDefDirective)
  optionDef?: ISelectOptionDefDirective<T>;

  // ---------- Internal state ----------
  private _rawOptions: T[] = [];
  filteredOptions: T[] = [];

  private _modelValue: T | null = null;
  private pendingModelValue: T | null = null;

  private _displayText = '';
  get displayText(): string {
    return this._displayText;
  }

  private _filterText = '';
  get filterText(): string {
    return this._filterText;
  }

  isOpen = false;
  highlightIndex = -1;

  isLoading = false;

  private optionsSub?: Subscription;

  private filterInput$ = new Subject<string>();
  private filterInputSub?: Subscription;

  // ---------- CVA ----------
  onChange = (_: any) => {};
  onTouched = () => {};

  /** Panel position class for CSS modifier */
  get panelPositionClass(): string {
    const value = (this.panelPosition || 'bottom left').trim();
    const normalized = value.replace(/\s+/g, '-'); // "top left" -> "top-left"
    return `i-options--${normalized}`;
  }

  constructor(
    private hostEl: ElementRef<HTMLElement>,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  // ---------- Lifecycle ----------
  ngOnInit(): void {
    this.filterInputSub = this.filterInput$
      .pipe(debounceTime(this.filterDelay))
      .subscribe((val) => {
        this.zone.run(() => {
          this.handleInputText(val);
          this.isLoading = false;
          this.cdr.markForCheck();
        });
      });
  }

  ngAfterContentInit(): void {
    this.syncModelToView();
  }

  ngOnDestroy(): void {
    this.cleanupOptionsSub();
    this.filterInputSub?.unsubscribe();
  }

  private cleanupOptionsSub() {
    if (this.optionsSub) {
      this.optionsSub.unsubscribe();
      this.optionsSub = undefined;
    }
  }

  // ---------- Model ↔ UI sync ----------
  writeValue(value: T | null): void {
    this._modelValue = value;
    if (!this._rawOptions.length) {
      this.pendingModelValue = value;
      this._displayText = this.resolveDisplayText(value);
      return;
    }
    this.syncModelToView();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private syncModelToView(): void {
    const options = this._rawOptions;

    if (!options.length) {
      this._displayText = this.resolveDisplayText(this._modelValue);
      return;
    }

    let valueToUse =
      this._modelValue !== null && this._modelValue !== undefined
        ? this._modelValue
        : this.pendingModelValue;

    if (valueToUse === null || valueToUse === undefined) {
      this._displayText = '';
      this.pendingModelValue = null;
    } else {
      const found = options.find((row) => row === valueToUse) ?? null;
      const row = found ?? valueToUse;
      this._modelValue = found ?? valueToUse;
      this._displayText = this.resolveDisplayText(row);
      this.pendingModelValue = null;
    }

    if (!this.isOpen) {
      this._filterText = '';
      this.highlightIndex = -1;
      return;
    }

    this.applyFilter(true);
  }

  private applyFilter(force: boolean = false): void {
    if (!this.isOpen && !force) {
      return;
    }

    const term = (this._filterText || '').toLowerCase();
    if (!term) {
      this.filteredOptions = [...this._rawOptions];
    } else {
      this.filteredOptions = this._rawOptions.filter((row) => this.filterPredicate(row, term));
    }

    if (this.highlightIndex >= this.filteredOptions.length || this.filteredOptions.length === 0) {
      this.highlightIndex = -1;
    }
  }

  get hasOptions(): boolean {
    return this.filteredOptions.length > 0;
  }

  get hasSelection(): boolean {
    return this._modelValue != null;
  }

  /** true when user filtered and no options match */
  get hasNoResults(): boolean {
    return this.isOpen && !!this._filterText && this.filteredOptions.length === 0;
  }

  /**
   * Resolve the label text for a given row or value.
   *
   * Priority:
   * 1) If user provided displayWith (function or string), use it.
   * 2) Else, if row is object → use 2nd property as label (or 1st if only one).
   * 3) Else, if row is primitive and options[] contains objects:
   *      - match options[*].<firstProp> === row
   *      - use matched option's 2nd prop as label (or 1st if only one)
   * 4) Else, fallback to default function String(row).
   */
  resolveDisplayText(row: T | null): string {
    if (row == null) return '';

    const dw = this.displayWith;

    // CASE 1: user-provided function (explicit)
    if (typeof dw === 'function' && this._displayWithExplicit) {
      return dw(row);
    }

    // CASE 2: user-provided string key (supports nested "a.b.c")
    if (typeof dw === 'string') {
      const path = dw.split('.');
      let value: any = row;

      for (const segment of path) {
        if (value == null) return '';
        value = value[segment];
      }

      return value != null ? String(value) : '';
    }

    // CASE 3A: AUTO-MAPPING when row itself is an object
    if (!this._displayWithExplicit && row !== null && typeof row === 'object') {
      const entries = Object.entries(row as any);
      if (!entries.length) return '';

      // Prefer 2nd property as label, fallback to 1st
      const labelEntry = entries[1] ?? entries[0];
      const labelValue = labelEntry[1];

      return labelValue != null ? String(labelValue) : '';
    }

    // CASE 3B: AUTO-MAPPING when row is a primitive "value" (e.g. ID)
    // We try to find a matching option object in _rawOptions, where:
    //   option[firstProp] === row
    if (!this._displayWithExplicit && (row === null || typeof row !== 'object')) {
      const primitive = row as any;

      const match = this._rawOptions.find((opt: any) => {
        if (opt == null || typeof opt !== 'object') return false;
        const entries = Object.entries(opt);
        if (!entries.length) return false;

        const valueEntry = entries[0]; // first property = "value"
        return valueEntry[1] === primitive;
      });

      if (match) {
        const entries = Object.entries(match as any);
        if (!entries.length) return String(primitive);

        // label = 2nd property if exists, else 1st
        const labelEntry = entries[1] ?? entries[0];
        const labelValue = labelEntry[1];

        return labelValue != null ? String(labelValue) : String(primitive);
      }
    }

    // CASE 4: fallback to default function String(row)
    if (typeof dw === 'function') {
      return dw(row);
    }

    return '';
  }

  // ---------- Input + dropdown behavior ----------
  private handleInputText(val: string): void {
    this._displayText = val;
    this._filterText = val;

    if (!this.isOpen) {
      this.openDropdown();
    } else {
      this.applyFilter(true);
    }
  }

  handleBlur(): void {
    this.onTouched();
  }

  private moveHighlight(delta: number): void {
    const len = this.filteredOptions.length;
    if (!len) {
      this.highlightIndex = -1;
      return;
    }

    let index = this.highlightIndex;
    if (index === -1) {
      index = 0;
    } else {
      index = (index + delta + len) % len;
    }

    this.setActiveIndex(index);
    this.scrollHighlightedIntoView();
  }

  /** behavior:
   *  - if closed → open
   *  - if open and hasNoResults → clear filter & show all (keep open)
   *  - if open and NOT hasNoResults → close & restore model text
   */
  toggleDropdown(event?: MouseEvent): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (this.disabled) return;

    if (!this.isOpen) {
      // closed → open
      this.openDropdown();
    } else if (this.hasNoResults) {
      // open + no results → clear filter & show all, keep open
      this._displayText = '';
      this._filterText = '';
      this.applyFilter(true);
      // keep dropdown open
    } else {
      // open + has results → close and restore selected text
      this.syncModelToView();
      this.closeDropdown();
    }

    this.focus();
  }

  private openDropdown(): void {
    if (this.disabled) return;
    if (this.isOpen) return;

    this.isOpen = true;

    this.applyFilter(true);

    const len = this.filteredOptions.length;
    if (len === 0) {
      this.highlightIndex = -1;
      return;
    }

    const current = this._modelValue;
    if (current != null) {
      const idx = this.filteredOptions.indexOf(current as T);
      if (idx >= 0) {
        this.highlightIndex = idx;
        this.scrollHighlightedIntoView();
        return;
      }
    }

    this.highlightIndex = 0;
    this.scrollHighlightedIntoView();
  }

  private closeDropdown(): void {
    this.isOpen = false;
    this.highlightIndex = -1;
  }

  selectRow(row: T): void {
    this._modelValue = row;
    this._displayText = this.resolveDisplayText(row);
    this._filterText = '';
    this.applyFilter(true);

    this.onChange(row);
    this.onTouched();

    const payload: ISelectChange<T> = {
      value: row,
      label: this._displayText,
    };
    this.onChanged.emit(payload);
    this.onOptionSelected.emit(payload);

    this.closeDropdown();
  }

  clearSelection(event?: MouseEvent): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this._modelValue = null;
    this._displayText = '';
    this._filterText = '';
    this.applyFilter(true);

    this.onChange(null);
    this.onTouched();

    const payload: ISelectChange<T> = {
      value: null,
      label: '',
    };
    this.onChanged.emit(payload);
    this.onOptionSelected.emit(payload);
  }

  isRowSelected(row: T): boolean {
    return this._modelValue === row;
  }

  private scrollHighlightedIntoView(): void {
    // Defer until after Angular has rendered the options
    setTimeout(() => {
      if (!this.isOpen) return;

      const list = this.hostEl.nativeElement.querySelector('.i-options');
      if (!list) return;

      const items = list.querySelectorAll('.i-option');
      const el = items[this.highlightIndex] as HTMLElement | undefined;

      if (el) {
        el.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  focus(): void {
    if (this.disabled) return;
    const input = this.hostEl.nativeElement.querySelector(
      'i-input input'
    ) as HTMLInputElement | null;
    input?.focus();
  }

  // ---------- Keyboard + input events ----------
  @HostListener('keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    const options = this.filteredOptions;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen) {
          this.openDropdown();
        } else if (options.length) {
          this.moveHighlight(1);
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (!this.isOpen) {
          this.openDropdown();
        } else if (options.length) {
          this.moveHighlight(-1);
        }
        break;

      case 'Enter':
        event.preventDefault();
        if (!this.isOpen) {
          this.openDropdown();
        } else if (this.highlightIndex >= 0 && this.highlightIndex < options.length) {
          const row = options[this.highlightIndex];
          this.selectRow(row);
        }
        break;

      case 'Escape':
        if (this.isOpen) {
          event.preventDefault();
          this.closeDropdown();
        }
        break;
    }
  }

  @HostListener('input', ['$event'])
  onHostInput(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    if (!target) return;

    this.isLoading = true;
    this.filterInput$.next(target.value);
  }

  @HostListener('focusout', ['$event'])
  onHostFocusOut(_event: FocusEvent): void {
    this.onTouched();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isOpen) return;
    const target = event.target as Node | null;
    if (target && !this.hostEl.nativeElement.contains(target)) {
      this.closeDropdown();
    }
  }

  // ---------- Utilities ----------
  get appendAddon(): IInputAddonButton | IInputAddonLoading {
    if (this.isLoading) {
      return {
        type: 'loading',
        visible: true,
      };
    }

    return {
      type: 'button',
      icon: this.isOpen ? 'angle-up' : 'angle-down',
      onClick: () => this.toggleDropdown(),
      variant: 'primary',
      visible: true,
    };
  }

  get hasOptionsList(): boolean {
    return this.isOpen && this.hasOptions;
  }

  setActiveIndex(idx: number): void {
    if (idx < 0 || idx >= this.filteredOptions.length) {
      this.highlightIndex = -1;
    } else {
      this.highlightIndex = idx;
    }
  }
}

/**
 * IFcSelect
 * Version: 1.1.0
 *
 * - Form control wrapper for ISelect
 * - Provides label, required asterisk, error message
 * - Implements CVA so you can use formControlName on <i-fc-select>
 */

@Component({
  selector: 'i-fc-select',
  standalone: true,
  imports: [ISelect],
  template: `@if (label) {
    <label class="i-fc-select__label" (click)="focusInnerSelect()">
      {{ label }} : @if (required) {
      <span class="i-fc-select__required">*</span>
      }
    </label>
    }

    <i-select
      [placeholder]="placeholder"
      [disabled]="isDisabled"
      [invalid]="controlInvalid"
      [options]="options"
      [options$]="options$"
      [displayWith]="displayWith"
      [filterDelay]="filterDelay"
      [filterPredicate]="filterPredicate"
      [panelPosition]="panelPosition"
      [value]="value"
      (onChanged)="handleSelectChange($event)"
    >
      <ng-content></ng-content>
    </i-select>

    @if (controlInvalid && resolvedErrorText) {
    <div class="i-fc-select__error">
      {{ resolvedErrorText }}
    </div>
    }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IFCSelect),
      multi: true,
    },
  ],
})
export class IFCSelect<T = any> implements ControlValueAccessor {
  @ViewChild(ISelect) innerSelect!: ISelect<T>;

  @Input() label: string = '';
  @Input() placeholder: string = '';

  @Input() options: T[] | null = null;
  @Input() options$: Observable<T[]> | null = null;

  // 👇 no default, undefined means “not explicit”
  @Input() displayWith?: ((row: T | null) => string) | string;

  @Input() filterDelay = 200;
  @Input() filterPredicate: (row: T, term: string) => boolean = (row, term) => {
    const haystack = JSON.stringify(row).toLowerCase();
    return haystack.includes(term);
  };

  /** Passed through to ISelect's [panelPosition] input */
  @Input() panelPosition: ISelectPanelPosition = 'bottom left';

  @Input() errorMessage?: IFormControlErrorMessage;

  @Input()
  get value(): T | null {
    return this._value;
  }
  set value(v: T | null) {
    this._value = v ?? null;
  }

  private _value: T | null = null;
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

    if (this.formDir) {
      this.formDir.ngSubmit.subscribe(() => {
        this.cdr.markForCheck();
      });
    }
  }

  writeValue(v: any): void {
    this._value = v ?? null;
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

  handleSelectChange(change: ISelectChange<T>): void {
    this._value = change.value ?? null;
    this.onChange(this._value);
    this.onTouched();
  }

  focusInnerSelect(): void {
    if (!this.isDisabled && this.innerSelect) {
      this.innerSelect.focus();
    }
  }

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
