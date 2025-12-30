"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("Hello Express");
});
const PORT = process.env.PORT || 3000;
app.get("/ping", (req, res) => {
    res.json({ ok: true });
});
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
process.on("SIGINT", () => {
    console.log("\nSIGINT received. Shutting down gracefully...");
    server.close(() => {
        console.log("Server closed.");
        process.exit(0);
    });
});
