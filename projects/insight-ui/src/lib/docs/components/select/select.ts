import { Component, inject } from '@angular/core';
import { of } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IUI } from '../../../ui';
import { ISelectChange } from '../../../select';

export interface MyRow {
  userId: number;
  userName: string;
  employeeCode: string;
}

@Component({
  selector: 'ir-select',
  imports: [IUI, ReactiveFormsModule],
  templateUrl: './select.html',
  styleUrl: './select.scss',
})
export class IRSelect {
  selectedValue: MyRow | null = null;
  rows: MyRow[] = [
    { userId: 1, userName: 'Dylan', employeeCode: 'PL1378' },
    { userId: 2, userName: 'Dinan', employeeCode: 'PL1234' },
    { userId: 3, userName: 'Michael Christianto', employeeCode: 'PL2345' },
    { userId: 4, userName: 'Dilo', employeeCode: 'PL3456' },
    { userId: 5, userName: 'Risky Yanuary', employeeCode: 'PL4567' },
    { userId: 6, userName: 'Winda', employeeCode: 'PL5678' },
    { userId: 7, userName: 'Eka Purnama', employeeCode: 'PL6789' },
    { userId: 8, userName: 'Jefry Suria', employeeCode: 'PL7890' },
  ];
  formBuilder: FormBuilder = inject(FormBuilder);
  basicFormControl1 = new FormControl('', [Validators.required]);

  basicFormGroup: FormGroup = this.formBuilder.group({
    basicFormControl1: this.basicFormControl1,
  });

  rows$ = of(this.rows);

  onOptionSelected(e: ISelectChange<MyRow>): void {
    console.log('Selected row:', e.value);
  }

  handleOptionSelected(e: ISelectChange<MyRow> | Event): void {
    if ('value' in e && 'label' in e) {
      this.selectedValue = e.value;
      console.log('Selected:', e.value);
    } else {
      console.warn('Received Event object, not ISelectChange');
    }
  }
}
