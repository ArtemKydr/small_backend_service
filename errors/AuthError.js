
class AuthError extends Error {
    constructor(message = "", cause) {
        super(message, {cause});
        this.name = 'AuthError';
        this.message = message;
    }
}

module.exports = AuthError;
