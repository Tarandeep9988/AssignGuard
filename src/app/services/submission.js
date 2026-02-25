import submissionModel from "@/models/submission";
import { createSubmissionSchema } from "@/schemas/submission";

export async function addSubmissionService(body) {
  // For now, just return the validated data. In a real implementation, this would save to the database.
  const { assignmentId, userId, fileUrl, submittedAt, status } = body;

  const submission = await submissionModel.create({
    assignmentId,
    userId,
    fileUrl,
    submittedAt,
    status,
  });
  return submission;
}

export async function deleteSubmissionService(id) {
  const submission = await submissionModel.findByIdAndDelete(id);
  return submission;
}