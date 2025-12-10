import { Observable } from 'rxjs';
import * as i0 from '@angular/core';
import { EventEmitter, Type, InjectionToken, OnChanges, Injector, SimpleChanges, TemplateRef, OnInit, AfterContentInit, OnDestroy, ElementRef, ChangeDetectorRef, NgZone, QueryList, PipeTransform } from '@angular/core';
import { AbstractControl, NgControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, ControlValueAccessor } from '@angular/forms';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

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

interface IErrorContext {
    label: string;
    error: any;
    control: AbstractControl | null;
}
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
    onClick: EventEmitter<MouseEvent>;
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
};
type IIconName = keyof typeof I_ICON_NAMES;
type IIconSize = keyof typeof I_ICON_SIZES;
declare class IIcon {
    icon: IIconName | string;
    size: IIconSize;
    get iconSize(): string;
    get iconClass(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<IIcon, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IIcon, "ic", never, { "icon": { "alias": "icon"; "required": false; }; "size": { "alias": "size"; "required": false; }; }, {}, never, never, true, never>;
}

/**
 * CONFIG + TOKENS
 */
interface IDialogConfig<TData = any> {
    id?: string;
    data?: TData;
    width?: string;
    height?: string;
    disableClose?: boolean;
    backdropClose?: boolean;
}
declare const I_DIALOG_DATA: InjectionToken<any>;
/**
 * REF
 * TComponent = dialog component type
 * TResult   = result type of close()
 */
declare class IDialogRef<TComponent = any, TResult = any> {
    private readonly _afterClosed$;
    close(result?: TResult): void;
    afterClosed(): Observable<TResult | undefined>;
}
/**
 * INTERNAL INSTANCE
 */
interface IDialogInstance<TData = any, TResult = any> {
    id: string;
    component: Type<any>;
    config: Required<IDialogConfig<TData>>;
    ref: IDialogRef<any, TResult>;
}
declare class IDialogService {
    private readonly _dialogs$;
    dialogs$: Observable<IDialogInstance<any, any>[]>;
    open<TComponent, TData = any, TResult = any>(component: Type<TComponent>, config?: IDialogConfig<TData>): IDialogRef<TComponent, TResult>;
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
    visible?: boolean;
};
type IDialogActionSave = {
    type: 'save';
    className?: string;
    visible?: boolean;
};
type IDialogActionOK = {
    type: 'ok';
    className?: string;
    visible?: boolean;
};
type IDialogActionConfirm = {
    type: 'confirm';
    className?: string;
    visible?: boolean;
};
type IDialogActionCustom = {
    type: 'custom';
    visible?: boolean;
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
    actionAlign?: 'start' | 'center' | 'end';
    onOk: EventEmitter<any>;
    onConfirm: EventEmitter<any>;
    onSave: EventEmitter<any>;
    onCustomAction: EventEmitter<IDialogActionObject>;
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
    static ɵcmp: i0.ɵɵComponentDeclaration<IDialog, "i-dialog", never, { "title": { "alias": "title"; "required": false; }; "actions": { "alias": "actions"; "required": false; }; "actionAlign": { "alias": "actionAlign"; "required": false; }; }, { "onOk": "onOk"; "onConfirm": "onConfirm"; "onSave": "onSave"; "onCustomAction": "onCustomAction"; }, never, ["*"], true, never>;
}
declare class IDialogModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<IDialogModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<IDialogModule, never, [typeof IDialogContainer, typeof IDialogOutlet, typeof IDialogCloseDirective, typeof IDialog], [typeof IDialogContainer, typeof IDialogOutlet, typeof IDialogCloseDirective, typeof IDialog]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<IDialogModule>;
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

declare class ICard {
    static ɵfac: i0.ɵɵFactoryDeclaration<ICard, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ICard, "i-card", never, {}, {}, never, ["*"], true, never>;
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

interface ISelectOptionContext<T> {
    $implicit: T;
    row: T;
}
declare class ISelectOptionDefDirective<T = any> {
    template: TemplateRef<ISelectOptionContext<T>>;
    constructor(template: TemplateRef<ISelectOptionContext<T>>);
    set iSelectOption(_value: any);
    static ɵfac: i0.ɵɵFactoryDeclaration<ISelectOptionDefDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ISelectOptionDefDirective<any>, "[iSelectOption]", never, { "iSelectOption": { "alias": "iSelectOption"; "required": false; }; }, {}, never, never, true, never>;
}
interface ISelectChange<T = any> {
    value: T | null;
    label: string;
}
/** Position of popup options relative to the input */
type ISelectPanelPosition = 'top' | 'bottom' | 'left' | 'right' | 'top left' | 'top right' | 'bottom left' | 'bottom right';
declare class ISelect<T = any> implements ControlValueAccessor, OnInit, AfterContentInit, OnDestroy {
    private hostEl;
    private cdr;
    private zone;
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
    set valueInput(val: T | null);
    onChanged: EventEmitter<ISelectChange<T>>;
    onOptionSelected: EventEmitter<ISelectChange<T>>;
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
    constructor(hostEl: ElementRef<HTMLElement>, cdr: ChangeDetectorRef, zone: NgZone);
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
    get hasSelection(): boolean;
    /** true when user filtered and no options match */
    get hasNoResults(): boolean;
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
    resolveDisplayText(row: T | null): string;
    private handleInputText;
    handleBlur(): void;
    private moveHighlight;
    /** behavior:
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
    static ɵcmp: i0.ɵɵComponentDeclaration<ISelect<any>, "i-select", never, { "placeholder": { "alias": "placeholder"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "invalid": { "alias": "invalid"; "required": false; }; "filterDelay": { "alias": "filterDelay"; "required": false; }; "panelPosition": { "alias": "panelPosition"; "required": false; }; "options": { "alias": "options"; "required": false; }; "options$": { "alias": "options$"; "required": false; }; "displayWith": { "alias": "displayWith"; "required": false; }; "filterPredicate": { "alias": "filterPredicate"; "required": false; }; "valueInput": { "alias": "value"; "required": false; }; }, { "onChanged": "onChanged"; "onOptionSelected": "onOptionSelected"; }, ["optionDef"], never, true, never>;
}
/**
 * IFcSelect
 * Version: 1.1.0
 *
 * - Form control wrapper for ISelect
 * - Provides label, required asterisk, error message
 * - Implements CVA so you can use formControlName on <i-fc-select>
 */
declare class IFCSelect<T = any> implements ControlValueAccessor {
    ngControl: NgControl | null;
    private formDir;
    private cdr;
    innerSelect: ISelect<T>;
    label: string;
    placeholder: string;
    options: T[] | null;
    options$: Observable<T[]> | null;
    displayWith?: ((row: T | null) => string) | string;
    filterDelay: number;
    filterPredicate: (row: T, term: string) => boolean;
    /** Passed through to ISelect's [panelPosition] input */
    panelPosition: ISelectPanelPosition;
    errorMessage?: IFormControlErrorMessage;
    get value(): T | null;
    set value(v: T | null);
    private _value;
    isDisabled: boolean;
    private onChange;
    private onTouched;
    constructor(ngControl: NgControl | null, formDir: FormGroupDirective | null, cdr: ChangeDetectorRef);
    writeValue(v: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    handleSelectChange(change: ISelectChange<T>): void;
    focusInnerSelect(): void;
    get controlInvalid(): boolean;
    get required(): boolean;
    get resolvedErrorText(): string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<IFCSelect<any>, [{ optional: true; self: true; }, { optional: true; }, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IFCSelect<any>, "i-fc-select", never, { "label": { "alias": "label"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "options": { "alias": "options"; "required": false; }; "options$": { "alias": "options$"; "required": false; }; "displayWith": { "alias": "displayWith"; "required": false; }; "filterDelay": { "alias": "filterDelay"; "required": false; }; "filterPredicate": { "alias": "filterPredicate"; "required": false; }; "panelPosition": { "alias": "panelPosition"; "required": false; }; "errorMessage": { "alias": "errorMessage"; "required": false; }; "value": { "alias": "value"; "required": false; }; }, {}, never, ["*"], true, never>;
}

/** Internal structure for datepicker days */
interface IDatepickerDay {
    date: Date;
    inCurrentMonth: boolean;
    isToday: boolean;
    isSelected: boolean;
}
type IMonthOption = {
    value: number;
    label: string;
};
/** Position of popup panel relative to input */
type IDatepickerPanelPosition = 'top' | 'bottom' | 'left' | 'right' | 'top left' | 'top right' | 'bottom left' | 'bottom right';
declare class IDatepicker implements ControlValueAccessor, OnInit {
    private hostEl;
    placeholder: string;
    disabled: boolean;
    /** visual invalid state (from i-fc-datepicker or manual) */
    invalid: boolean;
    /**
     * Display / parse format.
     * Supported tokens: yyyy, MM, dd
     */
    format: string;
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
    panelPosition: IDatepickerPanelPosition;
    /**
     * Allow [value]="..." when not using reactive forms.
     * Accepts Date or string, normalizes via writeValue.
     */
    set valueInput(v: Date | string | null);
    onChanged: EventEmitter<Date | null>;
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
    constructor(hostEl: ElementRef<HTMLElement>);
    /** Always read the REAL inner <input> value, ignore event.target type */
    private getInnerInput;
    private focusInput;
    ngOnInit(): void;
    writeValue(value: Date | string | null): void;
    registerOnChange(fn: (value: Date | null) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    get appendAddon(): IInputAddonButton;
    /**
     * Called when user types in the inner input.
     * Formatting / clamping is handled by IInputMaskDirective.
     */
    private handleInput;
    private handleBlur;
    toggleOpen(): void;
    prevMonth(): void;
    nextMonth(): void;
    /** Month changed from <i-select> */
    onMonthChange(change: ISelectChange<any>): void;
    /** Year changed from <i-select> */
    onYearChange(change: ISelectChange<number>): void;
    selectDay(day: IDatepickerDay): void;
    /** Initialize view year/month from model or today */
    private initViewFromModel;
    private updateView;
    private ensureYearRange;
    private buildCalendar;
    private startOfDay;
    private isSameDate;
    /**
     * Parse date string according to this.format (yyyy, MM, dd)
     */
    private parseInputDate;
    /**
     * Format Date → string according to this.format.
     */
    private formatDate;
    /**
     * Listen to any 'input' bubbling inside <i-datepicker>
     * and always read from the inner <input>, not event.target.
     */
    onHostInput(): void;
    /** Blur anywhere inside → mark touched */
    onHostFocusOut(_event: FocusEvent): void;
    /** Close popup when clicking outside i-datepicker */
    onDocumentClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IDatepicker, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IDatepicker, "i-datepicker", never, { "placeholder": { "alias": "placeholder"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "invalid": { "alias": "invalid"; "required": false; }; "format": { "alias": "format"; "required": false; }; "panelPosition": { "alias": "panelPosition"; "required": false; }; "valueInput": { "alias": "value"; "required": false; }; }, { "onChanged": "onChanged"; }, never, never, true, never>;
}
declare class IFCDatepicker implements ControlValueAccessor {
    ngControl: NgControl | null;
    private formDir;
    private cdr;
    private hostEl;
    innerDatepicker: IDatepicker;
    label: string;
    placeholder: string;
    /** Passed through to IDatepicker's [format] input */
    format: string;
    /** Passed through to IDatepicker's [panelPosition] input */
    panelPosition: IDatepickerPanelPosition;
    errorMessage?: IFormControlErrorMessage;
    get value(): Date | null;
    set value(v: Date | null);
    private _value;
    isDisabled: boolean;
    private onChange;
    private onTouched;
    constructor(ngControl: NgControl | null, formDir: FormGroupDirective | null, cdr: ChangeDetectorRef, hostEl: ElementRef<HTMLElement>);
    writeValue(v: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    handleDateChange(date: Date | null): void;
    focusInnerDatepicker(): void;
    get controlInvalid(): boolean;
    get required(): boolean;
    get resolvedErrorText(): string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<IFCDatepicker, [{ optional: true; self: true; }, { optional: true; }, null, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IFCDatepicker, "i-fc-datepicker", never, { "label": { "alias": "label"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "format": { "alias": "format"; "required": false; }; "panelPosition": { "alias": "panelPosition"; "required": false; }; "errorMessage": { "alias": "errorMessage"; "required": false; }; "value": { "alias": "value"; "required": false; }; }, {}, never, never, true, never>;
}

/**
 * IPaginator
 * Version: 1.1.0
 */

interface IPaginatorState {
    pageIndex: number;
    pageSize: number;
}
declare class IPaginator {
    length: number;
    pageIndex: number;
    pageSize: number;
    pageSizeOptions: number[];
    pageChange: EventEmitter<IPaginatorState>;
    get pageCount(): number;
    private emit;
    nextPage(): void;
    previousPage(): void;
    changePageSize(value: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IPaginator, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IPaginator, "i-paginator", never, { "length": { "alias": "length"; "required": false; }; "pageIndex": { "alias": "pageIndex"; "required": false; }; "pageSize": { "alias": "pageSize"; "required": false; }; "pageSizeOptions": { "alias": "pageSizeOptions"; "required": false; }; }, { "pageChange": "pageChange"; }, never, never, true, never>;
}

type ISortDirection = 'asc' | 'desc' | '';
interface ISortState {
    active: string;
    direction: ISortDirection;
}
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
interface IGridDataSourceConfig<T = any> {
    sort?: ISortConfig;
    filter?: IGridFilter;
    /**
     * paginator:
     * - false → disabled
     * - undefined/missing → enabled with defaults
     * - { pageIndex?, pageSize?, pageSizeOptions? } → enabled + overridden
     */
    paginator?: IGridPaginatorInput;
}
type IGridSelectionMode = false | 'single' | 'multiple';
interface IGridSelectionChange<T = any> {
    selected: T[];
    lastChanged: T | null;
}
type IGridColumnWidth = number | 'fill';
interface IGridColumnLike<T = any> {
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
}
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
    /**
     * Strict recursive filtering:
     * - Returns a **new array** of roots.
     * - Each returned root is a **shallow clone** with its children pruned.
     * - A node is kept if:
     *     - it matches the filter, OR
     *     - any descendant matches.
     * - Non-matching siblings are removed.
     */
    private _filterRecursiveArray;
    /**
     * Returns pruned clone of node, or null if neither it nor any descendant matches.
     */
    private _filterRecursiveNode;
    private _normalizeSort;
    private _update;
}
declare class IGridHeaderCellDefDirective {
    readonly template: TemplateRef<any>;
    constructor(template: TemplateRef<any>);
    static ɵfac: i0.ɵɵFactoryDeclaration<IGridHeaderCellDefDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<IGridHeaderCellDefDirective, "[iHeaderCellDef]", never, {}, {}, never, never, true, never>;
}
declare class IGridCellDefDirective {
    readonly template: TemplateRef<any>;
    constructor(template: TemplateRef<any>);
    static ɵfac: i0.ɵɵFactoryDeclaration<IGridCellDefDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<IGridCellDefDirective, "[iCellDef]", never, {}, {}, never, never, true, never>;
}
declare class IGridHeaderRowDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<IGridHeaderRowDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<IGridHeaderRowDirective, "i-grid-header-row", never, {}, {}, never, never, true, never>;
}
declare class IGridRowDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<IGridRowDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<IGridRowDirective, "i-grid-row", never, {}, {}, never, never, true, never>;
}
declare class IGridColumn<T = any> implements IGridColumnLike<T> {
    /** Row property name, e.g. "fullName" – REQUIRED, must exist on datasource. */
    fieldName: string;
    /** Header text if you don't use iHeaderCellDef */
    title: string;
    /** Per-column sort control */
    sortable: boolean;
    /** Per-column resize control */
    resizable: boolean;
    /**
     * Column width:
     * - number => fixed px
     * - "fill" => flex-fill
     * - undefined => default fixed width (grid-level)
     */
    width?: IGridColumnWidth;
    /**
     * Freeze block always starts from the first column.
     * Mark the last frozen column with [freeze].
     */
    freeze: boolean;
    /**
     * Projected templates
     */
    headerDef?: TemplateRef<any>;
    cellDef?: TemplateRef<any>;
    isAuto?: boolean | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<IGridColumn<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IGridColumn<any>, "i-grid-column", never, { "fieldName": { "alias": "fieldName"; "required": true; }; "title": { "alias": "title"; "required": false; }; "sortable": { "alias": "sortable"; "required": false; }; "resizable": { "alias": "resizable"; "required": false; }; "width": { "alias": "width"; "required": false; }; "freeze": { "alias": "freeze"; "required": false; }; }, {}, ["headerDef", "cellDef"], never, true, never>;
    static ngAcceptInputType_freeze: unknown;
}
declare class IGridCustomColumn<T = any> implements IGridColumnLike<T> {
    /** Custom header title (e.g. "Actions") */
    title: string;
    /** Custom columns are not sortable by default */
    sortable: boolean;
    /** Per-column resize control */
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
declare class IGridCell {
    private hostDataColumn;
    private hostCustomColumn;
    private grid;
    /** Column instance (set automatically by grid OR injected from host column) */
    column?: IGridColumnLike<any>;
    /** Optional fixed width (px) – used for selection column, etc. */
    fixedWidth?: number;
    constructor(hostDataColumn: IGridColumn<any> | null, hostCustomColumn: IGridCustomColumn<any> | null, grid: IGrid<any> | null);
    private get _column();
    get flex(): string;
    private get _isFrozen();
    get frozenClass(): boolean;
    get stickyPosition(): string | null;
    get stickyLeft(): number | null;
    get stickyZ(): number | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<IGridCell, [{ optional: true; host: true; }, { optional: true; host: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IGridCell, "i-grid-cell", never, { "column": { "alias": "column"; "required": false; }; "fixedWidth": { "alias": "fixedWidth"; "required": false; }; }, {}, never, ["*"], true, never>;
}
declare class IGridHeaderCell {
    private el;
    private grid;
    private hostDataColumn;
    private hostCustomColumn;
    /** Column instance (set automatically by grid OR injected from host column) */
    column?: IGridColumnLike<any>;
    /** Optional fixed width (px) – used for selection column, etc. */
    fixedWidth?: number;
    private _isResizing;
    private _startX;
    private _startWidth;
    private readonly _minWidth;
    constructor(el: ElementRef<HTMLElement>, grid: IGrid<any> | null, hostDataColumn: IGridColumn<any> | null, hostCustomColumn: IGridCustomColumn<any> | null);
    private get _column();
    private get _columnId();
    private get _direction();
    private get _sortableFlag();
    get resizable(): boolean;
    /** width */
    get flex(): string;
    /** sorting classes */
    get sortable(): boolean;
    get isSorted(): boolean;
    get isSortedAsc(): boolean;
    get isSortedDesc(): boolean;
    get isResizableClass(): boolean;
    get showIcon(): boolean;
    get iconName(): string;
    /** frozen (sticky) behaviour */
    private get _isFrozen();
    get frozenClass(): boolean;
    get stickyPosition(): string | null;
    get stickyLeft(): number | null;
    get stickyZ(): number | null;
    /** events */
    onClick(): void;
    onResizeMouseDown(event: MouseEvent): void;
    onDocumentMouseMove(event: MouseEvent): void;
    onDocumentMouseUp(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IGridHeaderCell, [null, { optional: true; }, { optional: true; host: true; }, { optional: true; host: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IGridHeaderCell, "i-grid-header-cell", never, { "column": { "alias": "column"; "required": false; }; "fixedWidth": { "alias": "fixedWidth"; "required": false; }; }, {}, never, ["*"], true, never>;
}
declare class IGrid<T> implements AfterContentInit, OnChanges, OnDestroy {
    dataSource: IGridDataSource<T> | T[];
    /** Row selection mode */
    selectionMode: IGridSelectionMode;
    /** Sticky header (position: sticky inside viewport) */
    stickyHeader: boolean | '';
    /** Offset from top when sticky, in px (for fixed navbar etc.) */
    stickyHeaderOffset: number;
    /**
     * Scrollable body:
     * - bodyHeight: fixed viewport height (px)
     * - bodyMaxHeight: max viewport height (px)
     * If both undefined, grid grows naturally (no internal vertical scroll).
     */
    bodyHeight?: number;
    bodyMaxHeight?: number;
    /**
     * Tree mode:
     * - false / null / undefined → flat mode
     * - true / "" / "children" → tree, children key = "children"
     * - "nodes" → tree, children key = "nodes"
     *
     * Example:
     *   <i-grid [dataSource]="rows" tree></i-grid>            // children = "children"
     *   <i-grid [dataSource]="rows" tree="children"></i-grid> // children = "children"
     *   <i-grid [dataSource]="rows" tree="nodes"></i-grid>    // children = "nodes"
     */
    tree: string | boolean | null;
    /** Indent per tree level (px) */
    treeIndent: number;
    /**
     * Initial auto-expand level for tree mode (1-based):
     * - 1 → expand level 1 (roots), so their children are visible
     * - 2 → expand level 1 and 2, so grandchildren are visible, etc.
     * - null / <= 0 → no auto-expansion
     */
    treeInitialExpandLevel: number | null;
    /**
     * Show auto number column (1-based).
     * Placed after selection + tree column (if any).
     *
     * NOTE: In tree mode, this is disabled by default via showNumberColumnEffective.
     */
    showNumberColumn: boolean;
    /** Effective flag for number column – disabled by default in tree mode. */
    get showNumberColumnEffective(): boolean;
    /** Emits whenever selection changes */
    selectionChange: EventEmitter<IGridSelectionChange<T>>;
    /** Emits on row click (before selection logic) */
    rowClick: EventEmitter<T>;
    /** Data columns projected as <i-grid-column> */
    columnDefs: QueryList<IGridColumn<T>>;
    /** Custom columns projected as <i-grid-custom-column> */
    customColumnDefs: QueryList<IGridCustomColumn<T>>;
    /** Concrete array used in template loops (data + custom, or auto + custom) */
    columns: IGridColumnLike<T>[];
    renderedData: T[];
    currentFilterText: string;
    sortStates: ISortState[];
    private _columnWidths;
    private _dataSub?;
    private _selection;
    private readonly _id;
    /** default width (px) when column.width is undefined */
    private readonly _defaultColumnWidth;
    /** special widths (px) for selection + number + tree columns */
    readonly selectionColumnWidth = 28;
    readonly numberColumnWidth = 60;
    readonly treeColumnWidth = 52;
    /** internal auto-number column object (not part of columns[]) */
    private _numberColumnInternal?;
    /**
     * Map of row → metadata:
     * - level: depth (0 = root)
     * - parent: parent row or null
     * - hasChildren: whether children array is non-empty
     * - expanded: expanded state (controls visibility of descendants)
     */
    private _treeMeta;
    /** Top-level rows in tree mode */
    private _treeRoots;
    get numberColumn(): IGridColumnLike<T>;
    get stickyHeaderClass(): boolean;
    get stickyTopVar(): string | null;
    /** Is tree mode enabled? */
    get treeEnabled(): boolean;
    /** Resolved children key for tree rows (e.g. "children", "nodes") */
    get treeChildrenKey(): string;
    /** Resolved internal (0-based) max level for auto expansion, or null for none. */
    private _getInitialExpandLevelInternal;
    /** Should a row at given level start expanded (for tree mode)? */
    private _shouldRowStartExpanded;
    /** Read children from row using configured children key */
    private _getTreeChildren;
    /** Get all descendants (deep) for a given row. */
    private _getTreeDescendants;
    /** Build tree metadata from raw hierarchical data */
    private _buildTreeMeta;
    /** Rebuild flat renderedData based on expansion state */
    private _rebuildTreeRendered;
    /** Tree: row level (0-based) */
    getRowLevel(row: T): number;
    /** Tree: does the row have children? */
    hasChildren(row: T): boolean;
    /** Tree: expanded state */
    isExpanded(row: T): boolean;
    /** Toggle raw expanded/collapsed */
    toggleRow(row: T): void;
    /** Handler to use from template (stopping click bubbling) */
    onTreeToggle(row: T, event?: MouseEvent): void;
    isRowSelected(row: T): boolean;
    /** Returns visual "checked" state for a row's checkbox (tree-aware). */
    getRowChecked(row: T): boolean;
    /** Returns visual "indeterminate" state for a row's checkbox (tree-aware). */
    getRowIndeterminate(row: T): boolean;
    get selectedRows(): T[];
    get allVisibleSelected(): boolean;
    get someVisibleSelected(): boolean;
    private _emitSelectionChange;
    private _selectSingle;
    private _toggleMultiple;
    /** Set selection for a row and all its descendants in tree mode. */
    private _setBranchSelection;
    /** Recalculate selection state for all ancestors of the given row. */
    private _syncSelectionUpwardsFrom;
    onRowSelectionToggle(row: T): void;
    onToggleAllVisible(): void;
    clearSelection(): void;
    private _reconcileSelectionWithData;
    private _getAllDataRows;
    getColumnDirection(columnId: string): ISortDirection;
    sort(column: IGridColumnLike<any>): void;
    private _applySortToDataSource;
    /**
     * Returns numeric column width (px) for fixed-width columns.
     * - override from resize
     * - explicit numeric [width]
     * - default width when width is undefined
     * For "fill" we return null to signal flex-fill (CSS min-width handles autos).
     */
    getColumnWidth(column: IGridColumnLike<any>): number | null;
    getColumnFlex(column: IGridColumnLike<any>): string;
    setColumnWidth(column: IGridColumnLike<any>, width: number): void;
    /** index of last frozen column, or -1 if none */
    private _getFrozenEndIndex;
    get hasFrozenColumns(): boolean;
    isColumnFrozen(column: IGridColumnLike<any>): boolean;
    /**
     * Computes sticky left offset for frozen columns.
     * Freeze block always starts from first data column.
     * We also offset by:
     * - selection column width (if selectionMode && not tree+multiple)
     * - tree column width (if treeEnabled)
     * - number column width (if showNumberColumnEffective)
     */
    getColumnStickyLeft(column: IGridColumnLike<any>): number | null;
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
    /**
     * Build columns:
     * - If there are projected <i-grid-column>, use them (manual data columns).
     * - If there are none, infer data columns from data keys (auto mode).
     * - In both cases, append <i-grid-custom-column> at the end.
     */
    private _rebuildColumns;
    /**
     * Auto column builder:
     * - Only used when there are NO projected <i-grid-column>.
     * - Uses the first data row's keys as columns.
     * - Field name & title are identical, so renaming the object key
     *   automatically renames the header.
     * - Auto columns are flex-fill and have a min width (via CSS).
     */
    private _buildAutoColumnsFromData;
    private _updateCurrentFilterText;
    private _connectData;
    onRowClicked(row: T): void;
    get singleSelectionName(): string;
    /**
     * Returns global row number (1-based).
     * - If paginated, continues across pages.
     * - Otherwise, 1..renderedData.length.
     */
    getRowNumber(visibleRowIndex: number): number;
    /**
     * Returns z-index for a frozen column.
     * Leftmost frozen column gets highest z-index so its right edge (resize handle)
     * is always on top of the next column.
     */
    getFrozenColumnZ(column: IGridColumnLike<any>): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<IGrid<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IGrid<any>, "i-grid", ["iGrid"], { "dataSource": { "alias": "dataSource"; "required": false; }; "selectionMode": { "alias": "selectionMode"; "required": false; }; "stickyHeader": { "alias": "stickyHeader"; "required": false; }; "stickyHeaderOffset": { "alias": "stickyHeaderOffset"; "required": false; }; "bodyHeight": { "alias": "bodyHeight"; "required": false; }; "bodyMaxHeight": { "alias": "bodyMaxHeight"; "required": false; }; "tree": { "alias": "tree"; "required": false; }; "treeIndent": { "alias": "treeIndent"; "required": false; }; "treeInitialExpandLevel": { "alias": "treeInitialExpandLevel"; "required": false; }; "showNumberColumn": { "alias": "showNumberColumn"; "required": false; }; }, { "selectionChange": "selectionChange"; "rowClick": "rowClick"; }, ["columnDefs", "customColumnDefs"], never, true, never>;
    static ngAcceptInputType_showNumberColumn: unknown;
}
declare const I_GRID_DECLARATIONS: (typeof IGridHeaderCellDefDirective | typeof IGridHeaderRowDirective | typeof IGridCell | typeof IGridHeaderCell)[];
declare class IGridModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<IGridModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<IGridModule, never, [typeof IGrid, typeof IGridColumn, typeof IGridCustomColumn, typeof IGridHeaderCellDefDirective, typeof IGridCellDefDirective, typeof IGridHeaderCell, typeof IGridCell, typeof IGridHeaderRowDirective, typeof IGridRowDirective, typeof IPaginator], [typeof IGrid, typeof IGridColumn, typeof IGridCustomColumn, typeof IGridHeaderCellDefDirective, typeof IGridCellDefDirective, typeof IGridHeaderCell, typeof IGridCell, typeof IGridHeaderRowDirective, typeof IGridRowDirective, typeof IPaginator]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<IGridModule>;
}

declare class IHighlightSearchPipe implements PipeTransform {
    transform(value: string, search: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<IHighlightSearchPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<IHighlightSearchPipe, "highlightSearch", true>;
}

interface BreadcrumbItem {
    label: string;
    url: string;
}
declare class IHContent {
    private readonly router;
    private readonly activatedRoute;
    sidebarVisibility: boolean;
    onSidebarToggled: EventEmitter<boolean>;
    /** Stream of breadcrumb items built from the activated route tree */
    readonly breadcrumb$: Observable<BreadcrumbItem[]>;
    /** Last breadcrumb label = current page title */
    readonly pageTitle$: Observable<string | null>;
    private buildBreadcrumb;
    toggleSidebar(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IHContent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IHContent, "ih-content", never, {}, { "onSidebarToggled": "onSidebarToggled"; }, never, never, true, never>;
}

type IInputMaskType = 'date' | 'integer' | 'number' | 'currency' | 'time';
interface IInputMask {
    type: IInputMaskType;
    /**
     * Optional format, used for:
     * - type: 'date' → e.g. 'dd/MM/yyyy', 'yyyy-MM-dd'
     * - type: 'time' → e.g. 'HH:mm', 'HH:mm:ss'
     * For 'integer' | 'number' | 'currency' format is currently ignored.
     */
    format?: string;
}
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
    /** Optional mask passed through to inner input's directive */
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
    /** Click anywhere on <i-input> focuses the inner input,
     *  EXCEPT when clicking on an addon (button/link/etc).
     */
    handleHostClick(event: MouseEvent): void;
    get prepends(): IInputAddons[];
    get appends(): IInputAddons[];
    static ɵfac: i0.ɵɵFactoryDeclaration<IInput, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IInput, "i-input", never, { "type": { "alias": "type"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "autocomplete": { "alias": "autocomplete"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; "invalid": { "alias": "invalid"; "required": false; }; "mask": { "alias": "mask"; "required": false; }; "value": { "alias": "value"; "required": false; }; "prepend": { "alias": "prepend"; "required": false; }; "append": { "alias": "append"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, never, true, never>;
}
declare class IFCInput implements ControlValueAccessor {
    ngControl: NgControl | null;
    private formDir;
    private cdr;
    innerInput: IInput;
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
    constructor(ngControl: NgControl | null, formDir: FormGroupDirective | null, cdr: ChangeDetectorRef);
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
    static ɵfac: i0.ɵɵFactoryDeclaration<IFCInput, [{ optional: true; self: true; }, { optional: true; }, null]>;
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

/**
 * ISection
 * Version: 1.0.0
 * <i-section>
 *   <i-section-header></i-section-header>
 *   <i-section-filter></i-section-filter>
 *   <i-section-body></i-section-body>
 *   <i-section-footer></i-section-footer>
 * </i-section>
 */

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
declare class ISectionCode {
    code: string;
    get inputCode(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ISectionCode, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ISectionCode, "i-section-code", never, { "code": { "alias": "code"; "required": false; }; }, {}, never, never, true, never>;
}
declare class ISectionMarkdown {
    private sanitizer;
    private cdr;
    set markdown(value: string);
    set content(value: string);
    private _markdown;
    rendered: SafeHtml | string;
    constructor(sanitizer: DomSanitizer, cdr: ChangeDetectorRef);
    private update;
    static ɵfac: i0.ɵɵFactoryDeclaration<ISectionMarkdown, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ISectionMarkdown, "i-section-markdown", never, { "markdown": { "alias": "markdown"; "required": false; }; "content": { "alias": "content"; "required": false; }; }, {}, never, never, true, never>;
}
declare class ISectionModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ISectionModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ISectionModule, never, [typeof ISection, typeof ISectionHeader, typeof ISectionSubHeader, typeof ISectionFilter, typeof ISectionBody, typeof ISectionFooter, typeof ISectionCode, typeof ISectionMarkdown], [typeof ISection, typeof ISectionHeader, typeof ISectionSubHeader, typeof ISectionFilter, typeof ISectionBody, typeof ISectionFooter, typeof ISectionCode, typeof ISectionMarkdown]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ISectionModule>;
}

/**
 * ITextarea
 * Version: 1.1.0
 */

declare class ITextArea implements ControlValueAccessor {
    placeholder: string;
    readonly: boolean;
    rows: number;
    /** invalid state (controlled by form or wrapper) */
    invalid: boolean;
    /** value usable both by CVA and by [value] binding */
    get value(): string | null;
    set value(v: string | null);
    textareaRef: ElementRef<HTMLTextAreaElement>;
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
    /** Click anywhere on <i-textarea> focuses the inner textarea */
    handleHostClick(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ITextArea, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ITextArea, "i-textarea", never, { "placeholder": { "alias": "placeholder"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; "rows": { "alias": "rows"; "required": false; }; "invalid": { "alias": "invalid"; "required": false; }; "value": { "alias": "value"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, never, true, never>;
}
/**
 * IFcTextarea
 * Version: 1.0.0
 *
 * - Form control wrapper for ITextArea
 * - Provides label, required asterisk, error message
 * - Implements CVA so you can use formControlName on <i-fc-textarea>
 */
declare class IFCTextArea implements ControlValueAccessor {
    ngControl: NgControl | null;
    private formDir;
    private cdr;
    innerTextarea: ITextArea;
    label: string;
    placeholder: string;
    readonly: boolean;
    rows: number;
    /** old-style custom error templates: { required: '{label} is xxx' } */
    errorMessage?: IFormControlErrorMessage;
    /** non-form usage: [value] binding */
    get value(): string | null;
    set value(v: string | null);
    private _value;
    isDisabled: boolean;
    private onChange;
    private onTouched;
    constructor(ngControl: NgControl | null, formDir: FormGroupDirective | null, cdr: ChangeDetectorRef);
    writeValue(v: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    handleInnerInput(event: Event): void;
    handleInnerBlur(): void;
    focusInnerTextarea(): void;
    get controlInvalid(): boolean;
    get required(): boolean;
    get resolvedErrorText(): string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<IFCTextArea, [{ optional: true; self: true; }, { optional: true; }, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IFCTextArea, "i-fc-textarea", never, { "label": { "alias": "label"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; "rows": { "alias": "rows"; "required": false; }; "errorMessage": { "alias": "errorMessage"; "required": false; }; "value": { "alias": "value"; "required": false; }; }, {}, never, never, true, never>;
}

declare class IUI {
    static ɵfac: i0.ɵɵFactoryDeclaration<IUI, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<IUI, never, [typeof IAlert, typeof IButton, typeof ICard, typeof IConfirm, typeof IDatepicker, typeof IFCDatepicker, typeof IDialogModule, typeof IGridModule, typeof IIcon, typeof IInputModule, typeof ILoading, typeof ISectionModule, typeof ISelect, typeof IFCSelect, typeof ITextArea, typeof IHContent], [typeof IAlert, typeof IButton, typeof ICard, typeof IConfirm, typeof IDatepicker, typeof IFCDatepicker, typeof IDialogModule, typeof IGridModule, typeof IIcon, typeof IInputModule, typeof ILoading, typeof ISectionModule, typeof ISelect, typeof IFCSelect, typeof ITextArea, typeof IHContent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<IUI>;
}

export { IAlert, IAlertService, IButton, ICard, IConfirm, IConfirmService, IDatepicker, IDialog, IDialogCloseDirective, IDialogContainer, IDialogModule, IDialogOutlet, IDialogRef, IDialogService, IFCDatepicker, IFCInput, IFCSelect, IFCTextArea, IGrid, IGridCell, IGridCellDefDirective, IGridColumn, IGridCustomColumn, IGridDataSource, IGridHeaderCell, IGridHeaderCellDefDirective, IGridHeaderRowDirective, IGridModule, IGridRowDirective, IHContent, IHighlightSearchPipe, IIcon, IInput, IInputAddon, IInputMaskDirective, IInputModule, ILoading, IPaginator, ISection, ISectionBody, ISectionCode, ISectionFilter, ISectionFooter, ISectionHeader, ISectionMarkdown, ISectionModule, ISectionSubHeader, ISelect, ISelectOptionDefDirective, ITextArea, IUI, I_DIALOG_DATA, I_GRID_DECLARATIONS, I_ICON_NAMES, I_ICON_SIZES, isControlRequired, resolveControlErrorMessage };
export type { BreadcrumbItem, DialogAction, IAlertData, IButtonSize, IButtonType, IButtonVariant, IConfirmData, IDatepickerPanelPosition, IDialogActionCancel, IDialogActionConfirm, IDialogActionCustom, IDialogActionOK, IDialogActionObject, IDialogActionSave, IDialogActionType, IDialogActionTypes, IDialogConfig, IErrorContext, IFormControlErrorMessage, IGridColumnLike, IGridColumnWidth, IGridDataSourceConfig, IGridFilter, IGridPaginatorInput, IGridSelectionChange, IGridSelectionMode, IIconName, IIconSize, IInputAddonButton, IInputAddonIcon, IInputAddonKind, IInputAddonLink, IInputAddonLoading, IInputAddonText, IInputAddonType, IInputAddons, IInputMask, IInputMaskType, IPaginatorState, ISelectChange, ISelectOptionContext, ISelectPanelPosition, ISortConfig, ISortDirection, ISortState, IUISize, IUIVariant };
