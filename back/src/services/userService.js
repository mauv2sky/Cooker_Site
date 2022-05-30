import { User } from '../../db/models/model/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class userAuthService {
  static async addUser({ userId, passwd, email, tel }) {
    // 아이디 중복 확인
    const user = await User.findByUserId(userId);
    if (user) {
      const errorMessage = '중복된 아이디입니다. 다른 아이디를 입력해 주세요.';
      return { errorMessage };
    }

    // 비밀번호 해시화
    const hashedPasswd = await bcrypt.hash(passwd, 10);

    // db에 저장할 유저 객체 생성
    const newUser = { userId, passwd: hashedPasswd, email, tel };

    // db에 저장
    const createdNewUser = await User.create(newUser);
    createdNewUser.errorMessage = null;

    return createdNewUser;
  }

  static async getUser({ userId, passwd }) {
    // db에 해당 아이디 존재 여부 확인
    const user = await User.findByUserId(userId);
    if (!user) {
      const errorMessage = '존재하지 않는 아이디입니다. 다시 확인해 주세요.';
      return { errorMessage };
    }

    // 비밀번호 일치 여부 확인
    const correctPasswdHash = user.passwd;
    const isPasswdCorrect = await bcrypt.compare(passwd, correctPasswdHash);
    if (!isPasswdCorrect) {
      const errorMessage = '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
    const token = jwt.sign({ user_id: user.id }, secretKey);

    // 반환할 loginUser 객체를 위한 변수 설정
    const loginUser = {
      token,
      id: user.id,
    };

    return loginUser;
  }

  static async getUserInfo({ userId }) {
    const user = await User.findByUserId(userId);

    if (!user) {
      const errorMessage = '해당 유저가 존재하지 않습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    return user;
  }

  static async setUser({ id, contents }) {
    let user = await User.findById(id);

    if (!user) {
      const errorMessage = '해당 유저가 존재하지 않습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }
    if (contents.passwd) {
      contents.passwd = await bcrypt.hash(contents.passwd, 10);
    }
    let ok = await User.updateUser(id, contents);

    if (!ok) {
      const errorMessage = '데이터 형식이 올바르지 않습니다. 다시 확인해 주세요.';
      return { errorMessage };
    }

    const updatedUser = await User.findById(id);
    updatedUser.errorMessage = null;
    return updatedUser;
  }

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
