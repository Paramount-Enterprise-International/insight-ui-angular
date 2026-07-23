import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { INSIGHT_AUTH_CONFIG } from '../auth/auth-config';
import { ICsrfService } from '../csrf/csrf.service';

/** Response type is transparent — no `{ meta, data }` wrapper. */
export type IApiResponse<T = any> = T;

/** Options for individual HTTP calls. */
export interface IApiOptions {
  /** Override the default API base URL (e.g. to call a different backend service). */
  apiUrl?: string;
  /** Additional headers to merge with the defaults. */
  headers?: Record<string, string>;
  /** Request body (only used by DELETE requests that send a payload). */
  body?: any;
}

/**
 * Standardized HTTP client for @insight/ui consumer apps.
 * Mirrors iam-web's `IApiService`: `withCredentials: true` on every request
 * (required for the CSRF cookie and the HttpOnly refresh cookie to flow),
 * automatic `X-CSRF-Token` header injection, transparent response typing
 * (`T`, no wrapper), and RFC 9457 Problem Details error enrichment matching
 * the exact shape iam-web already produces (`status`/`detail`/`retryAfter`)
 * so consumer apps can reuse the `err?.detail ?? 'fallback'` convention.
 */
@Injectable({ providedIn: 'root' })
export class IApiService {
  private readonly http = inject(HttpClient);
  private readonly csrf = inject(ICsrfService);
  private readonly config = inject(INSIGHT_AUTH_CONFIG);

  private get headers(): Record<string, string> {
    const base: Record<string, string> = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const csrfToken = this.csrf.getToken();
    if (csrfToken) {
      base['X-CSRF-Token'] = csrfToken;
    }
    return base;
  }

  /**
   * Normalize a raw `HttpErrorResponse` into a consistent shape:
   * `{ status, detail, retryAfter, ...rest }`. `retryAfter` is read from the
   * body or the `Retry-After` header, so 429/423 responses surface it
   * untouched for rate-limit/lockout UX.
   */
  private enrichError(err: any): Observable<never> {
    const body = err?.error;
    if (body && typeof body === 'object' && !Array.isArray(body)) {
      const retryAfterFromHeader = err?.headers?.get?.('Retry-After');
      const parsedHeader = retryAfterFromHeader ? Number(retryAfterFromHeader) : NaN;
      const retryAfter: number | undefined =
        (typeof body.retryAfter === 'number' ? body.retryAfter : undefined) ??
        (Number.isFinite(parsedHeader) ? parsedHeader : undefined);
      return throwError(() => ({
        ...body,
        status: err?.status ?? body.status,
        message: err?.message ?? body.message,
        detail: body.detail ?? body.title ?? err?.message ?? 'An error occurred',
        retryAfter,
      }));
    }
    return throwError(() => err);
  }

  get<T = any>(path: string, params?: HttpParams, options?: IApiOptions): Observable<T> {
    const baseUrl = options?.apiUrl ?? this.config.api.identity;
    const mergedHeaders = { ...this.headers, ...options?.headers };
    return this.http
      .get<IApiResponse<T>>(`${baseUrl}${path}`, { params, withCredentials: true, headers: mergedHeaders })
      .pipe(
        map((res) => res as T),
        catchError((err) => this.enrichError(err)),
      );
  }

  post<T = any>(path: string, body: any = {}, options?: IApiOptions): Observable<T> {
    const baseUrl = options?.apiUrl ?? this.config.api.identity;
    const mergedHeaders = { ...this.headers, ...options?.headers };
    return this.http
      .post<IApiResponse<T>>(`${baseUrl}${path}`, body, { withCredentials: true, headers: mergedHeaders })
      .pipe(
        map((res) => res as T),
        catchError((err) => this.enrichError(err)),
      );
  }

  put<T = any>(path: string, body: any = {}, options?: IApiOptions): Observable<T> {
    const baseUrl = options?.apiUrl ?? this.config.api.identity;
    const mergedHeaders = { ...this.headers, ...options?.headers };
    return this.http
      .put<IApiResponse<T>>(`${baseUrl}${path}`, body, { withCredentials: true, headers: mergedHeaders })
      .pipe(
        map((res) => res as T),
        catchError((err) => this.enrichError(err)),
      );
  }

  delete<T = any>(path: string, options?: IApiOptions): Observable<T> {
    const baseUrl = options?.apiUrl ?? this.config.api.identity;
    const mergedHeaders = { ...this.headers, ...options?.headers };

    // Fastify rejects Content-Type: application/json with an empty body
    if (!options?.body) {
      delete mergedHeaders['Content-Type'];
    }

    return this.http
      .delete<IApiResponse<T>>(`${baseUrl}${path}`, { withCredentials: true, headers: mergedHeaders, body: options?.body })
      .pipe(
        map((res) => res as T),
        catchError((err) => this.enrichError(err)),
      );
  }

  getBlob(path: string, params?: HttpParams, options?: IApiOptions): Observable<Blob> {
    const baseUrl = options?.apiUrl ?? this.config.api.identity;
    const mergedHeaders = { ...this.headers, ...options?.headers };
    return this.http
      .get(`${baseUrl}${path}`, { params, withCredentials: true, headers: mergedHeaders, responseType: 'blob' })
      .pipe(catchError((err) => this.enrichError(err)));
  }

  upload<T = any>(path: string, file: File | FormData, options?: IApiOptions): Observable<T> {
    const baseUrl = options?.apiUrl ?? this.config.api.identity;
    const body =
      file instanceof FormData
        ? file
        : (() => {
            const fd = new FormData();
            fd.append('file', file);
            return fd;
          })();

    // Content-Type intentionally omitted — the browser sets the multipart boundary automatically.
    const headers: Record<string, string> = { ...options?.headers };
    const csrfToken = this.csrf.getToken();
    if (csrfToken) {
      headers['X-CSRF-Token'] = csrfToken;
    }

    return this.http
      .post<IApiResponse<T>>(`${baseUrl}${path}`, body, { withCredentials: true, headers })
      .pipe(
        map((res) => res as T),
        catchError((err) => this.enrichError(err)),
      );
  }
}
