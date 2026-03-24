import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import userServices from "../services/user";
import { verifyToken } from "../lib/jwt";

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