import React from "react";

function TypingIndicator() {
  return (
    <div className="flex items-center space-x-1 p-2 w-16 ai-bubble">
      <div className="w-2 h-2 rounded-full bg-white animate-typing"></div>
      <div
        className="w-2 h-2 rounded-full bg-white animate-typing"
        style={{ animationDelay: "0.2s" }}
      ></div>
      <div
        className="w-2 h-2 rounded-full bg-white animate-typing"
        style={{ animationDelay: "0.4s" }}
      ></div>
    </div>
  );
}

export default TypingIndicator;
