import mongoose from "mongoose";
import User from "../models/User.js";
import { AppError } from "../utils/AppError.js";
import bcrypt from "bcrypt";

async function createUser({
  name,
  email,
  role,
  password,
}: {
  name: string;
  email: string;
  role: "student" | "teacher";
  password: string;
}) {
  const existingUser = await User.findOne({email});
  if (existingUser) {
    throw new AppError({
      message: "User with this email already exists",
      statusCode: 400,
    });
  }
  const SALT_ROUNDS = 10; 
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  
  const newUser = await User.create({name, email, role, password: hashedPassword });
  return newUser;
}

async function getUserByCredentials({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return null;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return null;
  }
  return user;
}

async function getUserById({ id }: { id: mongoose.Types.ObjectId }) {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new AppError({
      message:
        "Error getting user: " +
        (error instanceof Error ? error.message : "Unknown error"),
      statusCode: 500,
    });
  }
}

async function deleteUserById({ id }: { id: mongoose.Types.ObjectId }) {
  try {
    const user = await User.findByIdAndDelete(id);
    return user;
  } catch (error) {
    throw new AppError({
      message:
        "Error deleting user: " +
        (error instanceof Error ? error.message : "Unknown error"),
      statusCode: 500,
    });
  }
}

const userServices = {
  createUser,
  getUserById,
  getUserByCredentials,
  deleteUserById,
};

export default userServices;
