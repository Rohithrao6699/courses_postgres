import { NextFunction, Request, Response } from "express";
import CourseService from "../../dbServices/CourseService";

export async function deleteCourse(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const courseId = req.body.courseId;
  const userId = Number(req.userId);
  try {
    const response = await CourseService.deleteCourse(courseId, userId);
    res.status(200).json({
      success: true,
      Content: response,
      message: "successfully deleted course",
    });
  } catch (error) {
    next(error);
  }
}
