// sidebar.ts
import { AsyncPipe } from '@angular/common';
import {
  Component,
  HostBinding,
  inject,
  Input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, map, Observable, shareReplay, startWith, tap } from 'rxjs';
import { IHMenu, Menu } from './menu';

export type User = {
  employeeCode: string;
  fullName: string;
  userImagePath: string;
};

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
          <ih-menu [filter]="menuFilter()" [menu]="m" [selectedMenuId]="selectedMenuId()" />
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

  /* ---------------------------
   * INPUTS (from parent)
   * --------------------------- */

  /** parent passes user stream (or you can change to plain User) */
  @Input() user$!: Observable<User>;

  /** parent passes the ORIGINAL (unfiltered) menus stream */
  @Input() menusInput$!: Observable<Menu[]>;

  /** visibility toggle */
  @Input() visible = true;

  @Input() footerText = 'Insight Local';

  /* ---------------------------
   * INTERNAL STREAMS / STATE
   * --------------------------- */

  /** filtered menus for template usage */
  menus$!: Observable<Menu[]>;

  /** last known query params (so we preserve other params when updating URL) */
  queryParams: any = {};

  menuSearch: FormControl<string | null> = new FormControl<string | null>('');

  /** current filter text (used for filtering + URL) */
  menuFilter = signal('');

  /** whether keyboard navigation is active (user pressed arrow) */
  keyboardNavActive = signal(false);

  /** index into flattened navigable menus */
  selectedIndex = signal<number | null>(null);

  /** menuId of selected leaf item (for highlight/scroll) */
  selectedMenuId = signal<number | null>(null);

  /** flat list of leaf menus that can be navigated with arrows */
  private navigableMenus: Menu[] = [];

  /** keep latest input menus$ (replay) */
  private originalMenus$!: Observable<Menu[]>;

  @HostBinding('class.hidden')
  get sidebarVisibility(): boolean {
    return !this.visible;
  }

  /* ---------------------------
   * LIFECYCLE
   * --------------------------- */

  ngOnInit(): void {
    // 1) Read query params directly from the browser URL
    const searchParams = new URLSearchParams(window.location.search);
    const initialQueryParams: any = {};
    searchParams.forEach((value, key) => {
      initialQueryParams[key] = value;
    });

    this.queryParams = initialQueryParams;
    const initialFilter = (this.queryParams['menu-filter'] as string) ?? '';

    // 2) Seed signal + form control BEFORE building streams
    this.menuFilter.set(initialFilter);
    this.menuSearch.setValue(initialFilter, { emitEvent: false });

    // 3) Prepare originalMenus$ from input (must exist)
    // If the parent binds it normally, it will exist by ngOnInit.
    this.originalMenus$ = (this.menusInput$ ?? new Observable<Menu[]>()).pipe(shareReplay(1));

    // 4) Build menus stream
    this.buildMenusStream();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // If parent swaps the observable instance after init,
    // rebuild the pipeline safely.
    if (changes['menusInput$'] && !changes['menusInput$'].firstChange) {
      this.originalMenus$ = (this.menusInput$ ?? new Observable<Menu[]>()).pipe(shareReplay(1));
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

        // first emission is initial state -> don't rewrite URL
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

  /* ---------------------------
   * MENU FILTER LOGIC
   * --------------------------- */

  private filterMenuTree(menus: Menu[], rawTerm: string): Menu[] {
    const term = (rawTerm ?? '').trim().toLowerCase();

    // no filter → full tree
    if (!term) {
      return menus;
    }

    const filtered: Menu[] = [];

    for (const menu of menus) {
      const result = this.filterMenuBranch(menu, term);
      if (result) filtered.push(result);
    }

    return filtered;
  }

  /**
   * Rules:
   * - If THIS node matches → keep it and ALL of its original children.
   * - Else, if any CHILD matches → keep this node but ONLY the matching branches.
   * - Else → return null.
   */
  private filterMenuBranch(menu: Menu, term: string): Menu | null {
    const name = (menu.menuName ?? '').toLowerCase();
    const selfMatches = name.includes(term);

    const originalChildren = menu.child ?? [];

    // First, filter children recursively
    const filteredChildren: Menu[] = [];
    for (const child of originalChildren) {
      const childResult = this.filterMenuBranch(child, term);
      if (childResult) {
        filteredChildren.push(childResult);
      }
    }

    const childMatches = filteredChildren.length > 0;

    // If neither this node nor any descendants match → drop this branch
    if (!selfMatches && !childMatches) {
      return null;
    }

    // Decide which children to keep:
    // - If THIS node matches → keep ALL original children
    // - Else → keep only filteredChildren (the matching branches)
    const childrenToUse = selfMatches ? originalChildren : filteredChildren;

    const cloned: Menu = {
      ...menu,
      child: childrenToUse,
    };

    // Expand groups that either match themselves or contain matches
    if (+cloned.menuTypeId === 3 && (selfMatches || childMatches)) {
      cloned.visibility = 'expanded';
    }

    return cloned;
  }

  /* ---------------------------
   * FLATTEN FOR KEYBOARD NAV
   * --------------------------- */

  private updateNavigableMenus(filteredMenus: Menu[]): void {
    this.navigableMenus = this.flattenNavigableMenus(filteredMenus);

    const hasFilter = !!this.menuFilter().trim();

    if (!this.navigableMenus.length || !hasFilter) {
      // no items or no filter → no highlight
      this.keyboardNavActive.set(false);
      this.selectedIndex.set(null);
      this.selectedMenuId.set(null);
      return;
    }

    if (this.keyboardNavActive()) {
      // keep selection in bounds
      const maxIndex = this.navigableMenus.length - 1;
      let idx = this.selectedIndex();
      if (idx === null || idx < 0 || idx > maxIndex) idx = 0;
      this.selectedIndex.set(idx);
      this.selectedMenuId.set(this.navigableMenus[idx].menuId);
    } else {
      // arrows not pressed yet → still no highlight
      this.selectedIndex.set(null);
      this.selectedMenuId.set(null);
    }
  }

  private flattenNavigableMenus(menus: Menu[]): Menu[] {
    const result: Menu[] = [];

    const visit = (menu: Menu): void => {
      const children = menu.child ?? [];
      const hasChildren = children.length > 0;

      const isLeafMenu = +menu.menuTypeId === 3 && (!hasChildren || menu.visibility === 'no-child');

      if (isLeafMenu) {
        result.push(menu);
      }

      for (const child of children) visit(child);
    };

    for (const m of menus) visit(m);

    return result;
  }

  /* ---------------------------
   * KEYBOARD HANDLING
   * --------------------------- */

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
      // first arrow → activate and select first/last
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

    if (next < 0) next = maxIndex;
    else if (next > maxIndex) next = 0;

    this.selectedIndex.set(next);
    this.selectedMenuId.set(this.navigableMenus[next].menuId);
  }

  private activateSelected(): void {
    const idx = this.selectedIndex();
    if (idx === null || idx < 0 || idx >= this.navigableMenus.length) return;

    const menu = this.navigableMenus[idx];
    this.navigateToMenu(menu);
  }

  private navigateToMenu(menu: Menu): void {
    if (menu.applicationCode === 'INS5' && menu.route) {
      this.router.navigate([menu.route]);
    } else if (menu.applicationUrl) {
      window.location.href = menu.applicationUrl;
    }
  }

  /* ---------------------------
   * URL SYNC
   * --------------------------- */

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
