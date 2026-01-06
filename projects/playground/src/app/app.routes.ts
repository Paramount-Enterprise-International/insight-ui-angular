import { Routes } from '@angular/router';
import { Grid } from './routes/grid/grid';
import { GridTree } from './routes/grid-tree/grid-tree';
import { Dialog } from './routes/dialog/dialog';

export const routes: Routes = [
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
];
