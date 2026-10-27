import { APP_BASE_HREF, AsyncPipe, NgClass } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  computed,
  ElementRef,
  EventEmitter,
  HostBinding,
  inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  signal,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  map,
  Observable,
  of,
  shareReplay,
  Subscription,
  tap,
} from 'rxjs';
import { I_AUTH_CONFIG } from '../../auth';
import { IAvatar } from '../../avatar';
import { ISessionService } from '../../session/session';
import { DEFAULT_PERSONAL_PROFILE_URL } from '../host.constants';
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
  getMenuKey,
  getMenuRoute,
  isNewTabMenu,
  isReloadMenu,
  isSpaMenu,
  normalizeMenuTree,
} from '../menu/menu.utils';
import { SidebarResizeController, type SidebarResizeOptions } from './sidebar-resize';
import {
  createFavoritesMenu,
  getSidebarMenuKey,
  type MenuExpansionChange,
  resolveSidebarActiveMenu,
  SidebarMenuState,
} from './sidebar-menu-state';
import { flattenNavigableMenus, SidebarSearchState } from './sidebar.utils';

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
            <h6>{{ impersonating ? 'Acting As: ' : '' }}{{ user.fullName }}</h6>
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
              (expandedChange)="onMenuExpansion($event)"
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
            @for (m of group.roots; track getSidebarMenuKey(m) ?? getMenuKey(m)) {
              <ih-menu
                [collapsible]="collapsible"
                [depth]="0"
                [favoriteMode]="favoriteMode"
                [filter]="menuFilter()"
                [menu]="m"
                [selectedMenuId]="selectedMenuId()"
                (expandedChange)="onMenuExpansion($event)"
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
    <div
      #resizeHandle
      aria-label="Resize sidebar"
      aria-orientation="vertical"
      class="ih-sidebar-resize-handle"
      role="separator"
      [attr.tabindex]="resizable && visible ? 0 : -1"
      [hidden]="!resizable || !visible"
    ></div>
  `,
})
export class IHSidebar implements OnInit, OnChanges, AfterViewChecked, OnDestroy {
  private router = inject(Router);
  private hostElement = inject(ElementRef);
  private readonly zone = inject(NgZone);
  private readonly sessionService = inject(ISessionService);
  private readonly config = inject(I_AUTH_CONFIG);
  private readonly baseHref =
    inject(APP_BASE_HREF, { optional: true }) ?? new URL(document.baseURI).pathname;
  private readonly menuState = new SidebarMenuState(null);
  private activeMenu: IMenu | undefined;
  private readonly menuRevision$ = new BehaviorSubject(0);
  private readonly menuStateRevision = signal(0);
  private readonly searchState = new SidebarSearchState();
  private readonly appliedFilter$ = new BehaviorSubject('');
  private readonly searchRevision$ = new BehaviorSubject(0);
  private searchSubscription?: Subscription;
  private filterTimer: ReturnType<typeof setTimeout> | null = null;
  private syncFilterAfterNavigation = false;
  private menuLocationPath?: string;
  private navigationSubscription?: Subscription;
  private menuScrollFrame: number | null = null;
  private menuScrollPending = false;
  private destroyed = false;
  @ViewChild('resizeHandle', { static: true })
  private resizeHandle!: ElementRef<HTMLElement>;
  private resizeController?: SidebarResizeController;

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
  /** Enable pointer and keyboard resizing with a persistent width preference. */
  @Input() resizable = true;
  @Input() minWidth = 220;
  @Input() maxWidth = 480;
  /** Set to null to keep the width in memory only. */
  @Input() widthStorageKey: string | null = 'insight.sidebar.width';
  /** Root expansion preferences are shared per origin; null disables persistence. */
  @Input() menuStateStorageKey: string | null = 'insight.sidebar.menu-state';
  @Input() impersonating = false;
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
  /** Emitted after a completed pointer or keyboard width change, in pixels. */
  @Output() readonly onWidthChange = new EventEmitter<number>();

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
  readonly getSidebarMenuKey = getSidebarMenuKey;

  private favoritesGroupCache: IMenu | null = null;
  private favoritesGroupSource: IMenu[] | null = null;
  private favoritesGroupRevision = -1;

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

  @HostBinding('class.is-resizable')
  get sidebarResizable(): boolean {
    return this.resizable;
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
    this.menuState.configureStorage(this.menuStateStorageKey);
    this.resizeController = this.zone.runOutsideAngular(
      () =>
        new SidebarResizeController(
          this.hostElement.nativeElement as HTMLElement,
          this.resizeHandle.nativeElement,
          this.resizeOptions(),
          (width) => this.zone.run(() => this.onWidthChange.emit(width)),
        ),
    );
    document.addEventListener('keydown', this.onDocumentKeydown);
    document.addEventListener('pointerdown', this.onDocumentPointerDown);

    const searchParams = new URLSearchParams(window.location.search);
    const initialQueryParams: any = {};

    searchParams.forEach((value, key) => {
      initialQueryParams[key] = value;
    });

    this.queryParams = initialQueryParams;

    if (this.router.navigated) {
      this.queryParams = {
        ...this.queryParams,
        ...this.router.parseUrl(this.router.url).queryParams,
      };
      this.menuLocationPath = this.router.url.split(/[?#]/)[0];
      this.menuState.observeLocation(this.router.url, this.baseHref);
    }

    const initialFilter = (this.queryParams['menu-filter'] as string) ?? '';

    this.searchState.setTerm(initialFilter);
    this.menuFilter.set(initialFilter.trim());
    this.appliedFilter$.next(initialFilter.trim());
    this.menuSearch.setValue(initialFilter, { emitEvent: false });

    this.originalMenus$ = this.normalizeMenusStream();

    this.buildMenusStream();

    this.subscribeFullMenus();
    this.subscribeFavorites();

    this.searchSubscription = this.menuSearch.valueChanges.subscribe((value) => {
      this.resetSearchSelection();
      this.cancelFilter();
      const term = (value ?? '').trim();
      if (term !== this.menuFilter()) {
        this.filterTimer = setTimeout(() => this.applyFilter(term), 200);
      }
    });

    this.navigationSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.syncFilterAfterNavigation =
          event.navigationTrigger === 'popstate' ||
          event.url.split(/[?#]/)[0] !== this.router.url.split(/[?#]/)[0];
        if (this.syncFilterAfterNavigation) this.cancelFilter();
      }
      if (!(event instanceof NavigationEnd)) return;
      const params = this.router.parseUrl(event.urlAfterRedirects).queryParams;
      this.queryParams = params;
      const term = (params['menu-filter'] as string) ?? '';
      if (this.syncFilterAfterNavigation || term.trim() !== this.menuFilter()) {
        this.cancelFilter();
        this.resetSearchSelection();
        this.menuSearch.setValue(term, { emitEvent: false });
        this.applyFilter(term, false);
      }
      this.syncFilterAfterNavigation = false;
      const path = event.urlAfterRedirects.split(/[?#]/)[0];
      const pathChanged = path !== this.menuLocationPath;
      this.menuLocationPath = path;
      this.menuState.observeLocation(event.urlAfterRedirects, this.baseHref);
      if (pathChanged) this.restoreActiveMenu();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['menuStateStorageKey'] && !changes['menuStateStorageKey'].firstChange) {
      this.menuState.configureStorage(this.menuStateStorageKey);
      this.refreshMenuState();
    }
    if (changes['collapsible'] && !changes['collapsible'].firstChange) {
      this.searchRevision$.next(this.searchRevision$.value + 1);
    }
    if (changes['visible'] || changes['favoriteMode']) this.restoreActiveMenu();
    if (
      changes['visible'] ||
      changes['resizable'] ||
      changes['minWidth'] ||
      changes['maxWidth'] ||
      changes['widthStorageKey']
    ) {
      this.resizeController?.configure(this.resizeOptions());
    }
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
    this.destroyed = true;
    this.cancelFilter();
    this.searchSubscription?.unsubscribe();
    this.appliedFilter$.complete();
    this.searchRevision$.complete();
    this.navigationSubscription?.unsubscribe();
    if (this.menuScrollFrame !== null) cancelAnimationFrame(this.menuScrollFrame);
    this.menuRevision$.complete();
    this.resizeController?.destroy();
    document.removeEventListener('keydown', this.onDocumentKeydown);
    document.removeEventListener('pointerdown', this.onDocumentPointerDown);
    this.favoritesSubscription?.unsubscribe();
    this.fullMenusSubscription?.unsubscribe();
    // Make sure no document-level drag listeners leak if destroyed mid-drag.
    if (this.dragState) {
      this.cleanupFavoriteDrag();
    }
  }

  private resizeOptions(): SidebarResizeOptions {
    return {
      resizable: this.resizable,
      visible: this.visible,
      minWidth: this.minWidth,
      maxWidth: this.maxWidth,
      widthStorageKey: this.widthStorageKey,
    };
  }

  /** Mirrors the `favorites$` input into the local `favoriteItems` signal. */
  private subscribeFavorites(): void {
    this.favoritesSubscription?.unsubscribe();
    this.favoritesSubscription = (this.favorites$ ?? of([])).subscribe((favs) => {
      this.favoriteItems.set(favs ?? []);
      this.restoreActiveMenu();
    });
  }

  /** Mirrors the full (unfiltered) normalized menu tree into the `fullMenus` signal. */
  private subscribeFullMenus(): void {
    this.fullMenusSubscription?.unsubscribe();
    this.fullMenusSubscription = this.originalMenus$.subscribe((menus) => {
      this.fullMenus.set(menus);
      this.restoreActiveMenu();
    });
  }

  onMenuExpansion(event: MenuExpansionChange): void {
    if (this.searchState.setExpanded(event)) {
      this.searchRevision$.next(this.searchRevision$.value + 1);
      return;
    }
    this.menuState.setExpanded(event);
    this.refreshMenuState();
  }

  private refreshMenuState(): void {
    this.menuStateRevision.update((revision) => revision + 1);
    this.menuRevision$.next(this.menuStateRevision());
    this.scheduleMenuScroll();
  }

  private restoreActiveMenu(): void {
    const favorites = this.favoriteMode ? createFavoritesMenu(this.favoriteItems()) : [];
    const activeMenu = this.router.navigated
      ? resolveSidebarActiveMenu(this.fullMenus(), favorites, this.router.url, this.baseHref)
      : undefined;
    const activeChanged = this.activeMenu !== activeMenu;
    this.activeMenu = activeMenu;
    const restored = this.menuState.restore(this.fullMenus(), favorites);
    if (restored || activeChanged) this.refreshMenuState();
    else this.scheduleMenuScroll();
  }

  private scheduleMenuScroll(): void {
    if (!this.destroyed) this.menuScrollPending = true;
  }

  ngAfterViewChecked(): void {
    if (this.destroyed || !this.menuScrollPending) return;
    this.menuScrollPending = false;
    if (this.menuScrollFrame !== null) cancelAnimationFrame(this.menuScrollFrame);
    this.menuScrollFrame = requestAnimationFrame(() => {
      this.menuScrollFrame = null;
      this.menuState.scrollToActive(this.hostElement.nativeElement as HTMLElement, this.visible);
    });
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
    return (this.menusInput$ ?? of([])).pipe(
      map((menus) => normalizeMenuTree(menus)),
      shareReplay({ bufferSize: 1, refCount: true }),
    );
  }

  private buildMenusStream(): void {
    const projectedMenus$ = combineLatest([this.originalMenus$, this.menuRevision$]).pipe(
      map(([menus]) => this.menuState.project(menus, 'main', this.activeMenu)),
      shareReplay({ bufferSize: 1, refCount: true }),
    );

    this.menus$ = combineLatest([
      projectedMenus$,
      this.appliedFilter$.pipe(distinctUntilChanged()),
      this.searchRevision$,
    ]).pipe(
      map(([menus]) => this.searchState.filter(menus)),
      tap((filteredMenus) => {
        this.updateNavigableMenus(filteredMenus);
        this.scheduleMenuScroll();
      }),
      shareReplay({ bufferSize: 1, refCount: true }),
    );
  }

  private cancelFilter(): void {
    if (this.filterTimer !== null) clearTimeout(this.filterTimer);
    this.filterTimer = null;
  }

  private applyFilter(value: string, syncUrl = true): void {
    this.cancelFilter();
    if (this.searchState.setTerm(value)) {
      this.menuFilter.set(this.searchState.term);
      this.appliedFilter$.next(this.searchState.term);
    }
    if (syncUrl) this.updateUrl();
  }

  private resetSearchSelection(): void {
    this.keyboardNavActive.set(false);
    this.selectedIndex.set(null);
    this.selectedMenuId.set(null);
  }

  private updateNavigableMenus(filteredMenus: IMenu[]): void {
    this.navigableMenus = flattenNavigableMenus(filteredMenus, this.collapsible);
    const selected = this.selectedMenuId();
    const index =
      selected === null
        ? -1
        : this.navigableMenus.findIndex((menu) => getMenuKey(menu) === selected);
    if (!this.menuFilter() || index < 0) this.resetSearchSelection();
    else this.selectedIndex.set(index);
  }

  onSearchKeyDown(event: KeyboardEvent): void {
    if (!['ArrowDown', 'ArrowUp', 'Enter'].includes(event.key)) return;
    this.applyFilter(this.menuSearch.value ?? '');
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

    const revision = this.menuStateRevision();
    if (this.favoritesGroupSource === favorites && this.favoritesGroupRevision === revision) {
      return this.favoritesGroupCache;
    }

    this.favoritesGroupSource = favorites;
    this.favoritesGroupRevision = revision;
    this.favoritesGroupCache = this.menuState.project(
      createFavoritesMenu(favorites),
      'favorites',
      this.activeMenu,
    )[0];

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
    const current = this.router.parseUrl(this.router.url);
    const term = this.menuFilter();
    if (
      (current.queryParams['menu-filter'] ?? '') === term &&
      (term || !('menu-filter' in current.queryParams))
    )
      return;

    this.router.navigate([], {
      queryParams: { ...current.queryParams, 'menu-filter': term || null },
      queryParamsHandling: 'replace',
      preserveFragment: true,
      replaceUrl: true,
    });
  }
}
