import { componentsRoutes } from './routes/components/components.routes';
import { IRoutes } from './types';

export const routes: IRoutes = [
  ...componentsRoutes,
  {
    path: '',
    redirectTo: 'components',
    data: {
      title: 'Components',
    },
    pathMatch: 'full',
  },
];
