import pg from "pg";

const { Pool } = pg;

export const db = new Pool({
  user: "postgres",
  database: "parkingsystem",
  host: "localhost",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
