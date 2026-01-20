import "dotenv/config";
import { Pool } from "pg";

export const pool = new Pool({
  host: process.env.DB_HOST ?? "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT ?? 5433),
});
process.on("SIGINT", async () => {
  console.log(" Closing this pool...");
  await pool.end();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await pool.end();
  process.exit(0);
});