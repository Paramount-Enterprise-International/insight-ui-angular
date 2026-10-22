/**
 * ILoading
 * Version: 1.0.0
 * <i-loading></i-loading>
 */

import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

export type ILoadingMode = 'inline' | 'container' | 'fullpage';

@Component({
  selector: 'i-loading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `<div
      class="spinner-border spinner-border-sm"
      [attr.role]="mode === 'inline' ? 'status' : null"
      [attr.aria-hidden]="mode === 'inline' ? null : 'true'"
      [class.light]="light"
    ></div>
    {{ label }}
    @if (mode !== 'inline' && !label) {
      <span class="sr-only">Loading...</span>
    }`,
})
export class ILoading {
  @Input() label = 'Loading..';

  @Input() light = false;

  @Input() @HostBinding('attr.mode') mode: ILoadingMode = 'inline';

  @HostBinding('attr.role')
  get statusRole(): string | null {
    return this.mode === 'inline' ? null : 'status';
  }

  @HostBinding('attr.aria-live')
  get live(): string | null {
    return this.mode === 'inline' ? null : 'polite';
  }

  @HostBinding('attr.light')
  get isLight(): boolean {
    return this.light;
  }
}
