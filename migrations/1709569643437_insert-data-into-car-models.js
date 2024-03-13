exports.up = pgm => {
    pgm.sql(`
            -- Бренды (уровень 1)
        INSERT INTO car_models (name, parent) VALUES 
        ('Toyota', NULL),
        ('Honda', NULL),
        ('Ford', NULL),
        ('Chevrolet', NULL),
        ('Nissan', NULL);
        
        -- Модели (уровень 2)
        INSERT INTO car_models (name, parent) VALUES 
        ('Camry', 'Toyota'),
        ('Corolla', 'Toyota'),
        ('Civic', 'Honda'),
        ('Accord', 'Honda'),
        ('Fusion', 'Ford'),
        ('Escape', 'Ford'),
        ('Malibu', 'Chevrolet'),
        ('Cruze', 'Chevrolet'),
        ('Altima', 'Nissan'),
        ('Maxima', 'Nissan');
    `);
};

exports.down = pgm => {
    pgm.sql(`
        DELETE FROM car_models
        WHERE name IN (
            'Camry',
            'Corolla',
            'F-50',
            'Civic',
            'Malibu',
            '3 Series',
            'E-Class',
            'Passat',
            'A4',
            'Altima',
            'Sonata',
            'Corolla Hybrid',
            'Accord',
            'Cruze',
            'X5',
            'GLC',
            'Jetta',
            'A6',
            'Maxima',
            'Palisade',
            'Camry Hybrid'
        );
    `);
};

