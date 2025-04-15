import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useChat } from "../../context/ChatContext";

function ChatItem({ chat, isActive, onClick }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { deleteChat } = useChat();

  // Format the timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp || !timestamp.toDate) return "Just now";
    return formatDistanceToNow(timestamp.toDate(), { addSuffix: true });
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent triggering onClick of parent
    setShowDeleteConfirm(true);
  };

  const confirmDelete = (e) => {
    e.stopPropagation(); // Prevent triggering onClick of parent
    deleteChat(chat.id);
    setShowDeleteConfirm(false);
  };

  const cancelDelete = (e) => {
    e.stopPropagation(); // Prevent triggering onClick of parent
    setShowDeleteConfirm(false);
  };

  return (
    <div
      className={isActive ? "sidebar-item-active" : "sidebar-item"}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-white truncate mr-2">{chat.title}</h3>
        <div className="flex items-center">
          <span className="text-xs text-gray-400 whitespace-nowrap mr-2">
            {formatTimestamp(chat.updatedAt)}
          </span>

          {!showDeleteConfirm ? (
            <button
              onClick={handleDelete}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
              title="Delete chat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          ) : (
            <div className="flex">
              <button
                onClick={confirmDelete}
                className="text-red-500 hover:text-red-400 transition-colors p-1 mr-1"
                title="Confirm delete"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </button>
              <button
                onClick={cancelDelete}
                className="text-gray-400 hover:text-white transition-colors p-1"
                title="Cancel"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatItem;
