"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bcrypt = void 0;
exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.bcrypt = bcrypt_1.default;
const SALT_ROUNDS = 12;
async function hashPassword(plain) {
    if (!plain)
        throw new Error("Password required");
    return await bcrypt_1.default.hash(plain, SALT_ROUNDS);
}
async function comparePassword(plain, hash) {
    if (!plain || !hash)
        return false;
    return await bcrypt_1.default.compare(plain, hash);
}
