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


async function getAssignmentById({ assignmentId, userId }: { assignmentId: string, userId: mongoose.Types.ObjectId }) {
  try {
    const assignment = await Assignment.findOne({ _id: assignmentId, userId });
    return assignment;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new AppError({
      message: "Error fetching assignment: " + errorMessage,
      statusCode: 500,
    });
  }
}

async function updateAssignment({ assignmentId, userId, title, description, dueDate }: {
  assignmentId: string,
  userId: mongoose.Types.ObjectId,
  title?: string,
  description?: string,
  dueDate?: string,
}) {
  const update: any = {};
  if (title !== undefined) update.title = title;
  if (description !== undefined) update.description = description;
  if (dueDate !== undefined) update.dueDate = new Date(dueDate);
  const assignment = await Assignment.findOneAndUpdate(
    { _id: assignmentId, userId },
    { $set: update },
    { new: true }
  );
  return assignment;
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
  getAssignmentById,
  getAssignmentsByUserId,
  updateAssignment,
  deleteAssignment,
}

export default assignmentServices;