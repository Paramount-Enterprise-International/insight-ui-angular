import { IRoutes } from '@insight/ui';

export const demosRoutes: IRoutes = [
  {
    path: 'demos',
    data: {
      title: 'Demos',
    },
    children: [
      {
        path: '',
        loadComponent: () => import('./demos').then((c) => c.IRDemos),
        data: {
          title: '',
        },
      },
      {
        path: 'heracles',
        loadComponent: () => import('./heracles/heracles').then((c) => c.IRHeracles),
        data: {
          title: 'Heracles',
        },
      },
      {
        path: 'work-order',
        loadComponent: () => import('./work-order/work-order').then((c) => c.WorkOrder),
        data: {
          title: 'Work Order',
        },
      },
    ],
  },
];
