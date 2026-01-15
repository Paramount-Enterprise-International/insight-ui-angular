import { AsyncPipe, NgClass, NgComponentOutlet, NgStyle } from '@angular/common';
import {
  Component,
  Directive,
  EventEmitter,
  HostListener,
  inject,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  NgModule,
  OnChanges,
  Output,
  SimpleChanges,
  Type,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { IButton, IButtonVariant } from '../button/button';
import { IIcon, IIconName } from '../icon/icon';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IFCTextArea } from '../textarea/textarea';

/**
 * CONFIG + TOKENS
 */

export type IDialogConfig<TData = any> = {
  id?: string;
  data?: TData;
  width?: string;
  height?: string;
  disableClose?: boolean; // ignore ESC
  backdropClose?: boolean; // allow click backdrop to close
};

export const I_DIALOG_DATA = new InjectionToken<any>('I_DIALOG_DATA');

/**
 * REF
 * TComponent = dialog component type
 * TResult   = result type of close()
 */

export class IDialogRef<TResult = any> {
  private readonly _afterClosed$ = new Subject<TResult | undefined>();

  close(result?: any): void {
    this._afterClosed$.next(result);
    this._afterClosed$.complete();
  }

  afterClosed(): Observable<TResult | undefined> {
    return this._afterClosed$.asObservable();
  }
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

/**
 * SERVICE
 */

let DIALOG_ID_COUNTER = 0;

@Injectable({ providedIn: 'root' })
export class IDialogService {
  private readonly _dialogs$ = new BehaviorSubject<IDialogInstance[]>([]);

  dialogs$ = this._dialogs$.asObservable();

  open<TComponent, TData = any, TResult = any>(
    component: Type<TComponent>,
    config: IDialogConfig<TData> = {},
  ): IDialogRef<TResult> {
    const id = config.id ?? `i-dialog-${++DIALOG_ID_COUNTER}`;
    const ref = new IDialogRef<TResult>();

    const instance: IDialogInstance<TData, TResult> = {
      id,
      component,
      config: {
        width: config.width ?? 'auto',
        height: config.height ?? 'auto',
        disableClose: config.disableClose ?? false,
        backdropClose: config.backdropClose ?? true,
        data: (config.data as TData) ?? (undefined as any),
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

  closeById(id: string, result?: any): void {
    const instance = this._dialogs$.value.find((d) => d.id === id);
    if (instance) {
      instance.ref.close(result);
    }
  }

  closeAll(): void {
    this._dialogs$.value.forEach((d) => d.ref.close());
  }
}

/**
 * CONTAINER COMPONENT (ONE DIALOG)
 */

@Component({
  selector: 'i-dialog-container',
  standalone: true,
  imports: [NgComponentOutlet, NgStyle],
  template: `<div class="i-dialog-backdrop" (click)="onBackdropClick()"></div>
    <div class="i-dialog-wrapper">
      <div class="i-dialog-panel" [ngStyle]="panelStyles">
        <ng-container *ngComponentOutlet="instance.component; injector: dialogInjector" />
      </div>
    </div> `,
})
export class IDialogContainer implements OnChanges {
  @Input({ required: true }) instance!: IDialogInstance;

  @Input() isTopMost = false;

  private rootInjector = inject(Injector);

  dialogInjector!: Injector;

  ngOnChanges(changes: SimpleChanges): void {
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

  get panelStyles(): { [key: string]: string | undefined } {
    const cfg = this.instance?.config;
    return {
      width: cfg?.width,
      height: cfg?.height,
    };
  }

  @HostListener('document:keydown.escape')
  onEscKey(): void {
    if (!this.isTopMost) {
      return;
    } // only the topmost dialog reacts
    if (!this.instance?.config.disableClose) {
      this.instance.ref.close();
    }
  }

  onBackdropClick(): void {
    if (!this.isTopMost) {
      return;
    } // only topmost backdrop closes
    if (!this.instance?.config.disableClose && this.instance?.config.backdropClose) {
      this.instance.ref.close();
    }
  }
}

/**
 * OUTLET COMPONENT (ALL DIALOGS)
 */

@Component({
  selector: 'i-dialog-outlet',
  standalone: true,
  imports: [AsyncPipe, IDialogContainer],
  template: `
    @for (dialog of (dialogs$ | async) ?? []; track dialog.id; let last = $last) {
      <i-dialog-container [instance]="dialog" [isTopMost]="last" />
    }
  `,
})
export class IDialogOutlet {
  private dialogService = inject(IDialogService);

  dialogs$ = this.dialogService.dialogs$;
}

/**
 * i-dialog-close DIRECTIVE
 */

@Directive({
  selector: '[i-dialog-close], [iDialogClose]',
  standalone: true,
})
export class IDialogCloseDirective {
  /**
   * Supports:
   *   i-dialog-close
   *   i-dialog-close="result"
   *   [iDialogClose]="result"
   */
  @Input('iDialogClose') result: any;

  private dialogRef = inject<IDialogRef<any>>(IDialogRef);

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    event.preventDefault();
    this.dialogRef.close(this.result);
  }
}

/**
 * PUBLIC DIALOG COMPONENT (TITLE + ACTIONS)
 */

export type IDialogActionTypes = {
  type: 'cancel' | 'save' | 'ok' | 'confirm' | 'custom';
};

export type IDialogActionType = IDialogActionTypes['type'];

export type IDialogActionCancel = {
  type: 'cancel';
  className?: string;
  visible?: boolean;
};

export type IDialogActionSave = {
  type: 'save';
  className?: string;
  visible?: boolean;
};

export type IDialogActionOK = {
  type: 'ok';
  className?: string;
  visible?: boolean;
};

export type IDialogActionConfirm = {
  type: 'confirm';
  className?: string;
  visible?: boolean;
};

export type IDialogActionCustom = {
  type: 'custom';
  visible?: boolean;
  label: string;
  variant?: IButtonVariant;
  icon?: IIconName | string;
  className?: string;
  onClick?: () => void;
};

export type IDialogActionObject =
  | IDialogActionCancel
  | IDialogActionSave
  | IDialogActionOK
  | IDialogActionConfirm
  | IDialogActionCustom;

export type DialogAction = IDialogActionType | IDialogActionObject;

@Component({
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
      <div class="i-dialog-actions" [align]="actionAlign">
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
})
export class IDialog {
  @Input() title: string | undefined;

  @Input() actions: DialogAction[] = ['save', 'cancel'];

  @Input() actionAlign?: 'start' | 'center' | 'end' = 'end';

  @Output() readonly onOk: EventEmitter<any> = new EventEmitter<any>();

  @Output() readonly onConfirm: EventEmitter<any> = new EventEmitter<any>();

  @Output() readonly onSave: EventEmitter<any> = new EventEmitter<any>();

  @Output() readonly onCustomAction: EventEmitter<IDialogActionObject> =
    new EventEmitter<IDialogActionObject>();

  get normalizedActions(): IDialogActionObject[] {
    return (this.actions ?? []).map((a) =>
      typeof a === 'string' ? ({ type: a } as IDialogActionObject) : a,
    );
  }

  get saveAction(): IDialogActionSave | undefined {
    return this.normalizedActions.find((a) => a.type === 'save') as IDialogActionSave | undefined;
  }

  get okAction(): IDialogActionOK | undefined {
    return this.normalizedActions.find((a) => a.type === 'ok') as IDialogActionOK | undefined;
  }

  get confirmAction(): IDialogActionConfirm | undefined {
    return this.normalizedActions.find((a) => a.type === 'confirm') as
      | IDialogActionConfirm
      | undefined;
  }

  get customActions(): IDialogActionCustom[] {
    return this.normalizedActions.filter((a) => a.type === 'custom') as IDialogActionCustom[];
  }

  get cancelAction(): IDialogActionCancel | undefined {
    return this.normalizedActions.find((a) => a.type === 'cancel') as
      | IDialogActionCancel
      | undefined;
  }

  onConfirmClick(): void {
    this.onConfirm.emit();
  }

  onOkClick(): void {
    this.onOk.emit();
  }

  onSaveClick(): void {
    this.onSave.emit();
  }

  onCustomActionClick(a: IDialogActionCustom): void {
    this.onCustomAction.emit(a);
  }
}

export type IAlertData = {
  title: string;
  description: string;
  type: 'information' | 'success' | 'warning' | 'danger';
};

@Component({
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
})
export class IAlert {
  data: IAlertData = inject(I_DIALOG_DATA);

  dialog: IDialogRef<IAlert> = inject(IDialogRef);

  get alertClass(): string {
    return `i-alert i-alert-${this.data.type}`;
  }

  submit(): void {
    this.dialog.close();
  }
}

@Injectable({
  providedIn: 'root',
})
export class IAlertService {
  dialog: IDialogService = inject(IDialogService);

  show({ title, description, type }: IAlertData): Observable<boolean> {
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

  information(title: string, description: string): Observable<boolean> {
    return this.show({ title, description, type: 'information' });
  }

  success(title: string, description: string): Observable<boolean> {
    return this.show({ title, description, type: 'success' });
  }

  warning(title: string, description: string): Observable<boolean> {
    return this.show({ title, description, type: 'warning' });
  }

  danger(title: string, description: string): Observable<boolean> {
    return this.show({ title, description, type: 'danger' });
  }
}

export type IConfirmData = {
  title: string;
  description: string;
  type: 'information' | 'success' | 'warning' | 'danger';
  reason?: boolean;
};

@Component({
  selector: 'i-confirm',
  imports: [IDialog, NgClass, IIcon, IFCTextArea, ReactiveFormsModule, FormsModule],
  template: `<i-dialog
    actionAlign="center"
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
})
export class IConfirm {
  data: IConfirmData = inject(I_DIALOG_DATA);

  dialog: IDialogRef<IConfirm> = inject(IDialogRef);

  formBuilder: FormBuilder = inject(FormBuilder);

  reason: FormControl = new FormControl('', [Validators.required]);

  formGroup: FormGroup = this.formBuilder.group({
    reason: this.reason,
  });

  @ViewChild(FormGroupDirective) formGroupDir!: FormGroupDirective;
  // @ViewChild('submitButton') submitButton!: ElementRef<HTMLButtonElement>;

  get confirmClass(): string {
    return `i-confirm i-confirm-${this.data.type}`;
  }

  submit(): void {
    if (this.data.reason) {
      this.formGroupDir.onSubmit(new Event('submit'));
      return;
    }
    this.dialog.close(true);
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }
    this.dialog.close(this.reason.value);
  }
}

@Injectable({
  providedIn: 'root',
})
export class IConfirmService {
  dialog: IDialogService = inject(IDialogService);

  show({ title, description, type, reason }: IConfirmData): Observable<any> {
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

  information(title: string, description: string): Observable<boolean> {
    return this.show({ title, description, type: 'information' });
  }

  success(title: string, description: string): Observable<boolean> {
    return this.show({ title, description, type: 'success' });
  }

  warning(title: string, description: string, reason?: boolean): Observable<boolean> {
    return this.show({ title, description, type: 'warning', reason });
  }

  danger(title: string, description: string, reason?: boolean): Observable<boolean> {
    return this.show({ title, description, type: 'danger', reason });
  }
}

@NgModule({
  imports: [IDialogContainer, IDialogOutlet, IDialogCloseDirective, IDialog, IAlert, IConfirm],
  exports: [IDialogContainer, IDialogOutlet, IDialogCloseDirective, IDialog, IAlert, IConfirm],
})
export class IDialogModule {}
