import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IDropdown, IFCDropdown } from './dropdown';

@Component({
  standalone: true,
  imports: [IFCDropdown],
  template: `<i-fc-dropdown label="Pick" [options]="options" />`,
})
class DropdownHost {
  options = ['A', 'B'];
}

@Component({
  standalone: true,
  imports: [IDropdown],
  template: `<i-dropdown [options]="options" />`,
})
class LongDropdownHost {
  options = ['A'.repeat(500), 'B'];
}

describe('IFCDropdown', () => {
  let fixture: ComponentFixture<DropdownHost>;
  let longFixture: ComponentFixture<LongDropdownHost> | undefined;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownHost, LongDropdownHost],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownHost);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    longFixture?.destroy();
    longFixture = undefined;
    document.body.querySelectorAll('i-options').forEach((el) => el.remove());
  });

  it('renders host and inner dropdown', () => {
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('i-fc-dropdown')).toBeTruthy();
    expect(host.querySelector('i-dropdown')).toBeTruthy();
  });

  it('opens and constrains a portaled panel with very long option text', () => {
    longFixture = TestBed.createComponent(LongDropdownHost);
    longFixture.detectChanges();

    const dropdown = longFixture.debugElement.query(By.directive(IDropdown))
      .componentInstance as IDropdown<string>;
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

    (dropdown as any).openDropdown();
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

    (dropdown as any).repositionPanelNow();

    expect(dropdown.isOpen).toBeTrue();
    expect(panel.style.width).toBe('220px');
    expect(panel.style.minWidth).toBe('220px');
    expect(panel.style.overflowX).toBe('hidden');
    expect(Number.parseFloat(panel.style.maxWidth)).toBeLessThanOrEqual(window.innerWidth - 16);

  });
});
