import { IRoutes } from '@insight/ui';

export const utilitiesRoutes: IRoutes = [
  {
    path: 'utilities',
    data: {
      title: 'Utilities',
    },
    children: [
      {
        path: '',
        loadComponent: () => import('./utilities').then((c) => c.IRUtilities),
        data: {
          title: '',
        },
      },
      {
        path: 'background-color',
        loadComponent: () =>
          import('./background-color/background-color').then((c) => c.IRUtilitiesBackgroundColor),
        data: {
          title: 'Background Color',
        },
      },
      {
        path: 'border',
        loadComponent: () => import('./border/border').then((c) => c.IRUtilitiesBorder),
        data: {
          title: 'Border',
        },
      },
      {
        path: 'display',
        loadComponent: () => import('./display/display').then((c) => c.IRUtilitiesDisplay),
        data: {
          title: 'Display',
        },
      },
      {
        path: 'flex',
        loadComponent: () => import('./flex/flex').then((c) => c.IRUtilitiesFlex),
        data: {
          title: 'Flex',
        },
      },
      {
        path: 'height',
        loadComponent: () => import('./height/height').then((c) => c.IRUtilitiesHeight),
        data: {
          title: 'Height',
        },
      },
      {
        path: 'margin',
        loadComponent: () => import('./margin/margin').then((c) => c.IRUtilitiesMargin),
        data: {
          title: 'Margin',
        },
      },
      {
        path: 'object-fit',
        loadComponent: () => import('./object-fit/object-fit').then((c) => c.IRUtilitiesObjectFit),
        data: {
          title: 'Object Fit',
        },
      },
      {
        path: 'padding',
        loadComponent: () => import('./padding/padding').then((c) => c.IRUtilitiesPadding),
        data: {
          title: 'Padding',
        },
      },
      {
        path: 'scroll',
        loadComponent: () => import('./scroll/scroll').then((c) => c.IRUtilitiesScroll),
        data: {
          title: 'Scroll',
        },
      },
      {
        path: 'typography',
        loadComponent: () => import('./typography/typography').then((c) => c.IRUtilitiesTypography),
        data: {
          title: 'Typpgraphy',
        },
      },
      {
        path: 'width',
        loadComponent: () => import('./width/width').then((c) => c.IRUtilitiesWidth),
        data: {
          title: 'Width',
        },
      },
    ],
  },
];
