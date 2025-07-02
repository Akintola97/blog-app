export const dynamic = "force-dynamic";

import dbConnect from "@/utils/mongodb";
import Comment from "@/model/Comment";
import User from "@/model/User";
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId");

  if (!postId) {
    return NextResponse.json(
      { message: "postId is required" },
      { status: 400 }
    );
  }

  try {
    async function populateReplies(comments) {
      return Promise.all(
        comments.map(async (comment) => {
          // Populate user and replies for this comment
          await comment.populate("user");
          await comment.populate("replies");
          // If there are replies, recursively populate them
          if (comment.replies.length > 0) {
            comment.replies = await populateReplies(comment.replies);
          }
          return comment;
        })
      );
    }

    let comments = await Comment.find({ postId, parentId: null })
      .sort({ createdAt: 1 })
      .populate("user")
      .populate("replies");

    comments = await populateReplies(comments);
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch comments", error);
    return NextResponse.json(
      { message: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}
