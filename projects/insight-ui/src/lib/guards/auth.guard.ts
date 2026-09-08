import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { I_AUTH_CONFIG } from '../auth/auth-config';
import { buildExternalSigninUrl } from '../auth/build-signin-redirect-url';
import { ISessionExpiredService } from '../session-expired/session-expired.service';
import { ISessionService } from '../session/session.service';

/**
 * Cross-domain auth guard for @insight/ui consumer apps.
 *
 * Unlike an identity-owner app's internal Router-based guard, this performs a
 * FULL PAGE redirect to the configured signinUrl when unauthenticated, since
 * the consumer app and its auth/BFF host are separate applications/domains -
 * not routes within the same Angular router. The redirect is routed through
 * this app's OWN callback route (not the page the user was trying to visit) -
 * see `buildExternalSigninUrl()` for why that's required to avoid a redirect
 * loop.
 */
export const authGuard: CanActivateFn = (_route, state) => {
  const session = inject(ISessionService);
  const config = inject(I_AUTH_CONFIG);
  const sessionExpired = inject(ISessionExpiredService);

  // provideIAuth() registers an APP_INITIALIZER that calls
  // tryRestoreSession(), so by the time the router runs this guard
  // initializing() should already be false. If a consumer bypasses
  // provideIAuth() or the guard runs earlier, allow navigation to
  // proceed — the consumer's root component is responsible for gating the
  // outlet with session.initializing().
  if (session.initializing()) {
    return true;
  }

  // A pending session-expired overlay owns the UX. It is shown on a cold
  // start when a previously-active session is detected (tryRestoreSession)
  // or mid-session by the auth interceptor. Allow the navigation so the
  // consumer shell can render the overlay — its "Log in again" action
  // performs the redirect. Without this, the guard would full-redirect
  // before the dialog ever appears, making the cold-start overlay dead code.
  if (sessionExpired.visible()) {
    return true;
  }

  if (session.isAuth()) {
    return true;
  }

  window.location.href = buildExternalSigninUrl(config, state.url);
  return false;
};
