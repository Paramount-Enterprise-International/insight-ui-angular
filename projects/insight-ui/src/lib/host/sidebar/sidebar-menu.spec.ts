import { APP_BASE_HREF } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import type { IMenu } from '../host.types';
import { IHSidebar } from './sidebar';

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

  function header(name: string): HTMLElement {
    return [...host.querySelectorAll<HTMLElement>('.ih-menu-group')].find(
      (element) => element.querySelector('h6')?.textContent === name,
    )!;
  }

  function collapsed(name: string): boolean {
    return header(name).parentElement!.querySelector('ul')!.classList.contains('collapsed');
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
    expect(host.contains(document.activeElement)).toBe(false);
    expect(localStorage.getItem(key)).toBe(before);
    expect(menus[0].visibility).toBeUndefined();
  });

  it('restores an already visible active row 16px below the top after refresh', async () => {
    activeRowTop = 180;
    await mount();
    expect(host.querySelector('.ih-sidebar-body')!.scrollTop).toBe(64);
  });

  it('persists nested choices through remount, new references and empty hydration', async () => {
    await mount('/unknown');
    header('Root').click();
    await settle();
    header('Nested').click();
    await settle();
    expect(collapsed('Nested')).toBe(false);
    source.next([]);
    await settle();
    source.next(structuredClone(menus));
    await settle();
    expect(collapsed('Nested')).toBe(false);
    fixture.destroy();
    await mount('/unknown');
    expect(collapsed('Root')).toBe(false);
    expect(collapsed('Nested')).toBe(false);
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
    await router.navigateByUrl('/people');
    await settle();
    expect(collapsed('Root')).toBe(true);
  });

  it('preserves a hiding search filter and waits until it is cleared before scrolling', async () => {
    await mount('/people?menu-filter=Other&tab=edit');
    expect(fixture.componentInstance.menuSearch.value).toBe('Other');
    expect(host.querySelector('a[data-sidebar-menu-key="main:id:active"]')).toBeNull();
    expect(host.querySelector('.ih-sidebar-body')!.scrollTop).toBe(0);
    expect(router.url).toContain('menu-filter=Other');
    const search = host.querySelector<HTMLInputElement>('.ih-sidebar-search input')!;
    search.focus();
    fixture.componentInstance.menuSearch.setValue('');
    await settle();
    expect(host.querySelector('.ih-sidebar-body')!.scrollTop).toBeGreaterThan(0);
    expect(document.activeElement).toBe(search);
    expect(router.url).toContain('tab=edit');
    expect(collapsed('Root')).toBe(false);
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
  });

  it('persists Favorites separately, prefers the main tree and supports a favorites-only target', async () => {
    await mount('/people', menus, true, [favorite]);
    expect(collapsed('Root')).toBe(false);
    expect(collapsed('Favorites')).toBe(true);
    header('Favorites').click();
    await settle();
    expect(JSON.parse(localStorage.getItem(key)!).expanded['favorites:group']).toBe(true);
    fixture.destroy();
    await mount('/people', [], true, [favorite]);
    expect(collapsed('Favorites')).toBe(false);
    expect(host.querySelector('.ih-sidebar-body')!.scrollTop).toBeGreaterThan(0);
  });

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
});
