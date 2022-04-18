import Sequelize from 'sequelize';
import config from '../config/config';
import user from './schemas/user';
import bossUser from './schemas/bossUser';
console.log(config);

let sequelize = new Sequelize(config.database, config.user, config.password, config);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

user.init(sequelize);
bossUser.init(sequelize);

user.associate(db);
bossUser.associate(db);

db.user = user;
db.bossUser = bossUser;

export default db;
