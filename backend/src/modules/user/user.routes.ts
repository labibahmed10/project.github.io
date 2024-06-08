import { Router } from "express";
import { usersController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import userDataValidation from "./user.zod.validation";
const userRoutes = Router();

userRoutes.post("/sign-up", validateRequest(userDataValidation), usersController.createUser);

export default userRoutes;
