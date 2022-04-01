import express from 'express';
import cors from 'cors';
import con from './db';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

con.connect((err) => {
  if (err) throw err;
  console.log('DB Connected!');
});

app.get('/', (req, res) => {
  res.send('Hello world!');
});

export default app;
