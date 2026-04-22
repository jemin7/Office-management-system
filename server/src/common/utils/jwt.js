import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET || "your_super_secret_key", {
    expiresIn: "7d",
  });
};
