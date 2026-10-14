import { APP_BASE_HREF } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
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
  });
});
