import Admin from "./auth.model.js";
import Employee from "../employees/employee.model.js";
import ApiError from "../../common/utils/api-error.js";
import { generateToken } from "../../common/utils/jwt.js";

const loginService = async (email, password) => {
  const admin = await Admin.findOne({ email }).select("+password");
  if (admin) {
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) throw ApiError.unauthorized("Invalid email or password");

    const token = generateToken({
      id: admin._id,
      role: "admin",
      email: admin.email,
      userType: "admin",
    });

    return {
      token,
      user: {
        id: admin._id,
        email: admin.email,
        role: "admin",
        userType: "admin",
      },
    };
  }

  const employee = await Employee.findOne({ email }).select("+password");
  if (!employee || !employee.password) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  const isMatch = await employee.comparePassword(password);
  if (!isMatch) throw ApiError.unauthorized("Invalid email or password");

  const token = generateToken({
    id: employee._id,
    role: employee.role || "user",
    email: employee.email,
    userType: "employee",
  });

  return {
    token,
    user: {
      id: employee._id,
      email: employee.email,
      name: employee.name,
      role: employee.role || "user",
      userType: "employee",
    },
  };
};

const registerAdminService = async (email, password) => {
  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) throw ApiError.Conflict("Admin already exists");

  const admin = await Admin.create({ email, password });
  return { email: admin.email };
};

export { loginService, registerAdminService };
