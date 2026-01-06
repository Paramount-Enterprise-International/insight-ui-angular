import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter, map, Observable, shareReplay, startWith } from 'rxjs';

export type BreadcrumbItem = {
  label: string;
  url: string;
};

@Component({
  selector: 'ih-content',
  imports: [RouterOutlet, AsyncPipe, RouterLink],
  templateUrl: './content.html',
})
export class IHContent {
  private readonly router = inject(Router);

  private readonly activatedRoute = inject(ActivatedRoute);

  sidebarVisibility = true;

  @Output() onSidebarToggled = new EventEmitter<boolean>();

  /** Stream of breadcrumb items built from the activated route tree */
  readonly breadcrumb$: Observable<BreadcrumbItem[]> = this.router.events.pipe(
    filter((e) => e instanceof NavigationEnd),
    startWith(null), // emit once on init
    map(() => this.buildBreadcrumb(this.activatedRoute.root)),
    shareReplay(1)
  );

  /** Last breadcrumb label = current page title */
  readonly pageTitle$: Observable<string | null> = this.breadcrumb$.pipe(
    map((breadcrumbs) =>
      breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].label : null
    ),
    shareReplay(1)
  );

  private buildBreadcrumb(
    route: ActivatedRoute,
    url = '',
    breadcrumbs: BreadcrumbItem[] = []
  ): BreadcrumbItem[] {
    const routeConfig = route.routeConfig;

    if (routeConfig) {
      const path = routeConfig.path ?? '';

      // Resolve path segments, including route params
      const segments = path
        .split('/')
        .filter(Boolean)
        .map((segment) => {
          if (segment.startsWith(':')) {
            const paramName = segment.substring(1);
            return route.snapshot.params[paramName] ?? segment;
          }
          return segment;
        });

      const nextUrlPart = segments.join('/');

      // Always advance the URL, even if we don't render a breadcrumb for this level
      const nextUrl = nextUrlPart.length > 0 ? `${url}/${nextUrlPart}` : url || '/';

      // 🔑 Use *route config* data, not snapshot (avoid inherited data)
      const data = routeConfig.data as { title?: string } | undefined;
      const label = data?.title;

      if (label) {
        breadcrumbs.push({
          label,
          url: nextUrl,
        });
      }

      url = nextUrl;
    }

    if (route.firstChild) {
      return this.buildBreadcrumb(route.firstChild, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  toggleSidebar(): void {
    this.sidebarVisibility = !this.sidebarVisibility;
    this.onSidebarToggled.emit(this.sidebarVisibility);
  }
}
