import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import userServices from "../services/user.js";
import { verifyToken } from "../lib/jwt.js";

export async function authenticate(req : Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.token;
    if (!token) {
      throw new AppError({
        statusCode: 401,
        message: "Unauthenticated : Token missing",
      })
    }
    // validate token
    const { userId } = verifyToken(token);
    const user = await userServices.getUserById({id: userId});
    if (!user) {
      throw new AppError({
        statusCode: 401,
        message: "Unauthenticated : No user found",
      })
    }
    // attach user to res locals
    res.locals.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

export async function authorizeTeacher(req : Request, res: Response, next: NextFunction) {
  try {
    const user = res.locals.user;
    if (user.role !== "teacher") {
      throw new AppError({
        statusCode: 403,
        message: "Unauthorized : Teacher role required",
      })
    }
    next();
  } catch (error) {
    next(error);
  }
}

export async function authorizeStudent(req : Request, res: Response, next: NextFunction) {
  try {
    const user = res.locals.user;
    if (user.role !== "student") {
      throw new AppError({
        statusCode: 403,
        message: "Unauthorized : Student role required",
      })
    }
    next();
  } catch (error) {
    next(error);
  }
}