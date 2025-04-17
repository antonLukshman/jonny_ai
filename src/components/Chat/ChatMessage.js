import React from "react";
import { useSpring, animated } from "@react-spring/web";
import ReactMarkdown from "react-markdown";
import Avatar from "../Common/Avatar";
import TextToSpeechButton from "./TextToSpeechButton";

function ChatMessage({ message, isLast }) {
  const isAI = message.sender === "ai";

  // Animation for the message bubble
  const bubbleAnimation = useSpring({
    from: { opacity: 0, transform: "scale(0.8)" },
    to: { opacity: 1, transform: "scale(1)" },
    config: { tension: 300, friction: 20 },
    delay: 100,
  });

  // Clean the message content of any system tags
  const cleanContent = message.content.replace(
    /<userStyle>.*?<\/userStyle>/g,
    ""
  );

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
        <div className="flex justify-between items-start">
          <div className="flex-1 markdown-content">
            {/* Render markdown content */}
            <ReactMarkdown>{cleanContent}</ReactMarkdown>
          </div>
          {/* Add TextToSpeechButton for AI messages */}
          {isAI && <TextToSpeechButton text={cleanContent} />}
        </div>
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
