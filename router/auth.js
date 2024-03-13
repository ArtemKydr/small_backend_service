const express = require('express');
const authController = require('../controllers/authController');
const checkCredentials = require('../middleware/checkCredentials');
const router  = express.Router();
const ms = require('ms');

/**
 * @api {post} /auth/login Вход пользователя
 * @apiName AuthLogin
 * @apiGroup Auth
 * @apiVersion 0.1.0
 * @apiDescription Авторизует пользователя по логину и паролю. При успешном выполнении возвращает token и устанавливает его в
 * cookies с именем access-token
 *
 * @apiParam {String} login логин пользователя
 * @apiParam {String} password пароль пользователя
 *
 * @apiExample Пример Curl-запроса:
 * curl --location 'http://localhost:8080/auth/login' \
 * --header 'Content-Type: application/json' \
 * --data '{
 *     "login": "admin",
 *     "password": "test"
 * }'
 *
 * @apiSuccessExample Успешный ответ:
 *     HTTP/1.1 200 OK
 *     {
 *       "token": "717ca6b03b4ec38ef2bec9b6841e891a08bbde2b",
 *       "success": true
 *     }
 *
 * @apiErrorExample Неверный логин или пароль:
 *     HTTP/1.1 401 OK
 *     {
 *       "success": false,
 *       "error": "Неверно указаны логин или пароль пользователя"
 *     }
 * @apiErrorExample Устаревший токен доступа:
 *     HTTP/1.1 401 OK
 *     {
 *       "success": false,
 *       "error": "bad token"
 *     }
 */
router.post('/login', async (req, res) => {
    const user = await authController.login(req.body);

    const options = {
        maxAge: ms('30d'),
        // httpOnly: true,
        signed: false
    };

    res.cookie('access-token', user.token, options);

    res.sendSuccess({ token: user.token });
});

/**
 * @api {post} /auth/logout Выйти
 * @apiName AuthLogout
 * @apiGroup Auth
 * @apiVersion 0.1.0
 * @apiDescription Удаляет cookies и сессию текущего пользователя
 *
 */
router.post('/logout', checkCredentials, async (req, res) => {
    if(!req.user) return res.sendStatus(400);

    await authController.logout(req.user.token);
    res.clearCookie('access-token');

    res.sendStatus(200);
});

module.exports = router;
