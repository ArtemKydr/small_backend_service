class PermissionError extends Error {
    constructor(message = "", cause) {
        super(message, {cause});
        this.name = 'PermissionError';
        this.message = `no permission for ${message}`;
    }
}

module.exports = PermissionError;
