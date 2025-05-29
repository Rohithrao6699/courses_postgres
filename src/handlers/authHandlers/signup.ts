import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { signUpSchema } from "../zod/zodSchema";
import AuthService from "../dbServices/AuthService";
import { AppError } from "../types/AppError";

export async function usersignUp(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, email, password, role } = req.body;

  const validUser = signUpSchema.safeParse({ email, password, name, role });
  type User = z.infer<typeof signUpSchema>;

  if (validUser.success) {
    try {
      const safeUser: User = { email, password, name, role };
      const data = await AuthService.signUpData(safeUser);
      if (data) {
        res.status(200).json({
          success: true,
          content: data,
          message: "user signed up",
        });
      }
    } catch (error) {
      next(error);
    }
  } else {
    throw validUser.error;
  }
}
