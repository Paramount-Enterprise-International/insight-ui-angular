import { Component, inject } from '@angular/core';
import { IUI } from '../../../ui';
import { IAlertService, IConfirmService, IDialogService } from '../../../dialog';

@Component({
  selector: 'ir-card',
  imports: [IUI],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class IRCard {
  dialog: IDialogService = inject(IDialogService);
  alert: IAlertService = inject(IAlertService);
  confirm: IConfirmService = inject(IConfirmService);
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';

  onClick(): void {
    console.log('hell world');
    this.alert
      .information('Information Alert', this.description)
      .subscribe((result) => console.log(result));
  }
}
