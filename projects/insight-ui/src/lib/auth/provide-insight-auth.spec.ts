import { TestBed } from '@angular/core/testing';

import { INSIGHT_AUTH_CONFIG } from './auth-config';
import { provideInsightAuth } from './provide-insight-auth';

describe('provideInsightAuth', () => {
  it('resolves to the local-dev defaults when called with no arguments', () => {
    TestBed.configureTestingModule({
      providers: [provideInsightAuth()],
    });

    const config = TestBed.inject(INSIGHT_AUTH_CONFIG);

    expect(config.api.identity).toBe('http://localhost:3001/api');
    expect(config.signinUrl).toBe('http://localhost:4200/signin');
    expect(config.callbackPath).toBe('/auth/callback');
    expect(config.allowedReturnOrigins).toEqual([window.location.origin]);
    expect(config.tokenLifespan).toEqual({
      accessTokenSeconds: 3600,
      refreshTokenSeconds: 7200,
      ssoSessionMaxSeconds: 54000,
    });
    expect(config.csrfTokenMaxAgeSeconds).toBe(7170);
  });

  it('overrides only the specified top-level field, keeping the rest at their defaults', () => {
    TestBed.configureTestingModule({
      providers: [provideInsightAuth({ signinUrl: 'https://iam.paramount-land.com/signin' })],
    });

    const config = TestBed.inject(INSIGHT_AUTH_CONFIG);

    expect(config.signinUrl).toBe('https://iam.paramount-land.com/signin');
    expect(config.api.identity).toBe('http://localhost:3001/api');
  });

  it('deep-merges a partial `api` override without dropping the default identity URL semantics', () => {
    TestBed.configureTestingModule({
      providers: [
        provideInsightAuth({
          api: {
            identity: 'https://iam-identity.paramount-land.com/api',
            product: 'https://product.paramount-land.com/api',
          },
        }),
      ],
    });

    const config = TestBed.inject(INSIGHT_AUTH_CONFIG);

    expect(config.api.identity).toBe('https://iam-identity.paramount-land.com/api');
    expect(config.api['product']).toBe('https://product.paramount-land.com/api');
  });

  it('deep-merges a partial `tokenLifespan` override, keeping the other lifespan defaults', () => {
    TestBed.configureTestingModule({
      providers: [provideInsightAuth({ tokenLifespan: { accessTokenSeconds: 900 } })],
    });

    const config = TestBed.inject(INSIGHT_AUTH_CONFIG);

    expect(config.tokenLifespan.accessTokenSeconds).toBe(900);
    expect(config.tokenLifespan.refreshTokenSeconds).toBe(7200);
    expect(config.tokenLifespan.ssoSessionMaxSeconds).toBe(54000);
  });
});
