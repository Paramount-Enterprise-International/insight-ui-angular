import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IUI } from '../ui';

@Component({
  selector: 'ir-docs',
  imports: [IUI, RouterLink],
  templateUrl: './docs.html',
  styleUrl: './docs.scss',
})
export class IRDocs {}
