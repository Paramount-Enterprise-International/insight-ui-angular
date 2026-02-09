import { Component } from '@angular/core';
import { IUI } from '../../../ui';
import { IGridDataSource } from '../../../grid';

type TreeNode = {
  id: number;
  name: string;
  status: 'Active' | 'Inactive';
  children?: TreeNode[];
};

@Component({
  selector: 'ir-grid',
  imports: [IUI],
  templateUrl: './grid.html',
  styleUrl: './grid.scss',
})
export class IRGrid {
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
  treeData: TreeNode[] = [
    {
      id: 1,
      name: 'Root A',
      status: 'Active',
      children: [
        {
          id: 11,
          name: 'Child A.1',
          status: 'Active',
        },
        {
          id: 12,
          name: 'Child A.2',
          status: 'Inactive',
          children: [
            { id: 121, name: 'Grandchild A.2.1', status: 'Active' },
            { id: 122, name: 'Grandchild A.2.2', status: 'Inactive' },
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'Root B',
      status: 'Inactive',
      children: [
        { id: 21, name: 'Child B.1', status: 'Active' },
        { id: 22, name: 'Child B.2', status: 'Inactive' },
      ],
    },
  ];
  onSelectionChange(e: { selected: any[]; lastChanged: any | null }): void {
    console.log('selectionChange', e);
  }
  // selection events (tree-aware, cascaded)
  onRowSelectionChange(payload: { selected: TreeNode[]; lastChanged: TreeNode | null }): void {
    console.log('rowSelectionChange', payload);
  }

  // plain row click (remember: row click DOES NOT change selection anymore)
  onRowClick(row: TreeNode): void {
    console.log('rowClick', row);
  }

  // optional: listen to expand/collapse of a single row
  onRowExpandChange(ev: { row: TreeNode; expanded: boolean }): void {
    console.log('rowExpandChange', ev);
  }

  // optional: whenever the set of expanded rows changes
  onExpandedRowsChange(expandedRows: TreeNode[]): void {
    console.log('expandedRowsChange', expandedRows);
  }
}
