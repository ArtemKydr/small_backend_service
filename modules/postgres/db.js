const config = require('../../config/pg');
const knexPlugin = require('knex-case-converter-plugin');

const client = require('knex')({
    client: 'pg',
    connection: config,
    postProcessResponse: knexPlugin.postProcessResponse,
    wrapIdentifier: knexPlugin.wrapIdentifier
});

module.exports = client;
