function errorHandler(err, req, res, next) {
  let message = err.message || "Internal Server Error";
  let status = err.status || 500;
  switch (err.name) {
    case "SequelizeValidationError":
      status = 400;
      message = err.errors[0].message;
      break;
    case "Unathorized":
      status = 401;
      message = "Unathorized";
      break;
    case "JsonWebTokenError":
      status = 401;
      message = "Invalid Token";
      break;
    case "Forbidden":
      status = 403;
      message = "Forbidden";
      break;
    case "NotFound":
      status = 403;
      message = "Data not found";
      break;

    default:
      break;
  }

  res.status(status).json({ message });
}

module.exports = errorHandler;
