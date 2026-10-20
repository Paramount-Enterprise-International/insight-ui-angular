import { provideHttpClient } from '@angular/common/http';
import { NgZone } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import type { IMenu } from '../host.types';
import { IHSidebar } from './sidebar';

const storageKey = 'insight.sidebar.width';

describe('IHSidebar resize integration', () => {
  let fixture: ComponentFixture<IHSidebar>;
  let host: HTMLElement;
  let handle: HTMLElement;
  let saved: string | null;
  let commits: number[];
  let frames: Map<number, FrameRequestCallback>;
  let requestFrame: typeof window.requestAnimationFrame;
  let cancelFrame: typeof window.cancelAnimationFrame;

  function flushFrames(): void {
    const callbacks = [...frames.values()];
    frames.clear();
    TestBed.inject(NgZone).runOutsideAngular(() => {
      for (const callback of callbacks) callback(0);
    });
  }

  function keyboard(name: string): void {
    handle.dispatchEvent(
      new KeyboardEvent('keydown', { key: name, bubbles: true, cancelable: true }),
    );
    fixture.detectChanges();
  }

  function pointer(target: EventTarget, type: string, x: number): void {
    target.dispatchEvent(
      new PointerEvent(type, {
        pointerId: 1,
        isPrimary: true,
        clientX: x,
        button: 0,
        bubbles: true,
        cancelable: true,
      }),
    );
  }

  function mount(resizable = true, menus: IMenu[] = []): void {
    fixture = TestBed.createComponent(IHSidebar);
    fixture.componentRef.setInput('resizable', resizable);
    fixture.componentRef.setInput('menusInput$', of(menus));
    fixture.componentRef.setInput('menuStateStorageKey', null);
    fixture.componentRef.setInput('user$', of(null));
    commits = [];
    fixture.componentInstance.onWidthChange.subscribe((width) => commits.push(width));
    host = fixture.nativeElement as HTMLElement;
    host.style.setProperty('--i-sidebar-width', '260px');
    fixture.detectChanges();
    handle = host.querySelector<HTMLElement>('.ih-sidebar-resize-handle')!;
  }

  beforeEach(async () => {
    requestFrame = window.requestAnimationFrame;
    cancelFrame = window.cancelAnimationFrame;
    frames = new Map();
    let frameId = 0;
    window.requestAnimationFrame = (callback) => {
      frames.set(++frameId, callback);
      return frameId;
    };
    window.cancelAnimationFrame = (id) => {
      frames.delete(id);
    };
    saved = localStorage.getItem(storageKey);
    localStorage.removeItem(storageKey);
    await TestBed.configureTestingModule({
      imports: [IHSidebar],
      providers: [provideRouter([]), provideHttpClient()],
    }).compileComponents();
  });

  afterEach(() => {
    fixture?.destroy();
    window.requestAnimationFrame = requestFrame;
    window.cancelAnimationFrame = cancelFrame;
    if (saved === null) localStorage.removeItem(storageKey);
    else localStorage.setItem(storageKey, saved);
  });

  it('exposes a focusable separator and emits the committed width', () => {
    mount();
    expect(handle.getAttribute('role')).toBe('separator');
    expect(handle.getAttribute('aria-label')).toBe('Resize sidebar');
    expect(handle.getAttribute('aria-orientation')).toBe('vertical');
    expect(handle.tabIndex).toBe(0);
    expect(handle.getAttribute('aria-valuemin')).toBe('220');
    expect(handle.getAttribute('aria-valuemax')).toBe('480');
    keyboard('ArrowRight');
    expect(handle.getAttribute('aria-valuenow')).toBe('270');
    expect(host.style.getPropertyValue('--i-sidebar-width')).toBe('270px');
    expect(commits).toEqual([270]);
    expect(localStorage.getItem(storageKey)).toBe('270');
  });

  it('ignores persisted width when disabled and restores it after enabling', () => {
    localStorage.setItem(storageKey, '400');
    mount(false);
    expect(host.classList.contains('is-resizable')).toBe(false);
    expect(handle.hidden).toBe(true);
    expect(handle.tabIndex).toBe(-1);
    keyboard('End');
    expect(host.style.getPropertyValue('--i-sidebar-width')).toBe('260px');
    expect(commits).toEqual([]);
    fixture.componentRef.setInput('resizable', true);
    fixture.detectChanges();
    expect(handle.hidden).toBe(false);
    expect(host.classList.contains('is-resizable')).toBe(true);
    expect(handle.getAttribute('aria-valuenow')).toBe('400');
  });

  it('cancels drag on hide, retains committed width on show and updates bounds', () => {
    mount();
    keyboard('ArrowRight');
    pointer(handle, 'pointerdown', 0);
    pointer(document, 'pointermove', 80);
    flushFrames();
    expect(handle.getAttribute('aria-valuenow')).toBe('350');
    fixture.componentRef.setInput('visible', false);
    fixture.detectChanges();
    expect(host.classList.contains('hidden')).toBe(true);
    expect(handle.hidden).toBe(true);
    expect(handle.tabIndex).toBe(-1);
    fixture.componentRef.setInput('visible', true);
    fixture.componentRef.setInput('minWidth', 250);
    fixture.componentRef.setInput('maxWidth', 400);
    fixture.detectChanges();
    expect(handle.getAttribute('aria-valuenow')).toBe('270');
    expect(handle.getAttribute('aria-valuemin')).toBe('250');
    expect(handle.getAttribute('aria-valuemax')).toBe('400');
    keyboard('End');
    expect(commits).toEqual([270, 400]);
  });

  it('updates width and ARIA without entering Angular or checking the menu tree during drag', () => {
    const menus: IMenu[] = [{
      id: 'root', name: 'Root', type: 'group', children: [{
        id: 'nested', name: 'Nested', type: 'group',
        children: Array.from({ length: 1000 }, (_, index) => ({
          id: `page-${index}`, name: `Long menu label ${index}`, type: 'item' as const,
          route: `/page-${index}`,
        })),
      }],
    }];
    mount(true, menus);
    flushFrames();
    fixture.detectChanges();
    const checks = spyOn(fixture.componentInstance, 'buildMenuGroups').and.callThrough();
    const unstable = jasmine.createSpy('unstable');
    const subscription = TestBed.inject(NgZone).onUnstable.subscribe(unstable);
    const committedInAngular: boolean[] = [];
    fixture.componentInstance.onWidthChange.subscribe(() => {
      committedInAngular.push(NgZone.isInAngularZone());
    });
    try {
      pointer(handle, 'pointerdown', 0);
      checks.calls.reset();
      unstable.calls.reset();
      pointer(document, 'pointermove', 40);
      pointer(document, 'pointermove', 100);
      flushFrames();
      expect(handle.getAttribute('aria-valuenow')).toBe('360');
      expect(host.style.getPropertyValue('--i-sidebar-width')).toBe('360px');
      expect(host.querySelectorAll('.ih-menu-indent').length).toBe(1000);
      expect(checks).not.toHaveBeenCalled();
      expect(unstable).not.toHaveBeenCalled();
      expect(commits).toEqual([]);
      pointer(document, 'pointermove', 120);
      pointer(document, 'pointerup', 120);
      expect(handle.getAttribute('aria-valuenow')).toBe('380');
      expect(commits).toEqual([380]);
      expect(committedInAngular).toEqual([true]);
    } finally {
      subscription.unsubscribe();
    }
  });

  it('removes the resize gutter class and cancels pending movement when disabled', () => {
    mount();
    pointer(handle, 'pointerdown', 0);
    pointer(document, 'pointermove', 100);
    fixture.componentRef.setInput('resizable', false);
    fixture.detectChanges();
    flushFrames();
    expect(host.classList.contains('is-resizable')).toBe(false);
    expect(handle.hidden).toBe(true);
    expect(handle.getAttribute('aria-valuenow')).toBe('260');
    expect(commits).toEqual([]);
  });

  it('removes drag listeners on destroy without saving a partial width', () => {
    mount();
    pointer(handle, 'pointerdown', 0);
    pointer(document, 'pointermove', 40);
    fixture.destroy();
    flushFrames();
    expect(document.documentElement.classList.contains('ih-sidebar-resizing')).toBe(false);
    document.dispatchEvent(new PointerEvent('pointerup', { pointerId: 1 }));
    expect(localStorage.getItem(storageKey)).toBeNull();
    expect(commits).toEqual([]);
  });
});
