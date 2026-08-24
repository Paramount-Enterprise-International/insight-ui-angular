import { IMenu } from '../host';
import {
  collectMenuCodes,
  findFirstLeafRoute,
  hasAnyMenuCode,
  mapToSidebarUser,
  toIMenu,
  toIMenuFavorite,
  toIMenus,
} from './user.mapper';
import type { IInsightCurrentUser, IInsightFavoriteMenuItem, IInsightMenuNode } from './user.types';

const app = { id: 'a1', code: 'APP', name: 'App', url: null, version: null };

function makeNode(partial: Partial<IInsightMenuNode>): IInsightMenuNode {
  return {
    id: 'm1',
    name: 'Dashboard',
    type: 'item',
    menuCode: 'dashboard',
    parentId: null,
    route: '/dashboard',
    icon: null,
    openIn: 'CURRENT_TAB',
    sequence: 1,
    application: app,
    companies: [],
    isFavorite: false,
    children: [],
    ...partial,
  };
}

describe('mapToSidebarUser', () => {
  const raw: IInsightCurrentUser = {
    userId: 'u1',
    username: 'jdoe',
    fullName: 'John Doe',
    employeeCode: 'EMP001',
    email: 'j@x.com',
    photoUrl: 'https://cdn/x.jpg',
    userType: 'internal',
    occupationName: null,
    departmentName: null,
    enabled: true,
  };

  it('maps all fields when present', () => {
    expect(mapToSidebarUser(raw)).toEqual({
      employeeCode: 'EMP001',
      fullName: 'John Doe',
      userImagePath: 'https://cdn/x.jpg',
    });
  });

  it('falls back to username and an empty image path (avatar shows its icon)', () => {
    const mapped = mapToSidebarUser({ ...raw, employeeCode: null, photoUrl: null });
    expect(mapped.employeeCode).toBe('jdoe');
    expect(mapped.fullName).toBe('John Doe');
    expect(mapped.userImagePath).toBe('');
  });
});

describe('toIMenu / toIMenus', () => {
  it('maps a backend node onto the modern IMenu shape, recursively', () => {
    const node = makeNode({
      id: 'm1',
      name: 'Root',
      type: 'group',
      menuCode: 'root',
      children: [makeNode({ id: 'm2', name: 'Child', menuCode: 'child', route: '/child' })],
    });
    const menu = toIMenu(node);

    expect(menu.id).toBe('m1');
    expect(menu.name).toBe('Root');
    expect(menu.type).toBe('group');
    expect(menu.menuCode).toBe('root');
    expect(menu.application).toEqual(app);
    expect(menu.companies).toEqual([]);
    expect(menu.children?.length).toBe(1);
    expect(menu.children?.[0].menuCode).toBe('child');
    expect(menu.children?.[0].route).toBe('/child');
  });

  it('maps arrays via toIMenus and tolerates null input lists', () => {
    expect(toIMenus([makeNode({})]).length).toBe(1);
    expect(toIMenus(null as unknown as IInsightMenuNode[])).toEqual([]);
  });
});

describe('toIMenuFavorite', () => {
  const favorite: IInsightFavoriteMenuItem = {
    id: 'm1',
    name: 'Dashboard',
    displayOrder: 1,
    menuCode: 'dashboard',
    route: '/dashboard',
    icon: null,
    openIn: 'NEW_TAB',
    application: app,
    companies: [],
  };

  it('maps a favorite item with isFavorite forced true', () => {
    const menu = toIMenuFavorite(favorite);
    expect(menu.id).toBe('m1');
    expect(menu.menuCode).toBe('dashboard');
    expect(menu.openIn).toBe('NEW_TAB');
    expect(menu.isFavorite).toBeTrue();
  });
});

describe('collectMenuCodes / hasAnyMenuCode', () => {
  const makeMenu = (partial: Partial<IMenu> = {}): IMenu => ({
    id: 'm1',
    name: 'Dashboard',
    type: 'item',
    menuCode: 'dashboard',
    route: '/dashboard',
    icon: null,
    openIn: 'CURRENT_TAB',
    isFavorite: false,
    children: [],
    ...partial,
  });

  const tree: IMenu[] = [
    makeMenu({ id: 'g', name: 'Group', type: 'group', menuCode: 'group', children: [
      makeMenu({ id: 'a', menuCode: 'dashboard' }),
      makeMenu({ id: 'b', menuCode: 'reports', children: [makeMenu({ id: 'c', menuCode: 'audit' })] }),
    ] }),
  ];

  it('collects every non-null menu code recursively, deduplicated', () => {
    const codes = collectMenuCodes([...tree, makeMenu({ id: 'dup', menuCode: 'dashboard' })]);
    expect(codes).toEqual(['group', 'dashboard', 'reports', 'audit']);
  });

  it('hasAnyMenuCode returns true when any code matches (string or array)', () => {
    expect(hasAnyMenuCode(tree, 'dashboard')).toBeTrue();
    expect(hasAnyMenuCode(tree, ['nope', 'reports'])).toBeTrue();
    expect(hasAnyMenuCode(tree, ['nope', 'other'])).toBeFalse();
  });

  it('returns false when no menus are loaded yet (async-aware)', () => {
    expect(hasAnyMenuCode([], 'dashboard')).toBeFalse();
  });
});

describe('findFirstLeafRoute', () => {
  const makeMenu = (partial: Partial<IMenu> = {}): IMenu => ({
    id: 'm1',
    name: 'Dashboard',
    type: 'item',
    menuCode: 'dashboard',
    route: '/dashboard',
    icon: null,
    openIn: 'CURRENT_TAB',
    isFavorite: false,
    children: [],
    ...partial,
  });

  it('returns the first navigable leaf route depth-first', () => {
    const menus: IMenu[] = [
      makeMenu({ id: 'g', type: 'group', route: null, children: [
        makeMenu({ id: 'a', type: 'group', route: null, children: [makeMenu({ id: 'b', route: '/b' })] }),
      ] }),
      makeMenu({ id: 'c', route: '/c' }),
    ];
    expect(findFirstLeafRoute(menus)).toBe('/b');
  });

  it('returns null when there are no navigable routes', () => {
    expect(findFirstLeafRoute([])).toBeNull();
    expect(findFirstLeafRoute([makeMenu({ id: 'g', type: 'group', route: null, children: [] })])).toBeNull();
  });
});
