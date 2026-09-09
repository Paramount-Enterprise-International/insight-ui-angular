import { TestBed } from '@angular/core/testing';

import { environment as defaultEnvironment } from '../../environments/environment';
import {
  getDefaultIAuthConfig,
  I_AUTH_CONFIG,
  IAuthConfig,
  validateIAuthConfig,
} from './auth-config';
import { provideIAuth } from './provide-insight-auth';

const VALID_OVERRIDES = {
  api: { identity: 'https://app.example.com/api' },
  signinUrl: 'https://app.example.com/api/auth/login',
};

describe('provideIAuth', () => {
  it('fails fast when called with no arguments (no baked-in identity host)', () => {
    expect(() => provideIAuth()).toThrowError(/api.identity/);
  });

  it('fails fast when signinUrl is missing', () => {
    expect(() =>
      provideIAuth({ api: { identity: 'https://app.example.com/api' } }),
    ).toThrowError(/signinUrl/);
  });

  it('fails fast when api.identity is missing', () => {
    expect(() =>
      provideIAuth({ signinUrl: 'https://app.example.com/api/auth/login' }),
    ).toThrowError(/api.identity/);
  });

  it('resolves optional-field defaults when identity host and signinUrl are supplied', () => {
    TestBed.configureTestingModule({
      providers: [provideIAuth(VALID_OVERRIDES)],
    });

    const config = TestBed.inject(I_AUTH_CONFIG);

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
        provideIAuth({
          ...VALID_OVERRIDES,
          api: {
            identity: VALID_OVERRIDES.api.identity,
            product: 'https://product.example.com/api',
          },
        }),
      ],
    });

    const config = TestBed.inject(I_AUTH_CONFIG);

    expect(config.api.identity).toBe('https://app.example.com/api');
    expect(config.api['product']).toBe('https://product.example.com/api');
    expect(config.api['user']).toBe(defaultEnvironment.api.user);
  });

  it('deep-merges an `endpoints` override, keeping the other endpoint defaults', () => {
    TestBed.configureTestingModule({
      providers: [
        provideIAuth({ ...VALID_OVERRIDES, endpoints: { refresh: '/v1/session/refresh' } }),
      ],
    });

    const config = TestBed.inject(I_AUTH_CONFIG);

    expect(config.endpoints?.refresh).toBe('/v1/session/refresh');
    expect(config.endpoints?.csrf).toBe('/auth/csrf');
    expect(config.endpoints?.logout).toBe('/auth/logout');
  });

  it('deep-merges a partial `tokenLifespan` override, keeping the other lifespan defaults', () => {
    TestBed.configureTestingModule({
      providers: [
        provideIAuth({ ...VALID_OVERRIDES, tokenLifespan: { accessTokenSeconds: 900 } }),
      ],
    });

    const config = TestBed.inject(I_AUTH_CONFIG);

    expect(config.tokenLifespan.accessTokenSeconds).toBe(900);
    expect(config.tokenLifespan.refreshTokenSeconds).toBe(7200);
    expect(config.tokenLifespan.ssoSessionMaxSeconds).toBe(54000);
  });
});

describe('getDefaultIAuthConfig / validateIAuthConfig', () => {
  it('leaves identity host and signinUrl empty by default (no shared identity provider)', () => {
    const config = getDefaultIAuthConfig();
    expect(config.api.identity).toBe('');
    expect(config.signinUrl).toBe('');
  });

  it('rejects a config without an identity host or signinUrl', () => {
    const defaults = getDefaultIAuthConfig();
    expect(() => validateIAuthConfig(defaults)).toThrowError(/api.identity/);

    const partial: IAuthConfig = {
      ...defaults,
      api: { ...defaults.api, identity: 'https://app.example.com/api' },
    };
    expect(() => validateIAuthConfig(partial)).toThrowError(/signinUrl/);
  });
});
