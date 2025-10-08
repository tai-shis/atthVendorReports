import { SquareClient } from "square";

export const client = new SquareClient({
  token: process.env.SQUARE_TOKEN,
});
