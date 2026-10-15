import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IApiService } from './api';
import { resolveApiErrorDisplayMessage } from './api-error';
import { ICsrfService } from '../csrf/csrf';
import { I_AUTH_CONFIG, IAuthConfig } from '../auth/auth-config';

const testConfig: IAuthConfig = {
  api: { identity: 'http://localhost:3001/api' },
  signinUrl: 'http://localhost:4200/auth/signin',
  allowedReturnOrigins: ['http://localhost:4207'],
  tokenLifespan: {
    accessTokenSeconds: 3600,
    refreshTokenSeconds: 7200,
    ssoSessionMaxSeconds: 54000,
  },
  csrfTokenMaxAgeSeconds: 7170,
};

describe('IApiService', () => {
  let service: IApiService;
  let httpMock: HttpTestingController;
  let csrfSpy: jasmine.SpyObj<ICsrfService>;

  beforeEach(() => {
    csrfSpy = jasmine.createSpyObj<ICsrfService>('ICsrfService', ['getToken']);
    csrfSpy.getToken.and.returnValue('csrf-token-value');

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ICsrfService, useValue: csrfSpy },
        { provide: I_AUTH_CONFIG, useValue: testConfig },
      ],
    });
    service = TestBed.inject(IApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('GET sends withCredentials and injects the CSRF header', () => {
    service.get('/users').subscribe();

    const req = httpMock.expectOne(`${testConfig.api.identity}/users`);
    expect(req.request.withCredentials).toBeTrue();
    expect(req.request.headers.get('X-CSRF-Token')).toBe('csrf-token-value');
    req.flush({ id: '1' });
  });

  it('returns a transparent response with no { meta, data } wrapper', (done) => {
    service.get<{ id: string }>('/users/1').subscribe((res) => {
      expect(res).toEqual({ id: '1' });
      done();
    });

    httpMock.expectOne(`${testConfig.api.identity}/users/1`).flush({ id: '1' });
  });

  it('DELETE without a body omits Content-Type (Fastify compatibility)', () => {
    service.delete('/users/1').subscribe();

    const req = httpMock.expectOne(`${testConfig.api.identity}/users/1`);
    expect(req.request.headers.has('Content-Type')).toBeFalse();
    req.flush(null);
  });

  it('enriches RFC 9457 error responses with status/detail/retryAfter', (done) => {
    service.post('/users', {}).subscribe({
      error: (err) => {
        expect(err.status).toBe(429);
        expect(err.detail).toBe('Too many requests');
        expect(err.retryAfter).toBe(30);
        done();
      },
    });

    httpMock
      .expectOne(`${testConfig.api.identity}/users`)
      .flush(
        { title: 'Too Many Requests', detail: 'Too many requests', retryAfter: 30 },
        { status: 429, statusText: 'Too Many Requests' },
      );
  });

  it('keeps the backend message ahead of the transport message without overwriting legacy detail', (done) => {
    service.post('/auth/refresh', {}).subscribe({
      error: (err) => {
        expect(err.status).toBe(401);
        expect(err.errorCode).toBe('AUTH_SESSION_REVOKED');
        expect(err.message).toBe('Your session was revoked.');
        expect(err.detail).toBe('Legacy session detail');
        expect(err.revision).toBe(8);
        expect(err.traceId).toBe('trace-456');
        done();
      },
    });

    httpMock.expectOne(`${testConfig.api.identity}/auth/refresh`).flush(
      {
        errorCode: 'AUTH_SESSION_REVOKED',
        message: 'Your session was revoked.',
        detail: 'Legacy session detail',
        revision: 8,
        traceId: 'trace-456',
      },
      { status: 401, statusText: 'Unauthorized' },
    );
  });

  it('resolves an apiUrl override instead of the default identity base URL', () => {
    service.get('/products', undefined, { apiUrl: 'http://localhost:3002/api' }).subscribe();

    const req = httpMock.expectOne('http://localhost:3002/api/products');
    expect(req.request.url).toBe('http://localhost:3002/api/products');
    req.flush([]);
  });
});
import { fakeAsync, tick } from '@angular/core/testing';
import { HttpParams, HttpResponse } from '@angular/common/http';

describe('extended API response contracts', () => {
  let service: IApiService;
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ICsrfService, useValue: { getToken: (): string => 'csrf' } },
        { provide: I_AUTH_CONFIG, useValue: testConfig },
      ],
    });
    service = TestBed.inject(IApiService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());

  it('exposes pagination headers alongside a raw JSON array', () => {
    let result: HttpResponse<{ id: number }[]> | undefined;
    service
      .get<{ id: number }[]>('/items', new HttpParams().set('page', 0), { observe: 'response' })
      .subscribe((value) => (result = value));
    http
      .expectOne(testConfig.api.identity + '/items?page=0')
      .flush([{ id: 1 }], { headers: { 'X-Total-Count': '53' } });
    expect(result?.body).toEqual([{ id: 1 }]);
    expect(result?.headers.get('X-Total-Count')).toBe('53');
  });

  it('exposes binary download bodies and download headers', () => {
    let result: HttpResponse<Blob> | undefined;
    service
      .post(
        '/file',
        { id: 1 },
        { observe: 'response', responseType: 'blob', params: { format: 'pdf' } },
      )
      .subscribe((value) => (result = value));
    const request = http.expectOne(testConfig.api.identity + '/file?format=pdf');
    expect(request.request.responseType).toBe('blob');
    const blob = new Blob(['file'], { type: 'application/pdf' });
    request.flush(blob, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=file.pdf',
      },
    });
    expect(result?.body).toBe(blob);
    expect(result?.headers.get('Content-Disposition')).toContain('file.pdf');
  });

  it('passes FormData for ordinary methods and upload without Content-Type', () => {
    const form = new FormData();
    form.append('name', 'hello');
    service.post('/upload', form, { headers: { 'content-type': 'application/json' } }).subscribe();
    const request = http.expectOne(testConfig.api.identity + '/upload');
    expect(request.request.body).toBe(form);
    expect(request.request.headers.has('Content-Type')).toBeFalse();
    request.flush({});
    service.upload('/upload', form, { observe: 'response' }).subscribe();
    const upload = http.expectOne(testConfig.api.identity + '/upload');
    expect(upload.request.body).toBe(form);
    expect(upload.request.headers.has('Content-Type')).toBeFalse();
    upload.flush({});
  });

  it('keeps false, zero, and null DELETE bodies', () => {
    for (const body of [false, 0, null]) {
      service.delete('/item', { body }).subscribe();
      const request = http.expectOne(testConfig.api.identity + '/item');
      expect(request.request.body).toBe(body);
      if (body !== null)
        expect(request.request.headers.get('Content-Type')).toBe('application/json');
      request.flush(null, { status: 204, statusText: 'No Content' });
    }
  });

  it('keeps empty 200/204 responses and supports text/arraybuffer responses', () => {
    for (const status of [200, 204]) {
      let body: unknown = 'pending';
      service.get('/empty').subscribe((value) => (body = value));
      http.expectOne(testConfig.api.identity + '/empty').flush(null, { status, statusText: 'OK' });
      expect(body).toBeNull();
    }
    let bytes: ArrayBuffer | undefined;
    service
      .patch('/bytes', {}, { responseType: 'arraybuffer' })
      .subscribe((value) => (bytes = value));
    const buffer = new ArrayBuffer(3);
    http.expectOne(testConfig.api.identity + '/bytes').flush(buffer);
    expect(bytes).toBe(buffer);
    let text: string | undefined;
    service.put('/text', {}, { responseType: 'text' }).subscribe((value) => (text = value));
    http.expectOne(testConfig.api.identity + '/text').flush('hello');
    expect(text).toBe('hello');
  });

  it('cancels the underlying transport after 60000 ms', fakeAsync(() => {
    let error: { errorCode?: string } | undefined;
    service.get('/slow').subscribe({ error: (value) => (error = value) });
    const request = http.expectOne(testConfig.api.identity + '/slow');
    tick(59_999);
    expect(request.cancelled).toBeFalse();
    tick(1);
    expect(request.cancelled).toBeTrue();
    expect(error?.errorCode).toBe('REQUEST_TIMEOUT');
  }));

  it('cancels transport on AbortSignal and sends nothing for an already aborted signal', () => {
    const controller = new AbortController();
    let error: { errorCode?: string } | undefined;
    service
      .get('/slow', undefined, { signal: controller.signal })
      .subscribe({ error: (value) => (error = value) });
    const request = http.expectOne(testConfig.api.identity + '/slow');
    controller.abort();
    expect(request.cancelled).toBeTrue();
    expect(error?.errorCode).toBe('REQUEST_ABORTED');
    service
      .get('/never', undefined, { signal: controller.signal })
      .subscribe({ error: (failure) => expect(failure.errorCode).toBe('REQUEST_ABORTED') });
    http.expectNone(testConfig.api.identity + '/never');
  });

  it('preserves canonical status and message from arraybuffer errors', () => {
    let failure: { status?: number; message?: string } | undefined;
    service.get('/file', undefined, { responseType: 'arraybuffer' }).subscribe({
      error: (error) => (failure = error),
    });
    http
      .expectOne(testConfig.api.identity + '/file')
      .flush(
        new TextEncoder().encode(JSON.stringify({ status: 400, message: 'Invalid download' }))
          .buffer,
        { status: 400, statusText: 'Bad Request' },
      );
    expect(failure?.status).toBe(400);
    expect(failure?.message).toBe('Invalid download');
  });

  it('decodes JSON error bodies for binary requests and safely falls back for non-JSON text', (done) => {
    service.get('/file', undefined, { responseType: 'blob' }).subscribe({
      error: (error) => {
        expect(error.status).toBe(400);
        expect(error.message).toBe('Invalid file');
        done();
      },
    });
    http
      .expectOne(testConfig.api.identity + '/file')
      .flush(
        new Blob([JSON.stringify({ Message: 'Invalid file', errors: { Name: ['Required'] } })]),
        {
          status: 400,
          statusText: 'Bad Request',
        },
      );
  });
});

describe('non-JSON response errors', () => {
  it('uses a local display fallback instead of the transport message or HTML body', (done) => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ICsrfService, useValue: { getToken: (): null => null } },
        { provide: I_AUTH_CONFIG, useValue: testConfig },
      ],
    });
    const api = TestBed.inject(IApiService);
    const http = TestBed.inject(HttpTestingController);
    api.get('/file', undefined, { responseType: 'text' }).subscribe({
      error: (error) => {
        expect(error.status).toBe(503);
        expect(resolveApiErrorDisplayMessage(error, 'Service unavailable')).toBe(
          'Service unavailable',
        );
        http.verify();
        done();
      },
    });
    http.expectOne(testConfig.api.identity + '/file').flush('<html>Unavailable</html>', {
      status: 503,
      statusText: 'Service Unavailable',
    });
  });
});
