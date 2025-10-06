import express from 'express';
const app = express();

const PORT = process.env.SERVER_PORT;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hallo world!');
}); 

// Routes go here
// app.use('/foo', fooRoute);


// Start up the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}` );
});