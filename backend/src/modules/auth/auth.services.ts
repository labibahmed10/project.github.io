import httpStatus from "http-status";
import config from "../../config/config";
import { AppError } from "../../errors/AppError";
import createToken from "../../utils/createToken";
import UserModel from "../user/user.model";
import { ILoginUser } from "./auth.interface";

const loginUserFromDB = async (userData: ILoginUser) => {
  const { email, password } = userData;

  const user = await UserModel.isUserExistByEmail(email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const didPassMatched = await UserModel.isPasswordMatched(password, user.password);
  if (!didPassMatched) {
    throw new AppError(httpStatus.CONFLICT, "The password did not matched");
  }

  const jwtPayload = {
    name: user.name,
    email: user.email,
  };

  const accessToken = createToken(jwtPayload, config.accessToken as string, config.expiresIn as string);
  return accessToken;
};

export const authServices = {
  loginUserFromDB,
};
