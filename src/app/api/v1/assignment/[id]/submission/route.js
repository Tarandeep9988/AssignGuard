import connectDb from "@/lib/mongodb";
import { getSubmissionsController } from "@/controllers/submission";

export async function GET(request, {params}) {
  await connectDb();
  const { id } = await params;
  return getSubmissionsController({ assignmentId: id });
}
