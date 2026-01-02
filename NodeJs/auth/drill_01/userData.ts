import { dB } from "./tabledB";
import type { UserCreation, User } from "./userType";

const createUser = (data: UserCreation): User => {
  const stmt = dB.prepare(`
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

const getUserByEmail = (email: string): User | undefined => {
  return dB
    .prepare(
      `
      SELECT id, email, password_hash AS passwordHash, role
      FROM users
      WHERE email = ?
    `
    )
    .get(email) as User | undefined;
};

export { createUser };
export { getUserByEmail };
