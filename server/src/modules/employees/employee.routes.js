import { Router } from "express";
import validate from "../../common/middleware/validation.middleware.js";
import createDto from "./dto/create-employee.dto.js";

const rounter = Router();

rounter.get("/employees",validate(createDto), controller.create);
rounter.get("/employees/:id");
rounter.post("/employees");
rounter.put("/employees/:id");
rounter.delete("/employees/:id");

export default rounter;
