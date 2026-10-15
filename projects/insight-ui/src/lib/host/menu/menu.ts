import { NgClass } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  inject,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { IConfirmService } from '../../dialog/dialog';
import { IHighlightSearchPipe } from '../../highlight-search.pipe';
import { MENU_ICON_FALLBACK, SIDEBAR_FAVORITES_GROUP_ID } from '../host.constants';
import { type IMenu, type IMenuFavoriteToggleEvent } from '../host.types';
import {
  getMenuChildren,
  getMenuKey,
  getMenuLabel,
  getMenuRoute,
  hasMenuChildren,
  isModuleMenu,
  isNewTabMenu,
  isReloadMenu,
  isSpaMenu,
} from './menu.utils';

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
              <span
                class="ih-menu-label"
                [class.ih-menu-label--compact]="showApplication"
                [title]="menuLabel"
              >
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
              <span
                class="ih-menu-label"
                [class.ih-menu-label--compact]="showApplication"
                [title]="menuLabel"
              >
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
              <span
                class="ih-menu-label"
                [class.ih-menu-label--compact]="showApplication"
                [title]="menuLabel"
              >
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
 the top-level "no group icon" rule - independent of the data's `level`. */
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

  /** The synthetic Favorites group - keeps its icon at the top level. */
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
    const isLeaf =
      this.menu.type !== 'group' &&
      this.menuTypeId === 3 &&
      (!hasChildren || this.menu.visibility === 'no-child');

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
        .warning(
          'Remove from Favorites',
          `Remove <strong>${menuName}</strong> from your favorites?`,
        )
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
