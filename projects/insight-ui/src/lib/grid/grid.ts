/* grid.ts */
/**
 * IGrid (TABLE)
 * Version: 1.26.3
 *
 * Notes:
 * - Internal DOM uses <table>/<thead>/<tbody>/<tr>/<th>/<td>
 * - Consumer API unchanged:
 *   <i-grid>, <i-grid-column>, <i-grid-custom-column>,
 *   <i-grid-cell *iCellDef>, <i-grid-expandable-row *iRowDef>
 * - This version renames internal table class names:
 *   i-grid-tr* -> i-grid-row*
 *   i-grid-th* -> i-grid-header-cell*
 *   i-grid-td* -> i-grid-cell*
 *   i-grid-td__content -> i-grid-cell__content
 */

import { NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  booleanAttribute,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  EventEmitter,
  HostListener,
  inject,
  Input,
  NgModule,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { IPaginator } from './paginator';
import { IButton } from '../button/button';
import { IHighlightSearchPipe } from '../highlight-search.pipe';
import { ITruncatedTooltipDirective } from '../truncated-tooltip.directive';

/* ----------------------------------------------------
 * SORT TYPES
 * ---------------------------------------------------- */

export type ISortDirection = 'asc' | 'desc' | '';
export type ISortState = { active: string; direction: ISortDirection };
export type ISortConfig = ISortState | ISortState[] | null;

/* ----------------------------------------------------
 * FILTER TYPE
 * ---------------------------------------------------- */

export type IGridFilter =
  | string
  | {
      recursive: true;
      text: string;
      key?: string; // children key
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
 * COLUMN-LIKE INTERFACE
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
  isAuto?: boolean;
};

/* ----------------------------------------------------
 * COLUMN GROUP MODEL
 * ---------------------------------------------------- */

export type IGridHeaderItem<T = any> =
  | { kind: 'col'; col: IGridColumnLike<T> }
  | { kind: 'group'; title: string; columns: IGridColumnLike<T>[] };

/* ----------------------------------------------------
 * DATASOURCE
 * ---------------------------------------------------- */

export class IGridDataSource<T = any> {
  private readonly _renderedData$ = new BehaviorSubject<T[]>([]);
  private _rawData: T[] = [];

  private _filter = '';
  private _recursive = false;
  private _childrenKey = 'children';

  private _sort: ISortState[] | null = null;

  private _paginatorEnabled = true;
  private _pageIndex = 0;
  private _pageSize = 10;
  private _pageSizeOptions = [10, 50, 100];

  private _externalDataSub?: Subscription;
  private _dataSource$?: Observable<T[]>;

  constructor(initialData: T[] = [], config: IGridDataSourceConfig<T> = {}) {
    this._rawData = initialData || [];

    if (config.filter !== null) {
      this.filter = config.filter;
    }

    this._sort = this._normalizeSort(config.sort ?? null);
    this._applyPaginatorConfig(config.paginator);

    this._update();
  }

  private _applyPaginatorConfig(config: IGridPaginatorInput | undefined): void {
    if (config === false) {
      this._paginatorEnabled = false;
      return;
    }

    this._paginatorEnabled = true;

    if (config && typeof config === 'object') {
      this._pageIndex = config.pageIndex ?? 0;
      this._pageSizeOptions = config.pageSizeOptions ?? this._pageSizeOptions;
      this._pageSize = config.pageSize ?? this._pageSizeOptions[0];
      return;
    }

    this._pageIndex = 0;
    this._pageSizeOptions = [10, 50, 100];
    this._pageSize = 10;
  }

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

  get data(): T[] {
    return this._rawData;
  }

  set data(value: T[]) {
    this._rawData = value || [];
    this._update();
  }

  get data$(): Observable<T[]> | undefined {
    return this._dataSource$;
  }

  set data$(source: Observable<T[]> | undefined) {
    this._externalDataSub?.unsubscribe();
    this._externalDataSub = undefined;
    this._dataSource$ = undefined;

    if (!source) return;

    this._dataSource$ = source;
    this._externalDataSub = source.subscribe((rows) => {
      this.data = rows || [];
    });
  }

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

    this._filter = (value.text ?? '').toLowerCase().trim();
    this._recursive = value.recursive === true;
    this._childrenKey = (value.key || 'children').trim() || 'children';
    this._update();
  }

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

  filterPredicate: (data: T, filter: string) => boolean = (data, filter) => {
    if (!filter) return true;
    const target = JSON.stringify(data).toLowerCase();
    return target.includes(filter);
  };

  sortAccessor: (data: T, columnId: string) => string | number | null | undefined = (
    data: any,
    columnId: string,
  ) => data?.[columnId];

  connect(): Observable<T[]> {
    return this._renderedData$.asObservable();
  }

  disconnect(): void {
    this._externalDataSub?.unsubscribe();
    this._externalDataSub = undefined;
    this._dataSource$ = undefined;
    this._renderedData$.complete();
  }

  private _rowMatchesFilter(data: T, filter: string): boolean {
    if (!filter) return true;
    return this.filterPredicate(data, filter);
  }

  private _filterRecursiveArray(nodes: any[], filter: string): any[] {
    const result: any[] = [];
    for (const node of nodes) {
      const pruned = this._filterRecursiveNode(node, filter);
      if (pruned !== null) result.push(pruned);
    }
    return result;
  }

  private _filterRecursiveNode(node: any, filter: string): any | null {
    const children = Array.isArray(node?.[this._childrenKey])
      ? (node[this._childrenKey] as any[])
      : [];

    const filteredChildren = this._filterRecursiveArray(children, filter);
    const selfMatches = this._rowMatchesFilter(node as T, filter);

    if (!selfMatches && filteredChildren.length === 0) return null;

    const clone: any = { ...node };

    if (filteredChildren.length) {
      clone[this._childrenKey] = filteredChildren;
    } else if (Object.prototype.hasOwnProperty.call(clone, this._childrenKey)) {
      delete clone[this._childrenKey];
    }

    return clone;
  }

  private _normalizeSort(sort: ISortConfig): ISortState[] | null {
    if (!sort) return null;

    const arr: ISortState[] = Array.isArray(sort) ? sort : [sort];
    const cleaned = arr.filter(
      (s): s is ISortState =>
        !!s && typeof s.active === 'string' && (s.direction === 'asc' || s.direction === 'desc'),
    );

    return cleaned.length ? cleaned : null;
  }

  private _update(): void {
    let data: T[] = [...this._rawData];

    // FILTER
    if (this._filter) {
      const f = this._filter;
      if (this._recursive) {
        data = this._filterRecursiveArray(data as any[], f) as T[];
      } else {
        data = data.filter((row) => this.filterPredicate(row, f));
      }
    }

    // SORT (multi-column)
    if (this._sort && this._sort.length > 0) {
      const sorts = [...this._sort];

      data.sort((a: T, b: T) => {
        for (const sort of sorts) {
          const { active, direction } = sort;
          if (!active || !direction) continue;

          const dir = direction === 'asc' ? 1 : -1;

          const aValue = (this.sortAccessor(a, active) ?? null) as any;
          const bValue = (this.sortAccessor(b, active) ?? null) as any;

          if (aValue === null && bValue === null) continue;
          if (aValue === null) return -1 * dir;
          if (bValue === null) return 1 * dir;

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
 * TEMPLATE DIRECTIVES
 * ---------------------------------------------------- */

@Directive({
  selector: '[iHeaderCellDef]',
  standalone: true,
})
export class IGridHeaderCellDefDirective {
  readonly template = inject(TemplateRef<any>);
}

@Directive({
  selector: '[iCellDef]',
  standalone: true,
})
export class IGridCellDefDirective {
  readonly template = inject(TemplateRef<any>);
}

/**
 * IMPORTANT:
 * This is the wrapper element used by consumers:
 *   <i-grid-cell *iCellDef="let row">...</i-grid-cell>
 *
 * It must exist so Angular doesn't throw "not a known element"
 * and so it remains in the DOM as your wrapper node.
 */
@Component({
  selector: 'i-grid-cell',
  standalone: true,
  template: `<ng-content />`,
  host: { class: 'i-grid-cell-host' },
})
export class IGridCell {}

/* ----------------------------------------------------
 * EXPANDABLE ROW DEF
 * ---------------------------------------------------- */

@Directive({
  selector: '[iRowDef]',
  standalone: true,
})
export class IGridRowDefDirective<T = any> implements OnInit {
  @Input() iRowDefExpandSingle = false;

  readonly template = inject(TemplateRef<any>);
  private readonly vcr = inject(ViewContainerRef);

  ngOnInit(): void {
    this.vcr.clear(); // template-only holder; grid renders it
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
  host: { class: 'i-grid-expandable-row' },
})
export class IGridExpandableRow {}

/* ----------------------------------------------------
 * COLUMN (data-backed)
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

  @Input() filterMode?: 'search' | 'select' | string;

  @ContentChild(IGridHeaderCellDefDirective, { read: TemplateRef })
  headerDef?: TemplateRef<any>;

  @ContentChild(IGridCellDefDirective, { read: TemplateRef })
  cellDef?: TemplateRef<any>;

  isAuto?: boolean | undefined;
}

/* ----------------------------------------------------
 * CUSTOM COLUMN (not bound to datasource)
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

  @Input() filterMode?: 'search' | 'select' | string;

  fieldName?: string;

  @ContentChild(IGridHeaderCellDefDirective, { read: TemplateRef })
  headerDef?: TemplateRef<any>;

  @ContentChild(IGridCellDefDirective, { read: TemplateRef })
  cellDef?: TemplateRef<any>;

  isAuto?: boolean | undefined;
}

/* ----------------------------------------------------
 * COLUMN GROUP (public consumer API)
 * ---------------------------------------------------- */

@Component({
  selector: 'i-grid-column-group',
  standalone: true,
  template: '',
})
export class IGridColumnGroup<T = any> {
  @Input() title = '';

  @ContentChildren(IGridColumn)
  columns!: QueryList<IGridColumn<T>>;

  @ContentChildren(IGridCustomColumn)
  customColumns!: QueryList<IGridCustomColumn<T>>;
}

/* ----------------------------------------------------
 * GRID (TABLE)
 * ---------------------------------------------------- */

type IGridGroupRowCell<T> =
  | { kind: 'special'; id: 'expand' | 'selection' | 'number'; title?: string; stickyLeft: number }
  | {
      kind: 'col';
      col: IGridColumnLike<T>;
      stickyLeft: number | null;
      rowspan: number;
      colspan: number;
    }
  | { kind: 'group'; title: string; colspan: number; stickyLeft: number | null };

@Component({
  selector: 'i-grid',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    NgTemplateOutlet,
    IPaginator,
    IButton,
    IHighlightSearchPipe,
    ITruncatedTooltipDirective,
  ],
  template: `
    <div class="i-grid-viewport">
      <table class="i-grid-table" role="table">
        <colgroup>
          @if (!treeEnabled && hasExpandableRow) {
            <col class="i-grid-col--expand" [style.width.px]="expandColumnWidth" />
          }
          @if (!treeEnabled && selectionMode) {
            <col class="i-grid-col--selection" [style.width.px]="selectionColumnWidth" />
          }
          @if (showNumberColumnEffective) {
            <col class="i-grid-col--number" [style.width.px]="numberColumnWidth" />
          }

          @for (col of columns; track col) {
            @let w = getColumnWidth(col);
            <col
              class="i-grid-col"
              [class.i-grid-col--auto]="col.isAuto"
              [class.i-grid-col--frozen]="isColumnFrozen(col)"
              [style.width.px]="w !== null ? w : null"
            />
          }
        </colgroup>

        @if (headerItems.length) {
          <thead>
            @if (hasHeaderGroups) {
              <tr class="i-grid-row i-grid-row--head">
                @for (cell of groupHeaderRow1; track $index) {
                  @if (cell.kind === 'special') {
                    <th
                      class="i-grid-header-cell i-grid-header-cell--special"
                      [attr.rowspan]="2"
                      [class.i-grid-header-cell--expand]="cell.id === 'expand'"
                      [class.i-grid-header-cell--number]="cell.id === 'number'"
                      [class.i-grid-header-cell--selection]="cell.id === 'selection'"
                      [style.left.px]="cell.stickyLeft"
                      [style.position]="'sticky'"
                      [style.zIndex]="40"
                    >
                      @if (cell.id === 'expand') {
                        <div class="i-grid-header-cell__content i-grid-center">
                          <i-button
                            class="i-grid-expand-toggle"
                            size="2xs"
                            variant="outline"
                            [icon]="allVisibleExpanded ? 'down' : 'next'"
                            (onClick)="onToggleAllExpanded(); $event.stopPropagation()"
                          />
                        </div>
                      } @else if (cell.id === 'selection') {
                        <div class="i-grid-header-cell__content i-grid-center">
                          @if (selectionMode === 'multiple') {
                            <input
                              type="checkbox"
                              [checked]="allVisibleSelected"
                              [indeterminate]="someVisibleSelected"
                              (change)="onToggleAllVisible()"
                              (click)="$event.stopPropagation()"
                            />
                          }
                        </div>
                      } @else {
                        <div class="i-grid-header-cell__content">
                          {{ numberColumn.title }}
                        </div>
                      }
                    </th>
                  } @else if (cell.kind === 'group') {
                    <th
                      class="i-grid-header-cell i-grid-header-cell--group"
                      [attr.colspan]="cell.colspan"
                    >
                      <div class="i-grid-header-cell__content i-grid-center">
                        {{ cell.title }}
                      </div>
                    </th>
                  } @else {
                    <th
                      class="i-grid-header-cell"
                      [attr.colspan]="cell.colspan"
                      [attr.rowspan]="cell.rowspan"
                      [class.i-grid-header-cell--auto]="cell.col.isAuto"
                      [class.i-grid-header-cell--frozen]="cell.stickyLeft !== null"
                      [style.left.px]="cell.stickyLeft"
                      [style.position]="cell.stickyLeft !== null ? 'sticky' : null"
                      [style.zIndex]="cell.stickyLeft !== null ? getFrozenColumnZ(cell.col) : null"
                      (click)="onHeaderClick(cell.col)"
                    >
                      @if (cell.col.headerDef; as tmpl) {
                        <ng-container [ngTemplateOutlet]="tmpl" />
                      } @else {
                        <div class="i-grid-header-cell__content" truncatedTooltip>
                          {{ cell.col.title || cell.col.fieldName }}
                        </div>
                      }

                      @if (isResizable(cell.col)) {
                        <span
                          class="i-grid-resize-handle"
                          (mousedown)="onResizeMouseDown(cell.col, $event)"
                        ></span>
                      }
                    </th>
                  }
                }
              </tr>

              <tr class="i-grid-row i-grid-row--head">
                @for (cell of groupHeaderRow2; track $index) {
                  <th
                    class="i-grid-header-cell"
                    [class.i-grid-header-cell--auto]="cell.col.isAuto"
                    [class.i-grid-header-cell--frozen]="cell.stickyLeft !== null"
                    [style.left.px]="cell.stickyLeft"
                    [style.position]="cell.stickyLeft !== null ? 'sticky' : null"
                    [style.zIndex]="cell.stickyLeft !== null ? getFrozenColumnZ(cell.col) : null"
                    (click)="onHeaderClick(cell.col)"
                  >
                    @if (cell.col.headerDef; as tmpl) {
                      <ng-container [ngTemplateOutlet]="tmpl" />
                    } @else {
                      <div class="i-grid-header-cell__content" truncatedTooltip>
                        {{ cell.col.title || cell.col.fieldName }}
                      </div>
                    }

                    @if (isResizable(cell.col)) {
                      <span
                        class="i-grid-resize-handle"
                        (mousedown)="onResizeMouseDown(cell.col, $event)"
                      ></span>
                    }
                  </th>
                }
              </tr>
            } @else {
              <tr class="i-grid-row i-grid-row--head">
                @if (!treeEnabled && hasExpandableRow && !expandableRowDef?.iRowDefExpandSingle) {
                  <th
                    class="i-grid-header-cell i-grid-header-cell--expand i-grid-header-cell--frozen"
                    [style.left.px]="getStickyLeftForExpandColumn()"
                    [style.position]="'sticky'"
                    [style.zIndex]="40"
                  >
                    <div class="i-grid-header-cell__content i-grid-center">
                      <i-button
                        class="i-grid-expand-toggle"
                        size="2xs"
                        variant="outline"
                        [icon]="allVisibleExpanded ? 'down' : 'next'"
                        (onClick)="onToggleAllExpanded(); $event.stopPropagation()"
                      />
                    </div>
                  </th>
                }

                @if (!treeEnabled && selectionMode) {
                  <th
                    class="i-grid-header-cell i-grid-header-cell--selection i-grid-header-cell--frozen"
                    [style.left.px]="getStickyLeftForSelectionColumn()"
                    [style.position]="'sticky'"
                    [style.zIndex]="40"
                  >
                    <div class="i-grid-header-cell__content i-grid-center">
                      @if (selectionMode === 'multiple') {
                        <input
                          type="checkbox"
                          [checked]="allVisibleSelected"
                          [indeterminate]="someVisibleSelected"
                          (change)="onToggleAllVisible()"
                          (click)="$event.stopPropagation()"
                        />
                      }
                    </div>
                  </th>
                }

                @if (showNumberColumnEffective) {
                  <th
                    class="i-grid-header-cell i-grid-header-cell--number"
                    [class.i-grid-header-cell--frozen]="hasFrozenColumns"
                    [style.left.px]="hasFrozenColumns ? getStickyLeftForNumberColumn() : null"
                    [style.position]="hasFrozenColumns ? 'sticky' : null"
                    [style.zIndex]="hasFrozenColumns ? 45 : null"
                  >
                    <div class="i-grid-header-cell__content">
                      {{ numberColumn.title }}
                    </div>
                  </th>
                }

                @for (col of columns; track col) {
                  <th
                    class="i-grid-header-cell"
                    [class.i-grid-header-cell--auto]="col.isAuto"
                    [class.i-grid-header-cell--frozen]="isColumnFrozen(col)"
                    [style.left.px]="isColumnFrozen(col) ? getColumnStickyLeft(col) : null"
                    [style.position]="isColumnFrozen(col) ? 'sticky' : null"
                    [style.zIndex]="isColumnFrozen(col) ? getFrozenColumnZ(col) : null"
                    (click)="onHeaderClick(col)"
                  >
                    @if (col.headerDef; as tmpl) {
                      <ng-container [ngTemplateOutlet]="tmpl" />
                    } @else {
                      <div class="i-grid-header-cell__content" truncatedTooltip>
                        {{ col.title || col.fieldName }}
                      </div>
                    }

                    @if (isResizable(col)) {
                      <span
                        class="i-grid-resize-handle"
                        (mousedown)="onResizeMouseDown(col, $event)"
                      ></span>
                    }
                  </th>
                }
              </tr>
            }
          </thead>
        }

        <tbody>
          @for (row of renderedData; track rowIndex; let rowIndex = $index) {
            <tr
              class="i-grid-row i-grid-row--body"
              [class.i-grid-row--selection]="!!selectionMode"
              (click)="onRowClicked(row)"
            >
              @if (!treeEnabled && hasExpandableRow) {
                <td
                  class="i-grid-cell i-grid-cell--expand i-grid-cell--frozen"
                  [style.left.px]="getStickyLeftForExpandColumn()"
                  [style.position]="'sticky'"
                  [style.zIndex]="35"
                  (click)="$event.stopPropagation()"
                >
                  <div class="i-grid-center">
                    <i-button
                      class="i-grid-expand-toggle"
                      size="2xs"
                      variant="outline"
                      [icon]="isRowExpanded(row) ? 'down' : 'next'"
                      (onClick)="onExpandToggle(row, $event)"
                    />
                  </div>
                </td>
              }

              @if (!treeEnabled && selectionMode) {
                <td
                  class="i-grid-cell i-grid-cell--selection i-grid-cell--frozen"
                  [style.left.px]="getStickyLeftForSelectionColumn()"
                  [style.position]="'sticky'"
                  [style.zIndex]="34"
                  (click)="$event.stopPropagation()"
                >
                  <div class="i-grid-center">
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
                  </div>
                </td>
              }

              @if (showNumberColumnEffective) {
                <td
                  class="i-grid-cell i-grid-cell--number"
                  [class.i-grid-cell--frozen]="hasFrozenColumns"
                  [style.left.px]="hasFrozenColumns ? getStickyLeftForNumberColumn() : null"
                  [style.position]="hasFrozenColumns ? 'sticky' : null"
                  [style.zIndex]="hasFrozenColumns ? 33 : null"
                  (click)="$event.stopPropagation()"
                >
                  <div class="i-grid-cell__content">
                    {{ getRowNumber(rowIndex) }}
                  </div>
                </td>
              }

              @for (col of columns; track col) {
                <td
                  class="i-grid-cell"
                  [class.i-grid-cell--auto]="col.isAuto"
                  [class.i-grid-cell--frozen]="isColumnFrozen(col)"
                  [style.left.px]="isColumnFrozen(col) ? getColumnStickyLeft(col) : null"
                  [style.position]="isColumnFrozen(col) ? 'sticky' : null"
                  [style.zIndex]="isColumnFrozen(col) ? 32 : null"
                >
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
                    <span
                      class="i-grid-cell__content"
                      truncatedTooltip
                      [innerHTML]="
                        col.fieldName
                          ? ($any(row)[col.fieldName] | highlightSearch: currentFilterText)
                          : ''
                      "
                    ></span>
                  }
                </td>
              }
            </tr>

            @if (hasExpandableRow && isRowExpanded(row)) {
              <tr class="i-grid-row i-grid-row--detail">
                <td class="i-grid-cell i-grid-cell--detail" [attr.colspan]="visibleColumnCount">
                  <ng-container
                    [ngTemplateOutlet]="expandableRowDef!.template"
                    [ngTemplateOutletContext]="{ $implicit: row, row: row, index: rowIndex }"
                  />
                </td>
              </tr>
            }
          }
        </tbody>
      </table>
    </div>

    @if (hasPagination) {
      <div class="i-grid-footer">
        <i-paginator
          [length]="totalLength"
          [pageIndex]="pageIndex"
          [pageSize]="pageSize"
          [pageSizeOptions]="pageSizeOptions"
          (onPageChange)="onPageChange($event)"
        />
      </div>
    }
  `,
  exportAs: 'iGrid',
  host: {
    class: 'i-grid',
    role: 'table',
  },
})
export class IGrid<T> implements AfterContentInit, OnChanges, OnDestroy {
  @Input() dataSource!: IGridDataSource<T> | T[];

  @Input() selectionMode: IGridSelectionMode = false;

  @Input() tree: string | boolean | null = null;
  @Input() treeIndent = 16;
  @Input() treeColumn?: string;
  @Input() treeInitialExpandLevel: number | null = null;

  @Input({ transform: booleanAttribute }) showNumberColumn = true;

  get showNumberColumnEffective(): boolean {
    if (this.treeEnabled) return false;
    return this.showNumberColumn;
  }

  @Output() readonly onSelectionChange = new EventEmitter<IGridSelectionChange<T>>();
  @Output() readonly onRowClick = new EventEmitter<T>();
  @Output() readonly onRowExpandChange = new EventEmitter<{ row: T; expanded: boolean }>();
  @Output() readonly onExpandedRowsChange = new EventEmitter<T[]>();

  @ContentChildren(IGridColumn) columnDefs!: QueryList<IGridColumn<T>>;
  @ContentChildren(IGridCustomColumn) customColumnDefs!: QueryList<IGridCustomColumn<T>>;
  @ContentChildren(IGridColumnGroup) columnGroupDefs!: QueryList<IGridColumnGroup<T>>;

  @ContentChild(IGridRowDefDirective) expandableRowDef?: IGridRowDefDirective<T>;

  get hasExpandableRow(): boolean {
    return !!this.expandableRowDef?.template;
  }

  columns: IGridColumnLike<T>[] = [];
  headerItems: IGridHeaderItem<T>[] = [];

  renderedData: T[] = [];
  currentFilterText = '';
  sortStates: ISortState[] = [];

  private _columnWidths = new Map<IGridColumnLike<any>, number>();
  private _dataSub?: Subscription;

  private _selection = new Set<T>();
  private _expanded = new Set<T>();

  private readonly _id = Math.random().toString(36).slice(2);
  private readonly _defaultColumnWidth = 200;

  readonly selectionColumnWidth = 32;
  readonly numberColumnWidth = 60;
  readonly expandColumnWidth = 32;

  private _numberColumnInternal?: IGridColumnLike<T>;

  // header grouping computed rows
  hasHeaderGroups = false;
  groupHeaderRow1: IGridGroupRowCell<T>[] = [];
  groupHeaderRow2: { col: IGridColumnLike<T>; stickyLeft: number | null }[] = [];

  // resize state
  private _isResizing = false;
  private _resizeCol: IGridColumnLike<any> | null = null;
  private _resizeStartX = 0;
  private _resizeStartWidth = 0;
  private readonly _minWidth = 50;

  // TREE meta
  private _treeMeta = new Map<
    T,
    { level: number; parent: T | null; hasChildren: boolean; expanded: boolean }
  >();
  private _treeRoots: T[] = [];

  get visibleColumnCount(): number {
    let count = 0;
    if (!this.treeEnabled && this.hasExpandableRow) count++;
    if (!this.treeEnabled && !!this.selectionMode) count++;
    if (this.showNumberColumnEffective) count++;
    count += this.columns.length;
    return count;
  }

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

  /* ---------------- EXPANDABLE ROW API ---------------- */

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
    if (!this.hasExpandableRow) return;

    const expandSingle = !!this.expandableRowDef?.iRowDefExpandSingle;

    if (expandSingle) {
      const first = this.renderedData[0];
      const prev = Array.from(this._expanded);
      this._expanded.clear();
      prev.forEach((r) => this.onRowExpandChange.emit({ row: r, expanded: false }));

      if (first) {
        this._expanded.add(first);
        this.onRowExpandChange.emit({ row: first, expanded: true });
      }
      this.onExpandedRowsChange.emit(this.getExpandedRows());
      return;
    }

    const before = new Set(this._expanded);
    for (const row of this.renderedData) this._expanded.add(row);

    for (const row of this.renderedData) {
      if (!before.has(row)) this.onRowExpandChange.emit({ row, expanded: true });
    }
    this.onExpandedRowsChange.emit(this.getExpandedRows());
  }

  collapseAll(): void {
    if (!this.hasExpandableRow) return;

    const prev = Array.from(this._expanded);
    this._expanded.clear();

    prev.forEach((row) => this.onRowExpandChange.emit({ row, expanded: false }));
    this.onExpandedRowsChange.emit(this.getExpandedRows());
  }

  get allVisibleExpanded(): boolean {
    if (!this.hasExpandableRow || !this.renderedData.length) return false;
    return this.renderedData.every((row) => this._expanded.has(row));
  }

  onToggleAllExpanded(): void {
    if (!this.hasExpandableRow) return;
    if (!this.allVisibleExpanded) this.expandAll();
    else this.collapseAll();
  }

  onExpandToggle(row: T, event?: MouseEvent): void {
    event?.stopPropagation();
    this.toggleRowExpanded(row);
  }

  private _setExpanded(row: T, expanded: boolean): void {
    if (!this.hasExpandableRow) return;

    const all = this._getAllDataRows();
    if (all.length) {
      const valid = new Set(all);
      if (!valid.has(row)) return;
    }

    const expandSingle = !!this.expandableRowDef?.iRowDefExpandSingle;

    const wasExpanded = this._expanded.has(row);
    if (expanded === wasExpanded) return;

    if (expanded) {
      if (expandSingle) {
        const prev = Array.from(this._expanded).filter((r) => r !== row);
        this._expanded.clear();
        prev.forEach((r) => this.onRowExpandChange.emit({ row: r, expanded: false }));
      }
      this._expanded.add(row);
      this.onRowExpandChange.emit({ row, expanded: true });
    } else {
      this._expanded.delete(row);
      this.onRowExpandChange.emit({ row, expanded: false });
    }

    this.onExpandedRowsChange.emit(this.getExpandedRows());
  }

  /* ---------------- TREE helpers ---------------- */

  get treeEnabled(): boolean {
    return this.tree !== null && this.tree !== false;
  }

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

  private _getInitialExpandLevelInternal(): number | null {
    if (!this.treeEnabled) return null;
    if (this.treeInitialExpandLevel === null) return null;

    const n = Number(this.treeInitialExpandLevel);
    if (!Number.isFinite(n) || n <= 0) return null;
    return n - 1;
  }

  private _shouldRowStartExpanded(level: number, hasChildren: boolean): boolean {
    if (!hasChildren) return false;
    const max = this._getInitialExpandLevelInternal();
    if (max === null) return false;
    return level <= max;
  }

  private _getTreeChildren(row: T): T[] {
    if (!this.treeEnabled || !row) return [];
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

    if (!Array.isArray(data)) return;

    const visit = (row: T, level: number, parent: T | null): void => {
      const children = this._getTreeChildren(row);
      const hasChildren = children.length > 0;
      const expanded = this._shouldRowStartExpanded(level, hasChildren);

      if (parent === null) this._treeRoots.push(row);

      this._treeMeta.set(row, { level, parent, hasChildren, expanded });
      children.forEach((child) => visit(child, level + 1, row));
    };

    data.forEach((root) => visit(root, 0, null));
  }

  private _rebuildTreeRendered(): void {
    if (!this.treeEnabled) return;

    const result: T[] = [];

    const appendVisible = (row: T): void => {
      result.push(row);
      const meta = this._treeMeta.get(row);
      if (!meta?.expanded) return;

      const children = this._getTreeChildren(row);
      for (const child of children) appendVisible(child);
    };

    for (const root of this._treeRoots) appendVisible(root);

    this.renderedData = result;
    this._reconcileSelectionWithData();
    this._reconcileExpandedWithData();
    this._updateCurrentFilterText();
  }

  hasChildren(row: T): boolean {
    if (!this.treeEnabled) return false;
    return this._treeMeta.get(row)?.hasChildren ?? false;
  }

  isExpanded(row: T): boolean {
    if (!this.treeEnabled) return false;
    return this._treeMeta.get(row)?.expanded ?? false;
  }

  get allTreeExpanded(): boolean {
    if (!this.treeEnabled || !this._treeRoots.length) return false;

    for (const meta of this._treeMeta.values()) {
      if (meta.hasChildren && !meta.expanded) return false;
    }
    return true;
  }

  onToggleAllTree(): void {
    if (!this.treeEnabled) return;

    const shouldExpand = !this.allTreeExpanded;

    this._treeMeta.forEach((meta) => {
      if (meta.hasChildren) meta.expanded = shouldExpand;
    });

    this._rebuildTreeRendered();
  }

  toggleRow(row: T): void {
    if (!this.treeEnabled) return;
    const meta = this._treeMeta.get(row);
    if (!meta || !meta.hasChildren) return;

    meta.expanded = !meta.expanded;
    this._rebuildTreeRendered();
  }

  onTreeToggle(row: T, event?: MouseEvent): void {
    event?.stopPropagation();
    this.toggleRow(row);
  }

  /* ---------------- SELECTION helpers ---------------- */

  isRowSelected(row: T): boolean {
    return this._selection.has(row);
  }

  getRowChecked(row: T): boolean {
    if (!this.treeEnabled) return this.isRowSelected(row);

    const descendants = this._getTreeDescendants(row);
    if (!descendants.length) return this.isRowSelected(row);

    const total = descendants.length;
    const selectedChildren = descendants.filter((child) => this._selection.has(child)).length;

    const allChildrenSelected = total > 0 && selectedChildren === total;
    const anyChildrenSelected = selectedChildren > 0;

    if (allChildrenSelected && this._selection.has(row)) return true;
    if (anyChildrenSelected && !allChildrenSelected) return false;

    return this._selection.has(row);
  }

  getRowIndeterminate(row: T): boolean {
    if (!this.treeEnabled) return false;

    const descendants = this._getTreeDescendants(row);
    if (!descendants.length) return false;

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
    if (!this.selectionMode || !this.renderedData.length) return false;
    return this.renderedData.every((row) => this.getRowChecked(row));
  }

  get someVisibleSelected(): boolean {
    if (!this.selectionMode || !this.renderedData.length) return false;
    const anySelected = this.renderedData.some(
      (row) => this.getRowChecked(row) || this.getRowIndeterminate(row),
    );
    return anySelected && !this.allVisibleSelected;
  }

  private _emitSelectionChange(lastChanged: T | null): void {
    if (!this.selectionMode) return;
    this.onSelectionChange.emit({ selected: this.selectedRows, lastChanged });
  }

  private _selectSingle(row: T): void {
    this._selection.clear();
    this._selection.add(row);
    this._emitSelectionChange(row);
  }

  private _toggleMultiple(row: T): void {
    if (this._selection.has(row)) this._selection.delete(row);
    else this._selection.add(row);
    this._emitSelectionChange(row);
  }

  private _setBranchSelection(row: T, selected: boolean): void {
    if (!this.treeEnabled) {
      if (selected) this._selection.add(row);
      else this._selection.delete(row);
      return;
    }

    const allRows = [row, ...this._getTreeDescendants(row)];
    if (selected) allRows.forEach((r) => this._selection.add(r));
    else allRows.forEach((r) => this._selection.delete(r));
  }

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

      if (selectedChildren === 0) this._selection.delete(current);
      else if (selectedChildren === total) this._selection.add(current);
      else this._selection.delete(current);

      current = this._treeMeta.get(current)?.parent ?? null;
    }
  }

  onRowSelectionToggle(row: T): void {
    if (!this.selectionMode) return;

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
        if (this._selection.has(row)) this._selection.delete(row);
        else this._selection.add(row);
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
      const roots = [...this._treeRoots];

      roots.forEach((row) => {
        this._setBranchSelection(row, shouldSelect);
        this._syncSelectionUpwardsFrom(row);
      });
    } else {
      if (shouldSelect) this.renderedData.forEach((row) => this._selection.add(row));
      else this.renderedData.forEach((row) => this._selection.delete(row));
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
      if (validSet.has(row)) newSelection.add(row);
    });

    if (newSelection.size !== this._selection.size) {
      this._selection = newSelection;
      this._emitSelectionChange(null);
    }
  }

  private _reconcileExpandedWithData(): void {
    if (!this.hasExpandableRow) return;

    const all = this._getAllDataRows();
    if (!all.length) {
      if (this._expanded.size) {
        const prev = Array.from(this._expanded);
        this._expanded.clear();
        prev.forEach((r) => this.onRowExpandChange.emit({ row: r, expanded: false }));
        this.onExpandedRowsChange.emit(this.getExpandedRows());
      }
      return;
    }

    const validSet = new Set(all);
    const prev = new Set(this._expanded);

    const next = new Set<T>();
    this._expanded.forEach((row) => {
      if (validSet.has(row)) next.add(row);
    });

    prev.forEach((row) => {
      if (!next.has(row)) this.onRowExpandChange.emit({ row, expanded: false });
    });

    if (next.size !== this._expanded.size) {
      this._expanded = next;
      this.onExpandedRowsChange.emit(this.getExpandedRows());
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

    if (this.dataSource instanceof IGridDataSource) return this.dataSource.data;
    if (Array.isArray(this.dataSource)) return this.dataSource;
    return [];
  }

  /* ---------------- SORT helpers ---------------- */

  sort(column: IGridColumnLike<any>): void {
    if (!(this.dataSource instanceof IGridDataSource)) return;

    const columnId = column.fieldName;
    if (!columnId) return;

    const index = this.sortStates.findIndex((s) => s.active === columnId);

    if (index === -1) this.sortStates.push({ active: columnId, direction: 'asc' });
    else {
      const current = this.sortStates[index];
      if (current.direction === 'asc') current.direction = 'desc';
      else if (current.direction === 'desc') this.sortStates.splice(index, 1);
      else current.direction = 'asc';
    }

    this._applySortToDataSource();
  }

  private _applySortToDataSource(): void {
    if (!(this.dataSource instanceof IGridDataSource)) return;
    this.dataSource.sort = this.sortStates.length ? [...this.sortStates] : null;
  }

  onHeaderClick(col: IGridColumnLike<T>): void {
    if (this._isResizing) return;
    if (!this.isSortable(col)) return;
    this.sort(col);
  }

  isSortable(col: IGridColumnLike<T>): boolean {
    return (
      !!col &&
      col.sortable !== false &&
      !!col.fieldName &&
      this.dataSource instanceof IGridDataSource
    );
  }

  isResizable(col: IGridColumnLike<T>): boolean {
    return !!col && col.resizable !== false;
  }

  /* ---------------- WIDTH helpers ---------------- */

  getColumnWidth(column: IGridColumnLike<any>): number | null {
    const override = this._columnWidths.get(column);
    if (typeof override === 'number') return override;

    if (typeof column.width === 'number') return column.width;
    if (column.width === 'fill') return null;

    return this._defaultColumnWidth;
  }

  setColumnWidth(column: IGridColumnLike<any>, width: number): void {
    if (!column) return;
    this._columnWidths.set(column, width);
  }

  /* ---------------- FROZEN helpers ---------------- */

  private _getFrozenEndIndex(): number {
    for (let i = this.columns.length - 1; i >= 0; i--) {
      if (this.columns[i].freeze) return i;
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

  getColumnStickyLeft(column: IGridColumnLike<any>): number | null {
    if (!this.isColumnFrozen(column)) return null;

    const endIndex = this._getFrozenEndIndex();
    const idx = this.columns.indexOf(column);
    if (endIndex < 0 || idx === -1 || idx > endIndex) return null;

    let left = 0;
    left += this._getSpecialColumnsLeftOffset();

    for (let i = 0; i < idx; i++) {
      const col = this.columns[i];
      if (!this.isColumnFrozen(col)) continue;

      const w = this.getColumnWidth(col);
      if (w === null) return null;
      left += w;
    }

    return left;
  }

  private _getSpecialColumnsLeftOffset(options?: {
    includeNumber?: boolean;
    includeExpand?: boolean;
    includeSelection?: boolean;
  }): number {
    const includeNumber = options?.includeNumber ?? true;
    const includeExpand = options?.includeExpand ?? true;
    const includeSelection = options?.includeSelection ?? true;

    let left = 0;

    if (!this.treeEnabled) {
      if (includeExpand && this.hasExpandableRow) left += this.expandColumnWidth;
      if (includeSelection && !!this.selectionMode) left += this.selectionColumnWidth;
    }

    if (includeNumber && this.showNumberColumnEffective) left += this.numberColumnWidth;

    return left;
  }

  getStickyLeftForExpandColumn(): number {
    return this._getSpecialColumnsLeftOffset({
      includeSelection: false,
      includeExpand: false,
      includeNumber: false,
    });
  }

  getStickyLeftForSelectionColumn(): number {
    return this._getSpecialColumnsLeftOffset({
      includeSelection: false,
      includeExpand: true,
      includeNumber: false,
    });
  }

  getStickyLeftForNumberColumn(): number {
    return this._getSpecialColumnsLeftOffset({
      includeSelection: true,
      includeExpand: true,
      includeNumber: false,
    });
  }

  getFrozenColumnZ(column: IGridColumnLike<any>): number {
    const endIndex = this._getFrozenEndIndex();
    if (endIndex < 0) return 30;

    const idx = this.columns.indexOf(column);
    if (idx === -1) return 30;

    const base = 30;
    return base + (endIndex - idx);
  }

  /* ---------------- PAGINATOR proxies ---------------- */

  get hasPagination(): boolean {
    if (this.treeEnabled) return false;
    return this.dataSource instanceof IGridDataSource && this.dataSource.paginatorEnabled;
  }

  get totalLength(): number {
    if (this.dataSource instanceof IGridDataSource) return this.dataSource.length;
    return this.renderedData.length;
  }

  get pageIndex(): number {
    if (this.dataSource instanceof IGridDataSource) return this.dataSource.pageIndex;
    return 0;
  }

  get pageSize(): number {
    if (this.dataSource instanceof IGridDataSource) return this.dataSource.pageSize;
    return 0;
  }

  get pageSizeOptions(): number[] {
    if (this.dataSource instanceof IGridDataSource) return this.dataSource.pageSizeOptions;
    return [];
  }

  onPageChange(event: { pageIndex: number; pageSize: number }): void {
    if (!(this.dataSource instanceof IGridDataSource)) return;
    this.dataSource.paginator = { pageIndex: event.pageIndex, pageSize: event.pageSize };
  }

  /* ---------------- LIFECYCLE ---------------- */

  ngAfterContentInit(): void {
    this._rebuildColumnsAndHeader();
    this.columnDefs.changes.subscribe(() => this._rebuildColumnsAndHeader());
    this.customColumnDefs.changes.subscribe(() => this._rebuildColumnsAndHeader());
    this.columnGroupDefs.changes.subscribe(() => this._rebuildColumnsAndHeader());

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
    if (this.dataSource instanceof IGridDataSource) this.dataSource.disconnect();
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

  private _rebuildColumnsAndHeader(fromDataChange = false): void {
    const directCols = this.columnDefs?.toArray?.() ?? [];
    const directCustom = this.customColumnDefs?.toArray?.() ?? [];
    const groups = this.columnGroupDefs?.toArray?.() ?? [];

    const hasAnyGrouping = groups.length > 0;

    const groupedColsSet = new Set<IGridColumnLike<T>>();
    const groupedCustomSet = new Set<IGridColumnLike<T>>();

    for (const g of groups) {
      (g.columns?.toArray?.() ?? []).forEach((c) => groupedColsSet.add(c));
      (g.customColumns?.toArray?.() ?? []).forEach((c) => groupedCustomSet.add(c));
    }

    const topLevelCols = directCols.filter((c) => !groupedColsSet.has(c));
    const topLevelCustom = directCustom.filter((c) => !groupedCustomSet.has(c));

    const hasExplicit =
      hasAnyGrouping ||
      topLevelCols.length > 0 ||
      topLevelCustom.length > 0 ||
      directCols.length > 0;

    if (hasExplicit) {
      const headerItems: IGridHeaderItem<T>[] = [];

      for (const c of topLevelCols) headerItems.push({ kind: 'col', col: c });

      for (const g of groups) {
        const gCols: IGridColumnLike<T>[] = [
          ...(g.columns?.toArray?.() ?? []),
          ...(g.customColumns?.toArray?.() ?? []),
        ];
        headerItems.push({ kind: 'group', title: g.title || '', columns: gCols });
      }

      for (const c of topLevelCustom) headerItems.push({ kind: 'col', col: c });

      const flat: IGridColumnLike<T>[] = [];
      for (const item of headerItems) {
        if (item.kind === 'col') flat.push(item.col);
        else flat.push(...item.columns);
      }

      this.headerItems = headerItems;
      this.columns = flat;

      this._seedColumnWidths();
      this._buildHeaderGroupingRows();
      return;
    }

    if (fromDataChange || !this.columns.length) {
      const autoCols = this._buildAutoColumnsFromData();
      this.columns = autoCols;
      this.headerItems = autoCols.map((c) => ({ kind: 'col', col: c }));
      this._seedColumnWidths();
      this._buildHeaderGroupingRows();
      return;
    }

    this.headerItems = this.columns.map((c) => ({ kind: 'col', col: c }));
    this._seedColumnWidths();
    this._buildHeaderGroupingRows();
  }

  private _seedColumnWidths(): void {
    this.columns.forEach((col) => {
      if (!this._columnWidths.has(col)) {
        const px = this.getColumnWidth(col);
        if (px !== null) this._columnWidths.set(col, px);
      }
    });

    if (this.showNumberColumnEffective) {
      const numCol = this.numberColumn;
      if (!this._columnWidths.has(numCol)) this._columnWidths.set(numCol, this.numberColumnWidth);
    }
  }

  private _buildAutoColumnsFromData(): IGridColumnLike<T>[] {
    const rows = this._getAllDataRows();
    if (!rows.length) return [];

    const first = rows[0] as any;
    if (first === null || typeof first !== 'object') return [];

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
          this._rebuildColumnsAndHeader(true);
          this._updateCurrentFilterText();
        });
        return;
      }

      if (Array.isArray(this.dataSource)) {
        const roots = this.dataSource;
        this._buildTreeMeta(roots);
        this._rebuildTreeRendered();
        this._rebuildColumnsAndHeader(true);
        this._updateCurrentFilterText();
        return;
      }

      this.renderedData = [];
      this._reconcileSelectionWithData();
      this._reconcileExpandedWithData();
      this._rebuildColumnsAndHeader(true);
      this._updateCurrentFilterText();
      return;
    }

    if (this.dataSource instanceof IGridDataSource) {
      this._dataSub = this.dataSource.connect().subscribe((data) => {
        this.renderedData = data || [];
        this._reconcileSelectionWithData();
        this._reconcileExpandedWithData();
        this._rebuildColumnsAndHeader(true);
        this._updateCurrentFilterText();
      });
      return;
    }

    if (Array.isArray(this.dataSource)) {
      this.renderedData = this.dataSource;
      this._reconcileSelectionWithData();
      this._reconcileExpandedWithData();
      this._rebuildColumnsAndHeader(true);
      this._updateCurrentFilterText();
      return;
    }

    this.renderedData = [];
    this._reconcileSelectionWithData();
    this._reconcileExpandedWithData();
    this._rebuildColumnsAndHeader(true);
    this._updateCurrentFilterText();
  }

  /* ---------------- HEADER GROUPS ---------------- */

  private _buildHeaderGroupingRows(): void {
    const hasGroups = this.headerItems.some((x) => x.kind === 'group');
    this.hasHeaderGroups = hasGroups;

    this.groupHeaderRow1 = [];
    this.groupHeaderRow2 = [];

    if (!hasGroups) return;

    if (!this.treeEnabled && this.hasExpandableRow && !this.expandableRowDef?.iRowDefExpandSingle) {
      this.groupHeaderRow1.push({
        kind: 'special',
        id: 'expand',
        stickyLeft: this.getStickyLeftForExpandColumn(),
      });
    }

    if (!this.treeEnabled && !!this.selectionMode) {
      this.groupHeaderRow1.push({
        kind: 'special',
        id: 'selection',
        stickyLeft: this.getStickyLeftForSelectionColumn(),
      });
    }

    if (this.showNumberColumnEffective) {
      const sticky = this.hasFrozenColumns ? this.getStickyLeftForNumberColumn() : 0;
      this.groupHeaderRow1.push({
        kind: 'special',
        id: 'number',
        stickyLeft: this.hasFrozenColumns ? sticky : 0,
      });
    }

    for (const item of this.headerItems) {
      if (item.kind === 'col') {
        const col = item.col;
        const stickyLeft = this.isColumnFrozen(col) ? this.getColumnStickyLeft(col) : null;

        this.groupHeaderRow1.push({
          kind: 'col',
          col,
          stickyLeft,
          rowspan: 2,
          colspan: 1,
        });
      } else {
        const g = item;
        this.groupHeaderRow1.push({
          kind: 'group',
          title: g.title || '',
          colspan: g.columns.length,
          stickyLeft: null,
        });

        for (const col of g.columns) {
          const stickyLeft = this.isColumnFrozen(col) ? this.getColumnStickyLeft(col) : null;
          this.groupHeaderRow2.push({ col, stickyLeft });
        }
      }
    }
  }

  /* ---------------- RESIZE ---------------- */

  onResizeMouseDown(col: IGridColumnLike<any>, event: MouseEvent): void {
    if (!col || !this.isResizable(col)) return;

    event.stopPropagation();
    event.preventDefault();

    this._isResizing = true;
    this._resizeCol = col;
    this._resizeStartX = event.clientX;

    const current = this.getColumnWidth(col);
    this._resizeStartWidth = typeof current === 'number' ? current : this._defaultColumnWidth;
  }

  @HostListener('document:mousemove', ['$event'])
  onDocumentMouseMove(event: MouseEvent): void {
    if (!this._isResizing || !this._resizeCol) return;

    const delta = event.clientX - this._resizeStartX;
    let newWidth = this._resizeStartWidth + delta;

    if (newWidth < this._minWidth) newWidth = this._minWidth;

    this.setColumnWidth(this._resizeCol, newWidth);
  }

  @HostListener('document:mouseup')
  onDocumentMouseUp(): void {
    if (!this._isResizing) return;

    // eslint-friendly (no "expression statement" issues)
    setTimeout(() => {
      this._isResizing = false;
      this._resizeCol = null;
    }, 0);
  }

  /* ---------------- ROW click ---------------- */

  onRowClicked(row: T): void {
    this.onRowClick.emit(row);
  }

  /* ---------------- TEMPLATE helpers ---------------- */

  get singleSelectionName(): string {
    return `i-grid-radio-${this._id}`;
  }

  getRowNumber(visibleRowIndex: number): number {
    if (this.dataSource instanceof IGridDataSource && this.hasPagination) {
      return this.pageIndex * this.pageSize + visibleRowIndex + 1;
    }
    return visibleRowIndex + 1;
  }
}

/* ----------------------------------------------------
 * EXPORT GROUP
 * ---------------------------------------------------- */

export const I_GRID_DECLARATIONS = [
  IGrid,
  IGridColumn,
  IGridCustomColumn,
  IGridColumnGroup,
  IGridHeaderCellDefDirective,
  IGridCellDefDirective,
  IGridRowDefDirective,
  IGridExpandableRow,
  IGridCell,
];

@NgModule({
  imports: [...I_GRID_DECLARATIONS, IPaginator],
  exports: [...I_GRID_DECLARATIONS, IPaginator],
})
export class IGridModule {}
