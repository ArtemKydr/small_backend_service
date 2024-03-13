exports.up = pgm => {
    pgm.createTable('roles', {
        id: 'id',
        name: { type: 'varchar(255)', notNull: true },
    });
};

exports.down = pgm => {
    pgm.dropTable('roles');
};
