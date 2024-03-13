const brokenCarsModel = require('../models/broken_cars_model');
const yup = require('yup');
const moment = require('moment');
const CustomError = require('../errors/CustomError');

const MAX_YEAR = moment().year();

const getList = async (params) => {
    const Schema = yup.object({
        color: yup.string().color(),
        description: yup.string(),
        year: yup.number().integer().min(1900).max(MAX_YEAR),
        price: yup.number().min(0),
        firstBrokenDate: yup.date(),
        createdDate: yup.date(),
        bodyId: yup.number().integer().min(0),
        modelId: yup.number().integer().min(0),
        bodyName: yup.string(),
        modelName: yup.string(),
        limit: yup.number().integer().default(20).max(500).positive(),
        offset: yup.number().integer().default(0).min(0),
        sort: yup.array().list().default(['firstBrokenDate|desc']),
    });

    const query = await Schema.validate(params);

    return brokenCarsModel.getList(query);
}

const createData = async (params) => {
   const Schema = yup.object({
        color: yup.string().color().required(),
        description: yup.string().required(),
        year: yup.number().integer().min(1900).max(MAX_YEAR).required(),
        price: yup.number().min(0),
        firstBrokenDate: yup.date(),
        bodyId: yup.number().integer().min(0).required(),
        modelId: yup.number().integer().min(0).required(),
    });

    const query = await Schema.validate(params);

    const { id } = await brokenCarsModel.createRow(query);

    return id;
}

const updateData = async (params) => {
    const Schema = yup.object({
        id: yup.number().min(0).positive().required(),
        color: yup.string().color(),
        description: yup.string(),
        year: yup.number().integer().min(1900).max(MAX_YEAR),
        price: yup.number().min(0),
        firstBrokenDate: yup.date(),
        createdDate: yup.number().timestamp(),
        bodyId: yup.number().integer().min(0),
        modelId: yup.number().integer().min(0),
    });

    const { id, ...query } = await Schema.validate(params);

    const row = await brokenCarsModel.getById(id);

    if (!row) throw new CustomError(`Не удалось найти авто с id=${id}`)

    await brokenCarsModel.updateRow(query)

    return true;
}

const deleteData = async (params) => {
    const Schema = yup.object({
        id: yup.number().min(0).positive().required(),
    });

    const { id } = await Schema.validate(params);

    const row = await brokenCarsModel.getById(id);

    if (!row) throw new CustomError(`Не удалось найти авто с id=${id}`)

    await brokenCarsModel.deleteRow(id)

    return true;
}

const getDetails = async (params) => {
    const Schema = yup.object({
        id: yup.number().min(0).positive().required(),
    });

    const { id } = await Schema.validate(params);

    const row = await brokenCarsModel.getById(id);

    if (!row) throw new CustomError(`Не удалось найти авто с id=${id}`)

    return row;
}

module.exports = {
    getList,
    getDetails,
    createData,
    updateData,
    deleteData
}
