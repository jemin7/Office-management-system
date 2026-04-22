import { Router } from "express";
import validate from "../../common/middleware/validation.middleware.js";
import { requireAdmin } from "../auth/auth.middleware.js";

import * as controller from "./employee.controller.js";

import createDto from "./dto/create-employee.dto.js";
import queryDto from "./dto/employee-query.dto.js";
import updateDto from "./dto/update-employee.dto.js";

const router = Router();
router.post("/", requireAdmin, validate(createDto.schema), controller.create);
router.get("/", validate(queryDto.schema, "query"), controller.getAll);
router.get("/:id", controller.getOne);
router.put("/:id", requireAdmin, validate(updateDto.schema), controller.update);
router.delete("/:id", requireAdmin, controller.remove);
export default router;
