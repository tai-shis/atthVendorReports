import jwt from 'jsonwebtoken';
import type { Secret } from 'jsonwebtoken';
import { User } from '../models/user.js';

const JWT_SECRET_KEY: Secret = process.env.JWT_SECRET_KEY || '';
const expiry: number = 3600; // 1 hour 

export function createToken(user: User): string {
  // Should be called with valid data
  const currentTime = Math.floor(Date.now() / 1000);
  const payload = {
    sub: user,
    iat: currentTime,
    exp: currentTime + expiry,
    role: 'vendor'
  }
  return jwt.sign(payload, JWT_SECRET_KEY);
}

export function verifyToken(authToken: string) {
  try {
    return jwt.verify(authToken, JWT_SECRET_KEY) as User;
  } catch (err) {
    console.log('Token verification failed:', err);
    return undefined;
  }
}