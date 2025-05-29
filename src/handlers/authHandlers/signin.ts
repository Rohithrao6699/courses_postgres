import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { signInSchema } from "../../zod/zodSchema";
import AuthService from "../../dbServices/AuthService";

export async function userSignIn(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  const validUser = signInSchema.safeParse({ email, password });
  type User = z.infer<typeof signInSchema>;

  if (validUser.success) {
    try {
      const safeUser: User = { email, password };
      const token = await AuthService.signInData(safeUser);
      if (token) {
        res.status(200).json({
          success: true,
          content: token,
          message: "you are logged in",
        });
      }
    } catch (error) {
      next(error);
    }
  } else {
    throw validUser.error;
  }
}
