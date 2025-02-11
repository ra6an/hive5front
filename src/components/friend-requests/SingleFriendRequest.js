import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";

import classes from "./SingleFriendRequest.module.scss";

// IMAGES
import defaultImg from "../../images/default-user.jpg";

// STORE
import { acceptFriendRequest } from "../../store/reducers/auth-slice";

// UTILS
import formatDateTime from "../../utils/date-formater";

const SingleFriendRequest = (props) => {
  const dispatch = useDispatch();
  const { token, isAuthenticated } = useSelector((state) => state.auth);

  const handleAcceptFriendRequest = (e) => {
    e.preventDefault();
    if (!token || !isAuthenticated) return;
    console.log(props.data);
    console.log(token);
    dispatch(acceptFriendRequest(token, { friendRequestId: props.data.id }));
  };
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
              <div className={`secondary-bg ${classes["btn"]}`}>Reject</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleFriendRequest;
