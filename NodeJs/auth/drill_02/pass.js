"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
const hashPass_1 = require("./hashPass");
async function hashPassword(plain) {
    return hashPass_1.bcrypt.hash(plain, 12);
}
