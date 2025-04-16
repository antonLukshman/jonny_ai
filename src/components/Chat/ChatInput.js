import React, { useState } from "react";
import { useChat } from "../../context/ChatContext";

function ChatInput() {
  const [message, setMessage] = useState("");
  const { sendMessage, loading } = useChat();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim() || loading) return;

    sendMessage(message);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center p-3 border-t border-background-lighter"
    >
      <input
        type="text"
        placeholder="Ask Jonny AI something..."
        className="chat-input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={loading}
      />
      <button
        type="submit"
        disabled={!message.trim() || loading}
        className="ml-2 bg-primary hover:bg-primary-dark disabled:bg-gray-500 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-colors duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
        </svg>
      </button>
    </form>
  );
}

export default ChatInput;
