import { NextFunction, Request, Response } from "express";
import ProfileService from "../../dbServices/ProfileService";
import { AppError } from "../../types/AppError";

export async function deleteUserProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = Number(req.userId);

  try {
    const response = await ProfileService.deleteProfile(userId);
    if (response) {
      res.status(200).json({
        success: true,
        content: response,
        message: "successfully deleted Profile",
      });
    } else {
      throw new AppError("unable to delete profile", 400);
    }
  } catch (error) {
    next(error);
  }
}
