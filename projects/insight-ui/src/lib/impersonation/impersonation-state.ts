import { computed, DestroyRef, effect, inject, Injectable, signal } from '@angular/core';
import {
  catchError,
  EMPTY,
  finalize,
  map,
  Observable,
  of,
  shareReplay,
  Subject,
  switchMap,
  takeUntil,
  tap,
  throwError,
} from 'rxjs';
import { IApiService } from '../api/api';
import { I_AUTH_CONFIG, requireIdentityHost } from '../auth/auth-config';
import { ISessionService } from '../session/session';
import {
  type IImpersonationStatus,
  impersonationContextKey,
  normalizeImpersonationStatus,
} from './impersonation-utils';

@Injectable({ providedIn: 'root' })
export class IImpersonationStateService {
  private readonly session = inject(ISessionService);
  private readonly api = inject(IApiService);
  private readonly config = inject(I_AUTH_CONFIG);
  private key = '';
  private version = 0;
  private inFlight: Observable<IImpersonationStatus> | null = null;
  private readonly value = signal<IImpersonationStatus | null>(null);
  private readonly cancelled = new Subject<void>();
  readonly status = computed(() => {
    this.context();
    return this.key === impersonationContextKey(this.session.getAccessToken())
      ? this.value()
      : null;
  });
  readonly context = computed(() => this.session.impersonationContext());

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.clear();
      this.cancelled.complete();
    });
    effect(() => {
      this.context();
      this.syncContext();
    });
  }
  actor(): ReturnType<ISessionService['actor']> {
    return this.session.actor();
  }
  isImpersonating(): boolean {
    return this.session.isImpersonating();
  }
  clear(): void {
    this.version++;
    this.cancelled.next();
    this.value.set(null);
    this.inFlight = null;
  }
  private syncContext(): void {
    const key = impersonationContextKey(this.session.getAccessToken());
    if (key !== this.key) {
      this.key = key;
      this.clear();
    }
  }
  loadStatus(): Observable<IImpersonationStatus> {
    this.syncContext();
    if (!this.isImpersonating()) return of({ mode: 'NONE' });
    const cached = this.status();
    if (cached) return of(cached);
    if (this.inFlight) return this.inFlight;
    const version = this.version;
    const key = this.key;
    const current = (): boolean =>
      version === this.version && key === impersonationContextKey(this.session.getAccessToken());
    const source = this.config.impersonation?.source ?? 'iam-user';
    const base = source === 'bff' ? requireIdentityHost(this.config) : this.config.api['user'];
    if (!base) return throwError(() => new Error('Impersonation status requires api.user.'));
    const result = this.api
      .get<unknown>(source === 'bff' ? '/auth/me' : '/me/impersonation', undefined, {
        apiUrl: base,
      })
      .pipe(
        map((value) => normalizeImpersonationStatus(value, source)),
        takeUntil(this.cancelled),
        tap((value) => {
          if (current()) this.value.set(value);
        }),
        map((value) => (current() ? value : null)),
        // Stale completions cannot affect either data or errors in the replacement session.
        switchMap((value) => (value ? of(value) : EMPTY)),
        catchError((error) => (current() ? throwError(() => error) : EMPTY)),
        finalize(() => {
          if (this.inFlight === result) this.inFlight = null;
        }),
        shareReplay({ bufferSize: 1, refCount: true }),
      );
    this.inFlight = result;
    return result;
  }
}
