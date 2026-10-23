import { Routes } from '@angular/router';
import { Avatar } from './routes/avatar/avatar';
import { Dialog } from './routes/dialog/dialog';
import { GridTree } from './routes/grid-tree/grid-tree';
import { Grid } from './routes/grid/grid';
import { Impersonation } from './routes/impersonation/impersonation';
import { SectionTabs } from './routes/section-tabs/section-tabs';
import { Select } from './routes/select/select';

export const routes: Routes = [
  {
    path: 'action-placeholder',
    title: 'Action Placeholder',
    loadComponent: () =>
      import('./routes/action-placeholder/action-placeholder').then((m) => m.ActionPlaceholderDemo),
  },
  {
    path: 'avatar',
    component: Avatar,
  },
  {
    path: 'banner',
    title: 'Banner',
    loadComponent: () => import('./routes/banner/banner').then((m) => m.BannerDemo),
  },
  {
    path: 'dialog',
    component: Dialog,
  },
  {
    path: 'empty-state',
    title: 'Empty State',
    loadComponent: () => import('./routes/empty-state/empty-state').then((m) => m.EmptyStateDemo),
  },
  {
    path: 'grid',
    component: Grid,
  },
  {
    path: 'grid-tree',
    component: GridTree,
  },
  {
    path: 'highlight-search',
    title: 'Highlight Search',
    loadComponent: () =>
      import('./routes/highlight-search/highlight-search').then((m) => m.HighlightSearchDemo),
  },
  {
    path: 'image-cropper',
    title: 'Image Cropper',
    loadComponent: () =>
      import('./routes/image-cropper/image-cropper').then((m) => m.ImageCropperDemo),
  },
  { path: 'impersonation', component: Impersonation },
  {
    path: 'load-error',
    title: 'Load Error',
    loadComponent: () => import('./routes/load-error/load-error').then((m) => m.LoadErrorDemo),
  },
  {
    path: 'loading-region',
    title: 'Loading Region',
    loadComponent: () =>
      import('./routes/loading-region/loading-region').then((m) => m.LoadingRegionDemo),
  },
  {
    path: 'section-tabs',
    component: SectionTabs,
  },
  {
    path: 'select',
    component: Select,
  },
  { path: 'shared-ui', pathMatch: 'full', redirectTo: 'action-placeholder' },
];
