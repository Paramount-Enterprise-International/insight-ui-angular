import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { INSIGHT_AUTH_CONFIG } from '../auth/auth-config';

/**
 * CSRF token management — cookie-to-header pattern for @insight/ui consumer apps.
 * Mirrors iam-web's `ICsrfService`:
 *
 *   1. FE calls GET {api.identity}/auth/csrf.
 *   2. Backend returns `{ csrfToken }` in the JSON body AND sets a `csrf_token` cookie.
 *   3. FE stores the token in memory (JS cannot read cross-origin cookies).
 *   4. FE sends the token back as `X-CSRF-Token` header on mutating requests.
 *   5. Backend validates: header value === cookie value.
 *
 * Token expiration mirrors the backend cookie maxAge (minus a safety buffer,
 * configured via `csrfTokenMaxAgeSeconds`) so the FE transparently re-fetches
 * before the server-side cookie actually expires.
 */
@Injectable({ providedIn: 'root' })
export class ICsrfService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(INSIGHT_AUTH_CONFIG);

  /** In-memory CSRF token — retrieved from the backend response body, never from document.cookie directly. */
  private token: string | null = null;
  private tokenFetchedAt: number | null = null;

  /**
   * Return the in-memory CSRF token, or `null` if never fetched or expired
   * (expiry triggers callers to re-invoke `ensureToken()`).
   */
  getToken(): string | null {
    if (this.token && this.isTokenExpired()) {
      return null;
    }
    return this.token;
  }

  /** Whether the in-memory token has exceeded its TTL (`csrfTokenMaxAgeSeconds`). */
  isTokenExpired(): boolean {
    if (this.tokenFetchedAt === null) {
      return false;
    }
    const maxAgeMs = (this.config.csrfTokenMaxAgeSeconds ?? 7170) * 1000;
    return Date.now() - this.tokenFetchedAt >= maxAgeMs;
  }

  /**
   * Fetch a fresh CSRF token from `iam-identity-api` and store it in memory.
   * Non-fatal on failure — subsequent mutating requests will fail with 403 if
   * the token is missing, surfaced via `IApiService`'s error enrichment.
   */
  ensureToken(): Observable<void> {
    return this.http.get<{ csrfToken: string }>(`${this.config.api.identity}/auth/csrf`, { withCredentials: true }).pipe(
      tap((res) => {
        this.token = res.csrfToken ?? null;
        this.tokenFetchedAt = Date.now();
      }),
      map(() => undefined),
      catchError((err) => {
        // Never log the token itself — status code only.
        console.warn('[@insight/ui][CSRF] Failed to fetch CSRF token', err?.status);
        return of(undefined);
      }),
    );
  }
}
