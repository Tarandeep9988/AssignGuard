import mongoose from "mongoose";
import Assignment from "../models/Assignment";
import { AppError } from "../utils/AppError";

interface CreateAssignmentParams {
  title: string;
  description: string;
  dueDate: Date;
  userId: mongoose.Types.ObjectId;
}

export async function createAssignment(data: CreateAssignmentParams) {
  try {
    const assignment = new Assignment(data);
    await assignment.save();
    return assignment;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new AppError({
      message: "Error creating assignment: " + errorMessage,
      statusCode: 500,
    });
  }
}




interface GetAssignmentParams {
  id: mongoose.Types.ObjectId;
}

export async function getAssignment({ id }: GetAssignmentParams) {
  try {
    const assignment = await Assignment.findById(id);
    return assignment;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new AppError({
      message: "Error fetching assignment: " + errorMessage,
      statusCode: 500,
    });
  }
}

interface GetAssignmentsByUserIdParams {
  userId: mongoose.Types.ObjectId;
}

export async function getAssignmentsByUserId({ userId }: GetAssignmentsByUserIdParams) {
  try {
    const assignments = await Assignment.find({ userId });
    return assignments;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new AppError({
      message: "Error fetching assignments: " + errorMessage,
      statusCode: 500,
    });
  }
}

interface deleteAssignmentSchema {
  id: mongoose.Types.ObjectId;
}

export async function deleteAssignment({id} : deleteAssignmentSchema) {
  try {
    const assignment = await Assignment.findByIdAndDelete(id);
    return assignment;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new AppError({
      message: "Error deleting assignment: " + errorMessage,
      statusCode: 500,
    });
  }
}
