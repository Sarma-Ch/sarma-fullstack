"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_1 = require("../../schemas/middlewares/validate");
const task_query_schema_1 = require("../schemas/task.query.schema");
const router = (0, express_1.Router)();
router.get("/", (0, validate_1.validate)(task_query_schema_1.taskQuerySchema, "query"), (req, res) => {
    const { page, limit } = req.query;
    const totalItems = tasks.length;
    const totalPages = Math.ceil(totalItems / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedTasks = tasks.slice(start, end);
    res.status(200).json({
        data: paginatedTasks,
        meta: {
            page,
            limit,
            totalItems,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
        },
    });
});
exports.default = router;
