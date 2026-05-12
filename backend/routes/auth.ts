import express, { type Router } from 'express';
import authController from "../controllers/auth.js";
import { authenticate } from '../middlewares/auth.js';

const authRouter: Router = express.Router();

authRouter.post("/login", authController.loginHandler);
authRouter.post("/register", authController.registerHandler);

// Protected routes
authRouter.post("/logout", authenticate, authController.logoutHandler);
authRouter.get("/verify", authenticate, authController.verifyHandler);

export default authRouter;