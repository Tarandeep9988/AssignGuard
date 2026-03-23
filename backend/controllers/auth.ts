import { Request, Response } from "express";
import zod from "zod";
import { AppError } from "../utils/AppError";
import { createUser, getUserByEmail, isValidPassword } from "../services/user";
import { signToken } from "../lib/jwt";

const loginSchema = zod.object({
  email: zod.email(),
  password: zod.string().min(6)
});

export async function loginHandler(req : Request, res : Response) {
  try {
    const response = loginSchema.safeParse(req.body);
    if (!response.success) {
      throw new AppError({
        message: "Invalid request body",
        statusCode: 400,
      });
    }

    // set up JWT token and send response
    const { email, password } = response.data;
    // check if user exists and password is correct
    const user = await getUserByEmail(email);
    if (!user || !isValidPassword({ password, user })) {
      throw new AppError({
        message: "Invalid email or password",
        statusCode: 401,
      });
    };

    // User is authenticated, generate JWT token
    const token = signToken({ userId: user._id});

    // setting cookie with token
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000, // 1 hour
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user
      },
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        data: null,
      })
    }
    else if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message,
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
}

const registerSchema = zod.object({
  name: zod.string().min(1),
  email: zod.email(),
  password: zod.string().min(6),
  role: zod.enum(["student", "teacher"]),
});


export async function registerHandler(req : Request, res : Response) {
  try {
    const response = registerSchema.safeParse(req.body);
    if (!response.success) {
      throw new AppError({
        message: "Invalid request body",
        statusCode: 400,
      });
    }
    const { name, email, password, role } = response.data;
    
    const user = await createUser({ name, email, password, role });

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: {
        user
      }
    })
    
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        data: null,
      })
    }
    else if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message,
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
}