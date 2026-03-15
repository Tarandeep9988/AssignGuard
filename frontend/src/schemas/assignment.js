import { z } from "zod";

export const createAssignmentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  deadline: z.coerce.date().refine(
    (date) => date > new Date(), 
    {
      message: "Deadline must be a future date"
    }),
}).strict();

export const deleteAssignmentSchema = z.object({
  id: z.string().min(1, "Assignment ID is required"),
}).strict();