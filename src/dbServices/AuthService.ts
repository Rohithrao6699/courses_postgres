import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { SignInData, SignupData } from "../types/authtypes";
import { AppError } from "../types/AppError";

const prisma = new PrismaClient();

class AuthService {
  async signUpData(signupData: SignupData) {
    if (signupData.name) {
      const hashed = await bcrypt.hash(signupData.password, 10);
      const data = await prisma.user.create({
        data: {
          email: signupData.email,
          password: hashed,
          name: signupData.name,
          role: signupData.role,
        },
      });
      return data;
    }
  }

  async signInData(signInData: SignInData) {
    const user = await prisma.user.findUnique({
      where: {
        email: signInData.email,
      },
    });
    if (user) {
      const passwordMatch = await bcrypt.compare(
        signInData.password,
        user?.password
      );
      if (passwordMatch) {
        let token = jwt.sign({ userId: user.id }, config.JWT_SECRET); //token generation
        return token;
      } else {
        throw new AppError("invalid password entered", 411);
      }
    } else {
      throw new AppError("user not found", 411);
    }
  }

  async isUserAdmin(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (user) {
      return user;
    }
  }
}

export default new AuthService();
