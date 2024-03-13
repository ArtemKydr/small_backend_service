exports.up = pgm => {
    pgm.sql(`
        CREATE OR REPLACE VIEW data_list_details_view AS
        SELECT
            bc.id,
            bc.color,
            bc.description,
            bc.year,
            bc.price,
            bc.first_broken_date,
            bc.created_date,
            bc.body_id,
            bc.model_id,
            bc.image,
            bc.blob,
            bc.is_active,
            cm.name AS model_name,
            cb.name AS body_name
        FROM
            broken_cars bc
        LEFT JOIN
            car_models cm ON cm.id = bc.model_id
        LEFT JOIN
            car_bodies cb ON cb.id = bc.body_id;
    `);
};

exports.down = pgm => {
    pgm.sql(`
        DROP VIEW IF EXISTS "public.data_list_details_view";
    `);
};
