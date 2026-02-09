import { IRoutes } from '../../../host';

export const variablesRoutes: IRoutes = [
  {
    path: 'variables',
    data: {
      title: 'Variables',
    },
    children: [
      {
        path: '',
        loadComponent: () => import('./variables').then((c) => c.IRVariables),
        data: {
          title: '',
        },
      },
      {
        path: 'border',
        loadComponent: () => import('./border/border').then((c) => c.IRVariableBorder),
        data: {
          title: 'Border',
        },
      },
      {
        path: 'color',
        loadComponent: () => import('./color/color').then((c) => c.IRVariableColor),
        data: {
          title: 'Color',
        },
      },
      {
        path: 'elevation',
        loadComponent: () => import('./elevation/elevation').then((c) => c.IRVariableElevation),
        data: {
          title: 'Elevation',
        },
      },
      {
        path: 'icon-size',
        loadComponent: () => import('./icon-size/icon-size').then((c) => c.IRVariableIconSize),
        data: {
          title: 'Elevation',
        },
      },
      {
        path: 'opacity',
        loadComponent: () => import('./opacity/opacity').then((c) => c.IRVariableOpacity),
        data: {
          title: 'Opacity',
        },
      },
      {
        path: 'radius',
        loadComponent: () => import('./radius/radius').then((c) => c.IRVariableRadius),
        data: {
          title: 'Opacity',
        },
      },
      {
        path: 'semantic',
        loadComponent: () => import('./semantic/semantic').then((c) => c.Semantic),
        data: {
          title: 'Semantic',
        },
      },
      {
        path: 'shadow',
        loadComponent: () => import('./shadow/shadow').then((c) => c.Shadow),
        data: {
          title: 'Shadow',
        },
      },
      {
        path: 'spacing',
        loadComponent: () => import('./spacing/spacing').then((c) => c.Spacing),
        data: {
          title: 'Spacing',
        },
      },
      {
        path: 'typography',
        loadComponent: () => import('./typography/typography').then((c) => c.Typography),
        data: {
          title: 'Typography',
        },
      },
      {
        path: '',
        redirectTo: 'border',
        data: {
          title: 'Border',
        },
        pathMatch: 'full',
      },
    ],
  },
];
