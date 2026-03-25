import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
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
}, { timestamps: true });

assignmentSchema.index({ userId: 1 });

assignmentSchema.set('toJSON', {
  transform: function (doc, ret : { _id? : any, __v? : any, id? : any }) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret
  }
});

export default mongoose.model('Assignment', assignmentSchema);