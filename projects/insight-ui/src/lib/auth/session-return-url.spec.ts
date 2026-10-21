import { APP_BASE_HREF, Location, PlatformLocation } from '@angular/common';
import { MockPlatformLocation } from '@angular/common/testing';
import { TestBed } from '@angular/core/testing';

import { getSessionReturnUrl } from './session-return-url';

describe('session return URL', () => {
  for (const [browserPath, expected] of [
    ['/-/reports/42?tab=roles#details', '/reports/42?tab=roles#details'],
    ['/-/?view=home#summary', '/?view=home#summary'],
    ['/-/#summary', '/#summary'],
    ['/-/', '/'],
    ['/-/reports?tab=roles#at=handoff-token', '/reports?tab=roles'],
    ['/-/reports#intro&at=handoff-token&view=summary', '/reports#intro&view=summary'],
    ['/-/reports#a%74=handoff-token&intro', '/reports#intro'],
  ]) {
    it(`captures ${browserPath} as ${expected}`, () => {
      TestBed.configureTestingModule({
        providers: [
          { provide: APP_BASE_HREF, useValue: '/-/' },
          {
            provide: PlatformLocation,
            useFactory: (): MockPlatformLocation =>
              new MockPlatformLocation({
                startUrl: `https://atlas.test${browserPath}`,
                appBaseHref: '/-/',
              }),
          },
        ],
      });
      expect(getSessionReturnUrl(TestBed.inject(Location))).toBe(expected);
    });
  }
});
