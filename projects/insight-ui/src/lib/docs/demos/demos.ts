import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IUI } from '../../ui';

@Component({
  selector: 'ir-demos',
  imports: [IUI, RouterLink],
  templateUrl: './demos.html',
  styleUrl: './demos.scss',
})
export class IRDemos {}
