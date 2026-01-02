"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskQuerySchema = void 0;
const zod_1 = require("zod");
exports.taskQuerySchema = zod_1.z.object({
    limit: zod_1.z
        .string()
        .regex(/^\d+$/, "limit must be a number")
        .optional(),
    offset: zod_1.z
        .string()
        .regex(/^\d+$/, "offset must be a number")
        .optional(),
});
