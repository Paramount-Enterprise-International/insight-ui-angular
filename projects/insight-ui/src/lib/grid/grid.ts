/* grid.ts */
/**
 * IGrid
 * Version: 1.22.0
 *
 * - Observable-based data source via IGridDataSource.data$
 * - Tree view support via [tree] input
 * - Tree selection with parent/children cascade + indeterminate
 * - Tree + multiple selection: checkbox is rendered in dedicated tree column
 * - Tree initial auto-expansion via [treeInitialExpandLevel]
 * - IGridDataSource.filter supports:
 *    - string
 *    - { recursive: true, text: string, key?: string } for recursive tree filter
 * - Highlighting of filter text via HighlightSearchPipe for default cells
 */

import { NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
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
  Optional,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  booleanAttribute,
} from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { IButton } from '../button/button';
import { IIcon } from '../icon/icon';
import { IPaginator } from './paginator';
import { IHighlightSearchPipe } from '../highlight-search.pipe';

/* ----------------------------------------------------
 * SORT TYPES
 * ---------------------------------------------------- */

export type ISortDirection = 'asc' | 'desc' | '';

export interface ISortState {
  active: string;
  direction: ISortDirection;
}

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

export interface IGridDataSourceConfig<T = any> {
  sort?: ISortConfig;
  filter?: IGridFilter;

  /**
   * paginator:
   * - false → disabled
   * - undefined/missing → enabled with defaults
   * - { pageIndex?, pageSize?, pageSizeOptions? } → enabled + overridden
   */
  paginator?: IGridPaginatorInput;
}

/* ----------------------------------------------------
 * SELECTION TYPES
 * ---------------------------------------------------- */

export type IGridSelectionMode = false | 'single' | 'multiple';

export interface IGridSelectionChange<T = any> {
  selected: T[];
  lastChanged: T | null;
}

/* ----------------------------------------------------
 * COLUMN WIDTH TYPES
 * ---------------------------------------------------- */

export type IGridColumnWidth = number | 'fill';

/* ----------------------------------------------------
 * COLUMN-LIKE INTERFACE (manual + auto + custom)
 * ---------------------------------------------------- */

export interface IGridColumnLike<T = any> {
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
}

/* ----------------------------------------------------
 * DATASOURCE
 * ---------------------------------------------------- */

export class IGridDataSource<T = any> {
  private readonly _renderedData$ = new BehaviorSubject<T[]>([]);

  private _rawData: T[] = [];

  // filter internal state
  private _filter: string = '';
  private _recursive: boolean = false;
  private _childrenKey: string = 'children';

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
    if (config.filter != null) {
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
    if (!this._paginatorEnabled || !state) return;

    this._pageIndex = state.pageIndex;
    this._pageSize = state.pageSize;
    this._update();
  }

  get paginator(): { pageIndex: number; pageSize: number } | null {
    if (!this._paginatorEnabled) return null;
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
    if (!filter) return true;
    const target = JSON.stringify(data).toLowerCase();
    return target.includes(filter);
  };

  // can be customized by consumer
  sortAccessor: (data: T, columnId: string) => string | number | null | undefined = (
    data: any,
    columnId: string
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
    if (!filter) return true;
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
      if (pruned != null) {
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
      if (clone.hasOwnProperty(this._childrenKey)) {
        delete clone[this._childrenKey];
      }
    }

    return clone;
  }

  /* -------- internal sort normalize -------- */

  private _normalizeSort(sort: ISortConfig): ISortState[] | null {
    if (!sort) return null;

    const arr: ISortState[] = Array.isArray(sort) ? sort : [sort];

    const cleaned = arr.filter(
      (s): s is ISortState =>
        !!s && typeof s.active === 'string' && (s.direction === 'asc' || s.direction === 'desc')
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

    // SORT (multi-column) — applies on the filtered/pruned roots
    if (this._sort && this._sort.length > 0) {
      const sorts = [...this._sort];

      data.sort((a: T, b: T) => {
        for (const sort of sorts) {
          const { active, direction } = sort;
          if (!active || !direction) continue;

          const dir = direction === 'asc' ? 1 : -1;
          const aValue = this.sortAccessor(a, active);
          const bValue = this.sortAccessor(b, active);

          if (aValue == null && bValue == null) continue;
          if (aValue == null) return -1 * dir;
          if (bValue == null) return 1 * dir;

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
  constructor(public readonly template: TemplateRef<any>) {}
}

@Directive({
  selector: '[iCellDef]',
  standalone: true,
})
export class IGridCellDefDirective {
  constructor(public readonly template: TemplateRef<any>) {}
}

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
  /** Row property name, e.g. "fullName" – REQUIRED, must exist on datasource. */
  @Input({ required: true }) fieldName!: string;

  /** Header text if you don't use iHeaderCellDef */
  @Input() title: string = '';

  /** Per-column sort control */
  @Input() sortable: boolean = true;

  /** Per-column resize control */
  @Input() resizable: boolean = true;

  /**
   * Column width:
   * - number => fixed px
   * - "fill" => flex-fill
   * - undefined => default fixed width (grid-level)
   */
  @Input() width?: IGridColumnWidth;

  /**
   * Freeze block always starts from the first column.
   * Mark the last frozen column with [freeze].
   */
  @Input({ transform: booleanAttribute }) freeze: boolean = false;

  /**
   * Projected templates
   */
  @ContentChild(IGridHeaderCellDefDirective, { read: TemplateRef })
  headerDef?: TemplateRef<any>;

  @ContentChild(IGridCellDefDirective, { read: TemplateRef })
  cellDef?: TemplateRef<any>;

  // manual columns are not auto
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
  /** Custom header title (e.g. "Actions") */
  @Input() title: string = '';

  /** Custom columns are not sortable by default */
  @Input() sortable: boolean = false;

  /** Per-column resize control */
  @Input() resizable: boolean = true;

  @Input() width?: IGridColumnWidth;

  @Input({ transform: booleanAttribute }) freeze: boolean = false;

  // For custom column there is normally no fieldName
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
  template: ` <ng-content></ng-content> `,
})
export class IGridCell {
  /** Column instance (set automatically by grid OR injected from host column) */
  @Input() column?: IGridColumnLike<any>;

  /** Optional fixed width (px) – used for selection column, etc. */
  @Input() fixedWidth?: number;

  constructor(
    @Optional() @Host() private hostDataColumn: IGridColumn<any> | null,
    @Optional() @Host() private hostCustomColumn: IGridCustomColumn<any> | null,
    @Optional() private grid: IGrid<any> | null
  ) {}

  private get _column(): IGridColumnLike<any> | null {
    return this.column ?? this.hostDataColumn ?? this.hostCustomColumn ?? null;
  }

  /* flex sizing */
  @HostBinding('style.flex')
  get flex(): string {
    if (typeof this.fixedWidth === 'number') {
      return `0 0 ${this.fixedWidth}px`;
    }

    const col = this._column;
    if (!this.grid || !col) return '1 1 0';

    return this.grid.getColumnFlex(col);
  }

  /* frozen (sticky) behaviour */

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
    if (!this._isFrozen || !this.grid || !this._column) return null;
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
      <ng-content></ng-content>
    </span>

    @if (showIcon) {
    <span class="i-grid-header-cell__icon">
      <ic [icon]="iconName" size="sm"></ic>
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
  /** Column instance (set automatically by grid OR injected from host column) */
  @Input() column?: IGridColumnLike<any>;

  /** Optional fixed width (px) – used for selection column, etc. */
  @Input() fixedWidth?: number;

  private _isResizing = false;
  private _startX = 0;
  private _startWidth = 0;
  private readonly _minWidth = 50;

  constructor(
    private el: ElementRef<HTMLElement>,
    @Optional() private grid: IGrid<any> | null,
    @Optional() @Host() private hostDataColumn: IGridColumn<any> | null,
    @Optional() @Host() private hostCustomColumn: IGridCustomColumn<any> | null
  ) {}

  private get _column(): IGridColumnLike<any> | null {
    return this.column ?? this.hostDataColumn ?? this.hostCustomColumn ?? null;
  }

  private get _columnId(): string | null {
    const col = this._column;
    return col?.fieldName ?? null;
  }

  private get _direction(): ISortDirection {
    if (!this.grid || !this._columnId) return '';
    return this.grid.getColumnDirection(this._columnId);
  }

  private get _sortableFlag(): boolean {
    const col = this._column;
    if (!col) return false;
    // only sortable when fieldName is present
    return col.sortable !== false && !!col.fieldName;
  }

  get resizable(): boolean {
    const col = this._column;
    if (!col) return false;
    return col.resizable !== false;
  }

  /** width */

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

  /** sorting classes */

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

  /** frozen (sticky) behaviour */

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
    if (!this._isFrozen || !this.grid || !this._column) return null;
    return this.grid.getColumnStickyLeft(this._column);
  }

  @HostBinding('style.zIndex')
  get stickyZ(): number | null {
    if (!this._isFrozen || !this.grid || !this._column) return null;
    return this.grid.getFrozenColumnZ(this._column);
  }

  /** events */
  @HostListener('click')
  onClick(): void {
    // if we just resized, ignore click (to avoid accidental sort)
    if (this._isResizing) return;

    const col = this._column;
    if (!this.grid || !this._sortableFlag || !col) return;
    this.grid.sort(col);
  }

  onResizeMouseDown(event: MouseEvent): void {
    const col = this._column;
    if (!this.grid || !col || !this.resizable) return;

    event.stopPropagation();
    event.preventDefault();

    this._isResizing = true;
    this._startX = event.clientX;

    const currentWidth = this.grid.getColumnWidth(col) ?? this.el.nativeElement.offsetWidth;

    this._startWidth = currentWidth;
  }

  @HostListener('document:mousemove', ['$event'])
  onDocumentMouseMove(event: MouseEvent): void {
    const col = this._column;
    if (!this._isResizing || !this.grid || !col) return;

    const delta = event.clientX - this._startX;
    let newWidth = this._startWidth + delta;

    if (newWidth < this._minWidth) {
      newWidth = this._minWidth;
    }

    this.grid.setColumnWidth(col, newWidth);
  }

  @HostListener('document:mouseup')
  onDocumentMouseUp(): void {
    if (!this._isResizing) return;

    setTimeout(() => {
      this._isResizing = false;
    }, 0);
  }
}

/* ----------------------------------------------------
 * GRID COMPONENT
 * ---------------------------------------------------- */

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
  ],
  templateUrl: './grid.html',
  exportAs: 'iGrid',
  host: {
    class: 'i-grid',
    role: 'table',
  },
})
export class IGrid<T> implements AfterContentInit, OnChanges, OnDestroy {
  @Input() dataSource!: IGridDataSource<T> | T[];

  /** Row selection mode */
  @Input() selectionMode: IGridSelectionMode = false;

  /** Sticky header (position: sticky inside viewport) */
  @Input() stickyHeader: boolean | '' = false;

  /** Offset from top when sticky, in px (for fixed navbar etc.) */
  @Input() stickyHeaderOffset = 0;

  /**
   * Scrollable body:
   * - bodyHeight: fixed viewport height (px)
   * - bodyMaxHeight: max viewport height (px)
   * If both undefined, grid grows naturally (no internal vertical scroll).
   */
  @Input() bodyHeight?: number;
  @Input() bodyMaxHeight?: number;

  /**
   * Tree mode:
   * - false / null / undefined → flat mode
   * - true / "" / "children" → tree, children key = "children"
   * - "nodes" → tree, children key = "nodes"
   *
   * Example:
   *   <i-grid [dataSource]="rows" tree></i-grid>            // children = "children"
   *   <i-grid [dataSource]="rows" tree="children"></i-grid> // children = "children"
   *   <i-grid [dataSource]="rows" tree="nodes"></i-grid>    // children = "nodes"
   */
  @Input() tree: string | boolean | null = null;

  /** Indent per tree level (px) */
  @Input() treeIndent: number = 16;

  /**
   * Initial auto-expand level for tree mode (1-based):
   * - 1 → expand level 1 (roots), so their children are visible
   * - 2 → expand level 1 and 2, so grandchildren are visible, etc.
   * - null / <= 0 → no auto-expansion
   */
  @Input() treeInitialExpandLevel: number | null = null;

  /**
   * Show auto number column (1-based).
   * Placed after selection + tree column (if any).
   *
   * NOTE: In tree mode, this is disabled by default via showNumberColumnEffective.
   */
  @Input({ transform: booleanAttribute }) showNumberColumn: boolean = true;

  /** Effective flag for number column – disabled by default in tree mode. */
  get showNumberColumnEffective(): boolean {
    if (this.treeEnabled) {
      // default: no auto number column when in tree mode
      return false;
    }
    return this.showNumberColumn;
  }

  /** Emits whenever selection changes */
  @Output() selectionChange = new EventEmitter<IGridSelectionChange<T>>();

  /** Emits on row click (before selection logic) */
  @Output() rowClick = new EventEmitter<T>();

  /** Data columns projected as <i-grid-column> */
  @ContentChildren(IGridColumn)
  columnDefs!: QueryList<IGridColumn<T>>;

  /** Custom columns projected as <i-grid-custom-column> */
  @ContentChildren(IGridCustomColumn)
  customColumnDefs!: QueryList<IGridCustomColumn<T>>;

  /** Concrete array used in template loops (data + custom, or auto + custom) */
  columns: IGridColumnLike<T>[] = [];

  renderedData: T[] = [];

  // current normalized filter text (for highlight pipe)
  currentFilterText: string = '';

  // multi-column sort
  sortStates: ISortState[] = [];

  // column widths (px), key = column instance (resized or numeric/default)
  private _columnWidths = new Map<IGridColumnLike<any>, number>();

  private _dataSub?: Subscription;

  // selection
  private _selection = new Set<T>();

  private readonly _id = Math.random().toString(36).slice(2);

  /** default width (px) when column.width is undefined */
  private readonly _defaultColumnWidth = 200;

  /** special widths (px) for selection + number + tree columns */
  readonly selectionColumnWidth = 28;
  readonly numberColumnWidth = 60;
  readonly treeColumnWidth = 52;

  /** internal auto-number column object (not part of columns[]) */
  private _numberColumnInternal?: IGridColumnLike<T>;

  // ---------- TREE: internal state ----------

  /**
   * Map of row → metadata:
   * - level: depth (0 = root)
   * - parent: parent row or null
   * - hasChildren: whether children array is non-empty
   * - expanded: expanded state (controls visibility of descendants)
   */
  private _treeMeta = new Map<
    T,
    { level: number; parent: T | null; hasChildren: boolean; expanded: boolean }
  >();

  /** Top-level rows in tree mode */
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

  // CSS custom prop used by CSS: var(--i-grid-sticky-top)
  @HostBinding('style.--i-grid-sticky-top')
  get stickyTopVar(): string | null {
    return this.stickyHeader ? `${this.stickyHeaderOffset}px` : null;
  }

  /* ------- TREE helpers (config) ------- */

  /** Is tree mode enabled? */
  get treeEnabled(): boolean {
    return this.tree !== null && this.tree !== false;
  }

  /** Resolved children key for tree rows (e.g. "children", "nodes") */
  get treeChildrenKey(): string {
    if (!this.treeEnabled) return 'children';

    if (this.tree === true) return 'children';
    if (typeof this.tree === 'string') {
      const t = this.tree.trim();
      if (!t || t === 'true') return 'children';
      return t;
    }

    return 'children';
  }

  /** Resolved internal (0-based) max level for auto expansion, or null for none. */
  private _getInitialExpandLevelInternal(): number | null {
    if (!this.treeEnabled) return null;
    if (this.treeInitialExpandLevel == null) return null;
    const n = Number(this.treeInitialExpandLevel);
    if (!Number.isFinite(n) || n <= 0) return null;
    return n - 1; // convert 1-based public → 0-based internal
  }

  /** Should a row at given level start expanded (for tree mode)? */
  private _shouldRowStartExpanded(level: number, hasChildren: boolean): boolean {
    if (!hasChildren) return false;
    const max = this._getInitialExpandLevelInternal();
    if (max == null) return false;
    return level <= max;
  }

  /** Read children from row using configured children key */
  private _getTreeChildren(row: T): T[] {
    if (!this.treeEnabled || !row) return [];
    const anyRow: any = row;
    const value = anyRow?.[this.treeChildrenKey];
    return Array.isArray(value) ? value : [];
  }

  /** Get all descendants (deep) for a given row. */
  private _getTreeDescendants(row: T): T[] {
    const result: T[] = [];
    const visit = (r: T) => {
      const children = this._getTreeChildren(r);
      for (const child of children) {
        result.push(child);
        visit(child);
      }
    };
    visit(row);
    return result;
  }

  /** Build tree metadata from raw hierarchical data */
  private _buildTreeMeta(data: T[]): void {
    this._treeMeta.clear();
    this._treeRoots = [];

    if (!Array.isArray(data)) return;

    const visit = (row: T, level: number, parent: T | null) => {
      const children = this._getTreeChildren(row);
      const hasChildren = children.length > 0;
      const expanded = this._shouldRowStartExpanded(level, hasChildren);

      if (parent === null) {
        this._treeRoots.push(row);
      }

      this._treeMeta.set(row, {
        level,
        parent,
        hasChildren,
        expanded,
      });

      children.forEach((child) => visit(child, level + 1, row));
    };

    data.forEach((root) => visit(root, 0, null));
  }

  /** Rebuild flat renderedData based on expansion state */
  private _rebuildTreeRendered(): void {
    if (!this.treeEnabled) return;

    const result: T[] = [];

    const appendVisible = (row: T) => {
      result.push(row);
      const meta = this._treeMeta.get(row);
      if (!meta?.expanded) return;

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
    this._updateCurrentFilterText();
  }

  /** Tree: row level (0-based) */
  getRowLevel(row: T): number {
    if (!this.treeEnabled) return 0;
    return this._treeMeta.get(row)?.level ?? 1;
  }

  /** Tree: does the row have children? */
  hasChildren(row: T): boolean {
    if (!this.treeEnabled) return false;
    return this._treeMeta.get(row)?.hasChildren ?? false;
  }

  /** Tree: expanded state */
  isExpanded(row: T): boolean {
    if (!this.treeEnabled) return false;
    return this._treeMeta.get(row)?.expanded ?? false;
  }

  /** Toggle raw expanded/collapsed */
  toggleRow(row: T): void {
    if (!this.treeEnabled) return;

    const meta = this._treeMeta.get(row);
    if (!meta || !meta.hasChildren) return;

    meta.expanded = !meta.expanded;
    this._rebuildTreeRendered();
  }

  /** Handler to use from template (stopping click bubbling) */
  onTreeToggle(row: T, event?: MouseEvent): void {
    event?.stopPropagation();
    this.toggleRow(row);
  }

  /* ------- selection helpers ------- */

  isRowSelected(row: T): boolean {
    return this._selection.has(row);
  }

  /** Returns visual "checked" state for a row's checkbox (tree-aware). */
  getRowChecked(row: T): boolean {
    if (!this.treeEnabled) {
      return this.isRowSelected(row);
    }

    const descendants = this._getTreeDescendants(row);
    if (!descendants.length) {
      // leaf
      return this.isRowSelected(row);
    }

    const total = descendants.length;
    const selectedChildren = descendants.filter((child) => this._selection.has(child)).length;

    const allChildrenSelected = total > 0 && selectedChildren === total;
    const anyChildrenSelected = selectedChildren > 0;

    if (allChildrenSelected && this._selection.has(row)) {
      // fully selected branch
      return true;
    }

    if (anyChildrenSelected && !allChildrenSelected) {
      // partially selected branch → parent visually indeterminate, not checked
      return false;
    }

    // no children selected → only checked if parent itself explicitly selected
    return this._selection.has(row);
  }

  /** Returns visual "indeterminate" state for a row's checkbox (tree-aware). */
  getRowIndeterminate(row: T): boolean {
    if (!this.treeEnabled) return false;

    const descendants = this._getTreeDescendants(row);
    if (!descendants.length) return false;

    const total = descendants.length;
    const selectedChildren = descendants.filter((child) => this._selection.has(child)).length;

    const allChildrenSelected = total > 0 && selectedChildren === total;
    const anyChildrenSelected = selectedChildren > 0;

    // parent is indeterminate if some (but not all) children are selected
    return anyChildrenSelected && !allChildrenSelected;
  }

  get selectedRows(): T[] {
    return Array.from(this._selection);
  }

  get allVisibleSelected(): boolean {
    if (!this.selectionMode || !this.renderedData.length) return false;
    return this.renderedData.every((row) => this.getRowChecked(row));
  }

  get someVisibleSelected(): boolean {
    if (!this.selectionMode || !this.renderedData.length) return false;

    const anySelected = this.renderedData.some(
      (row) => this.getRowChecked(row) || this.getRowIndeterminate(row)
    );
    return anySelected && !this.allVisibleSelected;
  }

  private _emitSelectionChange(lastChanged: T | null): void {
    if (!this.selectionMode) return;
    this.selectionChange.emit({
      selected: this.selectedRows,
      lastChanged,
    });
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

  /** Set selection for a row and all its descendants in tree mode. */
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

  /** Recalculate selection state for all ancestors of the given row. */
  private _syncSelectionUpwardsFrom(row: T): void {
    if (!this.treeEnabled) return;

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
        // No children selected → parent explicitly unchecked
        this._selection.delete(current);
      } else if (selectedChildren === total) {
        // All children selected → parent checked
        this._selection.add(current);
      } else {
        // Some but not all children selected → parent indeterminate
        // (represented by removing it from the selection set; visual in template)
        this._selection.delete(current);
      }

      current = this._treeMeta.get(current)?.parent ?? null;
    }
  }

  onRowSelectionToggle(row: T): void {
    if (!this.selectionMode) return;

    if (this.selectionMode === 'single') {
      this._selectSingle(row);
      return;
    }

    // multiple selection
    if (this.treeEnabled) {
      const hasChild = this.hasChildren(row);

      if (hasChild) {
        // toggle whole branch
        const currentlyChecked = this.getRowChecked(row);
        this._setBranchSelection(row, !currentlyChecked);
      } else {
        // leaf node: simple toggle
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
    if (this.selectionMode !== 'multiple') return;

    const shouldSelect = !this.allVisibleSelected;

    if (this.treeEnabled) {
      // operate on root rows only to avoid double-processing descendants
      const roots = this.renderedData.filter((row) => this.getRowLevel(row) === 0);

      roots.forEach((row) => {
        this._setBranchSelection(row, shouldSelect);
        this._syncSelectionUpwardsFrom(row);
      });
    } else {
      if (shouldSelect) {
        // select all visible rows
        this.renderedData.forEach((row) => this._selection.add(row));
      } else {
        // unselect visible rows
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
    if (!this.selectionMode) return;

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

  private _getAllDataRows(): T[] {
    // In tree mode, flatten the full hierarchy (ignoring expansion)
    if (this.treeEnabled && this._treeRoots.length) {
      const result: T[] = [];
      const visit = (row: T) => {
        result.push(row);
        const children = this._getTreeChildren(row);
        children.forEach(visit);
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
    if (!(this.dataSource instanceof IGridDataSource)) return;

    const columnId = column.fieldName;
    if (!columnId) return;

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
    if (!(this.dataSource instanceof IGridDataSource)) return;

    if (!this.sortStates.length) {
      this.dataSource.sort = null;
      return;
    }

    this.dataSource.sort = this.sortStates.map((s) => ({
      active: s.active,
      direction: s.direction,
    }));
  }

  /* ------- column width / flex API ------- */

  /**
   * Returns numeric column width (px) for fixed-width columns.
   * - override from resize
   * - explicit numeric [width]
   * - default width when width is undefined
   * For "fill" we return null to signal flex-fill (CSS min-width handles autos).
   */
  getColumnWidth(column: IGridColumnLike<any>): number | null {
    const override = this._columnWidths.get(column);
    if (typeof override === 'number') {
      return override;
    }

    // explicit numeric width
    if (typeof column.width === 'number') {
      return column.width;
    }

    // fill → no fixed width, use flex-grow instead
    if (column.width === 'fill') {
      return null;
    }

    // no width provided → default fixed width
    return this._defaultColumnWidth;
  }

  getColumnFlex(column: IGridColumnLike<any>): string {
    const px = this.getColumnWidth(column);

    // fixed width (explicit or default)
    if (px != null) {
      return `0 0 ${px}px`;
    }

    // fill: flex-grow
    return '1 1 0';
  }

  setColumnWidth(column: IGridColumnLike<any>, width: number): void {
    if (!column) return;
    this._columnWidths.set(column, width);
  }

  /* ------- frozen column helpers (simple "freeze" block) ------- */

  /** index of last frozen column, or -1 if none */
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
    if (endIndex < 0) return false;

    const idx = this.columns.indexOf(column);
    if (idx === -1) return false;

    return idx <= endIndex;
  }

  /**
   * Computes sticky left offset for frozen columns.
   * Freeze block always starts from first data column.
   * We also offset by:
   * - selection column width (if selectionMode && not tree+multiple)
   * - tree column width (if treeEnabled)
   * - number column width (if showNumberColumnEffective)
   */
  getColumnStickyLeft(column: IGridColumnLike<any>): number | null {
    if (!this.isColumnFrozen(column)) return null;

    const endIndex = this._getFrozenEndIndex();
    if (endIndex < 0) return null;

    const idx = this.columns.indexOf(column);
    if (idx === -1 || idx > endIndex) return null;

    let left = 0;

    const hasSelectionColumn =
      !!this.selectionMode && !(this.treeEnabled && this.selectionMode === 'multiple');

    if (hasSelectionColumn) {
      left += this.selectionColumnWidth;
    }

    if (this.treeEnabled) {
      left += this.treeColumnWidth;
    }

    if (this.showNumberColumnEffective) {
      const numWidth = this.getColumnWidth(this.numberColumn);
      if (numWidth != null) {
        left += numWidth;
      }
    }

    for (let i = 0; i < idx; i++) {
      const col = this.columns[i];
      if (!this.isColumnFrozen(col)) {
        continue;
      }
      const w = this.getColumnWidth(col);
      if (w == null) return null; // unsafe: mixed "fill" in frozen area
      left += w;
    }

    return left;
  }

  /* ------- paginator proxies ------- */

  get hasPagination(): boolean {
    // For now, tree view is not paginated to avoid splitting branches.
    if (this.treeEnabled) return false;

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
    if (!(this.dataSource instanceof IGridDataSource)) return;
    this.dataSource.paginator = {
      pageIndex: event.pageIndex,
      pageSize: event.pageSize,
    };
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
      // re-connect when tree mode or children key changes
      this._connectData();
    }

    if (
      'treeInitialExpandLevel' in changes &&
      !changes['treeInitialExpandLevel'].firstChange &&
      this.treeEnabled
    ) {
      // Rebuild tree meta & expansion based on new level
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

    this.sortStates = sort.map((s) => ({
      active: s.active,
      direction: s.direction,
    }));
  }

  /**
   * Build columns:
   * - If there are projected <i-grid-column>, use them (manual data columns).
   * - If there are none, infer data columns from data keys (auto mode).
   * - In both cases, append <i-grid-custom-column> at the end.
   */
  private _rebuildColumns(fromDataChange: boolean = false): void {
    const projectedDataCols = this.columnDefs?.toArray?.() ?? [];
    const customCols = this.customColumnDefs?.toArray?.() ?? [];

    let dataCols: IGridColumnLike<T>[] = [];

    if (projectedDataCols.length > 0) {
      // manual data columns
      dataCols = projectedDataCols;
    } else {
      // auto mode: build from data shape
      if (fromDataChange || !this.columns.length) {
        dataCols = this._buildAutoColumnsFromData();
      } else {
        // keep existing data columns (non-custom) if we already had them
        dataCols = this.columns.filter((c) => !(c instanceof IGridCustomColumn));
      }
    }

    this.columns = [...dataCols, ...customCols];

    // initial width from numeric [width] or default, only if not yet set
    this.columns.forEach((col) => {
      if (!this._columnWidths.has(col)) {
        const px = this.getColumnWidth(col);
        if (px != null) {
          this._columnWidths.set(col, px);
        }
      }
    });

    // init number column width as well (if used)
    if (this.showNumberColumnEffective) {
      const numCol = this.numberColumn;
      if (!this._columnWidths.has(numCol)) {
        const px = this.getColumnWidth(numCol);
        if (px != null) {
          this._columnWidths.set(numCol, px);
        }
      }
    }
  }

  /**
   * Auto column builder:
   * - Only used when there are NO projected <i-grid-column>.
   * - Uses the first data row's keys as columns.
   * - Field name & title are identical, so renaming the object key
   *   automatically renames the header.
   * - Auto columns are flex-fill and have a min width (via CSS).
   */
  private _buildAutoColumnsFromData(): IGridColumnLike<T>[] {
    const rows = this._getAllDataRows();
    if (!rows.length) {
      return [];
    }

    const first = rows[0] as any;
    if (first == null || typeof first !== 'object') {
      return [];
    }

    const keys = Object.keys(first);

    const cols: IGridColumnLike<T>[] = keys.map((key) => ({
      fieldName: key,
      title: key,
      sortable: true,
      resizable: true,
      width: 'fill', // flex-fill
      freeze: false,
      headerDef: undefined,
      cellDef: undefined,
      isAuto: true,
    }));

    return cols;
  }

  private _updateCurrentFilterText(): void {
    if (this.dataSource instanceof IGridDataSource) {
      this.currentFilterText = this.dataSource.filter;
    } else {
      this.currentFilterText = '';
    }
  }

  private _connectData(): void {
    this._dataSub?.unsubscribe();

    // ---- TREE MODE: supports both IGridDataSource<T> and T[] ----
    if (this.treeEnabled) {
      // IGridDataSource<T> → subscribe to rendered roots
      if (this.dataSource instanceof IGridDataSource) {
        this._dataSub = this.dataSource.connect().subscribe((data) => {
          const roots = data || [];

          this._buildTreeMeta(roots);
          this._rebuildTreeRendered(); // also updates filter text
          this._rebuildColumns(true);
        });
        return;
      }

      // Plain array → treat as roots
      if (Array.isArray(this.dataSource)) {
        const roots = this.dataSource;

        this._buildTreeMeta(roots);
        this._rebuildTreeRendered(); // also updates filter text
        this._rebuildColumns(true);
        return;
      }

      // Fallback
      this.renderedData = [];
      this._reconcileSelectionWithData();
      this._rebuildColumns(true);
      this._updateCurrentFilterText();
      return;
    }

    // ---- NORMAL (flat) MODE: original behavior ----
    if (this.dataSource instanceof IGridDataSource) {
      this._dataSub = this.dataSource.connect().subscribe((data) => {
        this.renderedData = data || [];
        this._reconcileSelectionWithData();

        // auto-columns: rebuild when data shape changes and no manual columns
        this._rebuildColumns(true);
        this._updateCurrentFilterText();
      });
      return;
    }

    if (Array.isArray(this.dataSource)) {
      this.renderedData = this.dataSource;
      this._reconcileSelectionWithData();

      // auto-columns: rebuild when data shape changes and no manual columns
      this._rebuildColumns(true);
      this._updateCurrentFilterText();
      return;
    }

    this.renderedData = [];
    this._reconcileSelectionWithData();
    this._rebuildColumns(true);
    this._updateCurrentFilterText();
  }

  /* ------- row click ------- */

  onRowClicked(row: T): void {
    this.rowClick.emit(row);

    if (!this.selectionMode) return;

    if (this.selectionMode === 'single') {
      this._selectSingle(row);
    } else {
      if (this.treeEnabled) {
        // delegate to tree-aware selection
        this.onRowSelectionToggle(row);
      } else {
        this._toggleMultiple(row);
      }
    }
  }

  /* ------- template helpers ------- */

  get singleSelectionName(): string {
    return `i-grid-radio-${this._id}`;
  }

  /**
   * Returns global row number (1-based).
   * - If paginated, continues across pages.
   * - Otherwise, 1..renderedData.length.
   */
  getRowNumber(visibleRowIndex: number): number {
    if (this.dataSource instanceof IGridDataSource && this.hasPagination) {
      return this.pageIndex * this.pageSize + visibleRowIndex + 1;
    }
    return visibleRowIndex + 1;
  }

  /**
   * Returns z-index for a frozen column.
   * Leftmost frozen column gets highest z-index so its right edge (resize handle)
   * is always on top of the next column.
   */
  getFrozenColumnZ(column: IGridColumnLike<any>): number {
    const endIndex = this._getFrozenEndIndex();
    if (endIndex < 0) return 2;

    const idx = this.columns.indexOf(column);
    if (idx === -1) return 2;

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
    IGridHeaderCell,
    IGridCell,
    IGridHeaderRowDirective,
    IGridRowDirective,
    IPaginator,
  ],
})
export class IGridModule {}
