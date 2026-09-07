import { APP_INITIALIZER, EnvironmentProviders, inject, makeEnvironmentProviders } from '@angular/core';

import {
  getDefaultInsightAuthConfig,
  IInsightAuthConfig,
  IInsightAuthConfigOverrides,
  INSIGHT_AUTH_CONFIG,
  validateInsightAuthConfig,
} from './auth-config';
import { ISessionService } from '../session/session.service';

/**
 * Registers the @insight/ui shared auth package (`IApiService`,
 * `ISessionService`, `ICsrfService`, `authGuard`) for a consumer app.
 *
 * `api.identity` and `signinUrl` are MANDATORY and app-specific: they must
 * point at THIS app's own auth backend. In the BFF-per-app model the app's
 * session cookie stays first-party on its own origin (SameSite-safe), so the
 * library no longer ships a default pointing at any shared identity provider.
 * A config that omits them throws at bootstrap (fail-fast). Every other field
 * is optional and can be overridden individually, down to a single nested
 * `api.*`, `tokenLifespan.*` or `endpoints.*` entry.
 *
 * Consumers must still register `authInterceptor` themselves via
 * `provideHttpClient(withInterceptors([authInterceptor]))` in their own
 * `app.config.ts`.
 *
 * Usage - point at your own auth host/BFF:
 * ```ts
 * provideInsightAuth({
 *   // this app's own backend: a same-origin BFF (e.g. atlas-api) or identity-api
 *   api: { identity: 'https://<your-app>.example.com/api' },
 *   // this app's own login entry (BFF login route or the app's signin page)
 *   signinUrl: 'https://<your-app>.example.com/api/auth/login',
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
    endpoints: { ...defaults.endpoints, ...overrides?.endpoints },
  };
  validateInsightAuthConfig(config);
  return makeEnvironmentProviders([
    { provide: INSIGHT_AUTH_CONFIG, useValue: config },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => {
        const session = inject(ISessionService);
        return () => session.tryRestoreSession();
      },
    },
  ]);
}
