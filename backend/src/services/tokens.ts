import jwt from 'jsonwebtoken';
import type { Secret } from 'jsonwebtoken';
import { User } from '../models/user.js';

const JWT_SECRET_KEY: Secret = process.env.JWT_SECRET_KEY || '';
const expiry: number = 3600; // 1 hour 

export function createToken(id: string, email: string, vendorID: string, vendorName: string): string {
  // Should be called with valid data
  const currentTime = Math.floor(Date.now() / 1000);
  const payload: object = {
    sub: {id, email, vendorID, vendorName},
    iat: currentTime,
    exp: currentTime + expiry,
    role: 'vendor'
  }
  return jwt.sign(payload, JWT_SECRET_KEY);
}

export function verifyToken(authToken: string) {
  return jwt.verify(authToken, JWT_SECRET_KEY);
}