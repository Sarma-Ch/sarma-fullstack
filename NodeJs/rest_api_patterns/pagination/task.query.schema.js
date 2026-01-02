"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskQuerySchema = void 0;
const zod_1 = require("zod");
exports.taskQuerySchema = zod_1.z.object({
    page: zod_1.z
        .string()
        .regex(/^\d+$/, "page must be a number")
        .transform(Number)
        .default("1"),
    limit: zod_1.z
        .string()
        .regex(/^\d+$/, "limit must be a number")
        .transform(Number)
        .default("10"),
});
