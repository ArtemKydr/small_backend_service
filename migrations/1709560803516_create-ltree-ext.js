exports.up = (pgm) => {
    pgm.sql('CREATE EXTENSION IF NOT EXISTS ltree;');
};

exports.down = (pgm) => {
    pgm.sql('DROP EXTENSION IF EXISTS ltree;');
};
