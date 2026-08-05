import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ISectionTab, ISectionTabContent, ISectionTabHeader, ISectionTabs } from './section-tabs';

@Component({
  standalone: true,
  imports: [ISectionTabs, ISectionTab, ISectionTabHeader, ISectionTabContent],
  template: `
    <i-section-tabs [selectedIndex]="selectedIndex" (onSelectedIndexChange)="onLegacyChange($event)">
      <i-section-tab title="Title goes here">content goes here 1</i-section-tab>
      <i-section-tab>
        <i-section-tab-header>Header HTML goes here</i-section-tab-header>
        <i-section-tab-content>content goes here 2</i-section-tab-content>
      </i-section-tab>
    </i-section-tabs>
  `,
})
class SimpleTabsHost {
  selectedIndex: number | null = null;
  legacyEmitted: number | null = null;

  onLegacyChange(index: number): void {
    this.legacyEmitted = index;
  }
}

@Component({
  standalone: true,
  imports: [ISectionTabs, ISectionTab],
  template: `
    <i-section-tabs chevronSize="sm" scrollable>
      @for (t of manyTabs; track t) {
        <i-section-tab [title]="t">tab {{ t }}</i-section-tab>
      }
    </i-section-tabs>
  `,
})
class ScrollableTabsHost {
  manyTabs = Array.from({ length: 20 }, (_, i) => `Tab ${i + 1}`);
}

@Component({
  standalone: true,
  imports: [ISectionTabs, ISectionTab],
  template: `
    <i-section-tabs sticky stickyTopOffset="-8px">
      <i-section-tab title="A">A content</i-section-tab>
      <i-section-tab title="B">B content</i-section-tab>
    </i-section-tabs>
  `,
})
class StickyTabsHost {}

@Component({
  standalone: true,
  imports: [ISectionTabs, ISectionTab],
  template: `
    <i-section-tabs styleVariant="bar">
      <i-section-tab title="A">A content</i-section-tab>
    </i-section-tabs>
  `,
})
class BarVariantTabsHost {}

@Component({
  standalone: true,
  imports: [ISectionTabs, ISectionTab],
  template: `
    <i-section-tabs [(selectedIndex)]="selectedIndex">
      <i-section-tab title="A">A content</i-section-tab>
      <i-section-tab title="B">B content</i-section-tab>
    </i-section-tabs>
  `,
})
class TwoWayBindingHost {
  selectedIndex = 0;
}

@Component({
  standalone: true,
  imports: [ISectionTabs, ISectionTab],
  template: `
    <i-section-tabs>
      <i-section-tab #t="iSectionTab" title="A">
        <span class="active-flag">{{ t.active }}</span>
      </i-section-tab>
      <i-section-tab title="B">B content</i-section-tab>
    </i-section-tabs>
  `,
})
class ExportAsHost {}

describe('ISectionTabs (default/simple usage)', () => {
  let fixture: ComponentFixture<SimpleTabsHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [SimpleTabsHost] }).compileComponents();
    fixture = TestBed.createComponent(SimpleTabsHost);
    fixture.detectChanges();
  });

  it('renders the exact declarative format unchanged (title tab + header/content tab)', () => {
    const host = fixture.nativeElement as HTMLElement;
    const headers = host.querySelectorAll('.i-section-tabs-header');
    expect(headers.length).toBe(2);
    expect(host.textContent).toContain('Title goes here');
    expect(host.textContent).toContain('content goes here 1');
  });

  it('does not render chevrons or scrollable modifier by default', () => {
    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('.i-section-tabs-chevron')).toBeNull();
    expect(host.querySelector('.i-section-tabs-scroll--scrollable')).toBeNull();
  });

  it('emits onSelectedIndexChange on tab click (legacy output still works)', () => {
    const host = fixture.nativeElement as HTMLElement;
    const headers = host.querySelectorAll('.i-section-tabs-header') as NodeListOf<HTMLElement>;
    headers[1].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.legacyEmitted).toBe(1);
  });
});

describe('ISectionTabs (scrollable mode)', () => {
  let fixture: ComponentFixture<ScrollableTabsHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ScrollableTabsHost] }).compileComponents();
    fixture = TestBed.createComponent(ScrollableTabsHost);
    fixture.detectChanges();
  });

  it('renders chevron buttons when scrollable is enabled', () => {
    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelectorAll('.i-section-tabs-chevron').length).toBe(2);
    expect(host.querySelector('.i-section-tabs-scroll--scrollable')).toBeTruthy();
  });
});

describe('ISectionTabs (sticky)', () => {
  let fixture: ComponentFixture<StickyTabsHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [StickyTabsHost] }).compileComponents();
    fixture = TestBed.createComponent(StickyTabsHost);
    fixture.detectChanges();
  });

  it('applies the sticky modifier class and top-offset CSS var', () => {
    const host = fixture.nativeElement as HTMLElement;
    const headers = host.querySelector('.i-section-tabs-headers') as HTMLElement;
    expect(headers.classList.contains('i-section-tabs-headers--sticky')).toBeTrue();
    expect(headers.style.getPropertyValue('--i-section-tabs-sticky-top').trim()).toBe('-8px');
  });
});

describe('ISectionTabs (styleVariant)', () => {
  it('applies the bar modifier class on host when styleVariant="bar"', async () => {
    await TestBed.configureTestingModule({ imports: [BarVariantTabsHost] }).compileComponents();
    const fixture = TestBed.createComponent(BarVariantTabsHost);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('i-section-tabs.i-section-tabs--bar')).toBeTruthy();
  });
});

describe('ISectionTabs (two-way binding)', () => {
  it('supports [(selectedIndex)] via the new selectedIndexChange output', async () => {
    await TestBed.configureTestingModule({ imports: [TwoWayBindingHost] }).compileComponents();
    const fixture = TestBed.createComponent(TwoWayBindingHost);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const headers = host.querySelectorAll('.i-section-tabs-header') as NodeListOf<HTMLElement>;
    headers[1].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.selectedIndex).toBe(1);
  });
});

describe('ISectionTab (exportAs + active getter)', () => {
  it('exposes `active` via template reference variable for @defer (when) usage', async () => {
    await TestBed.configureTestingModule({ imports: [ExportAsHost] }).compileComponents();
    const fixture = TestBed.createComponent(ExportAsHost);
    // ISectionTabs sets `_active` from ngAfterContentInit, one tick after the consumer's
    // own template is first checked — skip the no-changes verification on the first pass,
    // then verify the stabilized value on the second.
    fixture.detectChanges(false);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('.active-flag')?.textContent?.trim()).toBe('true');
  });
});
