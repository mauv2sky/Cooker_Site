import 'dotenv/config';
const env = process.env;

export default {
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_DB,
  user: env.DB_USER,
  password: env.DB_PASSWD,
  dialect: 'mysql',
};
