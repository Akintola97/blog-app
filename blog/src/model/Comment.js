// models/Comment.js
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const CommentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    // parentId is null for top-level comments.
    parentId: {
      type: String,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual field to populate the comment’s author
CommentSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "id",
  justOne: true,
});

// Virtual field to populate replies (child comments)
CommentSchema.virtual("replies", {
  ref: "Comment",
  localField: "id",
  foreignField: "parentId",
});

// Update the updateAt field before each save
CommentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema);