import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IUI } from '@insight-ui';

type User = { id: number; name: string };
@Component({
  selector: 'app-select',
  imports: [IUI, FormsModule],
  templateUrl: './select.html',
  styleUrl: './select.css',
})
export class Select {
  users: User[] = [
    { id: 1, name: 'Alya' },
    { id: 2, name: 'Bima' },
  ];
  selectedUsers: User[] = [];

  get selectedUserList(): string {
    return this.selectedUsers.map((x) => x.name).join(', ');
  }
}
