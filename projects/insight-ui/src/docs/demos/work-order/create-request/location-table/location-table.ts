import { Component, inject, OnInit } from '@angular/core';
import { I_DIALOG_DATA, IDialogRef, IUI } from '@insight/ui';

type TreeNode = {
  id: number;
  name: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Archived';
  children?: TreeNode[];

  code?: string;
  type?: string;
  location?: string;

  expanded?: boolean;
  selected?: boolean;
};
@Component({
  selector: 'ir-location-table',
  imports: [IUI],
  templateUrl: './location-table.html',
  styleUrl: './location-table.scss',
})
export class LocationTable implements OnInit {
  private dialogRef: IDialogRef = inject(IDialogRef);
  private dialogData = inject(I_DIALOG_DATA);
  treeData: TreeNode[] = [
    {
      id: 1,
      name: 'APARTEMEN BEVERLY',
      status: 'Active',
      type: 'Apartment',
      location: 'Jakarta',
      children: [],
    },
    {
      id: 2,
      name: 'ATRIA MAGELANG',
      status: 'Active',
      type: 'Hotel',
      location: 'Magelang',
      children: [],
    },
    {
      id: 3,
      name: 'ATRIA MALANG',
      status: 'Active',
      type: 'Hotel',
      location: 'Malang',
      children: [],
    },
    {
      id: 4,
      name: 'ATRIA RESIDENCE',
      status: 'Active',
      type: 'Residence',
      location: 'Jakarta',
      children: [
        {
          id: 41,
          name: 'ATRIA RESIDENCE - Basement',
          status: 'Active',
          type: 'Floor',
          location: 'Basement',
          children: [
            {
              id: 411,
              name: 'ATRIA RESIDENCE - Basement - Human Capital',
              status: 'Active',
              type: 'Department',
              location: 'Basement',
              children: [],
            },
            {
              id: 412,
              name: 'ATRIA RESIDENCE - Basement - Employee Locker',
              status: 'Active',
              type: 'Facility',
              location: 'Basement',
              children: [],
            },
            {
              id: 413,
              name: 'ATRIA RESIDENCE - Basement - Engineering',
              status: 'Active',
              type: 'Department',
              location: 'Basement',
              children: [],
            },
            {
              id: 414,
              name: 'ATRIA RESIDENCE - Basement - Housekeeping',
              status: 'Active',
              type: 'Department',
              location: 'Basement',
              children: [],
            },
            {
              id: 415,
              name: 'ATRIA RESIDENCE - Basement - Ruang Accounting',
              status: 'Active',
              type: 'Department',
              location: 'Basement',
              children: [],
            },
          ],
        },
        {
          id: 42,
          name: 'ATRIA RESIDENCE - GF - R. Accounting',
          status: 'Active',
          type: 'Room',
          location: 'Ground Floor',
          children: [],
        },
        {
          id: 43,
          name: 'ATRIA RESIDENCE - Ground - Bianco',
          status: 'Active',
          type: 'Restaurant',
          location: 'Ground Floor',
          children: [],
        },
      ],
    },
  ];
  selectedLocationData: any;

  selectedIds: number[] = [];
  selectedNames: string[] = [];

  expandedKeys: number[] = [];

  preparedTreeData: TreeNode[] = [];

  selectedObjects: any[] = [];

  ngOnInit(): void {
    console.log(this.dialogData);

    this.onSelectionChange(this.dialogData);
  }

  onSelectionChange(event: any): void {
    console.log('Selection changed:', event);
    this.selectedLocationData = event;
  }

  onSave(): void {
    this.dialogRef.close({
      success: true,
      message: 'Request created successfully',
      data: this.selectedLocationData,
    });
  }
}
