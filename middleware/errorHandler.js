const config = require('../config/app').logs;

module.exports = (err, req, res, next) => {
    if(err.name === 'ValidationError') {
        return res.status(400).send({
            success: false,
            message: err.name,
            details: err.errors.join(', '),
        });
    } else if(err.name === 'error' && err.severity && err.code) {
        console.error(`[${req.id}] Postgres Error`, err.toString());

        if (config === 'dev'){
            return res.status(400).send({
                success: false,
                message: `Error: ${err.toString()}`,
            });
        }
        return res.status(400).send({
            success: false,
            message: `DB error. Code: ${err.code}`,

        });
    } else if (err.name === 'CustomError') {
        return res.status(400).send({
            success: false,
            message: err.message,

        });
    } else if(err.name === 'PermissionError') {
        return res.status(403).send({
            success: false,
            message: err.toString(),

        });
    } else if(err.name === 'AuthError') {
        return res.status(401).send({
            success: false,
            message: err.message,

        });
    } else if(err.isAxiosError) {
        console.error(`Axios`, err.toString());
        console.error(`Details`, {IN: err.config, OUT: err.response.data})

        return res.status(400).send({
            success: false,
            message: err.toString(),
            response: {
                status: err.response.status,
                data: err.response.data,
            },

        });
    } else {
        console.error(`[${req.id}] Unknown source`, err);
        return res.status(400).send({
            success: false,
            message: err.toString(),

        });
    }
};
