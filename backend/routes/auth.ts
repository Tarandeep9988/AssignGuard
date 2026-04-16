import express, { type Router } from 'express';
import authController from "../controllers/auth.js";
import { authenticate } from '../middlewares/auth.js';

const authRouter: Router = express.Router();

// Public routes
authRouter.post("/login", authController.loginHandler);
authRouter.post("/register", authController.registerHandler);
authRouter.post("/logout", authController.logoutHandler);

// Protected routes
authRouter.get("/verify", authenticate, authController.verifyHandler);

export default authRouter;