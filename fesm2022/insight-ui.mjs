import * as i0 from '@angular/core';
import { Input, Component, HostBinding, EventEmitter, booleanAttribute, Output, ChangeDetectionStrategy, isDevMode, NgModule, inject, ChangeDetectorRef, ViewChild, ElementRef, HostListener, Directive, forwardRef, Pipe, TemplateRef, NgZone, ContentChild, Renderer2, InjectionToken, Injectable, Injector, ViewContainerRef, ContentChildren, signal, effect, ViewChildren, computed, makeEnvironmentProviders, APP_INITIALIZER } from '@angular/core';
import * as i1$1 from '@angular/common';
import { NgClass, NgTemplateOutlet, CommonModule, formatDate, NgComponentOutlet, NgStyle, AsyncPipe, APP_BASE_HREF } from '@angular/common';
import { RouterLink, Router, ActivatedRoute, NavigationEnd, RouterOutlet } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { firstValueFrom, Subject, BehaviorSubject, map, throwError, of, timeout, lastValueFrom, forkJoin, filter as filter$1, startWith, shareReplay as shareReplay$1, Observable, tap as tap$1, combineLatest, distinctUntilChanged } from 'rxjs';
import * as i1 from '@angular/forms';
import { Validators, NG_VALUE_ACCESSOR, NgControl, FormGroupDirective, FormBuilder, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { debounceTime, tap, map as map$1, catchError, switchMap, shareReplay, filter, take, finalize } from 'rxjs/operators';
import { toObservable } from '@angular/core/rxjs-interop';

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
    '3xs': 'i-icon-3xs',
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IIcon, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.30", type: IIcon, isStandalone: true, selector: "i-icon", inputs: { icon: "icon", size: "size" }, ngImport: i0, template: `<i [ngClass]="iconClass"></i>`, isInline: true, dependencies: [{ kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IIcon, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ILoading, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.30", type: ILoading, isStandalone: true, selector: "i-loading", inputs: { label: "label", light: "light" }, host: { properties: { "attr.light": "this.isLight" } }, ngImport: i0, template: `<div
      class="spinner-border spinner-border-sm"
      role="status"
      [class.light]="light"
    ></div>
    {{ label }}`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ILoading, decorators: [{
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
    /* ---------- BASE INPUTS ---------- */
    disabled = false;
    loading = false;
    type = 'button';
    loadingText = '';
    variant = 'primary';
    size = 'md';
    icon;
    /* ---------- ROUTER SUPPORT ---------- */
    routerLink;
    queryParams;
    fragment;
    state;
    /* ---------- HREF SUPPORT ---------- */
    href;
    target;
    rel;
    /* ---------- OUTPUT ---------- */
    onClick = new EventEmitter();
    /* ---------- DERIVED ---------- */
    get isDisabled() {
        return this.disabled || this.loading;
    }
    get computedRel() {
        if (this.target === '_blank') {
            return this.rel ?? 'noopener noreferrer';
        }
        return this.rel ?? null;
    }
    /* ---------- HOST REFLECTION (for your CSS) ---------- */
    get hostVariant() {
        return this.variant;
    }
    get hostSize() {
        return this.size;
    }
    get ariaDisabled() {
        return this.isDisabled ? 'true' : null;
    }
    get ariaBusy() {
        return this.loading ? 'true' : null;
    }
    get mode() {
        if (this.routerLink)
            return 'router';
        if (this.href)
            return 'anchor';
        return 'button';
    }
    /* ---------- CLICK ---------- */
    handleClick(event) {
        if (this.isDisabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
            return;
        }
        this.onClick.emit(event);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IButton, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.30", type: IButton, isStandalone: true, selector: "i-button", inputs: { disabled: ["disabled", "disabled", booleanAttribute], loading: ["loading", "loading", booleanAttribute], type: "type", loadingText: "loadingText", variant: "variant", size: "size", icon: "icon", routerLink: "routerLink", queryParams: "queryParams", fragment: "fragment", state: "state", href: "href", target: "target", rel: "rel" }, outputs: { onClick: "onClick" }, host: { properties: { "attr.variant": "this.hostVariant", "attr.size": "this.hostSize", "attr.aria-disabled": "this.ariaDisabled", "attr.aria-busy": "this.ariaBusy", "attr.data-mode": "this.mode" } }, ngImport: i0, template: `
    <!-- ROUTER LINK -->
    @if (routerLink) {
      <a
        class="i-button-inner"
        [attr.aria-disabled]="isDisabled ? 'true' : null"
        [attr.rel]="computedRel"
        [attr.target]="target"
        [fragment]="fragment"
        [queryParams]="queryParams"
        [routerLink]="routerLink"
        [state]="state"
        (click)="handleClick($event)"
      >
        <ng-container *ngTemplateOutlet="content" />
      </a>
    }

    <!-- HREF -->
    @else if (href) {
      <a
        class="i-button-inner"
        [attr.aria-disabled]="isDisabled ? 'true' : null"
        [attr.href]="isDisabled ? null : href"
        [attr.rel]="computedRel"
        [attr.target]="target"
        (click)="handleClick($event)"
      >
        <ng-container *ngTemplateOutlet="content" />
      </a>
    }

    <!-- BUTTON -->
    @else {
      <button
        class="i-button-inner"
        [disabled]="isDisabled"
        [type]="type"
        (click)="handleClick($event)"
      >
        <ng-container *ngTemplateOutlet="content" />
      </button>
    }

    <!-- SHARED CONTENT -->
    <ng-template #content>
      @if (loading) {
        <i-loading [label]="loadingText" [light]="variant !== 'outline'" />
      } @else {
        @if (icon) {
          <i-icon [icon]="icon" [size]="size" />
        }
        <ng-content />
      }
    </ng-template>
  `, isInline: true, dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: ILoading, selector: "i-loading", inputs: ["label", "light"] }, { kind: "component", type: IIcon, selector: "i-icon", inputs: ["icon", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IButton, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-button',
                    standalone: true,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    imports: [NgTemplateOutlet, RouterLink, ILoading, IIcon],
                    template: `
    <!-- ROUTER LINK -->
    @if (routerLink) {
      <a
        class="i-button-inner"
        [attr.aria-disabled]="isDisabled ? 'true' : null"
        [attr.rel]="computedRel"
        [attr.target]="target"
        [fragment]="fragment"
        [queryParams]="queryParams"
        [routerLink]="routerLink"
        [state]="state"
        (click)="handleClick($event)"
      >
        <ng-container *ngTemplateOutlet="content" />
      </a>
    }

    <!-- HREF -->
    @else if (href) {
      <a
        class="i-button-inner"
        [attr.aria-disabled]="isDisabled ? 'true' : null"
        [attr.href]="isDisabled ? null : href"
        [attr.rel]="computedRel"
        [attr.target]="target"
        (click)="handleClick($event)"
      >
        <ng-container *ngTemplateOutlet="content" />
      </a>
    }

    <!-- BUTTON -->
    @else {
      <button
        class="i-button-inner"
        [disabled]="isDisabled"
        [type]="type"
        (click)="handleClick($event)"
      >
        <ng-container *ngTemplateOutlet="content" />
      </button>
    }

    <!-- SHARED CONTENT -->
    <ng-template #content>
      @if (loading) {
        <i-loading [label]="loadingText" [light]="variant !== 'outline'" />
      } @else {
        @if (icon) {
          <i-icon [icon]="icon" [size]="size" />
        }
        <ng-content />
      }
    </ng-template>
  `,
                }]
        }], propDecorators: { disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
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
            }], routerLink: [{
                type: Input
            }], queryParams: [{
                type: Input
            }], fragment: [{
                type: Input
            }], state: [{
                type: Input
            }], href: [{
                type: Input
            }], target: [{
                type: Input
            }], rel: [{
                type: Input
            }], onClick: [{
                type: Output
            }], hostVariant: [{
                type: HostBinding,
                args: ['attr.variant']
            }], hostSize: [{
                type: HostBinding,
                args: ['attr.size']
            }], ariaDisabled: [{
                type: HostBinding,
                args: ['attr.aria-disabled']
            }], ariaBusy: [{
                type: HostBinding,
                args: ['attr.aria-busy']
            }], mode: [{
                type: HostBinding,
                args: ['attr.data-mode']
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
        // if (!hasHref && !hasRouter && !hasClick) {
        //   console.warn('[i-card] No action provided. Add `href`, `routerLink`, or `(onClick)`.', this);
        // }
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ICard, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.30", type: ICard, isStandalone: true, selector: "i-card", inputs: { href: "href", routerLink: "routerLink", queryParams: "queryParams", fragment: "fragment", replaceUrl: "replaceUrl", skipLocationChange: "skipLocationChange", state: "state", target: "target", rel: "rel", disabled: "disabled" }, outputs: { onClick: "onClick" }, ngImport: i0, template: `
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ICard, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ICardImage, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.30", type: ICardImage, isStandalone: true, selector: "i-card-image", inputs: { src: "src" }, ngImport: i0, template: `<img alt="card-image" [src]="src" />`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ICardImage, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ICardBody, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.30", type: ICardBody, isStandalone: true, selector: "i-card-body", ngImport: i0, template: `<ng-content />`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ICardBody, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-card-body',
                    imports: [],
                    template: `<ng-content />`,
                }]
        }] });
class ICardFooter {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ICardFooter, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.30", type: ICardFooter, isStandalone: true, selector: "i-card-footer", ngImport: i0, template: `<ng-content />`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ICardFooter, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-card-footer',
                    imports: [],
                    template: `<ng-content />`,
                }]
        }] });
class ICardModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ICardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.30", ngImport: i0, type: ICardModule, imports: [ICard, ICardBody, ICardFooter, ICardImage], exports: [ICard, ICardBody, ICardFooter, ICardImage] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ICardModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ICardModule, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ICodeViewer, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.30", type: ICodeViewer, isStandalone: true, selector: "i-code-viewer", inputs: { language: "language", file: "file", code: "code", wrap: ["wrap", "wrap", coerceBool], compact: ["compact", "compact", coerceBool], lineNumbers: ["lineNumbers", "lineNumbers", coerceBool], overlay: ["overlay", "overlay", coerceBool], showFileType: ["showFileType", "showFileType", coerceBool], copy: ["copy", "copy", coerceBool], scroll: ["scroll", "scroll", coerceBool], height: "height", highlighter: "highlighter" }, outputs: { onFileLoaded: "onFileLoaded" }, viewQueries: [{ propertyName: "projectedTpl", first: true, predicate: ["projected"], descendants: true, static: true }], ngImport: i0, template: `
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
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: IButton, selector: "i-button", inputs: ["disabled", "loading", "type", "loadingText", "variant", "size", "icon", "routerLink", "queryParams", "fragment", "state", "href", "target", "rel"], outputs: ["onClick"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ICodeViewer, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ICodeViewerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.30", ngImport: i0, type: ICodeViewerModule, imports: [ICodeViewer], exports: [ICodeViewer] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ICodeViewerModule, imports: [ICodeViewer] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ICodeViewerModule, decorators: [{
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

/* input.ts */
/**
 * IInput
 * Version: 2.0.0
 *
 * - Simple CVA text input
 * - Masking is handled by IInputMaskDirective on the inner <input>
 */
class IInputAddon {
    addon;
    get addonKind() {
        return this.addon?.type + '';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IInputAddon, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.30", type: IInputAddon, isStandalone: true, selector: "i-input-addon", inputs: { addon: "addon" }, host: { properties: { "attr.kind": "this.addonKind" } }, ngImport: i0, template: `
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
  `, isInline: true, dependencies: [{ kind: "component", type: IButton, selector: "i-button", inputs: ["disabled", "loading", "type", "loadingText", "variant", "size", "icon", "routerLink", "queryParams", "fragment", "state", "href", "target", "rel"], outputs: ["onClick"] }, { kind: "component", type: IIcon, selector: "i-icon", inputs: ["icon", "size"] }, { kind: "component", type: ILoading, selector: "i-loading", inputs: ["label", "light"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IInputAddon, decorators: [{
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
class IInputMaskDirective {
    mask;
    /**
     * When true (default), an empty input is auto-filled with today's date
     * (or current time) on init and on focus. Set to false inside components
     * that provide their own initial value (e.g. IDatepicker).
     */
    autoDefault = true;
    /** Whether initial default (today / now) has been applied */
    _defaultApplied = false;
    elRef = inject((ElementRef));
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
        if (!this.autoDefault)
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
    applyTextCaseMask(value, type) {
        if (!value)
            return value;
        if (type === 'lowercase')
            return value.toLowerCase();
        return value.toUpperCase();
    }
    // ----------------------------------------------------
    // CARET ↔ DIGIT helpers (used for smart keydown typing)
    // ----------------------------------------------------
    countDigitsBeforePos(value, pos) {
        let n = 0;
        for (let i = 0; i < Math.min(pos, value.length); i++) {
            if (/\d/.test(value[i]))
                n++;
        }
        return n;
    }
    /** caret index in formatted string after `digitCount` digits */
    caretPosAfterDigits(value, digitCount) {
        if (digitCount <= 0)
            return 0;
        let seen = 0;
        for (let i = 0; i < value.length; i++) {
            if (/\d/.test(value[i])) {
                seen++;
                if (seen === digitCount) {
                    // caret should sit AFTER this digit
                    return i + 1;
                }
            }
        }
        return value.length;
    }
    clamp(n, min, max) {
        if (n < min)
            return min;
        if (n > max)
            return max;
        return n;
    }
    clampMonth2(raw2) {
        // raw2 must be 2 digits
        let m = Number(raw2);
        if (Number.isNaN(m))
            m = 1;
        m = this.clamp(m, 1, 12);
        return String(m).padStart(2, '0');
    }
    clampDay2(raw2, month2, year4) {
        let d = Number(raw2);
        if (Number.isNaN(d))
            d = 1;
        let m = month2 ? Number(month2) : 1;
        if (Number.isNaN(m))
            m = 1;
        m = this.clamp(m, 1, 12);
        let y = year4 ? Number(year4) : 2000;
        if (Number.isNaN(y) || y <= 0)
            y = 2000;
        const maxDay = this.daysInMonth(y, m);
        d = this.clamp(d, 1, maxDay);
        return String(d).padStart(2, '0');
    }
    /**
     * Smart digit typing for DATE:
     * - never allows 3-digit day/month or 5-digit year
     * - when caret is at end of a full segment, typing "rolls" that segment:
     *   month "01" + '2' => "12" (shift + append)
     *   year "2026" + '1' => "0261" (keeps last 4)
     */
    handleDateDigitKey(el, digit) {
        const format = this.mask?.format || 'dd/MM/yyyy';
        // Ensure we work from a masked baseline (important for stable caret mapping)
        const baseline = this.applyDateMask(el.value ?? '', format);
        if (baseline !== el.value) {
            el.value = baseline;
        }
        const tokens = this.splitDateFormat(format).tokens;
        const lens = tokens.map((t) => t.length); // usually [2,2,4]
        const totalLen = lens.reduce((a, b) => a + b, 0);
        // digits-only
        const digitsOnly = (el.value ?? '').replace(/\D/g, '').slice(0, totalLen);
        const caret = el.selectionStart ?? (el.value ?? '').length;
        const digitCursor = this.countDigitsBeforePos(el.value ?? '', caret);
        // Build ranges for each token in digitsOnly
        const ranges = [];
        let acc = 0;
        for (const tok of tokens) {
            const kind = tok[0] === 'd' ? 'day' : tok[0] === 'M' ? 'month' : 'year';
            const len = tok.length;
            ranges.push({ start: acc, end: acc + len, kind });
            acc += len;
        }
        // Find active token index.
        // If caret is exactly at a token boundary, prefer the previous token (so month-end rolling works).
        let idx = ranges.findIndex((r) => digitCursor < r.end);
        if (idx === -1)
            idx = ranges.length - 1;
        // boundary case: digitCursor equals start of this token -> maybe user is at previous token end
        if (idx > 0 && digitCursor === ranges[idx].start) {
            idx = idx - 1;
        }
        const r = ranges[idx];
        const tokenLen = r.end - r.start;
        const tokenDigits = digitsOnly.slice(r.start, r.end); // may be shorter than tokenLen
        const isFull = tokenDigits.length >= tokenLen;
        // Position inside token (0..tokenLen)
        let rel = digitCursor - r.start;
        rel = this.clamp(rel, 0, tokenLen);
        let newToken = tokenDigits;
        if (!isFull) {
            // insert into token until full
            // (but still cap at tokenLen)
            newToken = (tokenDigits.slice(0, rel) + digit + tokenDigits.slice(rel)).slice(0, tokenLen);
        }
        else {
            // token is full
            if (digitCursor >= r.end) {
                // caret at token end -> rolling shift (fixes your "01" => "12" behavior)
                newToken = tokenDigits.slice(1) + digit;
            }
            else {
                // overwrite at position
                newToken =
                    tokenDigits.slice(0, rel) +
                        digit +
                        tokenDigits.slice(Math.min(rel + 1, tokenDigits.length));
                newToken = newToken.slice(0, tokenLen);
            }
        }
        // Apply clamp rules when token becomes complete
        // We need current month/year to clamp day correctly
        const monthRange = ranges.find((x) => x.kind === 'month');
        const yearRange = ranges.find((x) => x.kind === 'year');
        // Prepare a working digits string with replaced token first (before clamp)
        const before = digitsOnly.slice(0, r.start);
        const after = digitsOnly.slice(r.end);
        let nextDigits = (before + newToken + after).slice(0, totalLen);
        const month2 = monthRange
            ? nextDigits.slice(monthRange.start, monthRange.end).padEnd(2, '')
            : '';
        const year4 = yearRange ? nextDigits.slice(yearRange.start, yearRange.end).padEnd(4, '') : '';
        if (r.kind === 'month' && newToken.length === 2) {
            const clamped = this.clampMonth2(newToken);
            nextDigits = (before + clamped + after).slice(0, totalLen);
        }
        if (r.kind === 'day' && newToken.length === 2) {
            const clamped = this.clampDay2(newToken, month2.length === 2 ? month2 : undefined, year4.length === 4 ? year4 : undefined);
            nextDigits = (before + clamped + after).slice(0, totalLen);
        }
        // Year: never exceed 4 digits; rolling already enforces.
        if (r.kind === 'year') {
            // Ensure year segment is max 4
            if (yearRange) {
                const y = nextDigits.slice(yearRange.start, yearRange.end);
                const yFixed = y.slice(0, 4);
                nextDigits =
                    nextDigits.slice(0, yearRange.start) + yFixed + nextDigits.slice(yearRange.end);
                nextDigits = nextDigits.slice(0, totalLen);
            }
        }
        const masked = this.applyDateMaskDigitsOnly(nextDigits, format);
        // compute caret: if we rolled at token end, keep caret at token end (don’t jump into next token)
        const didRollAtEnd = isFull && digitCursor >= r.end;
        const nextDigitCursor = didRollAtEnd ? r.end : Math.min(totalLen, digitCursor + 1);
        el.value = masked;
        this.dispatchInputEvent();
        const nextCaret = this.caretPosAfterDigits(masked, nextDigitCursor);
        this.safeSetSelectionRange(el, nextCaret, nextCaret);
    }
    /**
     * Smart digit typing for TIME (similar behavior, keeps segments fixed-length).
     * - HH:mm       => keeps hour/min 2 digits
     * - HH:mm:ss    => keeps hour/min/sec 2 digits
     */
    handleTimeDigitKey(el, digit) {
        const format = this.mask?.format || 'HH:mm';
        const baseline = this.applyTimeMask(el.value ?? '', format);
        if (baseline !== el.value)
            el.value = baseline;
        const tokens = this.splitTimeFormat(format).tokens; // e.g. ['HH','mm'] or ['HH','mm','ss']
        const lens = tokens.map((t) => t.length); // usually [2,2,(2)]
        const totalLen = lens.reduce((a, b) => a + b, 0);
        const digitsOnly = (el.value ?? '').replace(/\D/g, '').slice(0, totalLen);
        const caret = el.selectionStart ?? (el.value ?? '').length;
        const digitCursor = this.countDigitsBeforePos(el.value ?? '', caret);
        const ranges = [];
        let acc = 0;
        for (const tok of tokens) {
            const kind = tok[0] === 'H' ? 'hour' : tok[0] === 'm' ? 'minute' : 'second';
            const len = tok.length;
            ranges.push({ start: acc, end: acc + len, kind });
            acc += len;
        }
        let idx = ranges.findIndex((r) => digitCursor < r.end);
        if (idx === -1)
            idx = ranges.length - 1;
        if (idx > 0 && digitCursor === ranges[idx].start)
            idx = idx - 1;
        const r = ranges[idx];
        const tokenLen = r.end - r.start;
        const tokenDigits = digitsOnly.slice(r.start, r.end);
        const isFull = tokenDigits.length >= tokenLen;
        let rel = digitCursor - r.start;
        rel = this.clamp(rel, 0, tokenLen);
        let newToken = tokenDigits;
        if (!isFull) {
            newToken = (tokenDigits.slice(0, rel) + digit + tokenDigits.slice(rel)).slice(0, tokenLen);
        }
        else {
            if (digitCursor >= r.end) {
                newToken = tokenDigits.slice(1) + digit; // rolling shift
            }
            else {
                newToken =
                    tokenDigits.slice(0, rel) +
                        digit +
                        tokenDigits.slice(Math.min(rel + 1, tokenDigits.length));
                newToken = newToken.slice(0, tokenLen);
            }
        }
        // clamp segment when complete
        const clamp2 = (v2, max) => {
            let n = Number(v2);
            if (Number.isNaN(n))
                n = 0;
            n = this.clamp(n, 0, max);
            return String(n).padStart(2, '0');
        };
        const before = digitsOnly.slice(0, r.start);
        const after = digitsOnly.slice(r.end);
        if (newToken.length === 2) {
            if (r.kind === 'hour')
                newToken = clamp2(newToken, 23);
            else
                newToken = clamp2(newToken, 59);
        }
        const nextDigits = (before + newToken + after).slice(0, totalLen);
        const masked = this.applyTimeMaskDigitsOnly(nextDigits, format);
        const didRollAtEnd = isFull && digitCursor >= r.end;
        const nextDigitCursor = didRollAtEnd ? r.end : Math.min(totalLen, digitCursor + 1);
        el.value = masked;
        this.dispatchInputEvent();
        const nextCaret = this.caretPosAfterDigits(masked, nextDigitCursor);
        this.safeSetSelectionRange(el, nextCaret, nextCaret);
    }
    normalizePastedDate(raw, format) {
        if (!raw)
            return '';
        const nums = raw.match(/\d+/g) ?? [];
        if (!nums.length)
            return '';
        const { tokens } = this.splitDateFormat(format);
        let day = 1;
        let month = 1;
        let year = 2000;
        if (nums.length >= 3) {
            // ✅ make TS happy
            const a = nums[0] ?? '';
            const b = nums[1] ?? '';
            const c = nums[2] ?? '';
            const aNum = Number(a);
            const bNum = Number(b);
            const cNum = Number(c);
            if (a.length === 4) {
                // yyyy MM dd
                year = aNum;
                month = bNum;
                day = cNum;
            }
            else if (c.length === 4) {
                // dd MM yyyy
                day = aNum;
                month = bNum;
                year = cNum;
            }
            else {
                // fallback: map by format order
                const parts = [a, b, c];
                const map = {
                    d: undefined,
                    M: undefined,
                    y: undefined,
                };
                tokens.forEach((t, i) => {
                    const v = Number(parts[i] ?? '');
                    if (!Number.isNaN(v))
                        map[t[0]] = v;
                });
                if (map.d !== undefined)
                    day = map.d;
                if (map.M !== undefined)
                    month = map.M;
                if (map.y !== undefined)
                    year = map.y;
            }
        }
        else {
            // digits-only fallback: 31122026, 20260131, etc.
            const digits = nums.join('').slice(0, 8);
            if (digits.length >= 8) {
                if (format.trim().startsWith('yyyy')) {
                    year = Number(digits.slice(0, 4));
                    month = Number(digits.slice(4, 6));
                    day = Number(digits.slice(6, 8));
                }
                else {
                    day = Number(digits.slice(0, 2));
                    month = Number(digits.slice(2, 4));
                    year = Number(digits.slice(4, 8));
                }
            }
            else {
                // if user pastes something too short, just let the normal mask handle it
                return this.applyDateMask(nums.join(''), format);
            }
        }
        // Clamp + sanitize
        if (!Number.isFinite(year) || year <= 0)
            year = 2000;
        year = Math.min(year, 9999); // ✅ never 5 digits
        month = this.clamp(month, 1, 12);
        const maxDay = this.daysInMonth(year, month);
        day = this.clamp(day, 1, maxDay);
        return this.formatDateFromParts(day, month, year, format);
    }
    normalizePastedTime(raw, format) {
        if (!raw)
            return '';
        const nums = raw.match(/\d+/g) ?? [];
        if (!nums.length)
            return '';
        const digits = nums.join('');
        let hour = 0;
        let minute = 0;
        let second = 0;
        if (digits.length >= 2)
            hour = Number(digits.slice(0, 2));
        if (digits.length >= 4)
            minute = Number(digits.slice(2, 4));
        if (digits.length >= 6)
            second = Number(digits.slice(4, 6));
        hour = this.clamp(hour, 0, 23);
        minute = this.clamp(minute, 0, 59);
        second = this.clamp(second, 0, 59);
        return this.formatTimeFromParts(hour, minute, second, format);
    }
    // ----------------------------------------------------
    // HOST LISTENERS
    // ----------------------------------------------------
    onInput() {
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
        else if (type === 'lowercase' || type === 'uppercase') {
            value = this.applyTextCaseMask(value, type);
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
        if (!this.autoDefault)
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
        // Text case masks allow all characters
        if (type === 'lowercase' || type === 'uppercase') {
            return;
        }
        // Date/time: smart digit typing + allow separators
        if (type === 'date' || type === 'time') {
            const format = this.mask.format || '';
            const allowedSeps = new Set();
            for (const c of format) {
                if (!/[dMyHms]/.test(c))
                    allowedSeps.add(c);
            }
            // ✅ handle digits ourselves to prevent "31/012/2026" type inserts
            if (/\d/.test(key)) {
                event.preventDefault();
                if (type === 'date')
                    this.handleDateDigitKey(el, key);
                else
                    this.handleTimeDigitKey(el, key);
                return;
            }
            // allow separators as typed (optional; mask will normalize anyway)
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
    onPaste(event) {
        if (!this.hasMask || !this.mask)
            return;
        const el = this.nativeInput;
        if (!el)
            return;
        const text = event.clipboardData?.getData('text');
        if (!text)
            return;
        event.preventDefault();
        const type = this.mask.type;
        const format = this.mask.format;
        let next = '';
        if (type === 'date' && format) {
            next = this.normalizePastedDate(text, format);
        }
        else if (type === 'time' && format) {
            next = this.normalizePastedTime(text, format);
        }
        else if (type === 'integer') {
            next = text.replace(/\D/g, '');
        }
        else if (type === 'number' || type === 'currency') {
            next = this.applyNumericMask(text, true);
        }
        if (next !== undefined) {
            el.value = next;
            this.dispatchInputEvent();
            // caret at end after paste = expected UX
            this.safeSetSelectionRange(el, next.length, next.length);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IInputMaskDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.30", type: IInputMaskDirective, isStandalone: true, selector: "[iInputMask]", inputs: { mask: ["iInputMask", "mask"], autoDefault: "autoDefault" }, host: { listeners: { "input": "onInput()", "blur": "onBlur()", "focus": "onFocus()", "keydown": "onKeydown($event)", "paste": "onPaste($event)" } }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IInputMaskDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[iInputMask]',
                    standalone: true,
                }]
        }], propDecorators: { mask: [{
                type: Input,
                args: ['iInputMask']
            }], autoDefault: [{
                type: Input
            }], onInput: [{
                type: HostListener,
                args: ['input']
            }], onBlur: [{
                type: HostListener,
                args: ['blur']
            }], onFocus: [{
                type: HostListener,
                args: ['focus']
            }], onKeydown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }], onPaste: [{
                type: HostListener,
                args: ['paste', ['$event']]
            }] } });
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IInput, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.30", type: IInput, isStandalone: true, selector: "i-input", inputs: { type: "type", placeholder: "placeholder", autocomplete: "autocomplete", readonly: "readonly", invalid: "invalid", mask: "mask", value: "value", prepend: "prepend", append: "append", disabled: "disabled" }, host: { listeners: { "click": "handleHostClick($event)" } }, providers: [
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
    }`, isInline: true, dependencies: [{ kind: "component", type: IInputAddon, selector: "i-input-addon", inputs: ["addon"] }, { kind: "directive", type: IInputMaskDirective, selector: "[iInputMask]", inputs: ["iInputMask", "autoDefault"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IInput, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IFCInput, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.30", type: IFCInput, isStandalone: true, selector: "i-fc-input", inputs: { label: "label", placeholder: "placeholder", autocomplete: "autocomplete", readonly: "readonly", type: "type", mask: "mask", prepend: "prepend", append: "append", errorMessage: "errorMessage", value: "value" }, viewQueries: [{ propertyName: "innerInput", first: true, predicate: IInput, descendants: true }], ngImport: i0, template: `@if (label) {
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IFCInput, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IInputModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.30", ngImport: i0, type: IInputModule, imports: [IInput, IFCInput, IInputAddon, IInputMaskDirective], exports: [IInput, IFCInput, IInputAddon, IInputMaskDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IInputModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IInputModule, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IHighlightSearchPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "20.3.30", ngImport: i0, type: IHighlightSearchPipe, isStandalone: true, name: "highlightSearch" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IHighlightSearchPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'highlightSearch',
                    standalone: true,
                }]
        }] });

// select.ts (Angular)
/**
 * ISelect
 * Version: 2.2.7
 *
 * Fixes:
 * - Render options container as <i-options>
 * - Let dropdown grow from visible control width to fit option text
 * - Keep portal-to-body + fixed positioning for overflow parents
 * - Fix flicker: portal + measure + position BEFORE showing panel
 * - Fix option text being truncated too early after long-text dropdown width fix
 * - Fix dropdown not reopening after selecting an option
 * - Fix selected long value poisoning trigger measurement on next open
 * - Fix panel staying hidden when reposition callback does not reveal it
 */
class ISelectOptionDefDirective {
    template = inject(TemplateRef);
    set iSelectOption(_value) {
        // not used, needed for structural directive syntax
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ISelectOptionDefDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.30", type: ISelectOptionDefDirective, isStandalone: true, selector: "[iSelectOption]", inputs: { iSelectOption: "iSelectOption" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ISelectOptionDefDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[iSelectOption]',
                    standalone: true,
                }]
        }], propDecorators: { iSelectOption: [{
                type: Input
            }] } });
class ISelect {
    placeholder = '';
    disabled = false;
    invalid = false;
    filterDelay = 200;
    panelPosition = 'bottom left';
    portalToBody = true;
    panelOffset = 6;
    matchTriggerWidth = false;
    set options(value) {
        this._rawOptions = value ?? [];
        this.applyFilter(this.isOpen);
        this.syncModelToView();
    }
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
    set value(v) {
        this.writeValue(v);
    }
    get value() {
        return this._modelValue;
    }
    onChanged = new EventEmitter();
    onOptionSelected = new EventEmitter();
    optionDef;
    panelRef;
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
    onChange = (value) => {
        void value;
    };
    onTouched = () => {
        /* noop */
    };
    get panelPositionClass() {
        const value = (this.panelPosition || 'bottom left').trim();
        const normalized = value.replace(/\s+/g, '-');
        return `i-options--${normalized}`;
    }
    hostEl = inject(ElementRef);
    cdr = inject(ChangeDetectorRef);
    zone = inject(NgZone);
    panelPortaled = false;
    panelOriginalParent = null;
    panelOriginalNextSibling = null;
    repositionRaf = 0;
    listeningGlobal = false;
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
                if (value === null || value === undefined)
                    return '';
                value = value[segment];
            }
            return value !== null && value !== undefined ? String(value) : '';
        }
        if (!this._displayWithExplicit && row !== null && typeof row === 'object') {
            const entries = Object.entries(row);
            if (!entries.length)
                return '';
            const labelEntry = entries[1] ?? entries[0];
            const labelValue = labelEntry[1];
            return labelValue !== null && labelValue !== undefined ? String(labelValue) : '';
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
                return labelValue !== null && labelValue !== undefined
                    ? String(labelValue)
                    : String(primitive);
            }
        }
        if (typeof dw === 'function') {
            return dw(row);
        }
        return '';
    }
    handleInputText(val) {
        this._displayText = val;
        this._filterText = val;
        if (!this.isOpen) {
            this.openDropdown();
        }
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
        if (index === -1) {
            index = 0;
        }
        else {
            index = (index + delta + len) % len;
        }
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
        setTimeout(() => this.focus());
    }
    openDropdown() {
        if (this.disabled)
            return;
        if (this.isOpen)
            return;
        this.isOpen = true;
        this._filterText = '';
        this.filteredOptions = [...this._rawOptions];
        this.cdr.detectChanges();
        if (this.portalToBody) {
            this.ensurePanelPortaled();
        }
        const panel = this.getPanelElement();
        if (panel) {
            panel.style.visibility = 'hidden';
            panel.style.pointerEvents = 'none';
        }
        this.ensureGlobalListeners();
        /*
         * Important:
         * Do not rely only on an after-callback to reveal the panel.
         * repositionPanelNow() reveals the panel after positioning succeeds.
         */
        this.scheduleReposition();
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
        if (!this.isOpen)
            return;
        this.isOpen = false;
        this.highlightIndex = -1;
        this.removeGlobalListeners();
        this.restorePanelIfNeeded();
        this.cdr.detectChanges();
    }
    selectRow(row, event) {
        event?.preventDefault();
        event?.stopPropagation();
        this._modelValue = row;
        this._displayText = this.resolveDisplayText(row);
        this._filterText = '';
        this.filteredOptions = [...this._rawOptions];
        this.onChange(row);
        this.onTouched();
        const payload = {
            value: row,
            label: this._displayText,
        };
        this.onChanged.emit(payload);
        this.onOptionSelected.emit(payload);
        this.closeDropdown();
        this.cdr.markForCheck();
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
    handleKeydown(event) {
        const options = this.filteredOptions;
        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                if (!this.isOpen) {
                    this.openDropdown();
                }
                else if (options.length) {
                    this.moveHighlight(1);
                }
                break;
            case 'ArrowUp':
                event.preventDefault();
                if (!this.isOpen) {
                    this.openDropdown();
                }
                else if (options.length) {
                    this.moveHighlight(-1);
                }
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
    get appendAddon() {
        if (this.isLoading) {
            return {
                type: 'loading',
                visible: true,
            };
        }
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
        if (idx < 0 || idx >= this.filteredOptions.length) {
            this.highlightIndex = -1;
        }
        else {
            this.highlightIndex = idx;
        }
    }
    getPanelElement() {
        return this.panelRef?.nativeElement ?? null;
    }
    getAnchorRect() {
        const host = this.hostEl.nativeElement;
        const iInput = host.querySelector('i-input');
        const hostRect = host.getBoundingClientRect?.() ?? null;
        const inputRect = iInput?.getBoundingClientRect?.() ?? null;
        const rect = inputRect ?? hostRect;
        if (!rect)
            return null;
        const viewportWidth = window.innerWidth;
        const safeLeft = Math.max(0, rect.left);
        const safeRight = Math.min(viewportWidth, rect.right);
        const safeWidth = Math.max(1, safeRight - safeLeft);
        return {
            bottom: rect.bottom,
            height: rect.height,
            left: safeLeft,
            right: safeLeft + safeWidth,
            top: rect.top,
            width: safeWidth,
            x: safeLeft,
            y: rect.y,
            toJSON: () => ({}),
        };
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
        const panel = this.getPanelElement();
        if (!this.panelPortaled) {
            if (panel) {
                this.clearPanelRuntimeStyles(panel);
                panel.classList.remove('i-options--portaled');
            }
            this.panelOriginalParent = null;
            this.panelOriginalNextSibling = null;
            return;
        }
        if (!panel) {
            this.panelPortaled = false;
            this.panelOriginalParent = null;
            this.panelOriginalNextSibling = null;
            return;
        }
        this.clearPanelRuntimeStyles(panel);
        panel.classList.remove('i-options--portaled');
        const parent = this.panelOriginalParent;
        if (parent) {
            try {
                if (this.panelOriginalNextSibling && this.panelOriginalNextSibling.parentNode === parent) {
                    parent.insertBefore(panel, this.panelOriginalNextSibling);
                }
                else {
                    parent.appendChild(panel);
                }
            }
            catch {
                // Angular will clean up the view anyway.
            }
        }
        this.panelPortaled = false;
        this.panelOriginalParent = null;
        this.panelOriginalNextSibling = null;
    }
    scheduleReposition(after) {
        if (!this.isOpen)
            return;
        if (this.repositionRaf) {
            cancelAnimationFrame(this.repositionRaf);
        }
        this.zone.runOutsideAngular(() => {
            this.repositionRaf = requestAnimationFrame(() => {
                this.repositionRaf = 0;
                this.repositionPanelNow();
                after?.();
            });
        });
    }
    revealPanel(panel) {
        panel.style.visibility = 'visible';
        panel.style.pointerEvents = '';
    }
    clearPanelRuntimeStyles(panel) {
        panel.style.visibility = '';
        panel.style.pointerEvents = '';
        panel.style.position = '';
        panel.style.zIndex = '';
        panel.style.boxSizing = '';
        panel.style.overflowX = '';
        panel.style.overflowY = '';
        panel.style.width = '';
        panel.style.minWidth = '';
        panel.style.maxWidth = '';
        panel.style.maxHeight = '';
        panel.style.left = '';
        panel.style.top = '';
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
        const availableWidth = Math.max(1, vw - gap * 2);
        const computedMinWidth = Number.parseFloat(window.getComputedStyle(panel).minWidth);
        const minWidth = Number.isFinite(computedMinWidth)
            ? Math.min(computedMinWidth, availableWidth)
            : 0;
        const pos = (this.panelPosition || 'bottom left').trim().toLowerCase();
        panel.style.position = 'fixed';
        panel.style.zIndex = '2000';
        panel.style.boxSizing = 'border-box';
        panel.style.overflowX = 'clip';
        panel.style.overflowY = 'auto';
        panel.style.maxWidth = `${Math.floor(availableWidth)}px`;
        const triggerWidth = Math.min(Math.max(1, Math.round(rect.width)), availableWidth);
        if (this.matchTriggerWidth) {
            panel.style.width = `${triggerWidth}px`;
            panel.style.minWidth = `${triggerWidth}px`;
        }
        else {
            const panelMinWidth = Math.max(triggerWidth, minWidth);
            panel.style.width = 'max-content';
            panel.style.minWidth = `${Math.floor(panelMinWidth)}px`;
        }
        const panelRect = panel.getBoundingClientRect();
        const panelWidth = Math.min(Math.max(1, panelRect.width), availableWidth);
        const wantTop = pos.startsWith('top');
        const wantBottom = pos.startsWith('bottom') ||
            (!pos.startsWith('top') && !pos.startsWith('left') && !pos.startsWith('right'));
        const wantLeft = pos.includes('left') || pos === 'left';
        const wantRight = pos.includes('right') || pos === 'right';
        const alignRight = wantRight && !wantLeft;
        let left = alignRight ? rect.right - panelWidth : rect.left;
        const maxLeft = Math.max(gap, vw - panelWidth - gap);
        left = Math.min(Math.max(gap, left), maxLeft);
        if (pos === 'left') {
            left = rect.left - panelWidth - this.panelOffset;
            left = Math.min(Math.max(gap, left), maxLeft);
            const panelHeight = Math.min(panelRect.height, Math.max(60, vh - gap * 2));
            const top = Math.min(Math.max(gap, rect.top), Math.max(gap, vh - panelHeight - gap));
            panel.style.left = `${Math.round(left)}px`;
            panel.style.top = `${Math.round(top)}px`;
            const maxH = Math.max(60, vh - top - gap);
            panel.style.maxHeight = `${Math.floor(maxH)}px`;
            this.revealPanel(panel);
            return;
        }
        if (pos === 'right') {
            left = rect.right + this.panelOffset;
            left = Math.min(Math.max(gap, left), maxLeft);
            const panelHeight = Math.min(panelRect.height, Math.max(60, vh - gap * 2));
            const top = Math.min(Math.max(gap, rect.top), Math.max(gap, vh - panelHeight - gap));
            panel.style.left = `${Math.round(left)}px`;
            panel.style.top = `${Math.round(top)}px`;
            const maxH = Math.max(60, vh - top - gap);
            panel.style.maxHeight = `${Math.floor(maxH)}px`;
            this.revealPanel(panel);
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
        const panelHeight = Math.min(panelRect.height, maxH);
        const rawTop = side === 'bottom'
            ? rect.bottom + this.panelOffset
            : rect.top - panelHeight - this.panelOffset;
        const maxTop = Math.max(gap, vh - panelHeight - gap);
        const top = Math.min(Math.max(gap, rawTop), maxTop);
        panel.style.left = `${Math.round(left)}px`;
        panel.style.top = `${Math.round(top)}px`;
        this.revealPanel(panel);
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
        if (rm) {
            rm();
        }
        delete this._removeGlobal;
        this.listeningGlobal = false;
        if (this.repositionRaf) {
            cancelAnimationFrame(this.repositionRaf);
            this.repositionRaf = 0;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ISelect, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.30", type: ISelect, isStandalone: true, selector: "i-select", inputs: { placeholder: "placeholder", disabled: "disabled", invalid: "invalid", filterDelay: "filterDelay", panelPosition: "panelPosition", portalToBody: "portalToBody", panelOffset: "panelOffset", matchTriggerWidth: "matchTriggerWidth", options: "options", options$: "options$", displayWith: "displayWith", filterPredicate: "filterPredicate", value: "value" }, outputs: { onChanged: "onChanged", onOptionSelected: "onOptionSelected" }, host: { listeners: { "keydown": "handleKeydown($event)", "input": "onHostInput($event)", "document:click": "onDocumentClick($event)" } }, providers: [
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
      <i-options #panel class="i-options scroll scroll-y" [ngClass]="panelPositionClass">
        @for (row of filteredOptions; track row; let idx = $index) {
          <div
            class="i-option"
            [class.active]="highlightIndex === idx"
            [class.selected]="isRowSelected(row)"
            (mousedown)="selectRow(row, $event)"
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ISelect, decorators: [{
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
      <i-options #panel class="i-options scroll scroll-y" [ngClass]="panelPositionClass">
        @for (row of filteredOptions; track row; let idx = $index) {
          <div
            class="i-option"
            [class.active]="highlightIndex === idx"
            [class.selected]="isRowSelected(row)"
            (mousedown)="selectRow(row, $event)"
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
    panelOffset = 6;
    portalToBody = true;
    matchTriggerWidth = false;
    errorMessage;
    get value() {
        return this._value;
    }
    set value(v) {
        this._value = v ?? null;
        if (this.innerSelect) {
            this.innerSelect.writeValue(this._value);
        }
        this.cdr.markForCheck();
    }
    onChanged = new EventEmitter();
    onOptionSelected = new EventEmitter();
    _value = null;
    isDisabled = false;
    onChange = () => {
        /* noop */
    };
    onTouched = () => {
        /* noop */
    };
    ngControl = inject(NgControl, {
        self: true,
        optional: true,
    });
    formDir = inject(FormGroupDirective, {
        optional: true,
    });
    cdr = inject(ChangeDetectorRef);
    submitSub;
    constructor() {
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
    ngAfterViewInit() {
        if (this.innerSelect) {
            this.innerSelect.writeValue(this._value);
            this.innerSelect.setDisabledState(this.isDisabled);
        }
        this.cdr.markForCheck();
    }
    writeValue(v) {
        this._value = v ?? null;
        if (this.innerSelect) {
            this.innerSelect.writeValue(this._value);
        }
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
        if (this.innerSelect) {
            this.innerSelect.setDisabledState(isDisabled);
        }
        this.cdr.markForCheck();
    }
    handleSelectChange(change) {
        this._value = change.value ?? null;
        this.onChange(this._value);
        this.onTouched();
        this.onChanged.emit(change);
        this.onOptionSelected.emit(change);
    }
    focusInnerSelect() {
        if (!this.isDisabled && this.innerSelect) {
            this.innerSelect.focus();
        }
    }
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IFCSelect, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.30", type: IFCSelect, isStandalone: true, selector: "i-fc-select", inputs: { label: "label", placeholder: "placeholder", options: "options", options$: "options$", displayWith: "displayWith", filterDelay: "filterDelay", filterPredicate: "filterPredicate", panelPosition: "panelPosition", panelOffset: "panelOffset", portalToBody: "portalToBody", matchTriggerWidth: "matchTriggerWidth", errorMessage: "errorMessage", value: "value" }, outputs: { onChanged: "onChanged", onOptionSelected: "onOptionSelected" }, viewQueries: [{ propertyName: "innerSelect", first: true, predicate: ISelect, descendants: true }], ngImport: i0, template: `
    @if (label) {
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
      [matchTriggerWidth]="matchTriggerWidth"
      [options]="options"
      [options$]="options$"
      [panelOffset]="panelOffset"
      [panelPosition]="panelPosition"
      [placeholder]="placeholder"
      [portalToBody]="portalToBody"
      (onChanged)="handleSelectChange($event)"
    >
      <ng-content />
    </i-select>

    @if (controlInvalid && resolvedErrorText) {
      <div class="i-fc-select__error">
        {{ resolvedErrorText }}
      </div>
    }
  `, isInline: true, dependencies: [{ kind: "component", type: ISelect, selector: "i-select", inputs: ["placeholder", "disabled", "invalid", "filterDelay", "panelPosition", "portalToBody", "panelOffset", "matchTriggerWidth", "options", "options$", "displayWith", "filterPredicate", "value"], outputs: ["onChanged", "onOptionSelected"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IFCSelect, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-fc-select',
                    standalone: true,
                    imports: [ISelect],
                    template: `
    @if (label) {
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
      [matchTriggerWidth]="matchTriggerWidth"
      [options]="options"
      [options$]="options$"
      [panelOffset]="panelOffset"
      [panelPosition]="panelPosition"
      [placeholder]="placeholder"
      [portalToBody]="portalToBody"
      (onChanged)="handleSelectChange($event)"
    >
      <ng-content />
    </i-select>

    @if (controlInvalid && resolvedErrorText) {
      <div class="i-fc-select__error">
        {{ resolvedErrorText }}
      </div>
    }
  `,
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
            }], panelOffset: [{
                type: Input
            }], portalToBody: [{
                type: Input
            }], matchTriggerWidth: [{
                type: Input
            }], errorMessage: [{
                type: Input
            }], value: [{
                type: Input
            }], onChanged: [{
                type: Output
            }], onOptionSelected: [{
                type: Output
            }] } });

/**
 * IDatepicker
 * Version: 1.5.4
 *
 * Fixes:
 * - ✅ IMPORTANT: prevent value from being wiped due to bubbled "input" events
 *   from inner month/year i-select inputs.
 *   -> Only handle input when event.target is the date input itself.
 * - Keep portal + positioning + flicker guard for portaled i-options.
 * - IFCDatepicker included in same file
 * - Add absolute minYear/maxYear and relative minYearRange/maxYearRange
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
    _minYear = null;
    _maxYear = null;
    _minYearRange = null;
    _maxYearRange = null;
    set minYear(value) {
        this._minYear = this.coerceYear(value);
        this.refreshYearRange();
    }
    get minYear() {
        return this._minYear;
    }
    set maxYear(value) {
        this._maxYear = this.coerceYear(value);
        this.refreshYearRange();
    }
    get maxYear() {
        return this._maxYear;
    }
    set minYearRange(value) {
        this._minYearRange = this.coerceYear(value);
        this.refreshYearRange();
    }
    get minYearRange() {
        return this._minYearRange;
    }
    set maxYearRange(value) {
        this._maxYearRange = this.coerceYear(value);
        this.refreshYearRange();
    }
    get maxYearRange() {
        return this._maxYearRange;
    }
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
    get disabledHostClass() {
        return this.disabled;
    }
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
        // Initialize calendar view to today WITHOUT setting a model value.
        // The input stays empty until a date is picked or written via form control.
        // Fixes: optional/null date fields no longer auto-fill with today.
        if (!this._modelValue && !this._displayText) {
            this.updateView(this.startOfDay(new Date()));
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
            return;
        const parsed = this.parseInputDate(raw);
        if (!parsed)
            return;
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
        let nextYear = this.viewYear;
        let nextMonth = this.viewMonth;
        if (nextMonth === 0) {
            nextMonth = 11;
            nextYear -= 1;
        }
        else {
            nextMonth -= 1;
        }
        const clampedYear = this.clampYear(nextYear);
        if (clampedYear !== nextYear)
            return;
        this.viewYear = nextYear;
        this.viewMonth = nextMonth;
        this.ensureYearRange(this.viewYear);
        this.buildCalendar();
        if (this.isOpen)
            this.scheduleReposition();
        this.cdr.markForCheck();
    }
    nextMonth() {
        let nextYear = this.viewYear;
        let nextMonth = this.viewMonth;
        if (nextMonth === 11) {
            nextMonth = 0;
            nextYear += 1;
        }
        else {
            nextMonth += 1;
        }
        const clampedYear = this.clampYear(nextYear);
        if (clampedYear !== nextYear)
            return;
        this.viewYear = nextYear;
        this.viewMonth = nextMonth;
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
        this.viewYear = this.clampYear(year);
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
        this.viewYear = this.clampYear(date.getFullYear());
        this.viewMonth = date.getMonth();
        this.ensureYearRange(this.viewYear);
        this.buildCalendar();
    }
    ensureYearRange(focusYear) {
        const { min, max } = this.getNormalizedYearBounds();
        const safeFocusYear = this.clampYear(focusYear);
        const start = min ?? safeFocusYear - 50;
        const end = max ?? safeFocusYear + 10;
        if (this._years.length &&
            safeFocusYear >= this._years[0] &&
            safeFocusYear <= this._years[this._years.length - 1] &&
            this._years[0] === start &&
            this._years[this._years.length - 1] === end) {
            return;
        }
        const arr = [];
        for (let y = start; y <= end; y++)
            arr.push(y);
        this._years = arr;
    }
    coerceYear(value) {
        if (value === null || value === undefined || value === '')
            return null;
        const year = Number(value);
        if (!Number.isFinite(year))
            return null;
        return Math.trunc(year);
    }
    getNormalizedYearBounds() {
        const currentYear = new Date().getFullYear();
        const min = this._minYear !== null
            ? this._minYear
            : this._minYearRange !== null
                ? currentYear + this._minYearRange
                : null;
        const max = this._maxYear !== null
            ? this._maxYear
            : this._maxYearRange !== null
                ? currentYear + this._maxYearRange
                : null;
        if (min !== null && max !== null && min > max) {
            return { min: max, max: min };
        }
        return { min, max };
    }
    clampYear(year) {
        const { min, max } = this.getNormalizedYearBounds();
        if (min !== null && year < min)
            return min;
        if (max !== null && year > max)
            return max;
        return year;
    }
    refreshYearRange() {
        if (!this.viewYear)
            return;
        this.viewYear = this.clampYear(this.viewYear);
        this._years = [];
        this.ensureYearRange(this.viewYear);
        this.buildCalendar();
        this.cdr.markForCheck();
    }
    buildCalendar() {
        const year = this.viewYear;
        const month = this.viewMonth;
        const firstOfMonth = new Date(year, month, 1);
        const startDay = (firstOfMonth.getDay() + 6) % 7;
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
    onHostInput(event) {
        const target = event.target;
        const dateInput = this.getInnerInput();
        if (!dateInput)
            return;
        if (target !== dateInput)
            return;
        this.handleInput(dateInput.value);
    }
    onHostFocusOut() {
        this.handleBlur();
    }
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IDatepicker, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.30", type: IDatepicker, isStandalone: true, selector: "i-datepicker", inputs: { placeholder: "placeholder", disabled: "disabled", invalid: "invalid", format: "format", panelPosition: "panelPosition", minYear: "minYear", maxYear: "maxYear", minYearRange: "minYearRange", maxYearRange: "maxYearRange", portalToBody: "portalToBody", matchTriggerWidth: "matchTriggerWidth", panelOffset: "panelOffset", value: "value" }, outputs: { onChanged: "onChanged" }, host: { listeners: { "input": "onHostInput($event)", "focusout": "onHostFocusOut()", "document:click": "onDocumentClick($event)" }, properties: { "class.i-datepicker--disabled": "this.disabledHostClass" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => IDatepicker),
                multi: true,
            },
        ], viewQueries: [{ propertyName: "panelRef", first: true, predicate: ["panel"], descendants: true, read: ElementRef }, { propertyName: "portalHomeRef", first: true, predicate: ["portalHome"], descendants: true, read: ElementRef }], ngImport: i0, template: `
    <i-input
      [append]="appendAddon"
      [autoDefault]="false"
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
  `, isInline: true, dependencies: [{ kind: "component", type: IInput, selector: "i-input", inputs: ["type", "placeholder", "autocomplete", "readonly", "invalid", "mask", "value", "prepend", "append", "disabled"] }, { kind: "component", type: IButton, selector: "i-button", inputs: ["disabled", "loading", "type", "loadingText", "variant", "size", "icon", "routerLink", "queryParams", "fragment", "state", "href", "target", "rel"], outputs: ["onClick"] }, { kind: "directive", type: IInputMaskDirective, selector: "[iInputMask]", inputs: ["iInputMask", "autoDefault"] }, { kind: "component", type: ISelect, selector: "i-select", inputs: ["placeholder", "disabled", "invalid", "filterDelay", "panelPosition", "portalToBody", "panelOffset", "matchTriggerWidth", "options", "options$", "displayWith", "filterPredicate", "value"], outputs: ["onChanged", "onOptionSelected"] }, { kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IDatepicker, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-datepicker',
                    standalone: true,
                    imports: [IInput, IButton, IInputMaskDirective, ISelect, NgClass],
                    template: `
    <i-input
      [append]="appendAddon"
      [autoDefault]="false"
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
            }], minYear: [{
                type: Input
            }], maxYear: [{
                type: Input
            }], minYearRange: [{
                type: Input
            }], maxYearRange: [{
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
            }], disabledHostClass: [{
                type: HostBinding,
                args: ['class.i-datepicker--disabled']
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
 * Version: 1.5.4 (smart wrapper)
 */
class IFCDatepicker {
    innerDatepicker;
    label = '';
    placeholder = '';
    format = 'dd/MM/yyyy';
    panelPosition = 'bottom left';
    minYear = null;
    maxYear = null;
    minYearRange = null;
    maxYearRange = null;
    errorMessage;
    get value() {
        return this._value;
    }
    set value(v) {
        this.applyExternalValue(v ?? null);
    }
    _value = null;
    forwardedValue = null;
    isDisabled = false;
    onChange = noop;
    onTouched = noop;
    ngControl = inject(NgControl, { optional: true });
    formDir = inject(FormGroupDirective, { optional: true });
    cdr = inject(ChangeDetectorRef);
    hostEl = inject((ElementRef));
    submitSub;
    lastEmittedKey = null;
    pendingExternal = undefined;
    constructor() {
        if (this.ngControl)
            this.ngControl.valueAccessor = this;
        if (this.formDir) {
            this.submitSub = this.formDir.ngSubmit.subscribe(() => {
                this.cdr.markForCheck();
            });
        }
    }
    ngAfterViewInit() {
        this.cdr.markForCheck();
    }
    ngOnDestroy() {
        this.submitSub?.unsubscribe?.();
    }
    writeValue(v) {
        let next = null;
        if (v instanceof Date)
            next = v;
        else if (typeof v === 'string' && v.trim()) {
            const parsed = new Date(v);
            next = isNaN(parsed.getTime()) ? null : parsed;
        }
        else
            next = null;
        this.applyExternalValue(next);
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
    handleDateChange(date) {
        this._value = date ?? null;
        this.lastEmittedKey = this.dateKey(this._value);
        this.onChange(this._value);
        this.onTouched();
    }
    applyExternalValue(next) {
        const nextKey = this.dateKey(next);
        if (this.isInnerInputFocused()) {
            if (nextKey === this.lastEmittedKey) {
                this._value = next ?? null;
                return;
            }
            this.pendingExternal = next ?? null;
            this._value = next ?? null;
            return;
        }
        this.pendingExternal = undefined;
        this._value = next ?? null;
        this.forwardedValue = next ?? null;
        this.cdr.markForCheck();
    }
    tryFlushPendingExternal() {
        if (this.pendingExternal === undefined)
            return;
        const v = this.pendingExternal ?? null;
        this.pendingExternal = undefined;
        this.forwardedValue = v;
        this.cdr.markForCheck();
    }
    set _smartFocusHook(_) {
        // no-op
    }
    isInnerInputFocused() {
        const input = this.hostEl.nativeElement.querySelector('i-datepicker i-input input');
        const active = document.activeElement;
        if (!input || !active)
            return false;
        return active === input;
    }
    dateKey(d) {
        if (!d)
            return null;
        if (!(d instanceof Date))
            return null;
        const t = d.getTime();
        if (Number.isNaN(t))
            return null;
        const y = d.getFullYear();
        const m = d.getMonth() + 1;
        const day = d.getDate();
        const mm = m < 10 ? `0${m}` : `${m}`;
        const dd = day < 10 ? `0${day}` : `${day}`;
        return `${y}-${mm}-${dd}`;
    }
    focusInnerDatepicker() {
        if (this.isDisabled)
            return;
        const input = this.hostEl.nativeElement.querySelector('i-datepicker i-input input');
        input?.focus();
    }
    onInnerFocusOut() {
        queueMicrotask(() => {
            if (!this.isInnerInputFocused())
                this.tryFlushPendingExternal();
        });
    }
    get controlInvalid() {
        const c = this.ngControl?.control;
        if (!c)
            return false;
        // Show error when: submitted, OR user has interacted (touched/dirty).
        // Previously only checked submitted when formDir is present, so
        // markAllAsTouched() had no effect on error visibility.
        if (this.formDir) {
            return c.invalid && (this.formDir.submitted || c.touched || c.dirty);
        }
        return c.invalid && (c.dirty || c.touched);
    }
    get required() {
        return isControlRequired(this.ngControl, this.errorMessage);
    }
    get resolvedErrorText() {
        return resolveControlErrorMessage(this.ngControl, this.label, this.errorMessage);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IFCDatepicker, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.30", type: IFCDatepicker, isStandalone: true, selector: "i-fc-datepicker", inputs: { label: "label", placeholder: "placeholder", format: "format", panelPosition: "panelPosition", minYear: "minYear", maxYear: "maxYear", minYearRange: "minYearRange", maxYearRange: "maxYearRange", errorMessage: "errorMessage", value: "value", _smartFocusHook: "_smartFocusHook" }, viewQueries: [{ propertyName: "innerDatepicker", first: true, predicate: ["inner"], descendants: true, static: true }], ngImport: i0, template: `@if (label) {
      <label class="i-fc-datepicker__label" (click)="focusInnerDatepicker()">
        {{ label }} :
        @if (required) {
          <span class="i-fc-datepicker__required">*</span>
        }
      </label>
    }

    <i-datepicker
      #inner
      [disabled]="isDisabled"
      [format]="format"
      [invalid]="controlInvalid"
      [maxYear]="maxYear"
      [maxYearRange]="maxYearRange"
      [minYear]="minYear"
      [minYearRange]="minYearRange"
      [panelPosition]="panelPosition"
      [placeholder]="placeholder"
      [value]="forwardedValue"
      (focusout)="onInnerFocusOut()"
      (onChanged)="handleDateChange($event)"
    />

    @if (controlInvalid && resolvedErrorText) {
      <div class="i-fc-datepicker__error">
        {{ resolvedErrorText }}
      </div>
    }`, isInline: true, dependencies: [{ kind: "component", type: IDatepicker, selector: "i-datepicker", inputs: ["placeholder", "disabled", "invalid", "format", "panelPosition", "minYear", "maxYear", "minYearRange", "maxYearRange", "portalToBody", "matchTriggerWidth", "panelOffset", "value"], outputs: ["onChanged"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IFCDatepicker, decorators: [{
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
      #inner
      [disabled]="isDisabled"
      [format]="format"
      [invalid]="controlInvalid"
      [maxYear]="maxYear"
      [maxYearRange]="maxYearRange"
      [minYear]="minYear"
      [minYearRange]="minYearRange"
      [panelPosition]="panelPosition"
      [placeholder]="placeholder"
      [value]="forwardedValue"
      (focusout)="onInnerFocusOut()"
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
                args: ['inner', { static: true }]
            }], label: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], format: [{
                type: Input
            }], panelPosition: [{
                type: Input
            }], minYear: [{
                type: Input
            }], maxYear: [{
                type: Input
            }], minYearRange: [{
                type: Input
            }], maxYearRange: [{
                type: Input
            }], errorMessage: [{
                type: Input
            }], value: [{
                type: Input
            }], _smartFocusHook: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ITextArea, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.30", type: ITextArea, isStandalone: true, selector: "i-textarea", inputs: { placeholder: "placeholder", readonly: "readonly", rows: "rows", invalid: "invalid", value: "value", disabled: "disabled" }, host: { listeners: { "click": "handleHostClick()" } }, providers: [
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ITextArea, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IFCTextArea, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.30", type: IFCTextArea, isStandalone: true, selector: "i-fc-textarea", inputs: { label: "label", placeholder: "placeholder", readonly: "readonly", rows: "rows", errorMessage: "errorMessage", value: "value" }, viewQueries: [{ propertyName: "innerTextarea", first: true, predicate: ITextArea, descendants: true }], ngImport: i0, template: `@if (label) {
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IFCTextArea, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IDialogService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IDialogService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IDialogService, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IDialogContainer, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.30", type: IDialogContainer, isStandalone: true, selector: "i-dialog-container", inputs: { instance: "instance", isTopMost: "isTopMost" }, host: { listeners: { "document:keydown.escape": "onEscKey()" } }, usesOnChanges: true, ngImport: i0, template: `<div class="i-dialog-backdrop" (click)="onBackdropClick()"></div>
    <div class="i-dialog-wrapper">
      <div class="i-dialog-panel" [ngStyle]="panelStyles">
        <ng-container *ngComponentOutlet="instance.component; injector: dialogInjector" />
      </div>
    </div> `, isInline: true, dependencies: [{ kind: "directive", type: NgComponentOutlet, selector: "[ngComponentOutlet]", inputs: ["ngComponentOutlet", "ngComponentOutletInputs", "ngComponentOutletInjector", "ngComponentOutletEnvironmentInjector", "ngComponentOutletContent", "ngComponentOutletNgModule", "ngComponentOutletNgModuleFactory"], exportAs: ["ngComponentOutlet"] }, { kind: "directive", type: NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IDialogContainer, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IDialogOutlet, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.30", type: IDialogOutlet, isStandalone: true, selector: "i-dialog-outlet", ngImport: i0, template: `
    @for (dialog of (dialogs$ | async) ?? []; track dialog.id; let last = $last) {
      <i-dialog-container [instance]="dialog" [isTopMost]="last" />
    }
  `, isInline: true, dependencies: [{ kind: "component", type: IDialogContainer, selector: "i-dialog-container", inputs: ["instance", "isTopMost"] }, { kind: "pipe", type: AsyncPipe, name: "async" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IDialogOutlet, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IDialogCloseDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.30", type: IDialogCloseDirective, isStandalone: true, selector: "[i-dialog-close], [iDialogClose]", inputs: { result: ["iDialogClose", "result"] }, host: { listeners: { "click": "onClick($event)" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IDialogCloseDirective, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IDialog, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.30", type: IDialog, isStandalone: true, selector: "i-dialog", inputs: { title: "title", actions: "actions" }, outputs: { onOk: "onOk", onConfirm: "onConfirm", onSave: "onSave", onCustomAction: "onCustomAction" }, ngImport: i0, template: `@if (title) {
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
              [disabled]="a.disabled"
              [icon]="a.icon"
              [loading]="a.loading"
              [ngClass]="a.className"
              [type]="a.buttonType || 'button'"
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
            [disabled]="okAction.disabled"
            [loading]="okAction.loading"
            [ngClass]="okAction.className"
            [type]="okAction.buttonType || 'button'"
            (onClick)="onOkClick()"
            >OK</i-button
          >
        }
        @if (confirmAction) {
          <i-button
            icon="save"
            variant="primary"
            [disabled]="confirmAction.disabled"
            [loading]="confirmAction.loading"
            [ngClass]="confirmAction.className"
            [type]="confirmAction.buttonType || 'button'"
            (onClick)="onConfirmClick()"
            >Confirm</i-button
          >
        }
        @if (saveAction) {
          <i-button
            icon="save"
            variant="primary"
            [disabled]="saveAction.disabled"
            [loading]="saveAction.loading"
            [ngClass]="saveAction.className"
            [type]="saveAction.buttonType || 'button'"
            (onClick)="onSaveClick()"
            >Save</i-button
          >
        }
        @if (cancelAction) {
          <i-button
            i-dialog-close
            icon="cancel"
            variant="danger"
            [disabled]="cancelAction.disabled"
            [loading]="cancelAction.loading"
            [ngClass]="cancelAction.className"
            [type]="cancelAction.buttonType || 'button'"
            >Cancel</i-button
          >
        }
      </div>
    } `, isInline: true, dependencies: [{ kind: "component", type: IButton, selector: "i-button", inputs: ["disabled", "loading", "type", "loadingText", "variant", "size", "icon", "routerLink", "queryParams", "fragment", "state", "href", "target", "rel"], outputs: ["onClick"] }, { kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: IDialogCloseDirective, selector: "[i-dialog-close], [iDialogClose]", inputs: ["iDialogClose"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IDialog, decorators: [{
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
              [disabled]="a.disabled"
              [icon]="a.icon"
              [loading]="a.loading"
              [ngClass]="a.className"
              [type]="a.buttonType || 'button'"
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
            [disabled]="okAction.disabled"
            [loading]="okAction.loading"
            [ngClass]="okAction.className"
            [type]="okAction.buttonType || 'button'"
            (onClick)="onOkClick()"
            >OK</i-button
          >
        }
        @if (confirmAction) {
          <i-button
            icon="save"
            variant="primary"
            [disabled]="confirmAction.disabled"
            [loading]="confirmAction.loading"
            [ngClass]="confirmAction.className"
            [type]="confirmAction.buttonType || 'button'"
            (onClick)="onConfirmClick()"
            >Confirm</i-button
          >
        }
        @if (saveAction) {
          <i-button
            icon="save"
            variant="primary"
            [disabled]="saveAction.disabled"
            [loading]="saveAction.loading"
            [ngClass]="saveAction.className"
            [type]="saveAction.buttonType || 'button'"
            (onClick)="onSaveClick()"
            >Save</i-button
          >
        }
        @if (cancelAction) {
          <i-button
            i-dialog-close
            icon="cancel"
            variant="danger"
            [disabled]="cancelAction.disabled"
            [loading]="cancelAction.loading"
            [ngClass]="cancelAction.className"
            [type]="cancelAction.buttonType || 'button'"
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IAlert, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.30", type: IAlert, isStandalone: true, selector: "i-alert", ngImport: i0, template: `
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IAlert, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IAlertService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IAlertService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IAlertService, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IConfirm, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.30", type: IConfirm, isStandalone: true, selector: "i-confirm", viewQueries: [{ propertyName: "formGroupDir", first: true, predicate: FormGroupDirective, descendants: true }], ngImport: i0, template: `<i-dialog
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IConfirm, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IConfirmService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IConfirmService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IConfirmService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
class IDialogModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.30", ngImport: i0, type: IDialogModule, imports: [IDialogContainer, IDialogOutlet, IDialogCloseDirective, IDialog, IAlert, IConfirm], exports: [IDialogContainer, IDialogOutlet, IDialogCloseDirective, IDialog, IAlert, IConfirm] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IDialogModule, imports: [IConfirm] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IDialogModule, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IPaginator, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.30", type: IPaginator, isStandalone: true, selector: "i-paginator", inputs: { length: "length", pageIndex: "pageIndex", pageSize: "pageSize", pageSizeOptions: "pageSizeOptions" }, outputs: { onPageChange: "onPageChange" }, host: { classAttribute: "i-paginator" }, ngImport: i0, template: `
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
  `, isInline: true, dependencies: [{ kind: "component", type: IButton, selector: "i-button", inputs: ["disabled", "loading", "type", "loadingText", "variant", "size", "icon", "routerLink", "queryParams", "fragment", "state", "href", "target", "rel"], outputs: ["onClick"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IPaginator, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ITruncatedTooltipDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "20.3.30", type: ITruncatedTooltipDirective, isStandalone: true, selector: "[truncatedTooltip]", inputs: { enabled: ["truncatedTooltip", "enabled", booleanAttribute] }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ITruncatedTooltipDirective, decorators: [{
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
 * Version: 1.28.0
 *
 * CHANGES (1.28.0):
 * - Fix tree mode: (onRowClick) never fired because the tree-host body cell
 *   stopped all click propagation. Removed that blanket stopPropagation —
 *   interactive controls (expand toggle, checkbox/radio) already stop their
 *   own propagation individually.
 * - Tree and flat selection remain checkbox/radio-only. `onRowClick` emits for
 *   consumers that explicitly bind row actions, but does not toggle selection.
 * - Add selectionRowHidden / selectionRowDisabled per-row predicate inputs:
 *   - selectionRowHidden(row) => boolean — hides the checkbox/radio for a row
 *     (space is preserved for column/indent alignment)
 *   - selectionRowDisabled(row) => boolean — shows but disables the checkbox/radio
 *   Both flat and tree mode supported. Hidden/disabled rows are excluded from
 *   select-all (header checkbox) and tree parent cascade/indeterminate
 *   calculations. Header checkbox auto-disables when zero rows are selectable
 *   (allVisibleSelectableCount === 0).
 *
 * CHANGES (1.27.0):
 * - Add sortMode input ('multi' | 'single', default 'multi'):
 *   - 'multi': clicking columns accumulates sort states (existing behavior)
 *   - 'single': clicking a column replaces all previous sorts
 *   - Works with both client-side and server-side data sources
 *
 * CHANGES (1.26.0):
 * - Add native server-side data sourcing support:
 *   - New IGridServerSideConfig<T> type for configuring server-side sort/page/filter delegation
 *   - IGridDataSource now accepts optional `serverSide` config in constructor
 *   - setData() convenience method for pushing server results
 *   - Server mode skips local sort/filter/paginate — delegates to callbacks
 *   - disconnect() preserves BehaviorSubject lifecycle in server mode
 * - Add <i-grid> outputs: onServerSortChange, onServerPageChange, onServerFilterChange
 *   (alternative to IGridServerSideConfig callbacks)
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
    // server-side mode
    _serverSide = null;
    constructor(initialData = [], config = {}) {
        this._rawData = initialData || [];
        // server-side config
        if (config.serverSide) {
            this._serverSide = config.serverSide;
        }
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
    /* -------- server-side config -------- */
    get serverSide() {
        return this._serverSide;
    }
    set serverSide(config) {
        this._serverSide = config;
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
        if (this._serverSide?.onPageChange) {
            // Server handles pagination: delegate to callback, skip local slice.
            this._serverSide.onPageChange({ pageIndex: state.pageIndex, pageSize: state.pageSize });
            return;
        }
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
     * Push server-fetched data into the data source.
     * In server mode this is the primary way to update the grid after a fetch.
     *
     * @param rows   — the page of rows returned by the server
     * @param options.total      — total row count across all pages (updates paginator length)
     * @param options.pageIndex  — current page index (syncs paginator indicator)
     * @param options.pageSize   — current page size (syncs paginator indicator)
     */
    setData(rows, options) {
        this._rawData = rows || [];
        if (this._serverSide) {
            if (options?.total !== undefined) {
                this._serverSide.totalRowCount = options.total;
            }
            if (options?.pageIndex !== undefined) {
                this._pageIndex = options.pageIndex;
            }
            if (options?.pageSize !== undefined) {
                this._pageSize = options.pageSize;
            }
        }
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
            if (this._serverSide?.onFilterChange) {
                this._serverSide.onFilterChange('');
                return;
            }
            this._update();
            return;
        }
        if (typeof value === 'string') {
            this._filter = value.toLowerCase().trim();
            this._recursive = false;
            this._childrenKey = 'children';
            if (this._serverSide?.onFilterChange) {
                this._serverSide.onFilterChange(this._filter);
                return;
            }
            this._update();
            return;
        }
        // object: recursive filter (tree mode)
        this._filter = (value.text ?? '').toLowerCase().trim();
        this._recursive = value.recursive === true;
        this._childrenKey = (value.key || 'children').trim() || 'children';
        if (this._serverSide?.onFilterChange) {
            this._serverSide.onFilterChange(this._filter);
            return;
        }
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
        if (this._serverSide?.onSortChange) {
            // Server handles sort: delegate to callback, skip local sort.
            // The component will fetch from the server and push data via data setter or setData().
            this._serverSide.onSortChange(this._sort ?? []);
            return;
        }
        this._update();
    }
    get length() {
        // Server handles pagination → return server total
        if (this._serverSide?.onPageChange) {
            return this._serverSide.totalRowCount;
        }
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
        // In server mode, preserve the BehaviorSubject so the grid can reconnect
        // after lifecycle toggles (e.g. @if (loading) destroying <i-grid>).
        if (this._serverSide) {
            return;
        }
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
        const ss = this._serverSide;
        // FILTER — skip if server handles filtering
        if (!ss?.onFilterChange && this._filter) {
            const f = this._filter;
            if (this._recursive) {
                data = this._filterRecursiveArray(data, f);
            }
            else {
                data = data.filter((row) => this.filterPredicate(row, f));
            }
        }
        // SORT — skip if server handles sorting
        if (!ss?.onSortChange && this._sort && this._sort.length > 0) {
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
        // PAGINATION — skip if server handles pagination
        if (this._paginatorEnabled && !ss?.onPageChange) {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IGridHeaderCellDefDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.30", type: IGridHeaderCellDefDirective, isStandalone: true, selector: "[iHeaderCellDef]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IGridHeaderCellDefDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[iHeaderCellDef]',
                    standalone: true,
                }]
        }] });
class IGridCellDefDirective {
    template = inject((TemplateRef));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IGridCellDefDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.30", type: IGridCellDefDirective, isStandalone: true, selector: "[iCellDef]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IGridCellDefDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[iCellDef]',
                    standalone: true,
                }]
        }] });
/* ----------------------------------------------------
 * EXPANDABLE ROW DEF
 * ---------------------------------------------------- */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IGridRowDefDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.30", type: IGridRowDefDirective, isStandalone: true, selector: "[iRowDef]", inputs: { iRowDefExpandSingle: "iRowDefExpandSingle" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IGridRowDefDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[iRowDef]',
                    standalone: true,
                }]
        }], propDecorators: { iRowDefExpandSingle: [{
                type: Input
            }] } });
class IGridExpandableRow {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IGridExpandableRow, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.30", type: IGridExpandableRow, isStandalone: true, selector: "i-grid-expandable-row", host: { attributes: { "role": "row" }, classAttribute: "i-grid-expandable-row flex" }, ngImport: i0, template: `<ng-content />`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IGridExpandableRow, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IGridHeaderRowDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.30", type: IGridHeaderRowDirective, isStandalone: true, selector: "i-grid-header-row", host: { attributes: { "role": "row" }, classAttribute: "i-grid-header-row" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IGridHeaderRowDirective, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IGridRowDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.30", type: IGridRowDirective, isStandalone: true, selector: "i-grid-row", host: { attributes: { "role": "row" }, classAttribute: "i-grid-row" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IGridRowDirective, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IGridHeaderCellGroup, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.30", type: IGridHeaderCellGroup, isStandalone: true, selector: "i-grid-header-cell-group", host: { attributes: { "role": "presentation" }, classAttribute: "i-grid-header-cell-group" }, ngImport: i0, template: `<ng-content />`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IGridHeaderCellGroup, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IGridHeaderCellGroupColumns, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.30", type: IGridHeaderCellGroupColumns, isStandalone: true, selector: "i-grid-header-cell-group-columns", host: { attributes: { "role": "presentation" }, classAttribute: "i-grid-header-cell-group-columns" }, ngImport: i0, template: `<ng-content />`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IGridHeaderCellGroupColumns, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IGridColumn, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.30", type: IGridColumn, isStandalone: true, selector: "i-grid-column", inputs: { fieldName: "fieldName", title: "title", sortable: "sortable", resizable: "resizable", width: "width", freeze: ["freeze", "freeze", booleanAttribute] }, queries: [{ propertyName: "headerDef", first: true, predicate: IGridHeaderCellDefDirective, descendants: true, read: TemplateRef }, { propertyName: "cellDef", first: true, predicate: IGridCellDefDirective, descendants: true, read: TemplateRef }], ngImport: i0, template: '', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IGridColumn, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IGridCustomColumn, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.30", type: IGridCustomColumn, isStandalone: true, selector: "i-grid-custom-column", inputs: { title: "title", sortable: "sortable", resizable: "resizable", width: "width", freeze: ["freeze", "freeze", booleanAttribute] }, queries: [{ propertyName: "headerDef", first: true, predicate: IGridHeaderCellDefDirective, descendants: true, read: TemplateRef }, { propertyName: "cellDef", first: true, predicate: IGridCellDefDirective, descendants: true, read: TemplateRef }], ngImport: i0, template: '', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IGridCustomColumn, decorators: [{
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class IGridColumnGroup {
    title = '';
    columns;
    customColumns;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IGridColumnGroup, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.30", type: IGridColumnGroup, isStandalone: true, selector: "i-grid-column-group", inputs: { title: "title" }, queries: [{ propertyName: "columns", predicate: IGridColumn }, { propertyName: "customColumns", predicate: IGridCustomColumn }], ngImport: i0, template: '', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IGridColumnGroup, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IGridCell, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.30", type: IGridCell, isStandalone: true, selector: "i-grid-cell", inputs: { column: "column", fixedWidth: "fixedWidth" }, host: { attributes: { "role": "cell" }, properties: { "style.flex": "this.flex", "class.i-grid-cell--frozen": "this.frozenClass", "style.position": "this.stickyPosition", "style.left.px": "this.stickyLeft", "style.zIndex": "this.stickyZ" }, classAttribute: "i-grid-cell" }, ngImport: i0, template: ` <ng-content /> `, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IGridCell, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IGridHeaderCell, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.30", type: IGridHeaderCell, isStandalone: true, selector: "i-grid-header-cell", inputs: { column: "column", fixedWidth: "fixedWidth" }, host: { attributes: { "role": "columnheader" }, listeners: { "click": "onClick()", "document:mousemove": "onDocumentMouseMove($event)", "document:mouseup": "onDocumentMouseUp()" }, properties: { "style.flex": "this.flex", "class.i-grid-header-cell--sortable": "this.sortable", "class.i-grid-header-cell--sorted": "this.isSorted", "class.i-grid-header-cell--sorted-asc": "this.isSortedAsc", "class.i-grid-header-cell--sorted-desc": "this.isSortedDesc", "class.i-grid-header-cell--resizable": "this.isResizableClass", "class.i-grid-header-cell--frozen": "this.frozenClass", "style.position": "this.stickyPosition", "style.left.px": "this.stickyLeft", "style.zIndex": "this.stickyZ" }, classAttribute: "i-grid-header-cell" }, ngImport: i0, template: `
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IGridHeaderCell, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IGridViewport, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.30", type: IGridViewport, isStandalone: true, selector: "i-grid-viewport", host: { classAttribute: "i-grid-viewport" }, ngImport: i0, template: `<ng-content />`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IGridViewport, decorators: [{
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
    /**
     * Per-row predicate to HIDE the selection checkbox/radio for specific rows
     * (e.g. group rows in tree mode that structurally cannot be selected).
     * Hidden rows are excluded from select-all and tree cascade/indeterminate logic.
     * The cell/slot still reserves space so column alignment is preserved.
     */
    selectionRowHidden;
    /**
     * Per-row predicate to DISABLE (but still show) the selection checkbox/radio
     * for specific rows (e.g. already-owned/assigned rows). Disabled rows are
     * excluded from select-all and tree cascade/indeterminate logic, and cannot
     * be toggled via checkbox, row click, or programmatic API.
     */
    selectionRowDisabled;
    /** Tree mode */
    tree = null;
    /** Indent per tree level (px) */
    treeIndent = 16;
    trackBy;
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
    /**
     * Sort mode:
     * - 'multi' (default): clicking columns accumulates sort states.
     *   Click A → A↑, click B → A↑ B↑.
     * - 'single': clicking a column replaces all previous sorts.
     *   Click A → A↑, click B → B↑ (A cleared).
     * Works with both client-side and server-side data sources.
     */
    sortMode = 'multi';
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
    /**
     * Server-side delegation events.
     * These are alternative wiring: instead of configuring callbacks in IGridServerSideConfig,
     * consumers can bind to these outputs directly on <i-grid>.
     * The grid wires these to the dataSource.serverSide config automatically in ngAfterContentInit.
     */
    onServerSortChange = new EventEmitter();
    onServerPageChange = new EventEmitter();
    onServerFilterChange = new EventEmitter();
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
    /** True when `selectionRowHidden` predicate marks this row as hidden. */
    isSelectionHidden(row) {
        return !!this.selectionRowHidden?.(row);
    }
    /** True when `selectionRowDisabled` predicate marks this row as disabled. */
    isSelectionDisabled(row) {
        return !!this.selectionRowDisabled?.(row);
    }
    /** A row participates in selection UI/logic only if not hidden and not disabled. */
    isRowSelectable(row) {
        return !this.isSelectionHidden(row) && !this.isSelectionDisabled(row);
    }
    isRowSelected(row) {
        return this._selection.has(row);
    }
    getRowChecked(row) {
        if (!this.treeEnabled) {
            return this.isRowSelected(row);
        }
        const descendants = this._getTreeDescendants(row).filter((r) => this.isRowSelectable(r));
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
        const descendants = this._getTreeDescendants(row).filter((r) => this.isRowSelectable(r));
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
    /** Count of rows in `renderedData` that are neither hidden nor disabled for selection. */
    get allVisibleSelectableCount() {
        if (!this.selectionMode || !this.renderedData.length) {
            return 0;
        }
        return this.renderedData.filter((row) => this.isRowSelectable(row)).length;
    }
    get allVisibleSelected() {
        if (!this.selectionMode || !this.renderedData.length) {
            return false;
        }
        const selectableRows = this.renderedData.filter((row) => this.isRowSelectable(row));
        if (!selectableRows.length) {
            return false;
        }
        return selectableRows.every((row) => this.getRowChecked(row));
    }
    get someVisibleSelected() {
        if (!this.selectionMode || !this.renderedData.length) {
            return false;
        }
        const selectableRows = this.renderedData.filter((row) => this.isRowSelectable(row));
        if (!selectableRows.length) {
            return false;
        }
        const anySelected = selectableRows.some((row) => this.getRowChecked(row) || this.getRowIndeterminate(row));
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
            if (!this.isRowSelectable(row)) {
                return;
            }
            if (selected) {
                this._selection.add(row);
            }
            else {
                this._selection.delete(row);
            }
            return;
        }
        const allRows = [row, ...this._getTreeDescendants(row)];
        allRows.forEach((r) => {
            if (!this.isRowSelectable(r)) {
                return;
            }
            if (selected) {
                this._selection.add(r);
            }
            else {
                this._selection.delete(r);
            }
        });
    }
    _syncSelectionUpwardsFrom(row) {
        if (!this.treeEnabled) {
            return;
        }
        let current = this._treeMeta.get(row)?.parent ?? null;
        while (current) {
            const descendants = this._getTreeDescendants(current).filter((r) => this.isRowSelectable(r));
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
        if (!this.isRowSelectable(row)) {
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
        if (this.allVisibleSelectableCount === 0) {
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
            const selectableRows = this.renderedData.filter((row) => this.isRowSelectable(row));
            if (shouldSelect) {
                selectableRows.forEach((row) => this._selection.add(row));
            }
            else {
                selectableRows.forEach((row) => this._selection.delete(row));
            }
        }
        this._emitSelectionChange(null);
    }
    clearSelection() {
        this._selection.clear();
        this._emitSelectionChange(null);
    }
    /**
     * Programmatically REPLACES the current selection with the given rows.
     * Rows that are not present in the current data, or that are hidden/disabled
     * for selection (`selectionRowHidden` / `selectionRowDisabled`), are ignored.
     * Emits a single `onSelectionChange` only when the resulting selection
     * actually differs from the current one.
     *
     * Unlike looping `onRowSelectionToggle` per row, this is atomic (one event,
     * not one per row) and is safe to call once the grid has data (e.g. from
     * `afterNextRender`). Selection is identity-based and persists across page
     * changes in client-side mode.
     */
    setSelected(rows) {
        if (!this.selectionMode) {
            return;
        }
        const valid = new Set(this._getAllDataRows());
        const next = new Set();
        for (const row of rows) {
            if (valid.has(row) && this.isRowSelectable(row)) {
                next.add(row);
            }
        }
        if (!this._sameSelection(next, this._selection)) {
            this._selection = next;
            this._emitSelectionChange(null);
        }
    }
    _sameSelection(a, b) {
        if (a.size !== b.size) {
            return false;
        }
        for (const item of a) {
            if (!b.has(item)) {
                return false;
            }
        }
        return true;
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
        if (this.sortMode === 'single') {
            // Single-column mode: replace all sorts with just this column
            if (index !== -1) {
                const current = this.sortStates[index];
                if (current.direction === 'asc') {
                    this.sortStates = [{ active: columnId, direction: 'desc' }];
                }
                else if (current.direction === 'desc') {
                    // Last direction → clear sort entirely
                    this.sortStates = [];
                }
                else {
                    this.sortStates = [{ active: columnId, direction: 'asc' }];
                }
            }
            else {
                this.sortStates = [{ active: columnId, direction: 'asc' }];
            }
        }
        else {
            // Multi-column mode (default): accumulate sort states
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
        }
        this._applySortToDataSource();
    }
    _applySortToDataSource() {
        if (!(this.dataSource instanceof IGridDataSource)) {
            return;
        }
        if (!this.sortStates.length) {
            this.dataSource.sort = null;
            this.onServerSortChange.emit([]);
            return;
        }
        this.dataSource.sort = this.sortStates.map((s) => ({
            active: s.active,
            direction: s.direction,
        }));
        // Also emit server-side output for template-bound consumers
        this.onServerSortChange.emit([...this.sortStates]);
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
        return '1 1 0%';
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
                if (!this._hasExplicitColumns()) {
                    this._rebuildColumnsAndHeader(true);
                }
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
    getColumnTrack(col, index) {
        if (col.fieldName) {
            return `field:${col.fieldName}`;
        }
        return `custom:${col.title || 'col'}:${index}`;
    }
    getHeaderItemTrack(item, index) {
        if (item.kind === 'col') {
            return `col:${this.getColumnTrack(item.col, index)}`;
        }
        const childKeys = item.columns.map((col, i) => this.getColumnTrack(col, i)).join('|');
        return `group:${item.title}:${childKeys}`;
    }
    getRowTrack(row, index) {
        if (this.trackBy) {
            return this.trackBy(row);
        }
        const anyRow = row;
        return anyRow?.id ?? anyRow?.uid ?? anyRow?.uuid ?? anyRow?.key ?? anyRow?.code ?? index;
    }
    _hasExplicitColumns() {
        const directCols = this.columnDefs?.toArray?.() ?? [];
        const directCustom = this.customColumnDefs?.toArray?.() ?? [];
        const groups = this.columnGroupDefs?.toArray?.() ?? [];
        return groups.length > 0 || directCols.length > 0 || directCustom.length > 0;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IGrid, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.30", type: IGrid, isStandalone: true, selector: "i-grid", inputs: { dataSource: "dataSource", selectionMode: "selectionMode", selectionRowHidden: "selectionRowHidden", selectionRowDisabled: "selectionRowDisabled", tree: "tree", treeIndent: "treeIndent", trackBy: "trackBy", treeColumn: "treeColumn", treeInitialExpandLevel: "treeInitialExpandLevel", showNumberColumn: ["showNumberColumn", "showNumberColumn", booleanAttribute], sortMode: "sortMode" }, outputs: { onSelectionChange: "onSelectionChange", onRowClick: "onRowClick", onRowExpandChange: "onRowExpandChange", onExpandedRowsChange: "onExpandedRowsChange", onServerSortChange: "onServerSortChange", onServerPageChange: "onServerPageChange", onServerFilterChange: "onServerFilterChange" }, host: { attributes: { "role": "table" }, classAttribute: "i-grid" }, queries: [{ propertyName: "expandableRowDef", first: true, predicate: IGridRowDefDirective, descendants: true }, { propertyName: "columnDefs", predicate: IGridColumn }, { propertyName: "customColumnDefs", predicate: IGridCustomColumn }, { propertyName: "columnGroupDefs", predicate: IGridColumnGroup }], exportAs: ["iGrid"], usesOnChanges: true, ngImport: i0, template: `<i-grid-viewport>
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
                    [disabled]="allVisibleSelectableCount === 0"
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
          @for (item of headerItems; track getHeaderItemTrack(item, i); let i = $index) {
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
                        [disabled]="allVisibleSelectableCount === 0"
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
                  @for (col of g.columns; track getColumnTrack(col, $index)) {
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
      @for (row of renderedData; track getRowTrack(row, rowIndex); let rowIndex = $index) {
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
              @if (!isSelectionHidden(row)) {
                @if (selectionMode === 'multiple') {
                  <input
                    type="checkbox"
                    [checked]="getRowChecked(row)"
                    [disabled]="isSelectionDisabled(row)"
                    [indeterminate]="getRowIndeterminate(row)"
                    (change)="onRowSelectionToggle(row)"
                  />
                } @else if (selectionMode === 'single') {
                  <input
                    type="radio"
                    [checked]="isRowSelected(row)"
                    [disabled]="isSelectionDisabled(row)"
                    [name]="singleSelectionName"
                    (change)="onRowSelectionToggle(row)"
                  />
                }
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
          @for (col of columns; track getColumnTrack(col, colIndex); let colIndex = $index) {
            @if (treeEnabled && isTreeHostColumn(col)) {
              <!-- TREE MODE: tree UI is inside this cell -->
                  <!-- NOTE: no cell-level (click) stopPropagation here on purpose —
                    clicks must bubble to <i-grid-row> so onRowClick fires.
                    Interactive controls below each stop their own click. -->
              <i-grid-cell [class.i-grid-cell--auto]="col.isAuto" [column]="col">
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

                  @if (!isSelectionHidden(row)) {
                    @if (selectionMode === 'multiple') {
                      <input
                        class="i-grid-tree-checkbox"
                        type="checkbox"
                        [checked]="getRowChecked(row)"
                        [disabled]="isSelectionDisabled(row)"
                        [indeterminate]="getRowIndeterminate(row)"
                        (change)="onRowSelectionToggle(row)"
                        (click)="$event.stopPropagation()"
                      />
                    } @else if (selectionMode === 'single') {
                      <input
                        class="i-grid-tree-radio"
                        type="radio"
                        [checked]="isRowSelected(row)"
                        [disabled]="isSelectionDisabled(row)"
                        [name]="singleSelectionName"
                        (change)="onRowSelectionToggle(row)"
                        (click)="$event.stopPropagation()"
                      />
                    }
                  } @else if (selectionMode) {
                    <span class="i-grid-tree-checkbox-spacer"></span>
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
    }`, isInline: true, dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: IGridHeaderRowDirective, selector: "i-grid-header-row" }, { kind: "directive", type: IGridRowDirective, selector: "i-grid-row" }, { kind: "component", type: IGridHeaderCell, selector: "i-grid-header-cell", inputs: ["column", "fixedWidth"] }, { kind: "component", type: IGridCell, selector: "i-grid-cell", inputs: ["column", "fixedWidth"] }, { kind: "component", type: IPaginator, selector: "i-paginator", inputs: ["length", "pageIndex", "pageSize", "pageSizeOptions"], outputs: ["onPageChange"] }, { kind: "component", type: IButton, selector: "i-button", inputs: ["disabled", "loading", "type", "loadingText", "variant", "size", "icon", "routerLink", "queryParams", "fragment", "state", "href", "target", "rel"], outputs: ["onClick"] }, { kind: "directive", type: ITruncatedTooltipDirective, selector: "[truncatedTooltip]", inputs: ["truncatedTooltip"] }, { kind: "component", type: IGridHeaderCellGroup, selector: "i-grid-header-cell-group" }, { kind: "component", type: IGridHeaderCellGroupColumns, selector: "i-grid-header-cell-group-columns" }, { kind: "component", type: IGridViewport, selector: "i-grid-viewport" }, { kind: "pipe", type: IHighlightSearchPipe, name: "highlightSearch" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IGrid, decorators: [{
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
                    [disabled]="allVisibleSelectableCount === 0"
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
          @for (item of headerItems; track getHeaderItemTrack(item, i); let i = $index) {
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
                        [disabled]="allVisibleSelectableCount === 0"
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
                  @for (col of g.columns; track getColumnTrack(col, $index)) {
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
      @for (row of renderedData; track getRowTrack(row, rowIndex); let rowIndex = $index) {
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
              @if (!isSelectionHidden(row)) {
                @if (selectionMode === 'multiple') {
                  <input
                    type="checkbox"
                    [checked]="getRowChecked(row)"
                    [disabled]="isSelectionDisabled(row)"
                    [indeterminate]="getRowIndeterminate(row)"
                    (change)="onRowSelectionToggle(row)"
                  />
                } @else if (selectionMode === 'single') {
                  <input
                    type="radio"
                    [checked]="isRowSelected(row)"
                    [disabled]="isSelectionDisabled(row)"
                    [name]="singleSelectionName"
                    (change)="onRowSelectionToggle(row)"
                  />
                }
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
          @for (col of columns; track getColumnTrack(col, colIndex); let colIndex = $index) {
            @if (treeEnabled && isTreeHostColumn(col)) {
              <!-- TREE MODE: tree UI is inside this cell -->
                  <!-- NOTE: no cell-level (click) stopPropagation here on purpose —
                    clicks must bubble to <i-grid-row> so onRowClick fires.
                    Interactive controls below each stop their own click. -->
              <i-grid-cell [class.i-grid-cell--auto]="col.isAuto" [column]="col">
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

                  @if (!isSelectionHidden(row)) {
                    @if (selectionMode === 'multiple') {
                      <input
                        class="i-grid-tree-checkbox"
                        type="checkbox"
                        [checked]="getRowChecked(row)"
                        [disabled]="isSelectionDisabled(row)"
                        [indeterminate]="getRowIndeterminate(row)"
                        (change)="onRowSelectionToggle(row)"
                        (click)="$event.stopPropagation()"
                      />
                    } @else if (selectionMode === 'single') {
                      <input
                        class="i-grid-tree-radio"
                        type="radio"
                        [checked]="isRowSelected(row)"
                        [disabled]="isSelectionDisabled(row)"
                        [name]="singleSelectionName"
                        (change)="onRowSelectionToggle(row)"
                        (click)="$event.stopPropagation()"
                      />
                    }
                  } @else if (selectionMode) {
                    <span class="i-grid-tree-checkbox-spacer"></span>
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
            }], selectionRowHidden: [{
                type: Input
            }], selectionRowDisabled: [{
                type: Input
            }], tree: [{
                type: Input
            }], treeIndent: [{
                type: Input
            }], trackBy: [{
                type: Input
            }], treeColumn: [{
                type: Input
            }], treeInitialExpandLevel: [{
                type: Input
            }], showNumberColumn: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], sortMode: [{
                type: Input
            }], onSelectionChange: [{
                type: Output
            }], onRowClick: [{
                type: Output
            }], onRowExpandChange: [{
                type: Output
            }], onExpandedRowsChange: [{
                type: Output
            }], onServerSortChange: [{
                type: Output
            }], onServerPageChange: [{
                type: Output
            }], onServerFilterChange: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IGridModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.30", ngImport: i0, type: IGridModule, imports: [IGrid, IGridViewport, IGridColumn, IGridCustomColumn, IGridColumnGroup, IGridHeaderCellDefDirective, IGridCellDefDirective, IGridRowDefDirective, IGridExpandableRow, IGridHeaderCell, IGridCell, IGridHeaderRowDirective, IGridRowDirective, IGridHeaderCellGroup, IGridHeaderCellGroupColumns, IPaginator], exports: [IGrid, IGridViewport, IGridColumn, IGridCustomColumn, IGridColumnGroup, IGridHeaderCellDefDirective, IGridCellDefDirective, IGridRowDefDirective, IGridExpandableRow, IGridHeaderCell, IGridCell, IGridHeaderRowDirective, IGridRowDirective, IGridHeaderCellGroup, IGridHeaderCellGroupColumns, IPaginator] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IGridModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IGridModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [...I_GRID_DECLARATIONS, IPaginator],
                    exports: [...I_GRID_DECLARATIONS, IPaginator],
                }]
        }] });

/**
 * IAvatar
 * Version: 1.0.0
 * <i-avatar />
 *
 * Displays a user photo in a circle, square, or rounded-square container.
 * Falls back to a FontAwesome user icon when no image is available.
 */
// ─── Size Mapping ────────────────────────────────────────────────────────────
const SIZE_PRESETS = {
    '3xs': 12,
    '2xs': 16,
    xs: 20,
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96,
    '2xl': 128,
    '3xl': 160,
    '4xl': 200,
};
/**
 * Resolve the best IIconSize for a given avatar pixel size.
 * The icon should fill roughly 50–60% of the container.
 */
function resolveIconSizeFromPx(px) {
    if (px <= 24)
        return 'sm';
    if (px <= 40)
        return 'md';
    if (px <= 64)
        return 'lg';
    if (px <= 96)
        return 'xl';
    if (px <= 128)
        return '2xl';
    if (px <= 160)
        return '3xl';
    return '4xl';
}
// ─── Component ───────────────────────────────────────────────────────────────
class IAvatar {
    // ─── Inputs ────────────────────────────────────────────────────────────
    /** Image URL. When empty or on error, falls back to fallbackSrc or icon. */
    src;
    /** Alt text for the image. */
    alt;
    /**
     * Container size.
     * - `number` → treated as pixels (e.g. `200` = 200px)
     * - `IIconSize` string → uses a preset mapping (e.g. `'lg'` = 64px)
     * @default 40
     */
    size = 40;
    /**
     * Container shape.
     * @default 'circle'
     */
    shape = 'circle';
    /** Fallback image URL. Used when `src` fails to load. If not set (or also fails), shows the user icon. */
    fallbackSrc;
    /** Additional CSS classes to inject onto the host element (e.g. `"border-2 border-primary"`). */
    className;
    // ─── Internal state ────────────────────────────────────────────────────
    /** Whether the primary `src` image failed to load. */
    hasError = false;
    /** Whether the `fallbackSrc` image also failed to load. */
    hasFallbackError = false;
    // ─── Host bindings ─────────────────────────────────────────────────────
    baseClass = true;
    get attrShape() {
        return this.shape ?? 'circle';
    }
    get resolvedSizePx() {
        if (typeof this.size === 'number')
            return this.size;
        return SIZE_PRESETS[this.size] ?? 40;
    }
    get hostClass() {
        return this.className;
    }
    // ─── Computed ──────────────────────────────────────────────────────────
    /** Icon size for the fallback `<i-icon>`. */
    get resolvedIconSize() {
        if (typeof this.size === 'string')
            return this.size;
        return resolveIconSizeFromPx(this.size);
    }
    // ─── Event handlers ────────────────────────────────────────────────────
    onImgError() {
        this.hasError = true;
    }
    onFallbackError() {
        this.hasFallbackError = true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IAvatar, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.30", type: IAvatar, isStandalone: true, selector: "i-avatar", inputs: { src: "src", alt: "alt", size: "size", shape: "shape", fallbackSrc: "fallbackSrc", className: "className" }, host: { properties: { "class.i-avatar": "this.baseClass", "attr.data-shape": "this.attrShape", "style.width.px": "this.resolvedSizePx", "style.height.px": "this.resolvedSizePx", "class": "this.hostClass" } }, ngImport: i0, template: `
    <!-- Primary image -->
    @if (!hasError && src) {
      <img [alt]="alt ?? ''" [src]="src" (error)="onImgError()" />
    }
    <!-- Fallback image -->
    @else if (fallbackSrc && !hasFallbackError) {
      <img [alt]="alt ?? ''" [src]="fallbackSrc" (error)="onFallbackError()" />
    }
    <!-- Ultimate fallback: user icon -->
    @else {
      <i-icon icon="user" [size]="resolvedIconSize" />
    }
  `, isInline: true, dependencies: [{ kind: "component", type: IIcon, selector: "i-icon", inputs: ["icon", "size"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IAvatar, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-avatar',
                    standalone: true,
                    imports: [IIcon],
                    template: `
    <!-- Primary image -->
    @if (!hasError && src) {
      <img [alt]="alt ?? ''" [src]="src" (error)="onImgError()" />
    }
    <!-- Fallback image -->
    @else if (fallbackSrc && !hasFallbackError) {
      <img [alt]="alt ?? ''" [src]="fallbackSrc" (error)="onFallbackError()" />
    }
    <!-- Ultimate fallback: user icon -->
    @else {
      <i-icon icon="user" [size]="resolvedIconSize" />
    }
  `,
                }]
        }], propDecorators: { src: [{
                type: Input
            }], alt: [{
                type: Input
            }], size: [{
                type: Input
            }], shape: [{
                type: Input
            }], fallbackSrc: [{
                type: Input
            }], className: [{
                type: Input
            }], baseClass: [{
                type: HostBinding,
                args: ['class.i-avatar']
            }], attrShape: [{
                type: HostBinding,
                args: ['attr.data-shape']
            }], resolvedSizePx: [{
                type: HostBinding,
                args: ['style.width.px']
            }, {
                type: HostBinding,
                args: ['style.height.px']
            }], hostClass: [{
                type: HostBinding,
                args: ['class']
            }] } });

/**
 * Default environment for `@insight/ui`'s shared data layer.
 *
 * These are the library-wide defaults for the SSO / sidebar / user data
 * layer. Consumer apps override any field at bootstrap via
 * `provideInsightAuth()`.
 */
const environment = {
    production: false,
    releaseStage: 'development',
    appName: 'Insight UI',
    version: '1.0.2',
    api: {
        identity: 'https://account-dev.paramountenterprise.co.id/api',
        user: 'https://account-dev.paramountenterprise.co.id/api/v1/users',
        configuration: 'https://account-dev.paramountenterprise.co.id/api/v1',
        application: 'https://account-dev.paramountenterprise.co.id/api/v1/applications',
    },
    signinUrl: 'https://account-dev.paramountenterprise.co.id/signin',
    authCallbackUrl: 'https://account-dev.paramountenterprise.co.id/auth',
    cookieDomain: '.paramountenterprise.co.id',
    securityMode: true,
    tokenLifespan: {
        accessTokenSeconds: 3600,
        refreshTokenSeconds: 7200,
        ssoSessionMaxSeconds: 54000,
    },
    cookieSecure: true,
    csrfTokenMaxAgeSeconds: 7170,
    mfaChallengeSessionTimeoutSeconds: 300,
    allowedReturnOrigins: [
        'https://account-dev.paramountenterprise.co.id',
        'https://*.paramountenterprise.co.id',
    ],
};

/**
 * Default `IInsightAuthConfig`, sourced from the library's default environment
 * file (`environments/environment.ts`). Consumer apps override any field via
 * `provideInsightAuth({ ... })`.
 *
 * `allowedReturnOrigins` defaults to this app's own origin (the common case —
 * a callback only ever needs to trust redirecting back to itself) and
 * `cookieDomain` defaults to the current hostname (informational only, the
 * frontend never reads/sets this cookie) — both computed at call time since
 * they depend on `window.location`.
 */
function getDefaultInsightAuthConfig() {
    return {
        api: {
            identity: environment.api.identity,
            user: environment.api.user,
            configuration: environment.api.configuration,
            application: environment.api.application,
        },
        signinUrl: environment.signinUrl,
        callbackPath: '/auth/callback',
        allowedReturnOrigins: [window.location.origin],
        cookieDomain: window.location.hostname,
        tokenLifespan: { ...environment.tokenLifespan },
        csrfTokenMaxAgeSeconds: environment.csrfTokenMaxAgeSeconds,
        apiKey: environment.apiKey,
        appId: environment.appId,
        unauthorizedHandling: 'dialog',
    };
}
/**
 * Injection token carrying the consumer app's `IInsightAuthConfig`. Provided via
 * `provideInsightAuth()`. Has a root-level default (`getDefaultInsightAuthConfig()`)
 * so the library services never break when a consumer forgets to call
 * `provideInsightAuth()` — consumers override it explicitly.
 */
const INSIGHT_AUTH_CONFIG = new InjectionToken('INSIGHT_AUTH_CONFIG', {
    providedIn: 'root',
    factory: () => getDefaultInsightAuthConfig(),
});

/**
 * CSRF token management — cookie-to-header pattern for @insight/ui consumer apps.
 * Mirrors iam-web's `ICsrfService`:
 *
 *   1. FE calls GET {api.identity}/auth/csrf.
 *   2. Backend returns `{ csrfToken }` in the JSON body AND sets a `csrf_token` cookie.
 *   3. FE stores the token in memory (JS cannot read cross-origin cookies).
 *   4. FE sends the token back as `X-CSRF-Token` header on mutating requests.
 *   5. Backend validates: header value === cookie value.
 *
 * Token expiration mirrors the backend cookie maxAge (minus a safety buffer,
 * configured via `csrfTokenMaxAgeSeconds`) so the FE transparently re-fetches
 * before the server-side cookie actually expires.
 */
class ICsrfService {
    http = inject(HttpClient);
    config = inject(INSIGHT_AUTH_CONFIG);
    /** In-memory CSRF token — retrieved from the backend response body, never from document.cookie directly. */
    token = null;
    tokenFetchedAt = null;
    /**
     * Return the in-memory CSRF token, or `null` if never fetched or expired
     * (expiry triggers callers to re-invoke `ensureToken()`).
     */
    getToken() {
        if (this.token && this.isTokenExpired()) {
            return null;
        }
        return this.token;
    }
    /** Whether the in-memory token has exceeded its TTL (`csrfTokenMaxAgeSeconds`). */
    isTokenExpired() {
        if (this.tokenFetchedAt === null) {
            return false;
        }
        const maxAgeMs = (this.config.csrfTokenMaxAgeSeconds ?? 7170) * 1000;
        return Date.now() - this.tokenFetchedAt >= maxAgeMs;
    }
    /**
     * Fetch a fresh CSRF token from `iam-identity-api` and store it in memory.
     * On failure the error is propagated (callers that want best-effort behavior
     * can catch it) — a failed fetch must not be silently swallowed, e.g. so the
     * `retryOnCsrfError` pattern can re-trigger the fetch.
     */
    ensureToken() {
        return this.http
            .get(`${this.config.api.identity}/auth/csrf`, { withCredentials: true })
            .pipe(tap((res) => {
            this.token = res.csrfToken ?? null;
            this.tokenFetchedAt = Date.now();
        }), map$1(() => undefined), catchError((err) => {
            // Never log the token itself — status code only.
            console.warn('[@insight/ui][CSRF] Failed to fetch CSRF token', err?.status);
            return throwError(() => err);
        }));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ICsrfService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ICsrfService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ICsrfService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/**
 * Build the full external URL to iam-web's signin page for a cross-domain SSO
 * redirect, routing the eventual handoff through THIS APP'S OWN callback
 * route (`config.callbackPath`, default `/auth/callback`) — never through the
 * page the user originally tried to visit.
 *
 * This is deliberate and fixes a real redirect loop: if the guard/interceptor
 * used `window.location.href` (the current page) as the returnUrl directly,
 * iam-web's handoff would append `#at=<token>` to THAT SAME page. Since that
 * page still doesn't have a stored session yet at the moment it re-renders,
 * the guard would fire again, capture `window.location.href` again — which
 * NOW ALREADY CONTAINS the previous `#at=` fragment — and redirect back to
 * iam-web with an ever-growing `returnUrl`, eventually overflowing header
 * size limits (HTTP 431).
 *
 * Routing through a dedicated callback route breaks the loop: the callback
 * page (`IAuthCallback`) consumes and strips the token BEFORE navigating
 * (via the in-app router, not a full reload) to `targetPath` — so the guard
 * only ever sees a clean, token-free URL on its next check.
 */
function buildExternalSigninUrl(config, targetPath) {
    const callbackPath = config.callbackPath ?? '/auth/callback';
    const callbackUrl = `${window.location.origin}${callbackPath}?returnUrl=${encodeURIComponent(targetPath)}`;
    return `${config.signinUrl}?returnUrl=${encodeURIComponent(callbackUrl)}`;
}

const UNSAFE_KEYS = new Set(['__proto__', 'constructor', 'prototype']);
const isRecord = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);
const readString = (value, key) => {
    const candidate = value[key];
    return typeof candidate === 'string' && candidate.trim().length > 0 ? candidate : undefined;
};
const readNumber = (value, key) => {
    const candidate = value[key];
    return typeof candidate === 'number' && Number.isFinite(candidate) ? candidate : undefined;
};
const toSafeExtensionValue = (value, ancestors = new Set()) => {
    if (value === null || typeof value === 'string' || typeof value === 'boolean') {
        return value;
    }
    if (typeof value === 'number') {
        return Number.isFinite(value) ? value : undefined;
    }
    if (typeof value !== 'object' || ancestors.has(value)) {
        return undefined;
    }
    const nextAncestors = new Set(ancestors).add(value);
    if (Array.isArray(value)) {
        const result = [];
        for (const item of value) {
            const safeItem = toSafeExtensionValue(item, nextAncestors);
            if (safeItem !== undefined) {
                result.push(safeItem);
            }
        }
        return result;
    }
    const result = {};
    for (const [key, item] of Object.entries(value)) {
        if (UNSAFE_KEYS.has(key)) {
            continue;
        }
        const safeItem = toSafeExtensionValue(item, nextAncestors);
        if (safeItem !== undefined) {
            result[key] = safeItem;
        }
    }
    return result;
};
const readRetryAfterHeader = (transport) => {
    const headers = transport['headers'];
    if (!isRecord(headers) || typeof headers['get'] !== 'function') {
        return undefined;
    }
    const value = headers['get']('Retry-After');
    if (typeof value !== 'string' || value.trim().length === 0) {
        return undefined;
    }
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
};
/**
 * Purely normalizes current error bodies, legacy Problem Details bodies, and
 * raw Angular `HttpErrorResponse`-like values into one strict shape.
 */
const normalizeApiError = (error) => {
    const transport = isRecord(error) ? error : {};
    const nestedBody = isRecord(transport['error']) ? transport['error'] : undefined;
    const body = nestedBody ?? transport;
    const normalized = {};
    for (const [key, value] of Object.entries(body)) {
        if (UNSAFE_KEYS.has(key)) {
            continue;
        }
        const safeValue = toSafeExtensionValue(value);
        if (safeValue !== undefined) {
            normalized[key] = safeValue;
        }
    }
    const status = readNumber(transport, 'status') ?? readNumber(body, 'status');
    const bodyMessage = readString(body, 'message');
    const retryAfter = readNumber(body, 'retryAfter') ?? readRetryAfterHeader(transport);
    if (status !== undefined)
        normalized.status = status;
    if (bodyMessage !== undefined)
        normalized.message = bodyMessage;
    if (retryAfter !== undefined)
        normalized.retryAfter = retryAfter;
    return normalized;
};
/**
 * Resolves display text in the approved order: backend `message`, optional
 * catalog lookup, legacy `detail`/`title`, then the caller's local fallback.
 */
const resolveApiErrorDisplayMessage = (error, localFallback, catalogResolver) => {
    const normalized = normalizeApiError(error);
    const backendMessage = normalized.message;
    if (backendMessage) {
        return backendMessage;
    }
    if (catalogResolver && normalized.errorCode) {
        try {
            const catalogMessage = catalogResolver(normalized.errorCode, normalized.revision, normalized);
            if (catalogMessage?.trim()) {
                return catalogMessage;
            }
        }
        catch {
            // A consumer catalog is optional; lookup failures fall through safely.
        }
    }
    return normalized.detail ?? normalized.title ?? localFallback;
};

const valueAt = (value, key) => {
    if (typeof value !== 'object' || value === null) {
        return undefined;
    }
    const candidate = value[key];
    return typeof candidate === 'string' && candidate.length > 0 ? candidate : undefined;
};
/** Supports normalized Problem Details errors and raw legacy HTTP error bodies. */
const extractProblemDetailsErrorCode = (error) => {
    if (error === null || error === undefined) {
        return undefined;
    }
    const problem = error;
    return (problem.errorCode ??
        problem.code ??
        valueAt(error?.error, 'errorCode') ??
        valueAt(error?.error, 'code'));
};
/** Maps current backend and legacy error codes to the session-expired UI states. */
const toSessionExpiredReason = (errorCode) => {
    switch (errorCode) {
        case 'AUTH_TOKEN_EXPIRED':
        case 'TOKEN_EXPIRED':
        case 'AUTH_NO_SESSION':
            return 'TOKEN_EXPIRED';
        case 'AUTH_SESSION_REVOKED':
        case 'SESSION_REVOKED':
            return 'SESSION_REVOKED';
        case 'AUTH_SESSION_REPLACED':
        case 'SESSION_REPLACED':
            return 'SESSION_REPLACED';
        default:
            return undefined;
    }
};
/**
 * True when an error is semantically a session-expiry event (HTTP 401/498 or a
 * recognized session-related error code). Other statuses are business/transport
 * errors and must be handled by the caller instead of forcing a logout.
 */
const isSessionExpiredError = (error) => {
    if (error instanceof HttpErrorResponse) {
        if (error.status === 401 || error.status === 498) {
            return true;
        }
    }
    if (error?.status === 401 || error?.status === 498) {
        return true;
    }
    return toSessionExpiredReason(extractProblemDetailsErrorCode(error)) !== undefined;
};
/**
 * In-memory overlay state for the session-expired UI.
 *
 * Besides the derived `reason`, the service exposes current backend error
 * fields and legacy `detail` so the shared dialog or consumer UI can resolve
 * display text without making its own configuration API call.
 *
 * @overridable — consumers may provide `{ provide: SessionExpiredService, useClass: ... }`.
 */
class SessionExpiredService {
    visible = signal(false, ...(ngDevMode ? [{ debugName: "visible" }] : []));
    returnUrl = signal('/', ...(ngDevMode ? [{ debugName: "returnUrl" }] : []));
    reason = signal(undefined, ...(ngDevMode ? [{ debugName: "reason" }] : []));
    /** Raw error code from the backend Problem Details response (e.g. `AUTH_TOKEN_EXPIRED`). */
    errorCode = signal(null, ...(ngDevMode ? [{ debugName: "errorCode" }] : []));
    /** Backend-provided `detail` message from the Problem Details response — display fallback. */
    detail = signal(null, ...(ngDevMode ? [{ debugName: "detail" }] : []));
    /** Backend-provided message from the current error contract — highest display precedence. */
    message = signal(null, ...(ngDevMode ? [{ debugName: "message" }] : []));
    /** Full normalized error, including revision and safe extension fields. */
    apiError = signal(null, ...(ngDevMode ? [{ debugName: "apiError" }] : []));
    show(returnUrl, reason, errorCode, detail, message, apiError) {
        this.returnUrl.set(returnUrl || '/');
        this.reason.set(reason);
        this.errorCode.set(errorCode ?? null);
        this.detail.set(detail ?? null);
        this.message.set(message ?? null);
        this.apiError.set(apiError ?? null);
        this.visible.set(true);
    }
    hide() {
        this.visible.set(false);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: SessionExpiredService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: SessionExpiredService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: SessionExpiredService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

// Sentinel header set by `IApiService` when a call opts out of the Bearer
// header (`IApiOptions.skipBearer`). Read and stripped by this interceptor so
// it never reaches the server.
const IH_SKIP_BEARER_HEADER = 'X-IH-Skip-Bearer';
// Endpoints that must never receive a Bearer header (would be circular / not
// yet authenticated) — CSRF + silent refresh are called before a token exists.
const AUTH_SKIP_URLS = ['/auth/csrf', '/auth/refresh'];
const isAuthSkipUrl = (url) => AUTH_SKIP_URLS.some((skip) => url.includes(skip));
const addAuthHeader = (req, token) => req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });
/**
 * Auth HTTP interceptor for @insight/ui consumer apps.
 *
 * Attaches the in-memory access token as a Bearer header. On 401, attempts a
 * single silent refresh (via the HttpOnly refresh cookie) and retries once;
 * on refresh failure, clears the session and redirects to iam-web's signin
 * page. 429 (rate-limit) and 423 (lockout) responses are passed through;
 * `IApiService` normalizes their current or legacy backend error fields.
 */
const authInterceptor = (req, next) => {
    const session = inject(ISessionService);
    const config = inject(INSIGHT_AUTH_CONFIG);
    const sessionExpired = inject(SessionExpiredService);
    if (isAuthSkipUrl(req.url)) {
        return next(req);
    }
    // Per-request opt-out (IApiService `skipBearer`): strip the sentinel header
    // and forward the request without an Authorization header.
    if (req.headers.has(IH_SKIP_BEARER_HEADER)) {
        return next(req.clone({ headers: req.headers.delete(IH_SKIP_BEARER_HEADER) }));
    }
    const token = session.getAccessToken();
    const outgoing = token ? addAuthHeader(req, token) : req;
    return next(outgoing).pipe(catchError((err) => {
        if (!(err instanceof HttpErrorResponse) || err.status !== 401) {
            return throwError(() => err);
        }
        return session.refreshToken().pipe(switchMap((newToken) => next(addAuthHeader(req, newToken))), catchError((refreshErr) => {
            session.clearSession();
            if (config.onUnauthorized) {
                // Consumer-provided handler takes full control of the unauthorized flow.
                config.onUnauthorized(refreshErr);
            }
            else if ((config.unauthorizedHandling ?? 'dialog') === 'dialog') {
                // Default: surface the library session-expired overlay (rendered by
                // the consumer app) instead of leaving the page.
                const apiError = normalizeApiError(refreshErr);
                const errorCode = extractProblemDetailsErrorCode(apiError);
                const reason = toSessionExpiredReason(errorCode);
                const targetPath = window.location.pathname + window.location.search;
                sessionExpired.show(targetPath, reason, errorCode, apiError.detail, apiError.message, apiError);
            }
            else {
                // Legacy: full-page redirect to iam-web's signin page. Use the
                // current path (no hash/token) as the target, routed through the
                // callback route, same as authGuard, to avoid a redirect loop.
                const targetPath = window.location.pathname + window.location.search;
                window.location.href = buildExternalSigninUrl(config, targetPath);
            }
            return throwError(() => refreshErr);
        }));
    }));
};

/**
 * Standardized HTTP client for @insight/ui consumer apps.
 * Mirrors iam-web's `IApiService`: `withCredentials: true` on every request
 * (required for the CSRF cookie and the HttpOnly refresh cookie to flow),
 * automatic `X-CSRF-Token` header injection, transparent response typing
 * (`T`, no wrapper), and normalized current/legacy backend errors. New
 * `errorCode`/`message`/`revision` responses and safe extensions are retained,
 * while legacy Problem Details `detail`/`title`/`code` remains compatible.
 */
class IApiService {
    http = inject(HttpClient);
    csrf = inject(ICsrfService);
    config = inject(INSIGHT_AUTH_CONFIG);
    get headers() {
        const base = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        const csrfToken = this.csrf.getToken();
        if (csrfToken) {
            base['X-CSRF-Token'] = csrfToken;
        }
        if (this.config.apiKey) {
            base['Api-Key'] = this.config.apiKey;
        }
        return base;
    }
    /** Merge default headers with per-call overrides, adding the skip-bearer sentinel when requested. */
    mergeHeaders(options) {
        const merged = { ...this.headers, ...options?.headers };
        if (options?.skipBearer) {
            merged[IH_SKIP_BEARER_HEADER] = 'true';
        }
        return merged;
    }
    /** Normalize current, legacy, and raw transport errors without losing safe extensions. */
    enrichError(err) {
        return throwError(() => normalizeApiError(err));
    }
    get(path, params, options) {
        const baseUrl = options?.apiUrl ?? this.config.api.identity;
        const mergedHeaders = this.mergeHeaders(options);
        return this.http
            .get(`${baseUrl}${path}`, { params, withCredentials: true, headers: mergedHeaders })
            .pipe(map$1((res) => res), catchError((err) => this.enrichError(err)));
    }
    post(path, body = {}, options) {
        const baseUrl = options?.apiUrl ?? this.config.api.identity;
        const mergedHeaders = this.mergeHeaders(options);
        return this.http
            .post(`${baseUrl}${path}`, body, { withCredentials: true, headers: mergedHeaders })
            .pipe(map$1((res) => res), catchError((err) => this.enrichError(err)));
    }
    put(path, body = {}, options) {
        const baseUrl = options?.apiUrl ?? this.config.api.identity;
        const mergedHeaders = this.mergeHeaders(options);
        return this.http
            .put(`${baseUrl}${path}`, body, { withCredentials: true, headers: mergedHeaders })
            .pipe(map$1((res) => res), catchError((err) => this.enrichError(err)));
    }
    delete(path, options) {
        const baseUrl = options?.apiUrl ?? this.config.api.identity;
        const mergedHeaders = this.mergeHeaders(options);
        // Fastify rejects Content-Type: application/json with an empty body
        if (!options?.body) {
            delete mergedHeaders['Content-Type'];
        }
        return this.http
            .delete(`${baseUrl}${path}`, {
            withCredentials: true,
            headers: mergedHeaders,
            body: options?.body,
        })
            .pipe(map$1((res) => res), catchError((err) => this.enrichError(err)));
    }
    getBlob(path, params, options) {
        const baseUrl = options?.apiUrl ?? this.config.api.identity;
        const mergedHeaders = this.mergeHeaders(options);
        return this.http
            .get(`${baseUrl}${path}`, { params, withCredentials: true, headers: mergedHeaders, responseType: 'blob' })
            .pipe(catchError((err) => this.enrichError(err)));
    }
    upload(path, file, options) {
        const baseUrl = options?.apiUrl ?? this.config.api.identity;
        const body = file instanceof FormData
            ? file
            : (() => {
                const fd = new FormData();
                fd.append('file', file);
                return fd;
            })();
        // Content-Type intentionally omitted — the browser sets the multipart boundary automatically.
        const headers = { ...options?.headers };
        const csrfToken = this.csrf.getToken();
        if (csrfToken) {
            headers['X-CSRF-Token'] = csrfToken;
        }
        if (this.config.apiKey) {
            headers['Api-Key'] = this.config.apiKey;
        }
        if (options?.skipBearer) {
            headers[IH_SKIP_BEARER_HEADER] = 'true';
        }
        return this.http
            .post(`${baseUrl}${path}`, body, { withCredentials: true, headers })
            .pipe(map$1((res) => res), catchError((err) => this.enrichError(err)));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IApiService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IApiService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IApiService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/**
 * Login lockout constants (local, client-side supplement to Keycloak
 * brute-force protection). 5 failed attempts → 1-minute suspend; counter
 * resets after 12h idle or a successful login.
 */
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 1 * 60 * 1000;
const IDLE_RESET_MS = 12 * 60 * 60 * 1000;
const LOCK_STORAGE_KEY = 'iam.mock.login_lockout';
/**
 * iam-identity-api auth facade (Mode 2 proxy — Keycloak is never exposed to the
 * frontend). Base URL = `{api.identity}` from the resolved auth config.
 *
 * @overridable — consumers may provide `{ provide: IAuthService, useClass: ... }`.
 */
class IAuthService {
    api = inject(IApiService);
    config = inject(INSIGHT_AUTH_CONFIG);
    get identityUrl() {
        return this.config.api.identity;
    }
    login(username, password, recaptchaToken, isChallengeResponse) {
        const cleanUsername = username.trim().toLowerCase();
        const lockData = this.getLockoutData(cleanUsername);
        if (lockData.lockedUntil && lockData.lockedUntil > Date.now()) {
            const retryAfter = Math.ceil((lockData.lockedUntil - Date.now()) / 1000);
            return throwError(() => ({
                status: 423,
                message: 'Login access is temporarily restricted. Please try again in a few moments.',
                detail: 'Login access is temporarily restricted. Please try again in a few moments.',
                retryAfter,
            }));
        }
        return this.api
            .post('/auth/login', {
            username,
            password,
            recaptchaToken,
            isChallengeResponse: isChallengeResponse ?? false,
        })
            .pipe(tap((res) => {
            if (res.accessToken || res.mfaRequired || res.passwordExpired) {
                this.resetLockout(cleanUsername);
            }
        }), catchError((err) => {
            if (err?.status === 401 || err?.status === 423) {
                this.recordFailedAttempt(cleanUsername);
            }
            return throwError(() => err);
        }));
    }
    /** Silently refresh the access token via the HttpOnly refresh-token cookie. */
    refresh() {
        return this.api.post('/auth/refresh', {});
    }
    /** Clear the server-side session and expire the HttpOnly refresh cookie. */
    logout(refreshToken) {
        return this.api.post('/auth/logout', { refreshToken }).pipe(map$1(() => undefined));
    }
    /** Exchange a short-lived `at=` auth token for a full session (cross-app handoff). */
    exchangeAuthToken(authToken) {
        return this.api.post('/auth/exchange', {}, { headers: { Authorization: authToken } });
    }
    /** Verify the MFA TOTP code during a login challenge. */
    verifyMfaChallenge(mfaSessionId, totpCode) {
        return this.api.post('/auth/mfa/verify', { mfaSessionId, totpCode });
    }
    /** Verify the TOTP code during first-time MFA enrollment (forced at login). */
    verifyMfaEnroll(mfaSessionId, totpCode) {
        return this.api.post('/auth/mfa/enroll/verify', { mfaSessionId, totpCode });
    }
    /** Self-service MFA — check enrollment status (`GET /profile/mfa`). */
    selfServiceGetStatus() {
        return this.api.get('/profile/mfa');
    }
    /** Self-service MFA — initiate enrollment to get the QR & session id (`POST /profile/mfa/enroll`). */
    selfServiceEnrollInitiate() {
        return this.api.post('/profile/mfa/enroll', {});
    }
    /** Self-service MFA — verify OTP and complete enrollment (`POST /profile/mfa/enroll/verify`). */
    selfServiceEnrollVerify(enrollmentSessionId, totpCode) {
        return this.api
            .post('/profile/mfa/enroll/verify', { enrollmentSessionId, totpCode })
            .pipe(map$1(() => undefined));
    }
    /** Self-service reset (un-enroll) MFA for the current user — requires password (`DELETE /profile/mfa`). */
    selfServiceResetMfa(userSub, password) {
        return this.api
            .delete('/profile/mfa', { apiUrl: this.identityUrl, body: { password } })
            .pipe(map$1(() => undefined));
    }
    /**
     * Change password when it has expired (forced change flow). Uses a short-lived
     * `changePasswordToken` (10 min, scope `change_password_only`) as the Bearer
     * header. Backend returns a full accessToken on success so the user continues
     * seamlessly without re-login.
     */
    changePassword(changePasswordToken, newPassword, confirmPassword) {
        return this.api.post('/auth/change-password', { newPassword, confirmPassword }, { headers: { Authorization: `Bearer ${changePasswordToken}` } });
    }
    /** Request a password-reset link via email or WhatsApp (`POST /auth/forgot-password`). */
    forgotPassword(identifier, mode) {
        return this.api.post('/auth/forgot-password', {
            identifier,
            method: mode,
        });
    }
    /** Validate a reset token before showing the reset form (`GET /auth/reset-password/validate`). */
    validateResetToken(token) {
        return this.api.get('/auth/reset-password/validate', new HttpParams().set('token', token));
    }
    /** Submit a new password using the reset token (`POST /auth/reset-password`). */
    resetPassword(token, newPassword, confirmPassword) {
        return this.api.post('/auth/reset-password', { token, newPassword, confirmPassword });
    }
    // ─── Login lockout helpers (sessionStorage per-username) ─────────────────────
    getLockoutData(username) {
        try {
            const raw = sessionStorage.getItem(`${LOCK_STORAGE_KEY}_${username}`);
            const data = raw ? JSON.parse(raw) : { attempts: 0, lockedUntil: null, lastAttemptAt: null };
            if (data.lastAttemptAt && Date.now() - data.lastAttemptAt >= IDLE_RESET_MS) {
                return { attempts: 0, lockedUntil: null, lastAttemptAt: null };
            }
            return data;
        }
        catch {
            return { attempts: 0, lockedUntil: null, lastAttemptAt: null };
        }
    }
    recordFailedAttempt(username) {
        const data = this.getLockoutData(username);
        data.attempts += 1;
        data.lastAttemptAt = Date.now();
        if (data.attempts >= MAX_LOGIN_ATTEMPTS - 1) {
            data.lockedUntil = Date.now() + LOCKOUT_DURATION_MS;
        }
        sessionStorage.setItem(`${LOCK_STORAGE_KEY}_${username}`, JSON.stringify(data));
    }
    resetLockout(username) {
        sessionStorage.removeItem(`${LOCK_STORAGE_KEY}_${username}`);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IAuthService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IAuthService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IAuthService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/** Hard timeout for the single-flight refresh call (ms). */
const REFRESH_TIMEOUT_MS = 30_000;
/**
 * Minimal inline JWT payload decode — deliberately NOT using
 * `@auth0/angular-jwt` to avoid forcing a new dependency onto every
 * @insight/ui consumer. Returns `null` on any decode failure.
 */
function decodeJwtPayload(token) {
    try {
        const payload = token.split('.')[1];
        if (!payload) {
            return null;
        }
        const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
        const json = decodeURIComponent(atob(padded)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join(''));
        return JSON.parse(json);
    }
    catch {
        return null;
    }
}
/** Decodes an `IAuthUser` from the token's Keycloak claims. */
function decodeUser(accessToken) {
    const decoded = decodeJwtPayload(accessToken);
    const realmAccess = decoded?.['realm_access'];
    const roles = Array.isArray(realmAccess?.roles) ? realmAccess.roles : [];
    return {
        sub: typeof decoded?.['sub'] === 'string' ? decoded['sub'] : '',
        email: typeof decoded?.['email'] === 'string' ? decoded['email'] : '',
        name: typeof decoded?.['name'] === 'string' ? decoded['name'] : '',
        roles,
        userType: decoded?.['user_type'] === 'external' ? 'external' : 'internal',
    };
}
/**
 * Session management for @insight/ui consumer apps.
 *
 * Access token: stored IN MEMORY only (never Web Storage). Refresh token:
 * HttpOnly cookie managed exclusively by iam-identity-api; this service never
 * reads or stores it directly (an in-memory `refreshToken` is kept only for
 * server-side logout).
 *
 * Superset of the basic SSO session (used by remote apps via `setAccessToken` /
 * `authGuard` / `IAuthCallback`) and the richer iam-web session (session
 * restore, password-expiry, change-password token, proactive validation,
 * session-expired overlay).
 *
 * @overridable — consumers may provide `{ provide: ISessionService, useClass: ... }`.
 */
class ISessionService {
    authService = inject(IAuthService);
    config = inject(INSIGHT_AUTH_CONFIG);
    sessionExpiredService = inject(SessionExpiredService);
    csrf = inject(ICsrfService);
    // In-memory token storage — intentionally NOT persisted to Web Storage.
    accessToken = null;
    _refreshToken = null;
    expiresAt = null;
    sessionStartedAt = null;
    currentUser = null;
    passwordExpired = false;
    changePasswordTokenValue = null;
    lastVerifiedAt = 0;
    /**
     * True while the app is restoring/validating the session on load (starts
     * `true` on cold start so guards can allow navigation during the restore and
     * consumer apps can show a loading state). Cleared once the session is
     * established (`setAccessToken`/`setSession`) or `tryRestoreSession()` settles.
     */
    initializing = signal(true, ...(ngDevMode ? [{ debugName: "initializing" }] : []));
    // Single-flight refresh: one in-flight /auth/refresh shared by all callers,
    // retained until it completes/errors so a cancelled caller cannot abort it.
    refreshInFlight = null;
    // Single-flight cold-start restore so multiple callers (e.g. provideInsightAuth()
    // via APP_INITIALIZER and a consumer's root component) never trigger duplicate
    // /auth/refresh requests.
    restoreInFlight = null;
    isAuth() {
        return !!this.accessToken && !this.isTokenExpired() && !this.isSsoSessionExpired();
    }
    isTokenExpired() {
        if (!this.accessToken || this.expiresAt === null) {
            return true;
        }
        return Date.now() >= this.expiresAt;
    }
    /**
     * Whether the max SSO session duration has been exceeded (default 15h,
     * configured via `tokenLifespan.ssoSessionMaxSeconds`). After this, the
     * user must re-authenticate regardless of token state.
     */
    isSsoSessionExpired() {
        if (this.sessionStartedAt === null) {
            return false;
        }
        const maxDurationMs = this.config.tokenLifespan.ssoSessionMaxSeconds * 1000;
        return Date.now() - this.sessionStartedAt >= maxDurationMs;
    }
    isPasswordExpired() {
        return this.passwordExpired;
    }
    clearPasswordExpired() {
        this.passwordExpired = false;
    }
    setPasswordExpired() {
        this.passwordExpired = true;
    }
    setChangePasswordToken(token) {
        this.changePasswordTokenValue = token;
        sessionStorage.setItem('iam.changePasswordToken', token);
    }
    getChangePasswordToken() {
        if (this.changePasswordTokenValue) {
            return this.changePasswordTokenValue;
        }
        const stored = sessionStorage.getItem('iam.changePasswordToken');
        if (stored) {
            this.changePasswordTokenValue = stored;
            return stored;
        }
        return null;
    }
    clearChangePasswordToken() {
        this.changePasswordTokenValue = null;
        sessionStorage.removeItem('iam.changePasswordToken');
    }
    getAccessToken() {
        return this.accessToken;
    }
    getRefreshToken() {
        return this._refreshToken;
    }
    getUser() {
        return this.currentUser;
    }
    /** Role-membership check against the decoded token roles (ANY match). */
    hasMn(mn) {
        const roles = this.getRoles();
        if (Array.isArray(mn)) {
            return mn.some((m) => roles.includes(m));
        }
        return roles.includes(mn);
    }
    /**
     * Roles claimed by the current access token (Keycloak `realm_access.roles`).
     * Returns an empty array while no token is set. Used by role-mode permission
     * checks (`ihHasMn` / `ihNotHasMn` with `source: 'role'`).
     */
    getRoles() {
        if (!this.accessToken) {
            return [];
        }
        const decoded = decodeJwtPayload(this.accessToken);
        const roles = decoded?.realm_access?.roles;
        return Array.isArray(roles) ? roles.filter((role) => typeof role === 'string') : [];
    }
    /** True if the current access token claims ANY of the given roles. */
    hasRole(code) {
        const roles = this.getRoles();
        if (Array.isArray(code)) {
            return code.some((role) => roles.includes(role));
        }
        return roles.includes(code);
    }
    /**
     * Store the access token received from the SSO handoff (URL hash fragment)
     * or from a refresh response. `expiresIn` (seconds) defaults to the token's
     * own `exp` claim, then falls back to the configured `accessTokenSeconds`.
     */
    setAccessToken(accessToken, expiresIn) {
        this.accessToken = accessToken;
        const effectiveExpiresIn = expiresIn ?? this.readExpiresInFromToken(accessToken) ?? this.config.tokenLifespan.accessTokenSeconds;
        // 30-second buffer to avoid edge cases, matches iam-web's convention.
        this.expiresAt = Date.now() + (effectiveExpiresIn - 30) * 1000;
        if (this.sessionStartedAt === null) {
            this.sessionStartedAt = Date.now();
        }
        this.initializing.set(false);
    }
    /**
     * Full session establishment (login / MFA / exchange / refresh). Sets the
     * user, decodes password-expiry claims, stamps the last-verified time, and
     * marks an active session so `tryRestoreSession()` can distinguish a cold
     * start from a refresh-after-revocation.
     */
    setSession(accessToken, expiresIn, user, refreshToken) {
        this.accessToken = accessToken;
        if (refreshToken) {
            this._refreshToken = refreshToken;
        }
        this.expiresAt = Date.now() + (expiresIn - 30) * 1000;
        this.currentUser = user;
        this.sessionStartedAt = Date.now();
        const decoded = decodeJwtPayload(accessToken);
        const neverExpired = decoded?.['never_expired'] === true;
        const pwdExpired = decoded?.['pwd_expired'] === true;
        this.passwordExpired = !neverExpired && pwdExpired;
        sessionStorage.setItem('iam.session.active', 'true');
        this.lastVerifiedAt = Date.now();
        this.initializing.set(false);
    }
    clearSession() {
        this.accessToken = null;
        this._refreshToken = null;
        this.expiresAt = null;
        this.currentUser = null;
        this.passwordExpired = false;
        this.sessionStartedAt = null;
        this.changePasswordTokenValue = null;
        sessionStorage.removeItem('iam.changePasswordToken');
        // NOTE: `iam.session.active` is intentionally NOT cleared here — it must
        // survive mid-session revocation so `tryRestoreSession()` can detect
        // "refresh after revocation" on the next load; explicit logout clears it.
    }
    /**
     * Clears the client-side session AND invalidates the server-side session
     * by revoking the refresh token. Returns an observable that completes after
     * the server logout call finishes (or fails — failures are swallowed so the
     * user is never stuck on a logout page).
     */
    logout() {
        const refreshToken = this._refreshToken ?? undefined;
        this.clearSession();
        // Explicit logout also clears the "active session" flag so a later
        // tryRestoreSession() treats the next load as a cold start, not a
        // refresh-after-revocation.
        sessionStorage.removeItem('iam.session.active');
        // Ensure a valid CSRF token first: the backend CsrfGuard requires
        // X-CSRF-Token on POST /auth/logout. Consumers that only hold the access
        // token (e.g. `#at=` handoff) never fetched a CSRF token, so without this
        // their logout is rejected with 403 and the shared HttpOnly refresh cookie
        // is never cleared — other apps in the browser stay logged in.
        return this.csrf.ensureToken().pipe(catchError(() => of(undefined)), // best-effort: still attempt the logout
        switchMap(() => this.authService.logout(refreshToken)), catchError(() => of(undefined)), map$1(() => undefined));
    }
    /**
     * Silently refresh the access token via the HttpOnly refresh cookie
     * (`POST {api.identity}/auth/refresh`, `withCredentials: true`).
     * Single-flight: concurrent callers share the in-flight refresh; the shared
     * observable is retained until it completes/errors so a cancelled caller
     * cannot abort the fetch.
     */
    refreshToken() {
        let inFlight = this.refreshInFlight;
        if (!inFlight) {
            const source = this.authService.refresh().pipe(timeout({
                each: REFRESH_TIMEOUT_MS,
                with: () => throwError(() => new Error(`Refresh request timed out after ${REFRESH_TIMEOUT_MS}ms`)),
            }), tap((res) => {
                this.setSession(res.accessToken, res.expiresIn, this.currentUser ?? decodeUser(res.accessToken), res.refreshToken);
            }), map$1((res) => res.accessToken), catchError((err) => {
                console.warn('[@insight/ui][SESSION] silent refresh failed', {
                    status: err?.status,
                    errorCode: extractProblemDetailsErrorCode(err),
                });
                return throwError(() => err);
            }), shareReplay({ bufferSize: 1, refCount: true }));
            inFlight = source;
            this.refreshInFlight = source;
            source.subscribe({
                error: () => {
                    this.refreshInFlight = null;
                },
                complete: () => {
                    this.refreshInFlight = null;
                },
            });
        }
        return inFlight;
    }
    /** True if the session was verified against the backend within `cooldownMs` (default 30s). */
    isRecentlyVerified(cooldownMs = 30_000) {
        return !!this.accessToken && Date.now() - this.lastVerifiedAt < cooldownMs;
    }
    /**
     * Proactive session validation for guards. Refreshes the token to check
     * session validity WITHOUT resetting the SSO session timer. Skips the refresh
     * if the last check was within 30 seconds. Throws if the session was revoked
     * (e.g. `SESSION_REPLACED`).
     */
    proactiveValidate() {
        if (this.isRecentlyVerified()) {
            return of(this.accessToken);
        }
        const savedStartedAt = this.sessionStartedAt;
        return this.refreshToken().pipe(tap(() => {
            this.sessionStartedAt = savedStartedAt;
        }));
    }
    /**
     * Cold-start session restore from the HttpOnly cookie (called on app load).
     * Skips non-signin auth sub-pages (forgot/reset password, MFA, callback).
     * The signin page ALWAYS attempts the silent refresh: when the shared SSO
     * cookie is still valid (e.g. after logging in via another app), restoring
     * lets the signin page auto-redirect to the returnUrl / authenticated
     * landing; when there is no session the refresh fails and the login form
     * shows. (Explicit logout clears the cookie, so a bare signin after logout
     * still ends up on the login form.) Shows the session-expired overlay when
     * refreshing after a previously-active session. Returns the reason (if any)
     * extracted from the error so the guard can decide overlay vs. signin.
     */
    tryRestoreSession() {
        if (this.restoreInFlight) {
            return this.restoreInFlight;
        }
        const pathname = window.location.pathname ?? '';
        const isSigninPage = /^\/auth\/signin$|^\/signin$/i.test(pathname);
        const isOtherAuthPage = /^\/auth(\/|$)|^\/forgot-password|^\/reset-password/i.test(pathname) && !isSigninPage;
        if (isOtherAuthPage) {
            this.initializing.set(false);
            return Promise.resolve({});
        }
        const restorePromise = lastValueFrom(this.authService.refresh().pipe(tap((res) => {
            this.setSession(res.accessToken, res.expiresIn, decodeUser(res.accessToken), res.refreshToken);
        }), map$1(() => ({}))), { defaultValue: {} }).catch((err) => {
            console.debug('[@insight/ui][SESSION] tryRestoreSession: FAILED', {
                status: err?.status,
            });
            const rawErrorCode = extractProblemDetailsErrorCode(err);
            const code = toSessionExpiredReason(rawErrorCode);
            const wasActive = sessionStorage.getItem('iam.session.active') === 'true';
            // The session-expired overlay is only for mid-session revocation while the
            // user is browsing the app. NEVER show it over an auth/signin page — a
            // failed restore there simply means "show the login form". This matters
            // for cross-app logouts: `iam.session.active` lives in THIS origin's
            // sessionStorage and is NOT cleared when the user logs out from another
            // SSO app (e.g. atlas-web), so without this guard the stale flag would
            // wrongly pop the overlay on the signin page after an external logout.
            const isAuthPage = /^\/auth(\/|$)|^\/signin$|^\/logout$/i.test(pathname);
            if (wasActive && !isAuthPage && isSessionExpiredError(err)) {
                // Preserve the current backend message and normalized error alongside
                // legacy fields so the dialog can apply the shared display precedence.
                const apiError = normalizeApiError(err);
                this.sessionExpiredService.show(pathname, code ?? 'TOKEN_EXPIRED', rawErrorCode, apiError.detail, apiError.message, apiError);
            }
            if (isSessionExpiredError(err)) {
                this.authService.logout().subscribe({ error: () => void 0 });
            }
            return { reason: code };
        });
        const safetyTimer = new Promise((r) => setTimeout(() => r({}), 10_000));
        this.restoreInFlight = Promise.race([restorePromise, safetyTimer]).finally(() => {
            this.initializing.set(false);
        });
        return this.restoreInFlight;
    }
    readExpiresInFromToken(token) {
        const decoded = decodeJwtPayload(token);
        if (!decoded || typeof decoded['exp'] !== 'number') {
            return null;
        }
        return Math.max(0, decoded['exp'] - Math.floor(Date.now() / 1000));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ISessionService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ISessionService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ISessionService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/**
 * Known API error codes surfaced by the platform services (mirrors the
 * iam-user-api error catalog — see `iam-user-api/src/common/errors/user-errors.ts`).
 *
 * Consumers branch on these to tailor UX (e.g. showing the "Access Unavailable"
 * page when the current user has no application mapping).
 */
const USER_APPLICATION_MAPPING_NOT_FOUND = 'USER_APPLICATION_MAPPING_NOT_FOUND';

/**
 * Types for the current-user navigation & favorites data, matched to the
 * iam-user-api user-menu service contract (`GET {api.user}/me/menus*` and
 * `GET {api.user}/users/user`). These are the raw backend shapes; the library
 * maps them onto the UI-facing `IMenu` / `IUser` contracts via `user.mapper.ts`.
 */

/**
 * Maps the backend current-user DTO to `@insight/ui`'s sidebar `IUser` shape
 * (`employeeCode` / `fullName` / `userImagePath`), falling back to `username`.
 * `userImagePath` is `''` when no photo exists — the sidebar renders it with
 * `i-avatar`, which falls back to a user icon when the image is empty/errors.
 */
function mapToSidebarUser(user) {
    return {
        employeeCode: user.employeeCode ?? user.username ?? '',
        fullName: user.fullName ?? user.username ?? '',
        userImagePath: user.photoUrl ?? '',
    };
}
/** Maps a backend effective-menu node onto the UI-facing `IMenu` (modern shape). */
function toIMenu(node) {
    return {
        id: node.id,
        name: node.name,
        type: node.type,
        menuCode: node.menuCode,
        route: node.route,
        icon: node.icon,
        openIn: node.openIn,
        application: node.application ? { ...node.application } : null,
        companies: node.companies?.map((company) => ({ ...company })) ?? [],
        isFavorite: node.isFavorite,
        children: node.children?.map(toIMenu) ?? [],
    };
}
/** Maps an array of backend effective-menu nodes onto `IMenu[]`. */
function toIMenus(nodes) {
    return (nodes ?? []).map(toIMenu);
}
/** Maps a backend favorite item onto the UI-facing `IMenu` (modern shape). */
function toIMenuFavorite(item) {
    return {
        id: item.id,
        name: item.name,
        menuCode: item.menuCode,
        route: item.route,
        icon: item.icon,
        openIn: item.openIn,
        application: item.application ? { ...item.application } : null,
        companies: item.companies?.map((company) => ({ ...company })) ?? [],
        isFavorite: true,
    };
}
/** Recursively collects every non-null `menuCode` across a menu tree (deduplicated, order preserved). */
function collectMenuCodes(menus) {
    const codes = new Set();
    const walk = (nodes) => {
        for (const node of nodes) {
            if (node.menuCode) {
                codes.add(node.menuCode);
            }
            walk(getMenuChildren(node));
        }
    };
    walk(menus);
    return [...codes];
}
/**
 * Menu-mode permission check: returns true if the user's loaded menus contain
 * ANY of the given menu codes. An empty set of menus (not yet loaded) always
 * returns `false` — gated UI renders only once the store has data.
 */
function hasAnyMenuCode(menus, code) {
    const codes = new Set(collectMenuCodes(menus));
    if (Array.isArray(code)) {
        return code.some((item) => codes.has(item));
    }
    return codes.has(code);
}
/** First navigable leaf route in a menu tree — a sensible post-login default landing. */
function findFirstLeafRoute(menus) {
    for (const menu of menus) {
        if (isLeafItem(menu)) {
            const route = getMenuRoute(menu);
            if (route) {
                return route;
            }
        }
        const childRoute = findFirstLeafRoute(getMenuChildren(menu));
        if (childRoute) {
            return childRoute;
        }
    }
    return null;
}
/** Finds a menu node's display name by id (recursive), or null. */
function findMenuNameById(menus, menuId) {
    for (const menu of menus) {
        if (getMenuKey(menu) === menuId) {
            const label = getMenuLabel(menu);
            return label || null;
        }
        const child = findMenuNameById(getMenuChildren(menu), menuId);
        if (child) {
            return child;
        }
    }
    return null;
}

/**
 * Current-user navigation & favorites service — calls iam-user-api's
 * `/me/menus*` endpoints (user-menu service contract). These endpoints return
 * a `{ meta, data }` envelope; this service unwraps `.data` so callers keep
 * the app-wide body-as-data convention.
 *
 * Base URL: `{api.user}` from the resolved auth config (defaults to the
 * library environment file). Consumer apps override via
 * `provideInsightAuth({ api: { user: '...' } })`.
 */
class IUserMenuService {
    api = inject(IApiService);
    config = inject(INSIGHT_AUTH_CONFIG);
    get baseUrl() {
        return this.config.api['user'] ?? environment.api.user;
    }
    /** GET `{api.user}/me/menus` — effective navigation tree for one or all active applications. Output type overridable via `T`. */
    getEffectiveMenus(applicationId) {
        const id = applicationId ?? this.config.appId;
        const params = id ? new HttpParams({ fromObject: { applicationId: id } }) : undefined;
        return this.api
            .get('/me/menus', params, { apiUrl: this.baseUrl })
            .pipe(map((response) => response.data));
    }
    /** GET `{api.user}/me/menus/favorites` — effective favorite items, sorted by name. Output type overridable via `T`. */
    getFavorites(applicationId) {
        const id = applicationId ?? this.config.appId;
        const params = id ? new HttpParams({ fromObject: { applicationId: id } }) : undefined;
        return this.api
            .get('/me/menus/favorites', params, { apiUrl: this.baseUrl })
            .pipe(map((response) => response.data));
    }
    /** PUT `{api.user}/me/menus/{menuId}/favorite` — pin an effective menu item (204 No Content). */
    addFavorite(menuId) {
        return this.api.put(`/me/menus/${menuId}/favorite`, {}, { apiUrl: this.baseUrl });
    }
    /** DELETE `{api.user}/me/menus/{menuId}/favorite` — unpin a menu item (204 No Content). */
    removeFavorite(menuId) {
        return this.api.delete(`/me/menus/${menuId}/favorite`, { apiUrl: this.baseUrl });
    }
    /**
     * PUT `{api.user}/me/menus/favorites` — atomically replace the complete
     * favorite collection after a drag-drop. `displayOrder` values form the
     * complete sequence 1..n. Returns 204 No Content.
     */
    reorderFavorites(menuIds) {
        const items = menuIds.map((menuId, index) => ({
            menuId: String(menuId),
            displayOrder: index + 1,
        }));
        return this.api.put('/me/menus/favorites', { items }, { apiUrl: this.baseUrl });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IUserMenuService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IUserMenuService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IUserMenuService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/**
 * Current-user profile service — calls iam-user-api's `GET {api.user}/users/user`
 * endpoint (`CurrentUserDto`). The sidebar-shaped mapping (`IUser`) lives in
 * `user.mapper.ts` (`mapToSidebarUser`).
 *
 * Base URL: `{api.user}` from the resolved auth config (defaults to the
 * library environment file). Output type overridable via the generic — the
 * library default is the raw `IInsightCurrentUser` DTO.
 */
class ICurrentUserService {
    api = inject(IApiService);
    config = inject(INSIGHT_AUTH_CONFIG);
    get baseUrl() {
        return this.config.api['user'] ?? environment.api.user;
    }
    /** GET `{api.user}/users/user` — raw current-user DTO. Override `T` to use your own response type. */
    getCurrentUser() {
        return this.api.get('/users/user', undefined, { apiUrl: this.baseUrl });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ICurrentUserService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ICurrentUserService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ICurrentUserService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

class IUserMenuStore {
    currentUserService = inject(ICurrentUserService);
    menuService = inject(IUserMenuService);
    session = inject(ISessionService);
    /** Identity (`sub`) whose data is currently cached — invalidated on user switch. */
    loadedUserSub = null;
    /** Sidebar-shaped current user (`IUser`) — `null` until loaded. */
    currentUser = signal(null, ...(ngDevMode ? [{ debugName: "currentUser" }] : []));
    /** Raw current-user DTO as returned by the backend — `null` until loaded. */
    rawCurrentUser = signal(null, ...(ngDevMode ? [{ debugName: "rawCurrentUser" }] : []));
    /** Effective navigation tree (`IMenu` modern shape). */
    menus = signal([], ...(ngDevMode ? [{ debugName: "menus" }] : []));
    /** Favorite menus (`IMenu` modern shape). */
    favorites = signal([], ...(ngDevMode ? [{ debugName: "favorites" }] : []));
    /** Roles decoded from the access token (for `source: 'role'` permission checks). */
    roles = signal([], ...(ngDevMode ? [{ debugName: "roles" }] : []));
    /** True while the cold-start `load()` is in flight. */
    initializing = signal(false, ...(ngDevMode ? [{ debugName: "initializing" }] : []));
    /** First error encountered during `load()`, if any (e.g. `menus: ...`). */
    loadError = signal(null, ...(ngDevMode ? [{ debugName: "loadError" }] : []));
    /** Normalized per-branch errors from the last `load()` — mirrors the service API error contract. */
    loadErrors = signal({ user: null, menus: null, favorites: null }, ...(ngDevMode ? [{ debugName: "loadErrors" }] : []));
    // Reactive observable projections (used by directives/components that prefer
    // observables over signals).
    currentUser$ = toObservable(this.currentUser);
    menus$ = toObservable(this.menus);
    favorites$ = toObservable(this.favorites);
    roles$ = toObservable(this.roles);
    initializing$ = toObservable(this.initializing);
    /**
     * Post-login default landing (when no return URL is present).
     * Order: (1) first navigable favorite route, (2) first navigable menu route.
     */
    get defaultRoute() {
        return findFirstLeafRoute(this.favorites()) ?? findFirstLeafRoute(this.menus());
    }
    /** Finds a menu node's display name by id (recursive), or null. */
    findMenuName(menuId) {
        return findMenuNameById(this.menus(), menuId);
    }
    /**
     * Cold-start: fetch user + menus + favorites concurrently. A failure in one
     * branch does not block the others; `initializing` clears once all settle.
     *
     * Returns an observable that completes when the load settles, so callers can
     * await it (e.g. to navigate to `defaultRoute` after login). The load starts
     * immediately even if the caller ignores the returned observable — a shared
     * source is kept alive by an internal subscribe (fire-and-forget compatible).
     */
    load() {
        if (this.initializing()) {
            return this.initializing$.pipe(filter((init) => !init), take(1), map(() => undefined));
        }
        // Invalidate cross-session cache: if this load is for a different user
        // (`sub`) than the one whose data is cached, drop the stale data first so
        // a failed refetch (e.g. USER_APPLICATION_MAPPING_NOT_FOUND) never leaks
        // the previous user's menus/favorites into the sidebar.
        const sessionSub = this.session.getUser()?.sub ?? null;
        if (sessionSub !== this.loadedUserSub) {
            this.clearData();
            this.loadedUserSub = sessionSub;
        }
        this.initializing.set(true);
        this.loadError.set(null);
        this.loadErrors.set({ user: null, menus: null, favorites: null });
        this.roles.set(this.session.getRoles());
        const result$ = forkJoin({
            user: this.loadUserInternal().pipe(catchError((err) => this.recordError('user', err))),
            menus: this.loadMenusInternal().pipe(catchError((err) => this.recordError('menus', err))),
            favorites: this.loadFavoritesInternal().pipe(catchError((err) => this.recordError('favorites', err))),
        }).pipe(map(() => undefined), catchError(() => of(undefined)), finalize(() => this.initializing.set(false)), shareReplay({ bufferSize: 1, refCount: false }));
        // Fire-and-forget: always start the load even if the caller ignores the result.
        result$.subscribe();
        return result$;
    }
    /**
     * Clears every cached user/menu/favorite value and error state, and forgets
     * the identity they belonged to. Call on logout / session clear so no stale
     * data survives into the next login.
     */
    reset() {
        this.clearData();
        this.loadedUserSub = null;
    }
    /** Refresh roles from the current access token (call after login / token change). */
    syncRoles() {
        this.roles.set(this.session.getRoles());
    }
    /**
     * Menu-mode permission check against the in-memory menu codes (ANY match).
     * Returns `false` while menus are not yet loaded — gated UI renders only
     * after the store has data (async-aware via the reactive directives).
     */
    hasMenu(code) {
        return hasAnyMenuCode(this.menus(), code);
    }
    /** Role-mode permission check against the in-memory roles (from the access token's `realm_access.roles`). ANY match. */
    hasRole(code) {
        const roles = this.roles();
        if (Array.isArray(code)) {
            return code.some((role) => roles.includes(role));
        }
        return roles.includes(code);
    }
    /**
     * Pin (`isFavorite: true`) or unpin a menu item. Flips the star icon in the
     * `menus` tree immediately (optimistic), calls the backend, then re-fetches
     * favorites so the server remains the source of truth for the favorites
     * section. The menu-star change is reverted on error.
     */
    toggleFavorite(menuId, isFavorite) {
        const previousMenus = this.menus();
        this.menus.set(this.applyMenuFavorite(previousMenus, menuId, isFavorite));
        const call = isFavorite
            ? this.menuService.addFavorite(menuId)
            : this.menuService.removeFavorite(menuId);
        return call.pipe(switchMap(() => this.reloadFavorites()), catchError((err) => {
            this.menus.set(previousMenus);
            return throwError(() => err);
        }));
    }
    /**
     * Persists the new favorite order after a drag-drop. Reorders the in-memory
     * `favorites` signal locally (optimistic) and calls the backend — no GET
     * refetch after the write. The local change is reverted on error.
     */
    reorderFavorites(menuIds) {
        const previous = this.favorites();
        this.favorites.set(this.applyFavoriteReorder(previous, menuIds));
        return this.menuService.reorderFavorites(menuIds).pipe(catchError((err) => {
            this.favorites.set(previous);
            return throwError(() => err);
        }));
    }
    /** Re-fetches the favorites from the backend (manual refresh). */
    reloadFavorites() {
        return this.loadFavoritesInternal().pipe(map(() => undefined));
    }
    /**
     * Loads the effective navigation tree into `menus` — for one application
     * (`applicationId`) or all active applications when omitted. Returns the
     * mapped `IMenu[]`.
     */
    loadMenus(applicationId) {
        return this.menuService.getEffectiveMenus(applicationId).pipe(tap((nodes) => this.menus.set(toIMenus(nodes))), map((nodes) => toIMenus(nodes)));
    }
    /** Loads favorites into `favorites` — optionally for a single application. Returns the mapped `IMenu[]`. */
    loadFavorites(applicationId) {
        return this.menuService.getFavorites(applicationId).pipe(tap((items) => this.favorites.set(items.map(toIMenuFavorite))), map((items) => items.map(toIMenuFavorite)));
    }
    /** Returns a new menu tree with the matching node's `isFavorite` flipped (star icon). */
    applyMenuFavorite(menus, menuId, isFavorite) {
        return menus.map((menu) => {
            if (getMenuKey(menu) === menuId) {
                return { ...menu, isFavorite };
            }
            if (menu.children?.length) {
                return { ...menu, children: this.applyMenuFavorite(menu.children, menuId, isFavorite) };
            }
            if (menu.child?.length) {
                return { ...menu, child: this.applyMenuFavorite(menu.child, menuId, isFavorite) };
            }
            return menu;
        });
    }
    applyFavoriteReorder(favorites, menuIds) {
        const byId = new Map(favorites.map((favorite) => [String(getMenuKey(favorite)), favorite]));
        const ordered = [];
        const seen = new Set();
        for (const id of menuIds) {
            const item = byId.get(String(id));
            if (item) {
                ordered.push(item);
                seen.add(String(id));
            }
        }
        for (const favorite of favorites) {
            if (!seen.has(String(getMenuKey(favorite)))) {
                ordered.push(favorite);
            }
        }
        return ordered;
    }
    loadUserInternal() {
        return this.currentUserService.getCurrentUser().pipe(tap((raw) => {
            this.rawCurrentUser.set(raw);
            this.currentUser.set(mapToSidebarUser(raw));
        }), map(() => null));
    }
    loadMenusInternal() {
        return this.loadMenus().pipe(map(() => null));
    }
    loadFavoritesInternal() {
        return this.loadFavorites().pipe(map(() => null));
    }
    clearData() {
        this.currentUser.set(null);
        this.rawCurrentUser.set(null);
        this.menus.set([]);
        this.favorites.set([]);
        this.roles.set([]);
        this.loadError.set(null);
        this.loadErrors.set({ user: null, menus: null, favorites: null });
    }
    recordError(source, err) {
        const normalized = normalizeApiError(err);
        this.loadErrors.update((errors) => ({ ...errors, [source]: normalized }));
        this.loadError.set(`${source}: ${resolveApiErrorDisplayMessage(err, 'Failed to load')}`);
        // Never log sensitive data — only the load source and normalized error details.
        console.error(`[@insight/ui][STORE] load "${source}" failed`, err);
        return of(null);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IUserMenuStore, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IUserMenuStore, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IUserMenuStore, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
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
 * - IHMenu / IHSidebar kept as close as possible to original
 *
 * Sidebar navigation rule:
 * - openInNewTab === true => href + target="_blank"
 * - reload === true => href same tab
 * - route starts with "http" => href same tab
 * - otherwise => routerLink SPA navigation
 * ========================================================= */
function getMenuRoute(menu) {
    return menu?.route?.trim() || null;
}
/**
 * Very intentionally simple:
 * If route starts with "http", never use routerLink.
 */
function isHttpRoute(route) {
    return !!route?.trim().toLowerCase().startsWith('http');
}
/**
 * Node key used for tracking and selection — prefers the modern UUID `id`,
 * falls back to the legacy numeric `menuId`.
 */
function getMenuKey(menu) {
    return menu?.id ?? menu?.menuId ?? null;
}
/** Display label — prefers the modern `name`, falls back to legacy `menuName`. */
function getMenuLabel(menu) {
    return menu?.name?.trim() || menu?.menuName || '';
}
/** Children — prefers the modern `children`, falls back to legacy `child`. */
function getMenuChildren(menu) {
    return menu?.children ?? menu?.child ?? [];
}
function hasMenuChildren(menu) {
    return getMenuChildren(menu).length > 0;
}
/**
 * Walks a menu tree (roots -> children) looking for the node whose key matches
 * `targetKey`, returning the chain from the matching root down to that node.
 * Used to resolve a favorite leaf's ancestor path from the sidebar menu tree.
 */
function collectMenuChain(menus, targetKey) {
    for (const menu of menus ?? []) {
        if (String(getMenuKey(menu)) === targetKey) {
            return [menu];
        }
        const childChain = collectMenuChain(getMenuChildren(menu), targetKey);
        if (childChain) {
            return [menu, ...childChain];
        }
    }
    return null;
}
/**
 * Builds a per-menu-key ancestor path label map for the sidebar Favorites
 * section. The label is the chain of ancestor NAMES (excluding the leaf itself)
 * joined by "> ", resolved from the full menu tree - never from the item's
 * route, since route and tree position can differ. A favorite that is not
 * found in the tree maps to `undefined` (callers fall back to the app label);
 * a root-level favorite (no ancestors) maps to an empty string.
 */
function buildFavoritePathMap(menus, favorites) {
    const pathByKey = {};
    for (const favorite of favorites ?? []) {
        const key = getMenuKey(favorite);
        if (key === null)
            continue;
        const keyString = String(key);
        const chain = collectMenuChain(menus, keyString);
        if (!chain) {
            pathByKey[keyString] = undefined;
            continue;
        }
        const ancestorLabels = chain
            .slice(0, -1)
            .map((node) => getMenuLabel(node))
            .filter((label) => label.length > 0);
        pathByKey[keyString] = ancestorLabels.join(' > ');
    }
    return pathByKey;
}
/** True for a legacy top-level module header (menuTypeId === 2). */
function isModuleMenu(menu) {
    if (!menu)
        return false;
    if (menu.type)
        return false;
    return Number(menu.menuTypeId) === 2;
}
/** True for a structural group/module node (non-navigable container). */
function isGroupNode(menu) {
    if (!menu)
        return false;
    if (menu.type)
        return menu.type === 'group';
    const typeId = Number(menu.menuTypeId);
    return typeId === 2 || (typeId === 3 && hasMenuChildren(menu));
}
/** True for a navigable leaf node (item / function / legacy leaf menu). */
function isLeafItem(menu) {
    if (!menu)
        return false;
    if (menu.type)
        return menu.type === 'item' || menu.type === 'function';
    return Number(menu.menuTypeId) === 3 && !hasMenuChildren(menu);
}
function isNewTabMenu(menu) {
    const route = getMenuRoute(menu);
    if (!route)
        return false;
    if (menu?.openIn)
        return menu.openIn === 'NEW_TAB' || menu.openIn === 'NEW_WINDOW';
    return !!menu?.openInNewTab;
}
function isReloadMenu(menu) {
    const route = getMenuRoute(menu);
    if (!route)
        return false;
    if (menu?.openIn) {
        return menu.openIn === 'CURRENT_TAB' && isHttpRoute(route);
    }
    if (menu?.openInNewTab)
        return false;
    return !!menu?.reload || isHttpRoute(route);
}
function isSpaMenu(menu) {
    const route = getMenuRoute(menu);
    if (!route)
        return false;
    if (menu?.openIn)
        return menu.openIn === 'CURRENT_TAB' && !isHttpRoute(route);
    if (menu?.openInNewTab)
        return false;
    if (menu?.reload)
        return false;
    if (isHttpRoute(route))
        return false;
    return true;
}
const isModernMenu = (menu) => !!menu.type;
function normalizeMenu(menu, level) {
    if (!isModernMenu(menu))
        return menu;
    const children = getMenuChildren(menu);
    const normalized = {
        ...menu,
        menuName: getMenuLabel(menu),
        menuTypeId: 3,
        parentId: 0,
        sequence: Number(menu.sequence) || 0,
        level,
        child: children.map((child) => normalizeMenu(child, level + 1)),
        children: undefined,
        name: undefined,
        type: undefined,
    };
    return normalized;
}
/**
 * Converts modern (contract-aligned) menu nodes into the legacy `IMenu` shape
 * that `IHMenu` renders. Modern extras (`id`, `isFavorite`, `application`,
 * `companies`, `openIn`, `route`, `icon`) are preserved for pin / favorites /
 * application-grouping rendering. Legacy nodes pass through untouched.
 */
function normalizeMenuTree(menus) {
    return (menus ?? []).map((menu) => normalizeMenu(menu, 0));
}
/** Synthetic group id used by the sidebar's Favorites section — keeps its icon. */
const SIDEBAR_FAVORITES_GROUP_ID = 'favorites';
/**
 * Fallback FontAwesome classes used by the sidebar row icon when a menu has no
 * icon or the icon is not a valid FontAwesome class
 */
const MENU_ICON_FALLBACK = 'fa-brands fa-microsoft';
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IHTitleBreadcrumbService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IHTitleBreadcrumbService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IHTitleBreadcrumbService, decorators: [{
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
    session = inject(ISessionService);
    userMenuStore = inject(IUserMenuStore);
    /** Aggregated boot loading state — true while session restore or sidebar menu data is loading. */
    initializing = signal(true, ...(ngDevMode ? [{ debugName: "initializing" }] : []));
    /** Emits the aggregated loading state so consumer apps can render their own loader. */
    loading = new EventEmitter();
    // Push session + menu-store initializing changes through the `loading` output.
    loadingEffect = effect(() => {
        const value = this.session.initializing() || this.userMenuStore.initializing();
        if (value !== this.initializing()) {
            this.initializing.set(value);
            this.loading.emit(value);
        }
    }, ...(ngDevMode ? [{ debugName: "loadingEffect" }] : []));
    /** route-based breadcrumbs */
    breadcrumb$ = this.router.events.pipe(filter$1((e) => e instanceof NavigationEnd), startWith(null), map(() => this.buildBreadcrumb(this.activatedRoute.root)), shareReplay$1(1));
    /** last breadcrumb label = route-based page title */
    pageTitle$ = this.breadcrumb$.pipe(map((breadcrumbs) => breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].label : null), shareReplay$1(1));
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
            // 🔑 Use route config data, not snapshot data, to avoid inherited data
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
        // React Router BrowserRouter will not notice unless popstate is fired.
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
        const base = this.normalizeBaseHref();
        const abs = this.normalizePath(url);
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
        const base = this.normalizeBaseHref();
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IHContent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.30", type: IHContent, isStandalone: true, selector: "ih-content", outputs: { onSidebarToggled: "onSidebarToggled", loading: "loading" }, ngImport: i0, template: `
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IHContent, decorators: [{
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
            }], loading: [{
                type: Output
            }] } });
/* =========================================================
 * IHMenu
 * - Parent/group menu: toggles expanded/collapsed
 * - Leaf new-tab menu: href + target="_blank"
 * - Leaf reload menu: href
 * - Leaf SPA menu: routerLink
 * ========================================================= */
class IHMenu {
    confirmService = inject(IConfirmService);
    menu;
    selectedMenuId = null;
    filter = '';
    /** When true, renders a pin/star toggle on leaf items (emits `favoriteToggle`). */
    favoriteMode = false;
    /** When true, groups collapse/expand via a chevron (flat is the default). */
    collapsible = false;
    /** Nesting depth from the sidebar root (0 = top level). Drives indentation and
        the top-level "no group icon" rule — independent of the data's `level`. */
    depth = 0;
    /** When true, leaf items render with `cdkDrag` so the parent `cdkDropList` can reorder them (used for the Favorites section). */
    dragEnabled = false;
    /** When true, leaf items render their owning application name next to the label (used for the Favorites section). */
    showApplication = false;
    /** Per-menu-key ancestor path labels (sidebar Favorites section) - rendered instead of the application name when present. */
    pathByKey;
    clicked = new EventEmitter();
    favoriteToggle = new EventEmitter();
    menus;
    /** Template-bound helper for stable `@for` tracking (UUID-first). */
    getMenuKey = getMenuKey;
    // the actual clickable DOM element (only on leaf items)
    menuItemRef;
    isHidden = false;
    get menuRoute() {
        return getMenuRoute(this.menu);
    }
    get isSpa() {
        return isSpaMenu(this.menu);
    }
    get isReload() {
        return isReloadMenu(this.menu);
    }
    get isNewTab() {
        return isNewTabMenu(this.menu);
    }
    get menuLabel() {
        return getMenuLabel(this.menu);
    }
    /**
     * Subtitle shown on favorite leaves: the ancestor path resolved from the
     * sidebar menu tree when available, falling back to the owning application
     * name when the leaf is not present in the tree.
     */
    get applicationLabel() {
        if (!this.showApplication || !this.menu)
            return null;
        const key = getMenuKey(this.menu);
        if (key !== null && this.pathByKey) {
            const path = this.pathByKey[String(key)];
            if (path !== undefined)
                return path;
        }
        return this.menu.application?.name ?? null;
    }
    get menuChildrenList() {
        return getMenuChildren(this.menu);
    }
    get menuHasChildren() {
        return hasMenuChildren(this.menu);
    }
    /** Legacy top-level module header (menuTypeId === 2). */
    get isModuleNode() {
        return isModuleMenu(this.menu);
    }
    /** Structural group header (non-leaf container). Modules are handled by `isModuleNode`. */
    get isGroupNode() {
        if (!this.menu)
            return false;
        if (this.isModuleNode)
            return false;
        if (this.menu.type)
            return this.menu.type === 'group';
        return Number(this.menu.menuTypeId) === 3 && hasMenuChildren(this.menu);
    }
    /** Group is expanded unless explicitly marked collapsed (manual toggle wins). */
    get isGroupExpanded() {
        return this.menu?.visibility !== 'collapsed';
    }
    /** The synthetic Favorites group — keeps its icon at the top level. */
    get isFavoritesGroup() {
        return getMenuKey(this.menu) === SIDEBAR_FAVORITES_GROUP_ID;
    }
    get menuVisibility() {
        return this.menu?.visibility ?? '';
    }
    /**
     * Icon classes for the row icon. Appends FontAwesome's `fa-fw` (fixed-width)
     * so icons with different glyph widths (e.g. fa-users vs fa-bars) still keep
     * the menu title aligned.
     *
     * Falls back to `MENU_ICON_FALLBACK` (`fa-brands fa-microsoft`) when the menu
     * has no icon or the icon is not a valid FontAwesome class (e.g. legacy named
     * icons like `home`, `dashboard` that contain no `fa-*` token and would render
     * as an empty glyph).
     */
    get menuIcon() {
        const icon = this.menu?.icon?.trim();
        const isValidFa = !!icon && /(?:^|\s)fa-[a-z0-9-]+(?:\s|$)/i.test(icon);
        return `${isValidFa ? icon : MENU_ICON_FALLBACK} fa-fw`;
    }
    /** 0-based nesting level; top-level groups are always 0 (never negative). */
    get menuLevel() {
        return Math.max(0, Number(this.menu?.level) || 0);
    }
    /**
     * Indent level used for rendering: first-level children of a group render
     * flush-left (0) so the first level looks flat; deeper levels indent from
     * there (depth - 1, never negative).
     */
    get indentLevel() {
        return Math.max(0, this.depth - 1);
    }
    get menuTypeId() {
        return Number(this.menu?.menuTypeId) || 0;
    }
    get menuIsFavorite() {
        return !!this.menu?.isFavorite;
    }
    /** only true for the *leaf* menu that matches selectedMenuId */
    get isSelected() {
        if (!this.menu)
            return false;
        const matchesId = getMenuKey(this.menu) === this.selectedMenuId;
        if (!matchesId)
            return false;
        const hasChildren = this.menuHasChildren;
        // keep selection only on "leaf" items (same rule as flattenNavigableMenus)
        const isLeaf = this.menuTypeId === 3 && (!hasChildren || this.menu.visibility === 'no-child');
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
    indent(level) {
        const n = Math.max(0, Number(level) || 0);
        // return [0,1,2,...] so each item is stable and unique
        return Array.from({ length: n }, (_, i) => i);
    }
    click() {
        if (!this.menu)
            return;
        if (this.menu.visibility !== 'no-child') {
            // Treat an unset visibility as expanded so a default (flat) group
            // collapses on the first click (modern nodes have no visibility).
            this.menu.visibility = this.isGroupExpanded ? 'collapsed' : 'expanded';
        }
        else {
            this.clicked.emit(this.menu);
        }
    }
    onFavoriteClick(event) {
        event.preventDefault();
        event.stopPropagation();
        const id = getMenuKey(this.menu);
        if (id === null)
            return;
        const isUnfavorite = this.menuIsFavorite;
        // Unfavorite is destructive - confirm before removing the pin.
        if (isUnfavorite) {
            const menuName = getMenuLabel(this.menu) || 'this menu';
            this.confirmService
                .warning('Remove from Favorites', `Remove <strong>${menuName}</strong> from your favorites?`)
                .subscribe((confirmed) => {
                if (!confirmed)
                    return;
                this.favoriteToggle.emit({ id, isFavorite: false });
            });
            return;
        }
        this.favoriteToggle.emit({ id, isFavorite: true });
    }
    onChildFavoriteToggle(event) {
        this.favoriteToggle.emit(event);
    }
    hrefWithMenuFilter(raw) {
        const term = (this.filter ?? '').trim();
        if (!term)
            return raw;
        try {
            const u = new URL(raw);
            u.searchParams.set('menu-filter', term);
            return u.toString();
        }
        catch {
            const origin = window.location.origin;
            const u = new URL(raw, origin);
            u.searchParams.set('menu-filter', term);
            return `${u.pathname}${u.search}${u.hash}`;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IHMenu, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.30", type: IHMenu, isStandalone: true, selector: "ih-menu", inputs: { menu: "menu", selectedMenuId: "selectedMenuId", filter: "filter", favoriteMode: "favoriteMode", collapsible: "collapsible", depth: "depth", dragEnabled: "dragEnabled", showApplication: "showApplication", pathByKey: "pathByKey" }, outputs: { clicked: "clicked", favoriteToggle: "favoriteToggle" }, host: { attributes: { "data-ih-menu": "" }, properties: { "class.hidden": "this.isHidden" } }, viewQueries: [{ propertyName: "menuItemRef", first: true, predicate: ["menuItem"], descendants: true }, { propertyName: "menus", predicate: IHMenu, descendants: true }], usesOnChanges: true, ngImport: i0, template: `
    @if (menu) {
      @let hasChild = menuHasChildren;
      @let route = menuRoute;

      <li [class.is-module]="isModuleNode" [ngClass]="isModuleNode ? menuVisibility : ''">
        @if (isModuleNode) {
          <!-- old-style module header; chevron + collapse in collapsible mode -->
          <small
            class="ih-menu-module"
            [class.ih-menu-module--collapsible]="collapsible && menuHasChildren"
            (click)="collapsible && menuHasChildren ? click() : null"
          >
            <span [innerHTML]="menuLabel | highlightSearch: filter"></span>

            @if (collapsible && menuHasChildren) {
              <i
                class="ih-menu-chevron"
                [ngClass]="isGroupExpanded ? 'fas fa-angle-up' : 'fas fa-angle-down'"
              ></i>
            }
          </small>
        } @else if (isGroupNode) {
          <!-- unified old-style group row; chevron + collapse only in collapsible mode -->
          <div
            class="ih-menu-group"
            [class.ih-menu-group--collapsible]="collapsible"
            [class.ih-menu-group--top]="depth === 0"
            (click)="collapsible ? click() : null"
          >
            @if (indentLevel > 0) {
              @for (i of indent(indentLevel); track i) {
                <span class="indent-{{ depth }}"></span>
              }
            }

            <!-- Top-level groups carry no icon (except the Favorites group) so
                 group titles align with module headers. -->
            @if (depth > 0 || isFavoritesGroup) {
              <i [class]="menuIcon"></i>
            }
            <h6 [innerHTML]="menuLabel | highlightSearch: filter"></h6>

            @if (collapsible) {
              <i
                class="ih-menu-chevron"
                [ngClass]="isGroupExpanded ? 'fas fa-angle-up' : 'fas fa-angle-down'"
              ></i>
            }
          </div>
        } @else {
          <!-- IMPORTANT:
               Order matters.
               Route starting with "http" must hit href branch before SPA/routerLink branch.
          -->

          <!-- leaf item: open in new tab -->
          @if (isNewTab && route) {
            <a
              #menuItem
              class="is-new-tab"
              rel="noopener noreferrer"
              target="_blank"
              [attr.data-menu-id]="dragEnabled ? getMenuKey(menu) : null"
              [class.is-selected]="isSelected"
              [href]="hrefWithMenuFilter(route)"
            >
              @if (indentLevel > 0) {
                @for (i of indent(indentLevel); track i) {
                  <span class="indent-{{ depth }}"></span>
                }
              }

              <i [class]="menuIcon"></i>
              <span class="ih-menu-label" [class.ih-menu-label--compact]="showApplication">
                <h6 [innerHTML]="menuLabel | highlightSearch: filter"></h6>
                @if (applicationLabel) {
                  <small class="ih-menu-application">{{ applicationLabel }}</small>
                }
              </span>

              @if (favoriteMode) {
                <i
                  class="ih-menu-favorite {{
                    menuIsFavorite ? 'fa-solid fa-star is-favorite' : 'fa-regular fa-star'
                  }}"
                  role="button"
                  tabindex="0"
                  [attr.aria-label]="menuIsFavorite ? 'Remove from favorites' : 'Add to favorites'"
                  (click)="onFavoriteClick($event)"
                  (keydown.enter)="onFavoriteClick($event)"
                ></i>
              }
            </a>
          }

          <!-- leaf item: full reload, same tab -->
          @else if (isReload && route) {
            <a
              #menuItem
              class="is-reload"
              target="_self"
              [attr.data-menu-id]="dragEnabled ? getMenuKey(menu) : null"
              [class.is-selected]="isSelected"
              [href]="hrefWithMenuFilter(route)"
            >
              @if (indentLevel > 0) {
                @for (i of indent(indentLevel); track i) {
                  <span class="indent-{{ depth }}"></span>
                }
              }

              <i [class]="menuIcon"></i>
              <span class="ih-menu-label" [class.ih-menu-label--compact]="showApplication">
                <h6 [innerHTML]="menuLabel | highlightSearch: filter"></h6>
                @if (applicationLabel) {
                  <small class="ih-menu-application">{{ applicationLabel }}</small>
                }
              </span>

              @if (favoriteMode) {
                <i
                  class="ih-menu-favorite {{
                    menuIsFavorite ? 'fa-solid fa-star is-favorite' : 'fa-regular fa-star'
                  }}"
                  role="button"
                  tabindex="0"
                  [attr.aria-label]="menuIsFavorite ? 'Remove from favorites' : 'Add to favorites'"
                  (click)="onFavoriteClick($event)"
                  (keydown.enter)="onFavoriteClick($event)"
                ></i>
              }
            </a>
          }

          <!-- leaf item: SPA navigation -->
          @else if (isSpa && route) {
            <a
              #menuItem
              class="is-spa"
              [attr.data-menu-id]="dragEnabled ? getMenuKey(menu) : null"
              [class.is-selected]="isSelected"
              [queryParamsHandling]="'merge'"
              [routerLink]="route"
            >
              @if (indentLevel > 0) {
                @for (i of indent(indentLevel); track i) {
                  <span class="indent-{{ depth }}"></span>
                }
              }

              <i [class]="menuIcon"></i>
              <span class="ih-menu-label" [class.ih-menu-label--compact]="showApplication">
                <h6 [innerHTML]="menuLabel | highlightSearch: filter"></h6>
                @if (applicationLabel) {
                  <small class="ih-menu-application">{{ applicationLabel }}</small>
                }
              </span>

              @if (favoriteMode) {
                <i
                  class="ih-menu-favorite {{
                    menuIsFavorite ? 'fa-solid fa-star is-favorite' : 'fa-regular fa-star'
                  }}"
                  role="button"
                  tabindex="0"
                  [attr.aria-label]="menuIsFavorite ? 'Remove from favorites' : 'Add to favorites'"
                  (click)="onFavoriteClick($event)"
                  (keydown.enter)="onFavoriteClick($event)"
                ></i>
              }
            </a>
          }
        }

        @if (hasChild) {
          <ul
            [class.collapsed]="(isGroupNode || isModuleNode) && collapsible && !isGroupExpanded"
            [class.expanded]="(isGroupNode || isModuleNode) && collapsible && isGroupExpanded"
          >
            @for (m of menuChildrenList; track getMenuKey(m)) {
              <ih-menu
                [collapsible]="collapsible"
                [depth]="depth + 1"
                [dragEnabled]="dragEnabled"
                [favoriteMode]="favoriteMode"
                [filter]="filter"
                [menu]="m"
                [pathByKey]="pathByKey"
                [selectedMenuId]="selectedMenuId"
                [showApplication]="showApplication"
                (favoriteToggle)="onChildFavoriteToggle($event)"
              />
            }
          </ul>
        }
      </li>
    }
  `, isInline: true, dependencies: [{ kind: "component", type: IHMenu, selector: "ih-menu", inputs: ["menu", "selectedMenuId", "filter", "favoriteMode", "collapsible", "depth", "dragEnabled", "showApplication", "pathByKey"], outputs: ["clicked", "favoriteToggle"] }, { kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: IHighlightSearchPipe, name: "highlightSearch" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IHMenu, decorators: [{
            type: Component,
            args: [{
                    selector: 'ih-menu',
                    imports: [NgClass, RouterLink, IHighlightSearchPipe],
                    host: { 'data-ih-menu': '' },
                    template: `
    @if (menu) {
      @let hasChild = menuHasChildren;
      @let route = menuRoute;

      <li [class.is-module]="isModuleNode" [ngClass]="isModuleNode ? menuVisibility : ''">
        @if (isModuleNode) {
          <!-- old-style module header; chevron + collapse in collapsible mode -->
          <small
            class="ih-menu-module"
            [class.ih-menu-module--collapsible]="collapsible && menuHasChildren"
            (click)="collapsible && menuHasChildren ? click() : null"
          >
            <span [innerHTML]="menuLabel | highlightSearch: filter"></span>

            @if (collapsible && menuHasChildren) {
              <i
                class="ih-menu-chevron"
                [ngClass]="isGroupExpanded ? 'fas fa-angle-up' : 'fas fa-angle-down'"
              ></i>
            }
          </small>
        } @else if (isGroupNode) {
          <!-- unified old-style group row; chevron + collapse only in collapsible mode -->
          <div
            class="ih-menu-group"
            [class.ih-menu-group--collapsible]="collapsible"
            [class.ih-menu-group--top]="depth === 0"
            (click)="collapsible ? click() : null"
          >
            @if (indentLevel > 0) {
              @for (i of indent(indentLevel); track i) {
                <span class="indent-{{ depth }}"></span>
              }
            }

            <!-- Top-level groups carry no icon (except the Favorites group) so
                 group titles align with module headers. -->
            @if (depth > 0 || isFavoritesGroup) {
              <i [class]="menuIcon"></i>
            }
            <h6 [innerHTML]="menuLabel | highlightSearch: filter"></h6>

            @if (collapsible) {
              <i
                class="ih-menu-chevron"
                [ngClass]="isGroupExpanded ? 'fas fa-angle-up' : 'fas fa-angle-down'"
              ></i>
            }
          </div>
        } @else {
          <!-- IMPORTANT:
               Order matters.
               Route starting with "http" must hit href branch before SPA/routerLink branch.
          -->

          <!-- leaf item: open in new tab -->
          @if (isNewTab && route) {
            <a
              #menuItem
              class="is-new-tab"
              rel="noopener noreferrer"
              target="_blank"
              [attr.data-menu-id]="dragEnabled ? getMenuKey(menu) : null"
              [class.is-selected]="isSelected"
              [href]="hrefWithMenuFilter(route)"
            >
              @if (indentLevel > 0) {
                @for (i of indent(indentLevel); track i) {
                  <span class="indent-{{ depth }}"></span>
                }
              }

              <i [class]="menuIcon"></i>
              <span class="ih-menu-label" [class.ih-menu-label--compact]="showApplication">
                <h6 [innerHTML]="menuLabel | highlightSearch: filter"></h6>
                @if (applicationLabel) {
                  <small class="ih-menu-application">{{ applicationLabel }}</small>
                }
              </span>

              @if (favoriteMode) {
                <i
                  class="ih-menu-favorite {{
                    menuIsFavorite ? 'fa-solid fa-star is-favorite' : 'fa-regular fa-star'
                  }}"
                  role="button"
                  tabindex="0"
                  [attr.aria-label]="menuIsFavorite ? 'Remove from favorites' : 'Add to favorites'"
                  (click)="onFavoriteClick($event)"
                  (keydown.enter)="onFavoriteClick($event)"
                ></i>
              }
            </a>
          }

          <!-- leaf item: full reload, same tab -->
          @else if (isReload && route) {
            <a
              #menuItem
              class="is-reload"
              target="_self"
              [attr.data-menu-id]="dragEnabled ? getMenuKey(menu) : null"
              [class.is-selected]="isSelected"
              [href]="hrefWithMenuFilter(route)"
            >
              @if (indentLevel > 0) {
                @for (i of indent(indentLevel); track i) {
                  <span class="indent-{{ depth }}"></span>
                }
              }

              <i [class]="menuIcon"></i>
              <span class="ih-menu-label" [class.ih-menu-label--compact]="showApplication">
                <h6 [innerHTML]="menuLabel | highlightSearch: filter"></h6>
                @if (applicationLabel) {
                  <small class="ih-menu-application">{{ applicationLabel }}</small>
                }
              </span>

              @if (favoriteMode) {
                <i
                  class="ih-menu-favorite {{
                    menuIsFavorite ? 'fa-solid fa-star is-favorite' : 'fa-regular fa-star'
                  }}"
                  role="button"
                  tabindex="0"
                  [attr.aria-label]="menuIsFavorite ? 'Remove from favorites' : 'Add to favorites'"
                  (click)="onFavoriteClick($event)"
                  (keydown.enter)="onFavoriteClick($event)"
                ></i>
              }
            </a>
          }

          <!-- leaf item: SPA navigation -->
          @else if (isSpa && route) {
            <a
              #menuItem
              class="is-spa"
              [attr.data-menu-id]="dragEnabled ? getMenuKey(menu) : null"
              [class.is-selected]="isSelected"
              [queryParamsHandling]="'merge'"
              [routerLink]="route"
            >
              @if (indentLevel > 0) {
                @for (i of indent(indentLevel); track i) {
                  <span class="indent-{{ depth }}"></span>
                }
              }

              <i [class]="menuIcon"></i>
              <span class="ih-menu-label" [class.ih-menu-label--compact]="showApplication">
                <h6 [innerHTML]="menuLabel | highlightSearch: filter"></h6>
                @if (applicationLabel) {
                  <small class="ih-menu-application">{{ applicationLabel }}</small>
                }
              </span>

              @if (favoriteMode) {
                <i
                  class="ih-menu-favorite {{
                    menuIsFavorite ? 'fa-solid fa-star is-favorite' : 'fa-regular fa-star'
                  }}"
                  role="button"
                  tabindex="0"
                  [attr.aria-label]="menuIsFavorite ? 'Remove from favorites' : 'Add to favorites'"
                  (click)="onFavoriteClick($event)"
                  (keydown.enter)="onFavoriteClick($event)"
                ></i>
              }
            </a>
          }
        }

        @if (hasChild) {
          <ul
            [class.collapsed]="(isGroupNode || isModuleNode) && collapsible && !isGroupExpanded"
            [class.expanded]="(isGroupNode || isModuleNode) && collapsible && isGroupExpanded"
          >
            @for (m of menuChildrenList; track getMenuKey(m)) {
              <ih-menu
                [collapsible]="collapsible"
                [depth]="depth + 1"
                [dragEnabled]="dragEnabled"
                [favoriteMode]="favoriteMode"
                [filter]="filter"
                [menu]="m"
                [pathByKey]="pathByKey"
                [selectedMenuId]="selectedMenuId"
                [showApplication]="showApplication"
                (favoriteToggle)="onChildFavoriteToggle($event)"
              />
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
            }], favoriteMode: [{
                type: Input
            }], collapsible: [{
                type: Input
            }], depth: [{
                type: Input
            }], dragEnabled: [{
                type: Input
            }], showApplication: [{
                type: Input
            }], pathByKey: [{
                type: Input
            }], clicked: [{
                type: Output
            }], favoriteToggle: [{
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
 * IHSidebar
 * ========================================================= */
class IHSidebar {
    router = inject(Router);
    hostElement = inject(ElementRef);
    /* ---------------------------
     * INPUTS (from parent)
     * --------------------------- */
    user$;
    menusInput$;
    visible = true;
    footerText = 'Insight Local';
    /** When true, leaf items render a pin/star toggle and the Favorites section is shown. */
    favoriteMode = false;
    /** Flat favorite leaf nodes, mapped by the host app from the favorites API. Rendered as a 'Favorites' group at the top of the menu body. */
    favorites$;
    /** When true, menu roots are grouped under an application label. */
    groupByApplication = false;
    /** When true, groups collapse/expand via a chevron (flat is the default). */
    collapsible = false;
    /* ---------------------------
     * OUTPUTS (to parent)
     * --------------------------- */
    /** Bubbled up from leaf pin toggles — the host app persists via the favorites API. */
    onFavoriteToggle = new EventEmitter();
    /** Emitted after a favorites drag-drop with the ordered favorite menu ids — the host app persists via the reorder API. */
    onFavoriteReorder = new EventEmitter();
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
    /** Index the dragged favorite would land at — drives the drop placeholder + cursor. */
    dragOverIndex = signal(null, ...(ngDevMode ? [{ debugName: "dragOverIndex" }] : []));
    /** Template-bound helper for stable `@for` tracking. */
    getMenuKey = getMenuKey;
    favoritesGroupCache = null;
    /** Latest favorites array mirrored from `favorites$` — source of truth for drag reorder. */
    favoriteItems = signal([], ...(ngDevMode ? [{ debugName: "favoriteItems" }] : []));
    /** Full (unfiltered) normalized menu tree - source for favorite ancestor paths. */
    fullMenus = signal([], ...(ngDevMode ? [{ debugName: "fullMenus" }] : []));
    fullMenusSubscription = null;
    /** Ancestor path label per favorite key (menu tree) for the Favorites section. */
    favoritePaths = computed(() => buildFavoritePathMap(this.fullMenus(), this.favoriteItems()), ...(ngDevMode ? [{ debugName: "favoritePaths" }] : []));
    favoritesSubscription = null;
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
        this.originalMenus$ = this.normalizeMenusStream();
        this.buildMenusStream();
        this.subscribeFullMenus();
        this.subscribeFavorites();
    }
    ngOnChanges(changes) {
        if (changes['menusInput$'] && !changes['menusInput$'].firstChange) {
            this.originalMenus$ = this.normalizeMenusStream();
            this.buildMenusStream();
            this.subscribeFullMenus();
        }
        if (changes['favorites$']) {
            this.subscribeFavorites();
        }
    }
    ngOnDestroy() {
        this.favoritesSubscription?.unsubscribe();
        this.fullMenusSubscription?.unsubscribe();
        // Make sure no document-level drag listeners leak if destroyed mid-drag.
        if (this.dragState) {
            this.cleanupFavoriteDrag();
        }
    }
    /** Mirrors the `favorites$` input into the local `favoriteItems` signal. */
    subscribeFavorites() {
        this.favoritesSubscription?.unsubscribe();
        this.favoritesSubscription = (this.favorites$ ?? of([])).subscribe((favs) => this.favoriteItems.set(favs ?? []));
    }
    /** Mirrors the full (unfiltered) normalized menu tree into the `fullMenus` signal. */
    subscribeFullMenus() {
        this.fullMenusSubscription?.unsubscribe();
        this.fullMenusSubscription = this.originalMenus$.subscribe((menus) => this.fullMenus.set(menus));
    }
    dragState = null;
    /** Document mousemove during an active favorites drag (live reorder preview). */
    onDocumentMouseMove = (event) => {
        const state = this.dragState;
        if (!state)
            return;
        // Ignore tiny jitters so a plain click isn't treated as a drag.
        if (!state.moved && Math.abs(event.clientY - state.startY) < 5)
            return;
        state.moved = true;
        // Follow the pointer with a translucent clone of the dragged leaf.
        if (state.ghost) {
            state.ghost.style.display = '';
            state.ghost.style.left = `${event.clientX}px`;
            state.ghost.style.top = `${event.clientY}px`;
        }
        const targetIndex = this.computeFavoriteDropIndex(event.clientY);
        if (targetIndex !== state.lastTargetIndex) {
            this.reorderFavoriteLive(state.menuId, targetIndex);
            state.lastTargetIndex = targetIndex;
        }
        this.dragOverIndex.set(targetIndex);
    };
    /** Document mouseup — finalize (emit) or cancel the favorites drag. */
    onDocumentMouseUp = () => {
        const state = this.dragState;
        if (!state)
            return;
        if (state.moved) {
            const reordered = this.favoriteItems();
            this.cleanupFavoriteDrag();
            const menuIds = reordered
                .map((menu) => getMenuKey(menu))
                .filter((key) => key !== null && key !== undefined);
            this.onFavoriteReorder.emit({ menuIds });
        }
        else {
            this.cleanupFavoriteDrag();
        }
    };
    /** Begins a favorites drag from a leaf inside the favorites list. */
    onFavoritesMouseDown(event) {
        const target = event.target;
        const leaf = target.closest('.ih-sidebar-favorites [data-menu-id]');
        if (!leaf)
            return;
        const menuId = leaf.dataset['menuId'];
        if (!menuId)
            return;
        // Prevent text selection and any native drag/OS behavior.
        event.preventDefault();
        // Build a translucent clone (drag ghost) that follows the pointer — it is
        // hidden until the drag actually starts (past the 5px threshold).
        const ghost = leaf.cloneNode(true);
        ghost.classList.add('ih-drag-ghost');
        ghost.classList.remove('is-dragging');
        ghost.style.display = 'none';
        document.body.appendChild(ghost);
        this.dragState = {
            menuId,
            startY: event.clientY,
            moved: false,
            lastTargetIndex: null,
            ghost,
        };
        leaf.classList.add('is-dragging');
        document.addEventListener('mousemove', this.onDocumentMouseMove);
        document.addEventListener('mouseup', this.onDocumentMouseUp);
    }
    /** Live-reorders the favorites so the target position is previewed while dragging. */
    reorderFavoriteLive(menuId, targetIndex) {
        const items = this.favoriteItems();
        const sourceIndex = items.findIndex((menu) => String(getMenuKey(menu)) === menuId);
        if (sourceIndex === -1)
            return;
        // Removing from before the target shifts the insertion point by one.
        const insertAt = sourceIndex < targetIndex ? targetIndex - 1 : targetIndex;
        if (insertAt === sourceIndex)
            return;
        const reordered = [...items];
        const [moved] = reordered.splice(sourceIndex, 1);
        reordered.splice(insertAt, 0, moved);
        this.favoriteItems.set(reordered);
    }
    /** Cleans up listeners, classes, and state after a favorites drag ends/cancels. */
    cleanupFavoriteDrag() {
        // Capture the ghost before resetting the state (TS narrows dragState to null).
        const ghost = this.dragState?.ghost ?? null;
        this.dragState = null;
        this.dragOverIndex.set(null);
        const host = this.hostElement.nativeElement;
        host
            .querySelectorAll('.ih-sidebar-favorites .is-dragging')
            .forEach((el) => el.classList.remove('is-dragging'));
        document.removeEventListener('mousemove', this.onDocumentMouseMove);
        document.removeEventListener('mouseup', this.onDocumentMouseUp);
        // Remove the drag ghost clone from the DOM.
        ghost?.remove();
    }
    /**
     * Returns the index (0..n) a drop at `clientY` would land at, based on the
     * vertical midpoints of the currently rendered favorite leaves.
     */
    computeFavoriteDropIndex(clientY) {
        const host = this.hostElement.nativeElement;
        const leaves = Array.from(host.querySelectorAll('.ih-sidebar-favorites [data-menu-id]'));
        for (let i = 0; i < leaves.length; i++) {
            const rect = leaves[i].getBoundingClientRect();
            if (clientY < rect.top + rect.height / 2)
                return i;
        }
        return leaves.length;
    }
    /**
     * Normalizes modern (contract-aligned) menu nodes into the legacy `IMenu`
     * shape on ingestion. Legacy menus pass through untouched.
     */
    normalizeMenusStream() {
        return (this.menusInput$ ?? new Observable()).pipe(map((menus) => normalizeMenuTree(menus)), shareReplay$1(1));
    }
    buildMenusStream() {
        let firstEmission = true;
        const filter$ = this.menuSearch.valueChanges.pipe(startWith(this.menuSearch.value ?? ''), map((v) => (v ?? '').trim()), tap$1((term) => {
            this.menuFilter.set(term);
            if (firstEmission) {
                firstEmission = false;
                return;
            }
            this.updateUrl();
        }));
        this.menus$ = combineLatest([this.originalMenus$, filter$]).pipe(map(([menus, term]) => this.filterMenuTree(menus, term)), tap$1((filteredMenus) => this.updateNavigableMenus(filteredMenus)), shareReplay$1(1));
    }
    filterMenuTree(menus, rawTerm) {
        const term = (rawTerm ?? '').trim().toLowerCase();
        if (!term)
            return menus;
        const filtered = [];
        for (const menu of menus) {
            const result = this.filterMenuBranch(menu, term);
            if (result) {
                filtered.push(result);
            }
        }
        return filtered;
    }
    filterMenuBranch(menu, term) {
        const name = getMenuLabel(menu).toLowerCase();
        const selfMatches = name.includes(term);
        const originalChildren = getMenuChildren(menu);
        const filteredChildren = [];
        for (const child of originalChildren) {
            const childResult = this.filterMenuBranch(child, term);
            if (childResult) {
                filteredChildren.push(childResult);
            }
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
        if (Number(cloned.menuTypeId) === 3 && (selfMatches || childMatches)) {
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
            if (idx === null || idx < 0 || idx > maxIndex) {
                idx = 0;
            }
            this.selectedIndex.set(idx);
            this.selectedMenuId.set(getMenuKey(this.navigableMenus[idx]));
        }
        else {
            this.selectedIndex.set(null);
            this.selectedMenuId.set(null);
        }
    }
    flattenNavigableMenus(menus) {
        const result = [];
        const visit = (menu) => {
            const children = getMenuChildren(menu);
            const hasChildren = children.length > 0;
            const isLeafMenu = Number(menu.menuTypeId) === 3 && (!hasChildren || menu.visibility === 'no-child');
            if (isLeafMenu) {
                result.push(menu);
            }
            for (const child of children) {
                visit(child);
            }
        };
        for (const m of menus) {
            visit(m);
        }
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
                this.selectedMenuId.set(getMenuKey(this.navigableMenus[0]));
            }
            else {
                const lastIdx = this.navigableMenus.length - 1;
                this.selectedIndex.set(lastIdx);
                this.selectedMenuId.set(getMenuKey(this.navigableMenus[lastIdx]));
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
        if (next < 0) {
            next = maxIndex;
        }
        else if (next > maxIndex) {
            next = 0;
        }
        this.selectedIndex.set(next);
        this.selectedMenuId.set(getMenuKey(this.navigableMenus[next]));
    }
    activateSelected() {
        const idx = this.selectedIndex();
        if (idx === null || idx < 0 || idx >= this.navigableMenus.length) {
            return;
        }
        const menu = this.navigableMenus[idx];
        this.navigateToMenu(menu);
    }
    menuFilterQueryParams() {
        const term = this.menuFilter().trim();
        return term ? { 'menu-filter': term } : {};
    }
    appendMenuFilterToUrl(raw) {
        const term = this.menuFilter().trim();
        if (!term)
            return raw;
        try {
            const u = new URL(raw);
            u.searchParams.set('menu-filter', term);
            return u.toString();
        }
        catch {
            const origin = window.location.origin;
            const u = new URL(raw, origin);
            u.searchParams.set('menu-filter', term);
            return `${u.pathname}${u.search}${u.hash}`;
        }
    }
    /**
     * Groups menu roots by their owning application so a multi-application
     * sidebar can render an application label per group.
     */
    buildMenuGroups(menus) {
        const groups = new Map();
        for (const menu of menus) {
            const app = menu.application;
            const key = app?.code?.trim() || 'other';
            const label = app?.name?.trim() || '';
            const existing = groups.get(key);
            if (existing) {
                existing.roots.push(menu);
            }
            else {
                groups.set(key, { key, label, roots: [menu] });
            }
        }
        return Array.from(groups.values());
    }
    /**
     * Builds a synthetic "Favorites" group node so the favorites list is rendered
     * with the exact same style as the other menu groups. Memoized by the
     * favorites array reference so the node identity stays stable across CD cycles.
     */
    getFavoritesGroup(favorites) {
        if (!favorites || favorites.length === 0)
            return null;
        if (this.favoritesGroupCache?.children === favorites) {
            return this.favoritesGroupCache;
        }
        this.favoritesGroupCache = {
            id: SIDEBAR_FAVORITES_GROUP_ID,
            name: 'Favorites',
            type: 'group',
            icon: 'fa-solid fa-star',
            sequence: 0,
            children: favorites,
        };
        return this.favoritesGroupCache;
    }
    navigateToMenu(menu) {
        const route = getMenuRoute(menu);
        if (!route)
            return;
        if (isNewTabMenu(menu)) {
            const urlWithFilter = this.appendMenuFilterToUrl(route);
            window.open(urlWithFilter, '_blank', 'noopener,noreferrer');
            return;
        }
        if (isReloadMenu(menu)) {
            const urlWithFilter = this.appendMenuFilterToUrl(route);
            window.location.href = urlWithFilter;
            return;
        }
        if (isSpaMenu(menu)) {
            this.router.navigate([route], {
                queryParams: this.menuFilterQueryParams(),
                queryParamsHandling: 'merge',
            });
        }
    }
    updateUrl() {
        const queryParams = { ...this.queryParams };
        const currentFilter = this.menuFilter().trim();
        if (currentFilter) {
            queryParams['menu-filter'] = currentFilter;
        }
        else {
            delete queryParams['menu-filter'];
        }
        this.router.navigate([], {
            queryParams,
            queryParamsHandling: 'replace',
        });
        this.queryParams = queryParams;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IHSidebar, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.30", type: IHSidebar, isStandalone: true, selector: "ih-sidebar", inputs: { user$: "user$", menusInput$: "menusInput$", visible: "visible", footerText: "footerText", favoriteMode: "favoriteMode", favorites$: "favorites$", groupByApplication: "groupByApplication", collapsible: "collapsible" }, outputs: { onFavoriteToggle: "onFavoriteToggle", onFavoriteReorder: "onFavoriteReorder" }, host: { properties: { "class.hidden": "this.sidebarVisibility" } }, usesOnChanges: true, ngImport: i0, template: `
    @let user = user$ | async;
    <div class="ih-sidebar-header">
      @if (user) {
        <div class="user-image">
          <i-avatar [alt]="user.fullName" [size]="28" [src]="user.userImagePath" />
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
      @if (favoriteMode) {
        @let favoritesGroup = getFavoritesGroup(favoriteItems());
        @if (favoritesGroup) {
          <ul
            class="ih-sidebar-favorites"
            [class.is-drag-over]="dragOverIndex() !== null"
            (mousedown)="onFavoritesMouseDown($event)"
          >
            <ih-menu
              [collapsible]="collapsible"
              [depth]="0"
              [dragEnabled]="true"
              [favoriteMode]="favoriteMode"
              [filter]="menuFilter()"
              [menu]="favoritesGroup"
              [pathByKey]="favoritePaths()"
              [selectedMenuId]="selectedMenuId()"
              [showApplication]="true"
              (favoriteToggle)="onFavoriteToggle.emit($event)"
            />
          </ul>
        }
      }

      @let menus = menus$ | async;

      @if (menus && menus.length > 0) {
        @let groups = buildMenuGroups(menus);
        <!-- Single <ul> for the whole menu tree — all roots live in one list. -->
        <ul>
          @for (group of groups; track group.key) {
            @if (groupByApplication && group.label && groups.length > 1) {
              <li class="ih-sidebar-app-label">
                <small>{{ group.label }}</small>
              </li>
            }
            @for (m of group.roots; track getMenuKey(m)) {
              <ih-menu
                [collapsible]="collapsible"
                [depth]="0"
                [favoriteMode]="favoriteMode"
                [filter]="menuFilter()"
                [menu]="m"
                [selectedMenuId]="selectedMenuId()"
                (favoriteToggle)="onFavoriteToggle.emit($event)"
              />
            }
          }
        </ul>
      }
    </div>

    <div class="ih-sidebar-footer">
      <small>{{ footerText }}</small>
    </div>
  `, isInline: true, dependencies: [{ kind: "component", type: IAvatar, selector: "i-avatar", inputs: ["src", "alt", "size", "shape", "fallbackSrc", "className"] }, { kind: "component", type: IHMenu, selector: "ih-menu", inputs: ["menu", "selectedMenuId", "filter", "favoriteMode", "collapsible", "depth", "dragEnabled", "showApplication", "pathByKey"], outputs: ["clicked", "favoriteToggle"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "pipe", type: AsyncPipe, name: "async" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IHSidebar, decorators: [{
            type: Component,
            args: [{
                    selector: 'ih-sidebar',
                    imports: [AsyncPipe, IAvatar, IHMenu, ReactiveFormsModule],
                    template: `
    @let user = user$ | async;
    <div class="ih-sidebar-header">
      @if (user) {
        <div class="user-image">
          <i-avatar [alt]="user.fullName" [size]="28" [src]="user.userImagePath" />
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
      @if (favoriteMode) {
        @let favoritesGroup = getFavoritesGroup(favoriteItems());
        @if (favoritesGroup) {
          <ul
            class="ih-sidebar-favorites"
            [class.is-drag-over]="dragOverIndex() !== null"
            (mousedown)="onFavoritesMouseDown($event)"
          >
            <ih-menu
              [collapsible]="collapsible"
              [depth]="0"
              [dragEnabled]="true"
              [favoriteMode]="favoriteMode"
              [filter]="menuFilter()"
              [menu]="favoritesGroup"
              [pathByKey]="favoritePaths()"
              [selectedMenuId]="selectedMenuId()"
              [showApplication]="true"
              (favoriteToggle)="onFavoriteToggle.emit($event)"
            />
          </ul>
        }
      }

      @let menus = menus$ | async;

      @if (menus && menus.length > 0) {
        @let groups = buildMenuGroups(menus);
        <!-- Single <ul> for the whole menu tree — all roots live in one list. -->
        <ul>
          @for (group of groups; track group.key) {
            @if (groupByApplication && group.label && groups.length > 1) {
              <li class="ih-sidebar-app-label">
                <small>{{ group.label }}</small>
              </li>
            }
            @for (m of group.roots; track getMenuKey(m)) {
              <ih-menu
                [collapsible]="collapsible"
                [depth]="0"
                [favoriteMode]="favoriteMode"
                [filter]="menuFilter()"
                [menu]="m"
                [selectedMenuId]="selectedMenuId()"
                (favoriteToggle)="onFavoriteToggle.emit($event)"
              />
            }
          }
        </ul>
      }
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
            }], favoriteMode: [{
                type: Input
            }], favorites$: [{
                type: Input
            }], groupByApplication: [{
                type: Input
            }], collapsible: [{
                type: Input
            }], onFavoriteToggle: [{
                type: Output
            }], onFavoriteReorder: [{
                type: Output
            }], sidebarVisibility: [{
                type: HostBinding,
                args: ['class.hidden']
            }] } });

// export * from './input-addon';
// export * from './input-mask';

class IPill {
    /**
     * ✅ Autocomplete for IIconName
     * ✅ Still allow any string (raw FA classes, custom classes, etc.)
     */
    icon;
    size = 'md';
    variant = 'default';
    disabled = false;
    /** show close button */
    closable = false;
    onClose = new EventEmitter();
    onClick = new EventEmitter();
    // base class for the "i-pill, .i-pill" selector group
    baseClass = true;
    // attribute hooks
    get attrSize() {
        return this.size;
    }
    get attrVariant() {
        return this.variant;
    }
    // disabled hook
    get ariaDisabled() {
        return this.disabled ? 'true' : null;
    }
    get hasOnClickHandler() {
        // avoids emitting when nobody bound (optional micro-optimization)
        return this.onClick.observed;
    }
    get hasOnCloseHandler() {
        return this.onClose.observed;
    }
    handleHostClick(e) {
        if (this.disabled) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        // Ignore clicks originating from the close button
        const target = e.target;
        if (target?.closest?.('.i-pill__close'))
            return;
        if (this.hasOnClickHandler)
            this.onClick.emit(e);
    }
    handleClose(e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.disabled)
            return;
        if (this.hasOnCloseHandler)
            this.onClose.emit(e);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IPill, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.30", type: IPill, isStandalone: true, selector: "i-pill", inputs: { icon: "icon", size: "size", variant: "variant", disabled: ["disabled", "disabled", booleanAttribute], closable: ["closable", "closable", booleanAttribute] }, outputs: { onClose: "onClose", onClick: "onClick" }, host: { listeners: { "click": "handleHostClick($event)" }, properties: { "class.i-pill": "this.baseClass", "attr.size": "this.attrSize", "attr.variant": "this.attrVariant", "attr.aria-disabled": "this.ariaDisabled" } }, ngImport: i0, template: `
    @if (icon) {
      <i-icon [icon]="icon" [size]="size" />
    }

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
  `, isInline: true, dependencies: [{ kind: "component", type: IIcon, selector: "i-icon", inputs: ["icon", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IPill, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-pill',
                    standalone: true,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    imports: [IIcon],
                    template: `
    @if (icon) {
      <i-icon [icon]="icon" [size]="size" />
    }

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
        }], propDecorators: { icon: [{
                type: Input
            }], size: [{
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
// ─── Helpers ────────────────────────────────────────────────────────────────
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
/** Chevron icon size -> pixel width (used to size the scroll chevron buttons). */
const CHEVRON_WIDTH_MAP = {
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
};
// ─── ISectionTabHeader / ISectionTabContent ─────────────────────────────────
class ISectionTabHeader {
    tpl;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ISectionTabHeader, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.30", type: ISectionTabHeader, isStandalone: true, selector: "i-section-tab-header", viewQueries: [{ propertyName: "tpl", first: true, predicate: ["tpl"], descendants: true, static: true }], ngImport: i0, template: `
    <ng-template #tpl>
      <ng-content />
    </ng-template>
  `, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ISectionTabHeader, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ISectionTabContent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.30", type: ISectionTabContent, isStandalone: true, selector: "i-section-tab-content", viewQueries: [{ propertyName: "tpl", first: true, predicate: ["tpl"], descendants: true, static: true }], ngImport: i0, template: `
    <ng-template #tpl>
      <ng-content />
    </ng-template>
  `, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ISectionTabContent, decorators: [{
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
// ─── ISectionTab ─────────────────────────────────────────────────────────────
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
    /**
     * Whether this tab is currently the active/selected one. Exposed so consumers can
     * lazily render heavy tab content via Angular's native deferred loading, e.g.:
     * `<i-section-tab #t="iSectionTab">...@defer (when t.active) { <heavy/> }...</i-section-tab>`
     */
    get active() {
        return this._active;
    }
    ngAfterContentInit() {
        this.headerTpl = this.headerCmp?.tpl ?? this.defaultHeaderTpl;
        this.contentTpl = this.contentCmp?.tpl ?? this.defaultContentTpl;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ISectionTab, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.30", type: ISectionTab, isStandalone: true, selector: "i-section-tab", inputs: { title: "title", opened: ["opened", "opened", (v) => v !== null && `${v}` !== 'false'], badge: "badge" }, queries: [{ propertyName: "headerCmp", first: true, predicate: ISectionTabHeader, descendants: true }, { propertyName: "contentCmp", first: true, predicate: ISectionTabContent, descendants: true }], viewQueries: [{ propertyName: "defaultHeaderTpl", first: true, predicate: ["defaultHeaderTpl"], descendants: true, static: true }, { propertyName: "defaultContentTpl", first: true, predicate: ["defaultContentTpl"], descendants: true, static: true }], exportAs: ["iSectionTab"], ngImport: i0, template: `
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ISectionTab, decorators: [{
            type: Component,
            args: [{
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
// ─── ISectionTabs ─────────────────────────────────────────────────────────────
class ISectionTabs {
    tabs;
    /** optional controlled mode */
    selectedIndex = null;
    /** Enable sticky header via plain CSS `position: sticky`. Default off (opt-in). */
    sticky = false;
    /** CSS `top` offset used when `sticky` is enabled. Default `-16px` accounts for
     *  section border-radius clearance (matches the previous i-section-tab-bar default). */
    stickyTopOffset = '-16px';
    /** Enable natural-width tabs + horizontal overflow scroll + chevrons. Default off
     *  preserves today's equal-width layout exactly. */
    scrollable = false;
    /** Chevron icon size — only relevant when `scrollable` is enabled. */
    chevronSize = 'lg';
    /** Minimum tab button height (CSS value, e.g. `'48px'`). */
    tabMinHeight = '';
    /** Extra class(es) applied to the headers row wrapper. */
    headerClass = '';
    /** Extra class(es) applied to each tab button. */
    tabClass = '';
    /** Visual skin: `'default'` keeps today's equal-width/box-shadow look unchanged (default);
     *  `'bar'` opts into the fully ported i-section-tab-bar visual style. */
    styleVariant = 'default';
    /** ✅ standardized output name (Angular + React parity) — kept for backward compatibility. */
    onSelectedIndexChange = new EventEmitter();
    /** Angular two-way-binding-convention-named alias, enabling `[(selectedIndex)]`.
     *  Emitted alongside `onSelectedIndexChange` (both always fire together). */
    selectedIndexChange = new EventEmitter();
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
    /** Computed chevron button width from `chevronSize`. */
    get chevronWidthPx() {
        return CHEVRON_WIDTH_MAP[this.chevronSize] ?? 28;
    }
    tabsArr = [];
    activeIndex = 0;
    showLeftChevron = false;
    showRightChevron = false;
    cdr = inject(ChangeDetectorRef);
    resizeObserver = null;
    _scrollContainer;
    set scrollContainer(content) {
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
    get scrollContainer() {
        return this._scrollContainer;
    }
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
    ngAfterViewInit() {
        this.checkOverflow();
    }
    ngOnDestroy() {
        this.resizeObserver?.disconnect();
    }
    activate(index) {
        this.setActive(index, true);
        this.scrollToActive();
        this.checkOverflow();
        this.cdr.markForCheck();
    }
    activateByTab(tab) {
        const index = this.tabsArr.indexOf(tab);
        this.activate(index);
    }
    // ─── Scroll / overflow ──────────────────────────────────────────────────
    onScroll() {
        this.checkOverflow();
    }
    scrollLeft() {
        const el = this.scrollContainer?.nativeElement;
        if (el)
            el.scrollBy({ left: -200, behavior: 'smooth' });
    }
    scrollRight() {
        const el = this.scrollContainer?.nativeElement;
        if (el)
            el.scrollBy({ left: 200, behavior: 'smooth' });
    }
    checkOverflow() {
        const el = this.scrollContainer?.nativeElement;
        if (!el)
            return;
        this.showLeftChevron = el.scrollLeft > 2;
        this.showRightChevron = el.scrollLeft + el.clientWidth < el.scrollWidth - 2;
        this.cdr.markForCheck();
    }
    scrollToActive() {
        const el = this.scrollContainer?.nativeElement;
        if (!el)
            return;
        const buttons = el.querySelectorAll('.i-section-tabs-header');
        const active = buttons[this.activeIndex];
        if (active) {
            active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        }
    }
    setActive(index, emit) {
        if (!this.isValidIndex(index))
            return;
        this.activeIndex = index;
        this.tabsArr.forEach((t, i) => (t._active = i === index));
        if (emit) {
            this.onSelectedIndexChange.emit(index);
            this.selectedIndexChange.emit(index);
        }
    }
    isValidIndex(index) {
        return Number.isInteger(index) && index >= 0 && index < this.tabsArr.length;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ISectionTabs, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.30", type: ISectionTabs, isStandalone: true, selector: "i-section-tabs", inputs: { selectedIndex: "selectedIndex", sticky: ["sticky", "sticky", booleanAttribute], stickyTopOffset: "stickyTopOffset", scrollable: ["scrollable", "scrollable", booleanAttribute], chevronSize: "chevronSize", tabMinHeight: "tabMinHeight", headerClass: "headerClass", tabClass: "tabClass", styleVariant: "styleVariant", height: "height" }, outputs: { onSelectedIndexChange: "onSelectedIndexChange", selectedIndexChange: "selectedIndexChange" }, host: { properties: { "class.i-section-tabs--bar": "styleVariant === 'bar'" } }, queries: [{ propertyName: "tabs", predicate: ISectionTab }], viewQueries: [{ propertyName: "scrollContainer", first: true, predicate: ["scrollContainer"], descendants: true }], ngImport: i0, template: `
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
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: IIcon, selector: "i-icon", inputs: ["icon", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ISectionTabs, decorators: [{
            type: Component,
            args: [{
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
                }]
        }], propDecorators: { tabs: [{
                type: ContentChildren,
                args: [ISectionTab]
            }], selectedIndex: [{
                type: Input
            }], sticky: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], stickyTopOffset: [{
                type: Input
            }], scrollable: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], chevronSize: [{
                type: Input
            }], tabMinHeight: [{
                type: Input
            }], headerClass: [{
                type: Input
            }], tabClass: [{
                type: Input
            }], styleVariant: [{
                type: Input
            }], onSelectedIndexChange: [{
                type: Output
            }], selectedIndexChange: [{
                type: Output
            }], height: [{
                type: Input
            }], scrollContainer: [{
                type: ViewChild,
                args: ['scrollContainer']
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ISection, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.30", type: ISection, isStandalone: true, selector: "i-section", ngImport: i0, template: `<ng-content />`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ISection, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-section',
                    imports: [],
                    template: `<ng-content />`,
                }]
        }] });
class ISectionHeader {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ISectionHeader, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.30", type: ISectionHeader, isStandalone: true, selector: "i-section-header", ngImport: i0, template: `<h4><ng-content /></h4>`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ISectionHeader, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-section-header',
                    imports: [],
                    template: `<h4><ng-content /></h4>`,
                }]
        }] });
class ISectionSubHeader {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ISectionSubHeader, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.30", type: ISectionSubHeader, isStandalone: true, selector: "i-section-sub-header", ngImport: i0, template: `<h6><ng-content /></h6>`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ISectionSubHeader, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-section-sub-header',
                    imports: [],
                    template: `<h6><ng-content /></h6>`,
                }]
        }] });
class ISectionFilter {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ISectionFilter, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.30", type: ISectionFilter, isStandalone: true, selector: "i-section-filter", ngImport: i0, template: `<ng-content />`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ISectionFilter, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-section-filter',
                    imports: [],
                    template: `<ng-content />`,
                }]
        }] });
class ISectionBody {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ISectionBody, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.30", type: ISectionBody, isStandalone: true, selector: "i-section-body", ngImport: i0, template: `<ng-content />`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ISectionBody, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-section-body',
                    imports: [],
                    template: `<ng-content />`,
                }]
        }] });
class ISectionFooter {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ISectionFooter, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.30", type: ISectionFooter, isStandalone: true, selector: "i-section-footer", ngImport: i0, template: `<ng-content />`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ISectionFooter, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-section-footer',
                    imports: [],
                    template: `<ng-content />`,
                }]
        }] });
class ISectionModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ISectionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.30", ngImport: i0, type: ISectionModule, imports: [ISection, ISectionHeader, ISectionSubHeader, ISectionFilter, ISectionBody, ISectionFooter, ISectionTabs,
            ISectionTab,
            ISectionTabHeader,
            ISectionTabContent], exports: [ISection, ISectionHeader, ISectionSubHeader, ISectionFilter, ISectionBody, ISectionFooter, ISectionTabs,
            ISectionTab,
            ISectionTabHeader,
            ISectionTabContent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ISectionModule, imports: [ISectionTabs] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ISectionModule, decorators: [{
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
    /** Toggle size. Maps to --i-size-* design tokens. Default 'md' (34px). */
    size = 'md';
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
    // ── Size: override CSS custom properties via inline style ──────────
    // When size is 'md' (default), return null so the CSS defaults apply.
    // Otherwise, map to the matching --i-size-* design token.
    get toggleHeight() {
        return this.size !== 'md' ? `var(--i-size-${this.size})` : null;
    }
    get toggleWidth() {
        return this.size !== 'md' ? `calc(var(--i-size-${this.size}) * 1.75)` : null;
    }
    get toggleHandleSize() {
        return this.size !== 'md' ? `calc(var(--i-size-${this.size}) - (var(--i-toggle-padding) * 2))` : null;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IToggle, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.30", type: IToggle, isStandalone: true, selector: "i-toggle", inputs: { disabled: "disabled", labelPosition: "labelPosition", size: "size" }, outputs: { onChange: "onChange", onTouched: "onTouched" }, host: { listeners: { "click": "onHostClick($event)" }, properties: { "class.i-toggle": "this.baseClass", "class.i-toggle__active": "this.activeClass", "class.i-toggle__disabled": "this.disabledClass", "class.i-toggle__label-left": "this.labelLeftClass", "style.--i-toggle-height": "this.toggleHeight", "style.--i-toggle-width": "this.toggleWidth", "style.--i-toggle-handle-size": "this.toggleHandleSize" } }, providers: [
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IToggle, decorators: [{
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
            }], size: [{
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
            }], toggleHeight: [{
                type: HostBinding,
                args: ['style.--i-toggle-height']
            }], toggleWidth: [{
                type: HostBinding,
                args: ['style.--i-toggle-width']
            }], toggleHandleSize: [{
                type: HostBinding,
                args: ['style.--i-toggle-handle-size']
            }], onHostClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });

class IUI {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IUI, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.30", ngImport: i0, type: IUI, imports: [IAvatar,
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
            IPill], exports: [IAvatar,
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
            IPill] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IUI, imports: [ICardModule,
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IUI, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        IAvatar,
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
                        IAvatar,
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

/**
 * Validate and sanitize a `returnUrl` for post-login / post-callback redirect.
 * Ported from iam-web's `signin.ts::sanitizeReturnUrl()` — behavior is kept
 * identical so consumer apps and iam-web enforce the exact same open-redirect
 * protection:
 *
 * - Relative paths (starting with `/`) are always allowed.
 * - Protocol-relative URLs (`//`) are rejected — always fall back to `/`.
 * - Absolute URLs are checked against `allowedReturnOrigins` (wildcard
 *   supported, e.g. `https://*.paramount-land.com`).
 * - Anything else (invalid URL, untrusted origin, unknown scheme) falls back to `/`.
 *
 * `isExternal: true` means the caller must do a full `window.location.href`
 * navigation, not an in-app router navigation.
 */
function sanitizeReturnUrl(url, allowedReturnOrigins) {
    if (!url) {
        return { returnUrl: '/', isExternal: false };
    }
    // Block protocol-relative URLs (//evil.com)
    if (url.startsWith('//')) {
        return { returnUrl: '/', isExternal: false };
    }
    // Relative path — always safe
    if (url.startsWith('/')) {
        return { returnUrl: url, isExternal: false };
    }
    // Absolute URL — validate against trusted origins
    if (/^https?:\/\//i.test(url)) {
        try {
            const parsed = new URL(url);
            if (isAllowedOrigin(parsed.origin, allowedReturnOrigins)) {
                return { returnUrl: url, isExternal: true };
            }
        }
        catch {
            // Invalid URL — reject
        }
    }
    // Unknown scheme or untrusted origin — fall back to home
    return { returnUrl: '/', isExternal: false };
}
/** Check whether an origin matches the `allowedReturnOrigins` whitelist (wildcard supported). */
function isAllowedOrigin(origin, allowedReturnOrigins) {
    const allowed = allowedReturnOrigins ?? [];
    return allowed.some((pattern) => {
        // Convert wildcard pattern to regex: https://*.example.com → ^https:\/\/[^.]+\.example\.com$
        // Escape each literal segment separately so `*` itself is never escaped away.
        const regexStr = pattern
            .split('*')
            .map((segment) => segment.replace(/[.+^${}()|[\]\\]/g, '\\$&')) // escape regex specials
            .join('[^.]+'); // * matches a single subdomain label
        try {
            return new RegExp(`^${regexStr}$`, 'i').test(origin);
        }
        catch {
            return origin === pattern; // fallback: exact match
        }
    });
}

/**
 * Registers the @insight/ui shared auth package (`IApiService`,
 * `ISessionService`, `ICsrfService`, `authGuard`) for a consumer app.
 *
 * Zero-config by default — sensible local-dev defaults are baked in (see
 * `getDefaultInsightAuthConfig()`), matching iam-web's own local
 * environment. Consumer apps only need to pass `overrides` for whatever
 * differs from the defaults — typically `api.identity` and `signinUrl` when
 * deploying to staging/production. Every field can be overridden
 * individually, down to a single nested `api.*` or `tokenLifespan.*` entry;
 * anything not overridden falls back to the default.
 *
 * Consumers must still register `authInterceptor` themselves via
 * `provideHttpClient(withInterceptors([authInterceptor]))` in their own
 * `app.config.ts` — matches iam-web's existing pattern of wiring the
 * interceptor explicitly rather than hiding it inside a provider function.
 *
 * Usage (zero-config — local dev):
 * ```ts
 * export const config: ApplicationConfig = {
 *   providers: [
 *     provideInsightAuth(),
 *     provideHttpClient(withInterceptors([authInterceptor])),
 *     provideRouter(routes),
 *   ],
 * };
 * ```
 *
 * Usage (override for staging/production):
 * ```ts
 * provideInsightAuth({
 *   api: { identity: 'https://iam-identity.paramount-land.com/api' },
 *   signinUrl: 'https://iam.paramount-land.com/signin',
 * });
 * ```
 */
function provideInsightAuth(overrides) {
    const defaults = getDefaultInsightAuthConfig();
    const config = {
        ...defaults,
        ...overrides,
        // Cast needed: `Partial<...>`'s index signature widens to `string | undefined`,
        // but real callers only ever pass actual string URLs, never `undefined` values.
        api: { ...defaults.api, ...overrides?.api },
        tokenLifespan: { ...defaults.tokenLifespan, ...overrides?.tokenLifespan },
    };
    return makeEnvironmentProviders([
        { provide: INSIGHT_AUTH_CONFIG, useValue: config },
        {
            provide: APP_INITIALIZER,
            multi: true,
            useFactory: () => {
                const session = inject(ISessionService);
                return () => session.tryRestoreSession();
            },
        },
    ]);
}

/**
 * Extract the access token appended by iam-web after a successful external
 * SSO redirect. Reads the URL HASH FRAGMENT (`#at=<token>`) — deliberately
 * NOT a query parameter — so the token is never sent to the server and never
 * appears in access/gateway logs (fragments are browser-only and are
 * unconditionally stripped from the `Referer` header).
 */
function extractAccessTokenFromHash() {
    const hash = window.location.hash;
    if (!hash || hash.length < 2) {
        return null;
    }
    const params = new URLSearchParams(hash.substring(1));
    return params.get('at');
}
/**
 * Reusable SSO callback route component for @insight/ui consumer apps.
 * Register it at whatever route path is used as the `returnUrl` when
 * redirecting to iam-web's signin page, e.g.
 * `{ path: 'auth/callback', component: IAuthCallback }`.
 *
 * Flow:
 *  1. Extract the `at` token from the URL hash fragment.
 *  2. Store it via `ISessionService` (in-memory only).
 *  3. Clear the fragment from the URL immediately (never leave the token
 *     sitting in browser history).
 *  4. Validate & redirect to the original in-app `returnUrl` (query param
 *     `returnUrl`, defaulting to `/`), using the same `sanitizeReturnUrl`
 *     rules as iam-web.
 */
class IAuthCallback {
    session = inject(ISessionService);
    config = inject(INSIGHT_AUTH_CONFIG);
    router = inject(Router);
    ngOnInit() {
        const accessToken = extractAccessTokenFromHash();
        // Clear the fragment immediately regardless of outcome — the token must
        // never remain visible in the URL / browser history.
        if (window.location.hash) {
            history.replaceState(null, '', window.location.pathname + window.location.search);
        }
        if (!accessToken) {
            window.location.href = this.config.signinUrl;
            return;
        }
        this.session.setAccessToken(accessToken);
        const rawReturnUrl = new URLSearchParams(window.location.search).get('returnUrl') || '/';
        const { returnUrl, isExternal } = sanitizeReturnUrl(rawReturnUrl, this.config.allowedReturnOrigins);
        // Self-redirect loop guard — a relative returnUrl must never point back
        // at this app's own callback route.
        const callbackPath = this.config.callbackPath ?? '/auth/callback';
        const safeReturnUrl = !isExternal && returnUrl.startsWith(callbackPath) ? '/' : returnUrl;
        if (isExternal) {
            window.location.href = returnUrl;
        }
        else {
            this.router.navigateByUrl(safeReturnUrl);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IAuthCallback, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.30", type: IAuthCallback, isStandalone: true, selector: "i-auth-callback", ngImport: i0, template: '', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IAuthCallback, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-auth-callback',
                    standalone: true,
                    template: '',
                }]
        }] });

/**
 * Cross-domain auth guard for @insight/ui consumer apps.
 *
 * Unlike iam-web's internal Router-based guard, this performs a FULL PAGE
 * redirect to iam-web's signin page when unauthenticated, since the consumer
 * app and iam-web are separate applications/domains — not routes within the
 * same Angular router. The redirect is routed through this app's OWN
 * callback route (not the page the user was trying to visit) — see
 * `buildExternalSigninUrl()` for why that's required to avoid a redirect loop.
 */
const authGuard = (_route, state) => {
    const session = inject(ISessionService);
    const config = inject(INSIGHT_AUTH_CONFIG);
    // provideInsightAuth() registers an APP_INITIALIZER that calls
    // tryRestoreSession(), so by the time the router runs this guard
    // initializing() should already be false. If a consumer bypasses
    // provideInsightAuth() or the guard runs earlier, allow navigation to
    // proceed — the consumer's root component is responsible for gating the
    // outlet with session.initializing().
    if (session.initializing()) {
        return true;
    }
    if (session.isAuth()) {
        return true;
    }
    window.location.href = buildExternalSigninUrl(config, state.url);
    return false;
};

/**
 * Session-storage wrapper for non-sensitive UI state (returnUrl, nonce/state).
 * Tokens are NEVER stored here — the access token lives in-memory
 * (`ISessionService`) and the refresh token lives in an HttpOnly cookie set by
 * iam-identity-api.
 *
 * @overridable — consumers may provide `{ provide: IStorageService, useClass: ... }`.
 */
class IStorageService {
    storageKey = '@insight/ui';
    get(key) {
        const session = JSON.parse(sessionStorage.getItem(this.storageKey) || '{}') || {};
        return session[key] ?? '';
    }
    set(key, value) {
        const session = JSON.parse(sessionStorage.getItem(this.storageKey) || '{}') || {};
        session[key] = value;
        sessionStorage.setItem(this.storageKey, JSON.stringify(session));
    }
    delete(key) {
        const session = JSON.parse(sessionStorage.getItem(this.storageKey) || '{}') || {};
        delete session[key];
        sessionStorage.setItem(this.storageKey, JSON.stringify(session));
    }
    clear() {
        sessionStorage.removeItem(this.storageKey);
    }
    /** Save the return URL for post-login/post-password-change redirect (keyed `ru`). */
    setReturnUrl(url) {
        this.set('ru', url);
    }
    /** Retrieve and clear the saved return URL. Returns `'/'` when none is saved. */
    getReturnUrl() {
        const url = this.get('ru');
        this.delete('ru');
        return url || '/';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IStorageService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IStorageService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IStorageService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/**
 * Library-provided session-expired overlay. Consumer apps render it once near
 * the app root (mirroring `<i-dialog-outlet />`):
 *
 * ```html
 * <i-session-expired-dialog />
 * ```
 *
 * It is self-gating (renders nothing while hidden), reads its state from the
 * shared `SessionExpiredService` (shown by the auth interceptor when a token
 * refresh fails and `unauthorizedHandling` is `'dialog'`) and, on "Log in
 * again", performs a full-page redirect to iam-web's signin via
 * `buildExternalSigninUrl`, then hides itself. It cannot be dismissed by
 * clicking the backdrop.
 */
class ISessionExpiredDialog {
    sessionExpired = inject(SessionExpiredService);
    config = inject(INSIGHT_AUTH_CONFIG);
    visible = this.sessionExpired.visible;
    iconClass() {
        return this.sessionExpired.reason() === 'SESSION_REPLACED'
            ? 'fa-solid fa-right-from-bracket'
            : 'fa-solid fa-clock';
    }
    title() {
        switch (this.sessionExpired.reason()) {
            case 'SESSION_REPLACED':
                return 'Signed Out Remotely';
            case 'SESSION_REVOKED':
                return 'Session Ended';
            default:
                return 'Session Expired';
        }
    }
    message() {
        const localFallback = this.localFallbackMessage();
        const error = this.sessionExpired.apiError() ?? {
            errorCode: this.sessionExpired.errorCode() ?? undefined,
            message: this.sessionExpired.message() ?? undefined,
            detail: this.sessionExpired.detail() ?? undefined,
        };
        return resolveApiErrorDisplayMessage(error, localFallback, this.config.errorCatalogResolver);
    }
    localFallbackMessage() {
        switch (this.sessionExpired.reason()) {
            case 'TOKEN_EXPIRED':
                return 'Your session has expired. Please log in again to continue.';
            case 'SESSION_REVOKED':
                return 'Your session has been ended. Please log in again.';
            case 'SESSION_REPLACED':
                return ('Your session was ended because you signed in from another device or ' +
                    'your concurrent session access was revoked. Please log in again.');
            default:
                return 'Your session is no longer valid. Please log in again.';
        }
    }
    /** Perform the SSO handoff to iam-web's signin page, then clear the overlay state. */
    onConfirm() {
        const returnUrl = this.sessionExpired.returnUrl();
        this.sessionExpired.hide();
        window.location.href = buildExternalSigninUrl(this.config, returnUrl);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ISessionExpiredDialog, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.30", type: ISessionExpiredDialog, isStandalone: true, selector: "i-session-expired-dialog", ngImport: i0, template: `
    @if (visible()) {
      <div class="session-expired-overlay">
        <div class="session-expired-card" (click)="$event.stopPropagation()">
          <div class="session-expired-icon">
            <i class="fa-solid {{ iconClass() }}"></i>
          </div>
          <h1>{{ title() }}</h1>
          <p>{{ message() }}</p>
          <button class="session-expired-action" type="button" (click)="onConfirm()">
            Log in again
          </button>
        </div>
      </div>
    }
  `, isInline: true, styles: [".session-expired-overlay{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background-color:#00000080;z-index:9999}.session-expired-card{background:var(--i-color-surface, #ffffff);border-radius:8px;padding:32px;max-width:380px;width:calc(100% - 32px);box-shadow:0 8px 24px #0003;text-align:center}.session-expired-icon{font-size:48px;color:var(--i-color-warning, #f59e0b);margin-bottom:16px}h1{margin:0 0 8px;font-size:22px;font-weight:600;color:var(--i-text-color, #1f2937)}p{margin:0 0 24px;font-size:14px;line-height:1.5;color:var(--i-text-subtle-color, #6b7280)}.session-expired-action{border:none;border-radius:6px;padding:10px 20px;font-size:14px;font-weight:600;cursor:pointer;background:var(--i-color-primary, #2563eb);color:#fff}.session-expired-action:hover{filter:brightness(1.05)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: ISessionExpiredDialog, decorators: [{
            type: Component,
            args: [{ selector: 'i-session-expired-dialog', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, template: `
    @if (visible()) {
      <div class="session-expired-overlay">
        <div class="session-expired-card" (click)="$event.stopPropagation()">
          <div class="session-expired-icon">
            <i class="fa-solid {{ iconClass() }}"></i>
          </div>
          <h1>{{ title() }}</h1>
          <p>{{ message() }}</p>
          <button class="session-expired-action" type="button" (click)="onConfirm()">
            Log in again
          </button>
        </div>
      </div>
    }
  `, styles: [".session-expired-overlay{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background-color:#00000080;z-index:9999}.session-expired-card{background:var(--i-color-surface, #ffffff);border-radius:8px;padding:32px;max-width:380px;width:calc(100% - 32px);box-shadow:0 8px 24px #0003;text-align:center}.session-expired-icon{font-size:48px;color:var(--i-color-warning, #f59e0b);margin-bottom:16px}h1{margin:0 0 8px;font-size:22px;font-weight:600;color:var(--i-text-color, #1f2937)}p{margin:0 0 24px;font-size:14px;line-height:1.5;color:var(--i-text-subtle-color, #6b7280)}.session-expired-action{border:none;border-radius:6px;padding:10px 20px;font-size:14px;font-weight:600;cursor:pointer;background:var(--i-color-primary, #2563eb);color:#fff}.session-expired-action:hover{filter:brightness(1.05)}\n"] }]
        }] });

/** Resolves an input into a concrete `{ source, codes }` pair (or `null`). */
function resolvePermission(value) {
    if (!value) {
        return null;
    }
    if (typeof value === 'object' && !Array.isArray(value)) {
        return { source: value.source, codes: value.value };
    }
    return { source: 'menu', codes: value };
}
/**
 * Base structural permission directive shared by `IHHasMnDirective` and
 * `IHNotHasMnDirective`.
 *
 * ASYNC-AWARE: instead of a one-shot input setter, it subscribes to the
 * `IUserMenuStore`'s reactive menu/role state (`menus$` / `roles$`) and
 * re-renders the embedded view whenever the permission resolves or changes —
 * e.g. while the store cold-starts (menus not yet loaded) the view stays
 * hidden, then appears as soon as the data arrives, and disappears again if a
 * role/menu change revokes access.
 */
class IHMenuGateDirective {
    store = inject(IUserMenuStore);
    templateRef = inject((TemplateRef));
    viewContainer = inject(ViewContainerRef);
    value$ = new BehaviorSubject(null);
    viewCreated = false;
    subscription;
    ngOnInit() {
        this.subscription = combineLatest([this.value$, this.store.menus$, this.store.roles$])
            .pipe(map(([value]) => this.evaluate(value)), distinctUntilChanged())
            .subscribe((allowed) => this.renderView(allowed));
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
    evaluate(value) {
        const resolved = resolvePermission(value);
        if (!resolved) {
            return false;
        }
        return resolved.source === 'role' ? this.store.hasRole(resolved.codes) : this.store.hasMenu(resolved.codes);
    }
    renderView(allowed) {
        const show = this.invert ? !allowed : allowed;
        if (show && !this.viewCreated) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.viewCreated = true;
        }
        else if (!show && this.viewCreated) {
            this.viewContainer.clear();
            this.viewCreated = false;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IHMenuGateDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.30", type: IHMenuGateDirective, isStandalone: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IHMenuGateDirective, decorators: [{
            type: Directive,
            args: [{ standalone: true }]
        }] });
/**
 * Structural directive `*ihHasMn` — renders the element only while the current
 * user has the given menu code / role.
 *
 * Usage:
 * ```html
 * <button *ihHasMn="'admin'">Admin only</button>                 <!-- menu mode (default) -->
 * <div *ihHasMn="['read', 'write']">R/W</div>
 * <i *ihHasMn="{ source: 'role', value: 'iam-admin' }">Role check</i>
 * ```
 */
class IHHasMnDirective extends IHMenuGateDirective {
    invert = false;
    set ihHasMn(value) {
        this.value$.next(value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IHHasMnDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.30", type: IHHasMnDirective, isStandalone: true, selector: "[ihHasMn]", inputs: { ihHasMn: "ihHasMn" }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IHHasMnDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[ihHasMn]', standalone: true }]
        }], propDecorators: { ihHasMn: [{
                type: Input
            }] } });

/**
 * Structural directive `*ihNotHasMn` — the inverse of `ihHasMn`: renders the
 * element only while the current user does NOT have the given menu code / role.
 *
 * Usage:
 * ```html
 * <div *ihNotHasMn="'super-admin'">Everyone except super-admin</div>
 * <i *ihNotHasMn="{ source: 'role', value: 'iam-admin' }">Non-admin</i>
 * ```
 */
class IHNotHasMnDirective extends IHMenuGateDirective {
    invert = true;
    set ihNotHasMn(value) {
        this.value$.next(value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IHNotHasMnDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.30", type: IHNotHasMnDirective, isStandalone: true, selector: "[ihNotHasMn]", inputs: { ihNotHasMn: "ihNotHasMn" }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.30", ngImport: i0, type: IHNotHasMnDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[ihNotHasMn]', standalone: true }]
        }], propDecorators: { ihNotHasMn: [{
                type: Input
            }] } });

/*
 * Public API Surface of insight-ui
 */

/**
 * Generated bundle index. Do not edit.
 */

export { IAlert, IAlertService, IApiService, IAuthCallback, IAuthService, IAvatar, IButton, ICard, ICardBody, ICardFooter, ICardImage, ICardModule, ICodeViewer, ICodeViewerModule, IConfirm, IConfirmService, ICsrfService, ICurrentUserService, IDatepicker, IDialog, IDialogCloseDirective, IDialogContainer, IDialogModule, IDialogOutlet, IDialogRef, IDialogService, IFCDatepicker, IFCInput, IFCSelect, IFCTextArea, IGrid, IGridCell, IGridCellDefDirective, IGridColumn, IGridColumnGroup, IGridCustomColumn, IGridDataSource, IGridExpandableRow, IGridHeaderCell, IGridHeaderCellDefDirective, IGridHeaderCellGroup, IGridHeaderCellGroupColumns, IGridHeaderRowDirective, IGridModule, IGridRowDefDirective, IGridRowDirective, IGridViewport, IHContent, IHHasMnDirective, IHMenu, IHMenuGateDirective, IHNotHasMnDirective, IHSidebar, IHTitleBreadcrumbService, IH_SKIP_BEARER_HEADER, IHighlightSearchPipe, IIcon, IInput, IInputAddon, IInputMaskDirective, IInputModule, ILoading, INSIGHT_AUTH_CONFIG, IPaginator, IPill, ISection, ISectionBody, ISectionFilter, ISectionFooter, ISectionHeader, ISectionModule, ISectionSubHeader, ISectionTab, ISectionTabContent, ISectionTabHeader, ISectionTabs, ISelect, ISelectOptionDefDirective, ISessionExpiredDialog, ISessionService, IStorageService, ITextArea, IToggle, IUI, IUserMenuService, IUserMenuStore, I_DIALOG_DATA, I_GRID_DECLARATIONS, I_ICON_NAMES, I_ICON_SIZES, SessionExpiredService, USER_APPLICATION_MAPPING_NOT_FOUND, authGuard, authInterceptor, buildExternalSigninUrl, buildFavoritePathMap, collectMenuChain, collectMenuCodes, environment, extractAccessTokenFromHash, extractProblemDetailsErrorCode, findFirstLeafRoute, findMenuNameById, getDefaultInsightAuthConfig, getMenuChildren, getMenuKey, getMenuLabel, getMenuRoute, hasAnyMenuCode, hasMenuChildren, isControlRequired, isGroupNode, isHttpRoute, isLeafItem, isModuleMenu, isNewTabMenu, isReloadMenu, isSessionExpiredError, isSpaMenu, mapToSidebarUser, normalizeApiError, normalizeMenuTree, provideInsightAuth, resolveApiErrorDisplayMessage, resolveControlErrorMessage, resolvePermission, sanitizeReturnUrl, toIMenu, toIMenuFavorite, toIMenus, toSessionExpiredReason };
//# sourceMappingURL=insight-ui.mjs.map
