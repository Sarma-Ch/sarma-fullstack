"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use((req, res, next) => {
    console.log(`[LOG] ${req.method} ${req.url}`);
    next();
});
app.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - start;
        console.log(`[TIME] ${req.method} ${req.url} - ${duration}ms`);
    });
    next();
});
const crypto_1 = __importDefault(require("crypto"));
app.use((req, res, next) => {
    const requestId = crypto_1.default.randomUUID();
    req.requestId = requestId;
    res.setHeader("X-Request-Id", requestId);
    next();
});
app.get("/test", (req, res) => {
    res.json({ requestId: req.requestId });
});
const Middleware = (req, res, next) => {
    console.log("Auth middleware executed");
    next();
};
app.get("/private", Middleware, (req, res) => {
    res.send("Private route");
});
app.use((req, res, next) => {
    console.log("Global Logger");
    req.startTime = Date.now();
    next();
});
app.all("*", (req, res, next) => {
    console.log("All Paths");
    next();
});
app.get("/users", (req, res, next) => {
    console.log(" Users Auth");
    next();
}, (req, res) => {
    console.log(" Users Handler");
    res.json({ time: Date.now() - req.startTime });
});
