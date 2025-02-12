// // import { NextResponse } from "next/server";
// // import prisma from "../../../../lib/db";

// // export async function GET(request) {
// //   const { searchParams } = new URL(request.url);
// //   const postId = searchParams.get("postId");

// //   if (!postId) {
// //     return NextResponse.json(
// //       {
// //         message: "postId is required",
// //       },
// //       { status: 400 }
// //     );
// //   }

// //   try {
// //     const comments = await prisma.comment.findMany({
// //       where: { postId, parentId: null },
// //       include: {
// //         user: true,
// //         replies: {
// //           include: {
// //             user: true,
// //             replies: {
// //               include: {
// //                 user: true,
// //               },
// //             },
// //           },
// //           orderBy: { createdAt: "asc" },
// //         },
// //       },
// //       orderBy: { createdAt: "asc" },
// //     });
// //     return NextResponse.json(comments, { status: 200 });
// //   } catch (error) {
// //     return NextResponse.json({
// //         message:"Failed to fetch comments"
// //     }, {status:500})
// //   }
// // }


// import dbConnect from "@/utils/mongodb";
// import Comment from "@/model/Comment";
// import { NextResponse } from "next/server";

// export async function GET(request) {
//   await dbConnect();

//   const { searchParams } = new URL(request.url);
//   const postId = searchParams.get("postId");

//   if (!postId) {
//     return NextResponse.json(
//       { message: "postId is required" },
//       { status: 400 }
//     );
//   }

//   try {
//     // Fetch top-level comments (parentId is null), sorted by creation time.
//     const comments = await Comment.find({ postId, parentId: null })
//       .sort({ createdAt: 1 })
//       .populate("user")
//       .populate({
//         path: "replies",
//         options: { sort: { createdAt: 1 } },
//         populate: { path: "user" },
//       });

//     return NextResponse.json(comments, { status: 200 });
//   } catch (error) {
//     console.error("Failed to fetch comments:", error);
//     return NextResponse.json(
//       { message: "Failed to fetch comments" },
//       { status: 500 }
//     );
//   }
// }



import dbConnect from "@/utils/mongodb";
import Comment from "@/model/Comment";
import "@/model/User"; // This ensures that the User model is registered.
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
    // Fetch top-level comments (parentId is null), sorted by creation time.
    const comments = await Comment.find({ postId, parentId: null })
      .sort({ createdAt: 1 })
      .populate("user")
      .populate({
        path: "replies",
        options: { sort: { createdAt: 1 } },
        populate: { path: "user" },
      });

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    return NextResponse.json(
      { message: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}