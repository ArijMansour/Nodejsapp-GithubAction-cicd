import React from "react";
import PostSide from "../../components/chats/PostSide/PostSide";
import ProfileCard from "../../components/chats/ProfileCard/ProfileCard";
import ProfileLeft from "../../components/chats/ProfileLeft/ProfileLeft";
import RightSide from "../../components/chats/RightSide/RightSide";
import "./Profile.css";
const Profile = () => {
  return (
    <div className="Profile">
      <ProfileLeft />
      <div className="Profile-center">
        <ProfileCard location="profilePage" />
        <PostSide />
      </div>
      <RightSide />
    </div>
  );
};

export default Profile;
