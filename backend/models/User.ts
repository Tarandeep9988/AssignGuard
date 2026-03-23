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
  },
}, {timestamps: true});

// Setting indexing on email for faster queries and ensuring uniqueness
userSchema.index({ email: 1 }, { unique: true });


export default mongoose.model("User", userSchema);