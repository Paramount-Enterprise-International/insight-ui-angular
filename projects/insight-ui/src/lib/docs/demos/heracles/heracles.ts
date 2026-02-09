import { Component } from '@angular/core';
import { IUI } from '../../../ui';

export interface Request {
  requestNo: string;
  description: string;
  department: string;
  budget: number;
  budgetPeriod: Date;
  pic: string;
  status: string;
  amount: number;
  verifiedBy: string;
  createdUser: string;
  createdDate: Date;
  requestDetails: RequestDetail[];
}

export interface RequestDetail {
  id: any;
}

@Component({
  selector: 'ir-heracles',
  imports: [IUI],
  templateUrl: './heracles.html',
  styleUrl: './heracles.scss',
})
export class IRHeracles {
  // dataSource = new IGridDataSource<Request>(this.data, {
  //   // sort: { active: 'no', direction: 'asc' },
  //   // paginator: false,
  // });
}
