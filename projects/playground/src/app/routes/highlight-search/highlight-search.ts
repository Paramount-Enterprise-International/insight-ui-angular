import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IUI } from '@insight/ui';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IUI],
  templateUrl: './highlight-search.html',
})
export class HighlightSearchDemo {
  value = 'Literal <strong>HTML</strong>, [regex], and Search SEARCH.';
  search = 'search';
  changeValue(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
  }
  changeSearch(event: Event): void {
    this.search = (event.target as HTMLInputElement).value;
  }
}
