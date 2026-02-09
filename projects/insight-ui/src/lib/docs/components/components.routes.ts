import { IRoutes } from '../../host';

export const componentsRoutes: IRoutes = [
  {
    path: 'components',
    data: {
      title: 'Components',
    },
    children: [
      {
        path: '',
        loadComponent: () => import('./components').then((c) => c.IRComponents),
        data: {
          title: '',
        },
      },
      {
        path: 'button',
        loadComponent: () => import('./button/button').then((c) => c.IRButton),
        data: {
          title: 'Button',
        },
      },
      {
        path: 'card',
        loadComponent: () => import('./card/card').then((c) => c.IRCard),
        data: {
          title: 'Card',
        },
      },
      {
        path: 'datepicker',
        loadComponent: () => import('./datepicker/datepicker').then((c) => c.Datepicker),
        data: {
          title: 'Pill',
        },
      },
      {
        path: 'dialog',
        loadComponent: () => import('./dialog/dialog').then((c) => c.IRDialog),
        data: {
          title: 'Dialog',
        },
      },
      {
        path: 'grid',
        loadComponent: () => import('./grid/grid').then((c) => c.IRGrid),
        data: {
          title: 'Grid',
        },
      },
      {
        path: 'icon',
        loadComponent: () => import('./icon/icon').then((c) => c.IRIcon),
        data: {
          title: 'Icon',
        },
      },
      {
        path: 'input',
        loadComponent: () => import('./input/input').then((c) => c.IRInput),
        data: {
          title: 'Input',
        },
      },
      {
        path: 'loading',
        loadComponent: () => import('./loading/loading').then((c) => c.IRLoading),
        data: {
          title: 'Loading',
        },
      },
      {
        path: 'section',
        loadComponent: () => import('./section/section').then((c) => c.IRSection),
        data: {
          title: 'Section',
        },
      },
      {
        path: 'select',
        loadComponent: () => import('./select/select').then((c) => c.IRSelect),
        data: {
          title: 'Select',
        },
      },
      {
        path: 'textarea',
        loadComponent: () => import('./textarea/textarea').then((c) => c.IRTextarea),
        data: {
          title: 'Textarea',
        },
      },
      {
        path: 'toggle',
        loadComponent: () => import('./toggle/toggle').then((c) => c.Toggle),
        data: {
          title: 'Toggle',
        },
      },
      {
        path: 'pill',
        loadComponent: () => import('./pill/pill').then((c) => c.Pill),
        data: {
          title: 'Pill',
        },
      },
    ],
  },
];
