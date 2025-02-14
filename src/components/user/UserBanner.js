import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import classes from "./UserBanner.module.scss";

// STORE
import { createFriendRequest } from "../../store/reducers/auth-slice";

// IMAGE
import defaultImg from "../../images/default-user.jpg";

// ICONS
import { FaForumbee } from "react-icons/fa";

const UserBanner = (props) => {
  const dispatch = useDispatch();
  const { singleUser } = useSelector((state) => state.user);
  const { user, token, isAuthenticated, friends, sentFriendRequests } =
    useSelector((state) => state.auth);
  const [canFollow, setCanFollow] = useState(false);

  useEffect(() => {
    const isSelf = user.id === singleUser?.id;

    const hasFriendRequest = friends.some(
      (fr) =>
        fr.sender?.id === singleUser?.id || fr.receiver.id === singleUser?.id
    );

    const alreadySentRequest = sentFriendRequests.some(
      (fr) => fr.receiver.id === singleUser?.id
    );

    setCanFollow(!isSelf && !hasFriendRequest && !alreadySentRequest);
  }, [friends, user, singleUser, sentFriendRequests]);

  const handleSendFriendRequest = (e) => {
    if (!isAuthenticated || !token) return;
    dispatch(createFriendRequest(token, { userId: singleUser.id }));
  };

  return (
    <div className={classes.container}>
      <div className={`post ${classes["background"]}`} />
      {singleUser && Object.keys(singleUser).length > 0 && (
        <div className={classes["inner__container"]}>
          <div className={`username__border ${classes["image__box"]}`}>
            <img
              src={singleUser.image ? singleUser.image : defaultImg}
              alt={singleUser.username}
            />
          </div>
          <div className={classes["user__details"]}>
            <div className={classes["user__details-inner"]}>
              <p className={classes["username"]}>{singleUser.username}</p>
              <p
                className={`date ${classes["status"]}`}
              >{`Status: ${"Active"}`}</p>
            </div>
            {singleUser.id !== user.id && canFollow && (
              <div
                className={`primary-bg ${classes["follow__btn"]}`}
                onClick={handleSendFriendRequest}
              >
                Follow <FaForumbee />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserBanner;
