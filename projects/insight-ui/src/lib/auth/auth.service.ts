import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { IApiService } from '../api/api.service';
import { INSIGHT_AUTH_CONFIG } from './auth-config';

/**
 * Login lockout constants (local, client-side supplement to Keycloak
 * brute-force protection). 5 failed attempts → 1-minute suspend; counter
 * resets after 12h idle or a successful login.
 */
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 1 * 60 * 1000;
const IDLE_RESET_MS = 12 * 60 * 60 * 1000;
const LOCK_STORAGE_KEY = 'iam.mock.login_lockout';

/**
 * Unified login response. When MFA is required, only `mfa*` fields are set and
 * `accessToken` is absent. Once MFA is verified, `accessToken`/`expiresIn`/
 * `user` are populated and `mfaRequired` is false/absent.
 */
export type ILoginResponse = {
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
  user?: IAuthUser;

  mfaRequired?: boolean;
  mfaStep?: 'CHALLENGE' | 'ENROLL';
  mfaSessionId?: string;
  qrCodeUri?: string;
  secret?: string;

  passwordExpired?: boolean;
  changePasswordToken?: string;
  requiresV2Challenge?: boolean;
};

export type IMfaChallengeResponse = {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  user: IAuthUser;
};

export type IRefreshResponse = {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
};

/** User claims decoded from the access token / returned by the backend. */
export type IAuthUser = {
  sub: string;
  email: string;
  name: string;
  roles: string[];
  userType: 'internal' | 'external';
};

export type IForgotPasswordResponse = {
  message: string;
  token?: string;
  link?: string;
};

export type IValidateResetTokenResponse = {
  valid: boolean;
  reason?: 'invalid' | 'expired' | 'used';
  email?: string;
};

export type IResetPasswordResponse = {
  success: boolean;
  message: string;
  reason?: 'invalid' | 'expired' | 'used' | 'history';
};

/**
 * iam-identity-api auth facade (Mode 2 proxy — Keycloak is never exposed to the
 * frontend). Base URL = `{api.identity}` from the resolved auth config.
 *
 * @overridable — consumers may provide `{ provide: IAuthService, useClass: ... }`.
 */
@Injectable({ providedIn: 'root' })
export class IAuthService {
  private readonly api = inject(IApiService);
  private readonly config = inject(INSIGHT_AUTH_CONFIG);

  private get identityUrl(): string {
    return this.config.api.identity;
  }

  login(
    username: string,
    password: string,
    recaptchaToken?: string,
    isChallengeResponse?: boolean,
  ): Observable<ILoginResponse> {
    const cleanUsername = username.trim().toLowerCase();

    const lockData = this.getLockoutData(cleanUsername);
    if (lockData.lockedUntil && lockData.lockedUntil > Date.now()) {
      const retryAfter = Math.ceil((lockData.lockedUntil - Date.now()) / 1000);
      return throwError(() => ({
        status: 423,
        message: 'Login access is temporarily restricted. Please try again in a few moments.',
        detail: 'Login access is temporarily restricted. Please try again in a few moments.',
        retryAfter,
      }));
    }

    return this.api
      .post<ILoginResponse>('/auth/login', {
        username,
        password,
        recaptchaToken,
        isChallengeResponse: isChallengeResponse ?? false,
      })
      .pipe(
        tap((res) => {
          if (res.accessToken || res.mfaRequired || res.passwordExpired) {
            this.resetLockout(cleanUsername);
          }
        }),
        catchError((err) => {
          if (err?.status === 401 || err?.status === 423) {
            this.recordFailedAttempt(cleanUsername);
          }
          return throwError(() => err);
        }),
      );
  }

  /** Silently refresh the access token via the HttpOnly refresh-token cookie. */
  refresh(): Observable<IRefreshResponse> {
    return this.api.post<IRefreshResponse>('/auth/refresh', {});
  }

  /** Clear the server-side session and expire the HttpOnly refresh cookie. */
  logout(refreshToken?: string): Observable<void> {
    return this.api.post<void>('/auth/logout', { refreshToken }).pipe(map(() => undefined));
  }

  /** Exchange a short-lived `at=` auth token for a full session (cross-app handoff). */
  exchangeAuthToken(authToken: string): Observable<ILoginResponse> {
    return this.api.post<ILoginResponse>('/auth/exchange', {}, { headers: { Authorization: authToken } });
  }

  /** Verify the MFA TOTP code during a login challenge. */
  verifyMfaChallenge(mfaSessionId: string, totpCode: string): Observable<IMfaChallengeResponse> {
    return this.api.post<IMfaChallengeResponse>('/auth/mfa/verify', { mfaSessionId, totpCode });
  }

  /** Verify the TOTP code during first-time MFA enrollment (forced at login). */
  verifyMfaEnroll(mfaSessionId: string, totpCode: string): Observable<IMfaChallengeResponse> {
    return this.api.post<IMfaChallengeResponse>('/auth/mfa/enroll/verify', { mfaSessionId, totpCode });
  }

  /** Self-service MFA — check enrollment status (`GET /profile/mfa`). */
  selfServiceGetStatus(): Observable<{ enrolled: boolean; createdAt?: string; lastUsedAt?: string }> {
    return this.api.get<{ enrolled: boolean; createdAt?: string; lastUsedAt?: string }>('/profile/mfa');
  }

  /** Self-service MFA — initiate enrollment to get the QR & session id (`POST /profile/mfa/enroll`). */
  selfServiceEnrollInitiate(): Observable<{
    qrCodeUri: string;
    secret: string;
    enrollmentSessionId: string;
  }> {
    return this.api.post<{ qrCodeUri: string; secret: string; enrollmentSessionId: string }>('/profile/mfa/enroll', {});
  }

  /** Self-service MFA — verify OTP and complete enrollment (`POST /profile/mfa/enroll/verify`). */
  selfServiceEnrollVerify(enrollmentSessionId: string, totpCode: string): Observable<void> {
    return this.api
      .post<void>('/profile/mfa/enroll/verify', { enrollmentSessionId, totpCode })
      .pipe(map(() => undefined));
  }

  /** Self-service reset (un-enroll) MFA for the current user — requires password (`DELETE /profile/mfa`). */
  selfServiceResetMfa(userSub: string, password: string): Observable<void> {
    return this.api
      .delete<void>('/profile/mfa', { apiUrl: this.identityUrl, body: { password } })
      .pipe(map(() => undefined));
  }

  /**
   * Change password when it has expired (forced change flow). Uses a short-lived
   * `changePasswordToken` (10 min, scope `change_password_only`) as the Bearer
   * header. Backend returns a full accessToken on success so the user continues
   * seamlessly without re-login.
   */
  changePassword(
    changePasswordToken: string,
    newPassword: string,
    confirmPassword: string,
  ): Observable<{
    success: boolean;
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
  }> {
    return this.api.post<{
      success: boolean;
      accessToken?: string;
      refreshToken?: string;
      expiresIn?: number;
    }>(
      '/auth/change-password',
      { newPassword, confirmPassword },
      { headers: { Authorization: `Bearer ${changePasswordToken}` } },
    );
  }

  /** Request a password-reset link via email or WhatsApp (`POST /auth/forgot-password`). */
  forgotPassword(identifier: string, mode: 'email' | 'whatsapp'): Observable<IForgotPasswordResponse> {
    return this.api.post<IForgotPasswordResponse>('/auth/forgot-password', {
      identifier,
      method: mode,
    });
  }

  /** Validate a reset token before showing the reset form (`GET /auth/reset-password/validate`). */
  validateResetToken(token: string): Observable<IValidateResetTokenResponse> {
    return this.api.get<IValidateResetTokenResponse>(
      '/auth/reset-password/validate',
      new HttpParams().set('token', token),
    );
  }

  /** Submit a new password using the reset token (`POST /auth/reset-password`). */
  resetPassword(token: string, newPassword: string, confirmPassword: string): Observable<IResetPasswordResponse> {
    return this.api.post<IResetPasswordResponse>('/auth/reset-password', { token, newPassword, confirmPassword });
  }

  // ─── Login lockout helpers (sessionStorage per-username) ─────────────────────

  private getLockoutData(username: string): {
    attempts: number;
    lockedUntil: number | null;
    lastAttemptAt: number | null;
  } {
    try {
      const raw = sessionStorage.getItem(`${LOCK_STORAGE_KEY}_${username}`);
      const data = raw ? JSON.parse(raw) : { attempts: 0, lockedUntil: null, lastAttemptAt: null };
      if (data.lastAttemptAt && Date.now() - data.lastAttemptAt >= IDLE_RESET_MS) {
        return { attempts: 0, lockedUntil: null, lastAttemptAt: null };
      }
      return data;
    } catch {
      return { attempts: 0, lockedUntil: null, lastAttemptAt: null };
    }
  }

  private recordFailedAttempt(username: string): void {
    const data = this.getLockoutData(username);
    data.attempts += 1;
    data.lastAttemptAt = Date.now();
    if (data.attempts >= MAX_LOGIN_ATTEMPTS - 1) {
      data.lockedUntil = Date.now() + LOCKOUT_DURATION_MS;
    }
    sessionStorage.setItem(`${LOCK_STORAGE_KEY}_${username}`, JSON.stringify(data));
  }

  private resetLockout(username: string): void {
    sessionStorage.removeItem(`${LOCK_STORAGE_KEY}_${username}`);
  }
}
