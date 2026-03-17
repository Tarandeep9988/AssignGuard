import mongoose from "mongoose";
import User from "../models/User";
import { AppError } from "../utils/AppError";

export async function createUser(
  name: string,
  email: string,
  role: "student" | "teacher",
  password: string
) {
  try {
    const user = new User({ name, email, role, password });
    await user.save();
    return user;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    throw new AppError({
      message: "Error creating user: " + errorMessage,
      statusCode: 500,
    });
  }
}

export async function getUserById(id: mongoose.Types.ObjectId) {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new AppError({
      message: "Error getting user: " + (error instanceof Error ? error.message : "Unknown error"),
      statusCode: 500,
    });
  }
}

export async function deleteUserById(id: mongoose.Types.ObjectId) {
  try {
    const user = await User.findByIdAndDelete(id);
    return user;
  } catch (error) {
    throw new AppError({
      message: "Error deleting user: " + (error instanceof Error ? error.message : "Unknown error"),
      statusCode: 500,
    });
  }
}