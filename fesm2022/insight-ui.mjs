import * as i0 from '@angular/core';
import { Input, Component, HostBinding, EventEmitter, booleanAttribute, HostListener, Output, ChangeDetectionStrategy, isDevMode, NgModule, inject, ChangeDetectorRef, ViewChild, Directive, forwardRef, Pipe, TemplateRef, ElementRef, NgZone, ContentChild, Renderer2, InjectionToken, Injectable, Injector, ViewContainerRef, ContentChildren, signal, ViewChildren } from '@angular/core';
import * as i1$1 from '@angular/common';
import { NgClass, NgTemplateOutlet, CommonModule, formatDate, NgComponentOutlet, NgStyle, AsyncPipe, APP_BASE_HREF } from '@angular/common';
import { RouterLink, Router, ActivatedRoute, NavigationEnd, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Subject, BehaviorSubject, map, filter, startWith, shareReplay, Observable, tap, combineLatest } from 'rxjs';
import * as i1 from '@angular/forms';
import { Validators, NG_VALUE_ACCESSOR, NgControl, FormGroupDirective, FormBuilder, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

/**
 * IIcon
 * Version: 1.0.0
 * <i-icon />
 */
const I_ICON_NAMES = {
    add: 'fa-solid fa-plus',
    'angle-down': 'fa-solid fa-angle-down',
    'angle-up': 'fa-solid fa-angle-up',
    'arrow-down': 'fa-solid fa-arrow-down',
    'arrow-up': 'fa-solid fa-arrow-up',
    back: 'fa-solid fa-chevron-left',
    bars: 'fa-solid fa-bars',
    cancel: 'fa-solid fa-xmark',
    calendar: 'fa-solid fa-calendar-days',
    check: 'fa-solid fa-check',
    'check-circle': 'fa-solid fa-circle-check',
    code: 'fa-solid fa-code',
    delete: 'fa-solid fa-trash',
    edit: 'fa-solid fa-pen',
    ellipsis: 'fa-solid fa-ellipsis',
    exclamation: 'fa-solid fa-circle-exclamation',
    'file-excel': 'fa-solid fa-file-excel',
    'file-pdf': 'fa-solid fa-file-pdf',
    'folder-open': 'fa-solid fa-folder-open',
    hashtag: 'fa-solid fa-hashtag',
    info: 'fa-solid fa-circle-info',
    'layer-group': 'fa-solid fa-layer-group',
    link: 'fa-solid fa-arrow-up-right-from-square',
    maximize: 'fa-solid fa-window-maximize',
    'map-marker': 'fa-solid fa-location-dot',
    next: 'fa-solid fa-chevron-right',
    prev: 'fa-solid fa-chevron-left',
    up: 'fa-solid fa-angle-up',
    down: 'fa-solid fa-angle-down',
    save: 'fa-solid fa-floppy-disk',
    signature: 'fa-solid fa-file-signature',
    'sort-asc': 'fa-solid fa-arrow-down-a-z',
    'sort-dsc': 'fa-solid fa-arrow-down-z-a',
    sync: 'fa-solid fa-arrows-rotate',
    tags: 'fa-solid fa-tags',
    user: 'fa-solid fa-user',
    users: 'fa-solid fa-users',
    unlock: 'fa-solid fa-unlock',
    upload: 'fa-solid fa-cloud-arrow-up',
    view: 'fa-solid fa-eye',
    x: 'fa-solid fa-xmark',
    'x-circle': 'fa-solid fa-circle-xmark',
};
const I_ICON_SIZES = {
    '2xs': 'i-icon-2xs',
    xs: 'i-icon-xs',
    sm: 'i-icon-sm',
    md: 'i-icon-md',
    lg: 'i-icon-lg',
    xl: 'i-icon-xl',
    '2xl': 'i-icon-2xl',
    '3xl': 'i-icon-3xl',
    '4xl': 'i-icon-4xl',
};
class IIcon {
    icon;
    size = 'md';
    get iconSize() {
        return I_ICON_SIZES[this.size] || 'sm';
    }
    get iconClass() {
        return `${I_ICON_NAMES[this.icon] || this.icon} ${this.iconSize}`;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IIcon, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: IIcon, isStandalone: true, selector: "i-icon", inputs: { icon: "icon", size: "size" }, ngImport: i0, template: `<i [ngClass]="iconClass"></i>`, isInline: true, dependencies: [{ kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IIcon, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-icon',
                    imports: [NgClass],
                    template: `<i [ngClass]="iconClass"></i>`,
                }]
        }], propDecorators: { icon: [{
                type: Input
            }], size: [{
                type: Input
            }] } });

/**
 * ILoading
 * Version: 1.0.0
 * <i-loading></i-loading>
 */
class ILoading {
    label = 'Loading..';
    light = false;
    get isLight() {
        return this.light;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ILoading, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: ILoading, isStandalone: true, selector: "i-loading", inputs: { label: "label", light: "light" }, host: { properties: { "attr.light": "this.isLight" } }, ngImport: i0, template: `<div
      class="spinner-border spinner-border-sm"
      role="status"
      [class.light]="light"
    ></div>
    {{ label }}`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ILoading, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-loading',
                    imports: [],
                    template: `<div
      class="spinner-border spinner-border-sm"
      role="status"
      [class.light]="light"
    ></div>
    {{ label }}`,
                }]
        }], propDecorators: { label: [{
                type: Input
            }], light: [{
                type: Input
            }], isLight: [{
                type: HostBinding,
                args: ['attr.light']
            }] } });

class IButton {
    // @Input({ transform: booleanAttribute }) disabled = false;
    disabled = false;
    loading = false;
    type = 'button';
    loadingText = '';
    variant = 'primary';
    size = 'md';
    icon;
    /** Public click output if you want to use (onClick) */
    onClick = new EventEmitter();
    /* ---------- HOST BINDINGS ---------- */
    get tabIndex() {
        return this.disabled ? -1 : 0;
    }
    get ariaDisabled() {
        return this.disabled ? 'true' : null;
    }
    get ariaBusy() {
        return this.loading ? 'true' : null;
    }
    /** Reflect variant to host: <i-button variant="primary"> */
    get hostVariant() {
        return this.variant;
    }
    /** Reflect size to host: <i-button size="md"> */
    get hostSize() {
        return this.size;
    }
    /* ---------- EVENTS ---------- */
    // Mouse click
    handleClick(event) {
        if (this.disabled || this.loading) {
            event.preventDefault();
            event.stopImmediatePropagation();
            return;
        }
        this.onClick.emit(event);
        // Handle submit/reset behavior manually if needed
        if (this.type === 'submit' || this.type === 'reset') {
            const form = this.findClosestForm(event.target);
            if (form) {
                if (this.type === 'submit') {
                    if (form.requestSubmit) {
                        form.requestSubmit();
                    }
                    else {
                        form.submit();
                    }
                }
                else if (this.type === 'reset') {
                    form.reset();
                }
            }
        }
    }
    // Keyboard activation (Space/Enter)
    handleKeydown(event) {
        if (this.disabled || this.loading) {
            return;
        }
        const key = event.key;
        if (key === 'Enter' || key === ' ') {
            event.preventDefault();
            // Simulate click via the same logic, so form behavior stays consistent
            const mouseEvent = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                composed: true,
            });
            // This will re-enter handleClick with proper submit/reset handling
            event.target?.dispatchEvent(mouseEvent);
        }
    }
    /* ---------- UTILS ---------- */
    findClosestForm(startEl) {
        let el = startEl;
        while (el) {
            if (el instanceof HTMLFormElement) {
                return el;
            }
            el = el.parentElement;
        }
        return null;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IButton, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.16", type: IButton, isStandalone: true, selector: "i-button", inputs: { disabled: "disabled", loading: ["loading", "loading", booleanAttribute], type: "type", loadingText: "loadingText", variant: "variant", size: "size", icon: "icon" }, outputs: { onClick: "onClick" }, host: { attributes: { "role": "button" }, listeners: { "click": "handleClick($event)", "keydown": "handleKeydown($event)" }, properties: { "attr.tabindex": "this.tabIndex", "attr.aria-disabled": "this.ariaDisabled", "attr.aria-busy": "this.ariaBusy", "attr.variant": "this.hostVariant", "attr.size": "this.hostSize" } }, ngImport: i0, template: `@if (loading) {
    <i-loading [label]="loadingText" [light]="variant !== 'outline'" />
    } @else { @if (icon) {
    <i-icon [icon]="icon" [size]="size" />
    }
    <ng-content />
    } `, isInline: true, dependencies: [{ kind: "component", type: ILoading, selector: "i-loading", inputs: ["label", "light"] }, { kind: "component", type: IIcon, selector: "i-icon", inputs: ["icon", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IButton, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-button',
                    standalone: true,
                    template: `@if (loading) {
    <i-loading [label]="loadingText" [light]="variant !== 'outline'" />
    } @else { @if (icon) {
    <i-icon [icon]="icon" [size]="size" />
    }
    <ng-content />
    } `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        role: 'button',
                    },
                    imports: [ILoading, IIcon],
                }]
        }], propDecorators: { disabled: [{
                type: Input
            }], loading: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], type: [{
                type: Input
            }], loadingText: [{
                type: Input
            }], variant: [{
                type: Input
            }], size: [{
                type: Input
            }], icon: [{
                type: Input
            }], onClick: [{
                type: Output
            }], tabIndex: [{
                type: HostBinding,
                args: ['attr.tabindex']
            }], ariaDisabled: [{
                type: HostBinding,
                args: ['attr.aria-disabled']
            }], ariaBusy: [{
                type: HostBinding,
                args: ['attr.aria-busy']
            }], hostVariant: [{
                type: HostBinding,
                args: ['attr.variant']
            }], hostSize: [{
                type: HostBinding,
                args: ['attr.size']
            }], handleClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }], handleKeydown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }] } });

/**
 * ICard
 * Version: 1.0.0
 * <i-card></i-card>
 *
 * Standardized:
 * - @Output() onClick (was cardClick)
 * - internal handler renamed to handleClick (was onClick) to avoid name collision
 */
class ICard {
    /* ======================
     * Inputs
     * ====================== */
    // External / normal anchor
    href;
    // Angular Router
    routerLink;
    queryParams;
    fragment;
    replaceUrl = false;
    skipLocationChange = false;
    state;
    // Anchor-related
    target;
    rel;
    disabled = false;
    /* ======================
     * Outputs (standardized)
     * ====================== */
    /** Standard event name for Angular + React parity */
    onClick = new EventEmitter();
    /* ======================
     * Derived flags
     * ====================== */
    get useRouterLink() {
        if (this.disabled)
            return false;
        return this.routerLink !== undefined && this.routerLink !== null && this.routerLink !== '';
    }
    /* ======================
     * Dev-mode validation
     * ====================== */
    ngOnInit() {
        if (!isDevMode())
            return;
        const hasHref = !!this.href;
        const hasRouter = this.routerLink !== undefined && this.routerLink !== null && this.routerLink !== '';
        const hasClick = this.onClick.observed;
        if (hasHref && hasRouter) {
            console.warn('[i-card] Do not use `href` and `routerLink` together. Choose one.', this);
        }
        if (hasClick && (hasHref || hasRouter)) {
            console.warn('[i-card] `(onClick)` should not be combined with `href` or `routerLink`.', this);
        }
        if (!hasHref && !hasRouter && !hasClick) {
            console.warn('[i-card] No action provided. Add `href`, `routerLink`, or `(onClick)`.', this);
        }
    }
    /* ======================
     * Attribute helpers
     * ====================== */
    get relAttr() {
        if (this.rel)
            return this.rel;
        if ((this.target ?? '').toLowerCase() === '_blank')
            return 'noopener noreferrer';
        return null;
    }
    get hrefAttr() {
        if (this.disabled)
            return null;
        // only for the non-router template
        return this.href ?? null;
    }
    /* ======================
     * Click handling
     * ====================== */
    handleClick(ev) {
        if (this.disabled) {
            ev.preventDefault();
            ev.stopPropagation();
            return;
        }
        // Button-like behavior
        if (this.onClick.observed) {
            ev.preventDefault();
            this.onClick.emit(ev);
            return;
        }
        // Prevent empty anchor navigation
        const hasHref = !!this.href;
        const hasRouter = this.useRouterLink;
        if (!hasHref && !hasRouter) {
            ev.preventDefault();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ICard, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.16", type: ICard, isStandalone: true, selector: "i-card", inputs: { href: "href", routerLink: "routerLink", queryParams: "queryParams", fragment: "fragment", replaceUrl: "replaceUrl", skipLocationChange: "skipLocationChange", state: "state", target: "target", rel: "rel", disabled: "disabled" }, outputs: { onClick: "onClick" }, ngImport: i0, template: `
    <ng-template #content>
      <ng-content />
    </ng-template>

    @if (useRouterLink) {
      <a
        class="i-card"
        [attr.aria-disabled]="disabled ? 'true' : null"
        [attr.rel]="relAttr"
        [attr.tabindex]="disabled ? -1 : null"
        [attr.target]="target ?? null"
        [fragment]="fragment"
        [queryParams]="queryParams"
        [replaceUrl]="replaceUrl"
        [routerLink]="routerLink!"
        [skipLocationChange]="skipLocationChange"
        [state]="state"
        (click)="handleClick($event)"
      >
        <ng-container [ngTemplateOutlet]="content" />
      </a>
    } @else {
      <a
        class="i-card"
        [attr.aria-disabled]="disabled ? 'true' : null"
        [attr.href]="hrefAttr"
        [attr.rel]="relAttr"
        [attr.tabindex]="disabled ? -1 : null"
        [attr.target]="target ?? null"
        (click)="handleClick($event)"
      >
        <ng-container [ngTemplateOutlet]="content" />
      </a>
    }
  `, isInline: true, dependencies: [{ kind: "directive", type: RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ICard, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-card',
                    standalone: true,
                    imports: [RouterLink, NgTemplateOutlet],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <ng-template #content>
      <ng-content />
    </ng-template>

    @if (useRouterLink) {
      <a
        class="i-card"
        [attr.aria-disabled]="disabled ? 'true' : null"
        [attr.rel]="relAttr"
        [attr.tabindex]="disabled ? -1 : null"
        [attr.target]="target ?? null"
        [fragment]="fragment"
        [queryParams]="queryParams"
        [replaceUrl]="replaceUrl"
        [routerLink]="routerLink!"
        [skipLocationChange]="skipLocationChange"
        [state]="state"
        (click)="handleClick($event)"
      >
        <ng-container [ngTemplateOutlet]="content" />
      </a>
    } @else {
      <a
        class="i-card"
        [attr.aria-disabled]="disabled ? 'true' : null"
        [attr.href]="hrefAttr"
        [attr.rel]="relAttr"
        [attr.tabindex]="disabled ? -1 : null"
        [attr.target]="target ?? null"
        (click)="handleClick($event)"
      >
        <ng-container [ngTemplateOutlet]="content" />
      </a>
    }
  `,
                }]
        }], propDecorators: { href: [{
                type: Input
            }], routerLink: [{
                type: Input
            }], queryParams: [{
                type: Input
            }], fragment: [{
                type: Input
            }], replaceUrl: [{
                type: Input
            }], skipLocationChange: [{
                type: Input
            }], state: [{
                type: Input
            }], target: [{
                type: Input
            }], rel: [{
                type: Input
            }], disabled: [{
                type: Input
            }], onClick: [{
                type: Output
            }] } });
class ICardImage {
    src;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ICardImage, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: ICardImage, isStandalone: true, selector: "i-card-image", inputs: { src: "src" }, ngImport: i0, template: `<img alt="card-image" [src]="src" />`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ICardImage, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-card-image',
                    imports: [],
                    template: `<img alt="card-image" [src]="src" />`,
                }]
        }], propDecorators: { src: [{
                type: Input
            }] } });
class ICardBody {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ICardBody, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: ICardBody, isStandalone: true, selector: "i-card-body", ngImport: i0, template: `<ng-content />`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ICardBody, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-card-body',
                    imports: [],
                    template: `<ng-content />`,
                }]
        }] });
class ICardFooter {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ICardFooter, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: ICardFooter, isStandalone: true, selector: "i-card-footer", ngImport: i0, template: `<ng-content />`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ICardFooter, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-card-footer',
                    imports: [],
                    template: `<ng-content />`,
                }]
        }] });
class ICardModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ICardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.16", ngImport: i0, type: ICardModule, imports: [ICard, ICardBody, ICardFooter, ICardImage], exports: [ICard, ICardBody, ICardFooter, ICardImage] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ICardModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ICardModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ICard, ICardBody, ICardFooter, ICardImage],
                    exports: [ICard, ICardBody, ICardFooter, ICardImage],
                }]
        }] });

function coerceBool(v) {
    return v !== null && v !== undefined && `${v}` !== 'false';
}
function escapeHtml(s) {
    return (s ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}
function getExtFromPath(path) {
    const clean = (path || '').split('?')[0].split('#')[0];
    const file = clean.split('/').pop() ?? '';
    const idx = file.lastIndexOf('.');
    return idx >= 0 ? file.slice(idx + 1).toLowerCase() : '';
}
function languageFromExt(ext) {
    switch ((ext || '').toLowerCase()) {
        case 'ts':
            return 'typescript';
        case 'tsx':
            return 'tsx';
        case 'js':
        case 'mjs':
        case 'cjs':
            return 'javascript';
        case 'jsx':
            return 'jsx';
        case 'json':
            return 'json';
        case 'html':
        case 'htm':
            return 'html';
        case 'css':
            return 'css';
        case 'scss':
            return 'scss';
        case 'yml':
        case 'yaml':
            return 'yaml';
        case 'md':
            return 'markdown';
        case 'sql':
            return 'sql';
        case 'sh':
        case 'bash':
            return 'bash';
        case 'txt':
            return 'text';
        default:
            return 'text';
    }
}
function parseHeight(v) {
    if (v === null || v === undefined) {
        return null;
    }
    const s = String(v).trim().toLowerCase();
    if (s === '' || s === 'wrap' || s === 'auto') {
        return null;
    }
    if (s.endsWith('px')) {
        const n = Number(s.slice(0, -2).trim());
        return Number.isFinite(n) && n > 0 ? n : null;
    }
    const n = Number(s);
    return Number.isFinite(n) && n > 0 ? n : null;
}
function isAbsoluteUrl(path) {
    return /^https?:\/\//i.test(path) || /^\/\//.test(path);
}
/** MF remote-safe: resolve relative file path against the remote bundle URL */
function resolveFileUrl(file) {
    const f = (file ?? '').trim();
    if (!f) {
        return f;
    }
    if (isAbsoluteUrl(f) || f.startsWith('/')) {
        return f;
    }
    const base = import.meta.url;
    return new URL(f.replace(/^\.\//, ''), base).toString();
}
function normalizeHljsLanguage(lang) {
    if (lang === 'html') {
        return 'xml';
    }
    return lang;
}
class ICodeViewer {
    cdr = inject(ChangeDetectorRef);
    http = inject(HttpClient);
    projectedTpl;
    // ===== Inputs =====
    _languageOverride = null;
    set language(v) {
        const s = (v ?? '').trim();
        this._languageOverride = s ? s : null;
        this.recompute();
    }
    get language() {
        return this._languageOverride;
    }
    _file = '';
    set file(v) {
        const next = (v ?? '').trim();
        if (next === this._file) {
            return;
        }
        this._file = next;
        if (this._file) {
            this.loadFile(this._file);
        }
        else {
            this.loading = false;
            this.error = '';
            this.recompute();
        }
    }
    get file() {
        return this._file;
    }
    _code = '';
    set code(v) {
        this._code = v ?? '';
        this.recompute();
    }
    get code() {
        return this._code;
    }
    wrap = false;
    compact = false;
    /** default false */
    lineNumbers = false;
    /** overlay controls */
    overlay = true;
    showFileType = true;
    copy = true;
    scroll = false;
    _heightPx = null;
    set height(v) {
        this._heightPx = parseHeight(v);
        this.cdr.markForCheck();
    }
    get height() {
        return this._heightPx ?? 'wrap';
    }
    highlighter = 'auto';
    // ✅ standardize to on*
    onFileLoaded = new EventEmitter();
    // ===== State =====
    loading = false;
    error = '';
    renderedHtml = '';
    copied = false;
    lineNumberList = [];
    requestSeq = 0;
    _fileLanguage = 'text';
    hljsPromise = null;
    hljs = null;
    // ===== Derived =====
    get heightPx() {
        return this._heightPx;
    }
    get scrollEffective() {
        return this.scroll || this._heightPx !== null;
    }
    get showOverlay() {
        return this.overlay && (this.showFileType || this.copy);
    }
    get effectiveLanguage() {
        if (this._languageOverride) {
            return this._languageOverride;
        }
        if (this._file) {
            return this._fileLanguage;
        }
        return 'text';
    }
    get fileTypeLabel() {
        const l = (this.effectiveLanguage || 'text').toUpperCase();
        return l === 'TEXT' ? 'CODE' : l;
    }
    // ===== Core =====
    recompute() {
        if (!this._code && !this._file) {
            const projected = this.readProjectedContent();
            if (projected) {
                this._code = projected;
            }
        }
        if (this.lineNumbers) {
            const lines = this.countLines(this._code);
            this.lineNumberList = Array.from({ length: lines }, (_, i) => i + 1);
        }
        else {
            this.lineNumberList = [];
        }
        this.renderedHtml = this.renderToHtmlSync(this._code, this.effectiveLanguage);
        this.cdr.markForCheck();
        this.maybeHighlightAsync();
    }
    countLines(text) {
        if (!text) {
            return 1;
        }
        return text.split('\n').length;
    }
    readProjectedContent() {
        const host = document.createElement('div');
        const view = this.projectedTpl.createEmbeddedView({});
        view.detectChanges();
        view.rootNodes.forEach((n) => {
            if (typeof n === 'string') {
                host.append(n);
            }
            else if (n?.textContent) {
                host.append(n.textContent);
            }
        });
        view.destroy();
        return host.textContent?.trim() ?? '';
    }
    shouldUseHljs() {
        return this.highlighter === 'hljs' || this.highlighter === 'auto';
    }
    renderToHtmlSync(raw, language) {
        const text = raw ?? '';
        if (!text) {
            return '';
        }
        if (this.highlighter === 'none') {
            return escapeHtml(text);
        }
        if (this.shouldUseHljs() && this.hljs) {
            return this.highlightWithHljs(text, language);
        }
        return escapeHtml(text);
    }
    async maybeHighlightAsync() {
        if (!this.shouldUseHljs()) {
            return;
        }
        if (!this._code) {
            return;
        }
        if (!this.hljs) {
            await this.loadHljsIfNeeded();
            if (!this.hljs) {
                return;
            }
        }
        this.renderedHtml = this.highlightWithHljs(this._code, this.effectiveLanguage);
        this.cdr.markForCheck();
    }
    highlightWithHljs(text, language) {
        try {
            const hljs = this.hljs;
            const lang = normalizeHljsLanguage(language);
            if (lang && hljs.getLanguage?.(lang)) {
                return hljs.highlight(text, { language: lang }).value;
            }
            return hljs.highlightAuto(text).value;
        }
        catch {
            return escapeHtml(text);
        }
    }
    async loadHljsIfNeeded() {
        if (this.hljs) {
            return;
        }
        const w = globalThis;
        if (w?.hljs?.highlight && w?.hljs?.highlightAuto) {
            this.hljs = w.hljs;
            return;
        }
        if (!this.hljsPromise) {
            this.hljsPromise = import('highlight.js').then((m) => m.default ?? m).catch(() => null);
        }
        const loaded = await this.hljsPromise;
        if (loaded?.highlight && loaded?.highlightAuto) {
            this.hljs = loaded;
        }
    }
    async loadFile(path) {
        const seq = ++this.requestSeq;
        this.loading = true;
        this.error = '';
        this.cdr.markForCheck();
        this._fileLanguage = languageFromExt(getExtFromPath(path));
        try {
            const url = resolveFileUrl(path);
            const content = await firstValueFrom(this.http.get(url, { responseType: 'text' }));
            if (seq !== this.requestSeq) {
                return;
            }
            this._code = content ?? '';
            this.loading = false;
            this.error = '';
            this.recompute();
            // ✅ standardize to on*
            this.onFileLoaded.emit({ file: url, language: this.effectiveLanguage });
        }
        catch {
            if (seq !== this.requestSeq) {
                return;
            }
            this.loading = false;
            this.error = `Failed to load: ${path}`;
            this.recompute();
        }
    }
    async onCopy() {
        const text = this._code ?? '';
        if (!text || this.loading) {
            return;
        }
        const done = () => {
            this.copied = true;
            this.cdr.markForCheck();
            setTimeout(() => {
                this.copied = false;
                this.cdr.markForCheck();
            }, 1200);
        };
        try {
            if (navigator?.clipboard?.writeText) {
                await navigator.clipboard.writeText(text);
                done();
                return;
            }
        }
        catch {
            // fallback below
        }
        try {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.left = '-9999px';
            ta.style.top = '0';
            document.body.appendChild(ta);
            ta.focus();
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            done();
        }
        catch {
            // ignore
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ICodeViewer, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.16", type: ICodeViewer, isStandalone: true, selector: "i-code-viewer", inputs: { language: "language", file: "file", code: "code", wrap: ["wrap", "wrap", coerceBool], compact: ["compact", "compact", coerceBool], lineNumbers: ["lineNumbers", "lineNumbers", coerceBool], overlay: ["overlay", "overlay", coerceBool], showFileType: ["showFileType", "showFileType", coerceBool], copy: ["copy", "copy", coerceBool], scroll: ["scroll", "scroll", coerceBool], height: "height", highlighter: "highlighter" }, outputs: { onFileLoaded: "onFileLoaded" }, viewQueries: [{ propertyName: "projectedTpl", first: true, predicate: ["projected"], descendants: true, static: true }], ngImport: i0, template: `
    <ng-template #projected>
      <ng-content />
    </ng-template>

    <div class="i-code-viewer" [class.compact]="compact" [class.wrap]="wrap">
      @if (loading) {
        <div class="i-code-viewer-loading">Loading…</div>
      }
      @if (error) {
        <div class="i-code-viewer-error">{{ error }}</div>
      }

      <div
        class="i-code-viewer-scroll"
        [class.has-overlay]="showOverlay"
        [class.scroll]="scrollEffective"
        [class.scroll-y]="scrollEffective"
        [style.height.px]="heightPx"
      >
        @if (showOverlay) {
          <div class="i-code-viewer-overlay hljs">
            @if (showFileType) {
              <span class="i-code-viewer-filetype">{{ fileTypeLabel }}</span>
            }
            @if (copy) {
              <i-button
                class="i-code-viewer-copy"
                size="xs"
                variant="outline"
                [disabled]="loading"
                (onClick)="onCopy()"
              >
                {{ copied ? 'Copied' : 'Copy' }}
              </i-button>
            }
          </div>
        }

        <!-- content row -->
        <div class="i-code-viewer-content hljs scroll scroll-y">
          @if (lineNumbers) {
            <div aria-hidden="true" class="i-code-viewer-gutter">
              @for (n of lineNumberList; track n) {
                <div class="i-code-viewer-line">{{ n }}</div>
              }
            </div>
          }

          <pre class="i-code-viewer-pre">
            <code
              class="i-code-viewer-code hljs"
              [attr.data-language]="effectiveLanguage"
              [innerHTML]="renderedHtml"
            ></code>
          </pre>
        </div>
      </div>
    </div>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: IButton, selector: "i-button", inputs: ["disabled", "loading", "type", "loadingText", "variant", "size", "icon"], outputs: ["onClick"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ICodeViewer, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-code-viewer',
                    standalone: true,
                    imports: [CommonModule, IButton],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <ng-template #projected>
      <ng-content />
    </ng-template>

    <div class="i-code-viewer" [class.compact]="compact" [class.wrap]="wrap">
      @if (loading) {
        <div class="i-code-viewer-loading">Loading…</div>
      }
      @if (error) {
        <div class="i-code-viewer-error">{{ error }}</div>
      }

      <div
        class="i-code-viewer-scroll"
        [class.has-overlay]="showOverlay"
        [class.scroll]="scrollEffective"
        [class.scroll-y]="scrollEffective"
        [style.height.px]="heightPx"
      >
        @if (showOverlay) {
          <div class="i-code-viewer-overlay hljs">
            @if (showFileType) {
              <span class="i-code-viewer-filetype">{{ fileTypeLabel }}</span>
            }
            @if (copy) {
              <i-button
                class="i-code-viewer-copy"
                size="xs"
                variant="outline"
                [disabled]="loading"
                (onClick)="onCopy()"
              >
                {{ copied ? 'Copied' : 'Copy' }}
              </i-button>
            }
          </div>
        }

        <!-- content row -->
        <div class="i-code-viewer-content hljs scroll scroll-y">
          @if (lineNumbers) {
            <div aria-hidden="true" class="i-code-viewer-gutter">
              @for (n of lineNumberList; track n) {
                <div class="i-code-viewer-line">{{ n }}</div>
              }
            </div>
          }

          <pre class="i-code-viewer-pre">
            <code
              class="i-code-viewer-code hljs"
              [attr.data-language]="effectiveLanguage"
              [innerHTML]="renderedHtml"
            ></code>
          </pre>
        </div>
      </div>
    </div>
  `,
                }]
        }], propDecorators: { projectedTpl: [{
                type: ViewChild,
                args: ['projected', { static: true }]
            }], language: [{
                type: Input
            }], file: [{
                type: Input
            }], code: [{
                type: Input
            }], wrap: [{
                type: Input,
                args: [{ transform: coerceBool }]
            }], compact: [{
                type: Input,
                args: [{ transform: coerceBool }]
            }], lineNumbers: [{
                type: Input,
                args: [{ transform: coerceBool }]
            }], overlay: [{
                type: Input,
                args: [{ transform: coerceBool }]
            }], showFileType: [{
                type: Input,
                args: [{ transform: coerceBool }]
            }], copy: [{
                type: Input,
                args: [{ transform: coerceBool }]
            }], scroll: [{
                type: Input,
                args: [{ transform: coerceBool }]
            }], height: [{
                type: Input
            }], highlighter: [{
                type: Input
            }], onFileLoaded: [{
                type: Output
            }] } });
class ICodeViewerModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ICodeViewerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.16", ngImport: i0, type: ICodeViewerModule, imports: [ICodeViewer], exports: [ICodeViewer] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ICodeViewerModule, imports: [ICodeViewer] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ICodeViewerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ICodeViewer],
                    exports: [ICodeViewer],
                }]
        }] });

const DEFAULT_ERROR_FACTORIES = {
    required: ({ label }) => `${label || 'This field'} is required.`,
    requiredTrue: ({ label }) => `Please confirm ${label || 'this field'}.`,
    minlength: ({ label, error }) => `${label || 'This field'} must be at least ${error.requiredLength} characters (currently ${error.actualLength}).`,
    maxlength: ({ label, error }) => `${label || 'This field'} must be at most ${error.requiredLength} characters (currently ${error.actualLength}).`,
    pattern: ({ label }) => `${label || 'This field'} format is invalid.`,
    email: ({ label }) => `Please enter a valid ${label || 'email'}.`,
    min: ({ label, error }) => `${label || 'This field'} must be ≥ ${error.min}.`,
    max: ({ label, error }) => `${label || 'This field'} must be ≤ ${error.max}.`,
};
function resolveControlErrorMessage(ngControl, label, errorMessage, extraFactories = {}) {
    const control = ngControl?.control ?? null;
    const errors = control?.errors ?? null;
    if (!errors) {
        return null;
    }
    const keys = Object.keys(errors);
    if (!keys.length) {
        return null;
    }
    const key = keys[0];
    const err = errors[key];
    const trimmedLabel = (label || '').trim();
    const ctx = {
        label: trimmedLabel,
        error: err,
        control,
    };
    // 1) custom template via [errorMessage]
    const customTpl = errorMessage?.[key];
    if (customTpl) {
        return interpolate(customTpl, ctx);
    }
    // 2) default or extra factory
    const factories = { ...DEFAULT_ERROR_FACTORIES, ...extraFactories };
    const factory = factories[key];
    if (factory) {
        return factory(ctx);
    }
    // 3) fallback
    return `${trimmedLabel || 'This field'} is invalid.`;
}
function isControlRequired(ngControl, errorMessage) {
    const control = ngControl?.control ?? null;
    const hasCustomRequired = !!errorMessage?.['required'];
    if (!control) {
        return hasCustomRequired;
    }
    let hasRequired = false;
    const asAny = control;
    if (typeof asAny.hasValidator === 'function') {
        hasRequired = asAny.hasValidator(Validators.required);
    }
    else if (control.validator) {
        const res = control.validator({});
        hasRequired = !!res?.['required'];
    }
    return hasRequired || hasCustomRequired;
}
function interpolate(tpl, ctx) {
    const map = {
        label: ctx.label || 'This field',
        requiredLength: ctx.error?.requiredLength,
        actualLength: ctx.error?.actualLength,
        min: ctx.error?.min,
        max: ctx.error?.max,
        ...ctx.error,
    };
    return tpl.replace(/\{(\w+)\}/g, (_match, key) => map[key] !== null ? String(map[key]) : `{${key}}`);
}

class IInputAddon {
    addon;
    get addonKind() {
        return this.addon?.type + '';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IInputAddon, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.16", type: IInputAddon, isStandalone: true, selector: "i-input-addon", inputs: { addon: "addon" }, host: { properties: { "attr.kind": "this.addonKind" } }, ngImport: i0, template: `
    @if (!addon || addon.visible === false) {
    <!-- render nothing -->
    } @else if (addon.type === 'button') {
    <i-button
      size="xs"
      type="button"
      [icon]="addon.icon"
      [variant]="addon.variant ?? 'primary'"
      (onClick)="addon.onClick ? addon.onClick() : null"
    />
    } @else if (addon.type === 'link') {
    <a
      class="i-btn i-btn-xs"
      target="_blank"
      [attr.variant]="addon.variant ?? 'primary'"
      [href]="addon.href"
    >
      <i-icon size="xs" [icon]="addon.icon" />
    </a>
    } @else if (addon.type === 'icon') {
    <i-icon size="sm" [icon]="addon.icon" />
    } @else if (addon.type === 'loading') {
    <i-loading label="" />
    } @else {
    <!-- text -->
    <span>{{ addon.text }}</span>
    }
  `, isInline: true, dependencies: [{ kind: "component", type: IButton, selector: "i-button", inputs: ["disabled", "loading", "type", "loadingText", "variant", "size", "icon"], outputs: ["onClick"] }, { kind: "component", type: IIcon, selector: "i-icon", inputs: ["icon", "size"] }, { kind: "component", type: ILoading, selector: "i-loading", inputs: ["label", "light"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IInputAddon, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-input-addon',
                    standalone: true,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    imports: [IButton, IIcon, ILoading],
                    template: `
    @if (!addon || addon.visible === false) {
    <!-- render nothing -->
    } @else if (addon.type === 'button') {
    <i-button
      size="xs"
      type="button"
      [icon]="addon.icon"
      [variant]="addon.variant ?? 'primary'"
      (onClick)="addon.onClick ? addon.onClick() : null"
    />
    } @else if (addon.type === 'link') {
    <a
      class="i-btn i-btn-xs"
      target="_blank"
      [attr.variant]="addon.variant ?? 'primary'"
      [href]="addon.href"
    >
      <i-icon size="xs" [icon]="addon.icon" />
    </a>
    } @else if (addon.type === 'icon') {
    <i-icon size="sm" [icon]="addon.icon" />
    } @else if (addon.type === 'loading') {
    <i-loading label="" />
    } @else {
    <!-- text -->
    <span>{{ addon.text }}</span>
    }
  `,
                }]
        }], propDecorators: { addon: [{
                type: Input,
                args: [{ required: true }]
            }], addonKind: [{
                type: HostBinding,
                args: ['attr.kind']
            }] } });

/**
 * IInputMaskDirective
 * Version: 1.4.2
 *
 * Fixes (1.4.2):
 * - Works when applied to wrapper elements like <i-input> (custom element)
 * - Always resolves the real native <input>/<textarea> before reading/writing value
 * - Prevents setSelectionRange crash (only call when supported)
 * - Prevents "value gone on click" (was writing to <i-input> host instead of inner <input>)
 *
 * Usage:
 *   <input [iInputMask]="{ type: 'date', format: 'dd/MM/yyyy' }" />
 *   <i-input [iInputMask]="{ type: 'date', format: 'dd/MM/yyyy' }" />
 */
class IInputMaskDirective {
    elRef;
    mask;
    /** Whether initial default (today / now) has been applied */
    _defaultApplied = false;
    // NOTE: must be HTMLElement, because this directive is often applied to <i-input>
    constructor(elRef) {
        this.elRef = elRef;
    }
    // ----------------------------------------------------
    // Lifecycle
    // ----------------------------------------------------
    ngOnInit() {
        this.applyInitialDefaultIfNeeded();
    }
    ngOnChanges(changes) {
        if (changes['mask']) {
            // allow default to re-apply if mask changes AND input is still empty
            this.applyInitialDefaultIfNeeded();
        }
    }
    // ----------------------------------------------------
    // Element resolution (CRITICAL FIX)
    // ----------------------------------------------------
    /**
     * Resolve the real native input/textarea.
     * Works for:
     * - <input iInputMask ...>
     * - <textarea iInputMask ...>
     * - <i-input iInputMask ...> (wrapper custom element)
     */
    get nativeInput() {
        const host = this.elRef.nativeElement;
        if (host instanceof HTMLInputElement || host instanceof HTMLTextAreaElement) {
            return host;
        }
        // wrapper element: find inner input/textarea
        const found = host.querySelector('input, textarea');
        if (found instanceof HTMLInputElement || found instanceof HTMLTextAreaElement) {
            return found;
        }
        return null;
    }
    get hasMask() {
        const el = this.nativeInput;
        return !!this.mask && !!el && !el.readOnly && !el.disabled;
    }
    safeSetSelectionRange(el, start, end) {
        // Some input types don't support selection; also avoid crashing ever.
        try {
            if (typeof el.setSelectionRange === 'function') {
                el.setSelectionRange(start, end);
            }
        }
        catch {
            // ignore
        }
    }
    dispatchInputEvent() {
        const el = this.nativeInput;
        if (!el)
            return;
        const ev = new Event('input', { bubbles: true });
        el.dispatchEvent(ev);
    }
    computeDefaultForMask() {
        if (!this.mask) {
            return null;
        }
        const now = new Date();
        if (this.mask.type === 'date') {
            const fmt = this.mask.format || 'dd/MM/yyyy';
            return formatDate(now, fmt, 'en');
        }
        if (this.mask.type === 'time') {
            const fmt = this.mask.format || 'HH:mm';
            return formatDate(now, fmt, 'en');
        }
        return null;
    }
    applyInitialDefaultIfNeeded() {
        if (!this.mask)
            return;
        const el = this.nativeInput;
        if (!el)
            return;
        if (this._defaultApplied)
            return;
        // If already has a value, do not override.
        if (el.value && el.value.trim().length > 0)
            return;
        const def = this.computeDefaultForMask();
        if (def === null)
            return;
        this._defaultApplied = true;
        el.value = def;
        this.dispatchInputEvent();
    }
    isControlKey(event) {
        const key = event.key;
        const controlKeys = [
            'Backspace',
            'Delete',
            'ArrowLeft',
            'ArrowRight',
            'ArrowUp',
            'ArrowDown',
            'Tab',
            'Home',
            'End',
            'Enter',
            'Escape',
        ];
        if (controlKeys.includes(key))
            return true;
        if (event.ctrlKey || event.metaKey || event.altKey)
            return true;
        return false;
    }
    // ----------------------------------------------------
    // DATE HELPERS
    // ----------------------------------------------------
    daysInMonth(year, month1Based) {
        return new Date(year, month1Based, 0).getDate();
    }
    /** Split date format into tokens (dd, MM, yyyy) and separators. */
    splitDateFormat(format) {
        const tokens = [];
        const seps = [];
        let currentSep = '';
        let i = 0;
        const isTokenChar = (c) => c === 'd' || c === 'M' || c === 'y';
        while (i < format.length) {
            const c = format[i];
            if (!isTokenChar(c)) {
                currentSep += c;
                i++;
                continue;
            }
            seps.push(currentSep);
            currentSep = '';
            const ch = c;
            let token = ch;
            let j = i + 1;
            while (j < format.length && format[j] === ch) {
                token += format[j];
                j++;
            }
            tokens.push(token);
            i = j;
        }
        seps.push(currentSep);
        return { tokens, seps };
    }
    /** Segments (day, month, year) with actual positions in current value. */
    getDateSegments(value, format) {
        const { tokens, seps } = this.splitDateFormat(format);
        const segments = [];
        let pos = 0;
        if (seps[0]) {
            const s0 = seps[0];
            if (value.startsWith(s0))
                pos += s0.length;
        }
        for (let i = 0; i < tokens.length; i++) {
            const tok = tokens[i];
            const ch = tok[0];
            const kind = ch === 'd' ? 'day' : ch === 'M' ? 'month' : 'year';
            const start = pos;
            let end = pos;
            while (end < value.length && /\d/.test(value[end]))
                end++;
            const raw = value.slice(start, end);
            segments.push({ kind, start, end, raw });
            pos = end;
            const sep = seps[i + 1] ?? '';
            if (sep && value.substr(pos, sep.length) === sep) {
                pos += sep.length;
            }
        }
        return segments;
    }
    /** Format day/month/year back to string according to format tokens. */
    formatDateFromParts(day, month, year, format) {
        const { tokens, seps } = this.splitDateFormat(format);
        let result = seps[0] ?? '';
        for (let i = 0; i < tokens.length; i++) {
            const tok = tokens[i];
            const ch = tok[0];
            const len = tok.length;
            if (ch === 'd') {
                result += String(day).padStart(len, '0');
            }
            else if (ch === 'M') {
                result += String(month).padStart(len, '0');
            }
            else {
                let s = String(year);
                if (s.length < len)
                    s = s.padStart(len, '0');
                else if (s.length > len)
                    s = s.slice(-len);
                result += s;
            }
            if (i < tokens.length - 1)
                result += seps[i + 1] ?? '';
        }
        return result;
    }
    /** Normalize full date string (used on blur / Enter). */
    normalizeDateValue(value, format) {
        if (!value)
            return value;
        const segments = this.getDateSegments(value, format);
        if (!segments.length)
            return value;
        let day = 1;
        let month = 1;
        let year = 2000;
        for (const seg of segments) {
            const n = seg.raw ? Number(seg.raw) : NaN;
            if (Number.isNaN(n))
                continue;
            if (seg.kind === 'day')
                day = n;
            else if (seg.kind === 'month')
                month = n;
            else
                year = n;
        }
        if (month < 1)
            month = 1;
        if (month > 12)
            month = 12;
        const maxDay = this.daysInMonth(year > 0 ? year : 2000, month);
        if (day < 1)
            day = 1;
        if (day > maxDay)
            day = maxDay;
        return this.formatDateFromParts(day, month, year, format);
    }
    /**
     * Digits-only behavior for date mask (no separators typed yet).
     *
     * For dd/MM/yyyy:
     * - "12"       → "12/"
     * - "1210"     → "12/10/"
     * - "12101980" → "12/10/1980"
     */
    applyDateMaskDigitsOnly(digits, format) {
        const { tokens, seps } = this.splitDateFormat(format);
        if (!tokens.length)
            return digits;
        const firstSep = seps[1] ?? '';
        const secondSep = seps[2] ?? '';
        if (digits.length <= 2) {
            if (digits.length === 2 && firstSep)
                return digits + firstSep;
            return digits;
        }
        if (digits.length <= 4) {
            const dRaw = digits.slice(0, 2);
            const mRaw = digits.slice(2);
            let res = dRaw;
            if (firstSep)
                res += firstSep;
            if (mRaw.length) {
                res += mRaw;
                if (mRaw.length === 2 && secondSep)
                    res += secondSep;
            }
            return res;
        }
        const dStr = digits.slice(0, 2);
        const mStr = digits.slice(2, 4);
        const yStr = digits.slice(4, 8);
        let day = Number(dStr || '1');
        let month = Number(mStr || '1');
        const year = Number(yStr || '2000');
        if (month < 1)
            month = 1;
        if (month > 12)
            month = 12;
        const maxDay = this.daysInMonth(year > 0 ? year : 2000, month);
        if (day < 1)
            day = 1;
        if (day > maxDay)
            day = maxDay;
        return this.formatDateFromParts(day, month, year, format);
    }
    applyDateMask(raw, format) {
        if (!raw)
            return '';
        const hasSeparator = /[^0-9]/.test(raw);
        const { tokens, seps } = this.splitDateFormat(format);
        if (!tokens.length)
            return raw.replace(/\D/g, '');
        if (!hasSeparator) {
            const digits = raw.replace(/\D/g, '');
            if (!digits)
                return '';
            return this.applyDateMaskDigitsOnly(digits, format);
        }
        const rawSegs = raw.split(/[^0-9]/);
        const rawSeps = raw.match(/[^0-9]+/g) ?? [];
        const parts = [];
        for (let i = 0; i < tokens.length; i++) {
            const tok = tokens[i];
            const ch = tok[0];
            const len = tok.length;
            const rawSeg = (rawSegs[i] ?? '').replace(/\D/g, '');
            const kind = ch === 'd' ? 'day' : ch === 'M' ? 'month' : 'year';
            const closed = rawSeg.length >= len;
            parts.push({ kind, raw: rawSeg.slice(0, len), len, closed, out: '' });
        }
        const dayPart = parts.find((p) => p.kind === 'day');
        const monthPart = parts.find((p) => p.kind === 'month');
        const yearPart = parts.find((p) => p.kind === 'year');
        let monthNumForClamp = null;
        if (monthPart && monthPart.closed && monthPart.raw) {
            let m = Number(monthPart.raw);
            if (m < 1)
                m = 1;
            if (m > 12)
                m = 12;
            monthNumForClamp = m;
        }
        let yearForCalc = 2000;
        if (yearPart && yearPart.closed && yearPart.raw) {
            const y = Number(yearPart.raw);
            yearForCalc = y > 0 ? y : 2000;
        }
        if (monthPart) {
            if (monthPart.closed && monthPart.raw) {
                let m = monthNumForClamp ?? Number(monthPart.raw);
                if (m < 1)
                    m = 1;
                if (m > 12)
                    m = 12;
                monthPart.out = String(m).padStart(monthPart.len, '0');
                monthNumForClamp = m;
            }
            else {
                monthPart.out = monthPart.raw;
            }
        }
        if (dayPart) {
            if (dayPart.closed && dayPart.raw) {
                let d = Number(dayPart.raw);
                const monthForDay = monthNumForClamp !== null ? monthNumForClamp : 1;
                const maxDay = this.daysInMonth(yearForCalc, monthForDay);
                if (d < 1)
                    d = 1;
                if (d > maxDay)
                    d = maxDay;
                dayPart.out = String(d).padStart(dayPart.len, '0');
            }
            else {
                dayPart.out = dayPart.raw;
            }
        }
        if (yearPart) {
            yearPart.out = yearPart.raw;
        }
        const outSegs = parts.map((p) => p.out);
        const hasDigits = parts.map((p) => p.raw.length > 0);
        let result = seps[0] ?? '';
        for (let i = 0; i < parts.length; i++) {
            result += outSegs[i] ?? '';
            if (i < parts.length - 1) {
                const sepFmt = seps[i + 1] ?? '';
                const hadRawSep = i < rawSeps.length;
                const segClosed = parts[i].closed;
                const nextHasDigits = hasDigits[i + 1];
                if (sepFmt && (hadRawSep || segClosed || nextHasDigits)) {
                    result += sepFmt;
                }
            }
        }
        return result.replace(/[^0-9]+$/, (sep) => {
            const prefix = result.slice(0, -sep.length);
            return /\d/.test(prefix) ? sep : '';
        });
    }
    adjustDateSegmentByArrow(key) {
        if (!this.mask || this.mask.type !== 'date' || !this.mask.format)
            return;
        const el = this.nativeInput;
        if (!el)
            return;
        const format = this.mask.format;
        const value = el.value;
        const segments = this.getDateSegments(value, format);
        if (!segments.length)
            return;
        const caret = el.selectionStart ?? value.length;
        let idx = segments.findIndex((s) => caret >= s.start && caret <= s.end);
        if (idx === -1) {
            idx = segments.findIndex((s) => caret < s.start);
            if (idx === -1)
                idx = segments.length - 1;
            if (idx > 0 && caret > segments[idx - 1].end)
                idx = idx - 1;
        }
        if (idx < 0)
            idx = 0;
        let day = 1;
        let month = 1;
        let year = 2000;
        for (const seg of segments) {
            const n = seg.raw ? Number(seg.raw) : NaN;
            if (Number.isNaN(n))
                continue;
            if (seg.kind === 'day')
                day = n;
            else if (seg.kind === 'month')
                month = n;
            else
                year = n;
        }
        if (month < 1)
            month = 1;
        if (month > 12)
            month = 12;
        let maxDay = this.daysInMonth(year > 0 ? year : 2000, month);
        if (day < 1)
            day = 1;
        if (day > maxDay)
            day = maxDay;
        const seg = segments[idx];
        if (seg.kind === 'day') {
            if (key === 'ArrowUp') {
                day = day + 1;
                if (day > maxDay)
                    day = 1;
            }
            else {
                day = day - 1;
                if (day < 1)
                    day = maxDay;
            }
        }
        else if (seg.kind === 'month') {
            if (key === 'ArrowUp') {
                month = month + 1;
                if (month > 12)
                    month = 1;
            }
            else {
                month = month - 1;
                if (month < 1)
                    month = 12;
            }
        }
        else {
            if (key === 'ArrowUp')
                year = year + 1;
            else {
                year = year - 1;
                if (year < 0)
                    year = 0;
            }
        }
        maxDay = this.daysInMonth(year > 0 ? year : 2000, month);
        if (day > maxDay)
            day = maxDay;
        const newValue = this.formatDateFromParts(day, month, year, format);
        el.value = newValue;
        this.dispatchInputEvent();
        const newSegments = this.getDateSegments(newValue, format);
        const newSeg = newSegments[idx] ?? newSegments[newSegments.length - 1];
        if (newSeg)
            this.safeSetSelectionRange(el, newSeg.start, newSeg.end);
    }
    // ----------------------------------------------------
    // TIME HELPERS
    // ----------------------------------------------------
    splitTimeFormat(format) {
        const tokens = [];
        const seps = [];
        let currentSep = '';
        let i = 0;
        const isTokenChar = (c) => c === 'H' || c === 'm' || c === 's';
        while (i < format.length) {
            const c = format[i];
            if (!isTokenChar(c)) {
                currentSep += c;
                i++;
                continue;
            }
            seps.push(currentSep);
            currentSep = '';
            const ch = c;
            let token = ch;
            let j = i + 1;
            while (j < format.length && format[j] === ch) {
                token += format[j];
                j++;
            }
            tokens.push(token);
            i = j;
        }
        seps.push(currentSep);
        return { tokens, seps };
    }
    getTimeSegments(value, format) {
        const { tokens, seps } = this.splitTimeFormat(format);
        const segments = [];
        let pos = 0;
        if (seps[0]) {
            const s0 = seps[0];
            if (value.startsWith(s0))
                pos += s0.length;
        }
        for (let i = 0; i < tokens.length; i++) {
            const tok = tokens[i];
            const ch = tok[0];
            const kind = ch === 'H' ? 'hour' : ch === 'm' ? 'minute' : 'second';
            const start = pos;
            let end = pos;
            while (end < value.length && /\d/.test(value[end]))
                end++;
            const raw = value.slice(start, end);
            segments.push({ kind, start, end, raw });
            pos = end;
            const sep = seps[i + 1] ?? '';
            if (sep && value.substr(pos, sep.length) === sep) {
                pos += sep.length;
            }
        }
        return segments;
    }
    formatTimeFromParts(hour, minute, second, format) {
        const { tokens, seps } = this.splitTimeFormat(format);
        let result = seps[0] ?? '';
        for (let i = 0; i < tokens.length; i++) {
            const tok = tokens[i];
            const ch = tok[0];
            const len = tok.length;
            if (ch === 'H')
                result += String(hour).padStart(len, '0');
            else if (ch === 'm')
                result += String(minute).padStart(len, '0');
            else
                result += String(second).padStart(len, '0');
            if (i < tokens.length - 1)
                result += seps[i + 1] ?? '';
        }
        return result;
    }
    normalizeTimeValue(value, format) {
        if (!value)
            return value;
        const segments = this.getTimeSegments(value, format);
        if (!segments.length)
            return value;
        let hour = 0;
        let minute = 0;
        let second = 0;
        for (const seg of segments) {
            const n = seg.raw ? Number(seg.raw) : NaN;
            if (Number.isNaN(n))
                continue;
            if (seg.kind === 'hour')
                hour = n;
            else if (seg.kind === 'minute')
                minute = n;
            else
                second = n;
        }
        if (hour < 0)
            hour = 0;
        if (hour > 23)
            hour = 23;
        if (minute < 0)
            minute = 0;
        if (minute > 59)
            minute = 59;
        if (second < 0)
            second = 0;
        if (second > 59)
            second = 59;
        return this.formatTimeFromParts(hour, minute, second, format);
    }
    applyTimeMaskDigitsOnly(digits, format) {
        const { tokens, seps } = this.splitTimeFormat(format);
        if (!tokens.length)
            return digits;
        const firstSep = seps[1] ?? '';
        const secondSep = seps[2] ?? '';
        const hasMinutes = tokens.length >= 2 && tokens[1][0] === 'm';
        const hasSeconds = tokens.length >= 3 && tokens[2][0] === 's';
        if (hasMinutes && !hasSeconds) {
            if (digits.length <= 2) {
                if (digits.length === 2 && firstSep)
                    return digits + firstSep;
                return digits;
            }
            if (digits.length <= 4) {
                const hRaw = digits.slice(0, 2);
                const mRaw = digits.slice(2);
                let res = hRaw;
                if (firstSep)
                    res += firstSep;
                if (mRaw.length)
                    res += mRaw;
                return res;
            }
            const hStr = digits.slice(0, 2);
            const mStr = digits.slice(2, 4);
            let hour = Number(hStr || '0');
            let minute = Number(mStr || '0');
            if (hour < 0)
                hour = 0;
            if (hour > 23)
                hour = 23;
            if (minute < 0)
                minute = 0;
            if (minute > 59)
                minute = 59;
            return this.formatTimeFromParts(hour, minute, 0, format);
        }
        if (hasMinutes && hasSeconds) {
            if (digits.length <= 2) {
                if (digits.length === 2 && firstSep)
                    return digits + firstSep;
                return digits;
            }
            if (digits.length <= 4) {
                const hRaw = digits.slice(0, 2);
                const mRaw = digits.slice(2);
                let res = hRaw;
                if (firstSep)
                    res += firstSep;
                if (mRaw.length) {
                    res += mRaw;
                    if (mRaw.length === 2 && secondSep)
                        res += secondSep;
                }
                return res;
            }
            if (digits.length <= 6) {
                const hRaw = digits.slice(0, 2);
                const mRaw = digits.slice(2, 4);
                const sRaw = digits.slice(4);
                let res = hRaw;
                if (firstSep)
                    res += firstSep;
                res += mRaw;
                if (secondSep)
                    res += secondSep;
                res += sRaw;
                return res;
            }
            const hStr = digits.slice(0, 2);
            const mStr = digits.slice(2, 4);
            const sStr = digits.slice(4, 6);
            let hour = Number(hStr || '0');
            let minute = Number(mStr || '0');
            let second = Number(sStr || '0');
            if (hour < 0)
                hour = 0;
            if (hour > 23)
                hour = 23;
            if (minute < 0)
                minute = 0;
            if (minute > 59)
                minute = 59;
            if (second < 0)
                second = 0;
            if (second > 59)
                second = 59;
            return this.formatTimeFromParts(hour, minute, second, format);
        }
        return digits;
    }
    applyTimeMask(raw, format) {
        if (!raw)
            return '';
        const hasSeparator = /[^0-9]/.test(raw);
        const { tokens, seps } = this.splitTimeFormat(format);
        if (!tokens.length)
            return raw.replace(/\D/g, '');
        if (!hasSeparator) {
            const digits = raw.replace(/\D/g, '');
            if (!digits)
                return '';
            return this.applyTimeMaskDigitsOnly(digits, format);
        }
        const rawSegs = raw.split(/[^0-9]/);
        const rawSeps = raw.match(/[^0-9]+/g) ?? [];
        const parts = [];
        for (let i = 0; i < tokens.length; i++) {
            const tok = tokens[i];
            const ch = tok[0];
            const len = tok.length;
            const rawSeg = (rawSegs[i] ?? '').replace(/\D/g, '');
            const kind = ch === 'H' ? 'hour' : ch === 'm' ? 'minute' : 'second';
            const closed = rawSeg.length >= len;
            parts.push({ kind, raw: rawSeg.slice(0, len), len, closed, out: '' });
        }
        const hourPart = parts.find((p) => p.kind === 'hour');
        const minutePart = parts.find((p) => p.kind === 'minute');
        const secondPart = parts.find((p) => p.kind === 'second');
        let hour = hourPart?.raw ? Number(hourPart.raw) : 0;
        let minute = minutePart?.raw ? Number(minutePart.raw) : 0;
        let second = secondPart?.raw ? Number(secondPart.raw) : 0;
        if (hourPart) {
            if (hourPart.closed && hourPart.raw) {
                if (hour < 0)
                    hour = 0;
                if (hour > 23)
                    hour = 23;
                hourPart.out = String(hour).padStart(hourPart.len, '0');
            }
            else
                hourPart.out = hourPart.raw;
        }
        if (minutePart) {
            if (minutePart.closed && minutePart.raw) {
                if (minute < 0)
                    minute = 0;
                if (minute > 59)
                    minute = 59;
                minutePart.out = String(minute).padStart(minutePart.len, '0');
            }
            else
                minutePart.out = minutePart.raw;
        }
        if (secondPart) {
            if (secondPart.closed && secondPart.raw) {
                if (second < 0)
                    second = 0;
                if (second > 59)
                    second = 59;
                secondPart.out = String(second).padStart(secondPart.len, '0');
            }
            else
                secondPart.out = secondPart.raw;
        }
        const outSegs = parts.map((p) => p.out);
        const hasDigits = parts.map((p) => p.raw.length > 0);
        let result = seps[0] ?? '';
        for (let i = 0; i < parts.length; i++) {
            result += outSegs[i] ?? '';
            if (i < parts.length - 1) {
                const sepFmt = seps[i + 1] ?? '';
                const hadRawSep = i < rawSeps.length;
                const segClosed = parts[i].closed;
                const nextHasDigits = hasDigits[i + 1];
                if (sepFmt && (hadRawSep || segClosed || nextHasDigits)) {
                    result += sepFmt;
                }
            }
        }
        return result.replace(/[^0-9]+$/, (sep) => {
            const prefix = result.slice(0, -sep.length);
            return /\d/.test(prefix) ? sep : '';
        });
    }
    adjustTimeSegmentByArrow(key) {
        if (!this.mask || this.mask.type !== 'time' || !this.mask.format)
            return;
        const el = this.nativeInput;
        if (!el)
            return;
        const format = this.mask.format;
        const value = el.value;
        const segments = this.getTimeSegments(value, format);
        if (!segments.length)
            return;
        const caret = el.selectionStart ?? value.length;
        let idx = segments.findIndex((s) => caret >= s.start && caret <= s.end);
        if (idx === -1) {
            idx = segments.findIndex((s) => caret < s.start);
            if (idx === -1)
                idx = segments.length - 1;
            if (idx > 0 && caret > segments[idx - 1].end)
                idx = idx - 1;
        }
        if (idx < 0)
            idx = 0;
        let hour = 0;
        let minute = 0;
        let second = 0;
        for (const seg of segments) {
            const n = seg.raw ? Number(seg.raw) : NaN;
            if (Number.isNaN(n))
                continue;
            if (seg.kind === 'hour')
                hour = n;
            else if (seg.kind === 'minute')
                minute = n;
            else
                second = n;
        }
        const seg = segments[idx];
        if (seg.kind === 'hour') {
            if (key === 'ArrowUp')
                hour = (hour + 1) % 24;
            else
                hour = (hour - 1 + 24) % 24;
        }
        else if (seg.kind === 'minute') {
            if (key === 'ArrowUp')
                minute = (minute + 1) % 60;
            else
                minute = (minute - 1 + 60) % 60;
        }
        else {
            if (key === 'ArrowUp')
                second = (second + 1) % 60;
            else
                second = (second - 1 + 60) % 60;
        }
        const newValue = this.formatTimeFromParts(hour, minute, second, format);
        el.value = newValue;
        this.dispatchInputEvent();
        const newSegments = this.getTimeSegments(newValue, format);
        const newSeg = newSegments[idx] ?? newSegments[newSegments.length - 1];
        if (newSeg)
            this.safeSetSelectionRange(el, newSeg.start, newSeg.end);
    }
    // ----------------------------------------------------
    // NUMERIC HELPERS
    // ----------------------------------------------------
    applyNumericMask(raw, allowDecimal) {
        if (!raw)
            return '';
        let result = '';
        let hasDecimal = false;
        for (const ch of raw) {
            if (/\d/.test(ch)) {
                result += ch;
                continue;
            }
            if (allowDecimal && (ch === '.' || ch === ',')) {
                if (!hasDecimal) {
                    hasDecimal = true;
                    result += ch;
                }
            }
        }
        return result;
    }
    // ----------------------------------------------------
    // HOST LISTENERS
    // ----------------------------------------------------
    onInput(_event) {
        if (!this.hasMask || !this.mask)
            return;
        const el = this.nativeInput;
        if (!el)
            return;
        const oldValue = el.value ?? '';
        let value = oldValue;
        const type = this.mask.type;
        const format = this.mask.format;
        const prevPos = el.selectionStart ?? oldValue.length;
        if (type === 'date' && format) {
            value = this.applyDateMask(value, format);
        }
        else if (type === 'time' && format) {
            value = this.applyTimeMask(value, format);
        }
        else if (type === 'integer') {
            value = this.applyNumericMask(value, false);
        }
        else if (type === 'number' || type === 'currency') {
            value = this.applyNumericMask(value, true);
        }
        if (value !== oldValue) {
            const oldLen = oldValue.length;
            el.value = value;
            const newLen = value.length;
            const delta = newLen - oldLen;
            const newPos = Math.max(0, Math.min(newLen, prevPos + delta));
            this.safeSetSelectionRange(el, newPos, newPos);
        }
    }
    onBlur() {
        if (!this.mask)
            return;
        const el = this.nativeInput;
        if (!el)
            return;
        if (this.mask.type === 'date' && this.mask.format) {
            if (!el.value)
                return;
            const normalized = this.normalizeDateValue(el.value, this.mask.format);
            if (normalized !== el.value) {
                el.value = normalized;
                this.dispatchInputEvent();
            }
        }
        if (this.mask.type === 'time' && this.mask.format) {
            if (!el.value)
                return;
            const normalized = this.normalizeTimeValue(el.value, this.mask.format);
            if (normalized !== el.value) {
                el.value = normalized;
                this.dispatchInputEvent();
            }
        }
    }
    onFocus() {
        if (!this.mask)
            return;
        const el = this.nativeInput;
        if (!el)
            return;
        if (!this._defaultApplied && el.value.trim() === '') {
            this.applyInitialDefaultIfNeeded();
        }
    }
    onKeydown(event) {
        const el = this.nativeInput;
        if (!this.mask || !el || el.readOnly || el.disabled)
            return;
        const type = this.mask.type;
        const key = event.key;
        // Date ↑/↓ segment adjust
        if (type === 'date' && this.mask.format && (key === 'ArrowUp' || key === 'ArrowDown')) {
            event.preventDefault();
            this.adjustDateSegmentByArrow(key);
            return;
        }
        // Time ↑/↓ segment adjust
        if (type === 'time' && this.mask.format && (key === 'ArrowUp' || key === 'ArrowDown')) {
            event.preventDefault();
            this.adjustTimeSegmentByArrow(key);
            return;
        }
        // Date normalize on Enter
        if (type === 'date' && this.mask.format && key === 'Enter') {
            event.preventDefault();
            if (el.value) {
                const normalized = this.normalizeDateValue(el.value, this.mask.format);
                if (normalized !== el.value) {
                    el.value = normalized;
                    this.dispatchInputEvent();
                }
            }
            return;
        }
        // Time normalize on Enter
        if (type === 'time' && this.mask.format && key === 'Enter') {
            event.preventDefault();
            if (el.value) {
                const normalized = this.normalizeTimeValue(el.value, this.mask.format);
                if (normalized !== el.value) {
                    el.value = normalized;
                    this.dispatchInputEvent();
                }
            }
            return;
        }
        if (this.isControlKey(event))
            return;
        // Date/time: allow digits + separators
        if (type === 'date' || type === 'time') {
            const format = this.mask.format || '';
            const allowedSeps = new Set();
            for (const c of format) {
                if (!/[dMyHms]/.test(c))
                    allowedSeps.add(c);
            }
            if (/\d/.test(key))
                return;
            if (allowedSeps.has(key))
                return;
            event.preventDefault();
            return;
        }
        // Integer
        if (type === 'integer') {
            if (!/\d/.test(key))
                event.preventDefault();
            return;
        }
        // Number/currency
        if (type === 'number' || type === 'currency') {
            if (/\d/.test(key))
                return;
            if (key === '.' || key === ',') {
                const v = el.value;
                if (v.includes('.') || v.includes(',')) {
                    event.preventDefault();
                }
                return;
            }
            event.preventDefault();
            return;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IInputMaskDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.16", type: IInputMaskDirective, isStandalone: true, selector: "[iInputMask]", inputs: { mask: ["iInputMask", "mask"] }, host: { listeners: { "input": "onInput($event)", "blur": "onBlur()", "focus": "onFocus()", "keydown": "onKeydown($event)" } }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IInputMaskDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[iInputMask]',
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { mask: [{
                type: Input,
                args: ['iInputMask']
            }], onInput: [{
                type: HostListener,
                args: ['input', ['$event']]
            }], onBlur: [{
                type: HostListener,
                args: ['blur']
            }], onFocus: [{
                type: HostListener,
                args: ['focus']
            }], onKeydown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }] } });

/* input.ts */
/**
 * IInput
 * Version: 2.0.0
 *
 * - Simple CVA text input
 * - Masking is handled by IInputMaskDirective on the inner <input>
 */
/* =========================================
 * IInput (CVA)
 * ========================================= */
class IInput {
    type = 'text';
    placeholder = '';
    autocomplete;
    readonly = false;
    /** invalid state (controlled by form or wrapper) */
    invalid = false;
    mask;
    /** value usable both by CVA and by [value] binding */
    get value() {
        return this._value;
    }
    set value(v) {
        this._value = v ?? '';
    }
    prepend;
    append;
    inputRef;
    _value = null;
    isDisabled = false;
    get disabled() {
        return this.isDisabled;
    }
    set disabled(value) {
        this.isDisabled = value;
    }
    onChange = () => {
        /*  */
    };
    onTouched = () => {
        /*  */
    };
    // -----------------------------
    // ControlValueAccessor
    // -----------------------------
    writeValue(value) {
        this._value = value ?? '';
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.isDisabled = isDisabled;
    }
    // -----------------------------
    // View events
    // -----------------------------
    handleInput(event) {
        const target = event.target;
        this._value = target.value;
        this.onChange(this._value);
    }
    handleBlur() {
        this.onTouched();
    }
    /** Click anywhere on <i-input> focuses the inner input, except clicks on addons */
    handleHostClick(event) {
        if (this.isDisabled || !this.inputRef) {
            return;
        }
        const target = event.target;
        if (target && target.closest('i-input-addon')) {
            return;
        }
        this.inputRef.nativeElement.focus();
    }
    get prepends() {
        if (!this.prepend) {
            return [];
        }
        return Array.isArray(this.prepend) ? this.prepend : [this.prepend];
    }
    get appends() {
        if (!this.append) {
            return [];
        }
        return Array.isArray(this.append) ? this.append : [this.append];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IInput, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.16", type: IInput, isStandalone: true, selector: "i-input", inputs: { type: "type", placeholder: "placeholder", autocomplete: "autocomplete", readonly: "readonly", invalid: "invalid", mask: "mask", value: "value", prepend: "prepend", append: "append", disabled: "disabled" }, host: { listeners: { "click": "handleHostClick($event)" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => IInput),
                multi: true,
            },
        ], viewQueries: [{ propertyName: "inputRef", first: true, predicate: ["inputRef"], descendants: true }], ngImport: i0, template: `@for (i of prepends; track $index) {
      <i-input-addon [addon]="i" />
    }
    <input
      #inputRef
      [attr.aria-invalid]="invalid ? 'true' : null"
      [attr.autocomplete]="autocomplete || null"
      [disabled]="isDisabled"
      [iInputMask]="mask"
      [placeholder]="placeholder"
      [readonly]="readonly"
      [type]="type"
      [value]="value ?? ''"
      (blur)="handleBlur()"
      (input)="handleInput($event)"
    />
    @for (i of appends; track $index) {
      <i-input-addon [addon]="i" />
    }`, isInline: true, dependencies: [{ kind: "component", type: IInputAddon, selector: "i-input-addon", inputs: ["addon"] }, { kind: "directive", type: IInputMaskDirective, selector: "[iInputMask]", inputs: ["iInputMask"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IInput, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-input',
                    standalone: true,
                    imports: [IInputAddon, IInputMaskDirective],
                    template: `@for (i of prepends; track $index) {
      <i-input-addon [addon]="i" />
    }
    <input
      #inputRef
      [attr.aria-invalid]="invalid ? 'true' : null"
      [attr.autocomplete]="autocomplete || null"
      [disabled]="isDisabled"
      [iInputMask]="mask"
      [placeholder]="placeholder"
      [readonly]="readonly"
      [type]="type"
      [value]="value ?? ''"
      (blur)="handleBlur()"
      (input)="handleInput($event)"
    />
    @for (i of appends; track $index) {
      <i-input-addon [addon]="i" />
    }`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => IInput),
                            multi: true,
                        },
                    ],
                }]
        }], propDecorators: { type: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], autocomplete: [{
                type: Input
            }], readonly: [{
                type: Input
            }], invalid: [{
                type: Input
            }], mask: [{
                type: Input
            }], value: [{
                type: Input
            }], prepend: [{
                type: Input
            }], append: [{
                type: Input
            }], inputRef: [{
                type: ViewChild,
                args: ['inputRef']
            }], disabled: [{
                type: Input
            }], handleHostClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
/* =========================================
 * IFCInput (CVA wrapper)
 * ========================================= */
class IFCInput {
    innerInput;
    cdr = inject(ChangeDetectorRef);
    // Optional injections (equivalent to @Optional() @Self())
    ngControl = inject(NgControl, { self: true, optional: true });
    formDir = inject(FormGroupDirective, { optional: true });
    submitSub;
    // ---------- UI inputs ----------
    label = '';
    placeholder = '';
    autocomplete;
    readonly = false;
    type = 'text';
    mask;
    prepend;
    append;
    /** old-style custom error templates: { required: '{label} is cuwax' } */
    errorMessage;
    /** non-form usage: [value] binding */
    get value() {
        return this._value;
    }
    set value(v) {
        this._value = v ?? '';
        this.cdr.markForCheck();
    }
    // ---------- internal state ----------
    _value = null;
    isDisabled = false;
    onChange = () => {
        /*  */
    };
    onTouched = () => {
        /*  */
    };
    constructor() {
        // ✅ same pattern you use in other fc components
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
        // 🔁 when the form is submitted, re-check this OnPush component
        if (this.formDir) {
            this.submitSub = this.formDir.ngSubmit.subscribe(() => {
                this.cdr.markForCheck();
            });
        }
    }
    ngOnDestroy() {
        this.submitSub?.unsubscribe();
    }
    // ---------- CVA ----------
    writeValue(v) {
        this._value = v ?? '';
        this.cdr.markForCheck();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.isDisabled = isDisabled;
        this.cdr.markForCheck();
    }
    // ---------- bridge from inner <i-input> ----------
    handleInnerInput(event) {
        const target = event.target;
        const v = target?.value ?? '';
        this._value = v;
        this.onChange(this._value);
        this.cdr.markForCheck();
    }
    handleInnerBlur() {
        this.onTouched();
        this.cdr.markForCheck();
    }
    // ---------- focus from label ----------
    focusInnerInput() {
        if (!this.isDisabled && this.innerInput?.inputRef) {
            this.innerInput.inputRef.nativeElement.focus();
        }
    }
    // ---------- validation helpers ----------
    get controlInvalid() {
        const c = this.ngControl?.control;
        if (!c)
            return false;
        if (this.formDir) {
            return c.invalid && !!this.formDir.submitted;
        }
        return c.invalid && (c.dirty || c.touched);
    }
    get required() {
        return isControlRequired(this.ngControl, this.errorMessage);
    }
    get resolvedErrorText() {
        return resolveControlErrorMessage(this.ngControl, this.label, this.errorMessage);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IFCInput, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.16", type: IFCInput, isStandalone: true, selector: "i-fc-input", inputs: { label: "label", placeholder: "placeholder", autocomplete: "autocomplete", readonly: "readonly", type: "type", mask: "mask", prepend: "prepend", append: "append", errorMessage: "errorMessage", value: "value" }, viewQueries: [{ propertyName: "innerInput", first: true, predicate: IInput, descendants: true }], ngImport: i0, template: `@if (label) {
      <label class="i-fc-input__label" (click)="focusInnerInput()">
        {{ label }} :
        @if (required) {
          <span class="i-fc-input__required">*</span>
        }
      </label>
    }

    <i-input
      [append]="append"
      [autocomplete]="autocomplete"
      [disabled]="isDisabled"
      [invalid]="controlInvalid"
      [mask]="mask"
      [placeholder]="placeholder"
      [prepend]="prepend"
      [readonly]="readonly"
      [type]="type"
      [value]="value"
      (blur)="handleInnerBlur()"
      (input)="handleInnerInput($event)"
    />

    @if (controlInvalid && resolvedErrorText) {
      <div class="i-fc-input__error">
        {{ resolvedErrorText }}
      </div>
    }`, isInline: true, dependencies: [{ kind: "component", type: IInput, selector: "i-input", inputs: ["type", "placeholder", "autocomplete", "readonly", "invalid", "mask", "value", "prepend", "append", "disabled"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IFCInput, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-fc-input',
                    standalone: true,
                    imports: [IInput],
                    template: `@if (label) {
      <label class="i-fc-input__label" (click)="focusInnerInput()">
        {{ label }} :
        @if (required) {
          <span class="i-fc-input__required">*</span>
        }
      </label>
    }

    <i-input
      [append]="append"
      [autocomplete]="autocomplete"
      [disabled]="isDisabled"
      [invalid]="controlInvalid"
      [mask]="mask"
      [placeholder]="placeholder"
      [prepend]="prepend"
      [readonly]="readonly"
      [type]="type"
      [value]="value"
      (blur)="handleInnerBlur()"
      (input)="handleInnerInput($event)"
    />

    @if (controlInvalid && resolvedErrorText) {
      <div class="i-fc-input__error">
        {{ resolvedErrorText }}
      </div>
    }`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    // ✅ NO NG_VALUE_ACCESSOR PROVIDER HERE (prevents circular dependency)
                }]
        }], ctorParameters: () => [], propDecorators: { innerInput: [{
                type: ViewChild,
                args: [IInput]
            }], label: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], autocomplete: [{
                type: Input
            }], readonly: [{
                type: Input
            }], type: [{
                type: Input
            }], mask: [{
                type: Input
            }], prepend: [{
                type: Input
            }], append: [{
                type: Input
            }], errorMessage: [{
                type: Input
            }], value: [{
                type: Input
            }] } });
class IInputModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IInputModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.16", ngImport: i0, type: IInputModule, imports: [IInput, IFCInput, IInputAddon, IInputMaskDirective], exports: [IInput, IFCInput, IInputAddon, IInputMaskDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IInputModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IInputModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [IInput, IFCInput, IInputAddon, IInputMaskDirective],
                    exports: [IInput, IFCInput, IInputAddon, IInputMaskDirective],
                }]
        }] });

class IHighlightSearchPipe {
    transform(value, search) {
        if (!value || !search) {
            return value;
        }
        // Escape regex special chars: . * + ? ^ $ { } ( ) | [ ] \
        const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escaped, 'gi');
        return value.replace(regex, (match) => {
            return `<span class="highlight-search">${match}</span>`;
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IHighlightSearchPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "20.3.16", ngImport: i0, type: IHighlightSearchPipe, isStandalone: true, name: "highlightSearch" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IHighlightSearchPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'highlightSearch',
                    standalone: true,
                }]
        }] });

// select.ts (Angular)
/**
 * ISelect
 * Version: 2.2.2
 *
 * Fixes:
 * - Render options container as <i-options> (not <div>)
 * - Match dropdown width to visible control width (uses i-input host rect)
 * - Keep portal-to-body + fixed positioning for overflow parents
 * - ✅ Fix flicker: portal + measure + position BEFORE showing panel
 */
class ISelectOptionDefDirective {
    template = inject(TemplateRef);
    set iSelectOption(_value) {
        // not used, needed for structural directive syntax
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ISelectOptionDefDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.16", type: ISelectOptionDefDirective, isStandalone: true, selector: "[iSelectOption]", inputs: { iSelectOption: "iSelectOption" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ISelectOptionDefDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[iSelectOption]',
                    standalone: true,
                }]
        }], propDecorators: { iSelectOption: [{
                type: Input
            }] } });
class ISelect {
    // ---------- Inputs ----------
    placeholder = '';
    disabled = false;
    invalid = false;
    /** debounce delay (ms) for filter when typing */
    filterDelay = 200;
    panelPosition = 'bottom left';
    /** portal panel to body to avoid overflow clipping (default true) */
    portalToBody = true;
    /** gap between trigger and panel (px) */
    panelOffset = 6;
    /** match dropdown width to control width (default true) */
    matchTriggerWidth = true;
    /** Array options */
    set options(value) {
        this._rawOptions = value ?? [];
        this.applyFilter(this.isOpen);
        this.syncModelToView();
    }
    /** Observable options */
    set options$(value) {
        this.cleanupOptionsSub();
        if (value) {
            this.isLoading = true;
            this.cdr.markForCheck();
            this.optionsSub = value.subscribe({
                next: (rows) => {
                    this.zone.run(() => {
                        this._rawOptions = rows ?? [];
                        this.applyFilter(this.isOpen);
                        this.syncModelToView();
                        this.isLoading = false;
                        this.cdr.markForCheck();
                    });
                },
                error: () => {
                    this.zone.run(() => {
                        this.isLoading = false;
                        this.cdr.markForCheck();
                    });
                },
            });
        }
    }
    _displayWith = (row) => row === null ? '' : String(row);
    _displayWithExplicit = false;
    set displayWith(value) {
        if (value === undefined || value === null) {
            this._displayWithExplicit = false;
            this._displayWith = (row) => (row === null ? '' : String(row));
        }
        else {
            this._displayWith = value;
            this._displayWithExplicit = true;
        }
    }
    get displayWith() {
        return this._displayWith;
    }
    filterPredicate = (row, term) => {
        const haystack = JSON.stringify(row).toLowerCase();
        return haystack.includes(term);
    };
    /** Non-reactive usage */
    set value(v) {
        this.writeValue(v);
    }
    get value() {
        return this._modelValue;
    }
    // ---------- Outputs ----------
    onChanged = new EventEmitter();
    onOptionSelected = new EventEmitter();
    // ---------- Template refs ----------
    optionDef;
    panelRef;
    // ---------- Internal state ----------
    _rawOptions = [];
    filteredOptions = [];
    _modelValue = null;
    pendingModelValue = null;
    _displayText = '';
    get displayText() {
        return this._displayText;
    }
    _filterText = '';
    get filterText() {
        return this._filterText;
    }
    isOpen = false;
    highlightIndex = -1;
    isLoading = false;
    optionsSub;
    filterInput$ = new Subject();
    filterInputSub;
    // ---------- CVA ----------
    onChange = (_) => { };
    onTouched = () => { };
    get panelPositionClass() {
        const value = (this.panelPosition || 'bottom left').trim();
        const normalized = value.replace(/\s+/g, '-');
        return `i-options--${normalized}`;
    }
    hostEl = inject(ElementRef);
    cdr = inject(ChangeDetectorRef);
    zone = inject(NgZone);
    // ---------- Portal/position internals ----------
    panelPortaled = false;
    panelOriginalParent = null;
    panelOriginalNextSibling = null;
    repositionRaf = 0;
    listeningGlobal = false;
    // ---------- Lifecycle ----------
    ngOnInit() {
        this.filterInputSub = this.filterInput$
            .pipe(debounceTime(this.filterDelay))
            .subscribe((val) => {
            this.zone.run(() => {
                this.handleInputText(val);
                this.isLoading = false;
                this.cdr.markForCheck();
            });
        });
    }
    ngAfterContentInit() {
        this.syncModelToView();
    }
    ngAfterViewChecked() {
        // Safety: if someone toggles portalToBody while open, ensure it's applied.
        // (But the "first open" work is now done in openDropdown to avoid flicker)
        if (this.isOpen && this.portalToBody && this.panelRef?.nativeElement) {
            this.ensurePanelPortaled();
            this.ensureGlobalListeners();
        }
    }
    ngOnDestroy() {
        this.cleanupOptionsSub();
        this.filterInputSub?.unsubscribe();
        this.removeGlobalListeners();
        this.restorePanelIfNeeded();
    }
    cleanupOptionsSub() {
        if (this.optionsSub) {
            this.optionsSub.unsubscribe();
            this.optionsSub = undefined;
        }
    }
    // ---------- Model ↔ UI sync ----------
    writeValue(value) {
        this._modelValue = value;
        if (!this._rawOptions.length) {
            this.pendingModelValue = value;
            this._displayText = this.resolveDisplayText(value);
            return;
        }
        this.syncModelToView();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    syncModelToView() {
        const options = this._rawOptions;
        if (!options.length) {
            this._displayText = this.resolveDisplayText(this._modelValue);
            return;
        }
        const valueToUse = this._modelValue !== null && this._modelValue !== undefined
            ? this._modelValue
            : this.pendingModelValue;
        if (valueToUse === null || valueToUse === undefined) {
            this._displayText = '';
            this.pendingModelValue = null;
        }
        else {
            const found = options.find((row) => row === valueToUse) ?? null;
            const row = found ?? valueToUse;
            this._modelValue = found ?? valueToUse;
            this._displayText = this.resolveDisplayText(row);
            this.pendingModelValue = null;
        }
        if (!this.isOpen) {
            this._filterText = '';
            this.highlightIndex = -1;
            return;
        }
        this.applyFilter(true);
    }
    applyFilter(force = false) {
        if (!this.isOpen && !force)
            return;
        const term = (this._filterText || '').toLowerCase();
        if (!term) {
            this.filteredOptions = [...this._rawOptions];
        }
        else {
            this.filteredOptions = this._rawOptions.filter((row) => this.filterPredicate(row, term));
        }
        if (this.highlightIndex >= this.filteredOptions.length || this.filteredOptions.length === 0) {
            this.highlightIndex = -1;
        }
    }
    get hasOptions() {
        return this.filteredOptions.length > 0;
    }
    get hasNoResults() {
        return this.isOpen && !!this._filterText && this.filteredOptions.length === 0;
    }
    resolveDisplayText(row) {
        if (row === null)
            return '';
        const dw = this.displayWith;
        if (typeof dw === 'function' && this._displayWithExplicit) {
            return dw(row);
        }
        if (typeof dw === 'string') {
            const path = dw.split('.');
            let value = row;
            for (const segment of path) {
                if (value === null)
                    return '';
                value = value[segment];
            }
            return value !== null ? String(value) : '';
        }
        if (!this._displayWithExplicit && row !== null && typeof row === 'object') {
            const entries = Object.entries(row);
            if (!entries.length)
                return '';
            const labelEntry = entries[1] ?? entries[0];
            const labelValue = labelEntry[1];
            return labelValue !== null ? String(labelValue) : '';
        }
        if (!this._displayWithExplicit && (row === null || typeof row !== 'object')) {
            const primitive = row;
            const match = this._rawOptions.find((opt) => {
                if (opt === null || typeof opt !== 'object')
                    return false;
                const entries = Object.entries(opt);
                if (!entries.length)
                    return false;
                const valueEntry = entries[0];
                return valueEntry[1] === primitive;
            });
            if (match) {
                const entries = Object.entries(match);
                if (!entries.length)
                    return String(primitive);
                const labelEntry = entries[1] ?? entries[0];
                const labelValue = labelEntry[1];
                return labelValue !== null ? String(labelValue) : String(primitive);
            }
        }
        if (typeof dw === 'function') {
            return dw(row);
        }
        return '';
    }
    // ---------- Input + dropdown behavior ----------
    handleInputText(val) {
        this._displayText = val;
        this._filterText = val;
        if (!this.isOpen)
            this.openDropdown();
        else {
            this.applyFilter(true);
            this.scheduleReposition();
        }
    }
    moveHighlight(delta) {
        const len = this.filteredOptions.length;
        if (!len) {
            this.highlightIndex = -1;
            return;
        }
        let index = this.highlightIndex;
        if (index === -1)
            index = 0;
        else
            index = (index + delta + len) % len;
        this.setActiveIndex(index);
        this.scrollHighlightedIntoView();
    }
    toggleDropdown(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (this.disabled)
            return;
        if (!this.isOpen) {
            this.openDropdown();
        }
        else if (this.hasNoResults) {
            this._displayText = '';
            this._filterText = '';
            this.applyFilter(true);
            this.scheduleReposition();
        }
        else {
            this.syncModelToView();
            this.closeDropdown();
        }
        this.focus();
    }
    openDropdown() {
        if (this.disabled)
            return;
        if (this.isOpen)
            return;
        this.isOpen = true;
        this.applyFilter(true);
        // ✅ Ensure panel exists right now
        this.cdr.detectChanges();
        // ✅ Portal immediately (not waiting for ngAfterViewChecked)
        if (this.portalToBody)
            this.ensurePanelPortaled();
        // ✅ Hide until positioned to prevent "top then bottom" flicker
        const panel = this.getPanelElement();
        if (panel) {
            panel.style.visibility = 'hidden';
            panel.style.pointerEvents = 'none';
        }
        this.ensureGlobalListeners();
        // schedule position on next frame (after layout is stable)
        this.scheduleReposition(() => {
            const p = this.getPanelElement();
            if (p) {
                p.style.visibility = 'visible';
                p.style.pointerEvents = '';
            }
        });
        const len = this.filteredOptions.length;
        if (len === 0) {
            this.highlightIndex = -1;
            return;
        }
        const current = this._modelValue;
        if (current !== null) {
            const idx = this.filteredOptions.indexOf(current);
            if (idx >= 0) {
                this.highlightIndex = idx;
                this.scrollHighlightedIntoView();
                return;
            }
        }
        this.highlightIndex = 0;
        this.scrollHighlightedIntoView();
    }
    closeDropdown() {
        this.isOpen = false;
        this.highlightIndex = -1;
        this.removeGlobalListeners();
        this.restorePanelIfNeeded();
    }
    selectRow(row) {
        this._modelValue = row;
        this._displayText = this.resolveDisplayText(row);
        this._filterText = '';
        this.applyFilter(true);
        this.onChange(row);
        this.onTouched();
        const payload = {
            value: row,
            label: this._displayText,
        };
        this.onChanged.emit(payload);
        this.onOptionSelected.emit(payload);
        this.closeDropdown();
    }
    isRowSelected(row) {
        return this._modelValue === row;
    }
    scrollHighlightedIntoView() {
        setTimeout(() => {
            if (!this.isOpen)
                return;
            const list = this.getPanelElement();
            if (!list)
                return;
            const items = list.querySelectorAll('.i-option');
            const el = items[this.highlightIndex];
            el?.scrollIntoView?.({ block: 'nearest' });
        });
    }
    focus() {
        if (this.disabled)
            return;
        const input = this.hostEl.nativeElement.querySelector('i-input input');
        input?.focus();
    }
    // ---------- Keyboard + input events ----------
    handleKeydown(event) {
        const options = this.filteredOptions;
        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                if (!this.isOpen)
                    this.openDropdown();
                else if (options.length)
                    this.moveHighlight(1);
                break;
            case 'ArrowUp':
                event.preventDefault();
                if (!this.isOpen)
                    this.openDropdown();
                else if (options.length)
                    this.moveHighlight(-1);
                break;
            case 'Enter':
                event.preventDefault();
                if (!this.isOpen) {
                    this.openDropdown();
                }
                else if (this.highlightIndex >= 0 && this.highlightIndex < options.length) {
                    this.selectRow(options[this.highlightIndex]);
                }
                break;
            case 'Escape':
                if (this.isOpen) {
                    event.preventDefault();
                    this.closeDropdown();
                }
                break;
        }
    }
    onHostInput(event) {
        const target = event.target;
        if (!target)
            return;
        this.isLoading = true;
        this.filterInput$.next(target.value);
    }
    onDocumentClick(event) {
        if (!this.isOpen)
            return;
        const target = event.target;
        if (!target)
            return;
        const host = this.hostEl.nativeElement;
        const panel = this.getPanelElement();
        const insideHost = host.contains(target);
        const insidePanel = !!panel && panel.contains(target);
        if (!insideHost && !insidePanel) {
            this.closeDropdown();
        }
    }
    // ---------- Utilities ----------
    get appendAddon() {
        if (this.isLoading)
            return { type: 'loading', visible: true };
        return {
            type: 'button',
            icon: this.isOpen ? 'angle-up' : 'angle-down',
            onClick: () => this.toggleDropdown(),
            variant: 'primary',
            visible: true,
        };
    }
    get hasOptionsList() {
        return this.isOpen && this.hasOptions;
    }
    setActiveIndex(idx) {
        if (idx < 0 || idx >= this.filteredOptions.length)
            this.highlightIndex = -1;
        else
            this.highlightIndex = idx;
    }
    // =========================================================
    // Portal + Positioning
    // =========================================================
    getPanelElement() {
        return this.panelRef?.nativeElement ?? null;
    }
    getAnchorRect() {
        const iInput = this.hostEl.nativeElement.querySelector('i-input');
        if (iInput?.getBoundingClientRect)
            return iInput.getBoundingClientRect();
        if (this.hostEl.nativeElement?.getBoundingClientRect) {
            return this.hostEl.nativeElement.getBoundingClientRect();
        }
        const input = this.hostEl.nativeElement.querySelector('i-input input');
        return input?.getBoundingClientRect?.() ?? null;
    }
    ensurePanelPortaled() {
        if (!this.portalToBody)
            return;
        const panel = this.getPanelElement();
        if (!panel)
            return;
        if (panel.parentNode === document.body) {
            this.panelPortaled = true;
            panel.classList.add('i-options--portaled');
            return;
        }
        this.panelOriginalParent = panel.parentNode;
        this.panelOriginalNextSibling = panel.nextSibling;
        panel.classList.add('i-options--portaled');
        document.body.appendChild(panel);
        this.panelPortaled = true;
    }
    restorePanelIfNeeded() {
        if (!this.panelPortaled)
            return;
        const panel = this.getPanelElement();
        if (!panel || !panel.parentNode)
            return;
        if (panel.parentNode !== document.body) {
            this.panelPortaled = false;
            return;
        }
        const parent = this.panelOriginalParent;
        if (!parent) {
            this.panelPortaled = false;
            return;
        }
        try {
            panel.classList.remove('i-options--portaled');
            if (this.panelOriginalNextSibling)
                parent.insertBefore(panel, this.panelOriginalNextSibling);
            else
                parent.appendChild(panel);
        }
        catch {
            // ignore
        }
        this.panelPortaled = false;
        this.panelOriginalParent = null;
        this.panelOriginalNextSibling = null;
    }
    scheduleReposition(after) {
        if (!this.isOpen)
            return;
        if (this.repositionRaf)
            cancelAnimationFrame(this.repositionRaf);
        this.zone.runOutsideAngular(() => {
            this.repositionRaf = requestAnimationFrame(() => {
                this.repositionRaf = 0;
                this.repositionPanelNow();
                after?.();
            });
        });
    }
    repositionPanelNow() {
        if (!this.isOpen)
            return;
        const panel = this.getPanelElement();
        const rect = this.getAnchorRect();
        if (!panel || !rect)
            return;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const gap = 8;
        const pos = (this.panelPosition || 'bottom left').trim().toLowerCase();
        panel.style.position = 'fixed';
        panel.style.zIndex = '2000';
        panel.style.boxSizing = 'border-box';
        panel.style.overflowY = 'auto';
        if (this.matchTriggerWidth) {
            panel.style.width = `${Math.round(rect.width)}px`;
        }
        else {
            panel.style.width = '';
        }
        const panelRect = panel.getBoundingClientRect();
        const wantTop = pos.startsWith('top');
        const wantBottom = pos.startsWith('bottom') ||
            (!pos.startsWith('top') && !pos.startsWith('left') && !pos.startsWith('right'));
        const wantLeft = pos.includes('left') || pos === 'left';
        const wantRight = pos.includes('right') || pos === 'right';
        const alignRight = wantRight && !wantLeft;
        let left = alignRight ? rect.right - panelRect.width : rect.left;
        const maxLeft = Math.max(gap, vw - panelRect.width - gap);
        left = Math.min(Math.max(gap, left), maxLeft);
        if (pos === 'left') {
            left = rect.left - panelRect.width - this.panelOffset;
            left = Math.min(Math.max(gap, left), maxLeft);
            const top = Math.min(Math.max(gap, rect.top), Math.max(gap, vh - panelRect.height - gap));
            panel.style.left = `${Math.round(left)}px`;
            panel.style.top = `${Math.round(top)}px`;
            const maxH = Math.max(60, vh - top - gap);
            panel.style.maxHeight = `${Math.floor(maxH)}px`;
            return;
        }
        if (pos === 'right') {
            left = rect.right + this.panelOffset;
            left = Math.min(Math.max(gap, left), maxLeft);
            const top = Math.min(Math.max(gap, rect.top), Math.max(gap, vh - panelRect.height - gap));
            panel.style.left = `${Math.round(left)}px`;
            panel.style.top = `${Math.round(top)}px`;
            const maxH = Math.max(60, vh - top - gap);
            panel.style.maxHeight = `${Math.floor(maxH)}px`;
            return;
        }
        const spaceBelow = vh - rect.bottom - this.panelOffset - gap;
        const spaceAbove = rect.top - this.panelOffset - gap;
        let side = wantTop && !wantBottom ? 'top' : 'bottom';
        if (side === 'bottom' && panelRect.height > spaceBelow && spaceAbove > spaceBelow) {
            side = 'top';
        }
        else if (side === 'top' && panelRect.height > spaceAbove && spaceBelow > spaceAbove) {
            side = 'bottom';
        }
        const maxH = Math.max(60, side === 'bottom' ? spaceBelow : spaceAbove);
        panel.style.maxHeight = `${Math.floor(maxH)}px`;
        const top = side === 'bottom'
            ? rect.bottom + this.panelOffset
            : rect.top - panelRect.height - this.panelOffset;
        panel.style.left = `${Math.round(left)}px`;
        panel.style.top = `${Math.round(top)}px`;
    }
    ensureGlobalListeners() {
        if (this.listeningGlobal)
            return;
        this.zone.runOutsideAngular(() => {
            const onAnyScroll = () => this.scheduleReposition();
            const onResize = () => this.scheduleReposition();
            window.addEventListener('scroll', onAnyScroll, true);
            document.addEventListener('scroll', onAnyScroll, true);
            window.addEventListener('resize', onResize, true);
            this._removeGlobal = () => {
                window.removeEventListener('scroll', onAnyScroll, true);
                document.removeEventListener('scroll', onAnyScroll, true);
                window.removeEventListener('resize', onResize, true);
            };
            this.listeningGlobal = true;
        });
    }
    removeGlobalListeners() {
        if (!this.listeningGlobal)
            return;
        const rm = this._removeGlobal;
        if (rm)
            rm();
        delete this._removeGlobal;
        this.listeningGlobal = false;
        if (this.repositionRaf) {
            cancelAnimationFrame(this.repositionRaf);
            this.repositionRaf = 0;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ISelect, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.16", type: ISelect, isStandalone: true, selector: "i-select", inputs: { placeholder: "placeholder", disabled: "disabled", invalid: "invalid", filterDelay: "filterDelay", panelPosition: "panelPosition", portalToBody: "portalToBody", panelOffset: "panelOffset", matchTriggerWidth: "matchTriggerWidth", options: "options", options$: "options$", displayWith: "displayWith", filterPredicate: "filterPredicate", value: "value" }, outputs: { onChanged: "onChanged", onOptionSelected: "onOptionSelected" }, host: { listeners: { "keydown": "handleKeydown($event)", "input": "onHostInput($event)", "document:click": "onDocumentClick($event)" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => ISelect),
                multi: true,
            },
        ], queries: [{ propertyName: "optionDef", first: true, predicate: ISelectOptionDefDirective, descendants: true }], viewQueries: [{ propertyName: "panelRef", first: true, predicate: ["panel"], descendants: true }], ngImport: i0, template: `
    <i-input
      [append]="appendAddon"
      [invalid]="invalid || hasNoResults"
      [placeholder]="placeholder"
      [readonly]="disabled"
      [value]="displayText"
    />

    @if (hasOptionsList) {
      <!-- ✅ render as i-options -->
      <i-options #panel class="i-options scroll scroll-y" [ngClass]="panelPositionClass">
        @for (row of filteredOptions; track row; let idx = $index) {
          <div
            class="i-option"
            [class.active]="highlightIndex === idx"
            [class.selected]="isRowSelected(row)"
            (mousedown)="selectRow(row)"
            (mouseenter)="setActiveIndex(idx)"
          >
            @if (optionDef?.template) {
              <div class="i-option-label">
                <ng-container
                  *ngTemplateOutlet="optionDef!.template; context: { $implicit: row, row: row }"
                />
              </div>
            } @else {
              <div
                class="i-option-label"
                [innerHTML]="resolveDisplayText(row) | highlightSearch: filterText"
              ></div>
            }
            @if (isRowSelected(row)) {
              <span class="i-option-check">
                <i-icon icon="check" />
              </span>
            }
          </div>
        }
      </i-options>
    }
  `, isInline: true, dependencies: [{ kind: "component", type: IIcon, selector: "i-icon", inputs: ["icon", "size"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: IInput, selector: "i-input", inputs: ["type", "placeholder", "autocomplete", "readonly", "invalid", "mask", "value", "prepend", "append", "disabled"] }, { kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "pipe", type: IHighlightSearchPipe, name: "highlightSearch" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ISelect, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-select',
                    standalone: true,
                    imports: [IIcon, NgTemplateOutlet, IHighlightSearchPipe, IInput, NgClass],
                    template: `
    <i-input
      [append]="appendAddon"
      [invalid]="invalid || hasNoResults"
      [placeholder]="placeholder"
      [readonly]="disabled"
      [value]="displayText"
    />

    @if (hasOptionsList) {
      <!-- ✅ render as i-options -->
      <i-options #panel class="i-options scroll scroll-y" [ngClass]="panelPositionClass">
        @for (row of filteredOptions; track row; let idx = $index) {
          <div
            class="i-option"
            [class.active]="highlightIndex === idx"
            [class.selected]="isRowSelected(row)"
            (mousedown)="selectRow(row)"
            (mouseenter)="setActiveIndex(idx)"
          >
            @if (optionDef?.template) {
              <div class="i-option-label">
                <ng-container
                  *ngTemplateOutlet="optionDef!.template; context: { $implicit: row, row: row }"
                />
              </div>
            } @else {
              <div
                class="i-option-label"
                [innerHTML]="resolveDisplayText(row) | highlightSearch: filterText"
              ></div>
            }
            @if (isRowSelected(row)) {
              <span class="i-option-check">
                <i-icon icon="check" />
              </span>
            }
          </div>
        }
      </i-options>
    }
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => ISelect),
                            multi: true,
                        },
                    ],
                }]
        }], propDecorators: { placeholder: [{
                type: Input
            }], disabled: [{
                type: Input
            }], invalid: [{
                type: Input
            }], filterDelay: [{
                type: Input
            }], panelPosition: [{
                type: Input
            }], portalToBody: [{
                type: Input
            }], panelOffset: [{
                type: Input
            }], matchTriggerWidth: [{
                type: Input
            }], options: [{
                type: Input
            }], options$: [{
                type: Input
            }], displayWith: [{
                type: Input
            }], filterPredicate: [{
                type: Input
            }], value: [{
                type: Input
            }], onChanged: [{
                type: Output
            }], onOptionSelected: [{
                type: Output
            }], optionDef: [{
                type: ContentChild,
                args: [ISelectOptionDefDirective]
            }], panelRef: [{
                type: ViewChild,
                args: ['panel']
            }], handleKeydown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }], onHostInput: [{
                type: HostListener,
                args: ['input', ['$event']]
            }], onDocumentClick: [{
                type: HostListener,
                args: ['document:click', ['$event']]
            }] } });
/**
 * IFCSelect (unchanged)
 */
class IFCSelect {
    innerSelect;
    label = '';
    placeholder = '';
    options = null;
    options$ = null;
    displayWith;
    filterDelay = 200;
    filterPredicate = (row, term) => {
        const haystack = JSON.stringify(row).toLowerCase();
        return haystack.includes(term);
    };
    panelPosition = 'bottom left';
    errorMessage;
    get value() {
        return this._value;
    }
    set value(v) {
        this._value = v ?? null;
    }
    _value = null;
    isDisabled = false;
    onChange = () => { };
    onTouched = () => { };
    ngControl = inject(NgControl, { self: true, optional: true });
    formDir = inject(FormGroupDirective, { optional: true });
    cdr = inject(ChangeDetectorRef);
    submitSub;
    constructor() {
        if (this.ngControl)
            this.ngControl.valueAccessor = this;
        if (this.formDir) {
            this.submitSub = this.formDir.ngSubmit.subscribe(() => {
                this.cdr.markForCheck();
            });
        }
    }
    ngOnDestroy() {
        this.submitSub?.unsubscribe();
    }
    writeValue(v) {
        this._value = v ?? null;
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.isDisabled = isDisabled;
    }
    handleSelectChange(change) {
        this._value = change.value ?? null;
        this.onChange(this._value);
        this.onTouched();
    }
    focusInnerSelect() {
        if (!this.isDisabled && this.innerSelect)
            this.innerSelect.focus();
    }
    get controlInvalid() {
        const c = this.ngControl?.control;
        if (!c)
            return false;
        if (this.formDir)
            return c.invalid && !!this.formDir.submitted;
        return c.invalid && (c.dirty || c.touched);
    }
    get required() {
        return isControlRequired(this.ngControl, this.errorMessage);
    }
    get resolvedErrorText() {
        return resolveControlErrorMessage(this.ngControl, this.label, this.errorMessage);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IFCSelect, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.16", type: IFCSelect, isStandalone: true, selector: "i-fc-select", inputs: { label: "label", placeholder: "placeholder", options: "options", options$: "options$", displayWith: "displayWith", filterDelay: "filterDelay", filterPredicate: "filterPredicate", panelPosition: "panelPosition", errorMessage: "errorMessage", value: "value" }, viewQueries: [{ propertyName: "innerSelect", first: true, predicate: ISelect, descendants: true }], ngImport: i0, template: `@if (label) {
      <label class="i-fc-select__label" (click)="focusInnerSelect()">
        {{ label }} :
        @if (required) {
          <span class="i-fc-select__required">*</span>
        }
      </label>
    }

    <i-select
      [disabled]="isDisabled"
      [displayWith]="displayWith"
      [filterDelay]="filterDelay"
      [filterPredicate]="filterPredicate"
      [invalid]="controlInvalid"
      [options]="options"
      [options$]="options$"
      [panelPosition]="panelPosition"
      [placeholder]="placeholder"
      [value]="value"
      (onChanged)="handleSelectChange($event)"
    >
      <ng-content />
    </i-select>

    @if (controlInvalid && resolvedErrorText) {
      <div class="i-fc-select__error">
        {{ resolvedErrorText }}
      </div>
    }`, isInline: true, dependencies: [{ kind: "component", type: ISelect, selector: "i-select", inputs: ["placeholder", "disabled", "invalid", "filterDelay", "panelPosition", "portalToBody", "panelOffset", "matchTriggerWidth", "options", "options$", "displayWith", "filterPredicate", "value"], outputs: ["onChanged", "onOptionSelected"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IFCSelect, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-fc-select',
                    standalone: true,
                    imports: [ISelect],
                    template: `@if (label) {
      <label class="i-fc-select__label" (click)="focusInnerSelect()">
        {{ label }} :
        @if (required) {
          <span class="i-fc-select__required">*</span>
        }
      </label>
    }

    <i-select
      [disabled]="isDisabled"
      [displayWith]="displayWith"
      [filterDelay]="filterDelay"
      [filterPredicate]="filterPredicate"
      [invalid]="controlInvalid"
      [options]="options"
      [options$]="options$"
      [panelPosition]="panelPosition"
      [placeholder]="placeholder"
      [value]="value"
      (onChanged)="handleSelectChange($event)"
    >
      <ng-content />
    </i-select>

    @if (controlInvalid && resolvedErrorText) {
      <div class="i-fc-select__error">
        {{ resolvedErrorText }}
      </div>
    }`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: () => [], propDecorators: { innerSelect: [{
                type: ViewChild,
                args: [ISelect]
            }], label: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], options: [{
                type: Input
            }], options$: [{
                type: Input
            }], displayWith: [{
                type: Input
            }], filterDelay: [{
                type: Input
            }], filterPredicate: [{
                type: Input
            }], panelPosition: [{
                type: Input
            }], errorMessage: [{
                type: Input
            }], value: [{
                type: Input
            }] } });

/**
 * IDatepicker
 * Version: 1.5.3
 *
 * Fixes:
 * - ✅ IMPORTANT: prevent value from being wiped due to bubbled "input" events
 *   from inner month/year i-select inputs.
 *   -> Only handle input when event.target is the date input itself.
 * - Keep portal + positioning + flicker guard for portaled i-options.
 * - IFCDatepicker included in same file
 */
const noop = () => {
    /**/
};
class IDatepicker {
    hostEl = inject((ElementRef));
    cdr = inject(ChangeDetectorRef);
    zone = inject(NgZone);
    renderer = inject(Renderer2);
    placeholder = '';
    disabled = false;
    invalid = false;
    format = 'dd/MM/yyyy';
    panelPosition = 'bottom left';
    portalToBody = true;
    matchTriggerWidth = true;
    panelOffset = 6;
    set value(v) {
        this.writeValue(v);
    }
    get value() {
        return this._modelValue;
    }
    onChanged = new EventEmitter();
    panelRef;
    portalHomeRef;
    _modelValue = null;
    _displayText = '';
    get displayText() {
        return this._displayText;
    }
    onChange = noop;
    onTouched = noop;
    isOpen = false;
    viewYear = 0;
    viewMonth = 0;
    weeks = [];
    months = [
        { value: 0, label: 'January' },
        { value: 1, label: 'February' },
        { value: 2, label: 'March' },
        { value: 3, label: 'April' },
        { value: 4, label: 'May' },
        { value: 5, label: 'June' },
        { value: 6, label: 'July' },
        { value: 7, label: 'August' },
        { value: 8, label: 'September' },
        { value: 9, label: 'October' },
        { value: 10, label: 'November' },
        { value: 11, label: 'December' },
    ];
    weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    _years = [];
    get years() {
        return this._years;
    }
    get monthSelected() {
        return this.months.find((m) => m.value === this.viewMonth) ?? null;
    }
    get panelPositionClass() {
        const value = (this.panelPosition || 'bottom left').trim();
        const normalized = value.replace(/\s+/g, '-');
        return `i-datepicker-panel--${normalized}`;
    }
    panelPortaled = false;
    originalParent = null;
    originalNextSibling = null;
    repositionRaf = 0;
    listeningGlobal = false;
    ngOnInit() {
        // Default visual: today (only if consumer doesn't provide value)
        if (!this._modelValue && !this._displayText) {
            const today = this.startOfDay(new Date());
            this._modelValue = today;
            this._displayText = this.formatDate(today);
            this.updateView(today);
        }
    }
    ngOnDestroy() {
        this.closePanel(true);
    }
    writeValue(value) {
        let date = null;
        if (value instanceof Date) {
            date = this.startOfDay(value);
        }
        else if (typeof value === 'string' && value.trim()) {
            date = this.parseInputDate(value.trim());
        }
        else {
            date = null;
        }
        // If parent writes null, keep display empty (don’t re-default)
        this._modelValue = date;
        this._displayText = date ? this.formatDate(date) : '';
        const baseDate = this._modelValue ?? this.parseInputDate(this._displayText) ?? this.startOfDay(new Date());
        this.updateView(baseDate);
        this.cdr.markForCheck();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.cdr.markForCheck();
    }
    get appendAddon() {
        return {
            type: 'button',
            icon: 'calendar',
            visible: true,
            variant: 'primary',
            onClick: () => {
                this.toggleOpen();
                this.getInnerInput()?.focus();
            },
        };
    }
    getPanelEl() {
        return this.panelRef?.nativeElement ?? null;
    }
    getInnerInput() {
        return this.hostEl.nativeElement.querySelector('i-input input');
    }
    getAnchorRect() {
        const iInput = this.hostEl.nativeElement.querySelector('i-input');
        return iInput?.getBoundingClientRect?.() ?? this.hostEl.nativeElement.getBoundingClientRect();
    }
    syncFromInnerInputSafely() {
        const input = this.getInnerInput();
        if (!input)
            return;
        const raw = (input.value ?? '').trim();
        if (!raw)
            return; // ✅ never wipe current display/model
        const parsed = this.parseInputDate(raw);
        if (!parsed)
            return; // ✅ partial/invalid typing shouldn't wipe display/model
        this._modelValue = parsed;
        this._displayText = this.formatDate(parsed);
    }
    handleInput(raw) {
        this._displayText = raw;
        const parsed = this.parseInputDate(raw);
        this._modelValue = parsed;
        if (parsed)
            this.updateView(parsed);
        this.onChange(parsed);
        this.onChanged.emit(parsed);
        if (this.isOpen)
            this.scheduleReposition();
        this.cdr.markForCheck();
    }
    handleBlur() {
        this.onTouched();
    }
    toggleOpen() {
        if (this.disabled)
            return;
        if (!this.isOpen) {
            this.syncFromInnerInputSafely();
            this.initViewFromModel();
            this.openPanel();
        }
        else {
            this.closePanel();
        }
        this.cdr.markForCheck();
    }
    openPanel() {
        if (this.isOpen)
            return;
        this.isOpen = true;
        this.cdr.detectChanges();
        if (this.portalToBody)
            this.ensurePanelPortaled();
        const panel = this.getPanelEl();
        if (panel) {
            panel.style.visibility = 'hidden';
            panel.style.pointerEvents = 'none';
        }
        this.ensureGlobalListeners();
        this.zone.runOutsideAngular(() => {
            if (this.repositionRaf)
                cancelAnimationFrame(this.repositionRaf);
            this.repositionRaf = requestAnimationFrame(() => {
                this.repositionRaf = 0;
                this.repositionPanelNow();
                const p = this.getPanelEl();
                if (p) {
                    p.style.visibility = 'visible';
                    p.style.pointerEvents = '';
                }
            });
        });
    }
    closePanel(skipMark = false) {
        if (!this.isOpen && !this.panelPortaled)
            return;
        this.isOpen = false;
        this.removeGlobalListeners();
        this.restorePanelIfNeeded();
        const panel = this.getPanelEl();
        if (panel) {
            panel.style.position = '';
            panel.style.zIndex = '';
            panel.style.left = '';
            panel.style.top = '';
            panel.style.width = '';
            panel.style.maxHeight = '';
            panel.style.overflowY = '';
            panel.style.boxSizing = '';
            panel.style.visibility = '';
            panel.style.pointerEvents = '';
        }
        if (!skipMark)
            this.cdr.markForCheck();
    }
    ensurePanelPortaled() {
        const panel = this.getPanelEl();
        if (!panel)
            return;
        if (panel.parentNode === document.body) {
            this.panelPortaled = true;
            return;
        }
        this.originalParent = panel.parentNode;
        this.originalNextSibling = panel.nextSibling;
        panel.classList.add('i-datepicker-panel--portaled');
        document.body.appendChild(panel);
        this.panelPortaled = true;
    }
    restorePanelIfNeeded() {
        if (!this.panelPortaled)
            return;
        const panel = this.getPanelEl();
        if (!panel) {
            this.panelPortaled = false;
            return;
        }
        if (panel.parentNode !== document.body) {
            this.panelPortaled = false;
            return;
        }
        const home = this.portalHomeRef?.nativeElement;
        if (home?.parentNode) {
            panel.classList.remove('i-datepicker-panel--portaled');
            this.renderer.insertBefore(home.parentNode, panel, home.nextSibling);
        }
        else if (this.originalParent) {
            panel.classList.remove('i-datepicker-panel--portaled');
            try {
                if (this.originalNextSibling) {
                    this.originalParent.insertBefore(panel, this.originalNextSibling);
                }
                else {
                    this.originalParent.appendChild(panel);
                }
            }
            catch {
                // ignore
            }
        }
        this.panelPortaled = false;
        this.originalParent = null;
        this.originalNextSibling = null;
    }
    scheduleReposition() {
        if (!this.isOpen)
            return;
        if (this.repositionRaf)
            cancelAnimationFrame(this.repositionRaf);
        this.zone.runOutsideAngular(() => {
            this.repositionRaf = requestAnimationFrame(() => {
                this.repositionRaf = 0;
                this.repositionPanelNow();
            });
        });
    }
    repositionPanelNow() {
        if (!this.isOpen)
            return;
        const panel = this.getPanelEl();
        const rect = this.getAnchorRect();
        if (!panel || !rect)
            return;
        panel.style.position = 'fixed';
        panel.style.zIndex = '2000';
        panel.style.boxSizing = 'border-box';
        panel.style.overflowY = 'auto';
        if (this.matchTriggerWidth) {
            panel.style.width = `${Math.round(rect.width)}px`;
        }
        else {
            panel.style.width = '';
        }
        const panelRect = panel.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const gap = 8;
        const pos = (this.panelPosition || 'bottom left').trim().toLowerCase();
        const wantTop = pos.startsWith('top');
        const wantBottom = pos.startsWith('bottom') ||
            (!pos.startsWith('top') && !pos.startsWith('left') && !pos.startsWith('right'));
        const wantLeft = pos.includes('left') || pos === 'left';
        const wantRight = pos.includes('right') || pos === 'right';
        const alignRight = wantRight && !wantLeft;
        let left = alignRight ? rect.right - panelRect.width : rect.left;
        const maxLeft = Math.max(gap, vw - panelRect.width - gap);
        left = Math.min(Math.max(gap, left), maxLeft);
        if (pos === 'left') {
            left = rect.left - panelRect.width - this.panelOffset;
            left = Math.min(Math.max(gap, left), maxLeft);
            const top = Math.min(Math.max(gap, rect.top), Math.max(gap, vh - panelRect.height - gap));
            panel.style.left = `${Math.round(left)}px`;
            panel.style.top = `${Math.round(top)}px`;
            const maxH = Math.max(120, vh - top - gap);
            panel.style.maxHeight = `${Math.floor(maxH)}px`;
            return;
        }
        if (pos === 'right') {
            left = rect.right + this.panelOffset;
            left = Math.min(Math.max(gap, left), maxLeft);
            const top = Math.min(Math.max(gap, rect.top), Math.max(gap, vh - panelRect.height - gap));
            panel.style.left = `${Math.round(left)}px`;
            panel.style.top = `${Math.round(top)}px`;
            const maxH = Math.max(120, vh - top - gap);
            panel.style.maxHeight = `${Math.floor(maxH)}px`;
            return;
        }
        const spaceBelow = vh - rect.bottom - this.panelOffset - gap;
        const spaceAbove = rect.top - this.panelOffset - gap;
        let side = wantTop && !wantBottom ? 'top' : 'bottom';
        if (side === 'bottom' && panelRect.height > spaceBelow && spaceAbove > spaceBelow) {
            side = 'top';
        }
        else if (side === 'top' && panelRect.height > spaceAbove && spaceBelow > spaceAbove) {
            side = 'bottom';
        }
        const maxH = Math.max(120, side === 'bottom' ? spaceBelow : spaceAbove);
        panel.style.maxHeight = `${Math.floor(maxH)}px`;
        const top = side === 'bottom'
            ? rect.bottom + this.panelOffset
            : rect.top - panelRect.height - this.panelOffset;
        panel.style.left = `${Math.round(left)}px`;
        panel.style.top = `${Math.round(top)}px`;
    }
    ensureGlobalListeners() {
        if (this.listeningGlobal)
            return;
        this.zone.runOutsideAngular(() => {
            const onAnyScroll = () => this.scheduleReposition();
            const onResize = () => this.scheduleReposition();
            window.addEventListener('scroll', onAnyScroll, true);
            document.addEventListener('scroll', onAnyScroll, true);
            window.addEventListener('resize', onResize, true);
            this._removeGlobal = () => {
                window.removeEventListener('scroll', onAnyScroll, true);
                document.removeEventListener('scroll', onAnyScroll, true);
                window.removeEventListener('resize', onResize, true);
            };
            this.listeningGlobal = true;
        });
    }
    removeGlobalListeners() {
        if (!this.listeningGlobal)
            return;
        const rm = this._removeGlobal;
        if (rm)
            rm();
        delete this._removeGlobal;
        this.listeningGlobal = false;
        if (this.repositionRaf) {
            cancelAnimationFrame(this.repositionRaf);
            this.repositionRaf = 0;
        }
    }
    prevMonth() {
        if (this.viewMonth === 0) {
            this.viewMonth = 11;
            this.viewYear -= 1;
        }
        else {
            this.viewMonth -= 1;
        }
        this.ensureYearRange(this.viewYear);
        this.buildCalendar();
        if (this.isOpen)
            this.scheduleReposition();
        this.cdr.markForCheck();
    }
    nextMonth() {
        if (this.viewMonth === 11) {
            this.viewMonth = 0;
            this.viewYear += 1;
        }
        else {
            this.viewMonth += 1;
        }
        this.ensureYearRange(this.viewYear);
        this.buildCalendar();
        if (this.isOpen)
            this.scheduleReposition();
        this.cdr.markForCheck();
    }
    onMonthChange(change) {
        const row = change?.value;
        if (!row)
            return;
        const month = typeof row === 'object' && 'value' in row ? row.value : row;
        if (typeof month !== 'number' || month < 0 || month > 11)
            return;
        this.viewMonth = month;
        this.buildCalendar();
        if (this.isOpen)
            this.scheduleReposition();
        this.cdr.markForCheck();
    }
    onYearChange(change) {
        const year = change.value;
        if (typeof year !== 'number')
            return;
        this.viewYear = year;
        this.ensureYearRange(this.viewYear);
        this.buildCalendar();
        if (this.isOpen)
            this.scheduleReposition();
        this.cdr.markForCheck();
    }
    selectDay(day) {
        if (this.disabled)
            return;
        const selected = this.startOfDay(day.date);
        this._modelValue = selected;
        this._displayText = this.formatDate(selected);
        this.onChange(selected);
        this.onTouched();
        this.onChanged.emit(selected);
        this.updateView(selected);
        this.closePanel();
        this.cdr.markForCheck();
    }
    initViewFromModel() {
        let base;
        if (this._modelValue instanceof Date) {
            base = this.startOfDay(this._modelValue);
        }
        else if (this._displayText) {
            base = this.parseInputDate(this._displayText) ?? this.startOfDay(new Date());
        }
        else {
            base = this.startOfDay(new Date());
        }
        this.updateView(base);
    }
    updateView(date) {
        this.viewYear = date.getFullYear();
        this.viewMonth = date.getMonth();
        this.ensureYearRange(this.viewYear);
        this.buildCalendar();
    }
    ensureYearRange(focusYear) {
        if (!this._years.length ||
            focusYear < this._years[0] ||
            focusYear > this._years[this._years.length - 1]) {
            const start = focusYear - 50;
            const end = focusYear + 10;
            const arr = [];
            for (let y = start; y <= end; y++)
                arr.push(y);
            this._years = arr;
        }
    }
    buildCalendar() {
        const year = this.viewYear;
        const month = this.viewMonth;
        const firstOfMonth = new Date(year, month, 1);
        const startDay = (firstOfMonth.getDay() + 6) % 7; // Monday=0
        const startDate = new Date(year, month, 1 - startDay);
        const weeks = [];
        const current = new Date(startDate);
        const selected = this._modelValue ? this.startOfDay(this._modelValue) : null;
        const today = this.startOfDay(new Date());
        for (let w = 0; w < 6; w++) {
            const row = [];
            for (let i = 0; i < 7; i++) {
                const date = new Date(current);
                const inCurrentMonth = date.getMonth() === month;
                row.push({
                    date,
                    inCurrentMonth,
                    isToday: this.isSameDate(date, today),
                    isSelected: selected ? this.isSameDate(date, selected) : false,
                });
                current.setDate(current.getDate() + 1);
            }
            weeks.push(row);
        }
        this.weeks = weeks;
    }
    startOfDay(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }
    isSameDate(a, b) {
        return (a.getFullYear() === b.getFullYear() &&
            a.getMonth() === b.getMonth() &&
            a.getDate() === b.getDate());
    }
    parseInputDate(value) {
        if (!value)
            return null;
        const fmt = this.format || 'yyyy-MM-dd';
        const parts = value.match(/\d+/g);
        if (!parts || parts.length < 3)
            return null;
        const tokens = fmt.match(/(yyyy|MM|dd)/g) || ['yyyy', 'MM', 'dd'];
        let year;
        let month;
        let day;
        tokens.forEach((t, idx) => {
            const p = parts[idx];
            if (!p)
                return;
            const n = Number(p);
            if (t === 'yyyy')
                year = n;
            else if (t === 'MM')
                month = n;
            else if (t === 'dd')
                day = n;
        });
        if (!year || !month || !day)
            return null;
        const date = new Date(year, month - 1, day);
        if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
            return null;
        }
        return this.startOfDay(date);
    }
    formatDate(date) {
        const fmt = this.format || 'yyyy-MM-dd';
        return formatDate(date, fmt, 'en');
    }
    // =========================================================
    // Host listeners
    // =========================================================
    /**
     * ✅ CRITICAL:
     * "input" events bubble.
     * Month/year i-select (and other inner inputs) will trigger "input" too.
     * If we react to those, we'll read the date input at the wrong moment and wipe display.
     */
    onHostInput(event) {
        const target = event.target;
        const dateInput = this.getInnerInput();
        if (!dateInput)
            return;
        // only react if THIS input event is from the date input itself
        if (target !== dateInput)
            return;
        this.handleInput(dateInput.value);
    }
    onHostFocusOut() {
        this.handleBlur();
    }
    /**
     * Flicker guard (for portaled inner i-select options)
     */
    onDocumentClick(event) {
        if (!this.isOpen)
            return;
        const target = event.target;
        if (!target)
            return;
        const host = this.hostEl.nativeElement;
        const panel = this.getPanelEl();
        const insideHost = host.contains(target);
        const insidePanel = !!panel && panel.contains(target);
        if (insideHost || insidePanel)
            return;
        const active = document.activeElement;
        const activeInsidePanel = !!panel && !!active && panel.contains(active);
        const clickedInAnySelectOptions = !!target.closest('i-options') || !!target.closest('.i-options');
        if (activeInsidePanel && clickedInAnySelectOptions)
            return;
        this.closePanel();
        this.cdr.markForCheck();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IDatepicker, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.16", type: IDatepicker, isStandalone: true, selector: "i-datepicker", inputs: { placeholder: "placeholder", disabled: "disabled", invalid: "invalid", format: "format", panelPosition: "panelPosition", portalToBody: "portalToBody", matchTriggerWidth: "matchTriggerWidth", panelOffset: "panelOffset", value: "value" }, outputs: { onChanged: "onChanged" }, host: { listeners: { "input": "onHostInput($event)", "focusout": "onHostFocusOut()", "document:click": "onDocumentClick($event)" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => IDatepicker),
                multi: true,
            },
        ], viewQueries: [{ propertyName: "panelRef", first: true, predicate: ["panel"], descendants: true, read: ElementRef }, { propertyName: "portalHomeRef", first: true, predicate: ["portalHome"], descendants: true, read: ElementRef }], ngImport: i0, template: `
    <i-input
      [append]="appendAddon"
      [iInputMask]="{ type: 'date', format: format }"
      [invalid]="invalid"
      [placeholder]="placeholder"
      [readonly]="disabled"
      [value]="displayText"
    />

    <span #portalHome style="display:none"></span>

    <i-datepicker-panel
      #panel
      class="i-datepicker-panel"
      [ngClass]="panelPositionClass"
      [style.display]="isOpen ? '' : 'none'"
    >
      <div class="i-datepicker-header">
        <i-button icon="prev" size="xs" (click)="prevMonth()" />

        <i-select
          class="i-date-picker-month-select"
          [options]="months"
          [value]="monthSelected"
          (onOptionSelected)="onMonthChange($event)"
        />

        <i-select
          class="i-date-picker-year-select"
          [options]="years"
          [value]="viewYear"
          (onOptionSelected)="onYearChange($event)"
        />

        <i-button icon="next" size="xs" (click)="nextMonth()" />
      </div>

      <div class="i-datepicker-weekdays">
        @for (w of weekdays; track w) {
          <small>{{ w }}</small>
        }
      </div>

      <div class="i-datepicker-weeks">
        @for (week of weeks; track $index) {
          <div class="i-datepicker-week">
            @for (d of week; track d.date.getTime()) {
              <div
                class="i-datepicker-day"
                [class.current-month]="d.inCurrentMonth"
                [class.selected]="d.isSelected"
                [class.today]="d.isToday && !d.isSelected"
                (click)="selectDay(d)"
              >
                {{ d.date.getDate() }}
              </div>
            }
          </div>
        }
      </div>
    </i-datepicker-panel>
  `, isInline: true, dependencies: [{ kind: "component", type: IInput, selector: "i-input", inputs: ["type", "placeholder", "autocomplete", "readonly", "invalid", "mask", "value", "prepend", "append", "disabled"] }, { kind: "component", type: IButton, selector: "i-button", inputs: ["disabled", "loading", "type", "loadingText", "variant", "size", "icon"], outputs: ["onClick"] }, { kind: "directive", type: IInputMaskDirective, selector: "[iInputMask]", inputs: ["iInputMask"] }, { kind: "component", type: ISelect, selector: "i-select", inputs: ["placeholder", "disabled", "invalid", "filterDelay", "panelPosition", "portalToBody", "panelOffset", "matchTriggerWidth", "options", "options$", "displayWith", "filterPredicate", "value"], outputs: ["onChanged", "onOptionSelected"] }, { kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IDatepicker, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-datepicker',
                    standalone: true,
                    imports: [IInput, IButton, IInputMaskDirective, ISelect, NgClass],
                    template: `
    <i-input
      [append]="appendAddon"
      [iInputMask]="{ type: 'date', format: format }"
      [invalid]="invalid"
      [placeholder]="placeholder"
      [readonly]="disabled"
      [value]="displayText"
    />

    <span #portalHome style="display:none"></span>

    <i-datepicker-panel
      #panel
      class="i-datepicker-panel"
      [ngClass]="panelPositionClass"
      [style.display]="isOpen ? '' : 'none'"
    >
      <div class="i-datepicker-header">
        <i-button icon="prev" size="xs" (click)="prevMonth()" />

        <i-select
          class="i-date-picker-month-select"
          [options]="months"
          [value]="monthSelected"
          (onOptionSelected)="onMonthChange($event)"
        />

        <i-select
          class="i-date-picker-year-select"
          [options]="years"
          [value]="viewYear"
          (onOptionSelected)="onYearChange($event)"
        />

        <i-button icon="next" size="xs" (click)="nextMonth()" />
      </div>

      <div class="i-datepicker-weekdays">
        @for (w of weekdays; track w) {
          <small>{{ w }}</small>
        }
      </div>

      <div class="i-datepicker-weeks">
        @for (week of weeks; track $index) {
          <div class="i-datepicker-week">
            @for (d of week; track d.date.getTime()) {
              <div
                class="i-datepicker-day"
                [class.current-month]="d.inCurrentMonth"
                [class.selected]="d.isSelected"
                [class.today]="d.isToday && !d.isSelected"
                (click)="selectDay(d)"
              >
                {{ d.date.getDate() }}
              </div>
            }
          </div>
        }
      </div>
    </i-datepicker-panel>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => IDatepicker),
                            multi: true,
                        },
                    ],
                }]
        }], propDecorators: { placeholder: [{
                type: Input
            }], disabled: [{
                type: Input
            }], invalid: [{
                type: Input
            }], format: [{
                type: Input
            }], panelPosition: [{
                type: Input
            }], portalToBody: [{
                type: Input
            }], matchTriggerWidth: [{
                type: Input
            }], panelOffset: [{
                type: Input
            }], value: [{
                type: Input
            }], onChanged: [{
                type: Output
            }], panelRef: [{
                type: ViewChild,
                args: ['panel', { read: ElementRef }]
            }], portalHomeRef: [{
                type: ViewChild,
                args: ['portalHome', { read: ElementRef }]
            }], onHostInput: [{
                type: HostListener,
                args: ['input', ['$event']]
            }], onHostFocusOut: [{
                type: HostListener,
                args: ['focusout']
            }], onDocumentClick: [{
                type: HostListener,
                args: ['document:click', ['$event']]
            }] } });
/**
 * IFCDatepicker
 * Version: 1.5.3
 */
class IFCDatepicker {
    innerDatepicker;
    label = '';
    placeholder = '';
    format = 'dd/MM/yyyy';
    panelPosition = 'bottom left';
    errorMessage;
    get value() {
        return this._value;
    }
    set value(v) {
        this._value = v ?? null;
    }
    _value = null;
    isDisabled = false;
    onChange = noop;
    onTouched = noop;
    ngControl = inject(NgControl, { self: true, optional: true });
    formDir = inject(FormGroupDirective, { optional: true });
    cdr = inject(ChangeDetectorRef);
    hostEl = inject((ElementRef));
    submitSub;
    constructor() {
        if (this.ngControl)
            this.ngControl.valueAccessor = this;
        if (this.formDir) {
            this.submitSub = this.formDir.ngSubmit.subscribe(() => {
                this.cdr.markForCheck();
            });
        }
    }
    ngOnDestroy() {
        this.submitSub?.unsubscribe?.();
    }
    writeValue(v) {
        if (v instanceof Date || v === null) {
            this._value = v;
        }
        else if (typeof v === 'string' && v.trim()) {
            const parsed = new Date(v);
            this._value = isNaN(parsed.getTime()) ? null : parsed;
        }
        else {
            this._value = null;
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.isDisabled = isDisabled;
    }
    handleDateChange(date) {
        this._value = date ?? null;
        this.onChange(this._value);
        this.onTouched();
    }
    focusInnerDatepicker() {
        if (this.isDisabled)
            return;
        const input = this.hostEl.nativeElement.querySelector('i-datepicker i-input input');
        input?.focus();
    }
    get controlInvalid() {
        const c = this.ngControl?.control;
        if (!c)
            return false;
        if (this.formDir)
            return c.invalid && !!this.formDir.submitted;
        return c.invalid && (c.dirty || c.touched);
    }
    get required() {
        return isControlRequired(this.ngControl, this.errorMessage);
    }
    get resolvedErrorText() {
        return resolveControlErrorMessage(this.ngControl, this.label, this.errorMessage);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IFCDatepicker, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.16", type: IFCDatepicker, isStandalone: true, selector: "i-fc-datepicker", inputs: { label: "label", placeholder: "placeholder", format: "format", panelPosition: "panelPosition", errorMessage: "errorMessage", value: "value" }, viewQueries: [{ propertyName: "innerDatepicker", first: true, predicate: IDatepicker, descendants: true }], ngImport: i0, template: `@if (label) {
      <label class="i-fc-datepicker__label" (click)="focusInnerDatepicker()">
        {{ label }} :
        @if (required) {
          <span class="i-fc-datepicker__required">*</span>
        }
      </label>
    }

    <i-datepicker
      [disabled]="isDisabled"
      [format]="format"
      [invalid]="controlInvalid"
      [panelPosition]="panelPosition"
      [placeholder]="placeholder"
      [value]="value"
      (onChanged)="handleDateChange($event)"
    />

    @if (controlInvalid && resolvedErrorText) {
      <div class="i-fc-datepicker__error">
        {{ resolvedErrorText }}
      </div>
    }`, isInline: true, dependencies: [{ kind: "component", type: IDatepicker, selector: "i-datepicker", inputs: ["placeholder", "disabled", "invalid", "format", "panelPosition", "portalToBody", "matchTriggerWidth", "panelOffset", "value"], outputs: ["onChanged"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IFCDatepicker, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-fc-datepicker',
                    standalone: true,
                    imports: [IDatepicker],
                    template: `@if (label) {
      <label class="i-fc-datepicker__label" (click)="focusInnerDatepicker()">
        {{ label }} :
        @if (required) {
          <span class="i-fc-datepicker__required">*</span>
        }
      </label>
    }

    <i-datepicker
      [disabled]="isDisabled"
      [format]="format"
      [invalid]="controlInvalid"
      [panelPosition]="panelPosition"
      [placeholder]="placeholder"
      [value]="value"
      (onChanged)="handleDateChange($event)"
    />

    @if (controlInvalid && resolvedErrorText) {
      <div class="i-fc-datepicker__error">
        {{ resolvedErrorText }}
      </div>
    }`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: () => [], propDecorators: { innerDatepicker: [{
                type: ViewChild,
                args: [IDatepicker]
            }], label: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], format: [{
                type: Input
            }], panelPosition: [{
                type: Input
            }], errorMessage: [{
                type: Input
            }], value: [{
                type: Input
            }] } });

/* textarea.ts */
/**
 * ITextarea
 * Version: 1.1.1
 */
/* =========================================
 * ITextArea (CVA)
 * ========================================= */
class ITextArea {
    placeholder = '';
    readonly = false;
    rows = 3;
    /** invalid state (controlled by form or wrapper) */
    invalid = false;
    /**
     * NOTE:
     * Keep [value] support for non-form usages.
     * But CVA should be the main source of truth.
     */
    get value() {
        return this._value;
    }
    set value(v) {
        this._value = v ?? '';
    }
    textareaRef;
    _value = null;
    isDisabled = false;
    get disabled() {
        return this.isDisabled;
    }
    set disabled(value) {
        this.isDisabled = value;
    }
    onChange = () => {
        /*  */
    };
    onTouched = () => {
        /*  */
    };
    // -----------------------------
    // ControlValueAccessor
    // -----------------------------
    writeValue(value) {
        this._value = value ?? '';
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.isDisabled = isDisabled;
    }
    // -----------------------------
    // View events
    // -----------------------------
    handleInput(event) {
        const target = event.target;
        this._value = target.value;
        this.onChange(this._value);
    }
    handleBlur() {
        this.onTouched();
    }
    /** Click anywhere on <i-textarea> focuses the inner textarea */
    handleHostClick() {
        if (!this.isDisabled && this.textareaRef) {
            this.textareaRef.nativeElement.focus();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ITextArea, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: ITextArea, isStandalone: true, selector: "i-textarea", inputs: { placeholder: "placeholder", readonly: "readonly", rows: "rows", invalid: "invalid", value: "value", disabled: "disabled" }, host: { listeners: { "click": "handleHostClick()" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => ITextArea),
                multi: true,
            },
        ], viewQueries: [{ propertyName: "textareaRef", first: true, predicate: ["textareaRef"], descendants: true }], ngImport: i0, template: `<textarea
    #textareaRef
    [attr.aria-invalid]="invalid ? 'true' : null"
    [disabled]="isDisabled"
    [placeholder]="placeholder"
    [readonly]="readonly"
    [rows]="rows"
    [value]="_value ?? ''"
    (blur)="handleBlur()"
    (input)="handleInput($event)"
  ></textarea>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ITextArea, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-textarea',
                    standalone: true,
                    template: `<textarea
    #textareaRef
    [attr.aria-invalid]="invalid ? 'true' : null"
    [disabled]="isDisabled"
    [placeholder]="placeholder"
    [readonly]="readonly"
    [rows]="rows"
    [value]="_value ?? ''"
    (blur)="handleBlur()"
    (input)="handleInput($event)"
  ></textarea>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => ITextArea),
                            multi: true,
                        },
                    ],
                }]
        }], propDecorators: { placeholder: [{
                type: Input
            }], readonly: [{
                type: Input
            }], rows: [{
                type: Input
            }], invalid: [{
                type: Input
            }], value: [{
                type: Input
            }], textareaRef: [{
                type: ViewChild,
                args: ['textareaRef']
            }], disabled: [{
                type: Input
            }], handleHostClick: [{
                type: HostListener,
                args: ['click']
            }] } });
class IFCTextArea {
    innerTextarea;
    cdr = inject(ChangeDetectorRef);
    // Optional injections (same as @Self() @Optional())
    ngControl = inject(NgControl, { self: true, optional: true });
    formDir = inject(FormGroupDirective, { optional: true });
    submitSub;
    // ---------- UI inputs ----------
    label = '';
    placeholder = '';
    readonly = false;
    rows = 3;
    errorMessage;
    get value() {
        return this._value;
    }
    set value(v) {
        this._value = v ?? '';
        this.cdr.markForCheck();
    }
    // ---------- internal state ----------
    _value = null;
    isDisabled = false;
    onChange = () => {
        /*  */
    };
    onTouched = () => {
        /*  */
    };
    constructor() {
        // ✅ this is the "i-fc-input" pattern
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
        if (this.formDir) {
            this.submitSub = this.formDir.ngSubmit.subscribe(() => {
                this.cdr.markForCheck();
            });
        }
    }
    ngOnDestroy() {
        this.submitSub?.unsubscribe();
    }
    // ---------- CVA ----------
    writeValue(v) {
        this._value = v ?? '';
        this.cdr.markForCheck();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.isDisabled = isDisabled;
        this.cdr.markForCheck();
    }
    // ---------- bridge from inner <i-textarea> ----------
    handleInnerInput(event) {
        const target = event.target;
        const v = target?.value ?? '';
        this._value = v;
        this.onChange(this._value);
        this.cdr.markForCheck();
    }
    handleInnerFocusOut() {
        this.onTouched();
        this.cdr.markForCheck();
    }
    // ---------- focus from label ----------
    focusInnerTextarea() {
        if (!this.isDisabled && this.innerTextarea?.textareaRef) {
            this.innerTextarea.textareaRef.nativeElement.focus();
        }
    }
    // ---------- validation helpers ----------
    get controlInvalid() {
        const c = this.ngControl?.control;
        if (!c)
            return false;
        if (this.formDir) {
            return c.invalid && !!this.formDir.submitted;
        }
        return c.invalid && (c.dirty || c.touched);
    }
    get required() {
        return isControlRequired(this.ngControl, this.errorMessage);
    }
    get resolvedErrorText() {
        return resolveControlErrorMessage(this.ngControl, this.label, this.errorMessage);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IFCTextArea, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.16", type: IFCTextArea, isStandalone: true, selector: "i-fc-textarea", inputs: { label: "label", placeholder: "placeholder", readonly: "readonly", rows: "rows", errorMessage: "errorMessage", value: "value" }, viewQueries: [{ propertyName: "innerTextarea", first: true, predicate: ITextArea, descendants: true }], ngImport: i0, template: `@if (label) {
      <label class="i-fc-textarea__label" (click)="focusInnerTextarea()">
        {{ label }} :
        @if (required) {
          <span class="i-fc-textarea__required">*</span>
        }
      </label>
    }

    <i-textarea
      [disabled]="isDisabled"
      [invalid]="controlInvalid"
      [placeholder]="placeholder"
      [readonly]="readonly"
      [rows]="rows"
      [value]="_value"
      (focusout)="handleInnerFocusOut()"
      (input)="handleInnerInput($event)"
    />

    @if (controlInvalid && resolvedErrorText) {
      <div class="i-fc-textarea__error">
        {{ resolvedErrorText }}
      </div>
    }`, isInline: true, dependencies: [{ kind: "component", type: ITextArea, selector: "i-textarea", inputs: ["placeholder", "readonly", "rows", "invalid", "value", "disabled"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IFCTextArea, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-fc-textarea',
                    standalone: true,
                    imports: [ITextArea],
                    template: `@if (label) {
      <label class="i-fc-textarea__label" (click)="focusInnerTextarea()">
        {{ label }} :
        @if (required) {
          <span class="i-fc-textarea__required">*</span>
        }
      </label>
    }

    <i-textarea
      [disabled]="isDisabled"
      [invalid]="controlInvalid"
      [placeholder]="placeholder"
      [readonly]="readonly"
      [rows]="rows"
      [value]="_value"
      (focusout)="handleInnerFocusOut()"
      (input)="handleInnerInput($event)"
    />

    @if (controlInvalid && resolvedErrorText) {
      <div class="i-fc-textarea__error">
        {{ resolvedErrorText }}
      </div>
    }`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    // ✅ NO NG_VALUE_ACCESSOR PROVIDER HERE (prevents circular dependency)
                }]
        }], ctorParameters: () => [], propDecorators: { innerTextarea: [{
                type: ViewChild,
                args: [ITextArea]
            }], label: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], readonly: [{
                type: Input
            }], rows: [{
                type: Input
            }], errorMessage: [{
                type: Input
            }], value: [{
                type: Input
            }] } });

// i-dialog.ts (Angular) — full updated file (visible removed from action types)
const I_DIALOG_DATA = new InjectionToken('I_DIALOG_DATA');
/**
 * REF
 * TResult = result type of close()
 */
class IDialogRef {
    _afterClosed$ = new Subject();
    close(result) {
        this._afterClosed$.next(result);
        this._afterClosed$.complete();
    }
    afterClosed() {
        return this._afterClosed$.asObservable();
    }
}
/**
 * SERVICE
 */
let DIALOG_ID_COUNTER = 0;
class IDialogService {
    _dialogs$ = new BehaviorSubject([]);
    dialogs$ = this._dialogs$.asObservable();
    open(component, config = {}) {
        const id = config.id ?? `i-dialog-${++DIALOG_ID_COUNTER}`;
        const ref = new IDialogRef();
        const instance = {
            id,
            component,
            config: {
                width: config.width ?? 'auto',
                height: config.height ?? 'auto',
                disableClose: config.disableClose ?? false,
                backdropClose: config.backdropClose ?? true,
                data: config.data ?? undefined,
                id,
            },
            ref,
        };
        const dialogs = this._dialogs$.value;
        this._dialogs$.next([...dialogs, instance]);
        ref.afterClosed().subscribe(() => {
            const current = this._dialogs$.value;
            this._dialogs$.next(current.filter((d) => d.id !== id));
        });
        return ref;
    }
    closeById(id, result) {
        const instance = this._dialogs$.value.find((d) => d.id === id);
        if (instance) {
            instance.ref.close(result);
        }
    }
    closeAll() {
        this._dialogs$.value.forEach((d) => d.ref.close());
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IDialogService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IDialogService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IDialogService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
/**
 * CONTAINER COMPONENT (ONE DIALOG)
 */
class IDialogContainer {
    instance;
    isTopMost = false;
    rootInjector = inject(Injector);
    dialogInjector;
    ngOnChanges(changes) {
        if (changes['instance'] && this.instance) {
            this.dialogInjector = Injector.create({
                providers: [
                    { provide: I_DIALOG_DATA, useValue: this.instance.config.data },
                    { provide: IDialogRef, useValue: this.instance.ref },
                ],
                parent: this.rootInjector,
            });
        }
    }
    get panelStyles() {
        const cfg = this.instance?.config;
        return {
            width: cfg?.width,
            height: cfg?.height,
        };
    }
    onEscKey() {
        if (!this.isTopMost)
            return; // only the topmost dialog reacts
        if (!this.instance?.config.disableClose) {
            this.instance.ref.close();
        }
    }
    onBackdropClick() {
        if (!this.isTopMost)
            return; // only topmost backdrop closes
        if (!this.instance?.config.disableClose && this.instance?.config.backdropClose) {
            this.instance.ref.close();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IDialogContainer, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: IDialogContainer, isStandalone: true, selector: "i-dialog-container", inputs: { instance: "instance", isTopMost: "isTopMost" }, host: { listeners: { "document:keydown.escape": "onEscKey()" } }, usesOnChanges: true, ngImport: i0, template: `<div class="i-dialog-backdrop" (click)="onBackdropClick()"></div>
    <div class="i-dialog-wrapper">
      <div class="i-dialog-panel" [ngStyle]="panelStyles">
        <ng-container *ngComponentOutlet="instance.component; injector: dialogInjector" />
      </div>
    </div> `, isInline: true, dependencies: [{ kind: "directive", type: NgComponentOutlet, selector: "[ngComponentOutlet]", inputs: ["ngComponentOutlet", "ngComponentOutletInputs", "ngComponentOutletInjector", "ngComponentOutletEnvironmentInjector", "ngComponentOutletContent", "ngComponentOutletNgModule", "ngComponentOutletNgModuleFactory"], exportAs: ["ngComponentOutlet"] }, { kind: "directive", type: NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IDialogContainer, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-dialog-container',
                    standalone: true,
                    imports: [NgComponentOutlet, NgStyle],
                    template: `<div class="i-dialog-backdrop" (click)="onBackdropClick()"></div>
    <div class="i-dialog-wrapper">
      <div class="i-dialog-panel" [ngStyle]="panelStyles">
        <ng-container *ngComponentOutlet="instance.component; injector: dialogInjector" />
      </div>
    </div> `,
                }]
        }], propDecorators: { instance: [{
                type: Input,
                args: [{ required: true }]
            }], isTopMost: [{
                type: Input
            }], onEscKey: [{
                type: HostListener,
                args: ['document:keydown.escape']
            }] } });
/**
 * OUTLET COMPONENT (ALL DIALOGS)
 */
class IDialogOutlet {
    dialogService = inject(IDialogService);
    dialogs$ = this.dialogService.dialogs$;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IDialogOutlet, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.16", type: IDialogOutlet, isStandalone: true, selector: "i-dialog-outlet", ngImport: i0, template: `
    @for (dialog of (dialogs$ | async) ?? []; track dialog.id; let last = $last) {
      <i-dialog-container [instance]="dialog" [isTopMost]="last" />
    }
  `, isInline: true, dependencies: [{ kind: "component", type: IDialogContainer, selector: "i-dialog-container", inputs: ["instance", "isTopMost"] }, { kind: "pipe", type: AsyncPipe, name: "async" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IDialogOutlet, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-dialog-outlet',
                    standalone: true,
                    imports: [AsyncPipe, IDialogContainer],
                    template: `
    @for (dialog of (dialogs$ | async) ?? []; track dialog.id; let last = $last) {
      <i-dialog-container [instance]="dialog" [isTopMost]="last" />
    }
  `,
                }]
        }] });
/**
 * i-dialog-close DIRECTIVE
 */
class IDialogCloseDirective {
    /**
     * Supports:
     *   i-dialog-close
     *   i-dialog-close="result"
     *   [iDialogClose]="result"
     */
    result;
    dialogRef = inject(IDialogRef);
    onClick(event) {
        event.preventDefault();
        this.dialogRef.close(this.result);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IDialogCloseDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.16", type: IDialogCloseDirective, isStandalone: true, selector: "[i-dialog-close], [iDialogClose]", inputs: { result: ["iDialogClose", "result"] }, host: { listeners: { "click": "onClick($event)" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IDialogCloseDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[i-dialog-close], [iDialogClose]',
                    standalone: true,
                }]
        }], propDecorators: { result: [{
                type: Input,
                args: ['iDialogClose']
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
class IDialog {
    title;
    actions = ['save', 'cancel'];
    onOk = new EventEmitter();
    onConfirm = new EventEmitter();
    onSave = new EventEmitter();
    onCustomAction = new EventEmitter();
    get normalizedActions() {
        return (this.actions ?? []).map((a) => typeof a === 'string' ? { type: a } : a);
    }
    get saveAction() {
        return this.normalizedActions.find((a) => a.type === 'save');
    }
    get okAction() {
        return this.normalizedActions.find((a) => a.type === 'ok');
    }
    get confirmAction() {
        return this.normalizedActions.find((a) => a.type === 'confirm');
    }
    get customActions() {
        return this.normalizedActions.filter((a) => a.type === 'custom');
    }
    get cancelAction() {
        return this.normalizedActions.find((a) => a.type === 'cancel');
    }
    onConfirmClick() {
        this.onConfirm.emit();
    }
    onOkClick() {
        this.onOk.emit();
    }
    onSaveClick() {
        this.onSave.emit();
    }
    onCustomActionClick(a) {
        this.onCustomAction.emit(a);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IDialog, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.16", type: IDialog, isStandalone: true, selector: "i-dialog", inputs: { title: "title", actions: "actions" }, outputs: { onOk: "onOk", onConfirm: "onConfirm", onSave: "onSave", onCustomAction: "onCustomAction" }, ngImport: i0, template: `@if (title) {
      <h4 class="i-dialog-title">{{ title }}</h4>
    }
    <div class="i-dialog-content">
      <ng-content />
    </div>
    @if (actions.length > 0) {
      <div class="i-dialog-actions">
        @if (customActions.length > 0) {
          @for (a of customActions; track $index) {
            <i-button
              [icon]="a.icon"
              [ngClass]="a.className"
              [variant]="a.variant || 'primary'"
              (onClick)="onCustomActionClick(a)"
              >{{ a.label }}</i-button
            >
          }
        }
        @if (
          (okAction || confirmAction || saveAction || cancelAction) && customActions.length > 0
        ) {
          <span class="flex-fill"></span>
        }
        @if (okAction) {
          <i-button
            icon="check"
            variant="primary"
            [ngClass]="okAction.className"
            (onClick)="onOkClick()"
            >OK</i-button
          >
        }
        @if (confirmAction) {
          <i-button
            icon="save"
            variant="primary"
            [ngClass]="confirmAction.className"
            (onClick)="onConfirmClick()"
            >Confirm</i-button
          >
        }
        @if (saveAction) {
          <i-button
            icon="save"
            variant="primary"
            [ngClass]="saveAction.className"
            (onClick)="onSaveClick()"
            >Save</i-button
          >
        }
        @if (cancelAction) {
          <i-button i-dialog-close icon="cancel" variant="danger" [ngClass]="cancelAction.className"
            >Cancel</i-button
          >
        }
      </div>
    } `, isInline: true, dependencies: [{ kind: "component", type: IButton, selector: "i-button", inputs: ["disabled", "loading", "type", "loadingText", "variant", "size", "icon"], outputs: ["onClick"] }, { kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: IDialogCloseDirective, selector: "[i-dialog-close], [iDialogClose]", inputs: ["iDialogClose"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IDialog, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-dialog',
                    standalone: true,
                    imports: [IButton, NgClass, IDialogCloseDirective],
                    template: `@if (title) {
      <h4 class="i-dialog-title">{{ title }}</h4>
    }
    <div class="i-dialog-content">
      <ng-content />
    </div>
    @if (actions.length > 0) {
      <div class="i-dialog-actions">
        @if (customActions.length > 0) {
          @for (a of customActions; track $index) {
            <i-button
              [icon]="a.icon"
              [ngClass]="a.className"
              [variant]="a.variant || 'primary'"
              (onClick)="onCustomActionClick(a)"
              >{{ a.label }}</i-button
            >
          }
        }
        @if (
          (okAction || confirmAction || saveAction || cancelAction) && customActions.length > 0
        ) {
          <span class="flex-fill"></span>
        }
        @if (okAction) {
          <i-button
            icon="check"
            variant="primary"
            [ngClass]="okAction.className"
            (onClick)="onOkClick()"
            >OK</i-button
          >
        }
        @if (confirmAction) {
          <i-button
            icon="save"
            variant="primary"
            [ngClass]="confirmAction.className"
            (onClick)="onConfirmClick()"
            >Confirm</i-button
          >
        }
        @if (saveAction) {
          <i-button
            icon="save"
            variant="primary"
            [ngClass]="saveAction.className"
            (onClick)="onSaveClick()"
            >Save</i-button
          >
        }
        @if (cancelAction) {
          <i-button i-dialog-close icon="cancel" variant="danger" [ngClass]="cancelAction.className"
            >Cancel</i-button
          >
        }
      </div>
    } `,
                }]
        }], propDecorators: { title: [{
                type: Input
            }], actions: [{
                type: Input
            }], onOk: [{
                type: Output
            }], onConfirm: [{
                type: Output
            }], onSave: [{
                type: Output
            }], onCustomAction: [{
                type: Output
            }] } });
class IAlert {
    data = inject(I_DIALOG_DATA);
    dialog = inject(IDialogRef);
    get alertClass() {
        return `i-alert i-alert-${this.data.type}`;
    }
    submit() {
        this.dialog.close();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IAlert, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.16", type: IAlert, isStandalone: true, selector: "i-alert", ngImport: i0, template: `
    <i-dialog
      [actions]="[
        {
          type: 'ok',
          className: 'w-full',
        },
      ]"
      [ngClass]="alertClass"
      (onOk)="submit()"
    >
      @if (data.type === 'information') {
        <i-icon icon="info" size="3xl" />
      }
      @if (data.type === 'success') {
        <i-icon icon="check-circle" size="3xl" />
      }
      @if (data.type === 'warning') {
        <i-icon icon="exclamation" size="3xl" />
      }
      @if (data.type === 'danger') {
        <i-icon icon="x-circle" size="3xl" />
      }
      <h4>{{ data.title }}</h4>
      <p [innerHtml]="data.description"></p>
    </i-dialog>
  `, isInline: true, dependencies: [{ kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "component", type: IIcon, selector: "i-icon", inputs: ["icon", "size"] }, { kind: "component", type: IDialog, selector: "i-dialog", inputs: ["title", "actions"], outputs: ["onOk", "onConfirm", "onSave", "onCustomAction"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IAlert, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-alert',
                    imports: [NgClass, IIcon, IDialog],
                    template: `
    <i-dialog
      [actions]="[
        {
          type: 'ok',
          className: 'w-full',
        },
      ]"
      [ngClass]="alertClass"
      (onOk)="submit()"
    >
      @if (data.type === 'information') {
        <i-icon icon="info" size="3xl" />
      }
      @if (data.type === 'success') {
        <i-icon icon="check-circle" size="3xl" />
      }
      @if (data.type === 'warning') {
        <i-icon icon="exclamation" size="3xl" />
      }
      @if (data.type === 'danger') {
        <i-icon icon="x-circle" size="3xl" />
      }
      <h4>{{ data.title }}</h4>
      <p [innerHtml]="data.description"></p>
    </i-dialog>
  `,
                }]
        }] });
class IAlertService {
    dialog = inject(IDialogService);
    show({ title, description, type }) {
        return this.dialog
            .open(IAlert, {
            width: '',
            data: {
                title,
                description,
                type,
            },
            disableClose: true,
        })
            .afterClosed()
            .pipe(map((result) => !!result));
    }
    information(title, description) {
        return this.show({ title, description, type: 'information' });
    }
    success(title, description) {
        return this.show({ title, description, type: 'success' });
    }
    warning(title, description) {
        return this.show({ title, description, type: 'warning' });
    }
    danger(title, description) {
        return this.show({ title, description, type: 'danger' });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IAlertService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IAlertService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IAlertService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
class IConfirm {
    data = inject(I_DIALOG_DATA);
    dialog = inject(IDialogRef);
    formBuilder = inject(FormBuilder);
    reason = new FormControl('', [Validators.required]);
    formGroup = this.formBuilder.group({
        reason: this.reason,
    });
    formGroupDir;
    get confirmClass() {
        return `i-confirm i-confirm-${this.data.type}`;
    }
    submit() {
        if (this.data.reason) {
            this.formGroupDir.onSubmit(new Event('submit'));
            return;
        }
        this.dialog.close(true);
    }
    onSubmit() {
        if (this.formGroup.invalid) {
            return;
        }
        this.dialog.close(this.reason.value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IConfirm, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.16", type: IConfirm, isStandalone: true, selector: "i-confirm", viewQueries: [{ propertyName: "formGroupDir", first: true, predicate: FormGroupDirective, descendants: true }], ngImport: i0, template: `<i-dialog
    [actions]="[
      {
        type: 'confirm',
        className: 'w-104',
      },
      {
        type: 'cancel',
        className: 'w-104',
      },
    ]"
    [ngClass]="confirmClass"
    (onConfirm)="submit()"
  >
    @if (data.type === 'information') {
      <i-icon icon="info" size="3xl" />
    }
    @if (data.type === 'success') {
      <i-icon icon="check-circle" size="3xl" />
    }
    @if (data.type === 'warning') {
      <i-icon icon="exclamation" size="3xl" />
    }
    @if (data.type === 'danger') {
      <i-icon icon="x-circle" size="3xl" />
    }
    <h4>{{ data.title }}</h4>
    <p [innerHtml]="data.description"></p>
    @if (data.reason) {
      <form class="mt-xs" [formGroup]="formGroup" (ngSubmit)="onSubmit()">
        <i-fc-textarea
          formControlName="reason"
          label="Reason"
          placeholder="Fill your reason here.."
          [errorMessage]="{
            required: 'Please fill in the reason..',
          }"
        />
        <button #submitButton class="hidden" type="submit">Submit</button>
      </form>
    }
  </i-dialog>`, isInline: true, dependencies: [{ kind: "component", type: IDialog, selector: "i-dialog", inputs: ["title", "actions"], outputs: ["onOk", "onConfirm", "onSave", "onCustomAction"] }, { kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "component", type: IIcon, selector: "i-icon", inputs: ["icon", "size"] }, { kind: "component", type: IFCTextArea, selector: "i-fc-textarea", inputs: ["label", "placeholder", "readonly", "rows", "errorMessage", "value"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "ngmodule", type: FormsModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IConfirm, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-confirm',
                    imports: [IDialog, NgClass, IIcon, IFCTextArea, ReactiveFormsModule, FormsModule],
                    template: `<i-dialog
    [actions]="[
      {
        type: 'confirm',
        className: 'w-104',
      },
      {
        type: 'cancel',
        className: 'w-104',
      },
    ]"
    [ngClass]="confirmClass"
    (onConfirm)="submit()"
  >
    @if (data.type === 'information') {
      <i-icon icon="info" size="3xl" />
    }
    @if (data.type === 'success') {
      <i-icon icon="check-circle" size="3xl" />
    }
    @if (data.type === 'warning') {
      <i-icon icon="exclamation" size="3xl" />
    }
    @if (data.type === 'danger') {
      <i-icon icon="x-circle" size="3xl" />
    }
    <h4>{{ data.title }}</h4>
    <p [innerHtml]="data.description"></p>
    @if (data.reason) {
      <form class="mt-xs" [formGroup]="formGroup" (ngSubmit)="onSubmit()">
        <i-fc-textarea
          formControlName="reason"
          label="Reason"
          placeholder="Fill your reason here.."
          [errorMessage]="{
            required: 'Please fill in the reason..',
          }"
        />
        <button #submitButton class="hidden" type="submit">Submit</button>
      </form>
    }
  </i-dialog>`,
                }]
        }], propDecorators: { formGroupDir: [{
                type: ViewChild,
                args: [FormGroupDirective]
            }] } });
class IConfirmService {
    dialog = inject(IDialogService);
    show({ title, description, type, reason }) {
        return this.dialog
            .open(IConfirm, {
            width: '',
            data: {
                title,
                description,
                type,
                reason,
            },
        })
            .afterClosed();
    }
    information(title, description) {
        return this.show({ title, description, type: 'information' });
    }
    success(title, description) {
        return this.show({ title, description, type: 'success' });
    }
    warning(title, description, reason) {
        return this.show({ title, description, type: 'warning', reason });
    }
    danger(title, description, reason) {
        return this.show({ title, description, type: 'danger', reason });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IConfirmService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IConfirmService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IConfirmService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
class IDialogModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.16", ngImport: i0, type: IDialogModule, imports: [IDialogContainer, IDialogOutlet, IDialogCloseDirective, IDialog, IAlert, IConfirm], exports: [IDialogContainer, IDialogOutlet, IDialogCloseDirective, IDialog, IAlert, IConfirm] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IDialogModule, imports: [IConfirm] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [IDialogContainer, IDialogOutlet, IDialogCloseDirective, IDialog, IAlert, IConfirm],
                    exports: [IDialogContainer, IDialogOutlet, IDialogCloseDirective, IDialog, IAlert, IConfirm],
                }]
        }] });

/* paginator.ts */
/**
 * IPaginator
 * Version: 1.2.0
 *
 * ✅ CHANGES:
 * - Standardized event name to `onPageChange` (on* prefix parity with React)
 */
class IPaginator {
    length = 0;
    pageIndex = 0; // 0-based
    pageSize = 10;
    pageSizeOptions = [10, 50, 100];
    /** ✅ on* prefix parity with React */
    onPageChange = new EventEmitter();
    /** Max numeric pages shown (not counting ellipsis). Matches your examples. */
    _maxVisiblePages = 6;
    get pageCount() {
        return Math.max(1, Math.ceil(this.length / this.pageSize));
    }
    get pageItems() {
        const total = this.pageCount;
        const current = this.pageIndex + 1; // 1-based for easier math
        const last = total;
        // If <= 6 pages: show all
        if (total <= this._maxVisiblePages) {
            return this._range(1, last).map((p) => this._pageItem(p, current));
        }
        // total > 6
        // - Near start (current <= 4): 1 2 3 4 5 ... last
        // - Near end (current >= last - 3): 1 ... last-4 last-3 last-2 last-1 last
        // - Middle: 1 ... (current-2 current-1 current current+1) ... last
        if (current <= 4) {
            const items = [
                ...this._range(1, 5).map((p) => this._pageItem(p, current)),
                { type: 'ellipsis', key: 'e-end' },
                this._pageItem(last, current),
            ];
            return items;
        }
        if (current >= last - 3) {
            const start = last - 4;
            const items = [
                this._pageItem(1, current),
                { type: 'ellipsis', key: 'e-start' },
                ...this._range(start, last).map((p) => this._pageItem(p, current)),
            ];
            return items;
        }
        // middle
        const midStart = current - 2;
        const midEnd = current + 1;
        const items = [
            this._pageItem(1, current),
            { type: 'ellipsis', key: 'e-start' },
            ...this._range(midStart, midEnd).map((p) => this._pageItem(p, current)),
            { type: 'ellipsis', key: 'e-end' },
            this._pageItem(last, current),
        ];
        return items;
    }
    trackItem(item) {
        if (item.type === 'ellipsis') {
            return item.key;
        }
        return `p-${item.pageIndex}`;
    }
    _pageItem(pageNumber1Based, current1Based) {
        const idx = pageNumber1Based - 1;
        return {
            type: 'page',
            pageIndex: idx,
            label: String(pageNumber1Based),
            active: pageNumber1Based === current1Based,
        };
    }
    _range(from, to) {
        const out = [];
        for (let i = from; i <= to; i++)
            out.push(i);
        return out;
    }
    emit() {
        // clamp, just in case
        const maxIndex = this.pageCount - 1;
        if (this.pageIndex < 0)
            this.pageIndex = 0;
        if (this.pageIndex > maxIndex)
            this.pageIndex = maxIndex;
        this.onPageChange.emit({
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
        });
    }
    goToPage(pageIndex) {
        const maxIndex = this.pageCount - 1;
        const next = Math.max(0, Math.min(maxIndex, pageIndex));
        if (next === this.pageIndex) {
            return;
        }
        this.pageIndex = next;
        this.emit();
    }
    changePageSize(value) {
        const newSize = Number(value);
        if (!Number.isFinite(newSize) || newSize <= 0) {
            return;
        }
        const oldSize = this.pageSize;
        // keep current "first item" visible after resizing page size
        const firstItemIndex = this.pageIndex * oldSize;
        this.pageSize = newSize;
        this.pageIndex = Math.floor(firstItemIndex / newSize);
        this.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IPaginator, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.16", type: IPaginator, isStandalone: true, selector: "i-paginator", inputs: { length: "length", pageIndex: "pageIndex", pageSize: "pageSize", pageSizeOptions: "pageSizeOptions" }, outputs: { onPageChange: "onPageChange" }, host: { classAttribute: "i-paginator" }, ngImport: i0, template: `
    <div class="i-paginator flex align-center gap-md flex-fill">
      <!-- Page size -->
      @for (size of pageSizeOptions; track size) {
        <i-button size="sm" [disabled]="pageSize === size" (onClick)="changePageSize(size)">
          {{ size }}
        </i-button>
      }

      <span class="flex-fill"></span>
      <p>
        Page {{ pageIndex + 1 }} of {{ pageCount }} ({{ length }} row{{ length > 1 ? 's' : '' }})
      </p>

      @if (pageCount > 1) {
        <!-- Pages -->
        <div class="i-paginator-pages flex align-center gap-xs">
          @for (item of pageItems; track trackItem(item)) {
            @if (item.type === 'ellipsis') {
              <span aria-hidden="true" class="i-paginator-ellipsis">...</span>
            } @else {
              <i-button size="sm" [disabled]="item.active" (onClick)="goToPage(item.pageIndex)">
                {{ item.label }}
              </i-button>
            }
          }
        </div>
      }
    </div>
  `, isInline: true, dependencies: [{ kind: "component", type: IButton, selector: "i-button", inputs: ["disabled", "loading", "type", "loadingText", "variant", "size", "icon"], outputs: ["onClick"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IPaginator, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-paginator',
                    standalone: true,
                    imports: [IButton],
                    template: `
    <div class="i-paginator flex align-center gap-md flex-fill">
      <!-- Page size -->
      @for (size of pageSizeOptions; track size) {
        <i-button size="sm" [disabled]="pageSize === size" (onClick)="changePageSize(size)">
          {{ size }}
        </i-button>
      }

      <span class="flex-fill"></span>
      <p>
        Page {{ pageIndex + 1 }} of {{ pageCount }} ({{ length }} row{{ length > 1 ? 's' : '' }})
      </p>

      @if (pageCount > 1) {
        <!-- Pages -->
        <div class="i-paginator-pages flex align-center gap-xs">
          @for (item of pageItems; track trackItem(item)) {
            @if (item.type === 'ellipsis') {
              <span aria-hidden="true" class="i-paginator-ellipsis">...</span>
            } @else {
              <i-button size="sm" [disabled]="item.active" (onClick)="goToPage(item.pageIndex)">
                {{ item.label }}
              </i-button>
            }
          }
        </div>
      }
    </div>
  `,
                    host: {
                        class: 'i-paginator',
                    },
                }]
        }], propDecorators: { length: [{
                type: Input
            }], pageIndex: [{
                type: Input
            }], pageSize: [{
                type: Input
            }], pageSizeOptions: [{
                type: Input
            }], onPageChange: [{
                type: Output
            }] } });

class ITruncatedTooltipDirective {
    enabled = true;
    observer;
    el = inject((ElementRef));
    ngAfterViewInit() {
        if (!this.enabled)
            return;
        const el = this.el.nativeElement;
        const check = () => {
            const truncated = el.scrollWidth > el.clientWidth;
            if (truncated) {
                el.setAttribute('title', el.textContent?.trim() ?? '');
            }
            else {
                el.removeAttribute('title');
            }
        };
        check();
        this.observer = new ResizeObserver(check);
        this.observer.observe(el);
    }
    ngOnDestroy() {
        this.observer?.disconnect();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ITruncatedTooltipDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "20.3.16", type: ITruncatedTooltipDirective, isStandalone: true, selector: "[truncatedTooltip]", inputs: { enabled: ["truncatedTooltip", "enabled", booleanAttribute] }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ITruncatedTooltipDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[truncatedTooltip]',
                    standalone: true,
                }]
        }], propDecorators: { enabled: [{
                type: Input,
                args: [{ alias: 'truncatedTooltip', transform: booleanAttribute }]
            }] } });

/* grid.ts */
/**
 * IGrid
 * Version: 1.25.0
 *
 * CHANGES (1.25.0):
 * - Standardize events to on* prefix:
 *   selectionChange       -> onSelectionChange
 *   rowClick              -> onRowClick
 *   rowExpandChange       -> onRowExpandChange
 *   expandedRowsChange    -> onExpandedRowsChange
 * - Prefer inject() instead of constructor injection
 * - Paginator event binding updated:
 *   (pageChange) -> (onPageChange)
 *
 * (Other behavior unchanged; Angular remains source of truth.)
 */
/* ----------------------------------------------------
 * DATASOURCE
 * ---------------------------------------------------- */
class IGridDataSource {
    _renderedData$ = new BehaviorSubject([]);
    _rawData = [];
    // filter internal state
    _filter = '';
    _recursive = false;
    _childrenKey = 'children';
    _sort = null;
    // pagination state
    _paginatorEnabled = true;
    _pageIndex = 0;
    _pageSize = 10;
    _pageSizeOptions = [10, 50, 100];
    // external observable data source
    _externalDataSub;
    _dataSource$;
    constructor(initialData = [], config = {}) {
        this._rawData = initialData || [];
        // filter (uses setter to normalize)
        if (config.filter !== null) {
            this.filter = config.filter;
        }
        // sort
        this._sort = this._normalizeSort(config.sort ?? null);
        // paginator
        this._applyPaginatorConfig(config.paginator);
        this._update();
    }
    /* -------- paginator config logic -------- */
    _applyPaginatorConfig(config) {
        if (config === false) {
            this._paginatorEnabled = false;
            return;
        }
        // default: enabled
        this._paginatorEnabled = true;
        if (config && typeof config === 'object') {
            this._pageIndex = config.pageIndex ?? 0;
            this._pageSizeOptions = config.pageSizeOptions ?? this._pageSizeOptions;
            this._pageSize = config.pageSize ?? this._pageSizeOptions[0];
            return;
        }
        // paginator missing => use defaults
        this._pageIndex = 0;
        this._pageSizeOptions = [10, 50, 100];
        this._pageSize = 10;
    }
    /* -------- public paginator accessors -------- */
    get paginatorEnabled() {
        return this._paginatorEnabled;
    }
    get pageIndex() {
        return this._pageIndex;
    }
    get pageSize() {
        return this._pageSize;
    }
    get pageSizeOptions() {
        return this._pageSizeOptions;
    }
    set paginator(state) {
        if (!this._paginatorEnabled || !state) {
            return;
        }
        this._pageIndex = state.pageIndex;
        this._pageSize = state.pageSize;
        this._update();
    }
    get paginator() {
        if (!this._paginatorEnabled) {
            return null;
        }
        return { pageIndex: this._pageIndex, pageSize: this._pageSize };
    }
    /* -------- data accessors -------- */
    get data() {
        return this._rawData;
    }
    set data(value) {
        this._rawData = value || [];
        this._update();
    }
    /**
     * Observable-based data source.
     * Example:
     *   this.dataSource.data$ = this.api.get<T[]>('/url');
     */
    get data$() {
        return this._dataSource$;
    }
    set data$(source) {
        // cleanup previous subscription
        this._externalDataSub?.unsubscribe();
        this._externalDataSub = undefined;
        this._dataSource$ = undefined;
        if (!source) {
            return;
        }
        this._dataSource$ = source;
        this._externalDataSub = source.subscribe((rows) => {
            this.data = rows || [];
        });
    }
    /* -------- filter & sort accessors -------- */
    /**
     * Smart filter:
     * - string: normal flat filtering
     * - { recursive: true, text, key? }: recursive tree filtering
     */
    set filter(value) {
        if (!value) {
            this._filter = '';
            this._recursive = false;
            this._childrenKey = 'children';
            this._update();
            return;
        }
        if (typeof value === 'string') {
            this._filter = value.toLowerCase().trim();
            this._recursive = false;
            this._childrenKey = 'children';
            this._update();
            return;
        }
        // object: recursive filter (tree mode)
        this._filter = (value.text ?? '').toLowerCase().trim();
        this._recursive = value.recursive === true;
        this._childrenKey = (value.key || 'children').trim() || 'children';
        this._update();
    }
    /**
     * Returns the current normalized filter text.
     * (Always plain string, lowercased & trimmed.)
     */
    get filter() {
        return this._filter;
    }
    get sort() {
        return this._sort;
    }
    set sort(value) {
        this._sort = this._normalizeSort(value);
        this._update();
    }
    get length() {
        return this._rawData.length;
    }
    // can be customized by consumer
    filterPredicate = (data, filter) => {
        if (!filter) {
            return true;
        }
        const target = JSON.stringify(data).toLowerCase();
        return target.includes(filter);
    };
    // can be customized by consumer
    sortAccessor = (data, columnId) => data?.[columnId];
    connect() {
        return this._renderedData$.asObservable();
    }
    disconnect() {
        // stop listening to any external observable
        this._externalDataSub?.unsubscribe();
        this._externalDataSub = undefined;
        this._dataSource$ = undefined;
        this._renderedData$.complete();
    }
    /* -------- internal filter helpers -------- */
    /** Basic row match using public filterPredicate */
    _rowMatchesFilter(data, filter) {
        if (!filter) {
            return true;
        }
        return this.filterPredicate(data, filter);
    }
    _filterRecursiveArray(nodes, filter) {
        const result = [];
        for (const node of nodes) {
            const pruned = this._filterRecursiveNode(node, filter);
            if (pruned !== null) {
                result.push(pruned);
            }
        }
        return result;
    }
    _filterRecursiveNode(node, filter) {
        const children = Array.isArray(node?.[this._childrenKey])
            ? node[this._childrenKey]
            : [];
        const filteredChildren = this._filterRecursiveArray(children, filter);
        const selfMatches = this._rowMatchesFilter(node, filter);
        if (!selfMatches && filteredChildren.length === 0) {
            return null;
        }
        const clone = { ...node };
        if (filteredChildren.length) {
            clone[this._childrenKey] = filteredChildren;
        }
        else {
            if (Object.prototype.hasOwnProperty.call(clone, this._childrenKey)) {
                delete clone[this._childrenKey];
            }
        }
        return clone;
    }
    _normalizeSort(sort) {
        if (!sort) {
            return null;
        }
        const arr = Array.isArray(sort) ? sort : [sort];
        const cleaned = arr.filter((s) => !!s && typeof s.active === 'string' && (s.direction === 'asc' || s.direction === 'desc'));
        return cleaned.length ? cleaned : null;
    }
    _update() {
        let data = [...this._rawData];
        // FILTER
        if (this._filter) {
            const f = this._filter;
            if (this._recursive) {
                data = this._filterRecursiveArray(data, f);
            }
            else {
                data = data.filter((row) => this.filterPredicate(row, f));
            }
        }
        // SORT (multi-column)
        if (this._sort && this._sort.length > 0) {
            const sorts = [...this._sort];
            data.sort((a, b) => {
                for (const sort of sorts) {
                    const { active, direction } = sort;
                    if (!active || !direction) {
                        continue;
                    }
                    const dir = direction === 'asc' ? 1 : -1;
                    const aValue = (this.sortAccessor(a, active) ?? null);
                    const bValue = (this.sortAccessor(b, active) ?? null);
                    if (aValue === null && bValue === null) {
                        continue;
                    }
                    if (aValue === null) {
                        return -1 * dir;
                    }
                    if (bValue === null) {
                        return 1 * dir;
                    }
                    if (aValue < bValue)
                        return -1 * dir;
                    if (aValue > bValue)
                        return 1 * dir;
                }
                return 0;
            });
        }
        // PAGINATION
        if (this._paginatorEnabled) {
            const start = this._pageIndex * this._pageSize;
            data = data.slice(start, start + this._pageSize);
        }
        this._renderedData$.next(data);
    }
}
/* ----------------------------------------------------
 * TEMPLATE DIRECTIVES (header & cell defs)
 * ---------------------------------------------------- */
class IGridHeaderCellDefDirective {
    template = inject((TemplateRef));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IGridHeaderCellDefDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.16", type: IGridHeaderCellDefDirective, isStandalone: true, selector: "[iHeaderCellDef]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IGridHeaderCellDefDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[iHeaderCellDef]',
                    standalone: true,
                }]
        }] });
class IGridCellDefDirective {
    template = inject((TemplateRef));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IGridCellDefDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.16", type: IGridCellDefDirective, isStandalone: true, selector: "[iCellDef]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IGridCellDefDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[iCellDef]',
                    standalone: true,
                }]
        }] });
/* ----------------------------------------------------
 * EXPANDABLE ROW DEF
 * ---------------------------------------------------- */
class IGridRowDefDirective {
    iRowDefExpandSingle = false;
    template = inject((TemplateRef));
    vcr = inject(ViewContainerRef);
    ngOnInit() {
        this.vcr.clear();
    }
    static ngTemplateContextGuard(_dir, _ctx) {
        return true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IGridRowDefDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.16", type: IGridRowDefDirective, isStandalone: true, selector: "[iRowDef]", inputs: { iRowDefExpandSingle: "iRowDefExpandSingle" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IGridRowDefDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[iRowDef]',
                    standalone: true,
                }]
        }], propDecorators: { iRowDefExpandSingle: [{
                type: Input
            }] } });
class IGridExpandableRow {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IGridExpandableRow, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: IGridExpandableRow, isStandalone: true, selector: "i-grid-expandable-row", host: { attributes: { "role": "row" }, classAttribute: "i-grid-expandable-row flex" }, ngImport: i0, template: `<ng-content />`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IGridExpandableRow, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-grid-expandable-row',
                    standalone: true,
                    template: `<ng-content />`,
                    host: {
                        class: 'i-grid-expandable-row flex',
                        role: 'row',
                    },
                }]
        }] });
/* ----------------------------------------------------
 * ROW DIRECTIVES
 * ---------------------------------------------------- */
class IGridHeaderRowDirective {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IGridHeaderRowDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.16", type: IGridHeaderRowDirective, isStandalone: true, selector: "i-grid-header-row", host: { attributes: { "role": "row" }, classAttribute: "i-grid-header-row" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IGridHeaderRowDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'i-grid-header-row',
                    standalone: true,
                    host: {
                        class: 'i-grid-header-row',
                        role: 'row',
                    },
                }]
        }] });
class IGridRowDirective {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IGridRowDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.16", type: IGridRowDirective, isStandalone: true, selector: "i-grid-row", host: { attributes: { "role": "row" }, classAttribute: "i-grid-row" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IGridRowDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'i-grid-row',
                    standalone: true,
                    host: {
                        class: 'i-grid-row',
                        role: 'row',
                    },
                }]
        }] });
/* ----------------------------------------------------
 * HEADER GROUP TAGS (internal render tags)
 * ---------------------------------------------------- */
class IGridHeaderCellGroup {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IGridHeaderCellGroup, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: IGridHeaderCellGroup, isStandalone: true, selector: "i-grid-header-cell-group", host: { attributes: { "role": "presentation" }, classAttribute: "i-grid-header-cell-group" }, ngImport: i0, template: `<ng-content />`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IGridHeaderCellGroup, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-grid-header-cell-group',
                    standalone: true,
                    template: `<ng-content />`,
                    host: {
                        class: 'i-grid-header-cell-group',
                        role: 'presentation',
                    },
                }]
        }] });
class IGridHeaderCellGroupColumns {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IGridHeaderCellGroupColumns, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: IGridHeaderCellGroupColumns, isStandalone: true, selector: "i-grid-header-cell-group-columns", host: { attributes: { "role": "presentation" }, classAttribute: "i-grid-header-cell-group-columns" }, ngImport: i0, template: `<ng-content />`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IGridHeaderCellGroupColumns, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-grid-header-cell-group-columns',
                    standalone: true,
                    template: `<ng-content />`,
                    host: {
                        class: 'i-grid-header-cell-group-columns',
                        role: 'presentation',
                    },
                }]
        }] });
/* ----------------------------------------------------
 * COLUMN (i-grid-column) – data-backed only
 * ---------------------------------------------------- */
class IGridColumn {
    fieldName;
    title = '';
    sortable = true;
    resizable = true;
    width;
    freeze = false;
    headerDef;
    cellDef;
    isAuto;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IGridColumn, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: IGridColumn, isStandalone: true, selector: "i-grid-column", inputs: { fieldName: "fieldName", title: "title", sortable: "sortable", resizable: "resizable", width: "width", freeze: ["freeze", "freeze", booleanAttribute] }, queries: [{ propertyName: "headerDef", first: true, predicate: IGridHeaderCellDefDirective, descendants: true, read: TemplateRef }, { propertyName: "cellDef", first: true, predicate: IGridCellDefDirective, descendants: true, read: TemplateRef }], ngImport: i0, template: '', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IGridColumn, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-grid-column',
                    standalone: true,
                    template: '',
                }]
        }], propDecorators: { fieldName: [{
                type: Input,
                args: [{ required: true }]
            }], title: [{
                type: Input
            }], sortable: [{
                type: Input
            }], resizable: [{
                type: Input
            }], width: [{
                type: Input
            }], freeze: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], headerDef: [{
                type: ContentChild,
                args: [IGridHeaderCellDefDirective, { read: TemplateRef }]
            }], cellDef: [{
                type: ContentChild,
                args: [IGridCellDefDirective, { read: TemplateRef }]
            }] } });
/* ----------------------------------------------------
 * CUSTOM COLUMN (i-grid-custom-column) – not bound to datasource
 * ---------------------------------------------------- */
class IGridCustomColumn {
    title = '';
    sortable = false;
    resizable = true;
    width;
    freeze = false;
    fieldName;
    headerDef;
    cellDef;
    isAuto;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IGridCustomColumn, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.16", type: IGridCustomColumn, isStandalone: true, selector: "i-grid-custom-column", inputs: { title: "title", sortable: "sortable", resizable: "resizable", width: "width", freeze: ["freeze", "freeze", booleanAttribute] }, queries: [{ propertyName: "headerDef", first: true, predicate: IGridHeaderCellDefDirective, descendants: true, read: TemplateRef }, { propertyName: "cellDef", first: true, predicate: IGridCellDefDirective, descendants: true, read: TemplateRef }], ngImport: i0, template: '', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IGridCustomColumn, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-grid-custom-column',
                    standalone: true,
                    template: '',
                }]
        }], propDecorators: { title: [{
                type: Input
            }], sortable: [{
                type: Input
            }], resizable: [{
                type: Input
            }], width: [{
                type: Input
            }], freeze: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], headerDef: [{
                type: ContentChild,
                args: [IGridHeaderCellDefDirective, { read: TemplateRef }]
            }], cellDef: [{
                type: ContentChild,
                args: [IGridCellDefDirective, { read: TemplateRef }]
            }] } });
/* ----------------------------------------------------
 * COLUMN GROUP (public consumer API)
 * ---------------------------------------------------- */
class IGridColumnGroup {
    title = '';
    columns;
    customColumns;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IGridColumnGroup, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: IGridColumnGroup, isStandalone: true, selector: "i-grid-column-group", inputs: { title: "title" }, queries: [{ propertyName: "columns", predicate: IGridColumn }, { propertyName: "customColumns", predicate: IGridCustomColumn }], ngImport: i0, template: '', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IGridColumnGroup, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-grid-column-group',
                    standalone: true,
                    template: '',
                }]
        }], propDecorators: { title: [{
                type: Input
            }], columns: [{
                type: ContentChildren,
                args: [IGridColumn]
            }], customColumns: [{
                type: ContentChildren,
                args: [IGridCustomColumn]
            }] } });
/* ----------------------------------------------------
 * DATA CELL (used in body)
 * ---------------------------------------------------- */
class IGridCell {
    column;
    fixedWidth;
    hostDataColumn = inject((IGridColumn), { optional: true, host: true });
    hostCustomColumn = inject((IGridCustomColumn), {
        optional: true,
        host: true,
    });
    grid = inject(forwardRef(() => IGrid), {
        optional: true,
    });
    get _column() {
        return this.column ?? this.hostDataColumn ?? this.hostCustomColumn ?? null;
    }
    get flex() {
        if (typeof this.fixedWidth === 'number') {
            return `0 0 ${this.fixedWidth}px`;
        }
        const col = this._column;
        if (!this.grid || !col) {
            return '1 1 0';
        }
        return this.grid.getColumnFlex(col);
    }
    get _isFrozen() {
        return !!this.grid && !!this._column && this.grid.isColumnFrozen(this._column);
    }
    get frozenClass() {
        return this._isFrozen;
    }
    get stickyPosition() {
        return this._isFrozen ? 'sticky' : null;
    }
    get stickyLeft() {
        if (!this._isFrozen || !this.grid || !this._column) {
            return null;
        }
        return this.grid.getColumnStickyLeft(this._column);
    }
    get stickyZ() {
        return this._isFrozen ? 2 : null;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IGridCell, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: IGridCell, isStandalone: true, selector: "i-grid-cell", inputs: { column: "column", fixedWidth: "fixedWidth" }, host: { attributes: { "role": "cell" }, properties: { "style.flex": "this.flex", "class.i-grid-cell--frozen": "this.frozenClass", "style.position": "this.stickyPosition", "style.left.px": "this.stickyLeft", "style.zIndex": "this.stickyZ" }, classAttribute: "i-grid-cell" }, ngImport: i0, template: ` <ng-content /> `, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IGridCell, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-grid-cell',
                    standalone: true,
                    host: {
                        class: 'i-grid-cell',
                        role: 'cell',
                    },
                    template: ` <ng-content /> `,
                }]
        }], propDecorators: { column: [{
                type: Input
            }], fixedWidth: [{
                type: Input
            }], flex: [{
                type: HostBinding,
                args: ['style.flex']
            }], frozenClass: [{
                type: HostBinding,
                args: ['class.i-grid-cell--frozen']
            }], stickyPosition: [{
                type: HostBinding,
                args: ['style.position']
            }], stickyLeft: [{
                type: HostBinding,
                args: ['style.left.px']
            }], stickyZ: [{
                type: HostBinding,
                args: ['style.zIndex']
            }] } });
/* ----------------------------------------------------
 * HEADER CELL (sorting + resize handle + frozen)
 * ---------------------------------------------------- */
class IGridHeaderCell {
    column;
    fixedWidth;
    _isResizing = false;
    _startX = 0;
    _startWidth = 0;
    _minWidth = 50;
    el = inject(ElementRef);
    grid = inject(forwardRef(() => IGrid), {
        optional: true,
    });
    hostDataColumn = inject((IGridColumn), { optional: true, host: true });
    hostCustomColumn = inject((IGridCustomColumn), {
        optional: true,
        host: true,
    });
    get _column() {
        return this.column ?? this.hostDataColumn ?? this.hostCustomColumn ?? null;
    }
    get _columnId() {
        const col = this._column;
        return col?.fieldName ?? null;
    }
    get _direction() {
        if (!this.grid || !this._columnId) {
            return '';
        }
        return this.grid.getColumnDirection(this._columnId);
    }
    get _sortableFlag() {
        const col = this._column;
        if (!col) {
            return false;
        }
        return col.sortable !== false && !!col.fieldName;
    }
    get resizable() {
        const col = this._column;
        if (!col) {
            return false;
        }
        return col.resizable !== false;
    }
    get flex() {
        if (typeof this.fixedWidth === 'number') {
            return `0 0 ${this.fixedWidth}px`;
        }
        const col = this._column;
        if (!this.grid || !col) {
            return '1 1 0';
        }
        return this.grid.getColumnFlex(col);
    }
    get sortable() {
        return !!this.grid && !!this._columnId && this._sortableFlag;
    }
    get isSorted() {
        return this._direction !== '';
    }
    get isSortedAsc() {
        return this._direction === 'asc';
    }
    get isSortedDesc() {
        return this._direction === 'desc';
    }
    get isResizableClass() {
        return this.resizable;
    }
    get showIcon() {
        return this.sortable && this._direction !== '';
    }
    get iconName() {
        return this._direction === 'asc' ? 'sort-asc' : 'sort-dsc';
    }
    get _isFrozen() {
        return !!this.grid && !!this._column && this.grid.isColumnFrozen(this._column);
    }
    get frozenClass() {
        return this._isFrozen;
    }
    get stickyPosition() {
        return this._isFrozen ? 'sticky' : null;
    }
    get stickyLeft() {
        if (!this._isFrozen || !this.grid || !this._column) {
            return null;
        }
        return this.grid.getColumnStickyLeft(this._column);
    }
    get stickyZ() {
        if (!this._isFrozen || !this.grid || !this._column) {
            return null;
        }
        return this.grid.getFrozenColumnZ(this._column);
    }
    onClick() {
        if (this._isResizing) {
            return;
        }
        const col = this._column;
        if (!this.grid || !this._sortableFlag || !col) {
            return;
        }
        this.grid.sort(col);
    }
    onResizeMouseDown(event) {
        const col = this._column;
        if (!this.grid || !col || !this.resizable) {
            return;
        }
        event.stopPropagation();
        event.preventDefault();
        this._isResizing = true;
        this._startX = event.clientX;
        const currentWidth = this.grid.getColumnWidth(col) ?? this.el.nativeElement.offsetWidth;
        this._startWidth = currentWidth;
    }
    onDocumentMouseMove(event) {
        const col = this._column;
        if (!this._isResizing || !this.grid || !col) {
            return;
        }
        const delta = event.clientX - this._startX;
        let newWidth = this._startWidth + delta;
        if (newWidth < this._minWidth) {
            newWidth = this._minWidth;
        }
        this.grid.setColumnWidth(col, newWidth);
    }
    onDocumentMouseUp() {
        if (!this._isResizing) {
            return;
        }
        setTimeout(() => {
            this._isResizing = false;
        }, 0);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IGridHeaderCell, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.16", type: IGridHeaderCell, isStandalone: true, selector: "i-grid-header-cell", inputs: { column: "column", fixedWidth: "fixedWidth" }, host: { attributes: { "role": "columnheader" }, listeners: { "click": "onClick()", "document:mousemove": "onDocumentMouseMove($event)", "document:mouseup": "onDocumentMouseUp()" }, properties: { "style.flex": "this.flex", "class.i-grid-header-cell--sortable": "this.sortable", "class.i-grid-header-cell--sorted": "this.isSorted", "class.i-grid-header-cell--sorted-asc": "this.isSortedAsc", "class.i-grid-header-cell--sorted-desc": "this.isSortedDesc", "class.i-grid-header-cell--resizable": "this.isResizableClass", "class.i-grid-header-cell--frozen": "this.frozenClass", "style.position": "this.stickyPosition", "style.left.px": "this.stickyLeft", "style.zIndex": "this.stickyZ" }, classAttribute: "i-grid-header-cell" }, ngImport: i0, template: `
    <span class="i-grid-header-cell__content" truncatedTooltip>
      <ng-content />
    </span>

    @if (showIcon) {
      <span class="i-grid-header-cell__icon">
        <i-icon size="sm" [icon]="iconName" />
      </span>
    }

    <span class="i-grid-header-cell__resize-handle" (mousedown)="onResizeMouseDown($event)"> </span>
  `, isInline: true, dependencies: [{ kind: "component", type: IIcon, selector: "i-icon", inputs: ["icon", "size"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IGridHeaderCell, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-grid-header-cell',
                    standalone: true,
                    imports: [IIcon],
                    template: `
    <span class="i-grid-header-cell__content" truncatedTooltip>
      <ng-content />
    </span>

    @if (showIcon) {
      <span class="i-grid-header-cell__icon">
        <i-icon size="sm" [icon]="iconName" />
      </span>
    }

    <span class="i-grid-header-cell__resize-handle" (mousedown)="onResizeMouseDown($event)"> </span>
  `,
                    host: {
                        class: 'i-grid-header-cell',
                        role: 'columnheader',
                    },
                }]
        }], propDecorators: { column: [{
                type: Input
            }], fixedWidth: [{
                type: Input
            }], flex: [{
                type: HostBinding,
                args: ['style.flex']
            }], sortable: [{
                type: HostBinding,
                args: ['class.i-grid-header-cell--sortable']
            }], isSorted: [{
                type: HostBinding,
                args: ['class.i-grid-header-cell--sorted']
            }], isSortedAsc: [{
                type: HostBinding,
                args: ['class.i-grid-header-cell--sorted-asc']
            }], isSortedDesc: [{
                type: HostBinding,
                args: ['class.i-grid-header-cell--sorted-desc']
            }], isResizableClass: [{
                type: HostBinding,
                args: ['class.i-grid-header-cell--resizable']
            }], frozenClass: [{
                type: HostBinding,
                args: ['class.i-grid-header-cell--frozen']
            }], stickyPosition: [{
                type: HostBinding,
                args: ['style.position']
            }], stickyLeft: [{
                type: HostBinding,
                args: ['style.left.px']
            }], stickyZ: [{
                type: HostBinding,
                args: ['style.zIndex']
            }], onClick: [{
                type: HostListener,
                args: ['click']
            }], onDocumentMouseMove: [{
                type: HostListener,
                args: ['document:mousemove', ['$event']]
            }], onDocumentMouseUp: [{
                type: HostListener,
                args: ['document:mouseup']
            }] } });
class IGridViewport {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IGridViewport, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: IGridViewport, isStandalone: true, selector: "i-grid-viewport", host: { classAttribute: "i-grid-viewport" }, ngImport: i0, template: `<ng-content />`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IGridViewport, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-grid-viewport',
                    standalone: true,
                    template: `<ng-content />`,
                    host: {
                        class: 'i-grid-viewport',
                    },
                }]
        }] });
/* ----------------------------------------------------
 * GRID COMPONENT
 * ---------------------------------------------------- */
class IGrid {
    dataSource;
    /** Row selection mode */
    selectionMode = false;
    /** Tree mode */
    tree = null;
    /** Indent per tree level (px) */
    treeIndent = 16;
    /**
     * Tree host column (fieldName).
     * - If set, tree UI (indent/toggle/checkbox) is rendered inside that column.
     * - If not set, uses first column that has fieldName.
     */
    treeColumn;
    /** Initial auto-expand level for tree mode (1-based) */
    treeInitialExpandLevel = null;
    /** Show auto number column (disabled by default in tree) */
    showNumberColumn = true;
    get showNumberColumnEffective() {
        if (this.treeEnabled) {
            return false;
        }
        return this.showNumberColumn;
    }
    /** Emits whenever selection changes */
    onSelectionChange = new EventEmitter();
    /** Emits on row click (before selection logic) */
    onRowClick = new EventEmitter();
    /** Expand events */
    onRowExpandChange = new EventEmitter();
    onExpandedRowsChange = new EventEmitter();
    columnDefs;
    customColumnDefs;
    columnGroupDefs;
    expandableRowDef;
    get hasExpandableRow() {
        return !!this.expandableRowDef?.template;
    }
    columns = [];
    headerItems = [];
    renderedData = [];
    currentFilterText = '';
    sortStates = [];
    _columnWidths = new Map();
    _dataSub;
    _selection = new Set();
    _expanded = new Set();
    _id = Math.random().toString(36).slice(2);
    _defaultColumnWidth = 200;
    selectionColumnWidth = 32;
    numberColumnWidth = 60;
    expandColumnWidth = 32;
    _numberColumnInternal;
    _treeMeta = new Map();
    _treeRoots = [];
    get numberColumn() {
        if (!this._numberColumnInternal) {
            this._numberColumnInternal = {
                fieldName: undefined,
                title: 'No.',
                sortable: false,
                resizable: true,
                width: this.numberColumnWidth,
                freeze: false,
                headerDef: undefined,
                cellDef: undefined,
                isAuto: false,
            };
        }
        return this._numberColumnInternal;
    }
    /* ----------------------------------------------------
     * EXPANDABLE ROW API
     * ---------------------------------------------------- */
    expandRow(row) {
        this._setExpanded(row, true);
    }
    collapseRow(row) {
        this._setExpanded(row, false);
    }
    toggleRowExpanded(row) {
        this._setExpanded(row, !this.isRowExpanded(row));
    }
    isRowExpanded(row) {
        return this._expanded.has(row);
    }
    getExpandedRows() {
        return Array.from(this._expanded);
    }
    expandAll() {
        if (!this.hasExpandableRow) {
            return;
        }
        const expandSingle = !!this.expandableRowDef?.iRowDefExpandSingle;
        if (expandSingle) {
            const first = this.renderedData[0];
            const prev = Array.from(this._expanded);
            this._expanded.clear();
            prev.forEach((r) => this.onRowExpandChange.emit({ row: r, expanded: false }));
            if (first) {
                this._expanded.add(first);
                this.onRowExpandChange.emit({ row: first, expanded: true });
            }
            this.onExpandedRowsChange.emit(this.getExpandedRows());
            return;
        }
        const before = new Set(this._expanded);
        for (const row of this.renderedData) {
            this._expanded.add(row);
        }
        for (const row of this.renderedData) {
            if (!before.has(row)) {
                this.onRowExpandChange.emit({ row, expanded: true });
            }
        }
        this.onExpandedRowsChange.emit(this.getExpandedRows());
    }
    collapseAll() {
        if (!this.hasExpandableRow) {
            return;
        }
        const prev = Array.from(this._expanded);
        this._expanded.clear();
        prev.forEach((row) => this.onRowExpandChange.emit({ row, expanded: false }));
        this.onExpandedRowsChange.emit(this.getExpandedRows());
    }
    get allVisibleExpanded() {
        if (!this.hasExpandableRow || !this.renderedData.length) {
            return false;
        }
        return this.renderedData.every((row) => this._expanded.has(row));
    }
    onToggleAllExpanded() {
        if (!this.hasExpandableRow) {
            return;
        }
        const shouldExpand = !this.allVisibleExpanded;
        if (shouldExpand) {
            this.expandAll();
        }
        else {
            this.collapseAll();
        }
    }
    onExpandToggle(row, event) {
        event?.stopPropagation();
        this.toggleRowExpanded(row);
    }
    _setExpanded(row, expanded) {
        if (!this.hasExpandableRow) {
            return;
        }
        const all = this._getAllDataRows();
        if (all.length) {
            const valid = new Set(all);
            if (!valid.has(row)) {
                return;
            }
        }
        const expandSingle = !!this.expandableRowDef?.iRowDefExpandSingle;
        const wasExpanded = this._expanded.has(row);
        if (expanded === wasExpanded) {
            return;
        }
        if (expanded) {
            if (expandSingle) {
                const prev = Array.from(this._expanded).filter((r) => r !== row);
                this._expanded.clear();
                prev.forEach((r) => this.onRowExpandChange.emit({ row: r, expanded: false }));
            }
            this._expanded.add(row);
            this.onRowExpandChange.emit({ row, expanded: true });
        }
        else {
            this._expanded.delete(row);
            this.onRowExpandChange.emit({ row, expanded: false });
        }
        this.onExpandedRowsChange.emit(this.getExpandedRows());
    }
    /* ------- TREE helpers (config) ------- */
    get treeEnabled() {
        return this.tree !== null && this.tree !== false;
    }
    get treeChildrenKey() {
        if (!this.treeEnabled) {
            return 'children';
        }
        if (this.tree === true) {
            return 'children';
        }
        if (typeof this.tree === 'string') {
            const t = this.tree.trim();
            if (!t || t === 'true') {
                return 'children';
            }
            return t;
        }
        return 'children';
    }
    _getInitialExpandLevelInternal() {
        if (!this.treeEnabled) {
            return null;
        }
        if (this.treeInitialExpandLevel === null) {
            return null;
        }
        const n = Number(this.treeInitialExpandLevel);
        if (!Number.isFinite(n) || n <= 0) {
            return null;
        }
        return n - 1;
    }
    _shouldRowStartExpanded(level, hasChildren) {
        if (!hasChildren) {
            return false;
        }
        const max = this._getInitialExpandLevelInternal();
        if (max === null) {
            return false;
        }
        return level <= max;
    }
    _getTreeChildren(row) {
        if (!this.treeEnabled || !row) {
            return [];
        }
        const anyRow = row;
        const value = anyRow?.[this.treeChildrenKey];
        return Array.isArray(value) ? value : [];
    }
    _getTreeDescendants(row) {
        const result = [];
        const visit = (r) => {
            const children = this._getTreeChildren(r);
            for (const child of children) {
                result.push(child);
                visit(child);
            }
        };
        visit(row);
        return result;
    }
    _buildTreeMeta(data) {
        this._treeMeta.clear();
        this._treeRoots = [];
        if (!Array.isArray(data)) {
            return;
        }
        const visit = (row, level, parent) => {
            const children = this._getTreeChildren(row);
            const hasChildren = children.length > 0;
            const expanded = this._shouldRowStartExpanded(level, hasChildren);
            if (parent === null) {
                this._treeRoots.push(row);
            }
            this._treeMeta.set(row, { level, parent, hasChildren, expanded });
            children.forEach((child) => visit(child, level + 1, row));
        };
        data.forEach((root) => visit(root, 0, null));
    }
    _rebuildTreeRendered() {
        if (!this.treeEnabled) {
            return;
        }
        const result = [];
        const appendVisible = (row) => {
            result.push(row);
            const meta = this._treeMeta.get(row);
            if (!meta?.expanded) {
                return;
            }
            const children = this._getTreeChildren(row);
            for (const child of children) {
                appendVisible(child);
            }
        };
        for (const root of this._treeRoots) {
            appendVisible(root);
        }
        this.renderedData = result;
        this._reconcileSelectionWithData();
        this._reconcileExpandedWithData();
        this._updateCurrentFilterText();
    }
    getRowLevel(row) {
        if (!this.treeEnabled) {
            return 0;
        }
        return this._treeMeta.get(row)?.level ?? 0;
    }
    getTreeIndentPx(row) {
        return this.getRowLevel(row) * this.treeIndent;
    }
    hasChildren(row) {
        if (!this.treeEnabled) {
            return false;
        }
        return this._treeMeta.get(row)?.hasChildren ?? false;
    }
    isExpanded(row) {
        if (!this.treeEnabled) {
            return false;
        }
        return this._treeMeta.get(row)?.expanded ?? false;
    }
    get allTreeExpanded() {
        if (!this.treeEnabled || !this._treeRoots.length) {
            return false;
        }
        for (const meta of this._treeMeta.values()) {
            if (meta.hasChildren && !meta.expanded) {
                return false;
            }
        }
        return true;
    }
    get anyTreeExpanded() {
        if (!this.treeEnabled || !this._treeRoots.length) {
            return false;
        }
        return this._treeRoots.some((r) => {
            const meta = this._treeMeta.get(r);
            return !!meta?.hasChildren && !!meta?.expanded;
        });
    }
    onToggleAllTree() {
        if (!this.treeEnabled) {
            return;
        }
        const shouldExpand = !this.allTreeExpanded;
        this._treeMeta.forEach((meta) => {
            if (meta.hasChildren) {
                meta.expanded = shouldExpand;
            }
        });
        this._rebuildTreeRendered();
    }
    toggleRow(row) {
        if (!this.treeEnabled) {
            return;
        }
        const meta = this._treeMeta.get(row);
        if (!meta || !meta.hasChildren) {
            return;
        }
        meta.expanded = !meta.expanded;
        this._rebuildTreeRendered();
    }
    onTreeToggle(row, event) {
        event?.stopPropagation();
        this.toggleRow(row);
    }
    /* ------- tree host column ------- */
    _getTreeHostFieldName() {
        const wanted = (this.treeColumn ?? '').trim();
        if (wanted) {
            const match = this.columns.find((c) => !!c.fieldName && c.fieldName === wanted);
            if (match?.fieldName) {
                return match.fieldName;
            }
        }
        const firstData = this.columns.find((c) => !!c.fieldName);
        return firstData?.fieldName ?? null;
    }
    isTreeHostColumn(col) {
        if (!this.treeEnabled) {
            return false;
        }
        const host = this._getTreeHostFieldName();
        if (!host) {
            return false;
        }
        return !!col.fieldName && col.fieldName === host;
    }
    /* ------- selection helpers ------- */
    isRowSelected(row) {
        return this._selection.has(row);
    }
    getRowChecked(row) {
        if (!this.treeEnabled) {
            return this.isRowSelected(row);
        }
        const descendants = this._getTreeDescendants(row);
        if (!descendants.length) {
            return this.isRowSelected(row);
        }
        const total = descendants.length;
        const selectedChildren = descendants.filter((child) => this._selection.has(child)).length;
        const allChildrenSelected = total > 0 && selectedChildren === total;
        const anyChildrenSelected = selectedChildren > 0;
        if (allChildrenSelected && this._selection.has(row)) {
            return true;
        }
        if (anyChildrenSelected && !allChildrenSelected) {
            return false;
        }
        return this._selection.has(row);
    }
    getRowIndeterminate(row) {
        if (!this.treeEnabled) {
            return false;
        }
        const descendants = this._getTreeDescendants(row);
        if (!descendants.length) {
            return false;
        }
        const total = descendants.length;
        const selectedChildren = descendants.filter((child) => this._selection.has(child)).length;
        const allChildrenSelected = total > 0 && selectedChildren === total;
        const anyChildrenSelected = selectedChildren > 0;
        return anyChildrenSelected && !allChildrenSelected;
    }
    get selectedRows() {
        return Array.from(this._selection);
    }
    get allVisibleSelected() {
        if (!this.selectionMode || !this.renderedData.length) {
            return false;
        }
        return this.renderedData.every((row) => this.getRowChecked(row));
    }
    get someVisibleSelected() {
        if (!this.selectionMode || !this.renderedData.length) {
            return false;
        }
        const anySelected = this.renderedData.some((row) => this.getRowChecked(row) || this.getRowIndeterminate(row));
        return anySelected && !this.allVisibleSelected;
    }
    _emitSelectionChange(lastChanged) {
        if (!this.selectionMode) {
            return;
        }
        this.onSelectionChange.emit({ selected: this.selectedRows, lastChanged });
    }
    _selectSingle(row) {
        this._selection.clear();
        this._selection.add(row);
        this._emitSelectionChange(row);
    }
    _toggleMultiple(row) {
        if (this._selection.has(row)) {
            this._selection.delete(row);
        }
        else {
            this._selection.add(row);
        }
        this._emitSelectionChange(row);
    }
    _setBranchSelection(row, selected) {
        if (!this.treeEnabled) {
            if (selected) {
                this._selection.add(row);
            }
            else {
                this._selection.delete(row);
            }
            return;
        }
        const allRows = [row, ...this._getTreeDescendants(row)];
        if (selected) {
            allRows.forEach((r) => this._selection.add(r));
        }
        else {
            allRows.forEach((r) => this._selection.delete(r));
        }
    }
    _syncSelectionUpwardsFrom(row) {
        if (!this.treeEnabled) {
            return;
        }
        let current = this._treeMeta.get(row)?.parent ?? null;
        while (current) {
            const descendants = this._getTreeDescendants(current);
            if (!descendants.length) {
                current = this._treeMeta.get(current)?.parent ?? null;
                continue;
            }
            const total = descendants.length;
            const selectedChildren = descendants.filter((child) => this._selection.has(child)).length;
            if (selectedChildren === 0) {
                this._selection.delete(current);
            }
            else if (selectedChildren === total) {
                this._selection.add(current);
            }
            else {
                this._selection.delete(current);
            }
            current = this._treeMeta.get(current)?.parent ?? null;
        }
    }
    onRowSelectionToggle(row) {
        if (!this.selectionMode) {
            return;
        }
        if (this.selectionMode === 'single') {
            this._selectSingle(row);
            return;
        }
        if (this.treeEnabled) {
            const hasChild = this.hasChildren(row);
            if (hasChild) {
                const currentlyChecked = this.getRowChecked(row);
                this._setBranchSelection(row, !currentlyChecked);
            }
            else {
                if (this._selection.has(row)) {
                    this._selection.delete(row);
                }
                else {
                    this._selection.add(row);
                }
            }
            this._syncSelectionUpwardsFrom(row);
            this._emitSelectionChange(row);
        }
        else {
            this._toggleMultiple(row);
        }
    }
    onToggleAllVisible() {
        if (this.selectionMode !== 'multiple') {
            return;
        }
        const shouldSelect = !this.allVisibleSelected;
        if (this.treeEnabled) {
            const roots = [...this._treeRoots];
            roots.forEach((row) => {
                this._setBranchSelection(row, shouldSelect);
                this._syncSelectionUpwardsFrom(row);
            });
        }
        else {
            if (shouldSelect) {
                this.renderedData.forEach((row) => this._selection.add(row));
            }
            else {
                this.renderedData.forEach((row) => this._selection.delete(row));
            }
        }
        this._emitSelectionChange(null);
    }
    clearSelection() {
        this._selection.clear();
        this._emitSelectionChange(null);
    }
    _reconcileSelectionWithData() {
        if (!this.selectionMode) {
            return;
        }
        const all = this._getAllDataRows();
        if (!all.length) {
            if (this._selection.size) {
                this._selection.clear();
                this._emitSelectionChange(null);
            }
            return;
        }
        const validSet = new Set(all);
        const newSelection = new Set();
        this._selection.forEach((row) => {
            if (validSet.has(row)) {
                newSelection.add(row);
            }
        });
        if (newSelection.size !== this._selection.size) {
            this._selection = newSelection;
            this._emitSelectionChange(null);
        }
    }
    _reconcileExpandedWithData() {
        if (!this.hasExpandableRow) {
            return;
        }
        const all = this._getAllDataRows();
        if (!all.length) {
            if (this._expanded.size) {
                const prev = Array.from(this._expanded);
                this._expanded.clear();
                prev.forEach((r) => this.onRowExpandChange.emit({ row: r, expanded: false }));
                this.onExpandedRowsChange.emit(this.getExpandedRows());
            }
            return;
        }
        const validSet = new Set(all);
        const prev = new Set(this._expanded);
        const next = new Set();
        this._expanded.forEach((row) => {
            if (validSet.has(row)) {
                next.add(row);
            }
        });
        prev.forEach((row) => {
            if (!next.has(row)) {
                this.onRowExpandChange.emit({ row, expanded: false });
            }
        });
        if (next.size !== this._expanded.size) {
            this._expanded = next;
            this.onExpandedRowsChange.emit(this.getExpandedRows());
        }
    }
    _getAllDataRows() {
        if (this.treeEnabled && this._treeRoots.length) {
            const result = [];
            const visit = (row) => {
                result.push(row);
                this._getTreeChildren(row).forEach(visit);
            };
            this._treeRoots.forEach(visit);
            return result;
        }
        if (this.dataSource instanceof IGridDataSource) {
            return this.dataSource.data;
        }
        if (Array.isArray(this.dataSource)) {
            return this.dataSource;
        }
        return [];
    }
    /* ------- multi sort helpers ------- */
    getColumnDirection(columnId) {
        const found = this.sortStates.find((s) => s.active === columnId);
        return found ? found.direction : '';
    }
    sort(column) {
        if (!(this.dataSource instanceof IGridDataSource)) {
            return;
        }
        const columnId = column.fieldName;
        if (!columnId) {
            return;
        }
        const index = this.sortStates.findIndex((s) => s.active === columnId);
        if (index === -1) {
            this.sortStates.push({ active: columnId, direction: 'asc' });
        }
        else {
            const current = this.sortStates[index];
            if (current.direction === 'asc') {
                current.direction = 'desc';
            }
            else if (current.direction === 'desc') {
                this.sortStates.splice(index, 1);
            }
            else {
                current.direction = 'asc';
            }
        }
        this._applySortToDataSource();
    }
    _applySortToDataSource() {
        if (!(this.dataSource instanceof IGridDataSource)) {
            return;
        }
        if (!this.sortStates.length) {
            this.dataSource.sort = null;
            return;
        }
        this.dataSource.sort = this.sortStates.map((s) => ({
            active: s.active,
            direction: s.direction,
        }));
    }
    /* ------- column width / flex API ------- */
    getColumnWidth(column) {
        const override = this._columnWidths.get(column);
        if (typeof override === 'number') {
            return override;
        }
        if (typeof column.width === 'number') {
            return column.width;
        }
        if (column.width === 'fill') {
            return null;
        }
        return this._defaultColumnWidth;
    }
    getColumnFlex(column) {
        const px = this.getColumnWidth(column);
        if (px !== null) {
            return `0 0 ${px}px`;
        }
        return '1 1 0';
    }
    setColumnWidth(column, width) {
        if (!column) {
            return;
        }
        this._columnWidths.set(column, width);
    }
    /* ------- frozen column helpers ------- */
    _getFrozenEndIndex() {
        for (let i = this.columns.length - 1; i >= 0; i--) {
            if (this.columns[i].freeze) {
                return i;
            }
        }
        return -1;
    }
    get hasFrozenColumns() {
        return this._getFrozenEndIndex() >= 0;
    }
    isColumnFrozen(column) {
        const endIndex = this._getFrozenEndIndex();
        if (endIndex < 0) {
            return false;
        }
        const idx = this.columns.indexOf(column);
        if (idx === -1) {
            return false;
        }
        return idx <= endIndex;
    }
    getColumnStickyLeft(column) {
        if (!this.isColumnFrozen(column)) {
            return null;
        }
        const endIndex = this._getFrozenEndIndex();
        if (endIndex < 0) {
            return null;
        }
        const idx = this.columns.indexOf(column);
        if (idx === -1 || idx > endIndex) {
            return null;
        }
        let left = 0;
        left += this._getSpecialColumnsLeftOffset();
        for (let i = 0; i < idx; i++) {
            const col = this.columns[i];
            if (!this.isColumnFrozen(col)) {
                continue;
            }
            const w = this.getColumnWidth(col);
            if (w === null) {
                return null;
            }
            left += w;
        }
        return left;
    }
    _getSpecialColumnsLeftOffset(options) {
        const includeNumber = options?.includeNumber ?? true;
        const includeExpand = options?.includeExpand ?? true;
        const includeSelection = options?.includeSelection ?? true;
        let left = 0;
        // IMPORTANT: tree mode has NO special tree/selection columns.
        if (!this.treeEnabled) {
            if (includeSelection && !!this.selectionMode) {
                left += this.selectionColumnWidth;
            }
            if (includeExpand && this.hasExpandableRow) {
                left += this.expandColumnWidth;
            }
        }
        if (includeNumber && this.showNumberColumnEffective) {
            const width = this.getColumnWidth(this.numberColumn);
            if (width !== null) {
                left += width;
            }
        }
        return left;
    }
    getStickyLeftForExpandColumn() {
        return this._getSpecialColumnsLeftOffset({
            includeSelection: false,
            includeExpand: false,
            includeNumber: false,
        });
    }
    getStickyLeftForSelectionColumn() {
        return this._getSpecialColumnsLeftOffset({
            includeSelection: false,
            includeExpand: true,
            includeNumber: false,
        });
    }
    getStickyLeftForNumberColumn() {
        return this._getSpecialColumnsLeftOffset({
            includeSelection: true,
            includeExpand: true,
            includeNumber: false,
        });
    }
    /* ------- paginator proxies ------- */
    get hasPagination() {
        if (this.treeEnabled) {
            return false;
        }
        return this.dataSource instanceof IGridDataSource && this.dataSource.paginatorEnabled;
    }
    get totalLength() {
        if (this.dataSource instanceof IGridDataSource) {
            return this.dataSource.length;
        }
        return this.renderedData.length;
    }
    get pageIndex() {
        if (this.dataSource instanceof IGridDataSource) {
            return this.dataSource.pageIndex;
        }
        return 0;
    }
    get pageSize() {
        if (this.dataSource instanceof IGridDataSource) {
            return this.dataSource.pageSize;
        }
        return 0;
    }
    get pageSizeOptions() {
        if (this.dataSource instanceof IGridDataSource) {
            return this.dataSource.pageSizeOptions;
        }
        return [];
    }
    onPageChange(event) {
        if (!(this.dataSource instanceof IGridDataSource)) {
            return;
        }
        this.dataSource.paginator = { pageIndex: event.pageIndex, pageSize: event.pageSize };
    }
    /* ------- lifecycle ------- */
    ngAfterContentInit() {
        this._rebuildColumnsAndHeader();
        this.columnDefs.changes.subscribe(() => this._rebuildColumnsAndHeader());
        this.customColumnDefs.changes.subscribe(() => this._rebuildColumnsAndHeader());
        this.columnGroupDefs.changes.subscribe(() => this._rebuildColumnsAndHeader());
        this._connectData();
        this._applyExistingDataSourceSort();
    }
    ngOnChanges(changes) {
        if ('dataSource' in changes && !changes['dataSource'].firstChange) {
            this._connectData();
            this._applyExistingDataSourceSort();
        }
        if ('selectionMode' in changes &&
            changes['selectionMode'].previousValue !== changes['selectionMode'].currentValue) {
            this.clearSelection();
        }
        if ('tree' in changes && !changes['tree'].firstChange) {
            this._connectData();
        }
        if ('treeInitialExpandLevel' in changes &&
            !changes['treeInitialExpandLevel'].firstChange &&
            this.treeEnabled) {
            this._connectData();
        }
    }
    ngOnDestroy() {
        this._dataSub?.unsubscribe();
        if (this.dataSource instanceof IGridDataSource) {
            this.dataSource.disconnect();
        }
    }
    _applyExistingDataSourceSort() {
        if (!(this.dataSource instanceof IGridDataSource)) {
            this.sortStates = [];
            return;
        }
        const sort = this.dataSource.sort;
        if (!sort || sort.length === 0) {
            this.sortStates = [];
            return;
        }
        this.sortStates = sort.map((s) => ({ active: s.active, direction: s.direction }));
    }
    _rebuildColumnsAndHeader(fromDataChange = false) {
        const directCols = this.columnDefs?.toArray?.() ?? [];
        const directCustom = this.customColumnDefs?.toArray?.() ?? [];
        const groups = this.columnGroupDefs?.toArray?.() ?? [];
        const hasAnyGrouping = groups.length > 0;
        const groupedColsSet = new Set();
        const groupedCustomSet = new Set();
        for (const g of groups) {
            (g.columns?.toArray?.() ?? []).forEach((c) => groupedColsSet.add(c));
            (g.customColumns?.toArray?.() ?? []).forEach((c) => groupedCustomSet.add(c));
        }
        const topLevelCols = directCols.filter((c) => !groupedColsSet.has(c));
        const topLevelCustom = directCustom.filter((c) => !groupedCustomSet.has(c));
        const hasExplicit = hasAnyGrouping ||
            topLevelCols.length > 0 ||
            topLevelCustom.length > 0 ||
            directCols.length > 0;
        if (hasExplicit) {
            const headerItems = [];
            for (const c of topLevelCols) {
                headerItems.push({ kind: 'col', col: c });
            }
            for (const g of groups) {
                const gCols = [
                    ...(g.columns?.toArray?.() ?? []),
                    ...(g.customColumns?.toArray?.() ?? []),
                ];
                headerItems.push({
                    kind: 'group',
                    title: g.title || '',
                    columns: gCols,
                });
            }
            for (const c of topLevelCustom) {
                headerItems.push({ kind: 'col', col: c });
            }
            const flat = [];
            for (const item of headerItems) {
                if (item.kind === 'col') {
                    flat.push(item.col);
                }
                else {
                    flat.push(...item.columns);
                }
            }
            this.headerItems = headerItems;
            this.columns = flat;
            this._seedColumnWidths();
            return;
        }
        if (fromDataChange || !this.columns.length) {
            const autoCols = this._buildAutoColumnsFromData();
            this.columns = autoCols;
            this.headerItems = autoCols.map((c) => ({ kind: 'col', col: c }));
            this._seedColumnWidths();
            return;
        }
        this.headerItems = this.columns.map((c) => ({ kind: 'col', col: c }));
        this._seedColumnWidths();
    }
    _seedColumnWidths() {
        this.columns.forEach((col) => {
            if (!this._columnWidths.has(col)) {
                const px = this.getColumnWidth(col);
                if (px !== null) {
                    this._columnWidths.set(col, px);
                }
            }
        });
        if (this.showNumberColumnEffective) {
            const numCol = this.numberColumn;
            if (!this._columnWidths.has(numCol)) {
                const px = this.getColumnWidth(numCol);
                if (px !== null) {
                    this._columnWidths.set(numCol, px);
                }
            }
        }
    }
    _buildAutoColumnsFromData() {
        const rows = this._getAllDataRows();
        if (!rows.length) {
            return [];
        }
        const first = rows[0];
        if (first === null || typeof first !== 'object') {
            return [];
        }
        const keys = Object.keys(first);
        return keys.map((key) => ({
            fieldName: key,
            title: key,
            sortable: true,
            resizable: true,
            width: 'fill',
            freeze: false,
            headerDef: undefined,
            cellDef: undefined,
            isAuto: true,
        }));
    }
    _updateCurrentFilterText() {
        this.currentFilterText =
            this.dataSource instanceof IGridDataSource ? this.dataSource.filter : '';
    }
    _connectData() {
        this._dataSub?.unsubscribe();
        if (this.treeEnabled) {
            if (this.dataSource instanceof IGridDataSource) {
                this._dataSub = this.dataSource.connect().subscribe((data) => {
                    const roots = data || [];
                    this._buildTreeMeta(roots);
                    this._rebuildTreeRendered();
                    this._rebuildColumnsAndHeader(true);
                });
                return;
            }
            if (Array.isArray(this.dataSource)) {
                const roots = this.dataSource;
                this._buildTreeMeta(roots);
                this._rebuildTreeRendered();
                this._rebuildColumnsAndHeader(true);
                return;
            }
            this.renderedData = [];
            this._reconcileSelectionWithData();
            this._reconcileExpandedWithData();
            this._rebuildColumnsAndHeader(true);
            this._updateCurrentFilterText();
            return;
        }
        if (this.dataSource instanceof IGridDataSource) {
            this._dataSub = this.dataSource.connect().subscribe((data) => {
                this.renderedData = data || [];
                this._reconcileSelectionWithData();
                this._reconcileExpandedWithData();
                this._rebuildColumnsAndHeader(true);
                this._updateCurrentFilterText();
            });
            return;
        }
        if (Array.isArray(this.dataSource)) {
            this.renderedData = this.dataSource;
            this._reconcileSelectionWithData();
            this._reconcileExpandedWithData();
            this._rebuildColumnsAndHeader(true);
            this._updateCurrentFilterText();
            return;
        }
        this.renderedData = [];
        this._reconcileSelectionWithData();
        this._reconcileExpandedWithData();
        this._rebuildColumnsAndHeader(true);
        this._updateCurrentFilterText();
    }
    /* ------- row click ------- */
    onRowClicked(row) {
        this.onRowClick.emit(row);
        // selection via explicit checkbox/radio only
    }
    /* ------- template helpers ------- */
    get singleSelectionName() {
        return `i-grid-radio-${this._id}`;
    }
    getRowNumber(visibleRowIndex) {
        if (this.dataSource instanceof IGridDataSource && this.hasPagination) {
            return this.pageIndex * this.pageSize + visibleRowIndex + 1;
        }
        return visibleRowIndex + 1;
    }
    getFrozenColumnZ(column) {
        const endIndex = this._getFrozenEndIndex();
        if (endIndex < 0) {
            return 2;
        }
        const idx = this.columns.indexOf(column);
        if (idx === -1) {
            return 2;
        }
        const base = 20;
        return base + (endIndex - idx);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IGrid, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.16", type: IGrid, isStandalone: true, selector: "i-grid", inputs: { dataSource: "dataSource", selectionMode: "selectionMode", tree: "tree", treeIndent: "treeIndent", treeColumn: "treeColumn", treeInitialExpandLevel: "treeInitialExpandLevel", showNumberColumn: ["showNumberColumn", "showNumberColumn", booleanAttribute] }, outputs: { onSelectionChange: "onSelectionChange", onRowClick: "onRowClick", onRowExpandChange: "onRowExpandChange", onExpandedRowsChange: "onExpandedRowsChange" }, host: { attributes: { "role": "table" }, classAttribute: "i-grid" }, queries: [{ propertyName: "expandableRowDef", first: true, predicate: IGridRowDefDirective, descendants: true }, { propertyName: "columnDefs", predicate: IGridColumn }, { propertyName: "customColumnDefs", predicate: IGridCustomColumn }, { propertyName: "columnGroupDefs", predicate: IGridColumnGroup }], exportAs: ["iGrid"], usesOnChanges: true, ngImport: i0, template: `<i-grid-viewport>
      <!-- HEADER -->
      @if (headerItems.length) {
        <i-grid-header-row>
          <!-- FLAT MODE: Expand-all for detail rows (if expandableRow present and not single) -->
          @if (!treeEnabled && hasExpandableRow && !expandableRowDef?.iRowDefExpandSingle) {
            <i-grid-header-cell
              class="i-grid-expand-cell i-grid-expand-cell--header i-grid-header-cell--frozen"
              [fixedWidth]="expandColumnWidth"
              [style.left.px]="getStickyLeftForExpandColumn()"
              [style.position]="'sticky'"
            >
              <span class="i-grid-header-cell__content">
                <i-button
                  class="i-grid-expand-toggle"
                  size="2xs"
                  variant="outline"
                  [icon]="allVisibleExpanded ? 'down' : 'next'"
                  (onClick)="onToggleAllExpanded()"
                />
              </span>
            </i-grid-header-cell>
          }

          <!-- FLAT MODE: Selection header column (appears after expand-all) -->
          @if (!treeEnabled && selectionMode) {
            <i-grid-header-cell
              class="i-grid-selection-cell i-grid-selection-cell--header i-grid-header-cell--frozen"
              [fixedWidth]="selectionColumnWidth"
              [style.left.px]="getStickyLeftForSelectionColumn()"
              [style.position]="'sticky'"
            >
              <span class="i-grid-header-cell__content">
                @if (selectionMode === 'multiple') {
                  <input
                    type="checkbox"
                    [checked]="allVisibleSelected"
                    [indeterminate]="someVisibleSelected"
                    (change)="onToggleAllVisible()"
                    (click)="$event.stopPropagation()"
                  />
                }
              </span>
            </i-grid-header-cell>
          }

          <!-- Number header -->
          @if (showNumberColumnEffective) {
            <i-grid-header-cell
              class="i-grid-number-cell i-grid-number-cell--header"
              [class.i-grid-header-cell--frozen]="hasFrozenColumns"
              [column]="numberColumn"
              [style.left.px]="hasFrozenColumns ? getStickyLeftForNumberColumn() : null"
              [style.position]="hasFrozenColumns ? 'sticky' : null"
              [style.zIndex]="hasFrozenColumns ? 3 : null"
            >
              {{ numberColumn.title }}
            </i-grid-header-cell>
          }

          <!-- Header items (columns OR groups) -->
          @for (item of headerItems; track item; let i = $index) {
            @if (item.kind === 'col') {
              @let col = item.col;

              @if (treeEnabled && isTreeHostColumn(col)) {
                <!-- TREE MODE: tree UI is inside this header cell -->
                <i-grid-header-cell [class.i-grid-header-cell--auto]="col.isAuto" [column]="col">
                  <span class="i-grid-tree-head">
                    <i-button
                      class="i-grid-tree-expand-all"
                      size="2xs"
                      variant="outline"
                      [icon]="anyTreeExpanded ? 'down' : 'next'"
                      (onClick)="onToggleAllTree(); $event.stopPropagation()"
                    />

                    @if (selectionMode === 'multiple') {
                      <input
                        class="i-grid-tree-header-checkbox"
                        type="checkbox"
                        [checked]="allVisibleSelected"
                        [indeterminate]="someVisibleSelected"
                        (change)="onToggleAllVisible()"
                        (click)="$event.stopPropagation()"
                      />
                    }

                    <span class="i-grid-tree-head__title">{{ col.title || col.fieldName }}</span>
                  </span>
                </i-grid-header-cell>
              } @else {
                @if (col.headerDef; as tmpl) {
                  <ng-container [ngTemplateOutlet]="tmpl" />
                } @else {
                  <i-grid-header-cell [class.i-grid-header-cell--auto]="col.isAuto" [column]="col">
                    {{ col.title || col.fieldName }}
                  </i-grid-header-cell>
                }
              }
            } @else {
              <!-- GROUP HEADER -->
              @let g = item;

              <i-grid-header-cell-group>
                <!-- Group title cell (top row) -->
                <i-grid-header-cell>
                  {{ g.title }}
                </i-grid-header-cell>

                <!-- Group columns row -->
                <i-grid-header-cell-group-columns>
                  @for (col of g.columns; track col) {
                    @if (col.headerDef; as tmpl) {
                      <ng-container [ngTemplateOutlet]="tmpl" />
                    } @else {
                      <i-grid-header-cell
                        [class.i-grid-header-cell--auto]="col.isAuto"
                        [column]="col"
                      >
                        {{ col.title || col.fieldName }}
                      </i-grid-header-cell>
                    }
                  }
                </i-grid-header-cell-group-columns>
              </i-grid-header-cell-group>
            }
          }
        </i-grid-header-row>
      }

      <!-- ROWS -->
      @for (row of renderedData; track rowIndex; let rowIndex = $index) {
        <i-grid-row [class.i-grid-selection-row]="!!selectionMode" (click)="onRowClicked(row)">
          <!-- Expand control column (detail rows, non-tree mode) -->
          @if (!treeEnabled && hasExpandableRow) {
            <i-grid-cell
              class="i-grid-expand-cell i-grid-expand-cell--body"
              [fixedWidth]="expandColumnWidth"
              [style.left.px]="getStickyLeftForExpandColumn()"
              [style.position]="'sticky'"
              (click)="$event.stopPropagation()"
            >
              <span class="i-grid-expand-cell__content">
                <i-button
                  class="i-grid-expand-toggle"
                  size="2xs"
                  variant="outline"
                  [icon]="isRowExpanded(row) ? 'down' : 'next'"
                  (onClick)="onExpandToggle(row, $event)"
                />
              </span>
            </i-grid-cell>
          }

          <!-- Selection column (flat mode only) -->
          @if (!treeEnabled && selectionMode) {
            <i-grid-cell
              class="i-grid-selection-cell i-grid-selection-cell--body"
              [fixedWidth]="selectionColumnWidth"
              [style.left.px]="getStickyLeftForSelectionColumn()"
              [style.position]="'sticky'"
              (click)="$event.stopPropagation()"
            >
              @if (selectionMode === 'multiple') {
                <input
                  type="checkbox"
                  [checked]="getRowChecked(row)"
                  [indeterminate]="getRowIndeterminate(row)"
                  (change)="onRowSelectionToggle(row)"
                />
              } @else if (selectionMode === 'single') {
                <input
                  type="radio"
                  [checked]="isRowSelected(row)"
                  [name]="singleSelectionName"
                  (change)="onRowSelectionToggle(row)"
                />
              }
            </i-grid-cell>
          }

          <!-- Number column -->
          @if (showNumberColumnEffective) {
            <i-grid-cell
              class="i-grid-number-cell i-grid-number-cell--body"
              [class.i-grid-cell--frozen]="hasFrozenColumns"
              [column]="numberColumn"
              [style.left.px]="hasFrozenColumns ? getStickyLeftForNumberColumn() : null"
              [style.position]="hasFrozenColumns ? 'sticky' : null"
              [style.zIndex]="hasFrozenColumns ? 2 : null"
              (click)="$event.stopPropagation()"
            >
              <span class="i-grid-cell__content">
                {{ getRowNumber(rowIndex) }}
              </span>
            </i-grid-cell>
          }

          <!-- Data/custom cells (FLATTENED columns) -->
          @for (col of columns; track col; let colIndex = $index) {
            @if (treeEnabled && isTreeHostColumn(col)) {
              <!-- TREE MODE: tree UI is inside this cell -->
              <i-grid-cell
                [class.i-grid-cell--auto]="col.isAuto"
                [column]="col"
                (click)="$event.stopPropagation()"
              >
                <span class="i-grid-tree-inline">
                  <span class="i-grid-tree-indent" [style.width.px]="getTreeIndentPx(row)"></span>

                  @if (hasChildren(row)) {
                    <i-button
                      class="i-grid-tree-toggle"
                      size="2xs"
                      variant="outline"
                      [icon]="isExpanded(row) ? 'down' : 'next'"
                      (onClick)="onTreeToggle(row, $event)"
                    />
                  } @else {
                    <span class="i-grid-tree-spacer"></span>
                  }

                  @if (selectionMode === 'multiple') {
                    <input
                      class="i-grid-tree-checkbox"
                      type="checkbox"
                      [checked]="getRowChecked(row)"
                      [indeterminate]="getRowIndeterminate(row)"
                      (change)="onRowSelectionToggle(row)"
                      (click)="$event.stopPropagation()"
                    />
                  } @else if (selectionMode === 'single') {
                    <input
                      class="i-grid-tree-radio"
                      type="radio"
                      [checked]="isRowSelected(row)"
                      [name]="singleSelectionName"
                      (change)="onRowSelectionToggle(row)"
                      (click)="$event.stopPropagation()"
                    />
                  }

                  <!-- cell value -->
                  @if (col.cellDef; as tmpl) {
                    <ng-container
                      [ngTemplateOutlet]="tmpl"
                      [ngTemplateOutletContext]="{
                        $implicit: row,
                        row: row,
                        index: rowIndex,
                        column: col,
                      }"
                    />
                  } @else {
                    <span
                      class="i-grid-tree-text"
                      truncatedTooltip
                      [innerHTML]="
                        col.fieldName
                          ? ($any(row)[col.fieldName] | highlightSearch: currentFilterText)
                          : ''
                      "
                    ></span>
                  }
                </span>
              </i-grid-cell>
            } @else {
              @if (col.cellDef; as tmpl) {
                <ng-container
                  [ngTemplateOutlet]="tmpl"
                  [ngTemplateOutletContext]="{
                    $implicit: row,
                    row: row,
                    index: rowIndex,
                    column: col,
                  }"
                />
              } @else {
                <i-grid-cell [class.i-grid-cell--auto]="col.isAuto" [column]="col">
                  <span
                    class="i-grid-cell__content"
                    truncatedTooltip
                    [innerHTML]="
                      col.fieldName
                        ? ($any(row)[col.fieldName] | highlightSearch: currentFilterText)
                        : ''
                    "
                  >
                  </span>
                </i-grid-cell>
              }
            }
          }
        </i-grid-row>

        <!-- DETAIL ROW -->
        @if (hasExpandableRow && isRowExpanded(row)) {
          <ng-container
            [ngTemplateOutlet]="expandableRowDef!.template"
            [ngTemplateOutletContext]="{ $implicit: row, row: row, index: rowIndex }"
          />
        }
      }
    </i-grid-viewport>

    @if (hasPagination) {
      <div class="i-grid-footer">
        <i-paginator
          [length]="totalLength"
          [pageIndex]="pageIndex"
          [pageSize]="pageSize"
          [pageSizeOptions]="pageSizeOptions"
          (onPageChange)="onPageChange($event)"
        />
      </div>
    }`, isInline: true, dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: IGridHeaderRowDirective, selector: "i-grid-header-row" }, { kind: "directive", type: IGridRowDirective, selector: "i-grid-row" }, { kind: "component", type: IGridHeaderCell, selector: "i-grid-header-cell", inputs: ["column", "fixedWidth"] }, { kind: "component", type: IGridCell, selector: "i-grid-cell", inputs: ["column", "fixedWidth"] }, { kind: "component", type: IPaginator, selector: "i-paginator", inputs: ["length", "pageIndex", "pageSize", "pageSizeOptions"], outputs: ["onPageChange"] }, { kind: "component", type: IButton, selector: "i-button", inputs: ["disabled", "loading", "type", "loadingText", "variant", "size", "icon"], outputs: ["onClick"] }, { kind: "directive", type: ITruncatedTooltipDirective, selector: "[truncatedTooltip]", inputs: ["truncatedTooltip"] }, { kind: "component", type: IGridHeaderCellGroup, selector: "i-grid-header-cell-group" }, { kind: "component", type: IGridHeaderCellGroupColumns, selector: "i-grid-header-cell-group-columns" }, { kind: "component", type: IGridViewport, selector: "i-grid-viewport" }, { kind: "pipe", type: IHighlightSearchPipe, name: "highlightSearch" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IGrid, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-grid',
                    standalone: true,
                    imports: [
                        NgTemplateOutlet,
                        IGridHeaderRowDirective,
                        IGridRowDirective,
                        IGridHeaderCell,
                        IGridCell,
                        IPaginator,
                        IButton,
                        IHighlightSearchPipe,
                        ITruncatedTooltipDirective,
                        IGridHeaderCellGroup,
                        IGridHeaderCellGroupColumns,
                        IGridViewport,
                    ],
                    template: `<i-grid-viewport>
      <!-- HEADER -->
      @if (headerItems.length) {
        <i-grid-header-row>
          <!-- FLAT MODE: Expand-all for detail rows (if expandableRow present and not single) -->
          @if (!treeEnabled && hasExpandableRow && !expandableRowDef?.iRowDefExpandSingle) {
            <i-grid-header-cell
              class="i-grid-expand-cell i-grid-expand-cell--header i-grid-header-cell--frozen"
              [fixedWidth]="expandColumnWidth"
              [style.left.px]="getStickyLeftForExpandColumn()"
              [style.position]="'sticky'"
            >
              <span class="i-grid-header-cell__content">
                <i-button
                  class="i-grid-expand-toggle"
                  size="2xs"
                  variant="outline"
                  [icon]="allVisibleExpanded ? 'down' : 'next'"
                  (onClick)="onToggleAllExpanded()"
                />
              </span>
            </i-grid-header-cell>
          }

          <!-- FLAT MODE: Selection header column (appears after expand-all) -->
          @if (!treeEnabled && selectionMode) {
            <i-grid-header-cell
              class="i-grid-selection-cell i-grid-selection-cell--header i-grid-header-cell--frozen"
              [fixedWidth]="selectionColumnWidth"
              [style.left.px]="getStickyLeftForSelectionColumn()"
              [style.position]="'sticky'"
            >
              <span class="i-grid-header-cell__content">
                @if (selectionMode === 'multiple') {
                  <input
                    type="checkbox"
                    [checked]="allVisibleSelected"
                    [indeterminate]="someVisibleSelected"
                    (change)="onToggleAllVisible()"
                    (click)="$event.stopPropagation()"
                  />
                }
              </span>
            </i-grid-header-cell>
          }

          <!-- Number header -->
          @if (showNumberColumnEffective) {
            <i-grid-header-cell
              class="i-grid-number-cell i-grid-number-cell--header"
              [class.i-grid-header-cell--frozen]="hasFrozenColumns"
              [column]="numberColumn"
              [style.left.px]="hasFrozenColumns ? getStickyLeftForNumberColumn() : null"
              [style.position]="hasFrozenColumns ? 'sticky' : null"
              [style.zIndex]="hasFrozenColumns ? 3 : null"
            >
              {{ numberColumn.title }}
            </i-grid-header-cell>
          }

          <!-- Header items (columns OR groups) -->
          @for (item of headerItems; track item; let i = $index) {
            @if (item.kind === 'col') {
              @let col = item.col;

              @if (treeEnabled && isTreeHostColumn(col)) {
                <!-- TREE MODE: tree UI is inside this header cell -->
                <i-grid-header-cell [class.i-grid-header-cell--auto]="col.isAuto" [column]="col">
                  <span class="i-grid-tree-head">
                    <i-button
                      class="i-grid-tree-expand-all"
                      size="2xs"
                      variant="outline"
                      [icon]="anyTreeExpanded ? 'down' : 'next'"
                      (onClick)="onToggleAllTree(); $event.stopPropagation()"
                    />

                    @if (selectionMode === 'multiple') {
                      <input
                        class="i-grid-tree-header-checkbox"
                        type="checkbox"
                        [checked]="allVisibleSelected"
                        [indeterminate]="someVisibleSelected"
                        (change)="onToggleAllVisible()"
                        (click)="$event.stopPropagation()"
                      />
                    }

                    <span class="i-grid-tree-head__title">{{ col.title || col.fieldName }}</span>
                  </span>
                </i-grid-header-cell>
              } @else {
                @if (col.headerDef; as tmpl) {
                  <ng-container [ngTemplateOutlet]="tmpl" />
                } @else {
                  <i-grid-header-cell [class.i-grid-header-cell--auto]="col.isAuto" [column]="col">
                    {{ col.title || col.fieldName }}
                  </i-grid-header-cell>
                }
              }
            } @else {
              <!-- GROUP HEADER -->
              @let g = item;

              <i-grid-header-cell-group>
                <!-- Group title cell (top row) -->
                <i-grid-header-cell>
                  {{ g.title }}
                </i-grid-header-cell>

                <!-- Group columns row -->
                <i-grid-header-cell-group-columns>
                  @for (col of g.columns; track col) {
                    @if (col.headerDef; as tmpl) {
                      <ng-container [ngTemplateOutlet]="tmpl" />
                    } @else {
                      <i-grid-header-cell
                        [class.i-grid-header-cell--auto]="col.isAuto"
                        [column]="col"
                      >
                        {{ col.title || col.fieldName }}
                      </i-grid-header-cell>
                    }
                  }
                </i-grid-header-cell-group-columns>
              </i-grid-header-cell-group>
            }
          }
        </i-grid-header-row>
      }

      <!-- ROWS -->
      @for (row of renderedData; track rowIndex; let rowIndex = $index) {
        <i-grid-row [class.i-grid-selection-row]="!!selectionMode" (click)="onRowClicked(row)">
          <!-- Expand control column (detail rows, non-tree mode) -->
          @if (!treeEnabled && hasExpandableRow) {
            <i-grid-cell
              class="i-grid-expand-cell i-grid-expand-cell--body"
              [fixedWidth]="expandColumnWidth"
              [style.left.px]="getStickyLeftForExpandColumn()"
              [style.position]="'sticky'"
              (click)="$event.stopPropagation()"
            >
              <span class="i-grid-expand-cell__content">
                <i-button
                  class="i-grid-expand-toggle"
                  size="2xs"
                  variant="outline"
                  [icon]="isRowExpanded(row) ? 'down' : 'next'"
                  (onClick)="onExpandToggle(row, $event)"
                />
              </span>
            </i-grid-cell>
          }

          <!-- Selection column (flat mode only) -->
          @if (!treeEnabled && selectionMode) {
            <i-grid-cell
              class="i-grid-selection-cell i-grid-selection-cell--body"
              [fixedWidth]="selectionColumnWidth"
              [style.left.px]="getStickyLeftForSelectionColumn()"
              [style.position]="'sticky'"
              (click)="$event.stopPropagation()"
            >
              @if (selectionMode === 'multiple') {
                <input
                  type="checkbox"
                  [checked]="getRowChecked(row)"
                  [indeterminate]="getRowIndeterminate(row)"
                  (change)="onRowSelectionToggle(row)"
                />
              } @else if (selectionMode === 'single') {
                <input
                  type="radio"
                  [checked]="isRowSelected(row)"
                  [name]="singleSelectionName"
                  (change)="onRowSelectionToggle(row)"
                />
              }
            </i-grid-cell>
          }

          <!-- Number column -->
          @if (showNumberColumnEffective) {
            <i-grid-cell
              class="i-grid-number-cell i-grid-number-cell--body"
              [class.i-grid-cell--frozen]="hasFrozenColumns"
              [column]="numberColumn"
              [style.left.px]="hasFrozenColumns ? getStickyLeftForNumberColumn() : null"
              [style.position]="hasFrozenColumns ? 'sticky' : null"
              [style.zIndex]="hasFrozenColumns ? 2 : null"
              (click)="$event.stopPropagation()"
            >
              <span class="i-grid-cell__content">
                {{ getRowNumber(rowIndex) }}
              </span>
            </i-grid-cell>
          }

          <!-- Data/custom cells (FLATTENED columns) -->
          @for (col of columns; track col; let colIndex = $index) {
            @if (treeEnabled && isTreeHostColumn(col)) {
              <!-- TREE MODE: tree UI is inside this cell -->
              <i-grid-cell
                [class.i-grid-cell--auto]="col.isAuto"
                [column]="col"
                (click)="$event.stopPropagation()"
              >
                <span class="i-grid-tree-inline">
                  <span class="i-grid-tree-indent" [style.width.px]="getTreeIndentPx(row)"></span>

                  @if (hasChildren(row)) {
                    <i-button
                      class="i-grid-tree-toggle"
                      size="2xs"
                      variant="outline"
                      [icon]="isExpanded(row) ? 'down' : 'next'"
                      (onClick)="onTreeToggle(row, $event)"
                    />
                  } @else {
                    <span class="i-grid-tree-spacer"></span>
                  }

                  @if (selectionMode === 'multiple') {
                    <input
                      class="i-grid-tree-checkbox"
                      type="checkbox"
                      [checked]="getRowChecked(row)"
                      [indeterminate]="getRowIndeterminate(row)"
                      (change)="onRowSelectionToggle(row)"
                      (click)="$event.stopPropagation()"
                    />
                  } @else if (selectionMode === 'single') {
                    <input
                      class="i-grid-tree-radio"
                      type="radio"
                      [checked]="isRowSelected(row)"
                      [name]="singleSelectionName"
                      (change)="onRowSelectionToggle(row)"
                      (click)="$event.stopPropagation()"
                    />
                  }

                  <!-- cell value -->
                  @if (col.cellDef; as tmpl) {
                    <ng-container
                      [ngTemplateOutlet]="tmpl"
                      [ngTemplateOutletContext]="{
                        $implicit: row,
                        row: row,
                        index: rowIndex,
                        column: col,
                      }"
                    />
                  } @else {
                    <span
                      class="i-grid-tree-text"
                      truncatedTooltip
                      [innerHTML]="
                        col.fieldName
                          ? ($any(row)[col.fieldName] | highlightSearch: currentFilterText)
                          : ''
                      "
                    ></span>
                  }
                </span>
              </i-grid-cell>
            } @else {
              @if (col.cellDef; as tmpl) {
                <ng-container
                  [ngTemplateOutlet]="tmpl"
                  [ngTemplateOutletContext]="{
                    $implicit: row,
                    row: row,
                    index: rowIndex,
                    column: col,
                  }"
                />
              } @else {
                <i-grid-cell [class.i-grid-cell--auto]="col.isAuto" [column]="col">
                  <span
                    class="i-grid-cell__content"
                    truncatedTooltip
                    [innerHTML]="
                      col.fieldName
                        ? ($any(row)[col.fieldName] | highlightSearch: currentFilterText)
                        : ''
                    "
                  >
                  </span>
                </i-grid-cell>
              }
            }
          }
        </i-grid-row>

        <!-- DETAIL ROW -->
        @if (hasExpandableRow && isRowExpanded(row)) {
          <ng-container
            [ngTemplateOutlet]="expandableRowDef!.template"
            [ngTemplateOutletContext]="{ $implicit: row, row: row, index: rowIndex }"
          />
        }
      }
    </i-grid-viewport>

    @if (hasPagination) {
      <div class="i-grid-footer">
        <i-paginator
          [length]="totalLength"
          [pageIndex]="pageIndex"
          [pageSize]="pageSize"
          [pageSizeOptions]="pageSizeOptions"
          (onPageChange)="onPageChange($event)"
        />
      </div>
    }`,
                    exportAs: 'iGrid',
                    host: {
                        class: 'i-grid',
                        role: 'table',
                    },
                }]
        }], propDecorators: { dataSource: [{
                type: Input
            }], selectionMode: [{
                type: Input
            }], tree: [{
                type: Input
            }], treeIndent: [{
                type: Input
            }], treeColumn: [{
                type: Input
            }], treeInitialExpandLevel: [{
                type: Input
            }], showNumberColumn: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], onSelectionChange: [{
                type: Output
            }], onRowClick: [{
                type: Output
            }], onRowExpandChange: [{
                type: Output
            }], onExpandedRowsChange: [{
                type: Output
            }], columnDefs: [{
                type: ContentChildren,
                args: [IGridColumn]
            }], customColumnDefs: [{
                type: ContentChildren,
                args: [IGridCustomColumn]
            }], columnGroupDefs: [{
                type: ContentChildren,
                args: [IGridColumnGroup]
            }], expandableRowDef: [{
                type: ContentChild,
                args: [IGridRowDefDirective]
            }] } });
/* ----------------------------------------------------
 * EXPORT GROUP
 * ---------------------------------------------------- */
const I_GRID_DECLARATIONS = [
    IGrid,
    IGridViewport,
    IGridColumn,
    IGridCustomColumn,
    IGridColumnGroup,
    IGridHeaderCellDefDirective,
    IGridCellDefDirective,
    IGridRowDefDirective,
    IGridExpandableRow,
    IGridHeaderCell,
    IGridCell,
    IGridHeaderRowDirective,
    IGridRowDirective,
    IGridHeaderCellGroup,
    IGridHeaderCellGroupColumns,
];
class IGridModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IGridModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.16", ngImport: i0, type: IGridModule, imports: [IGrid, IGridViewport, IGridColumn, IGridCustomColumn, IGridColumnGroup, IGridHeaderCellDefDirective, IGridCellDefDirective, IGridRowDefDirective, IGridExpandableRow, IGridHeaderCell, IGridCell, IGridHeaderRowDirective, IGridRowDirective, IGridHeaderCellGroup, IGridHeaderCellGroupColumns, IPaginator], exports: [IGrid, IGridViewport, IGridColumn, IGridCustomColumn, IGridColumnGroup, IGridHeaderCellDefDirective, IGridCellDefDirective, IGridRowDefDirective, IGridExpandableRow, IGridHeaderCell, IGridCell, IGridHeaderRowDirective, IGridRowDirective, IGridHeaderCellGroup, IGridHeaderCellGroupColumns, IPaginator] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IGridModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IGridModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [...I_GRID_DECLARATIONS, IPaginator],
                    exports: [...I_GRID_DECLARATIONS, IPaginator],
                }]
        }] });

/* =========================================================
 * host.ts (insight-ui-angular)
 * ✅ Includes:
 * - IHBreadcrumbItem
 * - IHNavigationSnapshot
 * - IHTitleBreadcrumbService (signals)
 * - IHContent that reacts to overrides IMMEDIATELY (no NavigationEnd needed)
 * - Override breadcrumbs support routerLink + correct href with baseHref "/-/" (NO "/-/-/" bug)
 * - Override breadcrumb click also notifies React Router (popstate) so React pages update
 * - IHMenu / IHSidebar kept as you had them
 * ========================================================= */
class IHTitleBreadcrumbService {
    /**
     * null = use normal (route-based) title/breadcrumbs
     * non-null = override (e.g. React remote controls shell display)
     */
    titleOverride = signal(null, ...(ngDevMode ? [{ debugName: "titleOverride" }] : []));
    breadcrumbsOverride = signal(null, ...(ngDevMode ? [{ debugName: "breadcrumbsOverride" }] : []));
    setTitle(title) {
        this.titleOverride.set(title ?? null);
    }
    setBreadcrumbs(items) {
        this.breadcrumbsOverride.set(items ?? null);
    }
    clear() {
        this.titleOverride.set(null);
        this.breadcrumbsOverride.set(null);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IHTitleBreadcrumbService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IHTitleBreadcrumbService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IHTitleBreadcrumbService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
/* =========================================================
 * IHContent
 * - Route breadcrumbs/title still supported
 * - Override breadcrumbs/title update immediately (signals)
 * - IMPORTANT: baseHref is "/-/" (intentional)
 *   - routerLink must receive URL WITHOUT "/-/" prefix
 *   - href must INCLUDE "/-/" prefix for right click open-new-tab
 * - NEW: clicking override crumbs triggers popstate so React Router updates
 * ========================================================= */
class IHContent {
    router = inject(Router);
    activatedRoute = inject(ActivatedRoute);
    // IMPORTANT: your app base href is intentionally "/-/"
    baseHref = inject(APP_BASE_HREF);
    // ✅ bridge (set by host / React remotes)
    shell = inject(IHTitleBreadcrumbService);
    sidebarVisibility = true;
    onSidebarToggled = new EventEmitter();
    /** route-based breadcrumbs */
    breadcrumb$ = this.router.events.pipe(filter((e) => e instanceof NavigationEnd), startWith(null), // emit once on init
    map(() => this.buildBreadcrumb(this.activatedRoute.root)), shareReplay(1));
    /** last breadcrumb label = route-based page title */
    pageTitle$ = this.breadcrumb$.pipe(map((breadcrumbs) => breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].label : null), shareReplay(1));
    buildBreadcrumb(route, url = '', breadcrumbs = []) {
        const routeConfig = route.routeConfig;
        if (routeConfig) {
            const path = routeConfig.path ?? '';
            // Resolve path segments, including route params
            const segments = path
                .split('/')
                .filter(Boolean)
                .map((segment) => {
                if (segment.startsWith(':')) {
                    const paramName = segment.substring(1);
                    return route.snapshot.params[paramName] ?? segment;
                }
                return segment;
            });
            const nextUrlPart = segments.join('/');
            // Always advance the URL, even if we don't render a breadcrumb for this level
            const nextUrl = nextUrlPart.length > 0 ? `${url}/${nextUrlPart}` : url || '/';
            // 🔑 Use *route config* data, not snapshot (avoid inherited data)
            const data = routeConfig.data;
            const label = data?.title;
            if (label) {
                breadcrumbs.push({
                    label,
                    url: nextUrl,
                });
            }
            url = nextUrl;
        }
        if (route.firstChild) {
            return this.buildBreadcrumb(route.firstChild, url, breadcrumbs);
        }
        return breadcrumbs;
    }
    toggleSidebar() {
        this.sidebarVisibility = !this.sidebarVisibility;
        this.onSidebarToggled.emit(this.sidebarVisibility);
    }
    /* =========================================================
     * IMPORTANT: React Router sync when Angular changes URL
     * ========================================================= */
    onOverrideBreadcrumbClick(e) {
        // Only for normal left-click navigation.
        // Let browser handle right-click, ctrl/cmd-click, middle click, etc.
        if (e.button !== 0)
            return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
            return;
        // Angular routerLink will update the URL via pushState.
        // React Router (BrowserRouter) won't notice unless popstate is fired.
        queueMicrotask(() => {
            window.dispatchEvent(new PopStateEvent('popstate'));
        });
    }
    /* =========================================================
     * Override breadcrumb link helpers (baseHref aware)
     * ========================================================= */
    normalizeBaseHref() {
        let b = (this.baseHref ?? '/').trim();
        // ensure leading slash
        if (!b.startsWith('/'))
            b = `/${b}`;
        // ensure trailing slash
        if (!b.endsWith('/'))
            b = `${b}/`;
        // collapse repeated slashes
        b = b.replace(/\/{2,}/g, '/');
        return b;
    }
    normalizePath(url) {
        let u = (url ?? '').trim();
        if (!u)
            return '/';
        // support only path-like urls here; if ever full origin is passed, keep it
        if (/^https?:\/\//i.test(u))
            return u;
        if (!u.startsWith('/'))
            u = `/${u}`;
        u = u.replace(/\/{2,}/g, '/');
        // fix common mistake: "/-/-/dashboard" -> "/-/dashboard"
        u = u.replace(/^\/-\/-\/+/, '/-/');
        return u;
    }
    /**
     * RouterLink will prefix baseHref automatically.
     * So we must NOT include baseHref in the value passed to [routerLink].
     *
     * baseHref "/-/" examples:
     * - "/-/dashboard" -> "/dashboard"
     * - "/dashboard"   -> "/dashboard"
     * - "/"            -> "/"
     */
    overrideRouterLink(url) {
        const base = this.normalizeBaseHref(); // "/-/"
        const abs = this.normalizePath(url); // "/-/dashboard" or "/dashboard"
        // if already includes baseHref, strip it
        if (abs.startsWith(base)) {
            // base ends with "/" so slice base.length - 1 keeps leading "/"
            const stripped = abs.slice(base.length - 1);
            return stripped.length ? stripped : '/';
        }
        return abs;
    }
    /**
     * Browser href must include baseHref so "open in new tab" goes to the correct URL.
     *
     * baseHref "/-/" examples:
     * - "/dashboard"   -> "/-/dashboard"
     * - "/-/dashboard" -> "/-/dashboard"
     * - "/"            -> "/-/"
     */
    overrideHref(url) {
        const base = this.normalizeBaseHref(); // "/-/"
        const abs = this.normalizePath(url);
        // already includes baseHref
        if (abs.startsWith(base))
            return abs;
        // home
        if (abs === '/')
            return base;
        // join
        return `${base}${abs.slice(1)}`.replace(/\/{2,}/g, '/');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IHContent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.16", type: IHContent, isStandalone: true, selector: "ih-content", outputs: { onSidebarToggled: "onSidebarToggled" }, ngImport: i0, template: `
    <div class="ih-content-header">
      <a class="i-clickable" (click)="toggleSidebar()">
        @if (sidebarVisibility) {
          <img alt="sidebar-left" src="svgs/sidebar-left.svg" />
        } @else {
          <img alt="sidebar-right" src="svgs/sidebar-right.svg" />
        }
      </a>

      <!-- ✅ title override reacts immediately -->
      <h1>{{ shell.titleOverride() || (pageTitle$ | async) || 'Insight' }}</h1>
    </div>

    <div class="ih-content-breadcrumbs">
      @let override = shell.breadcrumbsOverride();

      @if (override && override.length > 0) {
        @for (b of override; track $index; let first = $first; let last = $last) {
          @if (!last) {
            @if (!first) {
              @if (b.url) {
                <a
                  class="ih-content-breadcrumb ih-content-breadcrumb__link"
                  [attr.href]="overrideHref(b.url)"
                  [routerLink]="overrideRouterLink(b.url)"
                  (click)="onOverrideBreadcrumbClick($event)"
                >
                  {{ b.label }}
                </a>
              } @else {
                <span class="ih-content-breadcrumb ih-content-breadcrumb__link">
                  {{ b.label }}
                </span>
              }
            } @else {
              <span class="ih-content-breadcrumb ih-content-breadcrumb__first">
                {{ b.label }}
              </span>
            }
            <span class="ih-content-breadcrumb ih-content-breadcrumb__separator">></span>
          } @else {
            <span class="ih-content-breadcrumb ih-content-breadcrumb__current">
              {{ b.label }}
            </span>
          }
        }
      } @else {
        <!-- ✅ Fallback to route-based breadcrumbs (Angular routes) -->
        @if (breadcrumb$ | async; as breadcrumbs) {
          @if (breadcrumbs.length > 0) {
            @for (
              breadcrumb of breadcrumbs;
              track breadcrumb.url;
              let first = $first;
              let last = $last
            ) {
              @if (!last) {
                @if (!first) {
                  <a
                    class="ih-content-breadcrumb ih-content-breadcrumb__link"
                    [routerLink]="breadcrumb.url"
                  >
                    {{ breadcrumb.label }}
                  </a>
                } @else {
                  <span class="ih-content-breadcrumb ih-content-breadcrumb__first">
                    {{ breadcrumb.label }}
                  </span>
                }
                <span class="ih-content-breadcrumb ih-content-breadcrumb__separator">></span>
              } @else {
                <span class="ih-content-breadcrumb ih-content-breadcrumb__current">
                  {{ breadcrumb.label }}
                </span>
              }
            }
          } @else {
            <span class="ih-content-breadcrumb ih-content-breadcrumb__first">Home</span>
          }
        } @else {
          <span class="ih-content-breadcrumb ih-content-breadcrumb__first">Home</span>
        }
      }
    </div>

    <div class="ih-content-body scroll scroll-y">
      <router-outlet />
    </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: RouterOutlet, selector: "router-outlet", inputs: ["name", "routerOutletData"], outputs: ["activate", "deactivate", "attach", "detach"], exportAs: ["outlet"] }, { kind: "directive", type: RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: AsyncPipe, name: "async" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IHContent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ih-content',
                    imports: [RouterOutlet, AsyncPipe, RouterLink],
                    template: `
    <div class="ih-content-header">
      <a class="i-clickable" (click)="toggleSidebar()">
        @if (sidebarVisibility) {
          <img alt="sidebar-left" src="svgs/sidebar-left.svg" />
        } @else {
          <img alt="sidebar-right" src="svgs/sidebar-right.svg" />
        }
      </a>

      <!-- ✅ title override reacts immediately -->
      <h1>{{ shell.titleOverride() || (pageTitle$ | async) || 'Insight' }}</h1>
    </div>

    <div class="ih-content-breadcrumbs">
      @let override = shell.breadcrumbsOverride();

      @if (override && override.length > 0) {
        @for (b of override; track $index; let first = $first; let last = $last) {
          @if (!last) {
            @if (!first) {
              @if (b.url) {
                <a
                  class="ih-content-breadcrumb ih-content-breadcrumb__link"
                  [attr.href]="overrideHref(b.url)"
                  [routerLink]="overrideRouterLink(b.url)"
                  (click)="onOverrideBreadcrumbClick($event)"
                >
                  {{ b.label }}
                </a>
              } @else {
                <span class="ih-content-breadcrumb ih-content-breadcrumb__link">
                  {{ b.label }}
                </span>
              }
            } @else {
              <span class="ih-content-breadcrumb ih-content-breadcrumb__first">
                {{ b.label }}
              </span>
            }
            <span class="ih-content-breadcrumb ih-content-breadcrumb__separator">></span>
          } @else {
            <span class="ih-content-breadcrumb ih-content-breadcrumb__current">
              {{ b.label }}
            </span>
          }
        }
      } @else {
        <!-- ✅ Fallback to route-based breadcrumbs (Angular routes) -->
        @if (breadcrumb$ | async; as breadcrumbs) {
          @if (breadcrumbs.length > 0) {
            @for (
              breadcrumb of breadcrumbs;
              track breadcrumb.url;
              let first = $first;
              let last = $last
            ) {
              @if (!last) {
                @if (!first) {
                  <a
                    class="ih-content-breadcrumb ih-content-breadcrumb__link"
                    [routerLink]="breadcrumb.url"
                  >
                    {{ breadcrumb.label }}
                  </a>
                } @else {
                  <span class="ih-content-breadcrumb ih-content-breadcrumb__first">
                    {{ breadcrumb.label }}
                  </span>
                }
                <span class="ih-content-breadcrumb ih-content-breadcrumb__separator">></span>
              } @else {
                <span class="ih-content-breadcrumb ih-content-breadcrumb__current">
                  {{ breadcrumb.label }}
                </span>
              }
            }
          } @else {
            <span class="ih-content-breadcrumb ih-content-breadcrumb__first">Home</span>
          }
        } @else {
          <span class="ih-content-breadcrumb ih-content-breadcrumb__first">Home</span>
        }
      }
    </div>

    <div class="ih-content-body scroll scroll-y">
      <router-outlet />
    </div>
  `,
                }]
        }], propDecorators: { onSidebarToggled: [{
                type: Output
            }] } });
/* =========================================================
 * IHMenu (unchanged)
 * ========================================================= */
class IHMenu {
    menu;
    selectedMenuId = null;
    filter = '';
    clicked = new EventEmitter();
    menus;
    // the actual clickable DOM element (only on leaf items)
    menuItemRef;
    isHidden = false;
    /** only true for the *leaf* menu that matches selectedMenuId */
    get isSelected() {
        if (!this.menu)
            return false;
        const matchesId = this.menu.menuId === this.selectedMenuId;
        if (!matchesId)
            return false;
        const children = this.menu.child ?? [];
        const hasChildren = children.length > 0;
        // keep selection only on "leaf" items (same rule as flattenNavigableMenus)
        const isLeaf = +this.menu.menuTypeId === 3 && (!hasChildren || this.menu.visibility === 'no-child');
        return isLeaf;
    }
    ngOnChanges(changes) {
        // whenever selectedMenuId changes, scroll the selected item into view
        if (changes['selectedMenuId'] && this.isSelected && this.menuItemRef) {
            this.menuItemRef.nativeElement.scrollIntoView({
                block: 'nearest',
                behavior: 'smooth',
            });
        }
    }
    click() {
        if (!this.menu)
            return;
        if (this.menu.visibility !== 'no-child') {
            if (this.menu.visibility === 'expanded') {
                this.menu.visibility = 'collapsed';
            }
            else {
                this.menu.visibility = 'expanded';
            }
        }
        else {
            this.clicked.emit(this.menu);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IHMenu, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.16", type: IHMenu, isStandalone: true, selector: "ih-menu", inputs: { menu: "menu", selectedMenuId: "selectedMenuId", filter: "filter" }, outputs: { clicked: "clicked" }, host: { properties: { "class.hidden": "this.isHidden" } }, viewQueries: [{ propertyName: "menuItemRef", first: true, predicate: ["menuItem"], descendants: true }, { propertyName: "menus", predicate: IHMenu, descendants: true }], usesOnChanges: true, ngImport: i0, template: `
    @if (menu) {
      @let hasChild = !!menu.child?.length;
      <li
        [class.is-module]="menu.menuTypeId === 2"
        [ngClass]="+menu.menuTypeId === 2 ? menu.visibility : ''"
      >
        @if (+menu.menuTypeId === 2) {
          <small [innerHTML]="menu.menuName | highlightSearch: filter"></small>
        } @else if (+menu.menuTypeId === 3) {
          @if (hasChild) {
            <!-- group with children -->
            <div (click)="click()">
              @if (menu.level > 0) {
                @for (i of [].constructor(menu.level); track i) {
                  <span></span>
                }
              }
              <i [class]="menu.icon"></i>
              <h6 [innerHTML]="menu.menuName | highlightSearch: filter"></h6>
              <i
                [ngClass]="menu.visibility === 'expanded' ? 'fas fa-angle-up' : 'fas fa-angle-down'"
              ></i>
            </div>
          } @else {
            <!-- leaf items: add #menuItem and is-selected -->
            @if (menu.applicationCode === 'INS5') {
              <a #menuItem [class.is-selected]="isSelected" [routerLink]="menu.route">
                @if (menu.level > 0) {
                  @for (i of [].constructor(menu.level); track i) {
                    <span></span>
                  }
                }
                <i [class]="menu.icon"></i>
                <h6 [innerHTML]="menu.menuName | highlightSearch: filter"></h6>
              </a>
            } @else {
              <a #menuItem [class.is-selected]="isSelected" [href]="menu.applicationUrl">
                @if (menu.level > 0) {
                  @for (i of [].constructor(menu.level); track i) {
                    <span></span>
                  }
                }
                <i [class]="menu.icon"></i>
                <h6 [innerHTML]="menu.menuName | highlightSearch: filter"></h6>
              </a>
            }
          }
        }

        @if (hasChild) {
          <ul [ngClass]="menu.menuTypeId === 3 ? menu.visibility : ''">
            @for (m of menu.child; track m.menuId) {
              <ih-menu [filter]="filter" [menu]="m" [selectedMenuId]="selectedMenuId" />
            }
          </ul>
        }
      </li>
    }
  `, isInline: true, dependencies: [{ kind: "component", type: IHMenu, selector: "ih-menu", inputs: ["menu", "selectedMenuId", "filter"], outputs: ["clicked"] }, { kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: IHighlightSearchPipe, name: "highlightSearch" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IHMenu, decorators: [{
            type: Component,
            args: [{
                    selector: 'ih-menu',
                    imports: [NgClass, RouterLink, IHighlightSearchPipe],
                    template: `
    @if (menu) {
      @let hasChild = !!menu.child?.length;
      <li
        [class.is-module]="menu.menuTypeId === 2"
        [ngClass]="+menu.menuTypeId === 2 ? menu.visibility : ''"
      >
        @if (+menu.menuTypeId === 2) {
          <small [innerHTML]="menu.menuName | highlightSearch: filter"></small>
        } @else if (+menu.menuTypeId === 3) {
          @if (hasChild) {
            <!-- group with children -->
            <div (click)="click()">
              @if (menu.level > 0) {
                @for (i of [].constructor(menu.level); track i) {
                  <span></span>
                }
              }
              <i [class]="menu.icon"></i>
              <h6 [innerHTML]="menu.menuName | highlightSearch: filter"></h6>
              <i
                [ngClass]="menu.visibility === 'expanded' ? 'fas fa-angle-up' : 'fas fa-angle-down'"
              ></i>
            </div>
          } @else {
            <!-- leaf items: add #menuItem and is-selected -->
            @if (menu.applicationCode === 'INS5') {
              <a #menuItem [class.is-selected]="isSelected" [routerLink]="menu.route">
                @if (menu.level > 0) {
                  @for (i of [].constructor(menu.level); track i) {
                    <span></span>
                  }
                }
                <i [class]="menu.icon"></i>
                <h6 [innerHTML]="menu.menuName | highlightSearch: filter"></h6>
              </a>
            } @else {
              <a #menuItem [class.is-selected]="isSelected" [href]="menu.applicationUrl">
                @if (menu.level > 0) {
                  @for (i of [].constructor(menu.level); track i) {
                    <span></span>
                  }
                }
                <i [class]="menu.icon"></i>
                <h6 [innerHTML]="menu.menuName | highlightSearch: filter"></h6>
              </a>
            }
          }
        }

        @if (hasChild) {
          <ul [ngClass]="menu.menuTypeId === 3 ? menu.visibility : ''">
            @for (m of menu.child; track m.menuId) {
              <ih-menu [filter]="filter" [menu]="m" [selectedMenuId]="selectedMenuId" />
            }
          </ul>
        }
      </li>
    }
  `,
                }]
        }], propDecorators: { menu: [{
                type: Input
            }], selectedMenuId: [{
                type: Input
            }], filter: [{
                type: Input
            }], clicked: [{
                type: Output
            }], menus: [{
                type: ViewChildren,
                args: [IHMenu]
            }], menuItemRef: [{
                type: ViewChild,
                args: ['menuItem', { static: false }]
            }], isHidden: [{
                type: HostBinding,
                args: ['class.hidden']
            }] } });
/* =========================================================
 * IHSidebar (unchanged)
 * ========================================================= */
class IHSidebar {
    router = inject(Router);
    /* ---------------------------
     * INPUTS (from parent)
     * --------------------------- */
    user$;
    menusInput$;
    visible = true;
    footerText = 'Insight Local';
    /* ---------------------------
     * INTERNAL STREAMS / STATE
     * --------------------------- */
    menus$;
    queryParams = {};
    menuSearch = new FormControl('');
    menuFilter = signal('', ...(ngDevMode ? [{ debugName: "menuFilter" }] : []));
    keyboardNavActive = signal(false, ...(ngDevMode ? [{ debugName: "keyboardNavActive" }] : []));
    selectedIndex = signal(null, ...(ngDevMode ? [{ debugName: "selectedIndex" }] : []));
    selectedMenuId = signal(null, ...(ngDevMode ? [{ debugName: "selectedMenuId" }] : []));
    navigableMenus = [];
    originalMenus$;
    get sidebarVisibility() {
        return !this.visible;
    }
    ngOnInit() {
        const searchParams = new URLSearchParams(window.location.search);
        const initialQueryParams = {};
        searchParams.forEach((value, key) => {
            initialQueryParams[key] = value;
        });
        this.queryParams = initialQueryParams;
        const initialFilter = this.queryParams['menu-filter'] ?? '';
        this.menuFilter.set(initialFilter);
        this.menuSearch.setValue(initialFilter, { emitEvent: false });
        this.originalMenus$ = (this.menusInput$ ?? new Observable()).pipe(shareReplay(1));
        this.buildMenusStream();
    }
    ngOnChanges(changes) {
        if (changes['menusInput$'] && !changes['menusInput$'].firstChange) {
            this.originalMenus$ = (this.menusInput$ ?? new Observable()).pipe(shareReplay(1));
            this.buildMenusStream();
        }
    }
    buildMenusStream() {
        let firstEmission = true;
        const filter$ = this.menuSearch.valueChanges.pipe(startWith(this.menuSearch.value ?? ''), map((v) => (v ?? '').trim()), tap((term) => {
            this.menuFilter.set(term);
            if (firstEmission) {
                firstEmission = false;
                return;
            }
            this.updateUrl();
        }));
        this.menus$ = combineLatest([this.originalMenus$, filter$]).pipe(map(([menus, term]) => this.filterMenuTree(menus, term)), tap((filteredMenus) => this.updateNavigableMenus(filteredMenus)), shareReplay(1));
    }
    filterMenuTree(menus, rawTerm) {
        const term = (rawTerm ?? '').trim().toLowerCase();
        if (!term)
            return menus;
        const filtered = [];
        for (const menu of menus) {
            const result = this.filterMenuBranch(menu, term);
            if (result)
                filtered.push(result);
        }
        return filtered;
    }
    filterMenuBranch(menu, term) {
        const name = (menu.menuName ?? '').toLowerCase();
        const selfMatches = name.includes(term);
        const originalChildren = menu.child ?? [];
        const filteredChildren = [];
        for (const child of originalChildren) {
            const childResult = this.filterMenuBranch(child, term);
            if (childResult)
                filteredChildren.push(childResult);
        }
        const childMatches = filteredChildren.length > 0;
        if (!selfMatches && !childMatches) {
            return null;
        }
        const childrenToUse = selfMatches ? originalChildren : filteredChildren;
        const cloned = {
            ...menu,
            child: childrenToUse,
        };
        if (+cloned.menuTypeId === 3 && (selfMatches || childMatches)) {
            cloned.visibility = 'expanded';
        }
        return cloned;
    }
    updateNavigableMenus(filteredMenus) {
        this.navigableMenus = this.flattenNavigableMenus(filteredMenus);
        const hasFilter = !!this.menuFilter().trim();
        if (!this.navigableMenus.length || !hasFilter) {
            this.keyboardNavActive.set(false);
            this.selectedIndex.set(null);
            this.selectedMenuId.set(null);
            return;
        }
        if (this.keyboardNavActive()) {
            const maxIndex = this.navigableMenus.length - 1;
            let idx = this.selectedIndex();
            if (idx === null || idx < 0 || idx > maxIndex)
                idx = 0;
            this.selectedIndex.set(idx);
            this.selectedMenuId.set(this.navigableMenus[idx].menuId);
        }
        else {
            this.selectedIndex.set(null);
            this.selectedMenuId.set(null);
        }
    }
    flattenNavigableMenus(menus) {
        const result = [];
        const visit = (menu) => {
            const children = menu.child ?? [];
            const hasChildren = children.length > 0;
            const isLeafMenu = +menu.menuTypeId === 3 && (!hasChildren || menu.visibility === 'no-child');
            if (isLeafMenu)
                result.push(menu);
            for (const child of children)
                visit(child);
        };
        for (const m of menus)
            visit(m);
        return result;
    }
    onSearchKeyDown(event) {
        if (!this.navigableMenus.length)
            return;
        const hasFilter = !!this.menuFilter().trim();
        if (!hasFilter)
            return;
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            this.ensureKeyboardNavActive(1);
        }
        else if (event.key === 'ArrowUp') {
            event.preventDefault();
            this.ensureKeyboardNavActive(-1);
        }
        else if (event.key === 'Enter') {
            if (!this.keyboardNavActive())
                return;
            event.preventDefault();
            this.activateSelected();
        }
    }
    ensureKeyboardNavActive(delta) {
        if (!this.navigableMenus.length)
            return;
        if (!this.keyboardNavActive()) {
            this.keyboardNavActive.set(true);
            if (delta >= 0) {
                this.selectedIndex.set(0);
                this.selectedMenuId.set(this.navigableMenus[0].menuId);
            }
            else {
                const lastIdx = this.navigableMenus.length - 1;
                this.selectedIndex.set(lastIdx);
                this.selectedMenuId.set(this.navigableMenus[lastIdx].menuId);
            }
            return;
        }
        this.moveSelection(delta);
    }
    moveSelection(delta) {
        const current = this.selectedIndex();
        if (current === null)
            return;
        const maxIndex = this.navigableMenus.length - 1;
        let next = current + delta;
        if (next < 0)
            next = maxIndex;
        else if (next > maxIndex)
            next = 0;
        this.selectedIndex.set(next);
        this.selectedMenuId.set(this.navigableMenus[next].menuId);
    }
    activateSelected() {
        const idx = this.selectedIndex();
        if (idx === null || idx < 0 || idx >= this.navigableMenus.length)
            return;
        const menu = this.navigableMenus[idx];
        this.navigateToMenu(menu);
    }
    navigateToMenu(menu) {
        if (menu.applicationCode === 'INS5' && menu.route) {
            this.router.navigate([menu.route]);
        }
        else if (menu.applicationUrl) {
            window.location.href = menu.applicationUrl;
        }
    }
    updateUrl() {
        const queryParams = { ...this.queryParams };
        const currentFilter = this.menuFilter().trim();
        if (currentFilter)
            queryParams['menu-filter'] = currentFilter;
        else
            delete queryParams['menu-filter'];
        this.router.navigate([], {
            queryParams,
            queryParamsHandling: 'replace',
        });
        this.queryParams = queryParams;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IHSidebar, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.16", type: IHSidebar, isStandalone: true, selector: "ih-sidebar", inputs: { user$: "user$", menusInput$: "menusInput$", visible: "visible", footerText: "footerText" }, host: { properties: { "class.hidden": "this.sidebarVisibility" } }, usesOnChanges: true, ngImport: i0, template: `
    @let user = user$ | async;
    <div class="ih-sidebar-header">
      @if (user) {
        <div class="user-image">
          <img alt="User Image" [src]="user.userImagePath" />
        </div>
        <div class="user-info">
          <small class="text-subtle">{{ user.employeeCode }}</small>
          <h6>{{ user.fullName }}</h6>
        </div>
      }
    </div>

    <div class="ih-sidebar-search">
      <input
        class="form-control"
        placeholder="Search Menu.."
        [formControl]="menuSearch"
        (keydown)="onSearchKeyDown($event)"
      />
    </div>

    <div class="ih-sidebar-body scroll scroll-y">
      @let menus = menus$ | async;
      <ul>
        @for (m of menus; track m.menuId) {
          <ih-menu [filter]="menuFilter()" [menu]="m" [selectedMenuId]="selectedMenuId()" />
        }
      </ul>
    </div>

    <div class="ih-sidebar-footer">
      <small>{{ footerText }}</small>
    </div>
  `, isInline: true, dependencies: [{ kind: "component", type: IHMenu, selector: "ih-menu", inputs: ["menu", "selectedMenuId", "filter"], outputs: ["clicked"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "pipe", type: AsyncPipe, name: "async" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IHSidebar, decorators: [{
            type: Component,
            args: [{
                    selector: 'ih-sidebar',
                    imports: [AsyncPipe, IHMenu, ReactiveFormsModule],
                    template: `
    @let user = user$ | async;
    <div class="ih-sidebar-header">
      @if (user) {
        <div class="user-image">
          <img alt="User Image" [src]="user.userImagePath" />
        </div>
        <div class="user-info">
          <small class="text-subtle">{{ user.employeeCode }}</small>
          <h6>{{ user.fullName }}</h6>
        </div>
      }
    </div>

    <div class="ih-sidebar-search">
      <input
        class="form-control"
        placeholder="Search Menu.."
        [formControl]="menuSearch"
        (keydown)="onSearchKeyDown($event)"
      />
    </div>

    <div class="ih-sidebar-body scroll scroll-y">
      @let menus = menus$ | async;
      <ul>
        @for (m of menus; track m.menuId) {
          <ih-menu [filter]="menuFilter()" [menu]="m" [selectedMenuId]="selectedMenuId()" />
        }
      </ul>
    </div>

    <div class="ih-sidebar-footer">
      <small>{{ footerText }}</small>
    </div>
  `,
                }]
        }], propDecorators: { user$: [{
                type: Input
            }], menusInput$: [{
                type: Input
            }], visible: [{
                type: Input
            }], footerText: [{
                type: Input
            }], sidebarVisibility: [{
                type: HostBinding,
                args: ['class.hidden']
            }] } });

class IPill {
    size = 'md';
    variant = 'default';
    disabled = false;
    /** show close button */
    closable = false;
    onClose = new EventEmitter();
    onClick = new EventEmitter();
    // base class for the "i-pill, .i-pill" selector group
    baseClass = true;
    // attribute hooks (like your button)
    get attrSize() {
        return this.size;
    }
    get attrVariant() {
        return this.variant;
    }
    // disabled hook (like your button)
    get ariaDisabled() {
        return this.disabled ? 'true' : null;
    }
    handleHostClick(e) {
        if (this.disabled) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        const target = e.target;
        if (target?.closest?.('.i-pill__close'))
            return;
        this.onClick.emit(e);
    }
    handleClose(e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.disabled)
            return;
        this.onClose.emit(e);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IPill, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.16", type: IPill, isStandalone: true, selector: "i-pill", inputs: { size: "size", variant: "variant", disabled: ["disabled", "disabled", booleanAttribute], closable: ["closable", "closable", booleanAttribute] }, outputs: { onClose: "onClose", onClick: "onClick" }, host: { listeners: { "click": "handleHostClick($event)" }, properties: { "class.i-pill": "this.baseClass", "attr.size": "this.attrSize", "attr.variant": "this.attrVariant", "attr.aria-disabled": "this.ariaDisabled" } }, ngImport: i0, template: `
    <span class="i-pill__content">
      <ng-content />
    </span>

    @if (closable) {
      <button
        aria-label="Close"
        class="i-pill__close"
        type="button"
        [disabled]="disabled"
        (click)="handleClose($event)"
      >
        ×
      </button>
    }
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IPill, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-pill',
                    standalone: true,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <span class="i-pill__content">
      <ng-content />
    </span>

    @if (closable) {
      <button
        aria-label="Close"
        class="i-pill__close"
        type="button"
        [disabled]="disabled"
        (click)="handleClose($event)"
      >
        ×
      </button>
    }
  `,
                }]
        }], propDecorators: { size: [{
                type: Input
            }], variant: [{
                type: Input
            }], disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], closable: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], onClose: [{
                type: Output
            }], onClick: [{
                type: Output
            }], baseClass: [{
                type: HostBinding,
                args: ['class.i-pill']
            }], attrSize: [{
                type: HostBinding,
                args: ['attr.size']
            }], attrVariant: [{
                type: HostBinding,
                args: ['attr.variant']
            }], ariaDisabled: [{
                type: HostBinding,
                args: ['attr.aria-disabled']
            }], handleHostClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });

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
class ISection {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ISection, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: ISection, isStandalone: true, selector: "i-section", ngImport: i0, template: `<ng-content />`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ISection, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-section',
                    imports: [],
                    template: `<ng-content />`,
                }]
        }] });
class ISectionHeader {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ISectionHeader, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: ISectionHeader, isStandalone: true, selector: "i-section-header", ngImport: i0, template: `<h4><ng-content /></h4>`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ISectionHeader, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-section-header',
                    imports: [],
                    template: `<h4><ng-content /></h4>`,
                }]
        }] });
class ISectionSubHeader {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ISectionSubHeader, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: ISectionSubHeader, isStandalone: true, selector: "i-section-sub-header", ngImport: i0, template: `<h6><ng-content /></h6>`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ISectionSubHeader, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-section-sub-header',
                    imports: [],
                    template: `<h6><ng-content /></h6>`,
                }]
        }] });
class ISectionFilter {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ISectionFilter, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: ISectionFilter, isStandalone: true, selector: "i-section-filter", ngImport: i0, template: `<ng-content />`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ISectionFilter, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-section-filter',
                    imports: [],
                    template: `<ng-content />`,
                }]
        }] });
class ISectionBody {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ISectionBody, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: ISectionBody, isStandalone: true, selector: "i-section-body", ngImport: i0, template: `<ng-content />`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ISectionBody, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-section-body',
                    imports: [],
                    template: `<ng-content />`,
                }]
        }] });
class ISectionFooter {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ISectionFooter, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: ISectionFooter, isStandalone: true, selector: "i-section-footer", ngImport: i0, template: `<ng-content />`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ISectionFooter, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-section-footer',
                    imports: [],
                    template: `<ng-content />`,
                }]
        }] });
/**
 * ISection Tabs
 *
 * Badge rules:
 * - badge / badge="true" / badge="" => red dot
 * - badge="3" => red dot with number 3
 */
function isTruthyAttr(v) {
    if (v === null || v === undefined)
        return false;
    const s = String(v).trim().toLowerCase();
    if (s === 'false' || s === '0' || s === 'null' || s === 'undefined')
        return false;
    return true;
}
function parseBadge(v) {
    if (!isTruthyAttr(v))
        return { enabled: false, value: null };
    const s = String(v).trim();
    if (s === '' || s.toLowerCase() === 'true')
        return { enabled: true, value: null };
    const n = Number(s);
    if (Number.isFinite(n) && Number.isInteger(n) && n >= 0) {
        return { enabled: true, value: n };
    }
    return { enabled: true, value: null };
}
function parseTabsHeight(v) {
    // null => wrap (default)
    if (v === null || v === undefined)
        return null;
    const s = String(v).trim().toLowerCase();
    if (s === '' || s === 'wrap' || s === 'auto')
        return null;
    // allow "300", "300px"
    if (s.endsWith('px')) {
        const n = Number(s.slice(0, -2).trim());
        return Number.isFinite(n) && n > 0 ? n : null;
    }
    const n = Number(s);
    return Number.isFinite(n) && n > 0 ? n : null;
}
class ISectionTabHeader {
    tpl;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ISectionTabHeader, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: ISectionTabHeader, isStandalone: true, selector: "i-section-tab-header", viewQueries: [{ propertyName: "tpl", first: true, predicate: ["tpl"], descendants: true, static: true }], ngImport: i0, template: `
    <ng-template #tpl>
      <ng-content />
    </ng-template>
  `, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ISectionTabHeader, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-section-tab-header',
                    standalone: true,
                    template: `
    <ng-template #tpl>
      <ng-content />
    </ng-template>
  `,
                }]
        }], propDecorators: { tpl: [{
                type: ViewChild,
                args: ['tpl', { static: true }]
            }] } });
class ISectionTabContent {
    tpl;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ISectionTabContent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: ISectionTabContent, isStandalone: true, selector: "i-section-tab-content", viewQueries: [{ propertyName: "tpl", first: true, predicate: ["tpl"], descendants: true, static: true }], ngImport: i0, template: `
    <ng-template #tpl>
      <ng-content />
    </ng-template>
  `, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ISectionTabContent, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-section-tab-content',
                    standalone: true,
                    template: `
    <ng-template #tpl>
      <ng-content />
    </ng-template>
  `,
                }]
        }], propDecorators: { tpl: [{
                type: ViewChild,
                args: ['tpl', { static: true }]
            }] } });
class ISectionTab {
    title = '';
    opened = false;
    set badge(v) {
        const parsed = parseBadge(v);
        this._badgeEnabled = parsed.enabled;
        this._badgeValue = parsed.value;
    }
    get badge() {
        return this._badgeEnabled ? (this._badgeValue ?? true) : null;
    }
    _badgeEnabled = false;
    _badgeValue = null;
    headerCmp;
    contentCmp;
    defaultHeaderTpl;
    defaultContentTpl;
    headerTpl;
    contentTpl;
    _active = false;
    ngAfterContentInit() {
        this.headerTpl = this.headerCmp?.tpl ?? this.defaultHeaderTpl;
        this.contentTpl = this.contentCmp?.tpl ?? this.defaultContentTpl;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ISectionTab, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.16", type: ISectionTab, isStandalone: true, selector: "i-section-tab", inputs: { title: "title", opened: ["opened", "opened", (v) => v !== null && `${v}` !== 'false'], badge: "badge" }, queries: [{ propertyName: "headerCmp", first: true, predicate: ISectionTabHeader, descendants: true }, { propertyName: "contentCmp", first: true, predicate: ISectionTabContent, descendants: true }], viewQueries: [{ propertyName: "defaultHeaderTpl", first: true, predicate: ["defaultHeaderTpl"], descendants: true, static: true }, { propertyName: "defaultContentTpl", first: true, predicate: ["defaultContentTpl"], descendants: true, static: true }], ngImport: i0, template: `
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
  `, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ISectionTab, decorators: [{
            type: Component,
            args: [{
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
                }]
        }], propDecorators: { title: [{
                type: Input
            }], opened: [{
                type: Input,
                args: [{ transform: (v) => v !== null && `${v}` !== 'false' }]
            }], badge: [{
                type: Input
            }], headerCmp: [{
                type: ContentChild,
                args: [ISectionTabHeader]
            }], contentCmp: [{
                type: ContentChild,
                args: [ISectionTabContent]
            }], defaultHeaderTpl: [{
                type: ViewChild,
                args: ['defaultHeaderTpl', { static: true }]
            }], defaultContentTpl: [{
                type: ViewChild,
                args: ['defaultContentTpl', { static: true }]
            }] } });
class ISectionTabs {
    tabs;
    /** optional controlled mode */
    selectedIndex = null;
    /** ✅ standardized output name (Angular + React parity) */
    onSelectedIndexChange = new EventEmitter();
    /**
     * height:
     * - "wrap" (default) => content height depends on each tab
     * - "300" / 300 / "300px" => fixed content height (px) + internal scroll
     */
    set height(v) {
        this._contentHeightPx = parseTabsHeight(v);
        this.cdr.markForCheck();
    }
    get height() {
        return this._contentHeightPx ?? 'wrap';
    }
    _contentHeightPx = null;
    get contentHeightPx() {
        return this._contentHeightPx;
    }
    get isFixedHeight() {
        return this._contentHeightPx !== null;
    }
    tabsArr = [];
    activeIndex = 0;
    cdr = inject(ChangeDetectorRef);
    get activeTab() {
        return this.tabsArr[this.activeIndex] ?? null;
    }
    ngAfterContentInit() {
        const sync = () => {
            this.tabsArr = this.tabs?.toArray() ?? [];
            let nextIndex = 0;
            if (this.selectedIndex !== null && this.isValidIndex(this.selectedIndex)) {
                nextIndex = this.selectedIndex;
            }
            else {
                const openedIndex = this.tabsArr.findIndex((t) => t.opened);
                nextIndex = openedIndex >= 0 ? openedIndex : 0;
            }
            this.setActive(nextIndex, false);
            this.cdr.markForCheck();
        };
        sync();
        this.tabs.changes.subscribe(() => sync());
    }
    activate(index) {
        this.setActive(index, true);
        this.cdr.markForCheck();
    }
    activateByTab(tab) {
        const index = this.tabsArr.indexOf(tab);
        this.activate(index);
    }
    setActive(index, emit) {
        if (!this.isValidIndex(index))
            return;
        this.activeIndex = index;
        this.tabsArr.forEach((t, i) => (t._active = i === index));
        if (emit) {
            this.onSelectedIndexChange.emit(index);
        }
    }
    isValidIndex(index) {
        return Number.isInteger(index) && index >= 0 && index < this.tabsArr.length;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ISectionTabs, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.16", type: ISectionTabs, isStandalone: true, selector: "i-section-tabs", inputs: { selectedIndex: "selectedIndex", height: "height" }, outputs: { onSelectedIndexChange: "onSelectedIndexChange" }, queries: [{ propertyName: "tabs", predicate: ISectionTab }], ngImport: i0, template: `
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
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ISectionTabs, decorators: [{
            type: Component,
            args: [{
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
                }]
        }], propDecorators: { tabs: [{
                type: ContentChildren,
                args: [ISectionTab]
            }], selectedIndex: [{
                type: Input
            }], onSelectedIndexChange: [{
                type: Output
            }], height: [{
                type: Input
            }] } });
class ISectionModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ISectionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.16", ngImport: i0, type: ISectionModule, imports: [ISection, ISectionHeader, ISectionSubHeader, ISectionFilter, ISectionBody, ISectionFooter, ISectionTabs, ISectionTab, ISectionTabHeader, ISectionTabContent], exports: [ISection, ISectionHeader, ISectionSubHeader, ISectionFilter, ISectionBody, ISectionFooter, ISectionTabs, ISectionTab, ISectionTabHeader, ISectionTabContent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ISectionModule, imports: [ISectionTabs] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: ISectionModule, decorators: [{
            type: NgModule,
            args: [{
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
                }]
        }] });

const INTERACTIVE_SELECTOR_PARTS = [
    'a',
    'button',
    'input',
    'textarea',
    'select',
    'label',
    '[role="button"]',
    '[role="link"]',
    '[role="switch"]',
    '[contenteditable="true"]',
    '[tabindex]:not([tabindex="-1"])',
];
const INTERACTIVE_SELECTOR = INTERACTIVE_SELECTOR_PARTS.join(',');
class IToggle {
    disabled = false;
    /** put label left or right */
    labelPosition = 'right';
    checked = false;
    onChange = new EventEmitter();
    onTouched = new EventEmitter();
    inputRef;
    baseClass = true;
    get activeClass() {
        return this.checked;
    }
    get disabledClass() {
        return this.disabled;
    }
    get labelLeftClass() {
        return this.labelPosition === 'left';
    }
    cvaOnChange = () => {
        /*  */
    };
    cvaOnTouched = () => {
        /*  */
    };
    writeValue(value) {
        this.checked = !!value;
        // keep native input in sync if already available
        if (this.inputRef)
            this.inputRef.nativeElement.checked = this.checked;
    }
    registerOnChange(fn) {
        this.cvaOnChange = fn;
    }
    registerOnTouched(fn) {
        this.cvaOnTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        if (this.inputRef)
            this.inputRef.nativeElement.disabled = isDisabled;
    }
    handleNativeChange(e) {
        if (this.disabled)
            return;
        const input = e.target;
        const next = !!input.checked;
        this.checked = next;
        this.cvaOnChange(next);
        this.onChange.emit(next);
    }
    handleBlur() {
        this.cvaOnTouched();
        this.onTouched.emit();
    }
    isInteractiveElement(el) {
        if (!el)
            return false;
        const tag = el.tagName.toLowerCase();
        if (tag === 'a' ||
            tag === 'button' ||
            tag === 'input' ||
            tag === 'textarea' ||
            tag === 'select' ||
            tag === 'label')
            return true;
        const role = el.getAttribute('role');
        if (role === 'button' || role === 'link' || role === 'switch')
            return true;
        if (el.isContentEditable)
            return true;
        const tabindex = el.getAttribute('tabindex');
        if (tabindex !== null && tabindex !== '-1')
            return true;
        return false;
    }
    onHostClick(e) {
        if (this.disabled)
            return;
        const target = e.target;
        // clicking input: let native handle
        if (target?.tagName.toLowerCase() === 'input')
            return;
        // If user clicks an interactive element inside projected content (label),
        // do not toggle the switch.
        if (target && (this.isInteractiveElement(target) || target.closest(INTERACTIVE_SELECTOR))) {
            return;
        }
        // click anywhere else (thumb/label/host) toggles input
        this.inputRef.nativeElement.click();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IToggle, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.16", type: IToggle, isStandalone: true, selector: "i-toggle", inputs: { disabled: "disabled", labelPosition: "labelPosition" }, outputs: { onChange: "onChange", onTouched: "onTouched" }, host: { listeners: { "click": "onHostClick($event)" }, properties: { "class.i-toggle": "this.baseClass", "class.i-toggle__active": "this.activeClass", "class.i-toggle__disabled": "this.disabledClass", "class.i-toggle__label-left": "this.labelLeftClass" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => IToggle),
                multi: true,
            },
        ], viewQueries: [{ propertyName: "inputRef", first: true, predicate: ["input"], descendants: true, static: true }], ngImport: i0, template: `
    <input
      #input
      class="i-toggle__input"
      type="checkbox"
      [checked]="checked"
      [disabled]="disabled"
      (blur)="handleBlur()"
      (change)="handleNativeChange($event)"
    />

    <span class="i-toggle__thumb"></span>

    <span class="i-toggle__label">
      <ng-content />
    </span>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IToggle, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-toggle',
                    standalone: true,
                    template: `
    <input
      #input
      class="i-toggle__input"
      type="checkbox"
      [checked]="checked"
      [disabled]="disabled"
      (blur)="handleBlur()"
      (change)="handleNativeChange($event)"
    />

    <span class="i-toggle__thumb"></span>

    <span class="i-toggle__label">
      <ng-content />
    </span>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => IToggle),
                            multi: true,
                        },
                    ],
                }]
        }], propDecorators: { disabled: [{
                type: Input
            }], labelPosition: [{
                type: Input
            }], onChange: [{
                type: Output
            }], onTouched: [{
                type: Output
            }], inputRef: [{
                type: ViewChild,
                args: ['input', { static: true }]
            }], baseClass: [{
                type: HostBinding,
                args: ['class.i-toggle']
            }], activeClass: [{
                type: HostBinding,
                args: ['class.i-toggle__active']
            }], disabledClass: [{
                type: HostBinding,
                args: ['class.i-toggle__disabled']
            }], labelLeftClass: [{
                type: HostBinding,
                args: ['class.i-toggle__label-left']
            }], onHostClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });

class IUI {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IUI, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.16", ngImport: i0, type: IUI, imports: [IButton,
            ICardModule,
            ICodeViewerModule,
            IDatepicker,
            IFCDatepicker,
            IDialogModule,
            IGridModule,
            IHContent,
            IHSidebar,
            IIcon,
            IInputModule,
            ILoading,
            ISectionModule,
            ISelect,
            IFCSelect,
            ITextArea,
            IFCTextArea,
            IToggle,
            IPill], exports: [IButton,
            ICardModule,
            ICodeViewerModule,
            IDatepicker,
            IFCDatepicker,
            IDialogModule,
            IGridModule,
            IHContent,
            IHSidebar,
            IIcon,
            IInputModule,
            ILoading,
            ISectionModule,
            ISelect,
            IFCSelect,
            ITextArea,
            IFCTextArea,
            IToggle,
            IPill] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IUI, imports: [ICardModule,
            ICodeViewerModule,
            IDialogModule,
            IGridModule,
            IHSidebar,
            IInputModule,
            ISectionModule, ICardModule,
            ICodeViewerModule,
            IDialogModule,
            IGridModule,
            IInputModule,
            ISectionModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.16", ngImport: i0, type: IUI, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        IButton,
                        ICardModule,
                        ICodeViewerModule,
                        IDatepicker,
                        IFCDatepicker,
                        IDialogModule,
                        IGridModule,
                        IHContent,
                        IHSidebar,
                        IIcon,
                        IInputModule,
                        ILoading,
                        ISectionModule,
                        ISelect,
                        IFCSelect,
                        ITextArea,
                        IFCTextArea,
                        IToggle,
                        IPill,
                    ],
                    exports: [
                        IButton,
                        ICardModule,
                        ICodeViewerModule,
                        IDatepicker,
                        IFCDatepicker,
                        IDialogModule,
                        IGridModule,
                        IHContent,
                        IHSidebar,
                        IIcon,
                        IInputModule,
                        ILoading,
                        ISectionModule,
                        ISelect,
                        IFCSelect,
                        ITextArea,
                        IFCTextArea,
                        IToggle,
                        IPill,
                    ],
                }]
        }] });

/*
 * Public API Surface of insight-ui
 */

/**
 * Generated bundle index. Do not edit.
 */

export { IAlert, IAlertService, IButton, ICard, ICardBody, ICardFooter, ICardImage, ICardModule, ICodeViewer, ICodeViewerModule, IConfirm, IConfirmService, IDatepicker, IDialog, IDialogCloseDirective, IDialogContainer, IDialogModule, IDialogOutlet, IDialogRef, IDialogService, IFCDatepicker, IFCInput, IFCSelect, IFCTextArea, IGrid, IGridCell, IGridCellDefDirective, IGridColumn, IGridColumnGroup, IGridCustomColumn, IGridDataSource, IGridExpandableRow, IGridHeaderCell, IGridHeaderCellDefDirective, IGridHeaderCellGroup, IGridHeaderCellGroupColumns, IGridHeaderRowDirective, IGridModule, IGridRowDefDirective, IGridRowDirective, IGridViewport, IHContent, IHMenu, IHSidebar, IHTitleBreadcrumbService, IHighlightSearchPipe, IIcon, IInput, IInputAddon, IInputMaskDirective, IInputModule, ILoading, IPaginator, IPill, ISection, ISectionBody, ISectionFilter, ISectionFooter, ISectionHeader, ISectionModule, ISectionSubHeader, ISectionTab, ISectionTabContent, ISectionTabHeader, ISectionTabs, ISelect, ISelectOptionDefDirective, ITextArea, IToggle, IUI, I_DIALOG_DATA, I_GRID_DECLARATIONS, I_ICON_NAMES, I_ICON_SIZES, isControlRequired, resolveControlErrorMessage };
//# sourceMappingURL=insight-ui.mjs.map
