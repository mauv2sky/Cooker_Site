import db from '../index';

class BossUser {
  static async create({ newBossUser }) {
    const createdBossUser = await db.bossUser.create(newBossUser);
    return createdBossUser;
  }
  static async findByCeoId({ ceoId }) {
    const boss = await db.bossUser.findOne({
      where: {
        ceoId,
      },
    });
    return boss;
  }
  static async findById({ id }) {
    const boss = await db.bossUser.findOne({
      where: {
        id,
      },
    });
    return boss;
  }
  static async updateBossUser(id, contents) {
    const boss = await db.bossUser.update(contents, {
      where: {
        id,
      },
    });

    return boss;
  }
}

export { BossUser };
