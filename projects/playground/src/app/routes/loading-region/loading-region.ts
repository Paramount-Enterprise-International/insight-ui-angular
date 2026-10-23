import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IGridDataSource, IUI } from '@insight/ui';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IUI],
  templateUrl: './loading-region.html',
})
export class LoadingRegionDemo {
  loading = false;
  readonly data = new IGridDataSource(
    Array.from({ length: 12 }, (_, index) => ({ name: 'Record ' + (index + 1) })),
    { paginator: { pageSize: 10 } },
  );
}
