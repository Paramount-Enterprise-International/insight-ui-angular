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
import { IDialogRef, IDialogService, ISelectChange, IUI } from '@insight/ui';
import { of } from 'rxjs';
import { LocationTable } from './location-table/location-table';
type RequestData = {
  id: number;
  requestCode: string;
  title: string;
  location: string;
  destination: string;
  status: string;
  requestDate: string;
  sendEmail: string;
};

type MyRow = {
  userId: number;
  userName: string;
  employeeCode: string;
};
@Component({
  selector: 'ir-create-request',
  imports: [IUI, FormsModule, ReactiveFormsModule],
  templateUrl: './create-request.html',
  styleUrl: './create-request.scss',
})
export class CreateRequest {
  @ViewChild('myForm') myForm!: NgForm;

  private dialogRef: IDialogRef = inject(IDialogRef);

  FormBuilder: FormBuilder = inject(FormBuilder);

  titleFormControl = new FormControl('', [Validators.required]);
  divisionFormControl = new FormControl<any>('' as any, [Validators.required]);

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

  dialog: IDialogService = inject(IDialogService);

  selectedValue: MyRow | null = null;
  rows: MyRow[] = [
    { userId: 1, userName: 'Roni', employeeCode: 'PL1378' },
    { userId: 2, userName: 'Irwan', employeeCode: 'PL1234' },
    { userId: 3, userName: 'Ronway', employeeCode: 'PL2345' },
  ];
  rows$ = of(this.rows);

  divisions: any[] = [
    { id: 1, divionName: 'IT' },
    { id: 2, divionName: 'GA' },
    { id: 3, divionName: 'Sales' },
  ];
  divisions$ = of(this.divisions);

  onOptionSelected(e: ISelectChange<MyRow>): void {
    console.log('Selected row:', e.value);
    this.sendEmailFormControl.setValue(JSON.stringify(e.value));
  }

  onOptionSelectedDivision(e: ISelectChange<MyRow>): void {
    console.log('select division', e.value);
    this.divisionFormControl.setValue(JSON.stringify(e.value));
  }

  inputAddonClick = (): void => {
    console.log('Button clicked');
    this.openDialog();
  };

  openDialog = (): void => {
    const currentValue = this.locationFormControl.value;

    const selectedNames = currentValue
      ? currentValue.split(',').map((name) => name.trim())
      : [];
    const locationDialogRef = this.dialog.open(LocationTable, {
      width: '850px',
      data: selectedNames,
    });

    locationDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Selected array:', result.data.selected);

        const firstItem = result.data.selected
          .map((x: any) => x.name)
          .join(', ');
        console.log(firstItem, 'firstItem');
        this.locationFormControl.setValue(firstItem);
      }
    });
  };
  onSave(): void {
    console.log('onSave Clicked');
    this.myForm.onSubmit(new Event('submit'));

    this.saveToLocalStorage();

    this.dialogRef.close(true);
  }

  getExistingDataFromLocalStorage(): any {
    try {
      const dataLocal = localStorage.getItem('request_data');
      if (dataLocal) {
        return JSON.parse(dataLocal);
      }
    } catch (error) {
      console.error(error);
    }
  }
  private saveToLocalStorage(): void {
    try {
      const existingData = this.getExistingDataFromLocalStorage();

      const createData = this.createNewRequest();

      const saveDatatoLocalStorage = [...existingData, createData];

      localStorage.setItem(
        'request_data',
        JSON.stringify(saveDatatoLocalStorage)
      );
    } catch (error) {
      console.error(error);
    }
  }

  private createNewRequest(): RequestData {
    const existingData = this.getExistingDataFromLocalStorage();
    const newId =
      existingData.length > 0
        ? Math.max(...existingData.map((item: any) => item.id)) + 1
        : 1;

    const requestCode = this.generateRequestCode(existingData.length + 1);

    const requestDate = this.getCurrentDateFormatted();

    const divisionName = this.divisionFormControl.value;

    let divisionTo = '';

    if (divisionName) {
      let parsedValue: any;

      if (typeof divisionName === 'string') {
        try {
          if (
            divisionName.trim().startsWith('{') &&
            divisionName.trim().endsWith('}')
          ) {
            parsedValue = JSON.parse(divisionName);
            console.log('Parsed JSON:', parsedValue);
          } else {
            divisionTo = divisionName;
            console.log('String value (non-JSON):', divisionTo);
          }
        } catch (error) {
          divisionTo = divisionName;
          console.log('Not a valid JSON, using as string:', divisionTo);
          console.log(error);
        }
      } else if (typeof divisionName === 'object' && divisionName !== null) {
        parsedValue = divisionName;
      }

      if (parsedValue) {
        if (parsedValue.divionName) {
          divisionTo = parsedValue.divionName;
        } else if (parsedValue.divisionName) {
          divisionTo = parsedValue.divisionName;
        } else if (parsedValue.name) {
          divisionTo = parsedValue.name;
        }
      }
    }
    console.log(this.sendEmailFormControl.value, 'value Name');
    return {
      id: newId,
      requestCode,
      title: this.titleFormControl.value || '',
      destination: divisionTo || 'IT',
      location: this.locationFormControl.value || 'SOHO',
      status: 'Pending',
      requestDate,
      sendEmail: this.sendEmailFormControl.value || '',
    };
  }

  private generateRequestCode(sequence: number): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const sequenceStr = String(sequence).padStart(4, '0');

    return `REQ${year}${month}${sequenceStr}`;
  }

  private getCurrentDateFormatted(): string {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    return `${day}/${month}/${year}`;
  }
}
