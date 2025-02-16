import React from "react";
import { Link } from "react-router";

import classes from "./FindFriends.module.scss";

// ICONS
import { IoIosPeople } from "react-icons/io";

const FindFriends = (props) => {
  const hideFriendsOverlay = () => {
    props.setShowFriendsList(false);
  };
  return (
    <div className={classes.container}>
      <p>Find new frineds!</p>
      <Link
        to="/users"
        className={`primary-bg ${classes.btn}`}
        onClick={hideFriendsOverlay}
      >
        <IoIosPeople />
      </Link>
    </div>
  );
};

export default FindFriends;
