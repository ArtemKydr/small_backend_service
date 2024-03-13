exports.up = pgm => {
    pgm.sql(`
        INSERT INTO car_bodies (name) VALUES
            ('Sedan'),
            ('SUV'),
            ('Coupe'),
            ('Hatchback'),
            ('Convertible'),
            ('Wagon'),
            ('Truck'),
            ('Van'),
            ('Crossover'),
            ('Minivan');
    `);
};

exports.down = pgm => {
    pgm.sql(`
        DELETE FROM car_bodies
        WHERE name IN (
            'Sedan',
            'SUV',
            'Coupe',
            'Hatchback',
            'Convertible',
            'Wagon',
            'Truck',
            'Van',
            'Crossover',
            'Minivan'
        );
    `);
};
