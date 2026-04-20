import { Router } from "express";
import validate from "../../common/middleware/validation.middleware.js";
import * as controller from "./department.controller.js";
import departmentDto from "./dto/department.dto.js";

const router = Router();

router.post("/", validate(departmentDto), controller.create);

router.get("/", controller.getAll);

export default router;
