import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./CreateComment.module.scss";

// STORE
import { createComment } from "../../store/reducers/post-slice";

// ICONS
import { BiSolidSend } from "react-icons/bi";

const CreateComment = (props) => {
  const dispatch = useDispatch();
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const [contentInput, setContentInput] = useState("");

  const handleContentTextarea = (e) => {
    e.preventDefault();

    let _newValue = e.target.value;

    if (_newValue.length > 500) {
      _newValue = _newValue.slice(0, 500);
    }

    setContentInput(_newValue);
  };

  const clearInputs = () => {
    setContentInput("");
  };

  const handleCreateComment = (e) => {
    e.preventDefault();

    if (!isAuthenticated && !token) return;

    const userInputs = {};
    userInputs.content = contentInput;
    if (props.isParent) {
      userInputs.parentComment = props.post.id;
      userInputs.post = props.post.post;
    } else {
      userInputs.parentComment = 0;
      userInputs.post = props.post.id;
    }

    dispatch(createComment(token, userInputs, clearInputs));
  };

  return (
    <form
      className={`background ${classes.container} border`}
      onSubmit={handleCreateComment}
    >
      <textarea
        spellCheck={false}
        className={`text`}
        onChange={handleContentTextarea}
        value={contentInput}
        placeholder="Comment..."
      ></textarea>
      <button type="submit" className={`primary-bg`}>
        <BiSolidSend />
      </button>
    </form>
  );
};

export default CreateComment;
