import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { INSIGHT_AUTH_CONFIG } from '../auth/auth-config';
import { buildExternalSigninUrl } from '../auth/build-signin-redirect-url';
import { INormalizedApiError, resolveApiErrorDisplayMessage } from '../api/api-error';
import { SessionExpiredService } from './session-expired.service';

/**
 * Library-provided session-expired overlay. Consumer apps render it once near
 * the app root (mirroring `<i-dialog-outlet />`):
 *
 * ```html
 * <i-session-expired-dialog />
 * ```
 *
 * It is self-gating (renders nothing while hidden), reads its state from the
 * shared `SessionExpiredService` (shown by the auth interceptor when a token
 * refresh fails and `unauthorizedHandling` is `'dialog'`) and, on "Log in
 * again", performs a full-page redirect to iam-web's signin via
 * `buildExternalSigninUrl`, then hides itself. It cannot be dismissed by
 * clicking the backdrop.
 */
@Component({
  selector: 'i-session-expired-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (visible()) {
      <div class="session-expired-overlay">
        <div class="session-expired-card" (click)="$event.stopPropagation()">
          <div class="session-expired-icon">
            <i class="fa-solid {{ iconClass() }}"></i>
          </div>
          <h1>{{ title() }}</h1>
          <p>{{ message() }}</p>
          <button class="session-expired-action" type="button" (click)="onConfirm()">
            Log in again
          </button>
        </div>
      </div>
    }
  `,
  styles: [
    `
      .session-expired-overlay {
        position: fixed;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 9999;
      }

      .session-expired-card {
        background: var(--i-color-surface, #ffffff);
        border-radius: 8px;
        padding: 32px;
        max-width: 380px;
        width: calc(100% - 32px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        text-align: center;
      }

      .session-expired-icon {
        font-size: 48px;
        color: var(--i-color-warning, #f59e0b);
        margin-bottom: 16px;
      }

      h1 {
        margin: 0 0 8px;
        font-size: 22px;
        font-weight: 600;
        color: var(--i-text-color, #1f2937);
      }

      p {
        margin: 0 0 24px;
        font-size: 14px;
        line-height: 1.5;
        color: var(--i-text-subtle-color, #6b7280);
      }

      .session-expired-action {
        border: none;
        border-radius: 6px;
        padding: 10px 20px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        background: var(--i-color-primary, #2563eb);
        color: #ffffff;
      }

      .session-expired-action:hover {
        filter: brightness(1.05);
      }
    `,
  ],
})
export class ISessionExpiredDialog {
  private readonly sessionExpired = inject(SessionExpiredService);
  private readonly config = inject(INSIGHT_AUTH_CONFIG);

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

  /** Perform the SSO handoff to iam-web's signin page, then clear the overlay state. */
  onConfirm(): void {
    const returnUrl = this.sessionExpired.returnUrl();
    this.sessionExpired.hide();
    window.location.href = buildExternalSigninUrl(this.config, returnUrl);
  }
}
