import type { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/Response.js";

async function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    // User is attached to res.locals by the auth middleware
    const user = res.locals.user;

    return sendResponse(res, {
      success: true,
      message: "User retrieved successfully",
      data: { user },
    }, 200);
    
  } catch (error) {
    next(error);
  }
}

const userController = { 
  getUserById
};

export default userController;