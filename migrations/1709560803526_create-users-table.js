exports.up = pgm => {
    pgm.createTable('users', {
        id: 'id',
        full_name: { type: 'varchar(64)', notNull: true },
        login: { type: 'varchar(64)', notNull: true },
        password: { type: 'varchar(64)', notNull: true },
        roles: { type: 'integer', notNull: true },
        token: 'varchar(64)',
    });
};

exports.down = pgm => {
    pgm.dropTable('users');
};
