import db from '../index';

class BossUser {
  static async create({ newBossUser }) {
    const createdBossUser = await db.bossUser.create(newBossUser);
    return createdBossUser;
  }
  static async findByCeoId({ ceo_id }) {
    const boss = await db.bossUser.findOne({
      where: {
        ceo_id,
      },
    });
    return boss;
  }
}

export { BossUser };
