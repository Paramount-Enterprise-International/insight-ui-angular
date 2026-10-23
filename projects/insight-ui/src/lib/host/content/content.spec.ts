import { APP_BASE_HREF } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { type ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideRouter, Router, type Routes } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { IUserMenuStore } from '../../store/user-menu';
import { ISessionService } from '../../session/session';
import type { IMenu } from '../host.types';
import { IHTitleBreadcrumbService } from '../shell/title-breadcrumb.service';
import { IHContent } from './content';

@Component({ template: '' })
class Page {}

describe('host and remote breadcrumb composition', () => {
  it('composes host and remote trails reactively while keeping headings independent', async () => {
    const menus = signal<IMenu[]>([]);
    TestBed.configureTestingModule({
      imports: [IHContent],
      providers: [
        provideHttpClient(),
        { provide: APP_BASE_HREF, useValue: '/-/' },
        provideRouter([
          {
            path: 'people',
            data: { remoteMount: true },
            children: [
              {
                path: ':id',
                component: Page,
                data: { title: 'Record heading', breadcrumb: 'Details' },
              },
            ],
          },
        ]),
        { provide: ISessionService, useValue: { initializing: signal(false) } },
        {
          provide: IUserMenuStore,
          useFactory: (): Pick<IUserMenuStore, 'initializing' | 'menus$'> => ({
            initializing: signal(false),
            menus$: toObservable(menus),
          }),
        },
      ],
    });
    const fixture = TestBed.createComponent(IHContent);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl('/people/123');
    menus.set([
      {
        id: 'group',
        name: 'Sales',
        children: [{ id: 'people', name: 'Customers', route: '/people' }],
      },
    ]);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const text = (): string =>
      fixture.nativeElement.querySelector('.ih-content-breadcrumbs').textContent;
    expect(text()).toContain('Sales');
    expect(text()).toContain('Customers');
    expect(text()).toContain('Details');
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Record heading');
    const shell = TestBed.inject(IHTitleBreadcrumbService);
    shell.setRemoteBreadcrumbs([{ label: 'Edit' }]);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(text()).toContain('Edit');
    shell.setBreadcrumbs([{ label: 'Unauthorized Access' }]);
    fixture.detectChanges();
    expect(text()).toContain('Unauthorized Access');
    expect(text()).not.toContain('Customers');
    shell.setBreadcrumbs([]);
    fixture.detectChanges();
    expect(text().trim()).toBe('Home');
    shell.setBreadcrumbs(null);
    fixture.detectChanges();
    expect(text()).toContain('Customers');
  });
  it('prefers configured host titles over menu labels and appends remote labels', async () => {
    TestBed.configureTestingModule({
      imports: [IHContent],
      providers: [
        provideHttpClient(),
        { provide: APP_BASE_HREF, useValue: '/-/' },
        provideRouter([
          {
            path: 'sales/customer',
            data: {
              remoteMount: true,
              hostBreadcrumbs: [
                { label: 'Sales', url: '/sales' },
                { label: 'Customer', url: '/sales/customer' },
              ],
            },
            children: [{ path: '', component: Page, data: { title: 'Remote page' } }],
          },
        ]),
        { provide: ISessionService, useValue: { initializing: signal(false) } },
        {
          provide: IUserMenuStore,
          useFactory: (): Pick<IUserMenuStore, 'initializing' | 'menus$'> => ({
            initializing: signal(false),
            menus$: toObservable(
              signal<IMenu[]>([{ name: 'Backend label', route: '/sales/customer' }]),
            ),
          }),
        },
      ],
    });
    const fixture = TestBed.createComponent(IHContent);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl('/sales/customer');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const text = fixture.nativeElement.querySelector('.ih-content-breadcrumbs').textContent;
    expect(text).toContain('Sales');
    expect(text).toContain('Customer');
    expect(text).toContain('Remote page');
    expect(text).not.toContain('Backend label');
  });
});

describe('page bundle loading', () => {
  function setup(routes: Routes): {
    fixture: ComponentFixture<IHContent>;
    router: Router;
    host: HTMLElement;
  } {
    TestBed.configureTestingModule({
      imports: [IHContent],
      providers: [
        provideHttpClient(),
        { provide: APP_BASE_HREF, useValue: '/-/' },
        provideRouter(routes),
        { provide: ISessionService, useValue: { initializing: signal(false) } },
        {
          provide: IUserMenuStore,
          useFactory: (): Pick<IUserMenuStore, 'initializing' | 'menus$'> => ({
            initializing: signal(false),
            menus$: toObservable(signal<IMenu[]>([])),
          }),
        },
      ],
    });
    const fixture = TestBed.createComponent(IHContent);
    fixture.detectChanges();
    return { fixture, router: TestBed.inject(Router), host: fixture.nativeElement as HTMLElement };
  }

  it('blocks only the page body until the lazy route resolves', fakeAsync(() => {
    let resolve!: (page: typeof Page) => void;
    const pending = new Promise<typeof Page>((done) => {
      resolve = done;
    });
    const { fixture, router, host } = setup([{ path: 'slow', loadComponent: (): Promise<typeof Page> => pending }]);
    void router.navigateByUrl('/slow');
    tick();
    fixture.detectChanges();
    expect(host.querySelector('.ih-content-page-loading[mode="container"]')).not.toBeNull();
    expect(host.querySelector('.ih-content-body')?.hasAttribute('inert')).toBeTrue();
    expect(host.querySelector('.ih-content-header')?.closest('[inert]')).toBeNull();
    resolve(Page);
    tick();
    fixture.detectChanges();
    expect(host.querySelector('.ih-content-page-loading')).toBeNull();
    expect(host.querySelector('.ih-content-body')?.hasAttribute('inert')).toBeFalse();
  }));

  it('clears the spinner after a failed lazy import', fakeAsync(() => {
    let reject!: (reason: Error) => void;
    const pending = new Promise<typeof Page>((_, fail) => {
      reject = fail;
    });
    const { fixture, router, host } = setup([{ path: 'slow', loadComponent: (): Promise<typeof Page> => pending }]);
    void router.navigateByUrl('/slow').catch(() => undefined);
    tick();
    fixture.detectChanges();
    expect(host.querySelector('.ih-content-page-loading')).not.toBeNull();
    reject(new Error('Bundle unavailable'));
    tick();
    fixture.detectChanges();
    expect(host.querySelector('.ih-content-page-loading')).toBeNull();
    expect(host.querySelector('.ih-content-body')?.hasAttribute('inert')).toBeFalse();
  }));

  it('clears a cancelled navigation and ignores its late bundle completion', fakeAsync(() => {
    let resolve!: (page: typeof Page) => void;
    const pending = new Promise<typeof Page>((done) => {
      resolve = done;
    });
    const { fixture, router, host } = setup([
      { path: 'slow', loadComponent: (): Promise<typeof Page> => pending },
      { path: 'open', component: Page },
    ]);
    void router.navigateByUrl('/slow');
    tick();
    fixture.detectChanges();
    expect(host.querySelector('.ih-content-page-loading')).not.toBeNull();
    void router.navigateByUrl('/open');
    tick();
    fixture.detectChanges();
    expect(router.url).toBe('/open');
    expect(host.querySelector('.ih-content-page-loading')).toBeNull();
    resolve(Page);
    tick();
    fixture.detectChanges();
    expect(router.url).toBe('/open');
    expect(host.querySelector('.ih-content-page-loading')).toBeNull();
  }));
});
