import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  deadline: {
    type: Date,
    required: true,
  }, 
}, {timestamps: true});

const AssignmentModel = mongoose.model("Assignment", assignmentSchema);

export default AssignmentModel;