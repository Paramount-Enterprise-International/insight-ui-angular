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
  templateUrl: './alert.html',
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
