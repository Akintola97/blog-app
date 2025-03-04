import React, { useState } from "react";
import { FiEdit, FiTrash2, FiCornerDownRight } from "react-icons/fi";
import { MdReply } from "react-icons/md";
import Modal from "./Modal"; // Your existing Modal component

function CommentData({ comment, addReply, deleteComment, editComment }) {
  const [reply, setReply] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [areRepliesVisible, setAreRepliesVisible] = useState(false); // Collapsed by default
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handler: add a reply
  const handleReplySubmit = async (e) => {
    e.preventDefault();
    await addReply(comment.id, reply);
    setReply("");
    setShowReplyForm(false);
    // Optionally auto-expand after a new reply is posted
    setAreRepliesVisible(true);
  };

  // Handler: edit an existing comment
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await editComment(comment.id, editedContent);
    setIsEditing(false);
  };

  // Handler: delete a comment
  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };
  const handleDeleteConfirm = () => {
    deleteComment(comment.id);
    setIsModalOpen(false);
  };

  // Number of direct replies
  const replyCount = comment.replies?.length || 0;

  return (
    <div className="w-full break-words">
      {/* Bubble card for this comment */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-4 mb-4">
        {/* Top row (avatar + details) */}
        <div className="flex items-start space-x-3">
          {/* Avatar */}
          <img
            src={comment.user?.picture || "/profile.webp"}
            alt={`${comment.user?.givenName || "User"}'s avatar`}
            className="w-10 h-10 rounded-full object-cover"
          />

          {/* Main comment content area */}
          <div className="flex-1">
            {/* Comment header: name + actions (edit/delete) */}
            <div className="flex justify-between items-start">
              {/* Added `mb-2` to create space below the name */}
              <p className="font-semibold text-sm md:text-base text-gray-800 dark:text-gray-100 capitalize mb-2">
                {comment.user?.givenName || "Anonymous"}
              </p>

              {comment.user?.id === comment.userId && (
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

            {/* Comment text or edit form */}
            {isEditing ? (
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
              // Increased top margin a bit to separate from the name
              <p className="mt-3 text-sm md:text-base text-gray-700 dark:text-gray-300">
                {comment.content}
              </p>
            )}

            {/* Reply and "Show Replies" toggles */}
            <div className="mt-3 flex items-center space-x-4 text-sm">
              <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="flex items-center text-blue-600 hover:underline"
              >
                <MdReply className="mr-1" />
                Reply
              </button>

              {/* Only show "Show/Hide Replies" if there are any replies */}
              {replyCount > 0 && (
                <button
                  onClick={() => setAreRepliesVisible(!areRepliesVisible)}
                  className="flex items-center text-blue-600 hover:underline"
                >
                  <FiCornerDownRight className="mr-1" />
                  {areRepliesVisible
                    ? `Hide Replies`
                    : `Show Replies (${replyCount})`}
                </button>
              )}
            </div>

            {/* Reply form */}
            {showReplyForm && (
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

      {/* Collapsible Nested Replies */}
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