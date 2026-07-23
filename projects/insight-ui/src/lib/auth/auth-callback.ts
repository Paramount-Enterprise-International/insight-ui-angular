import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { INSIGHT_AUTH_CONFIG } from './auth-config';
import { sanitizeReturnUrl } from './sanitize-return-url';
import { ISessionService } from '../session/session.service';

/**
 * Extract the access token appended by iam-web after a successful external
 * SSO redirect. Reads the URL HASH FRAGMENT (`#at=<token>`) — deliberately
 * NOT a query parameter — so the token is never sent to the server and never
 * appears in access/gateway logs (fragments are browser-only and are
 * unconditionally stripped from the `Referer` header).
 */
export function extractAccessTokenFromHash(): string | null {
  const hash = window.location.hash;
  if (!hash || hash.length < 2) {
    return null;
  }
  const params = new URLSearchParams(hash.substring(1));
  return params.get('at');
}

/**
 * Reusable SSO callback route component for @insight/ui consumer apps.
 * Register it at whatever route path is used as the `returnUrl` when
 * redirecting to iam-web's signin page, e.g.
 * `{ path: 'auth/callback', component: IAuthCallback }`.
 *
 * Flow:
 *  1. Extract the `at` token from the URL hash fragment.
 *  2. Store it via `ISessionService` (in-memory only).
 *  3. Clear the fragment from the URL immediately (never leave the token
 *     sitting in browser history).
 *  4. Validate & redirect to the original in-app `returnUrl` (query param
 *     `returnUrl`, defaulting to `/`), using the same `sanitizeReturnUrl`
 *     rules as iam-web.
 */
@Component({
  selector: 'insight-auth-callback',
  standalone: true,
  template: '',
})
export class IAuthCallback implements OnInit {
  private readonly session = inject(ISessionService);
  private readonly config = inject(INSIGHT_AUTH_CONFIG);
  private readonly router = inject(Router);

  ngOnInit(): void {
    const accessToken = extractAccessTokenFromHash();

    // Clear the fragment immediately regardless of outcome — the token must
    // never remain visible in the URL / browser history.
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    if (!accessToken) {
      window.location.href = this.config.signinUrl;
      return;
    }

    this.session.setAccessToken(accessToken);

    const rawReturnUrl = new URLSearchParams(window.location.search).get('returnUrl') || '/';
    const { returnUrl, isExternal } = sanitizeReturnUrl(rawReturnUrl, this.config.allowedReturnOrigins);

    // Self-redirect loop guard — a relative returnUrl must never point back
    // at this app's own callback route.
    const callbackPath = this.config.callbackPath ?? '/auth/callback';
    const safeReturnUrl = !isExternal && returnUrl.startsWith(callbackPath) ? '/' : returnUrl;

    if (isExternal) {
      window.location.href = returnUrl;
    } else {
      this.router.navigateByUrl(safeReturnUrl);
    }
  }
}
