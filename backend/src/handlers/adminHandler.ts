import type { Request, Response } from 'express';
import { getUsers } from '../services/users.js';

export async function fetchUsers(req: Request, res: Response) {
  try {
    const users = await getUsers();
  } catch (err: any) {
    console.log(`Error fetching users: ${err.message}`);
    return res.status(503).json({ error: 'Internal Server Error' });
  }
}