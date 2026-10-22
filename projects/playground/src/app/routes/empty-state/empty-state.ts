import { ChangeDetectionStrategy, Component } from '@angular/core';
import { type IEmptyStateKind, IGridDataSource, IUI } from '@insight/ui';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IUI],
  templateUrl: './empty-state.html',
})
export class EmptyStateDemo {
  readonly kinds: IEmptyStateKind[] = [
    'empty',
    'search',
    'filter',
    'search-filter',
    'prerequisite',
  ];
  kind: IEmptyStateKind = 'empty';
  loading = true;
  search = '';
  actions = 0;
  readonly emptyData = new IGridDataSource<{ name: string }>([], { paginator: { pageSize: 10 } });
  readonly searchData = new IGridDataSource(
    Array.from({ length: 12 }, (_, index) => ({ name: 'Record ' + (index + 1) })),
    { paginator: { pageSize: 10 } },
  );
  changeKind(event: Event): void {
    this.kind = (event.target as HTMLSelectElement).value as IEmptyStateKind;
  }
  searchInput(event: Event): void {
    this.search = (event.target as HTMLInputElement).value;
    this.searchData.filter = this.search;
  }
}
