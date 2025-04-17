import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useChat } from "../../context/ChatContext";
import RecentChats from "./RecentChats";
import Button from "../Common/Button";
import Avatar from "../Common/Avatar"; // Import the Avatar component

function Sidebar({ isOpen, setIsOpen }) {
  const { currentUser, logout } = useAuth();
  const { createNewChat, clearCurrentChat } = useChat();

  const handleNewChat = () => {
    // Clear current chat before creating a new one
    clearCurrentChat();
    createNewChat();

    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <div
      className={`fixed md:relative top-0 left-0 h-full w-64 bg-background-light flex flex-col transform transition-transform duration-300 ease-in-out z-10 ${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      {/* Header with logo */}
      <div className="p-4 border-b border-background-lighter flex items-center">
        <img src="/logo.svg" alt="Jonny AI Logo" className="w-8 h-8 mr-2" />
        <h1 className="text-xl font-bold text-primary">Jonny AI</h1>

        {/* Close button for mobile */}
        <button className="ml-auto md:hidden" onClick={() => setIsOpen(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
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

      {/* New Chat button */}
      <div className="p-3">
        <Button
          onClick={handleNewChat}
          className="w-full btn-primary flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          New Chat
        </Button>
      </div>

      {/* Recent chats */}
      <div className="flex-1 overflow-y-auto">
        <RecentChats />
      </div>

      {/* User info and logout */}
      <div className="p-3 border-t border-background-lighter">
        {currentUser && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar isAI={false} size="md" />
              <div className="ml-2 overflow-hidden">
                <p className="text-sm text-white font-medium truncate">
                  {currentUser.displayName || currentUser.email.split("@")[0]}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {currentUser.email}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-white bg-background-lighter hover:bg-accent p-1.5 rounded-full transition-colors"
              title="Sign out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
