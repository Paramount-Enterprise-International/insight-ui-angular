import { computed, inject, Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { forkJoin, map, Observable, of, throwError } from 'rxjs';
import { catchError, filter, finalize, shareReplay, switchMap, take, tap } from 'rxjs/operators';

import { type INormalizedApiError, normalizeApiError, resolveApiErrorDisplayMessage } from '../api';
import { getMenuKey, IMenu, IUser } from '../host';
import { ISessionService } from '../session/session.service';
import {
  IAuthorizationSource,
  ICurrentUserDto,
  ICurrentUserService,
  IEffectiveAuthorizationDto,
  IFavoriteMenuItemDto,
  IMenuNodeDto,
  IUserMenuService,
} from '../user';
import {
  collectMenuCodes,
  findFirstLeafRoute,
  findMenuNameById,
  hasAnyMenuCode,
  hasAnyRoute,
  mapToSidebarUser,
  toIMenuFavorite,
  toIMenus,
} from '../user/user.mapper';

/**
 * In-memory store for the current user's sidebar data — user profile, effective
 * navigation menus, favorites — and permission checks.
 *
 * Everything lives in memory (signals); NOTHING is persisted to Web Storage.
 * On a cold start (page load) consumers call `load()` to re-fetch user, menus,
 * favorites and effective authorizations; the store then re-emits so gated UI
 * (`iHasMn` / `iNotHasMn`) re-renders reactively once data is available
 * (async-aware).
 */
/** Load branch keys for the cold-start sidebar data load. */
export type IUserMenuLoadSource = 'user' | 'menus' | 'favorites' | 'permissions';

/** Per-branch normalized errors from the last `load()` — mirrors the service API error contract. */
export type IUserMenuLoadErrors = Record<IUserMenuLoadSource, INormalizedApiError | null>;

@Injectable({ providedIn: 'root' })
export class IUserMenuStore {
  private readonly currentUserService = inject(ICurrentUserService);
  private readonly menuService = inject(IUserMenuService);
  private readonly session = inject(ISessionService);

  /** Identity (`sub`) whose data is currently cached — invalidated on user switch. */
  private loadedUserSub: string | null = null;
  private loadedApplicationId: string | null = null;

  /** Sidebar-shaped current user (`IUser`) — `null` until loaded. */
  readonly currentUser = signal<IUser | null>(null);
  /** Raw current-user DTO as returned by the backend — `null` until loaded. */
  readonly rawCurrentUser = signal<ICurrentUserDto | null>(null);
  /** Effective navigation tree (`IMenu` modern shape). */
  readonly menus = signal<IMenu[]>([]);
  /** Favorite menus (`IMenu` modern shape). */
  readonly favorites = signal<IMenu[]>([]);
  /** Roles decoded from the access token (for `source: 'role'` permission checks). */
  readonly roles = signal<string[]>([]);
  /**
   * Feature permissions granted by the backend (for `source: 'permission'`
   * checks). Hydrated by `load()` from the effective authorizations endpoint
   * (application-scoped authorizations endpoint) as the deduplicated set of
   * `data[].menuCode`; `setPermissions()` remains available for a caller that
   * wants to supply the list itself.
   */
  readonly permissions = signal<string[]>([]);
  /** Raw effective authorization entries returned by iam-user-api. */
  readonly authorizations = signal<IEffectiveAuthorizationDto[]>([]);
  /** Deduplicated companies from the effective authorization entries. */
  readonly companies = signal<IEffectiveAuthorizationDto['companies']>([]);
  /** Deduplicated company codes from the effective authorization entries. */
  readonly companyCodes = signal<string[]>([]);
  /** Company codes grouped by menu code. */
  readonly menuCompanies = signal<Record<string, string[]>>({});
  /** Deduplicated navigable menu codes from the effective menu tree. */
  readonly menuCodes = computed(() => collectMenuCodes(this.menus()));
  /** Immutable authorization snapshot used by permission predicates. */
  readonly authorizationSource = computed<IAuthorizationSource>(() => ({
    menu: this.menuCodes(),
    permission: this.permissions(),
    roles: this.roles(),
    companyCodes: this.companyCodes(),
    companies: this.companies(),
    menuCompanies: this.menuCompanies(),
  }));
  /** True while the cold-start `load()` is in flight. */
  readonly initializing = signal(false);
  /** True after the most recent load has settled, including partial failures. */
  readonly initialized = signal(false);
  /** First error encountered during `load()`, if any (e.g. `menus: ...`). */
  readonly loadError = signal<string | null>(null);
  /** Normalized per-branch errors from the last `load()` — mirrors the service API error contract. */
  readonly loadErrors = signal<IUserMenuLoadErrors>({
    user: null,
    menus: null,
    favorites: null,
    permissions: null,
  });

  // Reactive observable projections (used by directives/components that prefer
  // observables over signals).
  readonly currentUser$ = toObservable(this.currentUser);
  readonly menus$ = toObservable(this.menus);
  readonly favorites$ = toObservable(this.favorites);
  readonly roles$ = toObservable(this.roles);
  readonly permissions$ = toObservable(this.permissions);
  readonly authorizations$ = toObservable(this.authorizations);
  readonly companies$ = toObservable(this.companies);
  readonly companyCodes$ = toObservable(this.companyCodes);
  readonly menuCompanies$ = toObservable(this.menuCompanies);
  readonly menuCodes$ = toObservable(this.menuCodes);
  readonly authorizationSource$ = toObservable(this.authorizationSource);
  readonly initializing$ = toObservable(this.initializing);
  readonly initialized$ = toObservable(this.initialized);

  /**
   * Post-login default landing (when no return URL is present).
   * Order: (1) first navigable favorite route, (2) first navigable menu route.
   */
  get defaultRoute(): string | null {
    return findFirstLeafRoute(this.favorites()) ?? findFirstLeafRoute(this.menus());
  }

  /** Finds a menu node's display name by id (recursive), or null. */
  findMenuName(menuId: string | number): string | null {
    return findMenuNameById(this.menus(), menuId);
  }

  /**
   * Cold-start: fetch user + menus + favorites + permissions concurrently. A
   * failure in one branch does not block the others; `initializing` clears once
   * all settle.
   *
   * Returns an observable that completes when the load settles, so callers can
   * await it (e.g. to navigate to `defaultRoute` after login). The load starts
   * immediately even if the caller ignores the returned observable — a shared
   * source is kept alive by an internal subscribe (fire-and-forget compatible).
   */
  load(applicationId?: string): Observable<void> {
    if (this.initializing()) {
      return this.initializing$.pipe(
        filter((init) => !init),
        take(1),
        map(() => undefined),
      );
    }
    // Invalidate cross-session cache: if this load is for a different user
    // (`sub`) than the one whose data is cached, drop the stale data first so
    // a failed refetch (e.g. USER_APPLICATION_MAPPING_NOT_FOUND) never leaks
    // the previous user's menus/favorites into the sidebar.
    const sessionSub = this.session.getUser()?.sub ?? null;
    const applicationKey = applicationId?.trim() || null;
    if (
      sessionSub !== this.loadedUserSub ||
      (this.initialized() && applicationKey !== this.loadedApplicationId)
    ) {
      this.clearData();
    }
    this.loadedUserSub = sessionSub;
    this.loadedApplicationId = applicationKey;
    this.initializing.set(true);
    this.initialized.set(false);
    this.loadError.set(null);
    this.loadErrors.set({ user: null, menus: null, favorites: null, permissions: null });
    this.roles.set(this.session.getRoles());
    this.clearAuthorizationData();

    const result$ = forkJoin({
      user: this.loadUserInternal().pipe(catchError((err) => this.recordError('user', err))),
      menus: this.loadMenusInternal(applicationId).pipe(
        catchError((err) => this.recordError('menus', err)),
      ),
      favorites: this.loadFavoritesInternal(applicationId).pipe(
        catchError((err) => this.recordError('favorites', err)),
      ),
      permissions: this.loadPermissionsInternal(applicationId).pipe(
        catchError((err) => this.recordError('permissions', err)),
      ),
    }).pipe(
      map(() => undefined),
      catchError(() => of(undefined)),
      finalize(() => {
        this.initializing.set(false);
        this.initialized.set(true);
      }),
      shareReplay({ bufferSize: 1, refCount: false }),
    );

    // Fire-and-forget: always start the load even if the caller ignores the result.
    result$.subscribe();

    return result$;
  }

  /**
   * Clears every cached user/menu/favorite value and error state, and forgets
   * the identity they belonged to. Call on logout / session clear so no stale
   * data survives into the next login.
   */
  reset(): void {
    this.clearData();
    this.loadedUserSub = null;
    this.loadedApplicationId = null;
  }

  /** Refresh roles from the current access token (call after login / token change). */
  syncRoles(): void {
    this.roles.set(this.session.getRoles());
  }

  /**
   * Menu-mode permission check against the in-memory menu codes (ANY match).
   * Returns `false` while menus are not yet loaded — gated UI renders only
   * after the store has data (async-aware via the reactive directives).
   */
  hasMenu(code: string | string[]): boolean {
    return hasAnyMenuCode(this.menus(), code);
  }

  /**
   * Route-membership check: can the user open `path`? True when any granted
   * leaf menu route equals it (slash-normalized). Used by route-level access
   * guards (e.g. `requireRouteAccess`).
   */
  hasRoute(path: string): boolean {
    return hasAnyRoute(this.menus(), path);
  }

  /** Role-mode permission check against the in-memory roles (from the access token's `realm_access.roles`). ANY match. */
  hasRole(code: string | string[]): boolean {
    const roles = this.roles();
    if (Array.isArray(code)) {
      return code.some((role) => roles.includes(role));
    }
    return roles.includes(code);
  }

  /**
   * Replaces the granted permission list (feature/action codes). `load()`
   * hydrates this automatically — call this only to override it explicitly.
   * Codes are deduplicated so an accidental duplicate in the source list can
   * never make `hasPermission()` behave differently.
   */
  setPermissions(permissions: string[]): void {
    this.permissions.set([...new Set(permissions)]);
  }

  /**
   * Permission-mode check against the granted permissions (ANY match). Returns
   * `false` while the list is empty/not loaded - gated UI renders only after
   * the store has data (async-aware via the reactive directives).
   */
  hasPermission(code: string | string[]): boolean {
    const granted = this.permissions();
    if (Array.isArray(code)) {
      return code.some((permission) => granted.includes(permission));
    }
    return granted.includes(code);
  }

  /**
   * Pin (`isFavorite: true`) or unpin a menu item. Flips the star icon in the
   * `menus` tree immediately (optimistic), calls the backend, then re-fetches
   * favorites so the server remains the source of truth for the favorites
   * section. The menu-star change is reverted on error.
   */
  toggleFavorite(menuId: string | number, isFavorite: boolean): Observable<void> {
    const previousMenus = this.menus();
    this.menus.set(this.applyMenuFavorite(previousMenus, menuId, isFavorite));
    const call = isFavorite
      ? this.menuService.addFavorite(menuId)
      : this.menuService.removeFavorite(menuId);
    return call.pipe(
      switchMap(() => this.reloadFavorites()),
      catchError((err) => {
        this.menus.set(previousMenus);
        return throwError(() => err);
      }),
    );
  }

  /**
   * Persists the new favorite order after a drag-drop. Reorders the in-memory
   * `favorites` signal locally (optimistic) and calls the backend — no GET
   * refetch after the write. The local change is reverted on error.
   */
  reorderFavorites(menuIds: (string | number)[]): Observable<void> {
    const previous = this.favorites();
    this.favorites.set(this.applyFavoriteReorder(previous, menuIds));
    return this.menuService.reorderFavorites(menuIds).pipe(
      catchError((err) => {
        this.favorites.set(previous);
        return throwError(() => err);
      }),
    );
  }

  /** Re-fetches the favorites from the backend (manual refresh). */
  reloadFavorites(): Observable<void> {
    return this.loadFavoritesInternal().pipe(map(() => undefined));
  }

  /**
   * Loads the effective navigation tree into `menus` — for one application
   * (`applicationId`) or all active applications when omitted. Returns the
   * mapped `IMenu[]`.
   */
  loadMenus(applicationId?: string): Observable<IMenu[]> {
    return this.menuService.getEffectiveMenus<IMenuNodeDto[]>(applicationId).pipe(
      tap((nodes) => this.menus.set(toIMenus(nodes))),
      map((nodes) => toIMenus(nodes)),
    );
  }

  /** Loads favorites into `favorites` — optionally for a single application. Returns the mapped `IMenu[]`. */
  loadFavorites(applicationId?: string): Observable<IMenu[]> {
    return this.menuService.getFavorites<IFavoriteMenuItemDto[]>(applicationId).pipe(
      tap((items) => this.favorites.set(items.map(toIMenuFavorite))),
      map((items) => items.map(toIMenuFavorite)),
    );
  }

  /**
   * Loads the granted feature permissions into `permissions` — the deduplicated
   * set of `data[].menuCode` from the effective authorizations endpoint.
   * Returns the resulting permission list.
   */
  loadPermissions(applicationId?: string): Observable<string[]> {
    return this.menuService.getAuthorizations<IEffectiveAuthorizationDto[]>(applicationId).pipe(
      tap((items) => this.applyAuthorizations(items)),
      map(() => this.permissions()),
      catchError((error) => {
        this.clearAuthorizationData();
        return throwError(() => error);
      }),
    );
  }

  private applyAuthorizations(items: IEffectiveAuthorizationDto[]): void {
    const authorizations = items.map((item) => ({
      ...item,
      companies: item.companies.map((company) => ({ ...company })),
    }));
    const permissionCodes = new Set<string>();
    const seenCompanyIds = new Set<string>();
    const companyCodes = new Set<string>();
    const companies: IEffectiveAuthorizationDto['companies'] = [];
    const menuCompanySets = new Map<string, Set<string>>();

    for (const authorization of authorizations) {
      permissionCodes.add(authorization.menuCode);
      const scopedCodes = menuCompanySets.get(authorization.menuCode) ?? new Set<string>();
      menuCompanySets.set(authorization.menuCode, scopedCodes);

      for (const company of authorization.companies) {
        scopedCodes.add(company.code);
        companyCodes.add(company.code);
        if (!seenCompanyIds.has(company.id)) {
          seenCompanyIds.add(company.id);
          companies.push(company);
        }
      }
    }

    const menuCompanies: Record<string, string[]> = {};
    for (const [menuCode, codes] of menuCompanySets) {
      menuCompanies[menuCode] = [...codes];
    }

    this.authorizations.set(authorizations);
    this.permissions.set([...permissionCodes]);
    this.companies.set(companies);
    this.companyCodes.set([...companyCodes]);
    this.menuCompanies.set(menuCompanies);
  }

  /** Returns a new menu tree with the matching node's `isFavorite` flipped (star icon). */
  private applyMenuFavorite(menus: IMenu[], menuId: string | number, isFavorite: boolean): IMenu[] {
    return menus.map((menu) => {
      if (getMenuKey(menu) === menuId) {
        return { ...menu, isFavorite };
      }
      if (menu.children?.length) {
        return { ...menu, children: this.applyMenuFavorite(menu.children, menuId, isFavorite) };
      }
      if (menu.child?.length) {
        return { ...menu, child: this.applyMenuFavorite(menu.child, menuId, isFavorite) };
      }
      return menu;
    });
  }

  private applyFavoriteReorder(favorites: IMenu[], menuIds: (string | number)[]): IMenu[] {
    const byId = new Map(favorites.map((favorite) => [String(getMenuKey(favorite)), favorite]));
    const ordered: IMenu[] = [];
    const seen = new Set<string>();
    for (const id of menuIds) {
      const item = byId.get(String(id));
      if (item) {
        ordered.push(item);
        seen.add(String(id));
      }
    }
    for (const favorite of favorites) {
      if (!seen.has(String(getMenuKey(favorite)))) {
        ordered.push(favorite);
      }
    }
    return ordered;
  }

  private loadUserInternal(): Observable<null> {
    return this.currentUserService.getCurrentUser<ICurrentUserDto>().pipe(
      tap((raw) => {
        this.rawCurrentUser.set(raw);
        this.currentUser.set(mapToSidebarUser(raw));
      }),
      map(() => null),
    );
  }

  private loadMenusInternal(applicationId?: string): Observable<null> {
    return this.loadMenus(applicationId).pipe(map(() => null));
  }

  private loadFavoritesInternal(applicationId?: string): Observable<null> {
    return this.loadFavorites(applicationId).pipe(map(() => null));
  }

  private loadPermissionsInternal(applicationId?: string): Observable<null> {
    return this.loadPermissions(applicationId).pipe(map(() => null));
  }

  private clearData(): void {
    this.currentUser.set(null);
    this.rawCurrentUser.set(null);
    this.menus.set([]);
    this.favorites.set([]);
    this.roles.set([]);
    this.clearAuthorizationData();
    this.initialized.set(false);
    this.loadError.set(null);
    this.loadErrors.set({ user: null, menus: null, favorites: null, permissions: null });
  }

  private clearAuthorizationData(): void {
    this.permissions.set([]);
    this.authorizations.set([]);
    this.companies.set([]);
    this.companyCodes.set([]);
    this.menuCompanies.set({});
  }

  private recordError(source: IUserMenuLoadSource, err: unknown): Observable<null> {
    const normalized = normalizeApiError(err);
    this.loadErrors.update((errors) => ({ ...errors, [source]: normalized }));
    this.loadError.set(`${source}: ${resolveApiErrorDisplayMessage(err, 'Failed to load')}`);
    // Never log sensitive data — only the load source and normalized error details.
    console.error(`[@insight/ui][STORE] load "${source}" failed`, err);
    return of(null);
  }
}
