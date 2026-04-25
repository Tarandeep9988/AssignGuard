import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { sendResponse } from "../utils/Response.js";

export async function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (err instanceof AppError) {
      return sendResponse(res, {
        success: false,
        message: err.message,
        data: {},
      }, err.statusCode);
    }
    else if (err instanceof Error) {
      return sendResponse(res, {
        success: false,
        message: err.message,
        data: {},
      }, 500);
    }
    else {
      return sendResponse(res, {
        success: false,
        message: "An unexpected error occurred",
        data: {},
      }, 500);
    }
}