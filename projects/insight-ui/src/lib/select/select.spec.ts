import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IFCSelect, ISelect } from './select';

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
    expect(panel.style.width).toBe('max-content');
    expect(panel.style.minWidth).toBe('220px');
    expect(panel.style.overflowX).toBe('hidden');
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
  });
});
