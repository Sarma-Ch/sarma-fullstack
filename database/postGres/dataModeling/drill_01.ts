import { pool } from "./db";

async function run() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS categories (
      id SERIAL PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      color TEXT
    );
  `);

  await pool.query(`
    ALTER TABLE tasks
    ADD COLUMN IF NOT EXISTS category_id INTEGER
    REFERENCES categories(id);
  `);

  await pool.query(`
    INSERT INTO categories (name, color)
    VALUES ('Work','blue'), ('Personal','green'), ('Shopping','orange')
    ON CONFLICT (name) DO NOTHING;
  `);

  await pool.query(`
    UPDATE tasks
    SET category_id = (SELECT id FROM categories WHERE name = 'Work')
    WHERE category_id IS NULL;
  `);

  const res = await pool.query(`
    SELECT c.name AS category, COUNT(t.id) AS task_count
    FROM categories c
    LEFT JOIN tasks t ON t.category_id = c.id
    GROUP BY c.name;
  `);

  console.table(res.rows);
}

run().finally(() => pool.end());
