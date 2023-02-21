export interface IRoute {
  path: string;
  component: React.FC;
}

export interface IRoutes {
  [key: string]: IRoute;
}
