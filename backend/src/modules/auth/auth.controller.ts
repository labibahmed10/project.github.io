import httpStatus from "http-status";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.services";

const loginUser = catchAsyncFunc(async (req, res) => {
  const userData = req.body;
  const result = await authServices.loginUserFromDB(userData);

  sendResponse(res, httpStatus.OK, "User login Successfull", result);
});

export const authControllers = {
  loginUser,
};
