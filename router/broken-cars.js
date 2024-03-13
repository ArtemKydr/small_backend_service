const express = require('express');
const router  = express.Router();
const brokenCarsController = require('../controllers/brokenCarsController');

const { validatePage } = require('../modules/validator');

/**
 * @api {get} /api/broken-cars/list Список сломанных авто
 * @apiName BrokenCarsList
 * @apiGroup BrokenCars
 * @apiVersion 0.1.0
 * @apiDescription Получить список сломанных авто
 *
 * @apiParam {String} [color] Цвет авто
 * @apiParam {String} [description] Описание
 * @apiParam {Number} [year] Год выпуска авто
 * @apiParam {Number} [price] Цена выкупа
 * @apiParam {Date} [firstBrokenDate] Дата первой поломки
 * @apiParam {Datetime} [createdDate] Дата добавления авто в БД
 * @apiParam {Integer} [bodyId] Идентификатор кузова
 * @apiParam {Integer} [modelId] Идентификатор модели
 * @apiParam {Number} [bodyName] Название кузова
 * @apiParam {Number} [modelName] Название модели
 * @apiParam {Number} [limit=20] Ограничение кол-ва элементов
 * @apiParam {Number} [offset=0] Смещение от начала
 * @apiParam {String} [sort] Параметры для сортировки (через запятую, разделяя колонку и способ. Например "year|asc, firstBrokenDate|desc")
 *
 * @apiExample Пример Curl-запроса:
 * curl --location 'http://localhost:8080/api/broken-cars/list?sort=year%7Casc%2CfirstBrokenDate%7Cdesc' \
 *
 * @apiSuccessExample Успешный ответ:
 *     HTTP/1.1 200 OK
 * {
 *     "data": [
 *         {
 *             "id": 1,
 *             "color": "#1b9d87",
 *             "description": "Description1",
 *             "year": 2008,
 *             "price": "18645.57",
 *             "firstBrokenDate": "2019-08-10T21:00:00.000Z",
 *             "createdDate": "2022-09-23T08:27:42.000Z",
 *             "bodyId": 6,
 *             "modelId": 8,
 *             "image": "https://example.com/image8.jpg",
 *             "blob": {
 *                 "type": "Buffer",
 *                 "data": [
 *                     73,
 *                     109,
 *                     97,
 *                     103,
 *                     101,
 *                     32,
 *                     49
 *                 ]
 *             },
 *             "isActive": true,
 *             "modelName": "Civic",
 *             "bodyName": "Wagon"
 *         }
 *     ],
 *     "success": true
 * }
 *
 * @apiErrorExample Ошибка, связанная с БД:
 *     HTTP/1.1 401 OK
 *     {
 *       "success": false,
 *       "error": "DB error. Code: 42P01"
 *     }
 */

router.get('/list', async (req, res) => {
    await validatePage(req.user.roles, 1);

    const data = await brokenCarsController.getList(req.query);

    res.sendSuccess({ data });
});

/**
 * @api {get} /api/broken-cars/details/:id Детали авто
 * @apiName BrokenCarsDetails
 * @apiGroup BrokenCars
 * @apiVersion 0.1.0
 * @apiDescription Получить детали сломанного авто
 *
 * @apiParam {Integer} id Идентификатор сломанного авто
 *
 * @apiExample Пример Curl-запроса:
 * curl --location 'http://localhost:8080/api/broken-cars/details/1' \
 *
 * @apiSuccessExample Успешный ответ:
 *     HTTP/1.1 200 OK
 * {
 *     "data": [
 *         {
 *             "id": 1,
 *             "color": "#1b9d87",
 *             "description": "Description1",
 *             "year": 2008,
 *             "price": "18645.57",
 *             "firstBrokenDate": "2019-08-10T21:00:00.000Z",
 *             "createdDate": "2022-09-23T08:27:42.000Z",
 *             "bodyId": 6,
 *             "modelId": 8,
 *             "image": "https://example.com/image8.jpg",
 *             "blob": {
 *                 "type": "Buffer",
 *                 "data": [
 *                     73,
 *                     109,
 *                     97,
 *                     103,
 *                     101,
 *                     32,
 *                     49
 *                 ]
 *             },
 *             "isActive": true,
 *             "modelName": "Civic",
 *             "bodyName": "Wagon"
 *         }
 *     ],
 *     "success": true
 * }
 *
 * @apiErrorExample Ошибка, связанная с БД:
 *     HTTP/1.1 401 OK
 *     {
 *       "success": false,
 *       "error": "DB error. Code: 42P01"
 *     }
 */

router.get('/details/:id', async (req, res) => {
    await validatePage(req.user.roles, 1);

    const data = await brokenCarsController.getDetails(req.params);

    res.sendSuccess({ data });
});

/**
 * @api {post} /api/broken-cars/create Создать
 * @apiName BrokenCarsСreate
 * @apiGroup BrokenCars
 * @apiVersion 0.1.0
 * @apiDescription Добавить данные о сломанном авто
 *
 * @apiParam {String} color Цвет авто
 * @apiParam {String} description Описание
 * @apiParam {Number} year Год выпуска авто
 * @apiParam {Number} [price] Цена выкупа
 * @apiParam {Date} [firstBrokenDate] Дата первой поломки
 * @apiParam {Number} bodyId Идентификатор кузова
 * @apiParam {Number} modelId Идентификатор модели
 *
 * @apiExample Пример Curl-запроса:
 * curl --location --request POST 'http://localhost:8080/api/broken-cars/create' \
 * --header 'Content-Type: application/json' \
 * --data '
 *    {
 *        "color" : "#c684e3",
 *        "description" : "asdDescriptionasd",
 *        "year" : 2020,
 *        "price" : 978.81,
 *        "body_id" : 7,
 *        "model_id" : 6
 *    }
 * '
 *
 * @apiSuccessExample Успешный ответ:
 *     HTTP/1.1 200 OK
 * {
 *     "brokenCarId": 51,
 *     "success": true
 * }
 *
 * @apiErrorExample Ошибка, связанная с БД:
 *     HTTP/1.1 401 OK
 *     {
 *       "success": false,
 *       "error": "DB error. Code: 42P01"
 *     }
 */
router.post('/create', async (req, res) => {
    await validatePage(req.user.roles, 2);

    const newBrokenCarId = await brokenCarsController.createData(req.body);

    res.sendSuccess({ newBrokenCarId });
});

/**
 * @api {put} /api/broken-cars/edit/:id Изменить
 * @apiName BrokenCarsEdit
 * @apiGroup BrokenCars
 * @apiVersion 0.1.0
 * @apiDescription Получить изменить информацию о сломанном авто
 *
 * @apiParam {Integer} id Идентификатор сломанного авто
 * @apiParam {String} [color] Цвет авто
 * @apiParam {String} [description] Описание
 * @apiParam {Integer} [year] Год выпуска авто
 * @apiParam {Number} [price] Цена выкупа
 * @apiParam {Date} [firstBrokenDate] Дата первой поломки
 * @apiParam {Integer} [bodyId] Идентификатор кузова
 * @apiParam {Integer} [modelId] Идентификатор модели
 *
 * @apiExample Пример Curl-запроса:
 * curl --location --request PUT 'http://localhost:8080/api/broken-cars/edit/1' \
 * --header 'Content-Type: application/json' \
 * --data '
 *    {
 *        "color" : "#c684e3",
 *        "description" : "asdDescriptionasd",
 *        "year" : 2020,
 *        "price" : 978.81,
 *        "body_id" : 7,
 *        "model_id" : 6
 *    }
 * '
 */
router.put('/edit/:id', async (req, res) => {
    await validatePage(req.user.roles, 4);

    const data = await brokenCarsController.updateData({...req.params, ...req.body});

    res.sendSuccess({ data });
});

/**
 * @api {delete} /api/broken-cars/delete/:id Удалить
 * @apiName BrokenCarsDelete
 * @apiGroup BrokenCars
 * @apiVersion 0.1.0
 * @apiDescription Удалить сломанное авто
 *
 * @apiParam {Integer} id Идентификатор сломанного авто
 *
 * @apiExample Пример Curl-запроса:
 * curl --location --request DELETE 'http://localhost:8080/api/broken-cars/delete/1' \
 */

router.delete('/delete/:id', async (req, res) => {
    await validatePage(req.user.roles, 8);

    await brokenCarsController.deleteData(req.params);

    res.sendSuccess();
});

module.exports = router;
