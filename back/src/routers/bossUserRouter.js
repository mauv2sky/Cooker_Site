import { Router } from 'express';
import { bossUserController } from '../controllers/bossUserController';
import { login_required } from '../middlewares/login_required';

const bossUserAuthRouter = Router();

/**
 * @swagger
 * /boss/join:
 *  post:
 *    tags:
 *      - bossUser
 *    description: bossUer 회원가입
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/BossUser"
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                  default: true
 *        description: bossUser 회원가입 성공
 */
bossUserAuthRouter.post('/boss/join', bossUserController.register);

/**
 * @swagger
 * /boss/login:
 *  post:
 *    tags:
 *      - bossUser
 *    description: bossUer 로그인
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              ceoId:
 *                type: string
 *              passwd:
 *                type: string
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *                id:
 *                  type: number
 *        description: bossUser 로그인 성공
 */
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
