import { findBreadcrumbMenuChain } from './menu.utils';
import type { IMenu } from '../host.types';

describe('breadcrumb menu ancestry', () => {
  const menus: IMenu[] = [
    {
      id: 'group',
      name: 'Sales',
      children: [
        { id: 'item', name: 'Customers', route: '/-/people' },
        { id: 'long', name: 'Details', route: '/people/details' },
      ],
    },
  ];
  it('uses tree ancestry, independent of the URL hierarchy', () => {
    expect(findBreadcrumbMenuChain(menus, '/people/123?tab=edit').map((n) => n.id)).toEqual([
      'group',
      'item',
    ]);
  });
  it('prefers the longest segment-aligned match', () => {
    expect(findBreadcrumbMenuChain(menus, '/people/details/123').map((n) => n.id)).toEqual([
      'group',
      'long',
    ]);
    expect(findBreadcrumbMenuChain(menus, '/people-extra')).toEqual([]);
  });
});
