import React, { useState } from "react";

function CommentForm({ handleSubmitComment }) {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSubmitComment(comment);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <textarea
        name="comment"
        placeholder="Write a comment..."
        className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        rows="3"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <div className="flex justify-end mt-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
