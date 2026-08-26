import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { INSIGHT_AUTH_CONFIG } from '../auth/auth-config';
import { buildExternalSigninUrl } from '../auth/build-signin-redirect-url';
import { ISessionService } from '../session/session.service';

/**
 * Cross-domain auth guard for @insight/ui consumer apps.
 *
 * Unlike iam-web's internal Router-based guard, this performs a FULL PAGE
 * redirect to iam-web's signin page when unauthenticated, since the consumer
 * app and iam-web are separate applications/domains — not routes within the
 * same Angular router. The redirect is routed through this app's OWN
 * callback route (not the page the user was trying to visit) — see
 * `buildExternalSigninUrl()` for why that's required to avoid a redirect loop.
 */
export const authGuard: CanActivateFn = (_route, state) => {
  const session = inject(ISessionService);
  const config = inject(INSIGHT_AUTH_CONFIG);

  // provideInsightAuth() registers an APP_INITIALIZER that calls
  // tryRestoreSession(), so by the time the router runs this guard
  // initializing() should already be false. If a consumer bypasses
  // provideInsightAuth() or the guard runs earlier, allow navigation to
  // proceed — the consumer's root component is responsible for gating the
  // outlet with session.initializing().
  if (session.initializing()) {
    return true;
  }

  if (session.isAuth()) {
    return true;
  }

  window.location.href = buildExternalSigninUrl(config, state.url);
  return false;
};
