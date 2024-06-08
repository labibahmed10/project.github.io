import { IUserData } from "./user.interface";
import UserModel from "./user.model";

const createUserIntoDB = async (userData: IUserData) => {
  const result = await UserModel.create(userData);
  return result;
};

export const usersServices = {
  createUserIntoDB,
};
