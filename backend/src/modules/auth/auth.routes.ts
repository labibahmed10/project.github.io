import { Router } from "express";
import { authControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { authValidation } from "./auth.zod.validation";

const authRoutes = Router();

authRoutes.post("/login", validateRequest(authValidation.userLoginValidation), authControllers.loginUser);

export default authRoutes;
