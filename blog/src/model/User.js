// models/User.js
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const UserSchema = new mongoose.Schema(
  {
    // We create our own id field (mirroring your Prisma model) rather than using MongoDB’s _id.
    id: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    givenName: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  {
    // Enable virtuals (useful for populating related documents)
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual to populate a user's comments (if needed)
UserSchema.virtual("comments", {
  ref: "Comment",
  localField: "id", // using our custom id
  foreignField: "userId",
});

export default mongoose.models.User || mongoose.model("User", UserSchema);