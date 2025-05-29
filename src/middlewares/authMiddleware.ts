import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config/config";
import { AppError } from "../types/AppError";

export function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decodedInfo = jwt.verify(token, config.JWT_SECRET);
      req.userId = (decodedInfo as JwtPayload).userId;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    throw new AppError("no authorization token found!", 403);
  }
}
