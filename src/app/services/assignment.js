import Assignment from "@/models/assignment";

export async function addAssignmentService(data) {
  const assignment = await Assignment.create(data);
  const assignmentObj = assignment.toObject({versionKey: false});
  assignmentObj.id = assignmentObj._id;
  delete assignmentObj._id;
  return assignmentObj;
}

export async function deleteAssignmentService(id) {
  const assignment = await Assignment.findByIdAndDelete(id);
  const assignmentObj = assignment ? assignment.toObject({versionKey: false}) : null;
  if (assignment) {
    assignmentObj.id = assignmentObj._id;
    delete assignmentObj._id;
  }
  return assignmentObj;
}