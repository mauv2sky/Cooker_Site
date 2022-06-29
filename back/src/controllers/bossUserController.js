import is from '@sindresorhus/is';
import { bossUserAuthService } from '../services/bossUserService';

class bossUserController {
  static async register(req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요'
        );
      }

      // req (request) 에서 데이터 가져오기
      const ceoId = req.body.ceoId;
      const passwd = req.body.passwd;
      const email = req.body.email;
      const tel = req.body.tel;

      // 위 데이터를 유저 db에 추가하기
      const newUser = await bossUserAuthService.addBossUser({
        ceoId,
        passwd,
        email,
        tel,
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
  }

  static async login(req, res, next) {
    try {
      const ceoId = req.body.ceoId;
      const passwd = req.body.passwd;

      const boss = await bossUserAuthService.getBossUser({ ceoId, passwd });

      if (boss.errorMessage) {
        throw new Error(boss.errorMessage);
      }

      res.status(200).json(boss);
    } catch (error) {
      next(error);
    }
  }

  static async findByCeoId(req, res, next) {
    try {
      const ceoId = req.params.ceo_id;

      const boss = await bossUserAuthService.getBossUserInfo({ ceoId });

      if (boss.errorMessage) {
        throw new Error(boss.errorMessage);
      }

      res.status(200).json(boss);
    } catch (error) {
      next(error);
    }
  }

  static async updateBossUserInfo(req, res, next) {
    try {
      const id = req.params.id;

      const contents = { ...req.body };

      const boss = await bossUserAuthService.setBossUser({
        id,
        contents,
      });

      if (boss.errorMessage) {
        throw new Error(boss.errorMessage);
      }

      res.status(200).json(boss);
    } catch (error) {
      next(error);
    }
  }

  static async deleteBossUser(req, res, next) {
    try {
      const id = req.params.id;

      const boss = await bossUserAuthService.deleteBossUser({ id });

      if (boss.errorMessage) {
        throw new Error(boss.errorMessage);
      }

      res.status(200).json({
        ok: true,
      });
    } catch (error) {
      next(error);
    }
  }
}

export { bossUserController };
