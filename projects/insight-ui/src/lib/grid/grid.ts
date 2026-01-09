/* grid.ts */
/**
 * IGrid
 * Version: 1.23.2
 *
 * Key fix (1.23.2):
 * - Introduce two sizing modes:
 *    1) FLUID: at least one "fill" column exists => row width is fluid (min-width: 100%)
 *    2) FIXED-STRIP: no fill columns remain => row/header get explicit width = sum(px), viewport scrolls
 *
 * - Resizing a fill column converts it to fixed.
 * - When the last fill column is converted to fixed, the grid automatically behaves as a fixed-width strip.
 */

import { NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  booleanAttribute,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Host,
  HostBinding,
  HostListener,
  Input,
  NgModule,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { IPaginator } from './paginator';
import { IIcon } from '../icon/icon';
import { IButton } from '../button/button';
import { IHighlightSearchPipe } from '../highlight-search.pipe';

/* ----------------------------------------------------
 * SORT TYPES
 * ---------------------------------------------------- */

export type ISortDirection = 'asc' | 'desc' | '';

export type ISortState = {
  active: string;
  direction: ISortDirection;
};

export type ISortConfig = ISortState | ISortState[] | null;

/* ----------------------------------------------------
 * FILTER TYPE
 * ---------------------------------------------------- */

export type IGridFilter =
  | string
  | {
      recursive: true;
      text: string;
      /**
       * Property name that holds children in hierarchical data.
       * Defaults to "children" when omitted.
       */
      key?: string;
    };

/* ----------------------------------------------------
 * PAGINATOR TYPES
 * ---------------------------------------------------- */

export type IGridPaginatorInput =
  | false
  | {
      pageIndex?: number;
      pageSize?: number;
      pageSizeOptions?: number[];
    };

export type IGridDataSourceConfig<T = any> = {
  sort?: ISortConfig;
  filter?: IGridFilter;

  /**
   * paginator:
   * - false → disabled
   * - undefined/missing → enabled with defaults
   * - { pageIndex?, pageSize?, pageSizeOptions? } → enabled + overridden
   */
  paginator?: IGridPaginatorInput;
};

/* ----------------------------------------------------
 * SELECTION TYPES
 * ---------------------------------------------------- */

export type IGridSelectionMode = false | 'single' | 'multiple';

export type IGridSelectionChange<T = any> = {
  selected: T[];
  lastChanged: T | null;
};

/* ----------------------------------------------------
 * COLUMN WIDTH TYPES
 * ---------------------------------------------------- */

export type IGridColumnWidth = number | 'fill';

/* ----------------------------------------------------
 * COLUMN-LIKE INTERFACE (manual + auto + custom)
 * ---------------------------------------------------- */

export type IGridColumnLike<T = any> = {
  fieldName?: string;
  title: string;
  sortable: boolean;
  resizable: boolean;
  width?: IGridColumnWidth;
  freeze: boolean;
  headerDef?: TemplateRef<any>;
  cellDef?: TemplateRef<any>;

  /** true for auto-generated columns from datasource keys */
  isAuto?: boolean;
};

/* ----------------------------------------------------
 * DATASOURCE
 * ---------------------------------------------------- */

export class IGridDataSource<T = any> {
  private readonly _renderedData$ = new BehaviorSubject<T[]>([]);

  private _rawData: T[] = [];

  // filter internal state
  private _filter = '';

  private _recursive = false;

  private _childrenKey = 'children';

  private _sort: ISortState[] | null = null;

  // pagination state
  private _paginatorEnabled = true;

  private _pageIndex = 0;

  private _pageSize = 10;

  private _pageSizeOptions = [10, 50, 100];

  // external observable data source
  private _externalDataSub?: Subscription;

  private _dataSource$?: Observable<T[]>;

  constructor(initialData: T[] = [], config: IGridDataSourceConfig<T> = {}) {
    this._rawData = initialData || [];

    // filter (uses setter to normalize)
    if (config.filter !== null) {
      this.filter = config.filter;
    }

    // sort
    this._sort = this._normalizeSort(config.sort ?? null);

    // paginator
    this._applyPaginatorConfig(config.paginator);

    this._update();
  }

  /* -------- paginator config logic -------- */

  private _applyPaginatorConfig(config: IGridPaginatorInput | undefined): void {
    if (config === false) {
      this._paginatorEnabled = false;
      return;
    }

    // default: enabled
    this._paginatorEnabled = true;

    if (config && typeof config === 'object') {
      this._pageIndex = config.pageIndex ?? 0;
      this._pageSizeOptions = config.pageSizeOptions ?? this._pageSizeOptions;
      this._pageSize = config.pageSize ?? this._pageSizeOptions[0];
      return;
    }

    // paginator missing => use defaults
    this._pageIndex = 0;
    this._pageSizeOptions = [10, 50, 100];
    this._pageSize = 10;
  }

  /* -------- public paginator accessors -------- */

  get paginatorEnabled(): boolean {
    return this._paginatorEnabled;
  }

  get pageIndex(): number {
    return this._pageIndex;
  }

  get pageSize(): number {
    return this._pageSize;
  }

  get pageSizeOptions(): number[] {
    return this._pageSizeOptions;
  }

  set paginator(state: { pageIndex: number; pageSize: number } | null) {
    if (!this._paginatorEnabled || !state) {
      return;
    }

    this._pageIndex = state.pageIndex;
    this._pageSize = state.pageSize;
    this._update();
  }

  get paginator(): { pageIndex: number; pageSize: number } | null {
    if (!this._paginatorEnabled) {
      return null;
    }
    return { pageIndex: this._pageIndex, pageSize: this._pageSize };
  }

  /* -------- data accessors -------- */

  get data(): T[] {
    return this._rawData;
  }

  set data(value: T[]) {
    this._rawData = value || [];
    this._update();
  }

  /**
   * Observable-based data source.
   * Example:
   *   this.dataSource.data$ = this.api.get<T[]>('/url');
   */
  get data$(): Observable<T[]> | undefined {
    return this._dataSource$;
  }

  set data$(source: Observable<T[]> | undefined) {
    // cleanup previous subscription
    this._externalDataSub?.unsubscribe();
    this._externalDataSub = undefined;
    this._dataSource$ = undefined;

    if (!source) {
      return;
    }

    this._dataSource$ = source;
    this._externalDataSub = source.subscribe((rows) => {
      this.data = rows || [];
    });
  }

  /* -------- filter & sort accessors -------- */

  /**
   * Smart filter:
   * - string: normal flat filtering
   * - { recursive: true, text, key? }: recursive tree filtering
   */
  set filter(value: IGridFilter | null | undefined) {
    if (!value) {
      this._filter = '';
      this._recursive = false;
      this._childrenKey = 'children';
      this._update();
      return;
    }

    if (typeof value === 'string') {
      this._filter = value.toLowerCase().trim();
      this._recursive = false;
      this._childrenKey = 'children';
      this._update();
      return;
    }

    // object: recursive filter (tree mode)
    this._filter = (value.text ?? '').toLowerCase().trim();
    this._recursive = value.recursive === true;
    this._childrenKey = (value.key || 'children').trim() || 'children';

    this._update();
  }

  /**
   * Returns the current normalized filter text.
   * (Always plain string, lowercased & trimmed.)
   */
  get filter(): string {
    return this._filter;
  }

  get sort(): ISortState[] | null {
    return this._sort;
  }

  set sort(value: ISortConfig) {
    this._sort = this._normalizeSort(value);
    this._update();
  }

  get length(): number {
    return this._rawData.length;
  }

  // can be customized by consumer
  filterPredicate: (data: T, filter: string) => boolean = (data, filter) => {
    if (!filter) {
      return true;
    }
    const target = JSON.stringify(data).toLowerCase();
    return target.includes(filter);
  };

  // can be customized by consumer
  sortAccessor: (data: T, columnId: string) => string | number | null | undefined = (
    data: any,
    columnId: string,
  ) => data?.[columnId];

  connect(): Observable<T[]> {
    return this._renderedData$.asObservable();
  }

  disconnect(): void {
    // stop listening to any external observable
    this._externalDataSub?.unsubscribe();
    this._externalDataSub = undefined;
    this._dataSource$ = undefined;

    this._renderedData$.complete();
  }

  /* -------- internal filter helpers -------- */

  /** Basic row match using public filterPredicate */
  private _rowMatchesFilter(data: T, filter: string): boolean {
    if (!filter) {
      return true;
    }
    return this.filterPredicate(data, filter);
  }

  /**
   * Strict recursive filtering:
   * - Returns a **new array** of roots.
   * - Each returned root is a **shallow clone** with its children pruned.
   * - A node is kept if:
   *     - it matches the filter, OR
   *     - any descendant matches.
   * - Non-matching siblings are removed.
   */
  private _filterRecursiveArray(nodes: any[], filter: string): any[] {
    const result: any[] = [];
    for (const node of nodes) {
      const pruned = this._filterRecursiveNode(node, filter);
      if (pruned !== null) {
        result.push(pruned);
      }
    }
    return result;
  }

  /**
   * Returns pruned clone of node, or null if neither it nor any descendant matches.
   */
  private _filterRecursiveNode(node: any, filter: string): any | null {
    const children = Array.isArray(node?.[this._childrenKey])
      ? (node[this._childrenKey] as any[])
      : [];

    // First, prune children
    const filteredChildren = this._filterRecursiveArray(children, filter);

    // Then, check this node
    const selfMatches = this._rowMatchesFilter(node as T, filter);

    // If no match and no matching descendants → remove this node
    if (!selfMatches && filteredChildren.length === 0) {
      return null;
    }

    // Keep this node, with pruned children
    const clone: any = { ...node };

    if (filteredChildren.length) {
      clone[this._childrenKey] = filteredChildren;
    } else {
      // remove children property so leaf really becomes a leaf
      if (Object.prototype.hasOwnProperty.call(clone, this._childrenKey)) {
        delete clone[this._childrenKey];
      }
    }

    return clone;
  }

  /* -------- internal sort normalize -------- */

  private _normalizeSort(sort: ISortConfig): ISortState[] | null {
    if (!sort) {
      return null;
    }

    const arr: ISortState[] = Array.isArray(sort) ? sort : [sort];

    const cleaned = arr.filter(
      (s): s is ISortState =>
        !!s && typeof s.active === 'string' && (s.direction === 'asc' || s.direction === 'desc'),
    );

    return cleaned.length ? cleaned : null;
  }

  /* -------- update flow -------- */

  private _update(): void {
    let data: T[] = [...this._rawData];

    // FILTER
    if (this._filter) {
      const f = this._filter;

      if (this._recursive) {
        // STRICT TREE FILTER:
        // - prune roots AND children
        data = this._filterRecursiveArray(data as any[], f) as T[];
      } else {
        // normal flat filter
        data = data.filter((row) => this.filterPredicate(row, f));
      }
    }

    // SORT (multi-column)
    if (this._sort && this._sort.length > 0) {
      const sorts = [...this._sort];

      data.sort((a: T, b: T) => {
        for (const sort of sorts) {
          const { active, direction } = sort;
          if (!active || !direction) {
            continue;
          }

          const dir = direction === 'asc' ? 1 : -1;

          // normalize undefined to null
          const aValue = (this.sortAccessor(a, active) ?? null) as any;
          const bValue = (this.sortAccessor(b, active) ?? null) as any;

          if (aValue === null && bValue === null) {
            continue;
          }
          if (aValue === null) {
            return -1 * dir;
          }
          if (bValue === null) {
            return 1 * dir;
          }

          if (aValue < bValue) return -1 * dir;
          if (aValue > bValue) return 1 * dir;
        }

        return 0;
      });
    }

    // PAGINATION
    if (this._paginatorEnabled) {
      const start = this._pageIndex * this._pageSize;
      data = data.slice(start, start + this._pageSize);
    }

    this._renderedData$.next(data);
  }
}

/* ----------------------------------------------------
 * TEMPLATE DIRECTIVES (header & cell defs)
 * ---------------------------------------------------- */

@Directive({
  selector: '[iHeaderCellDef]',
  standalone: true,
})
export class IGridHeaderCellDefDirective {
  constructor(readonly template: TemplateRef<any>) {}
}

@Directive({
  selector: '[iCellDef]',
  standalone: true,
})
export class IGridCellDefDirective {
  constructor(readonly template: TemplateRef<any>) {}
}

/* ----------------------------------------------------
 * EXPANDABLE ROW DEF (detail row template)
 * ---------------------------------------------------- */

@Directive({
  selector: '[iRowDef]',
  standalone: true,
})
export class IGridRowDefDirective<T = any> implements OnInit {
  @Input() iRowDefExpandSingle = false;

  constructor(
    readonly template: TemplateRef<any>,
    private readonly vcr: ViewContainerRef,
  ) {}

  ngOnInit(): void {
    this.vcr.clear();
  }

  static ngTemplateContextGuard<T>(
    _dir: IGridRowDefDirective<T>,
    _ctx: any,
  ): _ctx is { $implicit: T; row: T; index: number } {
    return true;
  }
}

@Component({
  selector: 'i-grid-expandable-row',
  standalone: true,
  template: `<ng-content />`,
  host: {
    class: 'i-grid-expandable-row flex',
    role: 'row',
  },
})
export class IGridExpandableRow {}

/* ----------------------------------------------------
 * ROW DIRECTIVES
 * ---------------------------------------------------- */

@Directive({
  selector: 'i-grid-header-row',
  standalone: true,
  host: {
    class: 'i-grid-header-row',
    role: 'row',
  },
})
export class IGridHeaderRowDirective {}

@Directive({
  selector: 'i-grid-row',
  standalone: true,
  host: {
    class: 'i-grid-row',
    role: 'row',
  },
})
export class IGridRowDirective {}

/* ----------------------------------------------------
 * COLUMN (i-grid-column) – data-backed only
 * ---------------------------------------------------- */

@Component({
  selector: 'i-grid-column',
  standalone: true,
  template: '',
})
export class IGridColumn<T = any> implements IGridColumnLike<T> {
  @Input({ required: true }) fieldName!: string;

  @Input() title = '';

  @Input() sortable = true;

  @Input() resizable = true;

  @Input() width?: IGridColumnWidth;

  @Input({ transform: booleanAttribute }) freeze = false;

  @ContentChild(IGridHeaderCellDefDirective, { read: TemplateRef })
  headerDef?: TemplateRef<any>;

  @ContentChild(IGridCellDefDirective, { read: TemplateRef })
  cellDef?: TemplateRef<any>;

  isAuto?: boolean | undefined;
}

/* ----------------------------------------------------
 * CUSTOM COLUMN (i-grid-custom-column) – not bound to datasource
 * ---------------------------------------------------- */

@Component({
  selector: 'i-grid-custom-column',
  standalone: true,
  template: '',
})
export class IGridCustomColumn<T = any> implements IGridColumnLike<T> {
  @Input() title = '';

  @Input() sortable = false;

  @Input() resizable = true;

  @Input() width?: IGridColumnWidth;

  @Input({ transform: booleanAttribute }) freeze = false;

  fieldName?: string;

  @ContentChild(IGridHeaderCellDefDirective, { read: TemplateRef })
  headerDef?: TemplateRef<any>;

  @ContentChild(IGridCellDefDirective, { read: TemplateRef })
  cellDef?: TemplateRef<any>;

  isAuto?: boolean | undefined;
}

/* ----------------------------------------------------
 * DATA CELL (used in body)
 * ---------------------------------------------------- */

@Component({
  selector: 'i-grid-cell',
  standalone: true,
  host: {
    class: 'i-grid-cell',
    role: 'cell',
  },
  template: ` <ng-content /> `,
})
export class IGridCell {
  @Input() column?: IGridColumnLike<any>;

  @Input() fixedWidth?: number;

  constructor(
    @Optional() @Host() private hostDataColumn: IGridColumn<any> | null,
    @Optional() @Host() private hostCustomColumn: IGridCustomColumn<any> | null,
    @Optional() private grid: IGrid<any> | null,
  ) {}

  private get _column(): IGridColumnLike<any> | null {
    return this.column ?? this.hostDataColumn ?? this.hostCustomColumn ?? null;
  }

  @HostBinding('style.flex')
  get flex(): string {
    if (typeof this.fixedWidth === 'number') {
      return `0 0 ${this.fixedWidth}px`;
    }

    const col = this._column;
    if (!this.grid || !col) {
      return '1 1 0';
    }

    return this.grid.getColumnFlex(col);
  }

  private get _isFrozen(): boolean {
    return !!this.grid && !!this._column && this.grid.isColumnFrozen(this._column);
  }

  @HostBinding('class.i-grid-cell--frozen')
  get frozenClass(): boolean {
    return this._isFrozen;
  }

  @HostBinding('style.position')
  get stickyPosition(): string | null {
    return this._isFrozen ? 'sticky' : null;
  }

  @HostBinding('style.left.px')
  get stickyLeft(): number | null {
    if (!this._isFrozen || !this.grid || !this._column) {
      return null;
    }
    return this.grid.getColumnStickyLeft(this._column);
  }

  @HostBinding('style.zIndex')
  get stickyZ(): number | null {
    return this._isFrozen ? 2 : null;
  }
}

/* ----------------------------------------------------
 * HEADER CELL (sorting + resize handle + frozen)
 * ---------------------------------------------------- */

@Component({
  selector: 'i-grid-header-cell',
  standalone: true,
  imports: [IIcon],
  template: `
    <span class="i-grid-header-cell__content">
      <ng-content />
    </span>

    @if (showIcon) {
      <span class="i-grid-header-cell__icon">
        <i-icon size="sm" [icon]="iconName" />
      </span>
    }

    <span class="i-grid-header-cell__resize-handle" (mousedown)="onResizeMouseDown($event)"> </span>
  `,
  host: {
    class: 'i-grid-header-cell',
    role: 'columnheader',
  },
})
export class IGridHeaderCell {
  @Input() column?: IGridColumnLike<any>;

  @Input() fixedWidth?: number;

  private _isResizing = false;

  private _startX = 0;

  private _startWidth = 0;

  private readonly _minWidth = 50;

  constructor(
    private el: ElementRef<HTMLElement>,
    @Optional() private grid: IGrid<any> | null,
    @Optional() @Host() private hostDataColumn: IGridColumn<any> | null,
    @Optional() @Host() private hostCustomColumn: IGridCustomColumn<any> | null,
  ) {}

  private get _column(): IGridColumnLike<any> | null {
    return this.column ?? this.hostDataColumn ?? this.hostCustomColumn ?? null;
  }

  private get _columnId(): string | null {
    const col = this._column;
    return col?.fieldName ?? null;
  }

  private get _direction(): ISortDirection {
    if (!this.grid || !this._columnId) {
      return '';
    }
    return this.grid.getColumnDirection(this._columnId);
  }

  private get _sortableFlag(): boolean {
    const col = this._column;
    if (!col) {
      return false;
    }
    return col.sortable !== false && !!col.fieldName;
  }

  get resizable(): boolean {
    const col = this._column;
    if (!col) {
      return false;
    }
    return col.resizable !== false;
  }

  @HostBinding('style.flex')
  get flex(): string {
    if (typeof this.fixedWidth === 'number') {
      return `0 0 ${this.fixedWidth}px`;
    }

    const col = this._column;
    if (!this.grid || !col) {
      return '1 1 0';
    }

    return this.grid.getColumnFlex(col);
  }

  @HostBinding('class.i-grid-header-cell--sortable')
  get sortable(): boolean {
    return !!this.grid && !!this._columnId && this._sortableFlag;
  }

  @HostBinding('class.i-grid-header-cell--sorted')
  get isSorted(): boolean {
    return this._direction !== '';
  }

  @HostBinding('class.i-grid-header-cell--sorted-asc')
  get isSortedAsc(): boolean {
    return this._direction === 'asc';
  }

  @HostBinding('class.i-grid-header-cell--sorted-desc')
  get isSortedDesc(): boolean {
    return this._direction === 'desc';
  }

  @HostBinding('class.i-grid-header-cell--resizable')
  get isResizableClass(): boolean {
    return this.resizable;
  }

  get showIcon(): boolean {
    return this.sortable && this._direction !== '';
  }

  get iconName(): string {
    return this._direction === 'asc' ? 'sort-asc' : 'sort-dsc';
  }

  private get _isFrozen(): boolean {
    return !!this.grid && !!this._column && this.grid.isColumnFrozen(this._column);
  }

  @HostBinding('class.i-grid-header-cell--frozen')
  get frozenClass(): boolean {
    return this._isFrozen;
  }

  @HostBinding('style.position')
  get stickyPosition(): string | null {
    return this._isFrozen ? 'sticky' : null;
  }

  @HostBinding('style.left.px')
  get stickyLeft(): number | null {
    if (!this._isFrozen || !this.grid || !this._column) {
      return null;
    }
    return this.grid.getColumnStickyLeft(this._column);
  }

  @HostBinding('style.zIndex')
  get stickyZ(): number | null {
    if (!this._isFrozen || !this.grid || !this._column) {
      return null;
    }
    return this.grid.getFrozenColumnZ(this._column);
  }

  @HostListener('click')
  onClick(): void {
    if (this._isResizing) {
      return;
    }

    const col = this._column;
    if (!this.grid || !this._sortableFlag || !col) {
      return;
    }
    this.grid.sort(col);
  }

  onResizeMouseDown(event: MouseEvent): void {
    const col = this._column;
    if (!this.grid || !col || !this.resizable) {
      return;
    }

    event.stopPropagation();
    event.preventDefault();

    this._isResizing = true;
    this._startX = event.clientX;

    const currentWidth = this.grid.getColumnEffectivePixelWidth(col, this.el.nativeElement);
    this._startWidth = Math.max(this._minWidth, currentWidth);
  }

  @HostListener('document:mousemove', ['$event'])
  onDocumentMouseMove(event: MouseEvent): void {
    const col = this._column;
    if (!this._isResizing || !this.grid || !col) {
      return;
    }

    const delta = event.clientX - this._startX;
    let newWidth = this._startWidth + delta;

    if (newWidth < this._minWidth) {
      newWidth = this._minWidth;
    }

    this.grid.setColumnWidth(col, newWidth);
  }

  @HostListener('document:mouseup')
  onDocumentMouseUp(): void {
    if (!this._isResizing) {
      return;
    }

    setTimeout(() => {
      this._isResizing = false;
    }, 0);
  }
}

/* ----------------------------------------------------
 * GRID COMPONENT
 * ---------------------------------------------------- */

type ISizingMode = 'fill' | 'fixed';

@Component({
  selector: 'i-grid',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    IGridHeaderRowDirective,
    IGridRowDirective,
    IGridHeaderCell,
    IGridCell,
    IPaginator,
    IButton,
    IHighlightSearchPipe,
    IGridRowDefDirective,
    IGridExpandableRow,
  ],
  template: `<div
      class="i-grid-viewport"
      [style.height.px]="bodyHeight || null"
      [style.max-height.px]="bodyMaxHeight || null"
    >
      <!-- HEADER -->
      @if (columns.length) {
        <i-grid-header-row
          [style.minWidth.%]="hasFillColumns ? 100 : null"
          [style.width.px]="fixedStripWidthPx"
        >
          @if (treeEnabled) {
            <!-- TREE MODE: single header cell (toggle + header checkbox inside the same cell) -->
            <i-grid-header-cell
              class="i-grid-tree-cell i-grid-tree-cell--header i-grid-header-cell--frozen"
              [fixedWidth]="treeColumnWidthEffective"
              [style.left.px]="0"
              [style.position]="'sticky'"
              (click)="$event.stopPropagation()"
            >
              <span class="i-grid-header-cell__content i-grid-tree-header-content">
                <i-button
                  class="i-grid-tree-expand-all"
                  size="2xs"
                  variant="outline"
                  [icon]="allTreeExpanded ? 'down' : 'next'"
                  (onClick)="onToggleAllTree()"
                />

                @if (selectionMode === 'multiple') {
                  <input
                    class="i-grid-tree-header-checkbox"
                    type="checkbox"
                    [checked]="allVisibleSelected"
                    [indeterminate]="someVisibleSelected"
                    (change)="onToggleAllVisible()"
                    (click)="$event.stopPropagation()"
                  />
                }
              </span>
            </i-grid-header-cell>
          } @else {
            @if (hasExpandableRow && !expandableRowDef?.iRowDefExpandSingle) {
              <i-grid-header-cell
                class="i-grid-expand-cell i-grid-expand-cell--header"
                [fixedWidth]="expandColumnWidth"
                [style.left.px]="getStickyLeftForExpandColumn()"
                [style.position]="'sticky'"
              >
                <span class="i-grid-header-cell__content">
                  <i-button
                    class="i-grid-expand-toggle"
                    size="2xs"
                    variant="outline"
                    [icon]="allVisibleExpanded ? 'down' : 'next'"
                    (onClick)="onToggleAllExpanded()"
                  />
                </span>
              </i-grid-header-cell>
            }

            @if (selectionMode) {
              <i-grid-header-cell
                class="i-grid-selection-cell i-grid-selection-cell--header"
                [fixedWidth]="selectionColumnWidth"
                [style.left.px]="getStickyLeftForSelectionColumn()"
                [style.position]="'sticky'"
              >
                <span class="i-grid-header-cell__content">
                  @if (selectionMode === 'multiple') {
                    <input
                      type="checkbox"
                      [checked]="allVisibleSelected"
                      [indeterminate]="someVisibleSelected"
                      (change)="onToggleAllVisible()"
                      (click)="$event.stopPropagation()"
                    />
                  }
                </span>
              </i-grid-header-cell>
            }
          }

          @if (showNumberColumnEffective) {
            <i-grid-header-cell
              class="i-grid-number-cell i-grid-number-cell--header"
              [class.i-grid-header-cell--frozen]="hasFrozenColumns"
              [column]="numberColumn"
              [style.left.px]="hasFrozenColumns ? getStickyLeftForNumberColumn() : null"
              [style.position]="hasFrozenColumns ? 'sticky' : null"
              [style.zIndex]="hasFrozenColumns ? 3 : null"
            >
              {{ numberColumn.title }}
            </i-grid-header-cell>
          }

          @for (col of columns; track col; let colIndex = $index) {
            @if (col.headerDef; as tmpl) {
              <ng-container [ngTemplateOutlet]="tmpl" />
            } @else {
              <i-grid-header-cell [class.i-grid-header-cell--auto]="col.isAuto" [column]="col">
                {{ col.title || col.fieldName }}
              </i-grid-header-cell>
            }
          }
        </i-grid-header-row>
      }

      <!-- ROWS -->
      @for (row of renderedData; track rowIndex; let rowIndex = $index) {
        <i-grid-row
          [class.i-grid-selection-row]="!!selectionMode"
          [style.minWidth.%]="hasFillColumns ? 100 : null"
          [style.width.px]="fixedStripWidthPx"
          (click)="onRowClicked(row)"
        >
          @if (treeEnabled) {
            <i-grid-cell
              class="i-grid-tree-cell i-grid-tree-cell--body"
              [fixedWidth]="treeColumnWidthEffective"
              [style.left.px]="getStickyLeftForTreeColumn()"
              [style.position]="'sticky'"
              (click)="$event.stopPropagation()"
            >
              <span
                class="i-grid-tree-cell__content"
                [style.padding-left.px]="8 + getRowLevel(row) * treeIndent"
              >
                @if (hasChildren(row)) {
                  <i-button
                    class="i-grid-tree-toggle"
                    size="2xs"
                    variant="outline"
                    [icon]="isExpanded(row) ? 'down' : 'next'"
                    (onClick)="onTreeToggle(row, $event)"
                  />
                } @else {
                  <span class="i-grid-tree-spacer"></span>
                }
                @if (selectionMode === 'multiple') {
                  <input
                    class="i-grid-tree-checkbox"
                    type="checkbox"
                    [checked]="getRowChecked(row)"
                    [indeterminate]="getRowIndeterminate(row)"
                    (change)="onRowSelectionToggle(row)"
                    (click)="$event.stopPropagation()"
                  />
                }
              </span>
            </i-grid-cell>
          }

          @if (!treeEnabled && hasExpandableRow) {
            <i-grid-cell
              class="i-grid-expand-cell i-grid-expand-cell--body"
              [fixedWidth]="expandColumnWidth"
              [style.left.px]="getStickyLeftForExpandColumn()"
              [style.position]="'sticky'"
              (click)="$event.stopPropagation()"
            >
              <span class="i-grid-expand-cell__content">
                <i-button
                  class="i-grid-expand-toggle"
                  size="2xs"
                  variant="outline"
                  [icon]="isRowExpanded(row) ? 'down' : 'next'"
                  (onClick)="onExpandToggle(row, $event)"
                />
              </span>
            </i-grid-cell>
          }

          @if (selectionMode && !(treeEnabled && selectionMode === 'multiple')) {
            <i-grid-cell
              class="i-grid-selection-cell i-grid-selection-cell--body"
              [fixedWidth]="selectionColumnWidth"
              [style.left.px]="getStickyLeftForSelectionColumn()"
              [style.position]="'sticky'"
              (click)="$event.stopPropagation()"
            >
              @if (selectionMode === 'multiple') {
                <input
                  type="checkbox"
                  [checked]="getRowChecked(row)"
                  [indeterminate]="getRowIndeterminate(row)"
                  (change)="onRowSelectionToggle(row)"
                />
              } @else if (selectionMode === 'single') {
                <input
                  type="radio"
                  [checked]="isRowSelected(row)"
                  [name]="singleSelectionName"
                  (change)="onRowSelectionToggle(row)"
                />
              }
            </i-grid-cell>
          }

          @if (showNumberColumnEffective) {
            <i-grid-cell
              class="i-grid-number-cell i-grid-number-cell--body"
              [class.i-grid-cell--frozen]="hasFrozenColumns"
              [column]="numberColumn"
              [style.left.px]="hasFrozenColumns ? getStickyLeftForNumberColumn() : null"
              [style.position]="hasFrozenColumns ? 'sticky' : null"
              [style.zIndex]="hasFrozenColumns ? 2 : null"
              (click)="$event.stopPropagation()"
            >
              <span class="i-grid-cell__content">
                {{ getRowNumber(rowIndex) }}
              </span>
            </i-grid-cell>
          }

          @for (col of columns; track col; let colIndex = $index) {
            @if (col.cellDef; as tmpl) {
              <ng-container
                [ngTemplateOutlet]="tmpl"
                [ngTemplateOutletContext]="{
                  $implicit: row,
                  row: row,
                  index: rowIndex,
                  column: col,
                }"
              />
            } @else {
              <i-grid-cell [class.i-grid-cell--auto]="col.isAuto" [column]="col">
                <span
                  class="i-grid-cell__content"
                  [innerHTML]="
                    col.fieldName
                      ? ($any(row)[col.fieldName] | highlightSearch: currentFilterText)
                      : ''
                  "
                >
                </span>
              </i-grid-cell>
            }
          }
        </i-grid-row>

        @if (hasExpandableRow && isRowExpanded(row)) {
          <ng-container
            [ngTemplateOutlet]="expandableRowDef!.template"
            [ngTemplateOutletContext]="{ $implicit: row, row: row, index: rowIndex }"
          />
        }
      }
    </div>

    @if (hasPagination) {
      <div class="i-grid-footer">
        <i-paginator
          [length]="totalLength"
          [pageIndex]="pageIndex"
          [pageSize]="pageSize"
          [pageSizeOptions]="pageSizeOptions"
          (pageChange)="onPageChange($event)"
        />
      </div>
    }`,
  exportAs: 'iGrid',
  host: {
    class: 'i-grid',
    role: 'table',
  },
})
export class IGrid<T> implements AfterContentInit, OnChanges, OnDestroy {
  @Input() dataSource!: IGridDataSource<T> | T[];

  @Input() selectionMode: IGridSelectionMode = false;

  @Input() stickyHeader: boolean | '' = false;

  @Input() stickyHeaderOffset = 0;

  @Input() bodyHeight?: number;

  @Input() bodyMaxHeight?: number;

  @Input() tree: string | boolean | null = null;

  @Input() treeIndent = 16;

  @Input() treeInitialExpandLevel: number | null = null;

  @Input({ transform: booleanAttribute }) showNumberColumn = true;

  get showNumberColumnEffective(): boolean {
    if (this.treeEnabled) {
      return false;
    }
    return this.showNumberColumn;
  }

  @Output() readonly selectionChange = new EventEmitter<IGridSelectionChange<T>>();

  @Output() readonly rowClick = new EventEmitter<T>();

  @Output() readonly rowExpandChange = new EventEmitter<{ row: T; expanded: boolean }>();

  @Output() readonly expandedRowsChange = new EventEmitter<T[]>();

  @ContentChildren(IGridColumn)
  columnDefs!: QueryList<IGridColumn<T>>;

  @ContentChildren(IGridCustomColumn)
  customColumnDefs!: QueryList<IGridCustomColumn<T>>;

  @ContentChild(IGridRowDefDirective)
  expandableRowDef?: IGridRowDefDirective<T>;

  get hasExpandableRow(): boolean {
    return !!this.expandableRowDef?.template;
  }

  columns: IGridColumnLike<T>[] = [];

  renderedData: T[] = [];

  currentFilterText = '';

  sortStates: ISortState[] = [];

  /**
   * Fixed px overrides (resized columns end up here)
   */
  private _columnWidths = new Map<IGridColumnLike<any>, number>();

  /**
   * Explicit sizing mode overrides:
   * - default comes from column.width ('fill' => fill, number/undefined => fixed)
   * - resizing a fill column sets mode to 'fixed'
   */
  private _sizingMode = new Map<IGridColumnLike<any>, ISizingMode>();

  private _dataSub?: Subscription;

  private _selection = new Set<T>();

  private _expanded = new Set<T>();

  private readonly _id = Math.random().toString(36).slice(2);

  private readonly _defaultColumnWidth = 200;

  readonly selectionColumnWidth = 20;

  readonly numberColumnWidth = 60;

  readonly treeColumnWidth = 32;

  readonly expandColumnWidth = 32;

  private _numberColumnInternal?: IGridColumnLike<T>;

  readonly treeIndentBasePadding = 8;

  get treeColumnWidthEffective(): number {
    if (!this.treeEnabled) {
      return this.treeColumnWidth;
    }

    let maxLevel = 0;
    for (const meta of this._treeMeta.values()) {
      if (meta.level > maxLevel) {
        maxLevel = meta.level;
      }
    }

    return this.treeColumnWidth + maxLevel * this.treeIndent;
  }

  private _treeMeta = new Map<
    T,
    { level: number; parent: T | null; hasChildren: boolean; expanded: boolean }
  >();

  private _treeRoots: T[] = [];

  get numberColumn(): IGridColumnLike<T> {
    if (!this._numberColumnInternal) {
      this._numberColumnInternal = {
        fieldName: undefined,
        title: 'No.',
        sortable: false,
        resizable: true,
        width: this.numberColumnWidth,
        freeze: false,
        headerDef: undefined,
        cellDef: undefined,
        isAuto: false,
      };
    }
    return this._numberColumnInternal;
  }

  /* ------- host bindings for sticky header ------- */

  @HostBinding('class.i-grid--sticky-header')
  get stickyHeaderClass(): boolean {
    return !!this.stickyHeader;
  }

  @HostBinding('style.--i-grid-sticky-top')
  get stickyTopVar(): string | null {
    return this.stickyHeader ? `${this.stickyHeaderOffset}px` : null;
  }

  /* ----------------------------------------------------
   * SIZING MODE (NEW)
   * ---------------------------------------------------- */

  private _getSizingMode(col: IGridColumnLike<any>): ISizingMode {
    const override = this._sizingMode.get(col);
    if (override) {
      return override;
    }

    // default based on column.width
    return col.width === 'fill' ? 'fill' : 'fixed';
  }

  get hasFillColumns(): boolean {
    return this.columns.some((c) => this._getSizingMode(c) === 'fill');
  }

  /**
   * When there are no fill columns => fixed strip mode.
   * Row/header width becomes sum of all fixed pixel widths (+ special columns if applicable).
   */
  get fixedStripWidthPx(): number | null {
    if (this.hasFillColumns) {
      return null;
    }

    let w = 0;

    // Special columns
    if (this.treeEnabled) {
      w += this.treeColumnWidthEffective;
      if (this.selectionMode === 'multiple') {
        w += this.selectionColumnWidth;
      }
    } else {
      if (this.hasExpandableRow) {
        w += this.expandColumnWidth;
      }
      if (this.selectionMode) {
        w += this.selectionColumnWidth;
      }
    }

    if (this.showNumberColumnEffective) {
      const num = this.getColumnWidth(this.numberColumn);
      w += num ?? 0;
    }

    // Data/custom columns
    for (const col of this.columns) {
      const px = this.getColumnWidth(col);
      w += px ?? 0;
    }

    return w;
  }

  /**
   * Used by header resizing: if column is fill, use actual rendered width as start.
   */
  getColumnEffectivePixelWidth(col: IGridColumnLike<any>, el: HTMLElement): number {
    const mode = this._getSizingMode(col);

    // If fixed, trust our width system
    if (mode === 'fixed') {
      return this.getColumnWidth(col) ?? el.offsetWidth;
    }

    // If fill, measure actual
    return el.offsetWidth;
  }

  /* ----------------------------------------------------
   * EXPANDABLE ROW API
   * ---------------------------------------------------- */

  expandRow(row: T): void {
    this._setExpanded(row, true);
  }

  collapseRow(row: T): void {
    this._setExpanded(row, false);
  }

  toggleRowExpanded(row: T): void {
    this._setExpanded(row, !this.isRowExpanded(row));
  }

  isRowExpanded(row: T): boolean {
    return this._expanded.has(row);
  }

  getExpandedRows(): T[] {
    return Array.from(this._expanded);
  }

  expandAll(): void {
    if (!this.hasExpandableRow) {
      return;
    }

    const expandSingle = !!this.expandableRowDef?.iRowDefExpandSingle;

    if (expandSingle) {
      const first = this.renderedData[0];
      const prev = Array.from(this._expanded);
      this._expanded.clear();
      prev.forEach((r) => this.rowExpandChange.emit({ row: r, expanded: false }));

      if (first) {
        this._expanded.add(first);
        this.rowExpandChange.emit({ row: first, expanded: true });
      }
      this.expandedRowsChange.emit(this.getExpandedRows());
      return;
    }

    const before = new Set(this._expanded);
    for (const row of this.renderedData) {
      this._expanded.add(row);
    }

    for (const row of this.renderedData) {
      if (!before.has(row)) {
        this.rowExpandChange.emit({ row, expanded: true });
      }
    }
    this.expandedRowsChange.emit(this.getExpandedRows());
  }

  collapseAll(): void {
    if (!this.hasExpandableRow) {
      return;
    }

    const prev = Array.from(this._expanded);
    this._expanded.clear();

    prev.forEach((row) => this.rowExpandChange.emit({ row, expanded: false }));
    this.expandedRowsChange.emit(this.getExpandedRows());
  }

  get allVisibleExpanded(): boolean {
    if (!this.hasExpandableRow || !this.renderedData.length) {
      return false;
    }
    return this.renderedData.every((row) => this._expanded.has(row));
  }

  onToggleAllExpanded(): void {
    if (!this.hasExpandableRow) {
      return;
    }
    const shouldExpand = !this.allVisibleExpanded;
    if (shouldExpand) {
      this.expandAll();
    } else {
      this.collapseAll();
    }
  }

  onExpandToggle(row: T, event?: MouseEvent): void {
    event?.stopPropagation();
    this.toggleRowExpanded(row);
  }

  private _setExpanded(row: T, expanded: boolean): void {
    if (!this.hasExpandableRow) {
      return;
    }

    const all = this._getAllDataRows();
    if (all.length) {
      const valid = new Set(all);
      if (!valid.has(row)) {
        return;
      }
    }

    const expandSingle = !!this.expandableRowDef?.iRowDefExpandSingle;

    const wasExpanded = this._expanded.has(row);
    if (expanded === wasExpanded) {
      return;
    }

    if (expanded) {
      if (expandSingle) {
        const prev = Array.from(this._expanded).filter((r) => r !== row);
        this._expanded.clear();
        prev.forEach((r) => this.rowExpandChange.emit({ row: r, expanded: false }));
      }

      this._expanded.add(row);
      this.rowExpandChange.emit({ row, expanded: true });
    } else {
      this._expanded.delete(row);
      this.rowExpandChange.emit({ row, expanded: false });
    }

    this.expandedRowsChange.emit(this.getExpandedRows());
  }

  /* ------- TREE helpers (config) ------- */

  get treeEnabled(): boolean {
    return this.tree !== null && this.tree !== false;
  }

  get treeChildrenKey(): string {
    if (!this.treeEnabled) {
      return 'children';
    }

    if (this.tree === true) {
      return 'children';
    }
    if (typeof this.tree === 'string') {
      const t = this.tree.trim();
      if (!t || t === 'true') {
        return 'children';
      }
      return t;
    }

    return 'children';
  }

  private _getInitialExpandLevelInternal(): number | null {
    if (!this.treeEnabled) {
      return null;
    }
    if (this.treeInitialExpandLevel === null) {
      return null;
    }
    const n = Number(this.treeInitialExpandLevel);
    if (!Number.isFinite(n) || n <= 0) {
      return null;
    }
    return n - 1;
  }

  private _shouldRowStartExpanded(level: number, hasChildren: boolean): boolean {
    if (!hasChildren) {
      return false;
    }
    const max = this._getInitialExpandLevelInternal();
    if (max === null) {
      return false;
    }
    return level <= max;
  }

  private _getTreeChildren(row: T): T[] {
    if (!this.treeEnabled || !row) {
      return [];
    }
    const anyRow: any = row;
    const value = anyRow?.[this.treeChildrenKey];
    return Array.isArray(value) ? value : [];
  }

  private _getTreeDescendants(row: T): T[] {
    const result: T[] = [];
    const visit = (r: T): void => {
      const children = this._getTreeChildren(r);
      for (const child of children) {
        result.push(child);
        visit(child);
      }
    };
    visit(row);
    return result;
  }

  private _buildTreeMeta(data: T[]): void {
    this._treeMeta.clear();
    this._treeRoots = [];

    if (!Array.isArray(data)) {
      return;
    }

    const visit = (row: T, level: number, parent: T | null): void => {
      const children = this._getTreeChildren(row);
      const hasChildren = children.length > 0;
      const expanded = this._shouldRowStartExpanded(level, hasChildren);

      if (parent === null) {
        this._treeRoots.push(row);
      }

      this._treeMeta.set(row, { level, parent, hasChildren, expanded });

      children.forEach((child) => visit(child, level + 1, row));
    };

    data.forEach((root) => visit(root, 0, null));
  }

  private _rebuildTreeRendered(): void {
    if (!this.treeEnabled) {
      return;
    }

    const result: T[] = [];

    const appendVisible = (row: T): void => {
      result.push(row);
      const meta = this._treeMeta.get(row);
      if (!meta?.expanded) {
        return;
      }

      const children = this._getTreeChildren(row);
      for (const child of children) {
        appendVisible(child);
      }
    };

    for (const root of this._treeRoots) {
      appendVisible(root);
    }

    this.renderedData = result;
    this._reconcileSelectionWithData();
    this._reconcileExpandedWithData();
    this._updateCurrentFilterText();
  }

  getRowLevel(row: T): number {
    if (!this.treeEnabled) {
      return 0;
    }
    return this._treeMeta.get(row)?.level ?? 1;
  }

  hasChildren(row: T): boolean {
    if (!this.treeEnabled) {
      return false;
    }
    return this._treeMeta.get(row)?.hasChildren ?? false;
  }

  isExpanded(row: T): boolean {
    if (!this.treeEnabled) {
      return false;
    }
    return this._treeMeta.get(row)?.expanded ?? false;
  }

  get allTreeExpanded(): boolean {
    if (!this.treeEnabled || !this._treeRoots.length) {
      return false;
    }

    for (const meta of this._treeMeta.values()) {
      if (meta.hasChildren && !meta.expanded) {
        return false;
      }
    }

    return true;
  }

  onToggleAllTree(): void {
    if (!this.treeEnabled) {
      return;
    }

    const shouldExpand = !this.allTreeExpanded;

    this._treeMeta.forEach((meta) => {
      if (meta.hasChildren) {
        meta.expanded = shouldExpand;
      }
    });

    this._rebuildTreeRendered();
  }

  toggleRow(row: T): void {
    if (!this.treeEnabled) {
      return;
    }
    const meta = this._treeMeta.get(row);
    if (!meta || !meta.hasChildren) {
      return;
    }
    meta.expanded = !meta.expanded;
    this._rebuildTreeRendered();
  }

  onTreeToggle(row: T, event?: MouseEvent): void {
    event?.stopPropagation();
    this.toggleRow(row);
  }

  /* ------- selection helpers ------- */

  isRowSelected(row: T): boolean {
    return this._selection.has(row);
  }

  getRowChecked(row: T): boolean {
    if (!this.treeEnabled) {
      return this.isRowSelected(row);
    }

    const descendants = this._getTreeDescendants(row);
    if (!descendants.length) {
      return this.isRowSelected(row);
    }

    const total = descendants.length;
    const selectedChildren = descendants.filter((child) => this._selection.has(child)).length;

    const allChildrenSelected = total > 0 && selectedChildren === total;
    const anyChildrenSelected = selectedChildren > 0;

    if (allChildrenSelected && this._selection.has(row)) {
      return true;
    }
    if (anyChildrenSelected && !allChildrenSelected) {
      return false;
    }

    return this._selection.has(row);
  }

  getRowIndeterminate(row: T): boolean {
    if (!this.treeEnabled) {
      return false;
    }

    const descendants = this._getTreeDescendants(row);
    if (!descendants.length) {
      return false;
    }

    const total = descendants.length;
    const selectedChildren = descendants.filter((child) => this._selection.has(child)).length;

    const allChildrenSelected = total > 0 && selectedChildren === total;
    const anyChildrenSelected = selectedChildren > 0;

    return anyChildrenSelected && !allChildrenSelected;
  }

  get selectedRows(): T[] {
    return Array.from(this._selection);
  }

  get allVisibleSelected(): boolean {
    if (!this.selectionMode || !this.renderedData.length) {
      return false;
    }
    return this.renderedData.every((row) => this.getRowChecked(row));
  }

  get someVisibleSelected(): boolean {
    if (!this.selectionMode || !this.renderedData.length) {
      return false;
    }

    const anySelected = this.renderedData.some(
      (row) => this.getRowChecked(row) || this.getRowIndeterminate(row),
    );
    return anySelected && !this.allVisibleSelected;
  }

  private _emitSelectionChange(lastChanged: T | null): void {
    if (!this.selectionMode) {
      return;
    }
    this.selectionChange.emit({ selected: this.selectedRows, lastChanged });
  }

  private _selectSingle(row: T): void {
    this._selection.clear();
    this._selection.add(row);
    this._emitSelectionChange(row);
  }

  private _toggleMultiple(row: T): void {
    if (this._selection.has(row)) {
      this._selection.delete(row);
    } else {
      this._selection.add(row);
    }
    this._emitSelectionChange(row);
  }

  private _setBranchSelection(row: T, selected: boolean): void {
    if (!this.treeEnabled) {
      if (selected) {
        this._selection.add(row);
      } else {
        this._selection.delete(row);
      }
      return;
    }

    const allRows = [row, ...this._getTreeDescendants(row)];
    if (selected) {
      allRows.forEach((r) => this._selection.add(r));
    } else {
      allRows.forEach((r) => this._selection.delete(r));
    }
  }

  private _syncSelectionUpwardsFrom(row: T): void {
    if (!this.treeEnabled) {
      return;
    }

    let current = this._treeMeta.get(row)?.parent ?? null;

    while (current) {
      const descendants = this._getTreeDescendants(current);
      if (!descendants.length) {
        current = this._treeMeta.get(current)?.parent ?? null;
        continue;
      }

      const total = descendants.length;
      const selectedChildren = descendants.filter((child) => this._selection.has(child)).length;

      if (selectedChildren === 0) {
        this._selection.delete(current);
      } else if (selectedChildren === total) {
        this._selection.add(current);
      } else {
        this._selection.delete(current);
      }

      current = this._treeMeta.get(current)?.parent ?? null;
    }
  }

  onRowSelectionToggle(row: T): void {
    if (!this.selectionMode) {
      return;
    }

    if (this.selectionMode === 'single') {
      this._selectSingle(row);
      return;
    }

    if (this.treeEnabled) {
      const hasChild = this.hasChildren(row);

      if (hasChild) {
        const currentlyChecked = this.getRowChecked(row);
        this._setBranchSelection(row, !currentlyChecked);
      } else {
        if (this._selection.has(row)) {
          this._selection.delete(row);
        } else {
          this._selection.add(row);
        }
      }

      this._syncSelectionUpwardsFrom(row);
      this._emitSelectionChange(row);
    } else {
      this._toggleMultiple(row);
    }
  }

  onToggleAllVisible(): void {
    if (this.selectionMode !== 'multiple') {
      return;
    }

    const shouldSelect = !this.allVisibleSelected;

    if (this.treeEnabled) {
      const roots = this.renderedData.filter((row) => this.getRowLevel(row) === 0);

      roots.forEach((row) => {
        this._setBranchSelection(row, shouldSelect);
        this._syncSelectionUpwardsFrom(row);
      });
    } else {
      if (shouldSelect) {
        this.renderedData.forEach((row) => this._selection.add(row));
      } else {
        this.renderedData.forEach((row) => this._selection.delete(row));
      }
    }

    this._emitSelectionChange(null);
  }

  clearSelection(): void {
    this._selection.clear();
    this._emitSelectionChange(null);
  }

  private _reconcileSelectionWithData(): void {
    if (!this.selectionMode) {
      return;
    }

    const all = this._getAllDataRows();
    if (!all.length) {
      if (this._selection.size) {
        this._selection.clear();
        this._emitSelectionChange(null);
      }
      return;
    }

    const validSet = new Set(all);
    const newSelection = new Set<T>();
    this._selection.forEach((row) => {
      if (validSet.has(row)) {
        newSelection.add(row);
      }
    });

    if (newSelection.size !== this._selection.size) {
      this._selection = newSelection;
      this._emitSelectionChange(null);
    }
  }

  private _reconcileExpandedWithData(): void {
    if (!this.hasExpandableRow) {
      return;
    }

    const all = this._getAllDataRows();
    if (!all.length) {
      if (this._expanded.size) {
        const prev = Array.from(this._expanded);
        this._expanded.clear();
        prev.forEach((r) => this.rowExpandChange.emit({ row: r, expanded: false }));
        this.expandedRowsChange.emit(this.getExpandedRows());
      }
      return;
    }

    const validSet = new Set(all);
    const prev = new Set(this._expanded);

    const next = new Set<T>();
    this._expanded.forEach((row) => {
      if (validSet.has(row)) {
        next.add(row);
      }
    });

    prev.forEach((row) => {
      if (!next.has(row)) {
        this.rowExpandChange.emit({ row, expanded: false });
      }
    });

    if (next.size !== this._expanded.size) {
      this._expanded = next;
      this.expandedRowsChange.emit(this.getExpandedRows());
    }
  }

  private _getAllDataRows(): T[] {
    if (this.treeEnabled && this._treeRoots.length) {
      const result: T[] = [];
      const visit = (row: T): void => {
        result.push(row);
        this._getTreeChildren(row).forEach(visit);
      };
      this._treeRoots.forEach(visit);
      return result;
    }

    if (this.dataSource instanceof IGridDataSource) {
      return this.dataSource.data;
    }
    if (Array.isArray(this.dataSource)) {
      return this.dataSource;
    }
    return [];
  }

  /* ------- multi sort helpers ------- */

  getColumnDirection(columnId: string): ISortDirection {
    const found = this.sortStates.find((s) => s.active === columnId);
    return found ? found.direction : '';
  }

  sort(column: IGridColumnLike<any>): void {
    if (!(this.dataSource instanceof IGridDataSource)) {
      return;
    }

    const columnId = column.fieldName;
    if (!columnId) {
      return;
    }

    const index = this.sortStates.findIndex((s) => s.active === columnId);

    if (index === -1) {
      this.sortStates.push({ active: columnId, direction: 'asc' });
    } else {
      const current = this.sortStates[index];
      if (current.direction === 'asc') {
        current.direction = 'desc';
      } else if (current.direction === 'desc') {
        this.sortStates.splice(index, 1);
      } else {
        current.direction = 'asc';
      }
    }

    this._applySortToDataSource();
  }

  private _applySortToDataSource(): void {
    if (!(this.dataSource instanceof IGridDataSource)) {
      return;
    }

    if (!this.sortStates.length) {
      this.dataSource.sort = null;
      return;
    }

    this.dataSource.sort = this.sortStates.map((s) => ({
      active: s.active,
      direction: s.direction,
    }));
  }

  /* ------- column width / flex API (UPDATED) ------- */

  getColumnWidth(column: IGridColumnLike<any>): number | null {
    const mode = this._getSizingMode(column);

    // fill columns have no fixed px width
    if (mode === 'fill') {
      return null;
    }

    const override = this._columnWidths.get(column);
    if (typeof override === 'number') {
      return override;
    }

    if (typeof column.width === 'number') {
      return column.width;
    }

    // if column.width is 'fill' but mode is fixed, we still need a px
    return this._defaultColumnWidth;
  }

  getColumnFlex(column: IGridColumnLike<any>): string {
    const mode = this._getSizingMode(column);

    if (mode === 'fill') {
      return '1 1 0';
    }

    const px = this.getColumnWidth(column);
    return `0 0 ${px ?? this._defaultColumnWidth}px`;
  }

  /**
   * Resizing converts fill -> fixed.
   * This is the core of your handle rules.
   */
  setColumnWidth(column: IGridColumnLike<any>, width: number): void {
    if (!column) {
      return;
    }

    const w = Math.max(50, Math.round(width));

    this._columnWidths.set(column, w);

    // ✅ if it was fill, it becomes fixed after user resizes
    if (this._getSizingMode(column) === 'fill') {
      this._sizingMode.set(column, 'fixed');
    }
  }

  /* ------- frozen column helpers ------- */

  private _getFrozenEndIndex(): number {
    for (let i = this.columns.length - 1; i >= 0; i--) {
      if (this.columns[i].freeze) {
        return i;
      }
    }
    return -1;
  }

  get hasFrozenColumns(): boolean {
    return this._getFrozenEndIndex() >= 0;
  }

  isColumnFrozen(column: IGridColumnLike<any>): boolean {
    const endIndex = this._getFrozenEndIndex();
    if (endIndex < 0) {
      return false;
    }

    const idx = this.columns.indexOf(column);
    if (idx === -1) {
      return false;
    }

    return idx <= endIndex;
  }

  getColumnStickyLeft(column: IGridColumnLike<any>): number | null {
    if (!this.isColumnFrozen(column)) {
      return null;
    }

    const endIndex = this._getFrozenEndIndex();
    if (endIndex < 0) {
      return null;
    }

    const idx = this.columns.indexOf(column);
    if (idx === -1 || idx > endIndex) {
      return null;
    }

    let left = 0;
    left += this._getSpecialColumnsLeftOffset();

    for (let i = 0; i < idx; i++) {
      const col = this.columns[i];
      if (!this.isColumnFrozen(col)) {
        continue;
      }

      const w = this.getColumnWidth(col);
      if (w === null) {
        // If you ever freeze a fill column, sticky math becomes undefined.
        return null;
      }
      left += w;
    }

    return left;
  }

  private _getSpecialColumnsLeftOffset(options?: {
    includeNumber?: boolean;
    includeExpand?: boolean;
    includeTree?: boolean;
    includeSelection?: boolean;
  }): number {
    const includeNumber = options?.includeNumber ?? true;
    const includeExpand = options?.includeExpand ?? true;
    const includeTree = options?.includeTree ?? true;
    const includeSelection = options?.includeSelection ?? true;

    let left = 0;

    const hasSelectionColumn = this.treeEnabled
      ? this.selectionMode === 'multiple'
      : !!this.selectionMode;

    if (includeSelection && hasSelectionColumn) {
      left += this.selectionColumnWidth;
    }

    if (includeTree && this.treeEnabled) {
      left += this.treeColumnWidthEffective;
    }

    if (includeExpand && this.hasExpandableRow) {
      left += this.expandColumnWidth;
    }

    if (includeNumber && this.showNumberColumnEffective) {
      const width = this.getColumnWidth(this.numberColumn);
      if (width !== null) {
        left += width;
      }
    }

    return left;
  }

  getStickyLeftForTreeColumn(): number {
    return this._getSpecialColumnsLeftOffset({
      includeSelection: false,
      includeTree: false,
      includeExpand: false,
      includeNumber: false,
    });
  }

  getStickyLeftForExpandColumn(): number {
    return this._getSpecialColumnsLeftOffset({
      includeSelection: false,
      includeTree: true,
      includeExpand: false,
      includeNumber: false,
    });
  }

  getStickyLeftForSelectionColumn(): number {
    return this._getSpecialColumnsLeftOffset({
      includeSelection: false,
      includeTree: true,
      includeExpand: true,
      includeNumber: false,
    });
  }

  getStickyLeftForNumberColumn(): number {
    return this._getSpecialColumnsLeftOffset({
      includeSelection: true,
      includeTree: true,
      includeExpand: true,
      includeNumber: false,
    });
  }

  /* ------- paginator proxies ------- */

  get hasPagination(): boolean {
    if (this.treeEnabled) {
      return false;
    }
    return this.dataSource instanceof IGridDataSource && this.dataSource.paginatorEnabled;
  }

  get totalLength(): number {
    if (this.dataSource instanceof IGridDataSource) {
      return this.dataSource.length;
    }
    return this.renderedData.length;
  }

  get pageIndex(): number {
    if (this.dataSource instanceof IGridDataSource) {
      return this.dataSource.pageIndex;
    }
    return 0;
  }

  get pageSize(): number {
    if (this.dataSource instanceof IGridDataSource) {
      return this.dataSource.pageSize;
    }
    return 0;
  }

  get pageSizeOptions(): number[] {
    if (this.dataSource instanceof IGridDataSource) {
      return this.dataSource.pageSizeOptions;
    }
    return [];
  }

  onPageChange(event: { pageIndex: number; pageSize: number }): void {
    if (!(this.dataSource instanceof IGridDataSource)) {
      return;
    }
    this.dataSource.paginator = { pageIndex: event.pageIndex, pageSize: event.pageSize };
  }

  /* ------- lifecycle ------- */

  ngAfterContentInit(): void {
    this._rebuildColumns();
    this.columnDefs.changes.subscribe(() => this._rebuildColumns());
    this.customColumnDefs.changes.subscribe(() => this._rebuildColumns());

    this._connectData();
    this._applyExistingDataSourceSort();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('dataSource' in changes && !changes['dataSource'].firstChange) {
      this._connectData();
      this._applyExistingDataSourceSort();
    }

    if (
      'selectionMode' in changes &&
      changes['selectionMode'].previousValue !== changes['selectionMode'].currentValue
    ) {
      this.clearSelection();
    }

    if ('tree' in changes && !changes['tree'].firstChange) {
      this._connectData();
    }

    if (
      'treeInitialExpandLevel' in changes &&
      !changes['treeInitialExpandLevel'].firstChange &&
      this.treeEnabled
    ) {
      this._connectData();
    }
  }

  ngOnDestroy(): void {
    this._dataSub?.unsubscribe();
    if (this.dataSource instanceof IGridDataSource) {
      this.dataSource.disconnect();
    }
  }

  private _applyExistingDataSourceSort(): void {
    if (!(this.dataSource instanceof IGridDataSource)) {
      this.sortStates = [];
      return;
    }

    const sort = this.dataSource.sort;

    if (!sort || sort.length === 0) {
      this.sortStates = [];
      return;
    }

    this.sortStates = sort.map((s) => ({ active: s.active, direction: s.direction }));
  }

  private _rebuildColumns(fromDataChange = false): void {
    const projectedDataCols = this.columnDefs?.toArray?.() ?? [];
    const customCols = this.customColumnDefs?.toArray?.() ?? [];

    let dataCols: IGridColumnLike<T>[] = [];

    if (projectedDataCols.length > 0) {
      dataCols = projectedDataCols;
    } else {
      if (fromDataChange || !this.columns.length) {
        dataCols = this._buildAutoColumnsFromData();
      } else {
        dataCols = this.columns.filter((c) => !(c instanceof IGridCustomColumn));
      }
    }

    this.columns = [...dataCols, ...customCols];

    // initialize fixed widths for fixed-mode columns (but do NOT force widths for fill columns)
    this.columns.forEach((col) => {
      const mode = this._getSizingMode(col);
      if (mode === 'fixed' && !this._columnWidths.has(col)) {
        const px = this.getColumnWidth(col);
        if (px !== null) {
          this._columnWidths.set(col, px);
        }
      }
    });

    if (this.showNumberColumnEffective) {
      const numCol = this.numberColumn;
      if (!this._columnWidths.has(numCol)) {
        const px = this.getColumnWidth(numCol);
        if (px !== null) {
          this._columnWidths.set(numCol, px);
        }
      }
    }
  }

  private _buildAutoColumnsFromData(): IGridColumnLike<T>[] {
    const rows = this._getAllDataRows();
    if (!rows.length) {
      return [];
    }

    const first = rows[0] as any;
    if (first === null || typeof first !== 'object') {
      return [];
    }

    const keys = Object.keys(first);

    return keys.map((key) => ({
      fieldName: key,
      title: key,
      sortable: true,
      resizable: true,
      width: 'fill',
      freeze: false,
      headerDef: undefined,
      cellDef: undefined,
      isAuto: true,
    }));
  }

  private _updateCurrentFilterText(): void {
    this.currentFilterText =
      this.dataSource instanceof IGridDataSource ? this.dataSource.filter : '';
  }

  private _connectData(): void {
    this._dataSub?.unsubscribe();

    if (this.treeEnabled) {
      if (this.dataSource instanceof IGridDataSource) {
        this._dataSub = this.dataSource.connect().subscribe((data) => {
          const roots = data || [];
          this._buildTreeMeta(roots);
          this._rebuildTreeRendered();
          this._rebuildColumns(true);
        });
        return;
      }

      if (Array.isArray(this.dataSource)) {
        const roots = this.dataSource;
        this._buildTreeMeta(roots);
        this._rebuildTreeRendered();
        this._rebuildColumns(true);
        return;
      }

      this.renderedData = [];
      this._reconcileSelectionWithData();
      this._reconcileExpandedWithData();
      this._rebuildColumns(true);
      this._updateCurrentFilterText();
      return;
    }

    if (this.dataSource instanceof IGridDataSource) {
      this._dataSub = this.dataSource.connect().subscribe((data) => {
        this.renderedData = data || [];
        this._reconcileSelectionWithData();
        this._reconcileExpandedWithData();
        this._rebuildColumns(true);
        this._updateCurrentFilterText();
      });
      return;
    }

    if (Array.isArray(this.dataSource)) {
      this.renderedData = this.dataSource;
      this._reconcileSelectionWithData();
      this._reconcileExpandedWithData();
      this._rebuildColumns(true);
      this._updateCurrentFilterText();
      return;
    }

    this.renderedData = [];
    this._reconcileSelectionWithData();
    this._reconcileExpandedWithData();
    this._rebuildColumns(true);
    this._updateCurrentFilterText();
  }

  /* ------- row click ------- */

  onRowClicked(row: T): void {
    this.rowClick.emit(row);
  }

  /* ------- template helpers ------- */

  get singleSelectionName(): string {
    return `i-grid-radio-${this._id}`;
  }

  getRowNumber(visibleRowIndex: number): number {
    if (this.dataSource instanceof IGridDataSource && this.hasPagination) {
      return this.pageIndex * this.pageSize + visibleRowIndex + 1;
    }
    return visibleRowIndex + 1;
  }

  getFrozenColumnZ(column: IGridColumnLike<any>): number {
    const endIndex = this._getFrozenEndIndex();
    if (endIndex < 0) {
      return 2;
    }

    const idx = this.columns.indexOf(column);
    if (idx === -1) {
      return 2;
    }

    const base = 20;
    return base + (endIndex - idx);
  }
}

/* ----------------------------------------------------
 * EXPORT GROUP
 * ---------------------------------------------------- */

export const I_GRID_DECLARATIONS = [
  IGrid,
  IGridColumn,
  IGridCustomColumn,
  IGridHeaderCellDefDirective,
  IGridCellDefDirective,
  IGridRowDefDirective,
  IGridExpandableRow,
  IGridHeaderCell,
  IGridCell,
  IGridHeaderRowDirective,
  IGridRowDirective,
];

@NgModule({
  imports: [
    IGrid,
    IGridColumn,
    IGridCustomColumn,
    IGridHeaderCellDefDirective,
    IGridCellDefDirective,
    IGridRowDefDirective,
    IGridExpandableRow,
    IGridHeaderCell,
    IGridCell,
    IGridHeaderRowDirective,
    IGridRowDirective,
    IPaginator,
  ],
  exports: [
    IGrid,
    IGridColumn,
    IGridCustomColumn,
    IGridHeaderCellDefDirective,
    IGridCellDefDirective,
    IGridRowDefDirective,
    IGridExpandableRow,
    IGridHeaderCell,
    IGridCell,
    IGridHeaderRowDirective,
    IGridRowDirective,
    IPaginator,
  ],
})
export class IGridModule {}
