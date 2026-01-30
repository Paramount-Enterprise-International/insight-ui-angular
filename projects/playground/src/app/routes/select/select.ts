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

type City = { id: number; name: string };

@Component({
  selector: 'app-select',
  imports: [IUI, ReactiveFormsModule, FormsModule],
  templateUrl: './select.html',
  styleUrl: './select.css',
})
export class Select {
  options: City[] = [
    { id: 1, name: 'Jakarta' },
    { id: 2, name: 'Bandung' },
    { id: 3, name: 'Surabaya' },
  ];

  selected: City | City[] | null = this.options[0];

  displayWith = (row: City | null): string => row?.name ?? '';

  formBuilder: FormBuilder = inject(FormBuilder);

  titleFormControl = new FormControl('', [Validators.required]);
  divisionFormControl = new FormControl('', [Validators.required]);
  locationFormControl = new FormControl('', [Validators.required]);
  sendEmailFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('', [Validators.required]);

  woFormGroup: FormGroup = this.formBuilder.group({
    titleFormControl: this.titleFormControl,
    divisionFormControl: this.divisionFormControl,
    locationFormControl: this.locationFormControl,
    sendEmailFormControl: this.sendEmailFormControl,
    descriptionFormControl: this.descriptionFormControl,
  });

  dateFromControl: FormControl = new FormControl(null, [Validators.required]);
  dateToControl: FormControl = new FormControl(null, [Validators.required]);
  basicFormGroup: FormGroup = this.formBuilder.group({
    dateFromControl: this.dateFromControl,
    dateToControl: this.dateToControl,
  });

  onSubmit(): void {
    /*  */
  }

  inputAddonClick(): void {
    /*  */
  }

  onOptionSelected(e: any): void {
    console.log('selected:', e);
  }

  remove(): void {
    /*  */
  }
}
