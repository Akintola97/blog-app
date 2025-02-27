// // models/User.js
// import mongoose from "mongoose";
// import { v4 as uuidv4 } from "uuid";

// const UserSchema = new mongoose.Schema(
//   {
//     // We create our own id field (mirroring your Prisma model) rather than using MongoDB’s _id.
//     id: {
//       type: String,
//       default: uuidv4,
//       unique: true,
//     },
//     givenName: {
//       type: String,
//       required: true,
//     },
//     picture: {
//       type: String,
//       default: "",
//     },
//     email: {
//       type: String,
//       unique: true,
//       sparse: true,
//     },
//   },
//   {
//     // Enable virtuals (useful for populating related documents)
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true },
//   }
// );

// // Virtual to populate a user's comments (if needed)
// UserSchema.virtual("comments", {
//   ref: "Comment",
//   localField: "id", // using our custom id
//   foreignField: "userId",
// });

// export default mongoose.models.User || mongoose.model("User", UserSchema);



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
    isDeleted: {
      type: Boolean,
      default: false, // Track if the comment is deleted
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

// Update the updatedAt field before each save
CommentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Comment || mongoose.model("Comment", CommentSchema);