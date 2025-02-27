// // import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// // import prisma from "../../../../lib/db";
// // import { NextResponse } from "next/server";

// // export async function POST(request) {
// //   const { postId, content, parentId } = await request.json();

// //   const { getUser } = getKindeServerSession(request);
// //   const user = await getUser();

// //   if (!user) {
// //     return NextResponse.json(
// //       { message: "Unauthorized" },
// //       { status: 401 }
// //     );
// //   }

// //   try {
// //     // Check if the user exists in the database
// //     let existingUser = await prisma.user.findUnique({
// //       where: { id: user.id },
// //     });

// //     // If the user doesn't exist, create a new one
// //     if (!existingUser) {
// //       existingUser = await prisma.user.create({
// //         data: {
// //           id: user.id,
// //           givenName: user.given_name,
// //           picture: user.picture,
// //           email: user.email,
// //         },
// //       });
// //     }

// //     // Create the new comment
// //     const newComment = await prisma.comment.create({
// //       data: {
// //         content,
// //         postId,
// //         userId: existingUser.id,
// //         parentId: parentId || null,
// //       },
// //       include: {
// //         user: true,  // Include user details in the response
// //       },
// //     });

// //     return NextResponse.json(newComment, { status: 200 });
// //   } catch (error) {
// //     console.error("Failed to create comment:", error);
// //     return NextResponse.json(
// //       { message: "Failed to create comment" },
// //       { status: 500 }
// //     );
// //   }
// // }



// import dbConnect from "@/utils/mongodb";
// import Comment from "@/model/Comment";
// import User from "@/model/User";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   // Ensure MongoDB is connected
//   await dbConnect();

//   const { postId, content, parentId } = await request.json();

//   const { getUser } = getKindeServerSession(request);
//   const sessionUser = await getUser();

//   if (!sessionUser) {
//     return NextResponse.json(
//       { message: "Unauthorized" },
//       { status: 401 }
//     );
//   }

//   try {
//     // Find or create the user in the local DB.
//     let existingUser = await User.findOne({ id: sessionUser.id });
//     if (!existingUser) {
//       existingUser = await User.create({
//         id: sessionUser.id,
//         givenName: sessionUser.given_name,
//         picture: sessionUser.picture || "",
//         email: sessionUser.email,
//       });
//     }

//     // Create the comment document.
//     const newComment = await Comment.create({
//       content,
//       postId,
//       userId: existingUser.id,
//       parentId: parentId || null,
//       createdAt: Date.now(),
//       updateAt: Date.now(),
//     });

//     // Optionally populate the user field for the response.
//     await newComment.populate("user");

//     return NextResponse.json(newComment, { status: 200 });
//   } catch (error) {
//     console.error("Failed to create comment:", error);
//     return NextResponse.json(
//       { message: "Failed to create comment" },
//       { status: 500 }
//     );
//   }
// }

import dbConnect from "@/utils/mongodb";
import Comment from "@/model/Comment";
import User from "@/model/User";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
export async function POST(request) {
  await dbConnect(); // Ensure database connection

  const { postId, content, parentId } = await request.json();

  const { getUser } = getKindeServerSession(request);
  const sessionUser = await getUser();

  if (!sessionUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // Check if user exists using either ID or Email
    let existingUser = await User.findOne({
      $or: [{ id: sessionUser.id }, { email: sessionUser.email }],
    });

    // If user does not exist, create a new user entry
    if (!existingUser) {
      existingUser = await User.create({
        id: sessionUser.id,
        givenName: sessionUser.given_name,
        picture: sessionUser.picture || "",
        email: sessionUser.email,
      });
    }

    // Create the comment document
    const newComment = await Comment.create({
      content,
      postId,
      userId: existingUser.id,
      parentId: parentId || null,
      createdAt: Date.now(),
      updateAt: Date.now(),
    });

    // Populate the user field for the response
    await newComment.populate("user");

    return NextResponse.json(newComment, { status: 200 });
  } catch (error) {
    console.error("Failed to create comment:", error);
    return NextResponse.json(
      { message: "Failed to create comment" },
      { status: 500 }
    );
  }
}