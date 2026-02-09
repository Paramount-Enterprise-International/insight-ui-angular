import { IRoutes } from '@insight/ui';
import { componentsRoutes } from './components/components.routes';
import { demosRoutes } from './demos/demos.routes';
import { guideRoutes } from './guide/guide.routes';
import { stylesRoutes } from './styles/styles.routes';

export const docsRoutes: IRoutes = [
  {
    path: '',
    data: {
      title: 'Docs',
    },
    children: [
      {
        path: '',
        loadComponent: () => import('./docs').then((c) => c.IRDocs),
        data: {
          title: '',
        },
      },
      ...componentsRoutes,
      ...demosRoutes,
      ...guideRoutes,
      ...stylesRoutes,
    ],
  },
];
