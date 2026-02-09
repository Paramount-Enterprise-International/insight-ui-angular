import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ISectionModule } from '../../section';
import { ICard, ICardBody } from '../../card';

@Component({
  selector: 'ir-components',
  imports: [ISectionModule, ICard, ICardBody, RouterLink],
  templateUrl: './components.html',
  styleUrl: './components.scss',
})
export class IRComponents {}
