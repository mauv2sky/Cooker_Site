import express from 'express';
import cors from 'cors';
import db from '../db/models';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log('DB Connected!');
  })
  .catch((err) => {
    console.error(err);
  });

app.get('/', (req, res) => {
  res.send('Hello world!');
});

export default app;
