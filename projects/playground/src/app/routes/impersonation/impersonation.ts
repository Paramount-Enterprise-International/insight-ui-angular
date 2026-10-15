import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  getDefaultIAuthConfig,
  I_AUTH_CONFIG,
  IHImpersonationBanner,
  IImpersonationStateService,
  IInfoNotice,
  ISessionService,
  IUserMenuStore,
} from '@insight-ui';
import { of, throwError } from 'rxjs';
const status = {
  mode: 'IMPERSONATING' as const,
  actorName: 'Sri Mulyani',
  subjectName: 'Nina Kartika',
  occupation: 'Approval Manager',
  endAt: new Date(Date.now() + 90 * 60_000).toISOString(),
};
const token = 'e30.' + btoa(JSON.stringify({ sub: 'b', act: { sub: 'a' } })) + '.sig';
@Component({
  selector: 'app-impersonation-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IHImpersonationBanner, IInfoNotice],
  providers: [
    {
      provide: I_AUTH_CONFIG,
      useFactory: (): unknown => ({
        ...getDefaultIAuthConfig(),
        api: { identity: window.location.origin + '/api' },
        signinUrl: '/signin',
      }),
    },
    {
      provide: ISessionService,
      useFactory: (): unknown => ({
        impersonationContext: signal('fixture'),
        isImpersonating: (): boolean => true,
        getAccessToken: (): string => token,
        getUser: (): { name: string } => ({ name: 'Nina Kartika' }),
        endImpersonation: (): import('rxjs').Observable<never> =>
          throwError(() => ({
            status: 503,
            message: 'Preview only. The session has not been changed.',
          })),
      }),
    },
    {
      provide: IImpersonationStateService,
      useFactory: (): unknown => ({
        status: signal(status),
        loadStatus: (): import('rxjs').Observable<typeof status> => of(status),
      }),
    },
    { provide: IUserMenuStore, useFactory: (): unknown => ({ rawCurrentUser: signal(null) }) },
  ],
  template: `<div class="flex flex-col gap-lg w-full">
    <h1>Impersonation</h1>
    <p>Local fixture. End Session demonstrates the retryable error state.</p>
    <ih-impersonation-banner />
    <i-info-notice
      message="This action cannot be performed during an impersonation session."
      title="Not available."
    />
  </div>`,
})
export class Impersonation {}
