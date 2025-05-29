import { NextFunction, Request, Response } from "express";

export function createUserProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { bio, fullname, age } = req.body;
  const userId = req.userId;
}
