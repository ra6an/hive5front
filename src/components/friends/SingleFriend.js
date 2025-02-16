import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

import classes from "./SingleFriend.module.scss";

// IMAGE
import defaultImg from "../../images/default-user.jpg";

const SingleFriend = (props) => {
  const { user } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (Object.keys(props.data).length === 0) return;
    if (Object.keys(user).length === 0) return;

    setUserData(
      props.data.sender.id === user.id ? props.data.receiver : props.data.sender
    );
  }, [props.data, user]);

  return (
    <Link
      to={`/user/${userData.username}`}
      className={`background text ${classes.container}`}
    >
      <div className={classes["image__box"]}>
        <img src={userData.image || defaultImg} alt={userData.username} />
      </div>
      <div className={classes["user__details"]}>
        <p>{userData.username}</p>
      </div>
    </Link>
  );
};

export default SingleFriend;
