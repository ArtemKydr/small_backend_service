exports.up = pgm => {
    pgm.sql(`
        INSERT INTO roles (id, name) VALUES
        (1, 'ROLE_LIST_VIEW'),
        (2, 'ROLE_ADD'),
        (4, 'ROLE_EDIT'),
        (8, 'ROLE_DELETE');
    `);
};

exports.down = pgm => {
    pgm.sql(`
        DELETE FROM roles
        WHERE name IN ('ROLE_LIST_VIEW', 'ROLE_ADD', 'ROLE_EDIT', 'ROLE_DELETE');
    `);
};
