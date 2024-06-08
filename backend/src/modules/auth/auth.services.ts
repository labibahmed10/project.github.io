import config from "../../config/config";
import createToken from "../../utils/createToken";
import UserModel from "../user/user.model";
import { ILoginUser } from "./auth.interface";

const loginUserFromDB = async (userData: ILoginUser) => {
  const { email, password } = userData;

  const user = await UserModel.isUserExistByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }

  const didPassMatched = await UserModel.isPasswordMatched(password, user.password);
  if (!didPassMatched) {
    throw new Error("The password did not matched");
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
