import 'dotenv/config';
import mysql from 'mysql2';

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWD,
  database: 'cooker_site',
});

export default con;
