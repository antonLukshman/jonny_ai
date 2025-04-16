// src/context/ChatContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  writeBatch,
  getDocs,
  deleteDoc, //optional, as we're using batch
} from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "./AuthContext";
import { fetchAIResponse } from "../services/chat";

const ChatContext = createContext();

export function useChat() {
  return useContext(ChatContext);
}

export function ChatProvider({ children }) {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  // Load user's chats
  useEffect(() => {
    if (!currentUser) {
      setChats([]);
      return;
    }

    const q = query(
      collection(db, "users", currentUser.uid, "chats"),
      orderBy("updatedAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChats(chatsList);
    });

    return unsubscribe;
  }, [currentUser]);

  // Load messages for the current chat
  useEffect(() => {
    if (!currentUser || !currentChat) {
      setMessages([]);
      return;
    }

    const q = query(
      collection(
        db,
        "users",
        currentUser.uid,
        "chats",
        currentChat.id,
        "messages"
      ),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesList);
    });

    return unsubscribe;
  }, [currentUser, currentChat]);

  async function createNewChat() {
    if (!currentUser) return null;

    const newChat = {
      title: "Chat with Jonny AI",
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    };

    const chatRef = await addDoc(
      collection(db, "users", currentUser.uid, "chats"),
      newChat
    );

    const chat = { id: chatRef.id, ...newChat };
    setCurrentChat(chat);
    return chat;
  }

  async function sendMessage(content) {
    if (!currentUser || !content.trim()) return;

    console.log("Processing message:", content);
    let chatToUse = currentChat;

    // If no current chat, create a new one
    if (!chatToUse) {
      console.log("No current chat, creating a new one");
      chatToUse = await createNewChat();
      if (!chatToUse) {
        console.error("Failed to create new chat");
        return;
      }
    }

    setLoading(true);
    console.log("Using chat:", chatToUse.id);

    try {
      // Step 1: Add user message to Firestore
      console.log("Adding user message to Firestore");
      const userMessage = {
        content,
        sender: "user",
        createdAt: serverTimestamp(),
      };

      await addDoc(
        collection(
          db,
          "users",
          currentUser.uid,
          "chats",
          chatToUse.id,
          "messages"
        ),
        userMessage
      );
      console.log("User message added successfully");

      // Step 2: Get AI response
      console.log("Requesting AI response");
      let aiResponse;
      try {
        aiResponse = await fetchAIResponse(content);
        console.log("AI response received");
      } catch (error) {
        console.error("Error from fetchAIResponse:", error);
        aiResponse =
          "Sorry, I encountered an error processing your request. Please try again.";
      }

      // Step 3: Add AI response to Firestore
      console.log("Adding AI response to Firestore");
      const aiMessage = {
        content: aiResponse,
        sender: "ai",
        createdAt: serverTimestamp(),
        isError: aiResponse.includes("error") || aiResponse.includes("Sorry,"),
      };

      await addDoc(
        collection(
          db,
          "users",
          currentUser.uid,
          "chats",
          chatToUse.id,
          "messages"
        ),
        aiMessage
      );
      console.log("AI response added successfully");

      // Update the chat title after the first exchange
      if (messages.length <= 1) {
        try {
          const chatTitle = `Chat about ${content.substring(0, 30)}${
            content.length > 30 ? "..." : ""
          }`;
          await updateChatTitle(chatToUse.id, chatTitle);
        } catch (error) {
          console.error("Error updating chat title:", error);
        }
      }
    } catch (error) {
      console.error("Error in message processing flow:", error);

      // Try to add an error message to the chat
      try {
        const errorMessage = {
          content: "Sorry, I encountered a technical issue. Please try again.",
          sender: "ai",
          createdAt: serverTimestamp(),
          isError: true,
        };

        await addDoc(
          collection(
            db,
            "users",
            currentUser.uid,
            "chats",
            chatToUse.id,
            "messages"
          ),
          errorMessage
        );
      } catch (err) {
        console.error("Failed to add error message:", err);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateChatTitle(chatId, newTitle) {
    if (!currentUser) return;

    const chatRef = doc(db, "users", currentUser.uid, "chats", chatId);
    await updateDoc(chatRef, {
      title: newTitle,
      updatedAt: serverTimestamp(),
    });
  }

  async function deleteChat(chatId) {
    if (!currentUser || !chatId) return;

    try {
      console.log("Deleting chat:", chatId);

      // First, get all messages in this chat to delete them
      const messagesRef = collection(
        db,
        "users",
        currentUser.uid,
        "chats",
        chatId,
        "messages"
      );
      const messagesSnapshot = await getDocs(messagesRef);

      // Delete each message document
      const batch = writeBatch(db);
      messagesSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      // Delete the chat document itself
      const chatRef = doc(db, "users", currentUser.uid, "chats", chatId);
      batch.delete(chatRef);

      // Commit the batch
      await batch.commit();

      console.log("Chat deleted successfully");

      // If the deleted chat was the current chat, clear it
      if (currentChat && currentChat.id === chatId) {
        setCurrentChat(null);
        setMessages([]);
      }
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  }

  const value = {
    chats,
    currentChat,
    setCurrentChat,
    messages,
    loading,
    sendMessage,
    createNewChat,
    deleteChat,
    clearCurrentChat: () => setCurrentChat(null),
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
