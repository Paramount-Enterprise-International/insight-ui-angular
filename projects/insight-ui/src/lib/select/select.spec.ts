import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { IFCSelect, ISelect, ISelectChange } from './select';

@Component({
  standalone: true,
  imports: [IFCSelect],
  template: `<i-fc-select label="Pick" [options]="options" />`,
})
class SelectHost {
  options = ['A', 'B'];
}

@Component({
  standalone: true,
  imports: [ISelect],
  template: `<i-select [options]="options" />`,
})
class LongSelectHost {
  options = ['A'.repeat(500), 'B'];
}

@Component({
  standalone: true,
  imports: [ISelect],
  template: `<i-select [matchTriggerWidth]="true" [options]="options" />`,
})
class MatchedWidthSelectHost {
  options = ['A'.repeat(500), 'B'];
}

@Component({
  standalone: true,
  imports: [ISelect, IFCSelect, ReactiveFormsModule],
  template: `
    @if (wrapped) {
      <i-fc-select [filterDelay]="delay" [filterPredicate]="predicate" [formControl]="control"
        [options]="options" [options$]="source"
        [portalToBody]="false" (onChanged)="changes.push($event)" />
    } @else {
      <i-select [filterDelay]="delay" [filterPredicate]="predicate" [formControl]="control"
        [options]="options" [options$]="source"
        [portalToBody]="false" (onChanged)="changes.push($event)" />
    }
  `,
})
class SearchSelectHost {
  wrapped = false;
  options = ['jakarta', 'bandung', 'surabaya'];
  source: Subject<string[]> | null = null;
  control = new FormControl<string | null>(null);
  set value(value: string | null) {
    this.control.setValue(value);
  }
  set disabled(value: boolean) {
    if (value) this.control.disable();
    else this.control.enable();
  }
  delay = 200;
  predicate = (row: string, term: string): boolean => row.includes(term);
  changes: ISelectChange<string>[] = [];
}

describe('IFCSelect', () => {
  let fixture: ComponentFixture<SelectHost>;
  let longFixture: ComponentFixture<LongSelectHost> | undefined;
  let matchedWidthFixture: ComponentFixture<MatchedWidthSelectHost> | undefined;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectHost, LongSelectHost, MatchedWidthSelectHost],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectHost);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    longFixture?.destroy();
    matchedWidthFixture?.destroy();

    longFixture = undefined;
    matchedWidthFixture = undefined;

    document.body.querySelectorAll('i-options').forEach((el) => el.remove());
  });

  it('renders host and inner select', () => {
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('i-fc-select')).toBeTruthy();
    expect(host.querySelector('i-select')).toBeTruthy();
  });

  it('opens a content-sized portaled panel with very long option text', () => {
    longFixture = TestBed.createComponent(LongSelectHost);
    longFixture.detectChanges();

    const select = longFixture.debugElement.query(By.directive(ISelect))
      .componentInstance as ISelect<string>;

    const host = longFixture.nativeElement as HTMLElement;
    const input = host.querySelector('i-input') as HTMLElement;

    spyOn(input, 'getBoundingClientRect').and.returnValue({
      bottom: 52,
      height: 32,
      left: 12,
      right: 232,
      top: 20,
      width: 220,
      x: 12,
      y: 20,
      toJSON: () => ({}),
    } as DOMRect);

    (select as any).openDropdown();
    longFixture.detectChanges();

    const panel = document.body.querySelector('i-options') as HTMLElement | null;

    expect(panel).toBeTruthy();
    if (!panel) return;

    spyOn(panel, 'getBoundingClientRect').and.returnValue({
      bottom: 172,
      height: 120,
      left: 12,
      right: 232,
      top: 52,
      width: 220,
      x: 12,
      y: 52,
      toJSON: () => ({}),
    } as DOMRect);

    (select as any).repositionPanelNow();

    expect(select.isOpen).toBeTrue();
    expect(panel.classList.contains('i-options--portaled')).toBeTrue();
    expect(panel.style.position).toBe('fixed');
    expect(panel.style.width).toBe('max-content');
    expect(panel.style.minWidth).toBe('220px');
    expect(panel.style.overflowX).toBe('clip');
    expect(panel.style.overflowY).toBe('auto');
    expect(Number.parseFloat(panel.style.maxWidth)).toBeLessThanOrEqual(window.innerWidth - 16);
  });

  it('keeps exact trigger width when matchTriggerWidth is enabled', () => {
    matchedWidthFixture = TestBed.createComponent(MatchedWidthSelectHost);
    matchedWidthFixture.detectChanges();

    const select = matchedWidthFixture.debugElement.query(By.directive(ISelect))
      .componentInstance as ISelect<string>;

    const host = matchedWidthFixture.nativeElement as HTMLElement;
    const input = host.querySelector('i-input') as HTMLElement;

    spyOn(input, 'getBoundingClientRect').and.returnValue({
      bottom: 52,
      height: 32,
      left: 12,
      right: 232,
      top: 20,
      width: 220,
      x: 12,
      y: 20,
      toJSON: () => ({}),
    } as DOMRect);

    (select as any).openDropdown();
    matchedWidthFixture.detectChanges();

    const panel = document.body.querySelector('i-options') as HTMLElement | null;

    expect(panel).toBeTruthy();
    if (!panel) return;

    spyOn(panel, 'getBoundingClientRect').and.returnValue({
      bottom: 172,
      height: 120,
      left: 12,
      right: 232,
      top: 52,
      width: 220,
      x: 12,
      y: 52,
      toJSON: () => ({}),
    } as DOMRect);

    (select as any).repositionPanelNow();

    expect(panel.style.width).toBe('220px');
    expect(panel.style.minWidth).toBe('220px');
    expect(panel.style.overflowX).toBe('clip');
    expect(panel.style.overflowY).toBe('auto');
  });

  it('keeps the panel hidden until the second initial positioning frame', () => {
    const animationFrames: FrameRequestCallback[] = [];

    spyOn(window, 'requestAnimationFrame').and.callFake((callback) => {
      animationFrames.push(callback);
      return animationFrames.length;
    });

    longFixture = TestBed.createComponent(LongSelectHost);
    longFixture.detectChanges();

    const select = longFixture.debugElement.query(By.directive(ISelect))
      .componentInstance as ISelect<string>;

    (select as any).openDropdown();
    longFixture.detectChanges();

    const panel = document.body.querySelector('i-options') as HTMLElement | null;

    expect(panel).toBeTruthy();
    if (!panel) return;

    /*
     * Angular's own change-detection scheduler books a frame on the same global
     * rAF while the select opens. The select schedules its initial positioning
     * frame last, so only that frame is relevant for this assertion.
     */
    animationFrames.splice(0, Math.max(0, animationFrames.length - 1));

    expect(panel.style.visibility).toBe('hidden');
    expect(animationFrames.length).toBe(1);

    animationFrames.shift()?.(0);

    expect(panel.style.visibility).toBe('hidden');
    expect(animationFrames.length).toBe(1);

    animationFrames.shift()?.(16);

    expect(panel.style.visibility).toBe('visible');
  });
});

for (const wrapped of [false, true]) {
  describe(`${wrapped ? 'IFCSelect' : 'ISelect'} search`, () => {
    let fixture: ComponentFixture<SearchSelectHost>;
    let host: SearchSelectHost;
    let root: HTMLElement;
    let input: HTMLInputElement;

    beforeEach(() => {
      TestBed.configureTestingModule({ imports: [SearchSelectHost] });
      fixture = TestBed.createComponent(SearchSelectHost);
      host = fixture.componentInstance;
      host.wrapped = wrapped;
      fixture.detectChanges();
      root = fixture.nativeElement;
      input = root.querySelector('input')!;
    });

    afterEach(() => fixture.destroy());

    const labels = (): (string | null)[] =>
      Array.from(root.querySelectorAll('.i-option-label'), (el) => el.textContent);
    const type = (text: string): void => {
      input.value = text;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      fixture.detectChanges();
    };
    const key = (value: string): void => {
      input.dispatchEvent(new KeyboardEvent('keydown', { key: value, bubbles: true }));
      fixture.detectChanges();
    };
    const advance = (ms = 200): void => {
      tick(ms);
      fixture.detectChanges();
    };

    it('captures rapid typing and filters the complete first query', fakeAsync(() => {
      input.focus();
      for (let length = 1; length <= 'jakarta'.length; length++) {
        type('jakarta'.slice(0, length));
        expect(input.value).toBe('jakarta'.slice(0, length));
        expect(document.activeElement).toBe(input);
        expect(root.querySelector('i-loading')).toBeNull();
        advance(30);
      }
      expect(labels()).toEqual([]);
      advance();
      expect(input.value).toBe('jakarta');
      expect(labels()).toEqual(['jakarta']);
      expect(host.changes).toEqual([]);
      fixture.destroy();
    }));

    it('supports paused typing, backspace, clearing, paste and empty results', fakeAsync(() => {
      for (const [query, expected] of [
        ['ja', ['jakarta']],
        ['jak', ['jakarta']],
        ['j', ['jakarta']],
        ['', host.options],
        ['bandung', ['bandung']],
        ['missing', []],
      ] as const) {
        type(query);
        expect(input.value).toBe(query);
        advance();
        expect(labels()).toEqual(expected);
      }
      expect(input.getAttribute('aria-invalid')).toBe('true');
      fixture.destroy();
    }));

    it('uses current options and predicate without resetting a pending query', fakeAsync(() => {
      type('ja');
      advance();
      type('jakarta');
      advance(50);
      host.options = ['jakarta', 'jakarta barat', 'bandung'];
      host.predicate = (row, term): boolean => row === term;
      fixture.detectChanges();
      expect(input.value).toBe('jakarta');
      expect(labels()).toEqual([]);
      advance(150);
      expect(labels()).toEqual(['jakarta']);
      fixture.destroy();
    }));

    for (const action of ['escape', 'outside', 'select', 'reset', 'value', 'disabled']) {
      it(`invalidates a pending query after ${action}`, fakeAsync(() => {
        key('ArrowDown');
        if (action === 'reset') {
          type('missing');
          advance();
        }
        type('ja');
        if (action === 'escape') key('Escape');
        if (action === 'outside') document.body.click();
        if (action === 'select') {
          root.querySelector('.i-option')!.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        }
        if (action === 'reset') (root.querySelector('i-input-addon button') as HTMLElement).click();
        if (action === 'value') host.value = 'bandung';
        if (action === 'disabled') host.disabled = true;
        fixture.detectChanges();
        if (action === 'disabled') {
          host.disabled = false;
          fixture.detectChanges();
        }
        const displayed = input.value;
        const results = labels();
        advance(500);
        expect(input.value).toBe(displayed);
        expect(labels()).toEqual(results);
        if (action === 'select') {
          expect(input.value).toBe('jakarta');
          expect(host.changes.length).toBe(1);
        } else expect(host.changes).toEqual([]);
        fixture.destroy();
      }));
    }

    for (const action of ['escape', 'outside']) {
      it(`cancels first-query debounce on ${action}`, fakeAsync(() => {
        type('ja');
        if (action === 'escape') key('Escape');
        else document.body.click();
        advance(500);
        expect(labels()).toEqual([]);
        fixture.destroy();
      }));
    }

    it('honors a custom delay including an update during typing', fakeAsync(() => {
      host.delay = 400;
      fixture.detectChanges();
      type('ja');
      advance(200);
      expect(labels()).toEqual([]);
      host.delay = 100;
      fixture.detectChanges();
      advance(99);
      expect(labels()).toEqual([]);
      advance(1);
      expect(labels()).toEqual(['jakarta']);
      fixture.destroy();
    }));

    for (const finish of ['next', 'error', 'complete', 'detach']) {
      it(`keeps data loading independent of typing until ${finish}`, fakeAsync(() => {
        host.source = new Subject<string[]>();
        fixture.detectChanges();
        type('ja');
        advance();
        expect(root.querySelector('i-loading')).toBeTruthy();
        if (finish === 'next') host.source.next(host.options);
        if (finish === 'error') host.source.error(new Error('failed'));
        if (finish === 'complete') host.source.complete();
        if (finish === 'detach') host.source = null;
        fixture.detectChanges();
        expect(root.querySelector('i-loading')).toBeNull();
        expect(input.value).toBe('ja');
        if (finish === 'next' || finish === 'detach') expect(labels()).toEqual(['jakarta']);
        fixture.destroy();
      }));
    }

    it('preserves a pending query when asynchronous options arrive', fakeAsync(() => {
      host.source = new Subject<string[]>();
      fixture.detectChanges();
      type('jakarta');
      advance(100);
      host.source.next(host.options);
      fixture.detectChanges();
      expect(input.value).toBe('jakarta');
      advance(100);
      expect(labels()).toEqual(['jakarta']);
      fixture.destroy();
    }));

    it('unsubscribes pending filters and data on destruction', fakeAsync(() => {
      const source = new Subject<string[]>();
      host.source = source;
      fixture.detectChanges();
      type('ja');
      fixture.destroy();
      expect(source.observed).toBeFalse();
      tick(500);
      expect(document.querySelector('i-options')).toBeNull();
    }));
  });
}
