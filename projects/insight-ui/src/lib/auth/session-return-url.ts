import { Location } from '@angular/common';

/** Captures the router destination without carrying an access-token handoff into sign-in. */
export function getSessionReturnUrl(location: Pick<Location, 'path'>): string {
  let path = location.path(true);
  const hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    const fragment = path.slice(hashIndex + 1);
    if (new URLSearchParams(fragment).has('at')) {
      const remaining = fragment
        .split('&')
        .filter((part) => !new URLSearchParams(part).has('at'))
        .join('&');
      path = path.slice(0, hashIndex) + (remaining ? `#${remaining}` : '');
    }
  }
  return path.startsWith('/') ? path : `/${path}`;
}
