import { model, Schema } from "mongoose";
import { IUserData, UserStaticMethods } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config/config";

const userSchema = new Schema<IUserData, UserStaticMethods>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      maxlength: [18, "Password cannot exceed 18 characters"],
      select: false, // Exclude password from query results
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, Number(config.salt));
    next();
  } catch (error: any) {
    return next(error);
  }
});

userSchema.post("save", async function (_, next) {
  this.password = "";
  next();
});

// Compare password with hashed password
userSchema.statics.isPasswordMatched = async function (candidatePassword: string, hashPassword: string) {
  return await bcrypt.compare(candidatePassword, hashPassword);
};

userSchema.statics.isUserExistByEmail = async function (email: string) {
  return await UserModel.findOne({ email }).select("+password");
};

const UserModel = model<IUserData, UserStaticMethods>("users", userSchema, "user_data");

export default UserModel;
