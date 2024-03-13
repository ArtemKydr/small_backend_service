const NodeCache = require('node-cache');
const yup = require('yup');
const usersModel = require('../models/users_model');
const AuthError = require('../errors/AuthError');
const utils = require('../modules/utils');

const tokenCache = new NodeCache({stdTTL: 30, checkperiod: 1}); // 30 secs by default

const login = async (params) => {
    const Schema = yup.object({
        login: yup.string().required(),
        password: yup.string().required(),
    });

    const { login, password } = await Schema.validate(params);

    const user = await usersModel.checkUserByLogin(login.trim(), password.trim());
    if(!user) throw new AuthError('Неверно указаны имя или пароль пользователя');

    user.token = utils.makeToken();

    await usersModel.update(user.id, { token: user.token });

    tokenCache.set(user.id, user.token);

    return user;
}

const logout = async (token) => {
    tokenCache.del(token);

    return true;
}

module.exports = {
    login,
    logout,
}
