import { TestBed } from '@angular/core/testing';
import { of, Subject, throwError } from 'rxjs';

import { ISessionService, type ISessionUser } from '../session/session.service';
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
    sessionSpy = jasmine.createSpyObj<ISessionService>('ISessionService', ['getRoles', 'hasRole', 'getUser']);

    userSpy.getCurrentUser.and.returnValue(of(rawUser));
    menuSpy.getEffectiveMenus.and.returnValue(of(nodes));
    menuSpy.getFavorites.and.returnValue(of(favorites));
    sessionSpy.getRoles.and.returnValue(['iam-admin']);
    sessionSpy.getUser.and.returnValue({ sub: 'sub-a' } as ISessionUser);

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

    expect(store.currentUser()).toEqual({
      employeeCode: 'EMP001',
      fullName: 'John Doe',
      userImagePath: '',
    });
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

  it('defaultRoute prefers the first favorite route, then falls back to the first menu route', () => {
    // Favorites present → first favorite route wins.
    store.favorites.set([
      {
        id: 'f1',
        name: 'Report',
        type: 'item',
        menuCode: 'report',
        route: '/report',
        isFavorite: true,
      },
    ]);
    store.menus.set([
      { id: 'm1', name: 'Dashboard', type: 'item', menuCode: 'dashboard', route: '/dashboard' },
    ]);
    expect(store.defaultRoute).toBe('/report');

    // Favorites empty → first navigable menu route.
    store.favorites.set([]);
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

  it('toggleFavorite flips the menu star, then refetches favorites after the write', () => {
    store.menus.set([
      {
        id: 'm1',
        name: 'Dashboard',
        type: 'item',
        menuCode: 'dashboard',
        route: '/dashboard',
        isFavorite: false,
      },
    ]);
    store.favorites.set([]);
    menuSpy.addFavorite.and.returnValue(of(undefined));
    menuSpy.removeFavorite.and.returnValue(of(undefined));
    menuSpy.getFavorites.and.returnValue(of(favorites));

    store.toggleFavorite('m1', true).subscribe();
    expect(menuSpy.addFavorite).toHaveBeenCalledWith('m1');
    // The menu star flips immediately (optimistic).
    expect(store.menus()[0].isFavorite).toBeTrue();
    // Favorites are re-fetched after the write (server = source of truth).
    expect(menuSpy.getFavorites).toHaveBeenCalled();
    expect(store.favorites().length).toBe(1);

    store.toggleFavorite('m1', false).subscribe();
    expect(menuSpy.removeFavorite).toHaveBeenCalledWith('m1');
    expect(store.menus()[0].isFavorite).toBeFalse();
  });

  it('reorderFavorites reorders locally and does not refetch after the write', () => {
    store.favorites.set([
      {
        id: 'm1',
        name: 'Dashboard',
        type: 'item',
        menuCode: 'dashboard',
        route: '/dashboard',
        isFavorite: true,
      },
      {
        id: 'm2',
        name: 'Reports',
        type: 'item',
        menuCode: 'reports',
        route: '/reports',
        isFavorite: true,
      },
    ]);
    menuSpy.reorderFavorites.and.returnValue(of(undefined));

    store.reorderFavorites(['m2', 'm1']).subscribe();
    expect(menuSpy.reorderFavorites).toHaveBeenCalledWith(['m2', 'm1']);
    expect(menuSpy.getFavorites).not.toHaveBeenCalled();
    expect(store.favorites().map((f) => f.id)).toEqual(['m2', 'm1']);
  });

  it('loadMenus passes the applicationId filter and sets the menus signal', () => {
    menuSpy.getEffectiveMenus.and.returnValue(of(nodes));

    store.loadMenus('app-1').subscribe((menus) => {
      expect(menuSpy.getEffectiveMenus).toHaveBeenCalledWith('app-1');
      expect(menus.length).toBe(1);
      expect(store.menus().length).toBe(1);
    });
  });

  it('loadFavorites passes the applicationId filter and sets the favorites signal', () => {
    menuSpy.getFavorites.and.returnValue(of(favorites));

    store.loadFavorites('app-1').subscribe((items) => {
      expect(menuSpy.getFavorites).toHaveBeenCalledWith('app-1');
      expect(items.length).toBe(1);
      expect(store.favorites().length).toBe(1);
    });
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

  it('records the normalized menus error (errorCode + revision) and real message when /me/menus fails', () => {
    menuSpy.getEffectiveMenus.and.returnValue(
      throwError(() => ({
        status: 404,
        errorCode: 'USER_APPLICATION_MAPPING_NOT_FOUND',
        message: 'The requested user application assignment was not found.',
        revision: 1,
      })),
    );

    store.load();

    expect(store.initializing()).toBeFalse();
    expect(store.loadErrors().menus?.errorCode).toBe('USER_APPLICATION_MAPPING_NOT_FOUND');
    expect(store.loadErrors().menus?.status).toBe(404);
    expect(store.loadErrors().menus?.revision).toBe(1);
    expect(store.loadError()).toBe(
      'menus: The requested user application assignment was not found.',
    );
    // Non-failed branches stay clean.
    expect(store.loadErrors().user).toBeNull();
    expect(store.loadErrors().favorites).toBeNull();
  });

  it('records per-branch errors for user and favorites independently of menus', () => {
    userSpy.getCurrentUser.and.returnValue(
      throwError(() => ({ status: 500, message: 'user exploded' })),
    );
    menuSpy.getFavorites.and.returnValue(
      throwError(() => ({ status: 500, message: 'favorites exploded' })),
    );

    store.load();

    expect(store.loadErrors().user?.status).toBe(500);
    expect(store.loadErrors().favorites?.message).toBe('favorites exploded');
    // Menus branch succeeded → no error.
    expect(store.loadErrors().menus).toBeNull();
  });

  it('clears loadErrors on a successful load', () => {
    // Force an error first, then a clean reload.
    menuSpy.getEffectiveMenus.and.returnValue(
      throwError(() => ({ status: 404, errorCode: 'USER_APPLICATION_MAPPING_NOT_FOUND' })),
    );
    store.load();
    expect(store.loadErrors().menus).not.toBeNull();

    menuSpy.getEffectiveMenus.and.returnValue(of(nodes));
    store.load();
    expect(store.loadErrors().menus).toBeNull();
    expect(store.loadError()).toBeNull();
  });

  it('drops the previous user\'s menus when load() runs for a different user and menus fail', () => {
    // User A loads menus fine.
    store.load();
    expect(store.menus().length).toBe(1);

    // Switch to user B (different `sub`): menus endpoint errors (e.g. no
    // application mapping) → stale user A menus must NOT remain visible.
    sessionSpy.getUser.and.returnValue({ sub: 'sub-b' } as ISessionUser);
    menuSpy.getEffectiveMenus.and.returnValue(
      throwError(() => ({
        status: 404,
        errorCode: 'USER_APPLICATION_MAPPING_NOT_FOUND',
        message: 'The requested user application assignment was not found.',
        revision: 1,
      })),
    );

    store.load();

    expect(store.menus().length).toBe(0);
    expect(store.loadErrors().menus?.errorCode).toBe('USER_APPLICATION_MAPPING_NOT_FOUND');
  });

  it('keeps cached menus across a same-user reload', () => {
    store.load();
    expect(store.menus().length).toBe(1);

    // Same user re-loads (same `sub`) — menus stay until the refetch replaces them.
    store.load();
    expect(store.menus().length).toBe(1);
  });

  it('reset() clears all cached data and forgets the identity', () => {
    store.load();
    expect(store.menus().length).toBe(1);
    expect(store.favorites().length).toBe(1);

    store.reset();

    expect(store.menus().length).toBe(0);
    expect(store.favorites().length).toBe(0);
    expect(store.currentUser()).toBeNull();
    expect(store.rawCurrentUser()).toBeNull();
    expect(store.roles()).toEqual([]);
    expect(store.loadErrors()).toEqual({ user: null, menus: null, favorites: null });
  });
});
