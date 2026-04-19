class ApiError extends Error {
  constructor(statuscode, message) {
    super(message);
    this.statuscode = statuscode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }

  static badrequest(message = "Bad request") {
    return new ApiError(400, message);
  }

  static unauthorized(message = "Unauthorized") {
    return new ApiError(401, message);
  }
  static notFound(message = "Not Found") {
    return new ApiError(404, message);
  }
}



export default ApiError
