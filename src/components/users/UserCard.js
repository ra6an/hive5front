import React from "react";
import { Link } from "react-router";

import classes from "./UserCard.module.scss";

import defaultImg from "../../images/default-user.jpg";

const UserCard = (props) => {
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
            <div className={`${classes["btns"]}`}>
              <div className={`primary-bg ${classes["btn"]}`}>Follow</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserCard;
