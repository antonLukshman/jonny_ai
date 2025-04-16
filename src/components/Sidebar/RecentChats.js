import React from "react";
import { useChat } from "../../context/ChatContext";
import ChatItem from "./ChatItem";

function RecentChats() {
  const { chats, currentChat, setCurrentChat } = useChat();

  return (
    <div className="overflow-y-auto">
      <h2 className="text-lg font-semibold mb-3 text-gray-300 px-3">
        Recent Chats
      </h2>

      {chats.length === 0 ? (
        <p className="text-gray-500 text-sm px-3">No recent chats</p>
      ) : (
        chats.map((chat) => (
          <ChatItem
            key={chat.id}
            chat={chat}
            isActive={currentChat && currentChat.id === chat.id}
            onClick={() => setCurrentChat(chat)}
          />
        ))
      )}
    </div>
  );
}

export default RecentChats;
