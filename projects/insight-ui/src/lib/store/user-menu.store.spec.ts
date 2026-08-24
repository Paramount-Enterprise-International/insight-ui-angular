import { TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';

import { ISessionService } from '../session/session.service';
import {
  ICurrentUserService,
  IInsightCurrentUser,
  IInsightFavoriteMenuItem,
  IInsightMenuNode,
  IUserMenuService,
} from '../user';
import { IUserMenuStore } from './user-menu.store';

const rawUser: IInsightCurrentUser = {
  userId: 'u1',
  username: 'jdoe',
  fullName: 'John Doe',
  employeeCode: 'EMP001',
  email: 'j@x.com',
  photoUrl: null,
  userType: 'internal',
  occupationName: null,
  departmentName: null,
  enabled: true,
};

const app = { id: 'a1', code: 'APP', name: 'App', url: null, version: null };

const nodes: IInsightMenuNode[] = [
  {
    id: 'g1',
    name: 'Group',
    type: 'group',
    menuCode: 'group',
    parentId: null,
    route: null,
    icon: null,
    openIn: 'CURRENT_TAB',
    sequence: 1,
    application: app,
    companies: [],
    isFavorite: false,
    children: [
      {
        id: 'm1',
        name: 'Dashboard',
        type: 'item',
        menuCode: 'dashboard',
        parentId: 'g1',
        route: '/dashboard',
        icon: null,
        openIn: 'CURRENT_TAB',
        sequence: 1,
        application: app,
        companies: [],
        isFavorite: true,
        children: [],
      },
    ],
  },
];

const favorites: IInsightFavoriteMenuItem[] = [
  {
    id: 'm1',
    name: 'Dashboard',
    displayOrder: 1,
    menuCode: 'dashboard',
    route: '/dashboard',
    icon: null,
    openIn: 'CURRENT_TAB',
    application: app,
    companies: [],
  },
];

describe('IUserMenuStore', () => {
  let store: IUserMenuStore;
  let userSpy: jasmine.SpyObj<ICurrentUserService>;
  let menuSpy: jasmine.SpyObj<IUserMenuService>;
  let sessionSpy: jasmine.SpyObj<ISessionService>;

  beforeEach(() => {
    userSpy = jasmine.createSpyObj<ICurrentUserService>('ICurrentUserService', ['getCurrentUser']);
    menuSpy = jasmine.createSpyObj<IUserMenuService>('IUserMenuService', [
      'getEffectiveMenus',
      'getFavorites',
      'addFavorite',
      'removeFavorite',
      'reorderFavorites',
    ]);
    sessionSpy = jasmine.createSpyObj<ISessionService>('ISessionService', ['getRoles', 'hasRole']);

    userSpy.getCurrentUser.and.returnValue(of(rawUser));
    menuSpy.getEffectiveMenus.and.returnValue(of(nodes));
    menuSpy.getFavorites.and.returnValue(of(favorites));
    sessionSpy.getRoles.and.returnValue(['iam-admin']);

    TestBed.configureTestingModule({
      providers: [
        { provide: ICurrentUserService, useValue: userSpy },
        { provide: IUserMenuService, useValue: menuSpy },
        { provide: ISessionService, useValue: sessionSpy },
      ],
    });
    store = TestBed.inject(IUserMenuStore);
  });

  it('load() populates user, menus, favorites and roles from memory signals', () => {
    store.load();

    expect(store.currentUser()).toEqual({ employeeCode: 'EMP001', fullName: 'John Doe', userImagePath: '' });
    expect(store.rawCurrentUser()).toEqual(rawUser);
    expect(store.menus().length).toBe(1);
    expect(store.menus()[0].children?.[0].menuCode).toBe('dashboard');
    expect(store.favorites().length).toBe(1);
    expect(store.favorites()[0].isFavorite).toBeTrue();
    expect(store.roles()).toEqual(['iam-admin']);
    expect(store.initializing()).toBeFalse();
    expect(store.loadError()).toBeNull();
  });

  it('defaultRoute returns the first navigable leaf route', () => {
    store.load();
    expect(store.defaultRoute).toBe('/dashboard');
  });

  it('hasMenu checks menu codes (string and array, ANY match) and is async-aware', () => {
    // empty before load → false (gated UI stays hidden while loading)
    expect(store.hasMenu('dashboard')).toBeFalse();

    store.load();
    expect(store.hasMenu('dashboard')).toBeTrue();
    expect(store.hasMenu('group')).toBeTrue();
    expect(store.hasMenu('nope')).toBeFalse();
    expect(store.hasMenu(['nope', 'dashboard'])).toBeTrue();
  });

  it('hasRole checks the in-memory roles (ANY match)', () => {
    // empty before load → false (gated UI stays hidden while loading)
    expect(store.hasRole('iam-admin')).toBeFalse();

    store.roles.set(['iam-admin']);
    expect(store.hasRole('iam-admin')).toBeTrue();
    expect(store.hasRole(['nope', 'iam-admin'])).toBeTrue();
    expect(store.hasRole('nope')).toBeFalse();
  });

  it('toggleFavorite pins/unpins via the menu service then refreshes favorites', () => {
    menuSpy.addFavorite.and.returnValue(of(undefined));
    menuSpy.removeFavorite.and.returnValue(of(undefined));
    menuSpy.getFavorites.and.returnValue(of(favorites));

    store.toggleFavorite('m1', true).subscribe();
    expect(menuSpy.addFavorite).toHaveBeenCalledWith('m1');
    expect(store.favorites().length).toBe(1);

    store.toggleFavorite('m1', false).subscribe();
    expect(menuSpy.removeFavorite).toHaveBeenCalledWith('m1');
  });

  it('reorderFavorites persists the new order then refreshes favorites', () => {
    menuSpy.reorderFavorites.and.returnValue(of(undefined));
    menuSpy.getFavorites.and.returnValue(of(favorites));

    store.reorderFavorites(['m1', 'm2']).subscribe();
    expect(menuSpy.reorderFavorites).toHaveBeenCalledWith(['m1', 'm2']);
    expect(store.favorites().length).toBe(1);
  });

  it('keeps initializing true while a branch is pending, then clears', () => {
    const userSubject = new Subject<IInsightCurrentUser>();
    userSpy.getCurrentUser.and.returnValue(userSubject);

    store.load();
    expect(store.initializing()).toBeTrue();

    // Resolve the pending user branch; menus/favorites already completed synchronously.
    userSubject.next(rawUser);
    userSubject.complete();
    expect(store.initializing()).toBeFalse();
  });
});
