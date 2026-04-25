import type { CookieOptions, NextFunction, Request, Response } from "express";
import * as z from "zod";
import { AppError } from "../utils/AppError.js";
import userServices from "../services/user.js";
import { signToken } from "../lib/jwt.js";
import { sendResponse } from "../utils/Response.js";

const setCookieOptions : CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 3600000, // 1 hour
};

export async function loginHandler(req : Request, res : Response, next : NextFunction) {
  try {
    const response = z.object({
      email: z.email(),
      password: z.string().min(6)
    }).safeParse(req.body);
    
    if (!response.success) {
      throw new AppError({
        message: "Invalid request data",
        statusCode: 400,
      });
    }

    const { email, password } = response.data;
    const user = await userServices.getUserByCredentials({ email, password });
    if (!user) {
      throw new AppError({
        message: "Invalid credentials",
        statusCode: 401,
      })
    }

    // User is authenticated, generate JWT token
    const token = signToken({ userId: user._id});

    // setting cookie with token
    res.cookie('token', token, setCookieOptions);

    return sendResponse(res, {
      success: true,
      message: "Login successful",
      data: {
        user
      },
    }, 200);
  } catch (error) {
    next(error);
  }
}

export async function registerHandler(req : Request, res : Response, next : NextFunction) {
  try {
    const response = z.object({
      name: z.string().min(1),
      email: z.email(),
      password: z.string().min(6),
      role: z.enum(["student", "teacher"]),
    }).safeParse(req.body);

    if (!response.success) {
      throw new AppError({
        message: "Invalid request data",
        statusCode: 400,
      });
    }

    const { name, email, password, role } = response.data;
    const user = await userServices.createUser({ name, email, password, role });

    // User is registered, generate JWT token
    const token = signToken({ userId: user._id});
    // setting cookie with token
    res.cookie('token', token, setCookieOptions);

    return sendResponse(res, {
      success: true,
      message: "User registered successfully",
      data: {
        user
      },
    }, 200);
    
  } catch (error) {
    next(error);
  }
}