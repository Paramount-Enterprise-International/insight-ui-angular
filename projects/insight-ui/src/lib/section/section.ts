// section.ts
/**
 * ISection
 * Version: 1.0.1
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
  EventEmitter,
  inject,
  Input,
  NgModule,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
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

/**
 * ISection Tabs
 *
 * Badge rules:
 * - badge / badge="true" / badge="" => red dot
 * - badge="3" => red dot with number 3
 */

function isTruthyAttr(v: any): boolean {
  if (v === null || v === undefined) return false;
  const s = String(v).trim().toLowerCase();
  if (s === 'false' || s === '0' || s === 'null' || s === 'undefined') return false;
  return true;
}

function parseBadge(v: any): { enabled: boolean; value: number | null } {
  if (!isTruthyAttr(v)) return { enabled: false, value: null };

  const s = String(v).trim();
  if (s === '' || s.toLowerCase() === 'true') return { enabled: true, value: null };

  const n = Number(s);
  if (Number.isFinite(n) && Number.isInteger(n) && n >= 0) {
    return { enabled: true, value: n };
  }

  return { enabled: true, value: null };
}

function parseTabsHeight(v: any): number | null {
  // null => wrap (default)
  if (v === null || v === undefined) return null;

  const s = String(v).trim().toLowerCase();
  if (s === '' || s === 'wrap' || s === 'auto') return null;

  // allow "300", "300px"
  if (s.endsWith('px')) {
    const n = Number(s.slice(0, -2).trim());
    return Number.isFinite(n) && n > 0 ? n : null;
  }

  const n = Number(s);
  return Number.isFinite(n) && n > 0 ? n : null;
}

@Component({
  selector: 'i-section-tab-header',
  standalone: true,
  template: `
    <ng-template #tpl>
      <ng-content />
    </ng-template>
  `,
})
export class ISectionTabHeader {
  @ViewChild('tpl', { static: true }) tpl!: TemplateRef<unknown>;
}

@Component({
  selector: 'i-section-tab-content',
  standalone: true,
  template: `
    <ng-template #tpl>
      <ng-content />
    </ng-template>
  `,
})
export class ISectionTabContent {
  @ViewChild('tpl', { static: true }) tpl!: TemplateRef<unknown>;
}

@Component({
  selector: 'i-section-tab',
  standalone: true,
  template: `
    <ng-template #defaultHeaderTpl>
      <span class="i-section-tab-title">{{ title }}</span>

      @if (_badgeEnabled) {
        <span class="i-section-tab-badge" [class.has-number]="_badgeValue !== null">
          @if (_badgeValue !== null) {
            <span class="i-section-tab-badge-number">{{ _badgeValue }}</span>
          }
        </span>
      }
    </ng-template>

    <ng-template #defaultContentTpl>
      <ng-content />
    </ng-template>
  `,
})
export class ISectionTab implements AfterContentInit {
  @Input() title = '';
  @Input({ transform: (v: any) => v !== null && `${v}` !== 'false' }) opened = false;

  @Input()
  set badge(v: any) {
    const parsed = parseBadge(v);
    this._badgeEnabled = parsed.enabled;
    this._badgeValue = parsed.value;
  }
  get badge(): any {
    return this._badgeEnabled ? (this._badgeValue ?? true) : null;
  }

  _badgeEnabled = false;
  _badgeValue: number | null = null;

  @ContentChild(ISectionTabHeader) headerCmp?: ISectionTabHeader;
  @ContentChild(ISectionTabContent) contentCmp?: ISectionTabContent;

  @ViewChild('defaultHeaderTpl', { static: true }) defaultHeaderTpl!: TemplateRef<unknown>;
  @ViewChild('defaultContentTpl', { static: true }) defaultContentTpl!: TemplateRef<unknown>;

  headerTpl!: TemplateRef<unknown>;
  contentTpl!: TemplateRef<unknown>;

  _active = false;

  ngAfterContentInit(): void {
    this.headerTpl = this.headerCmp?.tpl ?? this.defaultHeaderTpl;
    this.contentTpl = this.contentCmp?.tpl ?? this.defaultContentTpl;
  }
}

@Component({
  selector: 'i-section-tabs',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="i-section-tabs-headers" role="tablist">
      @for (tab of tabsArr; track tab) {
        <button
          class="i-section-tabs-header"
          role="tab"
          type="button"
          [attr.aria-selected]="tab._active"
          [attr.tabindex]="tab._active ? 0 : -1"
          [class.active]="tab._active"
          (click)="activateByTab(tab)"
        >
          <ng-container [ngTemplateOutlet]="tab.headerTpl" />
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
        <ng-container [ngTemplateOutlet]="tab.contentTpl" />
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

  get contentHeightPx(): number | null {
    return this._contentHeightPx;
  }

  get isFixedHeight(): boolean {
    return this._contentHeightPx !== null;
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

      let nextIndex = 0;

      if (this.selectedIndex !== null && this.isValidIndex(this.selectedIndex)) {
        nextIndex = this.selectedIndex;
      } else {
        const openedIndex = this.tabsArr.findIndex((t) => t.opened);
        nextIndex = openedIndex >= 0 ? openedIndex : 0;
      }

      this.setActive(nextIndex, false);
      this.cdr.markForCheck();
    };

    sync();
    this.tabs.changes.subscribe(() => sync());
  }

  activate(index: number): void {
    this.setActive(index, true);
    this.cdr.markForCheck();
  }

  activateByTab(tab: ISectionTab): void {
    const index = this.tabsArr.indexOf(tab);
    this.activate(index);
  }

  private setActive(index: number, emit: boolean): void {
    if (!this.isValidIndex(index)) return;

    this.activeIndex = index;
    this.tabsArr.forEach((t, i) => (t._active = i === index));

    if (emit) {
      this.onSelectedIndexChange.emit(index);
    }
  }

  private isValidIndex(index: number): boolean {
    return Number.isInteger(index) && index >= 0 && index < this.tabsArr.length;
  }
}

@NgModule({
  imports: [
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
