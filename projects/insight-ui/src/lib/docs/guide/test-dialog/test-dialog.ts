import { Component } from '@angular/core';
import { IUI } from '../../../ui';

@Component({
  selector: 'ir-test-dialog',
  imports: [IUI],
  templateUrl: './test-dialog.html',
  styleUrl: './test-dialog.scss',
})
export class TestDialog {
  onSave(): void {
    console.log('onSave Clicked');
  }

  onCustomClick1(): void {
    console.log('onCustomClick1 Clicked');
  }

  onCustomClick2(): void {
    console.log('onCustomClick2 Clicked');
  }
}
