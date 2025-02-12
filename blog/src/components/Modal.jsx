import React from "react";

function Modal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 z-10 w-11/12 md:w-1/3">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{title}</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{message}</p>
        <div className="flex justify-end mt-4 space-x-2">
          <button
            className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm text-white bg-red-600 rounded-md"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
