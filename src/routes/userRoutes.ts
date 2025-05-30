import { Router } from "express";
import { usersignUp } from "../handlers/authHandlers/signup";
import { userSignIn } from "../handlers/authHandlers/signin";
import { auth } from "../middlewares/authMiddleware";
import { getUserProfile } from "../handlers/profileHandlers/getUserProfile";
import { createUserProfile } from "../handlers/profileHandlers/createrProfile";
import { updateUserProfile } from "../handlers/profileHandlers/updateProfile";
import { deleteUserProfile } from "../handlers/profileHandlers/deleteProfile";
import { purchaseCourse } from "../handlers/courseHandlers/purchaseCourse";
import { getUserCourses } from "../handlers/courseHandlers/getUserCourses";

export const userRouter = Router();

userRouter.post("/signup", usersignUp);
userRouter.post("/signin", userSignIn);
userRouter.post("/createProfile", auth, createUserProfile);
userRouter.get("/getProfile", auth, getUserProfile);
userRouter.post("/updateProfile", auth, updateUserProfile);
userRouter.post("/deleteProfile", auth, deleteUserProfile);
userRouter.post("/purchaseCourse", auth, purchaseCourse);
userRouter.post("/getUserCourses", auth, getUserCourses);
