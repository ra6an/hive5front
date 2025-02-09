import React from "react";

import classes from "./PostFooter.module.scss";

// ICONS
import { FaRegHeart, FaRegComment } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";

const PostFooter = (props) => {
  return (
    <div className={`${classes.container}`}>
      <div className={`links ${classes["btn"]}`}>
        <FaRegHeart className={classes.icon} />
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
