import { NextFunction, Request, Response } from "express";
import CourseService from "../../dbServices/CourseService";

export async function createCourse(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title, url, seats } = req.body;
  const userId = Number(req.userId);
  try {
    const coursedata: CourseType = { title, url, seats, userId };
    const response = await CourseService.createCourse(coursedata);
    res.json({
      success: true,
      content: response,
      message: "created course successfully",
    });
  } catch (error) {
    next(error);
  }
}
