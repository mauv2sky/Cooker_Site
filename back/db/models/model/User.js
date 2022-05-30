import db from '../../models';
const user = db.user;

class User {
  static async create(newUser) {
    return await user.create(newUser);
  }

  static async findByUserId(userId) {
    return await user.findOne({ where: { userId } });
  }

  static async findById(id) {
    return await user.findByPk(id);
  }

  static async findByEmail(email) {
    return await user.findOne({ where: { email } });
  }

  static async updateUser(id, contents) {
    return await user.update(contents, { where: { id } });
  }

  static async deleteUser(id) {
    return await user.destroy({ where: { id } });
  }

  static async setPasswd(id, newPasswd) {
    return await user.update(newPasswd, { where: { id } });
  }
}

export { User };
