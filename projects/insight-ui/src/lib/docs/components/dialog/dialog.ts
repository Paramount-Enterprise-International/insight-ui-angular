import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ComponentDialogExample } from './component-dialog-example/component-dialog-example';
import { IUI } from '../../../ui';
import { IAlertService, IConfirmService, IDialogService } from '../../../dialog';

@Component({
  selector: 'ir-dialog',
  imports: [IUI],
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss',
})
export class IRDialog {
  dialog: IDialogService = inject(IDialogService);
  formBuilder: FormBuilder = inject(FormBuilder);
  test1 = new FormControl('', [Validators.required]);
  test2 = new FormControl('', [Validators.required]);
  test3 = new FormControl('', [Validators.required]);
  test4 = new FormControl('test 4');
  formGroup: FormGroup = this.formBuilder.group({
    test1: this.test1,
    test2: this.test2,
    test3: this.test3,
    test4: this.test4,
  });

  alert: IAlertService = inject(IAlertService);

  confirm: IConfirmService = inject(IConfirmService);

  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
  showInformationAlert(): void {
    this.alert
      .information('Information Alert', this.description)
      .subscribe((result) => console.log(result));
  }

  showSuccessAlert(): void {
    this.alert
      .success('Success Alert', this.description)
      .subscribe((result) => console.log(result));
  }

  showWarningAlert(): void {
    this.alert
      .warning('Warning Alert', this.description)
      .subscribe((result) => console.log(result));
  }

  showDangerAlert(): void {
    this.alert.danger('Danger Alert', this.description).subscribe((result) => console.log(result));
  }

  showInformationConfirm(): void {
    this.confirm
      .information('Information Confirm', this.description)
      .subscribe((result) => console.log(result));
  }

  showSuccessConfirm(): void {
    this.confirm
      .success('Success Confirm', this.description)
      .subscribe((result) => console.log(result));
  }

  showWarningConfirm(): void {
    this.confirm
      .warning('Warning Confirm', this.description)
      .subscribe((result) => console.log(result));
  }

  showDangerConfirm(): void {
    this.confirm
      .danger('Danger Confirm', this.description, true)
      .subscribe((result) => console.log(result));
  }

  createData(): void {
    const dialogRef = this.dialog.open(ComponentDialogExample, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Request created successfully');
      }
    });
  }
}
