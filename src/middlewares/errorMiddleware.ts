import { NextFunction, Request, Response } from "express";
import { AppError } from "../types/AppError";
import { ZodError } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export function errorMiddleWare(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof AppError) {
    res.status(error.status).json({
      success: false,
      message: error.message,
    });
    return;
  }

  if (error instanceof PrismaClientKnownRequestError) {
    //function written below
    let appError = handlePrismaError(error);
    res.status(appError.status).json({
      success: false,
      message: appError.message,
    });
    return;
  }

  if (error instanceof ZodError) {
    res.status(411).json({
      success: false,
      message: "validation failed",
      errors: error.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
    return;
  }

  //fallback error
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}

const handlePrismaError = (err: PrismaClientKnownRequestError) => {
  switch (err.code) {
    case "P2002":
      // handling duplicate key errors
      return new AppError(`Duplicate field value: ${err.meta?.target}`, 409);
    case "P2014":
      // handling invalid id errors
      return new AppError(`Invalid ID: ${err.meta?.target}`, 400);
    case "P2003":
      // handling invalid data errors
      return new AppError(`Invalid input data: ${err.meta?.target}`, 400);
    case "P2025":
      // Record not found
      return new AppError("Record not found", 404);
    case "P2012":
      // Missing required field
      return new AppError(`Missing required field: ${err.meta?.target}`, 400);
    default:
      // handling all other errors
      return new AppError(
        `Something went wrong while performing Db operation: ${err.message}`,
        500
      );
  }
};
