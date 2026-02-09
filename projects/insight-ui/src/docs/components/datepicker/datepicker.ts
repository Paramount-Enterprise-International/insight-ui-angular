import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IAlertService, IUI } from '@insight/ui';

@Component({
  selector: 'ir-datepicker',
  imports: [IUI, FormsModule, ReactiveFormsModule],
  templateUrl: './datepicker.html',
  styleUrl: './datepicker.scss',
})
export class Datepicker {
  formBuilder: FormBuilder = inject(FormBuilder);

  dateFromControl: FormControl = new FormControl(null, [Validators.required]);
  dateToControl: FormControl = new FormControl(null, [Validators.required]);
  basicFormGroup: FormGroup = this.formBuilder.group({
    dateFromControl: this.dateFromControl,
    dateToControl: this.dateToControl,
  });

  description = 'Saved successfully! You can view it in the "List" page.';

  alert: IAlertService = inject(IAlertService);

  onSubmit(): void {
    if (this.basicFormGroup.valid) {
      this.alert
        .success('Success', this.description)
        .subscribe((result) => console.log(result));
    } else {
      console.log('error');
    }
  }
}
