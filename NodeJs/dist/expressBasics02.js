"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    res.json({ userId: id });
});
app.get("/search", (req, res) => {
    const { q } = req.query;
    res.json({ query: q });
});
app.get("/users/:id/posts", (req, res) => {
    const { id } = req.params;
    const { limit } = req.query;
    res.json({
        userId: id,
        limit: limit ?? "not provided",
    });
    const LimNum = Number(limit);
    console.log(LimNum);
});
app.use("*", (req, res) => {
    res.status(404).json({
        error: "Route not found",
    });
});
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
process.on("SIGINT", () => {
    console.log("\n Shutting Down...");
    server.close(() => process.exit(0));
});
