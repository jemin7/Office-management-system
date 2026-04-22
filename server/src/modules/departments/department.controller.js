import ApiResponse from "../../common/utils/api-response.js";
import {
  createdepartment,
  getAllDepartmentsService,
  removeDepartmentService,
  updateDepartmentService,
} from "./department.service.js";

const create = async (req, res) => {
  const department = await createdepartment(req.body);
  ApiResponse.created(res, "department is created", department);
};

const getAll = async (req, res) => {
  const department = await getAllDepartmentsService();
  ApiResponse.ok(res, "all departments", department);
};

const update = async (req, res) => {
  const department = await updateDepartmentService(req.params.id, req.body);
  ApiResponse.update(res, "department is updated", department);
};

const remove = async (req, res) => {
  const department = await removeDepartmentService(req.params.id);
  ApiResponse.ok(res, "department is deleted", department);
};

export { create, getAll, update, remove };
