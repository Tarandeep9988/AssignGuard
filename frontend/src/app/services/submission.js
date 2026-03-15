import AssignmentModel from "@/models/assignment";
import SubmissionModel from "@/models/submission";
import { createSubmissionSchema } from "@/schemas/submission";

export async function addSubmissionService(data) {
  // For now, just return the validated data. In a real implementation, this would save to the database.
  const { assignmentId, title, content} = data;

  // check if assignmentId exists
  const assignment = await AssignmentModel.findById(assignmentId);
  if (!assignment) {
    throw new Error("Assignment not found");
  }

  const status = new Date() <= new Date() ? "ON_TIME" : "LATE"; 
  const submission = await SubmissionModel.create({
    assignmentId,
    title,
    content,
    status,
  });

  // _id -> id
  const submissionObj = submission.toObject({ versionKey: false });
  submissionObj.id = submissionObj._id;
  delete submissionObj._id;

  return submissionObj;
}

export async function deleteSubmissionService(id) {
  const submission = await SubmissionModel.findByIdAndDelete(id);
  
  if (submission) {
    const submissionObj = submission.toObject({ versionKey: false });
    submissionObj.id = submissionObj._id;
    delete submissionObj._id;
    return submissionObj;
  }
  return submission;
}

export async function getSubmissionsService(assignmentId) {
  const submissions = await SubmissionModel.find({ assignmentId }).select("-__v").lean();
  return submissions.map(submission => {
    submission.id = submission._id;
    delete submission._id;
    return submission;
  });
}

