import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IAlertService,
  IDialogService,
  IGridDataSource,
  IUI,
} from '@insight/ui';
import { CreateRequest } from './create-request/create-request';
import { EditRequest } from './edit-request/edit-request';

type RequestData = {
  id: number;
  requestCode: string;
  title: string;
  location: string;
  destination: string;
  status: string;
  requestDate: string;
};
@Component({
  selector: 'ir-work-order',
  imports: [IUI, FormsModule, ReactiveFormsModule],
  templateUrl: './work-order.html',
  styleUrl: './work-order.scss',
})
export class WorkOrder implements OnInit {
  formBuilder: FormBuilder = inject(FormBuilder);
  dateFromControl = new FormControl<Date | null>(null);
  dateToControl = new FormControl<Date | null>(null);
  searchControl = new FormControl<string>('');

  alert: IAlertService = inject(IAlertService);
  description = 'Saved successfully! You can view it in the "List" page.';
  descriptionEdit = 'Edit successfully! You can view it in the "List" page.';

  private readonly STORAGE_KEY = 'request_data';

  basicFormGroup: FormGroup = this.formBuilder.group({
    dateFrom: this.dateFromControl,
    dateTo: this.dateToControl,
    search: this.searchControl,
  });

  dialog: IDialogService = inject(IDialogService);

  originalData: RequestData[] = [];

  displayedData: RequestData[] = [];

  dataSource = new IGridDataSource<any>([], {
    paginator: {
      pageIndex: 0,
      pageSize: 5,
      pageSizeOptions: [5, 10, 20],
    },
  });

  private defaultData: RequestData[] = [
    {
      id: 1,
      requestCode: 'REQ2026050001',
      title: 'pergantian lampu di ruang meeting lt.6 soho',
      location: 'lt.6 Soho IT',
      destination: 'General Affairs',
      status: 'Rejected',
      requestDate: '14/01/2026',
    },
  ];

  constructor() {
    this.loadDataFromStorage();
  }

  ngOnInit(): void {
    this.setupStorageEventListener();
    this.refreshDataSource();
  }

  private setupStorageEventListener(): void {
    window.addEventListener('requestStorageUpdated', () => {
      console.log('Storage updated event received');
      this.loadDataFromStorage();
    });

    window.addEventListener('storage', (event: StorageEvent) => {
      if (event.key === this.STORAGE_KEY) {
        console.log('Storage changed from another tab');
        this.loadDataFromStorage();
      }
    });
  }

  loadDataFromStorage(): RequestData[] {
    try {
      const storage = localStorage.getItem(this.STORAGE_KEY);

      if (storage) {
        const parsedData = JSON.parse(storage);

        if (Array.isArray(parsedData) && parsedData.length > 0) {
          this.originalData = parsedData;
          this.displayedData = [...parsedData];
          console.log('Data loaded from storage:', this.originalData);
        } else {
          console.warn(
            'Data di storage bukan array atau kosong, menggunakan default'
          );
          this.initializeDefaultData();
        }
      } else {
        console.log('No data in storage, initializing with default data');
        this.initializeDefaultData();
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      this.initializeDefaultData();
    }

    return this.originalData;
  }

  private initializeDefaultData(): void {
    this.originalData = [...this.defaultData];
    this.displayedData = [...this.defaultData];
    this.saveDataStorage(this.originalData);
  }

  saveDataStorage(data: RequestData[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      console.log('Data saved to storage:', data);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  updateInToLocalStorage(newData: RequestData[]): void {
    this.originalData = newData;
    this.saveDataStorage(newData);
    this.applyCurrentFilter();
  }

  deleteData(id: any): void {
    const filterData = this.originalData.filter((x: any) => x.id !== id);
    this.updateInToLocalStorage(filterData);
    this.refreshDataSource();
  }

  refreshDataSource(): void {
    this.dataSource.data = this.displayedData;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.pageIndex = 0;
    }
  }
  showSuccessAlert(): void {
    this.alert
      .success('Success', this.description)
      .subscribe((result) => console.log(result));
  }
  showSuccessEditAlert(): void {
    this.alert
      .success('Success', this.descriptionEdit)
      .subscribe((result) => console.log(result));
  }
  createRequest(): void {
    const dialogRef = this.dialog.open(CreateRequest, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Request created successfully');
        this.loadDataFromStorage();
        this.refreshDataSource();
        this.showSuccessAlert();
      }
    });
  }

  editRequest(id: any): void {
    const locationDialogRef = this.dialog.open(EditRequest, {
      width: '550px',
      data: id,
    });

    locationDialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.loadDataFromStorage();
        this.refreshDataSource();
        this.showSuccessEditAlert();
      }
    });
  }

  private applyCurrentFilter(): void {
    if (this.basicFormGroup.valid) {
      const formValues = this.basicFormGroup.value;

      const filteredData = this.originalData.filter((item) => {
        if (formValues.dateFrom || formValues.dateTo) {
          const itemDateStr = item.requestDate;
          const itemDay = parseInt(itemDateStr.split('/')[0], 10);
          const itemMonth = parseInt(itemDateStr.split('/')[1], 10);
          const itemYear = parseInt(itemDateStr.split('/')[2], 10);
          const itemDateNum = itemYear * 10000 + itemMonth * 100 + itemDay;

          if (formValues.dateFrom) {
            const fromDate = new Date(formValues.dateFrom);
            const fromYear = fromDate.getFullYear();
            const fromMonth = fromDate.getMonth() + 1;
            const fromDay = fromDate.getDate();
            const fromDateNum = fromYear * 10000 + fromMonth * 100 + fromDay;
            if (itemDateNum < fromDateNum) return false;
          }

          if (formValues.dateTo) {
            const toDate = new Date(formValues.dateTo);
            const toYear = toDate.getFullYear();
            const toMonth = toDate.getMonth() + 1;
            const toDay = toDate.getDate();
            const toDateNum = toYear * 10000 + toMonth * 100 + toDay;
            if (itemDateNum > toDateNum) return false;
          }
        }

        if (formValues.search && formValues.search.trim() !== '') {
          const searchLower = formValues.search.toLowerCase();
          if (
            !item.title.toLowerCase().includes(searchLower) &&
            !item.requestCode.toLowerCase().includes(searchLower)
          ) {
            return false;
          }
        }

        return true;
      });

      this.displayedData = filteredData;
    } else {
      this.displayedData = [...this.originalData];
    }

    this.refreshDataSource();
  }

  onSubmit(): void {
    if (this.basicFormGroup.valid) {
      this.applyCurrentFilter();
    } else {
      console.log('Form invalid');
      this.displayedData = [...this.originalData];
      this.refreshDataSource();
    }
  }

  clearFilter(): void {
    this.dateFromControl.reset();
    this.dateToControl.reset();
    this.searchControl.reset();

    this.displayedData = [...this.originalData];
    this.refreshDataSource();
  }

  debugData(): void {
    console.log('Original Data:', this.originalData);
    console.log('Displayed Data:', this.displayedData);
    console.log('Local Storage:', localStorage.getItem(this.STORAGE_KEY));
  }
}
