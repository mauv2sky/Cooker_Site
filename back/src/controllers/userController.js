import is from '@sindresorhus/is';
import nodemailer from 'nodemailer';
import { userAuthService } from '../services/userService';

class userController {
    static async userRegister(req, res, next) {
        try {
            // req 형식 및 데이터 유무 확인
            if (is.emptyObject(req.body)) {
                throw new Error('headers의 Content-Type을 application/json으로 설정해 주세요.');
            }

            const userId = req.body.userId;
            const passwd = req.body.passwd;
            const email = req.body.email;
            const tel = req.body.tel;

            const newUser = await userAuthService.addUser({
                userId,
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

    static async userLogin(req, res, next) {
        try {
            const userId = req.body.userId;
            const passwd = req.body.passwd;

            const user = await userAuthService.getUser({
                userId,
                passwd,
            });

            if (user.errorMessage) {
                throw new Error(user.errorMessage);
            }

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    static async findByUserId(req, res, next) {
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
    }

    static async setUserInfo(req, res, next) {
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
    }

    static async getCurrentUser(req, res, next) {
        try {
            const userId = req.currentUserId;
            const currentUserInfo = await userAuthService.getUserInfo({ userId });

            if (currentUserInfo.errorMessage) {
                throw new Error(currentUserInfo.errorMessage);
            }

            res.status(200).json(currentUserInfo);
        } catch (error) {
            next(error);
        }
    }

    static async deleteAccount(req, res, next) {
        try {
            const id = req.params.id;

            const deletedUser = await userAuthService.deleteUser({ id });

            if (deletedUser.errorMessage) {
                throw new Error(deletedUser.errorMessage);
            }

            res.status(200).json({ ok: true });
        } catch (error) {
            next(error);
        }
    }

    static async resetPasswd(req, res, next) {
        try {
            const email = req.body.email;

            const generatedAuthNumber = Math.floor(Math.random() * 10 ** 8)
                .toString()
                .padStart(8, '0');

            const toUpdate = { passwd: generatedAuthNumber };
            const resetedPasswd = await userAuthService.setPasswd({
                email,
                toUpdate,
            });

            if (resetedPasswd.errorMessage) {
                throw new Error(resetedPasswd.errorMessage);
            }

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: process.env.NODEMAILER_USER,
                    pass: process.env.NODEMAILER_PASS,
                },
            });

            let info = await transporter.sendMail({
                from: `Cooker-site <${process.env.NODEMAILER_USER}>`,
                to: email,
                subject: '비밀번호 변경 안내 메일입니다.',
                html: `<b>${generatedAuthNumber}</b>`,
            });

            console.log(`Email sent: ${info.messageId}`);

            res.status(200).json({
                ok: true,
            });
        } catch (error) {
            next(error);
        }
    }
}

export { userController };
