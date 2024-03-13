const db = require('../modules/postgres/db');
const {
    getQuery,
    getOrders,
    applyQueryConditions
} = require('../modules/postgres/helpers');

const getList = (params) => {
    const { limit, offset, sort } = params;
    delete params.limit;
    delete params.offset;
    delete params.sort;

    const query = getQuery(params);
    const orders = getOrders(sort);

    return db('data_list_details_view')
        .where({ isActive: true })
        .offset(offset)
        .limit(limit)
        .orderBy(orders)
        .modify((queryBuilder) => {
            applyQueryConditions(queryBuilder, query);
        });
};

const createRow = (data) => {
    return db('broken_cars')
        .insert(data)
        .returning('id')
        .then(([id]) => id);
};

const updateRow = (id, params) => {
    const data = getQuery(params);

    return db('broken_cars').update({data}).where({id});
};

const deleteRow = (id) => {
    return db('broken_cars').update({isActive: false}).where({id});
};

const getById = (id) => {
    return db('data_list_details_view').where({id, isActive: true}).first();
};

module.exports = {
    getList,
    getById,
    createRow,
    updateRow,
    deleteRow,
}
