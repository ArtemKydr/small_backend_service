exports.up = pgm => {
    pgm.createTable('broken_cars', {
        id: 'id',
        color: { type: 'varchar(255)', notNull: true },
        description: 'text',
        year: { type: 'integer', notNull: true },
        price: 'numeric',
        first_broken_date: 'date',
        created_date: { type: 'timestamp', default: pgm.func('current_timestamp'), notNull: true },
        body_id: { type: 'integer', references: 'car_bodies', notNull: true },
        model_id: { type: 'integer', references: 'car_models', notNull: true },
        image: 'varchar(255)',
        blob: 'bytea',
        is_active: { type: 'boolean', default: true },
    });
};

exports.down = pgm => {
    pgm.dropTable('broken_cars');
};
