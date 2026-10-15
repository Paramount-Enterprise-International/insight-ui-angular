import { Directive, Input } from '@angular/core';

import { IMenuGateDirective, IPermissionInput } from './has-mn';

/** Renders the template when a menu shorthand or authorization predicate denies it. */
@Directive({ selector: '[iNotHasMn]', standalone: true })
export class INotHasMnDirective extends IMenuGateDirective {
  protected readonly invert = true;

  @Input()
  set iNotHasMn(value: IPermissionInput) {
    this.value$.next(value);
  }
}
