exports.up = pgm => {
    pgm.sql(`
        INSERT INTO users (full_name, login, password, roles) VALUES
        ('admin', 'admin', '098f6bcd4621d373cade4e832627b4f6', 15)
    `);
};

exports.down = pgm => {
    pgm.sql(`
        DELETE FROM users
        WHERE login IN ('admin');
    `);
};
