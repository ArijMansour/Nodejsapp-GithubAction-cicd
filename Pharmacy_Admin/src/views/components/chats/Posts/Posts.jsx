import React, { useEffect } from "react";
import { getTimelinePosts } from "../../../../app/redux/actions/PostsAction";
import Post from "../Post/Post";
import { useSelector, useDispatch } from "react-redux";
import "./Posts.css";
import { useParams } from "react-router-dom";

import { isAuth } from "../../../../_helper/auth";

import { PostsData } from "../../../../infrastructure/services/api/Data/PostsData";

const Posts = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  let { posts, loading } = useSelector((state) => state.postReducer);
  useEffect(() => {
    //alert(JSON.stringify(isAuth()));
    dispatch(getTimelinePosts(user.id));
  }, []);
  if (!posts) return "No Posts";
  if (params.id) posts = posts.filter((post) => post.userId === params.id);
  return (
    <div className="Posts">
      {loading
        ? "Fetching posts...."
        : posts.map((post, id) => {
            return <Post data={post} key={id} />;
          })}
    </div>
  );
};

export default Posts;
