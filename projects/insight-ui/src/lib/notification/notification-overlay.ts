import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  output,
  PLATFORM_ID,
  viewChild,
} from '@angular/core';
import { IDialogContainer } from '../dialog';
import { mountNotificationModal, type NotificationModal } from './notification-modal';

/** Uses the Insight dialog surface with a notification-specific modal lifecycle. */
@Component({
  selector: 'i-notification-overlay',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IDialogContainer],
  template: `
    <i-dialog-container
      ariaLabel="Notifications"
      class="i-notification-overlay"
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
export class NotificationOverlay implements AfterViewInit, OnDestroy {
  readonly closeRequested = output<void>();
  readonly config = { width: 'min(400px, 100vw)', height: '100dvh' };
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly document = inject(DOCUMENT);
  private readonly platform = inject(PLATFORM_ID);
  private readonly region = viewChild.required<ElementRef<HTMLElement>>('region');
  private modal?: NotificationModal;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platform)) return;
    this.document.body.appendChild(this.host.nativeElement);
    this.modal = mountNotificationModal(this.region().nativeElement);
  }

  requestClose(): void {
    if (this.modal?.isTop()) this.closeRequested.emit();
  }

  focusEdge(last = false): void {
    this.modal?.focusEdge(last);
  }

  ngOnDestroy(): void {
    this.modal?.destroy();
    this.host.nativeElement.remove();
  }
}
