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
      include: {
        Users_Purchasedcourses: { include: { user: true } },
      },
    });
    return response;
  }

  async purchaseCourse(purchasedata: PurchaseCourseType) {
    const isSeatsAvailable = await prisma.course.findUnique({
      where: { id: purchasedata.courseId },
    });
    if (isSeatsAvailable && isSeatsAvailable.seats > 0) {
      const response = await prisma.user.update({
        where: { id: purchasedata.userId },
        data: {
          Users_Purchasedcourses: {
            create: {
              course: { connect: { id: purchasedata.courseId } },
            },
          },
        },
        include: {
          Users_Purchasedcourses: { include: { course: true } },
        },
      });
      const updatedCourseDetails = await prisma.course.update({
        where: { id: purchasedata.courseId },
        data: { seats: { decrement: 1 } },
      });
      return response;
    } else {
      throw new AppError("no seats left in course", 403);
    }
  }

  async getUserCourse(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new AppError("user not existing", 411);
    }
    if (user.role === "user") {
      const response = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          profile: true,
          Users_Purchasedcourses: { include: { course: true } },
        },
      });
      return response;
    } else {
      throw new AppError("unauthorized operation", 403);
    }
  }
}

export default new CouseService();
