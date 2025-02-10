import React from "react";
import { useSelector } from "react-redux";

import classes from "./UserBanner.module.scss";

// STORE

// IMAGE
import defaultImg from "../../images/default-user.jpg";

// ICONS
import { FaForumbee } from "react-icons/fa";

const UserBanner = (props) => {
  const { singleUser } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);

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
            {singleUser.id !== user.id && (
              <div className={`primary-bg ${classes["follow__btn"]}`}>
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
