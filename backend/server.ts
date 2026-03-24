import "./config/dotenv.ts"
import express from "express";
import { connectDb } from "./lib/db.ts";
import submissionRouter from "./routes/submission.ts";
import assignmentRouter from "./routes/assignment.ts";
import healthRouter from "./routes/health.ts";
import helmet from "helmet";
import morgan from "morgan";
import authRouter from "./routes/auth.ts";
import { errorHandler } from "./middlewares/error.ts";

await connectDb();

const app = express();


// middlewares
app.use(helmet());
app.use(express.json());
// logging 
app.use(morgan("dev"));


// routes
app.use("/api/v1", authRouter);
app.use("/api/v1", submissionRouter);
app.use("/api/v1", assignmentRouter);
app.use("/", healthRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend server is running",
    data: null,
  });
});

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
