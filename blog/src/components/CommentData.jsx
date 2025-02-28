// // import React, { useState } from "react";
// // import { FiEdit, FiTrash2, FiCornerDownRight } from "react-icons/fi";
// // import { MdReply } from "react-icons/md";
// // import Modal from "./Modal"; // Import the modal component
// // import Comments from "./Comments";

// // function CommentData({ comment, addReply, deleteComment, editComment }) {
// //   const [reply, setReply] = useState("");
// //   const [showReplyForm, setShowReplyForm] = useState(false);
// //   const [showReplies, setShowReplies] = useState(true);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [editedContent, setEditedContent] = useState(comment.content);
// //   const [isModalOpen, setIsModalOpen] = useState(false);

// //   const handleReplySubmit = async (e) => {
// //     e.preventDefault();
// //     await addReply(comment.id, reply);
// //     setReply("");
// //     setShowReplyForm(false);
// //   };

// //   const handleEditSubmit = async (e) => {
// //     e.preventDefault();
// //     await editComment(comment.id, editedContent);
// //     setIsEditing(false);
// //   };

// //   const handleDeleteClick = () => {
// //     setIsModalOpen(true);
// //   };

// //   const handleDeleteConfirm = () => {
// //     deleteComment(comment.id);
// //     setIsModalOpen(false);
// //   };

// //   return (
// //     <div className="mb-6 capitalize">
// //       <div className="flex items-start space-x-4">
// //         <img
// //           src={comment.user?.picture || `/profile.webp`}
// //           alt={`${comment.user?.givenName || 'User'}'s avatar`}
// //           className="w-10 h-10 rounded-full"
// //         />
// //         <div className="flex-1">
// //           <div className="flex justify-between">
// //             <p className="font-semibold text-lg text-gray-800 dark:text-gray-200 capitalize">
// //               {comment.user?.givenName}
// //             </p>
// //             <div className="flex items-center space-x-2">
// //               {comment.user.id === comment.userId && (
// //                 <>
// //                   <button
// //                     onClick={() => setIsEditing(true)}
// //                     className="text-gray-500 hover:text-blue-600"
// //                     aria-label="Edit"
// //                   >
// //                     <FiEdit />
// //                   </button>
// //                   <button
// //                     onClick={handleDeleteClick}
// //                     className="text-gray-500 hover:text-red-600"
// //                     aria-label="Delete"
// //                   >
// //                     <FiTrash2 />
// //                   </button>
// //                 </>
// //               )}
// //             </div>
// //           </div>
// //           {isEditing ? (
// //             <form onSubmit={handleEditSubmit} className="mt-2">
// //               <textarea
// //                 value={editedContent}
// //                 onChange={(e) => setEditedContent(e.target.value)}
// //                 className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
// //                 rows="3"
// //                 required
// //               />
// //               <div className="flex justify-end mt-2 space-x-2">
// //                 <button
// //                   type="button"
// //                   className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 rounded-md"
// //                   onClick={() => setIsEditing(false)}
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   type="submit"
// //                   className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md"
// //                 >
// //                   Save
// //                 </button>
// //               </div>
// //             </form>
// //           ) : (
// //             <p className="text-gray-600 dark:text-gray-400">{comment.content}</p>
// //           )}
// //           <div className="flex items-center mt-1 space-x-4">
// //             <button
// //               onClick={() => setShowReplyForm(!showReplyForm)}
// //               className="flex items-center text-sm text-blue-600 hover:underline"
// //               aria-label="Reply"
// //             >
// //               <MdReply className="mr-1" />
// //               Reply
// //             </button>
// //             {comment.replies?.length > 0 && (
// //               <button
// //                 onClick={() => setShowReplies(!showReplies)}
// //                 className="flex items-center text-sm text-blue-600 hover:underline"
// //                 aria-label="Show Replies"
// //               >
// //                 <FiCornerDownRight className="mr-1" />
// //                 {showReplies ? "Hide Replies" : "Show Replies"}
// //               </button>
// //             )}
// //           </div>
// //           {showReplyForm && (
// //             <form onSubmit={handleReplySubmit} className="mt-4">
// //               <textarea
// //                 name="reply"
// //                 placeholder="Write a reply..."
// //                 className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
// //                 rows="2"
// //                 value={reply}
// //                 onChange={(e) => setReply(e.target.value)}
// //                 required
// //               />
// //               <div className="flex justify-end mt-2 space-x-2">
// //                 <button
// //                   type="button"
// //                   className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 rounded-md"
// //                   onClick={() => setShowReplyForm(false)}
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   type="submit"
// //                   className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md"
// //                 >
// //                   Submit
// //                 </button>
// //               </div>
// //             </form>
// //           )}
// //           {showReplies && comment.replies?.length > 0 && (
// //             <div className="mt-4 pl-6 border-l-2 border-gray-300 dark:border-gray-700">
// //               {comment.replies.map((reply) => (
// //                 <Comment
// //                   key={reply.id}
// //                   comment={reply}
// //                   addReply={addReply}
// //                   deleteComment={deleteComment}
// //                   editComment={editComment}
// //                 />
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //       <Modal
// //         isOpen={isModalOpen}
// //         onClose={() => setIsModalOpen(false)}
// //         onConfirm={handleDeleteConfirm}
// //         title="Delete Comment"
// //         message="Are you sure you want to delete this comment? This action cannot be undone."
// //       />
// //     </div>
// //   );
// // }

// // export default CommentData;

// import React, { useState } from "react";
// import { FiEdit, FiTrash2, FiCornerDownRight } from "react-icons/fi";
// import { MdReply } from "react-icons/md";
// import Modal from "./Modal"; // Import the modal component

// function CommentData({ comment, addReply, deleteComment, editComment }) {
//   const [reply, setReply] = useState("");
//   const [showReplyForm, setShowReplyForm] = useState(false);
//   const [showReplies, setShowReplies] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedContent, setEditedContent] = useState(comment.content);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleReplySubmit = async (e) => {
//     e.preventDefault();
//     await addReply(comment.id, reply);
//     setReply("");
//     setShowReplyForm(false);
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     await editComment(comment.id, editedContent);
//     setIsEditing(false);
//   };

//   const handleDeleteClick = () => {
//     setIsModalOpen(true);
//   };

//   const handleDeleteConfirm = () => {
//     deleteComment(comment.id);
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="mb-6 capitalize">
//       <div className="flex items-start space-x-4">
//         <img
//           src={comment.user?.picture || `/profile.webp`}
//           alt={`${comment.user?.givenName || 'User'}'s avatar`}
//           className="w-10 h-10 rounded-full"
//         />
//         <div className="flex-1">
//           <div className="flex justify-between">
//             <p className="font-semibold text-lg text-gray-800 dark:text-gray-200 capitalize">
//               {comment.user?.givenName}
//             </p>
//             <div className="flex items-center space-x-2">
//               {comment.user.id === comment.userId && (
//                 <>
//                   <button
//                     onClick={() => setIsEditing(true)}
//                     className="text-gray-500 hover:text-blue-600"
//                     aria-label="Edit"
//                   >
//                     <FiEdit />
//                   </button>
//                   <button
//                     onClick={handleDeleteClick}
//                     className="text-gray-500 hover:text-red-600"
//                     aria-label="Delete"
//                   >
//                     <FiTrash2 />
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//           {isEditing ? (
//             <form onSubmit={handleEditSubmit} className="mt-2">
//               <textarea
//                 value={editedContent}
//                 onChange={(e) => setEditedContent(e.target.value)}
//                 className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                 rows="3"
//                 required
//               />
//               <div className="flex justify-end mt-2 space-x-2">
//                 <button
//                   type="button"
//                   className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 rounded-md"
//                   onClick={() => setIsEditing(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md"
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           ) : (
//             <p className="text-gray-600 dark:text-gray-400">{comment.content}</p>
//           )}
//           <div className="flex items-center mt-1 space-x-4">
//             <button
//               onClick={() => setShowReplyForm(!showReplyForm)}
//               className="flex items-center text-sm text-blue-600 hover:underline"
//               aria-label="Reply"
//             >
//               <MdReply className="mr-1" />
//               Reply
//             </button>
//             {comment.replies?.length > 0 && (
//               <button
//                 onClick={() => setShowReplies(!showReplies)}
//                 className="flex items-center text-sm text-blue-600 hover:underline"
//                 aria-label="Show Replies"
//               >
//                 <FiCornerDownRight className="mr-1" />
//                 {showReplies ? "Hide Replies" : "Show Replies"}
//               </button>
//             )}
//           </div>
//           {showReplyForm && (
//             <form onSubmit={handleReplySubmit} className="mt-4">
//               <textarea
//                 name="reply"
//                 placeholder="Write a reply..."
//                 className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                 rows="2"
//                 value={reply}
//                 onChange={(e) => setReply(e.target.value)}
//                 required
//               />
//               <div className="flex justify-end mt-2 space-x-2">
//                 <button
//                   type="button"
//                   className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 rounded-md"
//                   onClick={() => setShowReplyForm(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//           )}
//           {showReplies && comment.replies?.length > 0 && (
//             <div className="mt-4 pl-6 border-l-2 border-gray-300 dark:border-gray-700">
//               {comment.replies.map((reply) => (
//                 <CommentData
//                   key={reply.id}
//                   comment={reply}
//                   addReply={addReply}
//                   deleteComment={deleteComment}
//                   editComment={editComment}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onConfirm={handleDeleteConfirm}
//         title="Delete Comment"
//         message="Are you sure you want to delete this comment? This action cannot be undone."
//       />
//     </div>
//   );
// }

// export default CommentData;



import React, { useState } from "react";
import { FiEdit, FiTrash2, FiCornerDownRight } from "react-icons/fi";
import { MdReply } from "react-icons/md";
import Modal from "./Modal"; // Import the modal component

function CommentData({ comment, addReply, deleteComment, editComment }) {
  const [reply, setReply] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isDeleted = comment.content === "This comment has been deleted";

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    await addReply(comment.id, reply);
    setReply("");
    setShowReplyForm(false);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await editComment(comment.id, editedContent);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteComment(comment.id);
    setIsModalOpen(false);
  };

  return (
    <div className="mb-6 capitalize">
      <div className="flex items-start space-x-4">
        <img
          src={comment.user?.picture || `/profile.webp`}
          alt={`${comment.user?.givenName || 'User'}'s avatar`}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <div className="flex justify-between">
            <p className="font-semibold text-lg text-gray-800 dark:text-gray-200 capitalize">
              {comment.user?.givenName}
            </p>
            <div className="flex items-center space-x-2">
              {comment.user.id === comment.userId && (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className={`text-gray-500 ${
                      isDeleted ? "cursor-not-allowed opacity-50" : "hover:text-blue-600"
                    }`}
                    aria-label="Edit"
                    disabled={isDeleted}
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={handleDeleteClick}
                    className={`text-gray-500 ${
                      isDeleted ? "cursor-not-allowed opacity-50" : "hover:text-red-600"
                    }`}
                    aria-label="Delete"
                    disabled={isDeleted}
                  >
                    <FiTrash2 />
                  </button>
                </>
              )}
            </div>
          </div>
          {isEditing ? (
            <form onSubmit={handleEditSubmit} className="mt-2">
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                rows="3"
                required
              />
              <div className="flex justify-end mt-2 space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 rounded-md"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            <p className={`text-gray-600 dark:text-gray-400 ${isDeleted ? "italic text-gray-400" : ""}`}>
              {comment.content}
            </p>
          )}
          <div className="flex items-center mt-1 space-x-4">
            {!isDeleted && (
              <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="flex items-center text-sm text-blue-600 hover:underline"
                aria-label="Reply"
              >
                <MdReply className="mr-1" />
                Reply
              </button>
            )}
            {comment.replies?.length > 0 && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="flex items-center text-sm text-blue-600 hover:underline"
                aria-label="Show Replies"
              >
                <FiCornerDownRight className="mr-1" />
                {showReplies ? "Hide Replies" : "Show Replies"}
              </button>
            )}
          </div>
          {showReplyForm && (
            <form onSubmit={handleReplySubmit} className="mt-4">
              <textarea
                name="reply"
                placeholder="Write a reply..."
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                rows="2"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                required
              />
              <div className="flex justify-end mt-2 space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 rounded-md"
                  onClick={() => setShowReplyForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
          {showReplies && comment.replies?.length > 0 && (
            <div className="mt-4 pl-6 border-l-2 border-gray-300 dark:border-gray-700">
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
        </div>
      </div>
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