require('dotenv').config();
const envs = process.env;

module.exports = {
    client: 'pg',
    dir: './migrations',
    verbose: true,
    host: envs.DB_HOST || 'localhost',
    port: envs.DB_PORT || 5432,
    database: envs.DB_NAME || 'small_backend_service',
    user: envs.DB_USER || 'postgres',
    password: envs.DB_PASSWORD || '123',
    schema: envs.DB_SCHEMA || 'public',
    migrationsTable: 'migrations',
};
