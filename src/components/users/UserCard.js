import React from "react";
import { Link } from "react-router";

import classes from "./UserCard.module.scss";

// HOOKS
import useFriendRequestsHook from "../../custom-hooks/useFriendRequestsHook";

import defaultImg from "../../images/default-user.jpg";

const UserCard = (props) => {
  const {
    handleSendFriendRequest,
    handleAcceptFriendRequest,
    handleRejectFriendRequest,
    isPending,
    isSent,
    areFriends,
  } = useFriendRequestsHook({
    friendRequestId: null,
    userId: props.data?.id,
  });

  return (
    <>
      {Object.keys(props.data).length > 0 && (
        <div className={`post ${classes.container}`}>
          <div className={classes["user__details"]}>
            <div className={classes["image__box"]}>
              <img
                src={props.data?.image || defaultImg}
                alt={props.data?.username}
              />
            </div>
            <div className={classes["user__details-main"]}>
              <Link
                to={`/users/${props.data?.username}`}
                className={`text ${classes["user__details-username"]}`}
              >
                {props.data?.username}
              </Link>
            </div>
            {!areFriends && (
              <div className={`${classes["btns"]}`}>
                {!isPending && !isSent && (
                  <div
                    className={`primary-bg ${classes["btn"]}`}
                    onClick={handleSendFriendRequest}
                  >
                    Follow
                  </div>
                )}
                {isPending && (
                  <div
                    className={`primary-bg ${classes["btn"]}`}
                    onClick={handleAcceptFriendRequest}
                  >
                    Accept
                  </div>
                )}
                {isPending && (
                  <div
                    className={`primary-bg ${classes["btn"]}`}
                    onClick={handleRejectFriendRequest}
                  >
                    Reject
                  </div>
                )}
                {isSent && <div>Pending...</div>}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UserCard;
