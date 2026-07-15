/**
 * IAvatar
 * Version: 1.0.0
 * <i-avatar />
 *
 * Displays a user photo in a circle, square, or rounded-square container.
 * Falls back to a FontAwesome user icon when no image is available.
 */

import { Component, HostBinding, Input } from '@angular/core';

import { IIcon, type IIconSize } from '../icon';

// ─── Size Mapping ────────────────────────────────────────────────────────────

const SIZE_PRESETS: Record<IIconSize, number> = {
  '3xs': 12,
  '2xs': 16,
  xs: 20,
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
  '2xl': 128,
  '3xl': 160,
  '4xl': 200,
};

/**
 * Resolve the best IIconSize for a given avatar pixel size.
 * The icon should fill roughly 50–60% of the container.
 */
function resolveIconSizeFromPx(px: number): IIconSize {
  if (px <= 24) return 'sm';
  if (px <= 40) return 'md';
  if (px <= 64) return 'lg';
  if (px <= 96) return 'xl';
  if (px <= 128) return '2xl';
  if (px <= 160) return '3xl';
  return '4xl';
}

// ─── Component ───────────────────────────────────────────────────────────────

@Component({
  selector: 'i-avatar',
  standalone: true,
  imports: [IIcon],
  template: `
    <!-- Primary image -->
    @if (!hasError && src) {
      <img [alt]="alt ?? ''" [src]="src" (error)="onImgError()" />
    }
    <!-- Fallback image -->
    @else if (fallbackSrc && !hasFallbackError) {
      <img [alt]="alt ?? ''" [src]="fallbackSrc" (error)="onFallbackError()" />
    }
    <!-- Ultimate fallback: user icon -->
    @else {
      <i-icon icon="user" [size]="resolvedIconSize" />
    }
  `,
})
export class IAvatar {
  // ─── Inputs ────────────────────────────────────────────────────────────

  /** Image URL. When empty or on error, falls back to fallbackSrc or icon. */
  @Input() src?: string | null;

  /** Alt text for the image. */
  @Input() alt?: string;

  /**
   * Container size.
   * - `number` → treated as pixels (e.g. `200` = 200px)
   * - `IIconSize` string → uses a preset mapping (e.g. `'lg'` = 64px)
   * @default 40
   */
  @Input() size: number | IIconSize = 40;

  /**
   * Container shape.
   * @default 'circle'
   */
  @Input() shape?: 'circle' | 'square' | 'rounded-square' = 'circle';

  /** Fallback image URL. Used when `src` fails to load. If not set (or also fails), shows the user icon. */
  @Input() fallbackSrc?: string | null;

  /** Additional CSS classes to inject onto the host element (e.g. `"border-2 border-primary"`). */
  @Input() className?: string;

  // ─── Internal state ────────────────────────────────────────────────────

  /** Whether the primary `src` image failed to load. */
  hasError = false;

  /** Whether the `fallbackSrc` image also failed to load. */
  hasFallbackError = false;

  // ─── Host bindings ─────────────────────────────────────────────────────

  @HostBinding('class.i-avatar') readonly baseClass = true;

  @HostBinding('attr.data-shape')
  get attrShape(): string {
    return this.shape ?? 'circle';
  }

  @HostBinding('style.width.px')
  @HostBinding('style.height.px')
  get resolvedSizePx(): number {
    if (typeof this.size === 'number') return this.size;
    return SIZE_PRESETS[this.size] ?? 40;
  }

  @HostBinding('class')
  get hostClass(): string | undefined {
    return this.className;
  }

  // ─── Computed ──────────────────────────────────────────────────────────

  /** Icon size for the fallback `<i-icon>`. */
  get resolvedIconSize(): IIconSize {
    if (typeof this.size === 'string') return this.size;
    return resolveIconSizeFromPx(this.size);
  }

  // ─── Event handlers ────────────────────────────────────────────────────

  onImgError(): void {
    this.hasError = true;
  }

  onFallbackError(): void {
    this.hasFallbackError = true;
  }
}
