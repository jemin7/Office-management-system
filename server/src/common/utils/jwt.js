import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_key";

export const generateToken = (adminId) => {
  return jwt.sign({ id: adminId }, JWT_SECRET, {
    expiresIn: "1d",
  });
};
