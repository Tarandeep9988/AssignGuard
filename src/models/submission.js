import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["ON_TIME", "LATE"],
    required: true,
  },
}, {timestamps: true});

const submissionModel = 
  mongoose.models.Submission ||
  mongoose.model('Submission', submissionSchema);

export default submissionModel;