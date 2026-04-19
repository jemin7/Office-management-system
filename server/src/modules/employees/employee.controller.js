import { createService, getAllService } from "./employee.service.js";
import ApiResponse from "../../common/utils/api-response.js";

const create = async (req, res) => {
  if (req.body.supervisor === "") req.body.supervisor = null;

  const employee = await createService(req.body);
  ApiResponse.created(res, "Employee created successfully", employee);
};

const getall = async (req, res) => {
  const data = await getAllService(req.query);
  ApiResponse.ok(res, "got all employees", data);
};

const getOne = async (req, res) => {
  const data = await getOneService(req.query);
  ApiResponse.ok(res, "got one employees", data);
};

export { create, getall };
