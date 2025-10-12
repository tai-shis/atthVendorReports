import { compareSync } from 'bcrypt';
import queryDB from '../models/database.js';

export async function userExists(vendorName: string): Promise<boolean> {
  try {
    const res = await queryDB('SELECT 1 FROM users WHERE vendor_name=$1',[vendorName]);

    if (res.rowCount === 0) {
      return false;
    } else { 
      return true;
    }
  } catch(err: any) {
    throw new Error(`Database error when fetching user: ${err.message}`);
  }
}

export async function emailExists(email: string): Promise<boolean> {
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


export async function insertUser(email: string, hash: string, salt: string, vendorName: string): Promise<void> {
  // Should only be called if user does not exist already (USE THE ABOVE FUNCTION)
  try {
    await queryDB('INSERT INTO users (email, hash, salt, vendor_name) VALUES ($1, $2, $3, $4)', [email, hash, salt, vendorName]);
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

export async function getUser(email: string): Promise<string> {
  // just returns the vendor name since the user doesnt have any other important info (needed here)
  try {
    const res = await queryDB('SELECT vendor_name FROM users WHERE email=$1', [email]);
    return res.rows[0].vendor_name;
  } catch(err: any) {
    throw new Error(`Database error when fetching user ${err.message}`);
  }
}