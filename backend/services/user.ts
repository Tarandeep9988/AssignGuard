import mongoose from "mongoose";
import User from "../models/User";

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
    throw new Error(
      "Error creating user" +
        (error instanceof Error ? ": " + error.message : "Unknown error")
    );
  }
}

export async function getUserById(id: mongoose.Types.ObjectId) {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new Error(
      "Error getting user" +
        (error instanceof Error ? ": " + error.message : "Unknown error")
    );
  }
}

export async function deleteUserById(id: mongoose.Types.ObjectId) {
  try {
    const user = await User.findByIdAndDelete(id);
    return user;
  } catch (error) {
    throw new Error(
      "Error deleting user" +
        (error instanceof Error ? ": " + error.message : "Unknown error")
    );
  }
}