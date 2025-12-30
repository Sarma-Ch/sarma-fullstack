"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.get("/ok", (req, res) => {
    res.status(200).json({ message: "OK" });
});
app.post("/create", (req, res) => {
    res.status(201).json({ created: true, data: req.body });
});
app.get("/bad", (req, res) => {
    res.status(400).json({ error: "Bad Request" });
});
app.get("/not-found", (req, res) => {
    res.status(404).json({ error: "Not Found" });
});
app.get("/headers", (req, res) => {
    res.set("X-Custom-Header", "MyHeaderValue");
    res.json({ message: "Custom header set" });
});
app.get("/json", (req, res) => {
    res.json({ type: "json response" });
});
app.get("/text", (req, res) => {
    res.send("Plain text response");
});
app.get("/file", (req, res) => {
    const filePath = path_1.default.join(__dirname, "sample.txt");
    res.sendFile(filePath);
});
app.get("/redirect", (req, res) => {
    res.redirect("/ok");
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
