import { buildExternalSigninUrl } from './build-signin-redirect-url';
import { IInsightAuthConfig } from './auth-config';

const testConfig: IInsightAuthConfig = {
  api: { identity: 'http://localhost:3001/api' },
  signinUrl: 'http://localhost:4200/signin',
  callbackPath: '/auth/callback',
  allowedReturnOrigins: ['http://localhost:4207'],
  cookieDomain: 'localhost',
  tokenLifespan: { accessTokenSeconds: 3600, refreshTokenSeconds: 7200, ssoSessionMaxSeconds: 54000 },
  csrfTokenMaxAgeSeconds: 7170,
};

describe('buildExternalSigninUrl', () => {
  it('routes the handoff through this app\'s own callback route, not the current page', () => {
    const url = buildExternalSigninUrl(testConfig, '/dashboard?x=1');

    expect(url).toBe(
      `http://localhost:4200/signin?returnUrl=${encodeURIComponent(
        `${window.location.origin}/auth/callback?returnUrl=${encodeURIComponent('/dashboard?x=1')}`,
      )}`,
    );
  });

  it('defaults callbackPath to /auth/callback when not configured', () => {
    const { callbackPath, ...rest } = testConfig;
    void callbackPath;
    const url = buildExternalSigninUrl(rest, '/');

    expect(url).toContain(encodeURIComponent('/auth/callback?returnUrl='));
  });

  it('never embeds a previous #at= fragment (the URL passed in is always the clean target path)', () => {
    // Simulates the OLD buggy behavior being impossible now: the caller only
    // ever passes a router-relative path (state.url / pathname+search), never
    // window.location.href, so a hash fragment can never be present here.
    const url = buildExternalSigninUrl(testConfig, '/');
    expect(url).not.toContain('%23at%3D');
  });
});
