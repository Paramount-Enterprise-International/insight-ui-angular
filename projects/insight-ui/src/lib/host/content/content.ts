import { APP_BASE_HREF, AsyncPipe } from '@angular/common';
import { Component, effect, EventEmitter, inject, Output, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter, map, Observable, shareReplay, startWith } from 'rxjs';
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
      <h1>{{ shell.titleOverride() || (pageTitle$ | async) || 'Insight' }}</h1>
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
            @for (
              breadcrumb of breadcrumbs;
              track breadcrumb.url;
              let first = $first;
              let last = $last
            ) {
              @if (!last) {
                @if (!first) {
                  <a
                    class="ih-content-breadcrumb ih-content-breadcrumb__link"
                    [routerLink]="breadcrumb.url"
                  >
                    {{ breadcrumb.label }}
                  </a>
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

  /** route-based breadcrumbs */
  readonly breadcrumb$: Observable<IBreadcrumbItem[]> = this.router.events.pipe(
    filter((e) => e instanceof NavigationEnd),
    startWith(null),
    map(() => this.buildBreadcrumb(this.activatedRoute.root)),
    shareReplay(1),
  );

  /** last breadcrumb label = route-based page title */
  readonly pageTitle$: Observable<string | null> = this.breadcrumb$.pipe(
    map((breadcrumbs) =>
      breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].label : null,
    ),
    shareReplay(1),
  );

  private buildBreadcrumb(
    route: ActivatedRoute,
    url = '',
    breadcrumbs: IBreadcrumbItem[] = [],
  ): IBreadcrumbItem[] {
    const routeConfig = route.routeConfig;

    if (routeConfig) {
      const path = routeConfig.path ?? '';

      // Resolve path segments, including route params
      const segments = path
        .split('/')
        .filter(Boolean)
        .map((segment) => {
          if (segment.startsWith(':')) {
            const paramName = segment.substring(1);
            return route.snapshot.params[paramName] ?? segment;
          }

          return segment;
        });

      const nextUrlPart = segments.join('/');

      // Always advance the URL, even if we don't render a breadcrumb for this level
      const nextUrl = nextUrlPart.length > 0 ? `${url}/${nextUrlPart}` : url || '/';

      // Use route config data, not snapshot data, to avoid inherited data
      const data = routeConfig.data as { title?: string } | undefined;
      const label = data?.title;

      if (label) {
        breadcrumbs.push({
          label,
          url: nextUrl,
        });
      }

      url = nextUrl;
    }

    if (route.firstChild) {
      return this.buildBreadcrumb(route.firstChild, url, breadcrumbs);
    }

    return breadcrumbs;
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
