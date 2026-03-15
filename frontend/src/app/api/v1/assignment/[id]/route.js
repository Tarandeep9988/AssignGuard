import { deleteAssignmentController } from "@/controllers/assignment";
import connectDb from "@/lib/mongodb";

export async function DELETE(request, { params }) {
  await connectDb();
  const { id } = await params;
  return deleteAssignmentController({ id });
}