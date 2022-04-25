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
}

export { BossUser };
