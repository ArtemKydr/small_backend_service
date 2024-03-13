const { getRandomColor, getRandomDate } = require('../modules/utils');

exports.up = async (pgm) => {
    pgm.sql(`
        INSERT INTO broken_cars (
            color,
            description,
            year,
            price,
            first_broken_date,
            created_date,
            body_id,
            model_id,
            image,
            blob
        ) VALUES
        ${Array.from({ length: 50 }, (_, index) => {
            const modelId = Math.floor(Math.random() * 15) + 1;
            const bodyId = Math.floor(Math.random() * 10) + 1;
            const year = Math.floor(Math.random() * (2024 - 1990 + 1)) + 1990;
            const price = (Math.random() * 50000).toFixed(2);
            const base64Image = Buffer.from(`Image ${index + 1}`).toString('base64');
            const color = getRandomColor();
            const firstBrokenDate = getRandomDate('1990-01-01', '2024-01-01', 'YYYY-MM-DD');
            const lastServiceDate = getRandomDate('2022-01-01', '2024-01-01', 'YYYY-MM-DD HH:mm:ss');       
            
            return `
                (
                    '${color}',
                    'Description${index + 1}',
                    ${year},
                    ${price},
                    '${firstBrokenDate}',
                    '${lastServiceDate}',
                    ${bodyId},
                    ${modelId},
                    'https://example.com/image${modelId}.jpg',
                    E'\\\\x${Buffer.from(base64Image, 'base64').toString('hex')}'
                )
            `;
        }).join(',\n')};
    `);
};

exports.down = (pgm) => {
    pgm.sql(`
        DELETE FROM broken_cars;
    `);
};
