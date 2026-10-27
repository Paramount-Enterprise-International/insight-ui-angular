import { Component, PLATFORM_ID } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  flushMicrotasks,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ISnackbar } from './snackbar';
import { ISnackbarService } from './snackbar-service';
import type { ISnackbarPosition } from './snackbar.types';

const card = (id: string): HTMLElement => document.querySelector(`[data-snackbar-id="${id}"]`)!;
const positions: ISnackbarPosition[] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];

@Component({
  imports: [ISnackbar],
  template:
    '<i-snackbar id="projected" title="Title" [durationMs]="0"><strong>Content</strong></i-snackbar>',
})
class ProjectedSnackbar {}

describe('ISnackbar', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [ISnackbar, ProjectedSnackbar] }));
  afterEach(() => TestBed.resetTestingModule());

  function create(inputs: Record<string, unknown> = {}): ComponentFixture<ISnackbar> {
    const fixture = TestBed.createComponent(ISnackbar);
    for (const [key, value] of Object.entries({
      id: 'test',
      message: 'Message',
      durationMs: 0,
      ...inputs,
    }))
      fixture.componentRef.setInput(key, value);
    fixture.detectChanges();
    flushMicrotasks();
    fixture.detectChanges();
    return fixture;
  }

  for (const position of positions)
    it(`portals text at ${position} without moving focus`, fakeAsync(() => {
      const trigger = document.createElement('button');
      document.body.appendChild(trigger);
      trigger.focus();
      const fixture = create({ position, message: '<b>literal</b>' });
      expect(card('test').parentElement?.getAttribute('data-i-snackbar-viewport')).toBe(position);
      expect(card('test').querySelector('b')).toBeNull();
      expect(card('test').textContent).toContain('<b>literal</b>');
      expect(document.activeElement).toBe(trigger);
      fixture.destroy();
      trigger.remove();
      flush();
      expect(document.querySelector('[data-i-snackbar-viewport]')).toBeNull();
    }));

  for (const variant of ['neutral', 'primary', 'info', 'success', 'warning', 'danger'])
    it(`uses the ${variant} banner surface and one announcement`, fakeAsync(() => {
      const fixture = create({ variant, prefixIcon: 'info', suffixIcon: 'sync' });
      const surface = card('test').querySelector('i-banner')!;
      expect(surface.getAttribute('variant')).toBe(variant);
      expect(surface.getAttribute('role')).toBe(variant === 'danger' ? 'alert' : 'status');
      expect(surface.getAttribute('aria-live')).toBe(variant === 'danger' ? 'assertive' : 'polite');
      expect(card('test').querySelectorAll('[aria-live]').length).toBe(1);
      fixture.destroy();
      flush();
    }));

  it('supports projected content and hides empty or initially closed messages', fakeAsync(() => {
    const projected = TestBed.createComponent(ProjectedSnackbar);
    projected.detectChanges();
    flushMicrotasks();
    projected.detectChanges();
    expect(card('projected').querySelector('strong')?.textContent).toBe('Content');
    const empty = create({ message: '  ' });
    expect(card('test')).toBeNull();
    empty.destroy();
    const closed = create({ defaultOpen: false });
    expect(card('test')).toBeNull();
    closed.destroy();
    projected.destroy();
    flush();
  }));

  it('pauses overlapping hover/focus/hidden reasons and resumes the remaining duration', fakeAsync(() => {
    const fixture = create({ durationMs: 1000 });
    const done = jasmine.createSpy('done');
    fixture.componentInstance.afterDismissed.subscribe(done);
    tick(400);
    card('test').dispatchEvent(new MouseEvent('mouseenter'));
    const close = card('test').querySelector<HTMLButtonElement>('button')!;
    close.focus();
    tick(2000);
    card('test').dispatchEvent(new MouseEvent('mouseleave'));
    tick(2000);
    expect(done).not.toHaveBeenCalled();
    const visibility = spyOnProperty(document, 'visibilityState', 'get').and.returnValue('hidden');
    document.dispatchEvent(new Event('visibilitychange'));
    close.blur();
    tick(2000);
    visibility.and.returnValue('visible');
    document.dispatchEvent(new Event('visibilitychange'));
    tick(599);
    expect(card('test')).not.toBeNull();
    tick(181);
    expect(done).toHaveBeenCalledOnceWith('timeout');
    expect(card('test')).toBeNull();
    fixture.destroy();
    flush();
  }));

  it('keeps persistent messages and non-dismissing actions until explicitly closed', fakeAsync(() => {
    const fixture = create({
      actionLabel: 'Reload',
      dismissOnAction: false,
      closable: false,
      dismissOnEscape: false,
    });
    const action = jasmine.createSpy('action');
    fixture.componentInstance.onAction.subscribe(action);
    const button = card('test').querySelector<HTMLButtonElement>('i-button button')!;
    tick(60_000);
    button.click();
    expect(action).toHaveBeenCalledTimes(1);
    button.focus();
    button.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    tick(1000);
    expect(card('test')).not.toBeNull();
    expect(card('test').querySelector('.i-banner__close')).toBeNull();
    fixture.destroy();
    flush();
  }));

  it('blocks disabled actions and closes by focused Escape exactly once', fakeAsync(() => {
    const fixture = create({ actionLabel: 'Undo', actionDisabled: true });
    const action = jasmine.createSpy('action');
    const done = jasmine.createSpy('done');
    fixture.componentInstance.onAction.subscribe(action);
    fixture.componentInstance.afterDismissed.subscribe(done);
    card('test').querySelector<HTMLButtonElement>('i-button button')!.click();
    expect(action).not.toHaveBeenCalled();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(done).not.toHaveBeenCalled();
    const close = card('test').querySelector<HTMLButtonElement>('.i-banner__close')!;
    close.focus();
    close.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    tick(180);
    expect(done).toHaveBeenCalledOnceWith('escape');
    fixture.destroy();
    flush();
  }));

  it('waits for controlled open changes and can reopen during an exit', fakeAsync(() => {
    const fixture = create({ open: true, durationMs: 100 });
    const request = jasmine.createSpy('request');
    const done = jasmine.createSpy('done');
    fixture.componentInstance.openChange.subscribe(request);
    fixture.componentInstance.afterDismissed.subscribe(done);
    tick(100);
    expect(request).toHaveBeenCalledOnceWith(false);
    expect(card('test')).not.toBeNull();
    fixture.componentRef.setInput('open', false);
    fixture.detectChanges();
    tick(50);
    fixture.componentRef.setInput('open', true);
    fixture.componentRef.setInput('durationMs', 0);
    fixture.detectChanges();
    tick(1000);
    expect(card('test')).not.toBeNull();
    expect(done).not.toHaveBeenCalled();
    fixture.destroy();
    flush();
  }));

  it('cancels work on destroy without emitting a dismissal', fakeAsync(() => {
    const fixture = create({ durationMs: 100 });
    const done = jasmine.createSpy('done');
    fixture.componentInstance.afterDismissed.subscribe(done);
    fixture.destroy();
    tick(1000);
    expect(done).not.toHaveBeenCalled();
    expect(document.querySelector('[data-i-snackbar-viewport]')).toBeNull();
    flush();
  }));

  it('supports SSR without mounting a viewport', fakeAsync(() => {
    TestBed.overrideProvider(PLATFORM_ID, { useValue: 'server' });
    const fixture = create();
    expect(document.querySelector('[data-i-snackbar-viewport]')).toBeNull();
    const done = jasmine.createSpy('done');
    TestBed.inject(ISnackbarService).show('Server').afterDismissed().subscribe(done);
    expect(done).toHaveBeenCalledOnceWith('programmatic');
    fixture.destroy();
    flush();
  }));
});

describe('ISnackbarService', () => {
  afterEach(() => TestBed.resetTestingModule());

  it('rechecks the bottom after repeated six-theme bursts finish rendering', fakeAsync(() => {
    let frame: FrameRequestCallback | undefined;
    const schedule = spyOn(window, 'requestAnimationFrame').and.callFake((callback) => {
      frame = callback;
      return 7;
    });
    spyOn(window, 'cancelAnimationFrame').and.stub();
    const service = TestBed.inject(ISnackbarService);
    const variants = ['neutral', 'primary', 'success', 'info', 'warning', 'danger'] as const;
    const burst = (offset: number): void => {
      variants.forEach((variant, index) =>
        service.show(variant, {
          id: `theme-${offset + index}`,
          variant,
          durationMs: 0,
        }),
      );
      flushMicrotasks();
    };
    burst(0);
    const viewport = card('theme-0').parentElement!;
    let height = 300;
    Object.defineProperties(viewport, {
      scrollHeight: { configurable: true, get: () => height },
      scrollTop: { configurable: true, writable: true, value: 0 },
    });
    frame!(0);
    tick(100);
    burst(6);
    height = 600;
    frame!(100);
    height = 1400;
    tick(199);
    expect(schedule).toHaveBeenCalledTimes(2);
    expect(viewport.scrollTop).toBe(600);
    tick(1);
    expect(schedule).toHaveBeenCalledTimes(3);
    frame!(300);
    expect(viewport.scrollTop).toBe(1400);
    burst(12);
    TestBed.resetTestingModule();
    const calls = schedule.calls.count();
    tick(1000);
    expect(schedule.calls.count()).toBe(calls);
    expect(document.querySelector('[data-i-snackbar-viewport]')).toBeNull();
    flush();
  }));

  for (const position of positions)
    it(`reveals the latest rendered content at ${position} without changing focus`, fakeAsync(() => {
      let frame: FrameRequestCallback | undefined;
      const schedule = spyOn(window, 'requestAnimationFrame').and.callFake((callback) => {
        frame = callback;
        return 7;
      });
      spyOn(window, 'cancelAnimationFrame').and.stub();
      const trigger = document.createElement('button');
      document.body.appendChild(trigger);
      trigger.focus();
      const service = TestBed.inject(ISnackbarService);
      service.show('Older', { id: 'older', position, durationMs: 0 });
      flushMicrotasks();
      const viewport = card('older').parentElement!;
      let height = 300;
      Object.defineProperties(viewport, {
        scrollHeight: { configurable: true, get: () => height },
        scrollTop: { configurable: true, writable: true, value: 80 },
      });
      service.show('Newest', { id: 'newest', position, durationMs: 0 });
      flushMicrotasks();
      height = 900;
      expect(viewport.scrollTop).toBe(80);
      expect(schedule).toHaveBeenCalledTimes(1);
      frame!(0);
      expect(viewport.scrollTop).toBe(position.startsWith('top-') ? 0 : 900);
      service.update('newest', { message: 'Updated notification summary' });
      flushMicrotasks();
      height = 1400;
      frame!(16);
      expect(viewport.scrollTop).toBe(position.startsWith('top-') ? 0 : 1400);
      expect(document.activeElement).toBe(trigger);
      service.dismissAll();
      tick(180);
      trigger.remove();
      flush();
    }));

  it('only scrolls queued content when admitted and cancels pending scroll work on destroy', fakeAsync(() => {
    let frame: FrameRequestCallback | undefined;
    const schedule = spyOn(window, 'requestAnimationFrame').and.callFake((callback) => {
      frame = callback;
      return 7;
    });
    const cancel = spyOn(window, 'cancelAnimationFrame').and.stub();
    const service = TestBed.inject(ISnackbarService);
    service.configure({ maxVisible: 1 });
    service.show('First', { id: 'first', durationMs: 0 });
    service.show('Queued', { id: 'queued', durationMs: 0 });
    flushMicrotasks();
    frame!(0);
    service.update('queued', { message: 'Still waiting' });
    flushMicrotasks();
    expect(schedule).toHaveBeenCalledTimes(1);
    service.dismiss('first');
    tick(180);
    expect(card('queued').hidden).toBeFalse();
    expect(schedule).toHaveBeenCalledTimes(2);
    TestBed.resetTestingModule();
    expect(cancel).toHaveBeenCalledWith(7);
    flush();
  }));

  it('can update a message while its dismissal transition is pending', fakeAsync(() => {
    const service = TestBed.inject(ISnackbarService);
    const ref = service.show('Initial', { id: 'reopen', durationMs: 0 });
    const done = jasmine.createSpy('done');
    ref.afterDismissed().subscribe(done);
    service.dismiss('reopen');
    tick(50);
    expect(service.show('Reopened', { id: 'reopen', durationMs: 0 })).toBe(ref);
    flushMicrotasks();
    tick(1000);
    expect(card('reopen').textContent).toContain('Reopened');
    expect(done).not.toHaveBeenCalled();
    service.dismissAll();
    tick(180);
    flush();
  }));

  it('upserts IDs, moves positions, and leaves other IDs intact', fakeAsync(() => {
    const service = TestBed.inject(ISnackbarService);
    const first = service.show('First', { id: 'first', durationMs: 0 });
    service.show('Other', { id: 'other', durationMs: 0 });
    flushMicrotasks();
    expect(service.show('Updated', { id: 'first', durationMs: 0, position: 'top-center' })).toBe(
      first,
    );
    flushMicrotasks();
    expect(document.querySelectorAll('[data-snackbar-id="first"]').length).toBe(1);
    expect(card('first').textContent).toContain('Updated');
    expect(card('first').parentElement?.getAttribute('data-i-snackbar-viewport')).toBe(
      'top-center',
    );
    const done = jasmine.createSpy('done');
    first.afterDismissed().subscribe(done);
    first.dismiss();
    tick(180);
    expect(done).toHaveBeenCalledOnceWith('programmatic');
    expect(card('other')).not.toBeNull();
    service.dismissAll();
    tick(180);
    flush();
  }));

  it('queues FIFO per position and starts duration on admission', fakeAsync(() => {
    const service = TestBed.inject(ISnackbarService);
    service.configure({ maxVisible: 1 });
    service.show('First', { id: 'first', durationMs: 0 });
    service.show('Queued', { id: 'queued', durationMs: 1000 });
    service.show('Top', { id: 'top', durationMs: 0, position: 'top-right' });
    flushMicrotasks();
    expect(card('queued').hidden).toBeTrue();
    expect(card('top').hidden).toBeFalse();
    tick(5000);
    expect(card('queued')).not.toBeNull();
    service.dismiss('first');
    tick(180);
    expect(card('queued').hidden).toBeFalse();
    tick(999);
    expect(card('queued')).not.toBeNull();
    tick(181);
    expect(card('queued')).toBeNull();
    service.show('A', { id: 'a', durationMs: 0 });
    service.show('B', { id: 'b', durationMs: 0 });
    flushMicrotasks();
    expect(card('b').hidden).toBeTrue();
    service.configure({});
    TestBed.flushEffects();
    expect(card('b').hidden).toBeFalse();
    service.dismissAll();
    tick(180);
    flush();
  }));

  it('places the newest card nearest the chosen edge', fakeAsync(() => {
    const service = TestBed.inject(ISnackbarService);
    service.show('Older top', { id: 't1', durationMs: 0, position: 'top-left' });
    service.show('Newer top', { id: 't2', durationMs: 0, position: 'top-left' });
    service.show('Older bottom', { id: 'b1', durationMs: 0 });
    service.show('Newer bottom', { id: 'b2', durationMs: 0 });
    flushMicrotasks();
    expect(card('t1').parentElement!.firstElementChild).toBe(card('t2'));
    expect(card('b1').parentElement!.lastElementChild).toBe(card('b2'));
    service.dismissAll();
    tick(180);
    flush();
  }));
});
