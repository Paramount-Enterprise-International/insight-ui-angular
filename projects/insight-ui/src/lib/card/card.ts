/**
 * ICard
 * Version: 1.0.0
 * <i-card></i-card>
 */

import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  isDevMode,
  NgModule,
  OnInit,
  Output,
} from '@angular/core';
import { RouterLink } from '@angular/router';

type RouterLinkInput = string | any[] | undefined;

@Component({
  selector: 'i-card',
  standalone: true,
  imports: [RouterLink, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template #content>
      <ng-content />
    </ng-template>

    @if (useRouterLink) {
    <a
      class="i-card"
      [attr.aria-disabled]="disabled ? 'true' : null"
      [attr.rel]="relAttr"
      [attr.tabindex]="disabled ? -1 : null"
      [attr.target]="target ?? null"
      [fragment]="fragment"
      [queryParams]="queryParams"
      [replaceUrl]="replaceUrl"
      [routerLink]="routerLink!"
      [skipLocationChange]="skipLocationChange"
      [state]="state"
      (click)="onClick($event)"
    >
      <ng-container [ngTemplateOutlet]="content" />
    </a>
    } @else {
    <a
      class="i-card"
      [attr.aria-disabled]="disabled ? 'true' : null"
      [attr.href]="hrefAttr"
      [attr.rel]="relAttr"
      [attr.tabindex]="disabled ? -1 : null"
      [attr.target]="target ?? null"
      (click)="onClick($event)"
    >
      <ng-container [ngTemplateOutlet]="content" />
    </a>
    }
  `,
})
export class ICard implements OnInit {
  /* ======================
   * Inputs
   * ====================== */

  // External / normal anchor
  @Input() href?: string | null;

  // Angular Router
  @Input() routerLink?: RouterLinkInput;

  @Input() queryParams?: Record<string, any> | null;
  @Input() fragment?: string;
  @Input() replaceUrl = false;
  @Input() skipLocationChange = false;
  @Input() state?: Record<string, any>;

  // Anchor-related
  @Input() target?: '_self' | '_blank' | '_parent' | '_top' | string;
  @Input() rel?: string | null;

  @Input() disabled = false;

  // Click-only usage
  @Output() readonly cardClick = new EventEmitter<MouseEvent>();

  /* ======================
   * Derived flags
   * ====================== */

  get useRouterLink(): boolean {
    if (this.disabled) return false;
    return this.routerLink !== undefined && this.routerLink !== null && this.routerLink !== '';
  }

  /* ======================
   * Dev-mode validation
   * ====================== */

  ngOnInit(): void {
    if (!isDevMode()) return;

    const hasHref = !!this.href;
    const hasRouter =
      this.routerLink !== undefined && this.routerLink !== null && this.routerLink !== '';

    const hasClick = this.cardClick.observed;

    if (hasHref && hasRouter) {
      console.warn('[i-card] Do not use `href` and `routerLink` together. Choose one.', this);
    }

    if (hasClick && (hasHref || hasRouter)) {
      console.warn(
        '[i-card] `(cardClick)` should not be combined with `href` or `routerLink`.',
        this
      );
    }

    if (!hasHref && !hasRouter && !hasClick) {
      console.warn(
        '[i-card] No action provided. Add `href`, `routerLink`, or `(cardClick)`.',
        this
      );
    }
  }

  /* ======================
   * Attribute helpers
   * ====================== */

  get relAttr(): string | null {
    if (this.rel) return this.rel;
    if ((this.target ?? '').toLowerCase() === '_blank') return 'noopener noreferrer';
    return null;
  }

  get hrefAttr(): string | null {
    if (this.disabled) return null;
    // only for the non-router template
    return this.href ?? null;
  }

  /* ======================
   * Click handling
   * ====================== */

  onClick(ev: MouseEvent): void {
    if (this.disabled) {
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }

    // Button-like behavior
    if (this.cardClick.observed) {
      ev.preventDefault();
      this.cardClick.emit(ev);
      return;
    }

    // Prevent empty anchor navigation
    const hasHref = !!this.href;
    const hasRouter = this.useRouterLink;

    if (!hasHref && !hasRouter) {
      ev.preventDefault();
    }
  }
}

@Component({
  selector: 'i-card-image',
  imports: [],
  template: `<img alt="card-image" [src]="src" />`,
})
export class ICardImage {
  @Input() src!: string;
}

@Component({
  selector: 'i-card-body',
  imports: [],
  template: `<ng-content />`,
})
export class ICardBody {}

@Component({
  selector: 'i-card-footer',
  imports: [],
  template: `<ng-content />`,
})
export class ICardFooter {}

@NgModule({
  imports: [ICard, ICardBody, ICardFooter, ICardImage],
  exports: [ICard, ICardBody, ICardFooter, ICardImage],
})
export class ICardModule {}
