import queryDB from '../models/database.js';
import { userExists, insertUser } from '../services/users.js';
import bcrypt from 'bcrypt';

import type { Request, Response } from 'express';
// import type { User } from '../models/user.js';

function validateEmail(email: string): boolean {
  const emailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// theres probably a vuln for sql injection in vendorName but im laaaazyyyyyy 
// (about 30 minutes before i wrote the below function)
function validateVendorName(vendorName: string): boolean {
  // Haha bitches! I'm no longer lazy 
  const vendorNamePattern: RegExp = /^[a-zA-Z0-9\[\]\{\}'&\/ _\-]+$/;
  return vendorNamePattern.test(vendorName);
}

export async function register(req: Request, res: Response) {
  const email: string | undefined = req.body.email;
  const password: string | undefined = req.body.password;
  const vendorName: string | undefined = req.body.vendorName;


  // Ensure that all parameters exist blah blah blah
  if(!email) {
    return res.status(400).json({ error: 'Email is required', code: 'emailMissing' });
  }

  // Catch injection/invalid
  if(!validateEmail(email)) {
    return res.status(400).json({ error: 'Email contains invalid characters', code: 'emailInvalid' })
  }

  if(!password) {
    return res.status(400).json({ error: 'Password is required', code: 'passwordMissing' });
  }

  if(password.length <= 4) {
    return res.status(400).json({ error: 'Password length is too short', code: 'passwordTooShort' })
  } 

  if(!vendorName) {
    return res.status(400).json({ error: 'Vendor name is required', code: 'vendorNameMissing' });
  } 

  // This will only catch if someone is trying to inject sql, or some weirdo has a whacky vendor name
  if(!validateVendorName(vendorName)) {
    return res.status(400).json({ error: 'Why are you trying to change the vendor name??', code: 'fuck off' })
  }
  
  try {
    const exists: boolean = await userExists(vendorName);
    if (exists) {
      return res.status(403).json({ error: `${vendorName} is already registered`, code: 'alreadyRegistered'})
    }
    
    // Salt(and (not actually)pepper) that hash(brown) baby
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    await insertUser(email, hash, salt, vendorName);
    return res.status(201).json({
      message: 'User registered successfully',
      user: { email, vendorName },
      code: 'success'
    });
  } catch(err: any) {
    console.log(`Error during registration: ${err.message}`);
    return res.status(503).json({ error: 'Internal Server Error', code: 'database' });
  }  
}
