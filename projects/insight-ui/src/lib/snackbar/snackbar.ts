import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  PLATFORM_ID,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { IBanner, type IBannerVariant } from '../banner';
import { IButton } from '../button';
import { nextSnackbarId, SnackbarMount } from './snackbar-runtime';
import { SnackbarSettings } from './snackbar-settings';
import type { ISnackbarDismissReason, ISnackbarOptions, ISnackbarPosition } from './snackbar.types';

@Component({
  selector: 'i-snackbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IBanner, IButton],
  host: { class: 'i-snackbar' },
  template: `
    <i-banner
      aria-atomic="true"
      [attr.aria-live]="variant === 'danger' ? 'assertive' : 'polite'"
      [closable]="closable"
      [closeLabel]="closeLabel"
      [open]="true"
      [prefixIcon]="prefixIcon"
      [suffixIcon]="suffixIcon"
      [variant]="variant"
      (onClose)="requestClose('close')"
    >
      <div class="i-snackbar__layout">
        <div class="i-snackbar__copy">
          @if (title?.trim()) {
            <div class="i-snackbar__title">{{ title }}</div>
          }
          @if (message?.trim()) {
            <div class="i-snackbar__message">{{ message }}</div>
          }
          <div #projected class="i-snackbar__content"><ng-content /></div>
        </div>
        @if (actionLabel) {
          <i-button
            size="sm"
            type="button"
            [disabled]="actionDisabled"
            [loading]="actionLoading"
            (onClick)="activateAction()"
            >{{ actionLabel }}</i-button
          >
        }
      </div>
    </i-banner>
  `,
})
export class ISnackbar implements AfterViewInit, OnChanges, OnDestroy {
  @Input() id = nextSnackbarId();
  @Input() message: string | null | undefined = '';
  @Input() title: string | undefined;
  @Input() variant: IBannerVariant = 'neutral';
  @Input() position: ISnackbarPosition = 'bottom-right';
  @Input() durationMs = 5000;
  @Input() prefixIcon = '';
  @Input() suffixIcon = '';
  @Input({ transform: booleanAttribute }) closable = true;
  @Input() closeLabel = 'Close';
  @Input() actionLabel = '';
  @Input({ transform: booleanAttribute }) actionDisabled = false;
  @Input({ transform: booleanAttribute }) actionLoading = false;
  @Input({ transform: booleanAttribute }) dismissOnAction = true;
  @Input({ transform: booleanAttribute }) dismissOnEscape = true;
  @Input({ transform: booleanAttribute }) pauseOnHover = true;
  @Input({ transform: booleanAttribute }) pauseOnFocus = true;
  @Input({ transform: booleanAttribute }) pauseOnHidden = true;
  @Input() maxWidth = '400px';
  @Input() resetKey: unknown;
  @Input({
    transform: (value: unknown) =>
      value === null || value === undefined ? undefined : booleanAttribute(value),
  })
  open: boolean | undefined;
  @Input({ transform: booleanAttribute }) defaultOpen = true;
  @Output() readonly openChange = new EventEmitter<boolean>();
  @Output() readonly onAction = new EventEmitter<void>();
  @Output() readonly afterDismissed = new EventEmitter<ISnackbarDismissReason>();
  @ViewChild('projected', { static: true }) private projected!: ElementRef<HTMLElement>;
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly platform = inject(PLATFORM_ID);
  private readonly settings = inject(SnackbarSettings);
  private readonly destroyRef = inject(DestroyRef);
  private mount?: SnackbarMount;
  private observer?: MutationObserver;
  private initialized = false;
  private internalOpen = true;
  private pendingReason: ISnackbarDismissReason = 'programmatic';

  constructor() {
    this.host.hidden = true;
    effect(() => {
      this.settings.defaults();
      if (this.initialized) this.sync();
    });
  }

  ngAfterViewInit(): void {
    this.internalOpen = this.defaultOpen;
    this.initialized = true;
    if (!isPlatformBrowser(this.platform)) return;
    const Observer = this.host.ownerDocument.defaultView?.MutationObserver;
    if (Observer) {
      this.observer = new Observer(() => this.sync());
      this.observer.observe(this.projected.nativeElement, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    }
    this.sync();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resetKey'] || (changes['open'] && this.open)) this.pendingReason = 'programmatic';
    if (changes['resetKey'] && this.initialized && this.open === undefined)
      this.internalOpen = true;
    const reset =
      ['message', 'title', 'durationMs', 'resetKey'].some((key) => !!changes[key]) ||
      (!!changes['open'] && this.open === true);
    this.sync(reset);
  }

  requestClose(reason: ISnackbarDismissReason): void {
    this.mount?.requestDismiss(reason);
  }

  activateAction(): void {
    if (this.actionDisabled || this.actionLoading || !this.mount?.interactive) return;
    this.onAction.emit();
    if (this.dismissOnAction) this.requestClose('action');
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.mount?.destroy();
  }

  private sync(reset = false): void {
    if (!this.initialized || this.destroyRef.destroyed || !isPlatformBrowser(this.platform)) return;
    const hasChildren = [...this.projected.nativeElement.childNodes].some(
      (node) => node.nodeType === 1 || (node.nodeType === 3 && !!node.textContent?.trim()),
    );
    if (
      !(this.open ?? this.internalOpen) ||
      (!this.message?.trim() && !this.title?.trim() && !hasChildren)
    ) {
      this.mount?.close(this.pendingReason);
      return;
    }
    const options: ISnackbarOptions = {
      id: this.id,
      position: this.position,
      durationMs: this.durationMs,
      closable: this.closable,
      dismissOnEscape: this.dismissOnEscape,
      pauseOnHover: this.pauseOnHover,
      pauseOnFocus: this.pauseOnFocus,
      pauseOnHidden: this.pauseOnHidden,
      maxWidth: this.maxWidth,
    };
    const runtime = {
      ...options,
      id: this.id,
      scope: this.settings,
      maxVisible: this.settings.defaults().maxVisible,
    };
    if (this.mount) {
      this.mount.update(runtime, reset);
      return;
    }
    this.mount = new SnackbarMount(
      this.host,
      runtime,
      (reason) => {
        this.pendingReason = reason;
        if (this.open === undefined) this.internalOpen = false;
        this.openChange.emit(false);
        this.sync();
      },
      (reason) => {
        this.mount = undefined;
        this.afterDismissed.emit(reason);
      },
    );
  }
}
