import { Component } from '@angular/core';
import { IUI } from '../../../ui';

type TagItem = {
  id: number;
  name: string;
  category?: string;
};
type PillVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';
@Component({
  selector: 'ir-pill',
  imports: [IUI],
  templateUrl: './pill.html',
  styleUrl: './pill.scss',
})
export class Pill {
  showPill = true;

  items: TagItem[] = [
    { id: 1, name: 'TypeScript', category: 'language' },
    { id: 2, name: 'JavaScript', category: 'language' },
    { id: 3, name: 'Angular', category: 'styling' },
    { id: 4, name: 'React', category: 'framework' },
    { id: 5, name: 'Vue', category: 'framework' },
    { id: 6, name: 'HTML', category: 'markup' },
    { id: 7, name: 'CSS', category: 'styling' },
  ];

  categories = ['language', 'framework', 'markup', 'styling'];

  getItemsByCategory(category: string): TagItem[] {
    return this.items.filter((item) => item.category === category);
  }

  getVariantByCategory(category: string): PillVariant {
    const variantMap: Record<string, PillVariant> = {
      language: 'primary',
      framework: 'success',
      markup: 'warning',
      styling: 'danger',
    };
    return variantMap[category] || 'default';
  }

  removeTag(id: number): void {
    this.items = this.items.filter((item) => item.id !== id);
  }
}
