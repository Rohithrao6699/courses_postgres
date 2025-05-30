import { NextFunction, Request, Response } from "express";
import CourseService from "../../dbServices/CourseService";

export async function updateCourse(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title, url, seats, courseId } = req.body;
  const userId = Number(req.userId);

  try {
    const updatedCourse: UpdateCourseType = {
      title,
      url,
      seats,
      userId,
      courseId,
    };
    const response = await CourseService.updateCourse(updatedCourse);
    res.json({
      success: true,
      content: response,
      message: "suucessfully updated Course Details",
    });
  } catch (error) {
    next(error);
  }
}
