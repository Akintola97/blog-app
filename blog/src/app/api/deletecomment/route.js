// import dbConnect from "@/utils/mongodb";
// import Comment from "@/model/Comment";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import { NextResponse } from "next/server";

// export async function DELETE(request) {
//   await dbConnect();

//   const { commentId } = await request.json();
//   const { getUser } = getKindeServerSession(request);
//   const user = await getUser();

//   if (!user) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     // Find the comment by its 'id'
//     const comment = await Comment.findOne({ id: commentId });
//     if (!comment) {
//       return NextResponse.json(
//         { message: "Comment not found" },
//         { status: 404 }
//       );
//     }

//     // Already deleted?
//     if (comment.isDeleted) {
//       return NextResponse.json(
//         { message: "Cannot delete a comment that has already been deleted" },
//         { status: 400 }
//       );
//     }

//     // Ensure the user owns the comment
//     if (comment.userId !== user.id) {
//       return NextResponse.json({ message: "Forbidden" }, { status: 403 });
//     }

//     // Soft delete: set content + isDeleted
//     await Comment.updateOne(
//       { id: commentId },
//       {
//         content: "This comment has been deleted",
//         isDeleted: true,
//         updatedAt: Date.now(),
//       }
//     );

//     return NextResponse.json(
//       { message: "Comment deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Failed to delete comment", error);
//     return NextResponse.json(
//       { message: "Failed to delete comment" },
//       { status: 500 }
//     );
//   }
// }



import dbConnect from "@/utils/mongodb";
import Comment from "@/model/Comment";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  await dbConnect();

  const { commentId } = await request.json();
  const { getUser } = getKindeServerSession(request);
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // Find the comment by its unique 'id'
    const comment = await Comment.findOne({ id: commentId });
    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }

    // If comment is already deleted, prevent repeated deletions
    if (comment.isDeleted) {
      return NextResponse.json(
        { message: "Cannot delete a comment that has already been deleted" },
        { status: 400 }
      );
    }

    // Ensure the user owns the comment
    if (comment.userId !== user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // Soft delete by updating content & isDeleted flag
    await Comment.updateOne(
      { id: commentId },
      {
        content: "This comment has been deleted",
        isDeleted: true,
        updatedAt: Date.now(),
      }
    );

    return NextResponse.json(
      { message: "Comment deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete comment", error);
    return NextResponse.json(
      { message: "Failed to delete comment" },
      { status: 500 }
    );
  }
}