import { NgClass } from '@angular/common';
import { Component, inject, Injectable, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { I_DIALOG_DATA, IDialog, IDialogRef, IDialogService } from '../dialog/dialog';
import { IIcon } from '../icon/icon';
import { IFCTextArea } from '../textarea/textarea';

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
