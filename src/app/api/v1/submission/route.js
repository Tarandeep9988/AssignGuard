import { addSubmissionController } from "@/controllers/submission";
import connectDb from "@/lib/mongodb"

export async function POST(request) {
  await connectDb();
  const body = await request.json();
  return addSubmissionController(body);
}