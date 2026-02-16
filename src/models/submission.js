import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Types.ObjectId,
    ref: 'Assignment',
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    required: true,
  },
  status: ["ON_TIME", "LATE"],
}, {timestamps: true});

const submissionModel = mongoose.model('Submission', submissionSchema);

export default submissionModel;