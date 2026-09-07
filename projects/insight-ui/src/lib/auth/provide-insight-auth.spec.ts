import { TestBed } from '@angular/core/testing';

import { environment as defaultEnvironment } from '../../environments/environment';
import {
  getDefaultInsightAuthConfig,
  IInsightAuthConfig,
  INSIGHT_AUTH_CONFIG,
  validateInsightAuthConfig,
} from './auth-config';
import { provideInsightAuth } from './provide-insight-auth';

const VALID_OVERRIDES = {
  api: { identity: 'https://app.example.com/api' },
  signinUrl: 'https://app.example.com/api/auth/login',
};

describe('provideInsightAuth', () => {
  it('fails fast when called with no arguments (no baked-in identity host)', () => {
    expect(() => provideInsightAuth()).toThrowError(/api.identity/);
  });

  it('fails fast when signinUrl is missing', () => {
    expect(() => provideInsightAuth({ api: { identity: 'https://app.example.com/api' } })).toThrowError(
      /signinUrl/,
    );
  });

  it('fails fast when api.identity is missing', () => {
    expect(() => provideInsightAuth({ signinUrl: 'https://app.example.com/api/auth/login' })).toThrowError(
      /api.identity/,
    );
  });

  it('resolves optional-field defaults when identity host and signinUrl are supplied', () => {
    TestBed.configureTestingModule({
      providers: [provideInsightAuth(VALID_OVERRIDES)],
    });

    const config = TestBed.inject(INSIGHT_AUTH_CONFIG);

    expect(config.api.identity).toBe('https://app.example.com/api');
    expect(config.api['user']).toBe(defaultEnvironment.api.user);
    expect(config.signinUrl).toBe('https://app.example.com/api/auth/login');
    expect(config.callbackPath).toBe('/auth/callback');
    expect(config.allowedReturnOrigins).toEqual([window.location.origin]);
    expect(config.tokenLifespan).toEqual(defaultEnvironment.tokenLifespan);
    expect(config.csrfTokenMaxAgeSeconds).toBe(defaultEnvironment.csrfTokenMaxAgeSeconds);
    expect(config.endpoints?.refresh).toBe('/auth/refresh');
  });

  it('deep-merges a partial `api` override, keeping the other api defaults', () => {
    TestBed.configureTestingModule({
      providers: [
        provideInsightAuth({
          ...VALID_OVERRIDES,
          api: { identity: VALID_OVERRIDES.api.identity, product: 'https://product.example.com/api' },
        }),
      ],
    });

    const config = TestBed.inject(INSIGHT_AUTH_CONFIG);

    expect(config.api.identity).toBe('https://app.example.com/api');
    expect(config.api['product']).toBe('https://product.example.com/api');
    expect(config.api['user']).toBe(defaultEnvironment.api.user);
  });

  it('deep-merges an `endpoints` override, keeping the other endpoint defaults', () => {
    TestBed.configureTestingModule({
      providers: [
        provideInsightAuth({ ...VALID_OVERRIDES, endpoints: { refresh: '/v1/session/refresh' } }),
      ],
    });

    const config = TestBed.inject(INSIGHT_AUTH_CONFIG);

    expect(config.endpoints?.refresh).toBe('/v1/session/refresh');
    expect(config.endpoints?.csrf).toBe('/auth/csrf');
    expect(config.endpoints?.logout).toBe('/auth/logout');
  });

  it('deep-merges a partial `tokenLifespan` override, keeping the other lifespan defaults', () => {
    TestBed.configureTestingModule({
      providers: [provideInsightAuth({ ...VALID_OVERRIDES, tokenLifespan: { accessTokenSeconds: 900 } })],
    });

    const config = TestBed.inject(INSIGHT_AUTH_CONFIG);

    expect(config.tokenLifespan.accessTokenSeconds).toBe(900);
    expect(config.tokenLifespan.refreshTokenSeconds).toBe(7200);
    expect(config.tokenLifespan.ssoSessionMaxSeconds).toBe(54000);
  });
});

describe('getDefaultInsightAuthConfig / validateInsightAuthConfig', () => {
  it('leaves identity host and signinUrl empty by default (no shared identity provider)', () => {
    const config = getDefaultInsightAuthConfig();
    expect(config.api.identity).toBe('');
    expect(config.signinUrl).toBe('');
  });

  it('rejects a config without an identity host or signinUrl', () => {
    const defaults = getDefaultInsightAuthConfig();
    expect(() => validateInsightAuthConfig(defaults)).toThrowError(/api.identity/);

    const partial: IInsightAuthConfig = { ...defaults, api: { ...defaults.api, identity: 'https://app.example.com/api' } };
    expect(() => validateInsightAuthConfig(partial)).toThrowError(/signinUrl/);
  });
});
