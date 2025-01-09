class CustomError extends Error {
    constructor(code, message, statusCode){
        super(message);
        this.statusCode = statusCode;
        this.code = code;
    }
}

export { CustomError }