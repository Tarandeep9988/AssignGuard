import { addAssignmentController, getAssignmentsController } from "@/controllers/assignment";
import connectDb from "@/lib/mongodb";

export async function POST(request) {
  await connectDb();
  const body = await request.json();
  return addAssignmentController(body);
}

export async function GET(request) {
  await connectDb();
  return getAssignmentsController();
}