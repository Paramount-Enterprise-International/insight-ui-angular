import { InjectionToken } from '@angular/core';

import { environment as defaultEnvironment } from '../../environments/environment';
import type { ApiErrorCatalogResolver } from '../api/api-error';

/**
 * Token lifespan configuration (seconds). Mirrors the platform-wide AC used by
 * iam-web: Access Token 1h, Refresh Token 2h, Max SSO Session 15h. Consumer
 * apps should reuse the exact same values as iam-web for consistency, not
 * invent their own policy.
 */
export type IInsightTokenLifespan = {
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
export type IInsightAuthConfig = {
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
  /**
   * This app's registered application API key (iam-user-api `application.api_key`).
   * Attached as an `Api-Key` header on every request. Empty/undefined disables it.
   */
  apiKey?: string;
  /**
   * This app's application id (iam-user-api `application.id`). Used as the
   * default `applicationId` when loading the effective menus, so each app only
   * sees its own application's navigation. Empty/undefined keeps the legacy
   * all-applications behaviour.
   */
  appId?: string;
  /**
   * How the auth interceptor handles a failed session refresh:
   * - `'dialog'`: show the library session-expired dialog (default).
   * - `'redirect'`: legacy behaviour — full-page redirect to the signin page.
   * When `onUnauthorized` is provided it takes precedence and disables both.
   */
  unauthorizedHandling?: 'dialog' | 'redirect';
  /**
   * Optional consumer-owned handler invoked when a session refresh fails.
   * Overrides `unauthorizedHandling` — neither the dialog nor the redirect
   * runs when this is provided.
   */
  onUnauthorized?: (error: unknown) => void;
  /**
   * Optional synchronous error-catalog lookup. Display helpers invoke it only
   * when the backend did not provide `message`, before legacy/local fallbacks.
   */
  errorCatalogResolver?: ApiErrorCatalogResolver;
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
 * Default `IInsightAuthConfig`, sourced from the library's default environment
 * file (`environments/environment.ts`). Consumer apps override any field via
 * `provideInsightAuth({ ... })`.
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
      identity: defaultEnvironment.api.identity,
      user: defaultEnvironment.api.user,
      configuration: defaultEnvironment.api.configuration,
      application: defaultEnvironment.api.application,
    },
    signinUrl: defaultEnvironment.signinUrl,
    callbackPath: '/auth/callback',
    allowedReturnOrigins: [window.location.origin],
    cookieDomain: window.location.hostname,
    tokenLifespan: { ...defaultEnvironment.tokenLifespan },
    csrfTokenMaxAgeSeconds: defaultEnvironment.csrfTokenMaxAgeSeconds,
    apiKey: defaultEnvironment.apiKey,
    appId: defaultEnvironment.appId,
    unauthorizedHandling: 'dialog',
  };
}

/**
 * Injection token carrying the consumer app's `IInsightAuthConfig`. Provided via
 * `provideInsightAuth()`. Has a root-level default (`getDefaultInsightAuthConfig()`)
 * so the library services never break when a consumer forgets to call
 * `provideInsightAuth()` — consumers override it explicitly.
 */
export const INSIGHT_AUTH_CONFIG = new InjectionToken<IInsightAuthConfig>('INSIGHT_AUTH_CONFIG', {
  providedIn: 'root',
  factory: (): IInsightAuthConfig => getDefaultInsightAuthConfig(),
});
