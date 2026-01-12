/* paginator.ts */

/**
 * IPaginator
 * Version: 1.2.0
 *
 * - Page size buttons (left)
 * - Numeric pagination with ellipsis (right)
 * - DevExtreme-like behavior:
 *   <= 6 pages: 1 2 3 4 5 6
 *   > 6 pages:
 *     - near start: 1 2 3 4 5 ... 10
 *     - middle:     1 ... 3 4 [5] 6 ... 10
 *     - near end:   1 ... 6 7 8 9 10
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IButton } from '../button/button';

export type IPaginatorState = {
  pageIndex: number;
  pageSize: number;
};

type IPaginatorItem =
  | { type: 'page'; pageIndex: number; label: string; active: boolean }
  | { type: 'ellipsis'; key: string };

@Component({
  selector: 'i-paginator',
  standalone: true,
  imports: [IButton],
  template: `
    <div class="i-paginator flex align-center gap-md flex-fill">
      <!-- Page size -->
      @for (size of pageSizeOptions; track size) {
        <i-button size="sm" [disabled]="pageSize === size" (onClick)="changePageSize(size)">
          {{ size }}
        </i-button>
      }

      <span class="flex-fill"></span>
      <p>
        Page {{ pageIndex + 1 }} of {{ pageCount }} ({{ length }} row{{ length > 1 ? 's' : '' }})
      </p>

      @if (pageCount > 1) {
        <!-- Pages -->
        <div class="i-paginator-pages flex align-center gap-xs">
          @for (item of pageItems; track trackItem(item)) {
            @if (item.type === 'ellipsis') {
              <span aria-hidden="true" class="i-paginator-ellipsis">...</span>
            } @else {
              <i-button size="sm" [disabled]="item.active" (onClick)="goToPage(item.pageIndex)">
                {{ item.label }}
              </i-button>
            }
          }
        </div>
      }
    </div>
  `,
  host: {
    class: 'i-paginator',
  },
})
export class IPaginator {
  @Input() length = 0;
  @Input() pageIndex = 0; // 0-based
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [10, 50, 100];

  @Output() readonly pageChange = new EventEmitter<IPaginatorState>();

  /** Max numeric pages shown (not counting ellipsis). Matches your examples. */
  private readonly _maxVisiblePages = 6;

  get pageCount(): number {
    return Math.max(1, Math.ceil(this.length / this.pageSize));
  }

  get pageItems(): IPaginatorItem[] {
    const total = this.pageCount;
    const current = this.pageIndex + 1; // 1-based for easier math
    const last = total;

    // If <= 6 pages: show all
    if (total <= this._maxVisiblePages) {
      return this._range(1, last).map((p) => this._pageItem(p, current));
    }

    // total > 6
    // Behavior:
    // - Near start (current <= 4): 1 2 3 4 5 ... last
    // - Near end (current >= last - 3): 1 ... last-4 last-3 last-2 last-1 last
    // - Middle: 1 ... (current-2 current-1 current current+1) ... last
    if (current <= 4) {
      const items: IPaginatorItem[] = [
        ...this._range(1, 5).map((p) => this._pageItem(p, current)),
        { type: 'ellipsis', key: 'e-end' },
        this._pageItem(last, current),
      ];
      return items;
    }

    if (current >= last - 3) {
      const start = last - 4;
      const items: IPaginatorItem[] = [
        this._pageItem(1, current),
        { type: 'ellipsis', key: 'e-start' },
        ...this._range(start, last).map((p) => this._pageItem(p, current)),
      ];
      return items;
    }

    // middle
    const midStart = current - 2;
    const midEnd = current + 1;

    const items: IPaginatorItem[] = [
      this._pageItem(1, current),
      { type: 'ellipsis', key: 'e-start' },
      ...this._range(midStart, midEnd).map((p) => this._pageItem(p, current)),
      { type: 'ellipsis', key: 'e-end' },
      this._pageItem(last, current),
    ];
    return items;
  }

  trackItem(item: IPaginatorItem): string {
    if (item.type === 'ellipsis') {
      return item.key;
    }
    return `p-${item.pageIndex}`;
  }

  private _pageItem(pageNumber1Based: number, current1Based: number): IPaginatorItem {
    const idx = pageNumber1Based - 1;
    return {
      type: 'page',
      pageIndex: idx,
      label: String(pageNumber1Based),
      active: pageNumber1Based === current1Based,
    };
  }

  private _range(from: number, to: number): number[] {
    const out: number[] = [];
    for (let i = from; i <= to; i++) out.push(i);
    return out;
  }

  private emit(): void {
    // clamp, just in case
    const maxIndex = this.pageCount - 1;
    if (this.pageIndex < 0) this.pageIndex = 0;
    if (this.pageIndex > maxIndex) this.pageIndex = maxIndex;

    this.pageChange.emit({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    });
  }

  goToPage(pageIndex: number): void {
    const maxIndex = this.pageCount - 1;
    const next = Math.max(0, Math.min(maxIndex, pageIndex));

    if (next === this.pageIndex) {
      return;
    }

    this.pageIndex = next;
    this.emit();
  }

  changePageSize(value: number): void {
    const newSize = Number(value);
    if (!Number.isFinite(newSize) || newSize <= 0) {
      return;
    }

    const oldSize = this.pageSize;

    // keep current "first item" visible after resizing page size
    const firstItemIndex = this.pageIndex * oldSize;

    this.pageSize = newSize;
    this.pageIndex = Math.floor(firstItemIndex / newSize);

    this.emit();
  }
}
