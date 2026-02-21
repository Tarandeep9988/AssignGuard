import { addAssignmentController } from "@/controllers/assignment";
import connectDb from "@/lib/mongodb";

export async function POST(request) {
  await connectDb();
  return addAssignmentController(request);
}