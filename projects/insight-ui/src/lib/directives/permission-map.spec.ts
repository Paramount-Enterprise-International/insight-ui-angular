import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { hasMn } from '../guards/has-mn-route';
import { ISessionService } from '../session/session';
import { IUserMenuStore } from '../store/user-menu';
import { type IAuthorizationSource, ICurrentUserService, IUserMenuService } from '../user';
import { evaluatePermission, IHasMnDirective } from './has-mn';
import { INotHasMnDirective } from './not-has-mn';
import {
  IPermissionMapStore,
  provideMenuPermissionMapping,
  validatePermissionMap,
} from './permission-map';

const source: IAuthorizationSource = {
  menuCodes: ['approved', 'action'],
  roles: [],
  companyCodes: [],
  companies: [],
  menuCompanies: {},
};

@Component({
  standalone: true,
  imports: [IHasMnDirective, INotHasMnDirective],
  template: `<span *iHasMn="'action'" class="allowed">allowed</span>
    <span *iNotHasMn="'action'" class="denied">denied</span>
    <span *iHasMn="'approved'" class="direct">direct</span>`,
})
class PermissionPage {}

describe('hybrid permission mapping', () => {
  it('uses mapped ANY codes, direct fallback and empty mappings without recursive resolution', () => {
    const mapping = {
      action: ['missing', 'approved'],
      blocked: [],
      approved: 'missing',
      chain: 'action',
    };
    expect(evaluatePermission('action', source, mapping)).toBeTrue();
    expect(evaluatePermission('approved', source)).toBeTrue();
    expect(evaluatePermission('approved', source, mapping)).toBeFalse();
    expect(evaluatePermission('blocked', source, mapping)).toBeFalse();
    expect(evaluatePermission('action', source, { action: [] })).toBeFalse();
    expect(evaluatePermission(['blocked', 'action'], source, mapping)).toBeTrue();
    expect(evaluatePermission('chain', source, mapping)).toBeTrue();
    expect(evaluatePermission((s) => s.menuCodes.includes('approved'), source, mapping)).toBeTrue();
    expect(evaluatePermission('toString', source, mapping)).toBeFalse();
  });

  it('validates JSON, preserves explicit empty arrays and snapshots mutable input', () => {
    const input = { action: ['approved'], disabled: [] };
    const mapping = validatePermissionMap(input);
    input.action.push('later');
    expect(mapping['action']).toEqual(['approved']);
    expect(mapping['disabled']).toEqual([]);
    for (const invalid of [null, [], 'text', { action: null }, { action: [''] }, { action: [1] }]) {
      expect(() => validatePermissionMap(invalid)).toThrow();
    }
  });
});

describe('scoped permission providers', () => {
  const initializeStore = (): void => {
    const store = TestBed.inject(IUserMenuStore);
    store.initialized.set(true);
    store.authorizations.set([
      { menuId: '1', menuCode: 'approved', type: 'function', companies: [] },
    ]);
  };
  beforeEach(() => {
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
      ],
    });
  });

  it('isolates sibling remote routes and shares the mapping between route gates and templates', async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          {
            path: 'a',
            providers: [provideMenuPermissionMapping({ action: 'approved' })],
            children: [hasMn('action', { path: '', component: PermissionPage })],
          },
          {
            path: 'b',
            providers: [provideMenuPermissionMapping({ action: 'missing' })],
            children: [hasMn('action', { path: '', component: PermissionPage })],
          },
          { path: 'direct', component: PermissionPage },
        ]),
      ],
    });
    initializeStore();
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/a');
    await harness.fixture.whenStable();
    harness.detectChanges();
    expect(harness.routeNativeElement?.querySelector('.allowed')).not.toBeNull();
    expect(harness.routeNativeElement?.querySelector('.direct')).not.toBeNull();
    await harness.navigateByUrl('/b');
    await harness.fixture.whenStable();
    harness.detectChanges();
    expect(harness.routeNativeElement?.textContent).toContain('Unauthorized Access');
    expect(harness.routeNativeElement?.querySelector('.allowed')).toBeNull();
    await harness.navigateByUrl('/a');
    await harness.fixture.whenStable();
    harness.detectChanges();
    expect(harness.routeNativeElement?.querySelector('.allowed')).not.toBeNull();
  });

  it('hides both directive branches while loading, then reacts to mapping and authorization', async () => {
    let resolve!: (value: { action: string }) => void;
    const pending = new Promise<{ action: string }>((done) => {
      resolve = done;
    });
    TestBed.configureTestingModule({ providers: [provideMenuPermissionMapping(() => pending)] });
    initializeStore();
    const fixture = TestBed.createComponent(PermissionPage);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('span')).toBeNull();
    resolve({ action: 'approved' });
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.allowed')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.denied')).toBeNull();
    TestBed.inject(IUserMenuStore).authorizations.set([]);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.allowed')).toBeNull();
    expect(fixture.nativeElement.querySelector('.denied')).not.toBeNull();
  });

  it('blocks both directive branches when loaded JSON has an invalid mapping shape', async () => {
    spyOn(console, 'error');
    TestBed.configureTestingModule({
      providers: [provideMenuPermissionMapping(async () => JSON.parse('{"action":42}'))],
    });
    initializeStore();
    const fixture = TestBed.createComponent(PermissionPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(TestBed.inject(IPermissionMapStore).state().status).toBe('error');
    expect(fixture.nativeElement.querySelector('span')).toBeNull();
  });

  it('keeps protected routes loading until the map settles and denies on failure', async () => {
    spyOn(console, 'error');
    let reject!: (reason: Error) => void;
    const pending = new Promise<never>((_, fail) => {
      reject = fail;
    });
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          {
            path: 'mapped',
            providers: [provideMenuPermissionMapping(() => pending)],
            children: [hasMn('approved', { path: '', component: PermissionPage })],
          },
        ]),
      ],
    });
    initializeStore();
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/mapped');
    harness.detectChanges();
    expect(harness.routeNativeElement?.querySelector('i-loading')).not.toBeNull();
    expect(harness.routeNativeElement?.querySelector('.direct')).toBeNull();
    reject(new Error('network failure'));
    await harness.fixture.whenStable();
    harness.detectChanges();
    expect(harness.routeNativeElement?.querySelector('i-loading')).toBeNull();
    expect(harness.routeNativeElement?.textContent).toContain('Unauthorized Access');
    expect(harness.routeNativeElement?.querySelector('.direct')).toBeNull();
  });

  it('fails closed for both directives when the configured loader fails', async () => {
    spyOn(console, 'error');
    TestBed.configureTestingModule({
      providers: [
        provideMenuPermissionMapping(async () => {
          throw new Error('HTTP 404');
        }),
      ],
    });
    initializeStore();
    const fixture = TestBed.createComponent(PermissionPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(TestBed.inject(IPermissionMapStore).state().status).toBe('error');
    expect(fixture.nativeElement.querySelector('span')).toBeNull();
  });
});
