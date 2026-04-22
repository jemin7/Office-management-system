import jwt from "jsonwebtoken";
import ApiError from "../../common/utils/api-error.js";

const verifyAuth = (req, res, next) => {
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
    req.user = decoded;
    next();
  } catch (error) {
    return next(ApiError.unauthorized("Invalid or expired token."));
  }
};

const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(ApiError.unauthorized("Authentication required."));
    }

    if (!roles.includes(req.user.role)) {
      return next(ApiError.unauthorized("Insufficient permissions."));
    }

    next();
  };
};

const requireAdmin = requireRole("admin");

export { verifyAuth, requireRole, requireAdmin };
