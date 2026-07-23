import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IApiService } from './api.service';
import { ICsrfService } from '../csrf/csrf.service';
import { IInsightAuthConfig, INSIGHT_AUTH_CONFIG } from '../auth/auth-config';

const testConfig: IInsightAuthConfig = {
  api: { identity: 'http://localhost:3001/api' },
  signinUrl: 'http://localhost:4200/auth/signin',
  allowedReturnOrigins: ['http://localhost:4207'],
  cookieDomain: 'localhost',
  tokenLifespan: { accessTokenSeconds: 3600, refreshTokenSeconds: 7200, ssoSessionMaxSeconds: 54000 },
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
        { provide: INSIGHT_AUTH_CONFIG, useValue: testConfig },
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
      .flush({ title: 'Too Many Requests', detail: 'Too many requests', retryAfter: 30 }, { status: 429, statusText: 'Too Many Requests' });
  });

  it('resolves an apiUrl override instead of the default identity base URL', () => {
    service.get('/products', undefined, { apiUrl: 'http://localhost:3002/api' }).subscribe();

    const req = httpMock.expectOne('http://localhost:3002/api/products');
    expect(req.request.url).toBe('http://localhost:3002/api/products');
    req.flush([]);
  });
});
