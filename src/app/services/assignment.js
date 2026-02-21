import Assignment from "@/models/assignment";

export async function addAssignmentService(body) {
  // already validated by controller, can directly save to database
  return await Assignment.create(body);
}