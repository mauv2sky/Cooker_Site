import Sequelize from 'sequelize';
import config from '../config/config';
import User from './schemas/user';
console.log(config);

let sequelize = new Sequelize(
  config.database,
  config.user,
  config.password,
  config
);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
User.init(sequelize);
User.associate(db);

export default db;
