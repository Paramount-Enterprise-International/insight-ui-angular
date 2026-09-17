import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter, Router, RouterOutlet } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { IHTitleBreadcrumbService } from '../host/host';
import { ISessionService } from '../session/session.service';
import { IUserMenuStore } from '../store/user-menu.store';
import { ICurrentUserService, IUserMenuService } from '../user';
import { hasMn } from './has-mn-route';

let mounts = 0;

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `report-{{ id }}-{{ tab }}-{{ resolved }}`,
})
class Report {
  private readonly route = inject(ActivatedRoute);
  readonly id = this.route.snapshot.params['id'];
  readonly tab = this.route.snapshot.queryParams['tab'];
  readonly resolved = this.route.snapshot.data['resolved'];
  constructor() {
    mounts++;
  }
}

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: 'open-page',
})
class OpenPage {}

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
  template: 'layout <router-outlet />',
})
class Layout {}

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `document-{{ slug }}`,
})
class DocumentPage {
  readonly route = inject(ActivatedRoute);
  readonly slug = this.route.snapshot.data['slug'];
}

describe('hasMn Angular routes', () => {
  let store: IUserMenuStore;
  let harness: RouterTestingHarness;
  let shell: IHTitleBreadcrumbService;
  const settle = async (): Promise<void> => {
    harness.detectChanges();
    await harness.fixture.whenStable();
    harness.detectChanges();
  };
  const grant = (code: string): void => {
    store.authorizations.set([{ menuId: 'm1', menuCode: code, type: 'item', companies: [] }]);
  };

  beforeEach(async () => {
    mounts = 0;
    TestBed.configureTestingModule({
      providers: [
        { provide: ICurrentUserService, useValue: {} },
        { provide: IUserMenuService, useValue: {} },
        {
          provide: ISessionService,
          useValue: {
            initializing: signal(false),
            isAuth: (): boolean => true,
            getRoles: (): string[] => [],
          },
        },
        provideRouter([
          hasMn('reports', {
            path: 'reports/:id',
            data: { title: 'Report' },
            resolve: { resolved: () => of('resolved-value') },
            loadComponent: async () => Report,
          }),
          hasMn(['read', 'write'], { path: 'any', component: OpenPage }),
          hasMn(
            () => {
              throw new Error('failed');
            },
            { path: 'broken', component: OpenPage },
          ),
          hasMn('layout', {
            path: 'layout/:id',
            component: Layout,
            children: [{ path: 'child', component: Report }],
          }),
          hasMn('reports', {
            path: 'guide',
            data: { title: 'Guide', slug: 'guide' },
            component: DocumentPage,
          }),
          { path: 'open', data: { title: 'Open' }, component: OpenPage },
          { path: '**', data: { title: 'Not Found' }, component: OpenPage },
        ]),
      ],
    });
    store = TestBed.inject(IUserMenuStore);
    shell = TestBed.inject(IHTitleBreadcrumbService);
    store.initialized.set(true);
    harness = await RouterTestingHarness.create();
  });

  it('renders an in-place 403 without constructing the denied page', async () => {
    await harness.navigateByUrl('/reports/42?tab=info');
    await settle();
    expect(harness.routeNativeElement?.textContent).toContain('Unauthorized Access');
    expect(TestBed.inject(Router).url).toBe('/reports/42?tab=info');
    expect(mounts).toBe(0);
    expect(shell.titleOverride()).toBe('Unauthorized Access');
  });

  it('preserves inherited params, query and resolver data and reacts to grant/revoke', async () => {
    await harness.navigateByUrl('/reports/42?tab=info');
    await settle();
    grant('reports');
    await settle();
    expect(harness.routeNativeElement?.textContent).toContain('report-42-info-resolved-value');
    expect(shell.titleOverride()).toBeNull();
    expect(shell.breadcrumbsOverride()).toBeNull();
    store.authorizations.set([]);
    await settle();
    expect(harness.routeNativeElement?.textContent).toContain('Unauthorized Access');
    expect(harness.routeNativeElement?.textContent).not.toContain('report-42');
  });

  it('waits on a cold menu load and denies when the load settles empty', async () => {
    store.initialized.set(false);
    spyOn(store, 'load').and.callFake(() => {
      store.initializing.set(true);
      return of(undefined);
    });
    await harness.navigateByUrl('/reports/42');
    await settle();
    expect(store.load).toHaveBeenCalledTimes(1);
    expect(harness.routeNativeElement?.textContent).toContain('Loading access...');
    expect(harness.routeNativeElement?.textContent).not.toContain('Unauthorized Access');
    store.initialized.set(true);
    store.initializing.set(false);
    await settle();
    expect(harness.routeNativeElement?.textContent).toContain('Unauthorized Access');
    expect(mounts).toBe(0);
  });

  it('supports ANY shorthand and fails closed on throwing predicates', async () => {
    grant('write');
    await harness.navigateByUrl('/any');
    await settle();
    expect(harness.routeNativeElement?.textContent).toContain('open-page');
    spyOn(console, 'error');
    await harness.navigateByUrl('/broken');
    await settle();
    expect(harness.routeNativeElement?.textContent).toContain('Unauthorized Access');
  });

  it('preserves component layouts and nested child routes', async () => {
    grant('layout');
    await harness.navigateByUrl('/layout/42/child?tab=info');
    await settle();
    expect(harness.routeNativeElement?.textContent).toContain('layout');
    expect(harness.routeNativeElement?.textContent).toContain('report-');
  });

  it('clears denial overrides on navigation to an unguarded page', async () => {
    await harness.navigateByUrl('/reports/42');
    await settle();
    await harness.navigateByUrl('/open');
    await settle();
    expect(harness.routeNativeElement?.textContent).toContain('open-page');
    expect(shell.titleOverride()).toBeNull();
    expect(shell.breadcrumbsOverride()).toBeNull();
  });

  it('preserves relative sibling navigation through permission boundaries', async () => {
    grant('reports');
    await harness.navigateByUrl('/guide');
    await settle();
    expect(harness.routeNativeElement?.textContent).toContain('document-guide');
    const route = TestBed.inject(Router).routerState.root.firstChild?.firstChild?.firstChild;
    expect(route).toBeTruthy();
    await TestBed.inject(Router).navigate(['..', 'open'], { relativeTo: route });
    await settle();
    expect(TestBed.inject(Router).url).toBe('/open');
    expect(harness.routeNativeElement?.textContent).toContain('open-page');
  });
});
