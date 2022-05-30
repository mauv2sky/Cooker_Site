import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { bossUserAuthService } from '../services/bossUserService';

const bossUserAuthRouter = Router();

bossUserAuthRouter.post('/boss/join', async function (req, res, next) {
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
});

bossUserAuthRouter.post('/boss/login', async (req, res, next) => {
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
});

// 사장 유저 정보 가져오기
bossUserAuthRouter.get(
  '/boss/:ceo_id',
  login_required,
  async (req, res, next) => {
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
);

// 사용자 정보 수정하기
bossUserAuthRouter.put('/boss/:id', login_required, async (req, res, next) => {
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
});

export { bossUserAuthRouter };
