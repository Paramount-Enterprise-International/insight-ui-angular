/* paginator.ts */

/**
 * IPaginator
 * Version: 1.1.0
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IButton } from '../button/button';

export interface IPaginatorState {
  pageIndex: number;
  pageSize: number;
}

@Component({
  selector: 'i-paginator',
  standalone: true,
  imports: [IButton],
  templateUrl: './paginator.html',
})
export class IPaginator {
  @Input() length = 0;
  @Input() pageIndex = 0;
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [10, 50, 100];

  @Output() pageChange = new EventEmitter<IPaginatorState>();

  get pageCount() {
    return Math.max(1, Math.ceil(this.length / this.pageSize));
  }

  private emit() {
    this.pageChange.emit({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    });
  }

  nextPage() {
    if (this.pageIndex < this.pageCount - 1) {
      this.pageIndex++;
      this.emit();
    }
  }

  previousPage() {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.emit();
    }
  }

  changePageSize(value: string) {
    const newSize = Number(value);
    const oldSize = this.pageSize;

    this.pageSize = newSize;
    const firstItemIndex = this.pageIndex * oldSize;
    this.pageIndex = Math.floor(firstItemIndex / newSize);

    this.emit();
  }
}
