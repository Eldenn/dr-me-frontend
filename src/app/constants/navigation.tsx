import { IRoutes } from "@/app/types/navigation";
import Home from "@/app/pages/Home";

const routes: IRoutes = {
  home: {
    path: '/',
    component: Home,
  },
};

export default routes;