import { PrismaClient } from "@prisma/client";
import { AppError } from "../types/AppError";

const prisma = new PrismaClient();

class CouseService {
  async createCourse(courseData: CourseType) {
    const user = await prisma.user.findUnique({
      where: { id: courseData.userId },
    });
    if (user) {
      const response = await prisma.course.create({
        data: {
          url: courseData.url,
          title: courseData.title,
          seats: courseData.seats,
          creator: { connect: { id: courseData.userId } },
        },
        include: {
          creator: true,
        },
      });
      return response;
    } else {
      throw new AppError("user not existing", 403);
    }
  }

  async updateCourse(courseData: UpdateCourseType) {
    // Extract userId for the WHERE clause
    const { userId, courseId, ...updateFields } = courseData;

    // Filter out undefined values to only update provided fields
    const fieldsToUpdate = Object.entries(updateFields).reduce(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, any>
    );

    // Check if there are any fields to update
    if (Object.keys(fieldsToUpdate).length === 0) {
      throw new Error("No fields provided for update");
    }

    const response = await prisma.course.update({
      where: { id: courseId, creatorId: userId },
      data: fieldsToUpdate,
    });
    return response;
  }

  async deleteCourse(courseId: number, userId: number) {
    const response = await prisma.course.delete({
      where: {
        id: courseId,
        creatorId: userId,
      },
    });
    return response;
  }

  async getAllCourses(userId: number) {
    const response = await prisma.course.findMany({
      where: { creatorId: userId },
    });
    return response;
  }
}

export default new CouseService();
