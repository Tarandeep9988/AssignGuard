import { Request, Response } from "express";
import { createUser } from "../services/user";
import zod from "zod";
import { AppError } from "../utils/AppError";

const loginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6)
});

export async function loginHandler(req : Request, res : Response) {
  try {
    const response = loginSchema.safeParse(req.body);
    if (!response.success) {
      return new AppError({
        message: "Invalid request body",
        statusCode: 400,
      });
    }
    // set up JWT token and send response
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: null,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      success: false,
      message: "Error logging in: " + errorMessage,
      data: null,
    });
  }
}

export async function registerHandler(req : Request, res : Response) {
  try {
    
  } catch (error) {
    
  }
}