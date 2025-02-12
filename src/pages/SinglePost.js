import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

import classes from "./SinglePost.module.scss";

// COMPONENTS
import PostContainer from "../components/post/PostContainer";

// STORE
import { getPostsById } from "../store/reducers/post-slice";
import postSlice from "../store/reducers/post-slice";

const SinglePost = (props) => {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    if (props.token) {
      dispatch(getPostsById(props.token, params.postId));
    }

    return () => {
      dispatch(postSlice.actions.clearPost());
    };
  }, [params.postId, dispatch, props.token]);

  return (
    <div className={classes.container}>
      <PostContainer />
    </div>
  );
};

export default SinglePost;
