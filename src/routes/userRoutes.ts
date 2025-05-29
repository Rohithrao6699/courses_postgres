import { Router } from "express";
import { usersignUp } from "../handlers/authHandlers/signup";
import { userSignIn } from "../handlers/authHandlers/signin";
import { auth } from "../middlewares/authMiddleware";

export const userRouter = Router();

userRouter.post("/signup", usersignUp);
userRouter.post("/signin", userSignIn);
userRouter.post("/createProfile", auth);
