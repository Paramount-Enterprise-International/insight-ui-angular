import { HttpErrorResponse, HttpEvent, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { getAuthEndpointUrl, I_AUTH_CONFIG, IAuthConfig } from '../auth/auth-config';
import { buildExternalSigninUrl } from '../auth/build-signin-redirect-url';
import { normalizeApiError } from '../api/api-error';
import { ICsrfService } from '../csrf/csrf';
import { ISessionService } from '../session/session';
import {
  extractProblemDetailsErrorCode,
  ISessionExpiredService,
  toSessionExpiredReason,
} from '../session-expired/session-expired';

export const IH_SKIP_BEARER_HEADER = 'X-IH-Skip-Bearer';

const isAuthSkipUrl = (url: string, config: IAuthConfig): boolean =>
  (['csrf', 'refresh', 'login', 'logout', 'exchange'] as const).some(
    (key) => url.split('?')[0] === getAuthEndpointUrl(config, key),
  );

const addAuthHeader = (req: HttpRequest<unknown>, token: string): HttpRequest<unknown> =>
  req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });

/** Attach the application token and retry unauthorized requests once after shared refresh. */
export const authInterceptor: HttpInterceptorFn = (req, next): Observable<HttpEvent<unknown>> => {
  const session = inject(ISessionService);
  const config = inject(I_AUTH_CONFIG);
  const sessionExpired = inject(ISessionExpiredService);
  const csrf = inject(ICsrfService);
  if (req.headers.has(IH_SKIP_BEARER_HEADER)) {
    return next(req.clone({ headers: req.headers.delete(IH_SKIP_BEARER_HEADER) }));
  }
  if (isAuthSkipUrl(req.url, config)) return next(req);

  const expire = (error: unknown): Observable<never> => {
    const apiError = normalizeApiError(error);
    if (apiError['name'] === 'AbortError' || apiError['name'] === 'TimeoutError') {
      return throwError(() => error);
    }
    session.clearSession();
    if (config.onUnauthorized) config.onUnauthorized(error);
    else if ((config.unauthorizedHandling ?? 'dialog') === 'dialog') {
      const errorCode = extractProblemDetailsErrorCode(apiError);
      sessionExpired.show(
        window.location.pathname + window.location.search,
        toSessionExpiredReason(errorCode),
        errorCode,
        apiError.detail,
        apiError.message,
        apiError,
      );
    } else {
      window.location.href = buildExternalSigninUrl(
        config,
        window.location.pathname + window.location.search,
      );
    }
    return throwError(() => error);
  };
  const token = session.getAccessToken();
  return next(token ? addAuthHeader(req, token) : req).pipe(
    catchError((error: unknown) => {
      if (!(error instanceof HttpErrorResponse) || error.status !== 401)
        return throwError(() => error);
      return session.refreshToken().pipe(
        catchError(expire),
        switchMap((newToken) => {
          let retry = addAuthHeader(req, newToken);
          const csrfToken = csrf.getToken();
          if (csrfToken) retry = retry.clone({ setHeaders: { 'X-CSRF-Token': csrfToken } });
          else retry = retry.clone({ headers: retry.headers.delete('X-CSRF-Token') });
          return next(retry).pipe(
            catchError((retryError: unknown) =>
              retryError instanceof HttpErrorResponse && retryError.status === 401
                ? expire(retryError)
                : throwError(() => retryError),
            ),
          );
        }),
      );
    }),
  );
};
