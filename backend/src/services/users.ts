import queryDB from '../models/database.js';

import type { User } from '../models/user.js';
import type { Result } from 'pg';

function getUser(vendorName: string): Promise<User | undefined> {
  // Should only ever get one user back, as vendors can only register once.
  return queryDB(
    'SELECT * FROM users WHERE vendorName=$1',[vendorName])
    .then((res: Result) => {
      if (res.rowCount === 0){
        return undefined;
      } 
      return res.rows[0] as User;
    })
    .catch((err: Error)=> {
      throw new Error(`Database error when fetching user: ${err.message}`); 
    });
}

