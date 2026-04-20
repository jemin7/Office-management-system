import jwt from "jsonwebtoken";
import ApiError from "../../common/utils/api-error.js";

const verifyAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw ApiError.unauthorized("Access denied. No valid token provided.");
    }

    const token = authHeader.split(" ")[1];

    const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_key";

    const decoded = jwt.verify(token, JWT_SECRET);

    req.admin = decoded;

    next();
  } catch (error) {
    next(ApiError.unauthorized("Invalid or expired token."));
  }
};

export default verifyAdmin;
