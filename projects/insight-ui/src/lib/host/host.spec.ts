import { APP_BASE_HREF } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';

import {
  IHContent,
  IHSidebar,
  IHTitleBreadcrumbService,
  IMenu,
  IMenuFavoriteToggleEvent,
  IUser,
  normalizeMenuTree,
} from './host';

describe('IHContent', () => {
  let fixture: ComponentFixture<IHContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IHContent, RouterTestingModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/-/' }],
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
      application: { id: '77777777-7777-4777-a777-777777777002', code: 'IAMCN', name: 'IAM Console' },
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarHost, RouterTestingModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
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

  it('emits onFavoriteToggle when the pin star is clicked (optimistic toggle)', () => {
    const el = fixture.nativeElement as HTMLElement;
    const star = el.querySelector('.ih-menu-favorite') as HTMLElement;

    star.click();

    expect(host.toggles.length).toBe(1);
    expect(host.toggles[0].id).toBe('11111111-1111-4111-a111-111111111102');
    expect(host.toggles[0].isFavorite).toBe(false);
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
});

