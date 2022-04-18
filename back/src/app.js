import express from 'express';
import cors from 'cors';
import db from '../db/models';
import { userAuthRouter } from './routers/userRouter';
import { errorMiddleware } from './middlewares/errorMiddleware';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello world!');
});

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log('✅ DB Connected!');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(userAuthRouter);

app.use(errorMiddleware);

export default app;
