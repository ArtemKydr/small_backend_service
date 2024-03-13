class CustomError extends Error {
    constructor(message = "", cause) {
        super(message, {cause});
        this.name = 'CustomError';
        this.message = message;
    }
}

module.exports = CustomError;
