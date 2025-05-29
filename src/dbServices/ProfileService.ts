import { PrismaClient } from "@prisma/client";
import { Profiledata } from "../types/profiletypes";
import { AppError } from "../types/AppError";

const prisma = new PrismaClient();

class ProfileService {
  async createProfile(profiledata: Profiledata) {
    const user = await prisma.user.findUnique({
      where: {
        id: profiledata.userId,
      },
    });
    if (user) {
      const response = await prisma.profile.upsert({
        where: {
          userId: profiledata.userId,
        },
        update: {
          // Update existing profile
          bio: profiledata.bio,
          fullname: profiledata.fullname,
          age: profiledata.age,
        },
        create: {
          bio: profiledata.bio,
          fullname: profiledata.fullname,
          age: profiledata.age,
          user: { connect: { id: profiledata.userId } },
        },
      });
      return response;
    }
  }

  async getProfile(userId: number) {
    const doesProfileExists = await prisma.profile.findUnique({
      where: { userId: userId },
    });
    if (doesProfileExists) {
      const userInfo = await prisma.user.findUnique({
        where: { id: userId },
        include: { profile: true },
      });
      return userInfo;
    } else {
      throw new AppError("profile not created", 403);
    }
  }

  async deleteProfile(userId: number) {
    const response = await prisma.profile.delete({
      where: { userId: userId },
    });
    return response;
  }
}

export default new ProfileService();
