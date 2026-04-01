import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/Response";

async function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
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

};