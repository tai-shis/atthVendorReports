import queryDB from '../models/database.js';

export async function vendorExists(vendor_id: string): Promise<boolean> {
  try {
    const result = await queryDB('SELECT * FROM vendor WHERE id = $1', [vendor_id]);
    return result.rowCount != 0;
  } catch(err: any) {
    throw new Error(`Database error when checking vendor: ${err.message}`);
  }
}