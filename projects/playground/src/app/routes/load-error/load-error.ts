import { ChangeDetectionStrategy, Component } from '@angular/core';
import { type ILoadErrorDensity, IUI } from '@insight/ui';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IUI],
  templateUrl: './load-error.html',
})
export class LoadErrorDemo {
  readonly densities: ILoadErrorDensity[] = ['default', 'compact', 'inline'];
  disabled = false;
  loading = false;
  attempts = 0;
}
