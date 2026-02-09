import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ICard, ICardBody, ISectionModule } from '@insight/ui';

@Component({
  selector: 'ir-components',
  imports: [ISectionModule, ICard, ICardBody, RouterLink],
  templateUrl: './components.html',
  styleUrl: './components.scss',
})
export class IRComponents {}
