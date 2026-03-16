import mongoose from "mongoose";

export async function connectDb() {
  const mongodbUri = process.env.MONGODB_URI;
  if (!mongodbUri) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }
  try {
    await mongoose.connect(mongodbUri);
    console.log("Server connected to MongoDB");
  } catch (error) {
    throw new Error("Failed to connect to MongoDB");
  }
}