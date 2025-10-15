import { Request, Response } from 'express';
import { verifyToken } from '../services/tokens.js';
import { 
  getLastCall, 
  insertCallAttempt, 
  updateCallAttempt, 
  searchOrders,
  insertOrders,
  getOrders
} from '../services/vendors.js';

import { User } from '../models/user.js';

export async function updateOrders(req: Request, res: Response) {
  // Make sure user is authorized
  const authToken: string = (req.get('Authorization') || '').split(' ')[1];
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

export async function fetchOrders(req: Request, res: Response) {
  // Make sure user is authorized
  const authToken: string = (req.get('Authorization') || '').split(' ')[1];
  const user: User | undefined = verifyToken(authToken);
  // make sure its actually valid
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // ok now lets unpackage the query parameters
  const { start_time, end_time, limit, sort_by } = req.body.query;
  if (!start_time || !end_time || !limit || !sort_by) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  if (start_time instanceof Date || end_time instanceof Date || typeof limit !== 'number') {
    return res.status(400).json({ error: 'Invalid query parameters' });
  }

  if (sort_by !== 'DESC' && sort_by !== 'ASC') {
    return res.status(400).json({ error: 'Invalid query parameter' });
  }

  const name: string = "Misc Kitchen Items"
  try {
    const orders = await getOrders(name, start_time, end_time, limit, sort_by);
    // const orders = await getOrders(user.vendor_name, start_time, end_time, limit, sort_by);
    return res.status(200).json({ orders });
  } catch (err: any) {
    return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
  }
}