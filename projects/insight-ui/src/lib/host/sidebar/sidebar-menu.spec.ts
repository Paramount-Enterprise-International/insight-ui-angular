import { APP_BASE_HREF, Location } from '@angular/common';
import { provideLocationMocks } from '@angular/common/testing';
import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NavigationEnd, provideRouter, Router } from '@angular/router';
import { BehaviorSubject, filter, firstValueFrom, of } from 'rxjs';
import type { IMenu } from '../host.types';
import { IHSidebar } from './sidebar';
import { SidebarMenuState } from './sidebar-menu-state';
import { SidebarSearchState } from './sidebar.utils';

@Component({ template: '' })
class EmptyPage {}

const key = 'insight.sidebar.menu-state';
const menus: IMenu[] = [
  {
    id: 'root',
    name: 'Root',
    type: 'group',
    children: [
      {
        id: 'nested',
        name: 'Nested',
        type: 'group',
        children: [{ id: 'active', name: 'Active page', type: 'item', route: '/people' }],
      },
    ],
  },
  {
    id: 'other',
    name: 'Other',
    type: 'group',
    children: [{ id: 'other-page', name: 'Other page', type: 'item', route: '/other' }],
  },
];
const favorite = menus[0].children![0].children![0];

describe('IHSidebar menu persistence and restoration', () => {
  let saved: string | null;
  let fixture: ComponentFixture<IHSidebar>;
  let host: HTMLElement;
  let router: Router;
  let source: BehaviorSubject<IMenu[]>;
  let activeRowTop: number;

  async function settle(): Promise<void> {
    fixture.detectChanges();
    await fixture.whenStable();
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    fixture.detectChanges();
  }

  async function mount(
    path = '/people/123',
    nodes = menus,
    visible = true,
    favorites: IMenu[] = [],
  ): Promise<void> {
    await router.navigateByUrl(path);
    fixture = TestBed.createComponent(IHSidebar);
    source = new BehaviorSubject(nodes);
    fixture.componentRef.setInput('menusInput$', source);
    fixture.componentRef.setInput('user$', of(null));
    fixture.componentRef.setInput('resizable', false);
    fixture.componentRef.setInput('collapsible', true);
    fixture.componentRef.setInput('visible', visible);
    fixture.componentRef.setInput('favoriteMode', favorites.length > 0);
    fixture.componentRef.setInput('favorites$', of(favorites));
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    Object.defineProperty(host.querySelector('.ih-sidebar-body')!, 'scrollTop', {
      value: 0,
      writable: true,
    });
    await settle();
  }

  async function searchFor(term: string): Promise<void> {
    fixture.componentInstance.menuSearch.setValue(term);
    await new Promise<void>((resolve) => setTimeout(resolve, 210));
    await settle();
  }

  function header(name: string): HTMLElement {
    return [...host.querySelectorAll<HTMLElement>('.ih-menu-group')].find(
      (element) => element.querySelector('h6')?.textContent === name,
    )!;
  }

  function collapsed(name: string): boolean {
    return header(name).parentElement!.querySelector('ul')!.classList.contains('collapsed');
  }

  function activeKeys(): (string | null)[] {
    return [...host.querySelectorAll('a.is-active[aria-current="page"]')].map((row) =>
      row.getAttribute('data-sidebar-menu-key'),
    );
  }

  async function moveHistory(direction: 'back' | 'forward'): Promise<void> {
    router.setUpLocationChangeListener();
    const navigation = firstValueFrom(
      router.events.pipe(filter((event) => event instanceof NavigationEnd)),
    );
    TestBed.inject(Location)[direction]();
    await navigation;
    await settle();
  }

  beforeEach(async () => {
    activeRowTop = 900;
    saved = localStorage.getItem(key);
    localStorage.setItem(
      key,
      JSON.stringify({
        version: 1,
        expanded: {
          'main:id:root': false,
          'main:id:nested': false,
          'main:id:other': false,
          'favorites:group': false,
        },
      }),
    );
    await TestBed.configureTestingModule({
      imports: [IHSidebar],
      providers: [
        provideHttpClient(),
        provideLocationMocks(),
        { provide: APP_BASE_HREF, useValue: '/-/' },
        provideRouter([
          { path: 'start', redirectTo: 'people', pathMatch: 'full' },
          { path: '**', component: EmptyPage },
        ]),
      ],
    }).compileComponents();
    router = TestBed.inject(Router);
    spyOn(HTMLElement.prototype, 'getBoundingClientRect').and.callFake(function (
      this: HTMLElement,
    ): DOMRect {
      if (this.classList.contains('ih-sidebar-body')) return new DOMRect(0, 100, 200, 200);
      if (this.getAttribute('data-sidebar-menu-key')?.endsWith(':active'))
        return new DOMRect(0, activeRowTop, 180, 30);
      return new DOMRect(0, 100, 100, 30);
    });
  });

  afterEach(() => {
    fixture?.destroy();
    if (saved === null) localStorage.removeItem(key);
    else localStorage.setItem(key, saved);
    localStorage.removeItem('sidebar-menu-custom-test');
  });

  it('opens active ancestors, preserves other choices and scrolls without selecting or focusing', async () => {
    const before = localStorage.getItem(key);
    await mount();
    expect(collapsed('Root')).toBe(false);
    expect(collapsed('Nested')).toBe(false);
    expect(collapsed('Other')).toBe(true);
    expect(host.querySelector('.ih-sidebar-body')!.scrollTop).toBe(784);
    expect(host.querySelector('.is-selected')).toBeNull();
    expect(activeKeys()).toEqual(['main:id:active']);
    expect(host.contains(document.activeElement)).toBe(false);
    expect(localStorage.getItem(key)).toBe(before);
    expect(menus[0].visibility).toBeUndefined();
  });

  it('restores an already visible active row 16px below the top after refresh', async () => {
    activeRowTop = 180;
    await mount();
    expect(host.querySelector('.ih-sidebar-body')!.scrollTop).toBe(64);
  });

  it('keeps nested choices during navigation and hydration but resets them on remount', async () => {
    await mount('/unknown');
    header('Root').click();
    await settle();
    header('Nested').click();
    await settle();
    expect(collapsed('Nested')).toBe(false);
    expect(JSON.parse(localStorage.getItem(key)!).expanded['main:id:nested']).toBeUndefined();
    await searchFor('Root');
    await searchFor('');
    expect(collapsed('Nested')).toBe(false);
    await router.navigateByUrl('/other');
    await settle();
    await moveHistory('back');
    expect(router.url).toBe('/unknown');
    expect(collapsed('Nested')).toBe(false);
    source.next([]);
    await settle();
    source.next(structuredClone(menus));
    await settle();
    expect(collapsed('Nested')).toBe(false);
    fixture.destroy();
    await mount('/unknown');
    expect(collapsed('Root')).toBe(false);
    expect(collapsed('Nested')).toBe(true);
  });

  it('opens root headers by default and ignores old nested expansion on initial load', async () => {
    localStorage.setItem(key, JSON.stringify({ version: 1, expanded: { 'main:id:nested': true } }));
    const nodes = structuredClone(menus);
    nodes[0].children![0].visibility = 'expanded';
    await mount('/unknown', nodes);
    expect(collapsed('Root')).toBe(false);
    expect(collapsed('Other')).toBe(false);
    expect(collapsed('Nested')).toBe(true);
  });

  for (const term of ['Active page', 'Root']) {
    it(`temporarily opens the complete search branch for ${term}`, async () => {
      const before = localStorage.getItem(key);
      await mount('/unknown');
      await searchFor(term);
      expect(collapsed('Root')).toBe(false);
      expect(collapsed('Nested')).toBe(false);
      const row = host.querySelector('a[data-sidebar-menu-key="main:id:active"]')!;
      expect(row.closest('ul.collapsed')).toBeNull();
      expect(localStorage.getItem(key)).toBe(before);
      await searchFor('');
      expect(collapsed('Root')).toBe(true);
      expect(collapsed('Nested')).toBe(true);
      expect(localStorage.getItem(key)).toBe(before);
    });
  }

  for (const term of ['Legacy page', 'Legacy module']) {
    it(`opens a saved collapsed legacy module and its descendants for ${term}`, async () => {
      const nodes: IMenu[] = [
        {
          menuId: 1,
          menuName: 'Legacy module',
          menuTypeId: 2,
          visibility: 'collapsed',
          child: [
            {
              menuId: 2,
              menuName: 'Legacy group',
              menuTypeId: 3,
              child: [{ menuId: 3, menuName: 'Legacy page', menuTypeId: 3, route: '/legacy' }],
            },
          ],
        },
      ];
      const before = localStorage.getItem(key);
      await mount('/unknown', nodes);
      const module = (): HTMLUListElement =>
        host.querySelector('.ih-menu-module')!.parentElement!.querySelector('ul')!;
      expect(module().classList.contains('collapsed')).toBe(true);
      await searchFor(term);
      expect(module().classList.contains('expanded')).toBe(true);
      expect(collapsed('Legacy group')).toBe(false);
      const row = host.querySelector('a[data-sidebar-menu-key="main:menuId:3"]')!;
      expect(row.closest('ul.collapsed')).toBeNull();
      host.querySelector<HTMLElement>('.ih-menu-module')!.click();
      await settle();
      expect(module().classList.contains('collapsed')).toBe(true);
      host.querySelector<HTMLElement>('.ih-menu-module')!.click();
      await settle();
      expect(module().classList.contains('expanded')).toBe(true);
      expect(localStorage.getItem(key)).toBe(before);
      await searchFor('');
      expect(module().classList.contains('collapsed')).toBe(true);
      expect(collapsed('Legacy group')).toBe(true);
      expect(localStorage.getItem(key)).toBe(before);
      expect(nodes[0].visibility).toBe('collapsed');
      expect(nodes[0].child![0].visibility).toBeUndefined();
    });
  }

  it('renders every level expanded in flat mode despite collapsed preferences', async () => {
    await mount('/unknown');
    fixture.componentRef.setInput('collapsible', false);
    await settle();
    expect(host.querySelector('ul.collapsed')).toBeNull();
    expect(host.querySelector('.ih-menu-chevron')).toBeNull();
    expect(host.querySelector('a[data-sidebar-menu-key="main:id:active"]')).not.toBeNull();
  });

  it('keeps manual collapse after restore and does not reopen on subsequent navigation', async () => {
    await mount();
    header('Root').click();
    await settle();
    source.next(structuredClone(menus));
    await settle();
    expect(collapsed('Root')).toBe(true);
    await router.navigateByUrl('/other');
    await settle();
    expect(collapsed('Other')).toBe(true);
    expect(activeKeys()).toEqual(['main:id:other-page']);
    await moveHistory('back');
    expect(collapsed('Root')).toBe(true);
    expect(activeKeys()).toEqual(['main:id:active']);
    await moveHistory('forward');
    expect(activeKeys()).toEqual(['main:id:other-page']);
    expect(collapsed('Other')).toBe(true);
  });

  it('preserves a hiding search filter and waits until it is cleared before scrolling', async () => {
    await mount('/people?menu-filter=Other&tab=edit');
    expect(fixture.componentInstance.menuSearch.value).toBe('Other');
    expect(host.querySelector('a[data-sidebar-menu-key="main:id:active"]')).toBeNull();
    expect(activeKeys()).toEqual([]);
    expect(host.querySelector('.ih-sidebar-body')!.scrollTop).toBe(0);
    expect(router.url).toContain('menu-filter=Other');
    const search = host.querySelector<HTMLInputElement>('.ih-sidebar-search input')!;
    search.focus();
    await searchFor('');
    expect(host.querySelector('.ih-sidebar-body')!.scrollTop).toBeGreaterThan(0);
    expect(document.activeElement).toBe(search);
    expect(router.url).toContain('tab=edit');
    expect(collapsed('Root')).toBe(false);
    expect(activeKeys()).toEqual(['main:id:active']);
  });

  it('keeps route highlighting independent of keyboard search selection', async () => {
    await mount();
    await searchFor('page');
    const search = host.querySelector<HTMLInputElement>('.ih-sidebar-search input')!;
    search.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await settle();
    expect(host.querySelector('a.is-active.is-selected')).not.toBeNull();
    search.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await settle();
    expect(host.querySelector('a.is-selected')?.getAttribute('data-sidebar-menu-key')).toBe(
      'main:id:other-page',
    );
    expect(activeKeys()).toEqual(['main:id:active']);
    expect(host.querySelector('a.is-selected')?.hasAttribute('aria-current')).toBe(false);
  });

  it('defers scrolling until visible and preserves later manual scroll positions', async () => {
    await mount('/people', menus, false);
    const body = host.querySelector<HTMLElement>('.ih-sidebar-body')!;
    expect(body.scrollTop).toBe(0);
    fixture.componentRef.setInput('visible', true);
    await settle();
    expect(body.scrollTop).toBeGreaterThan(0);
    body.scrollTop = 0;
    source.next(structuredClone(menus));
    await settle();
    expect(body.scrollTop).toBe(0);
  });

  it('waits for asynchronous menus and cancels a pending restore after navigating away', async () => {
    await mount('/people', []);
    source.next(menus);
    await settle();
    expect(collapsed('Root')).toBe(false);
    fixture.destroy();
    await mount('/people', []);
    await router.navigateByUrl('/other');
    source.next(menus);
    await settle();
    expect(collapsed('Root')).toBe(true);
    expect(collapsed('Other')).toBe(true);
    expect(activeKeys()).toEqual(['main:id:other-page']);
  });

  it('persists Favorites separately, prefers the main tree and supports a favorites-only target', async () => {
    await mount('/people', menus, true, [favorite]);
    expect(collapsed('Root')).toBe(false);
    expect(collapsed('Favorites')).toBe(true);
    expect(activeKeys()).toEqual(['favorites:id:active', 'main:id:active']);
    header('Favorites').click();
    await settle();
    expect(JSON.parse(localStorage.getItem(key)!).expanded['favorites:group']).toBe(true);
    fixture.destroy();
    await mount('/people', [], true, [favorite]);
    expect(collapsed('Favorites')).toBe(false);
    expect(host.querySelector('.ih-sidebar-body')!.scrollTop).toBeGreaterThan(0);
    expect(activeKeys()).toEqual(['favorites:id:active']);
  });

  it('updates active Favorites as both sources hydrate and clears unmatched routes', async () => {
    await mount('/people', []);
    const favorites = new BehaviorSubject<IMenu[]>([]);
    fixture.componentRef.setInput('favoriteMode', true);
    fixture.componentRef.setInput('favorites$', favorites);
    await settle();
    favorites.next([{ ...favorite, id: 'pin' }]);
    await settle();
    expect(activeKeys()).toEqual(['favorites:id:pin']);
    source.next(menus);
    await settle();
    expect(activeKeys()).toEqual(['main:id:active']);
    favorites.next([{ ...favorite }]);
    await settle();
    expect(activeKeys()).toEqual(['favorites:id:active', 'main:id:active']);
    await router.navigateByUrl('/unknown');
    await settle();
    expect(activeKeys()).toEqual([]);
    expect(host.querySelector('[aria-current]')).toBeNull();
  });

  for (const [navigation, options] of [
    ['is-spa', {}],
    ['is-reload', { reload: true }],
    ['is-new-tab', { openIn: 'NEW_TAB' }],
  ] as const) {
    it(`marks active ${navigation} anchors`, async () => {
      await mount('/people', [{ ...favorite, ...options }]);
      const row = host.querySelector(`a.${navigation}`)!;
      expect(row.classList.contains('is-active')).toBe(true);
      expect(row.getAttribute('aria-current')).toBe('page');
    });
  }

  it('applies custom/null keys without changing the default preference', async () => {
    await mount('/unknown');
    fixture.componentRef.setInput('menuStateStorageKey', null);
    await settle();
    expect(collapsed('Root')).toBe(false);
    header('Root').click();
    await settle();
    expect(JSON.parse(localStorage.getItem(key)!).expanded['main:id:root']).toBe(false);
    fixture.componentRef.setInput('menuStateStorageKey', 'sidebar-menu-custom-test');
    await settle();
    expect(collapsed('Root')).toBe(false);
    header('Root').click();
    await settle();
    expect(
      JSON.parse(localStorage.getItem('sidebar-menu-custom-test')!).expanded['main:id:root'],
    ).toBe(false);
  });

  it('uses the final route after an initial redirect', async () => {
    await mount('/start');
    expect(router.url).toBe('/people');
    expect(activeKeys()).toEqual(['main:id:active']);
    expect(collapsed('Root')).toBe(false);
    expect(host.querySelector('.is-selected')).toBeNull();
  });

  it('unsubscribes from menu hydration and cancels render callbacks on destroy', async () => {
    await mount('/people', []);
    expect(source.observed).toBe(true);
    const frames = spyOn(window, 'requestAnimationFrame').and.callThrough();
    fixture.destroy();
    source.next(menus);
    expect(source.observed).toBe(false);
    expect(frames).not.toHaveBeenCalled();
  });

  describe('search input', () => {
    beforeEach(async () => {
      await mount('/unknown?tab=edit#details');
      spyOn(HTMLElement.prototype, 'scrollIntoView').and.stub();
    });

    it('debounces filtering and router updates without projecting menus per keystroke', fakeAsync(() => {
      const filtered = spyOn(SidebarSearchState.prototype, 'filter').and.callThrough();
      const projected = spyOn(SidebarMenuState.prototype, 'project').and.callThrough();
      const navigate = spyOn(router, 'navigate').and.callThrough();
      const input = host.querySelector<HTMLInputElement>('.ih-sidebar-search input')!;
      for (const value of ['p', 'pa', 'page']) {
        input.value = value;
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
      expect(input.value).toBe('page');
      fixture.detectChanges();
      tick(199);
      expect(filtered).not.toHaveBeenCalled();
      expect(projected).not.toHaveBeenCalled();
      expect(navigate).not.toHaveBeenCalled();
      tick(1);
      fixture.detectChanges();
      expect(filtered).toHaveBeenCalledTimes(1);
      expect(projected).not.toHaveBeenCalled();
      expect(navigate).toHaveBeenCalledTimes(1);
      expect(navigate.calls.mostRecent().args[1]?.replaceUrl).toBe(true);
      expect(router.url).toBe('/unknown?tab=edit&menu-filter=page#details');
      fixture.componentInstance.menuSearch.setValue(' page ');
      tick(200);
      expect(filtered).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledTimes(1);
      tick(16);
    }));

    it('preserves temporary collapse through hydration and restores state on clear', fakeAsync(() => {
      const before = localStorage.getItem(key);
      const original = structuredClone(menus);
      const sidebar = fixture.componentInstance;
      sidebar.menuSearch.setValue('page');
      tick(200);
      fixture.detectChanges();
      expect(collapsed('Root')).toBe(false);
      expect(collapsed('Nested')).toBe(false);
      header('Nested').click();
      fixture.detectChanges();
      expect(collapsed('Nested')).toBe(true);
      source.next(structuredClone(menus));
      fixture.detectChanges();
      expect(collapsed('Nested')).toBe(true);
      sidebar.onSearchKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      fixture.detectChanges();
      expect(sidebar.selectedMenuId()).toBe('other-page');
      header('Other').click();
      fixture.detectChanges();
      expect(sidebar.selectedMenuId()).toBeNull();
      header('Root').click();
      fixture.detectChanges();
      expect(collapsed('Root')).toBe(true);
      sidebar.menuSearch.setValue('Root');
      tick(200);
      fixture.detectChanges();
      expect(collapsed('Root')).toBe(false);
      expect(collapsed('Nested')).toBe(false);
      sidebar.menuSearch.setValue('');
      tick(200);
      fixture.detectChanges();
      expect(collapsed('Root')).toBe(true);
      expect(collapsed('Nested')).toBe(true);
      expect(localStorage.getItem(key)).toBe(before);
      expect(menus).toEqual(original);
      expect(router.url).toBe('/unknown?tab=edit#details');
      tick(16);
    }));

    it('flushes the current term for keyboard navigation without activating an old selection', fakeAsync(() => {
      const sidebar = fixture.componentInstance;
      sidebar.menuSearch.setValue('page');
      sidebar.onSearchKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      tick();
      fixture.detectChanges();
      expect(sidebar.selectedMenuId()).toBe('active');
      sidebar.menuSearch.setValue('Other');
      expect(sidebar.selectedMenuId()).toBeNull();
      sidebar.onSearchKeyDown(new KeyboardEvent('keydown', { key: 'Enter' }));
      tick();
      fixture.detectChanges();
      expect(router.url.split('?')[0]).toBe('/unknown');
      expect(sidebar.selectedMenuId()).toBeNull();
      sidebar.onSearchKeyDown(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      sidebar.onSearchKeyDown(new KeyboardEvent('keydown', { key: 'Enter' }));
      tick();
      expect(router.url).toContain('/other?');
      expect(router.url).toContain('menu-filter=Other');
      tick(16);
    }));

    it('cancels pending work on page navigation and destroy', fakeAsync(() => {
      const sidebar = fixture.componentInstance;
      sidebar.menuSearch.setValue('page');
      void router.navigateByUrl('/other');
      tick();
      fixture.detectChanges();
      const filtered = spyOn(SidebarSearchState.prototype, 'filter').and.callThrough();
      tick(200);
      expect(sidebar.menuSearch.value).toBe('');
      expect(router.url).toBe('/other');
      expect(filtered).not.toHaveBeenCalled();
      sidebar.menuSearch.setValue('page');
      fixture.destroy();
      tick(200);
      expect(filtered).not.toHaveBeenCalled();
    }));
  });
});
