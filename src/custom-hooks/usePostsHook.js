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
  const [fetchExplore, setFetchExplore] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && !token) return;

    if (fetchHome) {
      dispatch(getPosts(token, { user: "", extension: "home" }));
      setFetchHome(false);
    }

    if (fetchExplore) {
      dispatch(getPosts(token, { user: "", extension: "explore" }));
      setFetchExplore(false);
    }
  }, [isAuthenticated, dispatch, token, fetchExplore, fetchHome]);

  return {
    posts,
    fetchHome: {
      get: fetchHome,
      set: setFetchHome,
    },
    fetchExplore: {
      get: fetchExplore,
      set: setFetchExplore,
    },
  };
};

export default usePostsHook;
