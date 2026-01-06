/* paginator.ts */

/**
 * IPaginator
 * Version: 1.1.0
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IButton } from '../button/button';

export type IPaginatorState = {
  pageIndex: number;
  pageSize: number;
};

@Component({
  selector: 'i-paginator',
  standalone: true,
  imports: [IButton],
  template: `<div class="i-paginator flex align-center gap-2">
    <i-button icon="prev" size="sm" [disabled]="pageIndex <= 0" (onClick)="previousPage()" />
    <span>Page {{ pageIndex + 1 }} / {{ pageCount }}</span>
    <i-button
      icon="next"
      size="sm"
      [disabled]="pageIndex >= pageCount - 1"
      (onClick)="nextPage()"
    />

    <span class="ms-2">
      | Show
      <select
        class="form-select form-select-sm d-inline-block w-auto"
        [value]="pageSize"
        (change)="changePageSize($any($event.target).value)"
      >
        @for (size of pageSizeOptions; track size) {
        <option [value]="size">{{ size }}</option>
        }
      </select>
      per page ({{ length }} total)
    </span>
  </div>`,
})
export class IPaginator {
  @Input() length = 0;

  @Input() pageIndex = 0;

  @Input() pageSize = 10;

  @Input() pageSizeOptions = [10, 50, 100];

  @Output() pageChange = new EventEmitter<IPaginatorState>();

  get pageCount(): number {
    return Math.max(1, Math.ceil(this.length / this.pageSize));
  }

  private emit(): void {
    this.pageChange.emit({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    });
  }

  nextPage(): void {
    if (this.pageIndex < this.pageCount - 1) {
      this.pageIndex++;
      this.emit();
    }
  }

  previousPage(): void {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.emit();
    }
  }

  changePageSize(value: string): void {
    const newSize = Number(value);
    const oldSize = this.pageSize;

    this.pageSize = newSize;
    const firstItemIndex = this.pageIndex * oldSize;
    this.pageIndex = Math.floor(firstItemIndex / newSize);

    this.emit();
  }
}
