import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// STORE
import { createNewPost } from "../store/reducers/post-slice";

const useHandlePost = (props) => {
  const dispatch = useDispatch();
  const { token, isAuthenticated } = useSelector((state) => state.auth);

  const [contentInput, setContentInput] = useState("");
  const [postStatus, setPostStatus] = useState("PUBLIC");

  const handleContentInput = (e) => {
    e.preventDefault();

    let _newText = e.target.value;

    if (_newText.length > 500) {
      _newText = _newText.slice(0, 500);
    }

    setContentInput(_newText);
  };

  const handleCreatePost = (e) => {
    e.preventDefault();

    if (!token || !isAuthenticated) return;

    dispatch(
      createNewPost(
        token,
        { content: contentInput, status: postStatus },
        clearContentState
      )
    );
  };

  const clearContentState = () => {
    setContentInput("");
  };

  return {
    handleCreatePost,
    handleContentInput,
    //VALUES
    contentInput,
  };
};

export default useHandlePost;
