import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IUI } from '@insight-ui';

@Component({
  selector: 'app-root',
  imports: [IUI, RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
  host: {
    class: 'flex flex-row w-full h-full',
  },
})
export class App {
  protected readonly title = signal('docs');
  pageTitle = 'Insight';
  sidebarVisibility = true;

  toggleSidebar(): void {
    this.sidebarVisibility = !this.sidebarVisibility;
  }
}
