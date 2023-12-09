class AppError extends Error {
	constructor(statusCode, reasonPhrase, message, metadata) {
		super(message);
		this.statusCode = statusCode;
		this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
		this.reasonPhrase = reasonPhrase;
		this.metadata = metadata;
		this.isOperational = true;

		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = AppError;
