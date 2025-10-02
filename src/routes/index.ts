import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { ContactRoutes } from "../modules/contact/contact.route";

const appRoutes = Router();
const routes: { path: string; router: Router }[] = [
  {
    path: "/auth",
    router: UserRoutes,
  },
  {
    path: "/contact",
    router: ContactRoutes,
  },
];

routes.forEach((route) => {
  appRoutes.use(route.path, route.router);
});

export default appRoutes;
