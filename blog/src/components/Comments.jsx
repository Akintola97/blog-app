// "use client";

// import React, { useState, useEffect } from "react";
// import CommentForm from "./CommentForm";
// import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress from Material-UI
// import CommentData from "./CommentData";

// export default function Comments({ postId }) {
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(true); // Add loading state

//   // Function to calculate the total number of comments, including replies
//   const calculateCommentCount = (commentsArray) => {
//     let count = commentsArray.length;
//     commentsArray.forEach(comment => {
//       if (comment.replies && comment.replies.length > 0) {
//         count += comment.replies.length;
//       }
//     });
//     return count;
//   };

//   useEffect(() => {
//     async function loadComments() {
//       try {
//         const response = await fetch(`/api/getcomments?postId=${postId}`);
//         const initialComments = await response.json();

//         // Ensure comments is an array
//         if (Array.isArray(initialComments)) {
//           setComments(initialComments);
//         } else {
//           setComments([]);
//         }
//       } catch (error) {
//         console.error("Failed to load comments", error);
//         setComments([]); // Set to an empty array in case of error
//       } finally {
//         setLoading(false); // Stop loading after comments are fetched
//       }
//     }

//     loadComments();
//   }, [postId]);

//   const addReply = async (parentId, content) => {
//     try {
//       const response = await fetch("/api/postcomments", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ postId, content, parentId }),
//       });

//       if (response.ok) {
//         const newComment = await response.json();

//         const updateReplies = (comments, parentId, newComment) => {
//           return comments.map((comment) => {
//             if (comment.id === parentId) {
//               return {
//                 ...comment,
//                 replies: [...(comment.replies || []), newComment],
//               };
//             } else if (comment.replies?.length) {
//               return {
//                 ...comment,
//                 replies: updateReplies(comment.replies, parentId, newComment),
//               };
//             } else {
//               return comment;
//             }
//           });
//         };

//         setComments((prevComments) =>
//           updateReplies(prevComments, parentId, newComment)
//         );
//       } else {
//         console.error("Failed to submit reply");
//       }
//     } catch (error) {
//       console.error("Failed to submit reply", error);
//     }
//   };

//   const deleteComment = async (commentId) => {
//     try {
//       const response = await fetch("/api/deletecomment", {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ commentId }),
//       });

//       if (response.ok) {
//         setComments((prevComments) =>
//           prevComments.filter((comment) => comment.id !== commentId)
//         );
//       } else {
//         console.error("Failed to delete comment");
//       }
//     } catch (error) {
//       console.error("Failed to delete comment", error);
//     }
//   };

//   const editComment = async (commentId, content) => {
//     try {
//       const response = await fetch("/api/editcomment", {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ commentId, content }),
//       });

//       if (response.ok) {
//         await response.json();
//         setComments((prevComments) =>
//           prevComments.map((comment) =>
//             comment.id === commentId ? { ...comment, content } : comment
//           )
//         );
//       } else {
//         console.error("Failed to update comment");
//       }
//     } catch (error) {
//       console.error("Failed to update comment", error);
//     }
//   };

//   const handleSubmitComment = async (content) => {
//     try {
//       const response = await fetch("/api/postcomments", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ postId, content }),
//       });

//       if (response.ok) {
//         const newComment = await response.json();
//         setComments((prevComments) => [...prevComments, newComment]);
//       } else {
//         console.error("Failed to submit comment");
//       }
//     } catch (error) {
//       console.error("Failed to submit comment", error);
//     }
//   };

//   const commentCount = calculateCommentCount(comments);

//   return (
//     <div className="mt-12 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
//         Comments {commentCount > 0 && `(${commentCount})`}
//       </h2>
//       <CommentForm handleSubmitComment={handleSubmitComment} />

//       {/* Show loading spinner while comments are loading */}
//       {loading ? (
//         <div className="flex justify-center my-6">
//           <CircularProgress />
//         </div>
//       ) : (
//         <div className="space-y-6">
//           {comments.length === 0 ? (
//             <p className="text-gray-600 dark:text-gray-400">
//               No comments yet. Be the first to comment!
//             </p>
//           ) : (
//             comments && comments.map((comment) => (
//               <CommentData
//                 key={comment.id}
//                 comment={comment}
//                 addReply={addReply}
//                 deleteComment={deleteComment}
//                 editComment={editComment}
//               />
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// }



"use client";

import React, { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress from Material-UI
import CommentData from "./CommentData";

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  // Function to calculate the total number of comments, including replies
  const calculateCommentCount = (commentsArray) => {
    let count = commentsArray.length;
    commentsArray.forEach((comment) => {
      if (comment.replies && comment.replies.length > 0) {
        count += comment.replies.length;
      }
    });
    return count;
  };

  useEffect(() => {
    async function loadComments() {
      try {
        const response = await fetch(`/api/getcomments?postId=${postId}`);
        const initialComments = await response.json();

        // Ensure comments is an array
        if (Array.isArray(initialComments)) {
          setComments(initialComments);
        } else {
          setComments([]);
        }
      } catch (error) {
        console.error("Failed to load comments", error);
        setComments([]); // Set to an empty array in case of error
      } finally {
        setLoading(false); // Stop loading after comments are fetched
      }
    }

    loadComments();
  }, [postId]);

  const addReply = async (parentId, content) => {
    try {
      const response = await fetch("/api/postcomments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId, content, parentId }),
      });

      if (response.ok) {
        const newComment = await response.json();

        const updateReplies = (comments, parentId, newComment) => {
          return comments.map((comment) => {
            if (comment.id === parentId) {
              return {
                ...comment,
                replies: [...(comment.replies || []), newComment],
              };
            } else if (comment.replies?.length) {
              return {
                ...comment,
                replies: updateReplies(comment.replies, parentId, newComment),
              };
            } else {
              return comment;
            }
          });
        };

        setComments((prevComments) =>
          updateReplies(prevComments, parentId, newComment)
        );
      } else {
        console.error("Failed to submit reply");
      }
    } catch (error) {
      console.error("Failed to submit reply", error);
    }
  };

  // const deleteComment = async (commentId) => {
  //   try {
  //     const response = await fetch("/api/deletecomment", {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ commentId }),
  //     });

  //     if (response.ok) {
  //       setComments((prevComments) =>
  //         prevComments.filter((comment) => comment.id !== commentId)
  //       );
  //     } else {
  //       console.error("Failed to delete comment");
  //     }
  //   } catch (error) {
  //     console.error("Failed to delete comment", error);
  //   }
  // };
  // const deleteComment = async (commentId) => {
  //   try {
  //     const response = await fetch("/api/deletecomment", {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ commentId }),
  //     });
  
  //     if (response.ok) {
  //       setComments((prevComments) => removeComment(prevComments, commentId));
  //     } else {
  //       console.error("Failed to delete comment");
  //     }
  //   } catch (error) {
  //     console.error("Failed to delete comment", error);
  //   }
  // };
  
  // // Helper function to recursively remove a comment or reply
  // const removeComment = (comments, commentId) => {
  //   return comments
  //     .map((comment) => {
  //       if (comment.id === commentId) {
  //         return null; // Remove the comment
  //       }
  //       if (comment.replies?.length) {
  //         return {
  //           ...comment,
  //           replies: removeComment(comment.replies, commentId),
  //         };
  //       }
  //       return comment;
  //     })
  //     .filter(Boolean); // Filter out null values
  // };  


  // const deleteComment = async (commentId) => {
  //   try {
  //     const response = await fetch("/api/deletecomment", {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ commentId }),
  //     });
  
  //     if (response.ok) {
  //       // Update the parent comment to show the "deleted" message without removing the child comments
  //       setComments((prevComments) => updateDeletedComment(prevComments, commentId));
  //     } else {
  //       console.error("Failed to delete comment");
  //     }
  //   } catch (error) {
  //     console.error("Failed to delete comment", error);
  //   }
  // };
  
  // // Helper function to recursively update the deleted comment in the state
  // const updateDeletedComment = (comments, commentId) => {
  //   return comments.map((comment) => {
  //     if (comment.id === commentId) {
  //       return {
  //         ...comment,
  //         content: "This comment has been deleted", // Change content to indicate deletion
  //       };
  //     }
  //     if (comment.replies?.length) {
  //       return {
  //         ...comment,
  //         replies: updateDeletedComment(comment.replies, commentId), // Update replies recursively
  //       };
  //     }
  //     return comment;
  //   });
  // };  

  const deleteComment = async (commentId) => {
    try {
      const response = await fetch("/api/deletecomment", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentId }),
      });
  
      if (response.ok) {
        // Update the state based on the comment's parent-child relationship
        setComments((prevComments) => removeOrUpdateComment(prevComments, commentId));
      } else {
        console.error("Failed to delete comment");
      }
    } catch (error) {
      console.error("Failed to delete comment", error);
    }
  };
  
  // Helper function to recursively update or remove the comment from the state
  const removeOrUpdateComment = (comments, commentId) => {
    return comments
      .map((comment) => {
        // If it's the comment being deleted and has replies, update the content
        if (comment.id === commentId) {
          if (comment.replies && comment.replies.length > 0) {
            // Parent comment with replies, mark it as deleted
            return {
              ...comment,
              content: "This comment has been deleted",
            };
          } else {
            // Parent comment without replies, remove it entirely
            return null;
          }
        }
  
        // If this comment has replies, recursively handle them
        if (comment.replies?.length) {
          const updatedReplies = removeOrUpdateComment(comment.replies, commentId);
          if (updatedReplies) {
            return {
              ...comment,
              replies: updatedReplies,
            };
          } else {
            // If all replies are removed (e.g., parent is deleted), remove the comment too
            return null;
          }
        }
  
        return comment;
      })
      .filter(Boolean); // Filter out null values (deleted comments)
  };  

  // const editComment = async (commentId, content) => {
  //   try {
  //     const response = await fetch("/api/editcomments", {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ commentId, content }),
  //     });

  //     if (response.ok) {
  //       await response.json();
  //       setComments((prevComments) =>
  //         prevComments.map((comment) =>
  //           comment.id === commentId ? { ...comment, content } : comment
  //         )
  //       );
  //     } else {
  //       console.error("Failed to update comment");
  //     }
  //   } catch (error) {
  //     console.error("Failed to update comment", error);
  //   }
  // };


  const editComment = async (commentId, content) => {
    try {
      const response = await fetch("/api/editcomments", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentId, content }),
      });
  
      if (response.ok) {
        setComments((prevComments) => updateComment(prevComments, commentId, content));
      } else {
        console.error("Failed to update comment");
      }
    } catch (error) {
      console.error("Failed to update comment", error);
    }
  };
  
  // Helper function to recursively update a comment or reply
  const updateComment = (comments, commentId, content) => {
    return comments.map((comment) => {
      if (comment.id === commentId) {
        return { ...comment, content }; // Update the comment content
      }
      if (comment.replies?.length) {
        return {
          ...comment,
          replies: updateComment(comment.replies, commentId, content),
        };
      }
      return comment;
    });
  };  

  const handleSubmitComment = async (content) => {
    try {
      const response = await fetch("/api/postcomments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId, content }),
      });

      if (response.ok) {
        const newComment = await response.json();
        setComments((prevComments) => [...prevComments, newComment]);
      } else {
        console.error("Failed to submit comment");
      }
    } catch (error) {
      console.error("Failed to submit comment", error);
    }
  };

  const commentCount = calculateCommentCount(comments);

  return (
    <div className="mt-12 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Comments {commentCount > 0 && `(${commentCount})`}
      </h2>
      <CommentForm handleSubmitComment={handleSubmitComment} />

      {/* Show loading spinner while comments are loading */}
      {loading ? (
        <div className="flex justify-center my-6">
          <CircularProgress />
        </div>
      ) : (
        <div className="space-y-6">
          {comments.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            comments.map((comment) => (
              <CommentData
                key={comment.id}
                comment={comment}
                addReply={addReply}
                deleteComment={deleteComment}
                editComment={editComment}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}