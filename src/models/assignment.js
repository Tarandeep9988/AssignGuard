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
    
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    
  },  
}, {timestamps: true});


const Assignment =
  mongoose.models.Assignment ||
  mongoose.model("Assignment", assignmentSchema);

export default Assignment;