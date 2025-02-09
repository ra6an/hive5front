import React, { useEffect, useState } from "react";

import classes from "./PostHeader.module.scss";

// IMAGES
import defaultUser from "../../images/default-user.jpg";

// ICONS
import { MdClose } from "react-icons/md";

import formatDateTime from "../../utils/date-formater";
import { Link } from "react-router";

const PostHeader = (props) => {
  const [date, setDate] = useState("");
  const user = props.user;

  useEffect(() => {
    setDate(formatDateTime(props.createdAt));

    const _interval = setInterval(() => {
      setDate(formatDateTime(props.createdAt));
    }, 1000 * 15);

    return () => clearInterval(_interval);
  }, [props.createdAt]);

  return (
    <div className={`${classes.container}`}>
      <div className={`${classes.user}`}>
        <div className={classes["image__box"]}>
          <img src={defaultUser} alt={user.username} />
        </div>
        <div className={`${classes["details"]}`}>
          <div className={classes["user__details"]}>
            <Link
              to={`/user/${user?.username}`}
              className={`text ${classes.name}`}
            >
              {user.username || "User"}
            </Link>
            <div className={`primary-bg ${classes.follow}`}>
              <p>Follow</p>
            </div>
          </div>
          <div className={`${classes.date} date`}>
            <p>{date || "-"}</p>
          </div>
        </div>
      </div>
      <div className={`${classes.close}`}>
        <div className={`links ${classes["btn__close"]}`}>
          <MdClose />
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
