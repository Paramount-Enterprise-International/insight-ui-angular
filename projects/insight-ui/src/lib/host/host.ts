/* =========================================================
 * host.ts (insight-ui-angular)
 * ✅ Includes:
 * - IHBreadcrumbItem
 * - IHNavigationSnapshot
 * - IHTitleBreadcrumbService (signals)
 * - IHContent that reacts to overrides IMMEDIATELY (no NavigationEnd needed)
 * - Override breadcrumbs support routerLink + correct href with baseHref "/-/" (NO "/-/-/" bug)
 * - Override breadcrumb click also notifies React Router (popstate) so React pages update
 * - IHMenu / IHSidebar kept as close as possible to original
 *
 * Sidebar navigation rule:
 * - openInNewTab === true => href + target="_blank"
 * - reload === true => href same tab
 * - route starts with "http" => href same tab
 * - otherwise => routerLink SPA navigation
 * ========================================================= */

import { APP_BASE_HREF, AsyncPipe, NgClass } from '@angular/common';
import {
  Component,
  computed,
  effect,
  ElementRef,
  EventEmitter,
  HostBinding,
  inject,
  Injectable,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  signal,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  NavigationEnd,
  Route,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import {
  combineLatest,
  filter,
  map,
  Observable,
  of,
  shareReplay,
  startWith,
  Subscription,
  tap,
} from 'rxjs';
import { IAvatar } from '../avatar';
import { IConfirmService } from '../dialog/dialog';
import { IHighlightSearchPipe } from '../highlight-search.pipe';
import { ISessionService } from '../session/session.service';
import { IUserMenuStore } from '../store/user-menu.store';

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

export type IMenuApplication = {
  id: string;
  code: string;
  name: string;
  url?: string | null;
  version?: string | null;
};

export type IMenuCompany = {
  id: string;
  code: string;
  name: string;
};

export type IMenuOpenIn = 'CURRENT_TAB' | 'NEW_TAB' | 'NEW_WINDOW';

export type IMenuFavoriteToggleEvent = {
  id: string | number;
  isFavorite: boolean;
};

/**
 * Emitted by `IHSidebar` after the user drag-drops a favorite into a new
 * position. Carries the ordered favorite menu ids so the host app can persist
 * the new display order via the favorites reorder API.
 */
export type IMenuFavoriteReorderEvent = {
  /** Favorite menu ids in their new display order (top to bottom). */
  menuIds: (string | number)[];
};

export type IMenuGroup = {
  key: string;
  label: string;
  roots: IMenu[];
};

/**
 * Sidebar menu node.
 *
 * Supports two shapes:
 * - Legacy: numeric `menuId`, `menuName`, `menuTypeId` (2 = module, 3 = group /
 *   item), `child`, `level`, `visibility`, `openInNewTab` / `reload`.
 * - Modern (contract-aligned, optional): UUID `id`, `name`, `type`
 *   ('group' | 'item' | 'function'), `children`, `openIn`, `application`,
 *   `companies`, `isFavorite`. `IHSidebar` normalizes modern nodes into the
 *   legacy shape on ingestion; the modern extras are preserved for pin /
 *   favorites / application-grouping rendering.
 */
export type IMenu = {
  /* ── Modern (contract-aligned) ── */
  id?: string;
  name?: string;
  type?: 'group' | 'item' | 'function';
  children?: IMenu[];
  openIn?: IMenuOpenIn | null;
  application?: IMenuApplication | null;
  companies?: IMenuCompany[];
  isFavorite?: boolean;
  /** Backend menu code — used by menu-mode permission checks (`ihHasMn` / `ihNotHasMn`). */
  menuCode?: string | null;

  /* ── Legacy ── */
  menuId?: number;
  menuName?: string;
  menuTypeId?: number;
  parentId?: number;
  sequence?: number;
  child?: IMenu[];
  level?: number;
  visibility?: string;
  selected?: boolean;

  /**
   * Open route using href + target="_blank".
   */
  openInNewTab?: boolean;

  /**
   * Force route to use href instead of routerLink.
   */
  reload?: boolean;

  /* ── Shared ── */
  route?: string | null;
  icon?: string | null;
};

export type IUser = {
  employeeCode: string;
  fullName: string;
  userImagePath: string;
};

export function getMenuRoute(menu: IMenu | null | undefined): string | null {
  return menu?.route?.trim() || null;
}

/**
 * Very intentionally simple:
 * If route starts with "http", never use routerLink.
 */
export function isHttpRoute(route: string | null | undefined): boolean {
  return !!route?.trim().toLowerCase().startsWith('http');
}

/**
 * Node key used for tracking and selection — prefers the modern UUID `id`,
 * falls back to the legacy numeric `menuId`.
 */
export function getMenuKey(menu: IMenu | null | undefined): string | number | null {
  return menu?.id ?? menu?.menuId ?? null;
}

/** Display label — prefers the modern `name`, falls back to legacy `menuName`. */
export function getMenuLabel(menu: IMenu | null | undefined): string {
  return menu?.name?.trim() || menu?.menuName || '';
}

/** Children — prefers the modern `children`, falls back to legacy `child`. */
export function getMenuChildren(menu: IMenu | null | undefined): IMenu[] {
  return menu?.children ?? menu?.child ?? [];
}

export function hasMenuChildren(menu: IMenu | null | undefined): boolean {
  return getMenuChildren(menu).length > 0;
}

/**
 * Walks a menu tree (roots -> children) looking for the node whose key matches
 * `targetKey`, returning the chain from the matching root down to that node.
 * Used to resolve a favorite leaf's ancestor path from the sidebar menu tree.
 */
export function collectMenuChain(
  menus: IMenu[] | null | undefined,
  targetKey: string,
): IMenu[] | null {
  for (const menu of menus ?? []) {
    if (String(getMenuKey(menu)) === targetKey) {
      return [menu];
    }

    const childChain = collectMenuChain(getMenuChildren(menu), targetKey);

    if (childChain) {
      return [menu, ...childChain];
    }
  }

  return null;
}

/**
 * Builds a per-menu-key ancestor path label map for the sidebar Favorites
 * section. The label is the chain of ancestor NAMES (excluding the leaf itself)
 * joined by "> ", resolved from the full menu tree - never from the item's
 * route, since route and tree position can differ. A favorite that is not
 * found in the tree maps to `undefined` (callers fall back to the app label);
 * a root-level favorite (no ancestors) maps to an empty string.
 */
export function buildFavoritePathMap(
  menus: IMenu[] | null | undefined,
  favorites: IMenu[] | null | undefined,
): Record<string, string | undefined> {
  const pathByKey: Record<string, string | undefined> = {};

  for (const favorite of favorites ?? []) {
    const key = getMenuKey(favorite);

    if (key === null) continue;

    const keyString = String(key);
    const chain = collectMenuChain(menus, keyString);

    if (!chain) {
      pathByKey[keyString] = undefined;
      continue;
    }

    const ancestorLabels = chain
      .slice(0, -1)
      .map((node) => getMenuLabel(node))
      .filter((label) => label.length > 0);

    pathByKey[keyString] = ancestorLabels.join(' > ');
  }

  return pathByKey;
}

/** True for a legacy top-level module header (menuTypeId === 2). */
export function isModuleMenu(menu: IMenu | null | undefined): boolean {
  if (!menu) return false;
  if (menu.type) return false;
  return Number(menu.menuTypeId) === 2;
}

/** True for a structural group/module node (non-navigable container). */
export function isGroupNode(menu: IMenu | null | undefined): boolean {
  if (!menu) return false;
  if (menu.type) return menu.type === 'group';
  const typeId = Number(menu.menuTypeId);
  return typeId === 2 || (typeId === 3 && hasMenuChildren(menu));
}

/** True for a navigable leaf node (item / function / legacy leaf menu). */
export function isLeafItem(menu: IMenu | null | undefined): boolean {
  if (!menu) return false;
  if (menu.type) return menu.type === 'item' || menu.type === 'function';
  return Number(menu.menuTypeId) === 3 && !hasMenuChildren(menu);
}

export function isNewTabMenu(menu: IMenu | null | undefined): boolean {
  const route = getMenuRoute(menu);

  if (!route) return false;
  if (menu?.openIn) return menu.openIn === 'NEW_TAB' || menu.openIn === 'NEW_WINDOW';

  return !!menu?.openInNewTab;
}

export function isReloadMenu(menu: IMenu | null | undefined): boolean {
  const route = getMenuRoute(menu);

  if (!route) return false;
  if (menu?.openIn) {
    return menu.openIn === 'CURRENT_TAB' && isHttpRoute(route);
  }
  if (menu?.openInNewTab) return false;

  return !!menu?.reload || isHttpRoute(route);
}

export function isSpaMenu(menu: IMenu | null | undefined): boolean {
  const route = getMenuRoute(menu);

  if (!route) return false;
  if (menu?.openIn) return menu.openIn === 'CURRENT_TAB' && !isHttpRoute(route);
  if (menu?.openInNewTab) return false;
  if (menu?.reload) return false;
  if (isHttpRoute(route)) return false;

  return true;
}

const isModernMenu = (menu: IMenu): boolean => !!menu.type;

function normalizeMenu(menu: IMenu, level: number): IMenu {
  if (!isModernMenu(menu)) return menu;

  const children = getMenuChildren(menu);

  const normalized: IMenu = {
    ...menu,
    menuName: getMenuLabel(menu),
    menuTypeId: 3,
    parentId: 0,
    sequence: Number(menu.sequence) || 0,
    level,
    child: children.map((child) => normalizeMenu(child, level + 1)),
    children: undefined,
    name: undefined,
    type: undefined,
  };

  return normalized;
}

/**
 * Converts modern (contract-aligned) menu nodes into the legacy `IMenu` shape
 * that `IHMenu` renders. Modern extras (`id`, `isFavorite`, `application`,
 * `companies`, `openIn`, `route`, `icon`) are preserved for pin / favorites /
 * application-grouping rendering. Legacy nodes pass through untouched.
 */
export function normalizeMenuTree(menus: IMenu[] | null | undefined): IMenu[] {
  return (menus ?? []).map((menu) => normalizeMenu(menu, 0));
}

/** Synthetic group id used by the sidebar's Favorites section — keeps its icon. */
const SIDEBAR_FAVORITES_GROUP_ID = 'favorites';

/**
 * Fallback FontAwesome classes used by the sidebar row icon when a menu has no
 * icon or the icon is not a valid FontAwesome class
 */
const MENU_ICON_FALLBACK = 'fa-brands fa-microsoft';

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

  private readonly session = inject(ISessionService);
  private readonly userMenuStore = inject(IUserMenuStore);

  /** Aggregated boot loading state — true while session restore or sidebar menu data is loading. */
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
   * - "/dashboard"   -> "/dashboard"
   * - "/"            -> "/"
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
   * - "/dashboard"   -> "/-/dashboard"
   * - "/-/dashboard" -> "/-/dashboard"
   * - "/"            -> "/-/"
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

/* =========================================================
 * IHMenu
 * - Parent/group menu: toggles expanded/collapsed
 * - Leaf new-tab menu: href + target="_blank"
 * - Leaf reload menu: href
 * - Leaf SPA menu: routerLink
 * ========================================================= */

@Component({
  selector: 'ih-menu',
  imports: [NgClass, RouterLink, IHighlightSearchPipe],
  host: { 'data-ih-menu': '' },
  template: `
    @if (menu) {
      @let hasChild = menuHasChildren;
      @let route = menuRoute;

      <li [class.is-module]="isModuleNode" [ngClass]="isModuleNode ? menuVisibility : ''">
        @if (isModuleNode) {
          <!-- old-style module header; chevron + collapse in collapsible mode -->
          <small
            class="ih-menu-module"
            [class.ih-menu-module--collapsible]="collapsible && menuHasChildren"
            (click)="collapsible && menuHasChildren ? click() : null"
          >
            <span [innerHTML]="menuLabel | highlightSearch: filter"></span>

            @if (collapsible && menuHasChildren) {
              <i
                class="ih-menu-chevron"
                [ngClass]="isGroupExpanded ? 'fas fa-angle-up' : 'fas fa-angle-down'"
              ></i>
            }
          </small>
        } @else if (isGroupNode) {
          <!-- unified old-style group row; chevron + collapse only in collapsible mode -->
          <div
            class="ih-menu-group"
            [class.ih-menu-group--collapsible]="collapsible"
            [class.ih-menu-group--top]="depth === 0"
            (click)="collapsible ? click() : null"
          >
            @if (indentLevel > 0) {
              @for (i of indent(indentLevel); track i) {
                <span class="indent-{{ depth }}"></span>
              }
            }

            <!-- Top-level groups carry no icon (except the Favorites group) so
                 group titles align with module headers. -->
            @if (depth > 0 || isFavoritesGroup) {
              <i [class]="menuIcon"></i>
            }
            <h6 [innerHTML]="menuLabel | highlightSearch: filter"></h6>

            @if (collapsible) {
              <i
                class="ih-menu-chevron"
                [ngClass]="isGroupExpanded ? 'fas fa-angle-up' : 'fas fa-angle-down'"
              ></i>
            }
          </div>
        } @else {
          <!-- IMPORTANT:
               Order matters.
               Route starting with "http" must hit href branch before SPA/routerLink branch.
          -->

          <!-- leaf item: open in new tab -->
          @if (isNewTab && route) {
            <a
              #menuItem
              class="is-new-tab"
              rel="noopener noreferrer"
              target="_blank"
              [attr.data-menu-id]="dragEnabled ? getMenuKey(menu) : null"
              [class.is-selected]="isSelected"
              [href]="hrefWithMenuFilter(route)"
            >
              @if (indentLevel > 0) {
                @for (i of indent(indentLevel); track i) {
                  <span class="indent-{{ depth }}"></span>
                }
              }

              <i [class]="menuIcon"></i>
              <span class="ih-menu-label" [class.ih-menu-label--compact]="showApplication">
                <h6 [innerHTML]="menuLabel | highlightSearch: filter"></h6>
                @if (applicationLabel) {
                  <small class="ih-menu-application">{{ applicationLabel }}</small>
                }
              </span>

              @if (favoriteMode) {
                <i
                  class="ih-menu-favorite {{
                    menuIsFavorite ? 'fa-solid fa-star is-favorite' : 'fa-regular fa-star'
                  }}"
                  role="button"
                  tabindex="0"
                  [attr.aria-label]="menuIsFavorite ? 'Remove from favorites' : 'Add to favorites'"
                  (click)="onFavoriteClick($event)"
                  (keydown.enter)="onFavoriteClick($event)"
                ></i>
              }
            </a>
          }

          <!-- leaf item: full reload, same tab -->
          @else if (isReload && route) {
            <a
              #menuItem
              class="is-reload"
              target="_self"
              [attr.data-menu-id]="dragEnabled ? getMenuKey(menu) : null"
              [class.is-selected]="isSelected"
              [href]="hrefWithMenuFilter(route)"
            >
              @if (indentLevel > 0) {
                @for (i of indent(indentLevel); track i) {
                  <span class="indent-{{ depth }}"></span>
                }
              }

              <i [class]="menuIcon"></i>
              <span class="ih-menu-label" [class.ih-menu-label--compact]="showApplication">
                <h6 [innerHTML]="menuLabel | highlightSearch: filter"></h6>
                @if (applicationLabel) {
                  <small class="ih-menu-application">{{ applicationLabel }}</small>
                }
              </span>

              @if (favoriteMode) {
                <i
                  class="ih-menu-favorite {{
                    menuIsFavorite ? 'fa-solid fa-star is-favorite' : 'fa-regular fa-star'
                  }}"
                  role="button"
                  tabindex="0"
                  [attr.aria-label]="menuIsFavorite ? 'Remove from favorites' : 'Add to favorites'"
                  (click)="onFavoriteClick($event)"
                  (keydown.enter)="onFavoriteClick($event)"
                ></i>
              }
            </a>
          }

          <!-- leaf item: SPA navigation -->
          @else if (isSpa && route) {
            <a
              #menuItem
              class="is-spa"
              [attr.data-menu-id]="dragEnabled ? getMenuKey(menu) : null"
              [class.is-selected]="isSelected"
              [queryParamsHandling]="'merge'"
              [routerLink]="route"
            >
              @if (indentLevel > 0) {
                @for (i of indent(indentLevel); track i) {
                  <span class="indent-{{ depth }}"></span>
                }
              }

              <i [class]="menuIcon"></i>
              <span class="ih-menu-label" [class.ih-menu-label--compact]="showApplication">
                <h6 [innerHTML]="menuLabel | highlightSearch: filter"></h6>
                @if (applicationLabel) {
                  <small class="ih-menu-application">{{ applicationLabel }}</small>
                }
              </span>

              @if (favoriteMode) {
                <i
                  class="ih-menu-favorite {{
                    menuIsFavorite ? 'fa-solid fa-star is-favorite' : 'fa-regular fa-star'
                  }}"
                  role="button"
                  tabindex="0"
                  [attr.aria-label]="menuIsFavorite ? 'Remove from favorites' : 'Add to favorites'"
                  (click)="onFavoriteClick($event)"
                  (keydown.enter)="onFavoriteClick($event)"
                ></i>
              }
            </a>
          }
        }

        @if (hasChild) {
          <ul
            [class.collapsed]="(isGroupNode || isModuleNode) && collapsible && !isGroupExpanded"
            [class.expanded]="(isGroupNode || isModuleNode) && collapsible && isGroupExpanded"
          >
            @for (m of menuChildrenList; track getMenuKey(m)) {
              <ih-menu
                [collapsible]="collapsible"
                [depth]="depth + 1"
                [dragEnabled]="dragEnabled"
                [favoriteMode]="favoriteMode"
                [filter]="filter"
                [menu]="m"
                [pathByKey]="pathByKey"
                [selectedMenuId]="selectedMenuId"
                [showApplication]="showApplication"
                (favoriteToggle)="onChildFavoriteToggle($event)"
              />
            }
          </ul>
        }
      </li>
    }
  `,
})
export class IHMenu implements OnChanges {
  private readonly confirmService = inject(IConfirmService);

  @Input() menu: IMenu | undefined;
  @Input() selectedMenuId: string | number | null = null;
  @Input() filter = '';
  /** When true, renders a pin/star toggle on leaf items (emits `favoriteToggle`). */
  @Input() favoriteMode = false;
  /** When true, groups collapse/expand via a chevron (flat is the default). */
  @Input() collapsible = false;
  /** Nesting depth from the sidebar root (0 = top level). Drives indentation and
      the top-level "no group icon" rule — independent of the data's `level`. */
  @Input() depth = 0;
  /** When true, leaf items render with `cdkDrag` so the parent `cdkDropList` can reorder them (used for the Favorites section). */
  @Input() dragEnabled = false;
  /** When true, leaf items render their owning application name next to the label (used for the Favorites section). */
  @Input() showApplication = false;
  /** Per-menu-key ancestor path labels (sidebar Favorites section) - rendered instead of the application name when present. */
  @Input() pathByKey?: Record<string, string | undefined>;

  @Output() readonly clicked = new EventEmitter<any>();
  @Output() readonly favoriteToggle = new EventEmitter<IMenuFavoriteToggleEvent>();
  @ViewChildren(IHMenu) menus!: QueryList<IHMenu>;

  /** Template-bound helper for stable `@for` tracking (UUID-first). */
  readonly getMenuKey = getMenuKey;

  // the actual clickable DOM element (only on leaf items)
  @ViewChild('menuItem', { static: false })
  menuItemRef!: ElementRef<HTMLElement>;

  @HostBinding('class.hidden') isHidden = false;

  get menuRoute(): string | null {
    return getMenuRoute(this.menu);
  }

  get isSpa(): boolean {
    return isSpaMenu(this.menu);
  }

  get isReload(): boolean {
    return isReloadMenu(this.menu);
  }

  get isNewTab(): boolean {
    return isNewTabMenu(this.menu);
  }

  get menuLabel(): string {
    return getMenuLabel(this.menu);
  }

  /**
   * Subtitle shown on favorite leaves: the ancestor path resolved from the
   * sidebar menu tree when available, falling back to the owning application
   * name when the leaf is not present in the tree.
   */
  get applicationLabel(): string | null {
    if (!this.showApplication || !this.menu) return null;

    const key = getMenuKey(this.menu);

    if (key !== null && this.pathByKey) {
      const path = this.pathByKey[String(key)];

      if (path !== undefined) return path;
    }

    return this.menu.application?.name ?? null;
  }

  get menuChildrenList(): IMenu[] {
    return getMenuChildren(this.menu);
  }

  get menuHasChildren(): boolean {
    return hasMenuChildren(this.menu);
  }

  /** Legacy top-level module header (menuTypeId === 2). */
  get isModuleNode(): boolean {
    return isModuleMenu(this.menu);
  }

  /** Structural group header (non-leaf container). Modules are handled by `isModuleNode`. */
  get isGroupNode(): boolean {
    if (!this.menu) return false;
    if (this.isModuleNode) return false;
    if (this.menu.type) return this.menu.type === 'group';
    return Number(this.menu.menuTypeId) === 3 && hasMenuChildren(this.menu);
  }

  /** Group is expanded unless explicitly marked collapsed (manual toggle wins). */
  get isGroupExpanded(): boolean {
    return this.menu?.visibility !== 'collapsed';
  }

  /** The synthetic Favorites group — keeps its icon at the top level. */
  get isFavoritesGroup(): boolean {
    return getMenuKey(this.menu) === SIDEBAR_FAVORITES_GROUP_ID;
  }

  get menuVisibility(): string {
    return this.menu?.visibility ?? '';
  }

  /**
   * Icon classes for the row icon. Appends FontAwesome's `fa-fw` (fixed-width)
   * so icons with different glyph widths (e.g. fa-users vs fa-bars) still keep
   * the menu title aligned.
   *
   * Falls back to `MENU_ICON_FALLBACK` (`fa-brands fa-microsoft`) when the menu
   * has no icon or the icon is not a valid FontAwesome class (e.g. legacy named
   * icons like `home`, `dashboard` that contain no `fa-*` token and would render
   * as an empty glyph).
   */
  get menuIcon(): string | null {
    const icon = this.menu?.icon?.trim();
    const isValidFa = !!icon && /(?:^|\s)fa-[a-z0-9-]+(?:\s|$)/i.test(icon);
    return `${isValidFa ? icon : MENU_ICON_FALLBACK} fa-fw`;
  }

  /** 0-based nesting level; top-level groups are always 0 (never negative). */
  get menuLevel(): number {
    return Math.max(0, Number(this.menu?.level) || 0);
  }

  /**
   * Indent level used for rendering: first-level children of a group render
   * flush-left (0) so the first level looks flat; deeper levels indent from
   * there (depth - 1, never negative).
   */
  get indentLevel(): number {
    return Math.max(0, this.depth - 1);
  }

  get menuTypeId(): number {
    return Number(this.menu?.menuTypeId) || 0;
  }

  get menuIsFavorite(): boolean {
    return !!this.menu?.isFavorite;
  }

  /** only true for the *leaf* menu that matches selectedMenuId */
  get isSelected(): boolean {
    if (!this.menu) return false;

    const matchesId = getMenuKey(this.menu) === this.selectedMenuId;
    if (!matchesId) return false;

    const hasChildren = this.menuHasChildren;

    // keep selection only on "leaf" items (same rule as flattenNavigableMenus)
    const isLeaf = this.menuTypeId === 3 && (!hasChildren || this.menu.visibility === 'no-child');

    return isLeaf;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // whenever selectedMenuId changes, scroll the selected item into view
    if (changes['selectedMenuId'] && this.isSelected && this.menuItemRef) {
      this.menuItemRef.nativeElement.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }

  indent(level: number): number[] {
    const n = Math.max(0, Number(level) || 0);
    // return [0,1,2,...] so each item is stable and unique
    return Array.from({ length: n }, (_, i) => i);
  }

  click(): void {
    if (!this.menu) return;

    if (this.menu.visibility !== 'no-child') {
      // Treat an unset visibility as expanded so a default (flat) group
      // collapses on the first click (modern nodes have no visibility).
      this.menu.visibility = this.isGroupExpanded ? 'collapsed' : 'expanded';
    } else {
      this.clicked.emit(this.menu);
    }
  }

  onFavoriteClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    const id = getMenuKey(this.menu);
    if (id === null) return;

    const isUnfavorite = this.menuIsFavorite;

    // Unfavorite is destructive - confirm before removing the pin.
    if (isUnfavorite) {
      const menuName = getMenuLabel(this.menu) || 'this menu';

      this.confirmService
        .warning('Remove from Favorites', `Remove <strong>${menuName}</strong> from your favorites?`)
        .subscribe((confirmed) => {
          if (!confirmed) return;
          this.favoriteToggle.emit({ id, isFavorite: false });
        });

      return;
    }

    this.favoriteToggle.emit({ id, isFavorite: true });
  }

  onChildFavoriteToggle(event: IMenuFavoriteToggleEvent): void {
    this.favoriteToggle.emit(event);
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
  imports: [AsyncPipe, IAvatar, IHMenu, ReactiveFormsModule],
  template: `
    @let user = user$ | async;
    <div class="ih-sidebar-header">
      @if (user) {
        <div class="user-image">
          <i-avatar [alt]="user.fullName" [size]="28" [src]="user.userImagePath" />
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
      @if (favoriteMode) {
        @let favoritesGroup = getFavoritesGroup(favoriteItems());
        @if (favoritesGroup) {
          <ul
            class="ih-sidebar-favorites"
            [class.is-drag-over]="dragOverIndex() !== null"
            (mousedown)="onFavoritesMouseDown($event)"
          >
            <ih-menu
              [collapsible]="collapsible"
              [depth]="0"
              [dragEnabled]="true"
              [favoriteMode]="favoriteMode"
              [filter]="menuFilter()"
              [menu]="favoritesGroup"
              [pathByKey]="favoritePaths()"
              [selectedMenuId]="selectedMenuId()"
              [showApplication]="true"
              (favoriteToggle)="onFavoriteToggle.emit($event)"
            />
          </ul>
        }
      }

      @let menus = menus$ | async;

      @if (menus && menus.length > 0) {
        @let groups = buildMenuGroups(menus);
        <!-- Single <ul> for the whole menu tree — all roots live in one list. -->
        <ul>
          @for (group of groups; track group.key) {
            @if (groupByApplication && group.label && groups.length > 1) {
              <li class="ih-sidebar-app-label">
                <small>{{ group.label }}</small>
              </li>
            }
            @for (m of group.roots; track getMenuKey(m)) {
              <ih-menu
                [collapsible]="collapsible"
                [depth]="0"
                [favoriteMode]="favoriteMode"
                [filter]="menuFilter()"
                [menu]="m"
                [selectedMenuId]="selectedMenuId()"
                (favoriteToggle)="onFavoriteToggle.emit($event)"
              />
            }
          }
        </ul>
      }
    </div>

    <div class="ih-sidebar-footer">
      <small>{{ footerText }}</small>
    </div>
  `,
})
export class IHSidebar implements OnInit, OnChanges, OnDestroy {
  private router = inject(Router);
  private hostElement = inject(ElementRef);

  /* ---------------------------
   * INPUTS (from parent)
   * --------------------------- */

  @Input() user$!: Observable<IUser>;
  @Input() menusInput$!: Observable<IMenu[]>;
  @Input() visible = true;
  @Input() footerText = 'Insight Local';
  /** When true, leaf items render a pin/star toggle and the Favorites section is shown. */
  @Input() favoriteMode = false;
  /** Flat favorite leaf nodes, mapped by the host app from the favorites API. Rendered as a 'Favorites' group at the top of the menu body. */
  @Input() favorites$?: Observable<IMenu[]>;
  /** When true, menu roots are grouped under an application label. */
  @Input() groupByApplication = false;
  /** When true, groups collapse/expand via a chevron (flat is the default). */
  @Input() collapsible = false;

  /* ---------------------------
   * OUTPUTS (to parent)
   * --------------------------- */

  /** Bubbled up from leaf pin toggles — the host app persists via the favorites API. */
  @Output() readonly onFavoriteToggle = new EventEmitter<IMenuFavoriteToggleEvent>();
  /** Emitted after a favorites drag-drop with the ordered favorite menu ids — the host app persists via the reorder API. */
  @Output() readonly onFavoriteReorder = new EventEmitter<IMenuFavoriteReorderEvent>();

  /* ---------------------------
   * INTERNAL STREAMS / STATE
   * --------------------------- */

  menus$!: Observable<IMenu[]>;
  queryParams: any = {};

  menuSearch: FormControl<string | null> = new FormControl<string | null>('');
  menuFilter = signal('');
  keyboardNavActive = signal(false);
  selectedIndex = signal<number | null>(null);
  selectedMenuId = signal<string | number | null>(null);

  /** Index the dragged favorite would land at — drives the drop placeholder + cursor. */
  readonly dragOverIndex = signal<number | null>(null);

  /** Template-bound helper for stable `@for` tracking. */
  readonly getMenuKey = getMenuKey;

  private favoritesGroupCache: IMenu | null = null;

  /** Latest favorites array mirrored from `favorites$` — source of truth for drag reorder. */
  readonly favoriteItems = signal<IMenu[]>([]);

  /** Full (unfiltered) normalized menu tree - source for favorite ancestor paths. */
  private readonly fullMenus = signal<IMenu[]>([]);
  private fullMenusSubscription: Subscription | null = null;

  /** Ancestor path label per favorite key (menu tree) for the Favorites section. */
  readonly favoritePaths = computed(() => buildFavoritePathMap(this.fullMenus(), this.favoriteItems()));

  private favoritesSubscription: Subscription | null = null;

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

    this.originalMenus$ = this.normalizeMenusStream();

    this.buildMenusStream();

    this.subscribeFullMenus();
    this.subscribeFavorites();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['menusInput$'] && !changes['menusInput$'].firstChange) {
      this.originalMenus$ = this.normalizeMenusStream();

      this.buildMenusStream();
      this.subscribeFullMenus();
    }

    if (changes['favorites$']) {
      this.subscribeFavorites();
    }
  }

  ngOnDestroy(): void {
    this.favoritesSubscription?.unsubscribe();
    this.fullMenusSubscription?.unsubscribe();
    // Make sure no document-level drag listeners leak if destroyed mid-drag.
    if (this.dragState) {
      this.cleanupFavoriteDrag();
    }
  }

  /** Mirrors the `favorites$` input into the local `favoriteItems` signal. */
  private subscribeFavorites(): void {
    this.favoritesSubscription?.unsubscribe();
    this.favoritesSubscription = (this.favorites$ ?? of([])).subscribe((favs) =>
      this.favoriteItems.set(favs ?? []),
    );
  }

  /** Mirrors the full (unfiltered) normalized menu tree into the `fullMenus` signal. */
  private subscribeFullMenus(): void {
    this.fullMenusSubscription?.unsubscribe();
    this.fullMenusSubscription = this.originalMenus$.subscribe((menus) =>
      this.fullMenus.set(menus),
    );
  }

  private dragState: {
    menuId: string;
    startY: number;
    moved: boolean;
    lastTargetIndex: number | null;
    ghost: HTMLElement | null;
  } | null = null;

  /** Document mousemove during an active favorites drag (live reorder preview). */
  private onDocumentMouseMove = (event: MouseEvent): void => {
    const state = this.dragState;
    if (!state) return;

    // Ignore tiny jitters so a plain click isn't treated as a drag.
    if (!state.moved && Math.abs(event.clientY - state.startY) < 5) return;
    state.moved = true;

    // Follow the pointer with a translucent clone of the dragged leaf.
    if (state.ghost) {
      state.ghost.style.display = '';
      state.ghost.style.left = `${event.clientX}px`;
      state.ghost.style.top = `${event.clientY}px`;
    }

    const targetIndex = this.computeFavoriteDropIndex(event.clientY);
    if (targetIndex !== state.lastTargetIndex) {
      this.reorderFavoriteLive(state.menuId, targetIndex);
      state.lastTargetIndex = targetIndex;
    }
    this.dragOverIndex.set(targetIndex);
  };

  /** Document mouseup — finalize (emit) or cancel the favorites drag. */
  private onDocumentMouseUp = (): void => {
    const state = this.dragState;
    if (!state) return;

    if (state.moved) {
      const reordered = this.favoriteItems();
      this.cleanupFavoriteDrag();

      const menuIds = reordered
        .map((menu) => getMenuKey(menu))
        .filter((key): key is string | number => key !== null && key !== undefined);

      this.onFavoriteReorder.emit({ menuIds });
    } else {
      this.cleanupFavoriteDrag();
    }
  };

  /** Begins a favorites drag from a leaf inside the favorites list. */
  onFavoritesMouseDown(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const leaf = target.closest<HTMLElement>('.ih-sidebar-favorites [data-menu-id]');
    if (!leaf) return;

    const menuId = leaf.dataset['menuId'];
    if (!menuId) return;

    // Prevent text selection and any native drag/OS behavior.
    event.preventDefault();

    // Build a translucent clone (drag ghost) that follows the pointer — it is
    // hidden until the drag actually starts (past the 5px threshold).
    const ghost = leaf.cloneNode(true) as HTMLElement;
    ghost.classList.add('ih-drag-ghost');
    ghost.classList.remove('is-dragging');
    ghost.style.display = 'none';
    document.body.appendChild(ghost);

    this.dragState = {
      menuId,
      startY: event.clientY,
      moved: false,
      lastTargetIndex: null,
      ghost,
    };
    leaf.classList.add('is-dragging');

    document.addEventListener('mousemove', this.onDocumentMouseMove);
    document.addEventListener('mouseup', this.onDocumentMouseUp);
  }

  /** Live-reorders the favorites so the target position is previewed while dragging. */
  private reorderFavoriteLive(menuId: string, targetIndex: number): void {
    const items = this.favoriteItems();
    const sourceIndex = items.findIndex((menu) => String(getMenuKey(menu)) === menuId);
    if (sourceIndex === -1) return;

    // Removing from before the target shifts the insertion point by one.
    const insertAt = sourceIndex < targetIndex ? targetIndex - 1 : targetIndex;
    if (insertAt === sourceIndex) return;

    const reordered = [...items];
    const [moved] = reordered.splice(sourceIndex, 1);
    reordered.splice(insertAt, 0, moved);
    this.favoriteItems.set(reordered);
  }

  /** Cleans up listeners, classes, and state after a favorites drag ends/cancels. */
  private cleanupFavoriteDrag(): void {
    // Capture the ghost before resetting the state (TS narrows dragState to null).
    const ghost = this.dragState?.ghost ?? null;
    this.dragState = null;
    this.dragOverIndex.set(null);

    const host = this.hostElement.nativeElement as HTMLElement;
    host
      .querySelectorAll('.ih-sidebar-favorites .is-dragging')
      .forEach((el) => el.classList.remove('is-dragging'));

    document.removeEventListener('mousemove', this.onDocumentMouseMove);
    document.removeEventListener('mouseup', this.onDocumentMouseUp);

    // Remove the drag ghost clone from the DOM.
    ghost?.remove();
  }

  /**
   * Returns the index (0..n) a drop at `clientY` would land at, based on the
   * vertical midpoints of the currently rendered favorite leaves.
   */
  private computeFavoriteDropIndex(clientY: number): number {
    const host = this.hostElement.nativeElement as HTMLElement;
    const leaves = Array.from(
      host.querySelectorAll<HTMLElement>('.ih-sidebar-favorites [data-menu-id]'),
    );

    for (let i = 0; i < leaves.length; i++) {
      const rect = leaves[i].getBoundingClientRect();
      if (clientY < rect.top + rect.height / 2) return i;
    }

    return leaves.length;
  }

  /**
   * Normalizes modern (contract-aligned) menu nodes into the legacy `IMenu`
   * shape on ingestion. Legacy menus pass through untouched.
   */
  private normalizeMenusStream(): Observable<IMenu[]> {
    return (this.menusInput$ ?? new Observable<IMenu[]>()).pipe(
      map((menus) => normalizeMenuTree(menus)),
      shareReplay(1),
    );
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

      if (result) {
        filtered.push(result);
      }
    }

    return filtered;
  }

  private filterMenuBranch(menu: IMenu, term: string): IMenu | null {
    const name = getMenuLabel(menu).toLowerCase();
    const selfMatches = name.includes(term);

    const originalChildren = getMenuChildren(menu);

    const filteredChildren: IMenu[] = [];

    for (const child of originalChildren) {
      const childResult = this.filterMenuBranch(child, term);

      if (childResult) {
        filteredChildren.push(childResult);
      }
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

    if (Number(cloned.menuTypeId) === 3 && (selfMatches || childMatches)) {
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
      this.selectedMenuId.set(getMenuKey(this.navigableMenus[idx]));
    } else {
      this.selectedIndex.set(null);
      this.selectedMenuId.set(null);
    }
  }

  private flattenNavigableMenus(menus: IMenu[]): IMenu[] {
    const result: IMenu[] = [];

    const visit = (menu: IMenu): void => {
      const children = getMenuChildren(menu);
      const hasChildren = children.length > 0;

      const isLeafMenu =
        Number(menu.menuTypeId) === 3 && (!hasChildren || menu.visibility === 'no-child');

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
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.ensureKeyboardNavActive(-1);
    } else if (event.key === 'Enter') {
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
        this.selectedMenuId.set(getMenuKey(this.navigableMenus[0]));
      } else {
        const lastIdx = this.navigableMenus.length - 1;
        this.selectedIndex.set(lastIdx);
        this.selectedMenuId.set(getMenuKey(this.navigableMenus[lastIdx]));
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
    this.selectedMenuId.set(getMenuKey(this.navigableMenus[next]));
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

  /**
   * Groups menu roots by their owning application so a multi-application
   * sidebar can render an application label per group.
   */
  buildMenuGroups(menus: IMenu[]): IMenuGroup[] {
    const groups = new Map<string, IMenuGroup>();

    for (const menu of menus) {
      const app = menu.application;
      const key = app?.code?.trim() || 'other';
      const label = app?.name?.trim() || '';

      const existing = groups.get(key);

      if (existing) {
        existing.roots.push(menu);
      } else {
        groups.set(key, { key, label, roots: [menu] });
      }
    }

    return Array.from(groups.values());
  }

  /**
   * Builds a synthetic "Favorites" group node so the favorites list is rendered
   * with the exact same style as the other menu groups. Memoized by the
   * favorites array reference so the node identity stays stable across CD cycles.
   */
  getFavoritesGroup(favorites: IMenu[] | null | undefined): IMenu | null {
    if (!favorites || favorites.length === 0) return null;

    if (this.favoritesGroupCache?.children === favorites) {
      return this.favoritesGroupCache;
    }

    this.favoritesGroupCache = {
      id: SIDEBAR_FAVORITES_GROUP_ID,
      name: 'Favorites',
      type: 'group',
      icon: 'fa-solid fa-star',
      sequence: 0,
      children: favorites,
    };

    return this.favoritesGroupCache;
  }

  private navigateToMenu(menu: IMenu): void {
    const route = getMenuRoute(menu);

    if (!route) return;

    if (isNewTabMenu(menu)) {
      const urlWithFilter = this.appendMenuFilterToUrl(route);

      window.open(urlWithFilter, '_blank', 'noopener,noreferrer');

      return;
    }

    if (isReloadMenu(menu)) {
      const urlWithFilter = this.appendMenuFilterToUrl(route);

      window.location.href = urlWithFilter;

      return;
    }

    if (isSpaMenu(menu)) {
      this.router.navigate([route], {
        queryParams: this.menuFilterQueryParams(),
        queryParamsHandling: 'merge',
      });
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
