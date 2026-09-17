import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ISessionService } from '../session/session.service';
import { IUserMenuStore } from '../store/user-menu.store';
import { ICurrentUserService, IUserMenuService } from '../user';
import { IHasMnDirective } from './has-mn';
import { INotHasMnDirective } from './not-has-mn';

@Component({
  standalone: true,
  imports: [IHasMnDirective, INotHasMnDirective],
  template: `
    <div *iHasMn="'admin'"><span class="menu-admin">MENU-ADMIN</span></div>
    <div *iHasMn="'user'"><span class="menu-user">MENU-USER</span></div>
    <div *iNotHasMn="'admin'"><span class="not-admin">NOT-ADMIN</span></div>
    <div *iHasMn="hasAdminRole"><span class="role-admin">ROLE-ADMIN</span></div>
    <div *iNotHasMn="hasSuperRole"><span class="not-super">NOT-SUPER</span></div>
    <div *iHasMn="canExport"><span class="perm-export">PERM-EXPORT</span></div>
    <div *iNotHasMn="canDelete"><span class="not-delete">NOT-DELETE</span></div>
    <button
      *iHasMn="'atlas.sales-administration.menu.451.hasmn-button-example'"
      class="function-example"
    >
      Example
    </button>
  `,
})
class HostComponent {
  readonly hasAdminRole = (source: { roles: readonly string[] }): boolean =>
    source.roles.includes('iam-admin');
  readonly hasSuperRole = (source: { roles: readonly string[] }): boolean =>
    source.roles.includes('iam-super');
  readonly canExport = (source: { menuCodes: readonly string[] }): boolean =>
    source.menuCodes.includes('report.export');
  readonly canDelete = (source: { menuCodes: readonly string[] }): boolean =>
    source.menuCodes.includes('report.delete');
}

describe('IHasMnDirective / INotHasMnDirective', () => {
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
        {
          provide: ISessionService,
          useValue: { getRoles: (): string[] => [], hasRole: (): boolean => false },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    store = TestBed.inject(IUserMenuStore);
    store.initialized.set(true);
  }));

  it('menu mode: renders only when the menu code is present', async () => {
    store.authorizations.set([{ menuId: 'm1', menuCode: 'admin', type: 'item', companies: [] }]);
    await settle();

    expect(query('.menu-admin')).toBeTruthy();
    expect(query('.menu-user')).toBeFalsy();
    expect(query('.not-admin')).toBeFalsy();
  });

  it('renders a function shorthand absent from navigation and rejects navigation-only codes', async () => {
    store.menus.set([
      { id: 'admin', name: 'Admin', type: 'item', menuCode: 'admin', route: '/admin' },
    ]);
    store.authorizations.set([
      {
        menuId: 'example',
        menuCode: 'atlas.sales-administration.menu.451.hasmn-button-example',
        type: 'function',
        companies: [],
      },
    ]);
    await settle();

    expect(query('.function-example')).toBeTruthy();
    expect(query('.menu-admin')).toBeFalsy();
    expect(store.hasNavigableMenu('admin')).toBeTrue();
  });

  it('menu mode: not-has renders when the menu code is absent', async () => {
    store.authorizations.set([{ menuId: 'm1', menuCode: 'user', type: 'item', companies: [] }]);
    await settle();

    expect(query('.menu-admin')).toBeFalsy();
    expect(query('.menu-user')).toBeTruthy();
    expect(query('.not-admin')).toBeTruthy();
  });

  it('predicate mode renders when the role is claimed', async () => {
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

  it('permission mode renders when the feature permission is granted', async () => {
    store.authorizations.set([
      { menuCode: 'report.export', menuId: 'export', type: 'function', companies: [] },
    ]);
    await settle();

    expect(query('.perm-export')).toBeTruthy();
    expect(query('.not-delete')).toBeTruthy();
  });

  it('permission mode does not render when the permission is missing', async () => {
    store.authorizations.set([]);
    await settle();

    expect(query('.perm-export')).toBeFalsy();
    expect(query('.not-delete')).toBeTruthy();
  });

  it('permission mode reacts when permissions are hydrated after the initial render', async () => {
    // Store still cold-starting → the gate stays closed in BOTH directions.
    store.initializing.set(true);
    await settle();
    expect(query('.perm-export')).toBeFalsy();
    expect(query('.not-delete')).toBeFalsy();

    // load() settled and hydrated the permission list from the authorizations endpoint.
    store.authorizations.set([
      { menuCode: 'report.export', menuId: 'export', type: 'function', companies: [] },
    ]);
    store.initializing.set(false);
    await settle();

    expect(query('.perm-export')).toBeTruthy();
    expect(query('.not-delete')).toBeTruthy();
  });

  it('initializing gate hides BOTH has and not-has views until the store settles', async () => {
    store.authorizations.set([{ menuId: 'm1', menuCode: 'admin', type: 'item', companies: [] }]);
    store.initializing.set(true);
    await settle();

    expect(query('.menu-admin')).toBeFalsy();
    expect(query('.not-admin')).toBeFalsy();

    store.initializing.set(false);
    await settle();

    expect(query('.menu-admin')).toBeTruthy();
    expect(query('.not-admin')).toBeFalsy();
  });

  it('hides BOTH has and not-has views before the first load starts', async () => {
    store.initialized.set(false);
    await settle();

    expect(query('.menu-admin')).toBeFalsy();
    expect(query('.not-admin')).toBeFalsy();
    expect(query('.not-delete')).toBeFalsy();
  });

  it('async: hidden while the store is empty, then appears after data arrives', async () => {
    await settle();
    expect(query('.menu-admin')).toBeFalsy();

    store.authorizations.set([{ menuId: 'm1', menuCode: 'admin', type: 'item', companies: [] }]);
    await settle();
    expect(query('.menu-admin')).toBeTruthy();
  });

  it('reacts to a permission change that revokes access (view is removed)', async () => {
    store.authorizations.set([{ menuId: 'm1', menuCode: 'admin', type: 'item', companies: [] }]);
    await settle();
    expect(query('.menu-admin')).toBeTruthy();

    store.authorizations.set([]);
    await settle();
    expect(query('.menu-admin')).toBeFalsy();
  });
});
