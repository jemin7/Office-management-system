import { Router } from "express";
import validate from "../../common/middleware/validation.middleware.js";
import createDto from "./dto/create-employee.dto.js";
import queryDto from "./dto/employee-query.dto.js";
import updateDto from "./dto/update-employee.dto.js";

const rounter = Router();

rounter.post("/employees",validate(createDto), controller.create);
rounter.get("/employees",validate(queryDto), controller.getall);
rounter.get("/employees/:id", controller.getone);
rounter.put("/employees/:id", validate(updateDto), controller.update);
rounter.delete("/employees/:id", controller.remove);

export default rounter;
