import { pool } from "./db";
import { User } from "./types";

export async function createUser(email: string) {
  try {
    await pool.query("INSERT INTO users (email) VALUES ($1)", [email]);
    return { success: true };
  } catch (err: any) {
    if (err.code === "23505") {
      return { success: false, message: "Email already exists" };
    }
    throw err;
  }
}
export async function getUser(id: number): Promise<User | null> {
  try {
    const res = await pool.query<User>(
      "SELECT id, email FROM users WHERE id = $1",
      [id]
    );
    return res.rows[0] ?? null;
  } catch (err) {
    console.error("getUser failed", err);
    throw err;
  }
}