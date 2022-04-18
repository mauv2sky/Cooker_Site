import Sequelize from 'sequelize';
import config from '../config/config';
import User from './schemas/user';
import bossUser from './schemas/bossUser';
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
db.bossUser = bossUser;

User.init(sequelize);
bossUser.init(sequelize);

User.associate(db);
bossUser.associate(db);

export default db;
