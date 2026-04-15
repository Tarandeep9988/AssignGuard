import mongoose from 'mongoose';

const comparisionSchema = new mongoose.Schema({
  student1ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  student2ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  similarityScore: {
    type: Number,
    required: true,
  }, 
});

const reportSchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
    required: true,
  },
  comparisons: [comparisionSchema],
}, { timestamps: true });


reportSchema.index({ assignmentId: 1 }, { unique: true });

export default mongoose.model('Report', reportSchema);