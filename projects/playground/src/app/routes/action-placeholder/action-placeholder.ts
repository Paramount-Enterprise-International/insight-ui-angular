import { ChangeDetectionStrategy, Component } from '@angular/core';
import { type IButtonSize, IUI } from '@insight/ui';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IUI],
  templateUrl: './action-placeholder.html',
})
export class ActionPlaceholderDemo {
  readonly sizes: IButtonSize[] = ['3xs', '2xs', 'xs', 'sm', 'md', 'lg'];
  size: IButtonSize = 'xs';
  placeholder = false;
  clicks = 0;
  changeSize(event: Event): void {
    this.size = (event.target as HTMLSelectElement).value as IButtonSize;
  }
}
