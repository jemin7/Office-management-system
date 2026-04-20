import { Router } from "express";
import validate from "../../common/middleware/validation.middleware.js";
import loginDto from "./dto/logindto.js";
import * as controller from "./auth.controller.js";
const router = Router();
router.post("/login", validate(loginDto.schema), controller.login);
router.post("/register", controller.register);
export default router;
