class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  let newError;
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`,
      newError = new ErrorHandler(message, 400);
  } else if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again!`;
    newError = new ErrorHandler(message, 400);
  } else if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is expired, Try again!`;
    newError = new ErrorHandler(message, 400);
  } else if (err.name === "CastError") {
    const message = `Invalid ${err.path}`,
      newError = new ErrorHandler(message, 400);
  } else {
    newError = err;
  }
  const errorMessage = newError?.errors
    ? Object.values(newError?.errors)
        .map((error) => error.message)
        .join(", ")
    : newError?.message;

  return res.status(err.statusCode).json({
    success: false,
    message: errorMessage,
  });
};

export default ErrorHandler;
