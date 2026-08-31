// Global Server Error Middleware
export const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong MongoDB ObjectId Error (CastError)
  if (err.name === "CastError") {
    err.statusCode = 400;
    err.message = `Resource not found. Invalid: ${err.path}`;
  }

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    err.statusCode = 400;
    err.message = `Duplicate ${Object.keys(err.keyValue || {})} entered`;
  }

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    err.statusCode = 400;
    err.message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
