"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, payload) => {
    res.status(payload.statusCode).send(payload);
};
exports.sendResponse = sendResponse;
