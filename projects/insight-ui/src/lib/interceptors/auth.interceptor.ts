import { HttpErrorResponse, HttpEvent, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { INSIGHT_AUTH_CONFIG } from '../auth/auth-config';
import { buildExternalSigninUrl } from '../auth/build-signin-redirect-url';
import { ISessionService } from '../session/session.service';
import {
  extractProblemDetailsErrorCode,
  SessionExpiredService,
  toSessionExpiredReason,
} from '../session-expired/session-expired.service';

// Sentinel header set by `IApiService` when a call opts out of the Bearer
// header (`IApiOptions.skipBearer`). Read and stripped by this interceptor so
// it never reaches the server.
export const IH_SKIP_BEARER_HEADER = 'X-IH-Skip-Bearer';

// Endpoints that must never receive a Bearer header (would be circular / not
// yet authenticated) — CSRF + silent refresh are called before a token exists.
const AUTH_SKIP_URLS = ['/auth/csrf', '/auth/refresh'];

const isAuthSkipUrl = (url: string): boolean => AUTH_SKIP_URLS.some((skip) => url.includes(skip));

const addAuthHeader = (req: HttpRequest<unknown>, token: string): HttpRequest<unknown> =>
  req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });

/**
 * Auth HTTP interceptor for @insight/ui consumer apps.
 *
 * Attaches the in-memory access token as a Bearer header. On 401, attempts a
 * single silent refresh (via the HttpOnly refresh cookie) and retries once;
 * on refresh failure, clears the session and redirects to iam-web's signin
 * page. 429 (rate-limit) and 423 (lockout) responses are passed through
 * untouched — `IApiService.enrichError()` already surfaces `retryAfter` for
 * consumer apps to build the same UX as iam-web.
 */
export const authInterceptor: HttpInterceptorFn = (req, next): Observable<HttpEvent<unknown>> => {
  const session = inject(ISessionService);
  const config = inject(INSIGHT_AUTH_CONFIG);
  const sessionExpired = inject(SessionExpiredService);

  if (isAuthSkipUrl(req.url)) {
    return next(req);
  }

  // Per-request opt-out (IApiService `skipBearer`): strip the sentinel header
  // and forward the request without an Authorization header.
  if (req.headers.has(IH_SKIP_BEARER_HEADER)) {
    return next(req.clone({ headers: req.headers.delete(IH_SKIP_BEARER_HEADER) }));
  }

  const token = session.getAccessToken();
  const outgoing = token ? addAuthHeader(req, token) : req;

  return next(outgoing).pipe(
    catchError((err: unknown) => {
      if (!(err instanceof HttpErrorResponse) || err.status !== 401) {
        return throwError(() => err);
      }

      return session.refreshToken().pipe(
        switchMap((newToken) => next(addAuthHeader(req, newToken))),
        catchError((refreshErr: unknown) => {
          session.clearSession();

          if (config.onUnauthorized) {
            // Consumer-provided handler takes full control of the unauthorized flow.
            config.onUnauthorized(refreshErr);
          } else if ((config.unauthorizedHandling ?? 'dialog') === 'dialog') {
            // Default: surface the library session-expired overlay (rendered by
            // the consumer app) instead of leaving the page.
            const errorCode = extractProblemDetailsErrorCode(refreshErr);
            const reason = toSessionExpiredReason(errorCode);
            const targetPath = window.location.pathname + window.location.search;
            sessionExpired.show(
              targetPath,
              reason,
              errorCode,
              (refreshErr as { detail?: string })?.detail,
            );
          } else {
            // Legacy: full-page redirect to iam-web's signin page. Use the
            // current path (no hash/token) as the target, routed through the
            // callback route, same as authGuard, to avoid a redirect loop.
            const targetPath = window.location.pathname + window.location.search;
            window.location.href = buildExternalSigninUrl(config, targetPath);
          }
          return throwError(() => refreshErr);
        }),
      );
    }),
  );
};
