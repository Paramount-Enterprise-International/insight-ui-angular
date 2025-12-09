import {
  AsyncPipe,
  NgClass,
  NgComponentOutlet,
  NgForOf,
  NgStyle,
} from '@angular/common';
import {
  Component,
  Directive,
  EventEmitter,
  HostListener,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  NgModule,
  OnChanges,
  Output,
  SimpleChanges,
  Type,
  inject,
} from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IButton, IButtonVariant } from '../button/button';
import { IIconName } from '../icon/icon';

/**
 * CONFIG + TOKENS
 */

export interface IDialogConfig<TData = any> {
  id?: string;
  data?: TData;
  width?: string;
  height?: string;
  disableClose?: boolean; // ignore ESC
  backdropClose?: boolean; // allow click backdrop to close
}

export const I_DIALOG_DATA = new InjectionToken<any>('I_DIALOG_DATA');

/**
 * REF
 * TComponent = dialog component type
 * TResult   = result type of close()
 */

export class IDialogRef<TComponent = any, TResult = any> {
  private readonly _afterClosed$ = new Subject<TResult | undefined>();

  close(result?: TResult): void {
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

interface IDialogInstance<TData = any, TResult = any> {
  id: string;
  component: Type<any>;
  config: Required<IDialogConfig<TData>>;
  ref: IDialogRef<any, TResult>;
}

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
    config: IDialogConfig<TData> = {}
  ): IDialogRef<TComponent, TResult> {
    const id = config.id ?? `i-dialog-${++DIALOG_ID_COUNTER}`;
    const ref = new IDialogRef<TComponent, TResult>();

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
      (instance.ref as IDialogRef<any, any>).close(result);
    }
  }

  closeAll(): void {
    this._dialogs$.value.forEach((d) =>
      (d.ref as IDialogRef<any, any>).close()
    );
  }
}

/**
 * CONTAINER COMPONENT (ONE DIALOG)
 */

@Component({
  selector: 'i-dialog-container',
  standalone: true,
  imports: [NgComponentOutlet, NgStyle],
  templateUrl: './dialog-container.html',
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
    if (!this.isTopMost) return; // only the topmost dialog reacts
    if (!this.instance?.config.disableClose) {
      (this.instance.ref as IDialogRef<any, any>).close();
    }
  }

  onBackdropClick(): void {
    if (!this.isTopMost) return; // only topmost backdrop closes
    if (
      !this.instance?.config.disableClose &&
      this.instance?.config.backdropClose
    ) {
      (this.instance.ref as IDialogRef<any, any>).close();
    }
  }
}

/**
 * OUTLET COMPONENT (ALL DIALOGS)
 */

@Component({
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

  private dialogRef = inject<IDialogRef<any, any>>(IDialogRef);

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
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
  templateUrl: './dialog.html',
})
export class IDialog {
  @Input() title: string | undefined;
  @Input() actions: DialogAction[] = ['save', 'cancel'];
  @Input() actionAlign?: 'start' | 'center' | 'end' = 'end';

  @Output() onOk: EventEmitter<any> = new EventEmitter<any>();
  @Output() onConfirm: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSave: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCustomAction: EventEmitter<IDialogActionObject> =
    new EventEmitter<IDialogActionObject>();

  get normalizedActions(): IDialogActionObject[] {
    return (this.actions ?? []).map((a) =>
      typeof a === 'string' ? ({ type: a } as IDialogActionObject) : a
    );
  }

  get saveAction() {
    return this.normalizedActions.find((a) => a.type === 'save') as
      | IDialogActionSave
      | undefined;
  }

  get okAction() {
    return this.normalizedActions.find((a) => a.type === 'ok') as
      | IDialogActionOK
      | undefined;
  }

  get confirmAction() {
    return this.normalizedActions.find((a) => a.type === 'confirm') as
      | IDialogActionConfirm
      | undefined;
  }

  get customActions(): IDialogActionCustom[] {
    return this.normalizedActions.filter(
      (a) => a.type === 'custom'
    ) as IDialogActionCustom[];
  }

  get cancelAction() {
    return this.normalizedActions.find((a) => a.type === 'cancel') as
      | IDialogActionCancel
      | undefined;
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

  onCustomActionClick(a: IDialogActionCustom) {
    this.onCustomAction.emit(a);
  }
}

@NgModule({
  imports: [IDialogContainer, IDialogOutlet, IDialogCloseDirective, IDialog],
  exports: [IDialogContainer, IDialogOutlet, IDialogCloseDirective, IDialog],
})
export class IDialogModule {}
