import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";

import classes from "./SingleNotification.module.scss";

// UTILS
import formatDateTime from "../../utils/date-formater";

// ICONS
import { FaRegHeart, FaRegComment, FaForumbee } from "react-icons/fa";

// STORE

const SingleNotification = (props) => {
  const [urlPath, setUrlPath] = useState("");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, props.timeout * 10);

    return () => {
      clearTimeout(timeout);
    };
  });

  const generateVariables = useCallback((data) => {
    const actionMap = {
      COMMENT: { POST: "commented", COMMENT: "responded to" },
      LIKE: { POST: "liked", COMMENT: "liked" },
    };

    if (data.type in actionMap && data.targetType in actionMap[data.type]) {
      setUrlPath(`/${data.targetType.toLowerCase()}/${data.targetId}`);
      setMessage(
        `User ${data.sender.username} ${
          actionMap[data.type][data.targetType]
        } your ${data.targetType.toLowerCase()}.`
      );
    } else if (data.type === "FRIEND_REQUEST_ACCEPTED") {
      setUrlPath(`/user/${data.sender.username}`);
      setMessage(`User ${data.sender.username} accepted your friend request.`);
    }
  }, []);

  const highlightComment = (e) => {
    if (props.data.type === "COMMENT") {
      let hlComment = 0;
      let hlParrentComment = 0;
      if (props.data.type === "COMMENT")
        hlComment = props.data.secondaryTargetId;
      if (props.data.targetType === "COMMENT")
        hlParrentComment = props.data.targetId;
      props.notificationsHook.highlightComment(hlComment, hlParrentComment);
    } else if (props.data.type === "LIKE") {
      props.notificationsHook.hightlightLikedComment(props.data.targetId);
    }

    props.notificationsHook.handleSeenNotifications(props.data.id);
  };

  useEffect(() => {
    if (Object.keys(props.data).length > 0) generateVariables(props.data);
  }, [props.data, generateVariables]);

  return (
    <Link
      to={urlPath}
      onClick={highlightComment}
      className={`${show ? "fade-in-quick" : ""} ${classes.container}`}
      style={show ? { opacity: "1" } : {}}
    >
      <div className={`text notification ${classes.content}`}>
        {props.data.type === "FRIEND_REQUEST_ACCEPTED" && (
          <div className={`active ${classes["icon__container"]}`}>
            <FaForumbee />
          </div>
        )}
        {props.data.type === "LIKE" && (
          <div className={`active ${classes["icon__container"]}`}>
            <FaRegHeart />
          </div>
        )}
        {props.data.type === "COMMENT" && (
          <div className={`active ${classes["icon__container"]}`}>
            <FaRegComment />
          </div>
        )}
        <p className={`${classes.message}`}>{message}</p>
        <p className={`date ${classes["created__at"]}`}>
          {formatDateTime(props.data.createdAt)}
        </p>
      </div>
    </Link>
  );
};

export default SingleNotification;
