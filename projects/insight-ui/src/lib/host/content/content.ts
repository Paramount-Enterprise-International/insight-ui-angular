import { APP_BASE_HREF, AsyncPipe } from '@angular/common';
import { Component, effect, EventEmitter, inject, Output, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { combineLatest, filter, map, Observable, shareReplay, startWith } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { findBreadcrumbMenuChain, getMenuLabel, getMenuRoute } from '../menu/menu.utils';
import { ISessionService } from '../../session/session';
import { IUserMenuStore } from '../../store/user-menu';
import { type IBreadcrumbItem } from '../host.types';
import { IHTitleBreadcrumbService } from '../shell/title-breadcrumb.service';

@Component({
  selector: 'ih-content',
  imports: [RouterOutlet, AsyncPipe, RouterLink],
  template: `
    <div class="ih-content-header">
      <a class="i-clickable" (click)="toggleSidebar()">
        @if (sidebarVisibility) {
          <img alt="sidebar-left" src="svgs/sidebar-left.svg" />
        } @else {
          <img alt="sidebar-right" src="svgs/sidebar-right.svg" />
        }
      </a>

      <!-- title override reacts immediately -->
      <h1>
        {{ shell.titleOverride() || shell.remoteTitle() || (pageTitle$ | async) || 'Insight' }}
      </h1>
    </div>

    <div class="ih-content-breadcrumbs">
      @let override = shell.breadcrumbsOverride();

      @if (override && override.length > 0) {
        @for (b of override; track $index; let first = $first; let last = $last) {
          @if (!last) {
            @if (!first) {
              @if (b.url) {
                <a
                  class="ih-content-breadcrumb ih-content-breadcrumb__link"
                  [attr.href]="overrideHref(b.url)"
                  [routerLink]="overrideRouterLink(b.url)"
                  (click)="onOverrideBreadcrumbClick($event)"
                >
                  {{ b.label }}
                </a>
              } @else {
                <span class="ih-content-breadcrumb ih-content-breadcrumb__link">
                  {{ b.label }}
                </span>
              }
            } @else {
              <span class="ih-content-breadcrumb ih-content-breadcrumb__first">
                {{ b.label }}
              </span>
            }
            <span class="ih-content-breadcrumb ih-content-breadcrumb__separator">></span>
          } @else {
            <span class="ih-content-breadcrumb ih-content-breadcrumb__current">
              {{ b.label }}
            </span>
          }
        }
      } @else {
        <!-- Fallback to route-based breadcrumbs (Angular routes) -->
        @if (breadcrumb$ | async; as breadcrumbs) {
          @if (breadcrumbs.length > 0) {
            @for (breadcrumb of breadcrumbs; track $index; let first = $first; let last = $last) {
              @if (!last) {
                @if (!first) {
                  @if (breadcrumb.url) {
                    <a
                      class="ih-content-breadcrumb ih-content-breadcrumb__link"
                      [routerLink]="overrideRouterLink(breadcrumb.url)"
                      (click)="onOverrideBreadcrumbClick($event)"
                      >{{ breadcrumb.label }}</a
                    >
                  } @else {
                    <span class="ih-content-breadcrumb">{{ breadcrumb.label }}</span>
                  }
                } @else {
                  <span class="ih-content-breadcrumb ih-content-breadcrumb__first">
                    {{ breadcrumb.label }}
                  </span>
                }
                <span class="ih-content-breadcrumb ih-content-breadcrumb__separator">></span>
              } @else {
                <span class="ih-content-breadcrumb ih-content-breadcrumb__current">
                  {{ breadcrumb.label }}
                </span>
              }
            }
          } @else {
            <span class="ih-content-breadcrumb ih-content-breadcrumb__first">Home</span>
          }
        } @else {
          <span class="ih-content-breadcrumb ih-content-breadcrumb__first">Home</span>
        }
      }
    </div>

    <div class="ih-content-body scroll scroll-y">
      <router-outlet />
    </div>
  `,
})
export class IHContent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  // IMPORTANT: your app base href is intentionally "/-/"
  private readonly baseHref = inject(APP_BASE_HREF);

  // bridge (set by host / React remotes)
  readonly shell = inject(IHTitleBreadcrumbService);

  sidebarVisibility = true;

  @Output() readonly onSidebarToggled = new EventEmitter<boolean>();

  private readonly session = inject(ISessionService);
  private readonly userMenuStore = inject(IUserMenuStore);

  /** Aggregated boot loading state - true while session restore or sidebar menu data is loading. */
  readonly initializing = signal(true);

  /** Emits the aggregated loading state so consumer apps can render their own loader. */
  @Output() readonly loading = new EventEmitter<boolean>();

  // Push session + menu-store initializing changes through the `loading` output.
  private readonly loadingEffect = effect(() => {
    const value = this.session.initializing() || this.userMenuStore.initializing();
    if (value !== this.initializing()) {
      this.initializing.set(value);
      this.loading.emit(value);
    }
  });

  private readonly navigation$ = this.router.events.pipe(
    filter((e) => e instanceof NavigationEnd),
    startWith(null),
  );

  /** Menu loading and React contributions also update the visible trail. */
  readonly breadcrumb$: Observable<IBreadcrumbItem[]> = combineLatest([
    this.navigation$,
    this.userMenuStore.menus$,
    toObservable(this.shell.remoteBreadcrumbs),
  ]).pipe(
    map(([, menus, remote]) => {
      const state = this.routeBreadcrumbState();
      const chain = state.mount ? findBreadcrumbMenuChain(menus, state.mount.url) : [];
      const host = state.mount?.hostBreadcrumbs?.length
        ? state.mount.hostBreadcrumbs
        : chain.length
          ? chain
              .map((node) => ({
                label: getMenuLabel(node),
                url: getMenuRoute(node) ?? undefined,
              }))
              .filter((item) => !!item.label)
          : state.host;
      return [...host, ...state.remote, ...remote];
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  /** Heading comes from route titles independently of breadcrumb labels. */
  readonly pageTitle$ = this.navigation$.pipe(
    map(() => this.routeBreadcrumbState().title),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  private routeBreadcrumbState(): {
    host: IBreadcrumbItem[];
    remote: IBreadcrumbItem[];
    title: string | null;
    mount?: { url: string; hostBreadcrumbs?: IBreadcrumbItem[] };
  } {
    const state: ReturnType<IHContent['routeBreadcrumbState']> = {
      host: [],
      remote: [],
      title: null,
    };
    let route: ActivatedRoute | null = this.activatedRoute.root;
    let url = '';
    while (route) {
      const segments = route.snapshot.url.map((segment) => segment.toString()).join('/');
      if (segments) url += '/' + segments;
      const data = route.routeConfig?.data;
      if (data?.['title']) state.title = data['title'];
      const label = data?.['breadcrumb'] ?? data?.['title'];
      if (label) (state.mount ? state.remote : state.host).push({ label, url: url || '/' });
      if (data?.['remoteMount'])
        state.mount = { url: url || '/', hostBreadcrumbs: data['hostBreadcrumbs'] };
      route = route.children.find((child) => child.outlet === 'primary') ?? null;
    }
    return state;
  }

  toggleSidebar(): void {
    this.sidebarVisibility = !this.sidebarVisibility;
    this.onSidebarToggled.emit(this.sidebarVisibility);
  }

  onOverrideBreadcrumbClick(e: MouseEvent): void {
    // Only for normal left-click navigation.
    // Let browser handle right-click, ctrl/cmd-click, middle click, etc.
    if (e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    // Angular routerLink will update the URL via pushState.
    // React Router BrowserRouter will not notice unless popstate is fired.
    queueMicrotask(() => {
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
  }

  private normalizeBaseHref(): string {
    let b = (this.baseHref ?? '/').trim();

    // ensure leading slash
    if (!b.startsWith('/')) b = `/${b}`;

    // ensure trailing slash
    if (!b.endsWith('/')) b = `${b}/`;

    // collapse repeated slashes
    b = b.replace(/\/{2,}/g, '/');

    return b;
  }

  private normalizePath(url: string): string {
    let u = (url ?? '').trim();
    if (!u) return '/';

    // support only path-like urls here; if ever full origin is passed, keep it
    if (/^https?:\/\//i.test(u)) return u;

    if (!u.startsWith('/')) u = `/${u}`;
    u = u.replace(/\/{2,}/g, '/');

    // fix common mistake: "/-/-/dashboard" -> "/-/dashboard"
    u = u.replace(/^\/-\/-\/+/, '/-/');

    return u;
  }

  /**
   * RouterLink will prefix baseHref automatically.
   * So we must NOT include baseHref in the value passed to [routerLink].
   *
   * baseHref "/-/" examples:
   * - "/-/dashboard" -> "/dashboard"
   * - "/dashboard" -> "/dashboard"
   * - "/" -> "/"
   */
  overrideRouterLink(url: string): string {
    const base = this.normalizeBaseHref();
    const abs = this.normalizePath(url);

    // if already includes baseHref, strip it
    if (abs.startsWith(base)) {
      // base ends with "/" so slice base.length - 1 keeps leading "/"
      const stripped = abs.slice(base.length - 1);
      return stripped.length ? stripped : '/';
    }

    return abs;
  }

  /**
   * Browser href must include baseHref so "open in new tab" goes to the correct URL.
   *
   * baseHref "/-/" examples:
   * - "/dashboard" -> "/-/dashboard"
   * - "/-/dashboard" -> "/-/dashboard"
   * - "/" -> "/-/"
   */
  overrideHref(url: string): string {
    const base = this.normalizeBaseHref();
    const abs = this.normalizePath(url);

    // already includes baseHref
    if (abs.startsWith(base)) return abs;

    // home
    if (abs === '/') return base;

    // join
    return `${base}${abs.slice(1)}`.replace(/\/{2,}/g, '/');
  }
}
