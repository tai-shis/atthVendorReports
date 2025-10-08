import express from 'express';
import app from '../server.js';

// types
import type { Express, Request, Response } from 'express';
// import type User from '../models/userModel.js'

const router = express.Router();

app.post('/register', (req: Request, res: Request) => {
    // Error handle register
    const username: string = req.body.username;
    const password: string = req.body.password;
    const vendorName: string = req.body.vendorName;
});

export default router;