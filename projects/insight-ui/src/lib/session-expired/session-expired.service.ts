import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

export type SessionExpiredReason = 'TOKEN_EXPIRED' | 'SESSION_REVOKED' | 'SESSION_REPLACED';

/** Minimal structural shape for error-code extraction (normalized or raw errors). */
type SessionErrorShape = {
  errorCode?: string;
  code?: string;
  error?: { errorCode?: string; code?: string };
};

const valueAt = (value: unknown, key: 'errorCode' | 'code'): string | undefined => {
  if (typeof value !== 'object' || value === null) {
    return undefined;
  }
  const candidate = (value as Record<string, unknown>)[key];
  return typeof candidate === 'string' && candidate.length > 0 ? candidate : undefined;
};

/** Supports normalized Problem Details errors and raw legacy HTTP error bodies. */
export const extractProblemDetailsErrorCode = (error: unknown): string | undefined => {
  if (error === null || error === undefined) {
    return undefined;
  }
  const problem = error as Partial<SessionErrorShape>;
  return (
    problem.errorCode ??
    problem.code ??
    valueAt((error as { error?: unknown })?.error, 'errorCode') ??
    valueAt((error as { error?: unknown })?.error, 'code')
  );
};

/** Maps current backend and legacy error codes to the session-expired UI states. */
export const toSessionExpiredReason = (errorCode: string | undefined): SessionExpiredReason | undefined => {
  switch (errorCode) {
    case 'AUTH_TOKEN_EXPIRED':
    case 'TOKEN_EXPIRED':
    case 'AUTH_NO_SESSION':
      return 'TOKEN_EXPIRED';
    case 'AUTH_SESSION_REVOKED':
    case 'SESSION_REVOKED':
      return 'SESSION_REVOKED';
    case 'AUTH_SESSION_REPLACED':
    case 'SESSION_REPLACED':
      return 'SESSION_REPLACED';
    default:
      return undefined;
  }
};

/**
 * True when an error is semantically a session-expiry event (HTTP 401/498 or a
 * recognized session-related error code). Other statuses are business/transport
 * errors and must be handled by the caller instead of forcing a logout.
 */
export const isSessionExpiredError = (error: unknown): boolean => {
  if (error instanceof HttpErrorResponse) {
    if (error.status === 401 || error.status === 498) {
      return true;
    }
  }
  if ((error as { status?: number } | null)?.status === 401 || (error as { status?: number } | null)?.status === 498) {
    return true;
  }
  return toSessionExpiredReason(extractProblemDetailsErrorCode(error)) !== undefined;
};

/**
 * In-memory overlay state for the session-expired UI.
 *
 * @overridable — consumers may provide `{ provide: SessionExpiredService, useClass: ... }`.
 */
@Injectable({ providedIn: 'root' })
export class SessionExpiredService {
  readonly visible = signal(false);
  readonly returnUrl = signal('/');
  readonly reason = signal<SessionExpiredReason | undefined>(undefined);

  show(returnUrl: string, reason?: SessionExpiredReason): void {
    this.returnUrl.set(returnUrl || '/');
    this.reason.set(reason);
    this.visible.set(true);
  }

  hide(): void {
    this.visible.set(false);
  }
}
