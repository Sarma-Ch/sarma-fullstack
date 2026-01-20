import { Pool } from "pg";

export const pool = new Pool({
  host: "localhost",
  user: "sarma",
  password: "Sarma@123",
  database: "sarma_db",
  port: 5432,
});
