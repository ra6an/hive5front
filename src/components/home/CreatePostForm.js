import React from "react";

import classes from "./CreatePostForm.module.scss";

// IMAGE
import defaultImg from "../../images/default-user.jpg";

// ICONS
import { LuImage } from "react-icons/lu";

//CUSTOM HOOKS
import useHandlePost from "../../custom-hooks/useHandlePost";

const CreatePostForm = (props) => {
  const { handleContentInput, handleCreatePost, contentInput } =
    useHandlePost();

  return (
    <form className={`post ${classes.container}`} onSubmit={handleCreatePost}>
      <div className={classes.header}>
        <div className={classes["image__box"]}>
          <img src={defaultImg} alt={""} />
        </div>
        <textarea
          className={`background text`}
          spellCheck={false}
          onChange={handleContentInput}
          value={contentInput}
        ></textarea>
      </div>
      <div className={classes.footer}>
        <div className={`links ${classes.icon}`}>
          <LuImage />
        </div>
        <button type="submit" className={`primary-bg ${classes["post__btn"]}`}>
          Post
        </button>
      </div>
    </form>
  );
};

export default CreatePostForm;
