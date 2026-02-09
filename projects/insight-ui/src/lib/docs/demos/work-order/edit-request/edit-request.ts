import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { of } from 'rxjs';
import { LocationTable } from '../create-request/location-table/location-table';
import { IUI } from '../../../../ui';
import { I_DIALOG_DATA, IDialogRef, IDialogService } from '../../../../dialog';
import { ISelectChange } from '../../../../select';

type MyRow = {
  userId: number;
  userName: string;
  employeeCode: string;
};
@Component({
  selector: 'ir-edit-request',
  imports: [IUI, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-request.html',
  styleUrl: './edit-request.scss',
})
export class EditRequest implements OnInit {
  dialog: IDialogService = inject(IDialogService);
  FormBuilder: FormBuilder = inject(FormBuilder);
  private dialogRef: IDialogRef = inject(IDialogRef);
  private dialogData = inject(I_DIALOG_DATA);
  requestId = 0;
  selectedEmailValue: any = null;

  titleFormControl: FormControl = new FormControl('', [Validators.required]);
  divisionFormControl: FormControl = new FormControl('', [Validators.required]);
  locationFormControl = new FormControl('', [Validators.required]);
  sendEmailFormControl = new FormControl('');
  descriptionFormControl = new FormControl('');
  statusFormControl = new FormControl('Pending', [Validators.required]);

  woFormGroup: FormGroup = this.FormBuilder.group({
    titleFormControl: this.titleFormControl,
    divisionFormControl: this.divisionFormControl,
    locationFormControl: this.locationFormControl,
    sendEmailFormControl: this.sendEmailFormControl,
    descriptionFormControl: this.descriptionFormControl,
    statusFormControl: this.statusFormControl,
  });
  selectedUser: MyRow | null = null;
  currentRequest: any = null;

  rows: MyRow[] = [
    { userId: 2, userName: 'Roni', employeeCode: 'PL1378' },
    { userId: 3, userName: 'Irwan', employeeCode: 'PL1234' },
    { userId: 4, userName: 'Ronway', employeeCode: 'PL2345' },
  ];

  divisions: any[] = [
    { id: 1, divionName: 'IT' },
    { id: 2, divionName: 'GA' },
    { id: 3, divionName: 'Sales' },
    { id: 4, divionName: 'General Affairs' },
  ];

  divisions$ = of(this.divisions);
  rows$ = of(this.rows);
  selectedDivision: any;

  onOptionSelectedDivision(e: ISelectChange<any>): void {
    console.log('Selected division object:', e.value);

    const divisionName = e.value.divionName;

    this.divisionFormControl.setValue(divisionName);

    this.selectedDivision = e.value;

    console.log('Division saved:', divisionName);
  }

  ngOnInit(): void {
    this.loadpopulateFormData();

    this.requestId = this.dialogData?.id || this.dialogData;

    if (this.requestId) {
      this.loadRequestData();
    } else {
      console.error('No ID provided for editing');
      this.dialogRef.close(false);
    }
  }

  inputAddonClick = (): void => {
    this.openDialog();
  };

  openDialog = (): void => {
    const currentValue = this.locationFormControl.value;

    const selectedNames = currentValue ? currentValue.split(',').map((name) => name.trim()) : [];
    const locationDialogRef = this.dialog.open(LocationTable, {
      width: '850px',
      data: selectedNames,
    });

    locationDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Selected array:', result.data.selected);

        const firstItem = result.data.selected.map((x: any) => x.name).join(', ');
        console.log(firstItem, 'firstItem');
        this.locationFormControl.setValue(firstItem);
      }
    });
  };

  private loadRequestData(): void {
    try {
      const allRequests = this.getDataFromLocalStorage();

      if (!Array.isArray(allRequests)) {
        throw new Error('Invalid data format in localStorage');
      }

      const request = allRequests.find((req: any) => req.id === this.requestId);

      if (request) {
        this.currentRequest = request;
      } else {
        this.dialogRef.close(false);
      }
    } catch (error) {
      console.error('Error loading request data:', error);
      this.dialogRef.close(false);
    }
  }

  private loadpopulateFormData(): void {
    const allData = JSON.parse(localStorage.getItem('request_data') || '[]');
    const dataEdit = allData.find((x: any) => x.id === this.dialogData);

    if (dataEdit) {
      this.titleFormControl.setValue(dataEdit.title);
      this.divisionFormControl.setValue(dataEdit.destination);
      this.locationFormControl.setValue(dataEdit.location);
      this.descriptionFormControl.setValue(dataEdit.description || '');
      this.selectedDivision = this.divisions.find((div) => div.divionName === dataEdit.destination);

      if (dataEdit.sendEmail) {
        try {
          const parsed = JSON.parse(dataEdit.sendEmail);
          let userId: number | null = null;

          if (parsed.userId) {
            userId = parsed.userId;
          } else if (parsed.value) {
            if (typeof parsed.value === 'string') {
              try {
                const inner = JSON.parse(parsed.value);
                userId = inner.userId;
              } catch {
                userId = parseInt(parsed.value, 10);
              }
            } else if (typeof parsed.value === 'object') {
              userId = parsed.value.userId;
            }
          }

          if (userId) {
            this.selectedUser = this.rows.find((u) => u.userId === userId) || null;
          }
        } catch (error) {
          console.log('Bukan JSON, skip email', error);
        }
      }
    }
  }

  onOptionSelected(e: ISelectChange<MyRow>): void {
    console.log('Selected email option:', e);

    try {
      const selectedData = typeof e.value === 'string' ? JSON.parse(e.value) : e.value;
      this.selectedEmailValue = selectedData;
      this.sendEmailFormControl.setValue(JSON.stringify(selectedData));
    } catch (error) {
      console.error('Error processing selected option:', error);
      this.sendEmailFormControl.setValue(JSON.stringify(e.value));
    }
  }

  private getDataFromLocalStorage(): any[] {
    try {
      const data = localStorage.getItem('request_data');
      if (data) {
        return JSON.parse(data);
      }
      return [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  }

  onSave(): void {
    console.log('Saving changes...');

    if (this.woFormGroup.invalid) {
      console.log('Form is invalid');
      this.markFormGroupTouched(this.woFormGroup);
      return;
    }

    if (!this.currentRequest) {
      console.error('No current request to update');
      return;
    }

    try {
      const updatedRequest: any = {
        ...this.currentRequest,
        id: this.requestId,
        title: this.titleFormControl.value || '',
        destination: this.divisionFormControl.value || this.selectedDivision,
        location: this.locationFormControl.value || '',
        status: this.statusFormControl.value || 'Pending',
        description: this.descriptionFormControl.value || '',
        sendEmail: this.sendEmailFormControl.value || this.currentRequest.sendEmail,
        requestCode: this.currentRequest.requestCode,
        requestDate: this.currentRequest.requestDate,
      };

      console.log('Updated request:', updatedRequest);

      const success = this.updateLocalStorage(updatedRequest);

      if (success) {
        console.log('Request updated successfully');
        this.dialogRef.close(true);
      } else {
        console.error('Failed to update request');
      }
    } catch (error) {
      console.error('Error saving request:', error);
    }
  }

  private updateLocalStorage(updatedRequest: any): boolean {
    try {
      const allData = this.getDataFromLocalStorage();

      if (!Array.isArray(allData)) {
        console.error('Invalid data format in localStorage');
        return false;
      }

      const requestIndex = allData.findIndex((req: any) => req.id === this.requestId);

      console.log(`Found request at index: ${requestIndex}`);

      if (requestIndex === -1) {
        console.error(`Request with ID ${this.requestId} not found`);
        return false;
      }

      allData[requestIndex] = updatedRequest;

      localStorage.setItem('request_data', JSON.stringify(allData));

      console.log('LocalStorage updated successfully');
      return true;
    } catch (error) {
      console.error('Error updating localStorage:', error);
      return false;
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
