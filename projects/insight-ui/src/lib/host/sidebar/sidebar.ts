import { AsyncPipe, NgClass } from '@angular/common';
import {
  Component,
  computed,
  ElementRef,
  EventEmitter,
  HostBinding,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  combineLatest,
  map,
  Observable,
  of,
  shareReplay,
  startWith,
  Subscription,
  tap,
} from 'rxjs';
import { I_AUTH_CONFIG } from '../../auth';
import { IAvatar } from '../../avatar';
import { ISessionService } from '../../session/session';
import { DEFAULT_PERSONAL_PROFILE_URL, SIDEBAR_FAVORITES_GROUP_ID } from '../host.constants';
import {
  type IMenu,
  type IMenuFavoriteReorderEvent,
  type IMenuFavoriteToggleEvent,
  type IMenuGroup,
  type IUser,
} from '../host.types';
import { IHMenu } from '../menu/menu';
import {
  buildFavoritePathMap,
  getMenuChildren,
  getMenuKey,
  getMenuLabel,
  getMenuRoute,
  isNewTabMenu,
  isReloadMenu,
  isSpaMenu,
  normalizeMenuTree,
} from '../menu/menu.utils';

@Component({
  selector: 'ih-sidebar',
  imports: [AsyncPipe, IAvatar, IHMenu, NgClass, ReactiveFormsModule],
  template: `
    @let user = user$ | async;
    <div class="ih-sidebar-header">
      @if (user) {
        <button
          aria-haspopup="menu"
          class="ih-user-chip"
          type="button"
          [attr.aria-expanded]="accountMenuOpen()"
          (click)="toggleAccountMenu()"
        >
          <span class="user-image">
            <i-avatar [alt]="user.fullName" [size]="28" [src]="user.userImagePath" />
          </span>

          <span class="user-info">
            <small class="text-subtle">{{ user.employeeCode }}</small>
            <h6>{{ user.fullName }}</h6>
          </span>

          <i
            class="ih-user-caret"
            [ngClass]="accountMenuOpen() ? 'fas fa-angle-up' : 'fas fa-angle-down'"
          ></i>
        </button>

        @if (accountMenuOpen()) {
          <div class="ih-user-dropdown i-options" role="menu">
            <a
              class="ih-user-dropdown-item i-option"
              rel="noopener noreferrer"
              role="menuitem"
              target="_blank"
              [attr.href]="resolvedPersonalProfileUrl"
              (click)="closeAccountMenu()"
            >
              <i class="fa-solid fa-user fa-fw"></i>
              <span class="i-option-label">Personal Profile</span>
            </a>
            <button
              class="ih-user-dropdown-item i-option"
              role="menuitem"
              type="button"
              (click)="onLogoutClick()"
            >
              <i class="fa-solid fa-right-from-bracket fa-fw"></i>
              <span class="i-option-label">Logout</span>
            </button>
          </div>
        }
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
        <!-- Single <ul> for the whole menu tree - all roots live in one list. -->
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
  private readonly sessionService = inject(ISessionService);
  private readonly config = inject(I_AUTH_CONFIG);

  /** Sidebar user chip dropdown (Personal Profile / Logout) open state. */
  readonly accountMenuOpen = signal(false);

  private readonly onDocumentKeydown = (event: KeyboardEvent): void => {
    if (!this.accountMenuOpen()) return;
    const header = (this.hostElement.nativeElement as HTMLElement).querySelector(
      '.ih-sidebar-header',
    );
    if (event.key === 'Escape') {
      this.accountMenuOpen.set(false);
      header?.querySelector<HTMLButtonElement>('.ih-user-chip')?.focus();
      return;
    }
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    if (!header?.contains(event.target as Node | null)) return;

    const items = Array.from(header.querySelectorAll<HTMLElement>('.ih-user-dropdown-item'));
    if (!items.length) return;

    event.preventDefault();
    const current = items.indexOf(document.activeElement as HTMLElement);
    const next =
      current < 0
        ? event.key === 'ArrowDown'
          ? 0
          : items.length - 1
        : (current + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
    items[next].focus();
  };

  /** Closes the dropdown when a click lands outside the chip or the menu. */
  private readonly onDocumentPointerDown = (event: PointerEvent): void => {
    if (!this.accountMenuOpen()) return;
    const target = event.target as Element | null;
    if (!target || !target.closest('.ih-user-chip, .ih-user-dropdown')) {
      this.accountMenuOpen.set(false);
    }
  };

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
  /**
   * Personal Profile page URL opened in a new tab from the sidebar user
   * dropdown. Falls back to DEFAULT_PERSONAL_PROFILE_URL when empty.
   */
  @Input() personalProfileUrl = '';

  /* ---------------------------
   * OUTPUTS (to parent)
   * --------------------------- */

  /** Bubbled up from leaf pin toggles - the host app persists via the favorites API. */
  @Output() readonly onFavoriteToggle = new EventEmitter<IMenuFavoriteToggleEvent>();
  /** Emitted after a favorites drag-drop with the ordered favorite menu ids - the host app persists via the reorder API. */
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

  /** Index the dragged favorite would land at - drives the drop placeholder + cursor. */
  readonly dragOverIndex = signal<number | null>(null);

  /** Template-bound helper for stable `@for` tracking. */
  readonly getMenuKey = getMenuKey;

  private favoritesGroupCache: IMenu | null = null;

  /** Latest favorites array mirrored from `favorites$` - source of truth for drag reorder. */
  readonly favoriteItems = signal<IMenu[]>([]);

  /** Full (unfiltered) normalized menu tree - source for favorite ancestor paths. */
  private readonly fullMenus = signal<IMenu[]>([]);
  private fullMenusSubscription: Subscription | null = null;

  /** Ancestor path label per favorite key (menu tree) for the Favorites section. */
  readonly favoritePaths = computed(() =>
    buildFavoritePathMap(this.fullMenus(), this.favoriteItems()),
  );

  private favoritesSubscription: Subscription | null = null;

  private navigableMenus: IMenu[] = [];
  private originalMenus$!: Observable<IMenu[]>;

  @HostBinding('class.hidden')
  get sidebarVisibility(): boolean {
    return !this.visible;
  }

  /** Personal Profile target; falls back to the shared default. */
  get resolvedPersonalProfileUrl(): string {
    return (this.personalProfileUrl ?? '').trim() || DEFAULT_PERSONAL_PROFILE_URL;
  }

  toggleAccountMenu(): void {
    this.accountMenuOpen.update((open) => !open);
  }

  closeAccountMenu(): void {
    this.accountMenuOpen.set(false);
  }

  /** Centralized logout - clears the session, then redirects to the app signin. */
  onLogoutClick(): void {
    this.closeAccountMenu();
    this.sessionService.logout().subscribe({
      complete: () => {
        const signinUrl = this.config.signinUrl?.trim();
        window.location.href = signinUrl && signinUrl.length > 0 ? signinUrl : '/';
      },
    });
  }

  ngOnInit(): void {
    document.addEventListener('keydown', this.onDocumentKeydown);
    document.addEventListener('pointerdown', this.onDocumentPointerDown);

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
    document.removeEventListener('keydown', this.onDocumentKeydown);
    document.removeEventListener('pointerdown', this.onDocumentPointerDown);
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

  /** Document mouseup - finalize (emit) or cancel the favorites drag. */
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

    // Build a translucent clone (drag ghost) that follows the pointer - it is
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
        menu.type !== 'group' &&
        Number(menu.menuTypeId) === 3 &&
        (!hasChildren || menu.visibility === 'no-child');

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
