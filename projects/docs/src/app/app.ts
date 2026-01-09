import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  host: {
    class: 'flex flex-col w-full h-full',
  },
})
export class App {
  protected readonly title = signal('docs');
}
