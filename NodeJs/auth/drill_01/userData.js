"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.createUser = void 0;
const tabledB_1 = require("./tabledB");
const createUser = (data) => {
    const stmt = tabledB_1.dB.prepare(`
    INSERT INTO users (email, password_hash, role)
    VALUES (?, ?, ?)
  `);
    const result = stmt.run(data.email, data.passwordHash, data.role ?? "user");
    return {
        id: Number(result.lastInsertRowid),
        email: data.email,
        passwordHash: data.passwordHash,
        role: data.role ?? "user",
    };
};
exports.createUser = createUser;
const getUserByEmail = (email) => {
    return tabledB_1.dB
        .prepare(`
      SELECT id, email, password_hash AS passwordHash, role
      FROM users
      WHERE email = ?
    `)
        .get(email);
};
exports.getUserByEmail = getUserByEmail;
