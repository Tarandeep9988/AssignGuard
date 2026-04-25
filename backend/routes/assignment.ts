import express, { type Router } from 'express';
import assignmentController from '../controllers/assignment.js';
import { authenticate, authorizeTeacher } from '../middlewares/auth.js';

const assignmentRouter: Router = express.Router();

assignmentRouter.get('/assignments', authenticate, assignmentController.getAllUserAssignments);
assignmentRouter.get('/assignments/:assignmentId', authenticate, assignmentController.getAssignmentById);
assignmentRouter.post('/assignments', authenticate, authorizeTeacher, assignmentController.createAssignment);
assignmentRouter.put('/assignments/:assignmentId', authenticate, authorizeTeacher, assignmentController.updateAssignment);
assignmentRouter.delete('/assignments/:assignmentId', authenticate, authorizeTeacher, assignmentController.deleteAssignment);


// Route for plagiarism check
assignmentRouter.get('/assignments/:assignmentId/plagiarism-report', assignmentController.getPlagiarismReport)

export default assignmentRouter;