import Admin from "./auth.model.js";
import ApiError from "../../common/utils/api-error.js";
import { generateToken } from "../../common/utils/jwt.js";

const loginService = async (email, password) => {
  const admin = await Admin.findOne({ email }).select("+password");
  if (!admin) throw ApiError.unauthorized("Invalid email or password");

  const isMatch = await admin.comparePassword(password);
  if (!isMatch) throw ApiError.unauthorized("Invalid email or password");

  const token = generateToken(admin._id);

  return {
    token,
    admin: { email: admin.email, id: admin._id },
  };
};

const registerAdminService = async (email, password) => {
  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) throw ApiError.Conflict("Admin already exists");

  const admin = await Admin.create({ email, password });
  return { email: admin.email };
};

export { loginService, registerAdminService };
