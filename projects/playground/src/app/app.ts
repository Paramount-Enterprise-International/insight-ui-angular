import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IUI } from '@insight-ui';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, IUI],
  templateUrl: './app.html',
  styleUrl: './app.css',
  host: {
    class: 'scroll scroll-y',
  },
})
export class App {
  protected readonly title = signal('playground');
}
