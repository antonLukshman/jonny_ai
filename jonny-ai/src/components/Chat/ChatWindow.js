import React, { useEffect, useRef } from "react";
import { useChat } from "../../context/ChatContext";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";

function ChatWindow() {
  const { messages, loading, currentChat } = useChat();
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages come in
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="p-4 border-b border-background-lighter">
        <h2 className="text-xl font-semibold text-primary">
          {currentChat ? currentChat.title : "New Chat"}
        </h2>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-24 h-24 mb-6 opacity-70">
              <img src="/logo.svg" alt="Jonny AI" className="w-full h-full" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-2">
              Welcome to Jonny AI
            </h3>
            <p className="text-gray-400 max-w-md">
              Ask me anything! I'm here to help answer your questions, provide
              information, or just chat.
            </p>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <ChatMessage
                key={message.id || index}
                message={message}
                isLast={index === messages.length - 1}
              />
            ))}
            {loading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input area */}
      <ChatInput />
    </div>
  );
}

export default ChatWindow;
