import * as i1$1 from '@angular/common';
import { NgClass, NgComponentOutlet, NgStyle, NgForOf, AsyncPipe, CommonModule, formatDate, NgTemplateOutlet } from '@angular/common';
import * as i0 from '@angular/core';
import { Input, Component, HostBinding, EventEmitter, booleanAttribute, HostListener, Output, ChangeDetectionStrategy, InjectionToken, Injectable, inject, Injector, Directive, NgModule, isDevMode, ViewChild, Optional, Self, ChangeDetectorRef, forwardRef, Pipe, ContentChild, TemplateRef, Host, ContentChildren } from '@angular/core';
import { Subject, BehaviorSubject, map, firstValueFrom, filter, startWith, shareReplay } from 'rxjs';
import { RouterLink, Router, ActivatedRoute, NavigationEnd, RouterOutlet } from '@angular/router';
import * as i1 from '@angular/forms';
import { Validators, NG_VALUE_ACCESSOR, FormBuilder, FormControl, ReactiveFormsModule, FormsModule, FormGroupDirective } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime } from 'rxjs/operators';

/**
 * IIcon
 * Version: 1.0.0
 * <ic />
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IIcon, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.15", type: IIcon, isStandalone: true, selector: "ic", inputs: { icon: "icon", size: "size" }, ngImport: i0, template: `<i [ngClass]="iconClass"></i>`, isInline: true, dependencies: [{ kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IIcon, decorators: [{
            type: Component,
            args: [{
                    selector: 'ic',
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ILoading, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.15", type: ILoading, isStandalone: true, selector: "i-loading", inputs: { label: "label", light: "light" }, host: { properties: { "attr.light": "this.isLight" } }, ngImport: i0, template: `<div
      class="spinner-border spinner-border-sm"
      role="status"
      [class.light]="light"
    ></div>
    {{ label }}`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ILoading, decorators: [{
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
        if (this.disabled || this.loading)
            return;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IButton, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.15", type: IButton, isStandalone: true, selector: "i-button", inputs: { disabled: "disabled", loading: ["loading", "loading", booleanAttribute], type: "type", loadingText: "loadingText", variant: "variant", size: "size", icon: "icon" }, outputs: { onClick: "onClick" }, host: { attributes: { "role": "button" }, listeners: { "click": "handleClick($event)", "keydown": "handleKeydown($event)" }, properties: { "attr.tabindex": "this.tabIndex", "attr.aria-disabled": "this.ariaDisabled", "attr.aria-busy": "this.ariaBusy", "attr.variant": "this.hostVariant", "attr.size": "this.hostSize" } }, ngImport: i0, template: `@if (loading) {
    <i-loading [light]="variant !== 'outline'" [label]="loadingText" />
    } @else { @if (icon) {
    <ic [icon]="icon" [size]="size" />
    }
    <ng-content />
    } `, isInline: true, dependencies: [{ kind: "component", type: ILoading, selector: "i-loading", inputs: ["label", "light"] }, { kind: "component", type: IIcon, selector: "ic", inputs: ["icon", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IButton, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-button',
                    standalone: true,
                    template: `@if (loading) {
    <i-loading [light]="variant !== 'outline'" [label]="loadingText" />
    } @else { @if (icon) {
    <ic [icon]="icon" [size]="size" />
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

const I_DIALOG_DATA = new InjectionToken('I_DIALOG_DATA');
/**
 * REF
 * TComponent = dialog component type
 * TResult   = result type of close()
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IDialogService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IDialogService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IDialogService, decorators: [{
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
        if (!this.instance?.config.disableClose &&
            this.instance?.config.backdropClose) {
            this.instance.ref.close();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IDialogContainer, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.15", type: IDialogContainer, isStandalone: true, selector: "i-dialog-container", inputs: { instance: "instance", isTopMost: "isTopMost" }, host: { listeners: { "document:keydown.escape": "onEscKey()" } }, usesOnChanges: true, ngImport: i0, template: "<div class=\"i-dialog-backdrop\" (click)=\"onBackdropClick()\"></div>\n<div class=\"i-dialog-wrapper\">\n  <div class=\"i-dialog-panel\" [ngStyle]=\"panelStyles\">\n    <ng-container\n      *ngComponentOutlet=\"\n        instance.component;\n        injector: dialogInjector\n      \"></ng-container>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: NgComponentOutlet, selector: "[ngComponentOutlet]", inputs: ["ngComponentOutlet", "ngComponentOutletInputs", "ngComponentOutletInjector", "ngComponentOutletEnvironmentInjector", "ngComponentOutletContent", "ngComponentOutletNgModule", "ngComponentOutletNgModuleFactory"], exportAs: ["ngComponentOutlet"] }, { kind: "directive", type: NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IDialogContainer, decorators: [{
            type: Component,
            args: [{ selector: 'i-dialog-container', standalone: true, imports: [NgComponentOutlet, NgStyle], template: "<div class=\"i-dialog-backdrop\" (click)=\"onBackdropClick()\"></div>\n<div class=\"i-dialog-wrapper\">\n  <div class=\"i-dialog-panel\" [ngStyle]=\"panelStyles\">\n    <ng-container\n      *ngComponentOutlet=\"\n        instance.component;\n        injector: dialogInjector\n      \"></ng-container>\n  </div>\n</div>\n" }]
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IDialogOutlet, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.15", type: IDialogOutlet, isStandalone: true, selector: "i-dialog-outlet", ngImport: i0, template: `
    <ng-container *ngFor="let dialog of dialogs$ | async; let last = last">
      <i-dialog-container
        [instance]="dialog"
        [isTopMost]="last"></i-dialog-container>
    </ng-container>
  `, isInline: true, dependencies: [{ kind: "directive", type: NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "component", type: IDialogContainer, selector: "i-dialog-container", inputs: ["instance", "isTopMost"] }, { kind: "pipe", type: AsyncPipe, name: "async" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IDialogOutlet, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-dialog-outlet',
                    standalone: true,
                    imports: [NgForOf, AsyncPipe, IDialogContainer],
                    template: `
    <ng-container *ngFor="let dialog of dialogs$ | async; let last = last">
      <i-dialog-container
        [instance]="dialog"
        [isTopMost]="last"></i-dialog-container>
    </ng-container>
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IDialogCloseDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.15", type: IDialogCloseDirective, isStandalone: true, selector: "[i-dialog-close], [iDialogClose]", inputs: { result: ["iDialogClose", "result"] }, host: { listeners: { "click": "onClick($event)" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IDialogCloseDirective, decorators: [{
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
    actionAlign = 'end';
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IDialog, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.15", type: IDialog, isStandalone: true, selector: "i-dialog", inputs: { title: "title", actions: "actions", actionAlign: "actionAlign" }, outputs: { onOk: "onOk", onConfirm: "onConfirm", onSave: "onSave", onCustomAction: "onCustomAction" }, ngImport: i0, template: "@if (title) {\n  <h4 class=\"i-dialog-title\">{{ title }}</h4>\n}\n<div class=\"i-dialog-content\">\n  <ng-content />\n</div>\n@if (actions.length > 0) {\n  <div class=\"flex i-dialog-actions\" [align]=\"actionAlign\">\n    @if (customActions.length > 0) {\n      @for (a of customActions; track $index) {\n        <i-button\n          [icon]=\"a.icon\"\n          [ngClass]=\"a.className\"\n          [variant]=\"a.variant || 'primary'\"\n          (onClick)=\"onCustomActionClick(a)\"\n          >{{ a.label }}</i-button\n        >\n      }\n    }\n    @if (\n      (okAction || confirmAction || saveAction || cancelAction) &&\n      customActions.length > 0\n    ) {\n      <span class=\"flex-fill\"></span>\n    }\n    @if (okAction) {\n      <i-button\n        variant=\"primary\"\n        [ngClass]=\"okAction.className\"\n        (onClick)=\"onOkClick()\"\n        icon=\"check\"\n        >OK</i-button\n      >\n    }\n    @if (confirmAction) {\n      <i-button\n        icon=\"save\"\n        variant=\"primary\"\n        [ngClass]=\"confirmAction.className\"\n        (onClick)=\"onConfirmClick()\"\n        >Confirm</i-button\n      >\n    }\n    @if (saveAction) {\n      <i-button\n        icon=\"save\"\n        variant=\"primary\"\n        [ngClass]=\"saveAction.className\"\n        (onClick)=\"onSaveClick()\"\n        >Save</i-button\n      >\n    }\n    @if (cancelAction) {\n      <i-button\n        icon=\"cancel\"\n        i-dialog-close\n        variant=\"danger\"\n        [ngClass]=\"cancelAction.className\"\n        >Cancel</i-button\n      >\n    }\n  </div>\n}\n", dependencies: [{ kind: "component", type: IButton, selector: "i-button", inputs: ["disabled", "loading", "type", "loadingText", "variant", "size", "icon"], outputs: ["onClick"] }, { kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: IDialogCloseDirective, selector: "[i-dialog-close], [iDialogClose]", inputs: ["iDialogClose"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IDialog, decorators: [{
            type: Component,
            args: [{ selector: 'i-dialog', standalone: true, imports: [IButton, NgClass, IDialogCloseDirective], template: "@if (title) {\n  <h4 class=\"i-dialog-title\">{{ title }}</h4>\n}\n<div class=\"i-dialog-content\">\n  <ng-content />\n</div>\n@if (actions.length > 0) {\n  <div class=\"flex i-dialog-actions\" [align]=\"actionAlign\">\n    @if (customActions.length > 0) {\n      @for (a of customActions; track $index) {\n        <i-button\n          [icon]=\"a.icon\"\n          [ngClass]=\"a.className\"\n          [variant]=\"a.variant || 'primary'\"\n          (onClick)=\"onCustomActionClick(a)\"\n          >{{ a.label }}</i-button\n        >\n      }\n    }\n    @if (\n      (okAction || confirmAction || saveAction || cancelAction) &&\n      customActions.length > 0\n    ) {\n      <span class=\"flex-fill\"></span>\n    }\n    @if (okAction) {\n      <i-button\n        variant=\"primary\"\n        [ngClass]=\"okAction.className\"\n        (onClick)=\"onOkClick()\"\n        icon=\"check\"\n        >OK</i-button\n      >\n    }\n    @if (confirmAction) {\n      <i-button\n        icon=\"save\"\n        variant=\"primary\"\n        [ngClass]=\"confirmAction.className\"\n        (onClick)=\"onConfirmClick()\"\n        >Confirm</i-button\n      >\n    }\n    @if (saveAction) {\n      <i-button\n        icon=\"save\"\n        variant=\"primary\"\n        [ngClass]=\"saveAction.className\"\n        (onClick)=\"onSaveClick()\"\n        >Save</i-button\n      >\n    }\n    @if (cancelAction) {\n      <i-button\n        icon=\"cancel\"\n        i-dialog-close\n        variant=\"danger\"\n        [ngClass]=\"cancelAction.className\"\n        >Cancel</i-button\n      >\n    }\n  </div>\n}\n" }]
        }], propDecorators: { title: [{
                type: Input
            }], actions: [{
                type: Input
            }], actionAlign: [{
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
class IDialogModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.15", ngImport: i0, type: IDialogModule, imports: [IDialogContainer, IDialogOutlet, IDialogCloseDirective, IDialog], exports: [IDialogContainer, IDialogOutlet, IDialogCloseDirective, IDialog] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IDialogModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [IDialogContainer, IDialogOutlet, IDialogCloseDirective, IDialog],
                    exports: [IDialogContainer, IDialogOutlet, IDialogCloseDirective, IDialog],
                }]
        }] });

class IAlert {
    data = inject(I_DIALOG_DATA);
    dialog = inject(IDialogRef);
    get alertClass() {
        return `i-alert i-alert-${this.data.type}`;
    }
    submit() {
        this.dialog.close();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IAlert, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.15", type: IAlert, isStandalone: true, selector: "i-alert", ngImport: i0, template: "<i-dialog [actions]=\"[{\n  type: 'ok',\n  className: 'w-full'\n}]\" [ngClass]=\"alertClass\" (onOk)=\"submit()\">\n  @if(data.type === 'information') {\n  <ic icon=\"info\" size=\"2xl\" />\n  }\n  @if(data.type === 'success') {\n  <ic icon=\"check-circle\" size=\"2xl\" />\n  }\n  @if(data.type === 'warning') {\n  <ic icon=\"exclamation\" size=\"2xl\" />\n  }\n  @if(data.type === 'danger') {\n  <ic icon=\"x-circle\" size=\"2xl\" />\n  }\n  <h4>{{ data.title }}</h4>\n  <p [innerHtml]=\"data.description\"></p>\n</i-dialog>", dependencies: [{ kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "component", type: IIcon, selector: "ic", inputs: ["icon", "size"] }, { kind: "component", type: IDialog, selector: "i-dialog", inputs: ["title", "actions", "actionAlign"], outputs: ["onOk", "onConfirm", "onSave", "onCustomAction"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IAlert, decorators: [{
            type: Component,
            args: [{ selector: 'i-alert', imports: [NgClass, IIcon, IDialog], template: "<i-dialog [actions]=\"[{\n  type: 'ok',\n  className: 'w-full'\n}]\" [ngClass]=\"alertClass\" (onOk)=\"submit()\">\n  @if(data.type === 'information') {\n  <ic icon=\"info\" size=\"2xl\" />\n  }\n  @if(data.type === 'success') {\n  <ic icon=\"check-circle\" size=\"2xl\" />\n  }\n  @if(data.type === 'warning') {\n  <ic icon=\"exclamation\" size=\"2xl\" />\n  }\n  @if(data.type === 'danger') {\n  <ic icon=\"x-circle\" size=\"2xl\" />\n  }\n  <h4>{{ data.title }}</h4>\n  <p [innerHtml]=\"data.description\"></p>\n</i-dialog>" }]
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IAlertService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IAlertService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IAlertService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/**
 * ICard
 * Version: 1.0.0
 * <i-card></i-card>
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
    // Click-only usage
    cardClick = new EventEmitter();
    /* ======================
     * Dev-mode validation
     * ====================== */
    ngOnInit() {
        if (!isDevMode())
            return;
        const hasHref = !!this.href;
        const hasRouter = this.routerLink !== undefined && this.routerLink !== null && this.routerLink !== '';
        const hasClick = this.cardClick.observed;
        if (hasHref && hasRouter) {
            console.warn('[i-card] Do not use `href` and `routerLink` together. Choose one.', this);
        }
        if (hasClick && (hasHref || hasRouter)) {
            console.warn('[i-card] `(cardClick)` should not be combined with `href` or `routerLink`.', this);
        }
        if (!hasHref && !hasRouter && !hasClick) {
            console.warn('[i-card] No action provided. Add `href`, `routerLink`, or `(cardClick)`.', this);
        }
    }
    /* ======================
     * Attribute helpers
     * ====================== */
    get relAttr() {
        if (this.rel)
            return this.rel;
        if ((this.target ?? '').toLowerCase() === '_blank') {
            return 'noopener noreferrer';
        }
        return null;
    }
    get hrefAttr() {
        if (this.disabled)
            return null;
        if (this.routerLinkAttr)
            return null;
        return this.href ?? null;
    }
    get routerLinkAttr() {
        if (this.disabled)
            return undefined;
        return this.routerLink ?? undefined;
    }
    /* ======================
     * Click handling
     * ====================== */
    onClick(ev) {
        if (this.disabled) {
            ev.preventDefault();
            ev.stopPropagation();
            return;
        }
        // Button-like behavior
        if (this.cardClick.observed) {
            ev.preventDefault();
            this.cardClick.emit(ev);
            return;
        }
        // Prevent empty anchor navigation (# / top)
        const hasHref = !!this.href;
        const hasRouter = this.routerLink !== undefined && this.routerLink !== null && this.routerLink !== '';
        if (!hasHref && !hasRouter) {
            ev.preventDefault();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ICard, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.15", type: ICard, isStandalone: true, selector: "i-card", inputs: { href: "href", routerLink: "routerLink", queryParams: "queryParams", fragment: "fragment", replaceUrl: "replaceUrl", skipLocationChange: "skipLocationChange", state: "state", target: "target", rel: "rel", disabled: "disabled" }, outputs: { cardClick: "cardClick" }, ngImport: i0, template: `<a
    class="i-card"
    [attr.href]="hrefAttr"
    [attr.target]="target ?? null"
    [attr.rel]="relAttr"
    [attr.aria-disabled]="disabled ? 'true' : null"
    [attr.tabindex]="disabled ? -1 : null"
    [routerLink]="routerLinkAttr"
    [queryParams]="queryParams"
    [fragment]="fragment"
    [replaceUrl]="replaceUrl"
    [skipLocationChange]="skipLocationChange"
    [state]="state"
    (click)="onClick($event)"
  >
    <ng-content />
  </a> `, isInline: true, dependencies: [{ kind: "directive", type: RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ICard, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-card',
                    standalone: true,
                    imports: [RouterLink],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `<a
    class="i-card"
    [attr.href]="hrefAttr"
    [attr.target]="target ?? null"
    [attr.rel]="relAttr"
    [attr.aria-disabled]="disabled ? 'true' : null"
    [attr.tabindex]="disabled ? -1 : null"
    [routerLink]="routerLinkAttr"
    [queryParams]="queryParams"
    [fragment]="fragment"
    [replaceUrl]="replaceUrl"
    [skipLocationChange]="skipLocationChange"
    [state]="state"
    (click)="onClick($event)"
  >
    <ng-content />
  </a> `,
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
            }], cardClick: [{
                type: Output
            }] } });
class ICardImage {
    src;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ICardImage, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.15", type: ICardImage, isStandalone: true, selector: "i-card-image", inputs: { src: "src" }, ngImport: i0, template: `<img [src]="src" />`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ICardImage, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-card-image',
                    imports: [],
                    template: `<img [src]="src" />`,
                }]
        }], propDecorators: { src: [{
                type: Input
            }] } });
class ICardBody {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ICardBody, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.15", type: ICardBody, isStandalone: true, selector: "i-card-body", ngImport: i0, template: `<ng-content />`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ICardBody, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-card-body',
                    imports: [],
                    template: `<ng-content />`,
                }]
        }] });
class ICardFooter {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ICardFooter, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.15", type: ICardFooter, isStandalone: true, selector: "i-card-footer", ngImport: i0, template: `<ng-content />`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ICardFooter, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-card-footer',
                    imports: [],
                    template: `<ng-content />`,
                }]
        }] });
class ICardModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ICardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.15", ngImport: i0, type: ICardModule, imports: [ICard, ICardBody, ICardFooter, ICardImage], exports: [ICard, ICardBody, ICardFooter, ICardImage] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ICardModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ICardModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ICard, ICardBody, ICardFooter, ICardImage],
                    exports: [ICard, ICardBody, ICardFooter, ICardImage],
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
    if (!errors)
        return null;
    const keys = Object.keys(errors);
    if (!keys.length)
        return null;
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
    if (!control)
        return hasCustomRequired;
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
    return tpl.replace(/\{(\w+)\}/g, (_match, key) => map[key] != null ? String(map[key]) : `{${key}}`);
}

/* textarea.ts */
/**
 * ITextarea
 * Version: 1.1.0
 */
class ITextArea {
    placeholder = '';
    readonly = false;
    rows = 3;
    /** invalid state (controlled by form or wrapper) */
    invalid = false;
    /** value usable both by CVA and by [value] binding */
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
    onChange = () => { };
    onTouched = () => { };
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ITextArea, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.15", type: ITextArea, isStandalone: true, selector: "i-textarea", inputs: { placeholder: "placeholder", readonly: "readonly", rows: "rows", invalid: "invalid", value: "value", disabled: "disabled" }, host: { listeners: { "click": "handleHostClick()" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: ITextArea,
                multi: true,
            },
        ], viewQueries: [{ propertyName: "textareaRef", first: true, predicate: ["textareaRef"], descendants: true }], ngImport: i0, template: `<textarea
    #textareaRef
    [placeholder]="placeholder"
    [readonly]="readonly"
    [rows]="rows"
    [disabled]="isDisabled"
    [value]="value ?? ''"
    [attr.aria-invalid]="invalid ? 'true' : null"
    (input)="handleInput($event)"
    (blur)="handleBlur()"
  ></textarea>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ITextArea, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-textarea',
                    standalone: true,
                    template: `<textarea
    #textareaRef
    [placeholder]="placeholder"
    [readonly]="readonly"
    [rows]="rows"
    [disabled]="isDisabled"
    [value]="value ?? ''"
    [attr.aria-invalid]="invalid ? 'true' : null"
    (input)="handleInput($event)"
    (blur)="handleBlur()"
  ></textarea>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: ITextArea,
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
/**
 * IFcTextarea
 * Version: 1.0.0
 *
 * - Form control wrapper for ITextArea
 * - Provides label, required asterisk, error message
 * - Implements CVA so you can use formControlName on <i-fc-textarea>
 */
class IFCTextArea {
    ngControl;
    formDir;
    cdr;
    innerTextarea;
    // ---------- UI inputs ----------
    label = '';
    placeholder = '';
    readonly = false;
    rows = 3;
    /** old-style custom error templates: { required: '{label} is xxx' } */
    errorMessage;
    /** non-form usage: [value] binding */
    get value() {
        return this._value;
    }
    set value(v) {
        this._value = v ?? '';
    }
    // ---------- internal state ----------
    _value = null;
    isDisabled = false;
    onChange = () => { };
    onTouched = () => { };
    constructor(ngControl, formDir, cdr) {
        this.ngControl = ngControl;
        this.formDir = formDir;
        this.cdr = cdr;
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
        // when the form is submitted, re-check this OnPush component
        if (this.formDir) {
            this.formDir.ngSubmit.subscribe(() => {
                this.cdr.markForCheck();
            });
        }
    }
    // ---------- CVA ----------
    writeValue(v) {
        this._value = v ?? '';
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
    // ---------- bridge from inner <i-textarea> ----------
    handleInnerInput(event) {
        const target = event.target;
        const v = target?.value ?? '';
        this._value = v;
        this.onChange(this._value);
    }
    handleInnerBlur() {
        this.onTouched();
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
        // same behavior as i-fc-input:
        // invalid + form submitted, otherwise fallback to dirty/touched
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IFCTextArea, deps: [{ token: i1.NgControl, optional: true, self: true }, { token: i1.FormGroupDirective, optional: true }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.15", type: IFCTextArea, isStandalone: true, selector: "i-fc-textarea", inputs: { label: "label", placeholder: "placeholder", readonly: "readonly", rows: "rows", errorMessage: "errorMessage", value: "value" }, viewQueries: [{ propertyName: "innerTextarea", first: true, predicate: ITextArea, descendants: true }], ngImport: i0, template: `@if (label) {
    <label class="i-fc-textarea__label" (click)="focusInnerTextarea()">
      {{ label }} : @if (required) {
      <span class="i-fc-textarea__required">*</span>
      }
    </label>
    }

    <i-textarea
      [placeholder]="placeholder"
      [readonly]="readonly"
      [rows]="rows"
      [value]="value"
      [invalid]="controlInvalid"
      [disabled]="isDisabled"
      (input)="handleInnerInput($event)"
      (blur)="handleInnerBlur()"
    >
    </i-textarea>

    @if (controlInvalid && resolvedErrorText) {
    <div class="i-fc-textarea__error">
      {{ resolvedErrorText }}
    </div>
    }`, isInline: true, dependencies: [{ kind: "component", type: ITextArea, selector: "i-textarea", inputs: ["placeholder", "readonly", "rows", "invalid", "value", "disabled"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IFCTextArea, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-fc-textarea',
                    standalone: true,
                    imports: [ITextArea],
                    template: `@if (label) {
    <label class="i-fc-textarea__label" (click)="focusInnerTextarea()">
      {{ label }} : @if (required) {
      <span class="i-fc-textarea__required">*</span>
      }
    </label>
    }

    <i-textarea
      [placeholder]="placeholder"
      [readonly]="readonly"
      [rows]="rows"
      [value]="value"
      [invalid]="controlInvalid"
      [disabled]="isDisabled"
      (input)="handleInnerInput($event)"
      (blur)="handleInnerBlur()"
    >
    </i-textarea>

    @if (controlInvalid && resolvedErrorText) {
    <div class="i-fc-textarea__error">
      {{ resolvedErrorText }}
    </div>
    }`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: () => [{ type: i1.NgControl, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }, { type: i1.FormGroupDirective, decorators: [{
                    type: Optional
                }] }, { type: i0.ChangeDetectorRef }], propDecorators: { innerTextarea: [{
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

class IConfirm {
    data = inject(I_DIALOG_DATA);
    dialog = inject(IDialogRef);
    formBuilder = inject(FormBuilder);
    reason = new FormControl('', [Validators.required]);
    formGroup = this.formBuilder.group({
        reason: this.reason,
    });
    formGroupDir;
    // @ViewChild('submitButton') submitButton!: ElementRef<HTMLButtonElement>;
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
        if (this.formGroup.invalid)
            return;
        this.dialog.close(this.reason.value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IConfirm, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.15", type: IConfirm, isStandalone: true, selector: "i-confirm", viewQueries: [{ propertyName: "formGroupDir", first: true, predicate: FormGroupDirective, descendants: true }], ngImport: i0, template: "<i-dialog\n  actionAlign=\"center\"\n  [actions]=\"[\n    {\n      type: 'confirm',\n      className: 'w-104',\n    },\n    {\n      type: 'cancel',\n      className: 'w-104',\n    },\n  ]\"\n  [ngClass]=\"confirmClass\"\n  (onConfirm)=\"submit()\"\n>\n  @if (data.type === 'information') {\n    <ic icon=\"info\" size=\"2xl\" />\n  }\n  @if (data.type === 'success') {\n    <ic icon=\"check-circle\" size=\"2xl\" />\n  }\n  @if (data.type === 'warning') {\n    <ic icon=\"exclamation\" size=\"2xl\" />\n  }\n  @if (data.type === 'danger') {\n    <ic icon=\"x-circle\" size=\"2xl\" />\n  }\n  <h4>{{ data.title }}</h4>\n  <p [innerHtml]=\"data.description\"></p>\n  @if (data.reason) {\n    <form [formGroup]=\"formGroup\" (ngSubmit)=\"onSubmit()\" class=\"mt-xs\">\n      <i-fc-textarea\n        label=\"Reason\"\n        placeholder=\"Fill your reason here..\"\n        formControlName=\"reason\"\n        [errorMessage]=\"{\n          required: 'Please fill in the reason..',\n        }\"\n      ></i-fc-textarea>\n      <button #submitButton class=\"hidden\" type=\"submit\"></button>\n    </form>\n  }\n</i-dialog>\n", dependencies: [{ kind: "component", type: IDialog, selector: "i-dialog", inputs: ["title", "actions", "actionAlign"], outputs: ["onOk", "onConfirm", "onSave", "onCustomAction"] }, { kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "component", type: IIcon, selector: "ic", inputs: ["icon", "size"] }, { kind: "component", type: IFCTextArea, selector: "i-fc-textarea", inputs: ["label", "placeholder", "readonly", "rows", "errorMessage", "value"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "ngmodule", type: FormsModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IConfirm, decorators: [{
            type: Component,
            args: [{ selector: 'i-confirm', imports: [
                        IDialog,
                        NgClass,
                        IIcon,
                        IFCTextArea,
                        ReactiveFormsModule,
                        FormsModule,
                    ], template: "<i-dialog\n  actionAlign=\"center\"\n  [actions]=\"[\n    {\n      type: 'confirm',\n      className: 'w-104',\n    },\n    {\n      type: 'cancel',\n      className: 'w-104',\n    },\n  ]\"\n  [ngClass]=\"confirmClass\"\n  (onConfirm)=\"submit()\"\n>\n  @if (data.type === 'information') {\n    <ic icon=\"info\" size=\"2xl\" />\n  }\n  @if (data.type === 'success') {\n    <ic icon=\"check-circle\" size=\"2xl\" />\n  }\n  @if (data.type === 'warning') {\n    <ic icon=\"exclamation\" size=\"2xl\" />\n  }\n  @if (data.type === 'danger') {\n    <ic icon=\"x-circle\" size=\"2xl\" />\n  }\n  <h4>{{ data.title }}</h4>\n  <p [innerHtml]=\"data.description\"></p>\n  @if (data.reason) {\n    <form [formGroup]=\"formGroup\" (ngSubmit)=\"onSubmit()\" class=\"mt-xs\">\n      <i-fc-textarea\n        label=\"Reason\"\n        placeholder=\"Fill your reason here..\"\n        formControlName=\"reason\"\n        [errorMessage]=\"{\n          required: 'Please fill in the reason..',\n        }\"\n      ></i-fc-textarea>\n      <button #submitButton class=\"hidden\" type=\"submit\"></button>\n    </form>\n  }\n</i-dialog>\n" }]
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IConfirmService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IConfirmService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IConfirmService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

function coerceBool(v) {
    return v !== null && v !== undefined && `${v}` !== 'false';
}
function escapeHtml(s) {
    return s
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
    if (v === null || v === undefined)
        return null;
    const s = String(v).trim().toLowerCase();
    if (s === '' || s === 'wrap' || s === 'auto')
        return null;
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
    if (!f)
        return f;
    if (isAbsoluteUrl(f) || f.startsWith('/'))
        return f;
    const base = import.meta.url;
    return new URL(f.replace(/^\.\//, ''), base).toString();
}
function normalizeHljsLanguage(lang) {
    if (lang === 'html')
        return 'xml';
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
        if (next === this._file)
            return;
        this._file = next;
        if (this._file)
            this.loadFile(this._file);
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
    /** default true */
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
    fileLoaded = new EventEmitter();
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
        if (this._languageOverride)
            return this._languageOverride;
        if (this._file)
            return this._fileLanguage;
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
            if (projected)
                this._code = projected;
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
        if (!text)
            return 1;
        return text.split('\n').length;
    }
    readProjectedContent() {
        const host = document.createElement('div');
        const view = this.projectedTpl.createEmbeddedView({});
        view.detectChanges();
        view.rootNodes.forEach((n) => {
            if (typeof n === 'string')
                host.append(n);
            else if (n?.textContent)
                host.append(n.textContent);
        });
        view.destroy();
        return host.textContent?.trim() ?? '';
    }
    shouldUseHljs() {
        return this.highlighter === 'hljs' || this.highlighter === 'auto';
    }
    renderToHtmlSync(raw, language) {
        const text = raw ?? '';
        if (!text)
            return '';
        if (this.highlighter === 'none')
            return escapeHtml(text);
        if (this.shouldUseHljs() && this.hljs) {
            return this.highlightWithHljs(text, language);
        }
        return escapeHtml(text);
    }
    async maybeHighlightAsync() {
        if (!this.shouldUseHljs())
            return;
        if (!this._code)
            return;
        if (!this.hljs) {
            await this.loadHljsIfNeeded();
            if (!this.hljs)
                return;
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
        if (this.hljs)
            return;
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
            if (seq !== this.requestSeq)
                return;
            this._code = content ?? '';
            this.loading = false;
            this.error = '';
            this.recompute();
            this.fileLoaded.emit({ file: url, language: this.effectiveLanguage });
        }
        catch {
            if (seq !== this.requestSeq)
                return;
            this.loading = false;
            this.error = `Failed to load: ${path}`;
            this.recompute();
        }
    }
    async onCopy() {
        const text = this._code ?? '';
        if (!text || this.loading)
            return;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ICodeViewer, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.15", type: ICodeViewer, isStandalone: true, selector: "i-code-viewer", inputs: { language: "language", file: "file", code: "code", wrap: ["wrap", "wrap", coerceBool], compact: ["compact", "compact", coerceBool], lineNumbers: ["lineNumbers", "lineNumbers", coerceBool], overlay: ["overlay", "overlay", coerceBool], showFileType: ["showFileType", "showFileType", coerceBool], copy: ["copy", "copy", coerceBool], scroll: ["scroll", "scroll", coerceBool], height: "height", highlighter: "highlighter" }, outputs: { fileLoaded: "fileLoaded" }, viewQueries: [{ propertyName: "projectedTpl", first: true, predicate: ["projected"], descendants: true, static: true }], ngImport: i0, template: `
    <ng-template #projected>
      <ng-content></ng-content>
    </ng-template>

    <div class="i-code-viewer" [class.wrap]="wrap" [class.compact]="compact">
      @if (loading) {
      <div class="i-code-viewer-loading">Loading…</div>
      } @if (error) {
      <div class="i-code-viewer-error">{{ error }}</div>
      }

      <div
        class="i-code-viewer-scroll"
        [class.scroll]="scrollEffective"
        [class.scroll-y]="scrollEffective"
        [class.has-overlay]="showOverlay"
        [style.height.px]="heightPx"
      >
        @if (showOverlay) {
        <div class="i-code-viewer-overlay hljs">
          @if (showFileType) {
          <span class="i-code-viewer-filetype">{{ fileTypeLabel }}</span>
          } @if (copy) {
          <i-button
            class="i-code-viewer-copy"
            size="xs"
            variant="outline"
            (click)="onCopy()"
            [disabled]="loading"
          >
            {{ copied ? 'Copied' : 'Copy' }}
          </i-button>
          }
        </div>
        }

        <!-- content row -->
        <div class="i-code-viewer-content hljs scroll scroll-y">
          @if (lineNumbers) {
          <div class="i-code-viewer-gutter" aria-hidden="true">
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ICodeViewer, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-code-viewer',
                    standalone: true,
                    imports: [CommonModule, IButton],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <ng-template #projected>
      <ng-content></ng-content>
    </ng-template>

    <div class="i-code-viewer" [class.wrap]="wrap" [class.compact]="compact">
      @if (loading) {
      <div class="i-code-viewer-loading">Loading…</div>
      } @if (error) {
      <div class="i-code-viewer-error">{{ error }}</div>
      }

      <div
        class="i-code-viewer-scroll"
        [class.scroll]="scrollEffective"
        [class.scroll-y]="scrollEffective"
        [class.has-overlay]="showOverlay"
        [style.height.px]="heightPx"
      >
        @if (showOverlay) {
        <div class="i-code-viewer-overlay hljs">
          @if (showFileType) {
          <span class="i-code-viewer-filetype">{{ fileTypeLabel }}</span>
          } @if (copy) {
          <i-button
            class="i-code-viewer-copy"
            size="xs"
            variant="outline"
            (click)="onCopy()"
            [disabled]="loading"
          >
            {{ copied ? 'Copied' : 'Copy' }}
          </i-button>
          }
        </div>
        }

        <!-- content row -->
        <div class="i-code-viewer-content hljs scroll scroll-y">
          @if (lineNumbers) {
          <div class="i-code-viewer-gutter" aria-hidden="true">
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
            }], fileLoaded: [{
                type: Output
            }] } });
class ICodeViewerModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ICodeViewerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.15", ngImport: i0, type: ICodeViewerModule, imports: [ICodeViewer], exports: [ICodeViewer] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ICodeViewerModule, imports: [ICodeViewer] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ICodeViewerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ICodeViewer],
                    exports: [ICodeViewer],
                }]
        }] });

class IInputAddon {
    addon;
    get addonKind() {
        return this.addon?.type + '';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IInputAddon, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.15", type: IInputAddon, isStandalone: true, selector: "i-input-addon", inputs: { addon: "addon" }, host: { properties: { "attr.kind": "this.addonKind" } }, ngImport: i0, template: `
    @if (!addon || addon.visible === false) {
      <!-- render nothing -->
    } @else if (addon.type === 'button') {
      <i-button
        type="button"
        size="xs"
        [icon]="addon.icon"
        [variant]="addon.variant ?? 'primary'"
        (onClick)="addon.onClick ? addon.onClick() : null">
      </i-button>
    } @else if (addon.type === 'link') {
      <a
        class="i-btn i-btn-xs"
        [href]="addon.href"
        [attr.variant]="addon.variant ?? 'primary'"
        target="_blank">
        <ic [icon]="addon.icon" size="xs" />
      </a>
    } @else if (addon.type === 'icon') {
      <ic [icon]="addon.icon" size="sm" />
    } @else if (addon.type === 'loading') {
      <i-loading label=""></i-loading>
    } @else {
      <!-- text -->
      <span>{{ addon.text }}</span>
    }
  `, isInline: true, dependencies: [{ kind: "component", type: IButton, selector: "i-button", inputs: ["disabled", "loading", "type", "loadingText", "variant", "size", "icon"], outputs: ["onClick"] }, { kind: "component", type: IIcon, selector: "ic", inputs: ["icon", "size"] }, { kind: "component", type: ILoading, selector: "i-loading", inputs: ["label", "light"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IInputAddon, decorators: [{
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
        type="button"
        size="xs"
        [icon]="addon.icon"
        [variant]="addon.variant ?? 'primary'"
        (onClick)="addon.onClick ? addon.onClick() : null">
      </i-button>
    } @else if (addon.type === 'link') {
      <a
        class="i-btn i-btn-xs"
        [href]="addon.href"
        [attr.variant]="addon.variant ?? 'primary'"
        target="_blank">
        <ic [icon]="addon.icon" size="xs" />
      </a>
    } @else if (addon.type === 'icon') {
      <ic [icon]="addon.icon" size="sm" />
    } @else if (addon.type === 'loading') {
      <i-loading label=""></i-loading>
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
 * Version: 1.4.1
 *
 * Reusable input mask directive for:
 * - date
 * - time
 * - integer
 * - number
 * - currency
 *
 * Usage:
 *   <input [iInputMask]="{ type: 'date', format: 'dd/MM/yyyy' }" />
 *   <input [iInputMask]="{ type: 'time', format: 'HH:mm' }" />
 */
class IInputMaskDirective {
    elRef;
    mask;
    /** Whether initial default (today / now) has been applied */
    _defaultApplied = false;
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
            this.applyInitialDefaultIfNeeded();
        }
    }
    // ----------------------------------------------------
    // Utils
    // ----------------------------------------------------
    get el() {
        return this.elRef.nativeElement;
    }
    get hasMask() {
        const el = this.el;
        return !!this.mask && !el.readOnly && !el.disabled;
    }
    dispatchInputEvent() {
        const ev = new Event('input', { bubbles: true });
        this.el.dispatchEvent(ev);
    }
    computeDefaultForMask() {
        if (!this.mask)
            return null;
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
        if (this._defaultApplied)
            return;
        const el = this.el;
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
            // Separator before the token
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
        // Trailing separator
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
            if (value.startsWith(s0)) {
                pos += s0.length;
            }
        }
        for (let i = 0; i < tokens.length; i++) {
            const tok = tokens[i];
            const ch = tok[0];
            const kind = ch === 'd' ? 'day' : ch === 'M' ? 'month' : 'year';
            const start = pos;
            let end = pos;
            while (end < value.length && /\d/.test(value[end])) {
                end++;
            }
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
                const s = String(day).padStart(len, '0');
                result += s;
            }
            else if (ch === 'M') {
                const s = String(month).padStart(len, '0');
                result += s;
            }
            else {
                let s = String(year);
                if (s.length < len) {
                    s = s.padStart(len, '0');
                }
                else if (s.length > len) {
                    s = s.slice(-len);
                }
                result += s;
            }
            if (i < tokens.length - 1) {
                result += seps[i + 1] ?? '';
            }
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
            if (seg.kind === 'day') {
                day = n;
            }
            else if (seg.kind === 'month') {
                month = n;
            }
            else {
                year = n;
            }
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
        // <= 2 digits: first segment only
        if (digits.length <= 2) {
            if (digits.length === 2 && firstSep) {
                return digits + firstSep; // "12" → "12/"
            }
            return digits;
        }
        // 3–4 digits: dd + (partial/full) MM
        if (digits.length <= 4) {
            const dRaw = digits.slice(0, 2);
            const mRaw = digits.slice(2); // 1–2 digits
            let res = dRaw;
            if (firstSep) {
                res += firstSep; // "12/"
            }
            if (mRaw.length) {
                res += mRaw; // "12/1" or "12/10"
                if (mRaw.length === 2 && secondSep) {
                    res += secondSep; // "12/10/"
                }
            }
            return res;
        }
        // 5+ digits: treat as full or nearly full ddMMyyyy; clamp and format
        const dStr = digits.slice(0, 2);
        const mStr = digits.slice(2, 4);
        const yStr = digits.slice(4, 8); // ignore extra digits if any
        let day = Number(dStr || '1');
        let month = Number(mStr || '1');
        let year = Number(yStr || '2000');
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
     * Smart date mask with:
     * - digits-only behavior (above)
     * - segment-based behavior once separators exist
     * - clamping for day/month
     */
    applyDateMask(raw, format) {
        if (!raw)
            return '';
        const hasSeparator = /[^0-9]/.test(raw);
        const { tokens, seps } = this.splitDateFormat(format);
        if (!tokens.length) {
            return raw.replace(/\D/g, '');
        }
        // ------------------------------
        // No separators yet → digits-only
        // ------------------------------
        if (!hasSeparator) {
            const digits = raw.replace(/\D/g, '');
            if (!digits)
                return '';
            return this.applyDateMaskDigitsOnly(digits, format);
        }
        // ------------------------------
        // With separators → segment-based
        // ------------------------------
        const rawSegs = raw.split(/[^0-9]/);
        const rawSeps = raw.match(/[^0-9]+/g) ?? [];
        const parts = [];
        for (let i = 0; i < tokens.length; i++) {
            const tok = tokens[i];
            const ch = tok[0]; // 'd' | 'M' | 'y'
            const len = tok.length;
            const rawSeg = (rawSegs[i] ?? '').replace(/\D/g, '');
            let kind;
            if (ch === 'd') {
                kind = 'day';
            }
            else if (ch === 'M') {
                kind = 'month';
            }
            else {
                kind = 'year';
            }
            // day behaves like month: closed only when fully typed
            const closed = rawSeg.length >= len;
            parts.push({
                kind,
                raw: rawSeg.slice(0, len),
                len,
                closed,
                out: '',
            });
        }
        const dayPart = parts.find((p) => p.kind === 'day');
        const monthPart = parts.find((p) => p.kind === 'month');
        const yearPart = parts.find((p) => p.kind === 'year');
        // month clamp
        let monthNumForClamp = null;
        if (monthPart && monthPart.closed && monthPart.raw) {
            let m = Number(monthPart.raw);
            if (m < 1)
                m = 1;
            if (m > 12)
                m = 12;
            monthNumForClamp = m;
        }
        // year used for day clamp (leap year)
        let yearForCalc = 2000;
        if (yearPart && yearPart.closed && yearPart.raw) {
            const y = Number(yearPart.raw);
            yearForCalc = y > 0 ? y : 2000;
        }
        // month output
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
        // day output — only clamp/pad when fully typed
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
        // year output (no clamp yet, normalized on blur)
        if (yearPart) {
            yearPart.out = yearPart.raw;
        }
        const outSegs = parts.map((p) => p.out);
        const hasDigits = parts.map((p) => p.raw.length > 0);
        let result = seps[0] ?? '';
        for (let i = 0; i < parts.length; i++) {
            const segOut = outSegs[i] ?? '';
            result += segOut;
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
        // drop trailing separator if nothing after it
        return result.replace(/[^0-9]+$/, (sep) => {
            const prefix = result.slice(0, -sep.length);
            return /\d/.test(prefix) ? sep : '';
        });
    }
    adjustDateSegmentByArrow(key) {
        if (!this.mask || this.mask.type !== 'date' || !this.mask.format) {
            return;
        }
        const el = this.el;
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
            if (seg.kind === 'day') {
                day = n;
            }
            else if (seg.kind === 'month') {
                month = n;
            }
            else {
                year = n;
            }
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
            if (key === 'ArrowUp') {
                year = year + 1;
            }
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
        if (newSeg) {
            el.setSelectionRange(newSeg.start, newSeg.end);
        }
    }
    // ----------------------------------------------------
    // TIME HELPERS
    // ----------------------------------------------------
    /** Split time format into tokens (HH, mm, ss) and separators. */
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
    /** Segments (hour, minute, second) with positions in current value. */
    getTimeSegments(value, format) {
        const { tokens, seps } = this.splitTimeFormat(format);
        const segments = [];
        let pos = 0;
        if (seps[0]) {
            const s0 = seps[0];
            if (value.startsWith(s0)) {
                pos += s0.length;
            }
        }
        for (let i = 0; i < tokens.length; i++) {
            const tok = tokens[i];
            const ch = tok[0];
            const kind = ch === 'H' ? 'hour' : ch === 'm' ? 'minute' : 'second';
            const start = pos;
            let end = pos;
            while (end < value.length && /\d/.test(value[end])) {
                end++;
            }
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
    /** Format hour/minute/second according to format tokens. */
    formatTimeFromParts(hour, minute, second, format) {
        const { tokens, seps } = this.splitTimeFormat(format);
        let result = seps[0] ?? '';
        for (let i = 0; i < tokens.length; i++) {
            const tok = tokens[i];
            const ch = tok[0];
            const len = tok.length;
            if (ch === 'H') {
                const s = String(hour).padStart(len, '0');
                result += s;
            }
            else if (ch === 'm') {
                const s = String(minute).padStart(len, '0');
                result += s;
            }
            else {
                const s = String(second).padStart(len, '0');
                result += s;
            }
            if (i < tokens.length - 1) {
                result += seps[i + 1] ?? '';
            }
        }
        return result;
    }
    /** Normalize full time string (used on blur / Enter). */
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
            if (seg.kind === 'hour') {
                hour = n;
            }
            else if (seg.kind === 'minute') {
                minute = n;
            }
            else {
                second = n;
            }
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
    /**
     * Digits-only behavior for time mask (no separators typed yet).
     *
     * For HH:mm:
     * - "12"     → "12:"
     * - "123"    → "12:3"
     * - "1234"   → "12:34"
     *
     * For HH:mm:ss:
     * - "12"       → "12:"
     * - "1234"     → "12:34:"
     * - "123456"   → "12:34:56"
     */
    applyTimeMaskDigitsOnly(digits, format) {
        const { tokens, seps } = this.splitTimeFormat(format);
        if (!tokens.length)
            return digits;
        const firstSep = seps[1] ?? '';
        const secondSep = seps[2] ?? '';
        const hasMinutes = tokens.length >= 2 && tokens[1][0] === 'm';
        const hasSeconds = tokens.length >= 3 && tokens[2][0] === 's';
        // -------- 2 tokens: HH:mm --------
        if (hasMinutes && !hasSeconds) {
            if (digits.length <= 2) {
                // "1" → "1"
                // "12" → "12:"
                if (digits.length === 2 && firstSep) {
                    return digits + firstSep;
                }
                return digits;
            }
            if (digits.length <= 4) {
                const hRaw = digits.slice(0, 2);
                const mRaw = digits.slice(2); // 1–2 digits
                let res = hRaw;
                if (firstSep)
                    res += firstSep; // "12:"
                if (mRaw.length) {
                    res += mRaw; // "12:3" or "12:34"
                }
                return res;
            }
            // 5+ digits → treat as full HHmm, clamp and format
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
        // -------- 3 tokens: HH:mm:ss --------
        if (hasMinutes && hasSeconds) {
            if (digits.length <= 2) {
                if (digits.length === 2 && firstSep) {
                    return digits + firstSep; // "12:"
                }
                return digits;
            }
            if (digits.length <= 4) {
                const hRaw = digits.slice(0, 2);
                const mRaw = digits.slice(2); // 1–2 digits
                let res = hRaw;
                if (firstSep)
                    res += firstSep; // "12:"
                if (mRaw.length) {
                    res += mRaw; // "12:3" or "12:34"
                    if (mRaw.length === 2 && secondSep) {
                        res += secondSep; // "12:34:"
                    }
                }
                return res;
            }
            if (digits.length <= 6) {
                const hRaw = digits.slice(0, 2);
                const mRaw = digits.slice(2, 4);
                const sRaw = digits.slice(4); // 1–2 digits
                let res = hRaw;
                if (firstSep)
                    res += firstSep;
                res += mRaw;
                if (secondSep)
                    res += secondSep;
                res += sRaw;
                return res;
            }
            // 7+ digits → treat as full HHmmss, clamp and format
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
        // Fallback: just digits
        return digits;
    }
    /**
     * Smart time mask similar to date:
     * - digits-only path
     * - segment-based path with clamping (only when segment fully typed)
     */
    applyTimeMask(raw, format) {
        if (!raw)
            return '';
        const hasSeparator = /[^0-9]/.test(raw);
        const { tokens, seps } = this.splitTimeFormat(format);
        if (!tokens.length) {
            return raw.replace(/\D/g, '');
        }
        // No separators yet → digits-only behavior
        if (!hasSeparator) {
            const digits = raw.replace(/\D/g, '');
            if (!digits)
                return '';
            return this.applyTimeMaskDigitsOnly(digits, format);
        }
        // With separators → segment-based
        const rawSegs = raw.split(/[^0-9]/);
        const rawSeps = raw.match(/[^0-9]+/g) ?? [];
        const parts = [];
        for (let i = 0; i < tokens.length; i++) {
            const tok = tokens[i];
            const ch = tok[0]; // 'H' | 'm' | 's'
            const len = tok.length;
            const rawSeg = (rawSegs[i] ?? '').replace(/\D/g, '');
            let kind;
            if (ch === 'H') {
                kind = 'hour';
            }
            else if (ch === 'm') {
                kind = 'minute';
            }
            else {
                kind = 'second';
            }
            // "closed" only when segment is fully typed (same as date)
            const closed = rawSeg.length >= len;
            parts.push({
                kind,
                raw: rawSeg.slice(0, len),
                len,
                closed,
                out: '',
            });
        }
        const hourPart = parts.find((p) => p.kind === 'hour');
        const minutePart = parts.find((p) => p.kind === 'minute');
        const secondPart = parts.find((p) => p.kind === 'second');
        let hour = 0;
        let minute = 0;
        let second = 0;
        if (hourPart && hourPart.raw) {
            hour = Number(hourPart.raw);
        }
        if (minutePart && minutePart.raw) {
            minute = Number(minutePart.raw);
        }
        if (secondPart && secondPart.raw) {
            second = Number(secondPart.raw);
        }
        // Clamp only when segment is closed
        if (hourPart) {
            if (hourPart.closed && hourPart.raw) {
                if (hour < 0)
                    hour = 0;
                if (hour > 23)
                    hour = 23;
                hourPart.out = String(hour).padStart(hourPart.len, '0');
            }
            else {
                hourPart.out = hourPart.raw;
            }
        }
        if (minutePart) {
            if (minutePart.closed && minutePart.raw) {
                if (minute < 0)
                    minute = 0;
                if (minute > 59)
                    minute = 59;
                minutePart.out = String(minute).padStart(minutePart.len, '0');
            }
            else {
                minutePart.out = minutePart.raw;
            }
        }
        if (secondPart) {
            if (secondPart.closed && secondPart.raw) {
                if (second < 0)
                    second = 0;
                if (second > 59)
                    second = 59;
                secondPart.out = String(second).padStart(secondPart.len, '0');
            }
            else {
                secondPart.out = secondPart.raw;
            }
        }
        const outSegs = parts.map((p) => p.out);
        const hasDigits = parts.map((p) => p.raw.length > 0);
        let result = seps[0] ?? '';
        for (let i = 0; i < parts.length; i++) {
            const segOut = outSegs[i] ?? '';
            result += segOut;
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
        // drop trailing separator if nothing after it
        return result.replace(/[^0-9]+$/, (sep) => {
            const prefix = result.slice(0, -sep.length);
            return /\d/.test(prefix) ? sep : '';
        });
    }
    adjustTimeSegmentByArrow(key) {
        if (!this.mask || this.mask.type !== 'time' || !this.mask.format) {
            return;
        }
        const el = this.el;
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
            if (seg.kind === 'hour') {
                hour = n;
            }
            else if (seg.kind === 'minute') {
                minute = n;
            }
            else {
                second = n;
            }
        }
        const seg = segments[idx];
        if (seg.kind === 'hour') {
            if (key === 'ArrowUp') {
                hour = hour + 1;
                if (hour > 23)
                    hour = 0;
            }
            else {
                hour = hour - 1;
                if (hour < 0)
                    hour = 23;
            }
        }
        else if (seg.kind === 'minute') {
            if (key === 'ArrowUp') {
                minute = minute + 1;
                if (minute > 59)
                    minute = 0;
            }
            else {
                minute = minute - 1;
                if (minute < 0)
                    minute = 59;
            }
        }
        else {
            if (key === 'ArrowUp') {
                second = second + 1;
                if (second > 59)
                    second = 0;
            }
            else {
                second = second - 1;
                if (second < 0)
                    second = 59;
            }
        }
        const newValue = this.formatTimeFromParts(hour, minute, second, format);
        el.value = newValue;
        this.dispatchInputEvent();
        const newSegments = this.getTimeSegments(newValue, format);
        const newSeg = newSegments[idx] ?? newSegments[newSegments.length - 1];
        if (newSeg) {
            el.setSelectionRange(newSeg.start, newSeg.end);
        }
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
                continue;
            }
        }
        return result;
    }
    // ----------------------------------------------------
    // HOST LISTENERS
    // ----------------------------------------------------
    onInput(event) {
        if (!this.hasMask || !this.mask)
            return;
        const el = this.el;
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
            el.setSelectionRange(newPos, newPos);
        }
    }
    onBlur() {
        if (!this.mask)
            return;
        const el = this.el;
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
        if (!this._defaultApplied && this.el.value.trim() === '') {
            this.applyInitialDefaultIfNeeded();
        }
    }
    onKeydown(event) {
        if (!this.mask || this.el.readOnly || this.el.disabled)
            return;
        const type = this.mask.type;
        const key = event.key;
        // Date ↑/↓ segment adjust
        if (type === 'date' &&
            this.mask.format &&
            (key === 'ArrowUp' || key === 'ArrowDown')) {
            event.preventDefault();
            this.adjustDateSegmentByArrow(key);
            return;
        }
        // Time ↑/↓ segment adjust
        if (type === 'time' &&
            this.mask.format &&
            (key === 'ArrowUp' || key === 'ArrowDown')) {
            event.preventDefault();
            this.adjustTimeSegmentByArrow(key);
            return;
        }
        // Date normalize on Enter
        if (type === 'date' && this.mask.format && key === 'Enter') {
            event.preventDefault();
            const el = this.el;
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
            const el = this.el;
            if (el.value) {
                const normalized = this.normalizeTimeValue(el.value, this.mask.format);
                if (normalized !== el.value) {
                    el.value = normalized;
                    this.dispatchInputEvent();
                }
            }
            return;
        }
        if (this.isControlKey(event)) {
            return;
        }
        // Date/time: allow digits + separators
        if (type === 'date' || type === 'time') {
            const format = this.mask.format || '';
            const allowedSeps = new Set();
            for (const c of format) {
                if (!/[dMyHms]/.test(c)) {
                    allowedSeps.add(c);
                }
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
            if (!/\d/.test(key)) {
                event.preventDefault();
            }
            return;
        }
        // Number/currency
        if (type === 'number' || type === 'currency') {
            if (/\d/.test(key))
                return;
            if (key === '.' || key === ',') {
                const v = this.el.value;
                if (v.includes('.') || v.includes(',')) {
                    event.preventDefault();
                }
                return;
            }
            event.preventDefault();
            return;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IInputMaskDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.15", type: IInputMaskDirective, isStandalone: true, selector: "[iInputMask]", inputs: { mask: ["iInputMask", "mask"] }, host: { listeners: { "input": "onInput($event)", "blur": "onBlur()", "focus": "onFocus()", "keydown": "onKeydown($event)" } }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IInputMaskDirective, decorators: [{
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
class IInput {
    type = 'text';
    placeholder = '';
    autocomplete;
    readonly = false;
    /** invalid state (controlled by form or wrapper) */
    invalid = false;
    /** Optional mask passed through to inner input's directive */
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
    onChange = () => { };
    onTouched = () => { };
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
        this._value = target.value ?? '';
        this.onChange(this._value);
    }
    handleBlur() {
        this.onTouched();
    }
    /** Click anywhere on <i-input> focuses the inner input,
     *  EXCEPT when clicking on an addon (button/link/etc).
     */
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IInput, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.15", type: IInput, isStandalone: true, selector: "i-input", inputs: { type: "type", placeholder: "placeholder", autocomplete: "autocomplete", readonly: "readonly", invalid: "invalid", mask: "mask", value: "value", prepend: "prepend", append: "append", disabled: "disabled" }, host: { listeners: { "click": "handleHostClick($event)" } }, providers: [
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
      [type]="type"
      [placeholder]="placeholder"
      [attr.autocomplete]="autocomplete || null"
      [readonly]="readonly"
      [disabled]="isDisabled"
      [value]="value ?? ''"
      [attr.aria-invalid]="invalid ? 'true' : null"
      [iInputMask]="mask"
      (input)="handleInput($event)"
      (blur)="handleBlur()"
    />
    @for (i of appends; track $index) {
    <i-input-addon [addon]="i" />
    } `, isInline: true, dependencies: [{ kind: "component", type: IInputAddon, selector: "i-input-addon", inputs: ["addon"] }, { kind: "directive", type: IInputMaskDirective, selector: "[iInputMask]", inputs: ["iInputMask"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IInput, decorators: [{
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
      [type]="type"
      [placeholder]="placeholder"
      [attr.autocomplete]="autocomplete || null"
      [readonly]="readonly"
      [disabled]="isDisabled"
      [value]="value ?? ''"
      [attr.aria-invalid]="invalid ? 'true' : null"
      [iInputMask]="mask"
      (input)="handleInput($event)"
      (blur)="handleBlur()"
    />
    @for (i of appends; track $index) {
    <i-input-addon [addon]="i" />
    } `,
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
class IFCInput {
    ngControl;
    formDir;
    cdr;
    innerInput;
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
    }
    // ---------- internal state ----------
    _value = null;
    isDisabled = false;
    onChange = () => { };
    onTouched = () => { };
    constructor(ngControl, formDir, cdr) {
        this.ngControl = ngControl;
        this.formDir = formDir;
        this.cdr = cdr;
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
        // 🔁 when the form is submitted, re-check this OnPush component
        if (this.formDir) {
            this.formDir.ngSubmit.subscribe(() => {
                this.cdr.markForCheck();
            });
        }
    }
    // ---------- CVA ----------
    writeValue(v) {
        this._value = v ?? '';
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
    // ---------- bridge from inner <i-input> ----------
    handleInnerInput(event) {
        const target = event.target;
        const v = target?.value ?? '';
        this._value = v;
        this.onChange(this._value);
    }
    handleInnerBlur() {
        this.onTouched();
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
        // 🧠 mimic old IInput.isInvalid: invalid && form submitted
        if (this.formDir) {
            return c.invalid && !!this.formDir.submitted;
        }
        // fallback when not inside a FormGroupDirective
        return c.invalid && (c.dirty || c.touched);
    }
    get required() {
        return isControlRequired(this.ngControl, this.errorMessage);
    }
    get resolvedErrorText() {
        return resolveControlErrorMessage(this.ngControl, this.label, this.errorMessage);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IFCInput, deps: [{ token: i1.NgControl, optional: true, self: true }, { token: i1.FormGroupDirective, optional: true }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.15", type: IFCInput, isStandalone: true, selector: "i-fc-input", inputs: { label: "label", placeholder: "placeholder", autocomplete: "autocomplete", readonly: "readonly", type: "type", mask: "mask", prepend: "prepend", append: "append", errorMessage: "errorMessage", value: "value" }, viewQueries: [{ propertyName: "innerInput", first: true, predicate: IInput, descendants: true }], ngImport: i0, template: `@if (label) {
    <label class="i-fc-input__label" (click)="focusInnerInput()">
      {{ label }} : @if (required) {
      <span class="i-fc-input__required">*</span>
      }
    </label>
    }

    <i-input
      [type]="type"
      [placeholder]="placeholder"
      [autocomplete]="autocomplete"
      [readonly]="readonly"
      [mask]="mask"
      [prepend]="prepend"
      [append]="append"
      [value]="value"
      [invalid]="controlInvalid"
      [disabled]="isDisabled"
      (input)="handleInnerInput($event)"
      (blur)="handleInnerBlur()"
    >
    </i-input>

    @if (controlInvalid && resolvedErrorText) {
    <div class="i-fc-input__error">
      {{ resolvedErrorText }}
    </div>
    }`, isInline: true, dependencies: [{ kind: "component", type: IInput, selector: "i-input", inputs: ["type", "placeholder", "autocomplete", "readonly", "invalid", "mask", "value", "prepend", "append", "disabled"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IFCInput, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-fc-input',
                    standalone: true,
                    imports: [IInput],
                    template: `@if (label) {
    <label class="i-fc-input__label" (click)="focusInnerInput()">
      {{ label }} : @if (required) {
      <span class="i-fc-input__required">*</span>
      }
    </label>
    }

    <i-input
      [type]="type"
      [placeholder]="placeholder"
      [autocomplete]="autocomplete"
      [readonly]="readonly"
      [mask]="mask"
      [prepend]="prepend"
      [append]="append"
      [value]="value"
      [invalid]="controlInvalid"
      [disabled]="isDisabled"
      (input)="handleInnerInput($event)"
      (blur)="handleInnerBlur()"
    >
    </i-input>

    @if (controlInvalid && resolvedErrorText) {
    <div class="i-fc-input__error">
      {{ resolvedErrorText }}
    </div>
    }`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: () => [{ type: i1.NgControl, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }, { type: i1.FormGroupDirective, decorators: [{
                    type: Optional
                }] }, { type: i0.ChangeDetectorRef }], propDecorators: { innerInput: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IInputModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.15", ngImport: i0, type: IInputModule, imports: [IInput, IFCInput, IInputAddon, IInputMaskDirective], exports: [IInput, IFCInput, IInputAddon, IInputMaskDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IInputModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IInputModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [IInput, IFCInput, IInputAddon, IInputMaskDirective],
                    exports: [IInput, IFCInput, IInputAddon, IInputMaskDirective],
                }]
        }] });

class IHighlightSearchPipe {
    transform(value, search) {
        if (!value || !search)
            return value;
        // Escape regex special chars: . * + ? ^ $ { } ( ) | [ ] \
        const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escaped, 'gi');
        return value.replace(regex, (match) => {
            return `<span class="highlight-search">${match}</span>`;
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IHighlightSearchPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "20.3.15", ngImport: i0, type: IHighlightSearchPipe, isStandalone: true, name: "highlightSearch" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IHighlightSearchPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'highlightSearch',
                    standalone: true,
                }]
        }] });

/**
 * ISelect
 * Version: 2.1.0
 */
class ISelectOptionDefDirective {
    template;
    constructor(template) {
        this.template = template;
    }
    set iSelectOption(_value) {
        // not used, needed for structural directive syntax
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ISelectOptionDefDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.15", type: ISelectOptionDefDirective, isStandalone: true, selector: "[iSelectOption]", inputs: { iSelectOption: "iSelectOption" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ISelectOptionDefDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[iSelectOption]',
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: i0.TemplateRef }], propDecorators: { iSelectOption: [{
                type: Input,
                args: ['iSelectOption']
            }] } });
class ISelect {
    hostEl;
    cdr;
    zone;
    // ---------- Inputs ----------
    placeholder = '';
    disabled = false;
    invalid = false;
    /** debounce delay (ms) for filter when typing */
    filterDelay = 200;
    /**
     * Dropdown / popup position relative to the input.
     *
     * Single:
     *  - 'bottom'
     *  - 'top'
     *  - 'left'
     *  - 'right'
     *
     * Compound:
     *  - 'top left'
     *  - 'top right'
     *  - 'bottom left' (default)
     *  - 'bottom right'
     */
    panelPosition = 'bottom left';
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
    _displayWith = (row) => row == null ? '' : String(row);
    _displayWithExplicit = false;
    set displayWith(value) {
        if (value === undefined || value === null) {
            // treat as: "no explicit displayWith"
            this._displayWithExplicit = false;
            // keep or reset to default
            this._displayWith = (row) => (row == null ? '' : String(row));
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
    set valueInput(val) {
        this.writeValue(val);
    }
    // ---------- Outputs ----------
    onChanged = new EventEmitter();
    onOptionSelected = new EventEmitter();
    // ---------- Template refs ----------
    optionDef;
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
    /** Panel position class for CSS modifier */
    get panelPositionClass() {
        const value = (this.panelPosition || 'bottom left').trim();
        const normalized = value.replace(/\s+/g, '-'); // "top left" -> "top-left"
        return `i-options--${normalized}`;
    }
    constructor(hostEl, cdr, zone) {
        this.hostEl = hostEl;
        this.cdr = cdr;
        this.zone = zone;
    }
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
    ngOnDestroy() {
        this.cleanupOptionsSub();
        this.filterInputSub?.unsubscribe();
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
        let valueToUse = this._modelValue !== null && this._modelValue !== undefined
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
        if (!this.isOpen && !force) {
            return;
        }
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
    get hasSelection() {
        return this._modelValue != null;
    }
    /** true when user filtered and no options match */
    get hasNoResults() {
        return this.isOpen && !!this._filterText && this.filteredOptions.length === 0;
    }
    /**
     * Resolve the label text for a given row or value.
     *
     * Priority:
     * 1) If user provided displayWith (function or string), use it.
     * 2) Else, if row is object → use 2nd property as label (or 1st if only one).
     * 3) Else, if row is primitive and options[] contains objects:
     *      - match options[*].<firstProp> === row
     *      - use matched option's 2nd prop as label (or 1st if only one)
     * 4) Else, fallback to default function String(row).
     */
    resolveDisplayText(row) {
        if (row == null)
            return '';
        const dw = this.displayWith;
        // CASE 1: user-provided function (explicit)
        if (typeof dw === 'function' && this._displayWithExplicit) {
            return dw(row);
        }
        // CASE 2: user-provided string key (supports nested "a.b.c")
        if (typeof dw === 'string') {
            const path = dw.split('.');
            let value = row;
            for (const segment of path) {
                if (value == null)
                    return '';
                value = value[segment];
            }
            return value != null ? String(value) : '';
        }
        // CASE 3A: AUTO-MAPPING when row itself is an object
        if (!this._displayWithExplicit && row !== null && typeof row === 'object') {
            const entries = Object.entries(row);
            if (!entries.length)
                return '';
            // Prefer 2nd property as label, fallback to 1st
            const labelEntry = entries[1] ?? entries[0];
            const labelValue = labelEntry[1];
            return labelValue != null ? String(labelValue) : '';
        }
        // CASE 3B: AUTO-MAPPING when row is a primitive "value" (e.g. ID)
        // We try to find a matching option object in _rawOptions, where:
        //   option[firstProp] === row
        if (!this._displayWithExplicit && (row === null || typeof row !== 'object')) {
            const primitive = row;
            const match = this._rawOptions.find((opt) => {
                if (opt == null || typeof opt !== 'object')
                    return false;
                const entries = Object.entries(opt);
                if (!entries.length)
                    return false;
                const valueEntry = entries[0]; // first property = "value"
                return valueEntry[1] === primitive;
            });
            if (match) {
                const entries = Object.entries(match);
                if (!entries.length)
                    return String(primitive);
                // label = 2nd property if exists, else 1st
                const labelEntry = entries[1] ?? entries[0];
                const labelValue = labelEntry[1];
                return labelValue != null ? String(labelValue) : String(primitive);
            }
        }
        // CASE 4: fallback to default function String(row)
        if (typeof dw === 'function') {
            return dw(row);
        }
        return '';
    }
    // ---------- Input + dropdown behavior ----------
    handleInputText(val) {
        this._displayText = val;
        this._filterText = val;
        if (!this.isOpen) {
            this.openDropdown();
        }
        else {
            this.applyFilter(true);
        }
    }
    handleBlur() {
        this.onTouched();
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
    /** behavior:
     *  - if closed → open
     *  - if open and hasNoResults → clear filter & show all (keep open)
     *  - if open and NOT hasNoResults → close & restore model text
     */
    toggleDropdown(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (this.disabled)
            return;
        if (!this.isOpen) {
            // closed → open
            this.openDropdown();
        }
        else if (this.hasNoResults) {
            // open + no results → clear filter & show all, keep open
            this._displayText = '';
            this._filterText = '';
            this.applyFilter(true);
            // keep dropdown open
        }
        else {
            // open + has results → close and restore selected text
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
        const len = this.filteredOptions.length;
        if (len === 0) {
            this.highlightIndex = -1;
            return;
        }
        const current = this._modelValue;
        if (current != null) {
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
    clearSelection(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        this._modelValue = null;
        this._displayText = '';
        this._filterText = '';
        this.applyFilter(true);
        this.onChange(null);
        this.onTouched();
        const payload = {
            value: null,
            label: '',
        };
        this.onChanged.emit(payload);
        this.onOptionSelected.emit(payload);
    }
    isRowSelected(row) {
        return this._modelValue === row;
    }
    scrollHighlightedIntoView() {
        // Defer until after Angular has rendered the options
        setTimeout(() => {
            if (!this.isOpen)
                return;
            const list = this.hostEl.nativeElement.querySelector('.i-options');
            if (!list)
                return;
            const items = list.querySelectorAll('.i-option');
            const el = items[this.highlightIndex];
            if (el) {
                el.scrollIntoView({ block: 'nearest' });
            }
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
                    const row = options[this.highlightIndex];
                    this.selectRow(row);
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
    onHostFocusOut(_event) {
        this.onTouched();
    }
    onDocumentClick(event) {
        if (!this.isOpen)
            return;
        const target = event.target;
        if (target && !this.hostEl.nativeElement.contains(target)) {
            this.closeDropdown();
        }
    }
    // ---------- Utilities ----------
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ISelect, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.15", type: ISelect, isStandalone: true, selector: "i-select", inputs: { placeholder: "placeholder", disabled: "disabled", invalid: "invalid", filterDelay: "filterDelay", panelPosition: "panelPosition", options: "options", options$: "options$", displayWith: "displayWith", filterPredicate: "filterPredicate", valueInput: ["value", "valueInput"] }, outputs: { onChanged: "onChanged", onOptionSelected: "onOptionSelected" }, host: { listeners: { "keydown": "handleKeydown($event)", "input": "onHostInput($event)", "focusout": "onHostFocusOut($event)", "document:click": "onDocumentClick($event)" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => ISelect),
                multi: true,
            },
        ], queries: [{ propertyName: "optionDef", first: true, predicate: ISelectOptionDefDirective, descendants: true }], ngImport: i0, template: `<i-input
      [placeholder]="placeholder"
      [value]="displayText"
      [invalid]="invalid || hasNoResults"
      [readonly]="disabled"
      [append]="appendAddon"
    >
    </i-input>

    @if (hasOptionsList) {
    <div class="i-options scroll scroll-y" [ngClass]="panelPositionClass">
      @for (row of filteredOptions; track row; let idx = $index) {
      <div
        class="i-option"
        [class.active]="highlightIndex === idx"
        [class.selected]="isRowSelected(row)"
        (mouseenter)="setActiveIndex(idx)"
        (mousedown)="selectRow(row)"
      >
        @if (optionDef?.template) {
        <div class="i-option-label">
          <ng-container
            *ngTemplateOutlet="optionDef!.template; context: { $implicit: row, row: row }"
          >
          </ng-container>
        </div>
        } @else {
        <div
          class="i-option-label"
          [innerHTML]="resolveDisplayText(row) | highlightSearch : filterText"
        ></div>
        } @if (isRowSelected(row)) {
        <span class="i-option-check">
          <ic icon="check" />
        </span>
        }
      </div>
      }
    </div>
    } `, isInline: true, dependencies: [{ kind: "component", type: IIcon, selector: "ic", inputs: ["icon", "size"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: IInput, selector: "i-input", inputs: ["type", "placeholder", "autocomplete", "readonly", "invalid", "mask", "value", "prepend", "append", "disabled"] }, { kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "pipe", type: IHighlightSearchPipe, name: "highlightSearch" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ISelect, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-select',
                    standalone: true,
                    imports: [IIcon, NgTemplateOutlet, IHighlightSearchPipe, IInput, NgClass],
                    // templateUrl: './select.html',
                    template: `<i-input
      [placeholder]="placeholder"
      [value]="displayText"
      [invalid]="invalid || hasNoResults"
      [readonly]="disabled"
      [append]="appendAddon"
    >
    </i-input>

    @if (hasOptionsList) {
    <div class="i-options scroll scroll-y" [ngClass]="panelPositionClass">
      @for (row of filteredOptions; track row; let idx = $index) {
      <div
        class="i-option"
        [class.active]="highlightIndex === idx"
        [class.selected]="isRowSelected(row)"
        (mouseenter)="setActiveIndex(idx)"
        (mousedown)="selectRow(row)"
      >
        @if (optionDef?.template) {
        <div class="i-option-label">
          <ng-container
            *ngTemplateOutlet="optionDef!.template; context: { $implicit: row, row: row }"
          >
          </ng-container>
        </div>
        } @else {
        <div
          class="i-option-label"
          [innerHTML]="resolveDisplayText(row) | highlightSearch : filterText"
        ></div>
        } @if (isRowSelected(row)) {
        <span class="i-option-check">
          <ic icon="check" />
        </span>
        }
      </div>
      }
    </div>
    } `,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => ISelect),
                            multi: true,
                        },
                    ],
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }], propDecorators: { placeholder: [{
                type: Input
            }], disabled: [{
                type: Input
            }], invalid: [{
                type: Input
            }], filterDelay: [{
                type: Input
            }], panelPosition: [{
                type: Input
            }], options: [{
                type: Input
            }], options$: [{
                type: Input
            }], displayWith: [{
                type: Input
            }], filterPredicate: [{
                type: Input
            }], valueInput: [{
                type: Input,
                args: ['value']
            }], onChanged: [{
                type: Output
            }], onOptionSelected: [{
                type: Output
            }], optionDef: [{
                type: ContentChild,
                args: [ISelectOptionDefDirective]
            }], handleKeydown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }], onHostInput: [{
                type: HostListener,
                args: ['input', ['$event']]
            }], onHostFocusOut: [{
                type: HostListener,
                args: ['focusout', ['$event']]
            }], onDocumentClick: [{
                type: HostListener,
                args: ['document:click', ['$event']]
            }] } });
/**
 * IFcSelect
 * Version: 1.1.0
 *
 * - Form control wrapper for ISelect
 * - Provides label, required asterisk, error message
 * - Implements CVA so you can use formControlName on <i-fc-select>
 */
class IFCSelect {
    ngControl;
    formDir;
    cdr;
    innerSelect;
    label = '';
    placeholder = '';
    options = null;
    options$ = null;
    // 👇 no default, undefined means “not explicit”
    displayWith;
    filterDelay = 200;
    filterPredicate = (row, term) => {
        const haystack = JSON.stringify(row).toLowerCase();
        return haystack.includes(term);
    };
    /** Passed through to ISelect's [panelPosition] input */
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
    constructor(ngControl, formDir, cdr) {
        this.ngControl = ngControl;
        this.formDir = formDir;
        this.cdr = cdr;
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
        if (this.formDir) {
            this.formDir.ngSubmit.subscribe(() => {
                this.cdr.markForCheck();
            });
        }
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IFCSelect, deps: [{ token: i1.NgControl, optional: true, self: true }, { token: i1.FormGroupDirective, optional: true }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.15", type: IFCSelect, isStandalone: true, selector: "i-fc-select", inputs: { label: "label", placeholder: "placeholder", options: "options", options$: "options$", displayWith: "displayWith", filterDelay: "filterDelay", filterPredicate: "filterPredicate", panelPosition: "panelPosition", errorMessage: "errorMessage", value: "value" }, viewQueries: [{ propertyName: "innerSelect", first: true, predicate: ISelect, descendants: true }], ngImport: i0, template: `@if (label) {
    <label class="i-fc-select__label" (click)="focusInnerSelect()">
      {{ label }} : @if (required) {
      <span class="i-fc-select__required">*</span>
      }
    </label>
    }

    <i-select
      [placeholder]="placeholder"
      [disabled]="isDisabled"
      [invalid]="controlInvalid"
      [options]="options"
      [options$]="options$"
      [displayWith]="displayWith"
      [filterDelay]="filterDelay"
      [filterPredicate]="filterPredicate"
      [panelPosition]="panelPosition"
      [value]="value"
      (onChanged)="handleSelectChange($event)"
    >
      <ng-content></ng-content>
    </i-select>

    @if (controlInvalid && resolvedErrorText) {
    <div class="i-fc-select__error">
      {{ resolvedErrorText }}
    </div>
    }`, isInline: true, dependencies: [{ kind: "component", type: ISelect, selector: "i-select", inputs: ["placeholder", "disabled", "invalid", "filterDelay", "panelPosition", "options", "options$", "displayWith", "filterPredicate", "value"], outputs: ["onChanged", "onOptionSelected"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IFCSelect, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-fc-select',
                    standalone: true,
                    imports: [ISelect],
                    template: `@if (label) {
    <label class="i-fc-select__label" (click)="focusInnerSelect()">
      {{ label }} : @if (required) {
      <span class="i-fc-select__required">*</span>
      }
    </label>
    }

    <i-select
      [placeholder]="placeholder"
      [disabled]="isDisabled"
      [invalid]="controlInvalid"
      [options]="options"
      [options$]="options$"
      [displayWith]="displayWith"
      [filterDelay]="filterDelay"
      [filterPredicate]="filterPredicate"
      [panelPosition]="panelPosition"
      [value]="value"
      (onChanged)="handleSelectChange($event)"
    >
      <ng-content></ng-content>
    </i-select>

    @if (controlInvalid && resolvedErrorText) {
    <div class="i-fc-select__error">
      {{ resolvedErrorText }}
    </div>
    }`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: () => [{ type: i1.NgControl, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }, { type: i1.FormGroupDirective, decorators: [{
                    type: Optional
                }] }, { type: i0.ChangeDetectorRef }], propDecorators: { innerSelect: [{
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
 * Version: 1.4.1
 *
 * - Wraps <i-input>
 * - ControlValueAccessor: value is Date | null
 * - Uses IInputMaskDirective for date typing / normalization
 * - Shows calendar popup, select day to set value
 * - Month & year selection via i-select
 */
class IDatepicker {
    hostEl;
    // ------------- Inputs -------------
    placeholder = '';
    disabled = false;
    /** visual invalid state (from i-fc-datepicker or manual) */
    invalid = false;
    /**
     * Display / parse format.
     * Supported tokens: yyyy, MM, dd
     */
    format = 'dd/MM/yyyy';
    /**
     * Dropdown / popup position relative to the input.
     *
     * Single:
     *  - 'bottom' (default)
     *  - 'top'
     *  - 'left'
     *  - 'right'
     *
     * Compound:
     *  - 'top left'
     *  - 'top right'
     *  - 'bottom left'
     *  - 'bottom right'
     */
    panelPosition = 'bottom left';
    /**
     * Allow [value]="..." when not using reactive forms.
     * Accepts Date or string, normalizes via writeValue.
     */
    set valueInput(v) {
        this.writeValue(v);
    }
    onChanged = new EventEmitter();
    // ------------- CVA state -------------
    /** Internal model value (Date | null) */
    _modelValue = null;
    /** Displayed text in the input */
    _displayText = '';
    get displayText() {
        return this._displayText;
    }
    onChange = () => { };
    onTouched = () => { };
    // ------------- Datepicker state -------------
    /** Is popup open */
    isOpen = false;
    /** Calendar view year/month (0-11) */
    viewYear = 0;
    viewMonth = 0;
    /** Calendar weeks (6 rows x 7 cols) */
    weeks = [];
    /** Month options for <i-select> */
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
    /** Static weekday labels (Mon–Sun) */
    weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    /** Year options for the year <i-select> */
    _years = [];
    get years() {
        return this._years;
    }
    /** Currently selected month option object for i-select */
    get monthSelected() {
        return this.months.find((m) => m.value === this.viewMonth) ?? null;
    }
    /** Panel position class for CSS modifier */
    get panelPositionClass() {
        const value = (this.panelPosition || 'bottom left').trim();
        const normalized = value.replace(/\s+/g, '-'); // "top left" -> "top-left"
        return `i-datepicker-panel--${normalized}`;
    }
    constructor(hostEl) {
        this.hostEl = hostEl;
    }
    // ------------- Helpers -------------
    /** Always read the REAL inner <input> value, ignore event.target type */
    getInnerInput() {
        return this.hostEl.nativeElement.querySelector('i-input input');
    }
    focusInput() {
        const input = this.getInnerInput();
        if (input) {
            input.focus();
        }
    }
    // ------------- Lifecycle -------------
    ngOnInit() {
        // If nothing is set from outside, default to today visually
        if (!this._modelValue && !this._displayText) {
            const today = this.startOfDay(new Date());
            this._modelValue = today;
            this._displayText = this.formatDate(today);
            this.updateView(today);
        }
    }
    // ------------- CVA implementation -------------
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
        if (date) {
            this._displayText = this.formatDate(date);
        }
        const baseDate = this._modelValue ??
            this.parseInputDate(this._displayText) ??
            this.startOfDay(new Date());
        this.updateView(baseDate);
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
    // ------------- Append addon (fixed calendar button) -------------
    get appendAddon() {
        return {
            type: 'button',
            icon: 'calendar',
            visible: true,
            variant: 'primary',
            onClick: () => {
                this.toggleOpen();
                this.focusInput(); // keep behavior same as i-select
            },
        };
    }
    // ------------- Input & typing -------------
    /**
     * Called when user types in the inner input.
     * Formatting / clamping is handled by IInputMaskDirective.
     */
    handleInput(raw) {
        this._displayText = raw;
        const parsed = this.parseInputDate(raw);
        this._modelValue = parsed;
        if (parsed) {
            this.updateView(parsed);
        }
        this.onChange(parsed);
        this.onChanged.emit(parsed);
    }
    handleBlur() {
        this.onTouched();
    }
    // ------------- Datepicker UI actions -------------
    toggleOpen() {
        if (this.disabled)
            return;
        if (!this.isOpen) {
            // when opening, sync calendar from current input text if any
            const input = this.getInnerInput();
            if (input && input.value) {
                const parsed = this.parseInputDate(input.value);
                if (parsed) {
                    this._modelValue = parsed;
                    this._displayText = this.formatDate(parsed);
                }
            }
            this.initViewFromModel();
        }
        this.isOpen = !this.isOpen;
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
    }
    /** Month changed from <i-select> */
    onMonthChange(change) {
        const row = change?.value;
        if (!row)
            return;
        const month = typeof row === 'object' && 'value' in row
            ? row.value
            : row;
        if (typeof month !== 'number')
            return;
        if (month < 0 || month > 11)
            return;
        this.viewMonth = month;
        this.buildCalendar();
    }
    /** Year changed from <i-select> */
    onYearChange(change) {
        const year = change.value;
        if (typeof year !== 'number')
            return;
        this.viewYear = year;
        this.ensureYearRange(this.viewYear);
        this.buildCalendar();
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
        this.isOpen = false;
    }
    // ------------- Date view helpers -------------
    /** Initialize view year/month from model or today */
    initViewFromModel() {
        let base;
        if (this._modelValue instanceof Date) {
            base = this.startOfDay(this._modelValue);
        }
        else if (this._displayText) {
            base =
                this.parseInputDate(this._displayText) ?? this.startOfDay(new Date());
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
            for (let y = start; y <= end; y++) {
                arr.push(y);
            }
            this._years = arr;
        }
    }
    buildCalendar() {
        const year = this.viewYear;
        const month = this.viewMonth;
        const firstOfMonth = new Date(year, month, 1);
        // Make Monday = 0
        const startDay = (firstOfMonth.getDay() + 6) % 7;
        const startDate = new Date(year, month, 1 - startDay);
        const weeks = [];
        let current = new Date(startDate);
        const selected = this._modelValue
            ? this.startOfDay(this._modelValue)
            : null;
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
    /**
     * Parse date string according to this.format (yyyy, MM, dd)
     */
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
            if (t === 'yyyy') {
                year = n;
            }
            else if (t === 'MM') {
                month = n;
            }
            else if (t === 'dd') {
                day = n;
            }
        });
        if (!year || !month || !day)
            return null;
        const date = new Date(year, month - 1, day);
        if (date.getFullYear() !== year ||
            date.getMonth() !== month - 1 ||
            date.getDate() !== day) {
            return null;
        }
        return this.startOfDay(date);
    }
    /**
     * Format Date → string according to this.format.
     */
    formatDate(date) {
        const fmt = this.format || 'yyyy-MM-dd';
        return formatDate(date, fmt, 'en');
    }
    // ------------- Host listeners -------------
    /**
     * Listen to any 'input' bubbling inside <i-datepicker>
     * and always read from the inner <input>, not event.target.
     */
    onHostInput() {
        const input = this.getInnerInput();
        if (!input)
            return;
        this.handleInput(input.value);
    }
    /** Blur anywhere inside → mark touched */
    onHostFocusOut(_event) {
        this.handleBlur();
    }
    /** Close popup when clicking outside i-datepicker */
    onDocumentClick(event) {
        if (!this.isOpen)
            return;
        const target = event.target;
        if (target && !this.hostEl.nativeElement.contains(target)) {
            this.isOpen = false;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IDatepicker, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.15", type: IDatepicker, isStandalone: true, selector: "i-datepicker", inputs: { placeholder: "placeholder", disabled: "disabled", invalid: "invalid", format: "format", panelPosition: "panelPosition", valueInput: ["value", "valueInput"] }, outputs: { onChanged: "onChanged" }, host: { listeners: { "input": "onHostInput()", "focusout": "onHostFocusOut($event)", "document:click": "onDocumentClick($event)" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => IDatepicker),
                multi: true,
            },
        ], ngImport: i0, template: "<!--\n IDatepicker\n Version: 1.4.1\n-->\n\n<!-- Core input: styled via i-input -->\n<i-input\n  [placeholder]=\"placeholder\"\n  [value]=\"displayText\"\n  [invalid]=\"invalid\"\n  [readonly]=\"disabled\"\n  [iInputMask]=\"{ type: 'date', format: format }\"\n  [append]=\"appendAddon\">\n</i-input>\n\n<!-- Popup calendar -->\n@if (isOpen) {\n  <div class=\"i-datepicker-panel\" [ngClass]=\"panelPositionClass\">\n    <div class=\"i-datepicker-header\">\n      <i-button (click)=\"prevMonth()\" size=\"xs\" icon=\"prev\"></i-button>\n\n      <!-- Month select -->\n      <i-select\n        class=\"i-date-picker-month-select\"\n        [options]=\"months\"\n        [value]=\"monthSelected\"\n        (onOptionSelected)=\"onMonthChange($event)\">\n      </i-select>\n\n      <!-- Year select -->\n      <i-select\n        class=\"i-date-picker-year-select\"\n        [options]=\"years\"\n        [value]=\"viewYear\"\n        (onOptionSelected)=\"onYearChange($event)\">\n      </i-select>\n\n      <i-button (click)=\"nextMonth()\" size=\"xs\" icon=\"next\"></i-button>\n    </div>\n\n    <div class=\"i-datepicker-weekdays\">\n      @for (w of weekdays; track w) {\n        <small>{{ w }}</small>\n      }\n    </div>\n\n    <div class=\"i-datepicker-weeks\">\n      @for (week of weeks; track $index) {\n        <div class=\"i-datepicker-week\">\n          @for (d of week; track d.date.getTime()) {\n            <div\n              class=\"i-datepicker-day\"\n              [class.today]=\"d.isToday && !d.isSelected\"\n              [class.selected]=\"d.isSelected\"\n              [class.current-month]=\"d.inCurrentMonth\"\n              (click)=\"selectDay(d)\">\n              {{ d.date.getDate() }}\n            </div>\n          }\n        </div>\n      }\n    </div>\n  </div>\n}\n", dependencies: [{ kind: "component", type: IInput, selector: "i-input", inputs: ["type", "placeholder", "autocomplete", "readonly", "invalid", "mask", "value", "prepend", "append", "disabled"] }, { kind: "component", type: IButton, selector: "i-button", inputs: ["disabled", "loading", "type", "loadingText", "variant", "size", "icon"], outputs: ["onClick"] }, { kind: "directive", type: IInputMaskDirective, selector: "[iInputMask]", inputs: ["iInputMask"] }, { kind: "component", type: ISelect, selector: "i-select", inputs: ["placeholder", "disabled", "invalid", "filterDelay", "panelPosition", "options", "options$", "displayWith", "filterPredicate", "value"], outputs: ["onChanged", "onOptionSelected"] }, { kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IDatepicker, decorators: [{
            type: Component,
            args: [{ selector: 'i-datepicker', standalone: true, imports: [IInput, IButton, IInputMaskDirective, ISelect, NgClass], changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => IDatepicker),
                            multi: true,
                        },
                    ], template: "<!--\n IDatepicker\n Version: 1.4.1\n-->\n\n<!-- Core input: styled via i-input -->\n<i-input\n  [placeholder]=\"placeholder\"\n  [value]=\"displayText\"\n  [invalid]=\"invalid\"\n  [readonly]=\"disabled\"\n  [iInputMask]=\"{ type: 'date', format: format }\"\n  [append]=\"appendAddon\">\n</i-input>\n\n<!-- Popup calendar -->\n@if (isOpen) {\n  <div class=\"i-datepicker-panel\" [ngClass]=\"panelPositionClass\">\n    <div class=\"i-datepicker-header\">\n      <i-button (click)=\"prevMonth()\" size=\"xs\" icon=\"prev\"></i-button>\n\n      <!-- Month select -->\n      <i-select\n        class=\"i-date-picker-month-select\"\n        [options]=\"months\"\n        [value]=\"monthSelected\"\n        (onOptionSelected)=\"onMonthChange($event)\">\n      </i-select>\n\n      <!-- Year select -->\n      <i-select\n        class=\"i-date-picker-year-select\"\n        [options]=\"years\"\n        [value]=\"viewYear\"\n        (onOptionSelected)=\"onYearChange($event)\">\n      </i-select>\n\n      <i-button (click)=\"nextMonth()\" size=\"xs\" icon=\"next\"></i-button>\n    </div>\n\n    <div class=\"i-datepicker-weekdays\">\n      @for (w of weekdays; track w) {\n        <small>{{ w }}</small>\n      }\n    </div>\n\n    <div class=\"i-datepicker-weeks\">\n      @for (week of weeks; track $index) {\n        <div class=\"i-datepicker-week\">\n          @for (d of week; track d.date.getTime()) {\n            <div\n              class=\"i-datepicker-day\"\n              [class.today]=\"d.isToday && !d.isSelected\"\n              [class.selected]=\"d.isSelected\"\n              [class.current-month]=\"d.inCurrentMonth\"\n              (click)=\"selectDay(d)\">\n              {{ d.date.getDate() }}\n            </div>\n          }\n        </div>\n      }\n    </div>\n  </div>\n}\n" }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { placeholder: [{
                type: Input
            }], disabled: [{
                type: Input
            }], invalid: [{
                type: Input
            }], format: [{
                type: Input
            }], panelPosition: [{
                type: Input
            }], valueInput: [{
                type: Input,
                args: ['value']
            }], onChanged: [{
                type: Output
            }], onHostInput: [{
                type: HostListener,
                args: ['input']
            }], onHostFocusOut: [{
                type: HostListener,
                args: ['focusout', ['$event']]
            }], onDocumentClick: [{
                type: HostListener,
                args: ['document:click', ['$event']]
            }] } });
class IFCDatepicker {
    ngControl;
    formDir;
    cdr;
    hostEl;
    innerDatepicker;
    label = '';
    placeholder = '';
    /** Passed through to IDatepicker's [format] input */
    format = 'dd/MM/yyyy';
    /** Passed through to IDatepicker's [panelPosition] input */
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
    constructor(ngControl, formDir, cdr, hostEl) {
        this.ngControl = ngControl;
        this.formDir = formDir;
        this.cdr = cdr;
        this.hostEl = hostEl;
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
        if (this.formDir) {
            this.formDir.ngSubmit.subscribe(() => {
                this.cdr.markForCheck();
            });
        }
    }
    // ---- CVA ----
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
    // ---- Bridge IDatepicker → outer form control ----
    handleDateChange(date) {
        this._value = date ?? null;
        this.onChange(this._value);
        this.onTouched();
    }
    // ---- Label click → focus inner input ----
    focusInnerDatepicker() {
        if (this.isDisabled)
            return;
        const input = this.hostEl.nativeElement.querySelector('i-datepicker i-input input');
        input?.focus();
    }
    // ---- Validation helpers ----
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IFCDatepicker, deps: [{ token: i1.NgControl, optional: true, self: true }, { token: i1.FormGroupDirective, optional: true }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.15", type: IFCDatepicker, isStandalone: true, selector: "i-fc-datepicker", inputs: { label: "label", placeholder: "placeholder", format: "format", panelPosition: "panelPosition", errorMessage: "errorMessage", value: "value" }, viewQueries: [{ propertyName: "innerDatepicker", first: true, predicate: IDatepicker, descendants: true }], ngImport: i0, template: `@if (label) {
      <label class="i-fc-datepicker__label" (click)="focusInnerDatepicker()">
        {{ label }} :
        @if (required) {
          <span class="i-fc-datepicker__required">*</span>
        }
      </label>
    }

    <i-datepicker
      [placeholder]="placeholder"
      [disabled]="isDisabled"
      [invalid]="controlInvalid"
      [format]="format"
      [value]="value"
      [panelPosition]="panelPosition"
      (onChanged)="handleDateChange($event)">
    </i-datepicker>

    @if (controlInvalid && resolvedErrorText) {
      <div class="i-fc-datepicker__error">
        {{ resolvedErrorText }}
      </div>
    }`, isInline: true, dependencies: [{ kind: "component", type: IDatepicker, selector: "i-datepicker", inputs: ["placeholder", "disabled", "invalid", "format", "panelPosition", "value"], outputs: ["onChanged"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IFCDatepicker, decorators: [{
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
      [placeholder]="placeholder"
      [disabled]="isDisabled"
      [invalid]="controlInvalid"
      [format]="format"
      [value]="value"
      [panelPosition]="panelPosition"
      (onChanged)="handleDateChange($event)">
    </i-datepicker>

    @if (controlInvalid && resolvedErrorText) {
      <div class="i-fc-datepicker__error">
        {{ resolvedErrorText }}
      </div>
    }`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: () => [{ type: i1.NgControl, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }, { type: i1.FormGroupDirective, decorators: [{
                    type: Optional
                }] }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }], propDecorators: { innerDatepicker: [{
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

/* paginator.ts */
/**
 * IPaginator
 * Version: 1.1.0
 */
class IPaginator {
    length = 0;
    pageIndex = 0;
    pageSize = 10;
    pageSizeOptions = [10, 50, 100];
    pageChange = new EventEmitter();
    get pageCount() {
        return Math.max(1, Math.ceil(this.length / this.pageSize));
    }
    emit() {
        this.pageChange.emit({
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
        });
    }
    nextPage() {
        if (this.pageIndex < this.pageCount - 1) {
            this.pageIndex++;
            this.emit();
        }
    }
    previousPage() {
        if (this.pageIndex > 0) {
            this.pageIndex--;
            this.emit();
        }
    }
    changePageSize(value) {
        const newSize = Number(value);
        const oldSize = this.pageSize;
        this.pageSize = newSize;
        const firstItemIndex = this.pageIndex * oldSize;
        this.pageIndex = Math.floor(firstItemIndex / newSize);
        this.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IPaginator, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.15", type: IPaginator, isStandalone: true, selector: "i-paginator", inputs: { length: "length", pageIndex: "pageIndex", pageSize: "pageSize", pageSizeOptions: "pageSizeOptions" }, outputs: { pageChange: "pageChange" }, ngImport: i0, template: `<div class="i-paginator flex align-items-center gap-2">
    <i-button
      icon="prev"
      (onClick)="previousPage()"
      size="sm"
      [disabled]="pageIndex <= 0"
    ></i-button>
    <span>Page {{ pageIndex + 1 }} / {{ pageCount }}</span>
    <i-button
      icon="next"
      (onClick)="nextPage()"
      size="sm"
      [disabled]="pageIndex >= pageCount - 1"
    ></i-button>

    <span class="ms-2">
      | Show
      <select
        class="form-select form-select-sm d-inline-block w-auto"
        [value]="pageSize"
        (change)="changePageSize($any($event.target).value)"
      >
        @for (size of pageSizeOptions; track size) {
        <option [value]="size">{{ size }}</option>
        }
      </select>
      per page ({{ length }} total)
    </span>
  </div>`, isInline: true, dependencies: [{ kind: "component", type: IButton, selector: "i-button", inputs: ["disabled", "loading", "type", "loadingText", "variant", "size", "icon"], outputs: ["onClick"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IPaginator, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-paginator',
                    standalone: true,
                    imports: [IButton],
                    template: `<div class="i-paginator flex align-items-center gap-2">
    <i-button
      icon="prev"
      (onClick)="previousPage()"
      size="sm"
      [disabled]="pageIndex <= 0"
    ></i-button>
    <span>Page {{ pageIndex + 1 }} / {{ pageCount }}</span>
    <i-button
      icon="next"
      (onClick)="nextPage()"
      size="sm"
      [disabled]="pageIndex >= pageCount - 1"
    ></i-button>

    <span class="ms-2">
      | Show
      <select
        class="form-select form-select-sm d-inline-block w-auto"
        [value]="pageSize"
        (change)="changePageSize($any($event.target).value)"
      >
        @for (size of pageSizeOptions; track size) {
        <option [value]="size">{{ size }}</option>
        }
      </select>
      per page ({{ length }} total)
    </span>
  </div>`,
                }]
        }], propDecorators: { length: [{
                type: Input
            }], pageIndex: [{
                type: Input
            }], pageSize: [{
                type: Input
            }], pageSizeOptions: [{
                type: Input
            }], pageChange: [{
                type: Output
            }] } });

/* grid.ts */
/**
 * IGrid
 * Version: 1.23.0
 *
 * - Observable-based data source via IGridDataSource.data$
 * - Tree view support via [tree] input
 * - Tree selection with parent/children cascade + indeterminate
 * - Tree + multiple selection: checkbox is rendered in dedicated tree column
 * - Tree initial auto-expansion via [treeInitialExpandLevel]
 * - IGridDataSource.filter supports:
 *    - string
 *    - { recursive: true, text: string, key?: string } for recursive tree filter
 * - Highlighting of filter text via HighlightSearchPipe for default cells
 *
 * NEW (1.23.0):
 * - Expandable detail rows via:
 *     <i-grid-expandable-row *iRowDef="let row; expandSingle: true">
 *       ...detail template...
 *     </i-grid-expandable-row>
 * - Explicit toggle UI column (like tree toggle)
 * - Imperative API: expandRow/collapseRow/toggleRowExpanded/expandAll/collapseAll
 * - Outputs: rowExpandChange, expandedRowsChange
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
        if (config.filter != null) {
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
        if (!this._paginatorEnabled || !state)
            return;
        this._pageIndex = state.pageIndex;
        this._pageSize = state.pageSize;
        this._update();
    }
    get paginator() {
        if (!this._paginatorEnabled)
            return null;
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
        if (!filter)
            return true;
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
        if (!filter)
            return true;
        return this.filterPredicate(data, filter);
    }
    /**
     * Strict recursive filtering:
     * - Returns a **new array** of roots.
     * - Each returned root is a **shallow clone** with its children pruned.
     * - A node is kept if:
     *     - it matches the filter, OR
     *     - any descendant matches.
     * - Non-matching siblings are removed.
     */
    _filterRecursiveArray(nodes, filter) {
        const result = [];
        for (const node of nodes) {
            const pruned = this._filterRecursiveNode(node, filter);
            if (pruned != null) {
                result.push(pruned);
            }
        }
        return result;
    }
    /**
     * Returns pruned clone of node, or null if neither it nor any descendant matches.
     */
    _filterRecursiveNode(node, filter) {
        const children = Array.isArray(node?.[this._childrenKey])
            ? node[this._childrenKey]
            : [];
        // First, prune children
        const filteredChildren = this._filterRecursiveArray(children, filter);
        // Then, check this node
        const selfMatches = this._rowMatchesFilter(node, filter);
        // If no match and no matching descendants → remove this node
        if (!selfMatches && filteredChildren.length === 0) {
            return null;
        }
        // Keep this node, with pruned children
        const clone = { ...node };
        if (filteredChildren.length) {
            clone[this._childrenKey] = filteredChildren;
        }
        else {
            // remove children property so leaf really becomes a leaf
            if (clone.hasOwnProperty(this._childrenKey)) {
                delete clone[this._childrenKey];
            }
        }
        return clone;
    }
    /* -------- internal sort normalize -------- */
    _normalizeSort(sort) {
        if (!sort)
            return null;
        const arr = Array.isArray(sort) ? sort : [sort];
        const cleaned = arr.filter((s) => !!s && typeof s.active === 'string' && (s.direction === 'asc' || s.direction === 'desc'));
        return cleaned.length ? cleaned : null;
    }
    /* -------- update flow -------- */
    _update() {
        let data = [...this._rawData];
        // FILTER
        if (this._filter) {
            const f = this._filter;
            if (this._recursive) {
                // STRICT TREE FILTER:
                // - prune roots AND children
                data = this._filterRecursiveArray(data, f);
            }
            else {
                // normal flat filter
                data = data.filter((row) => this.filterPredicate(row, f));
            }
        }
        // SORT (multi-column) — applies on the filtered/pruned roots
        if (this._sort && this._sort.length > 0) {
            const sorts = [...this._sort];
            data.sort((a, b) => {
                for (const sort of sorts) {
                    const { active, direction } = sort;
                    if (!active || !direction)
                        continue;
                    const dir = direction === 'asc' ? 1 : -1;
                    const aValue = this.sortAccessor(a, active);
                    const bValue = this.sortAccessor(b, active);
                    if (aValue == null && bValue == null)
                        continue;
                    if (aValue == null)
                        return -1 * dir;
                    if (bValue == null)
                        return 1 * dir;
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
    template;
    constructor(template) {
        this.template = template;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IGridHeaderCellDefDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.15", type: IGridHeaderCellDefDirective, isStandalone: true, selector: "[iHeaderCellDef]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IGridHeaderCellDefDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[iHeaderCellDef]',
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: i0.TemplateRef }] });
class IGridCellDefDirective {
    template;
    constructor(template) {
        this.template = template;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IGridCellDefDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.15", type: IGridCellDefDirective, isStandalone: true, selector: "[iCellDef]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IGridCellDefDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[iCellDef]',
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: i0.TemplateRef }] });
/* ----------------------------------------------------
 * EXPANDABLE ROW DEF (detail row template)
 * Usage:
 *   <i-grid-expandable-row *iRowDef="let row; let index = index; expandSingle: true">
 *     ...detail...
 *   </i-grid-expandable-row>
 *
 * Notes:
 * - `expandSingle` is configured via microsyntax key:
 *     expandSingle: true  -> binds to input iRowDefExpandSingle
 * ---------------------------------------------------- */
class IGridRowDefDirective {
    template;
    vcr;
    /**
     * Microsyntax: `expandSingle: true` -> input `iRowDefExpandSingle`
     */
    iRowDefExpandSingle = false;
    constructor(template, vcr) {
        this.template = template;
        this.vcr = vcr;
    }
    ngOnInit() {
        // IMPORTANT:
        // This directive is used as a definition holder.
        // We don't want it to render by itself where it is projected.
        this.vcr.clear();
    }
    static ngTemplateContextGuard(_dir, _ctx) {
        return true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IGridRowDefDirective, deps: [{ token: i0.TemplateRef }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.15", type: IGridRowDefDirective, isStandalone: true, selector: "[iRowDef]", inputs: { iRowDefExpandSingle: "iRowDefExpandSingle" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IGridRowDefDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[iRowDef]',
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: i0.TemplateRef }, { type: i0.ViewContainerRef }], propDecorators: { iRowDefExpandSingle: [{
                type: Input
            }] } });
/**
 * Optional semantic wrapper component for your markup.
 * It is not queried for config (config lives on iRowDef microsyntax),
 * but it helps keep HTML readable.
 */
class IGridExpandableRow {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IGridExpandableRow, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.15", type: IGridExpandableRow, isStandalone: true, selector: "i-grid-expandable-row", host: { classAttribute: "i-grid-expandable-row" }, ngImport: i0, template: `<ng-content></ng-content>`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IGridExpandableRow, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-grid-expandable-row',
                    standalone: true,
                    template: `<ng-content></ng-content>`,
                    host: {
                        class: 'i-grid-expandable-row',
                    },
                }]
        }] });
/* ----------------------------------------------------
 * ROW DIRECTIVES
 * ---------------------------------------------------- */
class IGridHeaderRowDirective {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IGridHeaderRowDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.15", type: IGridHeaderRowDirective, isStandalone: true, selector: "i-grid-header-row", host: { attributes: { "role": "row" }, classAttribute: "i-grid-header-row" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IGridHeaderRowDirective, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IGridRowDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.15", type: IGridRowDirective, isStandalone: true, selector: "i-grid-row", host: { attributes: { "role": "row" }, classAttribute: "i-grid-row" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IGridRowDirective, decorators: [{
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
 * COLUMN (i-grid-column) – data-backed only
 * ---------------------------------------------------- */
class IGridColumn {
    /** Row property name, e.g. "fullName" – REQUIRED, must exist on datasource. */
    fieldName;
    /** Header text if you don't use iHeaderCellDef */
    title = '';
    /** Per-column sort control */
    sortable = true;
    /** Per-column resize control */
    resizable = true;
    /**
     * Column width:
     * - number => fixed px
     * - "fill" => flex-fill
     * - undefined => default fixed width (grid-level)
     */
    width;
    /**
     * Freeze block always starts from the first column.
     * Mark the last frozen column with [freeze].
     */
    freeze = false;
    /**
     * Projected templates
     */
    headerDef;
    cellDef;
    // manual columns are not auto
    isAuto;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IGridColumn, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.15", type: IGridColumn, isStandalone: true, selector: "i-grid-column", inputs: { fieldName: "fieldName", title: "title", sortable: "sortable", resizable: "resizable", width: "width", freeze: ["freeze", "freeze", booleanAttribute] }, queries: [{ propertyName: "headerDef", first: true, predicate: IGridHeaderCellDefDirective, descendants: true, read: TemplateRef }, { propertyName: "cellDef", first: true, predicate: IGridCellDefDirective, descendants: true, read: TemplateRef }], ngImport: i0, template: '', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IGridColumn, decorators: [{
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
    /** Custom header title (e.g. "Actions") */
    title = '';
    /** Custom columns are not sortable by default */
    sortable = false;
    /** Per-column resize control */
    resizable = true;
    width;
    freeze = false;
    // For custom column there is normally no fieldName
    fieldName;
    headerDef;
    cellDef;
    isAuto;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IGridCustomColumn, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "20.3.15", type: IGridCustomColumn, isStandalone: true, selector: "i-grid-custom-column", inputs: { title: "title", sortable: "sortable", resizable: "resizable", width: "width", freeze: ["freeze", "freeze", booleanAttribute] }, queries: [{ propertyName: "headerDef", first: true, predicate: IGridHeaderCellDefDirective, descendants: true, read: TemplateRef }, { propertyName: "cellDef", first: true, predicate: IGridCellDefDirective, descendants: true, read: TemplateRef }], ngImport: i0, template: '', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IGridCustomColumn, decorators: [{
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
 * DATA CELL (used in body)
 * ---------------------------------------------------- */
class IGridCell {
    hostDataColumn;
    hostCustomColumn;
    grid;
    /** Column instance (set automatically by grid OR injected from host column) */
    column;
    /** Optional fixed width (px) – used for selection column, etc. */
    fixedWidth;
    constructor(hostDataColumn, hostCustomColumn, grid) {
        this.hostDataColumn = hostDataColumn;
        this.hostCustomColumn = hostCustomColumn;
        this.grid = grid;
    }
    get _column() {
        return this.column ?? this.hostDataColumn ?? this.hostCustomColumn ?? null;
    }
    /* flex sizing */
    get flex() {
        if (typeof this.fixedWidth === 'number') {
            return `0 0 ${this.fixedWidth}px`;
        }
        const col = this._column;
        if (!this.grid || !col)
            return '1 1 0';
        return this.grid.getColumnFlex(col);
    }
    /* frozen (sticky) behaviour */
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
        if (!this._isFrozen || !this.grid || !this._column)
            return null;
        return this.grid.getColumnStickyLeft(this._column);
    }
    get stickyZ() {
        return this._isFrozen ? 2 : null;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IGridCell, deps: [{ token: IGridColumn, host: true, optional: true }, { token: IGridCustomColumn, host: true, optional: true }, { token: IGrid, optional: true }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.15", type: IGridCell, isStandalone: true, selector: "i-grid-cell", inputs: { column: "column", fixedWidth: "fixedWidth" }, host: { attributes: { "role": "cell" }, properties: { "style.flex": "this.flex", "class.i-grid-cell--frozen": "this.frozenClass", "style.position": "this.stickyPosition", "style.left.px": "this.stickyLeft", "style.zIndex": "this.stickyZ" }, classAttribute: "i-grid-cell" }, ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IGridCell, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-grid-cell',
                    standalone: true,
                    host: {
                        class: 'i-grid-cell',
                        role: 'cell',
                    },
                    template: ` <ng-content></ng-content> `,
                }]
        }], ctorParameters: () => [{ type: IGridColumn, decorators: [{
                    type: Optional
                }, {
                    type: Host
                }] }, { type: IGridCustomColumn, decorators: [{
                    type: Optional
                }, {
                    type: Host
                }] }, { type: IGrid, decorators: [{
                    type: Optional
                }] }], propDecorators: { column: [{
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
    el;
    grid;
    hostDataColumn;
    hostCustomColumn;
    /** Column instance (set automatically by grid OR injected from host column) */
    column;
    /** Optional fixed width (px) – used for selection column, etc. */
    fixedWidth;
    _isResizing = false;
    _startX = 0;
    _startWidth = 0;
    _minWidth = 50;
    constructor(el, grid, hostDataColumn, hostCustomColumn) {
        this.el = el;
        this.grid = grid;
        this.hostDataColumn = hostDataColumn;
        this.hostCustomColumn = hostCustomColumn;
    }
    get _column() {
        return this.column ?? this.hostDataColumn ?? this.hostCustomColumn ?? null;
    }
    get _columnId() {
        const col = this._column;
        return col?.fieldName ?? null;
    }
    get _direction() {
        if (!this.grid || !this._columnId)
            return '';
        return this.grid.getColumnDirection(this._columnId);
    }
    get _sortableFlag() {
        const col = this._column;
        if (!col)
            return false;
        // only sortable when fieldName is present
        return col.sortable !== false && !!col.fieldName;
    }
    get resizable() {
        const col = this._column;
        if (!col)
            return false;
        return col.resizable !== false;
    }
    /** width */
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
    /** sorting classes */
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
    /** frozen (sticky) behaviour */
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
        if (!this._isFrozen || !this.grid || !this._column)
            return null;
        return this.grid.getColumnStickyLeft(this._column);
    }
    get stickyZ() {
        if (!this._isFrozen || !this.grid || !this._column)
            return null;
        return this.grid.getFrozenColumnZ(this._column);
    }
    /** events */
    onClick() {
        // if we just resized, ignore click (to avoid accidental sort)
        if (this._isResizing)
            return;
        const col = this._column;
        if (!this.grid || !this._sortableFlag || !col)
            return;
        this.grid.sort(col);
    }
    onResizeMouseDown(event) {
        const col = this._column;
        if (!this.grid || !col || !this.resizable)
            return;
        event.stopPropagation();
        event.preventDefault();
        this._isResizing = true;
        this._startX = event.clientX;
        const currentWidth = this.grid.getColumnWidth(col) ?? this.el.nativeElement.offsetWidth;
        this._startWidth = currentWidth;
    }
    onDocumentMouseMove(event) {
        const col = this._column;
        if (!this._isResizing || !this.grid || !col)
            return;
        const delta = event.clientX - this._startX;
        let newWidth = this._startWidth + delta;
        if (newWidth < this._minWidth) {
            newWidth = this._minWidth;
        }
        this.grid.setColumnWidth(col, newWidth);
    }
    onDocumentMouseUp() {
        if (!this._isResizing)
            return;
        setTimeout(() => {
            this._isResizing = false;
        }, 0);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IGridHeaderCell, deps: [{ token: i0.ElementRef }, { token: IGrid, optional: true }, { token: IGridColumn, host: true, optional: true }, { token: IGridCustomColumn, host: true, optional: true }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.15", type: IGridHeaderCell, isStandalone: true, selector: "i-grid-header-cell", inputs: { column: "column", fixedWidth: "fixedWidth" }, host: { attributes: { "role": "columnheader" }, listeners: { "click": "onClick()", "document:mousemove": "onDocumentMouseMove($event)", "document:mouseup": "onDocumentMouseUp()" }, properties: { "style.flex": "this.flex", "class.i-grid-header-cell--sortable": "this.sortable", "class.i-grid-header-cell--sorted": "this.isSorted", "class.i-grid-header-cell--sorted-asc": "this.isSortedAsc", "class.i-grid-header-cell--sorted-desc": "this.isSortedDesc", "class.i-grid-header-cell--resizable": "this.isResizableClass", "class.i-grid-header-cell--frozen": "this.frozenClass", "style.position": "this.stickyPosition", "style.left.px": "this.stickyLeft", "style.zIndex": "this.stickyZ" }, classAttribute: "i-grid-header-cell" }, ngImport: i0, template: `
    <span class="i-grid-header-cell__content">
      <ng-content></ng-content>
    </span>

    @if (showIcon) {
    <span class="i-grid-header-cell__icon">
      <ic [icon]="iconName" size="sm"></ic>
    </span>
    }

    <span class="i-grid-header-cell__resize-handle" (mousedown)="onResizeMouseDown($event)"> </span>
  `, isInline: true, dependencies: [{ kind: "component", type: IIcon, selector: "ic", inputs: ["icon", "size"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IGridHeaderCell, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-grid-header-cell',
                    standalone: true,
                    imports: [IIcon],
                    template: `
    <span class="i-grid-header-cell__content">
      <ng-content></ng-content>
    </span>

    @if (showIcon) {
    <span class="i-grid-header-cell__icon">
      <ic [icon]="iconName" size="sm"></ic>
    </span>
    }

    <span class="i-grid-header-cell__resize-handle" (mousedown)="onResizeMouseDown($event)"> </span>
  `,
                    host: {
                        class: 'i-grid-header-cell',
                        role: 'columnheader',
                    },
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: IGrid, decorators: [{
                    type: Optional
                }] }, { type: IGridColumn, decorators: [{
                    type: Optional
                }, {
                    type: Host
                }] }, { type: IGridCustomColumn, decorators: [{
                    type: Optional
                }, {
                    type: Host
                }] }], propDecorators: { column: [{
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
/* ----------------------------------------------------
 * GRID COMPONENT
 * ---------------------------------------------------- */
class IGrid {
    dataSource;
    /** Row selection mode */
    selectionMode = false;
    /** Sticky header (position: sticky inside viewport) */
    stickyHeader = false;
    /** Offset from top when sticky, in px (for fixed navbar etc.) */
    stickyHeaderOffset = 0;
    /**
     * Scrollable body:
     * - bodyHeight: fixed viewport height (px)
     * - bodyMaxHeight: max viewport height (px)
     * If both undefined, grid grows naturally (no internal vertical scroll).
     */
    bodyHeight;
    bodyMaxHeight;
    /**
     * Tree mode:
     * - false / null / undefined → flat mode
     * - true / "" / "children" → tree, children key = "children"
     * - "nodes" → tree, children key = "nodes"
     */
    tree = null;
    /** Indent per tree level (px) */
    treeIndent = 16;
    /**
     * Initial auto-expand level for tree mode (1-based):
     * - 1 → expand level 1 (roots), so their children are visible
     * - 2 → expand level 1 and 2, so grandchildren are visible, etc.
     * - null / <= 0 → no auto-expansion
     */
    treeInitialExpandLevel = null;
    /**
     * Show auto number column (1-based).
     * Placed after selection + tree + expand column (if any).
     *
     * NOTE: In tree mode, this is disabled by default via showNumberColumnEffective.
     */
    showNumberColumn = true;
    /** Effective flag for number column – disabled by default in tree mode. */
    get showNumberColumnEffective() {
        if (this.treeEnabled) {
            // default: no auto number column when in tree mode
            return false;
        }
        return this.showNumberColumn;
    }
    /** Emits whenever selection changes */
    selectionChange = new EventEmitter();
    /** Emits on row click (before selection logic) */
    rowClick = new EventEmitter();
    /** Expand events */
    rowExpandChange = new EventEmitter();
    expandedRowsChange = new EventEmitter();
    /** Data columns projected as <i-grid-column> */
    columnDefs;
    /** Custom columns projected as <i-grid-custom-column> */
    customColumnDefs;
    /**
     * Expandable detail row definition (template holder).
     * See: IGridRowDefDirective usage.
     */
    expandableRowDef;
    get hasExpandableRow() {
        return !!this.expandableRowDef?.template;
    }
    /** Concrete array used in template loops (data + custom, or auto + custom) */
    columns = [];
    renderedData = [];
    // current normalized filter text (for highlight pipe)
    currentFilterText = '';
    // multi-column sort
    sortStates = [];
    // column widths (px), key = column instance (resized or numeric/default)
    _columnWidths = new Map();
    _dataSub;
    // selection
    _selection = new Set();
    // expanded detail rows
    _expanded = new Set();
    _id = Math.random().toString(36).slice(2);
    /** default width (px) when column.width is undefined */
    _defaultColumnWidth = 200;
    /** special widths (px) for selection + number + tree + expand columns */
    selectionColumnWidth = 28;
    numberColumnWidth = 60;
    treeColumnWidth = 52;
    expandColumnWidth = 52;
    /** internal auto-number column object (not part of columns[]) */
    _numberColumnInternal;
    // ---------- TREE: internal state ----------
    _treeMeta = new Map();
    /** Top-level rows in tree mode */
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
    /* ------- host bindings for sticky header ------- */
    get stickyHeaderClass() {
        return !!this.stickyHeader;
    }
    // CSS custom prop used by CSS: var(--i-grid-sticky-top)
    get stickyTopVar() {
        return this.stickyHeader ? `${this.stickyHeaderOffset}px` : null;
    }
    /* ----------------------------------------------------
     * EXPANDABLE ROW API
     * ---------------------------------------------------- */
    /** Expand a row detail */
    expandRow(row) {
        this._setExpanded(row, true);
    }
    /** Collapse a row detail */
    collapseRow(row) {
        this._setExpanded(row, false);
    }
    /** Toggle a row detail */
    toggleRowExpanded(row) {
        this._setExpanded(row, !this.isRowExpanded(row));
    }
    /** True if row is expanded */
    isRowExpanded(row) {
        return this._expanded.has(row);
    }
    /** Return expanded rows */
    getExpandedRows() {
        return Array.from(this._expanded);
    }
    /** Expand all visible rows (renderedData). If expandSingle, expands only first visible row. */
    expandAll() {
        if (!this.hasExpandableRow)
            return;
        const expandSingle = !!this.expandableRowDef?.iRowDefExpandSingle;
        if (expandSingle) {
            this._expanded.clear();
            const first = this.renderedData[0];
            if (first)
                this._expanded.add(first);
            if (first)
                this.rowExpandChange.emit({ row: first, expanded: true });
            this.expandedRowsChange.emit(this.getExpandedRows());
            return;
        }
        const before = new Set(this._expanded);
        for (const row of this.renderedData) {
            this._expanded.add(row);
        }
        // emit per-row changes only for newly expanded
        for (const row of this.renderedData) {
            if (!before.has(row)) {
                this.rowExpandChange.emit({ row, expanded: true });
            }
        }
        this.expandedRowsChange.emit(this.getExpandedRows());
    }
    /** Collapse all rows */
    collapseAll() {
        if (!this.hasExpandableRow)
            return;
        const prev = Array.from(this._expanded);
        this._expanded.clear();
        // emit per-row collapse
        prev.forEach((row) => this.rowExpandChange.emit({ row, expanded: false }));
        this.expandedRowsChange.emit(this.getExpandedRows());
    }
    /** Toggle click handler from template */
    onExpandToggle(row, event) {
        event?.stopPropagation();
        this.toggleRowExpanded(row);
    }
    _setExpanded(row, expanded) {
        if (!this.hasExpandableRow)
            return;
        // Validate row exists in current data (flat or tree)
        const all = this._getAllDataRows();
        if (all.length) {
            const valid = new Set(all);
            if (!valid.has(row))
                return;
        }
        const expandSingle = !!this.expandableRowDef?.iRowDefExpandSingle;
        const wasExpanded = this._expanded.has(row);
        if (expanded === wasExpanded)
            return;
        if (expanded) {
            if (expandSingle) {
                // collapse others
                const prev = Array.from(this._expanded).filter((r) => r !== row);
                this._expanded.clear();
                prev.forEach((r) => this.rowExpandChange.emit({ row: r, expanded: false }));
            }
            this._expanded.add(row);
            this.rowExpandChange.emit({ row, expanded: true });
        }
        else {
            this._expanded.delete(row);
            this.rowExpandChange.emit({ row, expanded: false });
        }
        this.expandedRowsChange.emit(this.getExpandedRows());
    }
    /* ------- TREE helpers (config) ------- */
    /** Is tree mode enabled? */
    get treeEnabled() {
        return this.tree !== null && this.tree !== false;
    }
    /** Resolved children key for tree rows (e.g. "children", "nodes") */
    get treeChildrenKey() {
        if (!this.treeEnabled)
            return 'children';
        if (this.tree === true)
            return 'children';
        if (typeof this.tree === 'string') {
            const t = this.tree.trim();
            if (!t || t === 'true')
                return 'children';
            return t;
        }
        return 'children';
    }
    /** Resolved internal (0-based) max level for auto expansion, or null for none. */
    _getInitialExpandLevelInternal() {
        if (!this.treeEnabled)
            return null;
        if (this.treeInitialExpandLevel == null)
            return null;
        const n = Number(this.treeInitialExpandLevel);
        if (!Number.isFinite(n) || n <= 0)
            return null;
        return n - 1; // convert 1-based public → 0-based internal
    }
    /** Should a row at given level start expanded (for tree mode)? */
    _shouldRowStartExpanded(level, hasChildren) {
        if (!hasChildren)
            return false;
        const max = this._getInitialExpandLevelInternal();
        if (max == null)
            return false;
        return level <= max;
    }
    /** Read children from row using configured children key */
    _getTreeChildren(row) {
        if (!this.treeEnabled || !row)
            return [];
        const anyRow = row;
        const value = anyRow?.[this.treeChildrenKey];
        return Array.isArray(value) ? value : [];
    }
    /** Get all descendants (deep) for a given row. */
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
    /** Build tree metadata from raw hierarchical data */
    _buildTreeMeta(data) {
        this._treeMeta.clear();
        this._treeRoots = [];
        if (!Array.isArray(data))
            return;
        const visit = (row, level, parent) => {
            const children = this._getTreeChildren(row);
            const hasChildren = children.length > 0;
            const expanded = this._shouldRowStartExpanded(level, hasChildren);
            if (parent === null) {
                this._treeRoots.push(row);
            }
            this._treeMeta.set(row, {
                level,
                parent,
                hasChildren,
                expanded,
            });
            children.forEach((child) => visit(child, level + 1, row));
        };
        data.forEach((root) => visit(root, 0, null));
    }
    /** Rebuild flat renderedData based on expansion state */
    _rebuildTreeRendered() {
        if (!this.treeEnabled)
            return;
        const result = [];
        const appendVisible = (row) => {
            result.push(row);
            const meta = this._treeMeta.get(row);
            if (!meta?.expanded)
                return;
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
    /** Tree: row level (0-based) */
    getRowLevel(row) {
        if (!this.treeEnabled)
            return 0;
        return this._treeMeta.get(row)?.level ?? 1;
    }
    /** Tree: does the row have children? */
    hasChildren(row) {
        if (!this.treeEnabled)
            return false;
        return this._treeMeta.get(row)?.hasChildren ?? false;
    }
    /** Tree: expanded state */
    isExpanded(row) {
        if (!this.treeEnabled)
            return false;
        return this._treeMeta.get(row)?.expanded ?? false;
    }
    /** Toggle raw expanded/collapsed */
    toggleRow(row) {
        if (!this.treeEnabled)
            return;
        const meta = this._treeMeta.get(row);
        if (!meta || !meta.hasChildren)
            return;
        meta.expanded = !meta.expanded;
        this._rebuildTreeRendered();
    }
    /** Handler to use from template (stopping click bubbling) */
    onTreeToggle(row, event) {
        event?.stopPropagation();
        this.toggleRow(row);
    }
    /* ------- selection helpers ------- */
    isRowSelected(row) {
        return this._selection.has(row);
    }
    /** Returns visual "checked" state for a row's checkbox (tree-aware). */
    getRowChecked(row) {
        if (!this.treeEnabled) {
            return this.isRowSelected(row);
        }
        const descendants = this._getTreeDescendants(row);
        if (!descendants.length) {
            // leaf
            return this.isRowSelected(row);
        }
        const total = descendants.length;
        const selectedChildren = descendants.filter((child) => this._selection.has(child)).length;
        const allChildrenSelected = total > 0 && selectedChildren === total;
        const anyChildrenSelected = selectedChildren > 0;
        if (allChildrenSelected && this._selection.has(row)) {
            // fully selected branch
            return true;
        }
        if (anyChildrenSelected && !allChildrenSelected) {
            // partially selected branch → parent visually indeterminate, not checked
            return false;
        }
        // no children selected → only checked if parent itself explicitly selected
        return this._selection.has(row);
    }
    /** Returns visual "indeterminate" state for a row's checkbox (tree-aware). */
    getRowIndeterminate(row) {
        if (!this.treeEnabled)
            return false;
        const descendants = this._getTreeDescendants(row);
        if (!descendants.length)
            return false;
        const total = descendants.length;
        const selectedChildren = descendants.filter((child) => this._selection.has(child)).length;
        const allChildrenSelected = total > 0 && selectedChildren === total;
        const anyChildrenSelected = selectedChildren > 0;
        // parent is indeterminate if some (but not all) children are selected
        return anyChildrenSelected && !allChildrenSelected;
    }
    get selectedRows() {
        return Array.from(this._selection);
    }
    get allVisibleSelected() {
        if (!this.selectionMode || !this.renderedData.length)
            return false;
        return this.renderedData.every((row) => this.getRowChecked(row));
    }
    get someVisibleSelected() {
        if (!this.selectionMode || !this.renderedData.length)
            return false;
        const anySelected = this.renderedData.some((row) => this.getRowChecked(row) || this.getRowIndeterminate(row));
        return anySelected && !this.allVisibleSelected;
    }
    _emitSelectionChange(lastChanged) {
        if (!this.selectionMode)
            return;
        this.selectionChange.emit({
            selected: this.selectedRows,
            lastChanged,
        });
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
    /** Set selection for a row and all its descendants in tree mode. */
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
    /** Recalculate selection state for all ancestors of the given row. */
    _syncSelectionUpwardsFrom(row) {
        if (!this.treeEnabled)
            return;
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
                // No children selected → parent explicitly unchecked
                this._selection.delete(current);
            }
            else if (selectedChildren === total) {
                // All children selected → parent checked
                this._selection.add(current);
            }
            else {
                // Some but not all children selected → parent indeterminate
                // (represented by removing it from the selection set; visual in template)
                this._selection.delete(current);
            }
            current = this._treeMeta.get(current)?.parent ?? null;
        }
    }
    onRowSelectionToggle(row) {
        if (!this.selectionMode)
            return;
        if (this.selectionMode === 'single') {
            this._selectSingle(row);
            return;
        }
        // multiple selection
        if (this.treeEnabled) {
            const hasChild = this.hasChildren(row);
            if (hasChild) {
                // toggle whole branch
                const currentlyChecked = this.getRowChecked(row);
                this._setBranchSelection(row, !currentlyChecked);
            }
            else {
                // leaf node: simple toggle
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
        if (this.selectionMode !== 'multiple')
            return;
        const shouldSelect = !this.allVisibleSelected;
        if (this.treeEnabled) {
            // operate on root rows only to avoid double-processing descendants
            const roots = this.renderedData.filter((row) => this.getRowLevel(row) === 0);
            roots.forEach((row) => {
                this._setBranchSelection(row, shouldSelect);
                this._syncSelectionUpwardsFrom(row);
            });
        }
        else {
            if (shouldSelect) {
                // select all visible rows
                this.renderedData.forEach((row) => this._selection.add(row));
            }
            else {
                // unselect visible rows
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
        if (!this.selectionMode)
            return;
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
        if (!this.hasExpandableRow)
            return;
        const all = this._getAllDataRows();
        if (!all.length) {
            if (this._expanded.size) {
                this._expanded.clear();
                this.expandedRowsChange.emit(this.getExpandedRows());
            }
            return;
        }
        const validSet = new Set(all);
        const prev = new Set(this._expanded);
        const newExpanded = new Set();
        this._expanded.forEach((row) => {
            if (validSet.has(row)) {
                newExpanded.add(row);
            }
        });
        // emit collapse for invalid ones
        prev.forEach((row) => {
            if (!newExpanded.has(row)) {
                this.rowExpandChange.emit({ row, expanded: false });
            }
        });
        if (newExpanded.size !== this._expanded.size) {
            this._expanded = newExpanded;
            this.expandedRowsChange.emit(this.getExpandedRows());
        }
    }
    _getAllDataRows() {
        // In tree mode, flatten the full hierarchy (ignoring expansion)
        if (this.treeEnabled && this._treeRoots.length) {
            const result = [];
            const visit = (row) => {
                result.push(row);
                const children = this._getTreeChildren(row);
                children.forEach(visit);
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
        if (!(this.dataSource instanceof IGridDataSource))
            return;
        const columnId = column.fieldName;
        if (!columnId)
            return;
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
        if (!(this.dataSource instanceof IGridDataSource))
            return;
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
        // explicit numeric width
        if (typeof column.width === 'number') {
            return column.width;
        }
        // fill → no fixed width, use flex-grow instead
        if (column.width === 'fill') {
            return null;
        }
        // no width provided → default fixed width
        return this._defaultColumnWidth;
    }
    getColumnFlex(column) {
        const px = this.getColumnWidth(column);
        // fixed width (explicit or default)
        if (px != null) {
            return `0 0 ${px}px`;
        }
        // fill: flex-grow
        return '1 1 0';
    }
    setColumnWidth(column, width) {
        if (!column)
            return;
        this._columnWidths.set(column, width);
    }
    /* ------- frozen column helpers (simple "freeze" block) ------- */
    /** index of last frozen column, or -1 if none */
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
        if (endIndex < 0)
            return false;
        const idx = this.columns.indexOf(column);
        if (idx === -1)
            return false;
        return idx <= endIndex;
    }
    /**
     * Computes sticky left offset for frozen columns.
     * Freeze block always starts from first data column.
     * We also offset by:
     * - selection column width (if selectionMode && not tree+multiple)
     * - tree column width (if treeEnabled)
     * - expand column width (if hasExpandableRow)
     * - number column width (if showNumberColumnEffective)
     */
    getColumnStickyLeft(column) {
        if (!this.isColumnFrozen(column))
            return null;
        const endIndex = this._getFrozenEndIndex();
        if (endIndex < 0)
            return null;
        const idx = this.columns.indexOf(column);
        if (idx === -1 || idx > endIndex)
            return null;
        let left = 0;
        left += this._getSpecialColumnsLeftOffset();
        for (let i = 0; i < idx; i++) {
            const col = this.columns[i];
            if (!this.isColumnFrozen(col)) {
                continue;
            }
            const w = this.getColumnWidth(col);
            if (w == null)
                return null; // unsafe: mixed "fill" in frozen area
            left += w;
        }
        return left;
    }
    /**
     * Sticky left offsets for special columns (selection/tree/expand/number),
     * in the same order we render them.
     */
    _getSpecialColumnsLeftOffset(options) {
        const includeSelection = options?.includeSelection ?? true;
        const includeTree = options?.includeTree ?? true;
        const includeExpand = options?.includeExpand ?? true;
        const includeNumber = options?.includeNumber ?? true;
        let left = 0;
        const hasSelectionColumn = !!this.selectionMode && !(this.treeEnabled && this.selectionMode === 'multiple');
        if (includeSelection && hasSelectionColumn) {
            left += this.selectionColumnWidth;
        }
        if (includeTree && this.treeEnabled) {
            left += this.treeColumnWidth;
        }
        if (includeExpand && this.hasExpandableRow) {
            left += this.expandColumnWidth;
        }
        if (includeNumber && this.showNumberColumnEffective) {
            const numWidth = this.getColumnWidth(this.numberColumn);
            if (numWidth != null)
                left += numWidth;
        }
        return left;
    }
    /** Left for tree column (after selection, before tree) */
    getStickyLeftForTreeColumn() {
        // tree is after selection only
        return this._getSpecialColumnsLeftOffset({
            includeSelection: true,
            includeTree: false,
            includeExpand: false,
            includeNumber: false,
        });
    }
    /** Left for expand column (after selection + tree) */
    getStickyLeftForExpandColumn() {
        return this._getSpecialColumnsLeftOffset({
            includeSelection: true,
            includeTree: true,
            includeExpand: false,
            includeNumber: false,
        });
    }
    /** Left for number column (after selection + tree + expand) */
    getStickyLeftForNumberColumn() {
        return this._getSpecialColumnsLeftOffset({
            includeSelection: true,
            includeTree: true,
            includeExpand: true,
            includeNumber: false,
        });
    }
    /* ------- paginator proxies ------- */
    get hasPagination() {
        // For now, tree view is not paginated to avoid splitting branches.
        if (this.treeEnabled)
            return false;
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
        if (!(this.dataSource instanceof IGridDataSource))
            return;
        this.dataSource.paginator = {
            pageIndex: event.pageIndex,
            pageSize: event.pageSize,
        };
    }
    /* ------- lifecycle ------- */
    ngAfterContentInit() {
        this._rebuildColumns();
        this.columnDefs.changes.subscribe(() => this._rebuildColumns());
        this.customColumnDefs.changes.subscribe(() => this._rebuildColumns());
        // if expandable row template changes, we should reconcile expanded state with data
        // (this is rare; but safe)
        // NOTE: ContentChild doesn't expose changes easily, so we just reconcile on connect updates.
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
            // re-connect when tree mode or children key changes
            this._connectData();
        }
        if ('treeInitialExpandLevel' in changes &&
            !changes['treeInitialExpandLevel'].firstChange &&
            this.treeEnabled) {
            // Rebuild tree meta & expansion based on new level
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
        this.sortStates = sort.map((s) => ({
            active: s.active,
            direction: s.direction,
        }));
    }
    _rebuildColumns(fromDataChange = false) {
        const projectedDataCols = this.columnDefs?.toArray?.() ?? [];
        const customCols = this.customColumnDefs?.toArray?.() ?? [];
        let dataCols = [];
        if (projectedDataCols.length > 0) {
            // manual data columns
            dataCols = projectedDataCols;
        }
        else {
            // auto mode: build from data shape
            if (fromDataChange || !this.columns.length) {
                dataCols = this._buildAutoColumnsFromData();
            }
            else {
                // keep existing data columns (non-custom) if we already had them
                dataCols = this.columns.filter((c) => !(c instanceof IGridCustomColumn));
            }
        }
        this.columns = [...dataCols, ...customCols];
        // initial width from numeric [width] or default, only if not yet set
        this.columns.forEach((col) => {
            if (!this._columnWidths.has(col)) {
                const px = this.getColumnWidth(col);
                if (px != null) {
                    this._columnWidths.set(col, px);
                }
            }
        });
        // init number column width as well (if used)
        if (this.showNumberColumnEffective) {
            const numCol = this.numberColumn;
            if (!this._columnWidths.has(numCol)) {
                const px = this.getColumnWidth(numCol);
                if (px != null) {
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
        if (first == null || typeof first !== 'object') {
            return [];
        }
        const keys = Object.keys(first);
        const cols = keys.map((key) => ({
            fieldName: key,
            title: key,
            sortable: true,
            resizable: true,
            width: 'fill', // flex-fill
            freeze: false,
            headerDef: undefined,
            cellDef: undefined,
            isAuto: true,
        }));
        return cols;
    }
    _updateCurrentFilterText() {
        if (this.dataSource instanceof IGridDataSource) {
            this.currentFilterText = this.dataSource.filter;
        }
        else {
            this.currentFilterText = '';
        }
    }
    _connectData() {
        this._dataSub?.unsubscribe();
        // ---- TREE MODE: supports both IGridDataSource<T> and T[] ----
        if (this.treeEnabled) {
            // IGridDataSource<T> → subscribe to rendered roots
            if (this.dataSource instanceof IGridDataSource) {
                this._dataSub = this.dataSource.connect().subscribe((data) => {
                    const roots = data || [];
                    this._buildTreeMeta(roots);
                    this._rebuildTreeRendered(); // also updates filter text + reconciles selection/expanded
                    this._rebuildColumns(true);
                });
                return;
            }
            // Plain array → treat as roots
            if (Array.isArray(this.dataSource)) {
                const roots = this.dataSource;
                this._buildTreeMeta(roots);
                this._rebuildTreeRendered(); // also updates filter text + reconciles selection/expanded
                this._rebuildColumns(true);
                return;
            }
            // Fallback
            this.renderedData = [];
            this._reconcileSelectionWithData();
            this._reconcileExpandedWithData();
            this._rebuildColumns(true);
            this._updateCurrentFilterText();
            return;
        }
        // ---- NORMAL (flat) MODE: original behavior ----
        if (this.dataSource instanceof IGridDataSource) {
            this._dataSub = this.dataSource.connect().subscribe((data) => {
                this.renderedData = data || [];
                this._reconcileSelectionWithData();
                this._reconcileExpandedWithData();
                // auto-columns: rebuild when data shape changes and no manual columns
                this._rebuildColumns(true);
                this._updateCurrentFilterText();
            });
            return;
        }
        if (Array.isArray(this.dataSource)) {
            this.renderedData = this.dataSource;
            this._reconcileSelectionWithData();
            this._reconcileExpandedWithData();
            // auto-columns: rebuild when data shape changes and no manual columns
            this._rebuildColumns(true);
            this._updateCurrentFilterText();
            return;
        }
        this.renderedData = [];
        this._reconcileSelectionWithData();
        this._reconcileExpandedWithData();
        this._rebuildColumns(true);
        this._updateCurrentFilterText();
    }
    /* ------- row click ------- */
    onRowClicked(row) {
        this.rowClick.emit(row);
        if (!this.selectionMode)
            return;
        if (this.selectionMode === 'single') {
            this._selectSingle(row);
        }
        else {
            if (this.treeEnabled) {
                // delegate to tree-aware selection
                this.onRowSelectionToggle(row);
            }
            else {
                this._toggleMultiple(row);
            }
        }
    }
    /* ------- template helpers ------- */
    get singleSelectionName() {
        return `i-grid-radio-${this._id}`;
    }
    /**
     * Returns global row number (1-based).
     * - If paginated, continues across pages.
     * - Otherwise, 1..renderedData.length.
     */
    getRowNumber(visibleRowIndex) {
        if (this.dataSource instanceof IGridDataSource && this.hasPagination) {
            return this.pageIndex * this.pageSize + visibleRowIndex + 1;
        }
        return visibleRowIndex + 1;
    }
    /**
     * Returns z-index for a frozen column.
     * Leftmost frozen column gets highest z-index so its right edge (resize handle)
     * is always on top of the next column.
     */
    getFrozenColumnZ(column) {
        const endIndex = this._getFrozenEndIndex();
        if (endIndex < 0)
            return 2;
        const idx = this.columns.indexOf(column);
        if (idx === -1)
            return 2;
        const base = 20;
        return base + (endIndex - idx);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IGrid, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.15", type: IGrid, isStandalone: true, selector: "i-grid", inputs: { dataSource: "dataSource", selectionMode: "selectionMode", stickyHeader: "stickyHeader", stickyHeaderOffset: "stickyHeaderOffset", bodyHeight: "bodyHeight", bodyMaxHeight: "bodyMaxHeight", tree: "tree", treeIndent: "treeIndent", treeInitialExpandLevel: "treeInitialExpandLevel", showNumberColumn: ["showNumberColumn", "showNumberColumn", booleanAttribute] }, outputs: { selectionChange: "selectionChange", rowClick: "rowClick", rowExpandChange: "rowExpandChange", expandedRowsChange: "expandedRowsChange" }, host: { attributes: { "role": "table" }, properties: { "class.i-grid--sticky-header": "this.stickyHeaderClass", "style.--i-grid-sticky-top": "this.stickyTopVar" }, classAttribute: "i-grid" }, queries: [{ propertyName: "expandableRowDef", first: true, predicate: IGridRowDefDirective, descendants: true }, { propertyName: "columnDefs", predicate: IGridColumn }, { propertyName: "customColumnDefs", predicate: IGridCustomColumn }], exportAs: ["iGrid"], usesOnChanges: true, ngImport: i0, template: `<div
      class="i-grid-viewport"
      [style.height.px]="bodyHeight || null"
      [style.max-height.px]="bodyMaxHeight || null"
    >
      <!-- HEADER -->
      @if (columns.length) {
      <i-grid-header-row>
        <!-- Selection header column:
           - Shown normally for flat grid / single selection
           - Hidden for tree + multiple (tree has its own column)
      -->
        @if (selectionMode && !(treeEnabled && selectionMode === 'multiple')) {
        <i-grid-header-cell
          class="i-grid-selection-cell i-grid-selection-cell--header i-grid-header-cell--frozen"
          [fixedWidth]="selectionColumnWidth"
          [style.position]="'sticky'"
          [style.left.px]="0"
        >
          @if (selectionMode === 'multiple') {
          <input
            type="checkbox"
            [checked]="allVisibleSelected"
            [indeterminate]="someVisibleSelected"
            (click)="$event.stopPropagation()"
            (change)="onToggleAllVisible()"
          />
          }
        </i-grid-header-cell>
        }

        <!-- Tree control header column (toggler/checkbox lives here, not in data column) -->
        @if (treeEnabled) {
        <i-grid-header-cell
          class="i-grid-tree-cell i-grid-tree-cell--header i-grid-header-cell--frozen"
          [fixedWidth]="treeColumnWidth"
          [style.position]="'sticky'"
          [style.left.px]="getStickyLeftForTreeColumn()"
        >
          @if (selectionMode === 'multiple') {
          <input
            type="checkbox"
            class="i-grid-tree-header-checkbox"
            [checked]="allVisibleSelected"
            [indeterminate]="someVisibleSelected"
            (click)="$event.stopPropagation()"
            (change)="onToggleAllVisible()"
          />
          }
        </i-grid-header-cell>
        }

        <!-- Expand control header column -->
        @if (hasExpandableRow) {
        <i-grid-header-cell
          class="i-grid-expand-cell i-grid-expand-cell--header i-grid-header-cell--frozen"
          [fixedWidth]="expandColumnWidth"
          [style.position]="'sticky'"
          [style.left.px]="getStickyLeftForExpandColumn()"
        >
        </i-grid-header-cell>
        } @if (showNumberColumnEffective) {
        <i-grid-header-cell
          class="i-grid-number-cell i-grid-number-cell--header"
          [column]="numberColumn"
          [style.position]="hasFrozenColumns ? 'sticky' : null"
          [style.left.px]="hasFrozenColumns ? getStickyLeftForNumberColumn() : null"
        >
          {{ numberColumn.title }}
        </i-grid-header-cell>
        } @for (col of columns; track col; let colIndex = $index) { @if (col.headerDef; as tmpl) {
        <!-- Custom header: user owns the <i-grid-header-cell> inside -->
        <ng-container [ngTemplateOutlet]="tmpl"></ng-container>
        } @else {
        <!-- Default header -->
        <i-grid-header-cell [column]="col" [class.i-grid-header-cell--auto]="col.isAuto">
          {{ col.title || col.fieldName }}
        </i-grid-header-cell>
        } }
      </i-grid-header-row>
      }

      <!-- ROWS -->
      @for (row of renderedData; track rowIndex; let rowIndex = $index) {
      <i-grid-row (click)="onRowClicked(row)" [class.i-grid-selection-row]="!!selectionMode">
        <!-- Selection column:
           - Only when not in tree + multiple mode
           - In tree + multiple, checkbox is in the tree column
      -->
        @if (selectionMode && !(treeEnabled && selectionMode === 'multiple')) {
        <i-grid-cell
          class="i-grid-selection-cell i-grid-selection-cell--body"
          [fixedWidth]="selectionColumnWidth"
          (click)="$event.stopPropagation()"
          [style.position]="'sticky'"
          [style.left.px]="0"
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
            [name]="singleSelectionName"
            [checked]="isRowSelected(row)"
            (change)="onRowSelectionToggle(row)"
          />
          }
        </i-grid-cell>
        }

        <!-- Tree control column -->
        @if (treeEnabled) {
        <i-grid-cell
          class="i-grid-tree-cell i-grid-tree-cell--body"
          [fixedWidth]="treeColumnWidth"
          (click)="$event.stopPropagation()"
          [style.position]="'sticky'"
          [style.left.px]="getStickyLeftForTreeColumn()"
        >
          <span
            class="i-grid-tree-cell__content"
            [style.padding-left.px]="8 + getRowLevel(row) * treeIndent"
          >
            @if (hasChildren(row)) {
            <i-button
              class="i-grid-tree-toggle"
              size="2xs"
              variant="outline"
              [icon]="isExpanded(row) ? 'down' : 'next'"
              (onClick)="onTreeToggle(row, $event)"
            >
            </i-button>
            } @else {
            <span class="i-grid-tree-spacer"></span>
            } @if (selectionMode === 'multiple') {
            <input
              type="checkbox"
              class="i-grid-tree-checkbox"
              [checked]="getRowChecked(row)"
              [indeterminate]="getRowIndeterminate(row)"
              (click)="$event.stopPropagation()"
              (change)="onRowSelectionToggle(row)"
            />
            }
          </span>
        </i-grid-cell>
        }

        <!-- Expand control column -->
        @if (hasExpandableRow) {
        <i-grid-cell
          class="i-grid-expand-cell i-grid-expand-cell--body"
          [fixedWidth]="expandColumnWidth"
          (click)="$event.stopPropagation()"
          [style.position]="'sticky'"
          [style.left.px]="getStickyLeftForExpandColumn()"
        >
          <span class="i-grid-expand-cell__content">
            <i-button
              class="i-grid-expand-toggle"
              size="2xs"
              variant="outline"
              [icon]="isRowExpanded(row) ? 'down' : 'next'"
              (onClick)="onExpandToggle(row, $event)"
            >
            </i-button>
          </span>
        </i-grid-cell>
        } @if (showNumberColumnEffective) {
        <i-grid-cell
          class="i-grid-number-cell i-grid-number-cell--body"
          [column]="numberColumn"
          (click)="$event.stopPropagation()"
          [style.position]="hasFrozenColumns ? 'sticky' : null"
          [style.left.px]="hasFrozenColumns ? getStickyLeftForNumberColumn() : null"
        >
          <span class="i-grid-cell__content">
            {{ getRowNumber(rowIndex) }}
          </span>
        </i-grid-cell>
        } @for (col of columns; track col; let colIndex = $index) { @if (col.cellDef; as tmpl) {
        <!-- Custom cell: template root should be <i-grid-cell> -->
        <ng-container
          [ngTemplateOutlet]="tmpl"
          [ngTemplateOutletContext]="{
                  $implicit: row,
                  row: row,
                  index: rowIndex,
                  column: col,
                }"
        >
        </ng-container>
        } @else {
        <!-- Default cell: show highlighted row[fieldName] (for data-backed columns) -->
        <i-grid-cell [column]="col" [class.i-grid-cell--auto]="col.isAuto">
          <span
            class="i-grid-cell__content"
            [innerHTML]="
              col.fieldName ? ($any(row)[col.fieldName] | highlightSearch : currentFilterText) : ''
            "
          >
          </span>
        </i-grid-cell>
        } }
      </i-grid-row>

      <!-- DETAIL ROW -->
      @if (hasExpandableRow && isRowExpanded(row)) {
      <div class="i-grid-row i-grid-row--detail" role="row">
        <div class="i-grid-cell i-grid-cell--detail" role="cell">
          <ng-container
            [ngTemplateOutlet]="expandableRowDef!.template"
            [ngTemplateOutletContext]="{ $implicit: row, row: row, index: rowIndex }"
          >
          </ng-container>
        </div>
      </div>
      } }
    </div>

    @if (hasPagination) {
    <div class="i-grid-footer">
      <i-paginator
        [length]="totalLength"
        [pageIndex]="pageIndex"
        [pageSize]="pageSize"
        [pageSizeOptions]="pageSizeOptions"
        (pageChange)="onPageChange($event)"
      >
      </i-paginator>
    </div>
    }`, isInline: true, dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: IGridHeaderRowDirective, selector: "i-grid-header-row" }, { kind: "directive", type: IGridRowDirective, selector: "i-grid-row" }, { kind: "component", type: IGridHeaderCell, selector: "i-grid-header-cell", inputs: ["column", "fixedWidth"] }, { kind: "component", type: IGridCell, selector: "i-grid-cell", inputs: ["column", "fixedWidth"] }, { kind: "component", type: IPaginator, selector: "i-paginator", inputs: ["length", "pageIndex", "pageSize", "pageSizeOptions"], outputs: ["pageChange"] }, { kind: "component", type: IButton, selector: "i-button", inputs: ["disabled", "loading", "type", "loadingText", "variant", "size", "icon"], outputs: ["onClick"] }, { kind: "pipe", type: IHighlightSearchPipe, name: "highlightSearch" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IGrid, decorators: [{
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
                        IGridRowDefDirective,
                        IGridExpandableRow,
                    ],
                    template: `<div
      class="i-grid-viewport"
      [style.height.px]="bodyHeight || null"
      [style.max-height.px]="bodyMaxHeight || null"
    >
      <!-- HEADER -->
      @if (columns.length) {
      <i-grid-header-row>
        <!-- Selection header column:
           - Shown normally for flat grid / single selection
           - Hidden for tree + multiple (tree has its own column)
      -->
        @if (selectionMode && !(treeEnabled && selectionMode === 'multiple')) {
        <i-grid-header-cell
          class="i-grid-selection-cell i-grid-selection-cell--header i-grid-header-cell--frozen"
          [fixedWidth]="selectionColumnWidth"
          [style.position]="'sticky'"
          [style.left.px]="0"
        >
          @if (selectionMode === 'multiple') {
          <input
            type="checkbox"
            [checked]="allVisibleSelected"
            [indeterminate]="someVisibleSelected"
            (click)="$event.stopPropagation()"
            (change)="onToggleAllVisible()"
          />
          }
        </i-grid-header-cell>
        }

        <!-- Tree control header column (toggler/checkbox lives here, not in data column) -->
        @if (treeEnabled) {
        <i-grid-header-cell
          class="i-grid-tree-cell i-grid-tree-cell--header i-grid-header-cell--frozen"
          [fixedWidth]="treeColumnWidth"
          [style.position]="'sticky'"
          [style.left.px]="getStickyLeftForTreeColumn()"
        >
          @if (selectionMode === 'multiple') {
          <input
            type="checkbox"
            class="i-grid-tree-header-checkbox"
            [checked]="allVisibleSelected"
            [indeterminate]="someVisibleSelected"
            (click)="$event.stopPropagation()"
            (change)="onToggleAllVisible()"
          />
          }
        </i-grid-header-cell>
        }

        <!-- Expand control header column -->
        @if (hasExpandableRow) {
        <i-grid-header-cell
          class="i-grid-expand-cell i-grid-expand-cell--header i-grid-header-cell--frozen"
          [fixedWidth]="expandColumnWidth"
          [style.position]="'sticky'"
          [style.left.px]="getStickyLeftForExpandColumn()"
        >
        </i-grid-header-cell>
        } @if (showNumberColumnEffective) {
        <i-grid-header-cell
          class="i-grid-number-cell i-grid-number-cell--header"
          [column]="numberColumn"
          [style.position]="hasFrozenColumns ? 'sticky' : null"
          [style.left.px]="hasFrozenColumns ? getStickyLeftForNumberColumn() : null"
        >
          {{ numberColumn.title }}
        </i-grid-header-cell>
        } @for (col of columns; track col; let colIndex = $index) { @if (col.headerDef; as tmpl) {
        <!-- Custom header: user owns the <i-grid-header-cell> inside -->
        <ng-container [ngTemplateOutlet]="tmpl"></ng-container>
        } @else {
        <!-- Default header -->
        <i-grid-header-cell [column]="col" [class.i-grid-header-cell--auto]="col.isAuto">
          {{ col.title || col.fieldName }}
        </i-grid-header-cell>
        } }
      </i-grid-header-row>
      }

      <!-- ROWS -->
      @for (row of renderedData; track rowIndex; let rowIndex = $index) {
      <i-grid-row (click)="onRowClicked(row)" [class.i-grid-selection-row]="!!selectionMode">
        <!-- Selection column:
           - Only when not in tree + multiple mode
           - In tree + multiple, checkbox is in the tree column
      -->
        @if (selectionMode && !(treeEnabled && selectionMode === 'multiple')) {
        <i-grid-cell
          class="i-grid-selection-cell i-grid-selection-cell--body"
          [fixedWidth]="selectionColumnWidth"
          (click)="$event.stopPropagation()"
          [style.position]="'sticky'"
          [style.left.px]="0"
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
            [name]="singleSelectionName"
            [checked]="isRowSelected(row)"
            (change)="onRowSelectionToggle(row)"
          />
          }
        </i-grid-cell>
        }

        <!-- Tree control column -->
        @if (treeEnabled) {
        <i-grid-cell
          class="i-grid-tree-cell i-grid-tree-cell--body"
          [fixedWidth]="treeColumnWidth"
          (click)="$event.stopPropagation()"
          [style.position]="'sticky'"
          [style.left.px]="getStickyLeftForTreeColumn()"
        >
          <span
            class="i-grid-tree-cell__content"
            [style.padding-left.px]="8 + getRowLevel(row) * treeIndent"
          >
            @if (hasChildren(row)) {
            <i-button
              class="i-grid-tree-toggle"
              size="2xs"
              variant="outline"
              [icon]="isExpanded(row) ? 'down' : 'next'"
              (onClick)="onTreeToggle(row, $event)"
            >
            </i-button>
            } @else {
            <span class="i-grid-tree-spacer"></span>
            } @if (selectionMode === 'multiple') {
            <input
              type="checkbox"
              class="i-grid-tree-checkbox"
              [checked]="getRowChecked(row)"
              [indeterminate]="getRowIndeterminate(row)"
              (click)="$event.stopPropagation()"
              (change)="onRowSelectionToggle(row)"
            />
            }
          </span>
        </i-grid-cell>
        }

        <!-- Expand control column -->
        @if (hasExpandableRow) {
        <i-grid-cell
          class="i-grid-expand-cell i-grid-expand-cell--body"
          [fixedWidth]="expandColumnWidth"
          (click)="$event.stopPropagation()"
          [style.position]="'sticky'"
          [style.left.px]="getStickyLeftForExpandColumn()"
        >
          <span class="i-grid-expand-cell__content">
            <i-button
              class="i-grid-expand-toggle"
              size="2xs"
              variant="outline"
              [icon]="isRowExpanded(row) ? 'down' : 'next'"
              (onClick)="onExpandToggle(row, $event)"
            >
            </i-button>
          </span>
        </i-grid-cell>
        } @if (showNumberColumnEffective) {
        <i-grid-cell
          class="i-grid-number-cell i-grid-number-cell--body"
          [column]="numberColumn"
          (click)="$event.stopPropagation()"
          [style.position]="hasFrozenColumns ? 'sticky' : null"
          [style.left.px]="hasFrozenColumns ? getStickyLeftForNumberColumn() : null"
        >
          <span class="i-grid-cell__content">
            {{ getRowNumber(rowIndex) }}
          </span>
        </i-grid-cell>
        } @for (col of columns; track col; let colIndex = $index) { @if (col.cellDef; as tmpl) {
        <!-- Custom cell: template root should be <i-grid-cell> -->
        <ng-container
          [ngTemplateOutlet]="tmpl"
          [ngTemplateOutletContext]="{
                  $implicit: row,
                  row: row,
                  index: rowIndex,
                  column: col,
                }"
        >
        </ng-container>
        } @else {
        <!-- Default cell: show highlighted row[fieldName] (for data-backed columns) -->
        <i-grid-cell [column]="col" [class.i-grid-cell--auto]="col.isAuto">
          <span
            class="i-grid-cell__content"
            [innerHTML]="
              col.fieldName ? ($any(row)[col.fieldName] | highlightSearch : currentFilterText) : ''
            "
          >
          </span>
        </i-grid-cell>
        } }
      </i-grid-row>

      <!-- DETAIL ROW -->
      @if (hasExpandableRow && isRowExpanded(row)) {
      <div class="i-grid-row i-grid-row--detail" role="row">
        <div class="i-grid-cell i-grid-cell--detail" role="cell">
          <ng-container
            [ngTemplateOutlet]="expandableRowDef!.template"
            [ngTemplateOutletContext]="{ $implicit: row, row: row, index: rowIndex }"
          >
          </ng-container>
        </div>
      </div>
      } }
    </div>

    @if (hasPagination) {
    <div class="i-grid-footer">
      <i-paginator
        [length]="totalLength"
        [pageIndex]="pageIndex"
        [pageSize]="pageSize"
        [pageSizeOptions]="pageSizeOptions"
        (pageChange)="onPageChange($event)"
      >
      </i-paginator>
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
            }], stickyHeader: [{
                type: Input
            }], stickyHeaderOffset: [{
                type: Input
            }], bodyHeight: [{
                type: Input
            }], bodyMaxHeight: [{
                type: Input
            }], tree: [{
                type: Input
            }], treeIndent: [{
                type: Input
            }], treeInitialExpandLevel: [{
                type: Input
            }], showNumberColumn: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], selectionChange: [{
                type: Output
            }], rowClick: [{
                type: Output
            }], rowExpandChange: [{
                type: Output
            }], expandedRowsChange: [{
                type: Output
            }], columnDefs: [{
                type: ContentChildren,
                args: [IGridColumn]
            }], customColumnDefs: [{
                type: ContentChildren,
                args: [IGridCustomColumn]
            }], expandableRowDef: [{
                type: ContentChild,
                args: [IGridRowDefDirective]
            }], stickyHeaderClass: [{
                type: HostBinding,
                args: ['class.i-grid--sticky-header']
            }], stickyTopVar: [{
                type: HostBinding,
                args: ['style.--i-grid-sticky-top']
            }] } });
/* ----------------------------------------------------
 * EXPORT GROUP
 * ---------------------------------------------------- */
const I_GRID_DECLARATIONS = [
    IGrid,
    IGridColumn,
    IGridCustomColumn,
    IGridHeaderCellDefDirective,
    IGridCellDefDirective,
    IGridRowDefDirective,
    IGridExpandableRow,
    IGridHeaderCell,
    IGridCell,
    IGridHeaderRowDirective,
    IGridRowDirective,
];
class IGridModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IGridModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.15", ngImport: i0, type: IGridModule, imports: [IGrid, IGridColumn, IGridCustomColumn, IGridHeaderCellDefDirective, IGridCellDefDirective, IGridRowDefDirective, IGridExpandableRow, IGridHeaderCell, IGridCell, IGridHeaderRowDirective, IGridRowDirective, IPaginator], exports: [IGrid, IGridColumn, IGridCustomColumn, IGridHeaderCellDefDirective, IGridCellDefDirective, IGridRowDefDirective, IGridExpandableRow, IGridHeaderCell, IGridCell, IGridHeaderRowDirective, IGridRowDirective, IPaginator] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IGridModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IGridModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        IGrid,
                        IGridColumn,
                        IGridCustomColumn,
                        IGridHeaderCellDefDirective,
                        IGridCellDefDirective,
                        IGridRowDefDirective,
                        IGridExpandableRow,
                        IGridHeaderCell,
                        IGridCell,
                        IGridHeaderRowDirective,
                        IGridRowDirective,
                        IPaginator,
                    ],
                    exports: [
                        IGrid,
                        IGridColumn,
                        IGridCustomColumn,
                        IGridHeaderCellDefDirective,
                        IGridCellDefDirective,
                        IGridRowDefDirective,
                        IGridExpandableRow,
                        IGridHeaderCell,
                        IGridCell,
                        IGridHeaderRowDirective,
                        IGridRowDirective,
                        IPaginator,
                    ],
                }]
        }] });

class IHContent {
    router = inject(Router);
    activatedRoute = inject(ActivatedRoute);
    sidebarVisibility = true;
    onSidebarToggled = new EventEmitter();
    /** Stream of breadcrumb items built from the activated route tree */
    breadcrumb$ = this.router.events.pipe(filter((e) => e instanceof NavigationEnd), startWith(null), // emit once on init
    map(() => this.buildBreadcrumb(this.activatedRoute.root)), shareReplay(1));
    /** Last breadcrumb label = current page title */
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IHContent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.15", type: IHContent, isStandalone: true, selector: "ih-content", outputs: { onSidebarToggled: "onSidebarToggled" }, ngImport: i0, template: "<div class=\"ih-content-header\">\n  <a class=\"i-clickable\" (click)=\"toggleSidebar()\">\n    @if (sidebarVisibility) {\n      <img src=\"svgs/sidebar-left.svg\" />\n    } @else {\n      <img src=\"svgs/sidebar-right.svg\" />\n    }\n  </a>\n  <h1>{{ (pageTitle$ | async) || 'Insight' }}</h1>\n</div>\n<div class=\"ih-content-breadcrumbs\">\n  @if (breadcrumb$ | async; as breadcrumbs) {\n    @if (breadcrumbs.length > 0) {\n      @for (\n        breadcrumb of breadcrumbs;\n        track breadcrumb.url;\n        let first = $first;\n        let last = $last\n      ) {\n        @if (!last) {\n          @if (!first) {\n            <a\n              [routerLink]=\"breadcrumb.url\"\n              class=\"ih-content-breadcrumb ih-content-breadcrumb__link\">\n              {{ breadcrumb.label }}\n            </a>\n          } @else {\n            <span class=\"ih-content-breadcrumb ih-content-breadcrumb__first\">\n              {{ breadcrumb.label }}\n            </span>\n          }\n          <span class=\"ih-content-breadcrumb ih-content-breadcrumb__separator\"\n            >></span\n          >\n        } @else {\n          <span class=\"ih-content-breadcrumb ih-content-breadcrumb__current\">\n            {{ breadcrumb.label }}\n          </span>\n        }\n      }\n    } @else {\n      <span class=\"ih-content-breadcrumb ih-content-breadcrumb__first\">\n        Home\n      </span>\n    }\n  }\n</div>\n<div class=\"ih-content-body scroll scroll-y\">\n  <router-outlet />\n</div>\n", dependencies: [{ kind: "directive", type: RouterOutlet, selector: "router-outlet", inputs: ["name", "routerOutletData"], outputs: ["activate", "deactivate", "attach", "detach"], exportAs: ["outlet"] }, { kind: "directive", type: RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: AsyncPipe, name: "async" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IHContent, decorators: [{
            type: Component,
            args: [{ selector: 'ih-content', imports: [RouterOutlet, AsyncPipe, RouterLink], template: "<div class=\"ih-content-header\">\n  <a class=\"i-clickable\" (click)=\"toggleSidebar()\">\n    @if (sidebarVisibility) {\n      <img src=\"svgs/sidebar-left.svg\" />\n    } @else {\n      <img src=\"svgs/sidebar-right.svg\" />\n    }\n  </a>\n  <h1>{{ (pageTitle$ | async) || 'Insight' }}</h1>\n</div>\n<div class=\"ih-content-breadcrumbs\">\n  @if (breadcrumb$ | async; as breadcrumbs) {\n    @if (breadcrumbs.length > 0) {\n      @for (\n        breadcrumb of breadcrumbs;\n        track breadcrumb.url;\n        let first = $first;\n        let last = $last\n      ) {\n        @if (!last) {\n          @if (!first) {\n            <a\n              [routerLink]=\"breadcrumb.url\"\n              class=\"ih-content-breadcrumb ih-content-breadcrumb__link\">\n              {{ breadcrumb.label }}\n            </a>\n          } @else {\n            <span class=\"ih-content-breadcrumb ih-content-breadcrumb__first\">\n              {{ breadcrumb.label }}\n            </span>\n          }\n          <span class=\"ih-content-breadcrumb ih-content-breadcrumb__separator\"\n            >></span\n          >\n        } @else {\n          <span class=\"ih-content-breadcrumb ih-content-breadcrumb__current\">\n            {{ breadcrumb.label }}\n          </span>\n        }\n      }\n    } @else {\n      <span class=\"ih-content-breadcrumb ih-content-breadcrumb__first\">\n        Home\n      </span>\n    }\n  }\n</div>\n<div class=\"ih-content-body scroll scroll-y\">\n  <router-outlet />\n</div>\n" }]
        }], propDecorators: { onSidebarToggled: [{
                type: Output
            }] } });

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
class ISection {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ISection, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.15", type: ISection, isStandalone: true, selector: "i-section", ngImport: i0, template: `<ng-content />`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ISection, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-section',
                    imports: [],
                    template: `<ng-content />`,
                }]
        }] });
class ISectionHeader {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ISectionHeader, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.15", type: ISectionHeader, isStandalone: true, selector: "i-section-header", ngImport: i0, template: `<h4><ng-content /></h4>`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ISectionHeader, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-section-header',
                    imports: [],
                    template: `<h4><ng-content /></h4>`,
                }]
        }] });
class ISectionSubHeader {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ISectionSubHeader, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.15", type: ISectionSubHeader, isStandalone: true, selector: "i-section-sub-header", ngImport: i0, template: `<h6><ng-content /></h6>`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ISectionSubHeader, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-section-sub-header',
                    imports: [],
                    template: `<h6><ng-content /></h6>`,
                }]
        }] });
class ISectionFilter {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ISectionFilter, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.15", type: ISectionFilter, isStandalone: true, selector: "i-section-filter", ngImport: i0, template: `<ng-content />`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ISectionFilter, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-section-filter',
                    imports: [],
                    template: `<ng-content />`,
                }]
        }] });
class ISectionBody {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ISectionBody, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.15", type: ISectionBody, isStandalone: true, selector: "i-section-body", ngImport: i0, template: `<ng-content />`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ISectionBody, decorators: [{
            type: Component,
            args: [{
                    selector: 'i-section-body',
                    imports: [],
                    template: `<ng-content />`,
                }]
        }] });
class ISectionFooter {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ISectionFooter, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.15", type: ISectionFooter, isStandalone: true, selector: "i-section-footer", ngImport: i0, template: `<ng-content />`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ISectionFooter, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ISectionTabHeader, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.15", type: ISectionTabHeader, isStandalone: true, selector: "i-section-tab-header", viewQueries: [{ propertyName: "tpl", first: true, predicate: ["tpl"], descendants: true, static: true }], ngImport: i0, template: `
    <ng-template #tpl>
      <ng-content />
    </ng-template>
  `, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ISectionTabHeader, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ISectionTabContent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.15", type: ISectionTabContent, isStandalone: true, selector: "i-section-tab-content", viewQueries: [{ propertyName: "tpl", first: true, predicate: ["tpl"], descendants: true, static: true }], ngImport: i0, template: `
    <ng-template #tpl>
      <ng-content />
    </ng-template>
  `, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ISectionTabContent, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ISectionTab, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.15", type: ISectionTab, isStandalone: true, selector: "i-section-tab", inputs: { title: "title", opened: ["opened", "opened", (v) => v !== null && `${v}` !== 'false'], badge: "badge" }, queries: [{ propertyName: "headerCmp", first: true, predicate: ISectionTabHeader, descendants: true }, { propertyName: "contentCmp", first: true, predicate: ISectionTabContent, descendants: true }], viewQueries: [{ propertyName: "defaultHeaderTpl", first: true, predicate: ["defaultHeaderTpl"], descendants: true, static: true }, { propertyName: "defaultContentTpl", first: true, predicate: ["defaultContentTpl"], descendants: true, static: true }], ngImport: i0, template: `
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ISectionTab, decorators: [{
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
            this.selectedIndexChange.emit(index);
        }
    }
    isValidIndex(index) {
        return Number.isInteger(index) && index >= 0 && index < this.tabsArr.length;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ISectionTabs, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.15", type: ISectionTabs, isStandalone: true, selector: "i-section-tabs", inputs: { selectedIndex: "selectedIndex", height: "height" }, outputs: { selectedIndexChange: "selectedIndexChange" }, queries: [{ propertyName: "tabs", predicate: ISectionTab }], ngImport: i0, template: `
    <div class="i-section-tabs-headers" role="tablist">
      @for (tab of tabsArr; track tab) {
        <button
          type="button"
          class="i-section-tabs-header"
          role="tab"
          [attr.aria-selected]="tab._active"
          [attr.tabindex]="tab._active ? 0 : -1"
          [class.active]="tab._active"
          (click)="activateByTab(tab)"
        >
          <ng-container [ngTemplateOutlet]="tab.headerTpl"></ng-container>
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
        <ng-container [ngTemplateOutlet]="tab.contentTpl"></ng-container>
      }
    </div>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ISectionTabs, decorators: [{
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
          type="button"
          class="i-section-tabs-header"
          role="tab"
          [attr.aria-selected]="tab._active"
          [attr.tabindex]="tab._active ? 0 : -1"
          [class.active]="tab._active"
          (click)="activateByTab(tab)"
        >
          <ng-container [ngTemplateOutlet]="tab.headerTpl"></ng-container>
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
        <ng-container [ngTemplateOutlet]="tab.contentTpl"></ng-container>
      }
    </div>
  `,
                }]
        }], propDecorators: { tabs: [{
                type: ContentChildren,
                args: [ISectionTab]
            }], selectedIndex: [{
                type: Input
            }], selectedIndexChange: [{
                type: Output
            }], height: [{
                type: Input
            }] } });
class ISectionModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ISectionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.15", ngImport: i0, type: ISectionModule, imports: [ISection, ISectionHeader, ISectionSubHeader, ISectionFilter, ISectionBody, ISectionFooter, ISectionTabs, ISectionTab, ISectionTabHeader, ISectionTabContent], exports: [ISection, ISectionHeader, ISectionSubHeader, ISectionFilter, ISectionBody, ISectionFooter, ISectionTabs, ISectionTab, ISectionTabHeader, ISectionTabContent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ISectionModule, imports: [ISectionTabs] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ISectionModule, decorators: [{
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

class IUI {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IUI, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.15", ngImport: i0, type: IUI, imports: [IAlert,
            IButton,
            ICardModule,
            ICodeViewerModule,
            IConfirm,
            IDatepicker,
            IFCDatepicker,
            IDialogModule,
            IGridModule,
            IIcon,
            IInputModule,
            ILoading,
            ISectionModule,
            ISelect,
            IFCSelect,
            ITextArea,
            IHContent], exports: [IAlert,
            IButton,
            ICardModule,
            ICodeViewerModule,
            IConfirm,
            IDatepicker,
            IFCDatepicker,
            IDialogModule,
            IGridModule,
            IIcon,
            IInputModule,
            ILoading,
            ISectionModule,
            ISelect,
            IFCSelect,
            ITextArea,
            IHContent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IUI, imports: [ICardModule,
            ICodeViewerModule,
            IConfirm,
            IDialogModule,
            IGridModule,
            IInputModule,
            ISectionModule, ICardModule,
            ICodeViewerModule,
            IDialogModule,
            IGridModule,
            IInputModule,
            ISectionModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: IUI, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        IAlert,
                        IButton,
                        ICardModule,
                        ICodeViewerModule,
                        IConfirm,
                        IDatepicker,
                        IFCDatepicker,
                        IDialogModule,
                        IGridModule,
                        IIcon,
                        IInputModule,
                        ILoading,
                        ISectionModule,
                        ISelect,
                        IFCSelect,
                        ITextArea,
                        IHContent,
                    ],
                    exports: [
                        IAlert,
                        IButton,
                        ICardModule,
                        ICodeViewerModule,
                        IConfirm,
                        IDatepicker,
                        IFCDatepicker,
                        IDialogModule,
                        IGridModule,
                        IIcon,
                        IInputModule,
                        ILoading,
                        ISectionModule,
                        ISelect,
                        IFCSelect,
                        ITextArea,
                        IHContent,
                    ],
                }]
        }] });

/*
 * Public API Surface of insight-ui
 */

/**
 * Generated bundle index. Do not edit.
 */

export { IAlert, IAlertService, IButton, ICard, ICardBody, ICardFooter, ICardImage, ICardModule, ICodeViewer, ICodeViewerModule, IConfirm, IConfirmService, IDatepicker, IDialog, IDialogCloseDirective, IDialogContainer, IDialogModule, IDialogOutlet, IDialogRef, IDialogService, IFCDatepicker, IFCInput, IFCSelect, IFCTextArea, IGrid, IGridCell, IGridCellDefDirective, IGridColumn, IGridCustomColumn, IGridDataSource, IGridExpandableRow, IGridHeaderCell, IGridHeaderCellDefDirective, IGridHeaderRowDirective, IGridModule, IGridRowDefDirective, IGridRowDirective, IHContent, IHighlightSearchPipe, IIcon, IInput, IInputAddon, IInputMaskDirective, IInputModule, ILoading, IPaginator, ISection, ISectionBody, ISectionFilter, ISectionFooter, ISectionHeader, ISectionModule, ISectionSubHeader, ISectionTab, ISectionTabContent, ISectionTabHeader, ISectionTabs, ISelect, ISelectOptionDefDirective, ITextArea, IUI, I_DIALOG_DATA, I_GRID_DECLARATIONS, I_ICON_NAMES, I_ICON_SIZES, isControlRequired, resolveControlErrorMessage };
//# sourceMappingURL=insight-ui.mjs.map
