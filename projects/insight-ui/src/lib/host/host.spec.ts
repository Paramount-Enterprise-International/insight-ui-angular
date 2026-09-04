import { APP_BASE_HREF } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';

import { IConfirmService } from '../dialog/dialog';
import {
  buildFavoritePathMap,
  collectMenuChain,
  IHContent,
  IHSidebar,
  IHTitleBreadcrumbService,
  IMenu,
  IMenuFavoriteReorderEvent,
  IMenuFavoriteToggleEvent,
  IUser,
  normalizeMenuTree,
} from './host';

describe('IHContent', () => {
  let fixture: ComponentFixture<IHContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IHContent, RouterTestingModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/-/' }, provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(IHContent);
    fixture.detectChanges();
  });

  it('renders host and title', () => {
    const shell = TestBed.inject(IHTitleBreadcrumbService);
    shell.setTitle('Dashboard');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const title = host.querySelector('.ih-content-header h1');

    expect(title?.textContent).toContain('Dashboard');
  });
});

/* ── Fixtures ─────────────────────────────────────────────────────────────── */

const MODERN_MENU: IMenu = {
  id: '11111111-1111-4111-a111-111111111101',
  name: 'Administration',
  type: 'group',
  route: '/admin',
  icon: 'fas fa-shield-alt',
  sequence: 1,
  application: { id: '77777777-7777-4777-a777-777777777002', code: 'IAMCN', name: 'IAM Console' },
  children: [
    {
      id: '11111111-1111-4111-a111-111111111102',
      name: 'Users',
      type: 'item',
      route: '/admin/users',
      icon: 'fas fa-users',
      openIn: 'CURRENT_TAB',
      sequence: 1,
      isFavorite: true,
      application: {
        id: '77777777-7777-4777-a777-777777777002',
        code: 'IAMCN',
        name: 'IAM Console',
      },
      children: [],
    },
  ],
};

const MODERN_MENU_TWO: IMenu = {
  id: '22222222-2222-4222-a222-222222222201',
  name: 'Reports',
  type: 'group',
  route: '/reports',
  icon: 'fas fa-chart-line',
  sequence: 2,
  application: { id: '88888888-8888-4888-a888-888888888001', code: 'REP', name: 'Reporting' },
  children: [
    {
      id: '22222222-2222-4222-a222-222222222202',
      name: 'Sales Report',
      type: 'item',
      route: '/reports/sales',
      icon: 'fas fa-table',
      openIn: 'CURRENT_TAB',
      sequence: 1,
      application: { id: '88888888-8888-4888-a888-888888888001', code: 'REP', name: 'Reporting' },
      children: [],
    },
  ],
};

const USER: IUser = {
  employeeCode: 'EMP-001',
  fullName: 'User One',
  userImagePath: '/user.male.jpg',
};

@Component({
  standalone: true,
  imports: [IHSidebar],
  template: `
    <ih-sidebar
      [collapsible]="collapsible()"
      [favoriteMode]="favoriteMode()"
      [favorites$]="favorites$"
      [groupByApplication]="groupByApplication()"
      [menusInput$]="menus$"
      [user$]="user$"
      (onFavoriteReorder)="reorders.push($event)"
      (onFavoriteToggle)="toggles.push($event)"
    />
  `,
})
class SidebarHost {
  user$: Observable<IUser> = of(USER);
  menus$: Observable<IMenu[]> = of([MODERN_MENU]);
  favoriteMode = signal(true);
  groupByApplication = signal(false);
  collapsible = signal(false);
  favorites$?: Observable<IMenu[]>;
  toggles: IMenuFavoriteToggleEvent[] = [];
  reorders: IMenuFavoriteReorderEvent[] = [];
}

/** Two flat favorite leaf items used to exercise the Favorites drag reorder. */
const FAVORITES: IMenu[] = [
  {
    id: '11111111-1111-4111-a111-111111111102',
    name: 'Users',
    type: 'item',
    route: '/admin/users',
    icon: 'fas fa-users',
  },
  {
    id: '22222222-2222-4222-a222-222222222203',
    name: 'Sales Report',
    type: 'item',
    route: '/reports/sales',
    icon: 'fas fa-table',
  },
] as IMenu[];

/** Builds a minimal mousedown MouseEvent whose target is a given element. */
function mouseDownEvent(target: EventTarget): MouseEvent {
  return { target, preventDefault: (): void => undefined } as unknown as MouseEvent;
}

describe('normalizeMenuTree', () => {
  it('maps modern nodes into the legacy IMenu shape, preserving modern extras', () => {
    const tree = normalizeMenuTree([MODERN_MENU]);

    expect(tree.length).toBe(1);

    const group = tree[0];
    expect(group.menuName).toBe('Administration');
    expect(group.menuTypeId).toBe(3);
    expect(group.id).toBe(MODERN_MENU.id);
    expect(group.level).toBe(0);
    expect(group.application?.code).toBe('IAMCN');

    const child = group.child?.[0];
    expect(child?.menuName).toBe('Users');
    expect(child?.menuTypeId).toBe(3);
    expect(child?.id).toBe(MODERN_MENU.children?.[0].id);
    expect(child?.isFavorite).toBe(true);
    expect(child?.route).toBe('/admin/users');
    expect(child?.level).toBe(1);
  });

  it('passes legacy nodes through untouched', () => {
    const legacy: IMenu = {
      menuId: 1,
      menuName: 'Legacy',
      menuTypeId: 2,
      parentId: 0,
      sequence: 1,
      level: -1,
      child: [],
    };

    expect(normalizeMenuTree([legacy])[0]).toBe(legacy);
  });
});

describe('IHSidebar (modern menus + favorites)', () => {
  let fixture: ComponentFixture<SidebarHost>;
  let host: SidebarHost;
  /** Confirm result for the mocked IConfirmService (false = cancel). */
  let confirmChoice = false;

  beforeEach(async () => {
    confirmChoice = false;

    await TestBed.configureTestingModule({
      imports: [SidebarHost, RouterTestingModule],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        {
          provide: IConfirmService,
          useValue: { warning: (): Observable<boolean> => of(confirmChoice) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarHost);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders the modern menu tree flat by default (no chevron, children visible)', () => {
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelectorAll('ih-menu').length).toBeGreaterThan(0);
    expect(el.querySelector('.ih-menu-chevron')).toBeNull();
    expect(el.textContent).toContain('Administration');
    expect(el.textContent).toContain('Users');
  });

  it('shows a chevron and collapses the group in collapsible mode', () => {
    host.collapsible.set(true);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const groupHeader = el.querySelector('.ih-menu-group--collapsible') as HTMLElement;

    expect(groupHeader).toBeTruthy();
    expect(groupHeader.querySelector('.ih-menu-chevron')).toBeTruthy();

    groupHeader.click();
    fixture.detectChanges();

    expect(el.querySelector('ul.collapsed')).toBeTruthy();
  });

  it('shows a filled pin star on a favorited leaf item', () => {
    const el = fixture.nativeElement as HTMLElement;
    const star = el.querySelector('.ih-menu-favorite') as HTMLElement;

    expect(star).toBeTruthy();
    expect(star.classList.contains('is-favorite')).toBe(true);
  });

  it('does not emit onFavoriteToggle when an unfavorite is cancelled', () => {
    const el = fixture.nativeElement as HTMLElement;
    const star = el.querySelector('.ih-menu-favorite') as HTMLElement;

    // The default fixture leaf (Users) is a favorite and the confirm is cancelled.
    star.click();

    expect(host.toggles.length).toBe(0);
  });

  it('emits onFavoriteToggle only after an unfavorite is confirmed', () => {
    confirmChoice = true;
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const star = el.querySelector('.ih-menu-favorite') as HTMLElement;

    star.click();

    expect(host.toggles.length).toBe(1);
    expect(host.toggles[0].id).toBe('11111111-1111-4111-a111-111111111102');
    expect(host.toggles[0].isFavorite).toBe(false);
  });

  it('emits onFavoriteToggle immediately when pinning a non-favorite leaf', () => {
    host.menus$ = of([MODERN_MENU_TWO]);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const star = el.querySelector('.ih-menu-favorite') as HTMLElement;

    star.click();

    expect(host.toggles.length).toBe(1);
    expect(host.toggles[0].id).toBe('22222222-2222-4222-a222-222222222202');
    expect(host.toggles[0].isFavorite).toBe(true);
  });

  it('does not render pin stars when favoriteMode is off', () => {
    host.favoriteMode.set(false);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.ih-menu-favorite')).toBeNull();
  });

  it('renders favorites as a group below the search box when favorites are provided', () => {
    host.favorites$ = of([
      {
        id: '11111111-1111-4111-a111-111111111102',
        name: 'Users',
        type: 'item',
        route: '/admin/users',
        icon: 'fas fa-users',
      } as IMenu,
    ]);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const section = el.querySelector('.ih-sidebar-favorites');

    expect(section).toBeTruthy();
    expect(section?.textContent).toContain('Favorites');
    expect(section?.textContent).toContain('Users');
  });

  it('does not make the main menu tree items draggable', () => {
    host.favorites$ = of(FAVORITES);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const favoritesLeaves = el.querySelectorAll('.ih-sidebar-favorites a[data-menu-id]');
    const mainMenuLeaves = Array.from(el.querySelectorAll('a[data-menu-id]')).filter(
      (node) => !(node as HTMLElement).closest('.ih-sidebar-favorites'),
    );

    // Only Favorites leaves carry the drag marker (data-menu-id); the main
    // menu tree has none.
    expect(favoritesLeaves.length).toBe(2);
    expect(mainMenuLeaves.length).toBe(0);
  });

  it('groups menu roots under an application label when groupByApplication is enabled (multiple apps)', () => {
    host.menus$ = of([MODERN_MENU, MODERN_MENU_TWO]);
    host.groupByApplication.set(true);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const labels = el.querySelectorAll('.ih-sidebar-app-label');

    expect(labels.length).toBe(2);
    expect(el.textContent).toContain('IAM Console');
    expect(el.textContent).toContain('Reporting');
  });

  it('renders the favorites list and marks leaf items as drag sources', () => {
    host.favorites$ = of(FAVORITES);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const favorites = el.querySelector('.ih-sidebar-favorites');

    expect(favorites).toBeTruthy();
    // Each favorite leaf carries data-menu-id so the pointer drag can pick it up.
    const leaves = favorites?.querySelectorAll('a[data-menu-id]') ?? [];
    expect(leaves.length).toBe(2);
  });

  it('emits onFavoriteReorder with the ordered menu ids after a pointer drag', () => {
    host.favorites$ = of(FAVORITES);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const leaves = Array.from(
      el.querySelectorAll<HTMLElement>('.ih-sidebar-favorites a[data-menu-id]'),
    );
    // Deterministic layout: each leaf is 30px tall, stacked from top 0.
    leaves.forEach((leaf, i) => {
      leaf.getBoundingClientRect = (): DOMRect =>
        ({
          top: i * 30,
          bottom: (i + 1) * 30,
          height: 30,
          width: 200,
          left: 0,
          right: 200,
          x: 0,
          y: i * 30,
          toJSON: (): Record<string, never> => ({}),
        }) as DOMRect;
    });

    const sidebar = fixture.debugElement.query(By.directive(IHSidebar))
      .componentInstance as IHSidebar;
    // Mousedown on the first favorite, then move below its midpoint (pos 1)
    // and release.
    sidebar.onFavoritesMouseDown(mouseDownEvent(leaves[0]));
    document.dispatchEvent(new MouseEvent('mousemove', { clientY: 45 }));
    document.dispatchEvent(new MouseEvent('mouseup'));

    expect(host.reorders.length).toBe(1);
    expect(host.reorders[0].menuIds).toEqual([
      '22222222-2222-4222-a222-222222222203',
      '11111111-1111-4111-a111-111111111102',
    ]);
  });

  it('emits onFavoriteReorder when dragging upward', () => {
    host.favorites$ = of(FAVORITES);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const leaves = Array.from(
      el.querySelectorAll<HTMLElement>('.ih-sidebar-favorites a[data-menu-id]'),
    );
    leaves.forEach((leaf, i) => {
      leaf.getBoundingClientRect = (): DOMRect =>
        ({
          top: i * 30,
          bottom: (i + 1) * 30,
          height: 30,
          width: 200,
          left: 0,
          right: 200,
          x: 0,
          y: i * 30,
          toJSON: (): Record<string, never> => ({}),
        }) as DOMRect;
    });

    const sidebar = fixture.debugElement.query(By.directive(IHSidebar))
      .componentInstance as IHSidebar;
    // Mousedown on the 2nd favorite, then move above its midpoint (pos 0).
    sidebar.onFavoritesMouseDown(mouseDownEvent(leaves[1]));
    document.dispatchEvent(new MouseEvent('mousemove', { clientY: 10 }));
    document.dispatchEvent(new MouseEvent('mouseup'));

    expect(host.reorders.length).toBe(1);
    expect(host.reorders[0].menuIds).toEqual([
      '22222222-2222-4222-a222-222222222203',
      '11111111-1111-4111-a111-111111111102',
    ]);
  });

  it('shows the favorite ancestor path (from the menu tree) as the leaf subtitle', () => {
    host.favorites$ = of([
      {
        id: '11111111-1111-4111-a111-111111111102',
        name: 'Users',
        type: 'item',
        route: '/admin/users',
        icon: 'fas fa-users',
        application: {
          id: '77777777-7777-4777-a777-777777777002',
          code: 'IAMCN',
          name: 'IAM Console',
        },
      } as IMenu,
    ]);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const appLabel = el.querySelector('.ih-sidebar-favorites .ih-menu-application');

    // Users lives under the 'Administration' group in the default menu tree.
    expect(appLabel).toBeTruthy();
    expect(appLabel?.textContent).toContain('Administration');
    expect(appLabel?.textContent).not.toContain('IAM Console');
  });

  it('falls back to the application name when a favorite is not in the menu tree', () => {
    host.menus$ = of([MODERN_MENU_TWO]);
    host.favorites$ = of([
      {
        id: '11111111-1111-4111-a111-111111111102',
        name: 'Users',
        type: 'item',
        route: '/admin/users',
        icon: 'fas fa-users',
        application: {
          id: '77777777-7777-4777-a777-777777777002',
          code: 'IAMCN',
          name: 'IAM Console',
        },
      } as IMenu,
    ]);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const appLabel = el.querySelector('.ih-sidebar-favorites .ih-menu-application');

    expect(appLabel).toBeTruthy();
    expect(appLabel?.textContent).toContain('IAM Console');
  });

  it('does not render a subtitle for a root-level favorite (no ancestors)', () => {
    const rootLeaf: IMenu = {
      id: 'root-leaf',
      name: 'Root Item',
      type: 'item',
      route: '/root',
      icon: 'fas fa-star',
    };

    host.menus$ = of([rootLeaf]);
    host.favorites$ = of([rootLeaf]);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const appLabel = el.querySelector('.ih-sidebar-favorites .ih-menu-application');

    expect(appLabel).toBeNull();
  });

  it('does not show the application name on the main menu tree', () => {
    host.favorites$ = of([
      {
        id: '11111111-1111-4111-a111-111111111102',
        name: 'Users',
        type: 'item',
        route: '/admin/users',
        icon: 'fas fa-users',
        application: {
          id: '77777777-7777-4777-a777-777777777002',
          code: 'IAMCN',
          name: 'IAM Console',
        },
      } as IMenu,
    ]);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const mainMenuLabels = Array.from(el.querySelectorAll('.ih-menu-application')).filter(
      (node) => !(node as HTMLElement).closest('.ih-sidebar-favorites'),
    );

    expect(mainMenuLabels.length).toBe(0);
  });
});

/* ── Menu icon fallback (missing / non-FontAwesome) ──────────────────────── */

@Component({
  standalone: true,
  imports: [IHSidebar],
  template: ` <ih-sidebar [menusInput$]="menus$" [user$]="user$" /> `,
})
class FallbackIconHost {
  user$: Observable<IUser> = of(USER);
  menus$: Observable<IMenu[]> = of([
    { id: 'a', name: 'No Icon', type: 'item', route: '/a', icon: null },
    { id: 'b', name: 'Legacy Icon', type: 'item', route: '/b', icon: 'home' },
    { id: 'c', name: 'Valid Icon', type: 'item', route: '/c', icon: 'fas fa-users' },
  ]);
}

describe('IHMenu icon fallback', () => {
  let fixture: ComponentFixture<FallbackIconHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FallbackIconHost, RouterTestingModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    }).compileComponents();

    fixture = TestBed.createComponent(FallbackIconHost);
    fixture.detectChanges();
  });

  /** Returns the row `<i>` icon element for the menu whose label is `label`. */
  function iconFor(label: string): HTMLElement | null {
    const el = fixture.nativeElement as HTMLElement;
    const a = Array.from(el.querySelectorAll<HTMLElement>('a')).find((node) =>
      node.textContent?.includes(label),
    );
    return a?.querySelector<HTMLElement>('i') ?? null;
  }

  it('falls back to fa-brands fa-microsoft when the menu has no icon', () => {
    const icon = iconFor('No Icon');
    expect(icon).toBeTruthy();
    expect(icon!.classList.contains('fa-brands')).toBe(true);
    expect(icon!.classList.contains('fa-microsoft')).toBe(true);
  });

  it('falls back to fa-brands fa-microsoft for a non-FontAwesome (legacy named) icon', () => {
    const icon = iconFor('Legacy Icon');
    expect(icon).toBeTruthy();
    expect(icon!.classList.contains('fa-brands')).toBe(true);
    expect(icon!.classList.contains('fa-microsoft')).toBe(true);
  });

  it('keeps a valid FontAwesome icon and still appends fa-fw', () => {
    const icon = iconFor('Valid Icon');
    expect(icon).toBeTruthy();
    expect(icon!.classList.contains('fas')).toBe(true);
    expect(icon!.classList.contains('fa-users')).toBe(true);
    expect(icon!.classList.contains('fa-fw')).toBe(true);
    expect(icon!.classList.contains('fa-brands')).toBe(false);
  });
});

/* ── Favorite ancestor path resolution ────────────────────────────────────── */

const DEEP_TREE: IMenu[] = [
  {
    id: 'group-atlas',
    name: 'Atlas React',
    type: 'group',
    children: [
      {
        id: 'group-guide',
        name: 'React Guide',
        type: 'group',
        children: [
          { id: 'leaf-button', name: 'Button', type: 'item', route: '/docs/react', children: [] },
        ],
      },
    ],
  },
  {
    id: 'group-docs',
    name: 'docs',
    type: 'group',
    children: [
      {
        id: 'group-sso',
        name: 'sso',
        type: 'group',
        children: [
          { id: 'leaf-index', name: 'index', type: 'item', route: '/docs/sso/index', children: [] },
        ],
      },
    ],
  },
  { id: 'root-leaf', name: 'Root Favorite', type: 'item', route: '/root', children: [] },
];

describe('buildFavoritePathMap', () => {
  it('joins ancestor group names (excluding the leaf) with "> "', () => {
    const tree = normalizeMenuTree(DEEP_TREE);
    const favorites: IMenu[] = [{ id: 'leaf-index', name: 'index', type: 'item' } as IMenu];

    const map = buildFavoritePathMap(tree, favorites);

    expect(map['leaf-index']).toBe('docs > sso');
  });

  it('resolves the chain from the tree, not from the item route', () => {
    const tree = normalizeMenuTree(DEEP_TREE);
    const favorites: IMenu[] = [
      {
        id: 'leaf-button',
        name: 'Button',
        type: 'item',
        route: '/docs/react',
        application: { id: 'app', code: 'ATLAS', name: 'Atlas' },
      } as IMenu,
    ];

    const map = buildFavoritePathMap(tree, favorites);

    expect(map['leaf-button']).toBe('Atlas React > React Guide');
  });

  it('maps a missing favorite to undefined', () => {
    const tree = normalizeMenuTree(DEEP_TREE);
    const favorites: IMenu[] = [{ id: 'missing', name: 'Ghost', type: 'item' } as IMenu];

    const map = buildFavoritePathMap(tree, favorites);

    expect(map['missing']).toBeUndefined();
  });

  it('maps a root-level favorite to an empty string', () => {
    const tree = normalizeMenuTree(DEEP_TREE);
    const favorites: IMenu[] = [{ id: 'root-leaf', name: 'Root Favorite', type: 'item' } as IMenu];

    const map = buildFavoritePathMap(tree, favorites);

    expect(map['root-leaf']).toBe('');
  });

  it('collectMenuChain returns the root-to-leaf chain for a nested node', () => {
    const tree = normalizeMenuTree(DEEP_TREE);

    const chain = collectMenuChain(tree, 'leaf-index');

    expect(chain?.map((node) => node.name ?? node.menuName)).toEqual(['docs', 'sso', 'index']);
  });
});
