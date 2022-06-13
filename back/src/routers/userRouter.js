import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { userController } from '../controllers/userController';

const userAuthRouter = Router();

// 유저 회원가입
userAuthRouter.post('/user/join', userController.userRegister);

// 유저 로그인
userAuthRouter.post('/user/login', userController.userLogin);

// 프로필 보기
userAuthRouter.get(
  '/user/:userId',
  login_required,
  userController.findByUserId
);

// 프로필 수정
userAuthRouter.put('/user/:id', login_required, userController.setUserInfo);

// 내 정보 보기
userAuthRouter.get(
  '/currentUser',
  login_required,
  userController.getCurrentUser
);

// 계정 삭제
userAuthRouter.delete(
  '/user/:id',
  login_required,
  userController.deleteAccount
);

// 비밀번호 찾기
userAuthRouter.post('/user/reset_passwd', userController.resetPasswd);

export { userAuthRouter };
