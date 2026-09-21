import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { defer, from, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { I_AUTH_CONFIG } from '../auth/auth-config';
import { ICsrfService } from '../csrf/csrf';
import { IH_SKIP_BEARER_HEADER } from '../interceptors/auth';
import { normalizeApiError } from './api-error';

/** Response body returned by JSON API calls. */
export type IApiResponse<T = any> = T;

/** Shared transport options accepted by every API method. */
export type IApiOptions = {
  apiUrl?: string;
  headers?: Record<string, string>;
  body?: any;
  params?:
    | HttpParams
    | Record<string, string | number | boolean | readonly (string | number | boolean)[]>;
  skipBearer?: boolean;
  observe?: 'body' | 'response';
  responseType?: 'json' | 'blob' | 'arraybuffer' | 'text';
  signal?: AbortSignal;
  /** Total subscription deadline, including refresh and retry. Defaults to 60000 ms. */
  timeoutMs?: number;
};

/** Sends authenticated application requests through the shared SSO transport. */
@Injectable({ providedIn: 'root' })
export class IApiService {
  private readonly http = inject(HttpClient);
  private readonly csrf = inject(ICsrfService);
  private readonly config = inject(I_AUTH_CONFIG);

  private mergeHeaders(body: unknown, options: IApiOptions): Record<string, string> {
    const headers: Record<string, string> = { Accept: 'application/json', ...options.headers };
    const findContentType = (): string | undefined =>
      Object.keys(headers).find((key) => key.toLowerCase() === 'content-type');
    if (body instanceof FormData) {
      for (const key of Object.keys(headers)) {
        if (key.toLowerCase() === 'content-type') delete headers[key];
      }
    } else if (
      body !== undefined &&
      body !== null &&
      !(body instanceof Blob) &&
      !(body instanceof ArrayBuffer) &&
      !findContentType()
    ) {
      headers['Content-Type'] = 'application/json';
    }
    const csrfToken = this.csrf.getToken();
    if (csrfToken) headers['X-CSRF-Token'] = csrfToken;
    if (this.config.apiKey) headers['Api-Key'] = this.config.apiKey;
    if (options.skipBearer) headers[IH_SKIP_BEARER_HEADER] = 'true';
    return headers;
  }

  private enrichError(err: unknown): Observable<never> {
    const transport = err as { error?: unknown; status?: number; headers?: unknown };
    const decode = (body: unknown): unknown => {
      if (typeof body === 'string') {
        try {
          return JSON.parse(body);
        } catch {
          return {};
        }
      }
      return body;
    };
    if (transport?.error instanceof ArrayBuffer) {
      const body = decode(new TextDecoder().decode(transport.error));
      return throwError(() =>
        normalizeApiError({
          ...transport,
          error: body,
        }),
      );
    }
    if (transport?.error instanceof Blob) {
      return from(transport.error.text()).pipe(
        catchError(() => from(Promise.resolve(''))),
        switchMap((body) =>
          throwError(() => normalizeApiError({ ...transport, error: decode(body) })),
        ),
      );
    }
    return throwError(() =>
      normalizeApiError(
        typeof transport?.error === 'string'
          ? { ...transport, error: decode(transport.error) }
          : err,
      ),
    );
  }

  /** Cancel the transport subscription, including its refresh waiter, on deadline or signal. */
  private request(
    method: string,
    path: string,
    body: unknown,
    options: IApiOptions = {},
    params?: HttpParams,
  ): Observable<unknown> {
    return defer(() => {
      const baseUrl = options.apiUrl ?? this.config.api.identity;
      if (!baseUrl)
        throw new Error('No API base URL configured. Set api.identity or IApiOptions.apiUrl.');
      const timeoutMs = options.timeoutMs ?? 60_000;
      if (!Number.isFinite(timeoutMs) || timeoutMs <= 0)
        throw new Error('timeoutMs must be a positive finite number.');
      const common = {
        body,
        params: params ?? options.params,
        withCredentials: true,
        headers: this.mergeHeaders(body, options),
        observe: 'response' as const,
      };
      const source: Observable<HttpResponse<unknown>> =
        options.responseType === 'blob'
          ? this.http.request(method, `${baseUrl}${path}`, { ...common, responseType: 'blob' })
          : options.responseType === 'arraybuffer'
            ? this.http.request(method, `${baseUrl}${path}`, {
                ...common,
                responseType: 'arraybuffer',
              })
            : options.responseType === 'text'
              ? this.http.request(method, `${baseUrl}${path}`, { ...common, responseType: 'text' })
              : this.http.request<unknown>(method, `${baseUrl}${path}`, {
                  ...common,
                  responseType: 'json',
                });
      return new Observable<unknown>((subscriber): (() => void) | undefined => {
        const fail = (kind: 'abort' | 'timeout'): void =>
          subscriber.error(
            normalizeApiError({
              status: 0,
              name: kind === 'timeout' ? 'TimeoutError' : 'AbortError',
              errorCode: kind === 'timeout' ? 'REQUEST_TIMEOUT' : 'REQUEST_ABORTED',
              message: kind === 'timeout' ? 'Request timed out' : 'Request aborted',
            }),
          );
        if (options.signal?.aborted) {
          fail('abort');
          return;
        }
        const abort = (): void => fail('abort');
        options.signal?.addEventListener('abort', abort, { once: true });
        const timer = setTimeout(() => fail('timeout'), timeoutMs);
        const subscription = source
          .pipe(
            catchError((err) => this.enrichError(err)),
            map((response) => (options.observe === 'response' ? response : response.body)),
          )
          .subscribe(subscriber);
        return () => {
          clearTimeout(timer);
          options.signal?.removeEventListener('abort', abort);
          subscription.unsubscribe();
        };
      });
    });
  }

  /** Sends a GET request and returns either the response body or full response. */
  get<T = any>(
    path: string,
    params: HttpParams | undefined,
    options?: IApiOptions & { responseType?: 'json'; observe?: 'body' },
  ): Observable<T>;
  get<T = any>(
    path: string,
    params: HttpParams | undefined,
    options: IApiOptions & { responseType?: 'json'; observe: 'response' },
  ): Observable<HttpResponse<T>>;
  get(
    path: string,
    params: HttpParams | undefined,
    options: IApiOptions & { responseType: 'blob'; observe?: 'body' },
  ): Observable<Blob>;
  get(
    path: string,
    params: HttpParams | undefined,
    options: IApiOptions & { responseType: 'blob'; observe: 'response' },
  ): Observable<HttpResponse<Blob>>;
  get(
    path: string,
    params: HttpParams | undefined,
    options: IApiOptions & { responseType: 'arraybuffer'; observe?: 'body' },
  ): Observable<ArrayBuffer>;
  get(
    path: string,
    params: HttpParams | undefined,
    options: IApiOptions & { responseType: 'arraybuffer'; observe: 'response' },
  ): Observable<HttpResponse<ArrayBuffer>>;
  get(
    path: string,
    params: HttpParams | undefined,
    options: IApiOptions & { responseType: 'text'; observe?: 'body' },
  ): Observable<string>;
  get(
    path: string,
    params: HttpParams | undefined,
    options: IApiOptions & { responseType: 'text'; observe: 'response' },
  ): Observable<HttpResponse<string>>;
  get<T = any>(path: string, params: HttpParams | undefined, options?: IApiOptions): Observable<T>;
  get<T = any>(path: string, params?: HttpParams, options?: IApiOptions): Observable<T>;
  get(path: string, params?: HttpParams, options?: IApiOptions): Observable<unknown> {
    return this.request('GET', path, undefined, options, params);
  }

  /** Sends a POST request and returns either the response body or full response. */
  post<T = any>(
    path: string,
    body: any,
    options?: IApiOptions & { responseType?: 'json'; observe?: 'body' },
  ): Observable<T>;
  post<T = any>(
    path: string,
    body: any,
    options: IApiOptions & { responseType?: 'json'; observe: 'response' },
  ): Observable<HttpResponse<T>>;
  post(
    path: string,
    body: any,
    options: IApiOptions & { responseType: 'blob'; observe?: 'body' },
  ): Observable<Blob>;
  post(
    path: string,
    body: any,
    options: IApiOptions & { responseType: 'blob'; observe: 'response' },
  ): Observable<HttpResponse<Blob>>;
  post(
    path: string,
    body: any,
    options: IApiOptions & { responseType: 'arraybuffer'; observe?: 'body' },
  ): Observable<ArrayBuffer>;
  post(
    path: string,
    body: any,
    options: IApiOptions & { responseType: 'arraybuffer'; observe: 'response' },
  ): Observable<HttpResponse<ArrayBuffer>>;
  post(
    path: string,
    body: any,
    options: IApiOptions & { responseType: 'text'; observe?: 'body' },
  ): Observable<string>;
  post(
    path: string,
    body: any,
    options: IApiOptions & { responseType: 'text'; observe: 'response' },
  ): Observable<HttpResponse<string>>;
  post<T = any>(path: string, body: any, options?: IApiOptions): Observable<T>;
  post<T = any>(path: string, body?: any, options?: IApiOptions): Observable<T>;
  post(path: string, body: any = {}, options?: IApiOptions): Observable<unknown> {
    return this.request('POST', path, body, options);
  }

  /** Sends a PUT request and returns either the response body or full response. */
  put<T = any>(
    path: string,
    body: any,
    options?: IApiOptions & { responseType?: 'json'; observe?: 'body' },
  ): Observable<T>;
  put<T = any>(
    path: string,
    body: any,
    options: IApiOptions & { responseType?: 'json'; observe: 'response' },
  ): Observable<HttpResponse<T>>;
  put(
    path: string,
    body: any,
    options: IApiOptions & { responseType: 'blob'; observe?: 'body' },
  ): Observable<Blob>;
  put(
    path: string,
    body: any,
    options: IApiOptions & { responseType: 'blob'; observe: 'response' },
  ): Observable<HttpResponse<Blob>>;
  put(
    path: string,
    body: any,
    options: IApiOptions & { responseType: 'arraybuffer'; observe?: 'body' },
  ): Observable<ArrayBuffer>;
  put(
    path: string,
    body: any,
    options: IApiOptions & { responseType: 'arraybuffer'; observe: 'response' },
  ): Observable<HttpResponse<ArrayBuffer>>;
  put(
    path: string,
    body: any,
    options: IApiOptions & { responseType: 'text'; observe?: 'body' },
  ): Observable<string>;
  put(
    path: string,
    body: any,
    options: IApiOptions & { responseType: 'text'; observe: 'response' },
  ): Observable<HttpResponse<string>>;
  put<T = any>(path: string, body: any, options?: IApiOptions): Observable<T>;
  put<T = any>(path: string, body?: any, options?: IApiOptions): Observable<T>;
  put(path: string, body: any = {}, options?: IApiOptions): Observable<unknown> {
    return this.request('PUT', path, body, options);
  }

  /** Sends a PATCH request and returns either the response body or full response. */
  patch<T = any>(
    path: string,
    body: any,
    options?: IApiOptions & { responseType?: 'json'; observe?: 'body' },
  ): Observable<T>;
  patch<T = any>(
    path: string,
    body: any,
    options: IApiOptions & { responseType?: 'json'; observe: 'response' },
  ): Observable<HttpResponse<T>>;
  patch(
    path: string,
    body: any,
    options: IApiOptions & { responseType: 'blob'; observe?: 'body' },
  ): Observable<Blob>;
  patch(
    path: string,
    body: any,
    options: IApiOptions & { responseType: 'blob'; observe: 'response' },
  ): Observable<HttpResponse<Blob>>;
  patch(
    path: string,
    body: any,
    options: IApiOptions & { responseType: 'arraybuffer'; observe?: 'body' },
  ): Observable<ArrayBuffer>;
  patch(
    path: string,
    body: any,
    options: IApiOptions & { responseType: 'arraybuffer'; observe: 'response' },
  ): Observable<HttpResponse<ArrayBuffer>>;
  patch(
    path: string,
    body: any,
    options: IApiOptions & { responseType: 'text'; observe?: 'body' },
  ): Observable<string>;
  patch(
    path: string,
    body: any,
    options: IApiOptions & { responseType: 'text'; observe: 'response' },
  ): Observable<HttpResponse<string>>;
  patch<T = any>(path: string, body: any, options?: IApiOptions): Observable<T>;
  patch<T = any>(path: string, body?: any, options?: IApiOptions): Observable<T>;
  patch(path: string, body: any = {}, options?: IApiOptions): Observable<unknown> {
    return this.request('PATCH', path, body, options);
  }

  /** Sends a DELETE request and returns either the response body or full response. */
  delete<T = any>(
    path: string,
    options?: IApiOptions & { responseType?: 'json'; observe?: 'body' },
  ): Observable<T>;
  delete<T = any>(
    path: string,
    options: IApiOptions & { responseType?: 'json'; observe: 'response' },
  ): Observable<HttpResponse<T>>;
  delete(
    path: string,
    options: IApiOptions & { responseType: 'blob'; observe?: 'body' },
  ): Observable<Blob>;
  delete(
    path: string,
    options: IApiOptions & { responseType: 'blob'; observe: 'response' },
  ): Observable<HttpResponse<Blob>>;
  delete(
    path: string,
    options: IApiOptions & { responseType: 'arraybuffer'; observe?: 'body' },
  ): Observable<ArrayBuffer>;
  delete(
    path: string,
    options: IApiOptions & { responseType: 'arraybuffer'; observe: 'response' },
  ): Observable<HttpResponse<ArrayBuffer>>;
  delete(
    path: string,
    options: IApiOptions & { responseType: 'text'; observe?: 'body' },
  ): Observable<string>;
  delete(
    path: string,
    options: IApiOptions & { responseType: 'text'; observe: 'response' },
  ): Observable<HttpResponse<string>>;
  delete<T = any>(path: string, options?: IApiOptions): Observable<T>;
  delete(path: string, options?: IApiOptions): Observable<unknown> {
    return this.request('DELETE', path, options?.body, options);
  }

  /** Uploads a file or existing form payload as multipart form data. */
  upload<T = any>(
    path: string,
    file: File | FormData,
    options?: IApiOptions & { responseType?: 'json'; observe?: 'body' },
  ): Observable<T>;
  upload<T = any>(
    path: string,
    file: File | FormData,
    options: IApiOptions & { responseType?: 'json'; observe: 'response' },
  ): Observable<HttpResponse<T>>;
  upload(
    path: string,
    file: File | FormData,
    options: IApiOptions & { responseType: 'blob'; observe?: 'body' },
  ): Observable<Blob>;
  upload(
    path: string,
    file: File | FormData,
    options: IApiOptions & { responseType: 'blob'; observe: 'response' },
  ): Observable<HttpResponse<Blob>>;
  upload(
    path: string,
    file: File | FormData,
    options: IApiOptions & { responseType: 'arraybuffer'; observe?: 'body' },
  ): Observable<ArrayBuffer>;
  upload(
    path: string,
    file: File | FormData,
    options: IApiOptions & { responseType: 'arraybuffer'; observe: 'response' },
  ): Observable<HttpResponse<ArrayBuffer>>;
  upload(
    path: string,
    file: File | FormData,
    options: IApiOptions & { responseType: 'text'; observe?: 'body' },
  ): Observable<string>;
  upload(
    path: string,
    file: File | FormData,
    options: IApiOptions & { responseType: 'text'; observe: 'response' },
  ): Observable<HttpResponse<string>>;
  upload<T = any>(path: string, file: File | FormData, options?: IApiOptions): Observable<T>;
  upload(path: string, file: File | FormData, options?: IApiOptions): Observable<unknown> {
    const body = file instanceof FormData ? file : new FormData();
    if (!(file instanceof FormData)) body.append('file', file);
    return this.request('POST', path, body, options);
  }

  /** Downloads a binary response body. */
  getBlob(path: string, params?: HttpParams, options?: IApiOptions): Observable<Blob> {
    return this.request(
      'GET',
      path,
      undefined,
      { ...options, responseType: 'blob', observe: 'body' },
      params,
    ) as Observable<Blob>;
  }
}
