import {
  createService,
  getAllService,
  getOneService,
  updateService,
  removeService,
} from "./employee.service.js";
import ApiResponse from "../../common/utils/api-response.js";

const create = async (req, res) => {
  if (req.body.supervisor === "") req.body.supervisor = null;

  const employee = await createService(req.body);
  ApiResponse.created(res, "Employee created successfully", employee);
};

const getAll = async (req, res) => {
  const data = await getAllService(req.query);
  ApiResponse.ok(res, "got all employees", data);
};

const getOne = async (req, res) => {
  const data = await getOneService(req.params.id); 
  ApiResponse.ok(res, "got one employee", data);
};

const update = async (req, res) => {
  if (req.body.supervisor === "") {
    req.body.supervisor = null;
  }
  const data = await updateService(req.params.id, req.body);
  ApiResponse.update(res, "data is updated", data);
};

const remove = async (req, res) => {
  const data = await removeService(req.params.id);
  ApiResponse.ok(res, "delete successfully",data);
};
export { create, getAll, getOne, update, remove };

