import { Router } from "express";
import { usersController } from "./user.controller";
const userRoutes = Router();

userRoutes.post("/sign-up", usersController.createUser);

export default userRoutes;
