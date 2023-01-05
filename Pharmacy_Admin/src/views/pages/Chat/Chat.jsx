import React, { useEffect, useRef, useState } from "react";
import LogoSearch from "../../components/chats/LogoSearch/LogoSearch";
import NavIcons from "../../components/chats/NavIcons/NavIcons";
import { userChats } from "../../../infrastructure/services/api/ChatRequests";

import "./Chat.css";
import { useSelector } from "react-redux";
import Conversation from "../../components/chats/Coversation/Conversation";
import ChatBox from "../../components/chats/ChatBox/ChatBox";

import { io } from "socket.io-client";
import { isAuth } from "../../../_helper/auth";

function Chat() {
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const socket = useRef();

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);
  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", isAuth().id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [isAuth()]);
  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(isAuth().id);
        setChats(data);
        console.log("hh", data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [isAuth.id]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data);
      setReceivedMessage(data);
    });
  }, []);

  //Check online user

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== isAuth().id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div
                onClick={() => {
                  setCurrentChat(chat);
                }}
              >
                <Conversation
                  data={chat}
                  currentUserId={isAuth().id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <NavIcons />
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={isAuth().id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  );
}

export default Chat;
