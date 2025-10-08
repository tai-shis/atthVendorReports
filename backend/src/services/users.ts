import queryDB from '../models/database.js';

import type { User } from '../models/user.js';
import type { Result } from 'pg';

// export async function getUser(vendorName: string): Promise<User | undefined> {
//   // Should only ever get one user back, as vendors can only register once.
//   const res = await queryDB('SELECT * FROM users WHERE vendorName=$1',[vendorName])
    
    
//     .then((res: Result) => {
//       if (res.rowCount === 0){
//         return undefined;
//       } 
//       return res.rows[0] as User;
//     })
//     .catch((err: Error)=> {
//       throw new Error(`Database error when fetching user: ${err.message}`); 
//     });
// }

export async function userExists(vendorName: string): Promise<boolean> {
  try {
    const res = await queryDB('SELECT 1 FROM users WHERE vendor_name=$1',[vendorName]);

    if (res.rowCount === 0) {
      return false;
    } else { 
      return true;
    }
  } catch(err: any) {
    throw new Error(`Database error when checking if user exists: ${err.message}`);
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