import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";

const appRoutes = Router();
const routes: { path: string; router: Router }[] = [
  {
    path: "/auth",
    router: UserRoutes,
  },
];

routes.forEach((route) => {
  appRoutes.use(route.path, route.router);
});

export default appRoutes;
