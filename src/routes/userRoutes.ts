import { Router } from "express";
import { usersignUp } from "../handlers/authHandlers/signup";
import { userSignIn } from "../handlers/authHandlers/signin";
import { auth } from "../middlewares/authMiddleware";
import { getUserProfile } from "../handlers/profileHandlers/getUserProfile";
import { createUserProfile } from "../handlers/profileHandlers/createrProfile";
import { updateUserProfile } from "../handlers/profileHandlers/updateProfile";

export const userRouter = Router();

userRouter.post("/signup", usersignUp);
userRouter.post("/signin", userSignIn);
userRouter.post("/createProfile", auth, createUserProfile);
userRouter.get("/getMyProfile", auth, getUserProfile);
userRouter.post("/updateMyProfile", auth, updateUserProfile);
