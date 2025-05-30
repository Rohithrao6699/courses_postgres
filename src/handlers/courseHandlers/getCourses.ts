import { NextFunction, Request, Response } from "express";
import CourseService from "../../dbServices/CourseService";

export async function getCourses(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = Number(req.userId);

  try {
    const response = await CourseService.getAllCourses(userId);
    if (response) {
      res.json({
        success: true,
        content: response,
        meesage: "All the courses of admin",
      });
    }
  } catch (error) {
    next(error);
  }
}
