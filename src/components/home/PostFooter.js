import React from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./PostFooter.module.scss";

// ICONS
import { FaRegHeart, FaRegComment, FaHeart } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";

// STORE
import { like, dislike } from "../../store/reducers/post-slice";

const PostFooter = (props) => {
  const dispatch = useDispatch();
  const { isAuthenticated, token } = useSelector((state) => state.auth);

  const handleLikePost = (e) => {
    e.preventDefault();
    if (!isAuthenticated || !token) return;
    if (props.data.likedPost) {
      dispatch(dislike(token, { type: "post", id: props.data.id }));
    } else {
      dispatch(like(token, { type: "post", id: props.data.id }));
    }
  };

  return (
    <div className={`${classes.container}`}>
      <div className={`links ${classes["btn"]}`} onClick={handleLikePost}>
        {props.data.likedPost ? (
          <FaHeart className={`${classes.liked}`} />
        ) : (
          <FaRegHeart className={classes.icon} />
        )}
        {props.data?.likes?.length > 0 && (
          <p className={`date ${classes["btn__text"]}`}>
            {props.data?.likes?.length}
          </p>
        )}
      </div>
      <div
        className={`links ${classes["btn"]} ${
          props.toggleComments.get ? `active__btn` : ``
        }`}
        onClick={props.toggleComments.handler}
      >
        <FaRegComment className={classes.icon} />
        {props.data?.comments?.length > 0 && (
          <p className={`date ${classes["btn__text"]}`}>
            {props.data?.comments?.length}
          </p>
        )}
      </div>
      <div className={`links ${classes["btn"]}`}>
        <FiSend className={classes.icon} />
      </div>
    </div>
  );
};

export default PostFooter;
