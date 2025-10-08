import express from 'express';
import cors from 'cors';

// Route imports
import authRoutes from './routes/authRoutes.js';

const PORT = process.env.SERVER_PORT;
const ORIGIN = process.env.WEB_ORIGIN;
const app = express();
const corsOptions = {
  origin: [ ORIGIN || 'http://localhost:5173' ]
}

app.use(cors(corsOptions));
app.use(express.json());

// Routes go here
// app.use('/foo', fooRoute);
app.use('/auth', authRoutes);


app.get('/', (req, res) => {
  res.send('hallo world!');
}); 

// Start up the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}` );
});

export default app; 