const db = require('../modules/postgres/db');

const getList = () => {
    return db('roles');
};

module.exports = {
    getList,
}
