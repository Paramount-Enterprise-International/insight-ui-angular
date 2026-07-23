import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ICsrfService } from './csrf.service';
import { IInsightAuthConfig, INSIGHT_AUTH_CONFIG } from '../auth/auth-config';

const testConfig: IInsightAuthConfig = {
  api: { identity: 'http://localhost:3001/api' },
  signinUrl: 'http://localhost:4200/auth/signin',
  allowedReturnOrigins: ['http://localhost:4207'],
  cookieDomain: 'localhost',
  tokenLifespan: { accessTokenSeconds: 3600, refreshTokenSeconds: 7200, ssoSessionMaxSeconds: 54000 },
  csrfTokenMaxAgeSeconds: 7170,
};

describe('ICsrfService', () => {
  let service: ICsrfService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), { provide: INSIGHT_AUTH_CONFIG, useValue: testConfig }],
    });
    service = TestBed.inject(ICsrfService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('returns null before ensureToken() resolves', () => {
    expect(service.getToken()).toBeNull();
  });

  it('fetches and stores the CSRF token from iam-identity-api', () => {
    service.ensureToken().subscribe();

    const req = httpMock.expectOne(`${testConfig.api.identity}/auth/csrf`);
    expect(req.request.withCredentials).toBeTrue();
    req.flush({ csrfToken: 'abc123' });

    expect(service.getToken()).toBe('abc123');
  });

  it('returns null once the token has exceeded csrfTokenMaxAgeSeconds', () => {
    jasmine.clock().install();
    const baseTime = new Date(2026, 0, 1, 0, 0, 0);
    jasmine.clock().mockDate(baseTime);

    service.ensureToken().subscribe();
    httpMock.expectOne(`${testConfig.api.identity}/auth/csrf`).flush({ csrfToken: 'abc123' });
    expect(service.getToken()).toBe('abc123');

    jasmine.clock().tick((testConfig.csrfTokenMaxAgeSeconds + 1) * 1000);
    expect(service.getToken()).toBeNull();

    jasmine.clock().uninstall();
  });

  it('does not throw when the fetch fails (non-fatal)', () => {
    let completed = false;
    service.ensureToken().subscribe({ next: () => (completed = true) });

    const req = httpMock.expectOne(`${testConfig.api.identity}/auth/csrf`);
    req.flush('error', { status: 500, statusText: 'Server Error' });

    expect(completed).toBeTrue();
    expect(service.getToken()).toBeNull();
  });
});
