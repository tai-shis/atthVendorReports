import type { Request, Response } from 'express';

export function register(req: Request, res: Response) {
  const username: string = req.body.username;
  const password: string = req.body.password;
  const vendorName: string = req.body.vendorName;

}
