import * as i0 from '@angular/core';
import { EventEmitter, OnInit, OnDestroy, ElementRef, OnChanges, SimpleChanges, AfterViewInit, AfterContentInit, AfterViewChecked, TemplateRef, Type, Injector, InjectionToken, QueryList, PipeTransform, EnvironmentProviders } from '@angular/core';
import { AbstractControl, NgControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { Route, CanActivateFn } from '@angular/router';
import { HttpParams, HttpInterceptorFn } from '@angular/common/http';

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
    readonly '3xs': "i-icon-3xs";
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
type IUISize = '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type IUIVariant = 'primary' | 'info' | 'warning' | 'danger' | 'success' | 'outline';

type IErrorContext = {
    label: string;
    error: any;
    control: AbstractControl | null;
};
declare function resolveControlErrorMessage(ngControl: NgControl | null, label: string | undefined, errorMessage?: IFormControlErrorMessage, extraFactories?: Record<string, (ctx: IErrorContext) => string>): string | null;
declare function isControlRequired(ngControl: NgControl | null, errorMessage?: IFormControlErrorMessage): boolean;

type IButtonType = 'button' | 'submit' | 'reset';
type IButtonSize = Extract<IUISize, '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg'>;
type IButtonVariant = Extract<IUIVariant, 'primary' | 'warning' | 'danger' | 'success' | 'outline'>;
declare class IButton {
    disabled: boolean;
    loading: boolean;
    type: IButtonType;
    loadingText: string;
    variant: IButtonVariant;
    size: IButtonSize;
    icon: IIconName | (string & {}) | undefined;
    routerLink?: any[] | string;
    queryParams?: Record<string, any>;
    fragment?: string;
    state?: any;
    href?: string;
    target?: '_blank' | '_self' | '_parent' | '_top';
    rel?: string;
    readonly onClick: EventEmitter<MouseEvent>;
    get isDisabled(): boolean;
    get computedRel(): string | null;
    get hostVariant(): string;
    get hostSize(): string;
    get ariaDisabled(): string | null;
    get ariaBusy(): string | null;
    get mode(): string;
    handleClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IButton, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IButton, "i-button", never, { "disabled": { "alias": "disabled"; "required": false; }; "loading": { "alias": "loading"; "required": false; }; "type": { "alias": "type"; "required": false; }; "loadingText": { "alias": "loadingText"; "required": false; }; "variant": { "alias": "variant"; "required": false; }; "size": { "alias": "size"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "routerLink": { "alias": "routerLink"; "required": false; }; "queryParams": { "alias": "queryParams"; "required": false; }; "fragment": { "alias": "fragment"; "required": false; }; "state": { "alias": "state"; "required": false; }; "href": { "alias": "href"; "required": false; }; "target": { "alias": "target"; "required": false; }; "rel": { "alias": "rel"; "required": false; }; }, { "onClick": "onClick"; }, never, ["*"], true, never>;
    static ngAcceptInputType_disabled: unknown;
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

/**
 * IInput
 * Version: 2.0.0
 *
 * - Simple CVA text input
 * - Masking is handled by IInputMaskDirective on the inner <input>
 */

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
type IInputMaskType = 'date' | 'integer' | 'number' | 'currency' | 'time' | 'lowercase' | 'uppercase';
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
    mask: IInputMask | undefined;
    /**
     * When true (default), an empty input is auto-filled with today's date
     * (or current time) on init and on focus. Set to false inside components
     * that provide their own initial value (e.g. IDatepicker).
     */
    autoDefault: boolean;
    /** Whether initial default (today / now) has been applied */
    private _defaultApplied;
    private elRef;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Resolve the real native input/textarea.
     * Works for:
     * - <input iInputMask ...>
     * - <textarea iInputMask ...>
     * - <i-input iInputMask ...> (wrapper custom element)
     */
    private get nativeInput();
    private get hasMask();
    private safeSetSelectionRange;
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
    private applyDateMask;
    private adjustDateSegmentByArrow;
    private splitTimeFormat;
    private getTimeSegments;
    private formatTimeFromParts;
    private normalizeTimeValue;
    private applyTimeMaskDigitsOnly;
    private applyTimeMask;
    private adjustTimeSegmentByArrow;
    private applyNumericMask;
    private applyTextCaseMask;
    private countDigitsBeforePos;
    /** caret index in formatted string after `digitCount` digits */
    private caretPosAfterDigits;
    private clamp;
    private clampMonth2;
    private clampDay2;
    /**
     * Smart digit typing for DATE:
     * - never allows 3-digit day/month or 5-digit year
     * - when caret is at end of a full segment, typing "rolls" that segment:
     *   month "01" + '2' => "12" (shift + append)
     *   year "2026" + '1' => "0261" (keeps last 4)
     */
    private handleDateDigitKey;
    /**
     * Smart digit typing for TIME (similar behavior, keeps segments fixed-length).
     * - HH:mm       => keeps hour/min 2 digits
     * - HH:mm:ss    => keeps hour/min/sec 2 digits
     */
    private handleTimeDigitKey;
    private normalizePastedDate;
    private normalizePastedTime;
    onInput(): void;
    onBlur(): void;
    onFocus(): void;
    onKeydown(event: KeyboardEvent): void;
    onPaste(event: ClipboardEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IInputMaskDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<IInputMaskDirective, "[iInputMask]", never, { "mask": { "alias": "iInputMask"; "required": false; }; "autoDefault": { "alias": "autoDefault"; "required": false; }; }, {}, never, never, true, never>;
}
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
type ISelectPanelPosition = 'top' | 'bottom' | 'left' | 'right' | 'top left' | 'top right' | 'bottom left' | 'bottom right';
declare class ISelect<T = any> implements ControlValueAccessor, OnInit, AfterContentInit, AfterViewChecked, OnDestroy {
    placeholder: string;
    disabled: boolean;
    invalid: boolean;
    filterDelay: number;
    panelPosition: ISelectPanelPosition;
    portalToBody: boolean;
    panelOffset: number;
    matchTriggerWidth: boolean;
    set options(value: T[] | null);
    set options$(value: Observable<T[]> | null);
    private _displayWith;
    private _displayWithExplicit;
    set displayWith(value: ((row: T | null) => string) | string | undefined);
    get displayWith(): ((row: T | null) => string) | string;
    filterPredicate: (row: T, term: string) => boolean;
    set value(v: T | null);
    get value(): T | null;
    readonly onChanged: EventEmitter<ISelectChange<T>>;
    readonly onOptionSelected: EventEmitter<ISelectChange<T>>;
    optionDef?: ISelectOptionDefDirective<T>;
    panelRef?: ElementRef<HTMLElement>;
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
    onChange: (value: any) => void;
    onTouched: () => void;
    get panelPositionClass(): string;
    private readonly hostEl;
    private readonly cdr;
    private readonly zone;
    private panelPortaled;
    private panelOriginalParent;
    private panelOriginalNextSibling;
    private repositionRaf;
    private listeningGlobal;
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngAfterViewChecked(): void;
    ngOnDestroy(): void;
    private cleanupOptionsSub;
    writeValue(value: T | null): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    private syncModelToView;
    private applyFilter;
    get hasOptions(): boolean;
    get hasNoResults(): boolean;
    resolveDisplayText(row: T | null): string;
    private handleInputText;
    private moveHighlight;
    toggleDropdown(event?: MouseEvent): void;
    private openDropdown;
    private closeDropdown;
    selectRow(row: T, event?: MouseEvent): void;
    isRowSelected(row: T): boolean;
    private scrollHighlightedIntoView;
    focus(): void;
    handleKeydown(event: KeyboardEvent): void;
    onHostInput(event: Event): void;
    onDocumentClick(event: MouseEvent): void;
    get appendAddon(): IInputAddonButton | IInputAddonLoading;
    get hasOptionsList(): boolean;
    setActiveIndex(idx: number): void;
    private getPanelElement;
    private getAnchorRect;
    private ensurePanelPortaled;
    private restorePanelIfNeeded;
    private scheduleReposition;
    private revealPanel;
    private clearPanelRuntimeStyles;
    private repositionPanelNow;
    private ensureGlobalListeners;
    private removeGlobalListeners;
    static ɵfac: i0.ɵɵFactoryDeclaration<ISelect<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ISelect<any>, "i-select", never, { "placeholder": { "alias": "placeholder"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "invalid": { "alias": "invalid"; "required": false; }; "filterDelay": { "alias": "filterDelay"; "required": false; }; "panelPosition": { "alias": "panelPosition"; "required": false; }; "portalToBody": { "alias": "portalToBody"; "required": false; }; "panelOffset": { "alias": "panelOffset"; "required": false; }; "matchTriggerWidth": { "alias": "matchTriggerWidth"; "required": false; }; "options": { "alias": "options"; "required": false; }; "options$": { "alias": "options$"; "required": false; }; "displayWith": { "alias": "displayWith"; "required": false; }; "filterPredicate": { "alias": "filterPredicate"; "required": false; }; "value": { "alias": "value"; "required": false; }; }, { "onChanged": "onChanged"; "onOptionSelected": "onOptionSelected"; }, ["optionDef"], never, true, never>;
}
declare class IFCSelect<T = any> implements ControlValueAccessor, OnDestroy, AfterViewInit {
    innerSelect: ISelect<T>;
    label: string;
    placeholder: string;
    options: T[] | null;
    options$: Observable<T[]> | null;
    displayWith?: ((row: T | null) => string) | string;
    filterDelay: number;
    filterPredicate: (row: T, term: string) => boolean;
    panelPosition: ISelectPanelPosition;
    panelOffset: number;
    portalToBody: boolean;
    matchTriggerWidth: boolean;
    errorMessage?: IFormControlErrorMessage;
    get value(): T | null;
    set value(v: T | null);
    readonly onChanged: EventEmitter<ISelectChange<T>>;
    readonly onOptionSelected: EventEmitter<ISelectChange<T>>;
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
    ngAfterViewInit(): void;
    writeValue(v: T | null): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    handleSelectChange(change: ISelectChange<T>): void;
    focusInnerSelect(): void;
    get controlInvalid(): boolean;
    get required(): boolean;
    get resolvedErrorText(): string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<IFCSelect<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IFCSelect<any>, "i-fc-select", never, { "label": { "alias": "label"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "options": { "alias": "options"; "required": false; }; "options$": { "alias": "options$"; "required": false; }; "displayWith": { "alias": "displayWith"; "required": false; }; "filterDelay": { "alias": "filterDelay"; "required": false; }; "filterPredicate": { "alias": "filterPredicate"; "required": false; }; "panelPosition": { "alias": "panelPosition"; "required": false; }; "panelOffset": { "alias": "panelOffset"; "required": false; }; "portalToBody": { "alias": "portalToBody"; "required": false; }; "matchTriggerWidth": { "alias": "matchTriggerWidth"; "required": false; }; "errorMessage": { "alias": "errorMessage"; "required": false; }; "value": { "alias": "value"; "required": false; }; }, { "onChanged": "onChanged"; "onOptionSelected": "onOptionSelected"; }, never, ["*"], true, never>;
}

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
type IDatepickerPanelPosition = 'top' | 'bottom' | 'left' | 'right' | 'top left' | 'top right' | 'bottom left' | 'bottom right';
declare class IDatepicker implements ControlValueAccessor, OnInit, OnDestroy {
    private readonly hostEl;
    private readonly cdr;
    private readonly zone;
    private readonly renderer;
    placeholder: string;
    disabled: boolean;
    invalid: boolean;
    format: string;
    panelPosition: IDatepickerPanelPosition;
    private _minYear;
    private _maxYear;
    private _minYearRange;
    private _maxYearRange;
    set minYear(value: number | string | null | undefined);
    get minYear(): number | null;
    set maxYear(value: number | string | null | undefined);
    get maxYear(): number | null;
    set minYearRange(value: number | string | null | undefined);
    get minYearRange(): number | null;
    set maxYearRange(value: number | string | null | undefined);
    get maxYearRange(): number | null;
    portalToBody: boolean;
    matchTriggerWidth: boolean;
    panelOffset: number;
    set value(v: Date | string | null);
    get value(): Date | string | null;
    readonly onChanged: EventEmitter<Date | null>;
    get disabledHostClass(): boolean;
    private panelRef?;
    private portalHomeRef?;
    private _modelValue;
    private _displayText;
    get displayText(): string;
    private onChange;
    private onTouched;
    isOpen: boolean;
    viewYear: number;
    viewMonth: number;
    weeks: IDatepickerDay[][];
    readonly months: IMonthOption[];
    readonly weekdays: string[];
    private _years;
    get years(): number[];
    get monthSelected(): IMonthOption | null;
    get panelPositionClass(): string;
    private panelPortaled;
    private originalParent;
    private originalNextSibling;
    private repositionRaf;
    private listeningGlobal;
    ngOnInit(): void;
    ngOnDestroy(): void;
    writeValue(value: Date | string | null): void;
    registerOnChange(fn: (value: Date | null) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    get appendAddon(): IInputAddonButton;
    private getPanelEl;
    private getInnerInput;
    private getAnchorRect;
    private syncFromInnerInputSafely;
    private handleInput;
    private handleBlur;
    toggleOpen(): void;
    private openPanel;
    private closePanel;
    private ensurePanelPortaled;
    private restorePanelIfNeeded;
    private scheduleReposition;
    private repositionPanelNow;
    private ensureGlobalListeners;
    private removeGlobalListeners;
    prevMonth(): void;
    nextMonth(): void;
    onMonthChange(change: ISelectChange<any>): void;
    onYearChange(change: ISelectChange<number>): void;
    selectDay(day: IDatepickerDay): void;
    private initViewFromModel;
    private updateView;
    private ensureYearRange;
    private coerceYear;
    private getNormalizedYearBounds;
    private clampYear;
    private refreshYearRange;
    private buildCalendar;
    private startOfDay;
    private isSameDate;
    private parseInputDate;
    private formatDate;
    onHostInput(event: Event): void;
    onHostFocusOut(): void;
    onDocumentClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IDatepicker, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IDatepicker, "i-datepicker", never, { "placeholder": { "alias": "placeholder"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "invalid": { "alias": "invalid"; "required": false; }; "format": { "alias": "format"; "required": false; }; "panelPosition": { "alias": "panelPosition"; "required": false; }; "minYear": { "alias": "minYear"; "required": false; }; "maxYear": { "alias": "maxYear"; "required": false; }; "minYearRange": { "alias": "minYearRange"; "required": false; }; "maxYearRange": { "alias": "maxYearRange"; "required": false; }; "portalToBody": { "alias": "portalToBody"; "required": false; }; "matchTriggerWidth": { "alias": "matchTriggerWidth"; "required": false; }; "panelOffset": { "alias": "panelOffset"; "required": false; }; "value": { "alias": "value"; "required": false; }; }, { "onChanged": "onChanged"; }, never, never, true, never>;
}
/**
 * IFCDatepicker
 * Version: 1.5.4 (smart wrapper)
 */
declare class IFCDatepicker implements ControlValueAccessor, AfterViewInit, OnDestroy {
    innerDatepicker: IDatepicker;
    label: string;
    placeholder: string;
    format: string;
    panelPosition: IDatepickerPanelPosition;
    minYear: number | string | null;
    maxYear: number | string | null;
    minYearRange: number | string | null;
    maxYearRange: number | string | null;
    errorMessage?: IFormControlErrorMessage;
    get value(): Date | null;
    set value(v: Date | null);
    private _value;
    forwardedValue: Date | null;
    isDisabled: boolean;
    private onChange;
    private onTouched;
    readonly ngControl: NgControl | null;
    private readonly formDir;
    private readonly cdr;
    private readonly hostEl;
    private submitSub?;
    private lastEmittedKey;
    private pendingExternal;
    constructor();
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    writeValue(v: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    handleDateChange(date: Date | null): void;
    private applyExternalValue;
    private tryFlushPendingExternal;
    set _smartFocusHook(_: any);
    private isInnerInputFocused;
    private dateKey;
    focusInnerDatepicker(): void;
    onInnerFocusOut(): void;
    get controlInvalid(): boolean;
    get required(): boolean;
    get resolvedErrorText(): string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<IFCDatepicker, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IFCDatepicker, "i-fc-datepicker", never, { "label": { "alias": "label"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "format": { "alias": "format"; "required": false; }; "panelPosition": { "alias": "panelPosition"; "required": false; }; "minYear": { "alias": "minYear"; "required": false; }; "maxYear": { "alias": "maxYear"; "required": false; }; "minYearRange": { "alias": "minYearRange"; "required": false; }; "maxYearRange": { "alias": "maxYearRange"; "required": false; }; "errorMessage": { "alias": "errorMessage"; "required": false; }; "value": { "alias": "value"; "required": false; }; "_smartFocusHook": { "alias": "_smartFocusHook"; "required": false; }; }, {}, never, never, true, never>;
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
    disabled?: boolean;
    loading?: boolean;
    buttonType?: IButtonType;
    className?: string;
};
type IDialogActionSave = {
    type: 'save';
    disabled?: boolean;
    loading?: boolean;
    buttonType?: IButtonType;
    className?: string;
};
type IDialogActionOK = {
    type: 'ok';
    disabled?: boolean;
    loading?: boolean;
    buttonType?: IButtonType;
    className?: string;
};
type IDialogActionConfirm = {
    type: 'confirm';
    disabled?: boolean;
    loading?: boolean;
    buttonType?: IButtonType;
    className?: string;
};
type IDialogActionCustom = {
    type: 'custom';
    label: string;
    variant?: IButtonVariant;
    icon?: IIconName | string;
    disabled?: boolean;
    loading?: boolean;
    buttonType?: IButtonType;
    className?: string;
};
type IDialogActionObject = IDialogActionCancel | IDialogActionSave | IDialogActionOK | IDialogActionConfirm | IDialogActionCustom;
type IDialogAction = IDialogActionType | IDialogActionObject;
declare class IDialog {
    title: string | undefined;
    actions: IDialogAction[];
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
/**
 * Configuration for server-side data sourcing.
 * When provided on IGridDataSource, local sort/filter/paginate are skipped.
 * Data must be pushed via setData() after each server response.
 */
type IGridServerSideConfig<T = any> = {
    /** Total row count on the server (drives paginator length). */
    totalRowCount: number;
    /**
     * Emitted when the user changes sort via column header click.
     * The consumer must fetch from the server and call setData().
     */
    onSortChange?: (sort: ISortState[]) => void;
    /**
     * Emitted when the user changes page or page size via the paginator.
     * The consumer must fetch from the server and call setData().
     */
    onPageChange?: (page: {
        pageIndex: number;
        pageSize: number;
    }) => void;
    /**
     * Emitted when the filter value changes (if filter is used).
     * The consumer must fetch from the server and call setData().
     */
    onFilterChange?: (filter: string) => void;
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
    /**
     * serverSide:
     * - undefined/missing → client-side mode (local sort/filter/paginate)
     * - IGridServerSideConfig → server-side mode (delegates to callbacks)
     */
    serverSide?: IGridServerSideConfig<T>;
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
    private _serverSide;
    constructor(initialData?: T[], config?: IGridDataSourceConfig);
    get serverSide(): IGridServerSideConfig<T> | null;
    set serverSide(config: IGridServerSideConfig<T> | null);
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
     * Push server-fetched data into the data source.
     * In server mode this is the primary way to update the grid after a fetch.
     *
     * @param rows   — the page of rows returned by the server
     * @param options.total      — total row count across all pages (updates paginator length)
     * @param options.pageIndex  — current page index (syncs paginator indicator)
     * @param options.pageSize   — current page size (syncs paginator indicator)
     */
    setData(rows: T[], options?: {
        total?: number;
        pageIndex?: number;
        pageSize?: number;
    }): void;
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
    columns: QueryList<IGridColumn>;
    customColumns: QueryList<IGridCustomColumn>;
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
    /**
     * Per-row predicate to HIDE the selection checkbox/radio for specific rows
     * (e.g. group rows in tree mode that structurally cannot be selected).
     * Hidden rows are excluded from select-all and tree cascade/indeterminate logic.
     * The cell/slot still reserves space so column alignment is preserved.
     */
    selectionRowHidden?: (row: T) => boolean;
    /**
     * Per-row predicate to DISABLE (but still show) the selection checkbox/radio
     * for specific rows (e.g. already-owned/assigned rows). Disabled rows are
     * excluded from select-all and tree cascade/indeterminate logic, and cannot
     * be toggled via checkbox, row click, or programmatic API.
     */
    selectionRowDisabled?: (row: T) => boolean;
    /** Tree mode */
    tree: string | boolean | null;
    /** Indent per tree level (px) */
    treeIndent: number;
    trackBy?: (row: T) => any;
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
    /**
     * Sort mode:
     * - 'multi' (default): clicking columns accumulates sort states.
     *   Click A → A↑, click B → A↑ B↑.
     * - 'single': clicking a column replaces all previous sorts.
     *   Click A → A↑, click B → B↑ (A cleared).
     * Works with both client-side and server-side data sources.
     */
    sortMode: 'multi' | 'single';
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
    /**
     * Server-side delegation events.
     * These are alternative wiring: instead of configuring callbacks in IGridServerSideConfig,
     * consumers can bind to these outputs directly on <i-grid>.
     * The grid wires these to the dataSource.serverSide config automatically in ngAfterContentInit.
     */
    readonly onServerSortChange: EventEmitter<ISortState[]>;
    readonly onServerPageChange: EventEmitter<{
        pageIndex: number;
        pageSize: number;
    }>;
    readonly onServerFilterChange: EventEmitter<string>;
    columnDefs: QueryList<IGridColumn>;
    customColumnDefs: QueryList<IGridCustomColumn>;
    columnGroupDefs: QueryList<IGridColumnGroup>;
    expandableRowDef?: IGridRowDefDirective<T>;
    get hasExpandableRow(): boolean;
    columns: IGridColumnLike[];
    headerItems: IGridHeaderItem[];
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
    get numberColumn(): IGridColumnLike;
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
    isTreeHostColumn(col: IGridColumnLike): boolean;
    /** True when `selectionRowHidden` predicate marks this row as hidden. */
    isSelectionHidden(row: T): boolean;
    /** True when `selectionRowDisabled` predicate marks this row as disabled. */
    isSelectionDisabled(row: T): boolean;
    /** A row participates in selection UI/logic only if not hidden and not disabled. */
    isRowSelectable(row: T): boolean;
    isRowSelected(row: T): boolean;
    getRowChecked(row: T): boolean;
    getRowIndeterminate(row: T): boolean;
    get selectedRows(): T[];
    /** Count of rows in `renderedData` that are neither hidden nor disabled for selection. */
    get allVisibleSelectableCount(): number;
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
    setSelected(rows: T[]): void;
    private _sameSelection;
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
    getColumnTrack(col: IGridColumnLike, index: number): string;
    getHeaderItemTrack(item: IGridHeaderItem, index: number): string;
    getRowTrack(row: T, index: number): any;
    private _hasExplicitColumns;
    static ɵfac: i0.ɵɵFactoryDeclaration<IGrid<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IGrid<any>, "i-grid", ["iGrid"], { "dataSource": { "alias": "dataSource"; "required": false; }; "selectionMode": { "alias": "selectionMode"; "required": false; }; "selectionRowHidden": { "alias": "selectionRowHidden"; "required": false; }; "selectionRowDisabled": { "alias": "selectionRowDisabled"; "required": false; }; "tree": { "alias": "tree"; "required": false; }; "treeIndent": { "alias": "treeIndent"; "required": false; }; "trackBy": { "alias": "trackBy"; "required": false; }; "treeColumn": { "alias": "treeColumn"; "required": false; }; "treeInitialExpandLevel": { "alias": "treeInitialExpandLevel"; "required": false; }; "showNumberColumn": { "alias": "showNumberColumn"; "required": false; }; "sortMode": { "alias": "sortMode"; "required": false; }; }, { "onSelectionChange": "onSelectionChange"; "onRowClick": "onRowClick"; "onRowExpandChange": "onRowExpandChange"; "onExpandedRowsChange": "onExpandedRowsChange"; "onServerSortChange": "onServerSortChange"; "onServerPageChange": "onServerPageChange"; "onServerFilterChange": "onServerFilterChange"; }, ["expandableRowDef", "columnDefs", "customColumnDefs", "columnGroupDefs"], never, true, never>;
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
type IMenuApplication = {
    id: string;
    code: string;
    name: string;
    url?: string | null;
    version?: string | null;
};
type IMenuCompany = {
    id: string;
    code: string;
    name: string;
};
type IMenuOpenIn = 'CURRENT_TAB' | 'NEW_TAB' | 'NEW_WINDOW';
type IMenuFavoriteToggleEvent = {
    id: string | number;
    isFavorite: boolean;
};
/**
 * Emitted by `IHSidebar` after the user drag-drops a favorite into a new
 * position. Carries the ordered favorite menu ids so the host app can persist
 * the new display order via the favorites reorder API.
 */
type IMenuFavoriteReorderEvent = {
    /** Favorite menu ids in their new display order (top to bottom). */
    menuIds: (string | number)[];
};
type IMenuGroup = {
    key: string;
    label: string;
    roots: IMenu[];
};
/**
 * Sidebar menu node.
 *
 * Supports two shapes:
 * - Legacy: numeric `menuId`, `menuName`, `menuTypeId` (2 = module, 3 = group /
 *   item), `child`, `level`, `visibility`, `openInNewTab` / `reload`.
 * - Modern (contract-aligned, optional): UUID `id`, `name`, `type`
 *   ('group' | 'item' | 'function'), `children`, `openIn`, `application`,
 *   `companies`, `isFavorite`. `IHSidebar` normalizes modern nodes into the
 *   legacy shape on ingestion; the modern extras are preserved for pin /
 *   favorites / application-grouping rendering.
 */
type IMenu = {
    id?: string;
    name?: string;
    type?: 'group' | 'item' | 'function';
    children?: IMenu[];
    openIn?: IMenuOpenIn | null;
    application?: IMenuApplication | null;
    companies?: IMenuCompany[];
    isFavorite?: boolean;
    /** Backend menu code — used by menu-mode permission checks (`ihHasMn` / `ihNotHasMn`). */
    menuCode?: string | null;
    menuId?: number;
    menuName?: string;
    menuTypeId?: number;
    parentId?: number;
    sequence?: number;
    child?: IMenu[];
    level?: number;
    visibility?: string;
    selected?: boolean;
    /**
     * Open route using href + target="_blank".
     */
    openInNewTab?: boolean;
    /**
     * Force route to use href instead of routerLink.
     */
    reload?: boolean;
    route?: string | null;
    icon?: string | null;
};
type IUser = {
    employeeCode: string;
    fullName: string;
    userImagePath: string;
};
declare function getMenuRoute(menu: IMenu | null | undefined): string | null;
/**
 * Very intentionally simple:
 * If route starts with "http", never use routerLink.
 */
declare function isHttpRoute(route: string | null | undefined): boolean;
/**
 * Node key used for tracking and selection — prefers the modern UUID `id`,
 * falls back to the legacy numeric `menuId`.
 */
declare function getMenuKey(menu: IMenu | null | undefined): string | number | null;
/** Display label — prefers the modern `name`, falls back to legacy `menuName`. */
declare function getMenuLabel(menu: IMenu | null | undefined): string;
/** Children — prefers the modern `children`, falls back to legacy `child`. */
declare function getMenuChildren(menu: IMenu | null | undefined): IMenu[];
declare function hasMenuChildren(menu: IMenu | null | undefined): boolean;
/** True for a legacy top-level module header (menuTypeId === 2). */
declare function isModuleMenu(menu: IMenu | null | undefined): boolean;
/** True for a structural group/module node (non-navigable container). */
declare function isGroupNode(menu: IMenu | null | undefined): boolean;
/** True for a navigable leaf node (item / function / legacy leaf menu). */
declare function isLeafItem(menu: IMenu | null | undefined): boolean;
declare function isNewTabMenu(menu: IMenu | null | undefined): boolean;
declare function isReloadMenu(menu: IMenu | null | undefined): boolean;
declare function isSpaMenu(menu: IMenu | null | undefined): boolean;
/**
 * Converts modern (contract-aligned) menu nodes into the legacy `IMenu` shape
 * that `IHMenu` renders. Modern extras (`id`, `isFavorite`, `application`,
 * `companies`, `openIn`, `route`, `icon`) are preserved for pin / favorites /
 * application-grouping rendering. Legacy nodes pass through untouched.
 */
declare function normalizeMenuTree(menus: IMenu[] | null | undefined): IMenu[];
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
    selectedMenuId: string | number | null;
    filter: string;
    /** When true, renders a pin/star toggle on leaf items (emits `favoriteToggle`). */
    favoriteMode: boolean;
    /** When true, groups collapse/expand via a chevron (flat is the default). */
    collapsible: boolean;
    /** Nesting depth from the sidebar root (0 = top level). Drives indentation and
        the top-level "no group icon" rule — independent of the data's `level`. */
    depth: number;
    /** When true, leaf items render with `cdkDrag` so the parent `cdkDropList` can reorder them (used for the Favorites section). */
    dragEnabled: boolean;
    /** When true, leaf items render their owning application name next to the label (used for the Favorites section). */
    showApplication: boolean;
    readonly clicked: EventEmitter<any>;
    readonly favoriteToggle: EventEmitter<IMenuFavoriteToggleEvent>;
    menus: QueryList<IHMenu>;
    /** Template-bound helper for stable `@for` tracking (UUID-first). */
    readonly getMenuKey: typeof getMenuKey;
    menuItemRef: ElementRef<HTMLElement>;
    isHidden: boolean;
    get menuRoute(): string | null;
    get isSpa(): boolean;
    get isReload(): boolean;
    get isNewTab(): boolean;
    get menuLabel(): string;
    get menuChildrenList(): IMenu[];
    get menuHasChildren(): boolean;
    /** Legacy top-level module header (menuTypeId === 2). */
    get isModuleNode(): boolean;
    /** Structural group header (non-leaf container). Modules are handled by `isModuleNode`. */
    get isGroupNode(): boolean;
    /** Group is expanded unless explicitly marked collapsed (manual toggle wins). */
    get isGroupExpanded(): boolean;
    /** The synthetic Favorites group — keeps its icon at the top level. */
    get isFavoritesGroup(): boolean;
    get menuVisibility(): string;
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
    get menuIcon(): string | null;
    /** 0-based nesting level; top-level groups are always 0 (never negative). */
    get menuLevel(): number;
    /**
     * Indent level used for rendering: first-level children of a group render
     * flush-left (0) so the first level looks flat; deeper levels indent from
     * there (depth - 1, never negative).
     */
    get indentLevel(): number;
    get menuTypeId(): number;
    get menuIsFavorite(): boolean;
    /** only true for the *leaf* menu that matches selectedMenuId */
    get isSelected(): boolean;
    ngOnChanges(changes: SimpleChanges): void;
    indent(level: number): number[];
    click(): void;
    onFavoriteClick(event: Event): void;
    onChildFavoriteToggle(event: IMenuFavoriteToggleEvent): void;
    hrefWithMenuFilter(raw: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<IHMenu, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IHMenu, "ih-menu", never, { "menu": { "alias": "menu"; "required": false; }; "selectedMenuId": { "alias": "selectedMenuId"; "required": false; }; "filter": { "alias": "filter"; "required": false; }; "favoriteMode": { "alias": "favoriteMode"; "required": false; }; "collapsible": { "alias": "collapsible"; "required": false; }; "depth": { "alias": "depth"; "required": false; }; "dragEnabled": { "alias": "dragEnabled"; "required": false; }; "showApplication": { "alias": "showApplication"; "required": false; }; }, { "clicked": "clicked"; "favoriteToggle": "favoriteToggle"; }, never, never, true, never>;
}
declare class IHSidebar implements OnInit, OnChanges, OnDestroy {
    private router;
    private hostElement;
    user$: Observable<IUser>;
    menusInput$: Observable<IMenu[]>;
    visible: boolean;
    footerText: string;
    /** When true, leaf items render a pin/star toggle and the Favorites section is shown. */
    favoriteMode: boolean;
    /** Flat favorite leaf nodes, mapped by the host app from the favorites API. Rendered as a 'Favorites' group at the top of the menu body. */
    favorites$?: Observable<IMenu[]>;
    /** When true, menu roots are grouped under an application label. */
    groupByApplication: boolean;
    /** When true, groups collapse/expand via a chevron (flat is the default). */
    collapsible: boolean;
    /** Bubbled up from leaf pin toggles — the host app persists via the favorites API. */
    readonly onFavoriteToggle: EventEmitter<IMenuFavoriteToggleEvent>;
    /** Emitted after a favorites drag-drop with the ordered favorite menu ids — the host app persists via the reorder API. */
    readonly onFavoriteReorder: EventEmitter<IMenuFavoriteReorderEvent>;
    menus$: Observable<IMenu[]>;
    queryParams: any;
    menuSearch: FormControl<string | null>;
    menuFilter: i0.WritableSignal<string>;
    keyboardNavActive: i0.WritableSignal<boolean>;
    selectedIndex: i0.WritableSignal<number | null>;
    selectedMenuId: i0.WritableSignal<string | number | null>;
    /** Index the dragged favorite would land at — drives the drop placeholder + cursor. */
    readonly dragOverIndex: i0.WritableSignal<number | null>;
    /** Template-bound helper for stable `@for` tracking. */
    readonly getMenuKey: typeof getMenuKey;
    private favoritesGroupCache;
    /** Latest favorites array mirrored from `favorites$` — source of truth for drag reorder. */
    readonly favoriteItems: i0.WritableSignal<IMenu[]>;
    private favoritesSubscription;
    private navigableMenus;
    private originalMenus$;
    get sidebarVisibility(): boolean;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    /** Mirrors the `favorites$` input into the local `favoriteItems` signal. */
    private subscribeFavorites;
    private dragState;
    /** Document mousemove during an active favorites drag (live reorder preview). */
    private onDocumentMouseMove;
    /** Document mouseup — finalize (emit) or cancel the favorites drag. */
    private onDocumentMouseUp;
    /** Begins a favorites drag from a leaf inside the favorites list. */
    onFavoritesMouseDown(event: MouseEvent): void;
    /** Live-reorders the favorites so the target position is previewed while dragging. */
    private reorderFavoriteLive;
    /** Cleans up listeners, classes, and state after a favorites drag ends/cancels. */
    private cleanupFavoriteDrag;
    /**
     * Returns the index (0..n) a drop at `clientY` would land at, based on the
     * vertical midpoints of the currently rendered favorite leaves.
     */
    private computeFavoriteDropIndex;
    /**
     * Normalizes modern (contract-aligned) menu nodes into the legacy `IMenu`
     * shape on ingestion. Legacy menus pass through untouched.
     */
    private normalizeMenusStream;
    private buildMenusStream;
    private filterMenuTree;
    private filterMenuBranch;
    private updateNavigableMenus;
    private flattenNavigableMenus;
    onSearchKeyDown(event: KeyboardEvent): void;
    private ensureKeyboardNavActive;
    private moveSelection;
    private activateSelected;
    private menuFilterQueryParams;
    private appendMenuFilterToUrl;
    /**
     * Groups menu roots by their owning application so a multi-application
     * sidebar can render an application label per group.
     */
    buildMenuGroups(menus: IMenu[]): IMenuGroup[];
    /**
     * Builds a synthetic "Favorites" group node so the favorites list is rendered
     * with the exact same style as the other menu groups. Memoized by the
     * favorites array reference so the node identity stays stable across CD cycles.
     */
    getFavoritesGroup(favorites: IMenu[] | null | undefined): IMenu | null;
    private navigateToMenu;
    updateUrl(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IHSidebar, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IHSidebar, "ih-sidebar", never, { "user$": { "alias": "user$"; "required": false; }; "menusInput$": { "alias": "menusInput$"; "required": false; }; "visible": { "alias": "visible"; "required": false; }; "footerText": { "alias": "footerText"; "required": false; }; "favoriteMode": { "alias": "favoriteMode"; "required": false; }; "favorites$": { "alias": "favorites$"; "required": false; }; "groupByApplication": { "alias": "groupByApplication"; "required": false; }; "collapsible": { "alias": "collapsible"; "required": false; }; }, { "onFavoriteToggle": "onFavoriteToggle"; "onFavoriteReorder": "onFavoriteReorder"; }, never, never, true, never>;
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
    /**
     * ✅ Autocomplete for IIconName
     * ✅ Still allow any string (raw FA classes, custom classes, etc.)
     */
    icon: IIconName | (string & {}) | undefined;
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
    private get hasOnClickHandler();
    private get hasOnCloseHandler();
    handleHostClick(e: MouseEvent): void;
    handleClose(e: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IPill, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IPill, "i-pill", never, { "icon": { "alias": "icon"; "required": false; }; "size": { "alias": "size"; "required": false; }; "variant": { "alias": "variant"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "closable": { "alias": "closable"; "required": false; }; }, { "onClose": "onClose"; "onClick": "onClick"; }, never, ["*"], true, never>;
    static ngAcceptInputType_disabled: unknown;
    static ngAcceptInputType_closable: unknown;
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
    /**
     * Whether this tab is currently the active/selected one. Exposed so consumers can
     * lazily render heavy tab content via Angular's native deferred loading, e.g.:
     * `<i-section-tab #t="iSectionTab">...@defer (when t.active) { <heavy/> }...</i-section-tab>`
     */
    get active(): boolean;
    ngAfterContentInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ISectionTab, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ISectionTab, "i-section-tab", ["iSectionTab"], { "title": { "alias": "title"; "required": false; }; "opened": { "alias": "opened"; "required": false; }; "badge": { "alias": "badge"; "required": false; }; }, {}, ["headerCmp", "contentCmp"], ["*"], true, never>;
    static ngAcceptInputType_opened: any;
}
declare class ISectionTabs implements AfterContentInit, AfterViewInit, OnDestroy {
    tabs: QueryList<ISectionTab>;
    /** optional controlled mode */
    selectedIndex: number | null;
    /** Enable sticky header via plain CSS `position: sticky`. Default off (opt-in). */
    sticky: boolean;
    /** CSS `top` offset used when `sticky` is enabled. Default `-16px` accounts for
     *  section border-radius clearance (matches the previous i-section-tab-bar default). */
    stickyTopOffset: string;
    /** Enable natural-width tabs + horizontal overflow scroll + chevrons. Default off
     *  preserves today's equal-width layout exactly. */
    scrollable: boolean;
    /** Chevron icon size — only relevant when `scrollable` is enabled. */
    chevronSize: 'sm' | 'md' | 'lg' | 'xl';
    /** Minimum tab button height (CSS value, e.g. `'48px'`). */
    tabMinHeight: string;
    /** Extra class(es) applied to the headers row wrapper. */
    headerClass: string;
    /** Extra class(es) applied to each tab button. */
    tabClass: string;
    /** Visual skin: `'default'` keeps today's equal-width/box-shadow look unchanged (default);
     *  `'bar'` opts into the fully ported i-section-tab-bar visual style. */
    styleVariant: 'default' | 'bar';
    /** ✅ standardized output name (Angular + React parity) — kept for backward compatibility. */
    readonly onSelectedIndexChange: EventEmitter<number>;
    /** Angular two-way-binding-convention-named alias, enabling `[(selectedIndex)]`.
     *  Emitted alongside `onSelectedIndexChange` (both always fire together). */
    readonly selectedIndexChange: EventEmitter<number>;
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
    /** Computed chevron button width from `chevronSize`. */
    get chevronWidthPx(): number;
    tabsArr: ISectionTab[];
    activeIndex: number;
    showLeftChevron: boolean;
    showRightChevron: boolean;
    private readonly cdr;
    private resizeObserver;
    private _scrollContainer?;
    set scrollContainer(content: ElementRef<HTMLElement> | undefined);
    get scrollContainer(): ElementRef<HTMLElement> | undefined;
    get activeTab(): ISectionTab | null;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    activate(index: number): void;
    activateByTab(tab: ISectionTab): void;
    onScroll(): void;
    scrollLeft(): void;
    scrollRight(): void;
    private checkOverflow;
    private scrollToActive;
    private setActive;
    private isValidIndex;
    static ɵfac: i0.ɵɵFactoryDeclaration<ISectionTabs, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ISectionTabs, "i-section-tabs", never, { "selectedIndex": { "alias": "selectedIndex"; "required": false; }; "sticky": { "alias": "sticky"; "required": false; }; "stickyTopOffset": { "alias": "stickyTopOffset"; "required": false; }; "scrollable": { "alias": "scrollable"; "required": false; }; "chevronSize": { "alias": "chevronSize"; "required": false; }; "tabMinHeight": { "alias": "tabMinHeight"; "required": false; }; "headerClass": { "alias": "headerClass"; "required": false; }; "tabClass": { "alias": "tabClass"; "required": false; }; "styleVariant": { "alias": "styleVariant"; "required": false; }; "height": { "alias": "height"; "required": false; }; }, { "onSelectedIndexChange": "onSelectedIndexChange"; "selectedIndexChange": "selectedIndexChange"; }, ["tabs"], [":not(i-section-tab)"], true, never>;
    static ngAcceptInputType_sticky: unknown;
    static ngAcceptInputType_scrollable: unknown;
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

/** Available sizes for i-toggle. Maps to --i-size-* design tokens (default: md = 34px). */
type IToggleSize = 'xs' | 'sm' | 'md' | 'lg';
declare class IToggle implements ControlValueAccessor {
    disabled: boolean;
    /** put label left or right */
    labelPosition: 'left' | 'right';
    /** Toggle size. Maps to --i-size-* design tokens. Default 'md' (34px). */
    size: IToggleSize;
    checked: boolean;
    readonly onChange: EventEmitter<boolean>;
    readonly onTouched: EventEmitter<void>;
    inputRef: ElementRef<HTMLInputElement>;
    baseClass: boolean;
    get activeClass(): boolean;
    get disabledClass(): boolean;
    get labelLeftClass(): boolean;
    get toggleHeight(): string | null;
    get toggleWidth(): string | null;
    get toggleHandleSize(): string | null;
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
    static ɵcmp: i0.ɵɵComponentDeclaration<IToggle, "i-toggle", never, { "disabled": { "alias": "disabled"; "required": false; }; "labelPosition": { "alias": "labelPosition"; "required": false; }; "size": { "alias": "size"; "required": false; }; }, { "onChange": "onChange"; "onTouched": "onTouched"; }, never, ["*"], true, never>;
}

declare class IAvatar {
    /** Image URL. When empty or on error, falls back to fallbackSrc or icon. */
    src?: string | null;
    /** Alt text for the image. */
    alt?: string;
    /**
     * Container size.
     * - `number` → treated as pixels (e.g. `200` = 200px)
     * - `IIconSize` string → uses a preset mapping (e.g. `'lg'` = 64px)
     * @default 40
     */
    size: number | IIconSize;
    /**
     * Container shape.
     * @default 'circle'
     */
    shape?: 'circle' | 'square' | 'rounded-square';
    /** Fallback image URL. Used when `src` fails to load. If not set (or also fails), shows the user icon. */
    fallbackSrc?: string | null;
    /** Additional CSS classes to inject onto the host element (e.g. `"border-2 border-primary"`). */
    className?: string;
    /** Whether the primary `src` image failed to load. */
    hasError: boolean;
    /** Whether the `fallbackSrc` image also failed to load. */
    hasFallbackError: boolean;
    readonly baseClass = true;
    get attrShape(): string;
    get resolvedSizePx(): number;
    get hostClass(): string | undefined;
    /** Icon size for the fallback `<i-icon>`. */
    get resolvedIconSize(): IIconSize;
    onImgError(): void;
    onFallbackError(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IAvatar, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IAvatar, "i-avatar", never, { "src": { "alias": "src"; "required": false; }; "alt": { "alias": "alt"; "required": false; }; "size": { "alias": "size"; "required": false; }; "shape": { "alias": "shape"; "required": false; }; "fallbackSrc": { "alias": "fallbackSrc"; "required": false; }; "className": { "alias": "className"; "required": false; }; }, {}, never, never, true, never>;
}

declare class IUI {
    static ɵfac: i0.ɵɵFactoryDeclaration<IUI, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<IUI, never, [typeof IAvatar, typeof IButton, typeof ICardModule, typeof ICodeViewerModule, typeof IDatepicker, typeof IFCDatepicker, typeof IDialogModule, typeof IGridModule, typeof IHContent, typeof IHSidebar, typeof IIcon, typeof IInputModule, typeof ILoading, typeof ISectionModule, typeof ISelect, typeof IFCSelect, typeof ITextArea, typeof IFCTextArea, typeof IToggle, typeof IPill], [typeof IAvatar, typeof IButton, typeof ICardModule, typeof ICodeViewerModule, typeof IDatepicker, typeof IFCDatepicker, typeof IDialogModule, typeof IGridModule, typeof IHContent, typeof IHSidebar, typeof IIcon, typeof IInputModule, typeof ILoading, typeof ISectionModule, typeof ISelect, typeof IFCSelect, typeof ITextArea, typeof IFCTextArea, typeof IToggle, typeof IPill]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<IUI>;
}

/**
 * Token lifespan configuration (seconds). Mirrors the platform-wide AC used by
 * iam-web: Access Token 1h, Refresh Token 2h, Max SSO Session 15h. Consumer
 * apps should reuse the exact same values as iam-web for consistency, not
 * invent their own policy.
 */
type IInsightTokenLifespan = {
    accessTokenSeconds: number;
    refreshTokenSeconds: number;
    ssoSessionMaxSeconds: number;
};
/**
 * Configuration required by @insight/ui's shared auth package
 * (IApiService, ISessionService, ICsrfService, authGuard, authInterceptor).
 *
 * Consumer apps provide this via `provideInsightAuth(config)` in their
 * `app.config.ts` / bootstrap `ApplicationConfig`.
 */
type IInsightAuthConfig = {
    /** API base URLs grouped by backend service. `identity` (iam-identity-api) is required — all auth calls (csrf, refresh) go through it. */
    api: {
        identity: string;
        [key: string]: string;
    };
    /** Full URL of iam-web's signin page — consumer apps redirect here when unauthenticated. */
    signinUrl: string;
    /**
     * This app's own SSO callback route, e.g. `/auth/callback` (default).
     * `authGuard`/`authInterceptor` always redirect through this route (never
     * through the page the user was originally trying to visit) so the
     * `#at=<token>` handoff has a dedicated place to be consumed and stripped
     * before the user is sent on to their original destination. See
     * `build-signin-redirect-url.ts` for why this matters (redirect-loop / HTTP
     * 431 prevention).
     */
    callbackPath?: string;
    /**
     * Trusted origins for post-callback/return redirects. Absolute URLs matching
     * any origin here are allowed; all others fall back to '/'. Wildcards are
     * supported (e.g. `https://*.paramount-land.com`). Relative paths (starting
     * with `/`) are always allowed regardless of this list.
     */
    allowedReturnOrigins: string[];
    /**
     * Cookie domain used by iam-identity-api for the HttpOnly refresh token
     * cookie. Informational only — the frontend never reads or sets this cookie.
     */
    cookieDomain: string;
    tokenLifespan: IInsightTokenLifespan;
    /** CSRF token max age in seconds (backend cookie maxAge minus a safety buffer). */
    csrfTokenMaxAgeSeconds: number;
};
/**
 * Overrides accepted by `provideInsightAuth()`. Every field is optional and
 * merged on top of `getDefaultInsightAuthConfig()` — including individual
 * `api.*` and `tokenLifespan.*` entries, so a consumer app can override just
 * `api.identity` (e.g. for staging/production) without having to restate the
 * rest of the config.
 *
 * Deliberately NOT an open/arbitrary shape (no index signature at this
 * level) — `IInsightAuthConfig` is a narrow, well-defined auth contract, not
 * a general app environment object. The one exception is `api`, which is
 * intentionally open-ended (a named registry of backend base URLs) since
 * consumer apps may need to register additional service URLs beyond
 * `identity`.
 */
type IInsightAuthConfigOverrides = Partial<Omit<IInsightAuthConfig, 'api' | 'tokenLifespan'>> & {
    api?: Partial<IInsightAuthConfig['api']>;
    tokenLifespan?: Partial<IInsightTokenLifespan>;
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
declare function getDefaultInsightAuthConfig(): IInsightAuthConfig;
/**
 * Injection token carrying the consumer app's `IInsightAuthConfig`. Provided via
 * `provideInsightAuth()`. Has a root-level default (`getDefaultInsightAuthConfig()`)
 * so the library services never break when a consumer forgets to call
 * `provideInsightAuth()` — consumers override it explicitly.
 */
declare const INSIGHT_AUTH_CONFIG: InjectionToken<IInsightAuthConfig>;

type ISanitizedReturnUrl = {
    returnUrl: string;
    isExternal: boolean;
};
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
declare function sanitizeReturnUrl(url: string | null | undefined, allowedReturnOrigins: string[]): ISanitizedReturnUrl;

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
declare function buildExternalSigninUrl(config: IInsightAuthConfig, targetPath: string): string;

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
declare function provideInsightAuth(overrides?: IInsightAuthConfigOverrides): EnvironmentProviders;

/**
 * Extract the access token appended by iam-web after a successful external
 * SSO redirect. Reads the URL HASH FRAGMENT (`#at=<token>`) — deliberately
 * NOT a query parameter — so the token is never sent to the server and never
 * appears in access/gateway logs (fragments are browser-only and are
 * unconditionally stripped from the `Referer` header).
 */
declare function extractAccessTokenFromHash(): string | null;
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
declare class IAuthCallback implements OnInit {
    private readonly session;
    private readonly config;
    private readonly router;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IAuthCallback, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IAuthCallback, "i-auth-callback", never, {}, {}, never, never, true, never>;
}

/**
 * Unified login response. When MFA is required, only `mfa*` fields are set and
 * `accessToken` is absent. Once MFA is verified, `accessToken`/`expiresIn`/
 * `user` are populated and `mfaRequired` is false/absent.
 */
type ILoginResponse = {
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
    user?: IAuthUser;
    mfaRequired?: boolean;
    mfaStep?: 'CHALLENGE' | 'ENROLL';
    mfaSessionId?: string;
    qrCodeUri?: string;
    secret?: string;
    passwordExpired?: boolean;
    changePasswordToken?: string;
    requiresV2Challenge?: boolean;
};
type IMfaChallengeResponse = {
    accessToken: string;
    refreshToken?: string;
    expiresIn: number;
    user: IAuthUser;
};
type IRefreshResponse = {
    accessToken: string;
    refreshToken?: string;
    expiresIn: number;
};
/** User claims decoded from the access token / returned by the backend. */
type IAuthUser = {
    sub: string;
    email: string;
    name: string;
    roles: string[];
    userType: 'internal' | 'external';
};
type IForgotPasswordResponse = {
    message: string;
    token?: string;
    link?: string;
};
type IValidateResetTokenResponse = {
    valid: boolean;
    reason?: 'invalid' | 'expired' | 'used';
    email?: string;
};
type IResetPasswordResponse = {
    success: boolean;
    message: string;
    reason?: 'invalid' | 'expired' | 'used' | 'history';
};
/**
 * iam-identity-api auth facade (Mode 2 proxy — Keycloak is never exposed to the
 * frontend). Base URL = `{api.identity}` from the resolved auth config.
 *
 * @overridable — consumers may provide `{ provide: IAuthService, useClass: ... }`.
 */
declare class IAuthService {
    private readonly api;
    private readonly config;
    private get identityUrl();
    login(username: string, password: string, recaptchaToken?: string, isChallengeResponse?: boolean): Observable<ILoginResponse>;
    /** Silently refresh the access token via the HttpOnly refresh-token cookie. */
    refresh(): Observable<IRefreshResponse>;
    /** Clear the server-side session and expire the HttpOnly refresh cookie. */
    logout(refreshToken?: string): Observable<void>;
    /** Exchange a short-lived `at=` auth token for a full session (cross-app handoff). */
    exchangeAuthToken(authToken: string): Observable<ILoginResponse>;
    /** Verify the MFA TOTP code during a login challenge. */
    verifyMfaChallenge(mfaSessionId: string, totpCode: string): Observable<IMfaChallengeResponse>;
    /** Verify the TOTP code during first-time MFA enrollment (forced at login). */
    verifyMfaEnroll(mfaSessionId: string, totpCode: string): Observable<IMfaChallengeResponse>;
    /** Self-service MFA — check enrollment status (`GET /profile/mfa`). */
    selfServiceGetStatus(): Observable<{
        enrolled: boolean;
        createdAt?: string;
        lastUsedAt?: string;
    }>;
    /** Self-service MFA — initiate enrollment to get the QR & session id (`POST /profile/mfa/enroll`). */
    selfServiceEnrollInitiate(): Observable<{
        qrCodeUri: string;
        secret: string;
        enrollmentSessionId: string;
    }>;
    /** Self-service MFA — verify OTP and complete enrollment (`POST /profile/mfa/enroll/verify`). */
    selfServiceEnrollVerify(enrollmentSessionId: string, totpCode: string): Observable<void>;
    /** Self-service reset (un-enroll) MFA for the current user — requires password (`DELETE /profile/mfa`). */
    selfServiceResetMfa(userSub: string, password: string): Observable<void>;
    /**
     * Change password when it has expired (forced change flow). Uses a short-lived
     * `changePasswordToken` (10 min, scope `change_password_only`) as the Bearer
     * header. Backend returns a full accessToken on success so the user continues
     * seamlessly without re-login.
     */
    changePassword(changePasswordToken: string, newPassword: string, confirmPassword: string): Observable<{
        success: boolean;
        accessToken?: string;
        refreshToken?: string;
        expiresIn?: number;
    }>;
    /** Request a password-reset link via email or WhatsApp (`POST /auth/forgot-password`). */
    forgotPassword(identifier: string, mode: 'email' | 'whatsapp'): Observable<IForgotPasswordResponse>;
    /** Validate a reset token before showing the reset form (`GET /auth/reset-password/validate`). */
    validateResetToken(token: string): Observable<IValidateResetTokenResponse>;
    /** Submit a new password using the reset token (`POST /auth/reset-password`). */
    resetPassword(token: string, newPassword: string, confirmPassword: string): Observable<IResetPasswordResponse>;
    private getLockoutData;
    private recordFailedAttempt;
    private resetLockout;
    static ɵfac: i0.ɵɵFactoryDeclaration<IAuthService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IAuthService>;
}

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
declare class ICsrfService {
    private readonly http;
    private readonly config;
    /** In-memory CSRF token — retrieved from the backend response body, never from document.cookie directly. */
    private token;
    private tokenFetchedAt;
    /**
     * Return the in-memory CSRF token, or `null` if never fetched or expired
     * (expiry triggers callers to re-invoke `ensureToken()`).
     */
    getToken(): string | null;
    /** Whether the in-memory token has exceeded its TTL (`csrfTokenMaxAgeSeconds`). */
    isTokenExpired(): boolean;
    /**
     * Fetch a fresh CSRF token from `iam-identity-api` and store it in memory.
     * On failure the error is propagated (callers that want best-effort behavior
     * can catch it) — a failed fetch must not be silently swallowed, e.g. so the
     * `retryOnCsrfError` pattern can re-trigger the fetch.
     */
    ensureToken(): Observable<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ICsrfService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ICsrfService>;
}

/** Response type is transparent — no `{ meta, data }` wrapper. */
type IApiResponse<T = any> = T;
/** Options for individual HTTP calls. */
type IApiOptions = {
    /** Override the default API base URL (e.g. to call a different backend service). */
    apiUrl?: string;
    /** Additional headers to merge with the defaults. */
    headers?: Record<string, string>;
    /** Request body (only used by DELETE requests that send a payload). */
    body?: any;
};
/**
 * Standardized HTTP client for @insight/ui consumer apps.
 * Mirrors iam-web's `IApiService`: `withCredentials: true` on every request
 * (required for the CSRF cookie and the HttpOnly refresh cookie to flow),
 * automatic `X-CSRF-Token` header injection, transparent response typing
 * (`T`, no wrapper), and RFC 9457 Problem Details error enrichment matching
 * the exact shape iam-web already produces (`status`/`detail`/`retryAfter`)
 * so consumer apps can reuse the `err?.detail ?? 'fallback'` convention.
 */
declare class IApiService {
    private readonly http;
    private readonly csrf;
    private readonly config;
    private get headers();
    /**
     * Normalize a raw `HttpErrorResponse` into a consistent shape:
     * `{ status, detail, retryAfter, ...rest }`. `retryAfter` is read from the
     * body or the `Retry-After` header, so 429/423 responses surface it
     * untouched for rate-limit/lockout UX.
     */
    private enrichError;
    get<T = any>(path: string, params?: HttpParams, options?: IApiOptions): Observable<T>;
    post<T = any>(path: string, body?: any, options?: IApiOptions): Observable<T>;
    put<T = any>(path: string, body?: any, options?: IApiOptions): Observable<T>;
    delete<T = any>(path: string, options?: IApiOptions): Observable<T>;
    getBlob(path: string, params?: HttpParams, options?: IApiOptions): Observable<Blob>;
    upload<T = any>(path: string, file: File | FormData, options?: IApiOptions): Observable<T>;
    static ɵfac: i0.ɵɵFactoryDeclaration<IApiService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IApiService>;
}

type SessionExpiredReason = 'TOKEN_EXPIRED' | 'SESSION_REVOKED' | 'SESSION_REPLACED';
/** Supports normalized Problem Details errors and raw legacy HTTP error bodies. */
declare const extractProblemDetailsErrorCode: (error: unknown) => string | undefined;
/** Maps current backend and legacy error codes to the session-expired UI states. */
declare const toSessionExpiredReason: (errorCode: string | undefined) => SessionExpiredReason | undefined;
/**
 * True when an error is semantically a session-expiry event (HTTP 401/498 or a
 * recognized session-related error code). Other statuses are business/transport
 * errors and must be handled by the caller instead of forcing a logout.
 */
declare const isSessionExpiredError: (error: unknown) => boolean;
/**
 * In-memory overlay state for the session-expired UI.
 *
 * Besides the derived `reason`, the service also exposes the RAW backend error
 * code and Problem Details `detail` so consumer apps (e.g. iam-web) can resolve
 * a localized display message from their own error-catalog service without the
 * library ever calling the configuration API.
 *
 * @overridable — consumers may provide `{ provide: SessionExpiredService, useClass: ... }`.
 */
declare class SessionExpiredService {
    readonly visible: i0.WritableSignal<boolean>;
    readonly returnUrl: i0.WritableSignal<string>;
    readonly reason: i0.WritableSignal<SessionExpiredReason | undefined>;
    /** Raw error code from the backend Problem Details response (e.g. `AUTH_TOKEN_EXPIRED`). */
    readonly errorCode: i0.WritableSignal<string | null>;
    /** Backend-provided `detail` message from the Problem Details response — display fallback. */
    readonly detail: i0.WritableSignal<string | null>;
    show(returnUrl: string, reason?: SessionExpiredReason, errorCode?: string | null, detail?: string | null): void;
    hide(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SessionExpiredService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SessionExpiredService>;
}

/** User derived from Keycloak JWT claims. */
type ISessionUser = {
    sub: string;
    email: string;
    name: string;
    roles: string[];
    userType: 'internal' | 'external';
};
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
declare class ISessionService {
    private readonly authService;
    private readonly config;
    private readonly sessionExpiredService;
    private readonly csrf;
    private accessToken;
    private _refreshToken;
    private expiresAt;
    private sessionStartedAt;
    private currentUser;
    private passwordExpired;
    private changePasswordTokenValue;
    private lastVerifiedAt;
    /**
     * True while the app is restoring/validating the session on load (starts
     * `true` on cold start so guards can allow navigation during the restore and
     * consumer apps can show a loading state). Cleared once the session is
     * established (`setAccessToken`/`setSession`) or `tryRestoreSession()` settles.
     */
    readonly initializing: i0.WritableSignal<boolean>;
    private refreshInFlight;
    private restoreInFlight;
    isAuth(): boolean;
    isTokenExpired(): boolean;
    /**
     * Whether the max SSO session duration has been exceeded (default 15h,
     * configured via `tokenLifespan.ssoSessionMaxSeconds`). After this, the
     * user must re-authenticate regardless of token state.
     */
    isSsoSessionExpired(): boolean;
    isPasswordExpired(): boolean;
    clearPasswordExpired(): void;
    setPasswordExpired(): void;
    setChangePasswordToken(token: string): void;
    getChangePasswordToken(): string | null;
    clearChangePasswordToken(): void;
    getAccessToken(): string | null;
    getRefreshToken(): string | null;
    getUser(): ISessionUser | null;
    /** Role-membership check against the decoded token roles (ANY match). */
    hasMn(mn: string | string[]): boolean;
    /**
     * Roles claimed by the current access token (Keycloak `realm_access.roles`).
     * Returns an empty array while no token is set. Used by role-mode permission
     * checks (`ihHasMn` / `ihNotHasMn` with `source: 'role'`).
     */
    getRoles(): string[];
    /** True if the current access token claims ANY of the given roles. */
    hasRole(code: string | string[]): boolean;
    /**
     * Store the access token received from the SSO handoff (URL hash fragment)
     * or from a refresh response. `expiresIn` (seconds) defaults to the token's
     * own `exp` claim, then falls back to the configured `accessTokenSeconds`.
     */
    setAccessToken(accessToken: string, expiresIn?: number): void;
    /**
     * Full session establishment (login / MFA / exchange / refresh). Sets the
     * user, decodes password-expiry claims, stamps the last-verified time, and
     * marks an active session so `tryRestoreSession()` can distinguish a cold
     * start from a refresh-after-revocation.
     */
    setSession(accessToken: string, expiresIn: number, user: IAuthUser, refreshToken?: string): void;
    clearSession(): void;
    /**
     * Clears the client-side session AND invalidates the server-side session
     * by revoking the refresh token. Returns an observable that completes after
     * the server logout call finishes (or fails — failures are swallowed so the
     * user is never stuck on a logout page).
     */
    logout(): Observable<void>;
    /**
     * Silently refresh the access token via the HttpOnly refresh cookie
     * (`POST {api.identity}/auth/refresh`, `withCredentials: true`).
     * Single-flight: concurrent callers share the in-flight refresh; the shared
     * observable is retained until it completes/errors so a cancelled caller
     * cannot abort the fetch.
     */
    refreshToken(): Observable<string>;
    /** True if the session was verified against the backend within `cooldownMs` (default 30s). */
    isRecentlyVerified(cooldownMs?: number): boolean;
    /**
     * Proactive session validation for guards. Refreshes the token to check
     * session validity WITHOUT resetting the SSO session timer. Skips the refresh
     * if the last check was within 30 seconds. Throws if the session was revoked
     * (e.g. `SESSION_REPLACED`).
     */
    proactiveValidate(): Observable<string>;
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
    tryRestoreSession(): Promise<{
        reason?: SessionExpiredReason;
    }>;
    private readExpiresInFromToken;
    static ɵfac: i0.ɵɵFactoryDeclaration<ISessionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ISessionService>;
}

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
declare const authGuard: CanActivateFn;

/**
 * Auth HTTP interceptor for @insight/ui consumer apps.
 *
 * Attaches the in-memory access token as a Bearer header. On 401, attempts a
 * single silent refresh (via the HttpOnly refresh cookie) and retries once;
 * on refresh failure, clears the session and redirects to iam-web's signin
 * page. 429 (rate-limit) and 423 (lockout) responses are passed through
 * untouched — `IApiService.enrichError()` already surfaces `retryAfter` for
 * consumer apps to build the same UX as iam-web.
 */
declare const authInterceptor: HttpInterceptorFn;

/**
 * Types for the current-user navigation & favorites data, matched to the
 * iam-user-api user-menu service contract (`GET {api.user}/me/menus*` and
 * `GET {api.user}/users/user`). These are the raw backend shapes; the library
 * maps them onto the UI-facing `IMenu` / `IUser` contracts via `user.mapper.ts`.
 */
/** Standard `{ meta, data }` response envelope used by the user-menu endpoints. */
type IInsightUserMenuEnvelope<T> = {
    meta: {
        timestamp: string;
    };
    data: T;
};
/** Navigation target for a menu node. */
type IInsightMenuOpenIn = 'CURRENT_TAB' | 'NEW_TAB' | 'NEW_WINDOW';
/** Owning application reference for a menu node. */
type IInsightMenuApplication = {
    id: string;
    code: string;
    name: string;
    url: string | null;
    version: string | null;
};
/** Effective company access for a menu node. */
type IInsightMenuCompany = {
    id: string;
    code: string;
    name: string;
};
/** Effective menu node returned by `GET {api.user}/me/menus` (user-menu contract). */
type IInsightMenuNode = {
    id: string;
    name: string;
    type: 'group' | 'item';
    menuCode: string | null;
    parentId: string | null;
    route: string | null;
    icon: string | null;
    openIn: IInsightMenuOpenIn | null;
    sequence: number;
    application: IInsightMenuApplication;
    companies: IInsightMenuCompany[];
    isFavorite: boolean;
    children: IInsightMenuNode[];
};
/** Favorite item returned by `GET {api.user}/me/menus/favorites`. */
type IInsightFavoriteMenuItem = {
    id: string;
    name: string;
    /** User-controlled display order (1..n). */
    displayOrder: number;
    menuCode: string | null;
    route: string | null;
    icon: string | null;
    openIn: IInsightMenuOpenIn | null;
    application: IInsightMenuApplication;
    companies: IInsightMenuCompany[];
};
/** One entry of the reorder payload for `PUT {api.user}/me/menus/favorites`. */
type IInsightFavoriteOrderItem = {
    menuId: string;
    displayOrder: number;
};
/** Current user returned by `GET {api.user}/users/user` (iam-user-api `CurrentUserDto`). */
type IInsightCurrentUser = {
    userId: string;
    username: string;
    fullName: string;
    employeeCode: string | null;
    email: string;
    photoUrl: string | null;
    userType: 'internal' | 'external';
    occupationName: string | null;
    departmentName: string | null;
    enabled: boolean;
};

/**
 * Maps the backend current-user DTO to `@insight/ui`'s sidebar `IUser` shape
 * (`employeeCode` / `fullName` / `userImagePath`), falling back to `username`.
 * `userImagePath` is `''` when no photo exists — the sidebar renders it with
 * `i-avatar`, which falls back to a user icon when the image is empty/errors.
 */
declare function mapToSidebarUser(user: IInsightCurrentUser): IUser;
/** Maps a backend effective-menu node onto the UI-facing `IMenu` (modern shape). */
declare function toIMenu(node: IInsightMenuNode): IMenu;
/** Maps an array of backend effective-menu nodes onto `IMenu[]`. */
declare function toIMenus(nodes: IInsightMenuNode[]): IMenu[];
/** Maps a backend favorite item onto the UI-facing `IMenu` (modern shape). */
declare function toIMenuFavorite(item: IInsightFavoriteMenuItem): IMenu;
/** Recursively collects every non-null `menuCode` across a menu tree (deduplicated, order preserved). */
declare function collectMenuCodes(menus: IMenu[]): string[];
/**
 * Menu-mode permission check: returns true if the user's loaded menus contain
 * ANY of the given menu codes. An empty set of menus (not yet loaded) always
 * returns `false` — gated UI renders only once the store has data.
 */
declare function hasAnyMenuCode(menus: IMenu[], code: string | string[]): boolean;
/** First navigable leaf route in a menu tree — a sensible post-login default landing. */
declare function findFirstLeafRoute(menus: IMenu[]): string | null;
/** Finds a menu node's display name by id (recursive), or null. */
declare function findMenuNameById(menus: IMenu[], menuId: string | number): string | null;

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
declare class IUserMenuService {
    private readonly api;
    private readonly config;
    private get baseUrl();
    /** GET `{api.user}/me/menus` — effective navigation tree for one or all active applications. Output type overridable via `T`. */
    getEffectiveMenus<T = IInsightMenuNode[]>(applicationId?: string): Observable<T>;
    /** GET `{api.user}/me/menus/favorites` — effective favorite items, sorted by name. Output type overridable via `T`. */
    getFavorites<T = IInsightFavoriteMenuItem[]>(applicationId?: string): Observable<T>;
    /** PUT `{api.user}/me/menus/{menuId}/favorite` — pin an effective menu item (204 No Content). */
    addFavorite(menuId: string | number): Observable<void>;
    /** DELETE `{api.user}/me/menus/{menuId}/favorite` — unpin a menu item (204 No Content). */
    removeFavorite(menuId: string | number): Observable<void>;
    /**
     * PUT `{api.user}/me/menus/favorites` — atomically replace the complete
     * favorite collection after a drag-drop. `displayOrder` values form the
     * complete sequence 1..n. Returns 204 No Content.
     */
    reorderFavorites(menuIds: (string | number)[]): Observable<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<IUserMenuService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IUserMenuService>;
}

/**
 * Current-user profile service — calls iam-user-api's `GET {api.user}/users/user`
 * endpoint (`CurrentUserDto`). The sidebar-shaped mapping (`IUser`) lives in
 * `user.mapper.ts` (`mapToSidebarUser`).
 *
 * Base URL: `{api.user}` from the resolved auth config (defaults to the
 * library environment file). Output type overridable via the generic — the
 * library default is the raw `IInsightCurrentUser` DTO.
 */
declare class ICurrentUserService {
    private readonly api;
    private readonly config;
    private get baseUrl();
    /** GET `{api.user}/users/user` — raw current-user DTO. Override `T` to use your own response type. */
    getCurrentUser<T = IInsightCurrentUser>(): Observable<T>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ICurrentUserService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ICurrentUserService>;
}

/**
 * Session-storage wrapper for non-sensitive UI state (returnUrl, nonce/state).
 * Tokens are NEVER stored here — the access token lives in-memory
 * (`ISessionService`) and the refresh token lives in an HttpOnly cookie set by
 * iam-identity-api.
 *
 * @overridable — consumers may provide `{ provide: IStorageService, useClass: ... }`.
 */
declare class IStorageService {
    private readonly storageKey;
    get(key: string): string;
    set(key: string, value: string): void;
    delete(key: string): void;
    clear(): void;
    /** Save the return URL for post-login/post-password-change redirect (keyed `ru`). */
    setReturnUrl(url: string): void;
    /** Retrieve and clear the saved return URL. Returns `'/'` when none is saved. */
    getReturnUrl(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<IStorageService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IStorageService>;
}

/**
 * In-memory store for the current user's sidebar data — user profile, effective
 * navigation menus, favorites — and permission checks.
 *
 * Everything lives in memory (signals); NOTHING is persisted to Web Storage.
 * On a cold start (page load) consumers call `load()` to re-fetch user, menus
 * and favorites; the store then re-emits so gated UI (`ihHasMn` /
 * `ihNotHasMn`) re-renders reactively once data is available (async-aware).
 */
declare class IUserMenuStore {
    private readonly currentUserService;
    private readonly menuService;
    private readonly session;
    /** Sidebar-shaped current user (`IUser`) — `null` until loaded. */
    readonly currentUser: i0.WritableSignal<IUser | null>;
    /** Raw current-user DTO as returned by the backend — `null` until loaded. */
    readonly rawCurrentUser: i0.WritableSignal<IInsightCurrentUser | null>;
    /** Effective navigation tree (`IMenu` modern shape). */
    readonly menus: i0.WritableSignal<IMenu[]>;
    /** Favorite menus (`IMenu` modern shape). */
    readonly favorites: i0.WritableSignal<IMenu[]>;
    /** Roles decoded from the access token (for `source: 'role'` permission checks). */
    readonly roles: i0.WritableSignal<string[]>;
    /** True while the cold-start `load()` is in flight. */
    readonly initializing: i0.WritableSignal<boolean>;
    /** First error encountered during `load()`, if any (e.g. `menus: ...`). */
    readonly loadError: i0.WritableSignal<string | null>;
    readonly currentUser$: Observable<IUser | null>;
    readonly menus$: Observable<IMenu[]>;
    readonly favorites$: Observable<IMenu[]>;
    readonly roles$: Observable<string[]>;
    readonly initializing$: Observable<boolean>;
    /**
     * Post-login default landing (when no return URL is present).
     * Order: (1) first navigable favorite route, (2) first navigable menu route.
     */
    get defaultRoute(): string | null;
    /** Finds a menu node's display name by id (recursive), or null. */
    findMenuName(menuId: string | number): string | null;
    /**
     * Cold-start: fetch user + menus + favorites concurrently. A failure in one
     * branch does not block the others; `initializing` clears once all settle.
     *
     * Returns an observable that completes when the load settles, so callers can
     * await it (e.g. to navigate to `defaultRoute` after login). The load starts
     * immediately even if the caller ignores the returned observable — a shared
     * source is kept alive by an internal subscribe (fire-and-forget compatible).
     */
    load(): Observable<void>;
    /** Refresh roles from the current access token (call after login / token change). */
    syncRoles(): void;
    /**
     * Menu-mode permission check against the in-memory menu codes (ANY match).
     * Returns `false` while menus are not yet loaded — gated UI renders only
     * after the store has data (async-aware via the reactive directives).
     */
    hasMenu(code: string | string[]): boolean;
    /** Role-mode permission check against the in-memory roles (from the access token's `realm_access.roles`). ANY match. */
    hasRole(code: string | string[]): boolean;
    /**
     * Pin (`isFavorite: true`) or unpin a menu item. Flips the star icon in the
     * `menus` tree immediately (optimistic), calls the backend, then re-fetches
     * favorites so the server remains the source of truth for the favorites
     * section. The menu-star change is reverted on error.
     */
    toggleFavorite(menuId: string | number, isFavorite: boolean): Observable<void>;
    /**
     * Persists the new favorite order after a drag-drop. Reorders the in-memory
     * `favorites` signal locally (optimistic) and calls the backend — no GET
     * refetch after the write. The local change is reverted on error.
     */
    reorderFavorites(menuIds: (string | number)[]): Observable<void>;
    /** Re-fetches the favorites from the backend (manual refresh). */
    reloadFavorites(): Observable<void>;
    /**
     * Loads the effective navigation tree into `menus` — for one application
     * (`applicationId`) or all active applications when omitted. Returns the
     * mapped `IMenu[]`.
     */
    loadMenus(applicationId?: string): Observable<IMenu[]>;
    /** Loads favorites into `favorites` — optionally for a single application. Returns the mapped `IMenu[]`. */
    loadFavorites(applicationId?: string): Observable<IMenu[]>;
    /** Returns a new menu tree with the matching node's `isFavorite` flipped (star icon). */
    private applyMenuFavorite;
    private applyFavoriteReorder;
    private loadUserInternal;
    private loadMenusInternal;
    private loadFavoritesInternal;
    private recordError;
    static ɵfac: i0.ɵɵFactoryDeclaration<IUserMenuStore, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IUserMenuStore>;
}

/** Permission source selector used by `ihHasMn` / `ihNotHasMn`. */
type IInsightPermissionSource = 'menu' | 'role';
/** Object form: inline source + value. */
type IInsightPermission = {
    source: IInsightPermissionSource;
    value: string | string[];
};
/**
 * Accepted input for the permission directives:
 * - a plain `string | string[]` → menu-mode check (default), or
 * - an object `{ source, value }` to select the source explicitly.
 */
type IInsightPermissionInput = string | string[] | IInsightPermission;
/** Resolves an input into a concrete `{ source, codes }` pair (or `null`). */
declare function resolvePermission(value: IInsightPermissionInput | null): {
    source: IInsightPermissionSource;
    codes: string | string[];
} | null;
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
declare abstract class IHMenuGateDirective implements OnInit, OnDestroy {
    /** `false` for `ihHasMn` (show when allowed), `true` for `ihNotHasMn` (show when denied). */
    protected abstract readonly invert: boolean;
    protected readonly store: IUserMenuStore;
    private readonly templateRef;
    private readonly viewContainer;
    protected readonly value$: BehaviorSubject<IInsightPermissionInput | null>;
    private viewCreated;
    private subscription?;
    ngOnInit(): void;
    ngOnDestroy(): void;
    private evaluate;
    private renderView;
    static ɵfac: i0.ɵɵFactoryDeclaration<IHMenuGateDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<IHMenuGateDirective, never, never, {}, {}, never, never, true, never>;
}
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
declare class IHHasMnDirective extends IHMenuGateDirective {
    protected readonly invert = false;
    set ihHasMn(value: IInsightPermissionInput);
    static ɵfac: i0.ɵɵFactoryDeclaration<IHHasMnDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<IHHasMnDirective, "[ihHasMn]", never, { "ihHasMn": { "alias": "ihHasMn"; "required": false; }; }, {}, never, never, true, never>;
}

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
declare class IHNotHasMnDirective extends IHMenuGateDirective {
    protected readonly invert = true;
    set ihNotHasMn(value: IInsightPermissionInput);
    static ɵfac: i0.ɵɵFactoryDeclaration<IHNotHasMnDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<IHNotHasMnDirective, "[ihNotHasMn]", never, { "ihNotHasMn": { "alias": "ihNotHasMn"; "required": false; }; }, {}, never, never, true, never>;
}

/**
 * Shape of `@insight/ui`'s default environment.
 *
 * The library's services read a subset of these fields. `api` is an open-ended
 * registry of backend base URLs so consumer apps can register additional
 * service endpoints.
 */
type IEnvironment = {
    production: boolean;
    releaseStage: string;
    appName: string;
    version: string;
    /** API base URLs grouped by backend service. `identity` + `user` are read by the library data layer. */
    api: {
        identity: string;
        user: string;
        configuration: string;
        application: string;
        [key: string]: string;
    };
    /** Full URL of iam-web's signin page. */
    signinUrl: string;
    /** Full URL of iam-web's own auth callback (informational for consumers). */
    authCallbackUrl: string;
    /** Cookie domain used for the HttpOnly refresh token cookie (informational). */
    cookieDomain: string;
    securityMode: boolean;
    tokenLifespan: {
        accessTokenSeconds: number;
        refreshTokenSeconds: number;
        ssoSessionMaxSeconds: number;
    };
    cookieSecure: boolean;
    /** CSRF token max age in seconds (backend cookie maxAge minus a safety buffer). */
    csrfTokenMaxAgeSeconds: number;
    /** MFA challenge session timeout (seconds). */
    mfaChallengeSessionTimeoutSeconds?: number;
    /** Origins iam-web's signin page trusts for post-login redirects (informational). */
    allowedReturnOrigins: string[];
};

/**
 * Default environment for `@insight/ui`'s shared data layer.
 *
 * These are the library-wide defaults for the SSO / sidebar / user data
 * layer. Consumer apps override any field at bootstrap via
 * `provideInsightAuth()`.
 */
declare const environment: IEnvironment;

export { IAlert, IAlertService, IApiService, IAuthCallback, IAuthService, IAvatar, IButton, ICard, ICardBody, ICardFooter, ICardImage, ICardModule, ICodeViewer, ICodeViewerModule, IConfirm, IConfirmService, ICsrfService, ICurrentUserService, IDatepicker, IDialog, IDialogCloseDirective, IDialogContainer, IDialogModule, IDialogOutlet, IDialogRef, IDialogService, IFCDatepicker, IFCInput, IFCSelect, IFCTextArea, IGrid, IGridCell, IGridCellDefDirective, IGridColumn, IGridColumnGroup, IGridCustomColumn, IGridDataSource, IGridExpandableRow, IGridHeaderCell, IGridHeaderCellDefDirective, IGridHeaderCellGroup, IGridHeaderCellGroupColumns, IGridHeaderRowDirective, IGridModule, IGridRowDefDirective, IGridRowDirective, IGridViewport, IHContent, IHHasMnDirective, IHMenu, IHMenuGateDirective, IHNotHasMnDirective, IHSidebar, IHTitleBreadcrumbService, IHighlightSearchPipe, IIcon, IInput, IInputAddon, IInputMaskDirective, IInputModule, ILoading, INSIGHT_AUTH_CONFIG, IPaginator, IPill, ISection, ISectionBody, ISectionFilter, ISectionFooter, ISectionHeader, ISectionModule, ISectionSubHeader, ISectionTab, ISectionTabContent, ISectionTabHeader, ISectionTabs, ISelect, ISelectOptionDefDirective, ISessionService, IStorageService, ITextArea, IToggle, IUI, IUserMenuService, IUserMenuStore, I_DIALOG_DATA, I_GRID_DECLARATIONS, I_ICON_NAMES, I_ICON_SIZES, SessionExpiredService, authGuard, authInterceptor, buildExternalSigninUrl, collectMenuCodes, environment, extractAccessTokenFromHash, extractProblemDetailsErrorCode, findFirstLeafRoute, findMenuNameById, getDefaultInsightAuthConfig, getMenuChildren, getMenuKey, getMenuLabel, getMenuRoute, hasAnyMenuCode, hasMenuChildren, isControlRequired, isGroupNode, isHttpRoute, isLeafItem, isModuleMenu, isNewTabMenu, isReloadMenu, isSessionExpiredError, isSpaMenu, mapToSidebarUser, normalizeMenuTree, provideInsightAuth, resolveControlErrorMessage, resolvePermission, sanitizeReturnUrl, toIMenu, toIMenuFavorite, toIMenus, toSessionExpiredReason };
export type { IAlertData, IApiOptions, IApiResponse, IAuthUser, IBreadcrumbItem, IButtonSize, IButtonType, IButtonVariant, IConfirmData, IDatepickerPanelPosition, IDialogAction, IDialogActionCancel, IDialogActionConfirm, IDialogActionCustom, IDialogActionOK, IDialogActionObject, IDialogActionSave, IDialogActionType, IDialogActionTypes, IDialogConfig, IEnvironment, IErrorContext, IForgotPasswordResponse, IFormControlErrorMessage, IGridColumnLike, IGridColumnWidth, IGridDataSourceConfig, IGridFilter, IGridHeaderItem, IGridPaginatorInput, IGridSelectionChange, IGridSelectionMode, IGridServerSideConfig, IHNavigationSnapshot, IIconName, IIconSize, IInputAddonButton, IInputAddonIcon, IInputAddonKind, IInputAddonLink, IInputAddonLoading, IInputAddonText, IInputAddonType, IInputAddons, IInputMask, IInputMaskType, IInsightAuthConfig, IInsightAuthConfigOverrides, IInsightCurrentUser, IInsightFavoriteMenuItem, IInsightFavoriteOrderItem, IInsightMenuApplication, IInsightMenuCompany, IInsightMenuNode, IInsightMenuOpenIn, IInsightPermission, IInsightPermissionInput, IInsightPermissionSource, IInsightTokenLifespan, IInsightUserMenuEnvelope, ILoginResponse, IMenu, IMenuApplication, IMenuCompany, IMenuFavoriteReorderEvent, IMenuFavoriteToggleEvent, IMenuGroup, IMenuOpenIn, IMfaChallengeResponse, IPaginatorState, IPillSize, IPillVariant, IRefreshResponse, IResetPasswordResponse, IRoute, IRoutes, ISanitizedReturnUrl, ISelectChange, ISelectOptionContext, ISelectPanelPosition, ISessionUser, ISortConfig, ISortDirection, ISortState, IToggleSize, IUISize, IUIVariant, IUser, IValidateResetTokenResponse, SessionExpiredReason };
