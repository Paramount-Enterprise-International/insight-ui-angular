import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IHHasMnDirective } from './has-mn';
import { IHNotHasMnDirective } from './not-has-mn';
import { IUserMenuStore } from '../store/user-menu.store';
import { ISessionService } from '../session/session.service';
import { ICurrentUserService, IUserMenuService } from '../user';

@Component({
  standalone: true,
  imports: [IHHasMnDirective, IHNotHasMnDirective],
  template: `
    <div *ihHasMn="'admin'"><span class="menu-admin">MENU-ADMIN</span></div>
    <div *ihHasMn="'user'"><span class="menu-user">MENU-USER</span></div>
    <div *ihNotHasMn="'admin'"><span class="not-admin">NOT-ADMIN</span></div>
    <div *ihHasMn="{ source: 'role', value: 'iam-admin' }"><span class="role-admin">ROLE-ADMIN</span></div>
    <div *ihNotHasMn="{ source: 'role', value: 'iam-super' }"><span class="not-super">NOT-SUPER</span></div>
  `,
})
class HostComponent {}

describe('IHHasMnDirective / IHNotHasMnDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let store: IUserMenuStore;

  const query = (selector: string): Element | null => fixture.nativeElement.querySelector(selector);
  const settle = async (): Promise<void> => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [
        { provide: ICurrentUserService, useValue: {} },
        { provide: IUserMenuService, useValue: {} },
        { provide: ISessionService, useValue: { getRoles: (): string[] => [], hasRole: (): boolean => false } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    store = TestBed.inject(IUserMenuStore);
    fixture.detectChanges();
  }));

  it('menu mode: renders only when the menu code is present', async () => {
    store.menus.set([{ id: 'm1', name: 'Admin', type: 'item', menuCode: 'admin', route: '/admin' }]);
    await settle();

    expect(query('.menu-admin')).toBeTruthy();
    expect(query('.menu-user')).toBeFalsy();
    expect(query('.not-admin')).toBeFalsy();
  });

  it('menu mode: not-has renders when the menu code is absent', async () => {
    store.menus.set([{ id: 'm1', name: 'User', type: 'item', menuCode: 'user', route: '/user' }]);
    await settle();

    expect(query('.menu-admin')).toBeFalsy();
    expect(query('.menu-user')).toBeTruthy();
    expect(query('.not-admin')).toBeTruthy();
  });

  it('role mode (object form) renders when the role is claimed', async () => {
    store.roles.set(['iam-admin']);
    await settle();

    expect(query('.role-admin')).toBeTruthy();
    expect(query('.not-super')).toBeTruthy();
  });

  it('role mode does not render when the role is missing', async () => {
    store.roles.set(['something-else']);
    await settle();

    expect(query('.role-admin')).toBeFalsy();
    expect(query('.not-super')).toBeTruthy();
  });

  it('async: hidden while the store is empty, then appears after data arrives', async () => {
    await settle();
    expect(query('.menu-admin')).toBeFalsy();

    store.menus.set([{ id: 'm1', name: 'Admin', type: 'item', menuCode: 'admin', route: '/admin' }]);
    await settle();
    expect(query('.menu-admin')).toBeTruthy();
  });

  it('reacts to a permission change that revokes access (view is removed)', async () => {
    store.menus.set([{ id: 'm1', name: 'Admin', type: 'item', menuCode: 'admin', route: '/admin' }]);
    await settle();
    expect(query('.menu-admin')).toBeTruthy();

    store.menus.set([]);
    await settle();
    expect(query('.menu-admin')).toBeFalsy();
  });
});
