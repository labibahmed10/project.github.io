import { Router } from "express";
import { usersController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.zod.validation";
const userRoutes = Router();

userRoutes.post("/signup", validateRequest(userValidation.userSignUpValidation), usersController.createUser);

export default userRoutes;
