import { NextFunction, Request, Response } from "express";
import CourseService from "../../dbServices/CourseService";

export async function purchaseCourse(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { courseId } = req.body;
  const userId = Number(req.userId);

  try {
    const purchasedata: PurchaseCourseType = { courseId, userId };
    const response = await CourseService.purchaseCourse(purchasedata);
    if (response) {
      res.json({
        success: true,
        content: response,
        message: "course bought successfully",
      });
    }
  } catch (error) {
    next(error);
  }
}
