import { User } from '../../db/models/model/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class userAuthService {
    // 계정 생성하기
    static async addUser({ userId, passwd, email, tel }) {
        const user = await User.findByUserId(userId);
        if (user) {
            const errorMessage = '중복된 아이디입니다. 다른 아이디를 입력해 주세요.';
            return { errorMessage };
        }

        const hashedPasswd = await bcrypt.hash(passwd, 10);

        const newUser = { userId, passwd: hashedPasswd, email, tel };

        const createdNewUser = await User.create(newUser);
        createdNewUser.errorMessage = null;

        return createdNewUser;
    }

    // 로그인을 위한 유저정보 가져오기
    static async getUser({ userId, passwd }) {
        const user = await User.findByUserId(userId);
        if (!user) {
            const errorMessage = '존재하지 않는 아이디입니다. 다시 확인해 주세요.';
            return { errorMessage };
        }

        const correctPasswdHash = user.passwd;
        const isPasswdCorrect = await bcrypt.compare(passwd, correctPasswdHash);
        if (!isPasswdCorrect) {
            const errorMessage = '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.';
            return { errorMessage };
        }

        // 로그인 성공 -> JWT 웹 토큰 생성
        const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
        const token = jwt.sign({ user_id: user.id }, secretKey);

        const loginUser = {
            token,
            id: user.id,
        };

        return loginUser;
    }

    // (userId) 유저 정보 가져오기
    static async getUserInfo({ userId }) {
        const user = await User.findByUserId(userId);

        if (!user) {
            const errorMessage = '해당 유저가 존재하지 않습니다. 다시 한 번 확인해 주세요.';
            return { errorMessage };
        }

        return user;
    }

    // 유저 정보 수정하기
    static async setUser({ id, contents }) {
        let user = await User.findById(id);

        if (!user) {
            const errorMessage = '해당 유저가 존재하지 않습니다. 다시 한 번 확인해 주세요.';
            return { errorMessage };
        }

        const { userId, email, passwd, tel, description, img } = contents;
        const toUpdate = {
            ...(userId && { userId }),
            ...(email && { email }),
            ...(passwd && {
                passwd: await bcrypt.hash(contents.passwd, 10),
            }),
            ...(tel && { tel }),
            ...(description && description),
            ...(img && { img }),
        };

        let ok = await User.updateUser(id, toUpdate);

        if (!ok) {
            const errorMessage = '데이터 형식이 올바르지 않습니다. 다시 확인해 주세요.';
            return { errorMessage };
        }

        const updatedUser = await User.findById(id);
        updatedUser.errorMessage = null;
        return updatedUser;
    }

    // 계정 삭제하기
    static async deleteUser({ id }) {
        const user = await User.findById(id);

        if (!user) {
            if (!user) {
                const errorMessage = '해당 유저가 존재하지 않습니다. 다시 한 번 확인해 주세요.';
                return { errorMessage };
            }
        }

        const ok = await User.deleteUser(id);

        if (!ok) {
            const errorMessage = '데이터 형식이 올바르지 않습니다. 다시 확인해 주세요.';
            return { errorMessage };
        }

        return { ok };
    }

    // 비밀번호 재설정하기
    static async setPasswd({ email, toUpdate }) {
        let user = await User.findByEmail(email);

        if (!user) {
            const errorMessage = '존재하지 않는 사용자 입니다. 다시 한 번 확인해 주세요.';
            return { errorMessage };
        }

        if (toUpdate.passwd) {
            const hashedPasswd = await bcrypt.hash(toUpdate.passwd, 10);
            const newPasswd = { passwd: hashedPasswd };

            let ok = await User.updateUser(user.id, newPasswd);

            if (!ok) {
                const errorMessage = '데이터 형식이 올바르지 않습니다. 다시 확인해 주세요.';
                return { errorMessage };
            }

            return { ok };
        }
    }
}

export { userAuthService };
