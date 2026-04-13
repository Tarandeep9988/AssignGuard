import express, { type Router } from 'express';
import authController from "../controllers/auth.js";
const authRouter: Router = express.Router();

authRouter.post("/login", authController.loginHandler);
authRouter.post("/register", authController.registerHandler);
authRouter.post("/logout", authController.logoutHandler);
authRouter.get("/verify", authController.verifyHandler);

export default authRouter;