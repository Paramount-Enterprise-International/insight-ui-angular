import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import { getDefaultInsightAuthConfig, IInsightAuthConfig, IInsightAuthConfigOverrides, INSIGHT_AUTH_CONFIG } from './auth-config';

/**
 * Registers the @insight/ui shared auth package (`IApiService`,
 * `ISessionService`, `ICsrfService`, `authGuard`) for a consumer app.
 *
 * Zero-config by default — sensible local-dev defaults are baked in (see
 * `getDefaultInsightAuthConfig()`), matching iam-web's own local
 * environment. Consumer apps only need to pass `overrides` for whatever
 * differs from the defaults — typically `api.identity` and `signinUrl` when
 * deploying to staging/production. Every field can be overridden
 * individually, down to a single nested `api.*` or `tokenLifespan.*` entry;
 * anything not overridden falls back to the default.
 *
 * Consumers must still register `authInterceptor` themselves via
 * `provideHttpClient(withInterceptors([authInterceptor]))` in their own
 * `app.config.ts` — matches iam-web's existing pattern of wiring the
 * interceptor explicitly rather than hiding it inside a provider function.
 *
 * Usage (zero-config — local dev):
 * ```ts
 * export const config: ApplicationConfig = {
 *   providers: [
 *     provideInsightAuth(),
 *     provideHttpClient(withInterceptors([authInterceptor])),
 *     provideRouter(routes),
 *   ],
 * };
 * ```
 *
 * Usage (override for staging/production):
 * ```ts
 * provideInsightAuth({
 *   api: { identity: 'https://iam-identity.paramount-land.com/api' },
 *   signinUrl: 'https://iam.paramount-land.com/signin',
 * });
 * ```
 */
export function provideInsightAuth(overrides?: IInsightAuthConfigOverrides): EnvironmentProviders {
  const defaults = getDefaultInsightAuthConfig();
  const config: IInsightAuthConfig = {
    ...defaults,
    ...overrides,
    // Cast needed: `Partial<...>`'s index signature widens to `string | undefined`,
    // but real callers only ever pass actual string URLs, never `undefined` values.
    api: { ...defaults.api, ...overrides?.api } as IInsightAuthConfig['api'],
    tokenLifespan: { ...defaults.tokenLifespan, ...overrides?.tokenLifespan },
  };
  return makeEnvironmentProviders([{ provide: INSIGHT_AUTH_CONFIG, useValue: config }]);
}
