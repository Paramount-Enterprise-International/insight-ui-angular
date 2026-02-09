import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  IAlertService,
  IButton,
  ICard,
  IConfirmService,
  IDialogService,
  IFCInput,
  IGridDataSource,
  IGridModule,
  IGridSelectionChange,
  IIcon,
  IInput,
  ILoading,
  ISectionModule,
  ITextArea,
} from '@insight/ui';

import { TestDialog } from './test-dialog/test-dialog';

export type MyRow = {
  userId: number;
  userName: string;
  employeeCode: string;
};

export type TestGrid = {
  fullName: string;
  'Employee Code': string;
  Address: string;
};

export type Row = {
  id: number;
  name: string;
  email: string;
  role: string;
  children?: Row[];
};

@Component({
  selector: 'ir-guide',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ISectionModule,
    ICard,
    IInput,
    IFCInput,
    IButton,
    ITextArea,
    IIcon,
    ILoading,
    IGridModule,
  ],
  templateUrl: './guide.html',
  styleUrl: './guide.scss',
})
export class IRGuide {
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

  // Generate 25 rows of random TestGrid data
  // data: TestGrid[] = Array.from({ length: 25 }).map((_, i) => ({
  //   fullName: randomName(),
  //   'Employee Code': randomEmployeeCode(),
  //   Address: randomAddress(),
  // }));

  // dataSource = new IGridDataSource<TestGrid>(this.data, {
  //   // sort: { active: 'no', direction: 'asc' },
  //   // paginator: false,
  // });

  onSelection(e: IGridSelectionChange<TestGrid>): void {
    console.log('selected rows', e.selected);
    console.log('last changed row', e.lastChanged);
  }
  // paginatorState: IPaginatorState = { pageIndex: 0, pageSize: 5 };

  constructor() {
    // console.log('this.dataSource.data', this.dataSource.data);
    // this.dataSource.paginator = this.paginatorState;
  }

  // onSortChange(state: ISortState) {
  //   this.dataSource.sort = state;
  // }

  // onPageChange(state: IPaginatorState) {
  //   // this.paginatorState = state;
  //   this.dataSource.paginator = state;
  // }

  test2Click(): void {
    console.log('test 2 click');
  }

  test3Click1(): void {
    console.log('test 3 click 1');
  }

  test3Click2(): void {
    console.log('test 3 click 2');
  }

  test4Click1(): void {
    console.log('test 4 click 1');
  }

  test4Click2(): void {
    console.log('test 4 click 2');
  }

  submit(): void {
    console.log('submit');
    if (this.formGroup.invalid) return;
    console.log('not-invalid', this.formGroup.value);
  }

  buttonPrimaryClick(): void {
    this.dialog.open(TestDialog, {
      width: '900px',
      // height: '600px',
    });
  }

  buttonSecondaryClick(): void {
    console.log('buttonSecondaryClick');
  }

  buttonSuccessClick(): void {
    console.log('buttonSuccessClick');
  }

  buttonInfoClick(): void {
    console.log('buttonInfoClick');
  }

  buttonDangerClick(): void {
    console.log('buttonDangerClick');
  }

  buttonWarningClick(): void {
    console.log('buttonWarningClick');
  }

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

  onSelectChanged(e: any): void {
    console.log('e', e);
  }

  displayRow = (row: MyRow | null): string =>
    row ? `${row.userName} (${row.employeeCode}) is cuax` : '';

  data = [
    {
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
      role: 'Admin',
      department: 'IT',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Bob',
      email: 'bob@example.com',
      role: 'User',
      department: 'Finance',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Charlie',
      email: 'charlie@example.com',
      role: 'User',
      department: 'Ops',
      status: 'Inactive',
    },
    {
      id: 4,
      name: 'Diana',
      email: 'diana@example.com',
      role: 'Manager',
      department: 'Sales',
      status: 'Active',
    },
    {
      id: 5,
      name: 'Evan',
      email: 'evan@example.com',
      role: 'User',
      department: 'Support',
      status: 'Active',
    },
    {
      id: 6,
      name: 'Fiona',
      email: 'fiona@example.com',
      role: 'Admin',
      department: 'IT',
      status: 'Inactive',
    },
    {
      id: 7,
      name: 'Gabe',
      email: 'gabe@example.com',
      role: 'User',
      department: 'Ops',
      status: 'Active',
    },
    {
      id: 8,
      name: 'Hana',
      email: 'hana@example.com',
      role: 'Manager',
      department: 'HR',
      status: 'Active',
    },
  ];

  // Non-tree: paginator enabled, default sorts/filters optional
  dataSource = new IGridDataSource<any>(this.data, {
    paginator: {
      pageIndex: 0,
      pageSize: 5,
      pageSizeOptions: [5, 10, 20],
    },
  });

  onRowClick(row: any): void {
    console.log('rowClick', row);
  }

  onSelectionChange(e: { selected: any[]; lastChanged: any | null }): void {
    console.log('selectionChange', e);
  }

  onRowExpandChange(e: { row: any; expanded: boolean }): void {
    console.log('rowExpandChange', e);
  }

  onExpandedRowsChange(rows: any[]): void {
    console.log('expandedRowsChange', rows);
  }
}
