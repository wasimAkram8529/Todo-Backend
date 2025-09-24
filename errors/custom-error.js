class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.status = statusCode;
  }
}

const customError = (message, statusCode) => {
  return new CustomAPIError(message, statusCode);
};

module.exports = { CustomAPIError, customError };
