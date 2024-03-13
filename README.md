# small_backend_service

## Порядок установки проекта

1) Установить зависимости \
`npm install`

2) Создать базу данных 
3) Заполнить файл .env 
4) Накатить миграции \
`npm run migrate-up`
5) Подождать заполнения БД
6) Сгенерировать документацию \
`npm run doc`
7) Открыть документацию (лежит по пути `/small_backend_service/doc/index.js`)
8) Запустить сервис \
`npm start` \
По умолчанию он будет доступен по `localhost:8080`
10) Залогиниться 
``` 
curl --location 'http://localhost:8080/auth/login' \
--header 'Content-Type: application/json' \
--data '{
    "login": "admin",
    "password": "test"
}'
```
10) Тестировать остальные методы, примерные curl Вы найдете в документации

