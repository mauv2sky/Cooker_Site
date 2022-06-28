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

/**
 * @swagger
 * /boss/{ceo_id}:
 *  get:
 *    tags:
 *      - bossUser
 *    description: bossUer 유저 정보 가져오기
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: ceo_id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/BossUser"
 *        description: bossUser 현재 유저 정보 가져오기 성공
 */
// TODO: parameter로 ceo_id 받기 대신 token에서 추출하기
// 사장 유저 정보 가져오기
bossUserAuthRouter.get(
  '/boss/:ceo_id',
  login_required,
  bossUserController.findByCeoId
);

/**
 * @swagger
 * /boss/{id}:
 *  put:
 *    tags:
 *      - bossUser
 *    description: bossUer 유저 정보 수정하기
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: number
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              tel:
 *                type: string
 *              description:
 *                type: string
 *              img:
 *                type: string
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/BossUser"
 *        description: bossUser 현재 유저 정보 수정하기 성공
 */
// 사용자 정보 수정하기
bossUserAuthRouter.put(
  '/boss/:id',
  login_required,
  bossUserController.updateBossUserInfo
);

/**
 * @swagger
 * /boss/{id}:
 *  delete:
 *    tags:
 *      - bossUser
 *    description: bossUer 유저 탈퇴하기
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: number
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
 *        description: bossUser 유저 탈퇴하기 성공
 */
// 사장 정보 삭제하기(탈퇴)
bossUserAuthRouter.delete(
  '/boss/:id',
  login_required,
  bossUserController.deleteBossUser
);

export { bossUserAuthRouter };
