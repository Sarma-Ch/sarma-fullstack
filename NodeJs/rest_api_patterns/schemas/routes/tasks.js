"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crypto_1 = require("crypto");
const validate_1 = require("../middlewares/validate");
const task_schema_1 = require("../schemas/task.schema");
const router = (0, express_1.Router)();
const tasks = [];
router.post;
(0, validate_1.validate)(task_schema_1.createTaskSchema, "body"),
    (req, res) => {
        const { title } = req.body;
        const task = {
            id: (0, crypto_1.randomUUID)(),
            title,
            completed: false,
            createdAt: new Date().toISOString(),
        };
        tasks.push(task);
        res.status(201).json({ data: task });
    };
router.get("/", (0, validate_1.validate)(taskuQerychema, "query"), (req, res) => {
    const { limit = "10", offset = "0" } = req.query;
    res.json({
        data: tasks.slice(Number(offset), Number(offset) + Number(limit)),
    });
});
exports.default = router;
