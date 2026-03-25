import mongoose from "mongoose";
import Assignment from "../models/Assignment";
import { AppError } from "../utils/AppError";

async function createAssignment({
  title,
  description,
  dueDate,
  userId,
}: {
  title: string;
  description: string;
  dueDate: Date;
  userId: mongoose.Types.ObjectId;
}) {
  const assignment = await Assignment.create({
    title,
    description,
    dueDate,
    userId,
  });
  return assignment;
}

interface GetAssignmentParams {
  id: mongoose.Types.ObjectId;
}

async function getAssignment({ id } : { id: mongoose.Types.ObjectId | string}) {
  try {
    const assignment = await Assignment.findByIdAndDelete(id);
    return assignment;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    throw new AppError({
      message: "Error fetching assignment: " + errorMessage,
      statusCode: 500,
    });
  }
}


async function getAssignmentsByUserId({
  userId,
}: {
  userId: mongoose.Types.ObjectId;
}) {
  const assignments = await Assignment.find({ userId });
  return assignments;
}


async function deleteAssignment({ id }: {
  id: mongoose.Types.ObjectId | string;
}) {
  try {
    const assignment = await Assignment.findByIdAndDelete(id);
    return assignment;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    throw new AppError({
      message: "Error deleting assignment: " + errorMessage,
      statusCode: 500,
    });
  }
}

const assignmentServices = {
  createAssignment,
  getAssignment,
  getAssignmentsByUserId,
  deleteAssignment,
}

export default assignmentServices;