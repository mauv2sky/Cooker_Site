import 'dotenv/config';
import mysql from 'mysql';

const DB_USER = process.env.DB_USER;
const DB_PASSWD = process.env.DB_PASSWD;

const con = mysql.createConnection({
  host: 'localhost',
  user: DB_USER,
  password: DB_PASSWD,
  database: 'cooker_site',
});

con.connect((err) => {
  if (err) throw err;
  console.log('DB Connected!');
});

export default con;
