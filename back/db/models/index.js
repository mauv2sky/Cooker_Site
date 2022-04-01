import Sequelize from 'sequelize';
import config from '../config/config';
import User from './schemas/user';
import BossUser from './schemas/bossUser';
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
db.BossUser = BossUser;

User.init(sequelize);
BossUser.init(sequelize);

User.associate(db);
BossUser.associate(db);

export default db;
