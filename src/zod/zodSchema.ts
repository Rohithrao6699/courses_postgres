import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().min(4).max(25).email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "minimum of 6 characters needed!" })
    .max(20, { message: "should be atmost 20 characters!" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,20}$/,
      {
        message:
          "Password must include uppercase, lowercase, number, and special character",
      }
    ),
  name: z.string({ message: "should be alphabets" }).optional(),
  role: z.enum(["user", "admin"], { message: "can only be user or admin" }),
});

export const signInSchema = z.object({
  email: z.string().min(4).max(50).email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "minimum of 6 characters needed!" })
    .max(20, { message: "should be atmost 20 characters!" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,20}$/,
      {
        message:
          "Password must include uppercase, lowercase, number, and special character",
      }
    ),
});
