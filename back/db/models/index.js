import Sequelize from 'sequelize';
import config from '../config/config';
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

db.bossUser = bossUser;
bossUser.init(sequelize);
bossUser.associate(db);

export default db;
