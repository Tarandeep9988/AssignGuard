import express from 'express';
import assignmentController from '../controllers/assignment';
import { authenticate, authorizeTeacher } from '../middlewares/auth';

const assignmentRouter = express.Router();

assignmentRouter.get('/assignments', authenticate, assignmentController.getAllAssignments);
assignmentRouter.post('/assignment', authenticate, authorizeTeacher, assignmentController.createAssignment);
assignmentRouter.delete('/assignment/:id', authenticate, authorizeTeacher, assignmentController.deleteAssignment);


export default assignmentRouter;