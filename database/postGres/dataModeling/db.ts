import { Pool } from "pg";

export const pool = new Pool({
  host: "localhost",
  user: "sarma",
  password: "zade1206",
  database: "mmu",
  port: 5432,
});
