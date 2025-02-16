import React from "react";
import { Link } from "react-router";

import classes from "./SingleFriendRequest.module.scss";

// IMAGES
import defaultImg from "../../images/default-user.jpg";

// UTILS
import formatDateTime from "../../utils/date-formater";

// CUSTOM HOOKS
import useFriendRequestsHook from "../../custom-hooks/useFriendRequestsHook";

const SingleFriendRequest = (props) => {
  const { handleAcceptFriendRequest, handleRejectFriendRequest } =
    useFriendRequestsHook({
      userId: null,
      friendRequestId: props.data.id,
    });

  console.log(props.data);

  return (
    <>
      {Object.keys(props.data).length > 0 && (
        <div className={`post ${classes.container}`}>
          <div className={classes["user__details"]}>
            <div className={classes["image__box"]}>
              <img
                src={props.data?.sender?.image || defaultImg}
                alt={props.data?.sender?.username}
              />
            </div>
            <div className={classes["user__details-main"]}>
              <Link
                to={`/users/${props.data?.sender?.username}`}
                className={`text ${classes["user__details-username"]}`}
              >
                {props.data?.sender?.username}
              </Link>
              <p className={`date ${classes["user__details-date"]}`}>
                {formatDateTime(props.data?.createdAt)}
              </p>
            </div>
            <div className={`${classes["btns"]}`}>
              <div
                className={`primary-bg ${classes["btn"]}`}
                onClick={handleAcceptFriendRequest}
              >
                Accept
              </div>
              <div
                className={`secondary-bg ${classes["btn"]}`}
                onClick={handleRejectFriendRequest}
              >
                Reject
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleFriendRequest;
