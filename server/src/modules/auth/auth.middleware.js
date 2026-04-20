import jwt from "jsonwebtoken";
import ApiError from "../../common/utils/api-error.js";

const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(ApiError.unauthorized("Access denied. No token provided."));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback_secret",
    );
    req.admin = decoded;
    next();
  } catch (error) {
    return next(ApiError.unauthorized("Invalid or expired token."));
  }
};

export default verifyAdmin;
