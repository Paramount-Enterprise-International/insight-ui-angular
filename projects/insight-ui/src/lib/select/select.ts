// select.ts (Angular)
/**
 * ISelect
 * Version: 2.2.7
 *
 * Fixes:
 * - Render options container as <i-options>
 * - Let dropdown grow from visible control width to fit option text
 * - Keep portal-to-body + fixed positioning for overflow parents
 * - Fix flicker: portal + measure + position BEFORE showing panel
 * - Fix option text being truncated too early after long-text dropdown width fix
 * - Fix dropdown not reopening after selecting an option
 * - Fix selected long value poisoning trigger measurement on next open
 * - Fix panel staying hidden when reposition callback does not reveal it
 */

import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
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
  TemplateRef,
  ViewChild,
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
import { IInput, IInputAddonButton, IInputAddonLoading } from '../input/input';
import {
  IFormControlErrorMessage,
  isControlRequired,
  resolveControlErrorMessage,
} from '../interfaces';

export type ISelectOptionContext<T> = {
  $implicit: T;
  row: T;
};

@Directive({
  selector: '[iSelectOption]',
  standalone: true,
})
export class ISelectOptionDefDirective<T = any> {
  template = inject<TemplateRef<ISelectOptionContext<T>>>(TemplateRef);

  @Input() set iSelectOption(_value: any) {
    // not used, needed for structural directive syntax
  }
}

export type ISelectChange<T = any> = {
  value: T | null;
  label: string;
};

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
  template: `
    <i-input
      [append]="appendAddon"
      [invalid]="invalid || hasNoResults"
      [placeholder]="placeholder"
      [readonly]="disabled"
      [value]="displayText"
    />

    @if (hasOptionsList) {
      <i-options #panel class="i-options scroll scroll-y" [ngClass]="panelPositionClass">
        @for (row of filteredOptions; track row; let idx = $index) {
          <div
            class="i-option"
            [class.active]="highlightIndex === idx"
            [class.selected]="isRowSelected(row)"
            (mousedown)="selectRow(row, $event)"
            (mouseenter)="setActiveIndex(idx)"
          >
            @if (optionDef?.template) {
              <div class="i-option-label">
                <ng-container
                  *ngTemplateOutlet="optionDef!.template; context: { $implicit: row, row: row }"
                />
              </div>
            } @else {
              <div
                class="i-option-label"
                [innerHTML]="resolveDisplayText(row) | highlightSearch: filterText"
              ></div>
            }

            @if (isRowSelected(row)) {
              <span class="i-option-check">
                <i-icon icon="check" />
              </span>
            }
          </div>
        }
      </i-options>
    }
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
export class ISelect<T = any>
  implements ControlValueAccessor, OnInit, AfterContentInit, AfterViewChecked, OnDestroy
{
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() filterDelay = 200;
  @Input() panelPosition: ISelectPanelPosition = 'bottom left';
  @Input() portalToBody = true;
  @Input() panelOffset = 6;
  @Input() matchTriggerWidth = false;

  @Input()
  set options(value: T[] | null) {
    this._rawOptions = value ?? [];
    this.applyFilter(this.isOpen);
    this.syncModelToView();
  }

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
    row === null ? '' : String(row as any);

  private _displayWithExplicit = false;

  @Input()
  set displayWith(value: ((row: T | null) => string) | string | undefined) {
    if (value === undefined || value === null) {
      this._displayWithExplicit = false;
      this._displayWith = (row): string => (row === null ? '' : String(row as any));
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

  @Input()
  set value(v: T | null) {
    this.writeValue(v);
  }

  get value(): T | null {
    return this._modelValue;
  }

  @Output() readonly onChanged = new EventEmitter<ISelectChange<T>>();
  @Output() readonly onOptionSelected = new EventEmitter<ISelectChange<T>>();

  @ContentChild(ISelectOptionDefDirective)
  optionDef?: ISelectOptionDefDirective<T>;

  @ViewChild('panel') panelRef?: ElementRef<HTMLElement>;

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

  onChange = (value: any): void => {
    void value;
  };

  onTouched = (): void => {
    /* noop */
  };

  get panelPositionClass(): string {
    const value = (this.panelPosition || 'bottom left').trim();
    const normalized = value.replace(/\s+/g, '-');
    return `i-options--${normalized}`;
  }

  private readonly hostEl = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly zone = inject(NgZone);

  private panelPortaled = false;
  private panelOriginalParent: Node | null = null;
  private panelOriginalNextSibling: Node | null = null;

  private repositionRaf = 0;
  private listeningGlobal = false;

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

  ngAfterViewChecked(): void {
    if (this.isOpen && this.portalToBody && this.panelRef?.nativeElement) {
      this.ensurePanelPortaled();
      this.ensureGlobalListeners();
    }
  }

  ngOnDestroy(): void {
    this.cleanupOptionsSub();
    this.filterInputSub?.unsubscribe();
    this.removeGlobalListeners();
    this.restorePanelIfNeeded();
  }

  private cleanupOptionsSub(): void {
    if (this.optionsSub) {
      this.optionsSub.unsubscribe();
      this.optionsSub = undefined;
    }
  }

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

    const valueToUse =
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

  private applyFilter(force = false): void {
    if (!this.isOpen && !force) return;

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

  get hasNoResults(): boolean {
    return this.isOpen && !!this._filterText && this.filteredOptions.length === 0;
  }

  resolveDisplayText(row: T | null): string {
    if (row === null) return '';

    const dw = this.displayWith;

    if (typeof dw === 'function' && this._displayWithExplicit) {
      return dw(row);
    }

    if (typeof dw === 'string') {
      const path = dw.split('.');
      let value: any = row;

      for (const segment of path) {
        if (value === null || value === undefined) return '';
        value = value[segment];
      }

      return value !== null && value !== undefined ? String(value) : '';
    }

    if (!this._displayWithExplicit && row !== null && typeof row === 'object') {
      const entries = Object.entries(row as any);
      if (!entries.length) return '';

      const labelEntry = entries[1] ?? entries[0];
      const labelValue = labelEntry[1];

      return labelValue !== null && labelValue !== undefined ? String(labelValue) : '';
    }

    if (!this._displayWithExplicit && (row === null || typeof row !== 'object')) {
      const primitive = row as any;

      const match = this._rawOptions.find((opt: any) => {
        if (opt === null || typeof opt !== 'object') return false;

        const entries = Object.entries(opt);
        if (!entries.length) return false;

        const valueEntry = entries[0];
        return valueEntry[1] === primitive;
      });

      if (match) {
        const entries = Object.entries(match as any);
        if (!entries.length) return String(primitive);

        const labelEntry = entries[1] ?? entries[0];
        const labelValue = labelEntry[1];

        return labelValue !== null && labelValue !== undefined
          ? String(labelValue)
          : String(primitive);
      }
    }

    if (typeof dw === 'function') {
      return dw(row);
    }

    return '';
  }

  private handleInputText(val: string): void {
    this._displayText = val;
    this._filterText = val;

    if (!this.isOpen) {
      this.openDropdown();
    } else {
      this.applyFilter(true);
      this.scheduleReposition();
    }
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

  toggleDropdown(event?: MouseEvent): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (this.disabled) return;

    if (!this.isOpen) {
      this.openDropdown();
    } else if (this.hasNoResults) {
      this._displayText = '';
      this._filterText = '';
      this.applyFilter(true);
      this.scheduleReposition();
    } else {
      this.syncModelToView();
      this.closeDropdown();
    }

    setTimeout(() => this.focus());
  }

  private openDropdown(): void {
    if (this.disabled) return;
    if (this.isOpen) return;

    this.isOpen = true;
    this._filterText = '';
    this.filteredOptions = [...this._rawOptions];

    this.cdr.detectChanges();

    if (this.portalToBody) {
      this.ensurePanelPortaled();
    }

    const panel = this.getPanelElement();

    if (panel) {
      panel.style.visibility = 'hidden';
      panel.style.pointerEvents = 'none';
    }

    this.ensureGlobalListeners();

    /*
     * Important:
     * Do not rely only on an after-callback to reveal the panel.
     * repositionPanelNow() reveals the panel after positioning succeeds.
     */
    this.scheduleReposition();

    const len = this.filteredOptions.length;

    if (len === 0) {
      this.highlightIndex = -1;
      return;
    }

    const current = this._modelValue;

    if (current !== null) {
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
    if (!this.isOpen) return;

    this.isOpen = false;
    this.highlightIndex = -1;

    this.removeGlobalListeners();
    this.restorePanelIfNeeded();

    this.cdr.detectChanges();
  }

  selectRow(row: T, event?: MouseEvent): void {
    event?.preventDefault();
    event?.stopPropagation();

    this._modelValue = row;
    this._displayText = this.resolveDisplayText(row);
    this._filterText = '';

    this.filteredOptions = [...this._rawOptions];

    this.onChange(row);
    this.onTouched();

    const payload: ISelectChange<T> = {
      value: row,
      label: this._displayText,
    };

    this.onChanged.emit(payload);
    this.onOptionSelected.emit(payload);

    this.closeDropdown();

    this.cdr.markForCheck();
  }

  isRowSelected(row: T): boolean {
    return this._modelValue === row;
  }

  private scrollHighlightedIntoView(): void {
    setTimeout(() => {
      if (!this.isOpen) return;

      const list = this.getPanelElement();
      if (!list) return;

      const items = list.querySelectorAll('.i-option');
      const el = items[this.highlightIndex] as HTMLElement | undefined;

      el?.scrollIntoView?.({ block: 'nearest' });
    });
  }

  focus(): void {
    if (this.disabled) return;

    const input = this.hostEl.nativeElement.querySelector(
      'i-input input',
    ) as HTMLInputElement | null;

    input?.focus();
  }

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
          this.selectRow(options[this.highlightIndex]);
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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isOpen) return;

    const target = event.target as Node | null;
    if (!target) return;

    const host = this.hostEl.nativeElement;
    const panel = this.getPanelElement();

    const insideHost = host.contains(target);
    const insidePanel = !!panel && panel.contains(target);

    if (!insideHost && !insidePanel) {
      this.closeDropdown();
    }
  }

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

  private getPanelElement(): HTMLElement | null {
    return this.panelRef?.nativeElement ?? null;
  }

  private getAnchorRect(): DOMRect | null {
    const host = this.hostEl.nativeElement;
    const iInput = host.querySelector('i-input') as HTMLElement | null;

    const hostRect = host.getBoundingClientRect?.() ?? null;
    const inputRect = iInput?.getBoundingClientRect?.() ?? null;
    const rect = inputRect ?? hostRect;

    if (!rect) return null;

    const viewportWidth = window.innerWidth;
    const safeLeft = Math.max(0, rect.left);
    const safeRight = Math.min(viewportWidth, rect.right);
    const safeWidth = Math.max(1, safeRight - safeLeft);

    return {
      bottom: rect.bottom,
      height: rect.height,
      left: safeLeft,
      right: safeLeft + safeWidth,
      top: rect.top,
      width: safeWidth,
      x: safeLeft,
      y: rect.y,
      toJSON: () => ({}),
    } as DOMRect;
  }

  private ensurePanelPortaled(): void {
    if (!this.portalToBody) return;

    const panel = this.getPanelElement();
    if (!panel) return;

    if (panel.parentNode === document.body) {
      this.panelPortaled = true;
      panel.classList.add('i-options--portaled');
      return;
    }

    this.panelOriginalParent = panel.parentNode;
    this.panelOriginalNextSibling = panel.nextSibling;

    panel.classList.add('i-options--portaled');

    document.body.appendChild(panel);
    this.panelPortaled = true;
  }

  private restorePanelIfNeeded(): void {
    const panel = this.getPanelElement();

    if (!this.panelPortaled) {
      if (panel) {
        this.clearPanelRuntimeStyles(panel);
        panel.classList.remove('i-options--portaled');
      }

      this.panelOriginalParent = null;
      this.panelOriginalNextSibling = null;
      return;
    }

    if (!panel) {
      this.panelPortaled = false;
      this.panelOriginalParent = null;
      this.panelOriginalNextSibling = null;
      return;
    }

    this.clearPanelRuntimeStyles(panel);
    panel.classList.remove('i-options--portaled');

    const parent = this.panelOriginalParent;

    if (parent) {
      try {
        if (this.panelOriginalNextSibling && this.panelOriginalNextSibling.parentNode === parent) {
          parent.insertBefore(panel, this.panelOriginalNextSibling);
        } else {
          parent.appendChild(panel);
        }
      } catch {
        // Angular will clean up the view anyway.
      }
    }

    this.panelPortaled = false;
    this.panelOriginalParent = null;
    this.panelOriginalNextSibling = null;
  }

  private scheduleReposition(after?: () => void): void {
    if (!this.isOpen) return;

    if (this.repositionRaf) {
      cancelAnimationFrame(this.repositionRaf);
    }

    this.zone.runOutsideAngular(() => {
      this.repositionRaf = requestAnimationFrame(() => {
        this.repositionRaf = 0;

        this.repositionPanelNow();
        after?.();
      });
    });
  }

  private revealPanel(panel: HTMLElement): void {
    panel.style.visibility = 'visible';
    panel.style.pointerEvents = '';
  }

  private clearPanelRuntimeStyles(panel: HTMLElement): void {
    panel.style.visibility = '';
    panel.style.pointerEvents = '';
    panel.style.position = '';
    panel.style.zIndex = '';
    panel.style.boxSizing = '';
    panel.style.overflowX = '';
    panel.style.overflowY = '';
    panel.style.width = '';
    panel.style.minWidth = '';
    panel.style.maxWidth = '';
    panel.style.maxHeight = '';
    panel.style.left = '';
    panel.style.top = '';
  }

  private repositionPanelNow(): void {
    if (!this.isOpen) return;

    const panel = this.getPanelElement();
    const rect = this.getAnchorRect();

    if (!panel || !rect) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const gap = 8;
    const availableWidth = Math.max(1, vw - gap * 2);

    const computedMinWidth = Number.parseFloat(window.getComputedStyle(panel).minWidth);
    const minWidth = Number.isFinite(computedMinWidth)
      ? Math.min(computedMinWidth, availableWidth)
      : 0;

    const pos = (this.panelPosition || 'bottom left').trim().toLowerCase();

    panel.style.position = 'fixed';
    panel.style.zIndex = '2000';
    panel.style.boxSizing = 'border-box';
    panel.style.overflowX = 'clip';
    panel.style.overflowY = 'auto';
    panel.style.maxWidth = `${Math.floor(availableWidth)}px`;

    const triggerWidth = Math.min(Math.max(1, Math.round(rect.width)), availableWidth);

    if (this.matchTriggerWidth) {
      panel.style.width = `${triggerWidth}px`;
      panel.style.minWidth = `${triggerWidth}px`;
    } else {
      const panelMinWidth = Math.max(triggerWidth, minWidth);

      panel.style.width = 'max-content';
      panel.style.minWidth = `${Math.floor(panelMinWidth)}px`;
    }

    const panelRect = panel.getBoundingClientRect();
    const panelWidth = Math.min(Math.max(1, panelRect.width), availableWidth);

    const wantTop = pos.startsWith('top');
    const wantBottom =
      pos.startsWith('bottom') ||
      (!pos.startsWith('top') && !pos.startsWith('left') && !pos.startsWith('right'));

    const wantLeft = pos.includes('left') || pos === 'left';
    const wantRight = pos.includes('right') || pos === 'right';
    const alignRight = wantRight && !wantLeft;

    let left = alignRight ? rect.right - panelWidth : rect.left;
    const maxLeft = Math.max(gap, vw - panelWidth - gap);

    left = Math.min(Math.max(gap, left), maxLeft);

    if (pos === 'left') {
      left = rect.left - panelWidth - this.panelOffset;
      left = Math.min(Math.max(gap, left), maxLeft);

      const panelHeight = Math.min(panelRect.height, Math.max(60, vh - gap * 2));
      const top = Math.min(Math.max(gap, rect.top), Math.max(gap, vh - panelHeight - gap));

      panel.style.left = `${Math.round(left)}px`;
      panel.style.top = `${Math.round(top)}px`;

      const maxH = Math.max(60, vh - top - gap);
      panel.style.maxHeight = `${Math.floor(maxH)}px`;

      this.revealPanel(panel);
      return;
    }

    if (pos === 'right') {
      left = rect.right + this.panelOffset;
      left = Math.min(Math.max(gap, left), maxLeft);

      const panelHeight = Math.min(panelRect.height, Math.max(60, vh - gap * 2));
      const top = Math.min(Math.max(gap, rect.top), Math.max(gap, vh - panelHeight - gap));

      panel.style.left = `${Math.round(left)}px`;
      panel.style.top = `${Math.round(top)}px`;

      const maxH = Math.max(60, vh - top - gap);
      panel.style.maxHeight = `${Math.floor(maxH)}px`;

      this.revealPanel(panel);
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

    const maxH = Math.max(60, side === 'bottom' ? spaceBelow : spaceAbove);

    panel.style.maxHeight = `${Math.floor(maxH)}px`;

    const panelHeight = Math.min(panelRect.height, maxH);

    const rawTop =
      side === 'bottom'
        ? rect.bottom + this.panelOffset
        : rect.top - panelHeight - this.panelOffset;

    const maxTop = Math.max(gap, vh - panelHeight - gap);
    const top = Math.min(Math.max(gap, rawTop), maxTop);

    panel.style.left = `${Math.round(left)}px`;
    panel.style.top = `${Math.round(top)}px`;

    this.revealPanel(panel);
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

    if (rm) {
      rm();
    }

    delete (this as any)._removeGlobal;

    this.listeningGlobal = false;

    if (this.repositionRaf) {
      cancelAnimationFrame(this.repositionRaf);
      this.repositionRaf = 0;
    }
  }
}

@Component({
  selector: 'i-fc-select',
  standalone: true,
  imports: [ISelect],
  template: `
    @if (label) {
      <label class="i-fc-select__label" (click)="focusInnerSelect()">
        {{ label }} :
        @if (required) {
          <span class="i-fc-select__required">*</span>
        }
      </label>
    }

    <i-select
      [disabled]="isDisabled"
      [displayWith]="displayWith"
      [filterDelay]="filterDelay"
      [filterPredicate]="filterPredicate"
      [invalid]="controlInvalid"
      [matchTriggerWidth]="matchTriggerWidth"
      [options]="options"
      [options$]="options$"
      [panelOffset]="panelOffset"
      [panelPosition]="panelPosition"
      [placeholder]="placeholder"
      [portalToBody]="portalToBody"
      (onChanged)="handleSelectChange($event)"
    >
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
export class IFCSelect<T = any> implements ControlValueAccessor, OnDestroy, AfterViewInit {
  @ViewChild(ISelect) innerSelect!: ISelect<T>;

  @Input() label = '';
  @Input() placeholder = '';
  @Input() options: T[] | null = null;
  @Input() options$: Observable<T[]> | null = null;

  @Input() displayWith?: ((row: T | null) => string) | string;
  @Input() filterDelay = 200;

  @Input() filterPredicate: (row: T, term: string) => boolean = (row, term) => {
    const haystack = JSON.stringify(row).toLowerCase();
    return haystack.includes(term);
  };

  @Input() panelPosition: ISelectPanelPosition = 'bottom left';
  @Input() panelOffset = 6;
  @Input() portalToBody = true;
  @Input() matchTriggerWidth = false;

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

  @Output() readonly onChanged = new EventEmitter<ISelectChange<T>>();
  @Output() readonly onOptionSelected = new EventEmitter<ISelectChange<T>>();

  private _value: T | null = null;
  isDisabled = false;

  private onChange: (v: any) => void = () => {
    /* noop */
  };

  private onTouched: () => void = () => {
    /* noop */
  };

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

  ngAfterViewInit(): void {
    if (this.innerSelect) {
      this.innerSelect.writeValue(this._value);
      this.innerSelect.setDisabledState(this.isDisabled);
    }

    this.cdr.markForCheck();
  }

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

  handleSelectChange(change: ISelectChange<T>): void {
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
