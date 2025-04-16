import React from "react";
import { useSpring, animated } from "@react-spring/web";
import Avatar from "../Common/Avatar";

function ChatMessage({ message, isLast }) {
  const isAI = message.sender === "ai";

  // Animation for the message bubble
  const bubbleAnimation = useSpring({
    from: { opacity: 0, transform: "scale(0.8)" },
    to: { opacity: 1, transform: "scale(1)" },
    config: { tension: 300, friction: 20 },
    delay: 100,
  });

  // Format the message content (handle newlines, etc.)
  const formatContent = (content) => {
    return content.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < content.split("\n").length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div
      className={`flex w-full mb-4 ${isAI ? "justify-start" : "justify-end"}`}
    >
      {isAI && (
        <div className="mr-2 flex-shrink-0">
          <Avatar isAI={true} />
        </div>
      )}

      <animated.div
        style={bubbleAnimation}
        className={`${isAI ? "ai-bubble" : "user-bubble"} ${
          message.isError ? "bg-red-500" : ""
        }`}
      >
        {formatContent(message.content)}
      </animated.div>

      {!isAI && (
        <div className="ml-2 flex-shrink-0">
          <Avatar isAI={false} />
        </div>
      )}
    </div>
  );
}

export default ChatMessage;
