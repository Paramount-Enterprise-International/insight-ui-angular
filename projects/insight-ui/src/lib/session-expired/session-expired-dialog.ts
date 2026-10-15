import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IDialog, IDialogAction, IDialogConfig, IDialogContainer } from '../dialog/dialog';
import { IIcon } from '../icon/icon';

import { INormalizedApiError, resolveApiErrorDisplayMessage } from '../api/api-error';
import { I_AUTH_CONFIG } from '../auth/auth-config';
import { buildExternalSigninUrl } from '../auth/build-signin-redirect-url';
import { ISessionExpiredService } from './session-expired';

/** Binds session-expiry state to a non-dismissible Insight dialog and SSO handoff. */
@Component({
  selector: 'i-session-expired-dialog',
  standalone: true,
  imports: [IDialogContainer, IDialog, IIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (visible()) {
      <i-dialog-container
        style="z-index: 9999"
        [ariaLabel]="title()"
        [config]="dialogConfig"
        [isTopMost]="true"
      >
        <i-dialog [actions]="actions" [title]="title()" (onCustomAction)="onConfirm()">
          <div class="flex flex-col align-center text-center gap-lg">
            <i-icon class="text-warning" size="3xl" [icon]="iconClass()" />
            <p class="m-0 text-md leading-normal text-subtle">{{ message() }}</p>
          </div>
        </i-dialog>
      </i-dialog-container>
    }
  `,
})
export class ISessionExpiredDialog {
  private readonly sessionExpired = inject(ISessionExpiredService);
  private readonly config = inject(I_AUTH_CONFIG);

  protected readonly visible = this.sessionExpired.visible;
  protected readonly dialogConfig: IDialogConfig = {
    width: '380px',
    disableClose: true,
    backdropClose: false,
  };
  protected readonly actions: IDialogAction[] = [
    { type: 'custom', label: 'Log in again', className: 'w-full' },
  ];

  protected iconClass(): string {
    return this.sessionExpired.reason() === 'SESSION_REPLACED'
      ? 'fa-solid fa-right-from-bracket'
      : 'fa-solid fa-clock';
  }

  protected title(): string {
    switch (this.sessionExpired.reason()) {
      case 'SESSION_REPLACED':
        return 'Signed Out Remotely';
      case 'SESSION_REVOKED':
        return 'Session Ended';
      default:
        return 'Session Expired';
    }
  }

  protected message(): string {
    const localFallback = this.localFallbackMessage();
    const error: INormalizedApiError = this.sessionExpired.apiError() ?? {
      errorCode: this.sessionExpired.errorCode() ?? undefined,
      message: this.sessionExpired.message() ?? undefined,
      detail: this.sessionExpired.detail() ?? undefined,
    };
    return resolveApiErrorDisplayMessage(
      error,
      localFallback,
      this.config.errorCatalogResolver,
      this.config.errorDisplayFormatter,
    );
  }

  private localFallbackMessage(): string {
    switch (this.sessionExpired.reason()) {
      case 'TOKEN_EXPIRED':
        return 'Your session has expired. Please log in again to continue.';
      case 'SESSION_REVOKED':
        return 'Your session has been ended. Please log in again.';
      case 'SESSION_REPLACED':
        return (
          'Your session was ended because you signed in from another device or ' +
          'your concurrent session access was revoked. Please log in again.'
        );
      default:
        return 'Your session is no longer valid. Please log in again.';
    }
  }

  /** Perform the SSO handoff to the configured signinUrl, then clear the overlay state. */
  onConfirm(): void {
    const returnUrl = this.sessionExpired.returnUrl();
    this.sessionExpired.hide();
    window.location.href = buildExternalSigninUrl(this.config, returnUrl);
  }
}
