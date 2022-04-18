import db from '../../models';
const user = db.User;

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

  static async updateUser(id, contents) {
    return await user.update(contents, { where: { id } });
  }

  static async deleteUser(id) {
    return await user.destroy({ where: { id } });
  }
}

export { User };
