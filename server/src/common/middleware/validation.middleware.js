import ApiError from "../utils/api-error.js";
const validate = (schema, source = "body") => {
  return (req, res, next) => {
    const data = source === "query" ? req.query : req.body;

    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const message = error.details
        .map((details) => details.message)
        .join(", ");
      return next(ApiError.badRequest(message));
    }

    if (source === "query") {
      req.query = value;
    } else {
      req.body = value;
    }

    next();
  };
};

export default validate;
