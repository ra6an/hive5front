import React, { useState, useEffect } from "react";

import classes from "./Comment.module.scss";

import defaultImg from "../../images/default-user.jpg";
import { Link } from "react-router";

// ICONS
import { FaRegHeart, FaRegComment } from "react-icons/fa6";

// COMPONENTS
import PostComments from "./PostComments";

// UTILS
import formatDateTime from "../../utils/date-formater";

const Comment = (props) => {
  const [commentData, setCommentData] = useState({});
  const [showReplies, setShowReplies] = useState(false);
  const [repliesData, setRepliesData] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    if (showReplies) {
      const _comms = [];
      props.data.replies.forEach((r) => {
        const _comm = props.posts.filter((com) => com.id === r)[0];

        if (Object.keys(_comm).length > 0) _comms.push(_comm);
      });
      setRepliesData(_comms);
    }
  }, [showReplies, props.data.replies, props.posts]);

  useEffect(() => {
    if (Object.keys(props.data).length) {
      setCommentData(props.data);
    }
  }, [props.data]);

  const handleShowReplies = (e) => {
    e.preventDefault();
    setShowReplies(!showReplies);
  };
  console.log(props.data);
  useEffect(() => {
    setDate(formatDateTime(props.data.createdAt));

    const _interval = setInterval(() => {
      setDate(formatDateTime(props.data.createdAt));
    }, 1000 * 15);

    return () => clearInterval(_interval);
  }, [props.data.createdAt]);

  return (
    <>
      {Object.keys(commentData).length > 0 && (
        <div className={classes.container}>
          <div className={classes["user__img"]}>
            {showReplies && <div className={classes["user__vertical"]} />}
            {showReplies && <div className={classes["user__horizontal"]} />}
            <div className={classes["image__box"]}>
              <img src={defaultImg} alt={`${props.data.user.username}`} />
            </div>
          </div>
          <div className={classes.content}>
            <div className={classes["content__header"]}>
              <Link
                to={`/user/${props.data.user.username}`}
                className={`text ${classes.user}`}
              >
                {props.data.user.username}
              </Link>
              <p className={`date ${classes.date}`}>{date}</p>
            </div>
            <p>{props.data.content}</p>
            <div className={classes["content__footer"]}>
              <p onClick={handleShowReplies} className={`date`}>
                {props.data.replies.length > 0
                  ? `${props.data.replies.length} replies...`
                  : ``}
              </p>
              <div className={classes["footer__btns"]}>
                <div className={`links ${classes["footer__btn"]}`}>
                  <FaRegHeart />
                </div>
                <div className={`links ${classes["footer__btn"]}`}>
                  <FaRegComment />
                </div>
              </div>
            </div>
            {showReplies && repliesData.length > 0 && (
              <div
                className={classes.replies}
                style={
                  showReplies
                    ? { transform: "scale(1)" }
                    : { transform: "scale(0)" }
                }
              >
                <PostComments data={repliesData} isParent={true} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Comment;
