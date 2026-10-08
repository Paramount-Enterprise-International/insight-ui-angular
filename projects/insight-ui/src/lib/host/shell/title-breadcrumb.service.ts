import { Injectable, signal } from '@angular/core';
import { type IBreadcrumbItem } from '../host.types';

@Injectable({ providedIn: 'root' })
export class IHTitleBreadcrumbService {
  /**
   * null = use normal (route-based) title/breadcrumbs
   * non-null = override (e.g. React remote controls shell display)
   */
  readonly titleOverride = signal<string | null>(null);
  readonly breadcrumbsOverride = signal<IBreadcrumbItem[] | null>(null);

  setTitle(title: string | null): void {
    this.titleOverride.set(title ?? null);
  }

  setBreadcrumbs(items: IBreadcrumbItem[] | null): void {
    this.breadcrumbsOverride.set(items ?? null);
  }

  clear(): void {
    this.titleOverride.set(null);
    this.breadcrumbsOverride.set(null);
  }
}
