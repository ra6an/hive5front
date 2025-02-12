import React from "react";
import { useSelector } from "react-redux";

import classes from "./CommentContainer.module.scss";

// COMPONENTS
import PostContainer from "../post/PostContainer";

const CommentContainer = (props) => {
  const { post } = useSelector((state) => state.post);
  // console.log(post);
  return (
    <div className={classes.container}>
      {Object.keys(post).length > 0 && <PostContainer />}
    </div>
  );
};

export default CommentContainer;
