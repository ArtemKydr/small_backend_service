require('dotenv').config();
const envs = process.env;

module.exports = {
    host: envs.APP_HOST || 'localhost',
    port: envs.APP_PORT || 8080,
    logs: envs.LOGS || 'dev'
};
