const { ValidationError } = require('yup');
const { decode } = require('../modules/utils');
const yup = require('yup');
const moment = require('moment');

const validatePage = async (userRoles, targetRole) => {
    const errorMessage = 'У пользователя нет необходимой роли для доступа к этой странице';

    const userRolesArr = decode(userRoles);

    if (!userRolesArr.includes(targetRole)) {
        throw new ValidationError(errorMessage);
    }

    return true;
}

const validateSortColumns = (sortColumns, sortBy) => {
    if (!sortColumns.includes(sortBy)) {
        throw new ValidationError('Ошибка: Недопустимый столбец для сортировки');
    }
}

const validateSortOrders = (sortOrder) => {
    const validSortOrders = ['asc', 'desc'];

    if (!validSortOrders.includes(sortOrder)) {
        throw new ValidationError('Ошибка: Недопустимый порядок сортировки');
    }
}

const validateFilters = (filter) => {
    if (filter && typeof filter === 'object') {
        return true;
    }

    throw new ValidationError('Ошибка: Недопустимый объект фильтра');
};

yup.addMethod(yup.number, 'timestamp', function timestamp() {
    return this.transform((val, originalValue) => {
        const isTimestamp = !isNaN(originalValue) && moment(originalValue, 'x', true).isValid();
        if (!isTimestamp) {
            throw new yup.ValidationError('Некорректный timestamp', originalValue, 'timestamp');
        }
        return parseInt(originalValue);
    });
});

yup.addMethod(yup.string, 'color', function colorValidator() {
    return this.test('color', 'Недопустимый формат цвета', function (value) {
        if(!value) return true;

        const regex = /^#([0-9a-f]{6})$/i;
        return regex.test(value);
    });
});

yup.addMethod(yup.array, 'list', function list(separator = ',') {
    return this.transform((val) => val.split(separator));
});

module.exports = {
    validatePage,
    validateSortColumns,
    validateSortOrders,
    validateFilters
}
