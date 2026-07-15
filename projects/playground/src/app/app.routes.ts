import { Routes } from '@angular/router';
import { Avatar } from './routes/avatar/avatar';
import { Grid } from './routes/grid/grid';
import { GridTree } from './routes/grid-tree/grid-tree';
import { Dialog } from './routes/dialog/dialog';
import { Select } from './routes/select/select';

export const routes: Routes = [
  {
    path: 'avatar',
    component: Avatar,
  },
  {
    path: 'dialog',
    component: Dialog,
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
    path: 'select',
    component: Select,
  },
];
