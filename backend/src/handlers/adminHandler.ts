import type { Request, Response } from 'express';
import { getUsers, getVendors, insertVendor } from '../services/admin.js';
import { isAdmin } from '../services/admin.js';

export async function fetchUsers(req: Request, res: Response) {
  // fake authToken, but this doesn't really need to be secure since i'm the only admin
  const adminToken: string = req.get('Authorization') || '';

  if(!isAdmin(adminToken)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const users = await getUsers();
    return res.status(200).json({ users });
  } catch (err: any) {
    console.log(`Error fetching users: ${err.message}`);
    return res.status(503).json({ error: 'Internal Server Error' });
  }
}

export async function fetchVendors(req: Request, res: Response) {
  const adminToken: string = req.get('Authorization') || '';

  if(!isAdmin(adminToken)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const vendors = await getVendors();
    return res.status(200).json({ vendors});
  } catch (err: any) {
    console.log(`Error fetching vendors: ${err.message}`);
    return res.status(503).json({ error: 'Internal Server Error' });
  }
}

export async function createVendor(req: Request, res: Response) {
  const vendor_name = req.body.vendor_name || '';
  const adminToken: string = req.get('Authorization') || '';

  if(!isAdmin(adminToken)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!vendor_name) {
    return res.status(400).json({ error: 'Vendor name is required' });
  }

  try {
    await insertVendor(vendor_name);
    return res.status(201).json({ message: 'Vendor created successfully' }); 
  } catch (err: any) {
    console.log(`Error creating vendor: ${err.message}`);
    return res.status(503).json({ error: 'Internal Server Error' });
  }
}