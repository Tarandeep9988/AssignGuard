import { z } from "zod";

export const createSubmissionSchema = z.object({
  assignmentId: z.string().min(1, "Assignment ID is required"),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
}).strict();

