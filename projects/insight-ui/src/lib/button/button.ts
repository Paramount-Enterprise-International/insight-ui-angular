import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IIcon, IIconName } from '../icon/icon';
import { IUISize, IUIVariant } from '../interfaces';
import { ILoading } from '../loading/loading';

export type IButtonType = 'button' | 'submit' | 'reset';
export type IButtonSize = Extract<IUISize, '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg'>;
export type IButtonVariant = Extract<
  IUIVariant,
  'primary' | 'warning' | 'danger' | 'success' | 'outline'
>;

@Component({
  selector: 'i-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, RouterLink, ILoading, IIcon],
  template: `
    <!-- ROUTER LINK -->
    @if (routerLink) {
      <a
        class="i-button-inner"
        [attr.aria-disabled]="isDisabled ? 'true' : null"
        [attr.rel]="computedRel"
        [attr.target]="target"
        [fragment]="fragment"
        [queryParams]="queryParams"
        [routerLink]="routerLink"
        [state]="state"
        (click)="handleClick($event)"
      >
        <ng-container *ngTemplateOutlet="content" />
      </a>
    }

    <!-- HREF -->
    @else if (href) {
      <a
        class="i-button-inner"
        [attr.aria-disabled]="isDisabled ? 'true' : null"
        [attr.href]="isDisabled ? null : href"
        [attr.rel]="computedRel"
        [attr.target]="target"
        (click)="handleClick($event)"
      >
        <ng-container *ngTemplateOutlet="content" />
      </a>
    }

    <!-- BUTTON -->
    @else {
      <button
        class="i-button-inner"
        [disabled]="isDisabled"
        [type]="type"
        (click)="handleClick($event)"
      >
        <ng-container *ngTemplateOutlet="content" />
      </button>
    }

    <!-- SHARED CONTENT -->
    <ng-template #content>
      @if (loading) {
        <i-loading [label]="loadingText" [light]="variant !== 'outline'" />
      } @else {
        @if (icon) {
          <i-icon [icon]="icon" [size]="size" />
        }
        <ng-content />
      }
    </ng-template>
  `,
})
export class IButton {
  /* ---------- BASE INPUTS ---------- */

  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) loading = false;

  @Input() type: IButtonType = 'button';
  @Input() loadingText = '';

  @Input() variant: IButtonVariant = 'primary';
  @Input() size: IButtonSize = 'md';
  @Input() icon: IIconName | (string & {}) | undefined;

  /* ---------- ROUTER SUPPORT ---------- */

  @Input() routerLink?: any[] | string;
  @Input() queryParams?: Record<string, any>;
  @Input() fragment?: string;
  @Input() state?: any;

  /* ---------- HREF SUPPORT ---------- */

  @Input() href?: string;
  @Input() target?: '_blank' | '_self' | '_parent' | '_top';
  @Input() rel?: string;

  /* ---------- OUTPUT ---------- */

  @Output() readonly onClick = new EventEmitter<MouseEvent>();

  /* ---------- DERIVED ---------- */

  get isDisabled(): boolean {
    return this.disabled || this.loading;
  }

  get computedRel(): string | null {
    if (this.target === '_blank') {
      return this.rel ?? 'noopener noreferrer';
    }
    return this.rel ?? null;
  }

  /* ---------- HOST REFLECTION (for your CSS) ---------- */

  @HostBinding('attr.variant')
  get hostVariant(): string {
    return this.variant;
  }

  @HostBinding('attr.size')
  get hostSize(): string {
    return this.size;
  }

  @HostBinding('attr.aria-disabled')
  get ariaDisabled(): string | null {
    return this.isDisabled ? 'true' : null;
  }

  @HostBinding('attr.aria-busy')
  get ariaBusy(): string | null {
    return this.loading ? 'true' : null;
  }

  @HostBinding('attr.data-mode')
  get mode(): string {
    if (this.routerLink) return 'router';
    if (this.href) return 'anchor';
    return 'button';
  }

  /* ---------- CLICK ---------- */

  handleClick(event: MouseEvent): void {
    if (this.isDisabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    this.onClick.emit(event);
  }
}
