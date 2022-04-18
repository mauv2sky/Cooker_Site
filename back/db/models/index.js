import Sequelize from 'sequelize';
import config from '../config/config';
import BossUserModel from './schemas/bossUser';
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

db.BossUserModel = BossUserModel;
BossUserModel.init(sequelize);
BossUserModel.associate(db);

export default db;
