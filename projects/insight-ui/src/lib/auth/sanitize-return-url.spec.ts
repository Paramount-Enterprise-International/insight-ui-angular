import { sanitizeReturnUrl } from './sanitize-return-url';

describe('sanitizeReturnUrl', () => {
  const allowedReturnOrigins = ['https://remote.paramount-land.com', 'https://*.paramount-land.com'];

  it('falls back to / for null/empty input', () => {
    expect(sanitizeReturnUrl(null, allowedReturnOrigins)).toEqual({ returnUrl: '/', isExternal: false });
    expect(sanitizeReturnUrl(undefined, allowedReturnOrigins)).toEqual({ returnUrl: '/', isExternal: false });
    expect(sanitizeReturnUrl('', allowedReturnOrigins)).toEqual({ returnUrl: '/', isExternal: false });
  });

  it('allows relative paths', () => {
    expect(sanitizeReturnUrl('/dashboard', allowedReturnOrigins)).toEqual({
      returnUrl: '/dashboard',
      isExternal: false,
    });
  });

  it('rejects protocol-relative URLs', () => {
    expect(sanitizeReturnUrl('//evil.com/phish', allowedReturnOrigins)).toEqual({
      returnUrl: '/',
      isExternal: false,
    });
  });

  it('allows absolute URLs matching an exact allowed origin', () => {
    expect(sanitizeReturnUrl('https://remote.paramount-land.com/auth/callback', allowedReturnOrigins)).toEqual({
      returnUrl: 'https://remote.paramount-land.com/auth/callback',
      isExternal: true,
    });
  });

  it('allows absolute URLs matching a wildcard allowed origin', () => {
    expect(sanitizeReturnUrl('https://insight.paramount-land.com/sso', allowedReturnOrigins)).toEqual({
      returnUrl: 'https://insight.paramount-land.com/sso',
      isExternal: true,
    });
  });

  it('rejects absolute URLs with a non-whitelisted origin (open-redirect protection)', () => {
    expect(sanitizeReturnUrl('https://evil.com/phish', allowedReturnOrigins)).toEqual({
      returnUrl: '/',
      isExternal: false,
    });
  });

  it('rejects malformed URLs', () => {
    expect(sanitizeReturnUrl('https://', allowedReturnOrigins)).toEqual({ returnUrl: '/', isExternal: false });
  });

  it('rejects unknown schemes', () => {
    expect(sanitizeReturnUrl('javascript:alert(1)', allowedReturnOrigins)).toEqual({
      returnUrl: '/',
      isExternal: false,
    });
  });
});
