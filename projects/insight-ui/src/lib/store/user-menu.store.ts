import { inject, Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { forkJoin, map, Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { IMenu, IUser } from '../host';
import { ISessionService } from '../session/session.service';
import {
  ICurrentUserService,
  IInsightCurrentUser,
  IInsightFavoriteMenuItem,
  IInsightMenuNode,
  IUserMenuService,
} from '../user';
import {
  findFirstLeafRoute,
  findMenuNameById,
  hasAnyMenuCode,
  mapToSidebarUser,
  toIMenuFavorite,
  toIMenus,
} from '../user/user.mapper';

/**
 * In-memory store for the current user's sidebar data — user profile, effective
 * navigation menus, favorites — and permission checks.
 *
 * Everything lives in memory (signals); NOTHING is persisted to Web Storage.
 * On a cold start (page load) consumers call `load()` to re-fetch user, menus
 * and favorites; the store then re-emits so gated UI (`ihHasMn` /
 * `ihNotHasMn`) re-renders reactively once data is available (async-aware).
 */
@Injectable({ providedIn: 'root' })
export class IUserMenuStore {
  private readonly currentUserService = inject(ICurrentUserService);
  private readonly menuService = inject(IUserMenuService);
  private readonly session = inject(ISessionService);

  /** Sidebar-shaped current user (`IUser`) — `null` until loaded. */
  readonly currentUser = signal<IUser | null>(null);
  /** Raw current-user DTO as returned by the backend — `null` until loaded. */
  readonly rawCurrentUser = signal<IInsightCurrentUser | null>(null);
  /** Effective navigation tree (`IMenu` modern shape). */
  readonly menus = signal<IMenu[]>([]);
  /** Favorite menus (`IMenu` modern shape). */
  readonly favorites = signal<IMenu[]>([]);
  /** Roles decoded from the access token (for `source: 'role'` permission checks). */
  readonly roles = signal<string[]>([]);
  /** True while the cold-start `load()` is in flight. */
  readonly initializing = signal(false);
  /** First error encountered during `load()`, if any (e.g. `menus: ...`). */
  readonly loadError = signal<string | null>(null);

  // Reactive observable projections (used by directives/components that prefer
  // observables over signals).
  readonly currentUser$ = toObservable(this.currentUser);
  readonly menus$ = toObservable(this.menus);
  readonly favorites$ = toObservable(this.favorites);
  readonly roles$ = toObservable(this.roles);
  readonly initializing$ = toObservable(this.initializing);

  /** First navigable leaf route — a sensible post-login default landing. */
  get defaultRoute(): string | null {
    return findFirstLeafRoute(this.menus());
  }

  /** Finds a menu node's display name by id (recursive), or null. */
  findMenuName(menuId: string | number): string | null {
    return findMenuNameById(this.menus(), menuId);
  }

  /**
   * Cold-start: fetch user + menus + favorites concurrently. A failure in one
   * branch does not block the others; `initializing` clears once all settle.
   */
  load(): void {
    if (this.initializing()) {
      return;
    }
    this.initializing.set(true);
    this.loadError.set(null);
    this.roles.set(this.session.getRoles());

    forkJoin({
      user: this.loadUserInternal().pipe(catchError((err) => this.recordError('user', err))),
      menus: this.loadMenusInternal().pipe(catchError((err) => this.recordError('menus', err))),
      favorites: this.loadFavoritesInternal().pipe(catchError((err) => this.recordError('favorites', err))),
    }).subscribe({
      next: () => this.initializing.set(false),
      error: () => this.initializing.set(false),
    });
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

  /** Role-mode permission check against the in-memory roles (from the access token's `realm_access.roles`). ANY match. */
  hasRole(code: string | string[]): boolean {
    const roles = this.roles();
    if (Array.isArray(code)) {
      return code.some((role) => roles.includes(role));
    }
    return roles.includes(code);
  }

  /** Pin (`isFavorite: true`) or unpin a menu item, then refreshes favorites. */
  toggleFavorite(menuId: string | number, isFavorite: boolean): Observable<void> {
    const call = isFavorite ? this.menuService.addFavorite(menuId) : this.menuService.removeFavorite(menuId);
    return call.pipe(switchMap(() => this.reloadFavorites()));
  }

  /** Persists the new favorite order after a drag-drop, then refreshes favorites. */
  reorderFavorites(menuIds: (string | number)[]): Observable<void> {
    return this.menuService.reorderFavorites(menuIds).pipe(switchMap(() => this.reloadFavorites()));
  }

  /** Re-fetches the favorites from the backend into the in-memory `favorites` signal. */
  reloadFavorites(): Observable<void> {
    return this.loadFavoritesInternal().pipe(map(() => undefined));
  }

  private loadUserInternal(): Observable<null> {
    return this.currentUserService.getCurrentUser<IInsightCurrentUser>().pipe(
      tap((raw) => {
        this.rawCurrentUser.set(raw);
        this.currentUser.set(mapToSidebarUser(raw));
      }),
      map(() => null),
    );
  }

  private loadMenusInternal(): Observable<null> {
    return this.menuService.getEffectiveMenus<IInsightMenuNode[]>().pipe(
      tap((nodes) => this.menus.set(toIMenus(nodes))),
      map(() => null),
    );
  }

  private loadFavoritesInternal(): Observable<null> {
    return this.menuService.getFavorites<IInsightFavoriteMenuItem[]>().pipe(
      tap((items) => this.favorites.set(items.map(toIMenuFavorite))),
      map(() => null),
    );
  }

  private recordError(source: string, err: unknown): Observable<null> {
    const detail = (err as { detail?: string })?.detail ?? 'Failed to load';
    this.loadError.set(`${source}: ${detail}`);
    // Never log sensitive data — only the load source and error detail.
    console.error(`[@insight/ui][STORE] load "${source}" failed`, err);
    return of(null);
  }
}
