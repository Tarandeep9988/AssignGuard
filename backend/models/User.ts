import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true, // Uniqueness is enforced at db level through indexing below
  },
  role: {
    type: String,
    enum: ["student", "teacher"],
    default: "student",
  },
  password: {
    type: String,
    required: true,
    select: false, // Exclude password from query results by default
  },
}, {timestamps: true});

// Setting indexing on email for faster queries and ensuring uniqueness
userSchema.index({ email: 1 }, { unique: true });


userSchema.set("toJSON", {
  transform: (doc, ret: { _id?: any, password?: any, id?: any, __v?: any}) => {
    ret.id = ret._id; 
    delete ret._id;
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("User", userSchema);