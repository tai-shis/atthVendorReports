import queryDB from "../models/database.js";
import crypto from "crypto";

// essentially a simpler version of token system
export function isAdmin(adminToken: string) {
  return adminToken === process.env.ADMIN_TOKEN;
}

// This is a user 'method' but is only used in the admin dashboard
export async function getUsers(): Promise<string[]> {
  try {
    const res = await queryDB(
      "SELECT u.id, u.email, u.vendor_id, v.name FROM users u JOIN vendor v ON (u.vendor_id = v.id)"
    );
    return res.rows;
  } catch (err: any) {
    throw new Error(`Database error when fetching users ${err.message}`);
  }
}

export async function getVendors(): Promise<string[]> {
  try {
    const res = await queryDB(
      "SELECT * FROM vendor"
    );
    return res.rows;
  } catch (err: any) {
    throw new Error(`Database error when fetching vendors ${err.message}`);
  }
}

export async function insertVendor(vendorName: string): Promise<void> {
  // Generate a UUID for the new vendor
  const id = crypto.randomUUID();
  try {
    await queryDB(
      "INSERT INTO vendor (id, name) VALUES ($1, $2)",
      [id, vendorName]
    );
  } catch (err: any) {
    throw new Error(`Database error when inserting vendor ${err.message}`);
  }
}