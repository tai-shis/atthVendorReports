import { compareSync } from 'bcrypt';
import queryDB from '../models/database.js';

import type { User } from '../models/user.js';

export async function userExists(email: string): Promise<boolean> {
  try {
    const res = await queryDB('SELECT 1 FROM users WHERE email=$1',[email]);

    if (res.rowCount === 0) {
      return false;
    } else { 
      return true;
    }
  } catch(err: any) {
    throw new Error(`Database error when fetching user: ${err.message}`);
  }
}

export async function insertUser(id: string, email: string, hash: string, vendor_id: string): Promise<void> {
  // Should only be called if user does not exist already (USE THE ABOVE FUNCTION)
  try {
    await queryDB('INSERT INTO users (id, email, hash, vendor_id) VALUES ($1, $2, $3, $4)', [id, email, hash, vendor_id]);
  } catch(err: any) {
    throw new Error(`Database error when inserting user: ${err.message}`);
  }
}

export async function checkPassword(email: string, password: string): Promise<boolean> {
  try {
    const res = await queryDB('SELECT hash FROM users WHERE email=$1', [email]);
    return compareSync(password, res.rows[0].hash);
  } catch(err: any) {
    throw new Error(`Databse error when fetching hash ${err.message}`)
  }
}

export async function getUser(email: string): Promise<Partial<User>> {
  // just returns the vendor name since the user doesnt have any other important info (needed here)
  try {
    const res = await queryDB('SELECT u.id, u.vendor_id, v.name AS vendor_name FROM users u JOIN vendor v ON (u.vendor_id = v.id) WHERE email=$1', [email]);
    return res.rows[0];
  } catch(err: any) {
    throw new Error(`Database error when fetching user ${err.message}`);
  }
}