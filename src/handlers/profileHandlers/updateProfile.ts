import { NextFunction, Request, Response } from "express";
import ProfileService from "../../dbServices/ProfileService";
import { Profiledata } from "../../types/profiletypes";
import { AppError } from "../../types/AppError";

export async function updateUserProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { fullname, bio, age } = req.body;
  const userId = Number(req.userId);

  try {
    const toupdateData: Profiledata = { fullname, bio, age, userId };
    const response = await ProfileService.createProfile(toupdateData);
    if (response) {
      res.status(200).json({
        success: true,
        content: response,
        message: "updated users Profile",
      });
    } else {
      throw new AppError("unable to update Profile", 403);
    }
  } catch (error) {
    next(error);
  }
}
