import { Directive, Input } from '@angular/core';

import { IHMenuGateDirective, IInsightPermissionInput } from './has-mn';

/**
 * Structural directive `*ihNotHasMn` — the inverse of `ihHasMn`: renders the
 * element only while the current user does NOT have the given menu code / role.
 *
 * Usage:
 * ```html
 * <div *ihNotHasMn="'super-admin'">Everyone except super-admin</div>
 * <i *ihNotHasMn="{ source: 'role', value: 'iam-admin' }">Non-admin</i>
 * ```
 */
@Directive({ selector: '[ihNotHasMn]', standalone: true })
export class IHNotHasMnDirective extends IHMenuGateDirective {
  protected readonly invert = true;

  @Input()
  set ihNotHasMn(value: IInsightPermissionInput) {
    this.value$.next(value);
  }
}
