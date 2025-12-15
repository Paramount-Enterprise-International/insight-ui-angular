/**
 * ICard
 * Version: 1.0.0
 * <i-card></i-card>
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  isDevMode,
} from '@angular/core';
import { RouterLink } from '@angular/router';

type RouterLinkInput = string | any[] | undefined;

@Component({
  selector: 'i-card',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card.html',
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
  @Output() cardClick = new EventEmitter<MouseEvent>();

  /* ======================
   * Dev-mode validation
   * ====================== */

  ngOnInit() {
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
    if ((this.target ?? '').toLowerCase() === '_blank') {
      return 'noopener noreferrer';
    }
    return null;
  }

  get hrefAttr(): string | null {
    if (this.disabled) return null;
    if (this.routerLinkAttr) return null;
    return this.href ?? null;
  }

  get routerLinkAttr(): RouterLinkInput {
    if (this.disabled) return undefined;
    return this.routerLink ?? undefined;
  }

  /* ======================
   * Click handling
   * ====================== */

  onClick(ev: MouseEvent) {
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

    // Prevent empty anchor navigation (# / top)
    const hasHref = !!this.href;
    const hasRouter =
      this.routerLink !== undefined && this.routerLink !== null && this.routerLink !== '';

    if (!hasHref && !hasRouter) {
      ev.preventDefault();
    }
  }
}
