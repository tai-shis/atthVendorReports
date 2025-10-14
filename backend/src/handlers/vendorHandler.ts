import { Request, Response } from 'express';
import { verifyToken } from '../services/tokens.js';
import { 
  getLastCall, 
  insertCallAttempt, 
  updateCallAttempt, 
  searchOrders,
  insertOrders
} from '../services/vendors.js';

import { User } from '../models/user.js';

// Long ass function, but this is the oly time we call db this much in this context
export async function updateOrders(req: Request, res: Response) {
  // Make sure user is authorized
  const authToken: string = req.get('Authorization') || '';
  const user: User | undefined = verifyToken(authToken);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // get last call, current time and insert into call_history as a call attempt
    const lastCall = await getLastCall(); 
    const callTime = new Date(); // this should be parsed as .toISOString() into the db
    const id = await insertCallAttempt(lastCall, callTime); // take id to update later

    // okay, now try searching for orders
    const orders = await searchOrders(lastCall, callTime);

    // no issues here, seems like the call request as successful
    await updateCallAttempt(id, 'success'); // don't really need to specify success but for readability
    
    // now add to database
    await insertOrders(orders);

    return res.status(200).json({ message: `Successfully added ${orders.length} orders.` }); 
  } catch (err: any) {
    return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
  }

}