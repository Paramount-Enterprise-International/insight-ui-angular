import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { IInsightAuthConfig, INSIGHT_AUTH_CONFIG } from '../auth/auth-config';
import { IApiService } from '../api/api.service';
import { ICurrentUserService } from './current-user.service';

const testConfig: IInsightAuthConfig = {
  api: {
    identity: 'http://localhost:3001/api',
    user: 'http://localhost:3002/api/users',
  },
  signinUrl: 'http://localhost:4200/auth/signin',
  allowedReturnOrigins: ['http://localhost:4207'],
  cookieDomain: 'localhost',
  tokenLifespan: { accessTokenSeconds: 3600, refreshTokenSeconds: 7200, ssoSessionMaxSeconds: 54000 },
  csrfTokenMaxAgeSeconds: 7170,
};

describe('ICurrentUserService', () => {
  let service: ICurrentUserService;
  let apiSpy: jasmine.SpyObj<IApiService>;

  beforeEach(() => {
    apiSpy = jasmine.createSpyObj<IApiService>('IApiService', ['get']);
    TestBed.configureTestingModule({
      providers: [
        { provide: IApiService, useValue: apiSpy },
        { provide: INSIGHT_AUTH_CONFIG, useValue: testConfig },
      ],
    });
    service = TestBed.inject(ICurrentUserService);
  });

  it('getCurrentUser calls GET {api.user}/users/user with the user base URL', (done) => {
    const raw = { userId: 'u1', username: 'jdoe' };
    apiSpy.get.and.returnValue(of(raw));

    service.getCurrentUser().subscribe((res) => {
      expect(apiSpy.get).toHaveBeenCalledWith('/users/user', undefined, { apiUrl: 'http://localhost:3002/api/users' });
      expect(res).toEqual(raw as never);
      done();
    });
  });

  it('respects an overridden api.user from the resolved config', (done) => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        { provide: IApiService, useValue: apiSpy },
        {
          provide: INSIGHT_AUTH_CONFIG,
          useValue: {
            ...testConfig,
            api: { ...testConfig.api, user: 'https://account-dev.paramountenterprise.co.id/api/v1/users' },
          },
        },
      ],
    });
    service = TestBed.inject(ICurrentUserService);
    apiSpy.get.and.returnValue(of({}));

    service.getCurrentUser().subscribe(() => {
      expect(apiSpy.get).toHaveBeenCalledWith('/users/user', undefined, {
        apiUrl: 'https://account-dev.paramountenterprise.co.id/api/v1/users',
      });
      done();
    });
  });
});
