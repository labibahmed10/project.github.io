import { Router } from "express";
import { IRouteType } from "../interfaces/route/routesType";
import authRoutes from "../modules/auth/auth.routes";
const allRoutes = Router();

const routes: IRouteType[] = [
  {
    path: "/auth",
    route: authRoutes,
  },
];

routes.forEach((route) => allRoutes.use(route.path, route.route));

export default allRoutes;
