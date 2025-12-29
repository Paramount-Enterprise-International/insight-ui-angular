import { Routes } from '@angular/router';
import { Grid } from './routes/grid/grid';
import { GridTree } from './routes/grid-tree/grid-tree';

export const routes: Routes = [
  {
    path: 'grid',
    component: Grid,
  },
  {
    path: 'grid-tree',
    component: GridTree,
  },
];
