import ApiResponse from "../../common/utils/api-response.js";
import {
  createdepartment,
  getAllDepartmentsService,
} from "./department.service.js";

const create = async (req, res) => {
  const department = await createdepartment(req.body);
  ApiResponse.created(res, "department is created", department);
};

const getAll = async (req, res) => {
  const department = await getAllDepartmentsService();
  ApiResponse.ok(res, "all departments", department);
};

export { create, getAll };
