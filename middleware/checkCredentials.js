const usersModel = require('../models/users_model');
const AuthError = require('../errors/AuthError');
const NodeCache = require('node-cache');

const tokenCache = new NodeCache({stdTTL: 30, checkperiod: 1}); // 30s by default

const checkCredentials = async (token = ' ') => {
    const user = tokenCache.get(token) || await usersModel.getByToken(token);

    if (!token || !user) {
        throw new AuthError(!token ? 'no token' : 'bad token');
    }

    tokenCache.set(token, user);

    return user;
};



module.exports = async (req, res, next) => {
    const token = req.headers['access-token'] || req.cookies['access-token'] || req.query.token;

    req.user = await checkCredentials(token);

    next();
}
