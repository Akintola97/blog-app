"use client";

import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import CommentForm from "./CommentForm";
import CommentData from "./CommentData";

export default function Comments({ postId }) {
 
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const calculateCommentCount = (commentsArray) => {
    let count = commentsArray.length;

    const getNestedCount = (arr) => {
      let nestedCount = 0;
      arr.forEach((c) => {
        if (c.replies && c.replies.length) {
          nestedCount += c.replies.length;
          nestedCount += getNestedCount(c.replies);
        }
      });
      return nestedCount;
    };

    count += getNestedCount(commentsArray);
    return count;
  };

  useEffect(() => {
    async function loadComments() {
      try {
        const response = await fetch(`/api/getcomments?postId=${postId}`);
        const initialComments = await response.json();
        if (Array.isArray(initialComments)) {
          setComments(initialComments);
        } else {
          setComments([]);
        }
      } catch (error) {
        console.error("Failed to load comments", error);
        setComments([]);
      } finally {
        setLoading(false);
      }
    }
    loadComments();
  }, [postId]);

  const markCommentAsDeleted = (commentList, targetId) => {
    return commentList.map((comment) => {
      if (comment.id === targetId) {
        return {
          ...comment,
          content: "This comment has been deleted",
          isDeleted: true,
        };
      } else if (comment.replies?.length) {
        return {
          ...comment,
          replies: markCommentAsDeleted(comment.replies, targetId),
        };
      }
      return comment;
    });
  };

  const addReply = async (parentId, content) => {
    try {
      const response = await fetch("/api/postcomments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, content, parentId }),
      });
      if (response.ok) {
        const newComment = await response.json();

        const updateReplies = (list, targetId, newData) => {
          return list.map((c) => {
            if (c.id === targetId) {
              return {
                ...c,
                replies: [...(c.replies || []), newData],
              };
            } else if (c.replies?.length) {
              return {
                ...c,
                replies: updateReplies(c.replies, targetId, newData),
              };
            }
            return c;
          });
        };

        setComments((prev) => updateReplies(prev, parentId, newComment));
      } else {
        console.error("Failed to submit reply");
      }
    } catch (error) {
      console.error("Failed to submit reply", error);
    }
  };
  const deleteComment = async (commentId) => {
    try {
      const response = await fetch("/api/deletecomment", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId }),
      });
      if (response.ok) {
        setComments((prev) => markCommentAsDeleted(prev, commentId));
      } else {
        console.error("Failed to delete comment");
      }
    } catch (error) {
      console.error("Failed to delete comment", error);
    }
  };
  const editComment = async (commentId, content) => {
    try {
      const response = await fetch("/api/editcomment", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId, content }),
      });
      if (response.ok) {
        await response.json();
        // Recursively update the target comment
        const updateComments = (list, targetId, newContent) => {
          return list.map((c) => {
            if (c.id === targetId) {
              return { ...c, content: newContent };
            } else if (c.replies?.length) {
              return {
                ...c,
                replies: updateComments(c.replies, targetId, newContent),
              };
            }
            return c;
          });
        };

        setComments((prev) => updateComments(prev, commentId, content));
      } else {
        console.error("Failed to update comment");
      }
    } catch (error) {
      console.error("Failed to update comment", error);
    }
  };

  const handleSubmitComment = async (content) => {
    try {
      const response = await fetch("/api/postcomments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, content }),
      });
      if (response.ok) {
        const newComment = await response.json();
        setComments((prev) => [...prev, newComment]);
      } else {
        console.error("Failed to submit comment");
      }
    } catch (error) {
      console.error("Failed to submit comment", error);
    }
  };

  const commentCount = calculateCommentCount(comments);

  return (
    <div className="w-full mx-auto px-4 md:px-6 py-6 md:py-8 max-w-4xl">
      <div className="bg-gray-50 dark:bg-gray-900 p-4 md:p-6 rounded-lg shadow-md w-full">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Comments {commentCount > 0 && `(${commentCount})`}
        </h2>

        <CommentForm handleSubmitComment={handleSubmitComment} />

        {loading ? (
          <div className="flex justify-center my-6">
            <CircularProgress />
          </div>
        ) : (
          <div className="mt-6">
            {comments.length === 0 ? (
              <p className="text-gray-700 dark:text-gray-300">
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
    </div>
  );
}
