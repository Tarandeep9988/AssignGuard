import mongoose from "mongoose";
import Assignment from "../models/Assignment.js";
import { AppError } from "../utils/AppError.js";
import submissionServices from "./submission.js";

async function createAssignment({
  title,
  description,
  dueDate,
  userId,
}: {
  title: string;
  description: string;
  dueDate: Date;
  userId: mongoose.Types.ObjectId | string;
}) {
  if (dueDate < new Date()) {
    throw new AppError({
      message: "Due date cannot be in the past",
      statusCode: 400,
    });
  }
  const assignment = await Assignment.create({
    title,
    description,
    dueDate,
    userId,
  });
  return assignment;
}

async function getAssignmentById({
  assignmentId,
  userId,
}: {
  assignmentId: string;
  userId: mongoose.Types.ObjectId | string;
}) {
  const assignment = await Assignment.findOne({ _id: assignmentId, userId });
  return assignment;
}

async function updateAssignment({
  assignmentId,
  userId,
  title,
  description,
  dueDate,
}: {
  assignmentId: mongoose.Types.ObjectId | string;
  userId: mongoose.Types.ObjectId | string;
  title?: string;
  description?: string;
  dueDate?: Date;
}) {
  const update: any = {};
  if (title !== undefined) update.title = title;
  if (description !== undefined) update.description = description;
  if (dueDate !== undefined) update.dueDate = new Date(dueDate);

  if (update.dueDate && update.dueDate < new Date()) {
    throw new AppError({
      message: "Due date cannot be in the past",
      statusCode: 400,
    });
  }

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
  userId: mongoose.Types.ObjectId | string;
}) {
  const assignments = await Assignment.find({ userId });
  return assignments;
}

async function deleteAssignment({
  assignmentId,
  userId,
}: {
  assignmentId: mongoose.Types.ObjectId | string;
  userId: mongoose.Types.ObjectId | string;
}) {
  const assignment = await Assignment.findOneAndDelete({
    _id: assignmentId,
    userId,
  });
  // also delete corresponding submissions
  await submissionServices.deleteSubmissionsByAssignment({ assignmentId });
  return assignment;
}

async function getPlagiarismReport({
  userId,
  assignmentId,
}: {
  userId: mongoose.Types.ObjectId | string;
  assignmentId: mongoose.Types.ObjectId | string;
}) {
  // Placeholder implementation for plagiarism report generation
  // In a real implementation, this would involve complex logic to compare the assignment with other submissions
  // and generate a report based on the findings.

  throw new AppError({
    statusCode: 501,
    message: "Plagiarism report generation is not implemented yet",
  });
}

const assignmentServices = {
  createAssignment,
  getAssignmentById,
  getAssignmentsByUserId,
  updateAssignment,
  deleteAssignment,
  getPlagiarismReport,
};

export default assignmentServices;
