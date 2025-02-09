import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// STORE
import { authActions, postActions } from "../store/redux-store";
import { getPosts } from "../store/reducers/post-slice";

const usePostsHook = (props) => {
  const dispatch = useDispatch();
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getPosts(token));
    }
  }, [isAuthenticated, dispatch, token]);

  return {
    posts,
  };
};

export default usePostsHook;
