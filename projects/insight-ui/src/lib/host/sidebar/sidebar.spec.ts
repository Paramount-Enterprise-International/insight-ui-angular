import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { IHSidebar } from './sidebar';

const storageKey = 'insight.sidebar.width';

describe('IHSidebar resize integration', () => {
  let fixture: ComponentFixture<IHSidebar>;
  let host: HTMLElement;
  let handle: HTMLElement;
  let saved: string | null;
  let commits: number[];

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
    fixture.detectChanges();
  }

  function mount(resizable = true): void {
    fixture = TestBed.createComponent(IHSidebar);
    fixture.componentRef.setInput('resizable', resizable);
    fixture.componentRef.setInput('menusInput$', of([]));
    fixture.componentRef.setInput('user$', of(null));
    commits = [];
    fixture.componentInstance.onWidthChange.subscribe((width) => commits.push(width));
    host = fixture.nativeElement as HTMLElement;
    host.style.setProperty('--i-sidebar-width', '260px');
    fixture.detectChanges();
    handle = host.querySelector<HTMLElement>('.ih-sidebar-resize-handle')!;
  }

  beforeEach(async () => {
    saved = localStorage.getItem(storageKey);
    localStorage.removeItem(storageKey);
    await TestBed.configureTestingModule({
      imports: [IHSidebar],
      providers: [provideRouter([]), provideHttpClient()],
    }).compileComponents();
  });

  afterEach(() => {
    fixture?.destroy();
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
    expect(handle.hidden).toBe(true);
    expect(handle.tabIndex).toBe(-1);
    keyboard('End');
    expect(host.style.getPropertyValue('--i-sidebar-width')).toBe('260px');
    expect(commits).toEqual([]);
    fixture.componentRef.setInput('resizable', true);
    fixture.detectChanges();
    expect(handle.hidden).toBe(false);
    expect(handle.getAttribute('aria-valuenow')).toBe('400');
  });

  it('cancels drag on hide, retains committed width on show and updates bounds', () => {
    mount();
    keyboard('ArrowRight');
    pointer(handle, 'pointerdown', 0);
    pointer(document, 'pointermove', 80);
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

  it('removes drag listeners on destroy without saving a partial width', () => {
    mount();
    pointer(handle, 'pointerdown', 0);
    pointer(document, 'pointermove', 40);
    fixture.destroy();
    expect(document.documentElement.classList.contains('ih-sidebar-resizing')).toBe(false);
    document.dispatchEvent(new PointerEvent('pointerup', { pointerId: 1 }));
    expect(localStorage.getItem(storageKey)).toBeNull();
    expect(commits).toEqual([]);
  });
});
