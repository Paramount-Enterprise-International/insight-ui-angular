/* =========================================================
 * host.ts (insight-ui-angular)
 * ✅ Includes:
 * - IHBreadcrumbItem
 * - IHNavigationSnapshot
 * - IHTitleBreadcrumbService (signals)
 * - IHContent that reacts to overrides IMMEDIATELY (no NavigationEnd needed)
 * - Override breadcrumbs support routerLink + correct href with baseHref "/-/" (NO "/-/-/" bug)
 * - Override breadcrumb click also notifies React Router (popstate) so React pages update
 * - IHMenu / IHSidebar kept as you had them
 * - ✅ NEW: sidebar menu click preserves ?menu-filter=... (internal + external)
 * ========================================================= */

import { APP_BASE_HREF, AsyncPipe, NgClass } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  inject,
  Injectable,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  signal,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Route,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { combineLatest, filter, map, Observable, shareReplay, startWith, tap } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IHighlightSearchPipe } from '../highlight-search.pipe';

export type IRoute = Omit<Route, 'data' | 'children'> & {
  data: {
    title: string;
    [key: string]: any;
  };
  children?: IRoutes;
};

export type IRoutes = IRoute[];

/* =========================================================
 * IH Shell Bridge (types + service)
 * ========================================================= */

export type IBreadcrumbItem = {
  label: string;
  /**
   * IMPORTANT (baseHref is "/-/"):
   * - Recommended: "/dashboard", "/dashboard/reports", "/"
   * - Also accepted: "/-/dashboard" (will be normalized)
   */
  url?: string;
};

/* =========================================================
 * Existing types
 * ========================================================= */

export type IMenuNavigationBehavior = 'spa' | 'reload' | 'new-tab';

export type IResolvedMenuNavigation = {
  url: string | null;
  behavior: IMenuNavigationBehavior;
};

export type IMenu = {
  menuId: number;
  menuName: string;
  menuTypeId: number;
  parentId: number;
  sequence: number;
  icon?: string | null;
  child?: IMenu[];
  level: number;
  visibility?: string;
  selected?: boolean;
  openInId?: number;
  versionCode?: string;
  applicationCode?: string;

  /**
   * Main navigation field.
   *
   * Rules:
   * - relative route, for example "/docs/components/button" => SPA navigation
   * - full URL, for example "https://example.com" => full reload
   * - relative route + reload: true => full reload
   * - any route + openInNewTab: true => open new tab
   */
  route?: string | null;

  /**
   * Old compatibility field.
   * Prefer route going forward.
   */
  applicationUrl?: string | null;

  /**
   * Force opening this menu in a new tab.
   * This has the highest priority.
   */
  openInNewTab?: boolean;

  /**
   * Force full browser reload in the same tab.
   * Useful for relative URLs like "/standalone/insight-remote-react".
   */
  reload?: boolean;
};

export type IUser = {
  employeeCode: string;
  fullName: string;
  userImagePath: string;
};

export function getMenuUrl(menu: IMenu | null | undefined): string | null {
  if (!menu) return null;

  /**
   * Prefer route going forward.
   * applicationUrl remains only for old menus.json compatibility.
   */
  return menu.route ?? menu.applicationUrl ?? null;
}

export function isFullUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

export function resolveMenuNavigation(menu: IMenu | null | undefined): IResolvedMenuNavigation {
  const url = getMenuUrl(menu);

  if (!menu || !url) {
    return {
      url: null,
      behavior: 'spa',
    };
  }

  /**
   * Priority 1: open new tab.
   */
  if (menu.openInNewTab) {
    return {
      url,
      behavior: 'new-tab',
    };
  }

  /**
   * Priority 2: explicit full reload.
   * This allows relative paths to reload too.
   */
  if (menu.reload) {
    return {
      url,
      behavior: 'reload',
    };
  }

  /**
   * Priority 3: full http/https URL reloads by default.
   */
  if (isFullUrl(url)) {
    return {
      url,
      behavior: 'reload',
    };
  }

  /**
   * Default: SPA navigation.
   * This keeps old menus.json with route backward-compatible.
   */
  return {
    url,
    behavior: 'spa',
  };
}

export type IHNavigationSnapshot = {
  fullUrl: string;
  basePath: string;
  params: Record<string, any>;
  query: Record<string, any>;
};

@Injectable({ providedIn: 'root' })
export class IHTitleBreadcrumbService {
  /**
   * null = use normal (route-based) title/breadcrumbs
   * non-null = override (e.g. React remote controls shell display)
   */
  readonly titleOverride = signal<string | null>(null);
  readonly breadcrumbsOverride = signal<IBreadcrumbItem[] | null>(null);

  setTitle(title: string | null): void {
    this.titleOverride.set(title ?? null);
  }

  setBreadcrumbs(items: IBreadcrumbItem[] | null): void {
    this.breadcrumbsOverride.set(items ?? null);
  }

  clear(): void {
    this.titleOverride.set(null);
    this.breadcrumbsOverride.set(null);
  }
}

/* =========================================================
 * IHContent
 * - Route breadcrumbs/title still supported
 * - Override breadcrumbs/title update immediately (signals)
 * - IMPORTANT: baseHref is "/-/" (intentional)
 *   - routerLink must receive URL WITHOUT "/-/" prefix
 *   - href must INCLUDE "/-/" prefix for right click open-new-tab
 * - NEW: clicking override crumbs triggers popstate so React Router updates
 * ========================================================= */

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

      <!-- ✅ title override reacts immediately -->
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
        <!-- ✅ Fallback to route-based breadcrumbs (Angular routes) -->
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

  // ✅ bridge (set by host / React remotes)
  readonly shell = inject(IHTitleBreadcrumbService);

  sidebarVisibility = true;

  @Output() readonly onSidebarToggled = new EventEmitter<boolean>();

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

      // 🔑 Use route config data, not snapshot data, to avoid inherited data
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

  /* =========================================================
   * IMPORTANT: React Router sync when Angular changes URL
   * ========================================================= */

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

  /* =========================================================
   * Override breadcrumb link helpers (baseHref aware)
   * ========================================================= */

  private normalizeBaseHref(): string {
    let b = (this.baseHref ?? '/').trim();

    if (!b.startsWith('/')) b = `/${b}`;
    if (!b.endsWith('/')) b = `${b}/`;

    b = b.replace(/\/{2,}/g, '/');

    return b;
  }

  private normalizePath(url: string): string {
    let u = (url ?? '').trim();
    if (!u) return '/';

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
   * - "/dashboard"   -> "/dashboard"
   * - "/"            -> "/"
   */
  overrideRouterLink(url: string): string {
    const base = this.normalizeBaseHref();
    const abs = this.normalizePath(url);

    if (abs.startsWith(base)) {
      const stripped = abs.slice(base.length - 1);
      return stripped.length ? stripped : '/';
    }

    return abs;
  }

  /**
   * Browser href must include baseHref so "open in new tab" goes to the correct URL.
   *
   * baseHref "/-/" examples:
   * - "/dashboard"   -> "/-/dashboard"
   * - "/-/dashboard" -> "/-/dashboard"
   * - "/"            -> "/-/"
   */
  overrideHref(url: string): string {
    const base = this.normalizeBaseHref();
    const abs = this.normalizePath(url);

    if (abs.startsWith(base)) return abs;
    if (abs === '/') return base;

    return `${base}${abs.slice(1)}`.replace(/\/{2,}/g, '/');
  }
}

/* =========================================================
 * IHMenu
 * - navigation is decided by openInNewTab/reload/full-url rules
 * - default is SPA, backward compatible with old route menus.json
 * ========================================================= */

@Component({
  selector: 'ih-menu',
  imports: [NgClass, IHighlightSearchPipe],
  host: { 'data-ih-menu': '' },
  template: `
    @if (menu) {
      @let hasChild = !!menu.child?.length;
      @let nav = navigation;

      <li
        [class.is-module]="menu.menuTypeId === 2"
        [ngClass]="+menu.menuTypeId === 2 ? menu.visibility : ''"
      >
        @if (+menu.menuTypeId === 2) {
          <small [innerHTML]="menu.menuName | highlightSearch: filter"></small>
        } @else if (+menu.menuTypeId === 3) {
          @if (hasChild) {
            <div (click)="click()">
              @if (menu.level > 0) {
                @for (i of indent(menu.level); track i) {
                  <span></span>
                }
              }

              <i [class]="menu.icon"></i>
              <h6 [innerHTML]="menu.menuName | highlightSearch: filter"></h6>

              <i
                [ngClass]="menu.visibility === 'expanded' ? 'fas fa-angle-up' : 'fas fa-angle-down'"
              ></i>
            </div>
          } @else {
            @if (nav.url) {
              <a
                #menuItem
                [class.is-selected]="isSelected"
                [href]="hrefWithMenuFilter(nav.url)"
                [rel]="nav.behavior === 'new-tab' ? 'noopener noreferrer' : null"
                [target]="nav.behavior === 'new-tab' ? '_blank' : '_self'"
                (click)="onLeafClick($event)"
              >
                @if (menu.level > 0) {
                  @for (i of indent(menu.level); track i) {
                    <span></span>
                  }
                }

                <i [class]="menu.icon"></i>
                <h6 [innerHTML]="menu.menuName | highlightSearch: filter"></h6>
              </a>
            }
          }
        }

        @if (hasChild) {
          <ul [ngClass]="menu.menuTypeId === 3 ? menu.visibility : ''">
            @for (m of menu.child; track m.menuId) {
              <ih-menu
                [filter]="filter"
                [menu]="m"
                [selectedMenuId]="selectedMenuId"
                (clicked)="clicked.emit($event)"
              />
            }
          </ul>
        }
      </li>
    }
  `,
})
export class IHMenu implements OnChanges {
  @Input() menu: IMenu | undefined;
  @Input() selectedMenuId: number | null = null;
  @Input() filter = '';

  @Output() readonly clicked = new EventEmitter<IMenu>();

  @ViewChildren(IHMenu) menus!: QueryList<IHMenu>;

  @ViewChild('menuItem', { static: false })
  menuItemRef!: ElementRef<HTMLElement>;

  @HostBinding('class.hidden') isHidden = false;

  get navigation(): IResolvedMenuNavigation {
    return resolveMenuNavigation(this.menu);
  }

  get isSelected(): boolean {
    if (!this.menu) return false;

    const matchesId = this.menu.menuId === this.selectedMenuId;
    if (!matchesId) return false;

    const children = this.menu.child ?? [];
    const hasChildren = children.length > 0;

    return +this.menu.menuTypeId === 3 && (!hasChildren || this.menu.visibility === 'no-child');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedMenuId'] && this.isSelected && this.menuItemRef) {
      this.menuItemRef.nativeElement.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }

  indent(level: number): number[] {
    const n = Math.max(0, Number(level) || 0);
    return Array.from({ length: n }, (_, i) => i);
  }

  click(): void {
    if (!this.menu) return;

    if (this.menu.visibility !== 'no-child') {
      this.menu.visibility = this.menu.visibility === 'expanded' ? 'collapsed' : 'expanded';
      return;
    }

    this.clicked.emit(this.menu);
  }

  onLeafClick(event: MouseEvent): void {
    if (!this.menu) return;

    /**
     * Let browser handle:
     * - right click
     * - middle click
     * - cmd/ctrl click
     * - shift/alt click
     *
     * This keeps "open in new tab" browser behavior.
     */
    if (event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    /**
     * Normal left-click should always go through IHSidebar.navigateToMenu().
     * That function decides:
     * - SPA
     * - reload
     * - new tab
     */
    event.preventDefault();
    this.clicked.emit(this.menu);
  }

  hrefWithMenuFilter(raw: string): string {
    const term = (this.filter ?? '').trim();
    if (!term) return raw;

    try {
      const u = new URL(raw);
      u.searchParams.set('menu-filter', term);
      return u.toString();
    } catch {
      const origin = window.location.origin;
      const u = new URL(raw, origin);
      u.searchParams.set('menu-filter', term);

      return `${u.pathname}${u.search}${u.hash}`;
    }
  }
}

/* =========================================================
 * IHSidebar
 * ========================================================= */

@Component({
  selector: 'ih-sidebar',
  imports: [AsyncPipe, IHMenu, ReactiveFormsModule],
  template: `
    @let user = user$ | async;

    <div class="ih-sidebar-header">
      @if (user) {
        <div class="user-image">
          <img alt="User Image" [src]="user.userImagePath" />
        </div>

        <div class="user-info">
          <small class="text-subtle">{{ user.employeeCode }}</small>
          <h6>{{ user.fullName }}</h6>
        </div>
      }
    </div>

    <div class="ih-sidebar-search">
      <input
        class="form-control"
        placeholder="Search Menu.."
        [formControl]="menuSearch"
        (keydown)="onSearchKeyDown($event)"
      />
    </div>

    <div class="ih-sidebar-body scroll scroll-y">
      @let menus = menus$ | async;

      <ul>
        @for (m of menus; track m.menuId) {
          <ih-menu
            [filter]="menuFilter()"
            [menu]="m"
            [selectedMenuId]="selectedMenuId()"
            (clicked)="navigateToMenu($event)"
          />
        }
      </ul>
    </div>

    <div class="ih-sidebar-footer">
      <small>{{ footerText }}</small>
    </div>
  `,
})
export class IHSidebar implements OnInit, OnChanges {
  private router = inject(Router);

  @Input() user$!: Observable<IUser>;
  @Input() menusInput$!: Observable<IMenu[]>;
  @Input() visible = true;
  @Input() footerText = 'Insight Local';

  menus$!: Observable<IMenu[]>;
  queryParams: any = {};

  menuSearch: FormControl<string | null> = new FormControl<string | null>('');

  menuFilter = signal('');
  keyboardNavActive = signal(false);
  selectedIndex = signal<number | null>(null);
  selectedMenuId = signal<number | null>(null);

  private navigableMenus: IMenu[] = [];
  private originalMenus$!: Observable<IMenu[]>;

  @HostBinding('class.hidden')
  get sidebarVisibility(): boolean {
    return !this.visible;
  }

  ngOnInit(): void {
    const searchParams = new URLSearchParams(window.location.search);
    const initialQueryParams: any = {};

    searchParams.forEach((value, key) => {
      initialQueryParams[key] = value;
    });

    this.queryParams = initialQueryParams;

    const initialFilter = (this.queryParams['menu-filter'] as string) ?? '';

    this.menuFilter.set(initialFilter);
    this.menuSearch.setValue(initialFilter, { emitEvent: false });

    this.originalMenus$ = (this.menusInput$ ?? new Observable<IMenu[]>()).pipe(shareReplay(1));

    this.buildMenusStream();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['menusInput$'] && !changes['menusInput$'].firstChange) {
      this.originalMenus$ = (this.menusInput$ ?? new Observable<IMenu[]>()).pipe(shareReplay(1));

      this.buildMenusStream();
    }
  }

  private buildMenusStream(): void {
    let firstEmission = true;

    const filter$ = this.menuSearch.valueChanges.pipe(
      startWith(this.menuSearch.value ?? ''),
      map((v) => (v ?? '').trim()),
      tap((term) => {
        this.menuFilter.set(term);

        if (firstEmission) {
          firstEmission = false;
          return;
        }

        this.updateUrl();
      }),
    );

    this.menus$ = combineLatest([this.originalMenus$, filter$]).pipe(
      map(([menus, term]) => this.filterMenuTree(menus, term)),
      tap((filteredMenus) => this.updateNavigableMenus(filteredMenus)),
      shareReplay(1),
    );
  }

  private filterMenuTree(menus: IMenu[], rawTerm: string): IMenu[] {
    const term = (rawTerm ?? '').trim().toLowerCase();
    if (!term) return menus;

    const filtered: IMenu[] = [];

    for (const menu of menus) {
      const result = this.filterMenuBranch(menu, term);
      if (result) filtered.push(result);
    }

    return filtered;
  }

  private filterMenuBranch(menu: IMenu, term: string): IMenu | null {
    const name = (menu.menuName ?? '').toLowerCase();
    const selfMatches = name.includes(term);

    const originalChildren = menu.child ?? [];

    const filteredChildren: IMenu[] = [];

    for (const child of originalChildren) {
      const childResult = this.filterMenuBranch(child, term);
      if (childResult) filteredChildren.push(childResult);
    }

    const childMatches = filteredChildren.length > 0;

    if (!selfMatches && !childMatches) {
      return null;
    }

    const childrenToUse = selfMatches ? originalChildren : filteredChildren;

    const cloned: IMenu = {
      ...menu,
      child: childrenToUse,
    };

    if (+cloned.menuTypeId === 3 && (selfMatches || childMatches)) {
      cloned.visibility = 'expanded';
    }

    return cloned;
  }

  private updateNavigableMenus(filteredMenus: IMenu[]): void {
    this.navigableMenus = this.flattenNavigableMenus(filteredMenus);

    const hasFilter = !!this.menuFilter().trim();

    if (!this.navigableMenus.length || !hasFilter) {
      this.keyboardNavActive.set(false);
      this.selectedIndex.set(null);
      this.selectedMenuId.set(null);
      return;
    }

    if (this.keyboardNavActive()) {
      const maxIndex = this.navigableMenus.length - 1;
      let idx = this.selectedIndex();

      if (idx === null || idx < 0 || idx > maxIndex) {
        idx = 0;
      }

      this.selectedIndex.set(idx);
      this.selectedMenuId.set(this.navigableMenus[idx].menuId);
      return;
    }

    this.selectedIndex.set(null);
    this.selectedMenuId.set(null);
  }

  private flattenNavigableMenus(menus: IMenu[]): IMenu[] {
    const result: IMenu[] = [];

    const visit = (menu: IMenu): void => {
      const children = menu.child ?? [];
      const hasChildren = children.length > 0;

      const isLeafMenu = +menu.menuTypeId === 3 && (!hasChildren || menu.visibility === 'no-child');

      if (isLeafMenu) {
        result.push(menu);
      }

      for (const child of children) {
        visit(child);
      }
    };

    for (const m of menus) {
      visit(m);
    }

    return result;
  }

  onSearchKeyDown(event: KeyboardEvent): void {
    if (!this.navigableMenus.length) return;

    const hasFilter = !!this.menuFilter().trim();
    if (!hasFilter) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.ensureKeyboardNavActive(1);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.ensureKeyboardNavActive(-1);
      return;
    }

    if (event.key === 'Enter') {
      if (!this.keyboardNavActive()) return;

      event.preventDefault();
      this.activateSelected();
    }
  }

  private ensureKeyboardNavActive(delta: number): void {
    if (!this.navigableMenus.length) return;

    if (!this.keyboardNavActive()) {
      this.keyboardNavActive.set(true);

      if (delta >= 0) {
        this.selectedIndex.set(0);
        this.selectedMenuId.set(this.navigableMenus[0].menuId);
      } else {
        const lastIdx = this.navigableMenus.length - 1;
        this.selectedIndex.set(lastIdx);
        this.selectedMenuId.set(this.navigableMenus[lastIdx].menuId);
      }

      return;
    }

    this.moveSelection(delta);
  }

  private moveSelection(delta: number): void {
    const current = this.selectedIndex();
    if (current === null) return;

    const maxIndex = this.navigableMenus.length - 1;
    let next = current + delta;

    if (next < 0) {
      next = maxIndex;
    } else if (next > maxIndex) {
      next = 0;
    }

    this.selectedIndex.set(next);
    this.selectedMenuId.set(this.navigableMenus[next].menuId);
  }

  private activateSelected(): void {
    const idx = this.selectedIndex();

    if (idx === null || idx < 0 || idx >= this.navigableMenus.length) {
      return;
    }

    const menu = this.navigableMenus[idx];
    this.navigateToMenu(menu);
  }

  private menuFilterQueryParams(): Record<string, any> {
    const term = this.menuFilter().trim();
    return term ? { 'menu-filter': term } : {};
  }

  private appendMenuFilterToUrl(raw: string): string {
    const term = this.menuFilter().trim();
    if (!term) return raw;

    try {
      const u = new URL(raw);
      u.searchParams.set('menu-filter', term);
      return u.toString();
    } catch {
      const origin = window.location.origin;
      const u = new URL(raw, origin);
      u.searchParams.set('menu-filter', term);

      return `${u.pathname}${u.search}${u.hash}`;
    }
  }

  navigateToMenu(menu: IMenu): void {
    const nav = resolveMenuNavigation(menu);
    if (!nav.url) return;

    if (nav.behavior === 'spa') {
      this.router.navigate([nav.url], {
        queryParams: this.menuFilterQueryParams(),
        queryParamsHandling: 'merge',
      });

      queueMicrotask(() => {
        window.dispatchEvent(new PopStateEvent('popstate'));
      });

      return;
    }

    const urlWithFilter = this.appendMenuFilterToUrl(nav.url);

    if (nav.behavior === 'reload') {
      window.location.href = urlWithFilter;
      return;
    }

    if (nav.behavior === 'new-tab') {
      window.open(urlWithFilter, '_blank', 'noopener,noreferrer');
    }
  }

  updateUrl(): void {
    const queryParams = { ...this.queryParams };
    const currentFilter = this.menuFilter().trim();

    if (currentFilter) {
      queryParams['menu-filter'] = currentFilter;
    } else {
      delete queryParams['menu-filter'];
    }

    this.router.navigate([], {
      queryParams,
      queryParamsHandling: 'replace',
    });

    this.queryParams = queryParams;
  }
}
