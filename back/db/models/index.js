import Sequelize from 'sequelize';
import config from '../config/config';
import user from './schemas/user';

let sequelize = new Sequelize(config.database, config.user, config.password, config);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

user.init(sequelize);

user.associate(db);

db.User = user;

export default db;
