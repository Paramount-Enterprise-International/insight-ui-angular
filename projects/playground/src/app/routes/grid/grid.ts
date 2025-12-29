import { Component } from '@angular/core';
import { IGridDataSource, ISection, IUI } from '@insight-ui';

@Component({
  selector: 'app-grid',
  imports: [IUI],
  templateUrl: './grid.html',
  styleUrl: './grid.css',
})
export class Grid {
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

  onRowClick(row: any) {
    console.log('rowClick', row);
  }

  onSelectionChange(e: { selected: any[]; lastChanged: any | null }) {
    console.log('selectionChange', e);
  }

  onRowExpandChange(e: { row: any; expanded: boolean }) {
    console.log('rowExpandChange', e);
  }

  onExpandedRowsChange(rows: any[]) {
    console.log('expandedRowsChange', rows);
  }
}
