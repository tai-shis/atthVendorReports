import express from 'express';
import type { Request, Response } from 'express';

const PORT = process.env.SERVER_PORT || 8080
const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("I finally fucking got it to work");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})