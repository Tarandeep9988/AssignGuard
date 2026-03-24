import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

export async function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        success: false,
        message: err.message,
        data: null,
      })
    }
    else if (err instanceof Error) {
      return res.status(500).json({
        success: false,
        message: err.message,
        data: null,
      });
    }
    else {
      return res.status(500).json({
        success: false,
        message: "An unexpected error occurred",
        data: null,
      });
    }
}