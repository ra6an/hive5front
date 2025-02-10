import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// STORE
import { authActions, postActions } from "../store/redux-store";
import { getPosts } from "../store/reducers/post-slice";

const usePostsHook = (props) => {
  const dispatch = useDispatch();
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);

  const [fetchHome, setFetchHome] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && !token) return;

    if (fetchHome) {
      dispatch(getPosts(token));
      setFetchHome(false);
    }
  }, [isAuthenticated, dispatch, token, fetchHome]);

  return {
    posts,
    fetchHome: {
      get: fetchHome,
      set: setFetchHome,
    },
  };
};

export default usePostsHook;
