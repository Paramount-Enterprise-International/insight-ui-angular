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
} from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IButton, IButtonVariant } from '../button/button';
import { IIconName } from '../icon/icon';

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

@NgModule({
  imports: [IDialogContainer, IDialogOutlet, IDialogCloseDirective, IDialog],
  exports: [IDialogContainer, IDialogOutlet, IDialogCloseDirective, IDialog],
})
export class IDialogModule {}
