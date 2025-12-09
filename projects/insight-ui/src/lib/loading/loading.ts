/**
 * ILoading
 * Version: 1.0.0
 * <i-loading></i-loading>
 */

import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'i-loading',
  imports: [],
  templateUrl: './loading.html',
})
export class ILoading {
  @Input() label = 'Loading..';
  @Input() light: boolean = false;
  @HostBinding('attr.light')
  get isLight(): boolean {
    return this.light;
  }
}
