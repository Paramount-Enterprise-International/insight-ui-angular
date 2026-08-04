// section-tabs.ts
/**
 * ISectionTabs / ISectionTab
 *
 * <i-section-tabs>
 *   <i-section-tab title="Title goes here"> content goes here 1</i-section-tab>
 *   <i-section-tab>
 *     <i-section-tab-header>Header HTML goes here</i-section-tab-header>
 *     <i-section-tab-content> content goes here 2</i-section-tab-content>
 *   </i-section-tab>
 * </i-section-tabs>
 *
 * Badge rules:
 * - badge / badge="true" / badge="" => red dot
 * - badge="3" => red dot with number 3
 *
 * Lazy tab content:
 * ISectionTab exposes `exportAs="iSectionTab"` + an `active` getter so heavy
 * per-tab content can opt into Angular's native `@defer` lazy loading. Angular
 * content projection is instantiated wherever it's declared (the consumer's own
 * template), so the library cannot silently defer it — consumers opt in
 * themselves:
 *
 *   <i-section-tab #t="iSectionTab" title="Heavy">
 *     <i-section-tab-content>
 *       @defer (when t.active) { <heavy-component /> }
 *     </i-section-tab-content>
 *   </i-section-tab>
 */

import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { IIcon } from '../icon/icon';

// ─── Helpers ────────────────────────────────────────────────────────────────

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

/** Chevron icon size -> pixel width (used to size the scroll chevron buttons). */
const CHEVRON_WIDTH_MAP: Record<string, number> = {
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
};

// ─── ISectionTabHeader / ISectionTabContent ─────────────────────────────────

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

// ─── ISectionTab ─────────────────────────────────────────────────────────────

@Component({
  selector: 'i-section-tab',
  standalone: true,
  exportAs: 'iSectionTab',
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

  /**
   * Whether this tab is currently the active/selected one. Exposed so consumers can
   * lazily render heavy tab content via Angular's native deferred loading, e.g.:
   * `<i-section-tab #t="iSectionTab">...@defer (when t.active) { <heavy/> }...</i-section-tab>`
   */
  get active(): boolean {
    return this._active;
  }

  ngAfterContentInit(): void {
    this.headerTpl = this.headerCmp?.tpl ?? this.defaultHeaderTpl;
    this.contentTpl = this.contentCmp?.tpl ?? this.defaultContentTpl;
  }
}

// ─── ISectionTabs ─────────────────────────────────────────────────────────────

@Component({
  selector: 'i-section-tabs',
  standalone: true,
  imports: [CommonModule, IIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.i-section-tabs--bar]': "styleVariant === 'bar'",
  },
  template: `
    <div
      class="i-section-tabs-headers"
      role="tablist"
      [class.i-section-tabs-headers--sticky]="sticky"
      [ngClass]="headerClass"
      [style.--i-section-tabs-sticky-top]="stickyTopOffset"
    >
      @if (scrollable) {
        <button
          class="i-section-tabs-chevron i-section-tabs-chevron--left"
          type="button"
          [class.hidden]="!showLeftChevron"
          [style.minWidth.px]="chevronWidthPx"
          [style.width.px]="chevronWidthPx"
          (click)="scrollLeft()"
        >
          <i-icon icon="prev" [size]="chevronSize" />
        </button>
      }

      <div
        #scrollContainer
        class="i-section-tabs-scroll"
        [class.i-section-tabs-scroll--scrollable]="scrollable"
        (scroll)="onScroll()"
      >
        @for (tab of tabsArr; track tab) {
          <button
            class="i-section-tabs-header"
            role="tab"
            type="button"
            [attr.aria-selected]="tab._active"
            [attr.tabindex]="tab._active ? 0 : -1"
            [class.active]="tab._active"
            [ngClass]="tabClass"
            [style.minHeight]="tabMinHeight || null"
            (click)="activateByTab(tab)"
          >
            <ng-container [ngTemplateOutlet]="tab.headerTpl" />
          </button>
        }
      </div>

      @if (scrollable) {
        <button
          class="i-section-tabs-chevron i-section-tabs-chevron--right"
          type="button"
          [class.hidden]="!showRightChevron"
          [style.minWidth.px]="chevronWidthPx"
          [style.width.px]="chevronWidthPx"
          (click)="scrollRight()"
        >
          <i-icon icon="next" [size]="chevronSize" />
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

    <!-- Catch-all slot for static content that isn't owned by a specific tab (e.g. shared
         widgets filtered externally via selectedIndex). Keeping it inside ISectionTabs' own
         box (rather than as an external sibling) lets [sticky] stay pinned across the full
         scroll height of that shared content, not just the (possibly empty) tab content area. -->
    <ng-content select=":not(i-section-tab)" />
  `,
})
export class ISectionTabs implements AfterContentInit, AfterViewInit, OnDestroy {
  @ContentChildren(ISectionTab) tabs!: QueryList<ISectionTab>;

  /** optional controlled mode */
  @Input() selectedIndex: number | null = null;

  /** Enable sticky header via plain CSS `position: sticky`. Default off (opt-in). */
  @Input({ transform: booleanAttribute }) sticky = false;

  /** CSS `top` offset used when `sticky` is enabled. Default `-16px` accounts for
   *  section border-radius clearance (matches the previous i-section-tab-bar default). */
  @Input() stickyTopOffset = '-16px';

  /** Enable natural-width tabs + horizontal overflow scroll + chevrons. Default off
   *  preserves today's equal-width layout exactly. */
  @Input({ transform: booleanAttribute }) scrollable = false;

  /** Chevron icon size — only relevant when `scrollable` is enabled. */
  @Input() chevronSize: 'sm' | 'md' | 'lg' | 'xl' = 'lg';

  /** Minimum tab button height (CSS value, e.g. `'48px'`). */
  @Input() tabMinHeight = '';

  /** Extra class(es) applied to the headers row wrapper. */
  @Input() headerClass = '';

  /** Extra class(es) applied to each tab button. */
  @Input() tabClass = '';

  /** Visual skin: `'default'` keeps today's equal-width/box-shadow look unchanged (default);
   *  `'bar'` opts into the fully ported i-section-tab-bar visual style. */
  @Input() styleVariant: 'default' | 'bar' = 'default';

  /** ✅ standardized output name (Angular + React parity) — kept for backward compatibility. */
  @Output() readonly onSelectedIndexChange = new EventEmitter<number>();

  /** Angular two-way-binding-convention-named alias, enabling `[(selectedIndex)]`.
   *  Emitted alongside `onSelectedIndexChange` (both always fire together). */
  @Output() readonly selectedIndexChange = new EventEmitter<number>();

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

  /** Computed chevron button width from `chevronSize`. */
  get chevronWidthPx(): number {
    return CHEVRON_WIDTH_MAP[this.chevronSize] ?? 28;
  }

  tabsArr: ISectionTab[] = [];
  activeIndex = 0;

  showLeftChevron = false;
  showRightChevron = false;

  private readonly cdr = inject(ChangeDetectorRef);

  private resizeObserver: ResizeObserver | null = null;
  private _scrollContainer?: ElementRef<HTMLElement>;

  @ViewChild('scrollContainer') set scrollContainer(content: ElementRef<HTMLElement> | undefined) {
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    this._scrollContainer = content;

    if (content?.nativeElement) {
      const el = content.nativeElement;
      this.checkOverflow();
      if (typeof ResizeObserver !== 'undefined') {
        this.resizeObserver = new ResizeObserver(() => this.checkOverflow());
        this.resizeObserver.observe(el);
      }
    }
  }

  get scrollContainer(): ElementRef<HTMLElement> | undefined {
    return this._scrollContainer;
  }

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

  ngAfterViewInit(): void {
    this.checkOverflow();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  activate(index: number): void {
    this.setActive(index, true);
    this.scrollToActive();
    this.checkOverflow();
    this.cdr.markForCheck();
  }

  activateByTab(tab: ISectionTab): void {
    const index = this.tabsArr.indexOf(tab);
    this.activate(index);
  }

  // ─── Scroll / overflow ──────────────────────────────────────────────────

  onScroll(): void {
    this.checkOverflow();
  }

  scrollLeft(): void {
    const el = this.scrollContainer?.nativeElement;
    if (el) el.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight(): void {
    const el = this.scrollContainer?.nativeElement;
    if (el) el.scrollBy({ left: 200, behavior: 'smooth' });
  }

  private checkOverflow(): void {
    const el = this.scrollContainer?.nativeElement;
    if (!el) return;
    this.showLeftChevron = el.scrollLeft > 2;
    this.showRightChevron = el.scrollLeft + el.clientWidth < el.scrollWidth - 2;
    this.cdr.markForCheck();
  }

  private scrollToActive(): void {
    const el = this.scrollContainer?.nativeElement;
    if (!el) return;
    const buttons = el.querySelectorAll('.i-section-tabs-header');
    const active = buttons[this.activeIndex] as HTMLElement | undefined;
    if (active) {
      active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  }

  private setActive(index: number, emit: boolean): void {
    if (!this.isValidIndex(index)) return;

    this.activeIndex = index;
    this.tabsArr.forEach((t, i) => (t._active = i === index));

    if (emit) {
      this.onSelectedIndexChange.emit(index);
      this.selectedIndexChange.emit(index);
    }
  }

  private isValidIndex(index: number): boolean {
    return Number.isInteger(index) && index >= 0 && index < this.tabsArr.length;
  }
}
