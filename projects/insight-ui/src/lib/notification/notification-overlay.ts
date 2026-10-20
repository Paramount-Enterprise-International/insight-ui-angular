import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  OnChanges,
  OnDestroy,
  output,
  PLATFORM_ID,
  viewChild,
} from '@angular/core';
import { IDialogContainer } from '../dialog';
import { mountNotificationModal, type NotificationModal } from './notification-modal';
import { waitForNotificationExit } from './notification-transition';

/** Uses the Insight dialog surface with a notification-specific modal lifecycle. */
@Component({
  selector: 'i-notification-overlay',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IDialogContainer],
  template: `
    <i-dialog-container
      ariaLabel="Notifications"
      class="i-notification-overlay"
      [class.i-notification-closing]="!open()"
      [config]="config"
      [isTopMost]="true"
      (onClose)="requestClose()"
    >
      <div #region class="i-notification-focus-region" tabindex="-1">
        <span
          aria-hidden="true"
          class="i-notification-focus-guard"
          data-notification-focus-guard="true"
          tabindex="0"
          (focus)="focusEdge(true)"
        ></span>
        <ng-content />
        <span
          aria-hidden="true"
          class="i-notification-focus-guard"
          data-notification-focus-guard="true"
          tabindex="0"
          (focus)="focusEdge()"
        ></span>
      </div>
    </i-dialog-container>
  `,
})
export class NotificationOverlay implements AfterViewInit, OnChanges, OnDestroy {
  readonly open = input(true);
  readonly closeRequested = output<void>();
  readonly exited = output<void>();
  readonly config = { width: 'min(400px, 100vw)', height: '100dvh' };
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly document = inject(DOCUMENT);
  private readonly platform = inject(PLATFORM_ID);
  private readonly region = viewChild.required<ElementRef<HTMLElement>>('region');
  private modal?: NotificationModal;
  private cancelExit?: () => void;

  ngOnChanges(): void {
    this.cancelExit?.();
    if (!this.open() && this.modal) {
      const panel = this.region().nativeElement.closest<HTMLElement>('.i-dialog-panel')!;
      this.cancelExit = waitForNotificationExit(panel, () => this.exited.emit());
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platform)) return;
    this.document.body.appendChild(this.host.nativeElement);
    this.modal = mountNotificationModal(this.region().nativeElement);
  }

  requestClose(): void {
    if (this.open() && this.modal?.isTop()) this.closeRequested.emit();
  }

  focusEdge(last = false): void {
    this.modal?.focusEdge(last);
  }

  ngOnDestroy(): void {
    this.cancelExit?.();
    this.modal?.destroy();
    this.host.nativeElement.remove();
  }
}
