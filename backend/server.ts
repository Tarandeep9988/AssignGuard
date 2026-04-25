import "./config/dotenv.js"
import express from "express";
import { connectDb } from "./lib/db.js";
import submissionRouter from "./routes/submission.js";
import assignmentRouter from "./routes/assignment.js";
import healthRouter from "./routes/health.js";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";

import { errorHandler } from "./middlewares/error.js";

await connectDb();

const app = express();


// middlewares
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
// logging 
app.use(morgan("dev"));


// routes
app.use("/api/v1", healthRouter);
app.use("/api/v1", authRouter);
app.use("/api/v1", submissionRouter);
app.use("/api/v1", assignmentRouter);

// app.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "Backend server is running",
//     data: null,
//   });
// });

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
