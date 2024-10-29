import { z } from "zod";

const userSignUpValidation = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .max(50, "Name cannot exceed 50 characters")
      .trim(),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .email("Email is not valid")
      .trim(),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
      })
      .min(8, "Password must be at least 8 characters long")
      .max(18, "Password can't exceed 18 characters"),
  }),
});

export const userValidation = {
  userSignUpValidation,
};
