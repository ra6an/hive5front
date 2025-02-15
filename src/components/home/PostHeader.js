import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router";

import classes from "./PostHeader.module.scss";

// STORE
import { createFriendRequest } from "../../store/reducers/auth-slice";

// IMAGES
import defaultUser from "../../images/default-user.jpg";

// ICONS
import { MdClose } from "react-icons/md";

// UTILS
import formatDateTime from "../../utils/date-formater";

const PostHeader = (props) => {
  const dispatch = useDispatch();
  const { user, friends, sentFriendRequests, token, isAuthenticated } =
    useSelector((state) => state.auth);
  const [date, setDate] = useState("");
  const [canFollow, setCanFollow] = useState(false);
  const _user = props.user;

  useEffect(() => {
    const isSelf = user?.id === _user?.id;

    const hasFriendRequest = friends.some(
      (fr) => fr.sender?.id === _user?.id || fr.receiver?.id === _user?.id
    );

    const alreadySentRequest = sentFriendRequests.some(
      (fr) => fr.receiver?.id === _user?.id
    );

    setCanFollow(!isSelf && !hasFriendRequest && !alreadySentRequest);
  }, [friends, user, _user, sentFriendRequests]);

  useEffect(() => {
    setDate(formatDateTime(props.createdAt));

    const _interval = setInterval(() => {
      setDate(formatDateTime(props.createdAt));
    }, 1000 * 15);

    return () => clearInterval(_interval);
  }, [props.createdAt]);

  const handleSendFriendRequest = (e) => {
    if (!isAuthenticated || !token) return;
    dispatch(createFriendRequest(token, { userId: _user.id }));
  };

  return (
    <div className={`${classes.container}`}>
      <div className={`${classes.user}`}>
        <div className={classes["image__box"]}>
          <img src={defaultUser} alt={_user.username} />
        </div>
        <div className={`${classes["details"]}`}>
          <div className={classes["user__details"]}>
            <Link
              to={`/user/${_user?.username}`}
              className={`text ${classes.name}`}
            >
              {_user.username || "User"}
            </Link>
            {!props.cantPost && canFollow && (
              <div
                className={`primary-bg ${classes.follow}`}
                onClick={handleSendFriendRequest}
              >
                <p>Follow</p>
              </div>
            )}
          </div>
          <div className={`${classes.date} date`}>
            <p>{date || "-"}</p>
          </div>
        </div>
      </div>
      {/* <div className={`${classes.close}`}>
        <div className={`links ${classes["btn__close"]}`}>
          <MdClose />
        </div>
      </div> */}
    </div>
  );
};

export default PostHeader;
