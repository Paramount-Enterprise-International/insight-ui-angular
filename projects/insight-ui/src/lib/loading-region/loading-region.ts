import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';

import { ILoading } from '../loading';
export type ISurfaceLayout = 'auto' | 'padded' | 'flush';

@Component({
  selector: 'i-loading-region',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ILoading],
  templateUrl: './loading-region.html',
  host: {
    class: 'i-loading-region',
    'data-i-surface': 'delegate',
    '[attr.layout]': 'layout',
    '[style.--i-region-state-min-height]': 'initialMinHeight',
    style: 'min-width: 0; min-height: 0',
  },
})
export class ILoadingRegion implements OnChanges, AfterViewInit {
  @Input() loading = false;
  @Input() error: unknown = null;
  @Input() label = 'Loading...';
  @Input() containerClass = '';
  @Input() contentClass = 'flex flex-col';
  @Input() initialMinHeight = 'var(--i-state-min-height, min(40vh, 240px))';
  @Input() height: string | null = null;
  @Input() contextKey: unknown = null;
  @Input() layout: ISurfaceLayout = 'auto';

  @ViewChild('content', { static: true }) private content?: ElementRef<HTMLElement>;

  hasLoaded = false;
  private completedContext: unknown = null;
  private contentHeight = 0;
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  get minHeight(): string | null {
    if (!this.loading) return null;
    return this.hasLoaded && this.contentHeight > 0
      ? `${this.contentHeight}px`
      : this.initialMinHeight;
  }

  get hidePreviousContext(): boolean {
    return this.loading && this.hasLoaded && this.contextKey !== this.completedContext;
  }

  ngOnChanges(): void {
    if (this.loading) {
      const height = this.content?.nativeElement.getBoundingClientRect().height ?? 0;
      if (height > 0) this.contentHeight = height;
    } else if (!this.error) {
      this.hasLoaded = true;
      this.completedContext = this.contextKey;
    }
  }

  ngAfterViewInit(): void {
    const ResizeObserverType = this.document.defaultView?.ResizeObserver;
    if (!ResizeObserverType || !this.content) return;
    const observer = new ResizeObserverType((entries) => {
      if (this.loading) return;
      const height = entries[0]?.contentRect.height ?? 0;
      if (height !== this.contentHeight) {
        this.contentHeight = height;
        this.cdr.markForCheck();
      }
    });
    observer.observe(this.content.nativeElement);
    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}
