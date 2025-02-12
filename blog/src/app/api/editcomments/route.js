// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import prisma from "../../../../lib/db";
// import { NextResponse } from "next/server";


// export async function PATCH(request) {
//   const { commentId, content } = await request.json();

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

//     const updatedComment = await prisma.comment.update({
//       where: { id: commentId },
//       data: { content },
//     });

//     return NextResponse.json(updatedComment, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: "Failed to update comment" }, { status: 500 });
//   }
// }






import dbConnect from "@/utils/mongodb";
import Comment from "@/model/Comment";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(request) {
  await dbConnect();

  const { commentId, content } = await request.json();
  const { getUser } = getKindeServerSession();
  const sessionUser = await getUser();

  if (!sessionUser) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const comment = await Comment.findOne({ id: commentId });
    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }
    if (comment.userId !== sessionUser.id) {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      );
    }

    comment.content = content;
    comment.updateAt = Date.now();
    await comment.save();

    return NextResponse.json(comment, { status: 200 });
  } catch (error) {
    console.error("Failed to update comment:", error);
    return NextResponse.json(
      { message: "Failed to update comment" },
      { status: 500 }
    );
  }
}