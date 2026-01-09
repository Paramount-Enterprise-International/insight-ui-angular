import { NgClass } from '@angular/common';
import { Component, inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { I_DIALOG_DATA, IDialog, IDialogRef, IDialogService } from '../dialog/dialog';
import { IIcon } from '../icon/icon';

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
