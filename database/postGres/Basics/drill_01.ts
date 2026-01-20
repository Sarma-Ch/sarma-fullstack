import "dotenv/config";
import { Pool } from "pg";


console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: false,
});

pool
  .query("SELECT NOW()")
  .then((res) => {
    console.log(" Node connected to PostgreSQL at:", res.rows[0]);
    pool.end();
  })
  .catch((err) => {
    console.error(" DB connection failed:", err.message);
  });
