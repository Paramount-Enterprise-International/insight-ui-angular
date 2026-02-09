import { Component, inject, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IUI } from '../../../../ui';
import { IDialogRef, IDialogService } from '../../../../dialog';

@Component({
  selector: 'ir-component-dialog-example',
  imports: [IUI, FormsModule, ReactiveFormsModule],
  templateUrl: './component-dialog-example.html',
  styleUrl: './component-dialog-example.scss',
})
export class ComponentDialogExample {
  @ViewChild('myForm') myForm!: NgForm;

  private dialogRef: IDialogRef = inject(IDialogRef);

  FormBuilder: FormBuilder = inject(FormBuilder);

  firstNameFormControl = new FormControl('', [Validators.required]);
  lastNameFormControl = new FormControl<any>('' as any, [Validators.required]);

  emailFormControl = new FormControl('', [Validators.required]);

  woFormGroup: FormGroup = this.FormBuilder.group({
    firstNameFormControl: this.firstNameFormControl,
    lastNameFormControl: this.lastNameFormControl,
    emailFormControl: this.emailFormControl,
  });

  dialog: IDialogService = inject(IDialogService);

  onSave(): void {
    console.log('onSave Clicked');

    this.myForm.onSubmit(new Event('submit'));

    if (this.myForm.valid) {
      console.log('Form is valid, closing dialog');
      this.dialogRef.close(true);
    } else {
      console.log('Form is invalid, not closing');
    }
  }
}
