import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightSearch',
  standalone: true,
})
export class IHighlightSearchPipe implements PipeTransform {
  transform(value: string, search: string): string {
    if (!value || !search) return value;

    // Escape regex special chars: . * + ? ^ $ { } ( ) | [ ] \
    const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const regex = new RegExp(escaped, 'gi');

    return value.replace(regex, (match) => {
      return `<span class="highlight-search">${match}</span>`;
    });
  }
}
