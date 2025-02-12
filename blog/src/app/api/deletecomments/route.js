// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import prisma from "../../../../lib/db";
// import { NextResponse } from "next/server";

// export async function DELETE(request) {
//   const { commentId } = await request.json();

//   const { getUser } = getKindeServerSession(request);
//   const user = await getUser();

//   if (!user) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const comment = await prisma.comment.findUnique({
//       where: { id: commentId },
//     });

//     if (comment.userId !== user.id) {
//       return NextResponse.json({ message: "Forbidden" }, { status: 403 });
//     }

//     await prisma.comment.delete({
//       where: { id: commentId },
//     });

//     return NextResponse.json({ message: "Comment deleted" }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: "Failed to delete comment" }, { status: 500 });
//   }
// }







import dbConnect from "@/utils/mongodb";
import Comment from "@/model/Comment";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  // Ensure MongoDB is connected
  await dbConnect();

  // Extract the commentId from the request body
  const { commentId } = await request.json();

  // Get the current user from the session (without passing request here)
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // Find the comment by its custom 'id' field
    const comment = await Comment.findOne({ id: commentId });
    
    // Check if the comment exists and if the user is authorized to delete it
    if (!comment || comment.userId !== user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // Delete the comment
    await Comment.deleteOne({ id: commentId });
    return NextResponse.json({ message: "comment deleted" }, { status: 200 });
  } catch (error) {
    console.error("Failed to delete comment:", error);
    return NextResponse.json(
      { message: "Failed to delete comment" },
      { status: 500 }
    );
  }
}