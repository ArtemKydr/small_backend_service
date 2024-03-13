const _ = require('lodash');

const getQuery = (params) => {
    const data = {};

    for (const key in params) {
        if (!_.isNil(params[key]) && params[key] !== "") {
            data[key] = params[key];
        }
    }

    return data;
};

const getOrders = (params) => {
    return params.map(field => {
        const [column, order] = field.split('|'); // Разделяем имя поля и порядок сортировки
        return {column, order: order || 'desc'}; // По умолчанию 'desc', если порядок не указан
    })
}

const applyQueryConditions = (queryBuilder, query) => {
    for (const key in query) {
        if (typeof query[key] === 'string') {
            queryBuilder.where(key, 'ILIKE', `%${query[key]}%`);
        } else {
            queryBuilder.where(key, query[key]);
        }
    }
};

module.exports ={
    getQuery,
    getOrders,
    applyQueryConditions
}
