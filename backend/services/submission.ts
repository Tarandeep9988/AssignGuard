import mongoose from "mongoose";
import Submission from "../models/Submission.js";
import { AppError } from "../utils/AppError.js";

// Create a new submission
async function createSubmission({
  content,
  userId,
  assignmentId,
}: {
  content: string;
  userId: mongoose.Types.ObjectId | string;
  assignmentId: mongoose.Types.ObjectId | string;
}) {
  // Submission already exists for this user and assignment
  const existingSubmission = await Submission.findOne({ user: userId, assignment: assignmentId });
  if (existingSubmission) {
    throw new AppError({
      statusCode: 400,
      message: "Submission already exists for this user and assignment",
    });
  }

  // Safe to create new submission
  const submission = await Submission.create({
    content,
    userId,
    assignmentId,
  });
  return submission;
}

// Get all submissions for a user
async function getSubmissionsByUser({
  userId,
}: {
  userId: mongoose.Types.ObjectId | string;
}) {
  const submissions = await Submission.find({ userId });
  return submissions;
}

// Get a specific submission by ID
async function getSubmissionById({
  id,
}: {
  id: mongoose.Types.ObjectId | string;
}) {
  const submission = await Submission.findById(id);
  if (!submission) {
    throw new AppError({
      statusCode: 404,
      message: "Submission not found",
    });
  }
  return submission;
}

// Get all submissions for an assignment
async function getSubmissionsByAssignment({
  assignmentId,
}: {
  assignmentId: mongoose.Types.ObjectId | string;
}) {
  const submissions = await Submission.find({ assignmentId });
  return submissions;
}

// Update a submission
async function updateSubmission({
  id,
  content,
}: {
  id: mongoose.Types.ObjectId | string;
  content: string;
}) {
  const submission = await Submission.findByIdAndUpdate(id, { content }, { new: true });
  if (!submission) {
    throw new AppError({
      statusCode: 404,
      message: "Submission not found",
    });
  }
  return submission;
}

// Delete a submission
async function deleteSubmission({
  id,
}: {
  id: mongoose.Types.ObjectId | string;
}) {
  const submission = await Submission.findByIdAndDelete(id);
  if (!submission) {
    throw new AppError({
      statusCode: 404,
      message: "Submission not found",
    });
  }
  return submission;
}

async function deleteSubmissionsByAssignment({
  assignmentId,
}: {
  assignmentId: mongoose.Types.ObjectId | string;
}) {
  await Submission.deleteMany({ assignmentId });
} 

const submissionServices = {
  createSubmission,
  getSubmissionsByUser,
  getSubmissionById,
  getSubmissionsByAssignment,
  deleteSubmissionsByAssignment,
  updateSubmission,
  deleteSubmission,
};

export default submissionServices;
