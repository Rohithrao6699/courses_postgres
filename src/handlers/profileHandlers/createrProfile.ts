import { NextFunction, Request, Response } from "express";
import ProfileService from "../../dbServices/ProfileService";
import { Profiledata } from "../../types/profiletypes";
import { AppError } from "../../types/AppError";

export async function createUserProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { bio, fullname, age } = req.body;
  const userId = Number(req.userId);

  try {
    const profiledata: Profiledata = { bio, fullname, age, userId };
    const response = await ProfileService.createProfile(profiledata);
    if (response) {
      res.status(200).json({
        success: true,
        content: response,
        message: "profile created successfully",
      });
    } else {
      throw new AppError("unable to create profile", 400);
    }
  } catch (error) {
    next(error);
  }
}
