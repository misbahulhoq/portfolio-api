import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { ContactRoutes } from "../modules/contact/contact.route";
import { ProjectRoutes } from "../modules/project/project.route";
import { BlogRoutes } from "../modules/blog/blog.route";

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
  {
    path: "/projects",
    router: ProjectRoutes,
  },
  {
    path: "/blogs",
    router: BlogRoutes,
  },
];

routes.forEach((route) => {
  appRoutes.use(route.path, route.router);
});

export default appRoutes;
