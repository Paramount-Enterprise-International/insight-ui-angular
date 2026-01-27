import * as i0 from '@angular/core';
import { EventEmitter, OnInit, TemplateRef, AfterContentInit, OnDestroy, InjectionToken, Type, OnChanges, Injector, SimpleChanges, QueryList, PipeTransform, ElementRef } from '@angular/core';
import { AbstractControl, NgControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs';
import { Route } from '@angular/router';

type IFormControlErrorMessage = {
    required?: string;
    requiredTrue?: string;
    minlength?: string;
    maxlength?: string;
    pattern?: string;
    email?: string;
    min?: string;
    max?: string;
    [key: string]: string | undefined;
};
type IUISize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type IUIVariant = 'primary' | 'info' | 'warning' | 'danger' | 'success' | 'outline';

type IErrorContext = {
    label: string;
    error: any;
    control: AbstractControl | null;
};
declare function resolveControlErrorMessage(ngControl: NgControl | null, label: string | undefined, errorMessage?: IFormControlErrorMessage, extraFactories?: Record<string, (ctx: IErrorContext) => string>): string | null;
declare function isControlRequired(ngControl: NgControl | null, errorMessage?: IFormControlErrorMessage): boolean;

type IButtonType = 'button' | 'submit' | 'reset';
type IButtonSize = Extract<IUISize, '2xs' | 'xs' | 'sm' | 'md' | 'lg'>;
type IButtonVariant = Extract<IUIVariant, 'primary' | 'warning' | 'danger' | 'success' | 'outline'>;
declare class IButton {
    disabled: boolean;
    loading: boolean;
    type: IButtonType;
    loadingText: string;
    variant: IButtonVariant;
    size: IButtonSize;
    icon: string | undefined;
    /** Public click output if you want to use (onClick) */
    readonly onClick: EventEmitter<MouseEvent>;
    get tabIndex(): number;
    get ariaDisabled(): string | null;
    get ariaBusy(): string | null;
    /** Reflect variant to host: <i-button variant="primary"> */
    get hostVariant(): string;
    /** Reflect size to host: <i-button size="md"> */
    get hostSize(): string;
    handleClick(event: MouseEvent): void;
    handleKeydown(event: KeyboardEvent): void;
    private findClosestForm;
    static ɵfac: i0.ɵɵFactoryDeclaration<IButton, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IButton, "i-button", never, { "disabled": { "alias": "disabled"; "required": false; }; "loading": { "alias": "loading"; "required": false; }; "type": { "alias": "type"; "required": false; }; "loadingText": { "alias": "loadingText"; "required": false; }; "variant": { "alias": "variant"; "required": false; }; "size": { "alias": "size"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; }, { "onClick": "onClick"; }, never, ["*"], true, never>;
    static ngAcceptInputType_loading: unknown;
}

type RouterLinkInput = string | any[] | undefined;
declare class ICard implements OnInit {
    href?: string | null;
    routerLink?: RouterLinkInput;
    queryParams?: Record<string, any> | null;
    fragment?: string;
    replaceUrl: boolean;
    skipLocationChange: boolean;
    state?: Record<string, any>;
    target?: '_self' | '_blank' | '_parent' | '_top' | string;
    rel?: string | null;
    disabled: boolean;
    /** Standard event name for Angular + React parity */
    readonly onClick: EventEmitter<MouseEvent>;
    get useRouterLink(): boolean;
    ngOnInit(): void;
    get relAttr(): string | null;
    get hrefAttr(): string | null;
    handleClick(ev: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ICard, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ICard, "i-card", never, { "href": { "alias": "href"; "required": false; }; "routerLink": { "alias": "routerLink"; "required": false; }; "queryParams": { "alias": "queryParams"; "required": false; }; "fragment": { "alias": "fragment"; "required": false; }; "replaceUrl": { "alias": "replaceUrl"; "required": false; }; "skipLocationChange": { "alias": "skipLocationChange"; "required": false; }; "state": { "alias": "state"; "required": false; }; "target": { "alias": "target"; "required": false; }; "rel": { "alias": "rel"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "onClick": "onClick"; }, never, ["*"], true, never>;
}
declare class ICardImage {
    src: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ICardImage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ICardImage, "i-card-image", never, { "src": { "alias": "src"; "required": false; }; }, {}, never, never, true, never>;
}
declare class ICardBody {
    static ɵfac: i0.ɵɵFactoryDeclaration<ICardBody, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ICardBody, "i-card-body", never, {}, {}, never, ["*"], true, never>;
}
declare class ICardFooter {
    static ɵfac: i0.ɵɵFactoryDeclaration<ICardFooter, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ICardFooter, "i-card-footer", never, {}, {}, never, ["*"], true, never>;
}
declare class ICardModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ICardModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ICardModule, never, [typeof ICard, typeof ICardBody, typeof ICardFooter, typeof ICardImage], [typeof ICard, typeof ICardBody, typeof ICardFooter, typeof ICardImage]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ICardModule>;
}

type ICodeHighlighter = 'auto' | 'hljs' | 'none';
declare class ICodeViewer {
    private readonly cdr;
    private readonly http;
    private projectedTpl;
    private _languageOverride;
    set language(v: string | null | undefined);
    get language(): string | null;
    private _file;
    set file(v: string | null | undefined);
    get file(): string;
    private _code;
    set code(v: string | null | undefined);
    get code(): string;
    wrap: boolean;
    compact: boolean;
    /** default false */
    lineNumbers: boolean;
    /** overlay controls */
    overlay: boolean;
    showFileType: boolean;
    copy: boolean;
    scroll: boolean;
    private _heightPx;
    set height(v: any);
    get height(): any;
    highlighter: ICodeHighlighter;
    readonly onFileLoaded: EventEmitter<{
        file: string;
        language: string;
    }>;
    loading: boolean;
    error: string;
    renderedHtml: string;
    copied: boolean;
    lineNumberList: number[];
    private requestSeq;
    private _fileLanguage;
    private hljsPromise;
    private hljs;
    get heightPx(): number | null;
    get scrollEffective(): boolean;
    get showOverlay(): boolean;
    get effectiveLanguage(): string;
    get fileTypeLabel(): string;
    private recompute;
    private countLines;
    private readProjectedContent;
    private shouldUseHljs;
    private renderToHtmlSync;
    private maybeHighlightAsync;
    private highlightWithHljs;
    private loadHljsIfNeeded;
    private loadFile;
    onCopy(): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ICodeViewer, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ICodeViewer, "i-code-viewer", never, { "language": { "alias": "language"; "required": false; }; "file": { "alias": "file"; "required": false; }; "code": { "alias": "code"; "required": false; }; "wrap": { "alias": "wrap"; "required": false; }; "compact": { "alias": "compact"; "required": false; }; "lineNumbers": { "alias": "lineNumbers"; "required": false; }; "overlay": { "alias": "overlay"; "required": false; }; "showFileType": { "alias": "showFileType"; "required": false; }; "copy": { "alias": "copy"; "required": false; }; "scroll": { "alias": "scroll"; "required": false; }; "height": { "alias": "height"; "required": false; }; "highlighter": { "alias": "highlighter"; "required": false; }; }, { "onFileLoaded": "onFileLoaded"; }, never, ["*"], true, never>;
    static ngAcceptInputType_wrap: any;
    static ngAcceptInputType_compact: any;
    static ngAcceptInputType_lineNumbers: any;
    static ngAcceptInputType_overlay: any;
    static ngAcceptInputType_showFileType: any;
    static ngAcceptInputType_copy: any;
    static ngAcceptInputType_scroll: any;
}
declare class ICodeViewerModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ICodeViewerModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ICodeViewerModule, never, [typeof ICodeViewer], [typeof ICodeViewer]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ICodeViewerModule>;
}

type IInputAddonKind = 'icon' | 'text' | 'button' | 'link' | 'loading';
type IInputAddonType = {
    type: IInputAddonKind;
};
type IInputAddonLoading = {
    type: 'loading';
    visible?: boolean;
} & IInputAddonType;
type IInputAddonIcon = {
    type: 'icon';
    icon: string;
    visible?: boolean;
} & IInputAddonType;
type IInputAddonText = {
    type: 'text';
    text: string;
    visible?: boolean;
} & IInputAddonType;
type IInputAddonButton = {
    type: 'button';
    icon: string;
    onClick?: () => void;
    visible?: boolean;
    variant?: IButtonVariant;
} & IInputAddonType;
type IInputAddonLink = {
    type: 'link';
    icon: string;
    href?: string;
    visible?: boolean;
    variant?: IButtonVariant;
} & IInputAddonType;
type IInputAddons = IInputAddonLoading | IInputAddonIcon | IInputAddonText | IInputAddonButton | IInputAddonLink;
declare class IInputAddon {
    addon: IInputAddons | undefined;
    get addonKind(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<IInputAddon, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IInputAddon, "i-input-addon", never, { "addon": { "alias": "addon"; "required": true; }; }, {}, never, never, true, never>;
}

type ISelectOptionContext<T> = {
    $implicit: T;
    row: T;
};
declare class ISelectOptionDefDirective<T = any> {
    template: TemplateRef<ISelectOptionContext<T>>;
    set iSelectOption(_value: any);
    static ɵfac: i0.ɵɵFactoryDeclaration<ISelectOptionDefDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ISelectOptionDefDirective<any>, "[iSelectOption]", never, { "iSelectOption": { "alias": "iSelectOption"; "required": false; }; }, {}, never, never, true, never>;
}
type ISelectChange<T = any> = {
    value: T | null;
    label: string;
};
/** Position of popup options relative to the input */
type ISelectPanelPosition = 'top' | 'bottom' | 'left' | 'right' | 'top left' | 'top right' | 'bottom left' | 'bottom right';
declare class ISelect<T = any> implements ControlValueAccessor, OnInit, AfterContentInit, OnDestroy {
    placeholder: string;
    disabled: boolean;
    invalid: boolean;
    /** debounce delay (ms) for filter when typing */
    filterDelay: number;
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
    panelPosition: ISelectPanelPosition;
    /** Array options */
    set options(value: T[] | null);
    /** Observable options */
    set options$(value: Observable<T[]> | null);
    private _displayWith;
    private _displayWithExplicit;
    set displayWith(value: ((row: T | null) => string) | string | undefined);
    get displayWith(): ((row: T | null) => string) | string;
    filterPredicate: (row: T, term: string) => boolean;
    /** Non-reactive usage */
    set value(v: T | null);
    get value(): T | null;
    readonly onChanged: EventEmitter<ISelectChange<T>>;
    readonly onOptionSelected: EventEmitter<ISelectChange<T>>;
    optionDef?: ISelectOptionDefDirective<T>;
    private _rawOptions;
    filteredOptions: T[];
    private _modelValue;
    private pendingModelValue;
    private _displayText;
    get displayText(): string;
    private _filterText;
    get filterText(): string;
    isOpen: boolean;
    highlightIndex: number;
    isLoading: boolean;
    private optionsSub?;
    private filterInput$;
    private filterInputSub?;
    onChange: (_: any) => void;
    onTouched: () => void;
    /** Panel position class for CSS modifier */
    get panelPositionClass(): string;
    private readonly hostEl;
    private readonly cdr;
    private readonly zone;
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    private cleanupOptionsSub;
    writeValue(value: T | null): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    private syncModelToView;
    private applyFilter;
    get hasOptions(): boolean;
    /** true when user filtered and no options match */
    get hasNoResults(): boolean;
    /**
     * Resolve label for a given row/value.
     * (kept exactly as your working logic)
     */
    resolveDisplayText(row: T | null): string;
    private handleInputText;
    private moveHighlight;
    /**
     * behavior:
     *  - if closed → open
     *  - if open and hasNoResults → clear filter & show all (keep open)
     *  - if open and NOT hasNoResults → close & restore model text
     */
    toggleDropdown(event?: MouseEvent): void;
    private openDropdown;
    private closeDropdown;
    selectRow(row: T): void;
    clearSelection(event?: MouseEvent): void;
    isRowSelected(row: T): boolean;
    private scrollHighlightedIntoView;
    focus(): void;
    handleKeydown(event: KeyboardEvent): void;
    onHostInput(event: Event): void;
    onHostFocusOut(_event: FocusEvent): void;
    onDocumentClick(event: MouseEvent): void;
    get appendAddon(): IInputAddonButton | IInputAddonLoading;
    get hasOptionsList(): boolean;
    setActiveIndex(idx: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ISelect<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ISelect<any>, "i-select", never, { "placeholder": { "alias": "placeholder"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "invalid": { "alias": "invalid"; "required": false; }; "filterDelay": { "alias": "filterDelay"; "required": false; }; "panelPosition": { "alias": "panelPosition"; "required": false; }; "options": { "alias": "options"; "required": false; }; "options$": { "alias": "options$"; "required": false; }; "displayWith": { "alias": "displayWith"; "required": false; }; "filterPredicate": { "alias": "filterPredicate"; "required": false; }; "value": { "alias": "value"; "required": false; }; }, { "onChanged": "onChanged"; "onOptionSelected": "onOptionSelected"; }, ["optionDef"], never, true, never>;
}
/**
 * IFCSelect
 * Version: 1.1.0
 *
 * - Form control wrapper for ISelect
 * - Implements CVA so you can use formControlName on <i-fc-select>
 */
declare class IFCSelect<T = any> implements ControlValueAccessor, OnDestroy {
    innerSelect: ISelect<T>;
    label: string;
    placeholder: string;
    options: T[] | null;
    options$: Observable<T[]> | null;
    displayWith?: ((row: T | null) => string) | string;
    filterDelay: number;
    filterPredicate: (row: T, term: string) => boolean;
    panelPosition: ISelectPanelPosition;
    errorMessage?: IFormControlErrorMessage;
    get value(): T | null;
    set value(v: T | null);
    private _value;
    isDisabled: boolean;
    private onChange;
    private onTouched;
    readonly ngControl: NgControl | null;
    private readonly formDir;
    private readonly cdr;
    private submitSub?;
    constructor();
    ngOnDestroy(): void;
    writeValue(v: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    handleSelectChange(change: ISelectChange<T>): void;
    focusInnerSelect(): void;
    get controlInvalid(): boolean;
    get required(): boolean;
    get resolvedErrorText(): string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<IFCSelect<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IFCSelect<any>, "i-fc-select", never, { "label": { "alias": "label"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "options": { "alias": "options"; "required": false; }; "options$": { "alias": "options$"; "required": false; }; "displayWith": { "alias": "displayWith"; "required": false; }; "filterDelay": { "alias": "filterDelay"; "required": false; }; "filterPredicate": { "alias": "filterPredicate"; "required": false; }; "panelPosition": { "alias": "panelPosition"; "required": false; }; "errorMessage": { "alias": "errorMessage"; "required": false; }; "value": { "alias": "value"; "required": false; }; }, {}, never, ["*"], true, never>;
}

/** Internal structure for datepicker days */
type IDatepickerDay = {
    date: Date;
    inCurrentMonth: boolean;
    isToday: boolean;
    isSelected: boolean;
};
type IMonthOption = {
    value: number;
    label: string;
};
/** Position of popup panel relative to input */
type IDatepickerPanelPosition = 'top' | 'bottom' | 'left' | 'right' | 'top left' | 'top right' | 'bottom left' | 'bottom right';
declare class IDatepicker implements ControlValueAccessor, OnInit {
    private readonly hostEl;
    placeholder: string;
    disabled: boolean;
    /** visual invalid state (from i-fc-datepicker or manual) */
    invalid: boolean;
    /**
     * Display / parse format.
     * Supported tokens: yyyy, MM, dd
     */
    format: string;
    panelPosition: IDatepickerPanelPosition;
    /**
     * Allow [value]="..." when not using reactive forms.
     * Accepts Date or string, normalizes via writeValue.
     */
    set value(v: Date | string | null);
    get value(): Date | string | null;
    readonly onChanged: EventEmitter<Date | null>;
    /** Internal model value (Date | null) */
    private _modelValue;
    /** Displayed text in the input */
    private _displayText;
    get displayText(): string;
    private onChange;
    private onTouched;
    /** Is popup open */
    isOpen: boolean;
    /** Calendar view year/month (0-11) */
    viewYear: number;
    viewMonth: number;
    /** Calendar weeks (6 rows x 7 cols) */
    weeks: IDatepickerDay[][];
    /** Month options for <i-select> */
    readonly months: IMonthOption[];
    /** Static weekday labels (Mon–Sun) */
    readonly weekdays: string[];
    /** Year options for the year <i-select> */
    private _years;
    get years(): number[];
    /** Currently selected month option object for i-select */
    get monthSelected(): IMonthOption | null;
    /** Panel position class for CSS modifier */
    get panelPositionClass(): string;
    /** Always read the REAL inner <input> value, ignore event.target type */
    private getInnerInput;
    private focusInput;
    ngOnInit(): void;
    writeValue(value: Date | string | null): void;
    registerOnChange(fn: (value: Date | null) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    get appendAddon(): IInputAddonButton;
    private handleInput;
    private handleBlur;
    toggleOpen(): void;
    prevMonth(): void;
    nextMonth(): void;
    onMonthChange(change: ISelectChange<any>): void;
    onYearChange(change: ISelectChange<number>): void;
    selectDay(day: IDatepickerDay): void;
    private initViewFromModel;
    private updateView;
    private ensureYearRange;
    private buildCalendar;
    private startOfDay;
    private isSameDate;
    private parseInputDate;
    private formatDate;
    onHostInput(): void;
    /** Blur anywhere inside → mark touched */
    onHostFocusOut(): void;
    /** Close popup when clicking outside i-datepicker */
    onDocumentClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IDatepicker, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IDatepicker, "i-datepicker", never, { "placeholder": { "alias": "placeholder"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "invalid": { "alias": "invalid"; "required": false; }; "format": { "alias": "format"; "required": false; }; "panelPosition": { "alias": "panelPosition"; "required": false; }; "value": { "alias": "value"; "required": false; }; }, { "onChanged": "onChanged"; }, never, never, true, never>;
}
declare class IFCDatepicker implements ControlValueAccessor {
    innerDatepicker: IDatepicker;
    label: string;
    placeholder: string;
    format: string;
    panelPosition: IDatepickerPanelPosition;
    errorMessage?: IFormControlErrorMessage;
    private readonly cdr;
    private readonly hostEl;
    readonly ngControl: NgControl | null;
    private readonly formDir;
    get value(): Date | null;
    set value(v: Date | null);
    private _value;
    isDisabled: boolean;
    private onChange;
    private onTouched;
    constructor();
    writeValue(v: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    handleDateChange(date: Date | null): void;
    focusInnerDatepicker(): void;
    get controlInvalid(): boolean;
    get required(): boolean;
    get resolvedErrorText(): string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<IFCDatepicker, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IFCDatepicker, "i-fc-datepicker", never, { "label": { "alias": "label"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "format": { "alias": "format"; "required": false; }; "panelPosition": { "alias": "panelPosition"; "required": false; }; "errorMessage": { "alias": "errorMessage"; "required": false; }; "value": { "alias": "value"; "required": false; }; }, {}, never, never, true, never>;
}

declare const I_ICON_NAMES: {
    readonly add: "fa-solid fa-plus";
    readonly 'angle-down': "fa-solid fa-angle-down";
    readonly 'angle-up': "fa-solid fa-angle-up";
    readonly 'arrow-down': "fa-solid fa-arrow-down";
    readonly 'arrow-up': "fa-solid fa-arrow-up";
    readonly back: "fa-solid fa-chevron-left";
    readonly bars: "fa-solid fa-bars";
    readonly cancel: "fa-solid fa-xmark";
    readonly calendar: "fa-solid fa-calendar-days";
    readonly check: "fa-solid fa-check";
    readonly 'check-circle': "fa-solid fa-circle-check";
    readonly code: "fa-solid fa-code";
    readonly delete: "fa-solid fa-trash";
    readonly edit: "fa-solid fa-pen";
    readonly ellipsis: "fa-solid fa-ellipsis";
    readonly exclamation: "fa-solid fa-circle-exclamation";
    readonly 'file-excel': "fa-solid fa-file-excel";
    readonly 'file-pdf': "fa-solid fa-file-pdf";
    readonly 'folder-open': "fa-solid fa-folder-open";
    readonly hashtag: "fa-solid fa-hashtag";
    readonly info: "fa-solid fa-circle-info";
    readonly 'layer-group': "fa-solid fa-layer-group";
    readonly link: "fa-solid fa-arrow-up-right-from-square";
    readonly maximize: "fa-solid fa-window-maximize";
    readonly 'map-marker': "fa-solid fa-location-dot";
    readonly next: "fa-solid fa-chevron-right";
    readonly prev: "fa-solid fa-chevron-left";
    readonly up: "fa-solid fa-angle-up";
    readonly down: "fa-solid fa-angle-down";
    readonly save: "fa-solid fa-floppy-disk";
    readonly signature: "fa-solid fa-file-signature";
    readonly 'sort-asc': "fa-solid fa-arrow-down-a-z";
    readonly 'sort-dsc': "fa-solid fa-arrow-down-z-a";
    readonly sync: "fa-solid fa-arrows-rotate";
    readonly tags: "fa-solid fa-tags";
    readonly user: "fa-solid fa-user";
    readonly users: "fa-solid fa-users";
    readonly unlock: "fa-solid fa-unlock";
    readonly upload: "fa-solid fa-cloud-arrow-up";
    readonly view: "fa-solid fa-eye";
    readonly x: "fa-solid fa-xmark";
    readonly 'x-circle': "fa-solid fa-circle-xmark";
};
declare const I_ICON_SIZES: {
    readonly '2xs': "i-icon-2xs";
    readonly xs: "i-icon-xs";
    readonly sm: "i-icon-sm";
    readonly md: "i-icon-md";
    readonly lg: "i-icon-lg";
    readonly xl: "i-icon-xl";
    readonly '2xl': "i-icon-2xl";
    readonly '3xl': "i-icon-3xl";
    readonly '4xl': "i-icon-4xl";
};
type IIconName = keyof typeof I_ICON_NAMES;
type IIconSize = keyof typeof I_ICON_SIZES;
declare class IIcon {
    icon: IIconName | string;
    size: IIconSize;
    get iconSize(): string;
    get iconClass(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<IIcon, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IIcon, "i-icon", never, { "icon": { "alias": "icon"; "required": false; }; "size": { "alias": "size"; "required": false; }; }, {}, never, never, true, never>;
}

/**
 * CONFIG + TOKENS
 */
type IDialogConfig<TData = any> = {
    id?: string;
    data?: TData;
    width?: string;
    height?: string;
    disableClose?: boolean;
    backdropClose?: boolean;
};
declare const I_DIALOG_DATA: InjectionToken<any>;
/**
 * REF
 * TResult = result type of close()
 */
declare class IDialogRef<TResult = any> {
    private readonly _afterClosed$;
    close(result?: any): void;
    afterClosed(): Observable<TResult | undefined>;
}
/**
 * INTERNAL INSTANCE
 */
type IDialogInstance<TData = any, TResult = any> = {
    id: string;
    component: Type<any>;
    config: Required<IDialogConfig<TData>>;
    ref: IDialogRef<TResult>;
};
declare class IDialogService {
    private readonly _dialogs$;
    dialogs$: Observable<IDialogInstance<any, any>[]>;
    open<TComponent, TData = any, TResult = any>(component: Type<TComponent>, config?: IDialogConfig<TData>): IDialogRef<TResult>;
    closeById(id: string, result?: any): void;
    closeAll(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IDialogService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IDialogService>;
}
/**
 * CONTAINER COMPONENT (ONE DIALOG)
 */
declare class IDialogContainer implements OnChanges {
    instance: IDialogInstance;
    isTopMost: boolean;
    private rootInjector;
    dialogInjector: Injector;
    ngOnChanges(changes: SimpleChanges): void;
    get panelStyles(): {
        [key: string]: string | undefined;
    };
    onEscKey(): void;
    onBackdropClick(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IDialogContainer, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IDialogContainer, "i-dialog-container", never, { "instance": { "alias": "instance"; "required": true; }; "isTopMost": { "alias": "isTopMost"; "required": false; }; }, {}, never, never, true, never>;
}
/**
 * OUTLET COMPONENT (ALL DIALOGS)
 */
declare class IDialogOutlet {
    private dialogService;
    dialogs$: Observable<IDialogInstance<any, any>[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<IDialogOutlet, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IDialogOutlet, "i-dialog-outlet", never, {}, {}, never, never, true, never>;
}
/**
 * i-dialog-close DIRECTIVE
 */
declare class IDialogCloseDirective {
    /**
     * Supports:
     *   i-dialog-close
     *   i-dialog-close="result"
     *   [iDialogClose]="result"
     */
    result: any;
    private dialogRef;
    onClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IDialogCloseDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<IDialogCloseDirective, "[i-dialog-close], [iDialogClose]", never, { "result": { "alias": "iDialogClose"; "required": false; }; }, {}, never, never, true, never>;
}
/**
 * PUBLIC DIALOG COMPONENT (TITLE + ACTIONS)
 */
type IDialogActionTypes = {
    type: 'cancel' | 'save' | 'ok' | 'confirm' | 'custom';
};
type IDialogActionType = IDialogActionTypes['type'];
type IDialogActionCancel = {
    type: 'cancel';
    className?: string;
};
type IDialogActionSave = {
    type: 'save';
    className?: string;
};
type IDialogActionOK = {
    type: 'ok';
    className?: string;
};
type IDialogActionConfirm = {
    type: 'confirm';
    className?: string;
};
type IDialogActionCustom = {
    type: 'custom';
    label: string;
    variant?: IButtonVariant;
    icon?: IIconName | string;
    className?: string;
    onClick?: () => void;
};
type IDialogActionObject = IDialogActionCancel | IDialogActionSave | IDialogActionOK | IDialogActionConfirm | IDialogActionCustom;
type DialogAction = IDialogActionType | IDialogActionObject;
declare class IDialog {
    title: string | undefined;
    actions: DialogAction[];
    readonly onOk: EventEmitter<any>;
    readonly onConfirm: EventEmitter<any>;
    readonly onSave: EventEmitter<any>;
    readonly onCustomAction: EventEmitter<IDialogActionObject>;
    get normalizedActions(): IDialogActionObject[];
    get saveAction(): IDialogActionSave | undefined;
    get okAction(): IDialogActionOK | undefined;
    get confirmAction(): IDialogActionConfirm | undefined;
    get customActions(): IDialogActionCustom[];
    get cancelAction(): IDialogActionCancel | undefined;
    onConfirmClick(): void;
    onOkClick(): void;
    onSaveClick(): void;
    onCustomActionClick(a: IDialogActionCustom): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IDialog, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IDialog, "i-dialog", never, { "title": { "alias": "title"; "required": false; }; "actions": { "alias": "actions"; "required": false; }; }, { "onOk": "onOk"; "onConfirm": "onConfirm"; "onSave": "onSave"; "onCustomAction": "onCustomAction"; }, never, ["*"], true, never>;
}
type IAlertData = {
    title: string;
    description: string;
    type: 'information' | 'success' | 'warning' | 'danger';
};
declare class IAlert {
    data: IAlertData;
    dialog: IDialogRef<IAlert>;
    get alertClass(): string;
    submit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IAlert, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IAlert, "i-alert", never, {}, {}, never, never, true, never>;
}
declare class IAlertService {
    dialog: IDialogService;
    show({ title, description, type }: IAlertData): Observable<boolean>;
    information(title: string, description: string): Observable<boolean>;
    success(title: string, description: string): Observable<boolean>;
    warning(title: string, description: string): Observable<boolean>;
    danger(title: string, description: string): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<IAlertService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IAlertService>;
}
type IConfirmData = {
    title: string;
    description: string;
    type: 'information' | 'success' | 'warning' | 'danger';
    reason?: boolean;
};
declare class IConfirm {
    data: IConfirmData;
    dialog: IDialogRef<IConfirm>;
    formBuilder: FormBuilder;
    reason: FormControl;
    formGroup: FormGroup;
    formGroupDir: FormGroupDirective;
    get confirmClass(): string;
    submit(): void;
    onSubmit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IConfirm, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IConfirm, "i-confirm", never, {}, {}, never, never, true, never>;
}
declare class IConfirmService {
    dialog: IDialogService;
    show({ title, description, type, reason }: IConfirmData): Observable<any>;
    information(title: string, description: string): Observable<boolean>;
    success(title: string, description: string): Observable<boolean>;
    warning(title: string, description: string, reason?: boolean): Observable<boolean>;
    danger(title: string, description: string, reason?: boolean): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<IConfirmService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IConfirmService>;
}
declare class IDialogModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<IDialogModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<IDialogModule, never, [typeof IDialogContainer, typeof IDialogOutlet, typeof IDialogCloseDirective, typeof IDialog, typeof IAlert, typeof IConfirm], [typeof IDialogContainer, typeof IDialogOutlet, typeof IDialogCloseDirective, typeof IDialog, typeof IAlert, typeof IConfirm]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<IDialogModule>;
}

/**
 * IPaginator
 * Version: 1.2.0
 *
 * ✅ CHANGES:
 * - Standardized event name to `onPageChange` (on* prefix parity with React)
 */

type IPaginatorState = {
    pageIndex: number;
    pageSize: number;
};
type IPaginatorItem = {
    type: 'page';
    pageIndex: number;
    label: string;
    active: boolean;
} | {
    type: 'ellipsis';
    key: string;
};
declare class IPaginator {
    length: number;
    pageIndex: number;
    pageSize: number;
    pageSizeOptions: number[];
    /** ✅ on* prefix parity with React */
    readonly onPageChange: EventEmitter<IPaginatorState>;
    /** Max numeric pages shown (not counting ellipsis). Matches your examples. */
    private readonly _maxVisiblePages;
    get pageCount(): number;
    get pageItems(): IPaginatorItem[];
    trackItem(item: IPaginatorItem): string;
    private _pageItem;
    private _range;
    private emit;
    goToPage(pageIndex: number): void;
    changePageSize(value: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IPaginator, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IPaginator, "i-paginator", never, { "length": { "alias": "length"; "required": false; }; "pageIndex": { "alias": "pageIndex"; "required": false; }; "pageSize": { "alias": "pageSize"; "required": false; }; "pageSizeOptions": { "alias": "pageSizeOptions"; "required": false; }; }, { "onPageChange": "onPageChange"; }, never, never, true, never>;
}

type ISortDirection = 'asc' | 'desc' | '';
type ISortState = {
    active: string;
    direction: ISortDirection;
};
type ISortConfig = ISortState | ISortState[] | null;
type IGridFilter = string | {
    recursive: true;
    text: string;
    /**
     * Property name that holds children in hierarchical data.
     * Defaults to "children" when omitted.
     */
    key?: string;
};
type IGridPaginatorInput = false | {
    pageIndex?: number;
    pageSize?: number;
    pageSizeOptions?: number[];
};
type IGridDataSourceConfig<T = any> = {
    sort?: ISortConfig;
    filter?: IGridFilter;
    /**
     * paginator:
     * - false → disabled
     * - undefined/missing → enabled with defaults
     * - { pageIndex?, pageSize?, pageSizeOptions? } → enabled + overridden
     */
    paginator?: IGridPaginatorInput;
};
type IGridSelectionMode = false | 'single' | 'multiple';
type IGridSelectionChange<T = any> = {
    selected: T[];
    lastChanged: T | null;
};
type IGridColumnWidth = number | 'fill';
type IGridColumnLike<T = any> = {
    fieldName?: string;
    title: string;
    sortable: boolean;
    resizable: boolean;
    width?: IGridColumnWidth;
    freeze: boolean;
    headerDef?: TemplateRef<any>;
    cellDef?: TemplateRef<any>;
    /** true for auto-generated columns from datasource keys */
    isAuto?: boolean;
};
type IGridHeaderItem<T = any> = {
    kind: 'col';
    col: IGridColumnLike<T>;
} | {
    kind: 'group';
    title: string;
    columns: IGridColumnLike<T>[];
};
declare class IGridDataSource<T = any> {
    private readonly _renderedData$;
    private _rawData;
    private _filter;
    private _recursive;
    private _childrenKey;
    private _sort;
    private _paginatorEnabled;
    private _pageIndex;
    private _pageSize;
    private _pageSizeOptions;
    private _externalDataSub?;
    private _dataSource$?;
    constructor(initialData?: T[], config?: IGridDataSourceConfig<T>);
    private _applyPaginatorConfig;
    get paginatorEnabled(): boolean;
    get pageIndex(): number;
    get pageSize(): number;
    get pageSizeOptions(): number[];
    set paginator(state: {
        pageIndex: number;
        pageSize: number;
    } | null);
    get paginator(): {
        pageIndex: number;
        pageSize: number;
    } | null;
    get data(): T[];
    set data(value: T[]);
    /**
     * Observable-based data source.
     * Example:
     *   this.dataSource.data$ = this.api.get<T[]>('/url');
     */
    get data$(): Observable<T[]> | undefined;
    set data$(source: Observable<T[]> | undefined);
    /**
     * Smart filter:
     * - string: normal flat filtering
     * - { recursive: true, text, key? }: recursive tree filtering
     */
    set filter(value: IGridFilter | null | undefined);
    /**
     * Returns the current normalized filter text.
     * (Always plain string, lowercased & trimmed.)
     */
    get filter(): string;
    get sort(): ISortState[] | null;
    set sort(value: ISortConfig);
    get length(): number;
    filterPredicate: (data: T, filter: string) => boolean;
    sortAccessor: (data: T, columnId: string) => string | number | null | undefined;
    connect(): Observable<T[]>;
    disconnect(): void;
    /** Basic row match using public filterPredicate */
    private _rowMatchesFilter;
    private _filterRecursiveArray;
    private _filterRecursiveNode;
    private _normalizeSort;
    private _update;
}
declare class IGridHeaderCellDefDirective {
    readonly template: TemplateRef<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<IGridHeaderCellDefDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<IGridHeaderCellDefDirective, "[iHeaderCellDef]", never, {}, {}, never, never, true, never>;
}
declare class IGridCellDefDirective {
    readonly template: TemplateRef<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<IGridCellDefDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<IGridCellDefDirective, "[iCellDef]", never, {}, {}, never, never, true, never>;
}
declare class IGridRowDefDirective<T = any> implements OnInit {
    iRowDefExpandSingle: boolean;
    readonly template: TemplateRef<any>;
    private readonly vcr;
    ngOnInit(): void;
    static ngTemplateContextGuard<T>(_dir: IGridRowDefDirective<T>, _ctx: any): _ctx is {
        $implicit: T;
        row: T;
        index: number;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<IGridRowDefDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<IGridRowDefDirective<any>, "[iRowDef]", never, { "iRowDefExpandSingle": { "alias": "iRowDefExpandSingle"; "required": false; }; }, {}, never, never, true, never>;
}
declare class IGridExpandableRow {
    static ɵfac: i0.ɵɵFactoryDeclaration<IGridExpandableRow, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IGridExpandableRow, "i-grid-expandable-row", never, {}, {}, never, ["*"], true, never>;
}
declare class IGridHeaderRowDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<IGridHeaderRowDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<IGridHeaderRowDirective, "i-grid-header-row", never, {}, {}, never, never, true, never>;
}
declare class IGridRowDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<IGridRowDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<IGridRowDirective, "i-grid-row", never, {}, {}, never, never, true, never>;
}
declare class IGridHeaderCellGroup {
    static ɵfac: i0.ɵɵFactoryDeclaration<IGridHeaderCellGroup, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IGridHeaderCellGroup, "i-grid-header-cell-group", never, {}, {}, never, ["*"], true, never>;
}
declare class IGridHeaderCellGroupColumns {
    static ɵfac: i0.ɵɵFactoryDeclaration<IGridHeaderCellGroupColumns, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IGridHeaderCellGroupColumns, "i-grid-header-cell-group-columns", never, {}, {}, never, ["*"], true, never>;
}
declare class IGridColumn<T = any> implements IGridColumnLike<T> {
    fieldName: string;
    title: string;
    sortable: boolean;
    resizable: boolean;
    width?: IGridColumnWidth;
    freeze: boolean;
    headerDef?: TemplateRef<any>;
    cellDef?: TemplateRef<any>;
    isAuto?: boolean | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<IGridColumn<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IGridColumn<any>, "i-grid-column", never, { "fieldName": { "alias": "fieldName"; "required": true; }; "title": { "alias": "title"; "required": false; }; "sortable": { "alias": "sortable"; "required": false; }; "resizable": { "alias": "resizable"; "required": false; }; "width": { "alias": "width"; "required": false; }; "freeze": { "alias": "freeze"; "required": false; }; }, {}, ["headerDef", "cellDef"], never, true, never>;
    static ngAcceptInputType_freeze: unknown;
}
declare class IGridCustomColumn<T = any> implements IGridColumnLike<T> {
    title: string;
    sortable: boolean;
    resizable: boolean;
    width?: IGridColumnWidth;
    freeze: boolean;
    fieldName?: string;
    headerDef?: TemplateRef<any>;
    cellDef?: TemplateRef<any>;
    isAuto?: boolean | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<IGridCustomColumn<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IGridCustomColumn<any>, "i-grid-custom-column", never, { "title": { "alias": "title"; "required": false; }; "sortable": { "alias": "sortable"; "required": false; }; "resizable": { "alias": "resizable"; "required": false; }; "width": { "alias": "width"; "required": false; }; "freeze": { "alias": "freeze"; "required": false; }; }, {}, ["headerDef", "cellDef"], never, true, never>;
    static ngAcceptInputType_freeze: unknown;
}
declare class IGridColumnGroup<T = any> {
    title: string;
    columns: QueryList<IGridColumn<T>>;
    customColumns: QueryList<IGridCustomColumn<T>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<IGridColumnGroup<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IGridColumnGroup<any>, "i-grid-column-group", never, { "title": { "alias": "title"; "required": false; }; }, {}, ["columns", "customColumns"], never, true, never>;
}
declare class IGridCell {
    column?: IGridColumnLike<any>;
    fixedWidth?: number;
    private readonly hostDataColumn;
    private readonly hostCustomColumn;
    private readonly grid;
    private get _column();
    get flex(): string;
    private get _isFrozen();
    get frozenClass(): boolean;
    get stickyPosition(): string | null;
    get stickyLeft(): number | null;
    get stickyZ(): number | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<IGridCell, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IGridCell, "i-grid-cell", never, { "column": { "alias": "column"; "required": false; }; "fixedWidth": { "alias": "fixedWidth"; "required": false; }; }, {}, never, ["*"], true, never>;
}
declare class IGridHeaderCell {
    column?: IGridColumnLike<any>;
    fixedWidth?: number;
    private _isResizing;
    private _startX;
    private _startWidth;
    private readonly _minWidth;
    private readonly el;
    private readonly grid;
    private readonly hostDataColumn;
    private readonly hostCustomColumn;
    private get _column();
    private get _columnId();
    private get _direction();
    private get _sortableFlag();
    get resizable(): boolean;
    get flex(): string;
    get sortable(): boolean;
    get isSorted(): boolean;
    get isSortedAsc(): boolean;
    get isSortedDesc(): boolean;
    get isResizableClass(): boolean;
    get showIcon(): boolean;
    get iconName(): string;
    private get _isFrozen();
    get frozenClass(): boolean;
    get stickyPosition(): string | null;
    get stickyLeft(): number | null;
    get stickyZ(): number | null;
    onClick(): void;
    onResizeMouseDown(event: MouseEvent): void;
    onDocumentMouseMove(event: MouseEvent): void;
    onDocumentMouseUp(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IGridHeaderCell, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IGridHeaderCell, "i-grid-header-cell", never, { "column": { "alias": "column"; "required": false; }; "fixedWidth": { "alias": "fixedWidth"; "required": false; }; }, {}, never, ["*"], true, never>;
}
declare class IGridViewport {
    static ɵfac: i0.ɵɵFactoryDeclaration<IGridViewport, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IGridViewport, "i-grid-viewport", never, {}, {}, never, ["*"], true, never>;
}
declare class IGrid<T> implements AfterContentInit, OnChanges, OnDestroy {
    dataSource: IGridDataSource<T> | T[];
    /** Row selection mode */
    selectionMode: IGridSelectionMode;
    /** Tree mode */
    tree: string | boolean | null;
    /** Indent per tree level (px) */
    treeIndent: number;
    /**
     * Tree host column (fieldName).
     * - If set, tree UI (indent/toggle/checkbox) is rendered inside that column.
     * - If not set, uses first column that has fieldName.
     */
    treeColumn?: string;
    /** Initial auto-expand level for tree mode (1-based) */
    treeInitialExpandLevel: number | null;
    /** Show auto number column (disabled by default in tree) */
    showNumberColumn: boolean;
    get showNumberColumnEffective(): boolean;
    /** Emits whenever selection changes */
    readonly onSelectionChange: EventEmitter<IGridSelectionChange<T>>;
    /** Emits on row click (before selection logic) */
    readonly onRowClick: EventEmitter<T>;
    /** Expand events */
    readonly onRowExpandChange: EventEmitter<{
        row: T;
        expanded: boolean;
    }>;
    readonly onExpandedRowsChange: EventEmitter<T[]>;
    columnDefs: QueryList<IGridColumn<T>>;
    customColumnDefs: QueryList<IGridCustomColumn<T>>;
    columnGroupDefs: QueryList<IGridColumnGroup<T>>;
    expandableRowDef?: IGridRowDefDirective<T>;
    get hasExpandableRow(): boolean;
    columns: IGridColumnLike<T>[];
    headerItems: IGridHeaderItem<T>[];
    renderedData: T[];
    currentFilterText: string;
    sortStates: ISortState[];
    private _columnWidths;
    private _dataSub?;
    private _selection;
    private _expanded;
    private readonly _id;
    private readonly _defaultColumnWidth;
    readonly selectionColumnWidth = 32;
    readonly numberColumnWidth = 60;
    readonly expandColumnWidth = 32;
    private _numberColumnInternal?;
    private _treeMeta;
    private _treeRoots;
    get numberColumn(): IGridColumnLike<T>;
    expandRow(row: T): void;
    collapseRow(row: T): void;
    toggleRowExpanded(row: T): void;
    isRowExpanded(row: T): boolean;
    getExpandedRows(): T[];
    expandAll(): void;
    collapseAll(): void;
    get allVisibleExpanded(): boolean;
    onToggleAllExpanded(): void;
    onExpandToggle(row: T, event?: MouseEvent): void;
    private _setExpanded;
    get treeEnabled(): boolean;
    get treeChildrenKey(): string;
    private _getInitialExpandLevelInternal;
    private _shouldRowStartExpanded;
    private _getTreeChildren;
    private _getTreeDescendants;
    private _buildTreeMeta;
    private _rebuildTreeRendered;
    getRowLevel(row: T): number;
    getTreeIndentPx(row: T): number;
    hasChildren(row: T): boolean;
    isExpanded(row: T): boolean;
    get allTreeExpanded(): boolean;
    get anyTreeExpanded(): boolean;
    onToggleAllTree(): void;
    toggleRow(row: T): void;
    onTreeToggle(row: T, event?: MouseEvent): void;
    private _getTreeHostFieldName;
    isTreeHostColumn(col: IGridColumnLike<T>): boolean;
    isRowSelected(row: T): boolean;
    getRowChecked(row: T): boolean;
    getRowIndeterminate(row: T): boolean;
    get selectedRows(): T[];
    get allVisibleSelected(): boolean;
    get someVisibleSelected(): boolean;
    private _emitSelectionChange;
    private _selectSingle;
    private _toggleMultiple;
    private _setBranchSelection;
    private _syncSelectionUpwardsFrom;
    onRowSelectionToggle(row: T): void;
    onToggleAllVisible(): void;
    clearSelection(): void;
    private _reconcileSelectionWithData;
    private _reconcileExpandedWithData;
    private _getAllDataRows;
    getColumnDirection(columnId: string): ISortDirection;
    sort(column: IGridColumnLike<any>): void;
    private _applySortToDataSource;
    getColumnWidth(column: IGridColumnLike<any>): number | null;
    getColumnFlex(column: IGridColumnLike<any>): string;
    setColumnWidth(column: IGridColumnLike<any>, width: number): void;
    private _getFrozenEndIndex;
    get hasFrozenColumns(): boolean;
    isColumnFrozen(column: IGridColumnLike<any>): boolean;
    getColumnStickyLeft(column: IGridColumnLike<any>): number | null;
    private _getSpecialColumnsLeftOffset;
    getStickyLeftForExpandColumn(): number;
    getStickyLeftForSelectionColumn(): number;
    getStickyLeftForNumberColumn(): number;
    get hasPagination(): boolean;
    get totalLength(): number;
    get pageIndex(): number;
    get pageSize(): number;
    get pageSizeOptions(): number[];
    onPageChange(event: {
        pageIndex: number;
        pageSize: number;
    }): void;
    ngAfterContentInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private _applyExistingDataSourceSort;
    private _rebuildColumnsAndHeader;
    private _seedColumnWidths;
    private _buildAutoColumnsFromData;
    private _updateCurrentFilterText;
    private _connectData;
    onRowClicked(row: T): void;
    get singleSelectionName(): string;
    getRowNumber(visibleRowIndex: number): number;
    getFrozenColumnZ(column: IGridColumnLike<any>): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<IGrid<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IGrid<any>, "i-grid", ["iGrid"], { "dataSource": { "alias": "dataSource"; "required": false; }; "selectionMode": { "alias": "selectionMode"; "required": false; }; "tree": { "alias": "tree"; "required": false; }; "treeIndent": { "alias": "treeIndent"; "required": false; }; "treeColumn": { "alias": "treeColumn"; "required": false; }; "treeInitialExpandLevel": { "alias": "treeInitialExpandLevel"; "required": false; }; "showNumberColumn": { "alias": "showNumberColumn"; "required": false; }; }, { "onSelectionChange": "onSelectionChange"; "onRowClick": "onRowClick"; "onRowExpandChange": "onRowExpandChange"; "onExpandedRowsChange": "onExpandedRowsChange"; }, ["expandableRowDef", "columnDefs", "customColumnDefs", "columnGroupDefs"], never, true, never>;
    static ngAcceptInputType_showNumberColumn: unknown;
}
declare const I_GRID_DECLARATIONS: (typeof IGridExpandableRow)[];
declare class IGridModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<IGridModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<IGridModule, never, [typeof IGrid, typeof IGridViewport, typeof IGridColumn, typeof IGridCustomColumn, typeof IGridColumnGroup, typeof IGridHeaderCellDefDirective, typeof IGridCellDefDirective, typeof IGridRowDefDirective, typeof IGridExpandableRow, typeof IGridHeaderCell, typeof IGridCell, typeof IGridHeaderRowDirective, typeof IGridRowDirective, typeof IGridHeaderCellGroup, typeof IGridHeaderCellGroupColumns, typeof IPaginator], [typeof IGrid, typeof IGridViewport, typeof IGridColumn, typeof IGridCustomColumn, typeof IGridColumnGroup, typeof IGridHeaderCellDefDirective, typeof IGridCellDefDirective, typeof IGridRowDefDirective, typeof IGridExpandableRow, typeof IGridHeaderCell, typeof IGridCell, typeof IGridHeaderRowDirective, typeof IGridRowDirective, typeof IGridHeaderCellGroup, typeof IGridHeaderCellGroupColumns, typeof IPaginator]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<IGridModule>;
}

declare class IHighlightSearchPipe implements PipeTransform {
    transform(value: string, search: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<IHighlightSearchPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<IHighlightSearchPipe, "highlightSearch", true>;
}

type IRoute = Omit<Route, 'data' | 'children'> & {
    data: {
        title: string;
        [key: string]: any;
    };
    children?: IRoutes;
};
type IRoutes = IRoute[];
type IBreadcrumbItem = {
    label: string;
    /**
     * IMPORTANT (baseHref is "/-/"):
     * - Recommended: "/dashboard", "/dashboard/reports", "/"
     * - Also accepted: "/-/dashboard" (will be normalized)
     */
    url?: string;
};
type IMenu = {
    menuId: number;
    menuName: string;
    route?: string | null;
    menuTypeId: number;
    parentId: number;
    sequence: number;
    icon?: string | null;
    child?: IMenu[];
    level: number;
    visibility?: string;
    selected?: boolean;
    openInId?: number;
    versionCode?: string;
    applicationCode?: string;
    applicationUrl?: string;
};
type IUser = {
    employeeCode: string;
    fullName: string;
    userImagePath: string;
};
type IHNavigationSnapshot = {
    fullUrl: string;
    basePath: string;
    params: Record<string, any>;
    query: Record<string, any>;
};
declare class IHTitleBreadcrumbService {
    /**
     * null = use normal (route-based) title/breadcrumbs
     * non-null = override (e.g. React remote controls shell display)
     */
    readonly titleOverride: i0.WritableSignal<string | null>;
    readonly breadcrumbsOverride: i0.WritableSignal<IBreadcrumbItem[] | null>;
    setTitle(title: string | null): void;
    setBreadcrumbs(items: IBreadcrumbItem[] | null): void;
    clear(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IHTitleBreadcrumbService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IHTitleBreadcrumbService>;
}
declare class IHContent {
    private readonly router;
    private readonly activatedRoute;
    private readonly baseHref;
    readonly shell: IHTitleBreadcrumbService;
    sidebarVisibility: boolean;
    readonly onSidebarToggled: EventEmitter<boolean>;
    /** route-based breadcrumbs */
    readonly breadcrumb$: Observable<IBreadcrumbItem[]>;
    /** last breadcrumb label = route-based page title */
    readonly pageTitle$: Observable<string | null>;
    private buildBreadcrumb;
    toggleSidebar(): void;
    onOverrideBreadcrumbClick(e: MouseEvent): void;
    private normalizeBaseHref;
    private normalizePath;
    /**
     * RouterLink will prefix baseHref automatically.
     * So we must NOT include baseHref in the value passed to [routerLink].
     *
     * baseHref "/-/" examples:
     * - "/-/dashboard" -> "/dashboard"
     * - "/dashboard"   -> "/dashboard"
     * - "/"            -> "/"
     */
    overrideRouterLink(url: string): string;
    /**
     * Browser href must include baseHref so "open in new tab" goes to the correct URL.
     *
     * baseHref "/-/" examples:
     * - "/dashboard"   -> "/-/dashboard"
     * - "/-/dashboard" -> "/-/dashboard"
     * - "/"            -> "/-/"
     */
    overrideHref(url: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<IHContent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IHContent, "ih-content", never, {}, { "onSidebarToggled": "onSidebarToggled"; }, never, never, true, never>;
}
declare class IHMenu implements OnChanges {
    menu: IMenu | undefined;
    selectedMenuId: number | null;
    filter: string;
    readonly clicked: EventEmitter<any>;
    menus: QueryList<IHMenu>;
    menuItemRef: ElementRef<HTMLElement>;
    isHidden: boolean;
    /** only true for the *leaf* menu that matches selectedMenuId */
    get isSelected(): boolean;
    ngOnChanges(changes: SimpleChanges): void;
    click(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IHMenu, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IHMenu, "ih-menu", never, { "menu": { "alias": "menu"; "required": false; }; "selectedMenuId": { "alias": "selectedMenuId"; "required": false; }; "filter": { "alias": "filter"; "required": false; }; }, { "clicked": "clicked"; }, never, never, true, never>;
}
declare class IHSidebar implements OnInit, OnChanges {
    private router;
    user$: Observable<IUser>;
    menusInput$: Observable<IMenu[]>;
    visible: boolean;
    footerText: string;
    menus$: Observable<IMenu[]>;
    queryParams: any;
    menuSearch: FormControl<string | null>;
    menuFilter: i0.WritableSignal<string>;
    keyboardNavActive: i0.WritableSignal<boolean>;
    selectedIndex: i0.WritableSignal<number | null>;
    selectedMenuId: i0.WritableSignal<number | null>;
    private navigableMenus;
    private originalMenus$;
    get sidebarVisibility(): boolean;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private buildMenusStream;
    private filterMenuTree;
    private filterMenuBranch;
    private updateNavigableMenus;
    private flattenNavigableMenus;
    onSearchKeyDown(event: KeyboardEvent): void;
    private ensureKeyboardNavActive;
    private moveSelection;
    private activateSelected;
    private navigateToMenu;
    updateUrl(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IHSidebar, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IHSidebar, "ih-sidebar", never, { "user$": { "alias": "user$"; "required": false; }; "menusInput$": { "alias": "menusInput$"; "required": false; }; "visible": { "alias": "visible"; "required": false; }; "footerText": { "alias": "footerText"; "required": false; }; }, {}, never, never, true, never>;
}

type IInputMaskType = 'date' | 'integer' | 'number' | 'currency' | 'time';
type IInputMask = {
    type: IInputMaskType;
    /**
     * Optional format, used for:
     * - type: 'date' → e.g. 'dd/MM/yyyy', 'yyyy-MM-dd'
     * - type: 'time' → e.g. 'HH:mm', 'HH:mm:ss'
     * For 'integer' | 'number' | 'currency' format is currently ignored.
     */
    format?: string;
};
declare class IInputMaskDirective implements OnInit, OnChanges {
    private elRef;
    mask: IInputMask | undefined;
    /** Whether initial default (today / now) has been applied */
    private _defaultApplied;
    constructor(elRef: ElementRef<HTMLInputElement>);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private get el();
    private get hasMask();
    private dispatchInputEvent;
    private computeDefaultForMask;
    private applyInitialDefaultIfNeeded;
    private isControlKey;
    private daysInMonth;
    /** Split date format into tokens (dd, MM, yyyy) and separators. */
    private splitDateFormat;
    /** Segments (day, month, year) with actual positions in current value. */
    private getDateSegments;
    /** Format day/month/year back to string according to format tokens. */
    private formatDateFromParts;
    /** Normalize full date string (used on blur / Enter). */
    private normalizeDateValue;
    /**
     * Digits-only behavior for date mask (no separators typed yet).
     *
     * For dd/MM/yyyy:
     * - "12"       → "12/"
     * - "1210"     → "12/10/"
     * - "12101980" → "12/10/1980"
     */
    private applyDateMaskDigitsOnly;
    /**
     * Smart date mask with:
     * - digits-only behavior (above)
     * - segment-based behavior once separators exist
     * - clamping for day/month
     */
    private applyDateMask;
    private adjustDateSegmentByArrow;
    /** Split time format into tokens (HH, mm, ss) and separators. */
    private splitTimeFormat;
    /** Segments (hour, minute, second) with positions in current value. */
    private getTimeSegments;
    /** Format hour/minute/second according to format tokens. */
    private formatTimeFromParts;
    /** Normalize full time string (used on blur / Enter). */
    private normalizeTimeValue;
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
    private applyTimeMaskDigitsOnly;
    /**
     * Smart time mask similar to date:
     * - digits-only path
     * - segment-based path with clamping (only when segment fully typed)
     */
    private applyTimeMask;
    private adjustTimeSegmentByArrow;
    private applyNumericMask;
    onInput(event: Event): void;
    onBlur(): void;
    onFocus(): void;
    onKeydown(event: KeyboardEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IInputMaskDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<IInputMaskDirective, "[iInputMask]", never, { "mask": { "alias": "iInputMask"; "required": false; }; }, {}, never, never, true, never>;
}

/**
 * IInput
 * Version: 2.0.0
 *
 * - Simple CVA text input
 * - Masking is handled by IInputMaskDirective on the inner <input>
 */

declare class IInput implements ControlValueAccessor {
    type: string;
    placeholder: string;
    autocomplete: string | undefined;
    readonly: boolean;
    /** invalid state (controlled by form or wrapper) */
    invalid: boolean;
    mask: IInputMask | undefined;
    /** value usable both by CVA and by [value] binding */
    get value(): string | null;
    set value(v: string | null);
    prepend: IInputAddons | IInputAddons[] | undefined;
    append: IInputAddons | IInputAddons[] | IInputAddonLoading | undefined;
    inputRef: ElementRef<HTMLInputElement>;
    private _value;
    isDisabled: boolean;
    get disabled(): boolean;
    set disabled(value: boolean);
    private onChange;
    private onTouched;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    handleInput(event: Event): void;
    handleBlur(): void;
    /** Click anywhere on <i-input> focuses the inner input, except clicks on addons */
    handleHostClick(event: MouseEvent): void;
    get prepends(): IInputAddons[];
    get appends(): (IInputAddons | IInputAddonLoading)[];
    static ɵfac: i0.ɵɵFactoryDeclaration<IInput, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IInput, "i-input", never, { "type": { "alias": "type"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "autocomplete": { "alias": "autocomplete"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; "invalid": { "alias": "invalid"; "required": false; }; "mask": { "alias": "mask"; "required": false; }; "value": { "alias": "value"; "required": false; }; "prepend": { "alias": "prepend"; "required": false; }; "append": { "alias": "append"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, never, true, never>;
}
declare class IFCInput implements ControlValueAccessor, OnDestroy {
    innerInput: IInput;
    private readonly cdr;
    private readonly ngControl;
    private readonly formDir;
    private submitSub?;
    label: string;
    placeholder: string;
    autocomplete: string | undefined;
    readonly: boolean;
    type: string;
    mask: IInputMask | undefined;
    prepend: IInput['prepend'];
    append: IInput['append'];
    /** old-style custom error templates: { required: '{label} is cuwax' } */
    errorMessage?: IFormControlErrorMessage;
    /** non-form usage: [value] binding */
    get value(): string | null;
    set value(v: string | null);
    private _value;
    isDisabled: boolean;
    private onChange;
    private onTouched;
    constructor();
    ngOnDestroy(): void;
    writeValue(v: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    handleInnerInput(event: Event): void;
    handleInnerBlur(): void;
    focusInnerInput(): void;
    get controlInvalid(): boolean;
    get required(): boolean;
    get resolvedErrorText(): string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<IFCInput, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IFCInput, "i-fc-input", never, { "label": { "alias": "label"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "autocomplete": { "alias": "autocomplete"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; "type": { "alias": "type"; "required": false; }; "mask": { "alias": "mask"; "required": false; }; "prepend": { "alias": "prepend"; "required": false; }; "append": { "alias": "append"; "required": false; }; "errorMessage": { "alias": "errorMessage"; "required": false; }; "value": { "alias": "value"; "required": false; }; }, {}, never, never, true, never>;
}
declare class IInputModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<IInputModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<IInputModule, never, [typeof IInput, typeof IFCInput, typeof IInputAddon, typeof IInputMaskDirective], [typeof IInput, typeof IFCInput, typeof IInputAddon, typeof IInputMaskDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<IInputModule>;
}

declare class ILoading {
    label: string;
    light: boolean;
    get isLight(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ILoading, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ILoading, "i-loading", never, { "label": { "alias": "label"; "required": false; }; "light": { "alias": "light"; "required": false; }; }, {}, never, never, true, never>;
}

type IPillSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg';
type IPillVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';
declare class IPill {
    size: IPillSize;
    variant: IPillVariant;
    disabled: boolean;
    /** show close button */
    closable: boolean;
    readonly onClose: EventEmitter<MouseEvent>;
    readonly onClick: EventEmitter<MouseEvent>;
    baseClass: boolean;
    get attrSize(): string;
    get attrVariant(): string;
    get ariaDisabled(): string | null;
    handleHostClick(e: MouseEvent): void;
    handleClose(e: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IPill, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IPill, "i-pill", never, { "size": { "alias": "size"; "required": false; }; "variant": { "alias": "variant"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "closable": { "alias": "closable"; "required": false; }; }, { "onClose": "onClose"; "onClick": "onClick"; }, never, ["*"], true, never>;
    static ngAcceptInputType_disabled: unknown;
    static ngAcceptInputType_closable: unknown;
}

declare class ISection {
    static ɵfac: i0.ɵɵFactoryDeclaration<ISection, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ISection, "i-section", never, {}, {}, never, ["*"], true, never>;
}
declare class ISectionHeader {
    static ɵfac: i0.ɵɵFactoryDeclaration<ISectionHeader, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ISectionHeader, "i-section-header", never, {}, {}, never, ["*"], true, never>;
}
declare class ISectionSubHeader {
    static ɵfac: i0.ɵɵFactoryDeclaration<ISectionSubHeader, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ISectionSubHeader, "i-section-sub-header", never, {}, {}, never, ["*"], true, never>;
}
declare class ISectionFilter {
    static ɵfac: i0.ɵɵFactoryDeclaration<ISectionFilter, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ISectionFilter, "i-section-filter", never, {}, {}, never, ["*"], true, never>;
}
declare class ISectionBody {
    static ɵfac: i0.ɵɵFactoryDeclaration<ISectionBody, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ISectionBody, "i-section-body", never, {}, {}, never, ["*"], true, never>;
}
declare class ISectionFooter {
    static ɵfac: i0.ɵɵFactoryDeclaration<ISectionFooter, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ISectionFooter, "i-section-footer", never, {}, {}, never, ["*"], true, never>;
}
declare class ISectionTabHeader {
    tpl: TemplateRef<unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ISectionTabHeader, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ISectionTabHeader, "i-section-tab-header", never, {}, {}, never, ["*"], true, never>;
}
declare class ISectionTabContent {
    tpl: TemplateRef<unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ISectionTabContent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ISectionTabContent, "i-section-tab-content", never, {}, {}, never, ["*"], true, never>;
}
declare class ISectionTab implements AfterContentInit {
    title: string;
    opened: boolean;
    set badge(v: any);
    get badge(): any;
    _badgeEnabled: boolean;
    _badgeValue: number | null;
    headerCmp?: ISectionTabHeader;
    contentCmp?: ISectionTabContent;
    defaultHeaderTpl: TemplateRef<unknown>;
    defaultContentTpl: TemplateRef<unknown>;
    headerTpl: TemplateRef<unknown>;
    contentTpl: TemplateRef<unknown>;
    _active: boolean;
    ngAfterContentInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ISectionTab, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ISectionTab, "i-section-tab", never, { "title": { "alias": "title"; "required": false; }; "opened": { "alias": "opened"; "required": false; }; "badge": { "alias": "badge"; "required": false; }; }, {}, ["headerCmp", "contentCmp"], ["*"], true, never>;
    static ngAcceptInputType_opened: any;
}
declare class ISectionTabs implements AfterContentInit {
    tabs: QueryList<ISectionTab>;
    /** optional controlled mode */
    selectedIndex: number | null;
    /** ✅ standardized output name (Angular + React parity) */
    readonly onSelectedIndexChange: EventEmitter<number>;
    /**
     * height:
     * - "wrap" (default) => content height depends on each tab
     * - "300" / 300 / "300px" => fixed content height (px) + internal scroll
     */
    set height(v: any);
    get height(): any;
    private _contentHeightPx;
    get contentHeightPx(): number | null;
    get isFixedHeight(): boolean;
    tabsArr: ISectionTab[];
    activeIndex: number;
    private readonly cdr;
    get activeTab(): ISectionTab | null;
    ngAfterContentInit(): void;
    activate(index: number): void;
    activateByTab(tab: ISectionTab): void;
    private setActive;
    private isValidIndex;
    static ɵfac: i0.ɵɵFactoryDeclaration<ISectionTabs, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ISectionTabs, "i-section-tabs", never, { "selectedIndex": { "alias": "selectedIndex"; "required": false; }; "height": { "alias": "height"; "required": false; }; }, { "onSelectedIndexChange": "onSelectedIndexChange"; }, ["tabs"], never, true, never>;
}
declare class ISectionModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ISectionModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ISectionModule, never, [typeof ISection, typeof ISectionHeader, typeof ISectionSubHeader, typeof ISectionFilter, typeof ISectionBody, typeof ISectionFooter, typeof ISectionTabs, typeof ISectionTab, typeof ISectionTabHeader, typeof ISectionTabContent], [typeof ISection, typeof ISectionHeader, typeof ISectionSubHeader, typeof ISectionFilter, typeof ISectionBody, typeof ISectionFooter, typeof ISectionTabs, typeof ISectionTab, typeof ISectionTabHeader, typeof ISectionTabContent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ISectionModule>;
}

/**
 * ITextarea
 * Version: 1.1.1
 */

declare class ITextArea implements ControlValueAccessor {
    placeholder: string;
    readonly: boolean;
    rows: number;
    /** invalid state (controlled by form or wrapper) */
    invalid: boolean;
    /**
     * NOTE:
     * Keep [value] support for non-form usages.
     * But CVA should be the main source of truth.
     */
    get value(): string | null;
    set value(v: string | null);
    textareaRef: ElementRef<HTMLTextAreaElement>;
    protected _value: string | null;
    isDisabled: boolean;
    get disabled(): boolean;
    set disabled(value: boolean);
    private onChange;
    private onTouched;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    handleInput(event: Event): void;
    handleBlur(): void;
    /** Click anywhere on <i-textarea> focuses the inner textarea */
    handleHostClick(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ITextArea, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ITextArea, "i-textarea", never, { "placeholder": { "alias": "placeholder"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; "rows": { "alias": "rows"; "required": false; }; "invalid": { "alias": "invalid"; "required": false; }; "value": { "alias": "value"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, never, true, never>;
}
declare class IFCTextArea implements ControlValueAccessor, OnDestroy {
    innerTextarea: ITextArea;
    private readonly cdr;
    private readonly ngControl;
    private readonly formDir;
    private submitSub?;
    label: string;
    placeholder: string;
    readonly: boolean;
    rows: number;
    errorMessage?: IFormControlErrorMessage;
    get value(): string | null;
    set value(v: string | null);
    protected _value: string | null;
    isDisabled: boolean;
    private onChange;
    private onTouched;
    constructor();
    ngOnDestroy(): void;
    writeValue(v: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    handleInnerInput(event: Event): void;
    handleInnerFocusOut(): void;
    focusInnerTextarea(): void;
    get controlInvalid(): boolean;
    get required(): boolean;
    get resolvedErrorText(): string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<IFCTextArea, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IFCTextArea, "i-fc-textarea", never, { "label": { "alias": "label"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; "rows": { "alias": "rows"; "required": false; }; "errorMessage": { "alias": "errorMessage"; "required": false; }; "value": { "alias": "value"; "required": false; }; }, {}, never, never, true, never>;
}

declare class IToggle implements ControlValueAccessor {
    disabled: boolean;
    /** put label left or right */
    labelPosition: 'left' | 'right';
    checked: boolean;
    readonly onChange: EventEmitter<boolean>;
    readonly onTouched: EventEmitter<void>;
    inputRef: ElementRef<HTMLInputElement>;
    baseClass: boolean;
    get activeClass(): boolean;
    get disabledClass(): boolean;
    get labelLeftClass(): boolean;
    private cvaOnChange;
    private cvaOnTouched;
    writeValue(value: boolean | null): void;
    registerOnChange(fn: (value: boolean) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    handleNativeChange(e: Event): void;
    handleBlur(): void;
    private isInteractiveElement;
    onHostClick(e: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IToggle, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IToggle, "i-toggle", never, { "disabled": { "alias": "disabled"; "required": false; }; "labelPosition": { "alias": "labelPosition"; "required": false; }; }, { "onChange": "onChange"; "onTouched": "onTouched"; }, never, ["*"], true, never>;
}

declare class IUI {
    static ɵfac: i0.ɵɵFactoryDeclaration<IUI, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<IUI, never, [typeof IButton, typeof ICardModule, typeof ICodeViewerModule, typeof IDatepicker, typeof IFCDatepicker, typeof IDialogModule, typeof IGridModule, typeof IHContent, typeof IHSidebar, typeof IIcon, typeof IInputModule, typeof ILoading, typeof ISectionModule, typeof ISelect, typeof IFCSelect, typeof ITextArea, typeof IFCTextArea, typeof IToggle, typeof IPill], [typeof IButton, typeof ICardModule, typeof ICodeViewerModule, typeof IDatepicker, typeof IFCDatepicker, typeof IDialogModule, typeof IGridModule, typeof IHContent, typeof IHSidebar, typeof IIcon, typeof IInputModule, typeof ILoading, typeof ISectionModule, typeof ISelect, typeof IFCSelect, typeof ITextArea, typeof IFCTextArea, typeof IToggle, typeof IPill]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<IUI>;
}

export { IAlert, IAlertService, IButton, ICard, ICardBody, ICardFooter, ICardImage, ICardModule, ICodeViewer, ICodeViewerModule, IConfirm, IConfirmService, IDatepicker, IDialog, IDialogCloseDirective, IDialogContainer, IDialogModule, IDialogOutlet, IDialogRef, IDialogService, IFCDatepicker, IFCInput, IFCSelect, IFCTextArea, IGrid, IGridCell, IGridCellDefDirective, IGridColumn, IGridColumnGroup, IGridCustomColumn, IGridDataSource, IGridExpandableRow, IGridHeaderCell, IGridHeaderCellDefDirective, IGridHeaderCellGroup, IGridHeaderCellGroupColumns, IGridHeaderRowDirective, IGridModule, IGridRowDefDirective, IGridRowDirective, IGridViewport, IHContent, IHMenu, IHSidebar, IHTitleBreadcrumbService, IHighlightSearchPipe, IIcon, IInput, IInputAddon, IInputMaskDirective, IInputModule, ILoading, IPaginator, IPill, ISection, ISectionBody, ISectionFilter, ISectionFooter, ISectionHeader, ISectionModule, ISectionSubHeader, ISectionTab, ISectionTabContent, ISectionTabHeader, ISectionTabs, ISelect, ISelectOptionDefDirective, ITextArea, IToggle, IUI, I_DIALOG_DATA, I_GRID_DECLARATIONS, I_ICON_NAMES, I_ICON_SIZES, isControlRequired, resolveControlErrorMessage };
export type { DialogAction, IAlertData, IBreadcrumbItem, IButtonSize, IButtonType, IButtonVariant, IConfirmData, IDatepickerPanelPosition, IDialogActionCancel, IDialogActionConfirm, IDialogActionCustom, IDialogActionOK, IDialogActionObject, IDialogActionSave, IDialogActionType, IDialogActionTypes, IDialogConfig, IErrorContext, IFormControlErrorMessage, IGridColumnLike, IGridColumnWidth, IGridDataSourceConfig, IGridFilter, IGridHeaderItem, IGridPaginatorInput, IGridSelectionChange, IGridSelectionMode, IHNavigationSnapshot, IIconName, IIconSize, IInputAddonButton, IInputAddonIcon, IInputAddonKind, IInputAddonLink, IInputAddonLoading, IInputAddonText, IInputAddonType, IInputAddons, IInputMask, IInputMaskType, IMenu, IPaginatorState, IPillSize, IPillVariant, IRoute, IRoutes, ISelectChange, ISelectOptionContext, ISelectPanelPosition, ISortConfig, ISortDirection, ISortState, IUISize, IUIVariant, IUser };
