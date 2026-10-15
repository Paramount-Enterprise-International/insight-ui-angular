import { Routes } from '@angular/router';
import { Avatar } from './routes/avatar/avatar';
import { Dialog } from './routes/dialog/dialog';
import { GridTree } from './routes/grid-tree/grid-tree';
import { Grid } from './routes/grid/grid';
import { Impersonation } from './routes/impersonation/impersonation';
import { SectionTabs } from './routes/section-tabs/section-tabs';
import { Select } from './routes/select/select';

export const routes: Routes = [
  { path: 'impersonation', component: Impersonation },
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
  {
    path: 'section-tabs',
    component: SectionTabs,
  },
];
