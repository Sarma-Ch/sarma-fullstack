import { pool } from "./db";

// export async function createTask(title: string) {
//   const result = await pool.query(
//     "INSERT INTO tasks (title) VALUES ($1) RETURNING *",
//     [title]
//   );

//   return result.rows[0];
// }

export async function getTasksByStatus(completed: boolean) {
  const result = await pool.query("SELECT * FROM tasks WHERE completed = $1", [
    completed,
  ]);

  return result.rows;
}

export async function markTaskComplete(id: number) {
  const result = await pool.query(
    "UPDATE tasks SET completed = true WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
}

export async function deleteTask(id: number) {
  const result = await pool.query(
    "DELETE FROM tasks WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
}

export async function getTasksByUser(userId: number) {
  const result = await pool.query("SELECT * FROM tasks WHERE user_id = $1", [
    userId,
  ]);
  return result.rows;
}

export async function getTasksWithUserEmail() {
  const result = await pool.query(`
    SELECT t.id, t.title, t.completed, u.email, u.name
    FROM tasks t
    JOIN users u ON t.user_id = u.id
  `);
  return result.rows;
}

import { Task } from "./types";

export async function createTask(userId: number, title: string): Promise<Task> {
  try {
    const res = await pool.query<Task>(
      `INSERT INTO tasks (user_id, title)
       VALUES ($1, $2)
       RETURNING id, user_id, title`,
      [userId, title]
    );
    return res.rows[0];
  } catch (err: any) {
    if (err.code === "23514") {
      throw new Error("Title must be a value");
    }
    if (err.code === "23503") {
      throw new Error("User not exists..");
    }
    throw err;
  }
}

export async function getUserTasks(userId: number): Promise<Task[]> {
  try {
    const res = await pool.query<Task>(
      "SELECT id, user_id, title FROM tasks WHERE user_id = $1",
      [userId]
    );
    return res.rows;
  } catch (err) {
    console.error("getUserTasks is  failed", err);
    throw err;
  }
}
