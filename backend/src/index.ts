import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';

import authRouter from './routes/authRouter.js';

const PORT = process.env.SERVER_PORT || 8080
const ORIGIN = process.env.WEB_ORIGIN;

const app = express();
const corsOptions = {
  origin: [ ORIGIN || 'http://localhost:5173' ]
}

app.use(cors(corsOptions));
app.use(express.json());

app.use('/auth', authRouter);

app.get("/", (req: Request, res: Response) => { 
  res.send(`I finally fucking got it to work`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})