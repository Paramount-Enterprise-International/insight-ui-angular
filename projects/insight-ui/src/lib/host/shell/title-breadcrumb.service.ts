import { Injectable, signal } from '@angular/core';
import { type IBreadcrumbItem } from '../host.types';

@Injectable({ providedIn: 'root' })
export class IHTitleBreadcrumbService {
  /**
   * null = use normal (route-based) title/breadcrumbs
   * non-null = complete override (e.g. access error). React uses remote contributions.
   */
  readonly titleOverride = signal<string | null>(null);
  readonly breadcrumbsOverride = signal<IBreadcrumbItem[] | null>(null);

  /** React contributions are composed after host ancestry, never full overrides. */
  readonly remoteTitle = signal<string | null>(null);

  setRemoteTitle(title: string | null): void {
    this.remoteTitle.set(title);
  }

  readonly remoteBreadcrumbs = signal<IBreadcrumbItem[]>([]);

  setRemoteBreadcrumbs(items: IBreadcrumbItem[] | null): void {
    this.remoteBreadcrumbs.set(items ?? []);
  }

  clearRemote(): void {
    this.remoteTitle.set(null);
    this.remoteBreadcrumbs.set([]);
  }

  setTitle(title: string | null): void {
    this.titleOverride.set(title ?? null);
  }

  setBreadcrumbs(items: IBreadcrumbItem[] | null): void {
    this.breadcrumbsOverride.set(items ?? null);
  }

  clear(): void {
    this.titleOverride.set(null);
    this.breadcrumbsOverride.set(null);
    this.remoteBreadcrumbs.set([]);
    this.remoteTitle.set(null);
  }
}
