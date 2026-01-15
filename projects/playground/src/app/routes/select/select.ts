import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IUI } from '@insight-ui';

@Component({
  selector: 'app-select',
  imports: [IUI, ReactiveFormsModule, FormsModule],
  templateUrl: './select.html',
  styleUrl: './select.css',
})
export class Select {
  FormBuilder: FormBuilder = inject(FormBuilder);

  titleFormControl = new FormControl('', [Validators.required]);
  divisionFormControl = new FormControl('', [Validators.required]);
  locationFormControl = new FormControl('', [Validators.required]);
  sendEmailFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('', [Validators.required]);

  woFormGroup: FormGroup = this.FormBuilder.group({
    titleFormControl: this.titleFormControl,
    divisionFormControl: this.divisionFormControl,
    locationFormControl: this.locationFormControl,
    sendEmailFormControl: this.sendEmailFormControl,
    descriptionFormControl: this.descriptionFormControl,
  });

  onSubmit(): void {}

  inputAddonClick(): void {}
}
