import express from 'express';
import assignmentController from '../controllers/assignment';
import { authenticate } from '../middlewares/auth';

const assignmentRouter = express.Router();

assignmentRouter.get('/assignments', authenticate, assignmentController.getAllAssignments);



export default assignmentRouter;