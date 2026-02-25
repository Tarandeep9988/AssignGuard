import { z } from "zod";

export const createSubmissionSchema = z.object({
  assignmentId: z.string().min(1, "Assignment ID is required"),
  userId: z.string().min(1, "User ID is required"),
  fileUrl: z.string().url({ message: "File URL must be a valid URL" }),
  submittedAt: z.coerce.date(),
  status: z.enum(["ON_TIME", "LATE"], {
    errorMap: () => ({ message: "Status must be either ON_TIME or LATE" })
  }),
}).strict();

