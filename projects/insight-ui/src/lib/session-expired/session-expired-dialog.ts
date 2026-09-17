import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IButton } from '../button/button';
import { IIcon } from '../icon/icon';

import { INormalizedApiError, resolveApiErrorDisplayMessage } from '../api/api-error';
import { I_AUTH_CONFIG } from '../auth/auth-config';
import { buildExternalSigninUrl } from '../auth/build-signin-redirect-url';
import { ISessionExpiredService } from './session-expired.service';

/**
 * Library-provided session-expired overlay. Consumer apps render it once near
 * the app root (mirroring `<i-dialog-outlet />`):
 *
 * ```html
 * <i-session-expired-dialog />
 * ```
 *
 * It is self-gating (renders nothing while hidden), reads its state from the
 * shared `ISessionExpiredService` (shown by the auth interceptor when a token
 * refresh fails and `unauthorizedHandling` is `'dialog'`) and, on "Log in
 * again", performs a full-page redirect to the configured signinUrl via
 * `buildExternalSigninUrl`, then hides itself. It cannot be dismissed by
 * clicking the backdrop.
 */
@Component({
  selector: 'i-session-expired-dialog',
  standalone: true,
  imports: [IButton, IIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (visible()) {
      <div class="session-expired-overlay flex align-center justify-center">
        <div
          class="session-expired-card bg-white radius-md p-3xl text-center"
          (click)="$event.stopPropagation()"
        >
          <div class="text-warning mb-lg">
            <i-icon size="4xl" [icon]="'fa-solid ' + iconClass()" />
          </div>
          <h1 class="m-0 mb-xs text-2xl font-semibold text-gray-800">{{ title() }}</h1>
          <p class="m-0 mb-2xl text-md leading-normal text-subtle">{{ message() }}</p>
          <i-button type="button" (onClick)="onConfirm()"> Log in again </i-button>
        </div>
      </div>
    }
  `,
  styles: [
    `
      .session-expired-overlay {
        position: fixed;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 9999;
      }

      .session-expired-card {
        max-width: 380px;
        width: calc(100% - 32px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
      }
    `,
  ],
})
export class ISessionExpiredDialog {
  private readonly sessionExpired = inject(ISessionExpiredService);
  private readonly config = inject(I_AUTH_CONFIG);

  protected readonly visible = this.sessionExpired.visible;

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
    return resolveApiErrorDisplayMessage(error, localFallback, this.config.errorCatalogResolver);
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
