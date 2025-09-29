"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const env_1 = __importDefault(require("./config/env"));
const seedAdmin_1 = require("./utils/seedAdmin");
const routes_1 = __importDefault(require("./routes"));
const errorHanlder_1 = require("./middleware/errorHanlder");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
(0, db_1.connectDB)();
(0, seedAdmin_1.seedAdmin)();
exports.server = app.listen(env_1.default.PORT, () => {
    console.log(`server started at http://localhost:${env_1.default.PORT}`);
});
app.get("/", (_, res) => {
    res.send({ message: "Portfolio Server is running", success: true });
});
app.use("/api/v1", routes_1.default);
app.use(errorHanlder_1.errorHandler);
exports.default = app;
