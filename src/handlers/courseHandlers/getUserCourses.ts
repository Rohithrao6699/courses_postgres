import { NextFunction, Request, Response } from "express";
import CourseService from "../../dbServices/CourseService";

export async function getUserCourses(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = Number(req.userId);

  try {
    const response = await CourseService.getUserCourse(userId);
    if (response) {
      res.json({
        success: true,
        content: response,
        message: "successfully fetched users purchased courses",
      });
    }
  } catch (error) {
    next(error);
  }
}
