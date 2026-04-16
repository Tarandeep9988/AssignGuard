import mongoose from "mongoose";
import Report from "../models/Report.js";
import Assignment from "../models/Assignment.js";
import { AppError } from "../utils/AppError.js";
import submissionServices from "./submission.js";
import { calculateSimilarity } from "../lib/report.js";

async function getReport({
  assignmentId,
  userId,
}: {
  assignmentId: mongoose.Types.ObjectId | string;
  userId: mongoose.Types.ObjectId | string;
}) {
  // First, verify that the assignment belongs to the user
  const assignment = await Assignment.findOne({ _id: assignmentId, userId });
  if (!assignment) {
    throw new AppError({
      statusCode: 404,
      message: "Assignment not found or you don't have permission to access it",
    });
  }

  const report = await Report.findOne({ assignmentId })
    .populate('comparisons.student1ID', 'name')
    .populate('comparisons.student2ID', 'name');
  return report;
}

async function generateReport({
  assignmentId,
  userId,
}: {
  assignmentId: mongoose.Types.ObjectId | string;
  userId: mongoose.Types.ObjectId | string;
}) {
  // First, verify that the assignment belongs to the user
  const assignment = await Assignment.findOne({ _id: assignmentId, userId });
  if (!assignment) {
    throw new AppError({
      statusCode: 404,
      message: "Assignment not found or you don't have permission to access it",
    });
  }

  // Implement plagiarism detection logic
  const submissions = await submissionServices.getSubmissionsByAssignment({ assignmentId });

  const submissionLen = submissions.length;
  const comparisons = [];

  for (let i = 0; i < submissionLen; i++) {
    for (let j = i + 1; j < submissionLen; j++) {
      const similarityScore = await calculateSimilarity(submissions[i].content, submissions[j].content);
      comparisons.push({
        student1ID: submissions[i].userId,
        student2ID: submissions[j].userId,
        similarityScore,
      });
    }
  }

  const report = await Report.create({
    assignmentId,
    comparisons,
  });
  return await Report.findById(report._id)
    .populate('comparisons.student1ID', 'name')
    .populate('comparisons.student2ID', 'name');
}

const reportServices = {
  getReport,
  generateReport,
}

export default reportServices;