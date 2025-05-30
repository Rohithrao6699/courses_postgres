import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config/config";
import AuthService from "../dbServices/AuthService";
import { AppError } from "../types/AppError";

export async function authorization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization;
    if (token) {
      const decodedInfo = jwt.verify(token, config.JWT_SECRET);
      const userId = (decodedInfo as JwtPayload).userId;
      const isUserAdmin = await AuthService.isUserAdmin(userId);
      if (isUserAdmin && isUserAdmin.role === "admin") {
        next();
      } else {
        throw new AppError("you are not authorized to create Course", 403);
      }
    }
  } catch (error) {
    next(error);
  }
}
