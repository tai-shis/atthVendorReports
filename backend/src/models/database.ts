import { Pool } from 'pg'
import type { Result } from 'pg';

const pool = new Pool({
  user: process.env.PG_USER, // your Docker Postgres user
  host: process.env.PG_HOST, // Docker publishes Postgres on localhost
  database: process.env.PG_DB, // default database or your DB name
  password: process.env.PG_PW, // same password as your Docker container
  port: Number(process.env.PG_PORT), // default Postgres port exposed by Docker
});


export default async function queryDB(text: string, params?: any[]): Promise<Result> {
  return await pool.query(text, params);
}