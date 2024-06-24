import { useAuth } from "@/providers/AuthContextProvider";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

type MessageObject = {
  message: string;
  userName: string;
};

const socket = io("http://localhost:3001");

export const useMessages = () => {
  const { userName } = useAuth();

  const [messages, setMessages] = useState<MessageObject[]>([]);

  // Fetch messages from the server
  useEffect(() => {
    fetch("http://localhost:3000/messages")
      .then((response) => response.json())
      .then((data) => {
        setMessages(data.messages?.reverse() || []);
      });

    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => [message, ...prevMessages]);
    });

    socket.on("connect_error", (err) => {
      console.log("Socket connection error: ", err);
    });

    return () => {
      socket.off("newMessage");
      socket.off("connect_error");
    };
  }, []);

  const sendMessage = (message: string) => {
    return fetch("http://localhost:3000/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        userName,
      }),
    });
  };

  return { messages, sendMessage };
};
