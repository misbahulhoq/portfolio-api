"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const appRoutes = (0, express_1.Router)();
const routes = [
    {
        path: "/auth",
        router: user_route_1.UserRoutes,
    },
];
routes.forEach((route) => {
    appRoutes.use(route.path, route.router);
});
exports.default = appRoutes;
