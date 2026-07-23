import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError, timeout } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';

import { INSIGHT_AUTH_CONFIG } from '../auth/auth-config';
import { IApiService } from '../api/api.service';

export interface IRefreshResponse {
  accessToken: string;
  expiresIn: number;
  refreshToken?: string;
}

/**
 * Minimal inline JWT payload decode (exp claim only) — deliberately NOT using
 * `@auth0/angular-jwt` to avoid forcing a new dependency onto every
 * @insight/ui consumer. Returns `null` on any decode failure.
 */
function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const payload = token.split('.')[1];
    if (!payload) {
      return null;
    }
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
    const json = decodeURIComponent(
      atob(padded)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

/**
 * Session management for @insight/ui consumer apps.
 *
 * Access token: stored IN MEMORY only (never Web Storage) — mirrors iam-web's
 * `ISessionService`. Refresh token: HttpOnly cookie managed exclusively by
 * `iam-identity-api`; this service never reads or stores it directly, it only
 * relies on the browser auto-sending the cookie via `withCredentials: true`.
 */
@Injectable({ providedIn: 'root' })
export class ISessionService {
  private readonly api = inject(IApiService);
  private readonly config = inject(INSIGHT_AUTH_CONFIG);

  // In-memory token storage — intentionally NOT persisted to Web Storage.
  private accessToken: string | null = null;
  private expiresAt: number | null = null;
  private sessionStartedAt: number | null = null;

  /** True while the app is restoring/validating the session on load. Consumer apps may use this to show a loading state. */
  readonly initializing = signal(false);

  // Concurrent refresh guard: only one refresh in flight at a time; queue waiters.
  private isRefreshing = false;
  private refreshSubject = new BehaviorSubject<string | null>(null);

  isAuth(): boolean {
    return !!this.accessToken && !this.isTokenExpired() && !this.isSsoSessionExpired();
  }

  isTokenExpired(): boolean {
    if (!this.accessToken || this.expiresAt === null) {
      return true;
    }
    return Date.now() >= this.expiresAt;
  }

  /**
   * Whether the max SSO session duration has been exceeded (default 15h,
   * configured via `tokenLifespan.ssoSessionMaxSeconds`). After this, the
   * user must re-authenticate regardless of token state.
   */
  isSsoSessionExpired(): boolean {
    if (this.sessionStartedAt === null) {
      return false;
    }
    const maxDurationMs = this.config.tokenLifespan.ssoSessionMaxSeconds * 1000;
    return Date.now() - this.sessionStartedAt >= maxDurationMs;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  /**
   * Store the access token received from the SSO handoff (URL hash fragment)
   * or from a refresh response. `expiresIn` (seconds) defaults to the token's
   * own `exp` claim, then falls back to the configured `accessTokenSeconds`.
   */
  setAccessToken(accessToken: string, expiresIn?: number): void {
    this.accessToken = accessToken;
    const effectiveExpiresIn = expiresIn ?? this.readExpiresInFromToken(accessToken) ?? this.config.tokenLifespan.accessTokenSeconds;
    // 30-second buffer to avoid edge cases, matches iam-web's convention.
    this.expiresAt = Date.now() + (effectiveExpiresIn - 30) * 1000;
    if (this.sessionStartedAt === null) {
      this.sessionStartedAt = Date.now();
    }
    // Never log the full token — truncated preview only.
    console.debug('[@insight/ui][SESSION] setAccessToken', {
      accessTokenPreview: `${accessToken.substring(0, 20)}...`,
      expiresAt: new Date(this.expiresAt).toISOString(),
      storageLocation: 'IN-MEMORY (not localStorage/sessionStorage/cookies)',
    });
  }

  clearSession(): void {
    this.accessToken = null;
    this.expiresAt = null;
    this.sessionStartedAt = null;
  }

  logout(): void {
    this.clearSession();
  }

  /**
   * Silently refresh the access token via the HttpOnly refresh cookie
   * (`POST {api.identity}/auth/refresh`, `withCredentials: true`).
   * Single-flight: concurrent callers wait for the in-flight refresh instead
   * of triggering duplicate requests.
   */
  refreshToken(): Observable<string> {
    if (this.isRefreshing) {
      return this.refreshSubject.pipe(
        filter((token): token is string => token !== null),
        take(1),
      );
    }

    this.isRefreshing = true;
    this.refreshSubject.next(null);

    return this.api.post<IRefreshResponse>('/auth/refresh', {}).pipe(
      timeout({
        each: 10_000,
        with: () => throwError(() => new Error('Refresh request timed out after 10 seconds')),
      }),
      tap((res) => {
        this.setAccessToken(res.accessToken, res.expiresIn);
        this.refreshSubject.next(res.accessToken);
        this.isRefreshing = false;
      }),
      switchMap((res) => of(res.accessToken)),
      catchError((err) => {
        this.isRefreshing = false;
        this.refreshSubject.error(err);
        this.refreshSubject = new BehaviorSubject<string | null>(null);
        return throwError(() => err);
      }),
    );
  }

  private readExpiresInFromToken(token: string): number | null {
    const decoded = decodeJwtPayload(token);
    if (!decoded || typeof decoded['exp'] !== 'number') {
      return null;
    }
    return Math.max(0, (decoded['exp'] as number) - Math.floor(Date.now() / 1000));
  }
}
