import is from '@sindresorhus/is';
import { Router } from 'express';
import { userAuthService } from '../services/userService';
import { login_required } from '../middlewares/login_required';

const userAuthRouter = Router();

// 유저 회원가입
userAuthRouter.post('/user/join', async (req, res, next) => {
  // req 형식 및 데이터 유무 확인
  try {
    if (is.emptyObject(req.body)) {
      throw new Error('headers의 Content-Type을 application/json으로 설정해 주세요.');
    }

    // req 데이터 가져오기
    const userId = req.body.userId;
    const passwd = req.body.passwd;

    const newUser = await userAuthService.addUser({
      userId,
      passwd,
    });

    if (newUser.errorMessage) {
      throw new Error(newUser.errorMessage);
    }

    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    next(error);
  }
});

// 유저 로그인
userAuthRouter.post('/user/login', async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const passwd = req.body.passwd;

    const user = await userAuthService.getUser({ userId, passwd });

    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// 프로필 보기
userAuthRouter.get('/user/:userId', login_required, async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const userInfo = await userAuthService.getUserInfo({ userId });

    if (userInfo.errorMessage) {
      throw new Error(userInfo.errorMessage);
    }

    res.status(200).json(userInfo);
  } catch (error) {
    next(error);
  }
});

// 내 프로필 수정
userAuthRouter.put('/user/:id', login_required, async (req, res, next) => {
  try {
    const id = req.params.id;

    const contents = { ...req.body };

    const updatedUser = await userAuthService.setUser({ id, contents });

    if (updatedUser.errorMessage) {
      throw new Error(updatedUser.errorMessage);
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// 계정 삭제
userAuthRouter.delete('/user/:id', login_required, async (req, res, next) => {
  try {
    const id = req.params.id;

    const deletedUser = await userAuthService.deleteUser({ id });

    if (deletedUser.errorMessage) {
      throw new Error(deletedUser.errorMessage);
    }

    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    next(error);
  }
});

export { userAuthRouter };
