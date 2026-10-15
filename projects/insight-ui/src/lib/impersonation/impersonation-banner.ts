import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  InjectionToken,
  signal,
  untracked,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { resolveApiErrorDisplayMessage } from '../api/api-error';
import { I_AUTH_CONFIG } from '../auth/auth-config';
import { IButton } from '../button/button';
import { IAlertService, IConfirmService } from '../dialog/dialog';
import { ISessionService } from '../session/session';
import { IUserMenuStore } from '../store/user-menu';
import { IImpersonationStateService } from './impersonation-state';
import {
  actorDisplayNameFromToken,
  COUNTDOWN_THRESHOLD_MS,
  formatCountdown,
  grantEndLabel,
  IMPERSONATION_CONFIRMATION,
  IMPERSONATION_INFORMATION,
  MAX_TIMER_DELAY_MS,
  resolveGrantEnd,
  resolveImpersonationRedirect,
} from './impersonation-utils';

export const I_IMPERSONATION_ERROR_RESOLVER = new InjectionToken<
  (error: unknown, fallback: string) => string
>('I_IMPERSONATION_ERROR_RESOLVER');

@Component({
  selector: 'ih-impersonation-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IButton],
  templateUrl: './impersonation-banner.html',
  host: { class: 'ih-impersonation-banner' },
})
export class IHImpersonationBanner {
  private readonly resolveError = inject(I_IMPERSONATION_ERROR_RESOLVER, { optional: true });
  private readonly state = inject(IImpersonationStateService);
  private readonly session = inject(ISessionService);
  private readonly store = inject(IUserMenuStore);
  private readonly config = inject(I_AUTH_CONFIG);
  private readonly confirm = inject(IConfirmService);
  private readonly alerts = inject(IAlertService);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly ending = signal(false);
  private readonly infoOpen = signal(false);
  protected readonly confirming = signal(false);
  protected readonly errorMessage = signal('');
  protected readonly countdown = signal<string | null>(null);
  protected readonly visible = computed(() => {
    this.session.impersonationContext();
    const status = this.state.status();
    return this.session.isImpersonating() && (!status || status.mode === 'IMPERSONATING');
  });
  protected readonly actorName = computed(() => {
    this.session.impersonationContext();
    return (
      this.state.status()?.actorName || actorDisplayNameFromToken(this.session.getAccessToken())
    );
  });
  protected readonly subjectName = computed(() => {
    this.session.impersonationContext();
    return this.state.status()?.subjectName || this.session.getUser()?.name || '-';
  });
  protected readonly occupation = computed(
    () => this.state.status()?.occupation || this.store.rawCurrentUser()?.occupationName || null,
  );
  protected readonly endDateLabel = computed(() => grantEndLabel(this.state.status()));

  constructor() {
    effect((onCleanup) => {
      this.session.impersonationContext();
      untracked(() => {
        this.errorMessage.set('');
        this.confirming.set(false);
        this.ending.set(false);
      });
      if (!this.session.isImpersonating()) return;
      const subscription = untracked(() =>
        this.state.loadStatus().subscribe({
          error: () => {
            /* Token fallback remains visible. */
          },
        }),
      );
      onCleanup(() => subscription.unsubscribe());
    });
    effect((onCleanup) => {
      const status = this.state.status();
      const end = resolveGrantEnd(status?.endAt, status?.endDate);
      let timer: ReturnType<typeof setTimeout> | undefined;
      const tick = (): void => {
        if (end === null || !this.visible()) {
          this.countdown.set(null);
          return;
        }
        const remaining = Math.max(0, end - Date.now());
        this.countdown.set(remaining < COUNTDOWN_THRESHOLD_MS ? formatCountdown(remaining) : null);
        if (remaining > 0)
          timer = setTimeout(
            tick,
            remaining >= COUNTDOWN_THRESHOLD_MS
              ? Math.min(remaining - COUNTDOWN_THRESHOLD_MS + 1, MAX_TIMER_DELAY_MS)
              : Math.min(1000, remaining),
          );
      };
      tick();
      onCleanup(() => clearTimeout(timer));
    });
  }
  protected redirect(result: import('./impersonation-utils').IEndImpersonationResult): void {
    window.location.assign(
      resolveImpersonationRedirect(result, this.config.api.identity, this.config.signinUrl),
    );
  }
  protected onShowInfo(): void {
    if (this.infoOpen()) return;
    this.infoOpen.set(true);
    this.alerts
      .information(
        'About Impersonation Sessions',
        this.config.impersonation?.informationText ?? IMPERSONATION_INFORMATION,
      )
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.infoOpen.set(false)),
      )
      .subscribe();
  }
  protected onEndSession(): void {
    if (this.ending() || this.confirming()) return;
    const context = this.session.impersonationContext();
    this.confirming.set(true);
    this.confirm
      .danger('End Impersonate Session', IMPERSONATION_CONFIRMATION)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.confirming.set(false)),
      )
      .subscribe((confirmed) => {
        if (!confirmed || context !== this.session.impersonationContext()) return;
        this.ending.set(true);
        this.errorMessage.set('');
        this.session
          .endImpersonation()
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: (result) => this.redirect(result),
            error: (error) => {
              if (context !== this.session.impersonationContext()) return;
              this.ending.set(false);
              this.errorMessage.set(
                this.resolveError
                  ? this.resolveError(
                      error,
                      'Failed to end the impersonation session. Please try again.',
                    )
                  : resolveApiErrorDisplayMessage(
                      error,
                      'Failed to end the impersonation session. Please try again.',
                      this.config.errorCatalogResolver,
                      this.config.errorDisplayFormatter,
                    ),
              );
            },
          });
      });
  }
}
