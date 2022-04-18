import express from 'express';
import cors from 'cors';
import db from '../db/models';
import { bossUserAuthRouter } from './routers/bossUserRouter';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bossUserAuthRouter);

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log('DB Connected!');
  })
  .catch((err) => {
    console.error(err);
  });

export default app;
