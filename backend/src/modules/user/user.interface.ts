import { Model } from "mongoose";

export interface IUserData {
  name: string;
  email: string;
  password: string;
  //   status: "active" | "blocked";
  //   role: "admin" | "user";
}

export interface UserStaticMethods extends Model<IUserData> {
  isPasswordMatched(userPass: string, hashedPass: string): Promise<boolean>;
}
