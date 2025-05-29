import { NextFunction, Request, Response } from "express";
import ProfileService from "../../dbServices/ProfileService";
import { AppError } from "../../types/AppError";

export async function getUserProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = Number(req.userId);
  try {
    const response = await ProfileService.getProfile(userId);
    if (response) {
      res.status(200).json({
        success: true,
        content: response,
        message: "fetched users data",
      });
    } else {
      throw new AppError("something went wrong", 400);
    }
  } catch (error) {
    next(error);
  }
}
