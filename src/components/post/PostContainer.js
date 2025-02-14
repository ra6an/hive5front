import React from "react";
import { useSelector } from "react-redux";

import classes from "./PostContainer.module.scss";

// COMPONENTS
import Post from "../home/Post";

const PostContainer = (props) => {
  const { post } = useSelector((state) => state.post);

  return (
    <div className={classes.container}>
      {Object.keys(post).length === 0 ? (
        <p>There is no post with that ID.</p>
      ) : (
        <Post data={post} />
      )}
    </div>
  );
};

export default PostContainer;
