import { HttpErrorResponse, HttpEvent, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { INSIGHT_AUTH_CONFIG } from '../auth/auth-config';
import { buildExternalSigninUrl } from '../auth/build-signin-redirect-url';
import { ISessionService } from '../session/session.service';

// Endpoints that must never receive a Bearer header (would be circular / not yet authenticated).
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

  if (isAuthSkipUrl(req.url)) {
    return next(req);
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
          // Use the current path (no hash/token) as the target to return to —
          // routed through the callback route, same as authGuard, to avoid a
          // redirect loop.
          const targetPath = window.location.pathname + window.location.search;
          window.location.href = buildExternalSigninUrl(config, targetPath);
          return throwError(() => refreshErr);
        }),
      );
    }),
  );
};
