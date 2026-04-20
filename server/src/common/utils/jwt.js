import jwt from "jsonwebtoken";

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "your_super_secret_key", {
    expiresIn: "7d",
  });
};
