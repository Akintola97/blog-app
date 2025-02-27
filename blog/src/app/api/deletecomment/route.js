// // // import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// // // import prisma from "../../../../lib/db";
// // // import { NextResponse } from "next/server";

// // // export async function DELETE(request) {
// // //   const { commentId } = await request.json();

// // //   const { getUser } = getKindeServerSession(request);
// // //   const user = await getUser();

// // //   if (!user) {
// // //     return NextResponse.json(
// // //       { message: "Unauthorized" },
// // //       { status: 401 }
// // //     );
// // //   }

// // //   try {
// // //     // Check if the comment exists and belongs to the user
// // //     const comment = await prisma.comment.findUnique({
// // //       where: { id: commentId },
// // //     });

// // //     if (!comment || comment.userId !== user.id) {
// // //       return NextResponse.json(
// // //         { message: "Comment not found or not authorized to delete" },
// // //         { status: 404 }
// // //       );
// // //     }

// // //     // Delete the comment
// // //     await prisma.comment.delete({
// // //       where: { id: commentId },
// // //     });

// // //     return NextResponse.json(
// // //       { message: "Comment deleted successfully" },
// // //       { status: 200 }
// // //     );
// // //   } catch (error) {
// // //     console.error("Failed to delete comment:", error);
// // //     return NextResponse.json(
// // //       { message: "Failed to delete comment" },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }


// // import dbConnect from "@/utils/mongodb";
// // import Comment from "@/model/Comment";
// // import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// // import { NextResponse } from "next/server";

// // export async function DELETE(request) {
// //   // Ensure MongoDB is connected
// //   await dbConnect();

// //   // Extract the commentId from the request body
// //   const { commentId } = await request.json();

// //   // Retrieve the user by passing in the request object
// //   const { getUser } = getKindeServerSession(request);
// //   const user = await getUser();

// //   if (!user) {
// //     return NextResponse.json(
// //       { message: "Unauthorized" },
// //       { status: 401 }
// //     );
// //   }

// //   try {
// //     // Find the comment using its custom 'id' field
// //     const comment = await Comment.findOne({ id: commentId });

// //     // Check if the comment exists and if the user is authorized to delete it
// //     if (!comment || comment.userId !== user.id) {
// //       return NextResponse.json(
// //         { message: "Comment not found or not authorized to delete" },
// //         { status: 404 }
// //       );
// //     }

// //     // Delete the comment
// //     await Comment.deleteOne({ id: commentId });
// //     return NextResponse.json(
// //       { message: "Comment delete successfully" },
// //       { status: 200 }
// //     );
// //   } catch (error) {
// //     console.error("Failed to delete comment:", error);
// //     return NextResponse.json(
// //       { message: "Failed to delete comment" },
// //       { status: 500 }
// //     );
// //   }
// // }


// import dbConnect from "@/utils/mongodb";
// import Comment from "@/model/Comment";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import { NextResponse } from "next/server";

// export async function DELETE(request) {
//   // Ensure MongoDB is connected
//   await dbConnect();

//   // Extract the commentId from the request body
//   const { commentId } = await request.json();

//   // Retrieve the user by passing in the request object
//   const { getUser } = getKindeServerSession(request);
//   const user = await getUser();

//   if (!user) {
//     return NextResponse.json(
//       { message: "Unauthorized" },
//       { status: 401 }
//     );
//   }

//   try {
//     // Find the comment using its custom 'id' field
//     const comment = await Comment.findOne({ id: commentId });

//     // Check if the comment exists and if the user is authorized to delete it
//     if (!comment || comment.userId !== user.id) {
//       return NextResponse.json(
//         { message: "Comment not found or not authorized to delete" },
//         { status: 404 }
//       );
//     }

//     // Delete the comment
//     await Comment.deleteOne({ id: commentId });
//     return NextResponse.json(
//       { message: "Comment delete successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Failed to delete comment:", error);
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
  await dbConnect(); // Ensure MongoDB connection

  const { commentId } = await request.json(); // Extract commentId from request body


  // Retrieve the user session
  const { getUser } = getKindeServerSession(request);
  const user = await getUser();


  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // Find comment by its unique 'id' field
    const comment = await Comment.findOne({ id: commentId });


    if (!comment) {
      return NextResponse.json({ message: "Comment not found" }, { status: 404 });
    }

    // Ensure the user owns the comment before deleting
    if (comment.userId !== user.id) {
      return NextResponse.json({ message: "Forbidden: You cannot delete this comment" }, { status: 403 });
    }

    // Delete the comment
    await Comment.deleteOne({ id: commentId });

    return NextResponse.json({ message: "Comment deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Failed to delete comment:", error);
    return NextResponse.json({ message: "Failed to delete comment" }, { status: 500 });
  }
}