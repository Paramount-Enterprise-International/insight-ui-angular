import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IAlertService, IConfirmService, IUI } from '@insight-ui';

@Component({
  selector: 'app-dialog',
  imports: [IUI, RouterLink],
  templateUrl: './dialog.html',
  styleUrl: './dialog.css',
  host: {
    class: 'flex flex-fill flex-col p-md',
  },
})
export class Dialog {
  alert: IAlertService = inject(IAlertService);
  confirm: IConfirmService = inject(IConfirmService);
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';

  openDialog(): void {
    console.log('asdf');
    this.alert
      .information('Information Alert', this.description)
      .subscribe((result) => console.log(result));
  }

  showInformationConfirm(): void {
    this.confirm
      .information('Information Confirm', this.description)
      .subscribe((result) => console.log(result));
  }
}
