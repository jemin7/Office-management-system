import { Router } from "express";
import validate from "../../common/middleware/validation.middleware.js";
import * as controller from "./department.controller.js";
import departmentDto from "./dto/department.dto.js";
import { requireAdmin } from "../auth/auth.middleware.js";

const router = Router();

router.post(
  "/",
  requireAdmin,
  validate(departmentDto.schema),
  controller.create,
);

router.get("/", controller.getAll);
router.put(
  "/:id",
  requireAdmin,
  validate(departmentDto.schema),
  controller.update,
);
router.delete("/:id", requireAdmin, controller.remove);

export default router;
