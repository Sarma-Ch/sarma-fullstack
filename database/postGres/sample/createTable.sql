import { pool } from "./db";

async function main() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS demo (
      id SERIAL PRIMARY KEY,

      name TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);


  console.log("✅ Table created from VS Code");
  await pool.end();
}

main().catch(console.error);
