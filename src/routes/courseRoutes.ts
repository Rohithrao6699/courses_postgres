import { Router } from "express";
import { auth } from "../middlewares/authMiddleware";
import { createCourse } from "../handlers/courseHandlers/createCourse";
import { authorization } from "../middlewares/authorizationMiddleware";
import { updateCourse } from "../handlers/courseHandlers/updateCourse";
import { deleteCourse } from "../handlers/courseHandlers/deleteCourse";
import { getCourses } from "../handlers/courseHandlers/getCourses";

export const courseRouter = Router();

courseRouter.post("/createCourse", auth, authorization, createCourse);
courseRouter.post("/updateCourse", auth, authorization, updateCourse);
courseRouter.post("/deleteCourse", auth, authorization, deleteCourse);
courseRouter.post("/getCourses", auth, authorization, getCourses);
