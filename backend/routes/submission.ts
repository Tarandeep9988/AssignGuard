import express, { type Router } from 'express';
import { authenticate, authorizeStudent, authorizeTeacher } from "../middlewares/auth.js";
import submissionController from "../controllers/submission.js";

const submissionRouter: Router = express.Router();

// middleware to authenticate user
submissionRouter.use(authenticate);

// Create a new submission for a user
submissionRouter.post(
  "/assignments/:assignmentId/submissions",
  authorizeStudent,
  submissionController.createSubmission
)

// Get all submissions for a user
submissionRouter.get(
  "/submissions",
  authorizeStudent,
  submissionController.getSubmissionsByUser
);



// Get all submission for an assignment
submissionRouter.get(
  "/assignments/:assignmentId/submissions",
  authorizeTeacher,
  submissionController.getSubmissionsByAssignment
);


// Get a specific submission
submissionRouter.get(
  "/submissions/:submissionId",
  submissionController.getSubmissionById
);

// Update a submission
submissionRouter.put(
  "/submissions/:submissionId",
  authorizeStudent,
  submissionController.updateSubmission
);

// Delete a submission
submissionRouter.delete(
  "/submissions/:submissionId",
  submissionController.deleteSubmission
);

export default submissionRouter;
