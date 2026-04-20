import { loginService, registerAdminService } from "./auth.service.js";
import ApiResponse from "../../common/utils/api-response.js";

const login = async (req, res) => {
  const { email, password } = req.body;
  const data = await loginService(email, password);
  ApiResponse.ok(res, "Login successful", data);
};
const register = async (req, res) => {
  const { email, password } = req.body;
  const data = await registerAdminService(email, password);
  ApiResponse.created(res, "First admin created successfully", data);
};

export { login, register };
