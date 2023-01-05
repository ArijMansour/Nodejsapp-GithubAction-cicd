import React from "react";
import PostSide from "../components/chats/PostSide/PostSide";
import ProfileSide from "../components/chats/profileSide/ProfileSide";
import RightSide from "../components/chats/RightSide/RightSide";
import "./Home.css";
const Home = () => {
  return (
    <div className="Home">
      <ProfileSide />
      <PostSide />
      <RightSide />
    </div>
  );
};

export default Home;
