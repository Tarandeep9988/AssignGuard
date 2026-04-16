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
}: {
  assignmentId: string;
  userId?: mongoose.Types.ObjectId | string;
}) {
  const assignment = await Assignment.findById(assignmentId);
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

async function getAllAssignments() {
  return await Assignment.find({});
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

const assignmentServices = {
  createAssignment,
  getAssignmentById,
  getAssignmentsByUserId,
  getAllAssignments,
  updateAssignment,
  deleteAssignment,
};

export default assignmentServices;
