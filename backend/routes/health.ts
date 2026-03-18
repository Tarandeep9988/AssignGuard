import express from 'express';
import { healthCheckHandler } from '../controllers/health';

const healthRouter = express.Router();

healthRouter.get("/health", healthCheckHandler);

export default healthRouter;