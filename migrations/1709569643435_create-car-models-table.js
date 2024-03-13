exports.up = pgm => {
    pgm.createTable('car_models', {
        id: 'id',
        name: { type: 'varchar(255)', notNull: true },
        parent: 'ltree'
    });
};

exports.down = pgm => {
    pgm.dropTable('car_models');
};
