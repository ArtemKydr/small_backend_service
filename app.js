require('./modules/validator');
const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config/app');
const cookieParser = require('cookie-parser');

app.disable('x-powered-by');

app.use(bodyParser.json({
    type: 'application/json'
}));
app.use(cookieParser());

app.use(require('./middleware/formatter'));
app.use('/auth', require('./router/auth'));
app.use(require('./middleware/checkCredentials'));

app.use('/api/broken-cars', require('./router/broken-cars'));

app.use((req, res, next) => {
    res.sendStatus(404);
});

app.use(require('./middleware/errorHandler'));

app.listen(config.port, () => {
    console.log('Small_backend_service service listening on port', config.port);
});
