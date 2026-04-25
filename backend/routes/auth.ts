import express, { type Router } from 'express';
import { loginHandler, registerHandler } from "../controllers/auth.js";
const authRouter: Router = express.Router();

authRouter.post("/login", loginHandler);
authRouter.post("/register", registerHandler);


export default authRouter;