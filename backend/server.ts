import "./config/dotenv.ts"
import express from "express";
import { connectDb } from "./lib/db.ts";
import userRouter from "./routes/user.ts";
import submissionRouter from "./routes/submission.ts";
import assignmentRouter from "./routes/assignment.ts";
import healthRouter from "./routes/health.ts";

await connectDb();

const app = express();


// middlewares
app.use(express.json());


// routes
app.use("/api/v1", userRouter);
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

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
