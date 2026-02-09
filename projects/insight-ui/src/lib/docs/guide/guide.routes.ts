import { IRoutes } from '../../host';

export const guideRoutes: IRoutes = [
  {
    path: 'guide',
    loadComponent: () => import('./guide').then((c) => c.IRGuide),
    data: {
      title: '',
    },
  },
];
