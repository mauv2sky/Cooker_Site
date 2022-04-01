require('dotenv').config();
const env = process.env;

const development = {
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_DB,
  username: env.DB_USER,
  password: env.DB_PASSWD,
  dialect: 'mysql',
};

const production = {
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_DB,
  username: env.DB_USER,
  password: env.DB_PASSWD,
  dialect: 'mysql',
};

const test = {
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_DB,
  username: env.DB_USER,
  password: env.DB_PASSWD,
  dialect: 'mysql',
};

module.exports = { development, test, production };
