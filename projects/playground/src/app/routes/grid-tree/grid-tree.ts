import { Component } from '@angular/core';
import { IUI } from '@insight-ui';

interface TreeNode {
  id: number;
  name: string;
  status: 'Active' | 'Inactive';
  children?: TreeNode[];
}

@Component({
  selector: 'app-grid-tree',
  imports: [IUI],
  templateUrl: './grid-tree.html',
  styleUrl: './grid-tree.css',
})
export class GridTree {
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

  // selection events (tree-aware, cascaded)
  onRowSelectionChange(payload: { selected: TreeNode[]; lastChanged: TreeNode | null }) {
    console.log('rowSelectionChange', payload);
  }

  // plain row click (remember: row click DOES NOT change selection anymore)
  onRowClick(row: TreeNode) {
    console.log('rowClick', row);
  }

  // optional: listen to expand/collapse of a single row
  onRowExpandChange(ev: { row: TreeNode; expanded: boolean }) {
    console.log('rowExpandChange', ev);
  }

  // optional: whenever the set of expanded rows changes
  onExpandedRowsChange(expandedRows: TreeNode[]) {
    console.log('expandedRowsChange', expandedRows);
  }
}
