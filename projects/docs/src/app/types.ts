import { Route } from '@angular/router';

export type IRoute = Omit<Route, 'data' | 'children'> & {
  data: {
    title: string; // 👈 required
    [key: string]: any;
  };
  children?: IRoute[]; // 👈 recursive
};

export type IRoutes = IRoute[];
