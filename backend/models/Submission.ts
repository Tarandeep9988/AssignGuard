import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
    required: true,
  },
}, { timestamps: true });

submissionSchema.index({ userId: 1 });



submissionSchema.set('toJSON', {
  transform: function (doc, ret : { _id? : any, __v? : any, id? : any }) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret
  }
});

export default mongoose.model('Submission', submissionSchema);