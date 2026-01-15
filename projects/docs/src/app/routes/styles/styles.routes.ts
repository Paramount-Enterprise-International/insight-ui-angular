import { IRoutes } from '../../types';
import { utilitiesRoutes } from './utilities/utilities.routes';
import { variablesRoutes } from './variables/variables.routes';

export const stylesRoutes: IRoutes = [
  {
    path: 'styles',
    data: {
      title: 'Styles',
    },
    children: [
      {
        path: '',
        loadComponent: () => import('./styles').then((c) => c.IRStyles),
        data: {
          title: '',
        },
      },
      ...utilitiesRoutes,
      ...variablesRoutes,
    ],
  },
];
