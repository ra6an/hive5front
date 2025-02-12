import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Comment.module.scss";

import defaultImg from "../../images/default-user.jpg";

// ICONS
import { FaRegHeart, FaRegComment, FaHeart } from "react-icons/fa6";

// COMPONENTS
import PostComments from "./PostComments";

// STORE
import { like, dislike } from "../../store/reducers/post-slice";

// UTILS
import formatDateTime from "../../utils/date-formater";
import CreateComment from "./CreateComment";

const Comment = (props) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, token } = useSelector((state) => state.auth);
  const { highlightComment, highlightedParentComment, highlightLikedComment } =
    useSelector((state) => state.post);

  const [commentData, setCommentData] = useState({});
  // const [showReplies, setShowReplies] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [repliesData, setRepliesData] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [date, setDate] = useState("");

  useEffect(() => {
    if (highlightedParentComment === props.data.id) setShowReplies(true);
  }, [highlightedParentComment, props.data.id]);

  useEffect(() => {
    if (!isAuthenticated) return;

    setIsLiked(props.data.likes.some((l) => l.user.username === user.username));
  }, [isAuthenticated, user, props.data]);

  useEffect(() => {
    if (showReplies) {
      const _comms = [];
      props.data.replies.forEach((r) => {
        const _comm = props.comments.filter((com) => com.id === r)[0];

        if (Object.keys(_comm).length > 0) _comms.push(_comm);
      });
      setRepliesData(_comms);
    }
  }, [showReplies, props.data.replies, props.comments]);

  useEffect(() => {
    if (Object.keys(props.data).length) {
      setCommentData(props.data);
    }
  }, [props.data]);

  const handleShowReplies = (e) => {
    e.preventDefault();
    setShowReplies(!showReplies);
  };

  useEffect(() => {
    setDate(formatDateTime(props.data.createdAt));

    const _interval = setInterval(() => {
      setDate(formatDateTime(props.data.createdAt));
    }, 1000 * 15);

    return () => clearInterval(_interval);
  }, [props.data.createdAt]);

  const handleLikeComment = (e) => {
    e.preventDefault();
    if (!isAuthenticated || !token) return;

    if (isLiked) {
      dispatch(
        dislike(token, {
          type: "comment",
          id: props.data.id,
          postId: props.data.post,
        })
      );
    } else {
      dispatch(
        like(token, {
          type: "comment",
          id: props.data.id,
          postId: props.data.post,
        })
      );
    }
  };

  return (
    <>
      {Object.keys(commentData).length > 0 && (
        <div
          className={`${
            highlightComment === props.data.id ||
            highlightLikedComment === props.data.id
              ? "highlighted"
              : ""
          } ${classes.container}`}
        >
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
                <div
                  className={`links ${classes["footer__btn"]}`}
                  onClick={handleLikeComment}
                >
                  {props.data.likes.length > 0 && (
                    <p className={`date`}>{props.data.likes.length}</p>
                  )}
                  {isLiked ? (
                    <FaHeart className={`${classes.liked}`} color="#f30f0f" />
                  ) : (
                    <FaRegHeart />
                  )}
                </div>
                <div
                  className={`links ${classes["footer__btn"]}`}
                  onClick={handleShowReplies}
                >
                  <FaRegComment />
                </div>
              </div>
            </div>
            {showReplies && (
              <div
                className={classes.replies}
                style={
                  showReplies
                    ? { transform: "scale(1)" }
                    : { transform: "scale(0)" }
                }
              >
                <PostComments
                  comments={props.comments}
                  post={props.data}
                  data={repliesData}
                  isParent={true}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Comment;
