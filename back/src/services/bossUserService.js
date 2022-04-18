import bcrypt from 'bcrypt';
import { BossUser } from '../../db/models/model/BossUser';

class bossUserAuthService {
  static async addBossUser({ ceo_id, passwd, email, tel }) {
    // 이메일 중복 확인
    const bossUser = await BossUser.findByCeoId({ ceo_id });

    if (bossUser) {
      const errorMessage =
        '이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.';
      return { errorMessage };
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(passwd, 10);

    const newBossUser = { ceo_id, passwd: hashedPassword, email, tel };

    // db에 저장
    const createdNewBossUser = await BossUser.create({ newBossUser });
    createdNewBossUser.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.
    return createdNewBossUser;
  }
}

export { bossUserAuthService };
