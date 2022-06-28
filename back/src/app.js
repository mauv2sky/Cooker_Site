import express from 'express';
import cors from 'cors';
import db from '../db/models';
import { swaggerUi, specs } from './utils/swagger';
import { userAuthRouter } from './routers/userRouter';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { bossUserAuthRouter } from './routers/bossUserRouter';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bossUserAuthRouter);

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log('✅ DB Connected!');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(userAuthRouter);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));

app.use(errorMiddleware);

export default app;
