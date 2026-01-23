// section.ts
/**
 * ISection
 * Version: 1.0.0
 * <i-section>
 *   <i-section-header></i-section-header>
 *   <i-section-filter></i-section-filter>
 *   <i-section-body></i-section-body>
 *   <i-section-footer></i-section-footer>
 *   <i-section-tabs></i-section-tabs>
 * </i-section>
 */

import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  NgModule,
  Output,
  QueryList,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'i-section',
  imports: [],
  template: `<ng-content />`,
})
export class ISection {}

@Component({
  selector: 'i-section-header',
  imports: [],
  template: `<h4><ng-content /></h4>`,
})
export class ISectionHeader {}

@Component({
  selector: 'i-section-sub-header',
  imports: [],
  template: `<h6><ng-content /></h6>`,
})
export class ISectionSubHeader {}

@Component({
  selector: 'i-section-filter',
  imports: [],
  template: `<ng-content />`,
})
export class ISectionFilter {}

@Component({
  selector: 'i-section-body',
  imports: [],
  template: `<ng-content />`,
})
export class ISectionBody {}

@Component({
  selector: 'i-section-footer',
  imports: [],
  template: `<ng-content />`,
})
export class ISectionFooter {}

/* =========================================================
 * Tabs
 * ========================================================= */

@Directive({
  selector: 'i-section-tab-header',
  standalone: true,
})
export class ISectionTabHeader {
  // ✅ prefer inject() over constructor injection
  tpl = inject<TemplateRef<any>>(TemplateRef);
}

@Directive({
  selector: 'i-section-tab-content',
  standalone: true,
})
export class ISectionTabContent {
  // ✅ prefer inject() over constructor injection
  tpl = inject<TemplateRef<any>>(TemplateRef);
}

@Component({
  selector: 'i-section-tab',
  imports: [],
  template: `
    <ng-template>
      <ng-content select="i-section-tab-header" />
      <ng-content select="i-section-tab-content" />
    </ng-template>
  `,
})
export class ISectionTab {
  // ✅ prefer inject() over constructor injection
  el = inject<ElementRef<HTMLElement>>(ElementRef);

  @ContentChild(ISectionTabHeader) headerTpl!: ISectionTabHeader;
  @ContentChild(ISectionTabContent) contentTpl!: ISectionTabContent;

  get title(): string {
    return this.el.nativeElement.getAttribute('title') ?? '';
  }

  get opened(): boolean {
    const v = this.el.nativeElement.getAttribute('opened');
    return isTruthyAttr(v);
  }

  get badgeEnabled(): boolean {
    const v = this.el.nativeElement.getAttribute('badge');
    return isTruthyAttr(v);
  }

  get badgeValue(): number | null {
    const v = this.el.nativeElement.getAttribute('badge');
    const parsed = parseBadge(v);
    return parsed.value;
  }

  get key(): string {
    return this.el.nativeElement.getAttribute('key') ?? '';
  }
}

@Component({
  selector: 'i-section-tabs',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="i-section-tabs-header">
      @for (tab of tabsArr; track tab.key ?? $index; let i = $index) {
        <button
          class="i-section-tab"
          type="button"
          [class.opened]="i === activeIndex"
          (click)="selectIndex(i, true)"
        >
          <span class="i-section-tab-title">{{ tab.title }}</span>

          @if (tab.badgeEnabled) {
            <span class="i-section-tab-badge">
              @if (tab.badgeValue !== null) {
                {{ tab.badgeValue }}
              }
            </span>
          }

          <!-- ✅ replaced *ngIf with @if (...; as ...) -->
          @if (tab.headerTpl.tpl; as header) {
            <ng-container [ngTemplateOutlet]="header" />
          }
        </button>
      }
    </div>

    <div
      class="i-section-tabs-content"
      [class.scroll]="isFixedHeight"
      [class.scroll-y]="isFixedHeight"
      [style.height.px]="contentHeightPx"
    >
      @if (activeTab; as tab) {
        <ng-container [ngTemplateOutlet]="tab.contentTpl.tpl" />
      }
    </div>
  `,
})
export class ISectionTabs implements AfterContentInit {
  @ContentChildren(ISectionTab) tabs!: QueryList<ISectionTab>;

  /** optional controlled mode */
  @Input() selectedIndex: number | null = null;

  /** ✅ standardized output name (Angular + React parity) */
  @Output() readonly onSelectedIndexChange = new EventEmitter<number>();

  /**
   * height:
   * - "wrap" (default) => content height depends on each tab
   * - "300" / 300 / "300px" => fixed content height (px) + internal scroll
   */
  @Input()
  set height(v: any) {
    this._contentHeightPx = parseTabsHeight(v);
    this.cdr.markForCheck();
  }

  get height(): any {
    return this._contentHeightPx ?? 'wrap';
  }

  private _contentHeightPx: number | null = null;

  get isFixedHeight(): boolean {
    return this._contentHeightPx !== null;
  }

  get contentHeightPx(): number | null {
    return this._contentHeightPx;
  }

  tabsArr: ISectionTab[] = [];
  activeIndex = 0;

  private readonly cdr = inject(ChangeDetectorRef);

  get activeTab(): ISectionTab | null {
    return this.tabsArr[this.activeIndex] ?? null;
  }

  ngAfterContentInit(): void {
    const sync = (): void => {
      this.tabsArr = this.tabs?.toArray() ?? [];

      // Find first opened tab if any
      const openedIndex = this.tabsArr.findIndex((t) => t.opened);

      // Controlled mode:
      // If selectedIndex is provided, it wins.
      // Otherwise default:
      // - first opened tab
      // - else 0
      const next =
        this.selectedIndex !== null && this.selectedIndex !== undefined
          ? this.selectedIndex
          : openedIndex >= 0
            ? openedIndex
            : 0;

      this.activeIndex = clampIndex(next, this.tabsArr.length);
      this.cdr.markForCheck();
    };

    sync();

    this.tabs.changes.subscribe(() => {
      sync();
    });
  }

  selectIndex(index: number, emit: boolean): void {
    const next = clampIndex(index, this.tabsArr.length);

    // Controlled mode: still update local state for UI
    this.activeIndex = next;
    this.cdr.markForCheck();

    if (emit) {
      this.onSelectedIndexChange.emit(index);
    }
  }
}

/* =========================
 * Helpers
 * ========================= */

function clampIndex(index: number, len: number): number {
  if (len <= 0) return 0;
  if (index < 0) return 0;
  if (index >= len) return len - 1;
  return index;
}

function isTruthyAttr(v: any): boolean {
  if (v === null || v === undefined) {
    return false;
  }
  const s = String(v).trim().toLowerCase();
  if (s === 'false' || s === '0' || s === 'null' || s === 'undefined') {
    return false;
  }
  return true;
}

function parseBadge(v: any): { enabled: boolean; value: number | null } {
  if (!isTruthyAttr(v)) {
    return { enabled: false, value: null };
  }

  const s = String(v).trim().toLowerCase();

  // If it's a simple boolean attr: badge / badge="" / badge="true"
  if (s === '' || s === 'true') {
    return { enabled: true, value: null };
  }

  // If it's a number: badge="12"
  const n = Number(s);
  if (!Number.isNaN(n)) {
    return { enabled: true, value: n };
  }

  return { enabled: true, value: null };
}

function parseTabsHeight(v: any): number | null {
  if (v === null || v === undefined) return null;

  const s = String(v).trim().toLowerCase();

  // wrap / auto => not fixed
  if (s === '' || s === 'wrap' || s === 'auto') return null;

  // "300px" => 300
  if (s.endsWith('px')) {
    const n = Number(s.slice(0, -2).trim());
    return Number.isNaN(n) ? null : n;
  }

  // "300" or 300 => 300
  const n = Number(s);
  return Number.isNaN(n) ? null : n;
}

@NgModule({
  imports: [
    CommonModule,
    ISection,
    ISectionHeader,
    ISectionSubHeader,
    ISectionFilter,
    ISectionBody,
    ISectionFooter,
    ISectionTabs,
    ISectionTab,
    ISectionTabHeader,
    ISectionTabContent,
  ],
  exports: [
    ISection,
    ISectionHeader,
    ISectionSubHeader,
    ISectionFilter,
    ISectionBody,
    ISectionFooter,
    ISectionTabs,
    ISectionTab,
    ISectionTabHeader,
    ISectionTabContent,
  ],
})
export class ISectionModule {}
