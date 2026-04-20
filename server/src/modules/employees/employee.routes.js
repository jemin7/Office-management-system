import { Router } from "express";
import validate from "../../common/middleware/validation.middleware.js";

import * as controller from "./employee.controller.js";

import createDto from "./dto/create-employee.dto.js";
import queryDto from "./dto/employee-query.dto.js";
import updateDto from "./dto/update-employee.dto.js";

const router = Router();
router.post("/", validate(createDto.schema), controller.create);
router.get("/", validate(queryDto.schema, "query"), controller.getAll);
router.get("/:id", controller.getOne);
router.put("/:id", validate(updateDto.schema), controller.update);
router.delete("/:id", controller.remove);
export default router;
