import httpStatus from "http-status";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import { usersServices } from "./user.services";
import sendResponse from "../../utils/sendResponse";

const createUser = catchAsyncFunc(async (req, res) => {
  const userData = req.body;
  const result = await usersServices.createUserIntoDB(userData);

  sendResponse(res, httpStatus.CREATED, "User sign-up was successfull", result);
});

export const usersController = {
  createUser,
};
