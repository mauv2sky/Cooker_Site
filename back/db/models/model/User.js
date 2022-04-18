import { user } from '../schemas/user';

class User {
  static async create({ newUser }) {
    const createdNewUser = await user.create(newUser);
    return createdNewUser;
  }
}

export { User };
