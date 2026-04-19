import { Router } from "express";
import validate from "../../common/middleware/validation.middleware.js";

import * as controller from "./employee.controller.js";

import createDto from "./dto/create-employee.dto.js";
import queryDto from "./dto/employee-query.dto.js";
import updateDto from "./dto/update-employee.dto.js";

const router = Router();

router.post("/employees", validate(createDto), controller.create);

router.get("/employees", validate(queryDto), controller.getAll);

router.get("/employees/:id", controller.getOne);

router.put("/employees/:id", validate(updateDto), controller.update);

router.delete("/employees/:id", controller.remove);

export default router;
