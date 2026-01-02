"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get("/error", (req, res) => {
    throw new Error("Something went wrong");
});
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: err.message,
    });
};
app.use(errorHandler);
app.get("/async-error", async (req, res) => {
    throw new Error("Async error occurred");
});
const errorHandler1 = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        success: false,
        message: err.message,
        ...(process.env.NODE_ENV === "development" && {
            stack: err.stack,
        }),
    });
};
