import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { IIcon } from '../icon';
export type IBannerVariant = 'neutral' | 'primary' | 'success' | 'info' | 'warning' | 'danger';
@Component({
  selector: 'i-banner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IIcon],
  host: {
    class: 'i-banner',
    '[attr.variant]': 'variant',
    '[style.display]': 'visible ? null : "none"',
    '[attr.role]': 'variant === "danger" ? "alert" : "status"',
  },
  template: `
    @if (prefixIcon) {
      <i-icon aria-hidden="true" class="i-banner__icon" [icon]="prefixIcon" />
    }
    <div class="i-banner__body">
      @if (message?.trim()) {
        <div class="i-banner__message">{{ message }}</div>
      }
      <div #projected class="i-banner__content"><ng-content /></div>
    </div>
    @if (suffixIcon) {
      <i-icon aria-hidden="true" class="i-banner__icon" [icon]="suffixIcon" />
    }
    @if (closable) {
      <button
        class="i-banner__close"
        type="button"
        [attr.aria-label]="closeLabel"
        (click)="close($event)"
      >
        <i-icon aria-hidden="true" icon="x" />
      </button>
    }
  `,
})
export class IBanner implements AfterViewInit {
  @Input() message: string | null | undefined = '';
  @Input() variant: IBannerVariant = 'info';
  @Input() prefixIcon = '';
  @Input() suffixIcon = '';
  @Input({ transform: booleanAttribute }) closable = false;
  @Input() closeLabel = 'Close';
  @Input({
    transform: (value: unknown) =>
      value === null || value === undefined ? undefined : booleanAttribute(value),
  })
  open: boolean | undefined;
  @Input({ transform: booleanAttribute }) defaultOpen = true;
  @Output() readonly openChange = new EventEmitter<boolean>();
  @Output() readonly onClose = new EventEmitter<MouseEvent>();
  @ViewChild('projected', { static: true }) private projected!: ElementRef<HTMLElement>;
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private dismissed = false;
  private initialOpen: boolean | undefined;
  private hasChildren = false;
  get visible(): boolean {
    return (
      (this.open ?? ((this.initialOpen ?? this.defaultOpen) && !this.dismissed)) &&
      (Boolean(this.message?.trim()) || this.hasChildren)
    );
  }
  ngAfterViewInit(): void {
    this.initialOpen = this.defaultOpen;
    const update = (): void => {
      const hasChildren = [...this.projected.nativeElement.childNodes].some(
        (node) => node.nodeType === 1 || (node.nodeType === 3 && Boolean(node.textContent?.trim())),
      );
      if (this.hasChildren !== hasChildren) {
        this.hasChildren = hasChildren;
        this.cdr.markForCheck();
      }
    };
    queueMicrotask(() => {
      if (!this.destroyRef.destroyed) update();
    });
    const Observer = this.projected.nativeElement.ownerDocument.defaultView?.MutationObserver;
    if (Observer) {
      const observer = new Observer(update);
      observer.observe(this.projected.nativeElement, {
        childList: true,
        characterData: true,
        subtree: true,
      });
      this.destroyRef.onDestroy(() => observer.disconnect());
    }
  }
  close(event: MouseEvent): void {
    event.stopPropagation();
    if (!this.closable || !this.visible) return;
    if (this.open === undefined) this.dismissed = true;
    this.openChange.emit(false);
    this.onClose.emit(event);
    this.cdr.markForCheck();
  }
}
