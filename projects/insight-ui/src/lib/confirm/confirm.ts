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
  templateUrl: './confirm.html',
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
