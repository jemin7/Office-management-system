import { createService } from "./employee.service.js";
import ApiResponse from "../../common/utils/api-response.js";

const create = async (req, res, next) => {
  if (req.body.supervisor === "") req.body.supervisor = null;

  const employee = await createService.create(req.body);
  ApiResponse.created(res, "Employee created successfully", employee);
};

const getall = async (req) => {};

export { create };
