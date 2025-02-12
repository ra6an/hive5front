import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import classes from "./Comment.module.scss";

// COMPONENTS
import CommentContainer from "../components/comment/CommentContainer";

// STORE
import { getPostByCommentId } from "../store/reducers/post-slice";
import { postActions } from "../store/redux-store";

const Comment = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const { token, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token || !isAuthenticated) return;
    dispatch(getPostByCommentId(token, params.commentId));
  }, [dispatch, token, isAuthenticated, params.commentId]);

  useEffect(() => {
    return () => {
      dispatch(postActions.clearPost());
    };
  }, [dispatch]);
  return (
    <div className={classes.container}>
      <CommentContainer />
    </div>
  );
};

export default Comment;
