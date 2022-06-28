import { Router } from 'express';
import { bossUserController } from '../controllers/bossUserController';
import { login_required } from '../middlewares/login_required';

const bossUserAuthRouter = Router();

bossUserAuthRouter.post('/boss/join', bossUserController.register);

bossUserAuthRouter.post('/boss/login', bossUserController.login);

// 사장 유저 정보 가져오기
bossUserAuthRouter.get(
  '/boss/:ceo_id',
  login_required,
  bossUserController.findByCeoId
);

// 사용자 정보 수정하기
bossUserAuthRouter.put(
  '/boss/:id',
  login_required,
  bossUserController.updateBossUserInfo
);
// 사장 정보 삭제하기(탈퇴)
bossUserAuthRouter.delete(
  '/boss/:id',
  login_required,
  bossUserController.deleteBossUser
);

export { bossUserAuthRouter };
