import bcrypt from "bcrypt";
import { BossUser } from "../../db/models/model/BossUser";
import jwt from "jsonwebtoken";

class bossUserAuthService {
    static async addBossUser({ ceoId, passwd, email, tel }) {
        // 이메일 중복 확인
        const bossUser = await BossUser.findByCeoId({ ceoId });

        if (bossUser) {
            const errorMessage =
                "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.";
            return { errorMessage };
        }

        // 비밀번호 해쉬화
        const hashedPassword = await bcrypt.hash(passwd, 10);

        const newBossUser = { ceoId, passwd: hashedPassword, email, tel };

        // db에 저장
        const createdNewBossUser = await BossUser.create({ newBossUser });
        createdNewBossUser.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.
        return createdNewBossUser;
    }
    static async getBossUser({ ceoId, passwd }) {
        const boss = await BossUser.findByCeoId({ ceoId });

        if (!boss) {
            const errorMessage =
                "해당하는 유저가 없습니다. 다시 한번 확인해주세요.";
            return { errorMessage };
        }

        const correctPasswdHash = boss.passwd;
        const isPasswdCorrect = await bcrypt.compare(passwd, correctPasswdHash);
        if (!isPasswdCorrect) {
            const errorMessage =
                "비밀번호가 일치하지 않습니다. 다시 한번 확인해 주세요.";
            return { errorMessage };
        }

        //로그인 성공 -> JWT 토큰 발급
        const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
        const token = jwt.sign({ boss_id: boss.id }, secretKey);

        const loginBossUser = {
            token,
            id: boss.id,
        };

        return loginBossUser;
    }
}

export { bossUserAuthService };
