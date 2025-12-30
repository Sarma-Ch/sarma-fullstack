"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json({ limit: "1mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.post("/echo", (req, res) => {
    res.json({ received: req.body });
});
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && "body" in err) {
        return res.status(400).json({ error: "Invalid JSON payload" });
    }
    next(err);
});
app.use("*", (req, res) => {
    res.status(404).json({ error: "Route not found" });
});
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
process.on("SIGINT", () => {
    server.close(() => process.exit(0));
});
