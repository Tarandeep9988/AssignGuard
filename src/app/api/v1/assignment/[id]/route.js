import { deleteAssignmentController } from "@/controllers/assignment";
import connectDb from "@/lib/mongodb";

export async function DELETE(request, { params }) {
  await connectDb();
  return deleteAssignmentController(params);
}