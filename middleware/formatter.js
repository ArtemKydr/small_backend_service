module.exports = async (req, res, next) => {
    res.sendError = (error, isObject = false) => {
        return res.status(400).send({
            success: false,
            error: isObject ? error : error.toString()
        });
    };

    res.sendSuccess = (data = {}) => {
        data.success = true;
        return res.send(data);
    };

    next();

};
