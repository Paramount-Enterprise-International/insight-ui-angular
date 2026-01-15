import { Component, inject } from '@angular/core';
import { IAlertService, IConfirmService, IDialogService, IUI } from '@insight/ui';

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

  onCardClick(): void {
    this.alert
      .information('Information Alert', this.description)
      .subscribe((result) => console.log(result));
  }
}
