import { InjectionToken } from '@angular/core';

/**
 * Token lifespan configuration (seconds). Mirrors the platform-wide AC used by
 * iam-web: Access Token 1h, Refresh Token 2h, Max SSO Session 15h. Consumer
 * apps should reuse the exact same values as iam-web for consistency, not
 * invent their own policy.
 */
export interface IInsightTokenLifespan {
  accessTokenSeconds: number;
  refreshTokenSeconds: number;
  ssoSessionMaxSeconds: number;
}

/**
 * Configuration required by @insight/ui's shared auth package
 * (IApiService, ISessionService, ICsrfService, authGuard, authInterceptor).
 *
 * Consumer apps provide this via `provideInsightAuth(config)` in their
 * `app.config.ts` / bootstrap `ApplicationConfig`.
 */
export interface IInsightAuthConfig {
  /** API base URLs grouped by backend service. `identity` (iam-identity-api) is required — all auth calls (csrf, refresh) go through it. */
  api: {
    identity: string;
    [key: string]: string;
  };
  /** Full URL of iam-web's signin page — consumer apps redirect here when unauthenticated. */
  signinUrl: string;
  /**
   * This app's own SSO callback route, e.g. `/auth/callback` (default).
   * `authGuard`/`authInterceptor` always redirect through this route (never
   * through the page the user was originally trying to visit) so the
   * `#at=<token>` handoff has a dedicated place to be consumed and stripped
   * before the user is sent on to their original destination. See
   * `build-signin-redirect-url.ts` for why this matters (redirect-loop / HTTP
   * 431 prevention).
   */
  callbackPath?: string;
  /**
   * Trusted origins for post-callback/return redirects. Absolute URLs matching
   * any origin here are allowed; all others fall back to '/'. Wildcards are
   * supported (e.g. `https://*.paramount-land.com`). Relative paths (starting
   * with `/`) are always allowed regardless of this list.
   */
  allowedReturnOrigins: string[];
  /**
   * Cookie domain used by iam-identity-api for the HttpOnly refresh token
   * cookie. Informational only — the frontend never reads or sets this cookie.
   */
  cookieDomain: string;
  tokenLifespan: IInsightTokenLifespan;
  /** CSRF token max age in seconds (backend cookie maxAge minus a safety buffer). */
  csrfTokenMaxAgeSeconds: number;
}

/**
 * Overrides accepted by `provideInsightAuth()`. Every field is optional and
 * merged on top of `getDefaultInsightAuthConfig()` — including individual
 * `api.*` and `tokenLifespan.*` entries, so a consumer app can override just
 * `api.identity` (e.g. for staging/production) without having to restate the
 * rest of the config.
 *
 * Deliberately NOT an open/arbitrary shape (no index signature at this
 * level) — `IInsightAuthConfig` is a narrow, well-defined auth contract, not
 * a general app environment object. The one exception is `api`, which is
 * intentionally open-ended (a named registry of backend base URLs) since
 * consumer apps may need to register additional service URLs beyond
 * `identity`.
 */
export type IInsightAuthConfigOverrides = Partial<Omit<IInsightAuthConfig, 'api' | 'tokenLifespan'>> & {
  api?: Partial<IInsightAuthConfig['api']>;
  tokenLifespan?: Partial<IInsightTokenLifespan>;
};

/**
 * Local-dev-oriented defaults for `IInsightAuthConfig`. These match iam-web's
 * own local `environment.ts` values, so a consumer app's SSO setup works out
 * of the box with ZERO configuration during local development —
 * `provideInsightAuth()` can be called with no arguments at all.
 *
 * `api.identity` and `signinUrl` are the two fields most likely to need
 * overriding per deployment target — staging/production point at real
 * domains, not localhost. Override them via
 * `provideInsightAuth({ api: { identity: '...' }, signinUrl: '...' })`.
 *
 * `allowedReturnOrigins` defaults to this app's own origin (the common case —
 * a callback only ever needs to trust redirecting back to itself) and
 * `cookieDomain` defaults to the current hostname (informational only, the
 * frontend never reads/sets this cookie) — both computed at call time since
 * they depend on `window.location`.
 */
export function getDefaultInsightAuthConfig(): IInsightAuthConfig {
  return {
    api: {
      identity: 'http://localhost:3001/api',
    },
    signinUrl: 'http://localhost:4200/signin',
    callbackPath: '/auth/callback',
    allowedReturnOrigins: [window.location.origin],
    cookieDomain: window.location.hostname,
    tokenLifespan: {
      accessTokenSeconds: 3600,
      refreshTokenSeconds: 7200,
      ssoSessionMaxSeconds: 54000,
    },
    csrfTokenMaxAgeSeconds: 7170,
  };
}

/** Injection token carrying the consumer app's `IInsightAuthConfig`. Provided via `provideInsightAuth()`. */
export const INSIGHT_AUTH_CONFIG = new InjectionToken<IInsightAuthConfig>('INSIGHT_AUTH_CONFIG');
