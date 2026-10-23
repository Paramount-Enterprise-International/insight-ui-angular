import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IIcon } from '../icon';
export type IEmptyStateKind = 'empty' | 'search' | 'filter' | 'search-filter' | 'prerequisite';
export type IEmptyStateDensity = 'default' | 'compact';
export type IEmptyStateConfig = {
  kind?: IEmptyStateKind;
  title?: string;
  description?: string;
  icon?: string;
  density?: IEmptyStateDensity;
};
export const I_EMPTY_STATE_PRESETS: Record<
  IEmptyStateKind,
  { title: string; description: string; icon: string }
> = {
  empty: { title: 'No data available.', description: '', icon: 'fa-solid fa-folder-open' },
  search: {
    title: 'No data matches your search.',
    description: 'Try a different keyword.',
    icon: 'fa-solid fa-magnifying-glass',
  },
  filter: {
    title: 'No data matches the selected filters.',
    description: 'Adjust or clear the filters.',
    icon: 'fa-solid fa-filter',
  },
  'search-filter': {
    title: 'No data matches your search and selected filters.',
    description: 'Try a different keyword or clear the filters.',
    icon: 'fa-solid fa-filter',
  },
  prerequisite: {
    title: 'Additional information is required.',
    description: '',
    icon: 'fa-solid fa-circle-info',
  },
};
@Component({
  selector: 'i-empty-state',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IIcon],
  host: {
    class: 'i-empty-state',
    role: 'status',
    'aria-live': 'polite',
    '[attr.data-empty-state-kind]': 'kind',
    '[attr.density]': 'density',
  },
  template: `<i-icon aria-hidden="true" size="lg" [icon]="resolved.icon" />
    <p class="i-empty-state__title">{{ resolved.title }}</p>
    @if (resolved.description) {
      <p class="i-empty-state__description">{{ resolved.description }}</p>
    }
    <ng-content />`,
})
export class IEmptyState {
  @Input() kind: IEmptyStateKind = 'empty';
  @Input() title = '';
  @Input() description = '';
  @Input() icon = '';
  @Input() density: IEmptyStateDensity = 'default';
  get resolved(): { title: string; description: string; icon: string } {
    const preset = I_EMPTY_STATE_PRESETS[this.kind];
    return {
      title: this.title || preset.title,
      description: this.description || preset.description,
      icon: this.icon || preset.icon,
    };
  }
}
