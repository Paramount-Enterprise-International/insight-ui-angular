import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IBanner, type IBannerVariant, IUI } from '@insight/ui';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IUI, IBanner],
  templateUrl: './banner.html',
})
export class BannerDemo {
  readonly variants: IBannerVariant[] = [
    'neutral',
    'primary',
    'success',
    'info',
    'warning',
    'danger',
  ];
  open = true;
  count = 0;
  closed = 0;
}
