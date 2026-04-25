import express, { type Router } from 'express';
import { healthCheckHandler } from '../controllers/health.js';

const healthRouter: Router = express.Router();

healthRouter.get("/health", healthCheckHandler);

export default healthRouter;