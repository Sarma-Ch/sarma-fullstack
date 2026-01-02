"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema, property) => (req, res, next) => {
    const result = schema.safeParse(req[property]);
    if (!result.success) {
        return res.status(400).json({
            errors: result.error.format(),
        });
    }
    req[property] = result.data;
    next();
};
exports.validate = validate;
