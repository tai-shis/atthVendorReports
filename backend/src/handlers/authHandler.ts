import { 
  userExists,
  insertUser, 
  checkPassword, 
  getUser 
} from '../services/users.js';
import { vendorExists } from '../services/vendors.js';
import { createToken } from '../services/tokens.js'
import { User } from '../models/user.js';

import { genSaltSync, hashSync } from 'bcrypt';

import type { Request, Response } from 'express';

function validateEmail(email: string): boolean {
  const emailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// theres probably a vuln for sql injection in vendorName but im laaaazyyyyyy 
// (about 30 minutes before i wrote the below function)
function validateVendorID(vendor_id: string): boolean {
  // Haha bitches! I'm no longer lazy 
  const vendorIDPattern: RegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return vendorIDPattern.test(vendor_id);
}

export async function register(req: Request, res: Response) {
  const email: string | undefined = req.body.email;
  const password: string | undefined = req.body.password;
  const vendor_id: string | undefined = req.body.vendor_id;


  // Ensure that all parameters exist blah blah blah
  if(!email) {
    return res.status(400).json({ error: 'Email is required'});
  }

  // Catch injection/invalid
  if(!validateEmail(email)) {
    return res.status(400).json({ error: 'Email contains invalid characters' })
  }
  
  if(!password) {
    return res.status(400).json({ error: 'Password is required'});  
  }
  
  if(password.length <= 4) {
    return res.status(400).json({ error: 'Password length is too short'})
  } 
  
  if(!vendor_id) {
    return res.status(400).json({ error: 'Vendor name is required'});
  } 

  if(!validateVendorID(vendor_id)) {
    return res.status(400).json({ error: 'doin something suspicious with the vendor id?'})
  }
  
  try {
    // This will only catch if someone is trying to inject sql, or is changing the vendor id
    if(!vendorExists(vendor_id)) {
      return res.status(400).json({ error: 'Vendor does not exist'})
    }
    
    const exists: boolean = await userExists(email);
    if (exists) {
      return res.status(403).json({ error: `${email} is already registered`})
    }
    
    // Salt(and (not actually)pepper) that hash(brown) baby
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);

    // TODO remove salt from store
    const id = crypto.randomUUID();
    await insertUser(id, email, hash, vendor_id);
    return res.status(200).json({
      message: 'User registered successfully',
      user: { email, vendor_id },
    });
  } catch(err: any) {
    console.log(`Error during registration: ${err.message}`);
    return res.status(503).json({ error: 'Internal Server Error'});
  }  
}

export async function login(req: Request, res: Response) {
  const email: string | undefined = req.body.email;
  const password: string | undefined = req.body.password;

  // Ensure that all parameters exist blah blah blah
  if(!email) {
    return res.status(400).json({ error: 'Email is required'});
  }

  // Catch injection/invalid
  if(!validateEmail(email)) {
    return res.status(400).json({ error: 'Email contains invalid characters'})
  }

  if(!password) {
    return res.status(400).json({ error: 'Password is required'});  
  }
  
  // Bleh
  try {
    // God, i need to remember to (a)wait when im checking stuff
    const emailValid: boolean = await userExists(email);
    if(!emailValid) {
      return res.status(400).json({ error: 'Unknown Email or Password'})
    }

    // okay, now we can check the password
    const passwordValid: boolean = await checkPassword(email, password); 
    if (!passwordValid) {
      return res.status(400).json({ error: 'Unknown Email or Password'})
    }
    
    // if we get to here, we now give user a valid session
    // first, lets fetch the vendor name
    const { id, vendorID, vendorName}: Partial<User> = await getUser(email);
    const authToken: string = createToken(id!, email, vendorID!, vendorName!);

    // boom, we all good baby
    return res.status(200).json({ 
      message: 'Logged in successfully',
      authToken: authToken,
    })

  } catch(err: any) {
    console.log(`Error duing login: ${err.message}`)
    return res.status(503).json({ error: 'Internal Server Error'});
  }
}