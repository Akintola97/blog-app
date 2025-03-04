import React, { useState } from "react";
import { FiEdit, FiTrash2, FiCornerDownRight } from "react-icons/fi";
import { MdReply } from "react-icons/md";
import Modal from "./Modal"; // Your existing Modal component

/**
 * A single comment “bubble” that can show or hide its nested replies
 */
function CommentData({ comment, addReply, deleteComment, editComment }) {
  // Local state for typed reply content
  const [reply, setReply] = useState("");
  // Toggle for showing the small reply form
  const [showReplyForm, setShowReplyForm] = useState(false);
  // Toggle for collapsing/expanding this comment's nested replies
  const [areRepliesVisible, setAreRepliesVisible] = useState(false);
  // If user is editing, show a textarea instead of plain text
  const [isEditing, setIsEditing] = useState(false);
  // The text currently being edited
  const [editedContent, setEditedContent] = useState(comment.content);
  // Controls the delete confirmation modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Submits a new reply to this comment
  const handleReplySubmit = async (e) => {
    e.preventDefault();
    await addReply(comment.id, reply);
    setReply("");
    setShowReplyForm(false);
    setAreRepliesVisible(true); // Auto-expand replies after adding one
  };

  // Submits an edit to this comment
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await editComment(comment.id, editedContent);
    setIsEditing(false);
  };

  // Opens the delete modal
  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  // Confirms actual deletion
  const handleDeleteConfirm = () => {
    deleteComment(comment.id);
    setIsModalOpen(false);
  };

  // Number of direct replies for this comment
  const replyCount = comment.replies?.length || 0;
  // Check if server has marked this comment as deleted
  const isDeleted = !!comment.isDeleted;

  return (
    <div className="w-full break-words">
      {/* The main “bubble/card” for this comment */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-4 mb-4">
        <div className="flex items-start space-x-3">
          {/* Avatar */}
          <img
            src={comment.user?.picture || "/profile.webp"}
            alt={`${comment.user?.givenName || "User"}'s avatar`}
            className="w-10 h-10 rounded-full object-cover"
          />

          {/* Main content area */}
          <div className="flex-1">
            {/* Top row: user name + actions (if not deleted) */}
            <div className="flex justify-between items-start">
              <p className="font-semibold text-sm md:text-base text-gray-800 dark:text-gray-100 capitalize mb-2">
                {comment.user?.givenName || "Anonymous"}
              </p>

              {/* Only show Edit/Delete if comment is not deleted and user owns it */}
              {!isDeleted && comment.user?.id === comment.userId && (
                <div className="flex space-x-2 text-gray-500">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="hover:text-blue-600"
                    aria-label="Edit"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={handleDeleteClick}
                    className="hover:text-red-600"
                    aria-label="Delete"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              )}
            </div>

            {/* Display the comment text:
                - If deleted, show "This comment has been deleted" text
                - If editing, show an edit form
                - Otherwise, show the original content
            */}
            {isDeleted ? (
              // Comment is deleted
              <p className="italic text-sm md:text-base text-gray-500 dark:text-gray-400 mt-3">
                {comment.content}{" "}
                {/* Usually "This comment has been deleted" */}
              </p>
            ) : isEditing ? (
              // Editing form
              <form onSubmit={handleEditSubmit} className="mt-2">
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  rows="3"
                  required
                  className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1 text-sm text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            ) : (
              // Normal, non-deleted comment text
              <p className="mt-3 text-sm md:text-base text-gray-700 dark:text-gray-300">
                {comment.content}
              </p>
            )}

            {/* Reply & Show Replies controls (hidden if comment is deleted) */}
            {!isDeleted && (
              <div className="mt-3 flex items-center space-x-4 text-sm">
                <button
                  onClick={() => setShowReplyForm(!showReplyForm)}
                  className="flex items-center text-blue-600 hover:underline"
                >
                  <MdReply className="mr-1" />
                  Reply
                </button>
                {replyCount > 0 && (
                  <button
                    onClick={() => setAreRepliesVisible(!areRepliesVisible)}
                    className="flex items-center text-blue-600 hover:underline"
                  >
                    <FiCornerDownRight className="mr-1" />
                    {areRepliesVisible
                      ? "Hide Replies"
                      : `Show Replies (${replyCount})`}
                  </button>
                )}
              </div>
            )}

            {/* Reply form (only if not deleted) */}
            {!isDeleted && showReplyForm && (
              <form onSubmit={handleReplySubmit} className="mt-3">
                <textarea
                  placeholder="Write a reply..."
                  rows="2"
                  required
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setShowReplyForm(false)}
                    className="px-3 py-1 text-sm text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Collapsible Nested Replies (still show if parent's deleted, unless you prefer otherwise) */}
      {areRepliesVisible && comment.replies?.length > 0 && (
        <div className="ml-4 md:ml-6">
          {comment.replies.map((reply) => (
            <CommentData
              key={reply.id}
              comment={reply}
              addReply={addReply}
              deleteComment={deleteComment}
              editComment={editComment}
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Comment"
        message="Are you sure you want to delete this comment? This action cannot be undone."
      />
    </div>
  );
}

export default CommentData;
