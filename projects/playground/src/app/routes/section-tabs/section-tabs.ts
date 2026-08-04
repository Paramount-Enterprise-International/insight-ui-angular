import { Component } from '@angular/core';
import { IUI } from '@insight-ui';

@Component({
  selector: 'app-section-tabs',
  imports: [IUI],
  templateUrl: './section-tabs.html',
  styleUrl: './section-tabs.css',
})
export class SectionTabs {
  manyTabs = Array.from({ length: 12 }, (_, i) => `Application ${i + 1}`);
  twoWaySelectedIndex = 0;
  legacyOutputIndex: number | null = null;

  onLegacyChange(index: number): void {
    this.legacyOutputIndex = index;
  }
}
