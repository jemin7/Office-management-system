import { Router } from "express";
import * as controller from "./auth.controller.js";
import verifyAdmin from "./common/middleware/auth.middleware.js"; 

const router = Router();
router.post("/login", validate(loginDto), controller.login);
router.post("/register", controller.register);
export default router;
