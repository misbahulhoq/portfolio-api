"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const contact_route_1 = require("../modules/contact/contact.route");
const project_route_1 = require("../modules/project/project.route");
const appRoutes = (0, express_1.Router)();
const routes = [
    {
        path: "/auth",
        router: user_route_1.UserRoutes,
    },
    {
        path: "/contact",
        router: contact_route_1.ContactRoutes,
    },
    {
        path: "/projects",
        router: project_route_1.ProjectRoutes,
    },
];
routes.forEach((route) => {
    appRoutes.use(route.path, route.router);
});
exports.default = appRoutes;
