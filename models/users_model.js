const utils = require('../modules/utils');
const db = require('../modules/postgres/db');

const getByLogin = (login) => {
    return db('users')
        .where('login', 'ILIKE', login)
        .first();
};

const update = (id, data) => {
    return db('users').where({ id }).update(data);
};

const getById = (id) => {
    return db('users').where({id}).first();
};

const getByToken = (token) => {
    return db('users')
        .where({ token })
        .first();
};

const checkUserByLogin = async (login, password) => {
    const user = await getByLogin(login);
    if(!user) return false;

    const md5Test = utils.md5(password) === user.password;
    const sha1Test = utils.makePasswordHash(password) === user.password;

    return (md5Test || sha1Test) ? user : false;
};

module.exports = {
    checkUserByLogin,
    getByToken,
    getById,
    getByLogin,
    update
}
