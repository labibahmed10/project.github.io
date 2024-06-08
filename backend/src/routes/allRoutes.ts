import { Router } from "express";
import { IRouteType } from "../interfaces/route/routesType";
import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/user/user.routes";
const allRoutes = Router();

const routes: IRouteType[] = [
  {
    path: "/",
    route: authRoutes,
  },
  {
    path: "/",
    route: userRoutes,
  },
];

routes.forEach((route) => allRoutes.use(route.path, route.route));

export default allRoutes;
