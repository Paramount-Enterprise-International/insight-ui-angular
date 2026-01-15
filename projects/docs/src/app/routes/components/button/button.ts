import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IUI } from '@insight/ui';

@Component({
  selector: 'ir-button',
  imports: [IUI, RouterLink],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class IRButton {}
