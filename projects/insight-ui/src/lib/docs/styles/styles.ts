import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IUI } from '@insight/ui';

@Component({
  selector: 'ir-styles',
  imports: [IUI, RouterLink],
  templateUrl: './styles.html',
  styleUrl: './styles.scss',
})
export class IRStyles {}
